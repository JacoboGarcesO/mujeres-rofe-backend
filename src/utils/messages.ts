import { StringsUtils } from './strings';

export default {
  createSuccess: (entity: string) => `${StringsUtils.capitalize(entity)} was created successfully`,
  createFailure: (entity: string) => `${StringsUtils.capitalize(entity)} was not created`,
  authSuccess: 'Authentication was completed',
  authFailure: 'User credentials are incorrect',
  userNotFound: 'User not found',
  requestInvalid: 'Token invalid',
  tokenRequired: 'Token not provided',

};
