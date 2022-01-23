import { model, Schema } from 'mongoose';

const socialNetworkSchema = new Schema({
	name: { type: String },
	url: { type: String },
});

const locationSchema = new Schema({
	city: { type: String },
	departament: { type: String },
});

const hobbieSchema = new Schema({
	name: { type: String },
});

const userSchema = new Schema({
  firstName: { type: String, required: [true, 'User firstName is required'] },
  lastName: { type: String, required: [true, 'User lastName is required'] },
  email: { type: String, required: [true, 'User email is required'], unique: true, },
  password: { type: String, required: [true, 'User password is required'] },
  rol: { type: String, required: [true, 'User rol is required'] },
  document: { type: String },
  phoneNumber: { type: Number },
  description: { type: String },
  photo: { type: String },
  hobbies: [hobbieSchema],
  location: locationSchema,
  socialsNetworks: [socialNetworkSchema],
}, { collection: 'Users' });

export default model('Users', userSchema);