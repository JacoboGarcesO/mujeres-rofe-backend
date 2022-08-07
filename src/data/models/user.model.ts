import { model, Schema } from 'mongoose';
import { mediaSchema } from './image.model';

const socialNetworkSchema = new Schema({
  name: { type: String },
  url: { type: String },
});

const locationSchema = new Schema({
  city: { type: String },
  state: { type: String },
  cityName: { type: String },
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
  documentNumber: { type: String, required: [true, 'User document is required'], unique: true },
  isPremium: { type: Boolean, default: false },
  phoneNumber: { type: String },
  description: { type: String },
  documentType: { type: String, enum: ['cc', 'ce'], required: [true, 'User document type is required'] },
  maritalStatus: { type: String },
  address: { type: String },
  age: { type: String },
  familyCore: { type: String },
  familyIncome: { type: String },
  housingType: { type: String },
  education: { type: String },
  stratum: { type: String },
  promocionalCode: { type: String },
  disclosure: { type: String },
  ethnicGroup: [hobbieSchema],
  sustaining: [hobbieSchema],
  documentImage: mediaSchema,
  image: mediaSchema,
  hobbies: [hobbieSchema],
  location: locationSchema,
  socialsNetworks: [socialNetworkSchema],
  creationDate: { type: Date, default: new Date() },
  hasAcceptTermsAndConditions: { type: Boolean },
}, { collection: 'Users' });

export default model('Users', userSchema);
