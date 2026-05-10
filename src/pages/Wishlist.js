import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center font-body animate-fade-in">
      <Heart size={60} className="text-gray-200 mx-auto mb-4" />
      <h2 className="font-display text-2xl font-bold text-gray-700 mb-2">উইশলিস্ট খালি</h2>
      <p className="text-gray-500 mb-6">পছন্দের পণ্যে ❤️ ক্লিক করে সেভ করুন</p>
      <Link to="/shop" className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors inline-block">পণ্য দেখুন</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-body animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">উইশলিস্ট ({wishlist.length}টি)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlist.map(item => {
          const disc = Math.round((1 - item.price / item.originalPrice) * 100);
          return (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="font-semibold text-gray-800 text-sm hover:text-orange-500 transition-colors block mb-1">{item.name}</Link>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-orange-600 font-bold">৳{item.price.toLocaleString()}</span>
                  <span className="text-gray-400 line-through text-xs">৳{item.originalPrice.toLocaleString()}</span>
                  <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded">-{disc}%</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { addToCart(item); toggleWishlist(item); }} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1 transition-colors">
                    <ShoppingCart size={13} /> কার্টে যোগ
                  </button>
                  <button onClick={() => toggleWishlist(item)} className="p-2 border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
