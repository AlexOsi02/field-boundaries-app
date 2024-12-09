import styles from "./Header.module.scss";

const PROJECT_NAME = "React app";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{PROJECT_NAME}</h1>
    </header>
  );
};
