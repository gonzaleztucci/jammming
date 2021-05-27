import React from 'react';
import './PlaylistItem.css';

export class PlaylistItem extends React.Component{


    handleClick(){
        
    }

    render(){
        return(
            //will print the name from the props passed to the component.
            <div className='PlaylistItem'>

                <h3>{this.props.playlistName}</h3>

            </div>
            
        )
    }
}