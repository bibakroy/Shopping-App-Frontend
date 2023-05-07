import { LoginFormDataType, RegisterFormDataType } from "../types";

export function validateField(
  name: string,
  value: string,
  formData: RegisterFormDataType | LoginFormDataType
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
      } else if (value.length < 6) {
        return "Password must be at least 6 characters";
      }
      break;

    case "confirmPassword":
      if (!value.trim()) {
        return "Confirm Password is required";
      } else if (value.length < 6) {
        return "Password must be at least 6 characters";
      } else if (value !== formData.password) {
        return "Passwords do not match";
      }
      break;

    default:
      break;
  }

  return "";
}
