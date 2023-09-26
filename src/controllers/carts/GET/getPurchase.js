import logger from "../../../utils/logger.js";
import {getCartsService,generateTicketService,} from "../../../services/carts.service.js";

// Controlador para obtener una compra
export const getPurchase = async (req, res) => {
  try {
    // Obtenemos el ID de usuario desde la solicitud
    const userId = req.user.id;
    // Obtenemos las compras del usuario
    const purchases = await getCartsService(userId);
    const purchase = purchases;

    if (!purchase || !purchase.products || purchase.products.length === 0) {
      // Si la compra está vacía, mostramos un mensaje de error
      logger.error(`
        La compra está vacía
        ${err.stack}  
      `);

      return res.status(400).render("errors/purchaseErr", {
        message: "La compra está vacía",
      });
    }

    // Generamos un ticket de compra
    const ticket = await generateTicketService(purchase, req.user.email);

    // Renderizamos la vista de "purchase" con los datos de la compra y el ticket
    res.status(200).render("purchase", { purchase, ticket });
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