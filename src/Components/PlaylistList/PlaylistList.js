import React from 'react';
import { PlaylistItem } from '../PlaylistItem/PlaylistItem';
import './PlaylistList.css';

export class PlaylistList extends React.Component{

    render(){
        return(
            <div className="PlaylistList">
                <h2>Your Playlists</h2>
                //Will map the userPlaylists render a PlaylistItem for each element of the user's playlist
                //Falta implementar el map
                <PlaylistItem playlistName = {} />
            </div>
        )
    }

}