import { model, Schema } from 'mongoose';
import { mediaSchema } from './image.collection';

const channelSchema = new Schema({
  name: { type: String, required: [true, 'Channel name is required'] },
  description: { type: String },
  icon: mediaSchema,
  banner: mediaSchema,
  type: { type: String, required: [true, 'Channel type is required'] },
  link: { type: String },
  order: { type: Number, required: [true, 'Channel order is required'] },
}, { collection: 'Channels' });

export default model('Channels', channelSchema);
