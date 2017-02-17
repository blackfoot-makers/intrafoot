import React from 'react';
import { connect } from 'react-redux';
import { Textfield, Button, RadioGroup, Radio } from 'react-mdl';
import { SelectField, Option } from 'react-mdl-extra';
import { browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { SubmitButton } from '../../common/InputButton';

import { addProject, editProject } from '../projectActions';
import Projects from '../../../common/project/projectSchema';

class ProjectAdd extends React.Component {
  constructor(props) {
    super(props);
    let state = {
      id: '',
      company: '',
      name: '',
      description: '',
      signature: moment(),
      status: 'en cours',
      remarque: '',
      nda: false,
      editMode: false
    };

    if (props.params.projectId) {
      const project = Projects.findOne(props.params.projectId);
      console.log('PARAMS ELEMENT IS ', props.params, project);
      state = {
        id: project.id,
        company: project.company,
        name: project.name,
        description: project.description,
        signature: moment(project.signature),
        status: project.status || 'en cours',
        remarque: project.remarque,
        nda: project.nda ? 'true' : 'false',
        _id: project._id,
        editMode: true
      };
    }

    this.state = state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSelectChange(data) {
    this.setState({
      status: data
    });
  }

  handleDateChange(date) {
    this.setState({
      signature: date
    });
  }

  // @todo: Handle error
  handleSubmit(event) {
    event.preventDefault();
    const projectData = {
      ...this.state,
      signature: this.state.signature._d,
      nda: this.state.nda === 'true'
    };
    const notification = document.getElementById('snackbarIntraFoot');
    let msg = 'Projet ajouté';

    if (this.state.editMode) {
      this.props.editProject(projectData);
      msg = 'Projet édité';
    } else {
      this.props.addProject(projectData);
    }

    notification.MaterialSnackbar.showSnackbar({
      message: msg
    });
    browserHistory.push('/project');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <Textfield
          onChange={this.handleChange}
          required
          label="Identifiant"
          name="id"
          floatingLabel
          value={this.state.id}
        />

        <Textfield
          onChange={this.handleChange}
          required
          label="Entreprise"
          name="company"
          floatingLabel
          value={this.state.company}
        />

        <Textfield
          onChange={this.handleChange}
          required
          label="Nom"
          name="name"
          floatingLabel
          value={this.state.name}
        />

        <Textfield
          onChange={this.handleChange}
          required
          label="Description"
          name="description"
          floatingLabel
          value={this.state.description}
        />

        <Textfield
          onChange={this.handleChange}
          label="Remarque"
          name="remarque"
          rows={3}
          floatingLabel
          value={this.state.remarque}
        />

        <label htmlFor="nda">NDA</label>
        <RadioGroup onChange={this.handleChange} name="nda" id="nda" value={this.state.nda}>
          <Radio value="true" ripple>Oui</Radio>
          <Radio value="false" ripple>Non</Radio>
        </RadioGroup>

        <SelectField onChange={this.handleSelectChange} label="Statut" value={this.state.status}>
          <Option value="abandon">Abandon</Option>
          <Option value="en cours">En cours</Option>
          <Option value="stand by">Stand by</Option>
          <Option value="terminé">Terminé</Option>
        </SelectField>

        <label htmlFor="signature">Date de signature: </label>
        <DatePicker
          onChange={this.handleDateChange}
          name="signature"
          id="signature"
          title="Date de signature"
          selected={this.state.signature}
        />

        <br />
        <br />

        <Button
          raised
          colored
          component={SubmitButton}
        />

      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProject: (data) => {
    dispatch(addProject(data));
  },
  editProject: (data) => {
    dispatch(editProject(data));
  }
});

ProjectAdd.propTypes = {
  addProject: React.PropTypes.func.isRequired,
  editProject: React.PropTypes.func.isRequired,
  params: React.PropTypes.object
};

export default connect(null, mapDispatchToProps)(ProjectAdd);
