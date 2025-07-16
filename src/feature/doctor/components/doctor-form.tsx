"use client";

import { Form, FormItem } from "@/components/forms/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import { addDoctor, updateDoctor } from "../actions/doctor";
import { ErrorMessage } from "@/components/text/error-message";
import { toast } from "sonner";
import { Select } from "@/components/selects/select";
import { doctor } from "@prisma/client";
import { locations, treeTypes } from "@/lib/data";

export default function DoctorForm({
  doctor,
  onClose,
}: {
  doctor: doctor;
  onClose: () => void;
}) {
  const [data, action, isPending] = useActionState(
    doctor ? updateDoctor.bind(null, doctor.mobile) : addDoctor,
    null
  );

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      onClose();
    }
  }, [data]);

  return (
    <Form
      action={action}
      className="bg-primary/10 p-4 backdrop-blur-sm rounded-md"
    >
      <FormItem>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          name="full_name"
          id="full_name"
          placeholder="eg. Dr. John Doe"
          defaultValue={
            data?.values?.full_name?.toString() ?? doctor.full_name ?? undefined
          }
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
          defaultValue={
            data?.values?.mobile?.toString() ?? doctor.mobile ?? undefined
          }
        />
        {data?.error && <ErrorMessage message={data.error.mobile?.[0] ?? ""} />}
      </FormItem>

      <FormItem>
        <Label htmlFor="email">Email address</Label>
        <Input
          name="email"
          id="email"
          placeholder="eg. m@email.com"
          defaultValue={
            data?.values?.email?.toString() ?? doctor.email ?? undefined
          }
        />
        {data?.error && <ErrorMessage message={data.error.email?.[0] ?? ""} />}
      </FormItem>

      <FormItem>
        <Label htmlFor="location">Address</Label>
        <Input
          name="location"
          id="location"
          placeholder="eg. Mohakhali, Dhaka"
          defaultValue={
            data?.values?.location?.toString() ?? doctor.location ?? undefined
          }
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
          defaultValue={
            data?.values?.speciality?.toString() ??
            doctor.speciality ??
            undefined
          }
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
          defaultValue={
            data?.values?.hospital?.toString() ?? doctor.hospital ?? undefined
          }
        />
        {data?.error && (
          <ErrorMessage message={data.error.hospital?.[0] ?? ""} />
        )}
      </FormItem>

      <FormItem>
        <Label htmlFor="zone">Zone</Label>
        <Input
          name="zone"
          id="zone"
          placeholder="Zone"
          defaultValue={
            data?.values?.zone?.toString() ?? doctor.zone ?? undefined
          }
        />
        {data?.error?.zone && <ErrorMessage message={data.error.zone[0]} />}
      </FormItem>

      <FormItem>
        <Label htmlFor="region">Region</Label>
        <Input
          name="region"
          id="region"
          placeholder="Region"
          defaultValue={
            data?.values?.region?.toString() ?? doctor.region ?? undefined
          }
        />
        {data?.error?.region && <ErrorMessage message={data.error.region[0]} />}
      </FormItem>

      <FormItem>
        <Label htmlFor="territory">Territory</Label>
        <Input
          name="territory"
          id="territory"
          placeholder="Territory"
          defaultValue={
            data?.values?.territory?.toString() ?? doctor.territory ?? undefined
          }
        />
        {data?.error?.territory && (
          <ErrorMessage message={data.error.territory[0]} />
        )}
      </FormItem>

      <FormItem>
        <Label htmlFor="plant_location">
          Select your location for tree plantation
        </Label>
        <Select
          className="w-full text-chart-3"
          name="plant_location"
          defaultValue={
            data?.values?.plant_location?.toString() ??
            doctor.plant_location ??
            undefined
          }
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
          defaultValue={
            data?.values?.tree_type?.toString() ?? doctor.tree_type ?? undefined
          }
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

      <Button className="mt-4" disabled={isPending}>
        Submit
      </Button>
    </Form>
  );
}
