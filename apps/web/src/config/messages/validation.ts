import type { ValidationRule } from 'react-hook-form';

type Validations = {
  required: string | ValidationRule<boolean>;
  max: (max: number) => ValidationRule<number | string>;
  min: (min: number) => ValidationRule<number | string>;
  maxLength: (max: number) => ValidationRule<number | string>;
  minLength: (min: number) => ValidationRule<number | string>;
  pattern: (pattern: RegExp) => ValidationRule<RegExp>;
  email: ValidationRule<RegExp>;
};

export const validations: Validations = {
  required: 'Required',
  max: (max: number) => {
    return {
      value: max,
      message: `Please enter a value less than or equal to ${max}`,
    };
  },
  min: (min: number) => {
    return {
      value: min,
      message: `Please enter a value greater than or equal to ${min}`,
    };
  },
  maxLength: (max: number) => {
    return {
      value: max,
      message: `Please enter a value less than or equal to ${max} characters`,
    };
  },
  minLength: (min: number) => {
    return {
      value: min,
      message: `Please enter a value greater than or equal to ${min} characters`,
    };
  },
  pattern: (pattern: RegExp) => {
    return {
      value: pattern,
      message: 'Please enter a valid value',
    };
  },
  email: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: 'Please enter a valid email address',
  },
};
