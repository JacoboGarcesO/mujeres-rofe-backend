import { model, Schema } from 'mongoose';
import { mediaSchema } from './image.model';

const fieldSchema = new Schema({
  label: { type: String },
  placeholder: { type: String },
  value: { type: String },
  type: { type: String, enum: ['image', 'text', 'list'] },
  image: mediaSchema,
});

const requestsSchema = new Schema({
  formId: { type: Schema.Types.ObjectId, ref: 'FormRequests', required: [true, 'FormId is required'] },
  title: { type: String, required: [true, 'Form title is required'] },
  template: { type: String, required: [true, 'Form template is required'] },
  subject: { type: String, required: [true, 'Form subject is required'] },
  creationDate: { type: Date, default: new Date() },
  channel: { type: String },
  fields: [fieldSchema],
}, { collection: 'Requests' });

export default model('Requests', requestsSchema);
