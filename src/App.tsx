import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Instagram, 
  Users, 
  Calendar, 
  ChevronRight, 
  Globe, 
  ArrowLeft,
  Upload,
  Camera,
  Video,
  CreditCard,
  Check,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  Eye,
  MessageSquare,
  Send,
  Smartphone,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  FileText,
  Info,
  Lock,
  Car,
  Zap,
  TrendingUp,
  Wrench,
  Star,
  Crown,
  Hammer,
  Truck,
  Building2,
  Briefcase,
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Sparkles,
  Rocket,
  Target,
  BarChart3,
  PlayCircle,
  Headphones,
  ThumbsUp
} from 'lucide-react';
import { translations, Language } from './translations';

// --- Types ---
interface Package {
  id: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  vip?: boolean;
  equipment?: boolean;
  business?: boolean;
}

interface Order {
  id: string;
  package_name: string;
  full_name: string;
  phone: string;
  car_model: string;
  car_year: string;
  car_mileage: string;
  car_price: string;
  car_registration: string;
  car_test_until: string;
  location: string;
  payment_proof: string;
  car_images: string;
  status: string;
  created_at: string;
}

// --- Components ---

const Navbar = ({ lang, setLang, isAdmin, onLogout, siteSettings, setView }: { lang: Language, setLang: (l: Language) => void, isAdmin?: boolean, onLogout?: () => void, siteSettings: any, setView: (v: string) => void }) => {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="p-2.5 bg-gradient-to-br from-brand-red to-red-700 rounded-xl shadow-lg shadow-brand-red/20"
            >
              <Car size={26} className="text-white" />
            </motion.div>
            <div>
              <div className="text-2xl font-black tracking-tighter">
                <span className="text-brand-red">YOUGO</span> <span className="text-white">ISRAEL</span>
              </div>
              <div className="text-[9px] text-white/40 font-bold tracking-wider">
                {siteSettings.positioning_line_he || t.positioningLine}
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-bold text-white/70 hover:text-brand-red transition-colors">איך זה עובד</a>
            <a href="#packages" className="text-sm font-bold text-white/70 hover:text-brand-red transition-colors">חבילות</a>
            <button onClick={() => setView('check-status')} className="text-sm font-bold text-white/70 hover:text-brand-red transition-colors">בדיקת סטטוס</button>
            <a href="#faq" className="text-sm font-bold text-white/70 hover:text-brand-red transition-colors">שאלות</a>
            
            <button 
              onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-sm font-bold hover:bg-white/10 transition-colors"
            >
              <Globe size={16} />
              {lang === 'he' ? 'العربية' : 'עברית'}
            </button>

            {isAdmin && (
              <button onClick={onLogout} className="text-sm font-bold text-white/40 hover:text-white transition-colors">
                <LogOut size={18} />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 space-y-2 border-t border-white/5"
            >
              <a href="#how-it-works" className="block py-3 px-4 text-white/70 hover:bg-white/5 rounded-lg transition-colors">איך זה עובד</a>
              <a href="#packages" className="block py-3 px-4 text-white/70 hover:bg-white/5 rounded-lg transition-colors">חבילות</a>
              <button onClick={() => { setView('check-status'); setMobileMenuOpen(false); }} className="block w-full text-right py-3 px-4 text-white/70 hover:bg-white/5 rounded-lg transition-colors">בדיקת סטטוס</button>
              <a href="#faq" className="block py-3 px-4 text-white/70 hover:bg-white/5 rounded-lg transition-colors">שאלות</a>
              
              <button 
                onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 rounded-lg border border-white/10"
              >
                <Globe size={16} />
                {lang === 'he' ? 'العربية' : 'עברית'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

interface PackageCardProps {
  pkg: Package;
  lang: Language;
  onSelect: (p: Package) => void;
  key?: string;
}

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative glass-card w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-2xl font-bold text-brand-red">{title}</h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="text-white/80 leading-relaxed whitespace-pre-wrap text-lg">
              {children.toString().split('\n').map((line, i) => (
                <p key={i} className={line.match(/^\d+\./) ? "mb-4 font-bold text-white" : "mb-4"}>
                  {line}
                </p>
              ))}
            </div>
            <div className="pt-4 flex justify-end">
              <button onClick={onClose} className="btn-primary py-2 px-6">סגור</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- VIP Package Card ---
const VIPPackageCard = ({ pkg, lang, onSelect }: PackageCardProps) => {
  const t = translations[lang];
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280 }}
      className="relative w-[300px] md:w-full rounded-3xl overflow-hidden h-full flex flex-col snap-center shrink-0 group"
      style={{
        boxShadow: '0 20px 40px -15px rgba(212,175,55,0.3), 0 0 0 1px rgba(212,175,55,0.2) inset',
        background: 'radial-gradient(circle at 100% 0%, #2a1f0a 0%, #0f0c05 80%)'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, #d4af37 2px, transparent 2px), radial-gradient(circle at 80% 70%, #d4af37 1px, transparent 1px)',
        backgroundSize: '50px 50px, 30px 30px'
      }} />

      <div className="relative z-10 p-7 md:p-8 space-y-6 flex-grow flex flex-col">
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-900/40 to-amber-800/20 rounded-full px-4 py-1.5 border border-amber-500/30">
            <Crown size={14} className="text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">VIP LUXURY</span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1.5">
            <span className="text-[9px] font-black text-emerald-400">15% הנחה</span>
          </div>
          <div className="flex mr-auto">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-l from-amber-200 via-amber-400 to-amber-300 bg-clip-text text-transparent">
            VIP LUXURY
          </h3>
          <p className="text-amber-100/40 text-sm mt-2 leading-relaxed">
            חבילת הפרסום האולטימטיבית — לרכבים שמגיעים ליחס הכי טוב. חשיפה מקסימלית, עיצוב פרמיום, ליווי אישי מלא.
          </p>
        </div>

        <div className="flex items-baseline gap-4">
          <span className="text-5xl font-black text-amber-400">₪749</span>
          <span className="text-lg line-through text-white/20">₪882</span>
          <span className="text-xs font-black bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
            חיסכון ₪133
          </span>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        <div className="grid grid-cols-2 gap-3 flex-grow">
          {[
            { icon: <Camera size={14} />, label: '15+ תמונות' },
            { icon: <Video size={14} />, label: 'רילס + סטורי VIP' },
            { icon: <Calendar size={14} />, label: '60 ימי פרסום' },
            { icon: <TrendingUp size={14} />, label: 'חשיפה מקסימלית' },
            { icon: <ShieldCheck size={14} />, label: 'ליווי אישי 24/7' },
            { icon: <Crown size={14} />, label: 'עיצוב VIP בלעדי' },
            { icon: <Users size={14} />, label: 'טרגוט מתקדם' },
            { icon: <Zap size={14} />, label: 'עדיפות ראשונה' },
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5 hover:bg-amber-500/10 hover:border-amber-500/20 transition-all duration-300">
              <span className="text-amber-400">{feat.icon}</span>
              <span className="text-xs font-medium text-white/80">{feat.label}</span>
            </div>
          ))}
        </div>

        <motion.button
          onClick={() => onSelect(pkg)}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-l from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all mt-4 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            <Crown size={18} />
            הזמן VIP עכשיו
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// --- DUO DEAL Package Card ---
const DuoDealPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 280 }}
      className="relative w-[300px] md:w-full rounded-3xl overflow-hidden h-full flex flex-col snap-center shrink-0 group"
      style={{
        background: 'radial-gradient(circle at 100% 0%, #1e1428 0%, #0b0710 100%)',
        boxShadow: '0 20px 40px -15px rgba(139,92,246,0.3), 0 0 0 1px rgba(139,92,246,0.2) inset'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
      
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500" style={{
        backgroundImage: 'radial-gradient(circle at 30% 40%, #a78bfa 2px, transparent 2px), radial-gradient(circle at 70% 60%, #8b5cf6 1px, transparent 1px)',
        backgroundSize: '50px 50px, 30px 30px'
      }} />

      <div className="relative z-10 p-7 md:p-8 space-y-6 flex-grow flex flex-col">
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-purple-900/40 rounded-full px-4 py-1.5 border border-purple-500/30">
            <Car size={14} className="text-purple-400" />
            <Car size={14} className="text-purple-400" />
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-300">DUO DEAL</span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1.5">
            <span className="text-[9px] font-black text-emerald-400">חיסכון 40%</span>
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-l from-purple-200 via-purple-400 to-purple-300 bg-clip-text text-transparent">
            DUO DEAL
          </h3>
          <p className="text-purple-100/40 text-sm mt-2 leading-relaxed">
            מוכרים 2 רכבים? קבלו חשיפה כפולה במחיר שלא תמצאו בשום מקום.
          </p>
        </div>

        <div className="flex items-baseline gap-4">
          <span className="text-5xl font-black text-purple-400">₪349</span>
          <span className="text-lg line-through text-white/20">₪598</span>
          <span className="text-xs font-black bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
            חיסכון ₪249
          </span>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        <div className="grid grid-cols-2 gap-3 flex-grow">
          {[
            { icon: <Car size={14} />, label: 'פרסום 2 רכבים' },
            { icon: <Camera size={14} />, label: '4 תמונות לרכב' },
            { icon: <Instagram size={14} />, label: 'פוסט לכל רכב' },
            { icon: <Calendar size={14} />, label: 'סטורי 14 יום' },
            { icon: <Users size={14} />, label: 'חשיפה כפולה' },
            { icon: <TrendingUp size={14} />, label: 'קהל מעוניין' },
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5 hover:bg-purple-500/10 hover:border-purple-500/20 transition-all duration-300">
              <span className="text-purple-400">{feat.icon}</span>
              <span className="text-xs font-medium text-white/80">{feat.label}</span>
            </div>
          ))}
        </div>

        <motion.button
          onClick={() => onSelect(pkg)}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-l from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all mt-4 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            <Car size={18} />
            הזמן DUO עכשיו
          </span>
        </motion.button>

        <p className="text-center text-[10px] text-purple-300/40 mt-2">
          הכי משתלם לשני רכבים
        </p>
      </div>
    </motion.div>
  );
};

