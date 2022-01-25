import { model, Schema } from 'mongoose';

const linkSchema = new Schema({
  name: { type: String },
  url: { type: String },
});

const contentSchema = new Schema({
  type: { type: String, enum: ['image', 'document'], required: [true, 'Content type icon is required'] },
  contentUrl: { type: String, required: [true, 'Content url is required'] },
});

const noticeSchema = new Schema({
  title: { type: String, required: [true, 'Notice title is required'] },
  description: { type: String, required: [true, 'Notice description is required'] },
  oder: { type: Number, required: [true, 'Notice order is required'] },
  icon: { type: Number, required: [true, 'Notice icon is required'] },
  content: contentSchema,
  links: [linkSchema],
}, { collection: 'Notices' });

export default model('Notices', noticeSchema);
