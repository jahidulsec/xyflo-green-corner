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

const locations = [
  "Jamalpur",
  "Moulavi Bazar",
  "Tangail",
  "Cumilla",
  "Bhola",
  "Jessore",
  "Barishal",
  "Gaibandha",
  "Rangpur",
  "Rajbari",
  "Kurigram",
  "Chadpur",
  "Habiganj",
  "Baria",
  "Noakhali",
  "Chottogram",
  "Nogaon",
  "Dhaka",
  "Faridpur",
  "Cox’s Bazar",
  "Nator",
  "Bogura",
  "Gopalganj",
  "Mymensingh",
  "Narsindhi",
];

const treeTypes = [
  "Mango",
  "Java Palm (Jam)",
  "Kathal/Jackfruit",
  "Lychee",
  "Kul Boroi (Jujube)",
  "Guava",
  "Aamra",
  "Amloki",
  "Daalim",
  "Lemon/Lebu",
];

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
      router.push("/register/success");
    } else if (data?.error) {
      setPage(1);
      toast.warning('Please check your respose')
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
        className="mb-14 bg-primary/10 p-4 backdrop-blur-sm rounded-md min-h-[20rem]"
      >
        <h2 className="text-center text-xl font-semibold font-title">
          {dataTitle[`${page - 1}`]}
        </h2>

        {page === 2 ? (
          <>
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
                defaultValue={data?.values?.mobile?.toString() ?? undefined}
              />
              {data?.error && (
                <ErrorMessage message={data.error.mobile?.[0] ?? ""} />
              )}
            </FormItem>
          </>
        ) : page === 1 ? (
          <>
            <FormItem>
              <Label htmlFor="zone">Zone</Label>
              <Input
                name="zone"
                id="zone"
                placeholder="Zone"
                defaultValue={data?.values?.zone?.toString() ?? undefined}
              />
              {data?.error?.zone && (
                <ErrorMessage message={data.error.zone[0]} />
              )}
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
          </>
        ) : page === 3 ? (
          <>
            <FormItem>
              <Label htmlFor="location">
                Select your location for tree plantation
              </Label>
              <Select
                className="w-full text-chart-3"
                data={locations.sort().map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                })}
                placeholder="Location"
              />
              {data?.error?.location && (
                <ErrorMessage message={data.error.location[0]} />
              )}
            </FormItem>

            <FormItem>
              <Label htmlFor="tree_type">Select the tree</Label>
              <Select
                className="w-full text-chart-3"
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
          </>
        ) : (
          <div className="flex justify-center items-center flex-col gap-5">
            <BadgeCheck
              className="text-primary/50 fill-primary/30"
              size={100}
            />
            <p>Submit your response.</p>
          </div>
        )}

        {page !== 4 && (
          <Button type="button" onClick={() => setPage(page + 1)}>
            Next
          </Button>
        )}
        {page === 4 && <Button disabled={isPending}>Register</Button>}
      </Form>
    </div>
  );
}
