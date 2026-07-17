import ScoreCard from "./ScoreCard";
import ReportItem from "./ReportItem";

export default function SeoReport({ result }) {
  return (
    <div
      style={{
        marginTop: "40px",
        width: "720px",
        background: "#1e293b",
        borderRadius: "12px",
        padding: "30px",
      }}
    >
      <h2 style={{ color: "#60a5fa" }}>
        Scan Results
      </h2>

      <ScoreCard score={result.seoScore} />

      <ReportItem
        icon="🌐"
        label="Website"
        status="✅ Scanned"
        value={result.website}
      />

      <ReportItem
        icon="🔒"
        label="HTTPS"
        status={result.httpsStatus}
        value={result.httpsStatus}
      />

      <ReportItem
        icon="📝"
        label="Title"
        status={result.titleStatus}
        value={result.title}
      />

      <ReportItem
        icon="📄"
        label="Description"
        status={result.descriptionStatus}
        value={result.description}
      />

      <ReportItem
        icon="🏷"
        label="H1"
        status={result.h1Status}
        value={result.h1}
      />

      <ReportItem
        icon="H2"
        label="H2 Headings"
        status={result.h2Count > 0 ? "✅ Found" : "❌ Missing"}
        value={result.h2Count}
      />

      <ReportItem
        icon="H3"
        label="H3 Headings"
        status={result.h3Count > 0 ? "✅ Found" : "❌ Missing"}
        value={result.h3Count}
      />

      <ReportItem
        icon="🖼️"
        label="Images"
        status={result.imageCount > 0 ? "✅ Found" : "❌ None"}
        value={result.imageCount}
      />

      <ReportItem
        icon="⚠️"
        label="Missing ALT"
        status={result.missingAlt === 0 ? "✅ Good" : "⚠️ Needs Fix"}
        value={result.missingAlt}
      />

      <ReportItem
        icon="🔗"
        label="Internal Links"
        status="✅"
        value={result.internalLinks}
      />

      <ReportItem
        icon="🌍"
        label="External Links"
        status="✅"
        value={result.externalLinks}
      />

      <ReportItem
        icon="📚"
        label="Word Count"
        status={result.contentQuality}
        value={result.wordCount}
      />

      <ReportItem
        icon="🏷️"
        label="Schema"
        status={result.schemaStatus}
        value={
          result.schemaTypes?.length
            ? result.schemaTypes.join(", ")
            : "None"
        }
      />

      <ReportItem
        icon="🔗"
        label="Canonical URL"
        status={result.canonicalStatus}
        value={result.canonical}
      />

      <ReportItem
        icon="🤖"
        label="Meta Robots"
        status={result.metaRobotsStatus}
        value={result.metaRobots}
      />

      <ReportItem
        icon="🤖"
        label="Robots.txt"
        status={result.robotsStatus}
        value={result.robotsUrl}
      />

      <ReportItem
        icon="🗺️"
        label="Sitemap.xml"
        status={result.sitemapStatus}
        value={result.sitemapUrl}
      />

      <ReportItem
        icon="🖼️"
        label="Favicon"
        status={result.faviconStatus}
        value={result.favicon}
      />

      <ReportItem
        icon="📱"
        label="Open Graph Title"
        status={result.ogStatus}
        value={result.ogTitle}
      />

      <ReportItem
        icon="📄"
        label="Open Graph Description"
        status={result.ogStatus}
        value={result.ogDescription}
      />

      <ReportItem
        icon="🖼️"
        label="Open Graph Image"
        status={result.ogStatus}
        value={result.ogImage}
      />

      <ReportItem
        icon="🔗"
        label="Open Graph URL"
        status={result.ogStatus}
        value={result.ogUrl}
      />

      {result.aiSuggestions?.length > 0 && (
        <>
          <h2
            style={{
              color: "#60a5fa",
              marginTop: "30px",
            }}
          >
            AI Suggestions
          </h2>

          {result.aiSuggestions.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#0f172a",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <strong>{item.priority}</strong>

              <div>{item.issue}</div>

              <div
                style={{
                  color: "#94a3b8",
                  marginTop: "6px",
                }}
              >
                {item.recommendation}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}