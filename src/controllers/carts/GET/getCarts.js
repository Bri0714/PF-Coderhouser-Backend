import logger from "../../../utils/logger.js";
import {getCartsService,generateTicketService,} from "../../../services/carts.service.js";

// Controlador para obtener carritos de compra
export const getCarts = async (req, res) => {
  logger.http("GET /api/carts");

  try {
    // Obtenemos el ID del usuario desde la solicitud
    const userId = req.user._id;
    // Obtenemos el carrito de compra del usuario
    const cart = await getCartsService(userId);

    if (!cart) {
      // Si el carrito está vacío, lanzamos un error
      throw new Error("Los carritos están vacíos");
    }

    // Renderizamos la vista de "carts" con los datos del carrito
    res.render("carts", { cart: [cart] });
  } catch (err) {
    // Manejo de errores en caso de problemas al obtener los carritos
    logger.error(`
      Se produjo un error al obtener los carritos
      ${err.stack}  
    `);
    res.status(500).json({ err: "Se produjo un error al obtener los carritos" });
  }
};

// Controlador para obtener una compra
export const getPurchase = async (req, res) => {
  try {
    // Obtenemos la compra por su ID
    const purchases = await getCartsService(req.params.id);
    const purchase = purchases[0];

    if (!purchase) {
      // Si la compra está vacía, mostramos un mensaje de advertencia
      logger.warning("La compra está vacía");
      return res.status(400).render("errors/purchaseErr", {
        message: "La compra está vacía",
      });
    } else {
      // Generamos un ticket de compra
      const ticket = await generateTicketService(purchase, req.user.email);

      // Informamos que la compra se obtuvo con éxito
      logger.info("La compra se obtuvo con éxito");

      // Renderizamos la vista de "purchase" con los datos de la compra y el ticket
      res.status(200).render("purchase", { purchase, ticket });
    }
  } catch (err) {
    // Manejo de errores en caso de problemas al obtener la compra
    logger.error(`
    Se produjo un error al obtener la compra
    ${err.stack}  
  `);
    res
      .status(500)
      .json({ err: "Se produjo un error al obtener la compra" });
  }
};

