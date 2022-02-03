import { model, Schema } from 'mongoose';

const citiesSchema = new Schema({
  name: { type: String },
  stateId: { type: Number, ref: 'States' },
}, { collection: 'Cities' });

export default model('Cities', citiesSchema);
