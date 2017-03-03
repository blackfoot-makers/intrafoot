import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Prestas = new Mongo.Collection('presta');

Prestas.schema = new SimpleSchema({
  idContact: { type: String, regEx: SimpleSchema.RegEx.Id },
  company: { type: String, regEx: SimpleSchema.RegEx.Id },
  prestation: { type: String },
  price: { type: Number, decimal: true },
  facturation: { type: Date, optional: true },
  accompte: { type: Number, decimal: true, defaultValue: 0 },
  payedDate: { type: Date, optional: true },
  remarque: { type: String, optional: true },
  creator: { type: String, regEx: SimpleSchema.RegEx.Id },
  payed: { type: Boolean, defaultValue: false }
});

Prestas.attachSchema(Prestas.schema);

export default Prestas;
