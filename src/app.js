// Importamos las bibliotecas necesarias.
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import path from "path";
import passport from "passport";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUiExpress from "swagger-ui-express";

// Importamos los enrutadores y configuraciones necesarios.
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import sessionRouter from "./routers/session.router.js";
import loggerTest from "./routers/loggerTest.router.js";
import usersRouter from "./routers/users.router.js";
import usersManager from "./routers/usersManager.js";
import initializePassport from "./config/passport.config.js";
import { MONGO_DB_NAME, MONGO_URI } from "./config/config.js";
import { generateProductsMocking } from "./utils/utils.js";
import { ServerUp } from "./dto/persistanceFactory.js";
import { generateProducts } from "./utils/utils.js";
import errorHandler from "./middleware/error.middleware.js";
import error404 from "./middleware/404.middleware.js";

// Configuración básica de Express.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable("x-powered-by");
app.use(errorHandler);

// Configuración de Swagger para la documentación de la API.
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de la API - Proyecto-Final",
      description: "Documentación de las rutas de productos y carritos",
    },
  },
  apis: ["./docs/**/*.yaml"],
};

const specs = swaggerJSDoc(swaggerOptions);

// Configuración de Handlebars para las plantillas.
const hbs = exphbs.create();
app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la sesión y autenticación de Passport.
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      dbName: MONGO_DB_NAME,
    }),
    secret: "Chris-P-Bacon",
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Middleware para asegurar la autenticación del usuario.
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/api/session/login");
};

// Definición de las rutas de los enrutadores.
app.use("/api/productos", ensureAuthenticated, productsRouter);
app.use("/api/carritos", ensureAuthenticated, cartsRouter);
app.use("/api/sesion", sessionRouter);
app.use("/api/loggerTest", loggerTest);
app.use("/api/usuario", ensureAuthenticated, usersRouter);
app.use("/api/usuarios", ensureAuthenticated, usersManager);
app.use("/docs", SwaggerUiExpress.serve, SwaggerUiExpress.setup(specs));
app.use(error404);

// Mockeo de productos (solo para desarrollo).
generateProductsMocking();

// Generación de productos desde la base de datos.
generateProducts();

// Inicio del servidor.
ServerUp(app);