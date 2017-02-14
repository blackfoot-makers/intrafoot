import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Projects = new Mongo.Collection('project');

Projects.schema = new SimpleSchema({
  id: { type: String, regEx: SimpleSchema.RegEx.Id },
  name: { type: String },
  description: { type: String },
  company: { type: String },
  signature: { type: Date, optional: true },
  status: { type: String, defaultValue: 'en cours', allowedValues: ['abandon', 'en cours', 'stand by', 'terminé'] },
  remarque: { type: String, optional: true },
  participants: { type: [String], regEx: SimpleSchema.RegEx.Id, optional: true },
  nda: { type: Boolean, defaultValue: false }
});

Projects.attachSchema(Projects.schema);

export default Projects;
