import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import jwt_decode from "jwt-decode";

import styles from "../styles/Auth.module.css";
import axios from "../utils/axios";
import InputContainer from "../components/InputContainer";
import { LoginFormDataType, ErrorType, UserType } from "../types";
import { loginFormProperties } from "../utils/data";
import { validateField } from "../utils/helperFunctions";
import Button from "../components/Button";
import { notify } from "../index";
import { useUserContext } from "../contexts/UserProvider";

function Login() {
  const [formData, setFormData] = useState<LoginFormDataType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorType>({
    email: "",
    password: "",
  });

  const { setUser, setLoading } = useUserContext();
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = {} as ErrorType;

    for (const [name, value] of Object.entries(formData)) {
      const errorMsg = validateField(name, value);
      if (errorMsg) {
        validationErrors[name as keyof ErrorType] = errorMsg;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      const decoded: UserType = jwt_decode(res.data.token);
      setUser((prevUser) => ({
        ...prevUser,
        userId: decoded.userId,
        name: decoded.name,
        email: decoded.email,
      }));

      notify("Logged in successfully!", "success");
      navigate("/");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email or password",
          password: "Invalid email or password",
        }));
        notify(error?.response?.data.message, "error");
      }
    } finally {
      setLoading(false);
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
