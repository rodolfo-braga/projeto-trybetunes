import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import logoLight from '../../images/LOGO_LIGHT.png';
import './Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const user = await getUser();
    this.setState({
      userName: user.name,
      isLoading: false,
    });
  }

  render() {
    const { userName, isLoading } = this.state;

    return (
      <header
        data-testid="header-component"
      >
        { isLoading ? <Loading />
          : (
            <section className="header-container">
              <div className="header-top">
                <img src={ logoLight } alt="Logo TrybeTunes" className="logo-light" />
                <h3 className="username" data-testid="header-user-name">{ userName }</h3>
              </div>
              <nav className="header-bottom">
                <Link
                  className="nav-button"
                  to="/search"
                  data-testid="link-to-search"
                >
                  Pesquisa
                </Link>
                <Link
                  className="nav-button"
                  to="/favorites"
                  data-testid="link-to-favorites"
                >
                  Favoritas
                </Link>
                <Link
                  className="nav-button"
                  to="/profile"
                  data-testid="link-to-profile"
                >
                  Perfil
                </Link>
              </nav>
            </section>
          )}
      </header>
    );
  }
}

export default Header;
