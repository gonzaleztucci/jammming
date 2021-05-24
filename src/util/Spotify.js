let accessToken;
const clientID = 'c1460e19ebe0417aa1a395c41fe4b6e8';
const redirectURI = 'http://localhost:3000/';

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

     search(term){
        //alert("sending a call to Spotify");
        const accessToken = Spotify.getAccessToken();
        let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;

        return fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }).then(response => {
            if (response.ok){ 
                return response.json();
            }
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
    }

};



