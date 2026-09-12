import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function CardContent({
  children,
}: Props) {
  return (
    <div className="p-6">
      {children}
    </div>
  );
}