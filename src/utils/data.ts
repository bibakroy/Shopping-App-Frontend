import { FormPropertyType } from "../types";

export const registerFormProperties: FormPropertyType[] = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter Your Name",
    type: "text",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter Your Email",
    type: "email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter Your Password",
    type: "password",
    required: true,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Retype Password",
    type: "password",
    required: true,
  },
];

export const loginFormProperties: FormPropertyType[] = [
  {
    label: "Email",
    name: "email",
    placeholder: "Enter Your Email",
    type: "email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter Your Password",
    type: "password",
    required: true,
  },
];
