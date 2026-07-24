type Props = {
  score: number;
  rating: string;
};

export default function ScoreCard({
  score,
  rating,
}: Props) {
  const scoreColor =
    score >= 90
      ? "text-green-600"
      : score >= 70
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

      <div className="text-center">

        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500">
          SEO SCORE
        </h2>

        <div className={`mt-4 text-7xl font-extrabold ${scoreColor}`}>
          {score}
        </div>

        <div className="mt-3 text-xl font-semibold text-gray-700">
          {rating}
        </div>

      </div>

    </div>
  );
}