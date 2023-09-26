import {
  ATLAS_DB_NAME,
  ATLAS_URI,
  MONGO_DB_NAME,
  MONGO_URI,
  PERSISTANCE,
  PORT,
} from "../config/config.js";
import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const ServerUp = async (app) => {
  // Comprobamos el valor de la variable PERSISTANCE
  switch (PERSISTANCE) {
    case "DEV":
      try {
        // Conectamos a la base de datos de desarrollo (MONGO_URI)
        await mongoose.connect(MONGO_URI, {
          dbName: MONGO_DB_NAME,
        });
        logger.debug("¡Conexión a la base de datos de desarrollo establecida!");
        // Iniciamos el servidor en el puerto especificado (PORT)
        app.listen(PORT, () =>
          logger.info(`Servidor en línea en http://localhost:${PORT}/api/products\n`)
        );
      } catch (err) {
        // Manejo de errores en caso de problemas al conectar o iniciar el servidor
        logger.fatal("Error al intentar iniciar el servidor.\n", err);
      }
      break;

    case "PROD":
      try {
        // Conectamos a la base de datos de producción (ATLAS_URI)
        await mongoose.connect(ATLAS_URI, {
          dbName: ATLAS_DB_NAME,
        });
        logger.debug("¡Conexión a la base de datos de producción establecida!");
        // Iniciamos el servidor en el puerto especificado (PORT)
        app.listen(PORT, () =>
          logger.info(`Servidor en línea en http://localhost:${PORT}/api/products\n`)
        );
      } catch (err) {
        // Manejo de errores en caso de problemas al conectar o iniciar el servidor
        logger.fatal("Error al intentar iniciar el servidor.\n", err);
      }
      break;
  }
};