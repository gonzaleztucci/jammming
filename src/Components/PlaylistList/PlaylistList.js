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
                    return <PlaylistItem playlist ={playlist} playlistName= {playlist.name} key= {playlist.id} onSelect={this.props.onSelect} onPlaylistChange={this.props.onPlaylistChange} onNameChange = {this.props.onNameChange}/>
                })
            }
            </div>          
        )
    }

}