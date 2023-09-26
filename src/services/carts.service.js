// Importamos los modelos necesarios.
import Cart from "../dao/models/cart.model.js";
import productModel from "../dao/models/product.model.js";
import ticketModel from "../dao/models/ticket.models.js";
import logger from "../utils/logger.js";
import UserModel from "../dao/models/user.model.js";
import { CustomError } from "./errors/custom_errors.js";
import EErros from "./errors/enums.js";

// Función para obtener el carrito de un usuario por su ID.
export const getCartsService = async (userId) => {
  try {
    const user = await UserModel.findById(userId).lean().exec();
    if (!user) {
      throw new CustomError({
        name: "UserNotFoundError",
        message: "Usuario no encontrado",
        code: EErros.ERROR_GET_CARTS,
      });
    }

    const cart = await Cart.findById(user.cart)
      .populate("products.productId")
      .lean()
      .exec();

    return cart;
  } catch (err) {
    logger.error(`
      Se produjo un error al obtener los carritos.
      ${err.stack}  
    `);
  }
};

// Función para agregar un producto al carrito de un usuario.
export const addToCartService = async (productId, userId) => {
  try {
    const user = await UserModel.findById(userId).populate("cart").exec();

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const cart = user.cart;

    if (!cart) {
      throw new CustomError({
        name: "UserNotFoundError",
        message: "Usuario no encontrado",
        code: EErros.ERROR_ADD_TO_CART,
      });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId && item.productId.toString() === productId
    );

    const product = await productModel.findById(productId);
    const stock = product.stock;

    if (existingProductIndex !== -1) {
      const existingProduct = cart.products[existingProductIndex];
      const totalQuantity = existingProduct.quantity + 1;

      if (totalQuantity > stock) {
        return stock;
      }

      cart.products[existingProductIndex].quantity = totalQuantity;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }

    await cart.save();
    return cart;
  } catch (err) {
    logger.error(`
      Error al agregar un artículo al carrito.
      ${err.stack}  
    `);
  }
};

// Función para eliminar un producto del carrito de un usuario.
export const removeFromCartService = async (productId, userId) => {
  try {
    const user = await UserModel.findById(userId).populate("cart").exec();

    if (!user || !user.cart) {
      throw new Error("Usuario o carrito no existen");
    }

    const cart = user.cart;

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    return cart;
  } catch (err) {
    logger.error(`
      Error al eliminar un artículo del carrito.
      ${err.stack}  
    `);
  }
};

// Función para actualizar la cantidad de un producto en el carrito de un usuario.
export const updateCartQtyService = async (cartId, productId, quantity) => {
  try {
    const cart = await cartModel.findById(cartId);

    if (!cart) {
      throw new CustomError({
        name: "El carrito no existe",
        message: "El carrito no existe",
        code: EErros.ERROR_GET_CARTS,
      });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
    } else {
      throw new Error("El producto no existe en el carrito");
    }

    const product = await productModel.findById(productId);
    const stock = product.stock;

    if (quantity > stock || quantity <= 0) {
      return null;
    }

    await cart.save();
    return cart;
  } catch (err) {
    logger.error(`
      Error al actualizar la cantidad del carrito.
      ${err.stack}  
    `);
  }
};

// Función para generar un ticket de compra.
export const generateTicketService = async (purchase, purchaserEmail) => {
  try {
    const total = purchase.products.reduce(
      (sum, product) => sum + product.productId.price * product.quantity,
      0
    );

    const ticket = new ticketModel({
      amount: total,
      purchaser: purchaserEmail,
    });
    await ticket.save();

    for (const product of purchase.products) {
      await productModel.updateOne(
        { _id: product.productId._id },
        { $inc: { stock: -product.quantity } }
      );
    }

    await cartModel.updateOne(
      { _id: purchase._id },
      { $set: { products: [] } }
    );

    return ticket.toObject();
  } catch (err) {
    logger.error(`
      Error al generar el ticket.
      ${err.stack}  
    `);
  }
};
