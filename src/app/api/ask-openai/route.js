import { NextResponse } from "next/server";

export async function POST(req) {
  const { question, card } = await req.json();
  // @ts-expect-error: process.env is available in Next.js API routes
  const template = process.env.PROMPT_TEMPLATE;
  if (!template) {
    return NextResponse.json(
      { reply: "缺少 PROMPT_TEMPLATE" },
      { status: 500 }
    );
  }
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
        // @ts-expect-error: process.env is available in Next.js API routes
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      const { ok, status, statusText } = response;
      return NextResponse.json(
        {
          reply: "OpenAI API 錯誤",
          error: data.error,
          response: { ok, status, statusText },
        },
        { status: 409 }
      );
    }
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { reply: "OpenAI API 回傳格式異常" },
        { status: 406 }
      );
    }
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json(
      { reply: "後端錯誤，請稍後再試。" },
      { status: 500 }
    );
  }
}
