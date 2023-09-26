import UserModel from "../../../dao/models/user.model.js";
import logger from "../../../utils/logger.js";

// Controlador para cambiar el rol de un usuario
export const changeRole = async (req, res) => {
  const { newRole } = req.body;
  try {
    // Buscamos al usuario por su ID
    const user = await UserModel.findById(req.user._id);
    
    // Verificamos si el usuario existe
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    // Verificamos si el usuario actual es un administrador
    if (user.role === "admin") {
      // Si es un administrador, no se puede cambiar su rol y mostramos un mensaje de advertencia
      logger.warning(`No se puede cambiar el rol de un administrador - (${user.email})`);
      return res.render("errors/error-admin-role");
    }

    // Cambiamos el rol del usuario
    user.role = newRole;

    // Guardamos los cambios en la base de datos
    await user.save();

    // Registramos el cambio de rol en los registros
    logger.info(`Se cambió el rol del usuario a ${newRole} - (${user.email})`);
    
    // Redirigimos al usuario a la página de usuario
    res.redirect("/api/user");
  } catch (error) {
    // Manejamos errores que puedan ocurrir durante el proceso
    console.error(error);
    res.render("errors/500");
  }
};
