import { IMessage } from '../../core/interfaces/message.interface';

export class MessagesMapper {
  map(message: string): IMessage {
    return { message };
  }
}
