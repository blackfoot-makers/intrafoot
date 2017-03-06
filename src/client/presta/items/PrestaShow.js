import React from 'react';
import { List, ListItem, Cell } from 'react-mdl';
import { Link } from 'react-router';
import moment from 'moment';

import Prestas from '../../../common/presta/prestaSchema';
import Users from '../../../common/users/usersSchema';
import Companies from '../../../common/users/companySchema';

const PrestaShow = ({ params }) => {
  const presta = Prestas.findOne(params.prestaId);

  if (!presta) {
    return (
      <Cell col={12}>
        Presta introuvable
      </Cell>
    );
  }

  const user = Users.findOne(presta.idContact);
  const company = Companies.findOne(presta.company);
  const payed = presta.payed ? 'Oui' : 'Non';

  return (
    <List>
      <ListItem>Nom du prestataire: <Link to={`/contact/${presta.idContact}`}>{`${user.firstName} ${user.lastName}`}</Link></ListItem>
      <ListItem>Entreprise: <span>{company.name}</span></ListItem>
      <ListItem>Prestation: <span>{presta.prestation}</span></ListItem>
      <ListItem>Prix: <span>{presta.price}</span></ListItem>
      <ListItem>Date de facturation: <span>{moment(presta.facturation).format('LL')}</span></ListItem>
      <ListItem>Accompte: <span>{presta.accompte}</span></ListItem>
      <ListItem>Réglée?: <span>{payed}</span></ListItem>
      {
        presta.payedDate &&
        <ListItem>Date de règlement: <span>{moment(presta.payedDate).format('LL')}</span></ListItem>
      }
      {
        presta.remarque &&
        <ListItem>Remarque: <span>{presta.remarque}</span></ListItem>
      }
    </List>
  );
};

PrestaShow.propTypes = {
  params: React.PropTypes.object
};

export default PrestaShow;
