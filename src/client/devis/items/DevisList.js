import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Table, TableHeader, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import moment from 'moment';

import Projects from '../../../common/project/projectSchema';

const DevisList = ({ devis, renderAction, ...otherProps }) => (
  <Cell col={12} component={Card} shadow={0}>
    <CardTitle>
      Devis
    </CardTitle>
    <CardText>
      <Table
        sortable
        rowKeyColumn="id"
        shadow={0}
        rows={devis}
        {...otherProps}
      >
        <TableHeader name="id" tooltip="Identifiant du devis">
          Identifiant
        </TableHeader>
        <TableHeader
          name="idProject"
          tooltip="Projet lié au devis"
          cellFormatter={(id) => {
            const project = Projects.findOne(id);
            return <Link to={`/project/${id}`}>{project.name}</Link>;
          }}
        >
          Projet
        </TableHeader>
        <TableHeader
          name="price"
          tooltip="Prix du devis"
          numeric
          cellFormatter={price => `${price.toFixed(2)}€`}
        >
          Prix
        </TableHeader>
        <TableHeader
          name="signature"
          tooltip="Date de signature du devis"
          cellFormatter={date => (date ? moment(date).format('LL') : 'Devis non signé')}
        >
          Signature
        </TableHeader>
        <TableHeader name="status" tooltip="Statut du devis">
          Statut
        </TableHeader>
        <TableHeader name="remarque" tooltip="Remarque sur le projet">
          Remarque
        </TableHeader>
        <TableHeader
          name="signed"
          tooltip="Le devis a-t-il été signé?"
          cellFormatter={signed => (signed ? 'Oui' : 'Non')}
        >
          Signé?
        </TableHeader>
        <TableHeader name="action" cellFormatter={renderAction}>Actions</TableHeader>
      </Table>
    </CardText>
    <CardActions border>
      <Button
        colored
        ripple
        onClick={() => {
          browserHistory.push('/devis/add');
          return false;
        }}
      >
        Ajouter un devis
      </Button>
    </CardActions>
  </Cell>
);

DevisList.propTypes = {
  devis: React.PropTypes.array.isRequired,
  renderAction: React.PropTypes.func.isRequired
};

export default DevisList;
