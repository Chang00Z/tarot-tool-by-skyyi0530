"use client";
import React, { useState, useEffect, useRef } from "react";
import Menu from "../components/Menu";
import RoleSelect from "../components/RoleSelect";
import UserMode from "../components/UserMode";
import ReaderMode from "../components/ReaderMode";

// Card type definition

export default function Home() {
  // State
  const [role, setRole] = useState("select");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userQuestion, setUserQuestion] = useState("");
  const [drawnCard, setDrawnCard] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [readerCard, setReaderCard] = useState(null);
  const [showReaderResult, setShowReaderResult] = useState(false);

  // Refs for menu hover timeout
  const menuTimeout = useRef(null);

  // Fetch cards.json on mount
  useEffect(() => {
    fetch("/cards.json")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Draw a random card
  function getRandomCard() {
    if (cards.length === 0) return null;
    const card = cards[Math.floor(Math.random() * cards.length)];
    const isReversed = Math.random() < 0.5;
    return {
      ...card,
      meaning: isReversed ? card.reversed : card.upright,
      position: isReversed ? "逆位" : "正位",
      isReversed,
    };
  }

  // User mode: draw card
  const handleDraw = async () => {
    if (!userQuestion.trim()) {
      alert("請先輸入問題");
      return;
    }
    const card = getRandomCard();
    if (!card) {
      alert("牌卡尚未載入完成，請稍候再試");
      return;
    }
    setDrawnCard(card);
    setShowResult(true);
    setAiResponse("");
    // Ask AI
    try {
      const payload = {
        question: userQuestion,
        card: {
          name: card.name,
          position: card.position,
          meaning: card.meaning,
        },
      };
      const res = await fetch("/api/ask-openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAiResponse(data.reply.trim());
    } catch {
      setAiResponse("目前暫時無法提供解答，請稍候再試。");
    }
  };

  // User mode: reset
  const handleReset = () => {
    setDrawnCard(null);
    setShowResult(false);
    setAiResponse("");
    setUserQuestion("");
  };

  // Reader mode: draw card
  const handleReaderDraw = () => {
    const card = getRandomCard();
    if (!card) {
      alert("牌卡尚未載入完成，請稍候再試");
      return;
    }
    setReaderCard(card);
    setShowReaderResult(true);
  };

  // Reader mode: reset
  const handleReaderReset = () => {
    setReaderCard(null);
    setShowReaderResult(false);
  };

  // Role switching
  const switchMode = (mode) => {
    setRole(mode);
    handleReset();
    handleReaderReset();
    setShowMenu(false);
  };
  const switchToRoleSelect = () => {
    setRole("select");
    handleReset();
    handleReaderReset();
    setShowMenu(false);
  };

  // Menu logic (hover/click)
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  const handleMenuButtonClick = (e) => {
    if (isTouchDevice) {
      e.stopPropagation();
      setShowMenu((v) => !v);
    }
  };
  useEffect(() => {
    if (!isTouchDevice) return;
    const closeMenu = () => setShowMenu(false);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [isTouchDevice]);

  // Desktop hover menu logic
  const handleMenuMouseEnter = () => {
    if (!isTouchDevice) {
      if (menuTimeout.current) clearTimeout(menuTimeout.current);
      setShowMenu(true);
    }
  };
  const handleMenuMouseLeave = () => {
    if (!isTouchDevice) {
      menuTimeout.current = setTimeout(() => setShowMenu(false), 150);
    }
  };

  // Render
  return (
    <main>
      <Menu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        switchToRoleSelect={switchToRoleSelect}
        isTouchDevice={isTouchDevice}
        menuTimeout={menuTimeout}
        handleMenuMouseEnter={handleMenuMouseEnter}
        handleMenuMouseLeave={handleMenuMouseLeave}
        handleMenuButtonClick={handleMenuButtonClick}
      />
      {role === "select" && <RoleSelect switchMode={switchMode} />}
      {role === "user" && (
        <UserMode
          userQuestion={userQuestion}
          setUserQuestion={setUserQuestion}
          drawnCard={drawnCard}
          showResult={showResult}
          aiResponse={aiResponse}
          loading={loading}
          cards={cards}
          handleDraw={handleDraw}
          handleReset={handleReset}
        />
      )}
      {role === "reader" && (
        <ReaderMode
          readerCard={readerCard}
          showReaderResult={showReaderResult}
          loading={loading}
          cards={cards}
          handleReaderDraw={handleReaderDraw}
          handleReaderReset={handleReaderReset}
        />
      )}
      {loading && (
        <p id="loading-msg" className="loading-msg">
          牌卡資料載入中，請稍候...
        </p>
      )}
    </main>
  );
}
