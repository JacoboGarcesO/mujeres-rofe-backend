import { StringsUtils } from './strings';

export default {
  createSuccess: (entity: string) => `${StringsUtils.capitalize(entity)} was created successfully`,
  createFailure: (entity: string) => `${StringsUtils.capitalize(entity)} was not created`,
  getAll: (entity: string) => `${StringsUtils.capitalize(entity)} were gotten`,
  getAllFailure: (entity: string) => `${StringsUtils.capitalize(entity)} were not gotten`,
  authSuccess: 'Authentication was completed',
  authFailure: 'User credentials are incorrect',
  requestInvalid: 'Request invalid. Token not provided',
};
