import styles from "../styles/Input.module.css";

function Input({
  placeholder,
  value,
  type = "text",
  onChange,
  ...rest
}: {
  placeholder: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [rest: string]: any;
}) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
      className={styles.input}
    ></input>
  );
}

export default Input;
