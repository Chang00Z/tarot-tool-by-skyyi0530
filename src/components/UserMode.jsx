import React from "react";

export default function UserMode({
  userQuestion,
  setUserQuestion,
  drawnCard,
  showResult,
  aiResponse,
  loading,
  cards,
  handleDraw,
  handleReset,
}) {
  return (
    <div id="user-mode" className="container">
      <h1>塔羅抽牌工具</h1>
      <div className="question-area">
        <label htmlFor="user-question" className={showResult ? "hidden" : ""}>請輸入你的問題：</label>
        <textarea
          id="user-question"
          placeholder="例如：我該換工作嗎"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          className={showResult ? "hidden" : ""}
        />
      </div>
      <div id="card-area" className="card-area">
        {!showResult && <p id="prompt">請點擊下方按鈕抽牌</p>}
        {drawnCard && (
          <>
            <img
              id="card-image"
              className={showResult ? "" : "hidden"}
              src={drawnCard.image}
              alt="抽出的牌"
              style={drawnCard.isReversed ? { transform: "rotate(180deg)" } : {}}
            />
            <p id="card-name" className={showResult ? "" : "hidden"}>
              {drawnCard.name}（{drawnCard.position}）
            </p>
            <div
              id="user-question-display"
              className={`user-question-display${showResult ? "" : " hidden"}`}
            >
              你問的是：「{userQuestion}」
            </div>
            <p id="card-meaning" className="hidden"></p>
            <p id="ai-response" className={aiResponse ? "" : "hidden"}>{aiResponse}</p>
          </>
        )}
      </div>
      <div className="button-group">
        <button
          id="draw-button"
          disabled={loading || showResult || !cards.length}
          onClick={handleDraw}
          className={showResult ? "hidden" : ""}
        >
          抽牌
        </button>
        <button
          id="reset-button"
          className={showResult ? "" : "hidden"}
          onClick={handleReset}
        >
          再抽一次
        </button>
      </div>
    </div>
  );
} 