import { useState } from "react";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import jwt_decode from "jwt-decode";

import styles from "../styles/Auth.module.css";
import InputContainer from "../components/InputContainer";
import { RegisterFormDataType, ErrorType, User } from "../types";
import { registerFormProperties } from "../utils/data";
import { validateField } from "../utils/helperFunctions";
import Button from "../components/Button";
import { notify } from "../index";
import { useUserContext } from "../contexts/UserProvider";

function Register() {
  const [formData, setFormData] = useState<RegisterFormDataType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setUser, setLoading } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "password" && formData.confirmPassword) {
      const passwordErrorMsg = validateField("password", value);
      const confirmPasswordErrorMsg = validateField(
        "confirmPassword",
        formData.confirmPassword,
        value
      );

      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordErrorMsg,
        confirmPassword: confirmPasswordErrorMsg,
      }));
    } else if (name === "confirmPassword" && formData.password) {
      const confirmPasswordErrorMsg = validateField(
        "confirmPassword",
        value,
        formData.password
      );

      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmPasswordErrorMsg,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    const errorMsg = validateField(name, value, formData.password);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = {} as ErrorType;

    for (const [name, value] of Object.entries(formData)) {
      const errorMsg = validateField(name, value, formData.password);
      if (errorMsg) {
        validationErrors[name as keyof ErrorType] = errorMsg;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true);
      const res = await axios.post("/auth/register", data);
      localStorage.setItem("token", res.data.token);
      notify("User has been created successfully!", "success");

      const decoded: User = jwt_decode(res.data.token);
      setUser((prevUser) => ({
        ...prevUser,
        userId: decoded.userId,
        name: decoded.name,
        email: decoded.email,
      }));
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        notify(error?.response?.data.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h3>Create Your Account</h3>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.formFields}>
            {registerFormProperties.map((formProperty, index) => (
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
          Already have an account?{" "}
          <span className={styles.redirectSpan}>
            <Link to={"/login"}> Log In</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
