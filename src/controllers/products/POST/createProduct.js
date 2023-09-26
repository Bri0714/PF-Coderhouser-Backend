// Importamos el servicio de creación de productos y el registro de eventos necesario.
import { createProductService } from "../../../services/products.service.js";
import logger from "../../../utils/logger.js";

// Controlador para crear un nuevo producto.
export const createProduct = async (req, res) => {
  try {
    // Llama al servicio de creación de productos con los datos de la solicitud y el correo electrónico del usuario.
    const product = await createProductService(req.body, req.user.email);
    
    // Registra un mensaje informativo de que el producto se creó con éxito.
    logger.info(`Producto ${product.title} creado exitosamente por ${req.user.email}`);
    
    // Redirige al listado de productos después de la creación exitosa.
    res.redirect("/api/products");
  } catch (err) {
    // Si se produce un error al crear el producto, registra un mensaje de error y responde con un código de estado 500 (Error interno del servidor).
    logger.error(`
      Se produjo un error al crear el producto.
      ${err.stack}  
    `);
    res
      .status(500)
      .json({ err: "Se produjo un error al crear el producto" });
  }
};



