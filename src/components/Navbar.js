import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, User, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount, wishlist } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) { navigate(`/shop?q=${search}`); setSearch(''); }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs text-center py-1.5 font-body">
        🎉 ৳৫০০+ অর্ডারে ফ্রি ডেলিভারি | বিকাশ, নগদ, রকেট গ্রহণযোগ্য
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-display text-xl font-bold text-gray-900">ShopBD</span>
          </div>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4 hidden md:flex">
          <div className="flex w-full border-2 border-orange-400 rounded-xl overflow-hidden">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="পণ্য খুঁজুন..."
              className="flex-1 px-4 py-2 text-sm font-body outline-none"
            />
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-4 text-white transition-colors">
              <Search size={16} />
            </button>
          </div>
        </form>

        {/* Nav Links Desktop */}
        <div className="hidden md:flex items-center gap-1 text-sm font-body">
          <Link to="/shop" className="px-3 py-2 hover:text-orange-500 font-medium transition-colors">শপ</Link>
          <Link to="/shop?cat=fashion" className="px-3 py-2 hover:text-orange-500 transition-colors">ফ্যাশন</Link>
          <Link to="/shop?cat=electronics" className="px-3 py-2 hover:text-orange-500 transition-colors">ইলেকট্রনিক্স</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <Link to="/orders" className="p-2 hover:bg-orange-50 rounded-xl transition-colors hidden md:flex">
            <Package size={20} className="text-gray-600" />
          </Link>
          <Link to="/wishlist" className="p-2 hover:bg-orange-50 rounded-xl transition-colors relative">
            <Heart size={20} className="text-gray-600" />
            {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{wishlist.length}</span>}
          </Link>
          <Link to="/cart" className="p-2 hover:bg-orange-50 rounded-xl transition-colors relative">
            <ShoppingCart size={20} className="text-gray-600" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
          </Link>
          <Link to="/profile" className="p-2 hover:bg-orange-50 rounded-xl transition-colors hidden md:flex">
            <User size={20} className="text-gray-600" />
          </Link>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <form onSubmit={handleSearch} className="p-3">
            <div className="flex border-2 border-orange-400 rounded-xl overflow-hidden">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="পণ্য খুঁজুন..." className="flex-1 px-4 py-2 text-sm outline-none font-body" />
              <button type="submit" className="bg-orange-500 px-4 text-white"><Search size={16} /></button>
            </div>
          </form>
          <div className="flex flex-col font-body text-sm pb-3">
            {[['/', 'হোম'], ['/shop', 'সব পণ্য'], ['/orders', 'অর্ডার'], ['/wishlist', 'উইশলিস্ট'], ['/profile', 'প্রোফাইল']].map(([to, label]) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-orange-50 border-b border-gray-50 font-medium">{label}</Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
