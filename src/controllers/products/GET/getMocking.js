import { getMockingService } from "../../../services/mocking.service.js";
import logger from "../../../utils/logger.js";

// Controlador para obtener productos ficticios ("mocking products")
export const getMocking = async (req, res) => {
  const user = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort === "desc" ? -1 : 1;
  const query = req.query.query || "";

  // Registramos la solicitud en los registros
  logger.http("GET /api/products/mockingproducts");

  try {
    // Obtenemos los productos ficticios ("mocking products") utilizando el servicio getMockingService
    const mockingProducts = await getMockingService(page, limit, sort, query);

    // Calculamos la página anterior y la siguiente para la paginación
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < mockingProducts.totalPages ? page + 1 : null;

    // Creamos un objeto de datos que contiene la información de los productos ficticios, datos de paginación y detalles del usuario
    const data = {
      mockingProducts,
      query,
      limit,
      sort,
      prevPage,
      nextPage,
      userEmail: user.email,
      userRole: user.role,
    };

    // Agregamos los parámetros de consulta a los datos
    Object.assign(data, req.query);

    // Renderizamos la página "mocking" con los datos obtenidos
    res.status(201).render("mocking", data);
  } catch (err) {
    // Manejamos errores que puedan ocurrir durante la obtención de los productos ficticios
    logger.error(`
      Se produjo un error al obtener los productos ficticios
      ${err.stack}  
    `);
    res
      .status(500)
      .json({ err: "Se produjo un error al obtener los productos ficticios" });
  }
};
