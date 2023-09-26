import passport from "passport";
import local, { Strategy } from "passport-local";
import UserModel from "../dao/models/user.model.js";
import GithubModel from "../dao/models/gitgub.model.js";
import GitHubStrategy from "passport-github2"; 
import { createHash, isValidPassword } from "../utils/utils.js";
import { CLIENT_ID, CLIENT_SECRET, ADMIN_EMAIL } from "./config.js";
import Cart from "../dao/models/cart.model.js";

const LocalStrategy = local.Strategy;

// Función para verificar si existe un administrador registrado
const Admin = async () => {
  const existingAdmin = await UserModel.findOne({ email: ADMIN_EMAIL });

  if (!existingAdmin) {
    console.log("No hay usuarios administradores registrados");
  }
};

const initializePassport = () => {
  // Estrategia de registro local
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, age, email } = req.body;
        try {
          const user = await UserModel.findOne({ email: username });

          if (user) {
            console.log("El usuario ya existe");
            return done(null, false);
          }

          const hashedPassword = createHash(password);

          const cartForNewUser = await Cart.create({});
          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: hashedPassword,
            cart: cartForNewUser._id,
            role: email === ADMIN_EMAIL ? "admin" : req.body.role,
          };

          const result = await UserModel.create(newUser);
          Admin();
          return done(null, result);
        } catch (err) {
          return done("Error en la contraseña " + err);
        }
      }
    )
  );

  // Estrategia de inicio de sesión con GitHub
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);

        try {
          const user = await GithubModel.findOne({
            email: profile._json.email,
          });
          if (user) return done(null, user);

          const newUser = await GithubModel.create({
            first_name: profile._json.name,
            email: profile._json.email,
          });

          return done(null, newUser);
        } catch (err) {
          return done("Error al iniciar sesión con GitHub " + err);
        }

        done(null, profile);
      }
    )
  );

  // Estrategia de inicio de sesión local
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await UserModel.findOne({ email: username });
          if (!user) {
            console.log("El usuario ingresado no existe");
            return done(null, false);
          }

          if (!isValidPassword(user, password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          done("Error" + err);
        }
      }
    )
  );

  // Serialización y deserialización de usuario para almacenar en sesión
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    return done(null, user);
  });
};

export default initializePassport;
