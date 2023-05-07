import styles from "../styles/InputContainer.module.css";
import { FormPropertyType, FormValueType, ErrorType } from "../types";

type InputContainerType = {
  formProperty: FormPropertyType;
  formValue: FormValueType;
  errors: ErrorType;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
};

function InputContainer({
  formProperty,
  formValue,
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
        type="text"
        name={formProperty.name}
        required={formProperty.required}
        className={styles.input}
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
