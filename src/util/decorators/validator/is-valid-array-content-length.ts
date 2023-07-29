import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidArrayContentLength(
  max: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidArrayContentLength',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `content length is invalid`,
        ...validationOptions,
      },
      validator: {
        validate(value: any[]) {
          return value.every((v) => {
            return v ? v.length <= max : true;
          });
        },
      },
    });
  };
}
