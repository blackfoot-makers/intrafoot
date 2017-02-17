import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Devis = new Mongo.Collection('devis');

Devis.schema = new SimpleSchema({
  id: { type: String },
  idProject: { type: String, regEx: SimpleSchema.RegEx.Id },
  price: { type: Number, decimal: true },
  signature: { type: Date, optional: true },
  status: { type: String, defaultValue: 'accepté', allowedValues: ['abandon', 'accepté', 'stand by', 'terminé'] },
  remarque: { type: String, optional: true },
  creator: { type: String, regEx: SimpleSchema.RegEx.Id },
  signed: { type: Boolean, defaultValue: false }
});

Devis.attachSchema(Devis.schema);

export default Devis;
