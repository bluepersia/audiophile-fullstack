import type {
  CartItem,
  FullCartItem,
} from "../contexts/CartContext/CartContext.types";

const SHIPPING_COST = 50;
const TAX_RATE = 0.2;

function updateCartItemQuantity<TCartItem extends CartItem>(
  cart: TCartItem[],
  id: number,
  quantity: number,
): TCartItem[] {
  if (quantity > 99) {
    // eslint-disable-next-line no-param-reassign
    quantity = 99;
  }

  if (quantity <= 0) return cart.filter((item) => item.id !== id);

  const itemIndex = cart.findIndex((item) => item.id === id);

  const newItem = {
    id,
    quantity,
  } as TCartItem;

  if (itemIndex === -1) {
    return [...cart, newItem];
  }

  const newCart = [...cart];
  newCart[itemIndex] = newItem;

  return newCart;
}

function countItems(cart: CartItem[]): number {
  return cart.reduce((prev, curr) => prev + curr.quantity, 0);
}

function calculateTotalPrice(fullCart: FullCartItem[]): number {
  return fullCart.reduce((prev, curr) => prev + curr.quantity * curr.price, 0);
}

function calculateShipping(): number {
  return SHIPPING_COST;
}

function calculateVAT(totalPrice: number): number {
  return totalPrice * TAX_RATE;
}

function calculateTotalPriceIncVAT(totalPrice: number, VAT: number): number {
  return totalPrice + VAT;
}

function calculateGrandTotal(
  totalPriceIncVAT: number,
  shippingCost: number,
): number {
  return totalPriceIncVAT + shippingCost;
}

function calculateAllCosts(fullCart: FullCartItem[]): {
  totalPrice: number;
  shippingCost: number;
  VAT: number;
  totalPriceIncVAT: number;
  grandTotal: number;
} {
  const totalPrice = calculateTotalPrice(fullCart);
  const shippingCost = calculateShipping();
  const VAT = calculateVAT(totalPrice);
  const totalPriceIncVAT = calculateTotalPriceIncVAT(totalPrice, VAT);
  const grandTotal = calculateGrandTotal(totalPriceIncVAT, shippingCost);

  return { totalPrice, shippingCost, VAT, totalPriceIncVAT, grandTotal };
}

export {
  updateCartItemQuantity,
  countItems,
  calculateTotalPrice,
  calculateShipping,
  calculateVAT,
  calculateTotalPriceIncVAT,
  calculateGrandTotal,
  calculateAllCosts,
};
