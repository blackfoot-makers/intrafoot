import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Virtucomptes = new Mongo.Collection('virtucompte');

Virtucomptes.schema = new SimpleSchema({
  id: { type: String },
  idFacture: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  amount: { type: Number, decimal: true },
  date: { type: Date },
  type: {
    type: String,
    allowedValues: ['in', 'out']
  },
  remarque: { type: String, optional: true },
  account: {
    type: String,
    allowedValues: [
      'in',
      'presta',
      'salaire',
      'tva',
      'materiel',
      'cnoire',
      'mixtes',
      'benef'
    ]
  },
  creator: { type: String, regEx: SimpleSchema.RegEx.Id }
});

Virtucomptes.attachSchema(Virtucomptes.schema);

export default Virtucomptes;
