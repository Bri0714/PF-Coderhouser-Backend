// Importamos los módulos y utilidades necesarios.
import productManager from "../../../dao/manager/products.manager.js";
import logger from "../../../utils/logger.js";
import { deleteProductMailer } from "../../../utils/deleteMailer.js";

// Controlador para eliminar un producto.
export const deleteProduct = async (req, res) => {
  const { productId } = req.body; // Obtiene el ID del producto desde la solicitud.
  const { productOwner } = req.body; // Obtiene el propietario del producto desde la solicitud.
  const { productTitle } = req.body; // Obtiene el título del producto desde la solicitud.
  const user = req.user; // Obtiene el usuario autenticado desde la solicitud.

  try {
    const product = await productManager.deleteProduct(productId);
    if (!product) {
      // Si el producto no se encuentra, responde con un código de estado 404 (No encontrado).
      return res.status(404).json({ err: "Producto no encontrado" });
    }

    if (user.role === "admin" || product.owner === user.email) {
      // Si el usuario es un administrador o el propietario del producto, procede a eliminarlo.
      await productManager.deleteProduct(productId);
      deleteProductMailer(productOwner, productTitle); // Envia un correo electrónico para notificar la eliminación.

      logger.info(`Producto ${productId} eliminado`);
      // Registra un mensaje informativo y redirige al listado de productos.
      return res.redirect("/api/products");
    } else {
      // Si el usuario no tiene permisos para eliminar el producto, responde con un código de estado 403 (Acceso prohibido).
      logger.warning(
        `Permiso denegado para eliminar el producto. ${user.email} no es el propietario del producto (${productId}) `
      );
      return res.status(403).render("errors/owner-denied");
    }
  } catch (err) {
    // Si se produce un error al eliminar el producto, registra un mensaje de error y responde con un código de estado 500 (Error interno del servidor).
    logger.error(`
      Se produjo un error al eliminar el producto de la base de datos.
      ${err.stack}  
    `);
    res.status(500).json({
      err: "Se produjo un error al eliminar el producto de la base de datos.",
    });
  }
};