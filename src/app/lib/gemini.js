import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function runGeminiPrompt(content, userPrompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const finalPrompt = `
The user said: "${userPrompt}"

Here is the scraped content from the website:
${content}

Now respond according to the user’s request.
`;

  const result = await model.generateContent(finalPrompt);
  return result.response.text();
}
