import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 font-body">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center"><span className="text-white font-bold">S</span></div>
            <span className="font-display text-xl font-bold text-white">ShopBD</span>
          </div>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">বাংলাদেশের সেরা অনলাইন শপিং প্ল্যাটফর্ম। সেরা মানের পণ্য, দ্রুত ডেলিভারি, সহজ পেমেন্ট।</p>
          <div className="flex gap-3">
            {[['f', 'Facebook'], ['in', 'Instagram'], ['yt', 'YouTube']].map(([abbr, name]) => (
              <a key={abbr} href="#" title={name} className="w-9 h-9 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors text-xs font-bold">
                {abbr}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">দ্রুত লিংক</h4>
          <ul className="space-y-2 text-sm">
            {[['/', 'হোম'], ['/shop', 'সব পণ্য'], ['/cart', 'কার্ট'], ['/orders', 'আমার অর্ডার'], ['/wishlist', 'উইশলিস্ট']].map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:text-orange-400 transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h4 className="text-white font-semibold mb-4">নীতিমালা</h4>
          <ul className="space-y-2 text-sm">
            {['রিটার্ন পলিসি', 'প্রাইভেসি পলিসি', 'শিপিং পলিসি', 'পেমেন্ট গাইড', 'সাইজ চার্ট'].map(l => (
              <li key={l}><a href="#" className="hover:text-orange-400 transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">যোগাযোগ</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><Phone size={14} className="text-orange-400" /><span>01700-000000</span></div>
            <div className="flex items-center gap-2"><Mail size={14} className="text-orange-400" /><span>info@shopbd.com.bd</span></div>
            <div className="flex items-start gap-2"><MapPin size={14} className="text-orange-400 mt-0.5" /><span>ঢাকা, বাংলাদেশ</span></div>
          </div>
          <div className="mt-5">
            <p className="text-xs text-gray-500 mb-2">পেমেন্ট মেথড</p>
            <div className="flex flex-wrap gap-2">
              {['bKash', 'Nagad', 'Rocket', 'VISA', 'MasterCard'].map(p => (
                <span key={p} className="bg-gray-700 text-xs px-2 py-1 rounded-md">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © ২০২৬ ShopBD। সমস্ত অধিকার সংরক্ষিত। বাংলাদেশে তৈরি ❤️
      </div>
    </footer>
  );
}
