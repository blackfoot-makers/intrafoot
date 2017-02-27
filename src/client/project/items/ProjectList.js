import React from 'react';
import { browserHistory } from 'react-router';
import { Table, TableHeader, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import moment from 'moment';

const ProjectList = ({ projects, renderAction, ...otherProps }) => (
  <Cell col={12} component={Card} shadow={0}>
    <CardTitle>
      Projets
    </CardTitle>
    <CardText>
      <Table
        sortable
        rowKeyColumn="id"
        shadow={0}
        rows={projects}
        {...otherProps}
      >
        <TableHeader name="id" tooltip="Identifiant du projet">
          Identifiant
        </TableHeader>
        <TableHeader name="name" tooltip="Nom du projet">
          Nom
        </TableHeader>
        <TableHeader name="description" tooltip="Description du projet">
          Description
        </TableHeader>
        <TableHeader name="company" tooltip="Entreprise pour qui le projet est fait">
          Entreprise
        </TableHeader>
        <TableHeader
          name="signature"
          tooltip="Date de signature du projet"
          cellFormatter={date => date && moment(date).format('LL')}
        >
          Signature
        </TableHeader>
        <TableHeader name="status" tooltip="Statut du projet">
          Statut
        </TableHeader>
        <TableHeader name="remarque" tooltip="Remarque sur le projet">
          Remarque
        </TableHeader>
        <TableHeader name="participants" tooltip="Participants au projet">
          Participants
        </TableHeader>
        <TableHeader
          name="nda"
          tooltip="Le projet est il sous NDA?"
          cellFormatter={nda => (nda ? 'Oui' : 'Non')}
        >
          NDA
        </TableHeader>
        <TableHeader name="action" cellFormatter={renderAction}>Actions</TableHeader>
      </Table>
    </CardText>
    <CardActions border>
      <Button
        colored
        ripple
        onClick={() => {
          browserHistory.push('/project/add');
          return false;
        }}
      >
        Ajouter un projet
      </Button>
    </CardActions>
  </Cell>
);

ProjectList.propTypes = {
  projects: React.PropTypes.array.isRequired,
  renderAction: React.PropTypes.func.isRequired
};

export default ProjectList;
