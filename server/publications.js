import { Meteor } from 'meteor/meteor';
import Projects from '../src/common/project/projectSchema';

Meteor.publish('projects', () => Projects.find({}));
