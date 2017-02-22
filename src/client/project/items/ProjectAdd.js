import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import Form from '../../common/Form';

import { addProject, editProject } from '../projectActions';
import Projects from '../../../common/project/projectSchema';

const ProjectAdd = (props) => {
  let defaultValue = {
    id: '',
    company: '',
    name: '',
    description: '',
    signature: moment(),
    status: 'en cours',
    remarque: '',
    nda: 'false',
    editMode: false
  };

  if (props.params.projectId) {
    const project = Projects.findOne(props.params.projectId);
    defaultValue = {
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

  return (
    <Form
      redirectAfterSubmit={() => { browserHistory.push('/project'); }}
      editAction={data => props.editProject({
        ...data,
        _id: defaultValue._id
      })}
      addAction={props.addProject}
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
          required: true,
          floatingLabel: true,
          type: 'text',
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
          defaultValue: defaultValue.nda,
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
          fieldKey: 'signature',
          label: 'Date de signature: ',
          display: 'signed',
          type: 'date',
          defaultValue: defaultValue.signature,
        }
      ]}
    />
  );
};

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
