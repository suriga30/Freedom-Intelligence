type AnalyzeButtonProps = {
  disabled?: boolean;
};

export default function AnalyzeButton({
  disabled = false,
}: AnalyzeButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full rounded-xl bg-black px-6 py-4 text-white font-semibold transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      Analyze Website
    </button>
  );
}