// --- Equipment Package Card ---
const EquipmentPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const isHeavy = pkg.id === 'equipment-heavy';
  
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative w-[300px] md:w-full rounded-2xl border transition-all duration-500 h-full flex flex-col p-7 snap-center shrink-0 group"
      style={{
        background: isHeavy 
          ? 'linear-gradient(135deg, rgba(234,88,12,0.08) 0%, rgba(15,12,8,1) 100%)' 
          : 'linear-gradient(135deg, rgba(100,116,139,0.08) 0%, rgba(10,12,15,1) 100%)',
        borderColor: isHeavy ? 'rgba(234,88,12,0.35)' : 'rgba(100,116,139,0.25)',
        boxShadow: isHeavy ? '0 0 30px rgba(234,88,12,0.06)' : 'none'
      }}
    >
      {isHeavy && (
        <div className="absolute -top-4 right-6 z-10 bg-orange-600 text-white text-[9px] font-black py-1 px-3 rounded-full shadow-lg uppercase tracking-widest">
          הכי מבוקש
        </div>
      )}

      <div className="flex items-center gap-3 mb-5 pb-4 border-b"
        style={{ borderColor: isHeavy ? 'rgba(234,88,12,0.15)' : 'rgba(100,116,139,0.1)' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: isHeavy ? 'rgba(234,88,12,0.15)' : 'rgba(100,116,139,0.12)' }}>
          {isHeavy 
            ? <Truck size={24} style={{ color: '#ea580c' }} />
            : <Wrench size={24} style={{ color: '#94a3b8' }} />
          }
        </div>
        <div>
          <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-0.5"
            style={{ color: isHeavy ? '#ea580c' : '#94a3b8' }}>
            {isHeavy ? 'ציוד כבד' : 'ציוד קל'}
          </div>
          <h3 className="text-lg font-black text-white">{pkg.name}</h3>
        </div>
        <div className="mr-auto text-right">
          <div className="text-2xl font-black text-white">{pkg.price}</div>
          <div className="text-[10px] text-white/30 line-through">
            ₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}
          </div>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {(isHeavy 
          ? ['באגר', 'מחפרון', 'מיני באגר', 'בולדוזר', 'עגורן'] 
          : ['פופקט', 'ג\'ק', 'מלגזה', 'סקיד סטיר', 'מערבל']
        ).map((item, i) => (
          <span key={i} className="text-[10px] font-black px-2.5 py-1 rounded-full border group-hover:bg-white/5 transition-all duration-300"
            style={{ 
              color: isHeavy ? '#fb923c' : '#94a3b8',
              borderColor: isHeavy ? 'rgba(234,88,12,0.25)' : 'rgba(100,116,139,0.2)',
              background: isHeavy ? 'rgba(234,88,12,0.08)' : 'rgba(100,116,139,0.06)'
            }}>
            {item}
          </span>
        ))}
      </div>

      <div className="space-y-2.5 mb-8 flex-grow">
        {pkg.features.map((f, i) => (
          <div key={i} className="flex items-start gap-2 text-xs font-medium group/feature">
            <div className="mt-0.5 p-0.5 rounded-full shrink-0 group-hover/feature:scale-110 transition-transform duration-300"
              style={{ background: isHeavy ? 'rgba(234,88,12,0.6)' : 'rgba(100,116,139,0.4)' }}>
              <Check size={8} className="text-dark-bg" strokeWidth={5} />
            </div>
            <span className="text-white/80 group-hover/feature:text-white transition-colors duration-300">{f}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(pkg)}
        className="w-full py-3.5 rounded-xl font-black text-sm transition-all duration-300 active:scale-95 relative overflow-hidden group/btn"
        style={{
          background: isHeavy 
            ? 'linear-gradient(135deg, #ea580c, #c2410c)' 
            : 'rgba(100,116,139,0.2)',
          color: isHeavy ? '#fff' : '#cbd5e1',
          border: isHeavy ? 'none' : '1px solid rgba(100,116,139,0.3)'
        }}
      >
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        <span className="relative">{isHeavy ? '🚜 הזמן עכשיו' : '🔧 הזמן עכשיו'}</span>
      </button>
    </motion.div>
  );
};

