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
  authSuccess: 'Authentication was completed',
  authFailure: 'User credentials are incorrect',
  userNotFound: 'User not found',
  requestInvalid: 'Token invalid',
  tokenRequired: 'Token not provided',

};
