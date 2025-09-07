import React from "react";
import styles from "./Menu.module.css";

const Menu = ({ onResetRole }) => {
  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuButton}>
        ☰ <span>▾</span>
      </div>
      <div className={styles.menuPanel}>
        <div className={styles.menuCaret}></div>
        <ul>
          <li onClick={onResetRole}>← 回到身份選擇</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
