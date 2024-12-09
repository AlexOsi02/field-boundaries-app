import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";

export interface IInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input: FC<IInputProps> = (props) => {
  return <input {...props} className={classNames(styles.input, props.className)} />;
};
