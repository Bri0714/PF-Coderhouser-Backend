// Importamos el modelo de productos necesario.
import productModel from "../../../dao/models/product.model.js";

// Controlador para actualizar un producto.
export const updateProduct = async (req, res) => {
  const productId = req.params.productId; // Obtiene el ID del producto desde los parámetros de la URL.
  const updatedData = req.body; // Obtiene los datos actualizados desde la solicitud.

  try {
    if (updatedData.stock <= 0) {
      // Si la cantidad en stock es menor o igual a cero, responde con un código de estado 404 (No encontrado) y muestra un mensaje de error.
      return res.status(404).render('errors/update-stock-error');
    }

    if (updatedData.price <= 0) {
      // Si el precio es menor o igual a cero, responde con un código de estado 404 (No encontrado) y muestra un mensaje de error.
      return res.status(404).render('errors/update-price-error');
    }

    // Actualiza el producto utilizando el ID proporcionado y los datos actualizados.
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true } // Devuelve el producto actualizado en lugar del original.
    );

    if (!updatedProduct) {
      // Si el producto no se encuentra, responde con un código de estado 404 (No encontrado).
      return res.status(404).send("Producto no encontrado");
    }

    // Redirige a la página de gestión de productos después de la actualización exitosa.
    res.redirect(`/api/products/manager`);
  } catch (error) {
    // Si se produce un error al actualizar el producto, registra un mensaje de error y responde con un código de estado 500 (Error interno del servidor).
    console.error("Error al actualizar el producto:", error);
    res.status(500).send("Error al actualizar el producto");
  }
};