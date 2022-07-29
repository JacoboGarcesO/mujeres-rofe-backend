import { IMessage } from '../models/message.model';

export class MessagesMapper {
  map(message: string): IMessage {
    return { message };
  }
}
