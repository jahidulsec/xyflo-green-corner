"use server";
import { phoneRegex } from "@/lib/regex";
import { z } from "zod";

const addSchema = z.object({
  full_name: z.string().min(2, { message: "At least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().regex(phoneRegex, { message: "Invalid" }),
  zone: z.string().min(2, { message: "At least 2 characters" }),
  region: z.string().min(2, { message: "At least 2 characters" }),
  territory: z.string().min(2, { message: "At least 2 characters" }),
  location: z.string().min(2, { message: "Select your location" }),
  tree_type: z.string().min(2, { message: "Select a tree type" }),
});

export const addDoctor = async (prevState: unknown, formData: FormData) => {
  const modifiedFormData = Object.fromEntries(formData.entries());

  // Create a cleaned version
  const cleanedFormData = new FormData();

  for (const key in modifiedFormData) {
    if (
      modifiedFormData[key] !== null &&
      modifiedFormData[key] !== undefined &&
      modifiedFormData[key] !== "null" &&
      modifiedFormData[key] !== "" &&
      modifiedFormData[key] !== "undefined"
    ) {
      cleanedFormData.append(key, modifiedFormData[key]);
    }
  }

  try {
    const result = addSchema.safeParse(
      Object.fromEntries(cleanedFormData.entries())
    );

    if (result.success === false) {
      return {
        error: result.error.formErrors.fieldErrors,
        success: null,
        toast: null,
        values: modifiedFormData,
      };
    }

    // const data = result.data;

    // check doctor
    // const doctor = await db.doctor.findUnique({
    //   where: {
    //     mobile: data.mobile,
    //   },
    // });

    // if (doctor) {
    //   throw { message: "Doctor with this mobile already exists" };
    // }

    // const user = await db.doctor.create({
    //   data: {
    //     ...data,
    //     image: uploadedImage,
    //   },
    // });

    return {
      error: null,
      success: "Account is successfully created",
      toast: null,
    };
  } catch (error) {
    console.error(error);

    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === "P2003") {
    //     return {
    //       error: null,
    //       success: null,
    //       toast: `${error?.meta?.constraint} does not exists`,
    //       values: modifiedFormData,
    //     };
    //   }
    // }

    return {
      error: null,
      success: null,
      toast: (error as any).message,
      values: modifiedFormData,
    };
  }
};
