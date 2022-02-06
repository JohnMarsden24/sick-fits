import { KeystoneContext } from "@keystone-next/types";
import { CartItem } from "../schemas/CartItem";
import { Order } from "../schemas/Order";
import {
  CartItemCreateInput,
  OrderCreateInput,
} from "../.keystone/schema-types";
/** eslint-disable */
import { User } from "../schemas/User";

import stripeConfig from "../lib/stripe";

const graphql = String.raw;

interface Arguments {
  token: string;
}

export default async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // Make sure they are signed in
  const userId = context.session.itemId;

  if (!userId) {
    throw new Error("You must be signed in to create an order");
  }

  const user = await context.lists.User.findOne({
    where: {
      id: userId,
    },
    resolveFields: graphql`
    id
    name
    email
    cart {
      id
      quantity
      product {
        name
        price
        description
        id
        photo {
          id
          image {
            id
            publicUrlTransformed
          }
        }
      }
    }
    
    `,
  });

  // Calculate the total price for their order
  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(
    (prev: number, curr: CartItemCreateInput) =>
      prev + curr.quantity * curr.product.price,
    0
  );

  // Create the charge with the stripe library

  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: "USD",
      confirm: true,
      payment_method: token,
    })
    .catch((error) => {
      throw new Error(error.message);
    });

  // Convert the CartItems to OrderItems
  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: {
        connect: { id: cartItem.product.photo.id },
      },
    };

    return orderItem;
  });

  // Create the order and return it
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });

  // Clean up any old cart items
  const cartItemsIds = user.cart.map((cartItem) => cartItem.id);

  await context.lists.CartItem.deleteMany({
    ids: cartItemsIds,
  });

  return order;
}
