import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard/MusicCard';
import getMusics from '../../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import './Album.css';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      musicList: [],
      favoriteSongsList: [],
      albumId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.fetchMusicList();
    this.fetchFavoritesSongs();
  }

  fetchFavoritesSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const favoriteSongsList = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongsList,
    });
  }

  handleFavorite = (music) => {
    const { favoriteSongsList } = this.state;

    const isFavorite = favoriteSongsList.some((song) => song.trackId === music.trackId);

    if (isFavorite) {
      removeSong(music);
    } else {
      addSong(music);
    }

    this.fetchFavoritesSongs();
  }

  fetchMusicList = async () => {
    this.setState({
      isLoading: true,
    });
    const { albumId } = this.state;
    const result = await getMusics(albumId);
    this.setState({
      isLoading: false,
      musicList: result,
    });
  }

  checkFavorite = (song) => {
    const { favoriteSongsList } = this.state;
    return favoriteSongsList.includes(song);
  }

  renderMusicList = () => {
    const { musicList, favoriteSongsList } = this.state;
    return (
      <section className="album-page">
        <div className="album-info">
          <img
            className="album-info-image"
            src={ musicList[0].artworkUrl100 }
            alt={ musicList[0].collectionName }
          />
          <h3
            className="album-name"
            data-testid="album-name"
          >
            { musicList[0].collectionName }
          </h3>
          <h4
            className="artist-name"
            data-testid="artist-name"
          >
            { musicList[0].artistName }
          </h4>
        </div>
        <div className="album-songs">
          {musicList.slice(1).map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              checked={ favoriteSongsList.some((song) => song.trackId === music.trackId) }
              handleFavorite={ () => this.handleFavorite(music) }
            />
          ))}
        </div>
      </section>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? <Loading /> : this.renderMusicList() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
