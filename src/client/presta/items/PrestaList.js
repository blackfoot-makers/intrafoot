import React from 'react';
import { array, func } from 'prop-types';
import { browserHistory, Link } from 'react-router';
import {
  Table,
  TableHeader,
  Cell,
  Card,
  CardTitle,
  CardText,
  CardActions,
  Button
} from 'react-mdl';
import moment from 'moment';

import Users from '../../../common/users/usersSchema';
import Companies from '../../../common/users/companySchema';

const PrestaList = ({ prestas, renderAction, ...otherProps }) =>
  <Cell col={12} component={Card} shadow={0}>
    <CardTitle>Prestas</CardTitle>
    <CardText>
      <Table
        sortable
        rowKeyColumn="id"
        shadow={0}
        rows={prestas}
        {...otherProps}
      >
        <TableHeader
          name="idContact"
          tooltip="Nom du presta"
          cellFormatter={id => {
            const user = Users.findOne(id);
            return (
              <Link
                to={`/contact/${id}`}
              >{`${user.firstName} ${user.lastName}`}</Link>
            );
          }}
        >
          Presta
        </TableHeader>
        <TableHeader
          name="company"
          tooltip="Entreprise du contact"
          cellFormatter={id => {
            const company = Companies.findOne(id);
            return company.name;
          }}
        >
          Entreprise
        </TableHeader>
        <TableHeader name="prestation" tooltip="Prestation">
          Prestation
        </TableHeader>
        <TableHeader name="price" tooltip="Prix de la presta HT">
          Prix
        </TableHeader>
        <TableHeader
          name="facturation"
          tooltip="Date de facturation"
          cellFormatter={date => date && moment(date).format('LL')}
        >
          Date de facturation
        </TableHeader>
        <TableHeader name="accompte" tooltip="Accompte versé">
          Accompte
        </TableHeader>
        <TableHeader
          name="payed"
          tooltip="La prestation est elle réglée"
          cellFormatter={payed => (payed ? 'Oui' : 'Non')}
        >
          Réglée?
        </TableHeader>
        <TableHeader
          name="payedDate"
          tooltip="Date de réglement"
          cellFormatter={date => date && moment(date).format('LL')}
        >
          Date de règlement
        </TableHeader>
        <TableHeader name="remarque" tooltip="Remarque">
          Remarque
        </TableHeader>
        <TableHeader name="action" cellFormatter={renderAction}>
          Actions
        </TableHeader>
      </Table>
    </CardText>
    <CardActions border>
      <Button
        colored
        ripple
        onClick={() => {
          browserHistory.push('/presta/add');
          return false;
        }}
      >
        Ajouter un prestataire
      </Button>
    </CardActions>
  </Cell>;

PrestaList.propTypes = {
  prestas: array.isRequired,
  renderAction: func.isRequired
};

export default PrestaList;
