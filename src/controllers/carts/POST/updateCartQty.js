export const updateCartQty = async (req, res) => {
  const { cartId, productId, quantity } = req.body;

  try {
    // Utilizamos el servicio para actualizar la cantidad de un producto en el carrito
    const cart = await updateCartQtyService(cartId, productId, quantity);

    // Si el carrito es nulo, significa que no hay suficiente stock
    if (cart === null) {
      // Registramos un mensaje de advertencia
      logger.warning(`${productId} sin stock`);

      // Renderizamos una página de error indicando que no hay suficiente stock o que el valor ingresado es incorrecto
      return res.render("errors/stockError", {
        message:
          "No hay suficiente stock para este producto o el valor ingresado es incorrecto",
      });
    }

    // Redirigimos al usuario de vuelta a la página de carritos
    res.redirect("/api/carts");
  } catch (err) {
    // Manejo de errores en caso de problemas al actualizar la cantidad del producto
    logger.error(`
      Se produjo un error al actualizar la cantidad del producto
      ${err.stack}  
    `);
    res.status(500).json({
      error: "Se produjo un error al actualizar la cantidad del producto.",
    });
  }
};