import ReportCard from "./ReportCard";
import ScoreCard from "./ScoreCard";
import SectionHeading from "./SectionHeading";
import { AnalysisResult } from "@/types/analysis";

type Props = {
  data: AnalysisResult;
};

export default function AnalysisReport({ data }: Props) {
  return (
    <section className="mt-10">

      <ScoreCard
        score={data.score}
        rating={data.rating}
      />

      <SectionHeading title="📄 Basic SEO" />

      <div className="space-y-4">
        <ReportCard title="Website" value={data.website} />
        <ReportCard title="Page Title" value={data.title} />
        <ReportCard title="Meta Description" value={data.description} />
        <ReportCard title="H1 Heading" value={data.h1} />
        <ReportCard title="Canonical URL" value={data.canonical} />
      </div>

      <SectionHeading title="🌐 Technical SEO" />

      <div className="space-y-4">
        <ReportCard
          title="Robots.txt URL"
          value={data.robotsUrl}
        />

        <ReportCard
          title="Robots.txt Found"
          value={data.robotsFound ? "Yes ✅" : "No ❌"}
        />

        <ReportCard
          title="Sitemap URL"
          value={data.sitemapUrl}
        />

        <ReportCard
          title="Sitemap Found"
          value={data.sitemapFound ? "Yes ✅" : "No ❌"}
        />
      </div>

      <SectionHeading title="📱 Social Media" />

      <div className="space-y-4">
        <ReportCard
          title="Open Graph Title"
          value={data.ogTitle || "Not Found"}
        />

        <ReportCard
          title="Open Graph Description"
          value={data.ogDescription || "Not Found"}
        />

        <ReportCard
          title="Open Graph Image"
          value={data.ogImage || "Not Found"}
        />

        <ReportCard
          title="Twitter Title"
          value={data.twitterTitle || "Not Found"}
        />

        <ReportCard
          title="Twitter Description"
          value={data.twitterDescription || "Not Found"}
        />

        <ReportCard
          title="Twitter Image"
          value={data.twitterImage || "Not Found"}
        />
      </div>

      <SectionHeading title="🔒 Security" />

      <div className="space-y-4">
        <ReportCard
          title="HTTPS Enabled"
          value={data.https ? "Yes ✅" : "No ❌"}
        />
      </div>

      <SectionHeading title="🖼️ Image Intelligence" />

      <div className="space-y-4">
        <ReportCard
          title="Total Images"
          value={data.totalImages.toString()}
        />

        <ReportCard
          title="Images with ALT"
          value={data.imagesWithAlt.toString()}
        />

        <ReportCard
          title="Images Missing ALT"
          value={data.imagesWithoutAlt.toString()}
        />
      </div>

      <SectionHeading title="🔗 Link Intelligence" />

      <div className="space-y-4">
        <ReportCard
          title="Total Links"
          value={data.totalLinks.toString()}
        />

        <ReportCard
          title="Internal Links"
          value={data.internalLinks.toString()}
        />

        <ReportCard
          title="External Links"
          value={data.externalLinks.toString()}
        />

        <ReportCard
          title="Email Links"
          value={data.emailLinks.toString()}
        />

        <ReportCard
          title="Telephone Links"
          value={data.telephoneLinks.toString()}
        />
      </div>

      <SectionHeading title="⚡ Performance" />

      <div className="space-y-4">
        <ReportCard
          title="Response Time"
          value={`${data.responseTime} ms`}
        />

        <ReportCard
          title="Performance Rating"
          value={data.performanceRating}
        />
      </div>

      <SectionHeading title="🤖 AI Recommendations" />

      <div className="space-y-4">
        {data.recommendations.length === 0 ? (
          <ReportCard
            title="Status"
            value="🎉 No recommendations. Great job!"
          />
        ) : (
          data.recommendations.map((item, index) => (
            <ReportCard
              key={index}
              title={`${item.priority} Priority - ${item.title}`}
              value={item.description}
            />
          ))
        )}
      </div>

    </section>
  );
}