// Middleware para verificar si un usuario es administrador.
export const isAdmin = (req, res, next) => {
  const user = req.user; // Obtiene el usuario de la solicitud.
  let isAdminUser = false; // Inicializa una bandera para verificar si es un administrador.

  if (user.role == "admin") { // Comprueba si el rol del usuario es "admin".
    isAdminUser = true; // Si es administrador, se establece la bandera en verdadero.
    next(); // Llama al siguiente middleware o controlador.
  } else {
    // Si no es administrador, responde con un código de estado 403 (Acceso prohibido).
    res.status(403).render("errors/accessDeniedErr", {
      message: "Acceso denegado", // Mensaje de error que se puede personalizar.
    });
  }
};
