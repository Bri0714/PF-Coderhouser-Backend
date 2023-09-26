// Importamos el modelo de datos necesario y el registro de eventos.
import MockingModel from "../dao/models/mocking.model.js";
import logger from "../utils/logger.js";

// Función para obtener productos simulados con opciones de paginación, filtrado y ordenamiento.
export const getMockingService = async (
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

    // Obtenemos los productos simulados paginados y filtrados.
    const mockingProduct = await MockingModel.paginate(filter, options);

    return mockingProduct;
  } catch (err) {
    logger.error(`
      Se produjo un error al obtener los productos simulados.
      ${err.stack}  
    `);
  }
};
