"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, prompt }),
      });
      const data = await res.json();
      setResult(data.result || data.error);
    } catch (e) {
      setResult("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Web Scraper AI 🕸️</h1>

      <input
        type="text"
        placeholder="Enter website URL..."
        className="w-full p-2 rounded bg-gray-800 mb-3"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        placeholder="What do you want to do with it? (e.g. Summarize this article)"
        className="w-full p-2 rounded bg-gray-800 mb-3 h-24"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleScrape}
        disabled={loading}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Scrape & Send to Gemini"}
      </button>

      {result && (
        <div className="mt-6 bg-gray-900 p-4 rounded whitespace-pre-wrap">
          {result}
        </div>
      )}
    </main>
  );
}
