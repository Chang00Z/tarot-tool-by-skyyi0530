// DOM 元素選取
const drawBtn = document.getElementById('draw-button');
const resetBtn = document.getElementById('reset-button');
const cardImage = document.getElementById('card-image');
const cardName = document.getElementById('card-name');
const cardMeaning = document.getElementById('card-meaning');
const prompt = document.getElementById('prompt');
const userQuestionInput = document.getElementById('user-question');
const aiResponse = document.getElementById('ai-response');
const loadingMsg = document.getElementById('loading-msg');
const userQuestionLabel = document.querySelector('label[for="user-question"]');
const userQuestionDisplay = document.getElementById('user-question-display');

// 塔羅師專用 DOM 元素選取（reader-mode）
const readerDrawBtn = document.getElementById('reader-draw-button');
const readerResetBtn = document.getElementById('reader-reset-button');
const readerCardImage = document.getElementById('reader-card-image');
const readerCardName = document.getElementById('reader-card-name');
const readerCardMeaning = document.getElementById('reader-card-meaning');
const readerPrompt = document.getElementById('reader-prompt');
const roleSelect = document.getElementById('role-select');
const userMode = document.getElementById('user-mode');
const readerMode = document.getElementById('reader-mode');

// 裝置類型判斷：手機使用 click，桌機使用 hover
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
document.body.setAttribute('data-touch', isTouchDevice ? 'true' : 'false');

// 用 JSON 檔載入卡片資料
let cards = []; //儲存 fetch 回傳的卡牌陣列

fetch('cards.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('無法載入牌卡資料');
    }
    return response.json();
  })
  .then((data) => {
    cards = data;
    console.log('牌卡資料載入成功', cards); //提示載入完成

    drawBtn.disabled = false; //載入完成後才啟用抽牌按鈕，避免使用者誤觸
    readerDrawBtn.disabled = false; //載入完成後才啟用抽牌按鈕，避免使用者誤觸(reader-mode)

    if (loadingMsg) loadingMsg.style.display = 'none'; //載入完成後隱藏 loading 提示
  })
  .catch((error) => {
    console.error('載入 cards.json 發生問題', error); //錯誤處理提示
  });

// 隨機抽牌邏輯
function getRandomCard() {
  if (cards.length === 0) {
    console.warn('牌卡尚未載入，請稍後再試');
    return null;
  } //若資料尚未載入完成，避免操作錯誤

  const card = cards[Math.floor(Math.random() * cards.length)];
  const isReversed = Math.random() < 0.5;
  return {
    ...card,
    meaning: isReversed ? card.reversed : card.upright,
    position: isReversed ? '逆位' : '正位',
    isReversed,
  };
}

// 呼叫後端 API 要求 AI 回覆，封裝 payload 傳送卡片與問題資訊至後端，由後端組合 prompt，提升安全性
async function askAI(userQuestion, card) {
  try {
    const payload = {
      question: userQuestion,
      card: {
        name: card.name,
        position: card.position,
        meaning: card.meaning,
      },
    };

    const response = await fetch('/api/ask-openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('API 回覆失敗'); //內部錯誤提示，不顯示給使用者
    }

    const data = await response.json();
    const aiText = data.reply.trim();

    aiResponse.textContent = aiText;
    aiResponse.classList.remove('hidden');
  } catch (error) {
    console.error('串接錯誤細節：', error); // 內部錯誤紀錄
    aiResponse.textContent = '目前暫時無法提供解答，請稍候再試。'; //顯示給使用者的提示語句
    aiResponse.classList.remove('hidden');
  }
}

// 抽牌按鈕邏輯
drawBtn.addEventListener('click', () => {
  const userQuestion = userQuestionInput.value.trim();
  if (!userQuestion) {
    alert('請先輸入問題');
    return; //未輸入時中止抽牌流程，避免畫面錯誤與邏輯跳脫
  }

  const card = getRandomCard();
  if (!card) {
    alert('牌卡尚未載入完成，請稍候再試');
    return;
  }

  prompt.classList.add('hidden');
  cardImage.src = card.image;
  cardImage.style.transform = card.isReversed ? 'rotate(180deg)' : 'none';
  cardImage.classList.remove('hidden');
  cardName.textContent = `${card.name}（${card.position}）`;
  cardName.classList.remove('hidden');
  cardMeaning.classList.add('hidden'); //user-mode 隱藏 card-meaning，僅顯示 AI 回覆的牌義

  //隱藏 label (請輸入你的問題)
  if (userQuestionLabel) {
    userQuestionLabel.classList.add('hidden');
  }
  drawBtn.classList.add('hidden');
  resetBtn.classList.remove('hidden');

  //抽牌後顯示使用者輸入的問題，且不可編輯
  userQuestionInput.classList.add('hidden');
  userQuestionDisplay.textContent = `你問的是：「${userQuestion}」`;
  userQuestionDisplay.classList.remove('hidden');
  askAI(userQuestion, card); //有輸入問題才去問 AI
});

// 重抽邏輯：重抽時清掉 AI 回覆，恢復輸入欄並清空提問區塊
resetBtn.addEventListener('click', () => {
  cardImage.classList.add('hidden');
  cardImage.style.transform = 'none';
  cardName.classList.add('hidden');
  cardMeaning.classList.add('hidden'); //user-mode 保持隱藏
  aiResponse.classList.add('hidden');
  prompt.classList.remove('hidden');
  drawBtn.classList.remove('hidden');
  resetBtn.classList.add('hidden');
  userQuestionInput.classList.remove('hidden');
  userQuestionInput.value = '';
  userQuestionDisplay.classList.add('hidden');
  userQuestionDisplay.textContent = '';

  //重抽時恢復 label 顯示
  if (userQuestionLabel) {
    userQuestionLabel.classList.remove('hidden');
  }
});

