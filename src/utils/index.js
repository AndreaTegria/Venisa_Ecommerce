export const navOptions = [
    {
      id: "home",
      label: "Home",
      path: "/",
    },
    {
      id: "listing",
      label: "Todo",
      path: "/product/listing/all-products",
    },
    {
      id: "listingMascotas",
      label: "Mascotas",
      path: "/product/listing/mascotas",
    },
    {
      id: "listingHogarTecnologia",
      label: "Hogar y Tecnologia",
      path: "/product/listing/hogar-tecnologia",
    },
    {
      id: "listingBelleza",
      label: "Belleza ",
      path: "/product/listing/belleza",
    },

 
  ];
  
  export const adminNavOptions = [
    {
      id: "adminListing",
      label: "Administrar Productos",
      path: "/admin-view/all-products",
    },
    {
      id: "adminNewProduct",
      label: "Agregar Nuevo Producto",
      path: "/admin-view/add-product",
    },
  ];
  

 export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Ingresa tu nombre",
    label: "Nombre",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Ingresa tu correo",
    label: "Correo",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Ingresa tu contraseña",
    label: "Contraseña",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Rol",
    componentType: "select",
    options: [
     /* {
        id: "admin",
        label: "Administrador",
      },*/
      {
        id: "customer",
        label: "Usuario",
      },
    ],
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Ingresa tu correo",
    label: "Correo",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Ingresa tu contraseña",
    label: "Contraseña",
    componentType: "input",
  },
];
export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Nombre del producto",
    label: "Nombre",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Ingresa el precio",
    label: "Precio",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Agrega una descripcion",
    label: "Descripcion",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Categoria",
    componentType: "select",
    options: [
      {
        id: "Mascotas",
        label: "Mascotas",
      },
      {
        id: "Hogar y Tecnologia",
        label: "Hogar y Tecnologia",
      },
      {
        id: "Belleza",
        label: "Belleza",
      },
    ],
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "informacion Entrega",
    label: "Delivery Info",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Ingresa el valor del descuento",
    label: "Precio Descuento",
    componentType: "input",
  },
];



export const firebaseConfig = {
  apiKey: "AIzaSyBtUm6kjht52S0gDPKIIr9S48UW4tNrHr8",
  authDomain: "next-js-ecommerce-1f2d8.firebaseapp.com",
  projectId: "next-js-ecommerce-1f2d8",
  storageBucket: "next-js-ecommerce-1f2d8.appspot.com",
  messagingSenderId: "1068418115046",
  appId: "1:1068418115046:web:ee3be4fd71dac0526fe227",
  measurementId: "G-4EJXEP1387"
};

export const firebaseStroageURL= 'gs://next-js-ecommerce-1f2d8.appspot.com';

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Ingresa tu nombre completo",
    label: "Nombre Completo",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Ingresa tu dirección completa",
    label: "Direccion",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Ingresa tu ciudad",
    label: "Ciudad",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Ingresa tu pais",
    label: "Pais",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Ingresar codigo Postal",
    label: "Codigo Postal",
    componentType: "input",
  },
];