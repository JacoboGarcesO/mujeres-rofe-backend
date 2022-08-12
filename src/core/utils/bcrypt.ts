import bcrypt from 'bcrypt';

export const encryptPassword = (firstName: string, lastName: string, document: string): string => {
  const password = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toLowerCase()}${document}`;
  const BCRYPT_SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, BCRYPT_SALT);
};

export const comparePasswords = (enterPassword: string, dbPassword: string): boolean => {
  return bcrypt.compareSync(enterPassword, dbPassword);
};
