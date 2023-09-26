import bcrypt from "bcrypt";
import MockingModel from "../dao/models/mocking.model.js";
import productModel from "../dao/models/product.model.js";
import { faker } from "@faker-js/faker";
import { createProductsDB } from "./createProducts.DB.js";
import logger from "./logger.js";

// Función para crear un hash de contraseña
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Define the password you want to hash here
//const passwordToHash = "parada2021"; // Replace with the actual password you want to hash
//const hashedPassword = createHash(passwordToHash);
//console.log(hashedPassword); // Now you can log the hashed password

// Función para validar una contraseña
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

// Función para generar productos ficticios en la colección "MockingModel"
export const generateProductsMocking = async () => {
  try {
    // Comprueba si existen documentos en la colección "MockingModel" con un tiempo máximo de espera de 60 segundos
    const existMocking = await MockingModel.countDocuments().maxTimeMS(1200000);

    // Si no existen documentos en la colección
    if (!existMocking) {
      const mockingData = [];

      // Genera datos ficticios para 100 productos
      for (let i = 0; i < 2; i++) {
        mockingData.push({
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          status: true,
          code: faker.string.uuid(),
          stock: faker.number.int({ min: 1, max: 15 }),
          category: faker.commerce.department(),
          thumbnail: [faker.image.urlPicsumPhotos()],
        });
      }

      // Inserta los datos ficticios en la colección "MockingModel"
      await MockingModel.insertMany(mockingData);

      logger.info("Generando productos ficticios (mocking)");
    }
  } catch (error) {
    logger.error("Error al generar productos ficticios (mocking): " + error.message);
  }
};

//prueba la funcion GenerateProductsMocking
//generateProductsMocking();

// Función para generar productos ficticios en la colección "productModel"
export const generateProducts = async () => {
  try {
    // Comprueba si existen documentos en la colección "productModel" con un tiempo máximo de espera de 60 segundos
    const existProducts = await productModel.countDocuments().maxTimeMS(1200000);

    // Si no existen documentos en la colección
    if (!existProducts) {
      logger.info("Generando productos ficticios");
      createProductsDB(); // Llama a una función para crear productos ficticios en la base de datos
    }
  } catch (error) {
    logger.error("Error al generar productos ficticios: " + error.message);
  }
};


// Función para generar una cadena aleatoria de caracteres
export const generateRandomString = (num) => {
  return [...Array(num)]
    .map(() => {
      const randomNum = ~~(Math.random() * 36);
      return randomNum.toString(36);
    })
    .join("")
    .toUpperCase();
};
