import React, { PureComponent } from 'react';
import { string, shape, func } from 'prop-types';
import { List, ListItem, Cell } from 'react-mdl';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { requireAuth } from '../../utils';
import Factures from '../../../common/facture/factureSchema';
import Devis from '../../../common/devis/devisSchema';
import Projects from '../../../common/project/projectSchema';

class FactureShow extends PureComponent {
  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  render() {
    const { match: { params } } = this.props;
    const facture = Factures.findOne(params.factureId);

    if (!facture) {
      return <Cell col={12}>Facture introuvable</Cell>;
    }

    const project = Projects.findOne(facture.idProject);
    const devis = Devis.findOne(facture.idDevis);
    let payed = 'Non';

    switch (facture.payed) {
      case 'true':
        payed = 'Oui';
        break;
      case 'annulé':
        payed = 'Annulé';
        break;
      case 'false':
      default:
        payed = 'Non';
    }

    return (
      <List>
        <ListItem>
          Identifiant: <span>{facture.id}</span>
        </ListItem>
        {project &&
          <ListItem>
            Projet lié:{' '}
            <Link to={`/project/${facture.idProject}`}>{project.name}</Link>
          </ListItem>}
        {devis &&
          <ListItem>
            Devis lié: <Link to={`/devis/${facture.idDevis}`}>{devis.id}</Link>
          </ListItem>}
        <ListItem>
          Prix: <span>{facture.price}</span>
        </ListItem>
        {facture.sentDate &&
          <ListItem>
            Envoyé le: <span>{moment(facture.sentDate).format('LL')}</span>
          </ListItem>}
        <ListItem>
          Réglée?: <span>{payed}</span>
        </ListItem>
        <ListItem>
          Versement: <span>{facture.pricePayed || 0}</span>
        </ListItem>
        <ListItem>
          Délai de règlement: <span>{facture.delayTillPayed}</span>
        </ListItem>
        {facture.remarque &&
          <ListItem>
            Remarque: <span>{facture.remarque}</span>
          </ListItem>}
        {facture.payedDate &&
          <ListItem>
            Date de règlement:{' '}
            <span>{moment(facture.payedDate).format('LL')}</span>
          </ListItem>}
      </List>
    );
  }
}

FactureShow.propTypes = {
  match: shape({
    params: shape({
      factureId: string
    }).isRequired
  }).isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

export default FactureShow;
