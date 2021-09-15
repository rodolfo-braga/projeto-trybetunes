import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { searchTerm } = this.state;
    const minimumLength = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <input
          type="text"
          name="searchTerm"
          placeholder="Nome do Artista"
          value={ searchTerm }
          onChange={ this.handleChange }
          data-testid="search-artist-input"
        />
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ searchTerm.length < minimumLength }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
