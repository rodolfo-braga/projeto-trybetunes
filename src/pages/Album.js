import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      musicList: [],
      // musicListFetched: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    result.splice(0, 1);

    this.onMount(() => this.setState({
      isLoading: false,
      musicList: result,
      // musicListFetched: true,
    }));
  }

  onMount = (callback) => {
    callback();
  }

  // renderMusicList = () => {
  //   const { musicList } = this.state;

  //   return (
  //     <section>
  //       <h3 data-testid="album-name">{ musicList[0].collectionName }</h3>
  //       <h4 data-testid="artist-name">{ musicList[0].artistName }</h4>
  //       {musicList.map((music) => (
  //         <MusicCard key={ music.trackId } music={ music } />
  //       ))}
  //     </section>
  //   );
  // }

  render() {
    const { isLoading, musicList } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        { isLoading ? <Loading /> : (
          <section>
            <h3 data-testid="album-name">{ musicList[0].collectionName }</h3>
            <h4 data-testid="artist-name">{ musicList[0].artistName }</h4>
            {musicList.map((music) => (
              <MusicCard key={ music.trackId } music={ music } />
            ))}
          </section>
        ) }
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
