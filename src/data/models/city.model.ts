import { model, Schema } from 'mongoose';

const citiesSchema = new Schema({
  _id: { type: Number },
  name: { type: String },
  stateId: { type: Number, ref: 'States' },
}, { collection: 'Cities' });

export const cityModel =  model('Cities', citiesSchema);
