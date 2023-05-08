export type FormPropertyType = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required: boolean;
};

export type RegisterFormDataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormDataType = {
  email: string;
  password: string;
};

export type ErrorType = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type User = {
  userId: string;
  name: string;
  email: string;
};
