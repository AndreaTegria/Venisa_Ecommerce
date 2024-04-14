import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Address ID is required",
      });
    }

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const deletedAddress = await Address.findByIdAndDelete(id);

      if (deletedAddress) {
        return NextResponse.json({
          success: true,
          message:"La dirección se ha eliminado correctamente.",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No se pudo eliminar la dirección. Por favor, inténtalo de nuevo.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "No estás autenticado.",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: 
      "¡Algo salió mal! Por favor, inténtalo de nuevo más tarde.",
    });
  }
}