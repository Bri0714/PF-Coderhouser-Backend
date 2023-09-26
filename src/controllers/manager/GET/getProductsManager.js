import productModel from "../../../dao/models/product.model.js";

// Controlador para obtener la información de un producto específico
export const getProductsManager = async (req, res) => {
  const productId = req.params.productId;
  const user = req.user;

  try {
    // Intentamos obtener el producto con el ID proporcionado
    const product = await productModel.findById(productId);

    // Si el producto no se encuentra, respondemos con un estado 404
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    // Comparamos el propietario del producto con el usuario actual y el rol del usuario
    switch (true) {
      case product.owner === user.email:
        // Si el usuario es el propietario del producto, renderizamos la página de actualización de productos con los datos del producto
        return res.render("updateProducts", product);
        
      case product.owner == user.role:
        // Si el usuario tiene un rol igual al propietario del producto, también renderizamos la página de actualización de productos con los datos del producto
        return res.render("updateProducts", product);

      default:
        // Si no se cumplen las condiciones anteriores, renderizamos una página de error de actualización
        res.render("errors/update-error");
    }
  } catch (error) {
    // Manejo de errores en caso de problemas al obtener la información del producto
    console.error("Error al obtener el producto:", error);
    res.status(500).send("Error al obtener el producto");
  }
};