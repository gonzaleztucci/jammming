import React from 'react';
import { PlaylistItem } from '../PlaylistItem/PlaylistItem';
import './PlaylistList.css';

export class PlaylistList extends React.Component{

    render(){
        return(
            <div className="PlaylistList">
                <h2>User Playlists</h2>

                {
                    {/* this.props.userPlaylists.map(playlist => {
                        return <PlaylistItem playlistName= {playlist.name} key= {playlist.id} />
                    }) */}
                }

                {/* //Will map the userPlaylists render a PlaylistItem for each element of the user's playlist
                //Falta implementar el map */}
                {/* <PlaylistItem  /> */}
                {/* ESTO ES UN PROP   playlistName = {} */}
            </div>
        )
    }

}