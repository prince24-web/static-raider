import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { runGeminiPrompt } from "../../lib/gemini";

const MAX_CHARS = 28000;

function extractTextFromHTML(html) {
  const $ = cheerio.load(html);
  $("script, style, nav, footer, header, iframe").remove();
  let text = $("body").text();
  text = text.replace(/\s+/g, " ").trim();
  return text.slice(0, MAX_CHARS);
}

export async function POST(req) {
  try {
    const { url, prompt } = await req.json();
    if (!url || !prompt)
      return NextResponse.json({ error: "Missing URL or prompt" }, { status: 400 });

    const { data } = await axios.get(url);
    const text = extractTextFromHTML(data);

    const geminiResponse = await runGeminiPrompt(text, prompt);

    return NextResponse.json({ result: geminiResponse });
  } catch (err) {
    console.error("Scrape error:", err);
    return NextResponse.json({ error: "Failed to scrape or process URL" }, { status: 500 });
  }
}
