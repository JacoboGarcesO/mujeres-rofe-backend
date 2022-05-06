import { StringsUtils } from './strings';

export default {
  createSuccess: (entity: string) => `${StringsUtils.capitalize(entity)} was created successfully`,
  createFailure: (entity: string) => `${StringsUtils.capitalize(entity)} was not created`,
  getAll: (entity: string) => `${StringsUtils.capitalize(entity)} were gotten`,
  getAllFailure: (entity: string) => `${StringsUtils.capitalize(entity)} were not gotten`,
  getById: (entity: string) => `${StringsUtils.capitalize(entity)} was gotten`,
  getByIdFailure: (entity: string) => `${StringsUtils.capitalize(entity)} was not gotten`,
  updateSuccess: (entity: string) => `${StringsUtils.capitalize(entity)} was updated successfully`,
  updateFailure: (entity: string) => `${StringsUtils.capitalize(entity)} was not updated`,
  deleteSuccess: (entity: string) => `${StringsUtils.capitalize(entity)} was deleted`,
  deleteFailure: (entity: string) => `${StringsUtils.capitalize(entity)} was not found`,
  emailDuplicate: 'No pudimos crear el usuario porque el correo ya está registrado',
  documentDuplicate: 'No pudimos crear el usuario porque el documento ya está registrado',
  authSuccess: 'Authentication was completed',
  authFailure: 'User credentials are incorrect',
  userNotFound: 'User not found',
  requestInvalid: 'Token invalid',
  tokenRequired: 'Token not provided',

};
