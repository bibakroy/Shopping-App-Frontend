import { FormValueType } from "../types";

export function validateField(
  name: string,
  value: string,
  formValue: FormValueType
) {
  switch (name) {
    case "name":
      if (!value.trim()) {
        return "Name is required";
      }
      break;

    case "email":
      if (!value.trim()) {
        return "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        return "Email is invalid";
      }
      break;

    case "password":
      if (!value.trim()) {
        return "Password is required";
      }
      break;

    case "confirmPassword":
      if (!value.trim()) {
        return "Confirm Password is required";
      } else if (value !== formValue.password) {
        return "Passwords do not match";
      }
      break;

    default:
      break;
  }

  return "";
}
