"use client";
import { useEffect, useState } from "react";
import styles from "./Result.module.css";

export function Result({
  cardSrc,
  cardName,
  cardMeaning,
  isReversed,
  question,
}) {
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCardExplain({
      question,
      cardName,
      cardPosition,
      cardMeaning,
    }) {
      try {
        // 清除前一次 API 呼叫結果
        setSuccess(null);
        setError(null);

        setLoading(true);

        const res = await fetch(
          `/api/v1/explain?question=${question}&cardName=${cardName}&cardPosition=${cardPosition}&cardMeaning=${cardMeaning}`
        );

        if (!res.ok) {
          throw new Error("call API fail");
        }
        const data = await res.json();

        setSuccess(data.result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    // 有卡片跟問題時，才執行 API 呼叫
    if (cardName && cardMeaning && question) {
      getCardExplain({
        question,
        cardName: cardName,
        cardPosition: isReversed ? "逆位" : "正位",
        cardMeaning: cardMeaning,
      });
    }
  }, [question, cardName, cardMeaning, isReversed]);

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
      {isLoading && "載入中..."}
      {!!success && success}
      {!!error && "呼叫失敗，請重試"}
    </div>
  );
}
