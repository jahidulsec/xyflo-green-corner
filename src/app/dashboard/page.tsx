import { ErrorBoundary } from "@/components/errors/error-boundary";
import { SearchForm } from "@/components/input/search";
import { TableSkeleton } from "@/components/skeleton/table";
import { PageHeading } from "@/components/typography/heading";
import DoctorTable from "@/feature/doctor/components/doctor-table";
import { getDoctors } from "@/feature/doctor/servers/doctor";
import { SearchParams } from "@/types/search-params";
import { Users2 } from "lucide-react";
import { Suspense } from "react";

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <PageHeading icon={<Users2 />}>Doctor</PageHeading>
          <Suspense>
            <SearchForm />
          </Suspense>
          {/* <ExportSection /> */}
        </div>
        <Suspense fallback={<TableSkeleton />}>
          <TableSection searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

const TableSection = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = await searchParams
  const response = await getDoctors(params);

  return (
    <ErrorBoundary error={response.error}>
      <DoctorTable response={response} />
    </ErrorBoundary>
  );
};
