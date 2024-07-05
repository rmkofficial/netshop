import React, { createContext, useContext, useReducer, ReactNode } from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_TO_CART"; item: CartItem }
  | { type: "REMOVE_FROM_CART"; id: number }
  | { type: "INCREASE_QUANTITY"; id: number }
  | { type: "DECREASE_QUANTITY"; id: number };

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<
  { state: CartState; dispatch: React.Dispatch<CartAction> } | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { items: updatedItems };
      }
      return { items: [...state.items, { ...action.item, quantity: 1 }] };
    case "REMOVE_FROM_CART":
      return { items: state.items.filter((item) => item.id !== action.id) };
    case "INCREASE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const useCartTotalCount = () => {
  const { state } = useCart();
  return state.items.reduce((count, item) => count + item.quantity, 0);
};
