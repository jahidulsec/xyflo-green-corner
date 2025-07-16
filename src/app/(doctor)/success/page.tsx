import { CircleCheck } from "lucide-react";
import React from "react";

export default function SuccessPage() {
  return (
    <div className="flex justify-center items-center flex-col gap-10 text-center text-sm border rounded-md bg-primary/10 backdrop-blur-sm p-10">
      <CircleCheck size={100} className="text-primary/50 fill-primary/30" />
      <p>Thank you for your submission.</p>
      <p className="">
        Best regards, <br />{" "}
        <strong className="text-xl text-primary">Xyflo</strong>
      </p>
    </div>
  );
}
