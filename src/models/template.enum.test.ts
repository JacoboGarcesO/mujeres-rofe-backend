import { fromTemplateEnum, TemplateEnum, toTemplateEnum } from './template.enum';

describe('Template enum', () => {
  test('Should convert string to TemplateEnum', () => {
    const template = toTemplateEnum('register');
    expect(template).toBe(TemplateEnum.register);
  });

  test('Should convert TemplateEnum to string', () => {
    const template = fromTemplateEnum(TemplateEnum.register);
    expect(template).toBe('register');
  });
});
