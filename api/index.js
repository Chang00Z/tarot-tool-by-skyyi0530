const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
app.post("/api/ask-openai", async (req, res) => {
  const { question, card } = req.body;
  const template = process.env.PROMPT_TEMPLATE;
  const prompt = template
    .replace("{question}", question)
    .replace("{cardName}", card.name)
    .replace("{cardPosition}", card.position)
    .replace("{cardMeaning}", card.meaning);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    // Check for API errors in the response
    if (!response.ok) {
      const { ok, status, statusText } = response;
      console.error("OpenAI API 回傳錯誤：", {
        // restful API 的標準錯誤處理格式
        response: { ok, status, statusText },
        // openAI 自定義的錯誤訊息
        customError: data.error,
      });
      return res.status(409).json({
        reply: "OpenAI API 錯誤",
        error: data.error,
      });
    }

    // Check if the expected data structure exists
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("OpenAI API 回傳格式異常：", data);
      return res.status(406).json({
        reply: "OpenAI API 回傳格式異常",
      });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    // 網路問題或其他非 API 回傳的錯誤
    console.error("其他錯誤：", error);
    res.status(500).json({
      reply: "後端錯誤，請稍後再試。",
    });
  }
});

// For local development
if (process.env.NODE_ENV !== "production") {
  // host 前端檔案的資料夾 (靜態檔案)
  app.use(express.static("src"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`伺服器已啟動：http://localhost:${PORT}`);
  });
}

module.exports = app;

/**
 * http://localhost:${PORT} -> express 伺服器 ->
 *
 * - app.post("/api/ask-openai", ...)
 *   http://localhost:${PORT}/api/ask-openai -> 執行 line9~39
 *
 * - app.use(express.static("src"))
 *    http://localhost:${PORT}/* -> 找 src 資料夾的檔案
 *    http://localhost:${PORT}/index.html -> index.html
 *    http://localhost:${PORT}/style.css  -> style.css
 *    http://localhost:${PORT}/script.js  -> script.js
 *    http://localhost:${PORT}/cards.json -> cards.json
 *
 *  browser http://localhost:${PORT} -> http://localhost:${PORT}/index.html
 */
