import styles from "../styles/InputContainer.module.css";
import { FormPropertyType, ErrorType } from "../types";

type InputContainerType = {
  formProperty: FormPropertyType;
  errors: ErrorType;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
};

function InputContainer({
  formProperty,
  errors,
  handleChange,
  handleBlur,
}: InputContainerType) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="name" className={styles.label}>
        {formProperty.label} {formProperty.required ? "*" : ""}
      </label>
      <input
        className={`${styles.input} ${
          errors[formProperty.name as keyof ErrorType] ? styles.border : ""
        }`}
        type="text"
        name={formProperty.name}
        required={formProperty.required}
        placeholder={formProperty.placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p className={styles.error}>
        {errors[formProperty.name as keyof ErrorType]}
      </p>
    </div>
  );
}

export default InputContainer;
