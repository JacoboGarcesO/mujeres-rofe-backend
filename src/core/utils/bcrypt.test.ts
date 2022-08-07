import { encryptPassword, comparePasswords } from './bcrypt';

describe('Bcrypt utils', () => {
  test('Should return password encrypted', () => {
    const encryptedPassword = encryptPassword('Bb1000776086');
    expect(encryptedPassword.substring(0, 7)).toBe('$2b$10$');
  });

  test('Should return truthy if password is correct', () => {
    const password = 'Bb1000776086';
    const encryptedPassword = encryptPassword(password);
    const isEqual = comparePasswords(password, encryptedPassword);
    expect(isEqual).toBeTruthy();
  });

  test('Should return falsy if password is incorrect', () => {
    const incorrectPassword = 'Bb1000773333';
    const encryptedPassword = encryptPassword('Bb1000776086');
    const isEqual = comparePasswords(incorrectPassword, encryptedPassword);
    expect(isEqual).toBeFalsy();
  });
});
