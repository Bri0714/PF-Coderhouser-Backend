# Proyecto-Final-Cursobackend

# Documentación de la Aplicación - Proyecto Final

Este Docuemnto contiene el código fuente de la aplicación Proyecto Final. La aplicación utiliza Node.js y Express.js para crear una plataforma de E-commerce. A continuación, se describen las principales rutas y funcionalidades de la aplicación.

## Rutas y Funcionalidades

### Ruta `/api/carts`

- `GET /api/carts`: Obtiene información de los carritos de compra.
- `POST /api/carts/add-to-cart`: Agrega un producto al carrito de compra.
- `POST /api/carts/remove-from-cart`: Elimina un producto del carrito de compra.
- `POST /api/carts/update-quantity`: Actualiza la cantidad de un producto en el carrito de compra.
- `GET /api/carts/purchase`: Obtiene información sobre la compra.

### Ruta `/api/loggerTest`

- `GET /api/loggerTest`: Realiza pruebas de registro (logs) de diferentes niveles.

### Ruta `/api/products`

- `GET /api/products/create`: Crea un nuevo producto (requiere autenticación de usuario premium).
- `GET /api/products/:manager?`: Obtiene la lista de productos.
- `POST /api/products/update-products/:productId`: Actualiza un producto.
- `POST /api/products`: Crea un producto.
- `POST /api/products/delete-product`: Elimina un producto.
- `GET /api/products/mockingproducts`: Obtiene productos simulados.

### Ruta `/api/session`

- `GET /api/session/register`: Renderiza la página de registro.
- `POST /api/session/register`: Procesa el registro de usuarios.
- `GET /api/session/login`: Renderiza la página de inicio de sesión.
- `POST /api/session/login`: Inicia sesión de usuario.
- `GET /api/session/failureRegister`: Maneja el fallo en el registro.
- `GET /api/session/failLogin`: Maneja el fallo en el inicio de sesión.
- `GET /api/session/logout`: Cierra la sesión del usuario.
- `GET /api/session/github`: Inicia sesión con GitHub (OAuth).
- `GET /api/session/githubcallback`: Procesa la autenticación de GitHub (OAuth).
- `GET /api/session/forgot-password`: Renderiza la página para restablecer la contraseña.
- `POST /api/session/forgot-password`: Envía un correo electrónico de recuperación de contraseña.
- `GET /api/session/reset-password/:token`: Redirige a la página de verificación de token.
- `GET /api/session/verify-token/:token`: Renderiza la página de restablecimiento de contraseña.
- `POST /api/session/reset-password/:user`: Procesa el restablecimiento de la contraseña.

### Ruta `/api/user`

- `GET /api/user`: Obtiene información del usuario.
- `POST /api/user/roles`: Cambia el rol del usuario.

### Ruta `/api/users`

- `GET /api/users`: Obtiene la lista de usuarios (requiere autenticación de administrador).
- `POST /api/users/delete-inactive-users`: Elimina usuarios inactivos (requiere autenticación de administrador).

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama para tus cambios: `git checkout -b mi-rama-de-funcion`.
3. Realiza tus cambios y commitea: `git commit -m "Agrega nuevas funcionalidades"`.
4. Haz push de tus cambios a tu repositorio: `git push origin mi-rama-de-funcion`.
5. Crea un pull request en este repositorio.

