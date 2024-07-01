import { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [cartData, setCartData] = useState([]);

  // Function to show cart
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  // Function to hide cart
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  // Load cart data from local storage when component mounts
  useEffect(() => {
    const storedCartData = localStorage.getItem('cartData');
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, []);

  // Update local storage when cart data changes
  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);

  return (
    <CartProvider cartData={cartData} setCartData={setCartData}>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main style={{ 
        backgroundImage: `url("https://img.freepik.com/premium-photo/chocolate-melted-chocolate-coffee-almond-white-background_185193-10702.jpg?w=2000")`,imageOrientation:'flip'
      }}>
        <Meals />
      </main>
   
    </CartProvider>
  );
}

export default App;
