import { Bot } from "lucide-react";

import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import CardContent from "../ui/CardContent";

type Props = {
  summary: string;
};

export default function AiSummaryCard({
  summary,
}: Props) {
  return (
    <Card>
      <CardHeader
        title="AI Executive Summary"
        subtitle="Website Intelligence Analysis"
        icon={
          <Bot
            size={22}
            className="text-blue-600"
          />
        }
      />

      <CardContent>
        <p className="leading-8 text-slate-600">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}