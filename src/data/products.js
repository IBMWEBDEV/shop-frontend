export const categories = [
  { id: 1, name: "ফ্যাশন", icon: "👗", slug: "fashion" },
  { id: 2, name: "ইলেকট্রনিক্স", icon: "📱", slug: "electronics" },
  { id: 3, name: "হোম ডেকর", icon: "🏠", slug: "home" },
  { id: 4, name: "স্বাস্থ্য ও সৌন্দর্য", icon: "💄", slug: "beauty" },
  { id: 5, name: "বই ও শিক্ষা", icon: "📚", slug: "books" },
  { id: 6, name: "খেলাধুলা", icon: "⚽", slug: "sports" },
];

export const products = [
  { id: 1, name: "প্রিমিয়াম কটন পাঞ্জাবি", price: 1499, originalPrice: 2200, image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80", category: "fashion", rating: 4.5, reviews: 128, stock: 15, badge: "bestseller", description: "উচ্চমানের কটন কাপড় দিয়ে তৈরি, আরামদায়ক ও স্টাইলিশ পাঞ্জাবি। ঈদ, পূজা বা যেকোনো অনুষ্ঠানের জন্য পারফেক্ট।" },
  { id: 2, name: "স্মার্টওয়াচ Pro X7", price: 4999, originalPrice: 7500, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", category: "electronics", rating: 4.7, reviews: 256, stock: 8, badge: "hot", description: "হেলথ ট্র্যাকিং, GPS, ওয়াটারপ্রুফ। ৭ দিনের ব্যাটারি লাইফ। অ্যান্ড্রয়েড ও iOS সাপোর্ট।" },
  { id: 3, name: "হ্যান্ডমেড সিরামিক মগ সেট", price: 899, originalPrice: 1200, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80", category: "home", rating: 4.3, reviews: 89, stock: 25, badge: "new", description: "৪টি হ্যান্ডমেড সিরামিক মগের সেট। মাইক্রোওয়েভ ও ডিশওয়াশার সেফ।" },
  { id: 4, name: "অর্গানিক ফেস ক্রিম", price: 699, originalPrice: 950, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80", category: "beauty", rating: 4.6, reviews: 312, stock: 50, badge: "organic", description: "১০০% অর্গানিক উপাদান। ময়েশ্চারাইজিং ও অ্যান্টি-এজিং ফর্মুলা। সব ধরনের ত্বকের জন্য উপযুক্ত।" },
  { id: 5, name: "ওয়্যারলেস ব্লুটুথ হেডফোন", price: 3499, originalPrice: 5000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", category: "electronics", rating: 4.8, reviews: 445, stock: 12, badge: "bestseller", description: "ANC নয়েজ ক্যান্সেলিং, ৩০ ঘণ্টা ব্যাটারি, প্রিমিয়াম সাউন্ড কোয়ালিটি।" },
  { id: 6, name: "বাংলা সাহিত্য কালেকশন", price: 1299, originalPrice: 1800, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80", category: "books", rating: 4.9, reviews: 167, stock: 30, badge: "popular", description: "রবীন্দ্রনাথ, নজরুল, হুমায়ূন আহমেদের সেরা ১০টি বই। হার্ডকভার সংস্করণ।" },
  { id: 7, name: "ইন্ডোর ফুটবল স্টাডেড শু", price: 2799, originalPrice: 4000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", category: "sports", rating: 4.4, reviews: 93, stock: 18, badge: "sale", description: "হাই-গ্রিপ সোল, ব্রিদেবল মেশ আপার। সাইজ ৩৯-৪৫ পাওয়া যাচ্ছে।" },
  { id: 8, name: "সিল্ক শাড়ি কালেকশন", price: 5999, originalPrice: 8500, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80", category: "fashion", rating: 4.7, reviews: 201, stock: 7, badge: "premium", description: "হাতে বোনা রাজশাহী সিল্ক শাড়ি। বিয়ে ও বিশেষ অনুষ্ঠানের জন্য আদর্শ।" },
  { id: 9, name: "ল্যাপটপ ব্যাকপ্যাক ৩০L", price: 1899, originalPrice: 2800, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", category: "fashion", rating: 4.5, reviews: 178, stock: 22, badge: "new", description: "ওয়াটারপ্রুফ, USB চার্জিং পোর্ট সহ ১৫.৬ ইঞ্চি ল্যাপটপ কম্পার্টমেন্ট।" },
  { id: 10, name: "এয়ার পিউরিফায়ার", price: 8999, originalPrice: 12000, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", category: "home", rating: 4.6, reviews: 134, stock: 6, badge: "hot", description: "HEPA ফিল্টার, ৩৬০° এয়ার পিউরিফিকেশন। ৬০০ sqft পর্যন্ত কার্যকর।" },
  { id: 11, name: "ভিটামিন সি সিরাম", price: 599, originalPrice: 899, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80", category: "beauty", rating: 4.5, reviews: 289, stock: 45, badge: "bestseller", description: "২০% ভিটামিন সি, উজ্জ্বল ত্বক, ডার্ক স্পট দূর করে। ডার্মাটোলজিস্ট টেস্টেড।" },
  { id: 12, name: "ক্রিকেট ব্যাট (ইংলিশ উইলো)", price: 6500, originalPrice: 9000, image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80", category: "sports", rating: 4.8, reviews: 67, stock: 10, badge: "premium", description: "গ্রেড ১ ইংলিশ উইলো, অয়েলড ও নকড। পেশাদার খেলোয়াড়দের পছন্দ।" },
];

export const banners = [
  { id: 1, title: "ঈদ স্পেশাল সেল", subtitle: "সর্বোচ্চ ৭০% ছাড়", cta: "এখনই কিনুন", bg: "from-orange-500 to-red-600", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80" },
  { id: 2, title: "নতুন ইলেকট্রনিক্স", subtitle: "লেটেস্ট গ্যাজেট সংগ্রহ", cta: "দেখুন", bg: "from-blue-600 to-purple-700", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80" },
  { id: 3, title: "ফ্যাশন উইক", subtitle: "ট্রেন্ডি কালেকশন ২০২৬", cta: "শপ করুন", bg: "from-pink-500 to-rose-600", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80" },
];
