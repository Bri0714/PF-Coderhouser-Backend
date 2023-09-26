import EErros from "../services/errors/enums.js";

export default (error, req, res, next) => {
  console.log(error.cause); // Registra la causa del error en la consola (puedes personalizar esto).

  // Utiliza un bloque switch para manejar diferentes tipos de errores en función de su código.
  switch (error.code) {
    case EErros.INVALID_TYPES_ERROR:
      // Si el error es de tipo "INVALID_TYPES_ERROR", responde con un código de estado 400 (Solicitud incorrecta).
      res.status(400).send({ status: "error", error: error.name });
      break;

    case EErros.ERROR_GET_CARTS:
      // Si el error es de tipo "ERROR_GET_CARTS", responde con un código de estado 500 (Error interno del servidor).
      res.status(500).send({ status: "error", error: error.name });
      break;

    case EErros.ERROR_POST_CARTS:
      // Si el error es de tipo "ERROR_POST_CARTS", responde con un código de estado 500 (Error interno del servidor).
      res.status(500).send({ status: "error", error: error.name });
      break;

    case EErros.ERROR_ADD_TO_CART:
      // Si el error es de tipo "ERROR_ADD_TO_CART", responde con un código de estado 500 (Error interno del servidor).
      res.status(500).send({ status: "error", error: error.name });
      break;

    default:
      // Si el error no coincide con ninguno de los casos anteriores, responde con un mensaje de "Error no manejado".
      res.send({ status: "error", error: "Error no manejado" });
      break;
  }
};
