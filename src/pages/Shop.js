import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initCat = params.get('cat') || 'all';
  const initQ = params.get('q') || '';

  const [selectedCat, setSelectedCat] = useState(initCat);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [searchQ, setSearchQ] = useState(initQ);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setSelectedCat(params.get('cat') || 'all');
    setSearchQ(params.get('q') || '');
  }, [location.search]);

  let filtered = products.filter(p => {
    const matchCat = selectedCat === 'all' || p.category === selectedCat;
    const matchSearch = !searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase());
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchCat && matchSearch && matchPrice;
  });

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'discount') filtered = [...filtered].sort((a, b) => (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-body animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filter */}
        <aside className={`${showFilter ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2"><SlidersHorizontal size={16} /> ফিল্টার</h3>
              <button className="md:hidden text-gray-400" onClick={() => setShowFilter(false)}><X size={18} /></button>
            </div>

            {/* Category */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">ক্যাটাগরি</h4>
              <div className="space-y-1">
                {[{ slug: 'all', name: 'সব পণ্য', icon: '🛍️' }, ...categories].map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCat(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-2 transition-all ${selectedCat === cat.slug ? 'bg-orange-500 text-white font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">দাম (৳)</h4>
              <div className="flex gap-2 mb-2">
                <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-orange-400" placeholder="সর্বনিম্ন" />
                <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-orange-400" placeholder="সর্বোচ্চ" />
              </div>
              <input type="range" min="0" max="15000" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full accent-orange-500" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>৳০</span><span>৳{priceRange[1].toLocaleString()}</span></div>
            </div>

            <button onClick={() => { setSelectedCat('all'); setPriceRange([0, 15000]); setSearchQ(''); }} className="w-full text-sm text-red-500 hover:text-red-600 border border-red-200 hover:border-red-300 rounded-xl py-2 transition-colors">
              ফিল্টার রিসেট
            </button>
          </div>
        </aside>

        {/* Products Area */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilter(!showFilter)} className="md:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm">
                <Filter size={14} /> ফিল্টার
              </button>
              <p className="text-sm text-gray-500">{filtered.length}টি পণ্য পাওয়া গেছে</p>
            </div>

            {/* Sort */}
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm pr-8 outline-none focus:border-orange-400 cursor-pointer">
                <option value="popular">জনপ্রিয়</option>
                <option value="price-asc">কম দাম আগে</option>
                <option value="price-desc">বেশি দাম আগে</option>
                <option value="rating">সেরা রেটিং</option>
                <option value="discount">বেশি ছাড়</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Search input */}
          {searchQ && (
            <div className="mb-4 flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 py-2">
              <span className="text-sm text-orange-700">খুঁজছেন: <strong>"{searchQ}"</strong></span>
              <button onClick={() => setSearchQ('')} className="ml-auto text-gray-400 hover:text-gray-600"><X size={14} /></button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="font-display text-xl font-bold text-gray-700 mb-2">কোনো পণ্য পাওয়া যায়নি</h3>
              <p className="text-gray-500 text-sm">অনুসন্ধান পরিবর্তন করুন বা ফিল্টার রিসেট করুন</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
