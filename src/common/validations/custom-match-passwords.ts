import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'CustomMatchPasswords', async: false })
export class CustomMatchPasswords implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    return password === (args.object as any)[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    return 'Passwords do not match!';
  }
}
