import { integer, text, relationship, virtual } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const Order = list({
  fields: {
    label: virtual({
      graphQLReturnType: "String",
      resolver(item) {
        return `Hello ${item.total}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
    charge: text(),
  },
});
