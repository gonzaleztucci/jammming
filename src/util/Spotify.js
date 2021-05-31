let accessToken;
const clientID = 'c1460e19ebe0417aa1a395c41fe4b6e8';
const redirectURI = 'http://localhost:3000/';
let userID; 

export const Spotify = {

    getAccessToken(){
        if (accessToken) {
            return accessToken;
        }

        let token = window.location.href.match(/access_token=([^&]*)/);
        let duration = window.location.href.match(/expires_in=([^&]*)/);

        if (token && duration){
            accessToken = token[1];
            let expirationTime = Number(duration[1]);
            window.setTimeout(() => accessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;    
        } else {

            let accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },

    getUserID(){

        return fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }}).then(response => {
            if(response.ok){
                let jsonResponse = response.json();
                return jsonResponse
            } 
        }).then(jsonResponse => {          
            userID = jsonResponse.id;
            return userID;
        })

    },

     search(term){
        //alert("sending a call to Spotify");
        const accessToken = Spotify.getAccessToken();
        
        
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
                // if (!response.ok){
                //     alert("ha habido un fart");
                //     // console.log(response);

                //     // return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                //     //     headers: {
                //     //         'Authorization': 'Bearer ' + accessToken
                //     //     },
                //     // }).then(response =>{ return response.json()});

                // }
                
                return response.json();

        }).then(jsonResponse => {

            if(!jsonResponse.tracks){
                return [];
            } else {
                
                let array = jsonResponse.tracks.items.map(track => {return {
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
 		            id: track.id,
                    uri: track.uri
                }}); 
                return array;
            }

        });
    },

    savePlaylist(name, trackURIs){
        if(!name || !trackURIs.length){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        let playlistId
        let headers = {
            'Authorization': 'Bearer ' + accessToken
        };

       

        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                'Content-type': 'application/json',
                body: JSON.stringify({name:name})
        }).then(response => {
            let jsonResponse = response.json();
            return jsonResponse;        
        }).then(jsonResponse => {
            console.log("Los URI´s a pasar:");
            console.log(trackURIs);
            playlistId = jsonResponse.id;
            
            return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackURIs}) 
            });
        }).then(response => {
                let jsonResponse = response.json();
                let playlistId = jsonResponse.id;
        });

       

    },

    getUserPlaylists(){

        const accessToken = Spotify.getAccessToken();

        let headers = {
            'Authorization': 'Bearer ' + accessToken
        };

        return fetch('https://api.spotify.com/v1/me/playlists', {
            headers: headers,
            
        }).then(response => {
            let jsonResponse = response.json();
            return jsonResponse;
        }).then(jsonResponse => {
            let fullArray = jsonResponse.items;
            let userPlaylists = fullArray.filter(playlist => playlist.owner.id === userID);
            console.log(fullArray);
            console.log(userPlaylists);
            return userPlaylists;
        });
    },

    getPlaylist(playlistId){
        let headers = {
            'Authorization': 'Bearer ' + accessToken
        };

        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {headers: headers}).then(
            response => {
            let jsonResponse = response.json();
            return jsonResponse}).then(
            jsonResponse => {
            let array = jsonResponse.items.map(item => {return {
                name: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
 		        id: item.track.id,
                uri: item.track.uri
            }
            });

            return array;

        })
    }

    
};



