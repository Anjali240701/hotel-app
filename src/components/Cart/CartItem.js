import { useState, useEffect } from 'react';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = typeof props.price === 'number' ? props.price.toFixed(2) : '';

  useEffect(() => {
    // Save the updated cart data to local storage whenever props change
    localStorage.setItem('cartItems', JSON.stringify(props.cartItems));
  }, [props.cartItems]);

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
