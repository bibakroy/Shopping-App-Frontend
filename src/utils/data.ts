import { FormPropertyType } from "../types";

export const registerFormProperties: FormPropertyType[] = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter Your Name",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter Your Email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter Your Password",
    required: true,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Retype Password",
    required: true,
  },
];

export const loginFormProperties: FormPropertyType[] = [
  {
    label: "Email",
    name: "email",
    placeholder: "Enter Your Email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter Your Password",
    required: true,
  },
];
