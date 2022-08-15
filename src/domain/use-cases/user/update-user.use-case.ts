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
    const imageEncoded = JSON.parse(data.imageEncoded);
    const documentImageEncoded = JSON.parse(data.documentImageEncoded);
  
    let image;
    let documentImage;

    if (media.image) {
      if (imageEncoded?._id) {
        await cdn.destroy(imageEncoded._id);
      }

      image = await cdn.upload(media.image?.[0]?.path);
    }

    if (media.documentImage) {
      if (documentImageEncoded?._id) {
        await cdn.destroy(documentImageEncoded?._id);
      }

      documentImage = await cdn.upload(media.documentImage?.[0]?.path);
    }

    const user = this.userMapper.toUser(data, image, documentImage);
    const userUpdated = await this.repository.updateUser(user);
    return this.responseMapper.toResponse(userUpdated, messages.updateSuccess('channel'));
  }
}
