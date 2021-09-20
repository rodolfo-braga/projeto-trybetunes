import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const user = await getUser();
    this.setState({
      userInfo: user,
      isLoading: false,
    });
  }

  render() {
    const { userInfo: { name, email, image, description }, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        { isLoading ? <Loading /> : (
          <section>
            <img src={ image } alt="Foto do usuário" data-testid="profile-image" />
            <Link to="/profile/edit">Editar perfil</Link>
            <h4>Nome</h4>
            <p>{ name }</p>
            <h4>E-mail</h4>
            <p>{ email }</p>
            <h4>Descrição</h4>
            <p>{ description }</p>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
