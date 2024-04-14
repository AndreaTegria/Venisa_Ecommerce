import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";

import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";
const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

 
    const isAuthUser =await AuthUser(req)
    console.log(isAuthUser ,'andrea');

   
    if (isAuthUser?.role === "admin") {
      const extractData = await req.json();

      const {
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      } = extractData;

      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractData);

      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message:
          "Producto añadido exitosamente.",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "No se pudo añadir el producto. Por favor, inténtalo de nuevo.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "No estás autorizado.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 
      "¡Algo salió mal! Por favor, inténtalo de nuevo más tarde.",
    });
  }
}