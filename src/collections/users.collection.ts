import { model, Schema } from 'mongoose';
import { mediaSchema } from './image.collection';

const socialNetworkSchema = new Schema({
  name: { type: String },
  url: { type: String },
});

const locationSchema = new Schema({
  city: { type: String },
  state: { type: String },
});

const hobbieSchema = new Schema({
  name: { type: String },
});

const userSchema = new Schema({
  firstName: { type: String, required: [true, 'User firstName is required'] },
  lastName: { type: String, required: [true, 'User lastName is required'] },
  email: { type: String, required: [true, 'User email is required'], unique: true },
  password: { type: String, required: [true, 'User password is required'] },
  rol: { type: String, enum: ['admin', 'user'], required: [true, 'User rol is required'] },
  document: { type: String },
  phoneNumber: { type: String },
  description: { type: String },
  isPremium: { type: Boolean, default: false },
  image: mediaSchema,
  hobbies: [hobbieSchema],
  location: locationSchema,
  socialsNetworks: [socialNetworkSchema],
}, { collection: 'Users' });

export default model('Users', userSchema);
