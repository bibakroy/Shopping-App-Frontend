import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "../styles/Auth.module.css";
import InputContainer from "../components/InputContainer";
import { LoginFormDataType, ErrorType } from "../types";
import { loginFormProperties } from "../utils/data";
import { validateField } from "../utils/helperFunctions";
import Button from "../components/Button";

function Login() {
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleBlur = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    const errorMsg = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = {} as ErrorType;

    for (const [name, value] of Object.entries(formData)) {
      const errorMsg = validateField(name, value);
      if (errorMsg) {
        validationErrors[name as keyof ErrorType] = errorMsg;
      }
    }

    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      // axios
      //   .post("/api/auth/login", formValue)
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h3>Log In to Your Account</h3>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.formFields}>
            {loginFormProperties.map((formProperty, index) => (
              <InputContainer
                key={index}
                formProperty={formProperty}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
              ></InputContainer>
            ))}
          </div>

          <Button onClick={() => console.log("Clicked")}>Login</Button>
        </form>
        <p>
          Don&apos;t have any account?{" "}
          <span className={styles.redirectSpan}>
            <Link to={"/register"}> Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
