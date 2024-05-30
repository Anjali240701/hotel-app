import { useReducer, useEffect } from 'react';
import CartContext from './cart-context';

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
      const addedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const addedExistingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const addedExistingCartItem = state.items[addedExistingCartItemIndex];
      let addedUpdatedItems;

      if (addedExistingCartItem) {
        const addedUpdatedItem = {
          ...addedExistingCartItem,
          amount: addedExistingCartItem.amount + action.item.amount,
        };
        addedUpdatedItems = [...state.items];
        addedUpdatedItems[addedExistingCartItemIndex] = addedUpdatedItem;
      } else {
        addedUpdatedItems = state.items.concat(action.item);
      }

      return {
        items: addedUpdatedItems,
        totalAmount: addedTotalAmount,
      };
    case 'REMOVE':
      const removedExistingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const removedExistingItem = state.items[removedExistingCartItemIndex];
      const removedTotalAmount = state.totalAmount - removedExistingItem.price;
      let removedUpdatedItems;
      if (removedExistingItem.amount === 1) {
        removedUpdatedItems = state.items.filter(item => item.id !== action.id);
      } else {
        const removedUpdatedItem = { ...removedExistingItem, amount: removedExistingItem.amount - 1 };
        removedUpdatedItems = [...state.items];
        removedUpdatedItems[removedExistingCartItemIndex] = removedUpdatedItem;
      }

      return {
        items: removedUpdatedItems,
        totalAmount: removedTotalAmount
      };
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // Load cart data from local storage when component mounts
  useEffect(() => {
    const storedCartData = localStorage.getItem('cartData');
    if (storedCartData) {
      const cartData = JSON.parse(storedCartData);
      dispatchCartAction({ type: 'REPLACE', items: cartData.items, totalAmount: cartData.totalAmount });
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

export default CartProvider;

