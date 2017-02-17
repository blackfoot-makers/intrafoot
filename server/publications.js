import { Meteor } from 'meteor/meteor';
import Projects from '../src/common/project/projectSchema';
import Devis from '../src/common/devis/devisSchema';

Meteor.publish('projects', () => Projects.find({}));
Meteor.publish('devis', () => Devis.find({}));
