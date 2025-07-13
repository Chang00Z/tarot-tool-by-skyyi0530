import styles from "./Result.module.css";

export function Result() {
  return (
    <div className={styles.cardArea}>
      <p>點擊下方按鈕抽牌</p>
      <img
        src="https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg"
        alt="抽出的牌"
      />
      <p>愚者</p>
      <div className={styles.userQuestionDisplay}>最近工作運勢</div>
      <p>新的開始，自由，冒險</p>
    </div>
  );
}
