import React, { PureComponent } from 'react';
import { string, func, shape, object } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { requireAuth } from '../../utils';
import Form from '../../common/Form';

import { addUser, editUser } from '../userActions';
import Users from '../../../common/users/usersSchema';

class UserAdd extends PureComponent {
  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  render() {
    const { match: { params }, users } = this.props;
    let defaultValue = {
      firstName: '',
      lastName: '',
      phone: '',
      linkedin: '',
      sites: '',
      email: '',
      interlocuteur: '',
      description: '',
      accessLevel: 0,
      lastContact: moment(),
      title: '',
      company: '',
      editMode: false
    };

    if (params.contactId) {
      const user = Users.findOne(params.contactId);
      defaultValue = {
        ...user,
        lastContact: user.lastContact && moment(user.lastContact),
        sites: user.sites && user.sites.join(';'),
        editMode: true
      };
    }

    return (
      <Form
        redirectAfterSubmit={() => {
          this.props.history.push('/contact');
        }}
        editAction={(data, callback) =>
          this.props.editUser(
            {
              ...data,
              _id: defaultValue._id,
              id: defaultValue.id,
              history: defaultValue.history
            },
            callback
          )}
        addAction={this.props.addUser}
        editMode={defaultValue.editMode}
        name="Contacts"
        fields={[
          {
            fieldKey: 'firstName',
            label: 'Prénom',
            required: true,
            floatingLabel: true,
            type: 'text',
            defaultValue: defaultValue.firstName
          },
          {
            fieldKey: 'lastName',
            label: 'Nom',
            required: true,
            floatingLabel: true,
            type: 'text',
            defaultValue: defaultValue.lastName
          },
          {
            fieldKey: 'phone',
            label: 'Numéro de téléphone',
            pattern: '^(0|+[1-9]{2})[1-9]([-. ]?[0-9]{2}){4}$',
            error: 'Mauvais format de téléphone',
            floatingLabel: true,
            type: 'text',
            defaultValue: defaultValue.phone
          },
          {
            fieldKey: 'linkedin',
            label: 'Lien linkedin',
            type: 'text',
            defaultValue: defaultValue.linkedin,
            floatingLabel: true
          },
          {
            fieldKey: 'email',
            label: 'Email',
            required: true,
            floatingLabel: true,
            type: 'text',
            defaultValue: defaultValue.email
          },
          {
            fieldKey: 'interlocuteur',
            label: 'Interlocuteur',
            type: 'select',
            defaultValue: defaultValue.interlocuteur,
            options: users.blackfootUsers
          },
          {
            fieldKey: 'description',
            label: 'Description',
            type: 'text',
            floatingLabel: true,
            defaultValue: defaultValue.description
          },
          {
            fieldKey: 'lastContact',
            label: 'Dernier contact',
            type: 'date',
            defaultValue: defaultValue.lastContact
          },
          {
            fieldKey: 'title',
            label: 'Titre',
            type: 'text',
            required: true,
            floatingLabel: true,
            defaultValue: defaultValue.title
          },
          {
            fieldKey: 'company',
            label: 'Entreprise',
            type: 'autocomplete',
            items: users.companies,
            valueIndex: 'name',
            dataIndex: 'name',
            required: true,
            floatingLabel: true,
            defaultValue: defaultValue.company
          },
          {
            fieldKey: 'sites',
            label: 'Sites',
            type: 'text',
            floatingLabel: true,
            defaultValue: defaultValue.sites
          },
          {
            fieldKey: 'accessLevel',
            label: "Facilité d'accès",
            type: 'select',
            defaultValue: defaultValue.accessLevel,
            options: [
              { _id: 0, name: '0' },
              { _id: 1, name: '1' },
              { _id: 2, name: '2' },
              { _id: 3, name: '3' },
              { _id: 4, name: '4' },
              { _id: 5, name: '5' }
            ]
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
  addUser: (data, callback) => {
    dispatch(addUser(data, callback));
  },
  editUser: (data, callback) => {
    dispatch(editUser(data, callback));
  }
});

UserAdd.propTypes = {
  addUser: func.isRequired,
  editUser: func.isRequired,
  match: shape({
    params: shape({
      contactId: string
    }).isRequired
  }).isRequired,
  users: object.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
