import { model, Schema } from 'mongoose';

const statesSchema = new Schema({
  code: { type: String },
  name: { type: String },
  _id: { type: Number },
}, { collection: 'States' });

export const stateModel =  model('States', statesSchema);
