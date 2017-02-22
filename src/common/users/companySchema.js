import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Companies = new Mongo.Collection('company');

Companies.schema = new SimpleSchema({
  name: { type: String },
  address: { type: String, optional: true },
  email: { type: String, regEx: SimpleSchema.RegEx.Email, optional: true },
  site: { type: String, optional: true }
});

Companies.attachSchema(Companies.schema);

export default Companies;
