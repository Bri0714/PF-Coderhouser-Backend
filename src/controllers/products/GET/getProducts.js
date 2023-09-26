import { getProductsService } from "../../../services/products.service.js";
import logger from "../../../utils/logger.js";

// Controlador para obtener productos
export const getProducts = async (req, res) => {
  const user = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort === "desc" ? -1 : 1;
  const query = req.query.query || "";
  const manager = req.params.manager || "";

  // Determinamos la página que se va a renderizar, dependiendo del valor de "manager" en la URL
  const renderingPage = manager === "manager" ? "manager" : "products";

  // Verificamos si el usuario tiene acceso para ver la página "manager"
  if (
    renderingPage === "manager" &&
    user.role !== "admin" &&
    user.role !== "premium"
  ) {
    // Si no tiene acceso, respondemos con un error de acceso denegado
    return res.status(403).render("errors/accessDeniedErr", {
      message: "Acceso Denegado",
    });
  }

  // Registramos la solicitud en los registros
  logger.http("GET /api/products");

  try {
    // Obtenemos los productos utilizando el servicio getProductsService
    const products = await getProductsService(page, limit, sort, query);

    // Calculamos la página anterior y la siguiente para la paginación
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < products.totalPages ? page + 1 : null;

    // Creamos un objeto de datos que contiene la información de los productos, datos de paginación y detalles del usuario
    const data = {
      products,
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

    // Renderizamos la página correspondiente con los datos obtenidos
    res.status(201).render(renderingPage, data);
  } catch (err) {
    // Manejamos errores que puedan ocurrir durante la obtención de los productos
    logger.error(`
      Se produjo un error al obtener los productos.
      ${err.stack}  
    `);
    res
      .status(500)
      .json({ err: "Se produjo un error al obtener los productos" });
  }
};
