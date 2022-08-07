import { model, Schema } from 'mongoose';

const highlightedCitiesSchema = new Schema({
  _id: { type: Number },
  name: { type: String },
}, { collection: 'HighlightedCities' });

export default model('HighlightedCities', highlightedCitiesSchema);
