import { model, Schema } from 'mongoose';
import { mediaSchema } from './image.collection';

const linkSchema = new Schema({
  name: { type: String },
  url: { type: String },
});

const noticeSchema = new Schema({
  title: { type: String, required: [true, 'Notice title is required'] },
  order: { type: String, required: [true, 'Notice order is required'] },
  channel: { type: String, required: [true, 'Notice channel is required'] },
  showUsersList: { type: Boolean, default: false },
  isLink: { type: Boolean, default: false },
  url: { type: String },
  formId: { type: Schema.Types.ObjectId, ref: 'FormRequests' },
  description: { type: String },
  icon: mediaSchema,
  content: mediaSchema,
  links: [linkSchema],
}, { collection: 'Notices' });

export default model('Notices', noticeSchema);
