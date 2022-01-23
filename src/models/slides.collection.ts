import { model, Schema } from 'mongoose';

const slideSchema = new Schema({
  title: { type: String, required: [true, 'Slide title is required'] },
  image: { type: String, required: [true, 'Slide image is required'] },
  url: { type: String, required: [true, 'Slide url is required'] },
}, { collection: 'Slides' });

export default model('Slides', slideSchema);