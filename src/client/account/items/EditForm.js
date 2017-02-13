import React from 'react';

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

  componentDidMount() {
    window.componentHandler.upgradeDom(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

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
      <div className="mdl-grid">
        <form onSubmit={this.handleSubmit}>

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="email">Email</label>
            <span className="mdl-textfield__error">Email non valide</span>
          </div>
          <br />

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="text"
              name="company"
              id="company"
              value={this.state.company}
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="company">Entreprise</label>
          </div>
          <br />

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="text"
              name="firstName"
              id="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="firstName">Prénom</label>
          </div>
          <br />

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="text"
              name="lastName"
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="lastName">Nom</label>
          </div>
          <br />

          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="title">Titre</label>
          </div>
          <br />

          <input type="submit" value="Submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" />

        </form>
      </div>
    );
  }
}

EditForm.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default EditForm;
