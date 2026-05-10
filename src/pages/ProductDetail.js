import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');

  if (!product) return (
    <div className="text-center py-20 font-body">
      <p className="text-5xl mb-4">😕</p>
      <h2 className="text-xl font-bold text-gray-700">পণ্য পাওয়া যায়নি</h2>
      <Link to="/shop" className="text-orange-500 mt-2 inline-block">শপে ফিরে যান →</Link>
    </div>
  );

  const disc = Math.round((1 - product.price / product.originalPrice) * 100);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-body animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-orange-500">হোম</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="hover:text-orange-500">শপ</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-50">
          <img src={product.image} alt={product.name} className="w-full h-80 md:h-96 object-cover" />
          <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">-{disc}% ছাড়</span>
          <button
            onClick={() => toggleWishlist(product)}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${wishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
          >
            <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Info */}
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={16} className={s <= Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} রিভিউ)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl font-bold text-orange-600">৳{product.price.toLocaleString()}</span>
            <span className="text-lg text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
            <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-0.5 rounded-lg">৳{(product.originalPrice - product.price).toLocaleString()} সাশ্রয়</span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Stock */}
          <div className={`flex items-center gap-2 mb-5 text-sm font-medium ${product.stock > 10 ? 'text-green-600' : 'text-amber-600'}`}>
            <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-amber-500'}`} />
            {product.stock > 10 ? `স্টকে আছে (${product.stock}টি)` : `মাত্র ${product.stock}টি বাকি!`}
          </div>

          {/* Qty */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-sm font-medium text-gray-700">পরিমাণ:</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors"><Minus size={14} /></button>
              <span className="px-4 py-2 font-semibold text-gray-800 border-x border-gray-200">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors"><Plus size={14} /></button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button onClick={handleAddToCart} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-95">
              <ShoppingCart size={18} /> কার্টে যোগ করুন
            </button>
            <Link to="/checkout" onClick={handleAddToCart} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
              এখনই কিনুন
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: 'ফ্রি ডেলিভারি' },
              { icon: RotateCcw, label: '৭ দিন রিটার্ন' },
              { icon: Shield, label: 'নিরাপদ পেমেন্ট' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center bg-gray-50 rounded-xl p-3">
                <Icon size={20} className="text-orange-500 mx-auto mb-1" />
                <p className="text-xs text-gray-600 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex border-b border-gray-200 mb-4">
          {[['desc', 'বিবরণ'], ['review', 'রিভিউ'], ['ship', 'ডেলিভারি']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${tab === key ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'desc' && (
          <div className="bg-gray-50 rounded-2xl p-5 text-gray-600 text-sm leading-relaxed">
            <p>{product.description}</p>
            <ul className="mt-4 space-y-2">
              <li>✅ মূল পণ্যের গ্যারান্টি</li>
              <li>✅ মানসম্পন্ন প্যাকেজিং</li>
              <li>✅ সারাদেশে ডেলিভারি</li>
              <li>✅ ইনভয়েস সহ ডেলিভারি</li>
            </ul>
          </div>
        )}
        {tab === 'review' && (
          <div className="space-y-4">
            {[{name:'রহিম মিয়া', r:5, text:'অসাধারণ পণ্য! প্রত্যাশার চেয়ে অনেক ভালো।'},{name:'করিম সাহেব', r:4, text:'দাম অনুযায়ী খুব ভালো মান। সময়মতো ডেলিভারি হয়েছে।'}].map((rev, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 text-sm">{rev.name[0]}</div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{rev.name}</p>
                    <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} size={11} className={s<=rev.r?'text-yellow-400 fill-yellow-400':'text-gray-200 fill-gray-200'} />)}</div>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">✅ যাচাইকৃত ক্রেতা</span>
                </div>
                <p className="text-sm text-gray-600">{rev.text}</p>
              </div>
            ))}
          </div>
        )}
        {tab === 'ship' && (
          <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-600 space-y-3">
            <p><strong className="text-gray-800">ঢাকার ভেতরে:</strong> ১-২ দিন | খরচ: ৳৬০</p>
            <p><strong className="text-gray-800">ঢাকার বাইরে:</strong> ৩-৫ দিন | খরচ: ৳১২০</p>
            <p><strong className="text-gray-800">ফ্রি ডেলিভারি:</strong> ৳৫০০+ অর্ডারে</p>
            <p><strong className="text-gray-800">কুরিয়ার:</strong> সুন্দরবন, পাঠাও, রেডেক্স</p>
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">সম্পর্কিত পণ্য</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
