import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Factures = new Mongo.Collection('facture');

Factures.schema = new SimpleSchema({
  id: { type: String },
  idProject: { type: String, regEx: SimpleSchema.RegEx.Id },
  idDevis: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  price: { type: Number, decimal: true },
  sentDate: { type: Date, optional: true },
  payed: {
    type: String,
    defaultValue: 'false',
    allowedValues: ['true', 'false', 'annulé']
  },
  pricePayed: { type: Number, decimal: true, optional: true },
  delayTillPayed: { type: Number },
  remarque: { type: String, optional: true },
  payedDate: { type: Date, optional: true },
  creator: { type: String, regEx: SimpleSchema.RegEx.Id }
});

Factures.attachSchema(Factures.schema);

export default Factures;
