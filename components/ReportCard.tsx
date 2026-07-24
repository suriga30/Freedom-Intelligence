type ReportCardProps = {
  title: string;
  value: string;
};

export default function ReportCard({
  title,
  value,
}: ReportCardProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
        {title}
      </h3>

      <p className="break-words text-neutral-900">
        {value || "Not Found"}
      </p>
    </div>
  );
}