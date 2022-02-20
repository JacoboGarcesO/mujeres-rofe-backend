import { model, Schema } from 'mongoose';
import { mediaSchema } from './image.collection';

const linkSchema = new Schema({
  name: { type: String },
  url: { type: String },
});

const noticeSchema = new Schema({
  title: { type: String, required: [true, 'Notice title is required'] },
  description: { type: String, required: [true, 'Notice description is required'] },
  order: { type: String, required: [true, 'Notice order is required'] },
  channel: { type: String, required: [true, 'Notice channel is required'] },
  icon: mediaSchema,
  content: mediaSchema,
  links: [linkSchema],
}, { collection: 'Notices' });

export default model('Notices', noticeSchema);
