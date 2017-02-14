import React from 'react';

import { Textfield, Button } from 'react-mdl';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.currentUser.email,
      company: this.props.currentUser.company,
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      title: this.props.currentUser.title,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;


    this.setState({
      [name]: value
    });
  }

  // @todo: Handle error
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
    const notification = document.getElementById('snackbarIntraFoot');
    const data = {
      message: 'Profile changé'
    };
    notification.MaterialSnackbar.showSnackbar(data);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <Textfield
          onChange={this.handleChange}
          required
          label="Email"
          name="email"
          floatingLabel
          value={this.state.email}
          type="email"
          error="Email non valide"
          pattern="^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$"
        />

        <br />

        <Textfield
          onChange={this.handleChange}
          required
          label="Entreprise"
          name="company"
          floatingLabel
          value={this.state.company}
        />

        <br />

        <Textfield
          onChange={this.handleChange}
          required
          label="Prénom"
          name="firstName"
          floatingLabel
          value={this.state.firstName}
        />

        <br />

        <Textfield
          onChange={this.handleChange}
          required
          label="Nom"
          name="lastName"
          floatingLabel
          value={this.state.lastName}
        />

        <br />

        <Textfield
          onChange={this.handleChange}
          required
          label="Titre"
          name="title"
          floatingLabel
          value={this.state.title}
        />

        <br />

        <Button
          raised
          colored
          component={<input type="submit" value="Submit" />}
        />

      </form>
    );
  }
}

EditForm.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default EditForm;
