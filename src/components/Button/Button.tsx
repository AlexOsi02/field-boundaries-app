import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

export interface IButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  variant?: "default" | "red";
  children: ReactNode;
}

const Button: FC<IButtonProps> = ({ onClick, disabled = false, active = false, variant = "default", children }) => {
  console.log("styles.active", styles.active);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(styles.button, {
        [styles.active]: active,
        [styles.red]: variant === "red",
      })}
    >
      {children}
    </button>
  );
};

export default Button;
