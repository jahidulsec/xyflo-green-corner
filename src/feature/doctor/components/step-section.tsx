import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import React from "react";

export default function StepSection({
  value,
  onPage,
  page,
}: {
  page: number;
  value: number;
  onPage: (page: number) => void;
}) {
  const data = ["Territory", "Doctor", "Tree Plantation", "Submit"];

  return (
    <div className="rounded-md p-4 bg-primary/10 backdrop-blur-sm">
      <div className="grid grid-cols-4 mb-3">
        {data.map((item, index) => (
          <button
            type="button"
            key={index}
            className={cn(
              index > 1 ? "text-right" : "text-left",
              "text-xs text-chart-3 text-nowrap cursor-pointer",
              page == (index + 1) ? "text-primary font-bold": ''
            )}
            onClick={() => onPage(index + 1)}
          >
            {item}
          </button>
        ))}
      </div>
      <Progress value={value} />
    </div>
  );
}
