import productModel from "../dao/models/product.model.js";

export const createProductsDB = async () => {
  const existingProducts = await productModel.countDocuments();
  if (!existingProducts) {
    const products = await productModel.insertMany([
      {
        title: "Computadora de escritorio",
        description:
          "Computadora de escritorio con procesador Intel Core i5, 8GB de RAM, 256GB de almacenamiento SSD y tarjeta gráfica Nvidia GTX 1650.",
        price: 100000,
        status: true,
        code: "c0mp4ut4d0r4d3s3cr1t0r10",
        stock: 10,
        category: "Computadoras",
        thumbnail: [
          "https://w7.pngwing.com/pngs/922/787/png-transparent-ideacentre-lenovo-desktop-computers-all-in-one-lenovo-pc-electronics-gadget-computer-thumbnail.png",
        ],
      },
      {
        title: "Portátil",
        description:
          "Portátil con procesador Intel Core i7, 16GB de RAM, 512GB de almacenamiento SSD y tarjeta gráfica Nvidia RTX 3060.",
        price: 150000,
        status: true,
        code: "p0rt4t1l",
        stock: 15,
        category: "Computadoras",
        thumbnail: [
          "https://pngimg.com/uploads/laptop/laptop_PNG101814.png",
        ],
      },
      {
        title: "All-in-one",
        description:
          "All-in-one con procesador Intel Core i9, 32GB de RAM, 1TB de almacenamiento SSD y tarjeta gráfica Nvidia RTX 3080.",
        price: 200000,
        status: true,
        code: "4ll-1n-0n3",
        stock: 5,
        category: "Computadoras",
        thumbnail: [
          "https://tse4.mm.bing.net/th?id=OIP.Ztf4c_LLmjcsD-8nwkOCbwHaHa&pid=Api&P=0&h=180",
        ],
      },
      {
        title: "Tablet",
        description:
          "Tablet con procesador Apple M1, 8GB de RAM, 256GB de almacenamiento SSD y pantalla de 12,9 pulgadas.",
        price: 120000,
        status: true,
        code: "t4b1l3t",
        stock: 13,
        category: "Computadoras",
        thumbnail: [
          "https://tse4.mm.bing.net/th?id=OIP.O6zc_U_1DBMCtpc32ad9jAAAAA&pid=Api&P=0&h=180",
        ],
      },
      {
        title: "Celular",
        description:
          "Celular con procesador Qualcomm Snapdragon 8 Gen 1, 12GB de RAM, 512GB de almacenamiento y pantalla de 6,7 pulgadas.",
        price: 250000,
        status: true,
        code: "c3l4c4u10r",
        stock: 11,
        category: "Celulares",
        thumbnail: [
          "https://tse2.mm.bing.net/th?id=OIP.oPNiKwAYXW5o_jGhIJiK-AHaEK&pid=Api&P=0&h=180",
        ],
      },
    ]);
  }
};

//llamar la funcion 
createProductsDB();