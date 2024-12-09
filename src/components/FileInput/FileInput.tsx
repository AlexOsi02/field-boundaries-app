import { ChangeEvent, FC } from "react";
import styles from "./FileInput.module.scss";

export interface IFileInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput: FC<IFileInputProps> = ({ onChange }) => {
  return (
    <label className={styles.fileInput}>
      Загрузить контур
      <input type="file" accept=".json" onChange={onChange} />
    </label>
  );
};
