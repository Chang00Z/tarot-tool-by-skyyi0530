"use client";
import { useState } from "react";
import cards from "@/data/cards.json";
import { Result } from "../Result/Result";
import { QuestionInput } from "../QuestionInput/QuestionInput";
import style from "./DrawCard.module.css";

export default function DrawCard() {
  const [question, setQuestion] = useState("");
  const [card, setCard] = useState(null);

  function drawCard() {
    const card = cards[Math.floor(Math.random() * cards.length)];
    const isReversed = Math.random() < 0.5;
    const selectedCard = {
      ...card,
      meaning: isReversed ? card.reversed : card.upright,
      isReversed,
    };
    setCard(selectedCard);
  }

  return (
    <div className={style.container}>
      <QuestionInput
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <p>請點擊下方按鈕抽牌</p>
      <button onClick={drawCard} className={style.button}>
        {card ? "重抽" : "抽牌"}
      </button>
      {card && (
        <Result
          cardSrc={card.image}
          cardName={card.name}
          cardMeaning={card.meaning}
          cardPosition={card.position}
          isReversed={card.isReversed}
          question={question}
        />
      )}
    </div>
  );
}
