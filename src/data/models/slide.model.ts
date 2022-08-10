import { model, Schema } from 'mongoose';
import { mediaSchema } from './image.model';

const slideSchema = new Schema({
  title: { type: String, required: [true, 'Slide title is required'] },
  image: mediaSchema,
  url: { type: String, required: [true, 'Slide url is required'] },
}, { collection: 'Slides' });

export const slideModel = model('Slides', slideSchema);
