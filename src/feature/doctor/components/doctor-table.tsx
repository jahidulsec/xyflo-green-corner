"use client";

import { PagePagination } from "@/components/pagination/pagination";
import { DataTable } from "@/components/table/data-table";
import { TableWrapper } from "@/components/table/table";
import { formatDate } from "@/lib/formatters";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState, useTransition } from "react";
import { doctor } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import DoctorForm from "./doctor-form";
import { AlertModal } from "@/components/modal/alert";
import { toast } from "sonner";
import { deleteDoctor } from "../actions/doctor";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

export default function DoctorTable({
  response,
}: {
  response: {
    data: doctor[];
    error: string | null;
    count: number;
    page: number;
    size: number;
  };
}) {
  const [edit, setEdit] = useState<any>(undefined);
  const [del, setDel] = useState<undefined | string | boolean>(undefined);
  const [isPending, startTransition] = useTransition();

  const columns: ColumnDef<doctor>[] = [
    {
      header: "#",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        return (
          <span className="text-nowrap">
            {row.index + 1 + pageIndex * pageSize}
          </span>
        );
      },
      size: 20,
    },
    {
      accessorKey: "full_name",
      header: "Full Name",
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "location",
      header: "Address",
    },
    {
      accessorKey: "speciality",
      header: "Speciality",
    },
    {
      accessorKey: "hospital",
      header: "Hospital",
    },
    {
      accessorKey: "zone",
      header: "Zone",
    },
    {
      accessorKey: "region",
      header: "Region",
    },
    {
      accessorKey: "territory",
      header: "Territory",
    },
    {
      accessorKey: "tree_type",
      header: "Selected Tree",
    },
    {
      accessorKey: "plant_location",
      header: "Plantation Location",
    },
    {
      header: "Created At",
      cell: ({ row }) => {
        const data = row.original;

        return <span>{formatDate(new Date(data.created_at))}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <EllipsisVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => setEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDel(row.original.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <>
      <TableWrapper>
        <DataTable data={response?.data ?? []} columns={columns} />
      </TableWrapper>

      <PagePagination count={response.count} limit={response.size} />

      <Dialog onOpenChange={setEdit} open={!!edit}>
        <DialogContent className="p-0">
          <ScrollArea className="max-h-[85vh] p-4">
            <DialogHeader className="mb-6">
              <DialogTitle>Edit Doctor</DialogTitle>
            </DialogHeader>

            {/* form */}
            <DoctorForm doctor={edit} onClose={() => setEdit(false)} />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* delete modal */}
      <AlertModal
        pending={isPending}
        open={!!del}
        onOpenChange={setDel}
        onAction={() => {
          startTransition(async () => {
            if (del && typeof del !== "boolean") {
              const response = deleteDoctor(del);
              toast.promise(response, {
                loading: "Loading...",
                success: (data) => {
                  if (data.error) throw data.error;
                  return data.data;
                },
                error: (data) => {
                  return data.error;
                },
              });
            }
          });
        }}
      />
    </>
  );
}
