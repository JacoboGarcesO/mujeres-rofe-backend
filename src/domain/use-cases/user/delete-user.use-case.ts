import { cdn } from '../../../core/config/cloudinary';
import { IResponse } from '../../../core/interfaces/response.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { UserRepository } from '../../repositories/user.repository';

export class DeleteUserUseCase {
  private repository: UserRepository;
  private responseMapper: ResponseMapper<IUser>;

  constructor(
    repository: UserRepository,
    responseMapper: ResponseMapper<IUser>,
  ) {
    this.repository = repository;
    this.responseMapper = responseMapper;
  }

  public async execute(userId: string): Promise<IResponse<IUser>> {
    const user = await this.repository.deleteUser(userId);

    if (!user) {
      return this.responseMapper.toResponse(null, messages.deleteFailure('user'));
    }

    await cdn.destroy(user?.image?._id);
    await cdn.destroy(user?.documentImage?._id);
    return this.responseMapper.toResponse(user, messages.deleteSuccess('user'));
  }
}
