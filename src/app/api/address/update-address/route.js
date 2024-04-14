import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { _id, fullName, city, address, country, postalCode } = data;

      const updateAddress = await Address.findOneAndUpdate(
        {
          _id: _id,
        },
        { fullName, city, address, country, postalCode },
        { new: true }
      );

      if (updateAddress) {
        return NextResponse.json({
          success: true,
          message: "¡Dirección actualizada exitosamente!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "¡No se pudo actualizar la dirección! Por favor, inténtalo de nuevo",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "No estás autenticado",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "¡Algo salió mal! Por favor, inténtalo de nuevo más tarde",
    });
  }
}