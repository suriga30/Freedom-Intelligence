"use client";

import { motion } from "framer-motion";

import Card from "../ui/Card";
import CardContent from "../ui/CardContent";

type Props = {
  score: number;
  rating: string;
  overallHealth: number;
  grade: string;
  status: string;
};

export default function WebsiteIQCard({
  score,
  rating,
}: Props) {
  const radius = 95;
  const circumference = 2 * Math.PI * radius;

  const safeScore = Math.min(Math.max(score, 0), 100);

  const offset =
    circumference -
    (safeScore / 100) * circumference;

  // Website IQ grade
  const getGrade = () => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  };

  // Website IQ status
  const getStatus = () => {
    return rating;
  };

  const getColor = () => {
    if (score >= 90) return "#16A34A";
    if (score >= 80) return "#2563EB";
    if (score >= 70) return "#2563EB";
    if (score >= 60) return "#F59E0B";
    return "#DC2626";
  };

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Website IQ
          </p>

          <div className="relative mt-6">

            <svg
              width="240"
              height="240"
              className="-rotate-90"
            >
              <circle
                cx="120"
                cy="120"
                r={radius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="16"
              />

              <motion.circle
                cx="120"
                cy="120"
                r={radius}
                fill="none"
                stroke={getColor()}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{
                  strokeDashoffset: circumference,
                }}
                animate={{
                  strokeDashoffset: offset,
                }}
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <motion.h1
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="text-6xl font-bold text-slate-900"
              >
                {score}
              </motion.h1>

              <p className="mt-2 text-lg font-semibold text-slate-600">
                {getGrade()}
              </p>

            </div>
          </div>

          <p className="mt-6 text-2xl font-bold text-slate-900">
            {getStatus()}
          </p>

          <p className="mt-2 max-w-sm text-center leading-7 text-slate-500">
            Your Website IQ represents the combined health of
            SEO, performance, accessibility, security, and
            technical optimization.
          </p>

          <p className="mt-3 text-sm font-medium text-slate-500">
            Rating: {rating}
          </p>

        </div>
      </CardContent>
    </Card>
  );
}