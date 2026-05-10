import React, { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_QTY':
      if (action.qty < 1) return { ...state, items: state.items.filter(i => i.id !== action.id) };
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: action.qty } : i) };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotif = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', item });
    showNotif(`"${item.name}" কার্টে যোগ হয়েছে!`);
  };

  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const toggleWishlist = (item) => {
    const exists = wishlist.find(w => w.id === item.id);
    if (exists) {
      setWishlist(wishlist.filter(w => w.id !== item.id));
      showNotif(`উইশলিস্ট থেকে সরানো হয়েছে`, 'info');
    } else {
      setWishlist([...wishlist, item]);
      showNotif(`উইশলিস্টে যোগ হয়েছে! ❤️`);
    }
  };

  const isWishlisted = (id) => wishlist.some(w => w.id === id);
  const cartTotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart: state.items, wishlist, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, isWishlisted, cartTotal, cartCount, notification }}>
      {children}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl text-white font-body text-sm animate-slide-up flex items-center gap-2 ${notification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'}`}>
          {notification.type === 'success' ? '✅' : 'ℹ️'} {notification.msg}
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
