import React from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import moment from "moment";

import Form from "../../common/Form";

import { addUser, editUser } from "../userActions";
import Users from "../../../common/users/usersSchema";

const UserAdd = props => {
  let defaultValue = {
    firstName: "",
    lastName: "",
    phone: "",
    linkedin: "",
    sites: "",
    email: "",
    interlocuteur: "",
    description: "",
    accessLevel: 0,
    lastContact: moment(),
    title: "",
    company: "",
    editMode: false
  };

  if (props.params.contactId) {
    const user = Users.findOne(props.params.contactId);
    defaultValue = {
      ...user,
      lastContact: user.lastContact && moment(user.lastContact),
      sites: user.sites && user.sites.join(";"),
      editMode: true
    };
  }

  return (
    <Form
      redirectAfterSubmit={() => {
        browserHistory.push("/contact");
      }}
      editAction={(data, callback) =>
        props.editUser(
          {
            ...data,
            _id: defaultValue._id,
            id: defaultValue.id,
            history: defaultValue.history
          },
          callback
        )}
      addAction={props.addUser}
      editMode={defaultValue.editMode}
      name="Contacts"
      fields={[
        {
          fieldKey: "firstName",
          label: "Prénom",
          required: true,
          floatingLabel: true,
          type: "text",
          defaultValue: defaultValue.firstName
        },
        {
          fieldKey: "lastName",
          label: "Nom",
          required: true,
          floatingLabel: true,
          type: "text",
          defaultValue: defaultValue.lastName
        },
        {
          fieldKey: "phone",
          label: "Numéro de téléphone",
          pattern: "^(0|+[1-9]{2})[1-9]([-. ]?[0-9]{2}){4}$",
          error: "Mauvais format de téléphone",
          floatingLabel: true,
          type: "text",
          defaultValue: defaultValue.phone
        },
        {
          fieldKey: "linkedin",
          label: "Lien linkedin",
          type: "text",
          defaultValue: defaultValue.linkedin,
          floatingLabel: true
        },
        {
          fieldKey: "email",
          label: "Email",
          required: true,
          floatingLabel: true,
          type: "text",
          defaultValue: defaultValue.email
        },
        {
          fieldKey: "interlocuteur",
          label: "Interlocuteur",
          type: "select",
          defaultValue: defaultValue.interlocuteur,
          options: props.users.blackfootUsers
        },
        {
          fieldKey: "description",
          label: "Description",
          type: "text",
          floatingLabel: true,
          defaultValue: defaultValue.description
        },
        {
          fieldKey: "lastContact",
          label: "Dernier contact",
          type: "date",
          defaultValue: defaultValue.lastContact
        },
        {
          fieldKey: "title",
          label: "Titre",
          type: "text",
          required: true,
          floatingLabel: true,
          defaultValue: defaultValue.title
        },
        {
          fieldKey: "company",
          label: "Entreprise",
          type: "autocomplete",
          items: props.users.companies,
          valueIndex: "name",
          dataIndex: "name",
          required: true,
          floatingLabel: true,
          defaultValue: defaultValue.company
        },
        {
          fieldKey: "sites",
          label: "Sites",
          type: "text",
          floatingLabel: true,
          defaultValue: defaultValue.sites
        },
        {
          fieldKey: "accessLevel",
          label: "Facilité d'accès",
          type: "select",
          defaultValue: defaultValue.accessLevel,
          options: [
            { _id: 0, name: "0" },
            { _id: 1, name: "1" },
            { _id: 2, name: "2" },
            { _id: 3, name: "3" },
            { _id: 4, name: "4" },
            { _id: 5, name: "5" }
          ]
        }
      ]}
    />
  );
};

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
  addUser: React.PropTypes.func.isRequired,
  editUser: React.PropTypes.func.isRequired,
  params: React.PropTypes.object,
  users: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
