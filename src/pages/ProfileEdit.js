import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: {
        name: '',
        image: '',
        email: '',
        description: '',
      },
      isLoading: true,
      redirect: false,
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

handleChange = (event) => {
  const { name, value } = event.target;
  this.setState({
    userInfo: { [name]: value },
  });
}

handleClick = async () => {
  const { userInfo } = this.state;
  this.setState({
    isLoading: true,
  });
  await updateUser({ ...userInfo });
  this.setState({
    isLoading: false,
    redirect: true,
  });
}

enableSaveButton = () => {
  const { userInfo: { name, email, image, description } } = this.state;

  const fieldsAreFilled = name.length > 0
    && email.length > 0
    && image.length > 0
    && description.length > 0;

  const regex = /\S+@\S+\.\S+/;
  const emailIsValid = email.match(regex);

  console.log(fieldsAreFilled);
  console.log(emailIsValid);
  return !fieldsAreFilled || !emailIsValid;
}

render() {
  const {
    userInfo: { name, email, image, description },
    isLoading,
    redirect,
  } = this.state;

  // const fieldsAreFilled = name.length > 0
  //   && email.length > 0
  //   && image.length > 0
  //   && description.length > 0;

  // const regex = /\S+@\S+\.\S+/;
  // const emailIsValid = email.match(regex);

  if (isLoading) return <Loading />;

  if (redirect) return <Redirect to="/profile" />;

  return (
    <div data-testid="page-profile-edit">
      <Header />
      <h1>Profile Edit</h1>
      <form>
        <img src={ image } alt="Imagem do usuário" />
        <input
          type="text"
          name="image"
          placeholder="Insira um link"
          value={ image }
          onChange={ this.handleChange }
          data-testid="edit-input-image"
        />
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={ name }
            onChange={ this.handleChange }
            data-testid="edit-input-name"
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            name="email"
            placeholder="Insira um e-mail"
            value={ email }
            onChange={ this.handleChange }
            data-testid="edit-input-email"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            placeholder="Insira uma descrição"
            value={ description }
            onChange={ this.handleChange }
            data-testid="edit-input-description"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ this.enableSaveButton() }
          data-testid="edit-button-save"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
}

export default ProfileEdit;
