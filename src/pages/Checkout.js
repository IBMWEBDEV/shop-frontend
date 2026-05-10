import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CreditCard, Phone, CheckCircle2, MapPin, User, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

const STEPS = ['ঠিকানা', 'পেমেন্ট', 'নিশ্চিতকরণ'];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { total = cartTotal + 60, discount = 0, shipping = 60 } = location.state || {};

  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);

  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', city: 'ঢাকা', area: '', note: '',
    payMethod: 'bkash', bkashNum: '', nagadNum: '', cardNum: '', cardExp: '', cardCvv: '',
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const canNextStep0 = form.name && form.phone.length >= 11 && form.address && form.city && form.area;
  const canNextStep1 = form.payMethod === 'cod' ||
    (form.payMethod === 'bkash' && form.bkashNum.length >= 11) ||
    (form.payMethod === 'nagad' && form.nagadNum.length >= 11) ||
    (form.payMethod === 'card' && form.cardNum.length >= 16 && form.cardExp && form.cardCvv.length >= 3);

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const orderId = 'SBD' + Date.now().toString().slice(-6);
      clearCart();
      navigate('/order-success', { state: { orderId, total, form, cart } });
    }, 2000);
  };

  const paymentMethods = [
    { id: 'bkash', label: 'বিকাশ', icon: '💰', color: 'bg-pink-50 border-pink-200' },
    { id: 'nagad', label: 'নগদ', icon: '🟠', color: 'bg-orange-50 border-orange-200' },
    { id: 'rocket', label: 'রকেট', icon: '🟣', color: 'bg-purple-50 border-purple-200' },
    { id: 'card', label: 'কার্ড', icon: '💳', color: 'bg-blue-50 border-blue-200' },
    { id: 'cod', label: 'ক্যাশ অন ডেলিভারি', icon: '🏠', color: 'bg-green-50 border-green-200' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-body animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">চেকআউট</h1>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${i === step ? 'bg-orange-500 text-white shadow-md' : i < step ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${i === step ? 'bg-white text-orange-500' : i < step ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                {i < step ? '✓' : i + 1}
              </span>
              {s}
            </div>
            {i < STEPS.length - 1 && <ChevronRight size={16} className="text-gray-300 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Step 0: Address */}
          {step === 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm animate-fade-in">
              <h2 className="font-semibold text-gray-800 mb-5 flex items-center gap-2"><MapPin size={16} className="text-orange-500" /> ডেলিভারি ঠিকানা</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ['name', 'পূর্ণ নাম *', 'text', 'md:col-span-1'],
                  ['phone', 'মোবাইল নম্বর *', 'tel', 'md:col-span-1'],
                  ['email', 'ইমেইল (ঐচ্ছিক)', 'email', 'md:col-span-2'],
                ].map(([key, label, type, cls]) => (
                  <div key={key} className={cls}>
                    <label className="text-sm text-gray-600 font-medium mb-1 block">{label}</label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={e => update(key, e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1 block">জেলা *</label>
                  <select value={form.city} onChange={e => update('city', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400">
                    {['ঢাকা','চট্টগ্রাম','সিলেট','রাজশাহী','খুলনা','বরিশাল','রংপুর','ময়মনসিংহ'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-medium mb-1 block">এলাকা / থানা *</label>
                  <input value={form.area} onChange={e => update('area', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400" placeholder="যেমন: মিরপুর, ধানমন্ডি" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600 font-medium mb-1 block">বিস্তারিত ঠিকানা *</label>
                  <textarea value={form.address} onChange={e => update('address', e.target.value)} rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400 resize-none" placeholder="বাড়ি নম্বর, রোড, মহল্লা..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600 font-medium mb-1 block">বিশেষ নির্দেশনা</label>
                  <input value={form.note} onChange={e => update('note', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-400" placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন" />
                </div>
              </div>

              <button onClick={() => setStep(1)} disabled={!canNextStep0} className="mt-5 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                পরবর্তী: পেমেন্ট <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm animate-fade-in">
              <h2 className="font-semibold text-gray-800 mb-5 flex items-center gap-2"><CreditCard size={16} className="text-orange-500" /> পেমেন্ট পদ্ধতি</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                {paymentMethods.map(pm => (
                  <button key={pm.id} onClick={() => update('payMethod', pm.id)}
                    className={`border-2 rounded-xl p-3 text-center transition-all ${form.payMethod === pm.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="text-2xl mb-1">{pm.icon}</div>
                    <div className="text-xs font-semibold text-gray-700">{pm.label}</div>
                  </button>
                ))}
              </div>

              {/* Dynamic payment fields */}
              {form.payMethod === 'bkash' && (
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 animate-fade-in">
                  <p className="text-sm font-medium text-pink-700 mb-3">💰 বিকাশ নম্বরে পেমেন্ট করুন: <strong>01712-XXXXXX</strong></p>
                  <label className="text-sm text-gray-600 font-medium mb-1 block">আপনার বিকাশ নম্বর *</label>
                  <input value={form.bkashNum} onChange={e => update('bkashNum', e.target.value)} placeholder="01XXXXXXXXX" className="w-full border border-pink-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-500" />
                  <p className="text-xs text-gray-500 mt-2">Send Money → পরিমাণ → Reference: অর্ডার নম্বর</p>
                </div>
              )}
              {form.payMethod === 'nagad' && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 animate-fade-in">
                  <p className="text-sm font-medium text-orange-700 mb-3">🟠 নগদ নম্বরে পেমেন্ট করুন: <strong>01713-XXXXXX</strong></p>
                  <label className="text-sm text-gray-600 font-medium mb-1 block">আপনার নগদ নম্বর *</label>
                  <input value={form.nagadNum} onChange={e => update('nagadNum', e.target.value)} placeholder="01XXXXXXXXX" className="w-full border border-orange-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
                </div>
              )}
              {form.payMethod === 'card' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fade-in space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 font-medium mb-1 block">কার্ড নম্বর *</label>
                    <input value={form.cardNum} onChange={e => update('cardNum', e.target.value.replace(/\D/g,'').slice(0,16))} placeholder="0000 0000 0000 0000" className="w-full border border-blue-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-600 font-medium mb-1 block">মেয়াদ *</label>
                      <input value={form.cardExp} onChange={e => update('cardExp', e.target.value)} placeholder="MM/YY" className="w-full border border-blue-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-medium mb-1 block">CVV *</label>
                      <input value={form.cardCvv} onChange={e => update('cardCvv', e.target.value.slice(0,4))} placeholder="***" type="password" className="w-full border border-blue-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
                    </div>
                  </div>
                </div>
              )}
              {form.payMethod === 'cod' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in">
                  <p className="text-sm text-green-700">🏠 পণ্য পাওয়ার সময় নগদে পরিশোধ করুন। অতিরিক্ত ৳০ চার্জ নেই।</p>
                </div>
              )}

              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep(0)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl px-4 py-3 transition-colors">
                  <ChevronLeft size={15} /> আগে
                </button>
                <button onClick={() => setStep(2)} disabled={!canNextStep1} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  রিভিউ করুন <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm animate-fade-in space-y-4">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2"><Package size={16} className="text-orange-500" /> অর্ডার রিভিউ</h2>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">ডেলিভারি ঠিকানা</p>
                <p className="text-sm font-semibold text-gray-800">{form.name} · {form.phone}</p>
                <p className="text-sm text-gray-600">{form.address}, {form.area}, {form.city}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">পেমেন্ট</p>
                <p className="text-sm font-semibold text-gray-800 capitalize">
                  {paymentMethods.find(m => m.id === form.payMethod)?.icon} {paymentMethods.find(m => m.id === form.payMethod)?.label}
                  {form.payMethod === 'bkash' && ` (${form.bkashNum})`}
                  {form.payMethod === 'card' && ` (**** **** **** ${form.cardNum.slice(-4)})`}
                </p>
              </div>

              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">× {item.qty}</p>
                    </div>
                    <span className="text-sm font-bold text-orange-600">৳{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl px-4 py-3 transition-colors">
                  <ChevronLeft size={15} /> পেমেন্ট
                </button>
                <button onClick={placeOrder} disabled={placing} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  {placing ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> অর্ডার প্রক্রিয়া হচ্ছে...</>
                  ) : (
                    <><CheckCircle2 size={18} /> অর্ডার কনফার্ম করুন</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm h-fit sticky top-24">
          <h3 className="font-semibold text-gray-800 mb-4">অর্ডার সারসংক্ষেপ</h3>
          <div className="space-y-2 text-sm">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-gray-600">
                <span className="truncate mr-2">{item.name} ×{item.qty}</span>
                <span className="flex-shrink-0">৳{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-2 space-y-1.5">
              <div className="flex justify-between text-gray-500"><span>সাবটোটাল</span><span>৳{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>ডেলিভারি</span><span className={shipping===0?'text-green-600':''}>{ shipping===0?'ফ্রি':`৳${shipping}`}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>কুপন ছাড়</span><span>-৳{discount.toLocaleString()}</span></div>}
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base">
              <span>মোট</span>
              <span className="text-orange-600">৳{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
