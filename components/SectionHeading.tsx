type Props = {
  title: string;
};

export default function SectionHeading({
  title,
}: Props) {
  return (
    <div className="mt-8 mb-4">
      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      <div className="mt-2 h-px bg-gray-300" />
    </div>
  );
}