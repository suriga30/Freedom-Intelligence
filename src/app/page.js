"use client";

import { useState } from "react";
import SeoReport from "../components/SeoReport";

export default function Home() {
  const [website, setWebsite] = useState("");
  const [result, setResult] = useState(null);

  async function handleScan() {
    const response = await fetch("/api/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ website }),
    });

    const data = await response.json();
    setResult(data);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          fontSize: "56px",
        }}
      >
        Freedom Intelligence
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "30px",
        }}
      >
        AI Website Intelligence Platform
      </p>

      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Enter Website URL"
        style={{
          width: "450px",
          padding: "15px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px",
        }}
      />

      <button
        onClick={handleScan}
        style={{
          marginTop: "15px",
          padding: "14px 35px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Scan Website
      </button>

      {result && <SeoReport result={result} />}
    </main>
  );
}