import { removeFromCartService } from "../../../services/carts.service.js";
import logger from "../../../utils/logger.js";

// Controlador para eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    // Utilizamos el servicio para eliminar el producto del carrito
    const cart = await removeFromCartService(productId, userId);

    // Registramos un mensaje de información
    logger.info(`${productId} ha sido eliminado del carrito`);

    // Redirigimos al usuario de vuelta a la página de productos
    res.redirect("/api/products");
  } catch (err) {
    // Manejo de errores en caso de problemas al eliminar el producto del carrito
    logger.error(`
      Se produjo un error al eliminar el producto del carrito
      ${err.stack}  
    `);
    res.status(500).json({
      error: "Se produjo un error al eliminar el producto del carrito.",
    });
  }
};