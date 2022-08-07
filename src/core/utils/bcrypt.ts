import bcrypt from 'bcrypt';

export const encryptPassword = (password: string): string => {
  const BCRYPT_SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, BCRYPT_SALT);
};

export const comparePasswords = (enterPassword: string, dbPassword: string): boolean => {
  return bcrypt.compareSync(enterPassword, dbPassword);
};
