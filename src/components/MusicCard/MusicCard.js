import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends Component {
  render() {
    const {
      music: { trackName, previewUrl, trackId },
      checked,
      handleFavorite,
    } = this.props;

    return (
      <div className="song-container">
        <p className="song-name">{ trackName }</p>
        <audio
          className="song-player"
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
        >
          <input
            type="checkbox"
            name={ trackName }
            id={ trackId }
            checked={ checked }
            onChange={ handleFavorite }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default MusicCard;
