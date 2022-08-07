import { StringsUtils } from './strings';

describe('String utils', () => {
  test('Should return text capitalized {string lowercase}', () => {
    const text = 'text capitalized';
    const textCapitalized = StringsUtils.capitalize(text);
    expect(textCapitalized).toBe('Text capitalized');
  });

  test('Should return text capitalized {string uppercase}', () => {
    const text = 'TEXT CAPITALIZED';
    const textCapitalized = StringsUtils.capitalize(text);
    expect(textCapitalized).toBe('Text capitalized');
  });

  test('Should return empty string {empty string}', () => {
    const text = '';
    const textCapitalized = StringsUtils.capitalize(text);
    expect(textCapitalized).toBe('');
  });

  test('Should return empty string {null}', () => {
    const text = null as unknown as string;
    const textCapitalized = StringsUtils.capitalize(text);
    expect(textCapitalized).toBe('');
  });
});
