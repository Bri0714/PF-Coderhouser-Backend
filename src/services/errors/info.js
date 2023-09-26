// Función que genera un mensaje de error para usuarios incompletos o inválidos.
export const generateUserErrorInfo = (user) => {
  return `
    Una o más propiedades están incompletas o son inválidas.
      Lista de propiedades obligatorias:
        - first_name: Debe ser una cadena (${user.first_name})
        - last_name: Debe ser una cadena (${user.last_name})
        - email: Debe ser una cadena (${user.email})
        - age: Debe ser un número (${user.age})
        - password: Debe ser una cadena
  `;
};

// Función que genera un mensaje de error al obtener un carrito desde la base de datos.
export const getCartsErrorInfo = (carts) => {
  return `
    Error al obtener el carrito de la base de datos
  `;
};

// Función que genera un mensaje de error al publicar un carrito en la base de datos.
export const postCartsErrorInfo = (carts) => {
  return `
    Error al publicar el carrito en la base de datos
  `;
};

// Función que genera un mensaje de error al intentar agregar un artículo al carrito.
export const addToCartErrorInfo = (productId) => {
  return `
    Error al agregar el artículo al carrito (${productId})
  `;
};

// Función que genera un mensaje de error al intentar eliminar un artículo del carrito.
export const removeFromCartInfo = (productId) => {
  return `
    Error al eliminar el artículo del carrito (${productId})  
  `;
};

// Función que genera un mensaje de error al intentar actualizar la cantidad en el carrito.
export const updateCartQtyErrorInfo = (productId) => {
  return `
    Error al actualizar la cantidad del carrito (${productId})
  `;
};

// Función que genera un mensaje de error al intentar generar un ticket.
export const generateTicketErrorInfo = (ticket) => {
  return `
    Error al generar el ticket
  `;
};