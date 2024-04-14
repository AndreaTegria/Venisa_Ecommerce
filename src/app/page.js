"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllAdminProducts();
      if (res.success) {
        // Ordenar los productos por fecha de creación de manera descendente
        const sortedProducts = res.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        // Tomar los primeros seis productos
        const latestProducts = sortedProducts.slice(0, 6);
        setProducts(latestProducts);
      }
    }
    fetchData();
  }, []);


  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="">
        <div className="grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-2 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Todo lo que quieres en un solo lugar
            </h1>
            <p className="mt-6 max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              En <strong className="font-semibold">VENISA</strong> te ofrecemos
              una amplia selección de productos cuidadosamente seleccionados
              para satisfacer todas tus necesidades. Desde la última tecnología
              hasta los productos más exclusivos de belleza y cuidado del hogar,
              estamos aquí para hacer tu vida más fácil y emocionante.
            </p>
            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
              EXPLOREMOS
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="/D_NQ_NP_2X_929387-MLA53272136059_012023-F.webp"
              alt="Explore Shop Collection"
              className="w-full h-auto" // Ajuste de tamaño de imagen
            />
          </div>
        </div>

        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">
              COMPRAR POR CATEGORIA
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <img
                  src="https://plus.unsplash.com/premium_photo-1710408904578-dfc6ff8b3b68?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">BELLEZA</h3>
                  <button
                    onClick={() => router.push("/product/listing/belleza")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img src="/istockphoto-1297953289-612x612.jpg" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    HOGAR Y TECNOLOGIA
                  </h3>
                  <button
                    onClick={() =>
                      router.push("/product/listing/hogar-tecnologia")
                    }
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <img
                  src="/pets-3715733_1280 (1).jpg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">MASCOTAS</h3>
                  <button
                    onClick={() => router.push("/product/listing/mascotas")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className=" mb-14 text-xl font-bold text-gray-900 sm:text-3xl">
            Nuevos Artículos
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* Agregar algunos productos aquí */}
          {products &&
            products.length &&
            products.slice(0, 6).map((productItem) => (
              <div
                key={productItem._id}
                onClick={() => router.push(`/product/${productItem._id}`)}
                className="cursor-pointer bg-white rounded-lg shadow-lg"
              >
                {" "}
                <img
                  src={productItem.imageUrl}
                  alt="New Product Item"
                  className=" w-30 h-auto rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-center text-lg font-semibold">{productItem.name}</h3>
                  <p className="text-center text-sm text-gray-700">${productItem.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Enlace a WhatsApp con imagen del logo */}
      <div className="mt-8 flex items-center">
        <img
          src="/whatsapp-logo.png" // Ruta de la imagen del logo de WhatsApp
          alt="WhatsApp Logo"
          className="h-12 w-12 mr-4" 
        />
        <a href="https://wa.me/3102167784" className="text-xl font-semibold">
          Contáctanos
        </a>
      </div>

      {/* Pie de página con derechos de autor */}
      <footer className="py-4 text-center text-gray-500 text-lg font-semibold mt-8">
        © 2024 Venisa. Todos los derechos reservados.
      </footer>
    </main>
  );
}
