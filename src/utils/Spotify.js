const clientId = '6dd22c5c43f043c884fbcdc68dfc8ba7';
const redirectUri = 'https://fungwithme.vercel.app/';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;
let accessToken = undefined;
let expiresIn = undefined;


const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = spotifyUrl;
    }
  },

  async search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((jsonResponse) => {
        // console.log(jsonResponse)
        if (!jsonResponse.tracks){
          return []
        };
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            popularity: track.popularity,
            external_urls: track.external_urls.spotify,
            preview_url: track.preview_url,
            image: track.album.images[0].url,
            uri: track.uri,
        }));
    });
  },

  async savePlayList(name, trackIds) {
    if(!name || ! trackIds.length) {
        return;
    }
    if(Array.isArray(trackIds) && trackIds.length) {
      const createPlaylistUrl = `https://api.spotify.com/v1/me/playlists`;
      const response = await fetch(createPlaylistUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: name,
          public: true,
        }),
      });
      const jsonResponse = response.json();
      const playlistId = jsonResponse.id;
      if (playlistId) {
        const replacePlaylistTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        fetch(replacePlaylistTracksUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            uris: trackIds.map((id) => 'spotify:track:'.concat(id)),
          }),
        });
      }
    }
  },
};
Spotify.getAccessToken();
export default Spotify;