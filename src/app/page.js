import cards from "@/data/cards.json";
import { Result } from "@/components/Result/Result";

export default function Home() {
  // TODO: 隨機抽出一張卡
  const card = cards[1];
  // TODO: 讓使用者自行輸入問題
  const question = null; // "下半年的工作運勢";

  return (
    <div>
      <Result
        cardSrc={card.image}
        cardName={card.name}
        cardMeaning={card.upright}
        question={question}
      />
    </div>
  );
}
