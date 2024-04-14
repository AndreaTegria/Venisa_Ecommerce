import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    const data = await req.json();

    if (isAuthUser?.role === "admin") {
      const {
        _id,
        shippingAddress,
        orderItems,
        paymentMethod,
        isPaid,
        paidAt,
        isProcessing,
      } = data;

      const updateOrder = await Order.findOneAndUpdate(
        { _id: _id },
        {
          shippingAddress,
          orderItems,
          paymentMethod,
          isPaid,
          paidAt,
          isProcessing,
        },
        { new: true }
      );

      if (updateOrder) {
        return NextResponse.json({
          success: true,
          message: "¡Estado del pedido actualizado exitosamente!",
        });
      } else {
        return NextResponse.json({
          success: true,
          message: "No se pudo actualizar el estado del pedido.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "¡No estás autorizado!",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
    });
  }
}
