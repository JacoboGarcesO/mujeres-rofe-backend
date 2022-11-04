import { messages } from './messages';

describe('Messages utils', () => {
  test('Should return creation successfully message', () => {
    const text = messages.createSuccess('User');
    expect(text).toBe('User was created successfully');
  });

  test('Should return creation failure message', () => {
    const text = messages.createFailure('User');
    expect(text).toBe('User was not created');
  });

  test('Should return gotten all successfully message', () => {
    const text = messages.getAll('Users');
    expect(text).toBe('Users were gotten');
  });

  test('Should return gotten all failure message', () => {
    const text = messages.getAllFailure('Users');
    expect(text).toBe('Users were not gotten');
  });

  test('Should return gotten by id successfully message', () => {
    const text = messages.getById('User');
    expect(text).toBe('User was gotten');
  });

  test('Should return gotten by id failure message', () => {
    const text = messages.getByIdFailure('User');
    expect(text).toBe('User was not gotten');
  });

  test('Should return update successfully message', () => {
    const text = messages.updateSuccess('User');
    expect(text).toBe('User was updated successfully');
  });

  test('Should return update failure message', () => {
    const text = messages.updateFailure('User');
    expect(text).toBe('User was not updated');
  });

  test('Should return delete successfully message', () => {
    const text = messages.deleteSuccess('User');
    expect(text).toBe('User was deleted');
  });

  test('Should return delete failure message', () => {
    const text = messages.deleteFailure('User');
    expect(text).toBe('User was not found or internal server error');
  });

  test('Should return message without entity {empty string}', () => {
    const text = messages.deleteFailure('');
    expect(text).toBe(' was not found or internal server error');
  });

  test('Should return message without entity {null}', () => {
    const text = messages.deleteFailure(null as unknown as string);
    expect(text).toBe(' was not found or internal server error');
  });
});
