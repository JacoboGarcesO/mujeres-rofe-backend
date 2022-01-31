import { Schema } from 'mongoose';

export const imageSchema = new Schema({
  _id: { type: String },
  imageUrl: { type: String },
});
