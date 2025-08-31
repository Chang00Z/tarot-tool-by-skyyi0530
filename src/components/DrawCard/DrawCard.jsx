"use client";
import { useState } from "react";
import { Result } from "../Result/Result";
import { QuestionInput } from "../QuestionInput/QuestionInput";
import { DrawButton } from "../DrawButton/DrawButton";
import style from "./DrawCard.module.css";

export default function DrawCard() {
  const [question, setQuestion] = useState("");
  const [card, setCard] = useState(null);

  return (
    <main className={style.container} tabIndex={-1}>
      <QuestionInput
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <DrawButton onDraw={(card) => setCard(card)} isDrawn={!!card} />
      {card && (
        <Result
          cardSrc={card.image}
          cardName={card.name}
          cardMeaning={card.meaning}
          isReversed={card.isReversed}
          question={question}
        />
      )}
    </main>
  );
}
