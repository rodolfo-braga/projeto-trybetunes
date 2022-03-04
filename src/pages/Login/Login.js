import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../../components/Loading';
import { createUser } from '../../services/userAPI';
import logoDark from '../../images/LOGO_DARK.png';
import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isLoading: false,
      redirect: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { userName } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: userName });
    this.setState({
      isLoading: false,
      redirect: true,
    });
  }

  render() {
    const { userName, isLoading, redirect } = this.state;
    const minimumLength = 3;

    if (isLoading) return <Loading />;

    if (redirect) return <Redirect to="/search" />;

    return (
      <section data-testid="page-login" className="page-login">
        <img src={ logoDark } alt="Logo TrybeTunes" className="logo-dark" />
        <form action="" className="login-container">
          <input
            type="text"
            name="userName"
            placeholder="Nome"
            value={ userName }
            onChange={ this.handleChange }
            data-testid="login-name-input"
            className="name-input"
          />
          <button
            type="button"
            onClick={ this.handleClick }
            disabled={ userName.length < minimumLength }
            data-testid="login-submit-button"
            className="login-button"
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

export default Login;
