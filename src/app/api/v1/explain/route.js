import OpenAI from "openai";

// instance/實例
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request) {
  // 取得前端傳送的參數
  const { searchParams } = new URL(request.url);
  const question = searchParams.get("question");
  const cardName = searchParams.get("cardName");
  const cardPosition = searchParams.get("cardPosition");
  const cardMeaning = searchParams.get("cardMeaning");

  if (!question || !cardName || !cardPosition || !cardMeaning) {
    return Response.json(
      { error: "Missing required parameters." },
      { status: 400 }
    );
  }

  const prompt = `使用者問：「${question}」，抽到的是「${cardName} (${cardPosition})，牌義是「${cardMeaning}」。以一位經驗豐富的塔羅牌占卜師，給予解讀與建議。回覆使用繁體中文，不要使用換行符號，字數在 100~200 字。`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: "你是一位經驗豐富的塔羅牌占卜師。" },
        { role: "user", content: prompt },
      ],
    });
    if (completion.choices && completion.choices[0]) {
      return Response.json({
        result: completion.choices[0].message.content.trim(),
      });
    } else {
      return Response.json({ error: "OpenAI API error." }, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: err.message || "Server error." },
      { status: 500 }
    );
  }
}
