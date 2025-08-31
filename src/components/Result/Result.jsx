"use client";
import { AiExplain } from "@/AiExplain/AiExplain";
import styles from "./Result.module.css";

export function Result({
  cardSrc,
  cardName,
  cardMeaning,
  isReversed,
  question,
}) {
  return (
    <div className={styles.cardArea}>
      <img
        src={cardSrc}
        alt="抽出的牌"
        className={isReversed ? "rotate-180" : ""}
      />
      <p>{cardName}</p>
      <p>{cardMeaning}</p>
      {question && <div className={styles.userQuestionDisplay}>{question}</div>}
      <AiExplain
        cardName={cardName}
        cardMeaning={cardMeaning}
        isReversed={isReversed}
        question={question}
      />
    </div>
  );
}
