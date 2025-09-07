"use client";
import { useState } from "react";
import { Result } from "../Result/Result";
import { QuestionInput } from "../QuestionInput/QuestionInput";
import { DrawButton } from "../DrawButton/DrawButton";
import style from "./DrawCard.module.css";
import RoleSelect from "../RoleSelect/RoleSelect";
import { Title } from "../Title/Title";
import Menu from "../Menu/Menu";

export default function DrawCard() {
  const [role, setRole] = useState(null);
  const [question, setQuestion] = useState("");
  const [card, setCard] = useState(null);

  function onReset() {
    setRole(null);
    setCard(null);
    setQuestion("");
  }

  return (
    <main className={style.container} tabIndex={-1}>
      {!role && <RoleSelect onSelect={setRole} />}
      {!!role && (
        <>
          <Menu onResetRole={onReset} />
          <Title>塔羅抽牌工具</Title>
        </>
      )}
      {role === "user" && !card && (
        <QuestionInput
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
      )}
      {!!role && (
        <DrawButton onDraw={(card) => setCard(card)} isDrawn={!!card} />
      )}
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
