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
        icon="🔗"
        label="Canonical URL"
        status={result.canonicalStatus}
        value={result.canonical}
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
    </div>
  );
}