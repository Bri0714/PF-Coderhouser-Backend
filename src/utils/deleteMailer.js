// Importamos las bibliotecas necesarias.
import nodemailer from "nodemailer"; // Biblioteca para enviar correos electrónicos.
import mailgen from "mailgen"; // Generador de plantillas de correo.
import logger from "./logger.js"; // Biblioteca para el registro de eventos.
import { GMAIL_CONFIG } from "../config/config.js"; // Importamos la configuración de Gmail desde un archivo de configuración.

// Función para enviar un correo electrónico de confirmación de eliminación de cuenta.
export const deleteAccountMailer = async (email) => {
  // Configuración del servicio de correo (en este caso, Gmail).
  const mailerConfig = {
    service: "gmail",
    auth: { user: GMAIL_CONFIG.user, pass: GMAIL_CONFIG.pass },
  };

  // Creamos un objeto de transporte para enviar correos electrónicos.
  let transporter = nodemailer.createTransport(mailerConfig);

  // Creamos una instancia de mailgen para generar la plantilla del correo electrónico.
  const Mailgenerator = new mailgen({
    theme: "default",
    product: {
      name: "API de comercio electrónico",
      link: "http://localhost:8080/api/products", 
    },
  });

  // Definimos el contenido del correo electrónico.
  const response = {
    body: {
      name: email,
      intro: "Su cuenta ha sido eliminada",
      action: {
        instructions:
          "Su cuenta ha sido eliminada debido a la inactividad. Para crear una nueva cuenta, haga clic en el botón",
        button: {
          color: "#22BC66",
          text: "Crear una nueva cuenta",
          link: "http://localhost:8080/api/session/register",
        },
      },
      outro:
        "¿Necesita ayuda o tiene preguntas? Simplemente responda a este correo electrónico, estaremos encantados de ayudarle.",
    },
  };

  // Generamos la plantilla del correo electrónico.
  const mail = Mailgenerator.generate(response);

  // Configuramos el mensaje de correo electrónico.
  let message = {
    from: GMAIL_CONFIG.user,
    to: email,
    subject: "[API de comercio electrónico] Su cuenta ha sido eliminada",
    html: mail,
  };

  try {
    // Enviamos el correo electrónico.
    await transporter.sendMail(message);

    logger.info("(Eliminar Cuenta) Correos electrónicos enviados correctamente");
  } catch (err) {
    logger.error(`(Eliminar Cuenta) Error al enviar el correo electrónico. 
    ${err.stack}`);
  }
};
