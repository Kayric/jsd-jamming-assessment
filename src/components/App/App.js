import './App.css';
import SearchBar from '../SearchBar/SearchBar.js'
import Playlist from '../Playlist/Playlist.js'
import SearchResults from '../SearchResults/SearchResults.js'
import React from "react";
import Spotify from '../../utils/Spotify.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "FungWithMe",
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackIds = this.state.playlistTracks.map(track => track.id);
    Spotify.savePlaylist(this.state.playlistName, trackIds).then(() => {
      this.setState({
        playlistName: "FungWithMe",
        playlistTracks: []
      })
    })
  }


  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar onSearch={this.search} />
          <div class="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
