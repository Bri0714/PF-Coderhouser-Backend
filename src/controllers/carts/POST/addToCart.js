import { addToCartService } from "../../../services/carts.service.js";
import productModel from "../../../dao/models/product.model.js";
import logger from "../../../utils/logger.js";

// Controlador para agregar un producto al carrito
export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    // Buscamos el producto por su ID en la base de datos
    const product = await productModel.findById(productId);

    // Verificamos si el usuario es un administrador o el propietario del producto
    if (userRole === "admin" || req.user.email === product.owner) {
      // Mostramos un mensaje de advertencia y devolvemos un código de estado 403 (Prohibido)
      logger.warning(
        "No se puede agregar su propio producto | Los usuarios administradores no pueden agregar productos al carrito"
      );
      return res.status(403).render("errors/owner-admin");
    }

    // Agregamos el producto al carrito utilizando el servicio correspondiente
    const cart = await addToCartService(productId, userId);

    // Registramos un mensaje de información
    logger.info(`Producto ${productId} agregado al carrito`);

    // Redirigimos al usuario de vuelta a la página de productos
    res.redirect("/api/products");
  } catch (err) {
    // Manejo de errores en caso de problemas al agregar el producto al carrito
    logger.error(`
      Se produjo un error al agregar el producto al carrito
      ${err.stack}  
    `);
    res.status(500).json({
      err:
        err.message || "Se produjo un error al agregar el producto al carrito",
    });
  }
};
