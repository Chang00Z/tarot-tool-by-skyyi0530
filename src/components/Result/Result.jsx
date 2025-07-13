"use client";
import styles from "./Result.module.css";

export function Result({ cardSrc, cardName, cardMeaning, question }) {
  return (
    <div className={styles.cardArea}>
      <img src={cardSrc} alt="抽出的牌" />
      <p>{cardName}</p>
      {question && <div className={styles.userQuestionDisplay}>{question}</div>}
      <p>{cardMeaning}</p>
    </div>
  );
}
