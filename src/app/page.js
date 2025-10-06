"use client";
import { useState, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleScrape = async () => {
    if (!url || !prompt) return alert("Please fill in both fields");
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
    <div className="min-h-screen w-full bg-[#f8fafc] relative flex flex-col items-center px-6 py-10 text-black">
      {/* Top Fade Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      {/* Content Wrapper (for z-index stacking) */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Header */}
        <header className="w-full max-w-2xl border-b border-black/10 pb-4 mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">Static Raider</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Paste a link and tell the AI what to do with it.
          </p>
        </header>

        {/* Form Container */}
        <div className="w-full max-w-2xl space-y-4 bg-white p-9 rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.08)] transition-all">
          <div>
            <label className="block text-sm font-medium mb-1">Website URL</label>
            <input
              type="text"
              placeholder="https://example.com"
              className="w-full border border-black/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prompt</label>
            <textarea
              placeholder="e.g. Summarize this article in 3 bullet points"
              className="w-full border border-black/10 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-black text-sm"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button
            onClick={handleScrape}
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-800 transition text-sm font-medium"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
            {loading ? "Processing..." : "Run Scraper"}
          </button>
        </div>

        {/* Result Box */}
        {result && (
          <div className="w-full max-w-2xl mt-10 border border-black/10 rounded-xl p-6 bg-white shadow-[0_6px_30px_rgba(0,0,0,0.08)]">
            <h2 className="text-lg font-semibold mb-2">AI Response</h2>
            <div className="prose max-w-none text-gray-800 text-sm leading-relaxed">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
