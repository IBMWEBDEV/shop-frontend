import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Truck, RotateCcw, Shield, Headphones, TrendingUp, Zap } from 'lucide-react';
import { products, categories, banners } from '../data/products';
import ProductCard from '../components/ProductCard';

function HeroBanner() {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % banners.length), 4000);
    return () => clearInterval(t);
  }, []);

  const b = banners[cur];
  return (
    <div className={`relative bg-gradient-to-r ${b.bg} rounded-2xl overflow-hidden h-64 md:h-80`}>
      <img src={b.image} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" />
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16">
        <div className="text-white animate-fade-in" key={cur}>
          <p className="text-sm font-body opacity-80 mb-1">🔥 বিশেষ অফার</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-2">{b.title}</h2>
          <p className="font-body text-lg md:text-xl opacity-90 mb-6">{b.subtitle}</p>
          <Link to="/shop" className="inline-block bg-white text-gray-900 font-body font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors">
            {b.cta} →
          </Link>
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} className={`w-2 h-2 rounded-full transition-all ${i === cur ? 'bg-white w-6' : 'bg-white/50'}`} />
        ))}
      </div>
      <button onClick={() => setCur(c => (c - 1 + banners.length) % banners.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition-colors">
        <ChevronLeft size={18} />
      </button>
      <button onClick={() => setCur(c => (c + 1) % banners.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition-colors">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default function Home() {
  const featured = products.filter(p => p.badge === 'bestseller' || p.badge === 'hot');
  const newArrivals = products.filter(p => p.badge === 'new' || p.badge === 'premium');

  const features = [
    { icon: Truck, label: 'ফ্রি ডেলিভারি', sub: '৳৫০০+ অর্ডারে' },
    { icon: RotateCcw, label: '৭ দিন রিটার্ন', sub: 'সহজ রিটার্ন পলিসি' },
    { icon: Shield, label: '১০০% নিরাপদ', sub: 'SSL এনক্রিপ্টেড' },
    { icon: Headphones, label: '২৪/৭ সাপোর্ট', sub: 'সর্বদা সাহায্যে' },
  ];

  return (
    <div className="font-body animate-fade-in">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2"><HeroBanner /></div>
          <div className="flex flex-col gap-4">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-5 text-white flex-1">
              <p className="text-xs opacity-80 mb-1">নতুন সংগ্রহ</p>
              <h3 className="font-display text-xl font-bold mb-1">ফ্যাশন উইক</h3>
              <p className="text-sm opacity-80 mb-3">৩০% পর্যন্ত ছাড়</p>
              <Link to="/shop?cat=fashion" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg inline-block transition-colors">দেখুন →</Link>
            </div>
            <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-5 text-white flex-1">
              <p className="text-xs opacity-80 mb-1">আজকের ডিল</p>
              <h3 className="font-display text-xl font-bold mb-1">ইলেকট্রনিক্স</h3>
              <p className="text-sm opacity-80 mb-3">৫০% পর্যন্ত ছাড়</p>
              <Link to="/shop?cat=electronics" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg inline-block transition-colors">দেখুন →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(cat => (
            <Link key={cat.id} to={`/shop?cat=${cat.slug}`} className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-4 hover:border-orange-300 hover:bg-orange-50 transition-all group">
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-700 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-orange-500" />
            <h2 className="font-display text-2xl font-bold text-gray-900">বেস্টসেলার</h2>
          </div>
          <Link to="/shop" className="text-sm text-orange-500 hover:text-orange-600 font-medium">সব দেখুন →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between text-white">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Zap size={28} className="flex-shrink-0" />
            <div>
              <h3 className="font-display text-2xl font-bold">ফ্ল্যাশ সেল চলছে!</h3>
              <p className="text-sm opacity-90">সীমিত সময়ের অফার — এখনই সুযোগ নিন</p>
            </div>
          </div>
          <Link to="/shop" className="bg-white text-red-500 font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors">
            অফার দেখুন →
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-4 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-bold text-gray-900">নতুন পণ্য</h2>
          <Link to="/shop" className="text-sm text-orange-500 hover:text-orange-600 font-medium">সব দেখুন →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
