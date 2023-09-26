// Importamos los modelos y el registro de eventos necesarios.
import productManager from "../dao/manager/products.manager.js";
import productModel from "../dao/models/product.model.js";
import logger from "../utils/logger.js";

// Función para obtener productos con opciones de paginación, filtrado y ordenamiento.
export const getProductsService = async (
  page = 1,
  limit = 10,
  sort = 1,
  query = ""
) => {
  try {
    // Filtramos los productos basados en una consulta (query) en el título o la categoría.
    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } }, // Búsqueda insensible a mayúsculas y minúsculas en el título.
            { category: { $regex: query, $options: "i" } }, // Búsqueda insensible a mayúsculas y minúsculas en la categoría.
          ],
        }
      : {}; // Sin filtro si no se proporciona una consulta.

    // Configuramos las opciones de paginación, límite y ordenamiento.
    const options = {
      page,
      limit,
      sort: { price: sort }, // Ordenamos por precio ascendente (1) o descendente (-1).
      lean: true, // Devolvemos resultados como objetos JavaScript simples.
    };

    // Obtenemos los productos paginados y filtrados.
    const products = await productModel.paginate(filter, options);

    return products;
  } catch (err) {
    logger.error(`
      Se produjo un error al obtener los productos.
      ${err.stack}  
    `);
  }
};

// Función para crear un nuevo producto.
export const createProductService = async (productData, ownerEmail) => {
  try {
    // Creamos el producto utilizando el gestor de productos.
    const product = await productManager.createProduct(productData, ownerEmail);
    return product;
  } catch (err) {
    logger.error(`
      Se produjo un error al crear el producto.
      ${err.stack}  
    `);
  }
};