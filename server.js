const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

const app = express();
dotenv.config();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.post('/api/ask-openai', async (req, res) => {
  const { question, card } = req.body;
  const template = process.env.PROMPT_TEMPLATE;
  const prompt = template
    .replace('{question}', question)
    .replace('{cardName}', card.name)
    .replace('{cardPosition}', card.position)
    .replace('{cardMeaning}', card.meaning);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API 錯誤：', error);
    res.status(500).json({ reply: '後端錯誤，請稍後再試。' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`伺服器已啟動：http://localhost:${PORT}`);
});
