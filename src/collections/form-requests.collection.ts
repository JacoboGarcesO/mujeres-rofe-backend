import { model, Schema } from 'mongoose';

const optionSchema = new Schema({
  label: { type: String },
});

const fieldSchema = new Schema({
  label: { type: String },
  placeholder: { type: String },
  type: { type: String, enum: ['image', 'text', 'list'] },
  options: [optionSchema],
});


const formRequestsSchema = new Schema({
  title: { type: String, required: [true, 'Foorm title is required'] },
  template: { type: String, required: [true, 'Foorm template is required'] },
  subject: { type: String, required: [true, 'Foorm subject is required'] },
  fields: [fieldSchema],
  channel: { type: String },
}, { collection: 'FormRequests' });

export default model('FormRequests', formRequestsSchema);
