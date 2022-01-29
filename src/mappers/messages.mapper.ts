import { MessageModel } from '../models/message.model';

export class MessagesMapper {
  map(message: string): MessageModel {
    return { message };
  }
}
