const cards = [
  {
    name: "愚者",
    upright: "新的開始，自由，冒險",
    reversed: "衝動，缺乏準備，逃避責任",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg"
  },
  {
    name: "魔術師",
    upright: "意志力，行動，創造",
    reversed: "欺騙，技巧濫用，分心",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar01.jpg"
  },
  {
    name: "女祭司",
    upright: "直覺、潛意識、神祕知識",
    reversed: "冷漠、困惑、過度保守",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar02.jpg"
  },
  {
    name: "女皇",
    upright: "豐饒、美、滋養、母性",
    reversed: "依賴、疏離、創造受阻",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar03.jpg"
  },
  {
    name: "皇帝",
    upright: "權威、穩定、結構",
    reversed: "專制、控制慾、無彈性",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar04.jpg"
  },
  {
    name: "教皇",
    upright: "傳統、信仰、指導",
    reversed: "教條主義、誤導、不服從",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar05.jpg"
  },
  {
    name: "戀人",
    upright: "愛、選擇、和諧",
    reversed: "誘惑、衝突、價值觀不合",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar06.jpg"
  },
  {
    name: "戰車",
    upright: "意志力、勝利、控制",
    reversed: "失控、懦弱、方向錯亂",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar07.jpg"
  },
  {
    name: "力量",
    upright: "勇氣、內在力量、耐心",
    reversed: "不安、缺乏信心、壓抑情緒",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar08.jpg"
  },
  {
    name: "隱者",
    upright: "內省、指引、沉思",
    reversed: "孤立、迷失方向、拒絕幫助",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar09.jpg"
  },
  {
    name: "命運之輪",
    upright: "轉變、命運、週期",
    reversed: "阻礙、不幸、重複錯誤",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar10.jpg"
  },
  {
    name: "正義",
    upright: "公平、真理、責任",
    reversed: "偏見、不公、逃避責任",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar11.jpg"
  },
  {
    name: "吊人",
    upright: "犧牲、放下、重新看待",
    reversed: "拖延、固執、無法放手",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar12.jpg"
  },
  {
    name: "死神",
    upright: "結束、轉化、重生",
    reversed: "抗拒改變、停滯、拖延結束",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar13.jpg"
  },
  {
    name: "節制",
    upright: "平衡、節制、耐心",
    reversed: "失衡、衝動、極端行為",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar14.jpg"
  },
  {
    name: "惡魔",
    upright: "束縛、慾望、成癮",
    reversed: "解放、自覺、擺脫壓力",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar15.jpg"
  },
  {
    name: "高塔",
    upright: "突變、破壞、意外",
    reversed: "避免災難、內在改變、慢性危機",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar16.jpg"
  },
  {
    name: "星星",
    upright: "希望、靈感、療癒",
    reversed: "失望、缺乏信念、自我懷疑",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar17.jpg"
  },
  {
    name: "月亮",
    upright: "潛意識、直覺、幻象",
    reversed: "迷失方向、恐懼、欺騙",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar18.jpg"
  },
  {
    name: "太陽",
    upright: "快樂、成功、光明",
    reversed: "過度樂觀、延遲、不實期待",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar19.jpg"
  },
  {
    name: "審判",
    upright: "甦醒、反省、重生",
    reversed: "拒絕反省、內疚、未完成事務",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar20.jpg"
  },
  {
    name: "世界",
    upright: "完成、圓滿、旅程的終點",
    reversed: "未完成、延遲、缺乏關鍵元素",
    image: "https://www.sacred-texts.com/tarot/pkt/img/ar21.jpg"
  }
];

const drawBtn = document.getElementById("draw-button");
const resetBtn = document.getElementById("reset-button");
const cardImage = document.getElementById("card-image");
const cardName = document.getElementById("card-name");
const cardMeaning = document.getElementById("card-meaning");
const prompt = document.getElementById("prompt");

function getRandomCard() {
  const card = cards[Math.floor(Math.random() * cards.length)];
  const isReversed = Math.random() < 0.5;
  return {
    ...card,
    meaning: isReversed ? card.reversed : card.upright,
    position: isReversed ? "逆位" : "正位",
    isReversed
  };
}

drawBtn.addEventListener("click", () => {
  const card = getRandomCard();

  prompt.classList.add("hidden");
  cardImage.src = card.image;
  cardImage.style.transform = card.isReversed ? "rotate(180deg)" : "none";
  cardImage.classList.remove("hidden");

  cardName.textContent = `${card.name}（${card.position}）`;
  cardName.classList.remove("hidden");

  cardMeaning.textContent = card.meaning;
  cardMeaning.classList.remove("hidden");

  drawBtn.classList.add("hidden");
  resetBtn.classList.remove("hidden");
});

resetBtn.addEventListener("click", () => {
  cardImage.classList.add("hidden");
  cardImage.style.transform = "none";
  cardName.classList.add("hidden");
  cardMeaning.classList.add("hidden");
  prompt.classList.remove("hidden");

  drawBtn.classList.remove("hidden");
  resetBtn.classList.add("hidden");
});
