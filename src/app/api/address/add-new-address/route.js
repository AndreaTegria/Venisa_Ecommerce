import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewAddress = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  userID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();

      const { fullName, address, city, country, postalCode, userID } = data;

      const { error } = AddNewAddress.validate({
        fullName,
        address,
        city,
        country,
        postalCode,
        userID,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyAddedAddress = await Address.create(data);

      if (newlyAddedAddress) {
        return NextResponse.json({
          success: true,
          message: "Dirección añadida correctamente",
        });
      } else {
        return NextResponse.json({
          success: false,
          message:"¡No se pudo añadir la dirección! Por favor, inténtalo de nuevo más tarde.",
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
      message: "¡Algo salió mal! Por favor, inténtalo de nuevo más tarde.",
    });
  }
}