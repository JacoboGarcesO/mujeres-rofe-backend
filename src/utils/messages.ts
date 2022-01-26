import { StringsUtils } from './strings';

export default {
  createSuccess: (entity: string) => `${StringsUtils.capitalize(entity)} was created successfully`,
  createFailure: (entity: string) => `${StringsUtils.capitalize(entity)} was not created`,
  authSuccess: 'Authentication was completed',
  authFailure: 'User credentials are incorrect',
  requestInvalid: 'Request invalid. Token not provided',
};
