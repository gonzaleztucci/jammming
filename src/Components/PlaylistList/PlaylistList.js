import React from 'react';
import { PlaylistItem } from '../PlaylistItem/PlaylistItem';
import './PlaylistList.css';

export class PlaylistList extends React.Component{

    render(){
        return(

            <div className="PlaylistList">
                <h2>User Playlists</h2>
                {
                this.props.playlists.map(playlist => {
                    return <PlaylistItem playlistName= {playlist.name} key= {playlist.id}/>
                })
            }
            </div>          
        )
    }

}