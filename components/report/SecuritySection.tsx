import SectionHeading from "../SectionHeading";
import ReportCard from "../ReportCard";

type Props = {
  https: boolean;
};

export default function SecuritySection({
  https,
}: Props) {
  const securityScore = https ? 100 : 0;

  const status = https
    ? "Excellent"
    : "Critical";

  const statusMessage = https
    ? "Your website is using HTTPS, providing encrypted communication between visitors and the website."
    : "Your website is not using HTTPS. This is a critical security issue that should be addressed immediately.";

  const getStatusContainer = () => {
    return https
      ? "border-green-200 bg-green-50"
      : "border-red-200 bg-red-50";
  };

  return (
    <>
      <SectionHeading title="🔒 Security Intelligence" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`rounded-xl p-3 ${
                  https
                    ? "bg-green-50"
                    : "bg-red-50"
                }`}
              >
                <span className="text-2xl">
                  🔒
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Website Security Overview
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-slate-600">
                  {statusMessage}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-left md:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Security Score
              </p>

              <p className="mt-1 text-4xl font-bold text-slate-900">
                {securityScore}
                <span className="text-lg text-slate-400">
                  /100
                </span>
              </p>

              <p
                className={`mt-1 text-sm font-semibold ${
                  https
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {status}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Security Score
              </span>

              <span className="text-sm font-semibold text-slate-900">
                {securityScore}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full ${
                  https
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${securityScore}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ReportCard
            title="HTTPS Enabled"
            value={
              https
                ? "Yes ✅"
                : "No ❌"
            }
          />

          <ReportCard
            title="Security Score"
            value={`${securityScore}/100`}
          />
        </div>

        <div
          className={`rounded-2xl border p-5 shadow-sm ${getStatusContainer()}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Security Status
              </p>

              <p className="mt-1 text-lg font-bold text-slate-900">
                {status}
              </p>
            </div>

            <div className="text-2xl font-bold text-slate-900">
              {https ? "1/1" : "0/1"}
            </div>
          </div>

          <p className="mt-3 leading-7 text-slate-600">
            {https
              ? "The website passed the HTTPS security check currently evaluated by Freedom Intelligence."
              : "The website failed the HTTPS security check currently evaluated by Freedom Intelligence."}
          </p>

          {https ? (
            <p className="mt-2 leading-7 text-slate-600">
              HTTPS helps protect data exchanged between visitors and the website and is an important baseline for website security and trust.
            </p>
          ) : (
            <p className="mt-2 leading-7 text-red-800">
              Install and configure a valid SSL/TLS certificate and ensure the website is served over HTTPS.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-900">
            Security Measurement Note
          </p>

          <p className="mt-2 leading-7 text-blue-800">
            This V1 security assessment currently evaluates whether
            the website uses HTTPS. Additional security checks can
            be added in future versions.
          </p>
        </div>
      </div>
    </>
  );
}