"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/Hero";
import UrlInput from "@/components/UrlInput";
import AnalyzeButton from "@/components/AnalyzeButton";
import AnalysisReport from "@/components/AnalysisReport";

import { AnalysisResult } from "@/types/analysis";

type ScanHistoryItem = {
  website: string;
  scannedAt: string;
};

const HISTORY_KEY = "freedom-intelligence-scan-history";
const MAX_HISTORY_ITEMS = 5;

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);

  useEffect(() => {
    try {
      const savedHistory = window.localStorage.getItem(HISTORY_KEY);

      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);

        if (Array.isArray(parsedHistory)) {
          setScanHistory(parsedHistory);
        }
      }
    } catch (error) {
      console.error("Unable to load scan history:", error);
    }
  }, []);

  function saveToScanHistory(website: string) {
    const newItem: ScanHistoryItem = {
      website,
      scannedAt: new Date().toISOString(),
    };

    const updatedHistory = [
      newItem,
      ...scanHistory.filter(
        (item) => item.website.toLowerCase() !== website.toLowerCase()
      ),
    ].slice(0, MAX_HISTORY_ITEMS);

    setScanHistory(updatedHistory);

    try {
      window.localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error("Unable to save scan history:", error);
    }
  }

  function selectPreviousScan(website: string) {
    setUrl(website);
    setAnalysis(null);
  }

  function clearScanHistory() {
    setScanHistory([]);

    try {
      window.localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error("Unable to clear scan history:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!url.trim()) {
      alert("Please enter a website URL.");
      return;
    }

    setLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website: url,
        }),
      });

      const data = await response.json();

      console.log("=================================");
      console.log("Freedom Intelligence API Response");
      console.log(data);
      console.log("=================================");

      if (!response.ok || !data.success) {
        alert(data.message || "Analysis failed.");
        return;
      }

      setAnalysis(data);
      saveToScanHistory(url.trim());
    } catch (error) {
      console.error("Request Failed:", error);
      alert("Unable to connect to the scanner.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-100 print:bg-white">
      {/* Hero Section */}
      <section className="px-6 py-10 print:hidden">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-10 shadow-lg">
            <Hero />

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <UrlInput value={url} onChange={setUrl} />
              <AnalyzeButton disabled={loading} />
            </form>

            {loading && (
              <div className="mt-8 text-center text-neutral-500">
                Analyzing website...
              </div>
            )}

            {scanHistory.length > 0 && !loading && (
              <div className="mt-10 border-t border-neutral-200 pt-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-800">
                      Recent Scans
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500">
                      Quickly revisit your recently analyzed websites.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearScanHistory}
                    className="text-xs font-medium text-red-500 transition hover:text-red-700"
                  >
                    Clear history
                  </button>
                </div>

                <div className="space-y-2">
                  {scanHistory.map((item) => (
                    <button
                      key={`${item.website}-${item.scannedAt}`}
                      type="button"
                      onClick={() => selectPreviousScan(item.website)}
                      className="flex w-full items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-left transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      <span className="min-w-0 truncate text-sm font-medium text-neutral-700">
                        {item.website}
                      </span>

                      <span className="shrink-0 text-xs text-neutral-400">
                        {new Date(item.scannedAt).toLocaleDateString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Report Section */}
      {analysis && (
        <section className="px-6 pb-12 print:px-0 print:pb-0">
          <div className="mx-auto max-w-7xl print:max-w-none">
            <AnalysisReport data={analysis} />
          </div>
        </section>
      )}
    </main>
  );
}