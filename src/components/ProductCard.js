import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const badgeColors = {
  bestseller: 'bg-orange-500',
  hot: 'bg-red-500',
  new: 'bg-green-500',
  sale: 'bg-yellow-500',
  organic: 'bg-teal-500',
  premium: 'bg-purple-600',
  popular: 'bg-blue-500',
};

const badgeLabels = {
  bestseller: 'বেস্টসেলার',
  hot: 'হট',
  new: 'নতুন',
  sale: 'সেল',
  organic: 'অর্গানিক',
  premium: 'প্রিমিয়াম',
  popular: 'জনপ্রিয়',
};

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const disc = Math.round((1 - product.price / product.originalPrice) * 100);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2 left-2 ${badgeColors[product.badge]} text-white text-xs px-2 py-0.5 rounded-full font-body font-medium`}>
            {badgeLabels[product.badge]}
          </span>
        )}
        {/* Discount */}
        <span className="absolute top-2 right-2 bg-white text-red-500 text-xs font-bold px-2 py-0.5 rounded-full shadow">
          -{disc}%
        </span>
        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${wishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        {/* Stock */}
        {product.stock <= 10 && (
          <div className="absolute bottom-2 left-2 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-body">
            মাত্র {product.stock}টি বাকি
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-body font-semibold text-gray-800 text-sm mb-1 hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={11} className={s <= Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-body">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-3 mt-auto">
          <span className="text-orange-600 font-bold font-body text-lg">৳{product.price.toLocaleString('bn-BD')}</span>
          <span className="text-gray-400 line-through text-xs font-body">৳{product.originalPrice.toLocaleString('bn-BD')}</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-body font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          <ShoppingCart size={15} /> কার্টে যোগ করুন
        </button>
      </div>
    </div>
  );
}
