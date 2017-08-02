import React, { PureComponent } from 'react';
import { object, shape, func } from 'prop-types';
import { List, ListItem, Cell } from 'react-mdl';
import { Link } from 'react-router';
import moment from 'moment';

import { requireAuth } from '../../utils';
import Prestas from '../../../common/presta/prestaSchema';
import Users from '../../../common/users/usersSchema';
import Companies from '../../../common/users/companySchema';

class PrestaShow extends PureComponent {
  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  render() {
    const { params } = this.props;
    const presta = Prestas.findOne(params.prestaId);

    if (!presta) {
      return <Cell col={12}>Presta introuvable</Cell>;
    }

    const user = Users.findOne(presta.idContact);
    const company = Companies.findOne(presta.company);
    const payed = presta.payed ? 'Oui' : 'Non';

    return (
      <List>
        <ListItem>
          Nom du prestataire:{' '}
          <Link
            to={`/contact/${presta.idContact}`}
          >{`${user.firstName} ${user.lastName}`}</Link>
        </ListItem>
        <ListItem>
          Entreprise: <span>{company.name}</span>
        </ListItem>
        <ListItem>
          Prestation: <span>{presta.prestation}</span>
        </ListItem>
        <ListItem>
          Prix: <span>{presta.price}</span>
        </ListItem>
        <ListItem>
          Date de facturation:{' '}
          <span>{moment(presta.facturation).format('LL')}</span>
        </ListItem>
        <ListItem>
          Accompte: <span>{presta.accompte}</span>
        </ListItem>
        <ListItem>
          Réglée?: <span>{payed}</span>
        </ListItem>
        {presta.payedDate &&
          <ListItem>
            Date de règlement:{' '}
            <span>{moment(presta.payedDate).format('LL')}</span>
          </ListItem>}
        {presta.remarque &&
          <ListItem>
            Remarque: <span>{presta.remarque}</span>
          </ListItem>}
      </List>
    );
  }
}

PrestaShow.propTypes = {
  params: object,
  history: shape({
    replace: func.isRequired
  }).isRequired
};

export default PrestaShow;
