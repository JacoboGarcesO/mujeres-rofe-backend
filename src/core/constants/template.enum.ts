export enum TemplateEnum {
  forgotPassword = 'forgotPassword',
  register = 'register',
  request = 'request',
}

export const toTemplateEnum = (key: string): TemplateEnum => {
  const options = new Map();
  options.set('forgotPassword', TemplateEnum.forgotPassword);
  options.set('register', TemplateEnum.register);
  options.set('request', TemplateEnum.request);

  return options.get(key.toString().toLowerCase());
};

export const fromTemplateEnum = (key: TemplateEnum): string => {
  const options = new Map();
  options.set(TemplateEnum.forgotPassword, 'forgotPassword');
  options.set(TemplateEnum.register, 'register');
  options.set(TemplateEnum.request, 'request');

  return options.get(key);
};
