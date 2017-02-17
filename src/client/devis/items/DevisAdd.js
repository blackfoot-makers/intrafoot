import React from 'react';
import { connect } from 'react-redux';
import { Textfield, Button, RadioGroup, Radio } from 'react-mdl';
import { SelectField, Option } from 'react-mdl-extra';
import { browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { SubmitButton } from '../../common/InputButton';

import { addDevis, editDevis } from '../devisActions';
import Devis from '../../../common/devis/devisSchema';

class DevisAdd extends React.Component {
  constructor(props) {
    super(props);

    let state = {
      id: '',
      idProject: null,
      price: 0,
      signature: moment(),
      status: 'accepté',
      remarque: '',
      signed: 'false',
      editMode: false
    };

    if (props.params.devisId) {
      const devis = Devis.findOne(props.params.devisId);
      state = {
        id: devis.id,
        idProject: devis.idProject,
        price: devis.price,
        signature: moment(devis.signature),
        status: devis.status || 'accepté',
        remarque: devis.remarque,
        signed: devis.signed ? 'true' : 'false',
        _id: devis._id,
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

  handleSelectChange(data, key) {
    this.setState({
      [key]: data
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
    const devisData = {
      ...this.state,
      signature: this.state.signature && this.state.signature._d,
      signed: this.state.signed === 'true',
      price: parseFloat(this.state.price)
    };
    const notification = document.getElementById('snackbarIntraFoot');
    let msg = 'Devis ajouté';

    if (this.state.editMode) {
      this.props.editDevis(devisData);
      msg = 'Devis édité';
    } else {
      this.props.addDevis(devisData);
    }

    notification.MaterialSnackbar.showSnackbar({
      message: msg
    });
    browserHistory.push('/devis');
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

        <SelectField
          onChange={(data) => { this.handleSelectChange(data, 'idProject'); }}
          label="Projet"
          value={this.state.idProject}
          required
        >
          {
            this.props.projects.map((data, index) =>
              (<Option key={index} value={data._id}>{data.name}</Option>)
            )
          }
        </SelectField>

        <Textfield
          onChange={this.handleChange}
          required
          name="price"
          label="Prix"
          pattern="-?[0-9]*(\.[0-9]+)?"
          error="Le prix doit être un chiffre"
          floatingLabel
          value={this.state.price}
        />

        <Textfield
          onChange={this.handleChange}
          label="Remarque"
          name="remarque"
          rows={3}
          floatingLabel
          value={this.state.remarque}
        />

        <label htmlFor="signed">Signé?</label>
        <RadioGroup onChange={this.handleChange} name="signed" id="signed" value={this.state.signed}>
          <Radio value="true" ripple>Oui</Radio>
          <Radio value="false" ripple>Non</Radio>
        </RadioGroup>

        <SelectField onChange={(data) => { this.handleSelectChange(data, 'status'); }} label="Statut" value={this.state.status}>
          <Option value="abandon">Abandon</Option>
          <Option value="accepté">Accepté</Option>
          <Option value="stand by">Stand by</Option>
          <Option value="terminé">Terminé</Option>
        </SelectField>

        {
          this.state.signed === 'true' &&
          <div>
            <label htmlFor="signature">Date de signature: </label>
            <DatePicker
              onChange={this.handleDateChange}
              name="signature"
              id="signature"
              title="Date de signature"
              selected={this.state.signature}
            />
          </div>
        }


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

const mapStateToProps = ({ projects }) => ({
  projects
});

const mapDispatchToProps = dispatch => ({
  addDevis: (data) => {
    dispatch(addDevis(data));
  },
  editDevis: (data) => {
    dispatch(editDevis(data));
  }
});

DevisAdd.propTypes = {
  addDevis: React.PropTypes.func.isRequired,
  editDevis: React.PropTypes.func.isRequired,
  params: React.PropTypes.object,
  projects: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DevisAdd);
