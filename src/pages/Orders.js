import { Package, Truck, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_ORDERS = [
  { id: 'SBD824501', date: '৩ মে, ২০২৬', status: 'delivered', total: 6498, items: ['প্রিমিয়াম কটন পাঞ্জাবি', 'অর্গানিক ফেস ক্রিম'], payMethod: 'বিকাশ' },
  { id: 'SBD819233', date: '২৮ এপ্রিল, ২০২৬', status: 'shipping', total: 8499, items: ['ওয়্যারলেস ব্লুটুথ হেডফোন'], payMethod: 'নগদ' },
  { id: 'SBD815678', date: '২২ এপ্রিল, ২০২৬', status: 'processing', total: 3797, items: ['হ্যান্ডমেড সিরামিক মগ সেট', 'বাংলা সাহিত্য কালেকশন'], payMethod: 'ক্যাশ অন ডেলিভারি' },
];

const statusMap = {
  delivered: { label: 'ডেলিভারি হয়েছে', color: 'bg-green-100 text-green-700', icon: CheckCircle2, iconColor: 'text-green-500' },
  shipping: { label: 'পাঠানো হচ্ছে', color: 'bg-blue-100 text-blue-700', icon: Truck, iconColor: 'text-blue-500' },
  processing: { label: 'প্রক্রিয়াধীন', color: 'bg-amber-100 text-amber-700', icon: Clock, iconColor: 'text-amber-500' },
};

export default function Orders() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 font-body animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">আমার অর্ডার</h1>

      {MOCK_ORDERS.length === 0 ? (
        <div className="text-center py-20">
          <Package size={60} className="text-gray-200 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-gray-700 mb-2">কোনো অর্ডার নেই</h2>
          <Link to="/shop" className="text-orange-500 font-medium">কেনাকাটা শুরু করুন →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_ORDERS.map(order => {
            const s = statusMap[order.status];
            const Icon = s.icon;
            return (
              <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">#{order.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${s.color}`}>
                    <Icon size={12} /> {s.label}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-sm text-gray-600 flex items-center gap-1">
                      <Package size={12} className="text-orange-400 flex-shrink-0" /> {item}
                    </p>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-500">মোট: </span>
                    <span className="font-bold text-orange-600">৳{order.total.toLocaleString()}</span>
                    <span className="text-gray-400 text-xs ml-2">({order.payMethod})</span>
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'delivered' && (
                      <button className="text-xs bg-orange-100 text-orange-600 hover:bg-orange-200 px-3 py-1.5 rounded-lg font-medium transition-colors">রিভিউ দিন</button>
                    )}
                    <button className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1">
                      বিস্তারিত <ChevronRight size={12} />
                    </button>
                  </div>
                </div>

                {order.status === 'shipping' && (
                  <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl p-3">
                    <div className="flex items-center gap-3 mb-2">
                      {['অর্ডার', 'প্যাক', 'পাঠানো', 'ডেলিভারি'].map((step, i) => (
                        <div key={step} className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${i <= 2 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                          <span className={`text-xs ${i <= 2 ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>{step}</span>
                          {i < 3 && <div className={`w-4 h-px ${i < 2 ? 'bg-blue-300' : 'bg-gray-200'}`} />}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-blue-600">আনুমানিক ডেলিভারি: ৬ মে, ২০২৬</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
