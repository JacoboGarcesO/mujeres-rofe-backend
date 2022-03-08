import { model, Schema, SchemaTypes } from 'mongoose';
import { mediaSchema } from './image.collection';

const linkSchema = new Schema({
  name: { type: String },
  url: { type: String },
});

const noticeSchema = new Schema({
  formId: { type: Schema.Types.ObjectId, ref: 'FormRequests', required: [true, 'FormId is required'] },
  title: { type: String, required: [true, 'Notice title is required'] },
  order: { type: String, required: [true, 'Notice order is required'] },
  channel: { type: String, required: [true, 'Notice channel is required'] },
  showUsersList: { type: Boolean, default: false },
  isLink: { type: Boolean, default: false },
  url: { type: String },
  description: { type: String },
  icon: mediaSchema,
  content: mediaSchema,
  form: SchemaTypes.ObjectId, ref: 'FormRequests',
  links: [linkSchema],
}, { collection: 'Notices' });

export default model('Notices', noticeSchema);
