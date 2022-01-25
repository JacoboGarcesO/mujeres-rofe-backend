import { model, Schema } from 'mongoose';

const channelSchema = new Schema({
  name: { type: String, required: [true, 'Channel name is required'] },
  description: { type: String, required: [true, 'Channel description is required'] },
  icon: { type: String, required: [true, 'Channel icon is required'] },
  banner: { type: String, required: [true, 'Channel banner is required'] },
  order: { type: Number, required: [true, 'Channel icon is required'] },
}, { collection: 'Channels' });

export default model('Channels', channelSchema);
