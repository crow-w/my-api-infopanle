import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsHyphenDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsHyphenDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `$property must be a valid date (Required format: YYYY-MM-DD)`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
}
