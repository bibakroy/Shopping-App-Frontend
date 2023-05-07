export function validateField(name: string, value: string, password?: string) {
  switch (name) {
    case "name":
      if (!value.trim()) {
        return "Name is required";
      }
      break;

    case "email":
      if (!value.trim()) {
        return "Email is required";
      } else if (!isValidEmail(value)) {
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
      } else if (value !== password) {
        return "Passwords do not match";
      }
      break;

    default:
      break;
  }

  return "";
}

const isValidEmail = (email: string) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};
