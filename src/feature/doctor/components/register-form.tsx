"use client";

import { Form, FormItem } from "@/components/forms/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect, useState } from "react";
import { addDoctor } from "../actions/doctor";
import { ErrorMessage } from "@/components/text/error-message";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next/app";
import { Select } from "@/components/selects/select";
import StepSection from "./step-section";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { locations, treeTypes } from "@/lib/data";

export default function RegisterForm() {
  const [data, action, isPending] = useActionState(addDoctor, null);
  const router = useRouter();
  const [page, setPage] = useState(1);

  const TOTAL_STEP = 3;

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      router.push("/success");
    } else if (data?.error) {
      setPage(1);
      toast.warning("Please check your respose");
    }
  }, [data]);

  const dataTitle = [
    "Territory Information",
    "Doctor Information",
    "Tree plantation Information",
    "Submit",
  ];

  return (
    <div className="max-w-sm mx-auto md:w-full flex flex-col gap-5">
      <StepSection
        page={page}
        onPage={(page) => setPage(page)}
        value={((page - 1) / TOTAL_STEP) * 100}
      />

      <Form
        action={action}
        className="mb-14 bg-primary/10 p-4 backdrop-blur-sm rounded-md gap-0"
      >
        <h2 className="text-center text-xl font-semibold font-title mb-5">
          {dataTitle[`${page - 1}`]}
        </h2>

        <FormSection currentPage={page} page={2}>
          <FormItem>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              name="full_name"
              id="full_name"
              placeholder="eg. Dr. John Doe"
              defaultValue={data?.values?.full_name?.toString()}
            />
            {data?.error && (
              <ErrorMessage message={data.error.full_name?.[0] ?? ""} />
            )}
          </FormItem>
          <FormItem>
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              name="mobile"
              id="mobile"
              placeholder="eg. 01777888555"
              defaultValue={data?.values?.mobile?.toString() ?? undefined}
            />
            {data?.error && (
              <ErrorMessage message={data.error.mobile?.[0] ?? ""} />
            )}
          </FormItem>

          <FormItem>
            <Label htmlFor="email">Email address</Label>
            <Input
              name="email"
              id="email"
              placeholder="eg. m@email.com"
              defaultValue={data?.values?.email?.toString() ?? undefined}
            />
            {data?.error && (
              <ErrorMessage message={data.error.email?.[0] ?? ""} />
            )}
          </FormItem>

          <FormItem>
            <Label htmlFor="location">Address</Label>
            <Input
              name="location"
              id="location"
              placeholder="eg. Mohakhali, Dhaka"
              defaultValue={data?.values?.location?.toString() ?? undefined}
            />
            {data?.error && (
              <ErrorMessage message={data.error.location?.[0] ?? ""} />
            )}
          </FormItem>

          <FormItem>
            <Label htmlFor="speciality">Speciality</Label>
            <Input
              name="speciality"
              id="speciality"
              placeholder="eg. Eye Specialist (optional)"
              defaultValue={data?.values?.speciality?.toString() ?? undefined}
            />
            {data?.error && (
              <ErrorMessage message={data.error.speciality?.[0] ?? ""} />
            )}
          </FormItem>

          <FormItem>
            <Label htmlFor="hospital">Hospital / Clinic Name</Label>
            <Input
              name="hospital"
              id="hospital"
              placeholder="eg. Labaid (optional)"
              defaultValue={data?.values?.hospital?.toString() ?? undefined}
            />
            {data?.error && (
              <ErrorMessage message={data.error.hospital?.[0] ?? ""} />
            )}
          </FormItem>
        </FormSection>

        <FormSection currentPage={page} page={1}>
          <FormItem>
            <Label htmlFor="zone">Zone</Label>
            <Input
              name="zone"
              id="zone"
              placeholder="Zone"
              defaultValue={data?.values?.zone?.toString() ?? undefined}
            />
            {data?.error?.zone && <ErrorMessage message={data.error.zone[0]} />}
          </FormItem>

          <FormItem>
            <Label htmlFor="region">Region</Label>
            <Input
              name="region"
              id="region"
              placeholder="Region"
              defaultValue={data?.values?.region?.toString() ?? undefined}
            />
            {data?.error?.region && (
              <ErrorMessage message={data.error.region[0]} />
            )}
          </FormItem>

          <FormItem>
            <Label htmlFor="territory">Territory</Label>
            <Input
              name="territory"
              id="territory"
              placeholder="Territory"
              defaultValue={data?.values?.territory?.toString() ?? undefined}
            />
            {data?.error?.territory && (
              <ErrorMessage message={data.error.territory[0]} />
            )}
          </FormItem>
        </FormSection>

        <FormSection currentPage={page} page={3}>
          <FormItem>
            <Label htmlFor="plant_location">
              Select your location for tree plantation
            </Label>
            <Select
              className="w-full text-chart-3"
              name="plant_location"
              data={locations.sort().map((item) => {
                return {
                  label: item,
                  value: item,
                };
              })}
              placeholder="Location"
            />
            {data?.error?.plant_location && (
              <ErrorMessage message={data.error.plant_location[0]} />
            )}
          </FormItem>

          <FormItem>
            <Label htmlFor="tree_type">Select the tree</Label>
            <Select
              className="w-full text-chart-3"
              name="tree_type"
              data={treeTypes.sort().map((item) => {
                return {
                  label: item,
                  value: item,
                };
              })}
              placeholder="Tree Type"
            />
            {data?.error?.tree_type && (
              <ErrorMessage message={data.error.tree_type[0]} />
            )}
          </FormItem>
        </FormSection>

        <FormSection page={4} currentPage={page}>
          <div className="flex justify-center items-center flex-col gap-5">
            <BadgeCheck
              className="text-primary/50 fill-primary/30"
              size={100}
            />
            <p className="text-center text-sm my-5">
              To complete your registration, please click the{" "}
              <strong>Submit</strong> button.
            </p>
          </div>
        </FormSection>

        {page !== 4 && (
          <Button
            type="button"
            className="mt-4"
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        )}
        {page === 4 && (
          <Button className="mt-4" disabled={isPending}>
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
}

const FormSection = ({
  className,
  page,
  currentPage,
  ...props
}: React.ComponentProps<"div"> & { page: number; currentPage: number }) => {
  return (
    <div
      className={cn(
        `flex flex-col gap-4 transition-[height, transform] duration-700`,
        page === currentPage
          ? "visible max-h-[40rem] opacity-100 translate-y-0"
          : "invisible max-h-0 opacity-0 -translate-y-10",
        className
      )}
      {...props}
    />
  );
};
