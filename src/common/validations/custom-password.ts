import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'CustomPassword', async: false })
export class CustomPassword implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    //if password contains small letter, capital letter, number and special character
    return new RegExp(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
      'g',
    ).test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Passwords must contain at least one small letter, capital letter, number and special character!';
  }
}
