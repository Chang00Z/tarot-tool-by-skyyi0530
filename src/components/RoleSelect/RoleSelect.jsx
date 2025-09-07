import { Title } from "../Title/Title";
import styles from "./RoleSelect.module.css";

export default function RoleSelect({ onSelect }) {
  return (
    <>
      <Title>請選擇你的身份</Title>
      <div className={styles.buttonGroup}>
        <button onClick={() => onSelect("user")}>我是一般使用者</button>
        <button onClick={() => onSelect("reader")}>我是塔羅師</button>
      </div>
    </>
  );
}
