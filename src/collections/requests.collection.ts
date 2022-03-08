import { model, Schema } from 'mongoose';

const fieldSchema = new Schema({
  label: { type: String },
  placeholder: { type: String },
  value: { type: String },
});

const requestsSchema = new Schema({
  formId: { type: Schema.Types.ObjectId, ref: 'FormRequests', required: [true, 'Foorm subject is required'] },
  title: { type: String, required: [true, 'Foorm title is required'] },
  template: { type: String, required: [true, 'Foorm template is required'] },
  subject: { type: String, required: [true, 'Foorm subject is required'] },
  fields: [fieldSchema],
}, { collection: 'Requests' });

export default model('Requests', requestsSchema);
