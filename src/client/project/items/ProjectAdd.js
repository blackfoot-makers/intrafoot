import React, { PureComponent } from 'react';
import { object, func, shape, string } from 'prop-types';
import { connect } from 'react-redux';

import Form from '../../common/Form';

import { requireAuth } from '../../utils';
import { addProject, editProject } from '../projectActions';
import Projects from '../../../common/project/projectSchema';

class ProjectAdd extends PureComponent {
  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  render() {
    let defaultValue = {
      id: '',
      company: '',
      name: '',
      description: '',
      status: 'en cours',
      remarque: '',
      nda: 'false',
      participants: [],
      editMode: false
    };

    if (this.props.match.params.projectId) {
      const project = Projects.findOne(this.props.match.params.projectId);
      defaultValue = {
        id: project.id,
        company: project.company,
        name: project.name,
        description: project.description,
        status: project.status || 'en cours',
        remarque: project.remarque,
        nda: project.nda ? 'true' : 'false',
        participants: project.participants || [],
        _id: project._id,
        editMode: true
      };
    }

    return (
      <Form
        redirectAfterSubmit={() => {
          this.props.history.push('/project');
        }}
        editAction={(data, callback) =>
          this.props.editProject(
            {
              ...data,
              _id: defaultValue._id
            },
            callback
          )}
        addAction={this.props.addProject}
        editMode={defaultValue.editMode}
        name="Projet"
        fields={[
          {
            fieldKey: 'id',
            label: 'Identifiant',
            required: true,
            floatingLabel: true,
            type: 'text',
            defaultValue: defaultValue.id
          },
          {
            fieldKey: 'company',
            label: 'Entreprise',
            type: 'autocomplete',
            items: this.props.users.companies,
            valueIndex: 'name',
            dataIndex: 'name',
            required: true,
            floatingLabel: true,
            defaultValue: defaultValue.company
          },
          {
            fieldKey: 'name',
            label: 'Nom',
            required: true,
            floatingLabel: true,
            type: 'text',
            defaultValue: defaultValue.name
          },
          {
            fieldKey: 'description',
            label: 'Description',
            required: true,
            floatingLabel: true,
            type: 'text',
            defaultValue: defaultValue.description
          },
          {
            fieldKey: 'remarque',
            label: 'Remarque',
            rows: 3,
            type: 'text',
            defaultValue: defaultValue.remarque,
            floatingLabel: true
          },
          {
            fieldKey: 'nda',
            label: 'NDA',
            type: 'bool',
            defaultValue: defaultValue.nda
          },
          {
            fieldKey: 'status',
            label: 'Statut',
            type: 'select',
            defaultValue: defaultValue.status,
            options: [
              { _id: 'abandon', name: 'Abandon' },
              { _id: 'en cours', name: 'En cours' },
              { _id: 'stand by', name: 'Stand by' },
              { _id: 'terminé', name: 'Terminé' }
            ]
          },
          {
            fieldKey: 'participants',
            label: 'Participants',
            type: 'multiselect',
            defaultValue: defaultValue.participants,
            options: this.props.users.allUsers
          }
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  addProject: (data, callback) => {
    dispatch(addProject(data, callback));
  },
  editProject: (data, callback) => {
    dispatch(editProject(data, callback));
  }
});

ProjectAdd.propTypes = {
  addProject: func.isRequired,
  editProject: func.isRequired,
  match: shape({
    params: shape({
      projectId: string
    }).isRequired
  }).isRequired,
  users: object.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);
