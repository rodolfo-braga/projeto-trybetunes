import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const { album:
      { collectionId, artworkUrl100, collectionName, artistName },
    } = this.props;

    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        className="album-card"
      >
        <img
          src={ artworkUrl100 }
          alt={ collectionName }
          className="album-card-image"
        />
        <div className="album-card-body">
          <h4 className="album-card-title">{ collectionName }</h4>
          <h5 className="album-card-artist">{ artistName }</h5>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    artistName: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
