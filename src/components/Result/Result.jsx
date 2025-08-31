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
    <section className={styles.cardArea} aria-labelledby="card-title">
      <img
        src={cardSrc}
        alt={`抽出的牌：${cardName}${isReversed ? "（逆位）" : ""}`}
        className={isReversed ? "rotate-180" : ""}
      />
      <h2 id="card-title">{cardName}</h2>
      <p>{cardMeaning}</p>
      {question && <div className={styles.userQuestionDisplay}>{question}</div>}
      <AiExplain
        cardName={cardName}
        cardMeaning={cardMeaning}
        isReversed={isReversed}
        question={question}
      />
    </section>
  );
}
