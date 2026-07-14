import StatusBadge from "./StatusBadge";

export default function ReportItem({
  icon,
  label,
  status,
  value,
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "18px",
        borderRadius: "10px",
        marginBottom: "18px",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#60a5fa",
        }}
      >
        {icon} {label}
      </h3>

      <StatusBadge status={status} />

      <p
        style={{
          marginTop: "12px",
          color: "#e2e8f0",
          wordBreak: "break-word",
          lineHeight: "1.6",
        }}
      >
        {value || "Not Found"}
      </p>
    </div>
  );
}