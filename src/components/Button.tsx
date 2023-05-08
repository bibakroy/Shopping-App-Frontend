import styles from "../styles/Button.module.css";

function Button({
  children,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  [rest: string]: any;
}) {
  return (
    <button className={styles.button} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
