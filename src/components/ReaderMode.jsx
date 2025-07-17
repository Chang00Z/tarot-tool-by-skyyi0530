import React from "react";

export default function ReaderMode({
  readerCard,
  showReaderResult,
  loading,
  cards,
  handleReaderDraw,
  handleReaderReset,
}) {
  return (
    <div id="reader-mode" className="container">
      <h1>塔羅抽牌工具</h1>
      <p className="subtitle">（塔羅師版）</p>
      <div id="reader-card-area" className="card-area">
        {!showReaderResult && <p id="reader-prompt">請點擊下方按鈕抽牌</p>}
        {readerCard && (
          <>
            <img
              id="reader-card-image"
              className={showReaderResult ? "" : "hidden"}
              src={readerCard.image}
              alt="抽出的牌"
              style={readerCard.isReversed ? { transform: "rotate(180deg)" } : {}}
            />
            <p id="reader-card-name" className={showReaderResult ? "" : "hidden"}>
              {readerCard.name}（{readerCard.position}）
            </p>
            <p id="reader-card-meaning" className={showReaderResult ? "" : "hidden"}>
              {readerCard.meaning}
            </p>
          </>
        )}
      </div>
      <div className="button-group">
        <button
          id="reader-draw-button"
          disabled={loading || showReaderResult || !cards.length}
          onClick={handleReaderDraw}
          className={showReaderResult ? "hidden" : ""}
        >
          抽牌
        </button>
        <button
          id="reader-reset-button"
          className={showReaderResult ? "" : "hidden"}
          onClick={handleReaderReset}
        >
          再抽一次
        </button>
      </div>
    </div>
  );
} 