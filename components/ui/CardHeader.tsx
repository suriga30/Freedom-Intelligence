import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
};

export default function CardHeader({
  title,
  subtitle,
  icon,
}: Props) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 p-6">
      {icon && (
        <div className="rounded-xl bg-slate-100 p-3">
          {icon}
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}