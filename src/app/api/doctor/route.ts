"use server";

import db from "../../../../db/db";

export async function GET() {
  try {
    const data = await db.doctor.findMany({
      select: {
        full_name: true,
        mobile: true,
        email: true,
        location: true,
        speciality: true,
        hospital: true,
        zone: true,
        region: true,
        territory: true,
        tree_type: true,
        plant_location: true,
        created_at: true,
      },
    });

    return Response.json({ data: data, error: null });
  } catch (error) {
    console.error(error);
    return Response.json({
      data: [],
      error: (error as any).message,
    });
  }
}
