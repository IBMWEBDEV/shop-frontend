import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, Phone, Home, ShoppingBag } from 'lucide-react';

export default function OrderSuccess() {
  const { state } = useLocation();
  if (!state) return <div className="text-center py-20 font-body"><p>পেজটি লোড হয়নি।</p><Link to="/" className="text-orange-500">হোমে ফিরুন</Link></div>;

  const { orderId, total, form, cart } = state;
  const eta = new Date(); eta.setDate(eta.getDate() + 3);
  const etaStr = eta.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="max-w-lg mx-auto px-4 py-10 font-body animate-fade-in">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">অর্ডার সফল! 🎉</h1>
        <p className="text-gray-500">আপনার অর্ডার সফলভাবে গৃহীত হয়েছে</p>
      </div>

      {/* Order ID */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center mb-5">
        <p className="text-sm text-orange-600 mb-1">অর্ডার নম্বর</p>
        <p className="font-display text-2xl font-bold text-orange-700">#{orderId}</p>
        <p className="text-xs text-gray-500 mt-1">এই নম্বরটি সংরক্ষণ করুন</p>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">অর্ডারের অগ্রগতি</h3>
        <div className="space-y-4">
          {[
            { icon: CheckCircle2, label: 'অর্ডার কনফার্ম', sub: 'এইমাত্র', done: true, color: 'text-green-500 bg-green-100' },
            { icon: Package, label: 'পণ্য প্যাক হচ্ছে', sub: '১-২ ঘণ্টা', done: false, color: 'text-orange-500 bg-orange-100' },
            { icon: Truck, label: 'ডেলিভারিতে পাঠানো হবে', sub: 'আগামীকাল', done: false, color: 'text-blue-500 bg-blue-100' },
            { icon: Home, label: 'ডেলিভারি', sub: etaStr, done: false, color: 'text-purple-500 bg-purple-100' },
          ].map(({ icon: Icon, label, sub, done, color }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${done ? color : 'bg-gray-100 text-gray-400'}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${done ? 'text-gray-800' : 'text-gray-500'}`}>{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
              {done && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">✓ সম্পন্ন</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">ডেলিভারি তথ্য</h3>
        <div className="text-sm space-y-1 text-gray-600">
          <p><strong className="text-gray-800">নাম:</strong> {form.name}</p>
          <p><strong className="text-gray-800">মোবাইল:</strong> {form.phone}</p>
          <p><strong className="text-gray-800">ঠিকানা:</strong> {form.address}, {form.area}, {form.city}</p>
          <p className="pt-2 border-t border-gray-100"><strong className="text-gray-800">মোট পরিশোধ:</strong> <span className="text-orange-600 font-bold">৳{total?.toLocaleString()}</span></p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">অর্ডার করা পণ্য</h3>
        <div className="space-y-2">
          {cart?.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-500">× {item.qty}</p>
              </div>
              <span className="text-sm font-bold text-gray-700">৳{(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-5 flex items-center gap-3">
        <Phone size={20} className="text-blue-500 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-blue-800">যেকোনো সমস্যায় কল করুন</p>
          <p className="text-blue-600">01700-000000 (সকাল ৯টা - রাত ১০টা)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link to="/orders" className="bg-gray-900 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors text-sm">
          <Package size={16} /> অর্ডার দেখুন
        </Link>
        <Link to="/" className="bg-orange-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors text-sm">
          <ShoppingBag size={16} /> আবার কিনুন
        </Link>
      </div>
    </div>
  );
}
