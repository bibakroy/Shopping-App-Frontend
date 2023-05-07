import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "../styles/Register.module.css";
import InputContainer from "../components/InputContainer";
import { FormValueType, ErrorType } from "../types";
import { registerFormProperties } from "../utils/data";
import { validateField } from "../utils/helperFunctions";

function Register() {
  const [formValue, setFormValue] = useState<FormValueType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorType>({});

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleBlur = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    const errorMsg = validateField(name, value, formValue);
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = {} as ErrorType;

    for (const [name, value] of Object.entries(formValue)) {
      const errorMsg = validateField(name, value, formValue);
      if (errorMsg) {
        validationErrors[name as keyof ErrorType] = errorMsg;
      }
    }

    if (Object.keys(validationErrors).length === 0) {
      console.log("Submitted");
      // axios
      //   .post("/api/users/register", formValue)
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h4>Create Your Account</h4>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {registerFormProperties.map((formProperty, index) => (
            <InputContainer
              key={index}
              formProperty={formProperty}
              formValue={formValue}
              errors={errors}
              handleChange={handleChange}
              handleBlur={handleBlur}
            ></InputContainer>
          ))}
          <button className={styles.button}>Create Account</button>
        </form>
        <p>
          Already have an account?
          <span>
            <Link to={"/login"}> Log In</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
