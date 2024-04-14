import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "¡Se requiere el ID del elemento del carrito!",
        });

      const deleteCartItem = await Cart.findByIdAndDelete(id);
      if (deleteCartItem) {
        return NextResponse.json({
          success: true,
          message: "¡Elemento del carrito eliminado exitosamente!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message:
            "No se pudo eliminar el elemento del carrito. Por favor, inténtalo de nuevo.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "No estás autenticado.",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Algo salió mal. Por favor, inténtalo de nuevo.",
    });
  }
}
