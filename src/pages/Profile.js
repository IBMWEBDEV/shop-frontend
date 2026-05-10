import { useState } from 'react';
import { User, Phone, Mail, MapPin, Package, Heart, Settings, LogOut, ChevronRight, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Profile() {
  const { wishlist, cartCount } = useCart();
  const [user, setUser] = useState({ name: 'মোহাম্মদ রহিম', phone: '01712-345678', email: 'rahim@email.com', city: 'ঢাকা' });
  const [editing, setEditing] = useState(false);

  const menuItems = [
    { icon: Package, label: 'আমার অর্ডার', sub: '৩টি অর্ডার', to: '/orders', badge: null },
    { icon: Heart, label: 'উইশলিস্ট', sub: `${wishlist.length}টি পণ্য`, to: '/wishlist', badge: wishlist.length },
    { icon: MapPin, label: 'ডেলিভারি ঠিকানা', sub: 'ঢাকা, বাংলাদেশ', to: '#', badge: null },
    { icon: Settings, label: 'সেটিংস', sub: 'নোটিফিকেশন, পাসওয়ার্ড', to: '#', badge: null },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 font-body animate-fade-in">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-5 relative">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
            {user.name[0]}
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">{user.name}</h2>
            <p className="text-orange-100 text-sm">{user.phone}</p>
            <p className="text-orange-100 text-xs mt-0.5">ShopBD মেম্বার</p>
          </div>
        </div>
        <button onClick={() => setEditing(!editing)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors">
          <Edit3 size={15} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'অর্ডার', value: '৩', color: 'text-orange-600' },
          { label: 'উইশলিস্ট', value: wishlist.length.toString(), color: 'text-red-500' },
          { label: 'কার্ট', value: cartCount.toString(), color: 'text-blue-500' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm">
            <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editing && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-5 shadow-sm animate-fade-in">
          <h3 className="font-semibold text-gray-800 mb-4">তথ্য আপডেট করুন</h3>
          <div className="space-y-3">
            {[['name','নাম','text'],['phone','মোবাইল','tel'],['email','ইমেইল','email'],['city','শহর','text']].map(([key,label,type]) => (
              <div key={key}>
                <label className="text-xs text-gray-500 font-medium mb-1 block">{label}</label>
                <input type={type} value={user[key]} onChange={e => setUser({...user, [key]: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400" />
              </div>
            ))}
          </div>
          <button onClick={() => setEditing(false)} className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
            সংরক্ষণ করুন
          </button>
        </div>
      )}

      {/* Menu */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-4">
        {menuItems.map(({ icon: Icon, label, sub, to, badge }, i) => (
          <Link key={label} to={to} className={`flex items-center gap-4 px-5 py-4 hover:bg-orange-50 transition-colors ${i > 0 ? 'border-t border-gray-50' : ''}`}>
            <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon size={16} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{label}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
            {badge > 0 && <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{badge}</span>}
            <ChevronRight size={16} className="text-gray-300" />
          </Link>
        ))}
      </div>

      <button className="w-full bg-red-50 border border-red-100 text-red-500 hover:bg-red-100 font-medium py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors">
        <LogOut size={16} /> লগআউট
      </button>
    </div>
  );
}
