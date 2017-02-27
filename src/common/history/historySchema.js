import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const History = new Mongo.Collection('history');

History.schema = new SimpleSchema({
  user: { type: String, regEx: SimpleSchema.RegEx.Id },
  document: { type: String, allowedValues: ['user', 'contact', 'devis', 'facture', 'project', 'company'] },
  action: { type: String, allowedValues: ['create', 'edit', 'delete'] },
  date: { type: Date }
});

History.attachSchema(History.schema);

export default History;
