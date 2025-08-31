"use client";
import { useEffect, useState } from "react";

export function AiExplain({ question, cardName, cardMeaning, isReversed }) {
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

  if (isLoading) {
    return <span role="status">載入中...</span>;
  }
  if (!!error) {
    return <span role="status">無法取得解釋，請再試一次</span>;
  }

  return success;
}