// 塔羅師版抽牌邏輯（無 AI、無輸入窗）
readerDrawBtn.addEventListener('click', () => {
  const card = getRandomCard();
  if (!card) {
    alert('牌卡尚未載入完成，請稍候再試');
    return;
  }

  readerPrompt.classList.add('hidden');
  readerCardImage.src = card.image;
  readerCardImage.style.transform = card.isReversed ? 'rotate(180deg)' : 'none';
  readerCardImage.classList.remove('hidden');
  readerCardName.textContent = `${card.name} (${card.position})`;
  readerCardName.classList.remove('hidden');
  readerCardMeaning.textContent = card.meaning; //顯示牌義文字
  readerCardMeaning.classList.remove('hidden'); //取消隱藏
  readerDrawBtn.classList.add('hidden');
  readerResetBtn.classList.remove('hidden');
});

//塔羅師版重抽邏輯
readerResetBtn.addEventListener('click', () => {
  readerCardImage.classList.add('hidden');
  readerCardImage.style.transform = 'none';
  readerCardName.classList.add('hidden');
  readerPrompt.classList.remove('hidden');
  readerDrawBtn.classList.remove('hidden');
  readerResetBtn.classList.add('hidden');
  readerCardMeaning.textContent = ''; //清空前次牌義
  readerCardMeaning.classList.add('hidden'); //隱藏牌義區塊
});

// 身份選擇邏輯
function switchMode(mode) {
  roleSelect.classList.add('hidden');
  if (mode === 'user') {
    userMode.classList.remove('hidden');
  } else if (mode === 'reader') {
    readerMode.classList.remove('hidden');
  }
}

//切換身份按鈕邏輯（←回到身份選擇畫面）
function switchToRoleSelect() {
  userMode.classList.add('hidden');
  readerMode.classList.add('hidden');
  roleSelect.classList.remove('hidden');
  menuPanel.classList.remove('show');
  menuPanel.classList.add('hidden');

  //重置 user-mode 狀態
  cardImage.classList.add('hidden');
  cardImage.style.transform = 'none';
  cardName.classList.add('hidden');
  cardMeaning.classList.add('hidden');
  aiResponse.classList.add('hidden');
  prompt.classList.remove('hidden');
  drawBtn.classList.remove('hidden');
  resetBtn.classList.add('hidden');
  userQuestionInput.classList.remove('hidden');
  userQuestionInput.value = '';
  userQuestionDisplay.classList.add('hidden');
  userQuestionDisplay.textContent = '';
  if (userQuestionLabel) userQuestionLabel.classList.remove('hidden');

  // 重置 reader-mode 狀態
  readerCardImage.classList.add('hidden');
  readerCardImage.style.transform = 'none';
  readerCardName.classList.add('hidden');
  readerCardMeaning.textContent = '';
  readerCardMeaning.classList.add('hidden');
  readerPrompt.classList.remove('hidden');
  readerDrawBtn.classList.remove('hidden');
  readerResetBtn.classList.add('hidden');
}

// 右上選單 DOM 邏輯： hover 展開、滑入滑出
const menuButton = document.getElementById('menu-button');
const menuPanel = document.getElementById('menu-panel');
const menuWrapper = document.querySelector('.menu-wrapper');
let menuTimeout;

// 手機裝置選單需點擊展開與收合
if (isTouchDevice) {
  menuButton.addEventListener('click', (e) => {
    e.stopPropagation(); //阻止點擊事件往上傳，避免被 document 的監聽器立刻關閉選單
    const isOpen = menuPanel.classList.contains('show');
    if (isOpen) {
      menuPanel.classList.remove('show');
      menuPanel.classList.add('hidden');
    } else {
      menuPanel.classList.add('show');
      menuPanel.classList.remove('hidden');
    }
  });

  menuPanel.addEventListener('click', (e) => {
    e.stopPropagation(); //避免點擊內部關閉選單
  });

  document.addEventListener('click', () => {
    const isOpen = menuPanel.classList.contains('show'); //判斷是否打開中
    if (isOpen) {
      menuPanel.classList.remove('show');
      menuPanel.classList.add('hidden');
    }
  });
}

// 桌機 hover 開關選單
menuButton.addEventListener('mouseenter', () => {
  clearTimeout(menuTimeout);
  menuPanel.classList.remove('hidden');
  menuPanel.classList.add('show');
});

// hover 離開整個選單範圍
menuWrapper.addEventListener('mouseleave', () => {
  // 滑出選單時延遲關閉，避免瞬間消失
  menuTimeout = setTimeout(() => {
    menuPanel.classList.remove('show');
    menuPanel.classList.add('hidden');
  }, 150);
});

// 補強穩定性，防止使用者滑入選單的瞬間消失
menuPanel.addEventListener('mouseenter', () => {
  // 滑入選單本體時清除延遲關閉
  clearTimeout(menuTimeout);
});

menuPanel.addEventListener('mouseleave', () => {
  // 滑出選單本體後延遲收起
  menuTimeout = setTimeout(() => {
    menuPanel.classList.remove('show');
    menuPanel.classList.add('hidden');
  }, 300);
});

// 點擊空白處自動關閉選單
document.addEventListener('click', (e) => {
  // 若點擊非選單區塊則自動關閉（桌機與手機通用）
  if (!menuWrapper.contains(e.target)) {
    menuPanel.classList.remove('show');
    menuPanel.classList.add('hidden');
  }
});
