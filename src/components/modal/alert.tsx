import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";

const AlertModal = ({
  onAction,
  pending,
  ...props
}: React.ComponentProps<React.FC<AlertDialogProps>> & {
  onAction?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  pending?: boolean
}) => {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onAction} asChild>
            <Button disabled={pending}>Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { AlertModal };
