import { Meteor } from 'meteor/meteor';
import Projects from '../src/common/project/projectSchema';
import Devis from '../src/common/devis/devisSchema';
import Factures from '../src/common/facture/factureSchema';
import Users from '../src/common/users/usersSchema';
import Companies from '../src/common/users/companySchema';
import History from '../src/common/history/historySchema';
import Prestas from '../src/common/presta/prestaSchema';
import Virtucompte from '../src/common/virtucompte/virtucompteSchema';

Meteor.publish('projects', () => Projects.find({}));
Meteor.publish('devis', () => Devis.find({}));
Meteor.publish('factures', () => Factures.find({}));
Meteor.publish('users', () => Users.find({}));
Meteor.publish('companies', () => Companies.find({}));
Meteor.publish('history', () => History.find({}));
Meteor.publish('presta', () => Prestas.find({}));
Meteor.publish('virtucompte', () => Virtucompte.find({}));
