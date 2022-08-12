import { cdn } from '../../../core/config/cloudinary';
import { IResponse } from '../../../core/interfaces/response.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { messages } from '../../../core/utils/messages';
import { ResponseMapper } from '../../mappers/response.mapper';
import { UserMapper } from '../../mappers/user.mapper';
import { UserRepository } from '../../repositories/user.repository';

export class UpdateUserUseCase {
  private repository: UserRepository;
  private userMapper: UserMapper;
  private responseMapper: ResponseMapper<IUser>;

  constructor(
    repository: UserRepository,
    userMapper: UserMapper,
    responseMapper: ResponseMapper<IUser>,
  ) {
    this.repository = repository;
    this.userMapper = userMapper;
    this.responseMapper = responseMapper;
  }

  public async execute(data: any, media: any): Promise<IResponse<IUser>> {
    let image;
    let documentImage;

    if (media.image) {
      if (data.image?._id) {
        await cdn.destroy(data?.image._id);
      }

      image = await cdn.upload(media.image?.[0]?.path);
    }

    if (media.documentImage) {
      if (data.documentImage?._id) {
        await cdn.destroy(data.documentImage?._id);
      }

      documentImage = await cdn.upload(media.documentImage?.[0]?.path);
    }

    const user = this.userMapper.toUser(data, image, documentImage);
    const userUpdated = await this.repository.updateUser(user);
    return this.responseMapper.toResponse(userUpdated, messages.updateSuccess('channel'));
  }
}
