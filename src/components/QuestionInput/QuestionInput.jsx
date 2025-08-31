"use client";
import style from "./QuestionInput.module.css";

export const QuestionInput = ({ value, onChange }) => {
  return (
    <div className={style.container}>
      <label htmlFor="user-question">請輸入你的問題：</label>
      <textarea
        id="user-question"
        placeholder="例如：我該換工作嗎"
        value={value}
        onChange={onChange}
        rows={3}
        aria-required="true"
      />
    </div>
  );
};
