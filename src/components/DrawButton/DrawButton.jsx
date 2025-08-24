"use client";
import cards from "@/data/cards.json";
import style from "./DrawButton.module.css";

export function DrawButton({ isDrawn, onDraw }) {
  function drawCard() {
    const card = cards[Math.floor(Math.random() * cards.length)];
    const isReversed = Math.random() < 0.5;
    const selectedCard = {
      ...card,
      meaning: isReversed ? card.reversed : card.upright,
      isReversed,
    };
    onDraw(selectedCard);
  }

  return (
    <>
      <p>請點擊下方按鈕抽牌</p>
      <button onClick={drawCard} className={style.button}>
        {isDrawn ? "重抽" : "抽牌"}
      </button>
    </>
  );
}
