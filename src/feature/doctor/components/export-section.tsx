"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import { Download } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";

function ExportSection() {
  const [isPending, startTransition] = useTransition();

  // export csv
  const convertToCSV = (array: object[]) => {
    const headers = Object.keys(array[0]).join(",");
    const rows = array.map((row) =>
      Object.values(row)
        .map((value, index) => {
          // Escape quotes and wrap in double quotes if value contains comma or quote
          const str = String(value).replace(/"/g, '""').replace(/’/, "'");
          if (/^0\d+$/.test(str)) {
            return `="${str}"`; // Excel will treat it as a formula returning a string
          }
          if (index === 11) {
            return format(new Date(str), "yyyy-MM-dd");
          }
          return /[",\n]/.test(str) ? `"${str}"` : str; // if string container ",\n any of thes, return
        })
        .join(",")
    );
    return [headers, ...rows].join("\n");
  };

  const downloadCSV = async () => {
    const res = await fetch(`/api/doctor`);
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error);
      return;
    }
    const data = await res.json();
    const csvData = new Blob([convertToCSV(data.data)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
    });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `doctors.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await downloadCSV();
          });
        }}
      >
        {isPending ? (
          <Spinner
            borderBottomColor="borber-b-background"
            className="mr-2 size-4"
          />
        ) : (
          <Download className="size-4 mr-2" />
        )}
        <span>Export</span>
      </Button>
    </>
  );
}

export default ExportSection;
