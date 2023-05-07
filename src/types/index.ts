export type FormPropertyType = {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
};

export type FormValueType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ErrorType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
