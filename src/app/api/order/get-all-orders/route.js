import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      const extractAllOrders = await Order.find({ user: id }).populate(
        "orderItems.product"
      );

      if (extractAllOrders) {
        return NextResponse.json({
          success: true,
          data: extractAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message:
            "Fallo al obtener todos los pedidos. Por favor, inténtalo de nuevo.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "No estás autenticado.",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
    });
  }
}
