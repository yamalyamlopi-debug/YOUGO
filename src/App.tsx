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
  Truck
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
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-bottom border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex flex-row-reverse items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-black tracking-tighter text-brand-red">
              YOUGO <span className="text-white">ISRAEL</span>
              <div className="text-[10px] text-white/40 font-bold tracking-normal mt-[-4px]">
                {siteSettings.positioning_line_he || t.positioningLine}
              </div>
            </div>
            <div className="p-2 bg-brand-red rounded-lg shadow-lg shadow-brand-red/20">
              <Car size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest">
            <a href="#how-it-works" className="hover:text-brand-red transition-colors">איך זה עובד</a>
            <a href="#packages" className="hover:text-brand-red transition-colors">חבילות</a>
            <button onClick={() => setView('check-status')} className="hover:text-brand-red transition-colors">בדיקת סטטוס</button>
            <a href="#faq" className="hover:text-brand-red transition-colors">שאלות</a>
          </div>
          
          <div className="h-6 w-px bg-white/10 hidden md:block" />

          <button 
            onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-brand-red transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
          >
            <Globe size={14} />
            {lang === 'he' ? 'العربية' : 'עברית'}
          </button>

          {isAdmin && (
            <button onClick={onLogout} className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-white/60 hover:text-white">
              <LogOut size={16} />
              יציאה
            </button>
          )}
        </div>
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
      className="relative w-[300px] md:w-full rounded-3xl overflow-hidden h-full flex flex-col snap-center shrink-0"
      style={{
        boxShadow: '0 20px 40px -15px rgba(212,175,55,0.3), 0 0 0 1px rgba(212,175,55,0.2) inset',
        background: 'radial-gradient(circle at 100% 0%, #2a1f0a 0%, #0f0c05 80%)'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      
      <div className="absolute inset-0 opacity-10" style={{
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
            <div key={i} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5">
              <span className="text-amber-400">{feat.icon}</span>
              <span className="text-xs font-medium text-white/80">{feat.label}</span>
            </div>
          ))}
        </div>

        <motion.button
          onClick={() => onSelect(pkg)}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-l from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all mt-4"
        >
          <span className="flex items-center justify-center gap-2">
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
      className="relative w-[300px] md:w-full rounded-3xl overflow-hidden h-full flex flex-col snap-center shrink-0"
      style={{
        background: 'radial-gradient(circle at 100% 0%, #1e1428 0%, #0b0710 100%)',
        boxShadow: '0 20px 40px -15px rgba(139,92,246,0.3), 0 0 0 1px rgba(139,92,246,0.2) inset'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
      
      <div className="absolute inset-0 opacity-10" style={{
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
            <div key={i} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5">
              <span className="text-purple-400">{feat.icon}</span>
              <span className="text-xs font-medium text-white/80">{feat.label}</span>
            </div>
          ))}
        </div>

        <motion.button
          onClick={() => onSelect(pkg)}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-l from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all mt-4"
        >
          <span className="flex items-center justify-center gap-2">
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
      className="relative w-[300px] md:w-full rounded-2xl border transition-all duration-500 h-full flex flex-col p-7 snap-center shrink-0"
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
        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
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
          <span key={i} className="text-[10px] font-black px-2.5 py-1 rounded-full border"
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
          <div key={i} className="flex items-start gap-2 text-xs font-medium">
            <div className="mt-0.5 p-0.5 rounded-full shrink-0"
              style={{ background: isHeavy ? 'rgba(234,88,12,0.6)' : 'rgba(100,116,139,0.4)' }}>
              <Check size={8} className="text-dark-bg" strokeWidth={5} />
            </div>
            <span className="text-white/80">{f}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(pkg)}
        className="w-full py-3.5 rounded-xl font-black text-sm transition-all duration-300 active:scale-95"
        style={{
          background: isHeavy 
            ? 'linear-gradient(135deg, #ea580c, #c2410c)' 
            : 'rgba(100,116,139,0.2)',
          color: isHeavy ? '#fff' : '#cbd5e1',
          border: isHeavy ? 'none' : '1px solid rgba(100,116,139,0.3)'
        }}
      >
        {isHeavy ? '🚜 הזמן עכשיו' : '🔧 הזמן עכשיו'}
      </button>
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
      className="relative w-[300px] md:w-full rounded-2xl h-full flex flex-col snap-center shrink-0"
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
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
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
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
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
          className="w-full py-3 rounded-xl font-black text-sm transition-all duration-200 active:scale-95 mt-2"
          style={{
            background: isPremium || isPro ? cfg.color : 'rgba(255,255,255,0.9)',
            color: isPremium || isPro ? '#fff' : '#0a0a0c'
          }}
        >
          {t.startOrder}
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

export default function App() {
  const [lang, setLang] = useState<Language>('he');
  const [view, setView] = useState<'home' | 'booking' | 'success' | 'admin-login' | 'admin-dashboard'>('home');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminTab, setAdminTab] = useState<'orders' | 'settings'>('orders');
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [orderStatusId, setOrderStatusId] = useState('');
  const [checkedOrder, setCheckedOrder] = useState<Order | null>(null);
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
  }, [view]);

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

  const checkOrderStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const id = orderStatusId.replace('YG-', '').replace('#', '');
    const res = await fetch(`/api/orders/${id}`);
    if (res.ok) {
      const data = await res.json();
      setCheckedOrder(data);
    } else {
      alert('הזמנה לא נמצאה');
      setCheckedOrder(null);
    }
    setLoading(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'paymentProof' | 'carImages') => {
    const files = e.target.files;
    if (!files) return;

    const readers = Array.from(files).map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file as Blob);
      });
    });

    Promise.all(readers).then(results => {
      if (field === 'paymentProof') {
        setFormData(prev => ({ ...prev, paymentProof: results[0] }));
      } else {
        setFormData(prev => ({ ...prev, carImages: [...prev.carImages, ...results] }));
      }
    });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const pkgId = selectedPackage?.id || '';
      const pkgEmoji = pkgId === 'vip' ? '👑' : pkgId === 'premium' ? '💎' : pkgId === 'pro' ? '⭐' : pkgId.includes('equipment') ? '🚜' : '✅';

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
    <div className="min-h-screen pb-20">
      <style>{`
        :root { --brand-red: #c8102e; }
        .text-brand-red { color: #c8102e !important; }
        .bg-brand-red { background-color: #c8102e !important; }
        .border-brand-red { border-color: #c8102e !important; }
        .hover\\:bg-brand-red:hover { background-color: #c8102e !important; }
        .hover\\:text-brand-red:hover { color: #c8102e !important; }
        .hover\\:border-brand-red:hover { border-color: #c8102e !important; }
        .btn-primary { background-color: #c8102e !important; }
        .btn-primary:hover { background-color: #a50d25 !important; }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin} onLogout={() => { setIsAdmin(false); setView('home'); }} siteSettings={siteSettings} setView={setView} />

      <main className="pt-32 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-24"
            >
              <section className="text-center space-y-8 py-12">
                <motion.h1 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-5xl md:text-7xl font-black leading-tight"
                >
                  {siteSettings.hero_title_he || t.heroTitle}
                </motion.h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                  {siteSettings.hero_subtitle_he || t.heroSubtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('packages');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary"
                  >
                    {t.startOrder}
                  </button>
                  <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-xl border border-white/10">
                    <Instagram className="text-brand-red" />
                    <span className="font-bold">{siteSettings.followers_count} עוקבים</span>
                  </div>
                </div>
              </section>

              <section id="how-it-works" className="space-y-16">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 bg-brand-red/8 border border-brand-red/20 text-brand-red text-[10px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-brand-red animate-pulse" />
                    תהליך פשוט ומהיר
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">איך זה עובד?</h2>
                  <p className="text-white/40 text-base">3 שלבים פשוטים והרכב שלך באוויר</p>
                </div>

                <div className="relative">
                  <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+32px)] right-[calc(16.66%+32px)] h-[2px] z-0"
                    style={{ background: 'linear-gradient(90deg, rgba(200,16,46,0.6) 0%, rgba(200,16,46,0.15) 50%, rgba(200,16,46,0.6) 100%)' }} />

                  <div className="grid md:grid-cols-3 gap-6 relative z-10">
                    {[
                      {
                        step: '01',
                        title: 'בחירת חבילה',
                        desc: 'בוחרים את חבילת הפרסום המתאימה — בייסיק, פרו, פרמיום, או VIP לוקשרי.',
                        icon: <LayoutDashboard size={26} />,
                        detail: 'מחיר קבוע, ללא הפתעות'
                      },
                      {
                        step: '02',
                        title: 'הזנת פרטים',
                        desc: 'ממלאים פרטי הרכב, מעלים תמונות ומצרפים אישור תשלום ב-Bit או PayBox.',
                        icon: <FileText size={26} />,
                        detail: 'לוקח פחות מ-3 דקות'
                      },
                      {
                        step: '03',
                        title: 'פרסום וחשיפה',
                        desc: 'הצוות שלנו מעצב מודעה מקצועית ומפרסם לקהל של 50K+ עוקבים פעילים.',
                        icon: <Send size={26} />,
                        detail: 'פרסום תוך 24 שעות'
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, type: 'spring', stiffness: 200 }}
                        whileHover={{ y: -6 }}
                        className="group relative flex flex-col items-center text-center"
                      >
                        <div className="relative mb-7">
                          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: 'radial-gradient(circle, rgba(200,16,46,0.15) 0%, transparent 70%)', transform: 'scale(2)' }} />
                          <div className="w-[68px] h-[68px] rounded-full border-2 border-brand-red/30 group-hover:border-brand-red transition-colors duration-300 flex items-center justify-center relative bg-[#0e0e0e] shadow-lg"
                            style={{ boxShadow: '0 0 0 6px rgba(200,16,46,0.04)' }}>
                            <div className="w-12 h-12 rounded-full bg-brand-red/10 group-hover:bg-brand-red/20 transition-colors duration-300 flex items-center justify-center text-brand-red">
                              {item.icon}
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center bg-brand-red text-white shadow-md">
                              {i + 1}
                            </div>
                          </div>
                        </div>

                        <div className="w-full rounded-2xl border border-white/6 bg-white/[0.02] group-hover:bg-white/[0.045] group-hover:border-brand-red/20 transition-all duration-300 p-6 space-y-3 flex-grow">
                          <div className="text-[72px] font-black leading-none select-none mb-1 transition-all duration-300"
                            style={{ color: 'rgba(200,16,46,0.04)' }}>{item.step}</div>
                          
                          <h3 className="text-xl font-black text-white group-hover:text-brand-red transition-colors duration-200 -mt-10">
                            {item.title}
                          </h3>
                          <p className="text-sm text-white/45 leading-relaxed group-hover:text-white/65 transition-colors duration-200">
                            {item.desc}
                          </p>
                          <div className="inline-flex items-center gap-1.5 bg-brand-red/6 border border-brand-red/15 text-brand-red text-[10px] font-black px-3 py-1 rounded-full mt-1">
                            <Check size={9} strokeWidth={3} />
                            {item.detail}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="packages" className="space-y-16">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-black">{t.packages}</h2>
                  <p className="text-white/60">בחר את המסלול המתאים ביותר עבורך</p>
                </div>
                
                <div>
                  <div className="text-center space-y-4 mb-8">
                    <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/25 px-5 py-2.5 rounded-full">
                      <Car size={16} className="text-blue-400" />
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">חבילות רכב פרטי</span>
                      <Zap size={16} className="text-blue-400" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black">
                      מוכרים{' '}
                      <span className="text-brand-red">רכב פרטי?</span>
                    </h3>
                    <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
                      חבילות פרסום מותאמות אישית למכירת רכב פרטי — מתחילים מחבילת בסיס ועד לחבילת פרימיום עם חשיפה מקסימלית. 
                      כל חבילה כוללת צילומים מקצועיים, פרסום באינסטגרם, סטוריז, וליווי אישי עד למכירה.
                    </p>
                  </div>
                  
                  <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-6 md:pb-0 snap-x no-scrollbar">
                    {packages.map(pkg => (
                      <div key={pkg.id} className="snap-start">
                        <PackageCard 
                          pkg={pkg} 
                          lang={lang} 
                          onSelect={(p) => {
                            setSelectedPackage(p);
                            setView('booking');
                          }} 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-center space-y-4 mb-8">
                    <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/25 px-5 py-2.5 rounded-full">
                      <Crown size={16} className="text-amber-400" />
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-400">חבילות פרימיום VIP</span>
                      <Star size={16} className="text-amber-400" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black">
                      מחפשים{' '}
                      <span className="text-amber-400">יחס VIP?</span>
                    </h3>
                    <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
                      חבילות הפרימיום שלנו מיועדות ללקוחות שמצפים ליותר. VIP LUXURY כוללת חשיפה מקסימלית, עיצוב בלעדי, 
                      וליווי אישי 24/7. DUO DEAL מאפשרת לפרסם שני רכבים בו זמנית ולחסוך 40% — העסקה המשתלמת ביותר.
                    </p>
                  </div>
                  
                  <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto pb-6 md:pb-0 snap-x no-scrollbar">
                    <div className="snap-start">
                      <VIPPackageCard
                        pkg={vipPackage}
                        lang={lang}
                        onSelect={(p) => {
                          setSelectedPackage(p);
                          setView('booking');
                        }}
                      />
                    </div>

                    <div className="snap-start">
                      <DuoDealPackageCard
                        pkg={duoPackage}
                        onSelect={(p) => {
                          setSelectedPackage(p);
                          setView('booking');
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8 space-y-8">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/25 px-5 py-2.5 rounded-full">
                      <Truck size={16} className="text-orange-400" />
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-400">חבילות ציוד כבד ומכונות</span>
                      <Hammer size={16} className="text-orange-400" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black">
                      מוכרים{' '}
                      <span className="text-orange-400">ציוד מקצועי?</span>
                    </h3>
                    <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
                      חבילות פרסום ייעודיות לבאגרים, מחפרונים, מיני באגרים, פופקטים וכל ציוד כבד — 
                      חשיפה ישירה לקהל הקבלנים והמקצוענים בישראל.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pb-2">
                    {[
                      { label: '🚜 באגר', he: 'Excavator' },
                      { label: '⛏️ מחפרון', he: 'Mini Excavator' },
                      { label: '🔩 מיני באגר', he: 'Compact' },
                      { label: '🔧 פופקט', he: 'Bobcat / Skid' },
                      { label: '🏗️ עגורן', he: 'Crane' },
                      { label: '🚛 בולדוזר', he: 'Bulldozer' },
                    ].map((item, i) => (
                      <span key={i} className="text-xs font-black px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-white/70">
                        {item.label}
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
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-white/30 font-bold">
                      יש לך ציוד שלא מופיע כאן?{' '}
                      <a 
                        href="https://wa.me/972546980606?text=שלום, אני מעוניין לפרסם ציוד מכני"
                        target="_blank"
                        className="text-orange-400 hover:text-orange-300 transition-colors underline underline-offset-2"
                      >
                        צור קשר בוואטסאפ
                      </a>
                      {' '}ונכין לך הצעה מותאמת אישית.
                    </p>
                  </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-brand-red/10 to-transparent border border-brand-red/20 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                  <div className="space-y-4 text-center md:text-right">
                    <div className="inline-block px-4 py-1 bg-brand-red text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                      לסוכנויות ומגרשים
                    </div>
                    <h3 className="text-3xl font-black">חבילת BUSINESS לעסקים</h3>
                    <p className="text-white/60 leading-relaxed">
                      מנהלים מגרש רכבים? יש לנו חבילה מיוחדת עבורכם. 
                      <br />
                      פרסום של עד 50 רכבים בחודש במחיר ללא תחרות.
                    </p>
                  </div>
                  <a 
                    href="https://wa.me/972546980606?text=שלום, אני מעוניין בחבילת עסקים לסוכנות שלי"
                    target="_blank"
                    className="btn-primary whitespace-nowrap flex items-center gap-3"
                  >
                    <MessageSquare size={20} />
                    דברו איתנו בוואטסאפ
                  </a>
                </motion.div>

                <div className="max-w-4xl mx-auto pt-8">
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent">
                    <div className="absolute inset-0 opacity-[0.035]" style={{
                      backgroundImage: `linear-gradient(rgba(225,29,72,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(225,29,72,0.9) 1px, transparent 1px)`,
                      backgroundSize: '44px 44px'
                    }} />
                    
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-brand-red/8 rounded-full blur-[80px] pointer-events-none" />
                    
                    <div className="relative z-10 p-10 md:p-14 space-y-8 text-center">
                      <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/25 text-brand-red text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                        <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
                        הדרך הנכונה למכור רכב
                      </div>

                      <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                        המכירה מתחילה{' '}
                        <span className="relative inline-block">
                          <span className="text-brand-red">בפרסום נכון.</span>
                          <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-red to-transparent rounded-full" />
                        </span>
                      </h3>

                      <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mx-auto font-medium">
                        ב־YOUGO אנחנו לא מעלים מודעה סתם — אנחנו{' '}
                        <span className="text-white font-bold">יוצרים חשיפה אמיתית</span>{' '}
                        שמביאה קונים רציניים עם כסף אמיתי. בחר חבילה, העלה פרטים, ושלם —
                        ואנחנו נדאג שהרכב שלך{' '}
                        <span className="text-brand-red font-bold">יקבל את הבמה שמגיעה לו.</span>
                      </p>

                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
                        {[
                          { num: '48h', label: 'זמן ממוצע למכירה' },
                          { num: '50K+', label: 'עוקבים פעילים' },
                          { num: '98%', label: 'לקוחות מרוצים' },
                        ].map((stat, i) => (
                          <div key={i} className="text-center space-y-1">
                            <div className="text-2xl md:text-3xl font-black text-brand-red">{stat.num}</div>
                            <div className="text-[10px] text-white/35 font-bold uppercase tracking-wider">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto pt-2">
                        <div className="flex items-center justify-center gap-2 bg-white/[0.04] border border-white/8 rounded-2xl px-4 py-3 hover:bg-white/[0.07] transition-colors">
                          <Lock size={15} className="text-brand-red shrink-0" />
                          <span className="text-[11px] font-black text-white/60 uppercase tracking-wide">תשלום מאובטח</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 bg-white/[0.04] border border-white/8 rounded-2xl px-4 py-3 hover:bg-white/[0.07] transition-colors">
                          <MessageSquare size={15} className="text-green-500 shrink-0" />
                          <span className="text-[11px] font-black text-white/60 uppercase tracking-wide">תמיכה WhatsApp</span>
                        </div>
                        <div className="flex items-center justify-center bg-white/[0.04] border border-white/8 rounded-2xl px-4 py-3 hover:bg-white/[0.07] transition-colors">
                          <BitLogo size="sm" />
                        </div>
                        <div className="flex items-center justify-center bg-white/[0.04] border border-white/8 rounded-2xl px-4 py-3 hover:bg-white/[0.07] transition-colors">
                          <PayBoxLogo size="sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="why-us" className="space-y-14">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/40 text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    היתרון שלנו
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black">{t.whyUs.title}</h2>
                  <p className="text-white/40 max-w-lg mx-auto text-sm">הסיבות שאלפי מוכרים בחרו דווקא בנו</p>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  {[
                    {
                      ...t.whyUs.audience,
                      icon: <Users size={28} />,
                      num: '01',
                      stat: '50K+',
                      statLabel: 'עוקבים פעילים',
                      accentColor: 'rgba(200,16,46,0.85)'
                    },
                    {
                      ...t.whyUs.speed,
                      icon: <Zap size={28} />,
                      num: '02',
                      stat: '48h',
                      statLabel: 'זמן ממוצע למכירה',
                      accentColor: 'rgba(200,16,46,0.85)'
                    },
                    {
                      ...t.whyUs.results,
                      icon: <TrendingUp size={28} />,
                      num: '03',
                      stat: '98%',
                      statLabel: 'לקוחות מרוצים',
                      accentColor: 'rgba(200,16,46,0.85)'
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                      className="group relative rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.045] hover:border-brand-red/30 transition-all duration-300 overflow-hidden p-7 flex flex-col gap-5"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="absolute bottom-3 left-4 text-8xl font-black select-none leading-none pointer-events-none transition-all duration-300"
                        style={{ color: 'rgba(200,16,46,0.04)' }}>{item.num}</div>

                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-brand-red border border-brand-red/20 bg-brand-red/8 group-hover:bg-brand-red/14 group-hover:border-brand-red/40 transition-all duration-300 shrink-0">
                          {item.icon}
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-brand-red leading-none">{item.stat}</div>
                          <div className="text-[10px] text-white/30 font-bold uppercase tracking-wider mt-0.5">{item.statLabel}</div>
                        </div>
                      </div>

                      <div className="h-px bg-white/5 group-hover:bg-brand-red/15 transition-colors duration-300" />

                      <div className="space-y-2 relative z-10">
                        <h3 className="text-lg font-black text-white group-hover:text-brand-red transition-colors duration-200 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/45 leading-relaxed group-hover:text-white/65 transition-colors duration-200">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="relative rounded-2xl border border-white/5 bg-white/[0.015] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-red/3 via-transparent to-brand-red/3 pointer-events-none" />
                  <div className="relative z-10 flex flex-wrap items-center justify-center gap-0 divide-x divide-white/5 rtl:divide-x-reverse">
                    {[
                      { icon: <ShieldCheck size={16} />, text: 'תשלום מאובטח 100%' },
                      { icon: <CheckCircle2 size={16} />, text: 'ללא עמלת הצלחה' },
                      { icon: <Zap size={16} />, text: 'פרסום תוך 24 שעות' },
                      { icon: <MessageSquare size={16} />, text: 'תמיכה אישית בוואטסאפ' },
                      { icon: <Users size={16} />, text: '500+ מכירות בחודש' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 px-5 py-4 text-[11px] font-bold text-white/40 hover:text-white/70 transition-colors">
                        <span className="text-brand-red shrink-0">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="faq" className="max-w-4xl mx-auto space-y-10">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/40 text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    שאלות נפוצות
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black">שאלות נפוצות</h2>
                  <p className="text-white/50 text-sm">כל מה שצריך לדעת על תהליך הפרסום והמכירה</p>
                </div>
                <div className="space-y-3">
                  {t.faqs.slice(0, showAllFaqs ? t.faqs.length : 4).map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-2xl overflow-hidden transition-all duration-300"
                      style={{
                        border: activeFaq === i 
                          ? '1px solid rgba(200,16,46,0.35)' 
                          : '1px solid rgba(255,255,255,0.07)',
                        background: activeFaq === i 
                          ? 'linear-gradient(135deg, rgba(200,16,46,0.07) 0%, rgba(10,5,5,1) 100%)'
                          : 'rgba(255,255,255,0.02)',
                        boxShadow: activeFaq === i ? '0 0 20px rgba(200,16,46,0.05)' : 'none'
                      }}
                    >
                      <button 
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full px-6 py-5 flex items-center justify-between text-right gap-4 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black transition-all duration-300"
                            style={{ 
                              background: activeFaq === i ? '#c8102e' : 'rgba(255,255,255,0.06)',
                              color: activeFaq === i ? '#fff' : 'rgba(255,255,255,0.35)'
                            }}>
                            {i + 1}
                          </div>
                          <span className="font-bold text-base text-right leading-snug" 
                            style={{ color: activeFaq === i ? '#fff' : 'rgba(255,255,255,0.80)' }}>
                            {item.q}
                          </span>
                        </div>
                        <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{ 
                            background: activeFaq === i ? 'rgba(200,16,46,0.20)' : 'rgba(255,255,255,0.04)',
                            border: activeFaq === i ? '1px solid rgba(200,16,46,0.30)' : '1px solid rgba(255,255,255,0.06)'
                          }}>
                          {activeFaq === i 
                            ? <ChevronUp size={15} className="text-brand-red" />
                            : <ChevronDown size={15} className="text-white/30" />
                          }
                        </div>
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 mr-12">
                              <div className="pt-3 border-t text-sm text-white/60 leading-relaxed"
                                style={{ borderColor: 'rgba(200,16,46,0.12)' }}>
                                {item.a}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                
                {!showAllFaqs && t.faqs.length > 4 && (
                  <div className="text-center pt-2">
                    <button 
                      onClick={() => setShowAllFaqs(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm transition-all hover:scale-105 active:scale-95"
                      style={{ 
                        background: 'rgba(200,16,46,0.08)',
                        border: '1px solid rgba(200,16,46,0.25)',
                        color: '#c8102e'
                      }}
                    >
                      הצג את כל השאלות
                      <ChevronDown size={18} />
                    </button>
                  </div>
                )}
              </section>

              <footer className="pb-12">
                <div className="relative rounded-3xl overflow-hidden border border-white/8"
                  style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0) 100%)' }}>

                  <div className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(200,16,46,0.5), transparent)' }} />

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(200,16,46,0.06) 0%, transparent 70%)' }} />

                  <div className="relative z-10 px-8 pt-12 pb-8 space-y-10">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="p-2 bg-brand-red rounded-xl shadow-lg">
                          <Car size={22} className="text-white" />
                        </div>
                        <div className="text-2xl font-black tracking-tighter text-brand-red">
                          YOUGO <span className="text-white">ISRAEL</span>
                        </div>
                      </div>
                      <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
                        הצטרפו לאלפי לקוחות מרוצים שכבר מכרו את הרכב שלהם דרך הפלטפורמה המובילה בישראל. אנחנו כאן כדי להפוך את המכירה שלכם למהירה, פשוטה ומקצועית.
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      {[
                        { href: 'https://instagram.com', icon: <Instagram size={20} />, label: 'Instagram' },
                        { href: 'https://tiktok.com', icon: <Smartphone size={20} />, label: 'TikTok' },
                        { href: 'https://telegram.org', icon: <Send size={20} />, label: 'Telegram' },
                        { href: 'https://wa.me/972546980606', icon: <MessageSquare size={20} />, label: 'WhatsApp' },
                      ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank"
                          className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#c8102e')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>

                    <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

                    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 md:gap-2">
                      {[
                        { icon: <FileText size={15} />, label: 'תקנון', onClick: () => setModalContent(t.pages.terms) },
                        { icon: <Lock size={15} />, label: 'פרטיות', onClick: () => setModalContent(t.pages.privacy) },
                        { icon: <Info size={15} />, label: 'מי אנחנו', onClick: () => setModalContent(t.pages.about) },
                        { icon: <TrendingUp size={15} />, label: 'למה אנחנו', onClick: () => setModalContent({ title: t.whyUs.title, content: `${t.whyUs.audience.title}\n${t.whyUs.audience.desc}\n\n${t.whyUs.speed.title}\n${t.whyUs.speed.desc}\n\n${t.whyUs.results.title}\n${t.whyUs.results.desc}` }) },
                        { icon: <LayoutDashboard size={15} />, label: 'ניהול', onClick: () => setView('admin-login') },
                      ].map((link, i) => (
                        <button key={i} onClick={link.onClick}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-white/50 hover:text-white transition-all duration-200 md:hover:bg-white/5"
                          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          <span className="text-brand-red">{link.icon}</span>
                          {link.label}
                        </button>
                      ))}
                    </div>

                    <div className="text-center pt-2">
                      <p className="text-[11px] text-white/20 font-bold">
                        © 2024 YOUGO ISRAEL · כל הזכויות שמורות · עוצב ופותח במקצועיות
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </motion.div>
          )}

          {view === 'booking' && (
            <motion.div 
              initial={{ opacity: 0, y: -60, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-4"
              >
                <ArrowLeft size={20} />
                חזרה לחבילות
              </button>

              <div className="glass-card p-8 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">{t.checkout}</h2>
                  <p className="text-brand-red font-bold">חבילה נבחרת: {selectedPackage?.name}</p>
                </div>

                <form onSubmit={handleSubmitOrder} className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg border-r-4 border-brand-red pr-3">{t.carDetails}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="דגם רכב" 
                        required
                        className="input-field"
                        value={formData.model}
                        onChange={e => setFormData({...formData, model: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="שנה" 
                        required
                        className="input-field"
                        value={formData.year}
                        onChange={e => setFormData({...formData, year: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="קילומטראז'" 
                        required
                        className="input-field"
                        value={formData.mileage}
                        onChange={e => setFormData({...formData, mileage: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="מחיר מבוקש" 
                        required
                        className="input-field"
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="תאריך עלייה לכביש" 
                        required
                        className="input-field"
                        value={formData.registration}
                        onChange={e => setFormData({...formData, registration: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="טסט עד" 
                        required
                        className="input-field"
                        value={formData.testUntil}
                        onChange={e => setFormData({...formData, testUntil: e.target.value})}
                      />
                      <input 
                        type="text" 
                        placeholder="מיקום בארץ" 
                        required
                        className="input-field md:col-span-2"
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-lg border-r-4 border-brand-red pr-3">{t.personalDetails}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="שם מלא" 
                        required
                        className="input-field"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                      />
                      <input 
                        type="tel" 
                        placeholder="טלפון" 
                        required
                        className="input-field"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-bold text-lg border-r-4 border-brand-red pr-3">אמצעי תשלום</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl flex flex-col items-center justify-center gap-1.5"
                        style={{ borderWidth: 2, borderStyle: 'solid', borderColor: '#c8102e', background: 'rgba(200,16,46,0.06)' }}>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ background: '#00E5CC' }} />
                          <span className="font-black text-sm text-white">Bit</span>
                          <span className="text-white/25 text-xs">/</span>
                          <div className="w-2 h-2 rounded-full" style={{ background: '#29ABE2' }} />
                          <span className="font-black text-sm text-white">PayBox</span>
                        </div>
                        <span className="text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.45)' }}>העברה בנקאית מהירה</span>
                      </div>
                      <div className="p-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 opacity-40 cursor-not-allowed"
                        style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                        <CreditCard size={20} style={{ color: 'rgba(255,255,255,0.3)' }} />
                        <span className="font-bold text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>אשראי (בקרוב)</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden"
                    style={{ 
                      border: '1px solid rgba(200,16,46,0.30)',
                      background: 'linear-gradient(145deg, rgba(200,16,46,0.06) 0%, rgba(8,4,4,1) 60%, rgba(12,6,6,1) 100%)',
                      boxShadow: '0 0 24px rgba(200,16,46,0.06), inset 0 1px 0 rgba(255,255,255,0.04)'
                    }}>
                    <div className="flex items-center gap-3 px-5 py-3.5 border-b"
                      style={{ borderColor: 'rgba(200,16,46,0.12)', background: 'rgba(200,16,46,0.04)' }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(200,16,46,0.18)' }}>
                        <CreditCard size={14} className="text-brand-red" />
                      </div>
                      <h3 className="font-black text-sm text-brand-red tracking-wide">ביצוע תשלום</h3>
                      <div className="mr-auto flex items-center gap-2">
                        <PayBoxLogo size="sm" />
                        <BitLogo size="sm" />
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="text-center space-y-1">
                        <p className="text-xs text-white/50 font-bold uppercase tracking-widest">נא להעביר</p>
                        <p className="text-sm text-white/75">
                          <span className="font-black text-white text-base">{selectedPackage?.price}</span>
                          {' '}ב־Bit או PayBox למספר:
                        </p>
                      </div>

                      <div className="relative">
                        <div className="flex items-center rounded-xl overflow-hidden"
                          style={{ border: '1px solid rgba(200,16,46,0.20)', background: 'rgba(200,16,46,0.04)' }}>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText('0546980606');
                              const btn = document.getElementById('copy-btn-label');
                              if (btn) { btn.textContent = '✓ הועתק'; setTimeout(() => { if(btn) btn.textContent = 'העתק'; }, 2000); }
                            }}
                            className="flex flex-col items-center justify-center gap-0.5 px-4 py-3 border-l transition-all active:scale-95 hover:bg-brand-red/10 shrink-0"
                            style={{ borderColor: 'rgba(200,16,46,0.15)', minWidth: 60 }}
                          >
                            <FileText size={14} className="text-brand-red" />
                            <span id="copy-btn-label" className="text-[9px] font-black text-brand-red uppercase tracking-wide">העתק</span>
                          </button>
                          <div className="flex-1 text-center py-3 text-xl font-black tracking-[0.14em] text-white select-all" dir="ltr">
                            054-6980606
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-white/60 uppercase tracking-widest block">
                          {t.uploadProof}
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => handleFileChange(e, 'paymentProof')}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          />
                          <div className="rounded-xl border-2 border-dashed py-5 flex flex-col items-center gap-2 transition-colors"
                            style={{ borderColor: formData.paymentProof ? 'rgba(34,197,94,0.5)' : 'rgba(255,255,255,0.1)', background: formData.paymentProof ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.02)' }}>
                            {formData.paymentProof ? (
                              <>
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                  <Check size={20} className="text-green-400" />
                                </div>
                                <span className="text-sm font-black text-green-400">צילום מסך נבחר ✓</span>
                              </>
                            ) : (
                              <>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                  style={{ background: 'rgba(200,16,46,0.12)' }}>
                                  <Upload size={18} className="text-brand-red" />
                                </div>
                                <span className="text-sm font-bold text-white/60">לחץ להעלאת צילום מסך</span>
                                <span className="text-[10px] text-white/30">PNG / JPG / JPEG</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 rounded-xl p-3"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Camera size={14} className="text-white/30 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-white/35 leading-relaxed">
                          לאחר שליחת הטופס, תועבר לוואטסאפ לשליחת תמונות וסרטון הרכב ישירות לצוות שלנו.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full btn-primary py-4 text-xl flex items-center justify-center gap-3"
                  >
                    {loading ? 'שולח...' : t.submitOrder}
                    {!loading && <ChevronRight size={24} />}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center space-y-8 py-20"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
                <Check size={48} strokeWidth={3} />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black">{t.orderSuccess}</h2>
                <p className="text-xl text-white/60">מספר הזמנה: <span className="text-brand-red font-black">#{orderId}</span></p>
              </div>
              <div className="glass-card p-8 space-y-4">
                <p className="font-bold">מה קורה עכשיו?</p>
                <ul className="text-right space-y-3 text-sm text-white/80">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> הודעת וואטסאפ נשלחה למנהל</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> הצוות שלנו יבדוק את פרטי ההזמנה</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> המודעה תעלה לאינסטגרם לאחר אישור</li>
                  <li className="pt-4 text-brand-red font-black border-t border-white/5">ניתן לבדוק את מצב ההזמנה בכל עת דרך מספר ההזמנה באתר!</li>
                </ul>
              </div>
              <button 
                onClick={() => setView('home')}
                className="text-brand-red font-bold hover:underline"
              >
                חזרה לדף הבית
              </button>
            </motion.div>
          )}

          {view === 'check-status' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto py-12 space-y-8"
            >
              <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-4"
              >
                <ArrowLeft size={20} />
                חזרה לדף הבית
              </button>

              <div className="glass-card p-10 space-y-8">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto text-brand-red">
                    <Eye size={40} />
                  </div>
                  <h2 className="text-3xl font-black">בדיקת מצב הזמנה</h2>
                  <p className="text-white/60">הזן את מספר ההזמנה שלך כדי לראות את הסטטוס העדכני</p>
                </div>

                <form onSubmit={checkOrderStatus} className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="מספר הזמנה (לדוגמה: YG-2380)" 
                    required
                    className="input-field text-center text-xl font-black tracking-widest"
                    value={orderStatusId}
                    onChange={e => setOrderStatusId(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full btn-primary py-4 text-lg"
                  >
                    {loading ? 'בודק...' : 'בדוק סטטוס'}
                  </button>
                </form>

                {checkedOrder && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="text-white/40 font-bold">סטטוס נוכחי:</span>
                      <div className={`inline-flex items-center gap-2 font-black px-4 py-2 rounded-full border ${
                        checkedOrder.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        checkedOrder.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                        checkedOrder.status === 'Payment Verified' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                      }`}>
                        {checkedOrder.status === 'Published' ? 'פורסם' :
                         checkedOrder.status === 'Rejected' ? 'נדחה' :
                         checkedOrder.status === 'Payment Verified' ? 'תשלום אושר' :
                         'ממתין לבדיקה'}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">לקוח:</span>
                        <span className="font-bold">{checkedOrder.full_name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">רכב:</span>
                        <span className="font-bold">{checkedOrder.car_model}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">חבילה:</span>
                        <span className="font-bold">{checkedOrder.package_name}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'admin-login' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto py-20"
            >
              <div className="glass-card p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center">כניסת מנהל</h2>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input 
                    type="password" 
                    placeholder="סיסמה" 
                    required
                    className="input-field"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                  />
                  <button type="submit" className="w-full btn-primary">כניסה</button>
                </form>
                <button onClick={() => setView('home')} className="w-full text-sm text-white/40">ביטול</button>
              </div>
            </motion.div>
          )}

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
