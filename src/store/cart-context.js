
// cart-context.js
import { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'REPLACE':
      return {
        items: action.items,
        totalAmount: action.totalAmount,
      };
    case 'ADD':
      // Add logic to handle adding items to the cart
      return state;
    case 'REMOVE':
      // Add logic to handle removing items from the cart
      return state;
    default:
      return state;
  }
};

export const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // Load cart data from local storage when component mounts
  useEffect(() => {
    const storedCartData = localStorage.getItem('cartData');
    if (storedCartData) {
      const cartData = JSON.parse(storedCartData);
      dispatchCartAction({ type: 'REPLACE', ...cartData });
    }
  }, []);

  // Save cart data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartState));
  }, [cartState]);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
