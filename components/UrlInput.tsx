type UrlInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function UrlInput({
  value,
  onChange,
}: UrlInputProps) {
  return (
    <input
      type="url"
      placeholder="https://example.com"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-4 text-lg outline-none transition focus:border-black"
      required
    />
  );
}