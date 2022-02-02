import { model, Schema } from 'mongoose';
import { mediaSchema } from './image.collection';

const channelSchema = new Schema({
  name: { type: String, required: [true, 'Channel name is required'] },
  description: { type: String, required: [true, 'Channel description is required'] },
  icon: mediaSchema,
  banner: mediaSchema,
  order: { type: Number, required: [true, 'Channel icon is required'] },
}, { collection: 'Channels' });

export default model('Channels', channelSchema);
