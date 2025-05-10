const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

const app = express();
dotenv.config();
app.use(express.json());

app.post("/api/ask-openai", async (req, res) => {
  const { question, card } = req.body;
  const prompt = `使用者問：「${question}」，抽到的是「${card.name}」（${card.position}），牌義是「${card.meaning}」。請根據這些資訊給予解讀與建議。`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API 錯誤：", error);
    res.status(500).json({ reply: "後端錯誤，請稍後再試。" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器已啟動：http://localhost:${PORT}`);
});
