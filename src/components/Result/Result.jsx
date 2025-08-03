"use client";
import styles from "./Result.module.css";

export function Result({
  cardSrc,
  cardName,
  cardMeaning,
  isReversed,
  question,
}) {
  const position = isReversed ? "逆位" : "正位";
  return (
    <div className={styles.cardArea}>
      <img
        src={cardSrc}
        alt="抽出的牌"
        className={isReversed ? "rotate-180" : ""}
      />
      <p>{cardName}</p>
      {question && <div className={styles.userQuestionDisplay}>{question}</div>}
      <p>{cardMeaning}</p>
    </div>
  );
}
