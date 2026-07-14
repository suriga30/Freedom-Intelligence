export default function StatusBadge({ status }) {
  const isPresent = status?.includes("Present");

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "bold",
        background: isPresent ? "#14532d" : "#7f1d1d",
        color: "white",
      }}
    >
      {status}
    </span>
  );
}