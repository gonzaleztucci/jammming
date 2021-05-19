import React from 'react';
// import { render } from 'react-dom';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';


class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchResults: [{name:'Basket Case', artist: 'Green Day', album: 'Dookie', id:'1'}, {name:'Bullion', artist: 'Millencolin', album: 'Life on a Plate', id:'2'}, {name:'In Bloom', artist: 'Nirvana', album: 'Nevermind', id:'3'}],
      playlistName: 'Punk',
      playlistTracks: [{name:'Basket Case', artist: 'Green Day', album: 'Dookie', id:'1'}]

    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track){

    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    let newTrackList = this.state.playlistTracks.push(track);
    this.setState({newTrackList});
  
  }

  removeTrack(track){
    //Check if the track is not on the list, if this is the case Return
    if (!this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    // Adds de current playlist state to trackList and removes item with index
    let trackList = this.state.playlistTracks;
    let index = trackList.findIndex(savedTrack => savedTrack.id === track.id);
    let removed = trackList.splice(index, 1);

    //Sets new trackList
    this.setState({trackList});
  
  }

  updatePlaylistName(name){
    let newName = {playlistName: name};
    this.setState(newName);

  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange = {this.updatePlaylistName}/>
            </div>
          </div>
      </div>
    );

  }
}

  


export default App;
