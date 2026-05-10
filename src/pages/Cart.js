import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const COUPONS = { 'SHOPBD10': 10, 'EID20': 20, 'FIRST50': 50 };

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const applyCoupon = () => {
    if (COUPONS[coupon.toUpperCase()]) {
      setAppliedCoupon({ code: coupon.toUpperCase(), disc: COUPONS[coupon.toUpperCase()] });
      setCouponError('');
    } else {
      setCouponError('অবৈধ কুপন কোড');
      setAppliedCoupon(null);
    }
  };

  const shipping = cartTotal >= 500 ? 0 : 60;
  const discountAmt = appliedCoupon ? Math.round(cartTotal * appliedCoupon.disc / 100) : 0;
  const finalTotal = cartTotal - discountAmt + shipping;

  if (cart.length === 0) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center font-body animate-fade-in">
      <ShoppingBag size={64} className="text-gray-200 mx-auto mb-4" />
      <h2 className="font-display text-2xl font-bold text-gray-700 mb-2">কার্ট খালি আছে</h2>
      <p className="text-gray-500 mb-6">এখনই পছন্দের পণ্য কার্টে যোগ করুন</p>
      <Link to="/shop" className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors inline-block">
        কেনাকাটা শুরু করুন
      </Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 font-body animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">আমার কার্ট ({cart.length}টি পণ্য)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(item => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 shadow-sm">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="font-semibold text-gray-800 text-sm hover:text-orange-500 transition-colors line-clamp-2 mb-1 block">{item.name}</Link>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-orange-600 font-bold">৳{item.price.toLocaleString()}</span>
                  <span className="text-gray-400 line-through text-xs">৳{item.originalPrice.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors"><Minus size={12} /></button>
                    <span className="px-3 py-1.5 text-sm font-semibold border-x border-gray-200">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors"><Plus size={12} /></button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-700">৳{(item.price * item.qty).toLocaleString()}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Tag size={15} className="text-orange-500" /> কুপন কোড</h3>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={e => { setCoupon(e.target.value); setCouponError(''); }}
                placeholder="কুপন লিখুন..."
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400"
              />
              <button onClick={applyCoupon} className="bg-orange-500 text-white text-sm px-4 rounded-xl hover:bg-orange-600 transition-colors font-medium">
                প্রয়োগ
              </button>
            </div>
            {couponError && <p className="text-red-500 text-xs mt-2">{couponError}</p>}
            {appliedCoupon && <p className="text-green-600 text-xs mt-2 font-medium">✅ {appliedCoupon.disc}% ছাড় প্রয়োগ হয়েছে!</p>}
            <p className="text-xs text-gray-400 mt-2">কোড: SHOPBD10, EID20, FIRST50</p>
          </div>

          {/* Summary */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">অর্ডার সারসংক্ষেপ</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>পণ্যমূল্য</span><span>৳{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600"><span>ডেলিভারি চার্জ</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'ফ্রি' : `৳${shipping}`}</span></div>
              {appliedCoupon && <div className="flex justify-between text-green-600"><span>কুপন ছাড় ({appliedCoupon.disc}%)</span><span>-৳{discountAmt.toLocaleString()}</span></div>}
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-800 text-base">
                <span>মোট</span>
                <span className="text-orange-600">৳{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2 mt-3">
                💡 আরও ৳{(500 - cartTotal).toLocaleString()} এর পণ্য যোগ করুন, ফ্রি ডেলিভারি পাবেন!
              </p>
            )}

            <Link
              to="/checkout"
              state={{ total: finalTotal, discount: discountAmt, shipping }}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              চেকআউট করুন <ChevronRight size={16} />
            </Link>

            <Link to="/shop" className="w-full mt-2 text-center text-sm text-orange-500 hover:text-orange-600 py-2 block">
              ← কেনাকাটা চালিয়ে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
