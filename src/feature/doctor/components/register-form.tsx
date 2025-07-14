"use client";

import { Form, FormItem } from "@/components/forms/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import { addDoctor } from "../actions/doctor";
import { ErrorMessage } from "@/components/text/error-message";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next/app";
import { ImageInput } from "@/components/input/image-input";
import { Select } from "@/components/selects/select";

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

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      router.push("/register/success");
    }
  }, [data]);

  return (
    <Form action={action} className="max-w-sm mx-auto md:w-full ">
      <FormItem>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          name="full_name"
          id="full_name"
          placeholder="eg. Dr. John Doe"
          defaultValue={data?.values?.full_name.toString()}
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
          defaultValue={data?.values?.mobile.toString() ?? undefined}
        />
        {data?.error && <ErrorMessage message={data.error.mobile?.[0] ?? ""} />}
      </FormItem>

      <FormItem>
        <Label htmlFor="email">Email address</Label>
        <Input
          name="email"
          id="email"
          placeholder="eg. m@email.com"
          defaultValue={data?.values?.mobile.toString() ?? undefined}
        />
        {data?.error && <ErrorMessage message={data.error.mobile?.[0] ?? ""} />}
      </FormItem>

      <FormItem className="col-span-1 md:col-span-3">
        <Label>Image</Label>
        <ImageInput
          id="1"
          imageClassName="w-30 h-30 rounded-md border"
          width={100}
          height={100}
          type="file"
          name="image"
          className="rounded-md"
          defaultFile={data?.values?.image ?? undefined}
        />
        {data?.error?.image && <ErrorMessage message={data.error.image[0]} />}
      </FormItem>

      <FormItem>
        <Label htmlFor="mio_id">SAP Territory Code</Label>
        <Input
          name="mio_id"
          id="mio_id"
          placeholder="SAP territory code"
          defaultValue={data?.values?.mio_id.toString() ?? undefined}
        />
        {data?.error?.mio_id && <ErrorMessage message={data.error.mio_id[0]} />}
      </FormItem>

      <FormItem>
        <Label htmlFor="location">Select Your Location</Label>
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
        {data?.error?.location && <ErrorMessage message={data.error.location[0]} />}
      </FormItem>

      <FormItem>
        <Label htmlFor="tree_type">Select Tree Type</Label>
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
        {data?.error?.tree_type && <ErrorMessage message={data.error.tree_type[0]} />}
      </FormItem>

      <Button disabled={isPending}>Register</Button>
    </Form>
  );
}
