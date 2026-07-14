export default function ScoreCard({ score }) {
  let message = "Needs Improvement";

  if (score >= 100) {
    message = "Excellent SEO";
  } else if (score >= 75) {
    message = "Good SEO";
  } else if (score >= 50) {
    message = "Average SEO";
  }

  return (
    <div
      style={{
        background: "#0f172a",
        padding: "25px",
        borderRadius: "12px",
        textAlign: "center",
        marginBottom: "30px",
      }}
    >
      <h1
        style={{
          fontSize: "64px",
          color: "#22c55e",
          margin: 0,
        }}
      >
        {score}/100
      </h1>

      <h3
        style={{
          color: "#60a5fa",
          marginTop: "10px",
          marginBottom: "5px",
        }}
      >
        {message}
      </h3>

      <p
        style={{
          color: "#cbd5e1",
          margin: 0,
        }}
      >
        SEO SCORE
      </p>
    </div>
  );
}
