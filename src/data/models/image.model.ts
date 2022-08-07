import { Schema } from 'mongoose';

export const mediaSchema = new Schema({
  _id: { type: String },
  url: { type: String },
  type: { type: String },
});
