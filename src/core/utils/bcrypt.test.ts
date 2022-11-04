import { encryptPassword, comparePasswords } from './bcrypt';

describe('Bcrypt utils', () => {
  test('Should return password encrypted', () => {
    const encryptedPassword = encryptPassword('Jacobo', 'Garces', '1000747248');
    expect(encryptedPassword.substring(0, 7)).toBe('$2b$10$');
  });

  test('Should return truthy if password is correct', () => {
    const password = 'Jacobo';
    const encryptedPassword = encryptPassword(password, '', '');
    const isEqual = comparePasswords(password, encryptedPassword);
    expect(isEqual).toBeTruthy();
  });

  test('Should return falsy if password is incorrect', () => {
    const incorrectPassword = 'Bb1000773333';
    const encryptedPassword = encryptPassword('Jacobo', 'Garces', '1000747248');
    const isEqual = comparePasswords(incorrectPassword, encryptedPassword);
    expect(isEqual).toBeFalsy();
  });
});
