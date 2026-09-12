import ReportCard from "../ReportCard";
import SectionHeading from "../SectionHeading";

import { AnalysisResult } from "@/types/analysis";

type Props = {
  data: AnalysisResult;
};

export default function ImageSection({
  data,
}: Props) {
  const totalImages = data.totalImages;

  const altCoverage =
    totalImages === 0
      ? 100
      : Math.round(
          (data.imagesWithAlt / totalImages) * 100
        );

  let status = "Excellent";
  let statusMessage =
    "All detected images have descriptive ALT attributes.";

  if (totalImages === 0) {
    status = "No Images Detected";
    statusMessage =
      "No images were detected on the scanned page.";
  } else if (altCoverage < 50) {
    status = "Needs Attention";
    statusMessage =
      "A large proportion of images are missing ALT attributes. Adding descriptive ALT text can improve accessibility and help search engines understand image content.";
  } else if (altCoverage < 90) {
    status = "Good";
    statusMessage =
      "Most images have ALT attributes, but some images still need descriptive alternative text.";
  } else if (altCoverage < 100) {
    status = "Very Good";
    statusMessage =
      "Most images have ALT attributes. Review the remaining images without ALT text to achieve complete coverage.";
  }

  return (
    <>
      <SectionHeading title="🖼️ Image Intelligence" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <span className="text-2xl">🖼️</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Image Accessibility Overview
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                {statusMessage}
              </p>
            </div>
          </div>

          {totalImages > 0 && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">
                  ALT Text Coverage
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {altCoverage}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${
                    altCoverage >= 90
                      ? "bg-green-500"
                      : altCoverage >= 50
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  style={{
                    width: `${altCoverage}%`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>
                  {data.imagesWithAlt} with ALT
                </span>

                <span>
                  {data.imagesWithoutAlt} missing ALT
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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

        <div
          className={`rounded-2xl border p-5 shadow-sm ${
            altCoverage >= 90
              ? "border-green-200 bg-green-50"
              : altCoverage >= 50
                ? "border-amber-200 bg-amber-50"
                : "border-red-200 bg-red-50"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Image Status
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {status}
              </p>
            </div>

            <div className="text-2xl font-bold text-slate-900">
              {altCoverage}%
            </div>
          </div>

          <p className="mt-3 leading-7 text-slate-600">
            {totalImages === 0
              ? "The scanner did not detect any images on this page."
              : data.imagesWithoutAlt === 0
                ? "Every detected image has an ALT attribute."
                : `${data.imagesWithoutAlt} image(s) should be reviewed and given meaningful ALT text where appropriate.`}
          </p>
        </div>
      </div>
    </>
  );
}