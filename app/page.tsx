"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import UrlInput from "@/components/UrlInput";
import AnalyzeButton from "@/components/AnalyzeButton";
import AnalysisReport from "@/components/AnalysisReport";

import { AnalysisResult } from "@/types/analysis";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
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

      // ===== DEBUG =====
      console.log("=================================");
      console.log("Freedom Intelligence API Response");
      console.log(data);
      console.log("=================================");

      if (!response.ok || !data.success) {
        alert(data.message || "Analysis failed.");
        return;
      }

      setAnalysis(data);
    } catch (error) {
      console.error("Request Failed:", error);
      alert("Unable to connect to the scanner.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-100 p-8">
      <div className="mx-auto max-w-3xl">

        <div className="rounded-2xl bg-white p-10 shadow-lg">

          <Hero />

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <UrlInput
              value={url}
              onChange={setUrl}
            />

            <AnalyzeButton
              disabled={loading}
            />
          </form>

          {loading && (
            <div className="mt-8 text-center text-neutral-500">
              Analyzing website...
            </div>
          )}

        </div>

        {analysis && (
          <AnalysisReport data={analysis} />
        )}

      </div>
    </main>
  );
}