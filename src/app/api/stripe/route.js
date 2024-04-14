import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51OrAUgKfkZY5F3VJr2DMbaYJagqVborrGnWEJX78ZayCW213Tc3sDG9U4Xt0zEX0CsWGQ5ydNnwiae5AxIEaIh8c00WbC05NH0"
);

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const res = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: "http://localhost:3000/checkout" + "?status=success",
        cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "No estás autenticado.",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Algo salió mal. Por favor, inténtalo de nuevo.",
    });
  }
}
