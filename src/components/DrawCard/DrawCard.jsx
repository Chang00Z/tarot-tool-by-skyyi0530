"use client";
import { useState } from "react";
import cards from "@/data/cards.json";
import { Result } from "../Result/Result";
import style from "./DrawCard.module.css";

export default function DrawCard() {
  // TODO: 讓使用者自行輸入問題
  const question = null; // "下半年的工作運勢";
  const [card, setCard] = useState(null);

  function drawCard() {
    const card = cards[Math.floor(Math.random() * cards.length)];
    const isReversed = Math.random() < 0.5;
    const selectedCard = {
      ...card,
      meaning: isReversed ? card.reversed : card.upright,
      position: isReversed ? "逆位" : "正位",
      isReversed,
    };
    setCard(selectedCard);
  }

  return (
    <div className={style.container}>
      <p>請點擊下方按鈕抽牌</p>
      <button onClick={drawCard} className={style.button}>
        {card ? "重抽" : "抽牌"}
      </button>
      {card && (
        <Result
          cardSrc={card.image}
          cardName={card.name}
          cardMeaning={card.meaning}
          question={question}
        />
      )}
    </div>
  );
}