// --- Business Package Card (New Professional Design) ---
const BusinessPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative w-full rounded-3xl overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, #0a1929 0%, #0f2744 50%, #1a3650 100%)',
        boxShadow: '0 30px 60px -15px rgba(0,100,255,0.3), 0 0 0 1px rgba(0,150,255,0.3) inset'
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 animate-pulse" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      <div className="relative z-10 p-8 md:p-10">
        {/* Top badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30"
            >
              <Building2 size={28} className="text-white" />
            </motion.div>
            <div>
              <div className="text-sm font-black text-blue-400 uppercase tracking-[0.2em]">לסוכנויות ומגרשים</div>
              <h3 className="text-3xl md:text-4xl font-black text-white">חבילת BUSINESS</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
            <Award size={16} className="text-blue-400" />
            <span className="text-xs font-black text-blue-400">מומלץ לעסקים</span>
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left column - Features */}
          <div className="space-y-6">
            <div className="flex items-baseline gap-4">
              <div>
                <span className="text-5xl font-black text-white">₪1,499</span>
                <span className="text-white/40 text-sm mr-2">/ לחודש</span>
              </div>
              <span className="text-base line-through text-white/30">₪2,499</span>
              <span className="text-xs font-black bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
                חיסכון 40%
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Check size={16} className="text-blue-400" />
                </div>
                <span>פרסום עד 50 רכבים בחודש</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Check size={16} className="text-blue-400" />
                </div>
                <span>צילומים מקצועיים לכל רכב</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Check size={16} className="text-blue-400" />
                </div>
                <span>דפי נחיתה מותאמים אישית</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Check size={16} className="text-blue-400" />
                </div>
                <span>מנהל לקוחות ייעודי</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Check size={16} className="text-blue-400" />
                </div>
                <span>דוחות ביצועים חודשיים</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Check size={16} className="text-blue-400" />
                </div>
                <span>קידום ממומן בגוגל ובאינסטגרם</span>
              </div>
            </div>
          </div>

          {/* Right column - Benefits */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-white flex items-center gap-2">
              <Sparkles size={20} className="text-blue-400" />
              יתרונות החבילה
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Target size={24} className="text-blue-400 mb-2" />
                <div className="text-sm font-black">חשיפה ממוקדת</div>
                <div className="text-xs text-white/50">לקהל קונים פוטנציאלי</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <BarChart3 size={24} className="text-purple-400 mb-2" />
                <div className="text-sm font-black">ניתוח נתונים</div>
                <div className="text-xs text-white/50">מעקב אחר ביצועים</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Headphones size={24} className="text-green-400 mb-2" />
                <div className="text-sm font-black">תמיכה VIP</div>
                <div className="text-xs text-white/50">זמינים 24/7</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Rocket size={24} className="text-orange-400 mb-2" />
                <div className="text-sm font-black">תוצאות מהירות</div>
                <div className="text-xs text-white/50">מכירות תוך 48 שעות</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 pt-8 border-t border-white/10">
          <motion.button
            onClick={() => onSelect(pkg)}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all relative overflow-hidden group/btn"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center justify-center gap-3">
              <Briefcase size={22} />
              התחל חבילת BUSINESS
            </span>
          </motion.button>
          
          <a 
            href="https://wa.me/972546980606?text=שלום, אני מעוניין בחבילת עסקים לסוכנות שלי"
            target="_blank"
            className="flex-1 py-5 rounded-2xl font-black text-lg bg-white/5 border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-3 group"
          >
            <MessageSquare size={22} className="group-hover:scale-110 transition-transform" />
            דבר עם יועץ עסקי
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4">
          <div className="flex items-center gap-2 text-white/40">
            <ShieldCheck size={16} />
            <span className="text-xs">חוזה חודשי</span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <ThumbsUp size={16} />
            <span className="text-xs">100% שביעות רצון</span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Users size={16} />
            <span className="text-xs">50+ סוכנויות מרוצות</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PackageCard = ({ pkg, lang, onSelect }: PackageCardProps) => {
  const t = translations[lang];

  const tierConfig = {
    basic:   { color: '#94a3b8', glow: 'rgba(148,163,184,0.08)', badge: '🚀', accentBg: 'rgba(148,163,184,0.06)', borderColor: 'rgba(148,163,184,0.15)' },
    pro:     { color: '#c8102e', glow: 'rgba(200,16,46,0.10)',   badge: '⭐', accentBg: 'rgba(200,16,46,0.07)',   borderColor: 'rgba(200,16,46,0.35)'    },
    premium: { color: '#c8102e', glow: 'rgba(200,16,46,0.14)',   badge: '💎', accentBg: 'rgba(200,16,46,0.10)',   borderColor: 'rgba(200,16,46,0.45)'    },
  };
  const cfg = tierConfig[pkg.id as keyof typeof tierConfig] || tierConfig.basic;
  const isPro = pkg.id === 'pro';
  const isPremium = pkg.premium;

  const featureChips = pkg.features.slice(0, 5);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative w-[300px] md:w-full rounded-2xl h-full flex flex-col snap-center shrink-0 group"
      style={{
        background: isPremium
          ? 'linear-gradient(155deg, rgba(200,16,46,0.12) 0%, rgba(10,5,5,1) 100%)'
          : 'linear-gradient(155deg, rgba(255,255,255,0.04) 0%, rgba(10,10,12,1) 100%)',
        border: `1px solid ${cfg.borderColor}`,
        boxShadow: isPremium ? `0 0 28px ${cfg.glow}` : 'none',
        overflow: 'hidden'
      }}
    >
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` }} />

      {pkg.popular && (
        <div className="absolute top-3 right-3 z-10 text-white text-[9px] font-black py-1 px-2.5 rounded-full shadow-lg uppercase tracking-widest"
          style={{ background: cfg.color }}>
          {t.mostPopular}
        </div>
      )}

      <div className="absolute top-3 left-3 text-[9px] font-black py-0.5 px-2 rounded-full"
        style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
        15% OFF
      </div>

      <div className="p-6 flex flex-col flex-grow gap-4">
        <div className="flex items-center gap-2.5 mt-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300"
            style={{ background: cfg.accentBg, border: `1px solid ${cfg.borderColor}` }}>
            {cfg.badge}
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight" style={{ color: isPremium || isPro ? cfg.color : '#fff' }}>
              {pkg.name}
            </h3>
            <p className="text-[10px] leading-tight" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {pkg.id === 'basic' ? t.packageSubtitles.basic :
               pkg.id === 'pro' ? t.packageSubtitles.pro :
               t.packageSubtitles.premium}
            </p>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white">{pkg.price}</span>
          <span className="text-[11px] line-through" style={{ color: 'rgba(255,255,255,0.3)' }}>
            ₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}
          </span>
        </div>

        <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${cfg.borderColor}, transparent)` }} />

        <div className="flex flex-col gap-2 flex-grow">
          {featureChips.map((feat, i) => (
            <div key={i} className="flex items-center gap-2 group/feature">
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 group-hover/feature:scale-110 transition-transform duration-300"
                style={{ background: cfg.accentBg, border: `1px solid ${cfg.borderColor}` }}>
                <Check size={9} strokeWidth={3} style={{ color: cfg.color }} />
              </div>
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.78)' }}>{feat}</span>
            </div>
          ))}
          {pkg.features.length > 5 && (
            <span className="text-[10px] font-bold mt-1" style={{ color: cfg.color }}>
              + {pkg.features.length - 5} תכונות נוספות
            </span>
          )}
        </div>

        <button
          onClick={() => onSelect(pkg)}
          className="w-full py-3 rounded-xl font-black text-sm transition-all duration-200 active:scale-95 mt-2 relative overflow-hidden group/btn"
          style={{
            background: isPremium || isPro ? cfg.color : 'rgba(255,255,255,0.9)',
            color: isPremium || isPro ? '#fff' : '#0a0a0c'
          }}
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          <span className="relative">{t.startOrder}</span>
        </button>
      </div>
    </motion.div>
  );
};

// --- Bit / PayBox Logo ---
const BitLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const h = size === 'sm' ? 28 : size === 'lg' ? 40 : 32;
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 19 : 15;
  const px = size === 'sm' ? 10 : 14;
  return (
    <div
      className="inline-flex items-center justify-center rounded-xl overflow-hidden shrink-0"
      style={{ background: '#0D3D3D', height: h, paddingLeft: px, paddingRight: px, gap: 5 }}
    >
      <svg width={fontSize * 0.55} height={h * 0.65} viewBox="0 0 9 18" fill="none">
        <circle cx="4.5" cy="2" r="2" fill="#00E5CC"/>
        <rect x="2.5" y="6" width="4" height="10" rx="2" fill="#00E5CC"/>
      </svg>
      <span style={{
        fontFamily: '"Nunito", "Varela Round", Arial Rounded MT Bold, Arial, sans-serif',
        fontWeight: 800,
        fontSize,
        color: '#00E5CC',
        letterSpacing: '-0.5px',
        lineHeight: 1
      }}>bit</span>
    </div>
  );
};

const PayBoxLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const h = size === 'sm' ? 28 : size === 'lg' ? 40 : 32;
  const fontSize = size === 'sm' ? 11 : size === 'lg' ? 16 : 13;
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 22 : 18;
  const px = size === 'sm' ? 10 : 14;
  return (
    <div
      className="inline-flex items-center justify-center rounded-xl overflow-hidden shrink-0"
      style={{ background: '#29ABE2', height: h, paddingLeft: px, paddingRight: px, gap: 6 }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="6" r="3" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M5 10 L9 14 L9 20 L15 20 L15 14 L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      <span style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 700,
        fontSize,
        color: '#ffffff',
        letterSpacing: '0.2px',
        lineHeight: 1
      }}>PayBox</span>
    </div>
  );
};

// --- Order Status Check Component ---
const OrderStatusCheck = ({ onClose }: { onClose: () => void }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'notfound'>('idle');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const checkOrder = () => {
    if (!orderNumber) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      // This would be replaced with actual API call
      if (orderNumber.length > 3) {
        setStatus('found');
        setOrderDetails({
          id: orderNumber,
          date: '2024-02-23',
          package: 'VIP LUXURY',
          status: 'בתהליך',
          car: 'מזדה 3 2020'
        });
      } else {
        setStatus('notfound');
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-gradient-to-br from-brand-red to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-brand-red/30">
          <Search size={36} className="text-white" />
        </div>
        <h3 className="text-2xl font-black">בדיקת סטטוס הזמנה</h3>
        <p className="text-white/50 text-sm">הכנס את מספר ההזמנה שקיבלת בוואטסאפ</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="לדוגמה: #12345"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-center text-xl font-black tracking-widest focus:border-brand-red focus:outline-none transition-all"
          />
          {orderNumber && (
            <button
              onClick={() => setOrderNumber('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <button
          onClick={checkOrder}
          disabled={status === 'loading'}
          className="w-full py-4 bg-gradient-to-r from-brand-red to-red-600 rounded-2xl font-black text-lg shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 transition-all disabled:opacity-50"
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              בודק...
            </span>
          ) : (
            'בדוק סטטוס'
          )}
        </button>

        {status === 'found' && orderDetails && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-sm font-black">סטטוס:</span>
              <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-black border border-green-500/30">
                {orderDetails.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/40">מספר הזמנה:</span>
                <div className="font-black text-white">#{orderDetails.id}</div>
              </div>
              <div>
                <span className="text-white/40">תאריך:</span>
                <div className="font-black text-white">{orderDetails.date}</div>
              </div>
              <div>
                <span className="text-white/40">חבילה:</span>
                <div className="font-black text-white">{orderDetails.package}</div>
              </div>
              <div>
                <span className="text-white/40">רכב:</span>
                <div className="font-black text-white">{orderDetails.car}</div>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'notfound' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 text-center"
          >
            <X size={32} className="text-red-400 mx-auto mb-2" />
            <p className="text-red-400 font-black">ההזמנה לא נמצאה</p>
            <p className="text-white/40 text-sm mt-1">בדוק את המספר ונסה שנית</p>
          </motion.div>
        )}
      </div>

      <button
        onClick={onClose}
        className="w-full text-sm text-white/40 hover:text-white/60 transition-colors"
      >
        חזור לדף הבית
      </button>
    </motion.div>
  );
};

// --- Step 1: Car Details Form ---
const CarDetailsForm = ({ formData, setFormData, onNext }: { 
  formData: any, 
  setFormData: (data: any) => void, 
  onNext: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30">
          <Car size={36} className="text-white" />
        </div>
        <h3 className="text-2xl font-black">פרטי הרכב</h3>
        <p className="text-white/50 text-sm">הכנס את פרטי הרכב שברצונך לפרסם</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-black text-white/60">דגם רכב *</label>
          <input
            type="text"
            placeholder="例如: מאזדה 3"
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-red focus:outline-none transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-white/60">שנה *</label>
          <input
            type="text"
            placeholder="例如: 2020"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-red focus:outline-none transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-white/60">קילומטראז' *</label>
          <input
            type="text"
            placeholder="例如: 50,000"
            value={formData.mileage}
            onChange={(e) => setFormData({...formData, mileage: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-red focus:outline-none transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-white/60">מחיר מבוקש *</label>
          <input
            type="text"
            placeholder="例如: 89,000 ₪"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-red focus:outline-none transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-white/60">תאריך עלייה לכביש *</label>
          <input
            type="text"
            placeholder="例如: 2020"
            value={formData.registration}
            onChange={(e) => setFormData({...formData, registration: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-red focus:outline-none transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-white/60">טסט עד *</label>
          <input
            type="text"
            placeholder="例如: 12/2024"
            value={formData.testUntil}
            onChange={(e) => setFormData({...formData, testUntil: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-red focus:outline-none transition-all"
            required
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-black text-white/60">מיקום בארץ *</label>
          <input
            type="text"
            placeholder="例如: תל אביב"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-red focus:outline-none transition-all"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-black text-white/60">שם מלא *</label>
          <input
            type="text"
            placeholder="ישראל ישראלי"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-red focus:outline-none transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-white/60">טלפון *</label>
          <input
            type="tel"
            placeholder="050-1234567"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-red focus:outline-none transition-all"
            required
          />
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 bg-gradient-to-r from-brand-red to-red-600 rounded-2xl font-black text-lg shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 transition-all"
      >
        להמשך לתשלום
      </button>
    </motion.div>
  );
};

// --- Step 2: Payment Form ---
const PaymentForm = ({ 
  formData, 
  setFormData, 
  selectedPackage, 
  onSubmit, 
  loading,
  onBack 
}: { 
  formData: any, 
  setFormData: (data: any) => void, 
  selectedPackage: Package | null, 
  onSubmit: () => void, 
  loading: boolean,
  onBack: () => void 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'bit' | 'paybox' | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-green-500/30">
          <CreditCard size={36} className="text-white" />
        </div>
        <h3 className="text-2xl font-black">תשלום והעלאת אישור</h3>
        <p className="text-white/50 text-sm">בחר אמצעי תשלום והעלה צילום מסך</p>
      </div>

      {/* Package summary */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-red/10 to-transparent border border-brand-red/20">
        <div className="flex items-center justify-between">
          <span className="text-white/60">חבילה נבחרת:</span>
          <span className="font-black text-brand-red">{selectedPackage?.name}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-white/60">מחיר:</span>
          <span className="font-black text-white text-xl">{selectedPackage?.price}</span>
        </div>
      </div>

      {/* Payment methods */}
      <div className="space-y-3">
        <label className="text-sm font-black text-white/60">אמצעי תשלום *</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('bit')}
            className={`p-4 rounded-2xl border-2 transition-all ${
              paymentMethod === 'bit' 
                ? 'border-[#00E5CC] bg-[#00E5CC]/10' 
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <BitLogo size="lg" />
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('paybox')}
            className={`p-4 rounded-2xl border-2 transition-all ${
              paymentMethod === 'paybox' 
                ? 'border-[#29ABE2] bg-[#29ABE2]/10' 
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <PayBoxLogo size="lg" />
          </button>
        </div>
      </div>

      {paymentMethod && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 space-y-4"
        >
          <div className="text-center">
            <p className="text-white/60 text-sm">העבר את הסכום למספר:</p>
            <p className="text-3xl font-black tracking-wider text-white">054-6980606</p>
          </div>

          <button
            onClick={() => navigator.clipboard.writeText('0546980606')}
            className="w-full py-3 bg-white/5 rounded-xl border border-white/10 text-sm font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <FileText size={16} />
            העתק מספר
          </button>

          <div className="space-y-2">
            <label className="text-sm font-black text-white/60">העלה צילום מסך של ההעברה *</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({...formData, paymentProof: reader.result});
                    };
                    reader.readAsDataURL(files[0]);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className={`rounded-xl border-2 border-dashed py-6 px-4 flex flex-col items-center gap-2 transition-colors ${
                formData.paymentProof ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/5'
              }`}>
                {formData.paymentProof ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check size={24} className="text-green-400" />
                    </div>
                    <span className="text-sm font-black text-green-400">הקובץ הועלה בהצלחה</span>
                  </>
                ) : (
                  <>
                    <Upload size={24} className="text-white/40" />
                    <span className="text-sm font-black text-white/60">לחץ להעלאת צילום מסך</span>
                    <span className="text-xs text-white/30">PNG, JPG או JPEG</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 bg-white/5 rounded-2xl font-black text-lg border border-white/10 hover:bg-white/10 transition-all"
        >
          חזור
        </button>
        <button
          onClick={onSubmit}
          disabled={!paymentMethod || !formData.paymentProof || loading}
          className="flex-1 py-4 bg-gradient-to-r from-brand-red to-red-600 rounded-2xl font-black text-lg shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              שולח...
            </span>
          ) : (
            'שלח הזמנה'
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('he');
  const [view, setView] = useState<'home' | 'booking' | 'success' | 'admin-login' | 'admin-dashboard' | 'check-status'>('home');
  const [bookingStep, setBookingStep] = useState<1 | 2>(1);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminTab, setAdminTab] = useState<'orders' | 'settings'>('orders');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);
  const [siteSettings, setSiteSettings] = useState<any>({
    followers_count: '50K+',
    whatsapp_number: '972546980606',
    hero_title_he: 'מוכרים רכב? אנחנו מוכרים אותו מהר יותר.',
    hero_subtitle_he: 'YOUGO ISRAEL - פלטפורמת השיווק המובילה באינסטגרם למכירת רכבים.',
    positioning_line_he: 'הפרסום שמוכר רכבים – לא רק מציג אותם.'
  });

  const t = translations[lang];

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSiteSettings(data));
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'rtl';
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, bookingStep]);

  const packages: Package[] = [
    {
      id: 'basic',
      name: t.basic,
      price: '₪149',
      features: [
        t.features.images2,
        t.features.post1,
        t.features.story7,
        t.features.exposureBasic
      ]
    },
    {
      id: 'pro',
      name: t.pro,
      price: '₪249',
      popular: true,
      features: [
        t.features.images4,
        t.features.postPro,
        t.features.story14,
        t.features.priorityPro,
        t.features.exposurePro
      ]
    },
    {
      id: 'premium',
      name: t.premium,
      price: '₪449',
      premium: true,
      features: [
        t.features.imagesPremium,
        t.features.postPremium,
        t.features.story30,
        t.features.priorityFull,
        t.features.exposureMax,
        t.features.guidance,
        t.features.video
      ]
    }
  ];

  const vipPackage: Package = {
    id: 'vip',
    name: 'VIP LUXURY',
    price: '₪749',
    vip: true,
    features: [
      '15+ תמונות מקצועיות',
      'רילס + סטורי VIP',
      '60 ימי פרסום פרמיום',
      'חשיפה מקסימלית',
      'ליווי אישי 24/7',
      'עיצוב VIP בלעדי',
      'טרגוט מתקדם',
      'עדיפות ראשונה תמיד'
    ]
  };

  const duoPackage: Package = {
    id: 'duo',
    name: 'DUO DEAL',
    price: '₪349',
    features: [
      'פרסום 2 רכבים במחיר מיוחד',
      '4 תמונות לכל רכב',
      'פוסט נפרד לכל רכב',
      'סטורי 14 יום לכל אחד',
      'חשיפה כפולה לקהל מעוניין',
      'חיסכון של 40% לעומת 2 חבילות'
    ]
  };

  const businessPackage: Package = {
    id: 'business',
    name: 'BUSINESS',
    price: '₪1,499',
    business: true,
    features: []
  };

  const equipmentPackages: Package[] = [
    {
      id: 'equipment-heavy',
      name: 'חבילת ציוד כבד',
      price: '₪349',
      equipment: true,
      features: [
        '10 תמונות מקצועיות של הציוד',
        'פוסט ייעודי עם מפרט טכני',
        'סטורי 21 יום',
        'חשיפה לקהל קבלנים ומגזר הבנייה',
        'עדיפות בתוצאות חיפוש',
        'ייעוץ תמחור מקצועי'
      ]
    },
    {
      id: 'equipment-light',
      name: 'חבילת ציוד קל',
      price: '₪199',
      equipment: true,
      features: [
        '6 תמונות מקצועיות',
        'פוסט מותאם לציוד קל',
        'סטורי 14 יום',
        'חשיפה לקהל מקצועי רלוונטי',
        'תיאור טכני מפורט',
        'תמיכה ב-WhatsApp'
      ]
    }
  ];

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword })
    });
    if (res.ok) {
      setIsAdmin(true);
      setView('admin-dashboard');
      fetchOrders();
    } else {
      alert('סיסמה שגויה');
    }
  };

  const fetchOrders = async () => {
    const res = await fetch('/api/admin/orders');
    const data = await res.json();
    setOrders(data);
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    fetchOrders();
  };

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    registration: '',
    testUntil: '',
    location: '',
    paymentProof: '',
    carImages: [] as string[]
  });

  const handleSubmitOrder = async () => {
    setLoading(true);
    
    try {
      const pkgId = selectedPackage?.id || '';
      const pkgEmoji = pkgId === 'vip' ? '👑' : pkgId === 'premium' ? '💎' : pkgId === 'pro' ? '⭐' : pkgId.includes('equipment') ? '🚜' : pkgId === 'business' ? '🏢' : '✅';

      const randomId = Math.floor(10000 + Math.random() * 90000);
      const orderNum = String(randomId).slice(0, 5);

      const message = `*YOUGO ISRAEL | אישור הזמנה חדשה* 🚗💨
---------------------------------------
*מספר הזמנה:* #${orderNum}
*חבילה נבחרת:* ${selectedPackage?.name} ${pkgEmoji}
---------------------------------------

👤 *פרטי לקוח:*
• שם מלא: ${formData.fullName}
• טלפון: ${formData.phone}

🚘 *פרטי רכב:*
• דגם: ${formData.model}
• שנה: ${formData.year}
• קילומטראז': ${formData.mileage}
• מחיר מבוקש: ${formData.price}
• עליה לכביש: ${formData.registration}
• טסט עד: ${formData.testUntil}
• מיקום: ${formData.location}

---------------------------------------
✅ *אישור תשלום הועלה בהצלחה למערכת.*

📸 *נא לשלוח כאן את תמונות וסרטון הרכב כדי שנוכל להתחיל בעיצוב המודעה!*
---------------------------------------
_נשלח אוטומטית ממערכת YOUGO_`;

      const whatsappUrl = `https://wa.me/${siteSettings.whatsapp_number}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setOrderId(orderNum);
      setView('success');
    } catch (err) {
      alert('אירעה שגיאה. אנא נסה שנית.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <style>{`
        :root { --brand-red: #c8102e; }
        .text-brand-red { color: #c8102e !important; }
        .bg-brand-red { background-color: #c8102e !important; }
        .border-brand-red { border-color: #c8102e !important; }
        .btn-primary { background: linear-gradient(135deg, #c8102e, #a50d25) !important; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
        }
        
        .input-field {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          width: 100%;
          transition: all 0.3s;
        }
        .input-field:focus {
          border-color: #c8102e;
          outline: none;
          background: rgba(200, 16, 46, 0.1);
        }
      `}</style>

      <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin} onLogout={() => { setIsAdmin(false); setView('home'); }} siteSettings={siteSettings} setView={setView} />

      <main className="pt-28 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-24"
            >
              {/* Hero Section - Enhanced */}
              <section className="relative text-center space-y-8 py-16">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-red/20 rounded-full blur-[120px]" />
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10"
                >
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
                    <Sparkles size={16} className="text-brand-red" />
                    <span className="text-xs font-black tracking-wider text-white/60">הדרך המהירה ביותר למכור רכב</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-black leading-tight">
                    {siteSettings.hero_title_he || t.heroTitle}
                  </h1>
                  <p className="text-xl text-white/60 max-w-2xl mx-auto mt-6">
                    {siteSettings.hero_subtitle_he || t.heroSubtitle}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-10">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const el = document.getElementById('packages');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-brand-red to-red-600 rounded-2xl font-black text-lg shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 transition-all"
                    >
                      {t.startOrder}
                    </motion.button>
                    
                    <button 
                      onClick={() => setView('check-status')}
                      className="px-8 py-4 bg-white/5 rounded-2xl font-black text-lg border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <Search size={20} />
                      בדוק סטטוס הזמנה
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-6 mt-8">
                    <div className="flex items-center gap-2 text-white/40">
                      <ShieldCheck size={16} />
                      <span className="text-sm">תשלום מאובטח</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40">
                      <Clock size={16} />
                      <span className="text-sm">פרסום תוך 24 שעות</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40">
                      <Users size={16} />
                      <span className="text-sm">{siteSettings.followers_count} עוקבים</span>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* How it Works - Enhanced */}
              <section id="how-it-works" className="space-y-16">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-4"
                >
                  <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-5 py-2">
                    <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                    <span className="text-sm font-black tracking-wider text-brand-red">תהליך פשוט ומהיר</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black">איך זה עובד?</h2>
                  <p className="text-white/50 text-lg max-w-2xl mx-auto">3 שלבים פשוטים והרכב שלך באוויר</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      step: '01',
                      title: 'בחירת חבילה',
                      desc: 'בוחרים את חבילת הפרסום המתאימה',
                      icon: <LayoutDashboard size={32} />,
                      color: 'from-blue-500 to-cyan-500'
                    },
                    {
                      step: '02',
                      title: 'הזנת פרטים',
                      desc: 'ממלאים פרטי הרכב ומעלים אישור תשלום',
                      icon: <FileText size={32} />,
                      color: 'from-brand-red to-red-600'
                    },
                    {
                      step: '03',
                      title: 'פרסום וחשיפה',
                      desc: 'הצוות שלנו מעצב ומפרסם מודעה מקצועית',
                      icon: <Send size={32} />,
                      color: 'from-green-500 to-emerald-500'
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl group-hover:scale-105 transition-transform duration-300" />
                      <div className="relative p-8 text-center">
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl`}>
                          {item.icon}
                        </div>
                        <div className="text-6xl font-black text-white/10 absolute top-4 left-4">{item.step}</div>
                        <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                        <p className="text-white/50">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Packages Section */}
              <section id="packages" className="space-y-16">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-4"
                >
                  <h2 className="text-4xl md:text-5xl font-black">{t.packages}</h2>
                  <p className="text-white/50 text-lg max-w-2xl mx-auto">בחר את המסלול המתאים ביותר עבורך</p>
                </motion.div>
                
                {/* Regular packages */}
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4 mb-8"
                  >
                    <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/25 px-5 py-2.5 rounded-full">
                      <Car size={16} className="text-blue-400" />
                      <span className="text-sm font-black tracking-wider text-blue-400">חבילות רכב פרטי</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black">
                      מוכרים <span className="text-brand-red">רכב פרטי?</span>
                    </h3>
                    <p className="text-white/50 max-w-xl mx-auto">
                      חבילות פרסום מותאמות אישית למכירת רכב פרטי — מתחילים מחבילת בסיס ועד לחבילת פרימיום עם חשיפה מקסימלית.
                    </p>
                  </motion.div>
                  
                  <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-6 md:pb-0 snap-x no-scrollbar">
                    {packages.map(pkg => (
                      <div key={pkg.id} className="snap-start">
                        <PackageCard 
                          pkg={pkg} 
                          lang={lang} 
                          onSelect={(p) => {
                            setSelectedPackage(p);
                            setView('booking');
                            setBookingStep(1);
                          }} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Premium Packages */}
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4 mb-8"
                  >
                    <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 px-5 py-2.5 rounded-full">
                      <Crown size={16} className="text-amber-400" />
                      <span className="text-sm font-black tracking-wider text-amber-400">חבילות פרימיום VIP</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black">
                      מחפשים <span className="text-amber-400">יחס VIP?</span>
                    </h3>
                    <p className="text-white/50 max-w-xl mx-auto">
                      חבילות הפרימיום שלנו מיועדות ללקוחות שמצפים ליותר. VIP LUXURY כוללת חשיפה מקסימלית, עיצוב בלעדי, 
                      וליווי אישי 24/7. DUO DEAL מאפשרת לפרסם שני רכבים בו זמנית ולחסוך 40%.
                    </p>
                  </motion.div>
                  
                  <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto pb-6 md:pb-0 snap-x no-scrollbar">
                    <div className="snap-start">
                      <VIPPackageCard
                        pkg={vipPackage}
                        lang={lang}
                        onSelect={(p) => {
                          setSelectedPackage(p);
                          setView('booking');
                          setBookingStep(1);
                        }}
                      />
                    </div>
                    <div className="snap-start">
                      <DuoDealPackageCard
                        pkg={duoPackage}
                        onSelect={(p) => {
                          setSelectedPackage(p);
                          setView('booking');
                          setBookingStep(1);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Business Package - New Enhanced Design */}
                <div className="pt-8">
                  <BusinessPackageCard
                    pkg={businessPackage}
                    onSelect={(p) => {
                      setSelectedPackage(p);
                      setView('booking');
                      setBookingStep(1);
                    }}
                  />
                </div>

                {/* Equipment Packages */}
                <div className="pt-8 space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-4"
                  >
                    <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/25 px-5 py-2.5 rounded-full">
                      <Truck size={16} className="text-orange-400" />
                      <span className="text-sm font-black tracking-wider text-orange-400">חבילות ציוד כבד ומכונות</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black">
                      מוכרים <span className="text-orange-400">ציוד מקצועי?</span>
                    </h3>
                    <p className="text-white/50 max-w-xl mx-auto">
                      חבילות פרסום ייעודיות לבאגרים, מחפרונים, מיני באגרים, פופקטים וכל ציוד כבד — 
                      חשיפה ישירה לקהל הקבלנים והמקצוענים בישראל.
                    </p>
                  </motion.div>

                  <div className="flex flex-wrap justify-center gap-3 pb-2">
                    {[
                      '🚜 באגר', '⛏️ מחפרון', '🔩 מיני באגר', '🔧 פופקט', '🏗️ עגורן', '🚛 בולדוזר'
                    ].map((item, i) => (
                      <span key={i} className="px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-white/70 text-sm font-black">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex md:grid md:grid-cols-2 gap-6 max-w-4xl mx-auto overflow-x-auto pb-6 md:pb-0 snap-x no-scrollbar">
                    {equipmentPackages.map(pkg => (
                      <div key={pkg.id} className="snap-start">
                        <EquipmentPackageCard
                          pkg={pkg}
                          onSelect={(p) => {
                            setSelectedPackage(p);
                            setView('booking');
                            setBookingStep(1);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Why Us Section - Enhanced */}
              <section id="why-us" className="space-y-14">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-4"
                >
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
                    <span className="w-2 h-2 bg-brand-red rounded-full" />
                    <span className="text-sm font-black tracking-wider text-white/60">היתרון שלנו</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black">{t.whyUs.title}</h2>
                  <p className="text-white/50 text-lg max-w-2xl mx-auto">הסיבות שאלפי מוכרים בחרו דווקא בנו</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Users size={32} />,
                      title: 'קהל איכותי',
                      desc: '50,000+ עוקבים פעילים שמחפשים לקנות רכב',
                      stat: '50K+',
                      color: 'from-blue-500 to-cyan-500'
                    },
                    {
                      icon: <Zap size={32} />,
                      title: 'מהירות מכירה',
                      desc: 'זמן ממוצע של 48 שעות למכירת הרכב',
                      stat: '48h',
                      color: 'from-brand-red to-red-600'
                    },
                    {
                      icon: <TrendingUp size={32} />,
                      title: 'אחוזי הצלחה',
                      desc: '98% מהלקוחות מרוצים וממליצים עלינו',
                      stat: '98%',
                      color: 'from-green-500 to-emerald-500'
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 group"
                    >
                      <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <div className="text-4xl font-black text-white/10 absolute top-4 right-4">{item.stat}</div>
                      <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                      <p className="text-white/50">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="max-w-4xl mx-auto space-y-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-4"
                >
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
                    <span className="w-2 h-2 bg-brand-red rounded-full" />
                    <span className="text-sm font-black tracking-wider text-white/60">שאלות נפוצות</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black">שאלות נפוצות</h2>
                  <p className="text-white/50 text-lg">כל מה שצריך לדעת על תהליך הפרסום והמכירה</p>
                </motion.div>

                <div className="space-y-3">
                  {t.faqs.slice(0, showAllFaqs ? t.faqs.length : 4).map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
                    >
                      <button 
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full px-6 py-5 flex items-center justify-between text-right gap-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-8 h-8 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red font-black">
                            {i + 1}
                          </div>
                          <span className="font-bold text-lg">{item.q}</span>
                        </div>
                        {activeFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pr-16 text-white/60 leading-relaxed">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                
                {!showAllFaqs && t.faqs.length > 4 && (
                  <div className="text-center">
                    <button 
                      onClick={() => setShowAllFaqs(true)}
                      className="px-8 py-3 bg-white/5 rounded-xl font-black border border-white/10 hover:bg-white/10 transition-all"
                    >
                      הצג את כל השאלות
                    </button>
                  </div>
                )}
              </section>

              {/* Footer */}
              <footer className="pb-12">
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-brand-red/5" />
                  
                  <div className="relative z-10 space-y-10">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-brand-red to-red-600 rounded-xl shadow-xl">
                          <Car size={24} className="text-white" />
                        </div>
                        <div className="text-3xl font-black tracking-tighter">
                          <span className="text-brand-red">YOUGO</span> <span className="text-white">ISRAEL</span>
                        </div>
                      </div>
                      <p className="text-white/50 max-w-md mx-auto">
                        הצטרפו לאלפי לקוחות מרוצים שכבר מכרו את הרכב שלהם דרך הפלטפורמה המובילה בישראל.
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      {[
                        { href: 'https://instagram.com', icon: <Instagram size={20} /> },
                        { href: 'https://tiktok.com', icon: <Smartphone size={20} /> },
                        { href: 'https://telegram.org', icon: <Send size={20} /> },
                        { href: 'https://wa.me/972546980606', icon: <MessageSquare size={20} /> },
                      ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank"
                          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red hover:scale-110 transition-all duration-200"
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="flex flex-wrap justify-center gap-4">
                      {[
                        { icon: <FileText size={14} />, label: 'תקנון', onClick: () => setModalContent(t.pages.terms) },
                        { icon: <Lock size={14} />, label: 'פרטיות', onClick: () => setModalContent(t.pages.privacy) },
                        { icon: <Info size={14} />, label: 'מי אנחנו', onClick: () => setModalContent(t.pages.about) },
                        { icon: <LayoutDashboard size={14} />, label: 'ניהול', onClick: () => setView('admin-login') },
                      ].map((link, i) => (
                        <button key={i} onClick={link.onClick}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {link.icon}
                          {link.label}
                        </button>
                      ))}
                    </div>

                    <div className="text-center text-white/20 text-xs font-bold">
                      © 2024 YOUGO ISRAEL · כל הזכויות שמורות
                    </div>
                  </div>
                </div>
              </footer>
            </motion.div>
          )}

          {/* Booking - Two Steps */}
          {view === 'booking' && (
            <motion.div 
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-4"
              >
                <ArrowLeft size={20} />
                חזרה לחבילות
              </button>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${bookingStep >= 1 ? 'text-brand-red' : 'text-white/30'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border-2 ${
                    bookingStep >= 1 ? 'border-brand-red bg-brand-red/10' : 'border-white/20'
                  }`}>
                    1
                  </div>
                  <span className="text-sm font-black">פרטי רכב</span>
                </div>
                <div className={`w-16 h-px ${bookingStep >= 2 ? 'bg-brand-red' : 'bg-white/10'}`} />
                <div className={`flex items-center gap-2 ${bookingStep >= 2 ? 'text-brand-red' : 'text-white/30'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border-2 ${
                    bookingStep >= 2 ? 'border-brand-red bg-brand-red/10' : 'border-white/20'
                  }`}>
                    2
                  </div>
                  <span className="text-sm font-black">תשלום</span>
                </div>
              </div>

              <div className="glass-card p-8">
                <AnimatePresence mode="wait">
                  {bookingStep === 1 && (
                    <CarDetailsForm
                      formData={formData}
                      setFormData={setFormData}
                      onNext={() => setBookingStep(2)}
                    />
                  )}
                  {bookingStep === 2 && (
                    <PaymentForm
                      formData={formData}
                      setFormData={setFormData}
                      selectedPackage={selectedPackage}
                      onSubmit={handleSubmitOrder}
                      loading={loading}
                      onBack={() => setBookingStep(1)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Success Page */}
          {view === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center space-y-8 py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-28 h-28 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/30"
              >
                <Check size={48} strokeWidth={3} className="text-white" />
              </motion.div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-black">ההזמנה התקבלה!</h2>
                <p className="text-xl text-white/60">
                  מספר הזמנה: <span className="text-brand-red font-black text-2xl">#{orderId}</span>
                </p>
              </div>

              <div className="glass-card p-8 space-y-6">
                <p className="text-lg font-black">מה קורה עכשיו?</p>
                <div className="space-y-4 text-right">
                  {[
                    'הודעת וואטסאפ נשלחה למנהל המערכת',
                    'הצוות שלנו יבדוק את פרטי ההזמנה תוך שעה',
                    'נחזור אליך עם אישור סופי ופרטי העלאת התמונות'
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check size={16} className="text-green-400" />
                      </div>
                      <span className="text-white/80">{text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-brand-red font-black">
                    ניתן לבדוק את מצב ההזמנה בכל עת דרך מספר ההזמנה באתר!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setView('home')}
                  className="flex-1 py-4 bg-white/5 rounded-2xl font-black border border-white/10 hover:bg-white/10 transition-all"
                >
                  חזרה לדף הבית
                </button>
                <button 
                  onClick={() => setView('check-status')}
                  className="flex-1 py-4 bg-gradient-to-r from-brand-red to-red-600 rounded-2xl font-black shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 transition-all"
                >
                  בדוק סטטוס
                </button>
              </div>
            </motion.div>
          )}

          {/* Check Status Page */}
          {view === 'check-status' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto py-12"
            >
              <OrderStatusCheck onClose={() => setView('home')} />
            </motion.div>
          )}

          {/* Admin Login */}
          {view === 'admin-login' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto py-20"
            >
              <div className="glass-card p-8 space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-brand-red to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Lock size={32} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-black">כניסת מנהל</h2>
                </div>
                
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input 
                    type="password" 
                    placeholder="סיסמה" 
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-brand-red focus:outline-none"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                  />
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-brand-red to-red-600 rounded-xl font-black">
                    כניסה
                  </button>
                </form>
                
                <button onClick={() => setView('home')} className="w-full text-sm text-white/40 hover:text-white/60 transition-colors">
                  ביטול
                </button>
              </div>
            </motion.div>
          )}

          {/* Admin Dashboard */}
          {view === 'admin-dashboard' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black flex items-center gap-4">
                    <LayoutDashboard className="text-brand-red" size={40} />
                    לוח בקרה
                  </h2>
                  <div className="flex gap-4 mt-4">
                    <button 
                      onClick={() => setAdminTab('orders')}
                      className={`px-6 py-2 rounded-full font-black text-sm transition-all ${adminTab === 'orders' ? 'bg-brand-red text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      הזמנות
                    </button>
                    <button 
                      onClick={() => setAdminTab('settings')}
                      className={`px-6 py-2 rounded-full font-black text-sm transition-all ${adminTab === 'settings' ? 'bg-brand-red text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      הגדרות אתר
                    </button>
                  </div>
                </div>
                {adminTab === 'orders' && (
                  <div className="flex items-center gap-4">
                    <div className="glass-card px-6 py-3 flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-bold">{orders.length} הזמנות סה"כ</span>
                    </div>
                    <button 
                      onClick={fetchOrders} 
                      className="btn-primary py-3 px-6 flex items-center gap-2"
                    >
                      <ArrowLeft size={20} className="rotate-90" />
                      רענן נתונים
                    </button>
                  </div>
                )}
              </div>

              {adminTab === 'orders' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { label: 'ממתין לבדיקה', count: orders.filter(o => o.status === 'Pending Review').length, color: 'text-yellow-600', icon: <Calendar size={20} /> },
                      { label: 'תשלום מאושר', count: orders.filter(o => o.status === 'Payment Verified').length, color: 'text-blue-600', icon: <ShieldCheck size={20} /> },
                      { label: 'פורסם', count: orders.filter(o => o.status === 'Published').length, color: 'text-green-600', icon: <CheckCircle2 size={20} /> },
                      { label: 'נדחה', count: orders.filter(o => o.status === 'Rejected').length, color: 'text-red-600', icon: <X size={20} /> },
                    ].map((stat, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-3xl p-6 shadow-xl border border-white/10 flex flex-col gap-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-2xl bg-gray-100 ${stat.color}`}>
                            {stat.icon}
                          </div>
                          <div className="text-4xl font-black text-black">{stat.count}</div>
                        </div>
                        <div className="text-sm font-black text-gray-500 uppercase tracking-widest">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="glass-card overflow-hidden border-white/10">
                    <div className="overflow-x-auto">
                      <table className="w-full text-right">
                        <thead className="bg-white/5 text-sm font-bold border-b border-white/10">
                          <tr>
                            <th className="p-6">#ID</th>
                            <th className="p-6">לקוח</th>
                            <th className="p-6">חבילה</th>
                            <th className="p-6">רכב</th>
                            <th className="p-6">סטטוס</th>
                            <th className="p-6 text-center">פעולות</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {orders.map(order => (
                            <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                              <td className="p-6 font-mono text-sm text-brand-red font-black">
                                YG-{order.id.toString().padStart(4, '0')}
                              </td>
                              <td className="p-6">
                                <div className="text-sm font-bold">{order.full_name}</div>
                                <div className="text-xs text-white/40 flex items-center gap-1">
                                  <Smartphone size={12} />
                                  {order.phone}
                                </div>
                              </td>
                              <td className="p-6">
                                <span className="text-xs font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                  {order.package_name}
                                </span>
                              </td>
                              <td className="p-6">
                                <div className="text-sm font-bold">{order.car_model}</div>
                                <div className="text-xs text-white/40">{order.car_year} | {order.car_mileage} ק"מ</div>
                              </td>
                              <td className="p-6">
                                <div className={`inline-flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-full border ${
                                  order.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                  order.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                  order.status === 'Payment Verified' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                  'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                }`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    order.status === 'Published' ? 'bg-green-500' :
                                    order.status === 'Rejected' ? 'bg-red-500' :
                                    order.status === 'Payment Verified' ? 'bg-blue-500' :
                                    'bg-yellow-500'
                                  }`} />
                                  {order.status}
                                </div>
                              </td>
                              <td className="p-6">
                                <div className="flex items-center justify-center gap-3">
                                  <button 
                                    onClick={() => {
                                      alert(`פרטי הזמנה ${order.id}:\nמחיר: ${order.car_price}\nמיקום: ${order.location}\nתאריך: ${new Date(order.created_at).toLocaleDateString('he-IL')}`);
                                    }}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                                    title="צפה בפרטים"
                                  >
                                    <Eye size={18} />
                                  </button>
                                  <select 
                                    className="bg-dark-card border border-white/10 text-xs rounded-lg p-2 focus:border-brand-red outline-none transition-colors"
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                  >
                                    <option value="Pending Review">ממתין</option>
                                    <option value="Payment Verified">תשלום אושר</option>
                                    <option value="Published">פורסם</option>
                                    <option value="Rejected">נדחה</option>
                                  </select>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="glass-card p-8 max-w-2xl space-y-8">
                  <h3 className="text-2xl font-black">הגדרות אתר</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">כמות עוקבים (Instagram)</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={siteSettings.followers_count}
                        onChange={(e) => setSiteSettings({ ...siteSettings, followers_count: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">מספר WhatsApp</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={siteSettings.whatsapp_number}
                        onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp_number: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">כותרת ראשית (Hero)</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={siteSettings.hero_title_he}
                        onChange={(e) => setSiteSettings({ ...siteSettings, hero_title_he: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">תת-כותרת (Hero)</label>
                      <textarea 
                        className="input-field h-24" 
                        value={siteSettings.hero_subtitle_he}
                        onChange={(e) => setSiteSettings({ ...siteSettings, hero_subtitle_he: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">שורת מיצוב (Positioning Line)</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={siteSettings.positioning_line_he}
                        onChange={(e) => setSiteSettings({ ...siteSettings, positioning_line_he: e.target.value })}
                      />
                    </div>
                    <button 
                      onClick={async () => {
                        setLoading(true);
                        const res = await fetch('/api/admin/settings', {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(siteSettings)
                        });
                        if (res.ok) alert('ההגדרות נשמרו בהצלחה');
                        setLoading(false);
                      }}
                      className="btn-primary w-full py-4"
                      disabled={loading}
                    >
                      {loading ? 'שומר...' : 'שמור הגדרות'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Modal 
        isOpen={!!modalContent} 
        onClose={() => setModalContent(null)} 
        title={modalContent?.title || ''}
      >
        {modalContent?.content}
      </Modal>
    </div>
  );
}
