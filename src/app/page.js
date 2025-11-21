"use client";
import { useState, useEffect, useRef } from "react";
import { Icon, Loader2, Send, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export default function Home() {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const resultRef = useRef(null);

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

  const handleDownloadPDF = async () => {
    if (!resultRef.current) return;
    try {
      const dataUrl = await toPng(resultRef.current, { cacheBust: true });
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("static-raider-result.pdf");
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Failed to generate PDF");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] relative flex flex-col items-center px-6 py-12 text-black">
      {/* Soft Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "22px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 65% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />


      {/* Navbar */}
      <nav className="relative z-10 w-full max-w-5xl flex items-center justify-between py-4 mb-10 border-b border-black/10">
        <div className="flex items-center gap-2">
          <img
            src="/spidey-icon.png"
            alt="Spidey Icon"
            width={34}
            height={34}
            className="object-contain"
          />
          <h1 className="text-lg font-semibold tracking-tight">Static Raider</h1>
        </div>


        <div className="flex items-center gap-4 text-gray-600">
          <a
            href="https://x.com/Devprinze"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
            aria-label="Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 3a4.48 4.48 0 00-4.47 4.48c0 .35.04.7.11 1.03A12.94 12.94 0 013 4.1s-4 9 5 13a13 13 0 01-8 2c9 5.5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>

          <a
            href="https://github.com/prince24-web/static-raider"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.76c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 21.13V25" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Web Intelligence. Simplified.
          </h2>
          <p className="text-gray-600 mt-2 text-sm max-w-md">
            Paste a link, add your prompt, and let AI extract insights instantly.
          </p>
        </header>

        {/* Form Container */}
        <div className="w-full space-y-5 bg-white/90 backdrop-blur-sm p-9 rounded-2xl border border-black/10 shadow-[0_6px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Website URL
            </label>
            <input
              type="text"
              placeholder="https://example.com"
              className="w-full border border-black/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm bg-white"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Prompt
            </label>
            <textarea
              placeholder="e.g. Summarize this article in 3 bullet points"
              className="w-full border border-black/10 rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-black text-sm bg-white"
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
          <div className="w-full mt-10 border border-black/10 rounded-xl p-6 bg-white shadow-[0_6px_30px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">AI Response</h2>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-black transition bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
            <div ref={resultRef} className="prose max-w-none text-gray-800 text-sm leading-relaxed p-2">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-16 text-xs text-gray-500">
        © {new Date().getFullYear()} Static Raider • built for exploration
      </footer>
    </div>
  );
}
