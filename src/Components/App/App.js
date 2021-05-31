import React from 'react';
// import { render } from 'react-dom';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify';
import {PlaylistList} from '../../Components/PlaylistList/PlaylistList';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      userPlaylists: []

    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.loadPlaylists = this.loadPlaylists.bind(this);
  }

  addTrack(track){

    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    let newTrackList = this.state.playlistTracks;
    newTrackList.push(track);
    console.log(newTrackList);
    console.log(typeof newTrackList);
    this.setState({playlistTracks: newTrackList});
    
   
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



  loadPlaylists(){
    Spotify.getUserPlaylists().then(response => {  
      this.setState({userPlaylists: response});
    });
    
  }

  savePlaylist(){
        const trackURIs = this.state.playlistTracks.map(track => {return track.uri});
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(
          this.setState({
            playlistName: 'New Playlist',
            playlistTracks: []
          })
        ); 
    
  }

    search(term){
    Spotify.search(term).then(searchResults => {
        this.setState({
        searchResults: searchResults
      });

    });

  }

  componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
    this.loadPlaylists();
    Spotify.getUserID();
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              {/* {console.log("this.state.searchResults")}
              {console.log(this.state.searchResults)} */}
              <SearchResults className="search-results" searchResults = {this.state.searchResults} onAdd={this.addTrack}/>
              <div className='playlist-edit'>
                  <PlaylistList playlists={this.state.userPlaylists} onSelect={this.addTrack}/>
                  <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist}/>
              </div>
              
            </div>
          </div>
      </div>
    );

  }
}

  


export default App;
