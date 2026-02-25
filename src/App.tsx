import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimation, PanInfo } from 'framer-motion';
import {
  CheckCircle2, Instagram, Users, Calendar, ChevronRight, Globe, ArrowLeft,
  Upload, Camera, Video, CreditCard, Check, Menu, X, LayoutDashboard, LogOut,
  Eye, MessageSquare, Send, Smartphone, ChevronDown, ChevronUp, ShieldCheck,
  FileText, Info, Lock, Car, Zap, TrendingUp, Wrench, Star, Crown, Hammer,
  Truck, Building2, Briefcase, Search, Phone, Mail, MapPin, Clock, Award,
  Sparkles, Rocket, Target, BarChart3, PlayCircle, Headphones, ThumbsUp,
  RefreshCw, Youtube, Twitter, Linkedin, Gauge, Timer, Flame, Gem, Diamond,
  Medal, Trophy, BadgeCheck, Bus, ChevronLeft
} from 'lucide-react';
import { translations, Language } from './translations';

// ============================================================
// TYPES
// ============================================================
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
  description?: string;
  detailedDescription?: string;
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

// ============================================================
// PACKAGE DETAILS DATA
// ============================================================
const packageDetails: Record<string, { title: string; content: string }> = {
  basic: {
    title: 'חבילת BASIC',
    content: `✨ מה כוללת החבילה?
• 2 תמונות מקצועיות עם עריכה איכותית
• פוסט שיווקי ממוקד עם תיאור מפורט
• סטורי לאורך 7 ימים רצופים
• חשיפה לקהל קונים פוטנציאלי פעיל

🌟 למי זה מתאים?
• מוכרים פרטיים עם תקציב מינימלי
• רכבים במחיר עד 50,000 ₪
• מי שרוצה לבדוק את השוק במהירות

⏱️ פרטים טכניים
• משך פרסום: 7 ימים
• מחיר: 149 ₪ (במקום 175 ₪)
• חיסכון של 15% הנחה`
  },
  pro: {
    title: 'חבילת PRO',
    content: `🔥 מה כוללת החבילה?
• 4 תמונות מקצועיות עם עריכה מתקדמת
• פוסט ראשי + פוסט שמור מתוזמן
• סטורי 14 ימים לחשיפה מתמדת
• עדיפות בתור הפרסומים
• טרגוט מתקדם לקהלים רלוונטיים

⏱️ פרטים טכניים
• משך פרסום: 14 ימים
• מחיר: 249 ₪ (במקום 293 ₪)`
  },
  premium: {
    title: 'חבילת PREMIUM',
    content: `👑 מה כוללת החבילה?
• 8+ תמונות מקצועיות
• רילס וידאו + סרטון פרסומי
• פוסט מותאם אישית
• סטורי 30 ימים
• עדיפות מלאה
• מעצב + קופירייטר אישי

⏱️ פרטים טכניים
• משך פרסום: 30 ימים
• מחיר: 449 ₪ (במקום 528 ₪)`
  },
  vip: {
    title: 'VIP LUXURY',
    content: `💎 מה מקבלים?
• 15+ תמונות סטילש ברמה קולנועית
• רילס VIP + סטורי עם עיצוב בלעדי
• 60 ימי פרסום פרמיום מלא
• ליווי אישי 24/7
• טרגוט מתקדם
• עדיפות ראשונה תמיד

⏱️ פרטים טכניים
• משך פרסום: 60 ימים
• מחיר: 749 ₪`
  },
  duo: {
    title: 'DUO DEAL',
    content: `🚗🚗 מה כוללת החבילה?
• פרסום מלא לשני רכבים
• 4 תמונות לכל רכב
• פוסט שיווקי נפרד לכל רכב
• סטורי 14 ימים לכל אחד

💰 למה זה משתלם?
• במקום לשלם 598 ₪ – משלמים רק 349 ₪
• חיסכון עצום של 40% הנחה`
  },
  business: {
    title: 'BUSINESS',
    content: `🏢 מה מקבלים?
• עד 50 רכבים מפורסמים בחודש
• מנהל לקוח ייעודי
• דוחות ביצועים חודשיים
• קידום ממומן

⏱️ פרטים טכניים
• מינוי חודשי מתחדש
• מחיר: 1,499 ₪ לחודש`
  },
  'equipment-heavy': {
    title: 'ציוד כבד',
    content: `🚜 מה כוללת החבילה?
• 10 תמונות מקצועיות של הציוד
• פוסט עם מפרט טכני מפורט
• סטורי 21 ימים
• חשיפה לקהל קבלנים`
  },
  'equipment-light': {
    title: 'ציוד קל',
    content: `🔧 מה כוללת החבילה?
• 6 תמונות מקצועיות
• פוסט מותאם עם תיאור טכני
• סטורי 14 ימים`
  },
  transport: {
    title: 'תחבורה והסעות',
    content: `🚌 מה כוללת החבילה?
• 10 תמונות מקצועיות
• פוסט עם מפרט טכני מלא
• סטורי 21 ימים
• חשיפה לחברות הסעות`
  }
};

// ============================================================
// BIT & PAYBOX LOGOS
// ============================================================
const BitLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const h = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const fontSize = size === 'sm' ? 11 : size === 'lg' ? 16 : 13;
  const px = size === 'sm' ? 8 : 12;
  return (
    <div className="inline-flex items-center justify-center rounded-lg overflow-hidden shrink-0"
      style={{ background: '#0D3D3D', height: h, paddingLeft: px, paddingRight: px, gap: 4 }}>
      <svg width={fontSize * 0.5} height={h * 0.6} viewBox="0 0 9 18" fill="none">
        <circle cx="4.5" cy="2" r="2" fill="#00E5CC"/>
        <rect x="2.5" y="6" width="4" height="10" rx="2" fill="#00E5CC"/>
      </svg>
      <span style={{ fontFamily: '"Nunito", Arial, sans-serif', fontWeight: 800, fontSize, color: '#00E5CC', letterSpacing: '-0.5px', lineHeight: 1 }}>bit</span>
    </div>
  );
};

const PayBoxLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const h = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const fontSize = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;
  const px = size === 'sm' ? 8 : 12;
  return (
    <div className="inline-flex items-center justify-center rounded-lg overflow-hidden shrink-0"
      style={{ background: '#29ABE2', height: h, paddingLeft: px, paddingRight: px, gap: 4 }}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="6" r="3" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M5 10 L9 14 L9 20 L15 20 L15 14 L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 700, fontSize, color: '#ffffff', letterSpacing: '0.2px', lineHeight: 1 }}>PayBox</span>
    </div>
  );
};

// ============================================================
// NAVBAR
// ============================================================
const Navbar = ({ lang, setLang, isAdmin, onLogout, siteSettings, setView }: {
  lang: Language; setLang: (l: Language) => void; isAdmin?: boolean;
  onLogout?: () => void; siteSettings: any; setView: (v: string) => void;
}) => {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      style={{
        background: scrolled ? 'rgba(6,6,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer select-none"
            whileHover={{ scale: 1.02 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #c8102e, #8b0d1e)', boxShadow: '0 4px 20px rgba(200,16,46,0.4)' }}>
                <Car size={20} className="text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#06060a]" />
            </div>
            <div>
              <div className="text-[18px] font-black tracking-tighter leading-none">
                <span style={{ color: '#c8102e' }}>YOUGO</span><span className="text-white"> ISRAEL</span>
              </div>
              <div className="text-[8px] text-white/30 tracking-[0.18em] uppercase font-semibold mt-0.5">
                {siteSettings.positioning_line_he || t.positioningLine}
              </div>
            </div>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: '#how-it-works', label: 'איך זה עובד' },
              { href: '#packages', label: 'חבילות' },
              { href: '#faq', label: 'שאלות' },
            ].map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="relative px-4 py-2 text-sm font-semibold text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </motion.a>
            ))}

            <div className="w-px h-5 bg-white/10 mx-2" />

            <motion.button
              onClick={() => setView('check-status')}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="px-4 py-2 text-sm font-semibold text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              בדיקת סטטוס
            </motion.button>

            <motion.button
              onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white/50 border border-white/10 hover:border-white/20 hover:text-white/80 transition-all ml-1"
            >
              <Globe size={13} />
              {lang === 'he' ? 'AR' : 'HE'}
            </motion.button>

            {isAdmin && (
              <motion.button
                onClick={onLogout}
                className="p-2 text-white/30 hover:text-white/60 transition-colors rounded-lg hover:bg-white/5"
              >
                <LogOut size={16} />
              </motion.button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-3 space-y-1 border-t border-white/5 mt-3">
                {[
                  { href: '#how-it-works', label: 'איך זה עובד' },
                  { href: '#packages', label: 'חבילות' },
                  { href: '#faq', label: 'שאלות' },
                ].map(item => (
                  <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                    {item.label}
                  </a>
                ))}
                <button onClick={() => { setView('check-status'); setMobileMenuOpen(false); }}
                  className="block w-full text-right px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  בדיקת סטטוס
                </button>
                <button onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-white/70 hover:text-white rounded-lg">
                  <Globe size={14} />{lang === 'he' ? 'العربية' : 'עברית'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// ============================================================
// MODAL
// ============================================================
const Modal = ({ isOpen, onClose, title, children }: {
  isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) => {
  const content = typeof children === 'string' ? children : '';
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-2xl p-7 space-y-5"
            style={{
              background: 'linear-gradient(145deg, #0f0f14 0%, #0a0a0e 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black" style={{ color: '#c8102e' }}>{title}</h3>
              <button onClick={onClose} className="p-1.5 hover:bg-white/8 rounded-lg transition-colors">
                <X size={18} className="text-white/50" />
              </button>
            </div>
            <div className="text-white/65 text-sm leading-relaxed space-y-2">
              {content.split('\n').map((line, i) => {
                if (!line.trim()) return <div key={i} className="h-1" />;
                if (/^\d+\./.test(line)) return (
                  <h4 key={i} className="text-white font-bold text-sm mt-4 mb-1 first:mt-0">{line}</h4>
                );
                return <p key={i} className="text-white/60 leading-relaxed">{line}</p>;
              })}
            </div>
            <div className="pt-3 flex justify-end border-t border-white/6">
              <button onClick={onClose}
                className="flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-sm text-white transition-all hover:bg-white/8"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <X size={13} />סגור
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// CARD BACK PANEL
// ============================================================
const CardBackPanel = ({ pkg, details, color, badge, onSelect, onBack }: {
  pkg: Package;
  details: { title: string; content: string };
  color: string;
  badge: string;
  onSelect: (p: Package) => void;
  onBack: () => void;
}) => {
  const items: string[] = [];
  details.content.split('\n').forEach(raw => {
    const cl = raw.replace(/\*\*/g, '').trim();
    if (!cl || cl.length < 3) return;
    if (/^[✨🔥👑💎🚗🏢🚜🔧🚌📦⭐🎯💼📊🔍⚙️🏗️⏱️]/.test(cl)) return;
    if (cl.includes('━') || cl.includes('┌') || cl.includes('─')) return;
    const s = cl.replace(/^[•✓✅📸📝📱🎯⚡🏷️🎥💰📞🛠️📋💫🌟👨\-\s]+/, '').trim();
    if (s.length > 2) items.push(s);
  });
  const shown = items.slice(0, 8);
  const priceNum = parseInt(pkg.price.replace(/[₪,]/g, '')) || 0;
  const original = priceNum ? `₪${Math.round(priceNum / 0.85).toLocaleString()}` : '';

  return (
    <motion.div
      key="back"
      initial={{ rotateY: -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: 90, opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${color}15 0%, #0c0c14 40%, #080810 100%)`,
        border: `1px solid ${color}25`,
      }}
    >
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />

      <div className="shrink-0 flex items-center justify-between gap-2 px-4 pt-4 pb-3"
        style={{ borderBottom: `1px solid ${color}15` }}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0">{badge}</span>
          <div className="min-w-0">
            <p className="text-[13px] font-black text-white truncate leading-tight">{pkg.name}</p>
            <p className="text-[9px] font-semibold mt-[1px]" style={{ color: `${color}80` }}>מה כלול</p>
          </div>
        </div>
        <button type="button" onClick={onBack}
          className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95"
          style={{ border: `1px solid ${color}30`, color, background: `${color}10` }}>
          <ArrowLeft size={10} strokeWidth={2.5} /> חזרה
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2">
        <div className="flex flex-col gap-1">
          {shown.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg"
              style={{ background: i % 2 === 0 ? `${color}08` : 'transparent' }}>
              <div className="shrink-0 mt-[3px] w-3.5 h-3.5 rounded-full flex items-center justify-center"
                style={{ background: `${color}20`, border: `1.5px solid ${color}40` }}>
                <Check size={7} strokeWidth={3} style={{ color }} />
              </div>
              <span className="text-[11.5px] leading-snug font-medium text-white/85">{item}</span>
            </div>
          ))}
          {items.length > 8 && (
            <p className="text-center text-[9px] font-bold py-1.5" style={{ color: `${color}60` }}>
              + {items.length - 8} הטבות נוספות
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 px-4 pt-3 pb-4" style={{ borderTop: `1px solid ${color}15` }}>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-black text-white leading-none">{pkg.price}</span>
            {original && <span className="text-[9px] line-through text-white/20">{original}</span>}
          </div>
          <span className="text-[9px] font-bold px-2 py-[3px] rounded-full"
            style={{ color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
            15% OFF
          </span>
        </div>
        <button type="button" onClick={() => onSelect(pkg)}
          className="w-full py-2.5 rounded-xl font-black text-[13px] text-white flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 6px 20px ${color}35` }}>
          <Rocket size={14} /> הזמן עכשיו
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================
// PACKAGE CARD (Basic, Pro, Premium)
// ============================================================
interface PackageCardProps {
  pkg: Package;
  lang: Language;
  onSelect: (p: Package) => void;
}

const PackageCard = ({ pkg, lang, onSelect }: PackageCardProps) => {
  const t = translations[lang];
  const [showBack, setShowBack] = useState(false);

  const tierConfig = {
    basic:   { color: '#94a3b8', badge: '🚀', glow: 'rgba(148,163,184,0.1)' },
    pro:     { color: '#c8102e', badge: '🔥', glow: 'rgba(200,16,46,0.18)' },
    premium: { color: '#c8102e', badge: '💎', glow: 'rgba(200,16,46,0.22)' },
  };
  const cfg = tierConfig[pkg.id as keyof typeof tierConfig] || tierConfig.basic;
  const isBasic = pkg.id === 'basic';
  const isPro = pkg.id === 'pro';
  const isPremium = pkg.id === 'premium';

  const featureDurations: Record<string, string> = { basic: '7 ימים', pro: '14 ימים', premium: '30 ימים' };
  const featureImages: Record<string, string> = { basic: '2 תמונות', pro: '4 תמונות', premium: '8+ תמונות' };

  return (
    <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: isBasic
                ? 'linear-gradient(145deg, #111318 0%, #0c0e12 100%)'
                : 'linear-gradient(145deg, #160810 0%, #0f0508 100%)',
              border: `1px solid ${cfg.color}${isPremium ? '35' : isPro ? '28' : '20'}`,
              boxShadow: `0 20px 40px -15px ${cfg.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent 0%, ${cfg.color}50 50%, transparent 100%)` }} />
            <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% -20%, ${cfg.color}14 0%, transparent 70%)` }} />

            {pkg.popular && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1 text-white text-[9px] font-black py-1 px-2.5 rounded-full"
                style={{ background: `linear-gradient(135deg, ${cfg.color}, #8b0d1e)`, boxShadow: `0 4px 12px ${cfg.color}50` }}>
                <Trophy size={9} /> {t.mostPopular}
              </div>
            )}

            <div className="absolute top-3 left-3 z-20 text-[9px] font-black py-1 px-2 rounded-full"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
              15% OFF
            </div>

            <div className="relative z-10 flex flex-col h-full p-5 gap-3.5 pt-11">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${cfg.color}20 0%, ${cfg.color}08 100%)`,
                    border: `1px solid ${cfg.color}28`,
                  }}>
                  {cfg.badge}
                </div>
                <div>
                  <h3 className="text-[19px] font-black leading-none" style={{ color: isBasic ? '#e2e8f0' : cfg.color }}>
                    {pkg.name}
                  </h3>
                  <p className="text-[10px] font-medium mt-1" style={{ color: isBasic ? 'rgba(255,255,255,0.35)' : `${cfg.color}70` }}>
                    {isBasic ? '✓ פתרון מהיר ומקצועי' : isPro ? '✓ הבחירה הפופולרית' : '✓ חשיפה מקסימלית'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Camera size={10} />, val: featureImages[pkg.id] || '' },
                  { icon: <Calendar size={10} />, val: featureDurations[pkg.id] || '' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: `${cfg.color}0a`, border: `1px solid ${cfg.color}18` }}>
                    <span style={{ color: cfg.color }}>{s.icon}</span>
                    <span className="text-[10px] font-bold text-white/80">{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-black text-white leading-none">{pkg.price}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] line-through text-white/18">
                    ₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}
                  </span>
                  <span className="text-[9px] font-bold text-green-400">15% הנחה</span>
                </div>
              </div>

              <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}30, transparent)` }} />

              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]"
                      style={{ background: `${cfg.color}18`, border: `1px solid ${cfg.color}35` }}>
                      <Check size={9} strokeWidth={3} style={{ color: cfg.color }} />
                    </div>
                    <span className="text-[12px] font-medium leading-snug text-white/80">{feat}</span>
                  </div>
                ))}
                {pkg.features.length > 4 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full self-start"
                    style={{ color: cfg.color, background: `${cfg.color}10`, border: `1px solid ${cfg.color}20` }}>
                    + {pkg.features.length - 4} עוד
                  </span>
                )}
              </div>

              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={() => setShowBack(true)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95"
                  style={{ border: `1px solid ${cfg.color}28`, color: cfg.color, background: `${cfg.color}08` }}>
                  פרטים
                </button>
                <button type="button" onClick={() => onSelect(pkg)}
                  className="flex-1 py-2.5 rounded-xl font-black text-xs text-white transition-all active:scale-95"
                  style={{
                    background: isPremium || isPro ? `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)` : 'rgba(255,255,255,0.08)',
                    border: isPremium || isPro ? 'none' : '1px solid rgba(255,255,255,0.14)',
                    boxShadow: isPremium || isPro ? `0 6px 18px ${cfg.color}40` : 'none',
                  }}>
                  <span className="flex items-center justify-center gap-1.5">
                    <Rocket size={11} />{t.startOrder}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel
            pkg={pkg}
            details={packageDetails[pkg.id] || { title: pkg.name, content: pkg.features.join('\n') }}
            color={tierConfig[pkg.id as keyof typeof tierConfig]?.color || '#94a3b8'}
            badge={tierConfig[pkg.id as keyof typeof tierConfig]?.badge || '🚀'}
            onSelect={onSelect}
            onBack={() => setShowBack(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// VIP PACKAGE CARD
// ============================================================
const VIPPackageCard = ({ pkg, onSelect }: { pkg: Package; onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#d4af37';

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #1a1205 0%, #0e0a02 100%)',
              border: '1px solid rgba(212,175,55,0.35)',
              boxShadow: '0 20px 40px -15px rgba(212,175,55,0.25)',
            }}
          >
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #d4af37 50%, transparent)' }} />
            <div className="absolute top-0 inset-x-0 h-40 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(212,175,55,0.1) 0%, transparent 70%)' }} />

            <div className="relative z-10 p-5 flex flex-col h-full gap-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-full px-3 py-1.5"
                  style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <Crown size={11} style={{ color: '#d4af37' }} />
                  <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#d4af37' }}>VIP LUXURY</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)' }}>
                  👑
                </div>
                <div>
                  <h3 className="text-[22px] font-black leading-none"
                    style={{ background: 'linear-gradient(135deg, #f5d060, #d4af37, #a67c00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    VIP LUXURY
                  </h3>
                  <p className="text-[10px] text-amber-100/40 mt-1">חבילת הפרסום האולטימטיבית</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Camera size={10} />, val: '15+ תמונות' },
                  { icon: <Calendar size={10} />, val: '60 ימים' },
                  { icon: <Video size={10} />, val: 'רילס VIP' },
                  { icon: <Crown size={10} />, val: 'ליווי 24/7' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}>
                    <span style={{ color: '#d4af37' }}>{s.icon}</span>
                    <span className="text-[10px] font-bold text-white/80">{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[34px] font-black leading-none" style={{ color: '#d4af37' }}>₪749</span>
                <span className="text-xs line-through text-white/18">₪882</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ color: '#d4af37', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  15% OFF
                </span>
              </div>

              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.25), transparent)' }} />

              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]"
                      style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)' }}>
                      <Check size={8} strokeWidth={3} style={{ color: '#d4af37' }} />
                    </div>
                    <span className="text-[12px] font-medium text-white/80 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={() => setShowBack(true)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95"
                  style={{ border: '1px solid rgba(212,175,55,0.25)', color: '#d4af37', background: 'rgba(212,175,55,0.06)' }}>
                  פרטים
                </button>
                <button type="button" onClick={() => onSelect(pkg)}
                  className="flex-1 py-2.5 rounded-xl font-black text-xs text-black flex items-center justify-center gap-1.5 transition-all active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #f5d060, #d4af37)', boxShadow: '0 6px 18px rgba(212,175,55,0.35)' }}>
                  <Crown size={11} /> הזמן VIP
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.vip} color={color} badge="👑" onSelect={onSelect} onBack={() => setShowBack(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// DUO DEAL PACKAGE CARD
// ============================================================
const DuoDealPackageCard = ({ pkg, onSelect }: { pkg: Package; onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#8b5cf6';

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #110b1e 0%, #0c0814 100%)',
              border: '1px solid rgba(139,92,246,0.35)',
              boxShadow: '0 20px 40px -15px rgba(139,92,246,0.25)',
            }}
          >
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6 50%, transparent)' }} />

            <div className="relative z-10 p-5 flex flex-col h-full gap-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}>
                  <span className="text-sm">🚗🚗</span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-purple-300">DUO DEAL</span>
                </div>
                <div className="rounded-full px-2.5 py-1"
                  style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                  <span className="text-[9px] font-bold text-emerald-400">40% הנחה</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}>
                  🚗
                </div>
                <div>
                  <h3 className="text-[22px] font-black leading-none"
                    style={{ background: 'linear-gradient(135deg, #c4b5fd, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    DUO DEAL
                  </h3>
                  <p className="text-[10px] text-purple-100/35 mt-1">פרסום 2 רכבים במחיר מיוחד</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Car size={10} />, val: '2 רכבים' },
                  { icon: <Camera size={10} />, val: '4 תמונות/רכב' },
                  { icon: <Calendar size={10} />, val: '14 ימים' },
                  { icon: <Zap size={10} />, val: 'חשיפה כפולה' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)' }}>
                    <span className="text-purple-400">{s.icon}</span>
                    <span className="text-[10px] font-bold text-white/80">{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[34px] font-black leading-none text-purple-400">₪349</span>
                <span className="text-xs line-through text-white/18">₪598</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ color: '#a78bfa', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.22)' }}>
                  חיסכון ₪249
                </span>
              </div>

              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)' }} />

              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]"
                      style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                      <Check size={8} strokeWidth={3} className="text-purple-400" />
                    </div>
                    <span className="text-[12px] font-medium text-white/80 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={() => setShowBack(true)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95"
                  style={{ border: '1px solid rgba(139,92,246,0.28)', color: '#8b5cf6', background: 'rgba(139,92,246,0.06)' }}>
                  פרטים
                </button>
                <button type="button" onClick={() => onSelect(pkg)}
                  className="flex-1 py-2.5 rounded-xl font-black text-xs text-white flex items-center justify-center gap-1.5 transition-all active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', boxShadow: '0 6px 18px rgba(139,92,246,0.35)' }}>
                  <Car size={11} /> הזמן DUO
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.duo} color={color} badge="🚗🚗" onSelect={onSelect} onBack={() => setShowBack(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// EQUIPMENT PACKAGE CARD
// ============================================================
const EquipmentPackageCard = ({ pkg, onSelect }: { pkg: Package; onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const isHeavy = pkg.id === 'equipment-heavy';
  const color = isHeavy ? '#ea580c' : '#94a3b8';
  const badge = isHeavy ? '🚜' : '🔧';

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden p-5"
            style={{
              background: isHeavy ? 'linear-gradient(145deg, #160b04 0%, #0e0803 100%)' : 'linear-gradient(145deg, #111318 0%, #0b0d10 100%)',
              border: `1px solid ${color}${isHeavy ? '35' : '25'}`,
              boxShadow: `0 20px 40px -15px ${color}${isHeavy ? '20' : '12'}`,
            }}
          >
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }} />

            {isHeavy && (
              <div className="flex justify-end mb-3">
                <div className="text-white text-[8px] font-black py-1 px-3 rounded-full flex items-center gap-1"
                  style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', boxShadow: '0 4px 12px rgba(234,88,12,0.4)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />הכי מבוקש
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: `${color}12`, border: `1px solid ${color}28` }}>
                {badge}
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.12em]" style={{ color }}>
                  {isHeavy ? 'ציוד כבד' : 'ציוד קל'}
                </div>
                <h3 className="text-[16px] font-black text-white leading-tight mt-0.5">{pkg.name}</h3>
              </div>
              <div className="mr-auto text-right shrink-0">
                <div className="text-[21px] font-black text-white">{pkg.price}</div>
                <div className="text-[9px] text-white/22 line-through">₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {(isHeavy ? ['באגר', 'מחפרון', 'מיני באגר', 'בולדוזר'] : ['פופקט', 'מלגזה', 'סקיד סטיר']).map((item, i) => (
                <span key={i} className="text-[9px] font-bold px-2 py-1 rounded-full"
                  style={{ color: isHeavy ? '#fb923c' : '#94a3b8', border: `1px solid ${color}22`, background: `${color}0a` }}>
                  {item}
                </span>
              ))}
            </div>

            <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, transparent, ${color}22, transparent)` }} />

            <div className="flex flex-col gap-2 flex-grow">
              {pkg.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-[2px] p-[3px] rounded-full shrink-0" style={{ background: `${color}50` }}>
                    <Check size={7} className="text-black" strokeWidth={4} />
                  </div>
                  <span className="text-[11.5px] font-medium text-white/75 leading-snug">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5 mt-auto pt-3">
              <button type="button" onClick={() => setShowBack(true)}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95"
                style={{ border: `1px solid ${color}28`, color, background: `${color}08` }}>
                פרטים
              </button>
              <button type="button" onClick={() => onSelect(pkg)}
                className="flex-1 py-2.5 rounded-xl font-black text-xs text-white transition-all active:scale-95"
                style={{
                  background: isHeavy ? 'linear-gradient(135deg, #ea580c, #c2410c)' : `${color}20`,
                  border: isHeavy ? 'none' : `1px solid ${color}28`,
                  boxShadow: isHeavy ? '0 6px 18px rgba(234,88,12,0.35)' : 'none',
                }}>
                הזמן עכשיו
              </button>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel
            pkg={pkg}
            details={packageDetails[pkg.id] || { title: pkg.name, content: pkg.features.join('\n') }}
            color={color} badge={badge} onSelect={onSelect} onBack={() => setShowBack(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// TRANSPORT PACKAGE CARD
// ============================================================
const TransportPackageCard = ({ pkg, onSelect }: { pkg: Package; onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#0ea5e9';

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden p-5"
            style={{
              background: 'linear-gradient(145deg, #060e18 0%, #04090f 100%)',
              border: '1px solid rgba(14,165,233,0.3)',
              boxShadow: '0 20px 40px -15px rgba(14,165,233,0.18)',
            }}
          >
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #0ea5e9 50%, transparent)' }} />

            <div className="flex justify-start mb-3">
              <div className="text-white text-[8px] font-black py-1 px-3 rounded-full flex items-center gap-1.5"
                style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', boxShadow: '0 4px 12px rgba(14,165,233,0.35)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />חדש!
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)' }}>
                🚌
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.12em] text-sky-400">תחבורה והסעות</div>
                <h3 className="text-[16px] font-black text-white leading-tight mt-0.5">{pkg.name}</h3>
              </div>
              <div className="mr-auto text-right shrink-0">
                <div className="text-[21px] font-black text-white">{pkg.price}</div>
                <div className="text-[9px] text-white/22 line-through">₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {['אוטובוס', 'מיניבוס', 'וואן', 'משאית'].map((item, i) => (
                <span key={i} className="text-[9px] font-bold px-2 py-1 rounded-full text-sky-300"
                  style={{ border: '1px solid rgba(14,165,233,0.22)', background: 'rgba(14,165,233,0.08)' }}>
                  {item}
                </span>
              ))}
            </div>

            <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.22), transparent)' }} />

            <div className="flex flex-col gap-2 flex-grow">
              {pkg.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-[2px] p-[3px] rounded-full shrink-0 bg-sky-500/50">
                    <Check size={7} className="text-black" strokeWidth={4} />
                  </div>
                  <span className="text-[11.5px] font-medium text-white/75 leading-snug">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5 mt-auto pt-3">
              <button type="button" onClick={() => setShowBack(true)}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 text-sky-400"
                style={{ border: '1px solid rgba(14,165,233,0.28)', background: 'rgba(14,165,233,0.06)' }}>
                פרטים
              </button>
              <button type="button" onClick={() => onSelect(pkg)}
                className="flex-1 py-2.5 rounded-xl font-black text-xs text-white flex items-center justify-center gap-1.5 transition-all active:scale-95"
                style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', boxShadow: '0 6px 18px rgba(14,165,233,0.3)' }}>
                <Bus size={11} />הזמן
              </button>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.transport} color={color} badge="🚌" onSelect={onSelect} onBack={() => setShowBack(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// BUSINESS PACKAGE CARD
// ============================================================
const BusinessPackageCard = ({ pkg, onSelect }: { pkg: Package; onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#3b82f6';

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #060f1c 0%, #0b1826 50%, #060f1c 100%)',
              border: '1px solid rgba(59,130,246,0.3)',
              boxShadow: '0 20px 40px -15px rgba(59,130,246,0.2)',
            }}
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <div className="absolute inset-0 opacity-[0.035]"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div className="relative z-10 p-5 h-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', boxShadow: '0 6px 18px rgba(59,130,246,0.3)' }}>
                    <Building2 size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-blue-400 uppercase tracking-[0.12em]">לסוכנויות</div>
                    <h3 className="text-[20px] font-black text-white">BUSINESS</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.22)' }}>
                  <Award size={10} className="text-blue-400" />
                  <span className="text-[8px] font-black text-blue-400">מומלץ</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Car size={10} />, val: '50 רכבים/חודש' },
                  { icon: <Users size={10} />, val: 'מנהל ייעודי' },
                  { icon: <BarChart3 size={10} />, val: 'דוחות חודשיים' },
                  { icon: <Target size={10} />, val: 'קידום ממומן' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="text-blue-400">{s.icon}</span>
                    <span className="text-[10px] font-bold text-white/80">{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[30px] font-black text-white leading-none">₪1,499</span>
                <span className="text-xs text-white/30">/חודש</span>
                <span className="text-xs line-through text-white/18 mr-1">₪2,499</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>40% OFF</span>
              </div>

              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)' }} />

              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]"
                      style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
                      <Check size={8} strokeWidth={3} className="text-blue-400" />
                    </div>
                    <span className="text-[12px] font-medium text-white/80 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={() => setShowBack(true)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 text-blue-400"
                  style={{ border: '1px solid rgba(59,130,246,0.28)', background: 'rgba(59,130,246,0.06)' }}>
                  פרטים
                </button>
                <button type="button" onClick={() => onSelect(pkg)}
                  className="flex-1 py-2.5 rounded-xl font-black text-xs text-white flex items-center justify-center gap-1.5 transition-all active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', boxShadow: '0 6px 18px rgba(59,130,246,0.35)' }}>
                  <Briefcase size={11} />התחל
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.business} color={color} badge="🏢" onSelect={onSelect} onBack={() => setShowBack(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// MOBILE SWIPER
// ============================================================
const MobileSwiper = ({ children, cardHeight = 500 }: { children: React.ReactNode[]; cardHeight?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [current, setCurrent] = useState(0);
  const controls = useAnimation();
  const dragX = useMotionValue(0);
  const count = React.Children.count(children);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const slideWidth = containerWidth * 0.85 + 12;

  const snapTo = (index: number) => {
    const targetX = -index * slideWidth;
    controls.start({ x: targetX, transition: { type: 'spring', stiffness: 300, damping: 30 } });
    setCurrent(index);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragOffset = dragX.get();
    const velocity = info.velocity.x;
    const estimatedX = dragOffset + velocity * 0.3;
    const newIndex = Math.round(-estimatedX / slideWidth);
    const clampedIndex = Math.max(0, Math.min(newIndex, count - 1));
    snapTo(clampedIndex);
  };

  useEffect(() => { dragX.set(-current * slideWidth); }, [current, slideWidth, dragX]);
  useEffect(() => { if (containerWidth > 0) snapTo(0); }, [containerWidth]);

  return (
    <div className="relative" style={{ userSelect: 'none' }}>
      <div ref={containerRef} style={{ overflow: 'hidden', paddingLeft: '12px', paddingRight: '12px' }}>
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={controls}
          style={{ x: dragX, display: 'flex', gap: '12px', willChange: 'transform' }}
          onDragEnd={handleDragEnd}
        >
          {React.Children.map(children, (child, i) => (
            <motion.div key={i} style={{ minWidth: '85%', flexShrink: 0, height: cardHeight, borderRadius: '1.25rem' }}>
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-5">
        {Array.from({ length: count }).map((_, i) => (
          <button key={i} type="button" onClick={() => snapTo(i)}
            style={{
              width: i === current ? '24px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === current ? '#c8102e' : 'rgba(255,255,255,0.18)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none z-10 flex items-center gap-1 px-2.5 py-1.5 rounded-full"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
      >
        <ChevronLeft size={10} className="text-white/60" />
        <span className="text-[9px] text-white/60 font-bold">החלק</span>
        <ChevronRight size={10} className="text-white/60" />
      </motion.div>
    </div>
  );
};

// ============================================================
// ORDER STATUS CHECK
// ============================================================
const OrderStatusCheck = ({ onClose }: { onClose: () => void }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'notfound'>('idle');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const checkOrder = () => {
    if (!orderNumber) return;
    setStatus('loading');
    setTimeout(() => {
      if (orderNumber.length > 3) {
        setStatus('found');
        setOrderDetails({ id: orderNumber, date: '2024-02-23', package: 'VIP LUXURY', status: 'בתהליך', car: 'מזדה 3 2020' });
      } else {
        setStatus('notfound');
      }
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300 }}
      className="rounded-2xl p-6 space-y-5"
      style={{ background: 'linear-gradient(145deg, #0f0f14, #0a0a0e)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto shadow-xl"
          style={{ background: 'linear-gradient(135deg, #c8102e, #8b0d1e)', boxShadow: '0 12px 30px rgba(200,16,46,0.3)' }}>
          <Search size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-black">בדיקת סטטוס הזמנה</h3>
        <p className="text-white/40 text-xs">הכנס את מספר ההזמנה שקיבלת בוואטסאפ</p>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <input type="text" placeholder="לדוגמה: #12345" value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-center text-base font-black tracking-widest focus:outline-none transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            onFocus={e => { (e.target as HTMLElement).style.borderColor = '#c8102e'; (e.target as HTMLElement).style.background = 'rgba(200,16,46,0.06)'; }}
            onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
          />
          {orderNumber && (
            <button onClick={() => setOrderNumber('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>
        <button onClick={checkOrder} disabled={status === 'loading'}
          className="w-full py-3 rounded-xl font-black text-sm text-white disabled:opacity-50 transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)', boxShadow: '0 8px 24px rgba(200,16,46,0.3)' }}>
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />בודק...
            </span>
          ) : 'בדוק סטטוס'}
        </button>

        <AnimatePresence>
          {status === 'found' && orderDetails && (
            <motion.div initial={{ opacity: 0, scale: 0.96, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 8 }}
              className="p-4 rounded-xl space-y-3"
              style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.2)' }}>
              <div className="flex items-center justify-between">
                <span className="text-green-400 text-xs font-black">סטטוס:</span>
                <span className="px-3 py-0.5 rounded-full text-xs font-black"
                  style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}>
                  {orderDetails.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-white/35">מספר הזמנה:</span><div className="font-black text-white">#{orderDetails.id}</div></div>
                <div><span className="text-white/35">תאריך:</span><div className="font-black text-white">{orderDetails.date}</div></div>
                <div><span className="text-white/35">חבילה:</span><div className="font-black text-white">{orderDetails.package}</div></div>
                <div><span className="text-white/35">רכב:</span><div className="font-black text-white">{orderDetails.car}</div></div>
              </div>
            </motion.div>
          )}
          {status === 'notfound' && (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="p-4 rounded-xl text-center"
              style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <X size={22} className="text-red-400 mx-auto mb-1" />
              <p className="text-red-400 font-black text-sm">ההזמנה לא נמצאה</p>
              <p className="text-white/35 text-xs mt-1">בדוק את המספר ונסה שנית</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button onClick={onClose}
        className="w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-white/6 flex items-center justify-center gap-2"
        style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
        <ArrowLeft size={12} />חזור לדף הבית
      </button>
    </motion.div>
  );
};

// ============================================================
// CHANGE PACKAGE MODAL
// ============================================================
const ChangePackageModal = ({
  isOpen, onClose, currentPackageId, packages, vipPackage, duoPackage,
  equipmentPackages, businessPackage, transportPackage, onSelect, lang
}: {
  isOpen: boolean; onClose: () => void; currentPackageId: string; packages: Package[];
  vipPackage: Package; duoPackage: Package; equipmentPackages: Package[];
  businessPackage: Package; transportPackage: Package; onSelect: (p: Package) => void; lang: Language;
}) => {
  const allPackages = [...packages, vipPackage, duoPackage, ...equipmentPackages, transportPackage, businessPackage];

  const getPackageStyle = (pkg: Package) => {
    if (pkg.id === 'vip') return { color: '#d4af37', badge: '👑' };
    if (pkg.id === 'duo') return { color: '#8b5cf6', badge: '🚗🚗' };
    if (pkg.id === 'business') return { color: '#3b82f6', badge: '🏢' };
    if (pkg.id === 'equipment-heavy') return { color: '#ea580c', badge: '🚜' };
    if (pkg.id === 'equipment-light') return { color: '#94a3b8', badge: '🔧' };
    if (pkg.id === 'transport') return { color: '#0ea5e9', badge: '🚌' };
    if (pkg.id === 'premium') return { color: '#c8102e', badge: '💎' };
    if (pkg.id === 'pro') return { color: '#c8102e', badge: '🔥' };
    return { color: '#94a3b8', badge: '🚀' };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }} onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{ background: 'linear-gradient(145deg, #101014 0%, #0a0a0e 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.9)' }}
          >
            <div className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between"
              style={{ background: 'rgba(10,10,14,0.97)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.2)' }}>
                  <RefreshCw size={14} style={{ color: '#c8102e' }} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">החלפת חבילה</h3>
                  <p className="text-[10px] text-white/35 mt-0.5">בחר חבילה אחרת</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 hover:bg-white/6 rounded-lg transition-colors">
                <X size={16} className="text-white/40" />
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allPackages.map((pkg) => {
                const style = getPackageStyle(pkg);
                const isActive = pkg.id === currentPackageId;
                return (
                  <button key={pkg.id} onClick={() => { onSelect(pkg); onClose(); }}
                    className="flex items-center gap-3 p-3.5 rounded-xl text-right transition-all hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      border: `1.5px solid ${isActive ? style.color + '60' : 'rgba(255,255,255,0.07)'}`,
                      background: isActive ? `${style.color}0a` : 'rgba(255,255,255,0.02)',
                    }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                      style={{ background: `${style.color}12`, border: `1px solid ${style.color}25` }}>
                      {style.badge}
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {isActive && <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-white/8 text-white/50">נוכחית</span>}
                        <span className="text-sm font-black" style={{ color: isActive ? style.color : 'white' }}>{pkg.name}</span>
                      </div>
                      <p className="text-[9px] text-white/35 mt-0.5 truncate">{pkg.features[0] || ''}</p>
                    </div>
                    <div className="text-base font-black shrink-0" style={{ color: isActive ? style.color : 'white' }}>{pkg.price}</div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// CAR DETAILS FORM
// ============================================================
const CarDetailsForm = ({ formData, setFormData, onNext, selectedPackage, onChangePackage }: {
  formData: any; setFormData: (data: any) => void; onNext: () => void;
  selectedPackage: Package | null; onChangePackage: () => void;
}) => {
  const isDuo = selectedPackage?.id === 'duo';
  const isBusiness = selectedPackage?.id === 'business';
  const isTransport = selectedPackage?.id === 'transport';

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: '10px',
    padding: '10px 12px',
    color: 'white',
    width: '100%',
    fontSize: '14px',
  };

  const labelStyle = "text-[11px] font-bold text-white/40 uppercase tracking-wider";

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      transition={{ type: 'spring', stiffness: 300 }} className="space-y-5">

      {/* Selected package chip */}
      <div className="flex items-center justify-between p-3 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.15)' }}>
            {selectedPackage?.id === 'vip' ? <Crown size={14} style={{ color: '#d4af37' }} /> :
             selectedPackage?.id === 'duo' ? <Car size={14} className="text-purple-400" /> :
             selectedPackage?.id === 'business' ? <Building2 size={14} className="text-blue-400" /> :
             selectedPackage?.id === 'transport' ? <Bus size={14} className="text-sky-400" /> :
             <Car size={14} style={{ color: '#c8102e' }} />}
          </div>
          <div>
            <div className="text-[9px] text-white/35">חבילה נבחרת</div>
            <div className="text-xs font-black text-white">{selectedPackage?.name}</div>
          </div>
        </div>
        <button onClick={onChangePackage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-bold text-white/40 hover:text-white/70 transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
          <RefreshCw size={10} />החלף
        </button>
      </div>

      {isBusiness ? (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', boxShadow: '0 12px 28px rgba(59,130,246,0.25)' }}>
              <Building2 size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-black">פרטי הסוכנות</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'שם הסוכנות *', field: 'agencyName', placeholder: 'סוכנות הרכב שלי' },
              { label: 'שם איש קשר *', field: 'fullName', placeholder: 'ישראל ישראלי' },
              { label: 'טלפון *', field: 'phone', placeholder: '050-1234567', type: 'tel' },
              { label: 'מיקום *', field: 'location', placeholder: 'תל אביב' },
              { label: 'כמות רכבים בחודש *', field: 'monthlyCars', placeholder: '10-20 רכבים' },
            ].map(f => (
              <div key={f.field} className="space-y-1">
                <label className={labelStyle}>{f.label}</label>
                <input type={f.type || 'text'} placeholder={f.placeholder}
                  value={(formData as any)[f.field] || ''}
                  onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = '#3b82f6'; (e.target as HTMLElement).style.background = 'rgba(59,130,246,0.06)'; }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                />
              </div>
            ))}
            <div className="space-y-1 md:col-span-2">
              <label className={labelStyle}>פרטים נוספים</label>
              <textarea placeholder="ספר לנו על הסוכנות שלך..." value={formData.agencyDetails || ''}
                onChange={(e) => setFormData({ ...formData, agencyDetails: e.target.value })}
                rows={3}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => { (e.target as HTMLElement).style.borderColor = '#3b82f6'; (e.target as HTMLElement).style.background = 'rgba(59,130,246,0.06)'; }}
                onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
              />
            </div>
          </div>
        </div>
      ) : isDuo ? (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', boxShadow: '0 12px 28px rgba(139,92,246,0.25)' }}>
              <Car size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-black">פרטי שני הרכבים</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'שם מלא *', field: 'fullName', placeholder: 'ישראל ישראלי' },
              { label: 'טלפון *', field: 'phone', placeholder: '050-1234567', type: 'tel' },
              { label: 'מיקום *', field: 'location', placeholder: 'תל אביב', colSpan: true },
            ].map(f => (
              <div key={f.field} className={`space-y-1 ${f.colSpan ? 'md:col-span-2' : ''}`}>
                <label className={labelStyle}>{f.label}</label>
                <input type={f.type || 'text'} placeholder={f.placeholder}
                  value={(formData as any)[f.field] || ''}
                  onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = '#8b5cf6'; (e.target as HTMLElement).style.background = 'rgba(139,92,246,0.06)'; }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                />
              </div>
            ))}
          </div>
          {[1, 2].map(carNum => (
            <div key={carNum} className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(139,92,246,0.2)' }}>
              <div className="px-4 py-2.5 flex items-center gap-2"
                style={{ background: 'rgba(139,92,246,0.06)', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                  <span className="text-[9px] font-black text-purple-400">{carNum}</span>
                </div>
                <span className="text-xs font-bold text-purple-300">רכב {carNum === 1 ? 'ראשון' : 'שני'}</span>
              </div>
              <div className="p-4 grid md:grid-cols-2 gap-3">
                {[
                  { label: 'דגם', placeholder: carNum === 1 ? 'מאזדה 3' : 'טויוטה קורולה', field: carNum === 1 ? 'model' : 'model2' },
                  { label: 'שנה', placeholder: carNum === 1 ? '2020' : '2019', field: carNum === 1 ? 'year' : 'year2' },
                  { label: "קילומטראז'", placeholder: carNum === 1 ? '50,000' : '70,000', field: carNum === 1 ? 'mileage' : 'mileage2' },
                  { label: 'מחיר', placeholder: carNum === 1 ? '89,000 ₪' : '65,000 ₪', field: carNum === 1 ? 'price' : 'price2' },
                  { label: 'עלייה לכביש', placeholder: carNum === 1 ? '2020' : '2019', field: carNum === 1 ? 'registration' : 'registration2' },
                  { label: 'טסט עד', placeholder: carNum === 1 ? '12/2025' : '06/2025', field: carNum === 1 ? 'testUntil' : 'testUntil2' },
                ].map(f => (
                  <div key={f.field} className="space-y-1">
                    <label className={labelStyle}>{f.label} *</label>
                    <input type="text" placeholder={f.placeholder} value={(formData as any)[f.field] || ''}
                      onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })}
                      style={inputStyle}
                      onFocus={e => { (e.target as HTMLElement).style.borderColor = '#8b5cf6'; (e.target as HTMLElement).style.background = 'rgba(139,92,246,0.06)'; }}
                      onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : isTransport ? (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto"
              style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', boxShadow: '0 12px 28px rgba(14,165,233,0.25)' }}>
              <Bus size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-black">פרטי כלי הרכב המסחרי</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'סוג הרכב', placeholder: 'אוטובוס / מיניבוס / וואן', field: 'model' },
              { label: 'שנת ייצור', placeholder: '2018', field: 'year' },
              { label: "קילומטראז'", placeholder: '250,000', field: 'mileage' },
              { label: 'מחיר מבוקש', placeholder: '180,000 ₪', field: 'price' },
              { label: 'מספר מושבים', placeholder: '50 / 25 / 9', field: 'seats' },
              { label: 'טסט עד', placeholder: '06/2026', field: 'testUntil' },
              { label: 'שם מלא', placeholder: 'ישראל ישראלי', field: 'fullName' },
              { label: 'טלפון', placeholder: '050-1234567', field: 'phone', type: 'tel' },
              { label: 'מיקום', placeholder: 'תל אביב', field: 'location' },
            ].map(f => (
              <div key={f.field} className="space-y-1">
                <label className={labelStyle}>{f.label} *</label>
                <input type={f.type || 'text'} placeholder={f.placeholder} value={(formData as any)[f.field] || ''}
                  onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = '#0ea5e9'; (e.target as HTMLElement).style.background = 'rgba(14,165,233,0.06)'; }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto"
              style={{ background: 'linear-gradient(135deg, #c8102e, #8b0d1e)', boxShadow: '0 12px 28px rgba(200,16,46,0.25)' }}>
              {selectedPackage?.id && ['equipment-heavy','equipment-light'].includes(selectedPackage.id)
                ? <Wrench size={24} className="text-white" />
                : <Car size={24} className="text-white" />}
            </div>
            <h3 className="text-xl font-black">
              {selectedPackage?.id && ['equipment-heavy','equipment-light'].includes(selectedPackage.id)
                ? 'פרטי הציוד' : 'פרטי הרכב'}
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'שם מלא *', field: 'fullName', placeholder: 'ישראל ישראלי' },
              { label: 'טלפון *', field: 'phone', placeholder: '050-1234567', type: 'tel' },
              { label: 'דגם / סוג *', field: 'model', placeholder: 'מאזדה 3 / מחפרון קטרפילר' },
              { label: 'שנה *', field: 'year', placeholder: '2020' },
              { label: "קילומטראז' *", field: 'mileage', placeholder: '50,000' },
              { label: 'מחיר מבוקש *', field: 'price', placeholder: '89,000 ₪' },
              { label: 'עלייה לכביש', field: 'registration', placeholder: '2020' },
              { label: 'טסט עד', field: 'testUntil', placeholder: '12/2025' },
              { label: 'מיקום *', field: 'location', placeholder: 'תל אביב', colSpan: true },
            ].map(f => (
              <div key={f.field} className={`space-y-1 ${(f as any).colSpan ? 'md:col-span-2' : ''}`}>
                <label className={labelStyle}>{f.label}</label>
                <input type={f.type || 'text'} placeholder={f.placeholder} value={(formData as any)[f.field] || ''}
                  onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })}
                  style={inputStyle}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = '#c8102e'; (e.target as HTMLElement).style.background = 'rgba(200,16,46,0.06)'; }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={onNext}
        className="w-full py-3 rounded-xl font-black text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
        style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)', boxShadow: '0 8px 24px rgba(200,16,46,0.3)' }}>
        <span className="flex items-center justify-center gap-2">המשך לתשלום <ChevronRight size={16} /></span>
      </button>
    </motion.div>
  );
};

// ============================================================
// PAYMENT FORM
// ============================================================
const PaymentForm = ({ formData, setFormData, selectedPackage, onSubmit, loading, onBack, onChangePackage }: {
  formData: any; setFormData: (data: any) => void; selectedPackage: Package | null;
  onSubmit: () => void; loading: boolean; onBack: () => void; onChangePackage: () => void;
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'bit' | 'paybox' | null>(null);
  const isBusiness = selectedPackage?.id === 'business';
  const isDuo = selectedPackage?.id === 'duo';
  const isTransport = selectedPackage?.id === 'transport';
  const accentColor = isBusiness ? '#3b82f6' : isDuo ? '#8b5cf6' : isTransport ? '#0ea5e9' : '#c8102e';

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', stiffness: 300 }} className="space-y-5">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`, boxShadow: `0 12px 28px ${accentColor}30` }}>
          <CreditCard size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-black">תשלום ואישור</h3>
        <p className="text-white/40 text-xs">בחר אמצעי תשלום והעלה אישור העברה</p>
      </div>

      <div className="p-3 rounded-xl flex items-center justify-between"
        style={{ background: `${accentColor}08`, border: `1px solid ${accentColor}20` }}>
        <div>
          <div className="text-xs flex items-center gap-2">
            <span className="text-white/40">חבילה:</span>
            <span className="font-black" style={{ color: accentColor }}>{selectedPackage?.name}</span>
          </div>
          <div className="text-xs flex items-center gap-2 mt-0.5">
            <span className="text-white/40">מחיר:</span>
            <span className="font-black text-white text-base">{selectedPackage?.price}</span>
          </div>
        </div>
        <button onClick={onChangePackage}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all hover:bg-white/6"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <RefreshCw size={12} style={{ color: accentColor }} />
          <span className="text-[8px] font-bold text-white/35">החלף</span>
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-bold text-white/40 uppercase tracking-wider">אמצעי תשלום *</label>
        <div className="grid grid-cols-2 gap-2">
          {(['bit', 'paybox'] as const).map((method) => (
            <button key={method} type="button" onClick={() => setPaymentMethod(method)}
              className="p-3 rounded-xl transition-all hover:opacity-90 active:scale-[0.97]"
              style={{
                border: paymentMethod === method
                  ? `1.5px solid ${method === 'bit' ? '#00E5CC' : '#29ABE2'}`
                  : '1px solid rgba(255,255,255,0.09)',
                background: paymentMethod === method
                  ? `${method === 'bit' ? '#00E5CC' : '#29ABE2'}10`
                  : 'rgba(255,255,255,0.03)',
              }}>
              <div className="flex justify-center">
                {method === 'bit' ? <BitLogo size="md" /> : <PayBoxLogo size="md" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {paymentMethod && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl space-y-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-center">
              <p className="text-white/40 text-xs">העבר את הסכום למספר:</p>
              <p className="text-2xl font-black tracking-wider text-white mt-1">054-6980606</p>
            </div>
            <button onClick={() => navigator.clipboard.writeText('0546980606')}
              className="w-full py-2 rounded-lg text-xs font-bold hover:bg-white/6 transition-all flex items-center justify-center gap-2 text-white/50"
              style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
              <FileText size={12} />העתק מספר
            </button>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-wider">העלה צילום מסך *</label>
              <div className="relative">
                <input type="file" accept="image/*" required
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files[0]) {
                      const reader = new FileReader();
                      reader.onloadend = () => { setFormData({ ...formData, paymentProof: reader.result }); };
                      reader.readAsDataURL(files[0]);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <div className={`rounded-xl border-2 border-dashed py-5 px-3 flex flex-col items-center gap-1.5 transition-colors ${formData.paymentProof ? 'border-green-500/40' : 'border-white/10'}`}
                  style={{ background: formData.paymentProof ? 'rgba(74,222,128,0.04)' : 'rgba(255,255,255,0.02)' }}>
                  {formData.paymentProof ? (
                    <>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(74,222,128,0.15)' }}>
                        <Check size={16} className="text-green-400" />
                      </div>
                      <span className="text-xs font-bold text-green-400">הקובץ הועלה בהצלחה</span>
                    </>
                  ) : (
                    <>
                      <Upload size={18} className="text-white/30" />
                      <span className="text-xs font-bold text-white/50">לחץ להעלאת צילום מסך</span>
                      <span className="text-[9px] text-white/25">PNG, JPG</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <button onClick={onBack}
          className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/6"
          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
          <ArrowLeft size={14} />חזור
        </button>
        <button onClick={onSubmit} disabled={!paymentMethod || !formData.paymentProof || loading}
          className="flex-1 py-2.5 rounded-xl font-black text-sm text-white transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`, boxShadow: `0 8px 24px ${accentColor}30` }}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />שולח...
            </span>
          ) : 'שלח הזמנה'}
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================
// SECTION HEADER
// ============================================================
const SectionHeader = ({ eyebrow, eyebrowIcon, eyebrowColor, title, titleHighlight, highlightColor, subtitle, stats }: {
  eyebrow: string; eyebrowIcon: React.ReactNode; eyebrowColor: string;
  title: string; titleHighlight: string; highlightColor: string;
  subtitle: string; stats: { value: string; label: string; color: string }[];
}) => (
  <div className="text-center space-y-5">
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider"
      style={{ background: `${eyebrowColor}10`, border: `1px solid ${eyebrowColor}22`, color: eyebrowColor }}>
      {eyebrowIcon}{eyebrow}
    </motion.div>
    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: 0.08 }} className="text-2xl md:text-3xl font-black">
      {title}{' '}<span style={{ color: highlightColor }}>{titleHighlight}</span>
    </motion.h2>
    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      transition={{ delay: 0.15 }} className="text-white/40 text-sm max-w-xl mx-auto">
      {subtitle}
    </motion.p>
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay: 0.22 }} className="flex flex-wrap items-center justify-center gap-6 pt-2">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
          <div className="text-[10px] text-white/30 font-bold tracking-wider">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  </div>
);

// ============================================================
// MAIN APP
// ============================================================
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
  const [showChangePackage, setShowChangePackage] = useState(false);
  const [siteSettings, setSiteSettings] = useState<any>({
    followers_count: '50K+',
    whatsapp_number: '972546980606',
    hero_title_he: 'מוכרים רכב? אנחנו מוכרים אותו מהר יותר.',
    positioning_line_he: 'הפרסום שמוכר רכבים – לא רק מציג אותם.'
  });

  const t = translations[lang];

  useEffect(() => {
    fetch('/api/settings').then(res => res.json()).then(data => setSiteSettings(data)).catch(() => {});
  }, []);

  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, bookingStep]);

  const packages: Package[] = [
    { id: 'basic', name: t.basic, price: '₪149', features: [t.features.images2, t.features.post1, t.features.story7, t.features.exposureBasic] },
    { id: 'pro', name: t.pro, price: '₪249', popular: true, features: [t.features.images4, t.features.postPro, t.features.story14, t.features.priorityPro, t.features.exposurePro] },
    { id: 'premium', name: t.premium, price: '₪449', premium: true, features: [t.features.imagesPremium, t.features.postPremium, t.features.story30, t.features.priorityFull, t.features.exposureMax, t.features.guidance, t.features.video] },
  ];

  const vipPackage: Package = { id: 'vip', name: 'VIP LUXURY', price: '₪749', vip: true, features: ['15+ תמונות מקצועיות', 'רילס + סטורי VIP', '60 ימי פרסום פרמיום', 'חשיפה מקסימלית', 'ליווי אישי 24/7', 'עיצוב VIP בלעדי', 'טרגוט מתקדם', 'עדיפות ראשונה תמיד'] };
  const duoPackage: Package = { id: 'duo', name: 'DUO DEAL', price: '₪349', features: ['פרסום 2 רכבים במחיר מיוחד', '4 תמונות לכל רכב', 'פוסט נפרד לכל רכב', 'סטורי 14 יום לכל אחד', 'חשיפה כפולה', 'חיסכון של 40%'] };
  const businessPackage: Package = { id: 'business', name: 'BUSINESS', price: '₪1,499', business: true, features: ['עד 50 רכבים בחודש', 'מנהל לקוח ייעודי', 'דוחות ביצועים חודשיים', 'קידום ממומן', 'עיצוב מקצועי לכל מודעה'] };
  const transportPackage: Package = { id: 'transport', name: 'תחבורה והסעות', price: '₪299', features: ['10 תמונות מקצועיות', 'פוסט עם מפרט טכני מלא', 'סטורי 21 ימים', 'חשיפה לחברות הסעות', 'טרגוט מדויק', 'ייעוץ תמחור מקצועי'] };
  const equipmentPackages: Package[] = [
    { id: 'equipment-heavy', name: 'חבילת ציוד כבד', price: '₪349', equipment: true, features: ['10 תמונות מקצועיות', 'פוסט עם מפרט טכני', 'סטורי 21 יום', 'חשיפה לקהל קבלנים', 'עדיפות בחיפוש', 'ייעוץ תמחור'] },
    { id: 'equipment-light', name: 'חבילת ציוד קל', price: '₪199', equipment: true, features: ['6 תמונות מקצועיות', 'פוסט מותאם לציוד קל', 'סטורי 14 יום', 'חשיפה לקהל מקצועי', 'תיאור טכני מפורט', 'תמיכה WhatsApp'] },
  ];

  const handleSelectPackage = (p: Package) => { setSelectedPackage(p); setView('booking'); setBookingStep(1); };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: adminPassword }) });
      if (res.ok) { setIsAdmin(true); setView('admin-dashboard'); fetchOrders(); }
      else { alert('סיסמה שגויה'); }
    } catch { alert('שגיאת חיבור'); }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
    } catch { console.error('Failed to fetch orders'); }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/orders/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      fetchOrders();
    } catch { console.error('Failed to update order status'); }
  };

  const [formData, setFormData] = useState({
    fullName: '', phone: '', model: '', year: '', mileage: '', price: '', registration: '',
    testUntil: '', location: '', paymentProof: '', carImages: [] as string[], model2: '',
    year2: '', mileage2: '', price2: '', registration2: '', testUntil2: '',
    agencyName: '', monthlyCars: '', agencyDetails: '', seats: ''
  });

  const handleSubmitOrder = async () => {
    setLoading(true);
    try {
      const pkgId = selectedPackage?.id || '';
      const pkgEmoji = pkgId === 'vip' ? '👑' : pkgId === 'premium' ? '💎' : pkgId === 'pro' ? '⭐' : pkgId.includes('equipment') ? '🚜' : pkgId === 'business' ? '🏢' : pkgId === 'duo' ? '🚗🚗' : pkgId === 'transport' ? '🚌' : '✅';
      const orderNum = String(Math.floor(10000 + Math.random() * 90000));
      const message = `*YOUGO ISRAEL | אישור הזמנה חדשה* 🚗💨\n---------------------------------------\n*מספר הזמנה:* #${orderNum}\n*חבילה נבחרת:* ${selectedPackage?.name} ${pkgEmoji}\n---------------------------------------\n\n👤 *פרטי לקוח:*\n• שם מלא: ${formData.fullName}\n• טלפון: ${formData.phone}\n\n🚘 *פרטי רכב:*\n• דגם: ${formData.model}\n• שנה: ${formData.year}\n• קילומטראז': ${formData.mileage}\n• מחיר מבוקש: ${formData.price}\n• מיקום: ${formData.location}\n\n---------------------------------------\n✅ *אישור תשלום הועלה בהצלחה.*\n📸 *נא לשלוח כאן את תמונות הרכב!*\n---------------------------------------`;
      window.open(`https://wa.me/${siteSettings.whatsapp_number}?text=${encodeURIComponent(message)}`, '_blank');
      setOrderId(orderNum);
      setView('success');
    } catch {
      alert('אירעה שגיאה. אנא נסה שנית.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white" dir="rtl" style={{ background: '#06060a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }
        body { font-family: 'Heebo', -apple-system, BlinkMacSystemFont, sans-serif; }

        :root { --red: #c8102e; --red-dark: #a50d25; }

        ::selection { background: rgba(200,16,46,0.3); color: white; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,16,46,0.4); border-radius: 4px; }

        /* Noise overlay */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 0;
        }

        /* Input autofill */
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 1000px rgba(6,6,10,0.99) inset; -webkit-text-fill-color: white; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes glow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
      `}</style>

      <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin}
        onLogout={() => { setIsAdmin(false); setView('home'); }}
        siteSettings={siteSettings} setView={setView} />

      <main className="pt-24 px-4 max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
              className="space-y-28">

              {/* HERO */}
              <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-24">
                {/* Background layers */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 55% 15%, rgba(200,16,46,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 5% 85%, rgba(200,16,46,0.06) 0%, transparent 55%), #06060a' }} />
                  {/* Dot grid */}
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '36px 36px', maskImage: 'radial-gradient(ellipse 85% 65% at 50% 40%, black 30%, transparent 80%)' }} />
                  {/* Vignette */}
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, #06060a 100%)' }} />
                  <div className="absolute bottom-0 inset-x-0 h-48" style={{ background: 'linear-gradient(to bottom, transparent, #06060a)' }} />
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-5 pt-36 pb-20 flex flex-col items-center text-center">
                  {/* Eyebrow */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
                    style={{ background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.22)', backdropFilter: 'blur(8px)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#c8102e' }} />
                    <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/65">הדרך המהירה ביותר למכור רכב</span>
                  </motion.div>

                  {/* H1 */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
                    className="font-black leading-[1.04] tracking-tight mb-6"
                    style={{ fontSize: 'clamp(2.8rem, 9vw, 6rem)' }}>
                    <span className="text-white">מוכרים רכב?</span>
                    <br />
                    <span style={{ background: 'linear-gradient(135deg, #ff3d5e 0%, #c8102e 55%, #8b0d1e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      אנחנו מוכרים אותו מהר יותר.
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
                    className="text-base md:text-lg leading-relaxed mb-10 max-w-lg"
                    style={{ color: 'rgba(255,255,255,0.42)' }}>
                    YOUGO ISRAEL — פלטפורמת השיווק המובילה באינסטגרם למכירת רכבים.
                  </motion.p>

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
                    className="flex flex-col sm:flex-row items-center gap-3 mb-12 w-full justify-center">
                    <button
                      onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group relative flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-[15px] text-white w-full sm:w-auto justify-center overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.97]"
                      style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)', boxShadow: '0 8px 30px rgba(200,16,46,0.35)' }}>
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Sparkles size={17} />
                      <span className="relative">התחל הזמנה</span>
                    </button>
                    <button
                      onClick={() => setView('check-status')}
                      className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-[15px] w-full sm:w-auto justify-center transition-all hover:bg-white/6 active:scale-[0.97]"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                      <Search size={17} />בדוק סטטוס
                    </button>
                  </motion.div>

                  {/* Trust badges */}
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.32 }}
                    className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
                    {[
                      { icon: <ShieldCheck size={13} />, label: 'תשלום מאובטח', c: '#22c55e' },
                      { icon: <Clock size={13} />, label: 'פרסום תוך 24 שעות', c: '#60a5fa' },
                      { icon: <Users size={13} />, label: '50K+ עוקבים', c: '#c8102e' },
                    ].map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span style={{ color: b.c }}>{b.icon}</span>
                        <span className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.42)' }}>{b.label}</span>
                        {i < 2 && <span className="w-px h-3 mx-1 hidden sm:block" style={{ background: 'rgba(255,255,255,0.1)' }} />}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* HOW IT WORKS */}
              <section id="how-it-works" className="space-y-12">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider"
                    style={{ background: 'rgba(200,16,46,0.08)', border: '1px solid rgba(200,16,46,0.2)', color: '#c8102e' }}>
                    <Zap size={12} />איך זה עובד
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black">{t.howItWorks.title}</h2>
                  <p className="text-white/40 text-sm max-w-xl mx-auto">תהליך פשוט, מהיר ומקצועי</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {t.howItWorks.steps.map((step: any, i: number) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative p-6 rounded-2xl"
                      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                      <div className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: i === 0 ? 'linear-gradient(90deg, transparent, #c8102e50, transparent)' : i === 1 ? 'linear-gradient(90deg, transparent, rgba(200,16,46,0.35), transparent)' : 'linear-gradient(90deg, transparent, rgba(200,16,46,0.25), transparent)' }} />
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
                          style={{ background: 'linear-gradient(135deg, #c8102e, #8b0d1e)', boxShadow: '0 6px 16px rgba(200,16,46,0.3)', color: 'white' }}>
                          {i + 1}
                        </div>
                        <h3 className="text-base font-black text-white">{step.title}</h3>
                      </div>
                      <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* PACKAGES */}
              <section id="packages" className="space-y-20">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
                    style={{ background: 'linear-gradient(135deg, rgba(200,16,46,0.1), rgba(200,16,46,0.04))', border: '1px solid rgba(200,16,46,0.22)', backdropFilter: 'blur(8px)' }}>
                    <Sparkles size={13} style={{ color: '#c8102e' }} />
                    <span className="text-xs font-black tracking-[0.18em] uppercase" style={{ color: '#c8102e' }}>חבילות הפרסום שלנו</span>
                    <Sparkles size={13} style={{ color: '#c8102e' }} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">חבילות הפרסום שלנו</h2>
                  <p className="text-white/40 text-sm max-w-xl mx-auto">בחר את המסלול המתאים ביותר עבורך</p>
                  <div className="mx-auto h-px w-28" style={{ background: 'linear-gradient(90deg, transparent, #c8102e, transparent)' }} />
                </motion.div>

                {/* Regular packages */}
                <div className="space-y-8">
                  <SectionHeader
                    eyebrow="רכב פרטי" eyebrowIcon={<Car size={12} />} eyebrowColor="#60a5fa"
                    title="מוכרים" titleHighlight="רכב פרטי?" highlightColor="#c8102e"
                    subtitle="שלוש חבילות מדורגות לכל תקציב ומטרה."
                    stats={[
                      { value: '₪149', label: 'מחבילה', color: '#94a3b8' },
                      { value: '1,000+', label: 'מכירות', color: '#c8102e' },
                      { value: '7-30', label: 'ימי פרסום', color: '#4ade80' },
                    ]}
                  />
                  <div className="hidden md:grid grid-cols-3 gap-5">
                    {packages.map(pkg => (
                      <div key={pkg.id} className="h-[510px]">
                        <PackageCard pkg={pkg} lang={lang} onSelect={handleSelectPackage} />
                      </div>
                    ))}
                  </div>
                  <div className="md:hidden px-2">
                    <MobileSwiper cardHeight={510}>
                      {packages.map(pkg => (
                        <PackageCard key={pkg.id} pkg={pkg} lang={lang} onSelect={handleSelectPackage} />
                      ))}
                    </MobileSwiper>
                  </div>
                </div>

                {/* VIP + DUO */}
                <div className="space-y-8">
                  <SectionHeader
                    eyebrow="פרימיום VIP" eyebrowIcon={<Crown size={12} />} eyebrowColor="#d4af37"
                    title="מחפשים" titleHighlight="יחס VIP?" highlightColor="#d4af37"
                    subtitle="לרכבי יוקרה וכאלה שמוכרים שני רכבים בבת אחת."
                    stats={[
                      { value: '60 יום', label: 'פרסום VIP', color: '#d4af37' },
                      { value: '40%', label: 'חיסכון DUO', color: '#8b5cf6' },
                      { value: '24/7', label: 'ליווי אישי', color: '#4ade80' },
                    ]}
                  />
                  <div className="hidden md:grid grid-cols-2 gap-6">
                    <div className="h-[450px]"><VIPPackageCard pkg={vipPackage} onSelect={handleSelectPackage} /></div>
                    <div className="h-[450px]"><DuoDealPackageCard pkg={duoPackage} onSelect={handleSelectPackage} /></div>
                  </div>
                  <div className="md:hidden px-2">
                    <MobileSwiper cardHeight={450}>
                      <div style={{ height: '450px' }}><VIPPackageCard pkg={vipPackage} onSelect={handleSelectPackage} /></div>
                      <div style={{ height: '450px' }}><DuoDealPackageCard pkg={duoPackage} onSelect={handleSelectPackage} /></div>
                    </MobileSwiper>
                  </div>
                </div>

                {/* Business */}
                <div className="max-w-2xl mx-auto space-y-8">
                  <SectionHeader
                    eyebrow="לסוכנויות ועסקים" eyebrowIcon={<Building2 size={12} />} eyebrowColor="#3b82f6"
                    title="פתרון מקצועי" titleHighlight="לסוכנים?" highlightColor="#3b82f6"
                    subtitle="חבילה עסקית מקיפה לסוכנויות רכב."
                    stats={[
                      { value: '50', label: 'רכבים/חודש', color: '#3b82f6' },
                      { value: '40%', label: 'הנחה', color: '#4ade80' },
                      { value: '2h', label: 'זמן תגובה', color: '#a78bfa' },
                    ]}
                  />
                  <div className="h-[370px]"><BusinessPackageCard pkg={businessPackage} onSelect={handleSelectPackage} /></div>
                </div>

                {/* Equipment + Transport */}
                <div className="space-y-8">
                  <SectionHeader
                    eyebrow="ציוד מקצועי ותחבורה" eyebrowIcon={<Truck size={12} />} eyebrowColor="#ea580c"
                    title="מוכרים" titleHighlight="ציוד מקצועי?" highlightColor="#ea580c"
                    subtitle="חבילות ייחודיות לציוד כבד, ציוד קל, ורכבים מסחריים."
                    stats={[
                      { value: '85%', label: 'נמכרו תוך 14 יום', color: '#ea580c' },
                      { value: '500+', label: 'ציודים פורסמו', color: '#0ea5e9' },
                      { value: '3', label: 'קטגוריות', color: '#4ade80' },
                    ]}
                  />
                  <div className="hidden md:grid grid-cols-3 gap-5">
                    {equipmentPackages.map(pkg => (
                      <div key={pkg.id} className="h-[430px]"><EquipmentPackageCard pkg={pkg} onSelect={handleSelectPackage} /></div>
                    ))}
                    <div className="h-[430px]"><TransportPackageCard pkg={transportPackage} onSelect={handleSelectPackage} /></div>
                  </div>
                  <div className="md:hidden px-2">
                    <MobileSwiper cardHeight={430}>
                      {equipmentPackages.map(pkg => (
                        <div key={pkg.id} style={{ height: '430px' }}><EquipmentPackageCard pkg={pkg} onSelect={handleSelectPackage} /></div>
                      ))}
                      <div style={{ height: '430px' }}><TransportPackageCard pkg={transportPackage} onSelect={handleSelectPackage} /></div>
                    </MobileSwiper>
                  </div>
                </div>
              </section>

              {/* WHY US */}
              <section id="why-us" className="space-y-10">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-3">
                  <h2 className="text-3xl md:text-4xl font-black">{t.whyUs.title}</h2>
                  <p className="text-white/40 text-sm max-w-xl mx-auto">הסיבות שאלפי מוכרים בחרו דווקא בנו</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: <Users size={20} className="text-white" />, title: 'קהל איכותי', desc: '50,000+ עוקבים פעילים שמחפשים לקנות רכב', stat: '50K+', statLabel: 'עוקבים', gradA: '#1d4ed8', gradB: '#0ea5e9', glow: 'rgba(59,130,246,0.25)' },
                    { icon: <Zap size={20} className="text-white" />, title: 'מהירות מכירה', desc: 'פרסום חכם שמביא תוצאות מהירות – ממוצע 48 שעות', stat: '48h', statLabel: 'ממוצע מכירה', gradA: '#c8102e', gradB: '#f43f5e', glow: 'rgba(200,16,46,0.28)' },
                    { icon: <TrendingUp size={20} className="text-white" />, title: 'אחוזי הצלחה', desc: '98% מלקוחותינו מרוצים ומוכרים בהצלחה', stat: '98%', statLabel: 'שביעות רצון', gradA: '#16a34a', gradB: '#22c55e', glow: 'rgba(34,197,94,0.25)' },
                  ].map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="relative rounded-2xl overflow-hidden flex flex-col"
                      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: `0 16px 36px -12px ${item.glow}` }}>
                      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${item.gradA}, ${item.gradB})` }} />
                      <div className="p-6 flex flex-col gap-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{ background: `linear-gradient(135deg, ${item.gradA}, ${item.gradB})`, boxShadow: `0 6px 16px ${item.glow}` }}>
                            {item.icon}
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-black" style={{ color: item.gradB }}>{item.stat}</div>
                            <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider">{item.statLabel}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-black text-white mb-1.5">{item.title}</h3>
                          <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" className="max-w-3xl mx-auto space-y-8">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-3">
                  <h2 className="text-3xl md:text-4xl font-black">{t.faqTitle}</h2>
                  <p className="text-white/40 text-sm">כל מה שצריך לדעת לפני שמתחילים</p>
                </motion.div>
                <div className="space-y-2">
                  {(showAllFaqs ? t.faqs : t.faqs.slice(0, 5)).map((item: any, i: number) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                      className="rounded-xl overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${activeFaq === i ? 'rgba(200,16,46,0.3)' : 'rgba(255,255,255,0.07)'}`, transition: 'border-color 0.2s' }}>
                      <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right hover:bg-white/3 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: activeFaq === i ? 'rgba(200,16,46,0.15)' : 'rgba(255,255,255,0.06)', transition: 'background 0.2s' }}>
                            <span className="text-[11px] font-black" style={{ color: activeFaq === i ? '#c8102e' : 'rgba(255,255,255,0.35)' }}>{i + 1}</span>
                          </div>
                          <span className="font-bold text-sm text-right">{item.q}</span>
                        </div>
                        <div style={{ color: activeFaq === i ? '#c8102e' : 'rgba(255,255,255,0.25)', transition: 'color 0.2s', flexShrink: 0 }}>
                          {activeFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                            <div className="px-5 pb-4 pr-16 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-3">{item.a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                {!showAllFaqs && t.faqs.length > 5 && (
                  <div className="text-center">
                    <button onClick={() => setShowAllFaqs(true)}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:bg-white/6"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                      הצג עוד שאלות
                    </button>
                  </div>
                )}
              </section>

              {/* CTA BANNER */}
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between gap-4 p-5 rounded-2xl flex-wrap"
                  style={{ background: 'linear-gradient(135deg, rgba(200,16,46,0.08) 0%, rgba(10,10,15,0.8) 100%)', border: '1px solid rgba(200,16,46,0.18)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.2)' }}>
                      <Zap size={17} style={{ color: '#c8102e' }} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">מוכנים להתחיל?</p>
                      <p className="text-[11px] text-white/35">תהליך מהיר, פשוט ומקצועי</p>
                    </div>
                  </div>
                  <button onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-2.5 rounded-xl font-black text-sm text-white transition-all hover:opacity-90 active:scale-[0.97]"
                    style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)', boxShadow: '0 6px 20px rgba(200,16,46,0.3)' }}>
                    <span className="flex items-center gap-2"><Rocket size={14} />בחר חבילה</span>
                  </button>
                </div>
              </motion.div>

              {/* FOOTER */}
              <footer className="pb-12">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, rgba(200,16,46,0.06) 0%, rgba(8,8,12,0.98) 60%)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,16,46,0.4), transparent)' }} />
                  <div className="p-10 space-y-10">
                    {/* Brand */}
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center gap-3">
                        <div className="p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #c8102e, #8b0d1e)', boxShadow: '0 6px 18px rgba(200,16,46,0.25)' }}>
                          <Car size={22} className="text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-black tracking-tighter">
                            <span style={{ color: '#c8102e' }}>YOUGO</span><span className="text-white"> ISRAEL</span>
                          </div>
                          <div className="text-[9px] text-white/22 tracking-[0.2em] uppercase font-semibold">Digital Car Marketing</div>
                        </div>
                      </div>
                      <p className="text-white/28 text-sm max-w-xs mx-auto">הפלטפורמה המובילה בישראל לפרסום ומכירת רכבים ברשתות חברתיות</p>
                    </div>

                    {/* Social */}
                    <div>
                      <p className="text-center text-[10px] text-white/22 font-bold uppercase tracking-[0.24em] mb-5">עקבו אחרינו</p>
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        {[
                          { href: 'https://instagram.com/yougo.israel', label: 'Instagram', bg: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="white"/></svg> },
                          { href: 'https://facebook.com', label: 'Facebook', bg: 'linear-gradient(135deg, #1877f2, #1a6ee1)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                          { href: 'https://wa.me/972546980606', label: 'WhatsApp', bg: 'linear-gradient(135deg, #25d366, #128c7e)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                          { href: 'https://t.me/yougoisrael', label: 'Telegram', bg: 'linear-gradient(135deg, #0088cc, #006aaa)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                          { href: 'mailto:contact@yougoisrael.com', label: 'Email', bg: 'linear-gradient(135deg, #c8102e, #a00d24)', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                        ].map((s, i) => (
                          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                              style={{ background: s.bg, boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                              {s.icon}
                            </div>
                            <span className="text-[9px] font-bold text-white/25 group-hover:text-white/50 transition-colors">{s.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

                    {/* Footer links */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        { icon: <FileText size={13} />, label: 'תקנון', onClick: () => setModalContent({ title: 'תקנון שימוש – YOUGO ISRAEL', content: `1. כללי\nYOUGO ISRAEL הינה פלטפורמת שיווק דיגיטלי המתמחה בפרסום רכבים.\n\n2. השירות\nהחברה מספקת שירותי פרסום ברשתות חברתיות. החברה אינה צד לעסקת המכירה.\n\n3. תשלום\nהתשלום מבוצע מראש. לאחר אישור התשלום יחל תהליך הפרסום תוך 24-48 שעות.\n\n4. אחריות הלקוח\nהלקוח מצהיר כי כל המידע שמסר הוא נכון ומדויק.` }) },
                        { icon: <Lock size={13} />, label: 'פרטיות', onClick: () => setModalContent({ title: 'מדיניות פרטיות', content: `1. איסוף מידע\nYOUGO ISRAEL אוספת מידע אישי אך ורק לצורך מתן השירות המבוקש.\n\n2. שימוש במידע\nהמידע משמש אך ורק לצורך יצירת המודעה הפרסומית.\n\n3. אבטחת מידע\nהחברה נוקטת בצעדי אבטחה מתקדמים.` }) },
                        { icon: <Info size={13} />, label: 'מי אנחנו', onClick: () => setModalContent({ title: 'אודות YOUGO ISRAEL', content: `YOUGO ISRAEL – פלטפורמת השיווק הדיגיטלי המובילה בישראל למכירת רכבים.\n\nהסיפור שלנו\nYOUGO ISRAEL נוסדה מתוך חזון אחד פשוט: לשנות את הדרך שבה ישראלים מוכרים רכבים.\n\nמה שמבדיל אותנו\n• 50,000+ עוקבים פעילים\n• צוות מקצועי של צלמים ומעצבים\n• 98% שביעות רצון לקוחות` }) },
                        { icon: <LayoutDashboard size={13} />, label: 'ניהול', onClick: () => setView('admin-login') },
                      ].map((link, i) => (
                        <button key={i} onClick={link.onClick}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-white/6"
                          style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                          <span style={{ color: 'rgba(200,16,46,0.6)' }}>{link.icon}</span>
                          {link.label}
                        </button>
                      ))}
                    </div>

                    <div className="text-center">
                      <div className="text-white/12 text-[10px] font-semibold tracking-wider">
                        © {new Date().getFullYear()} YOUGO ISRAEL LTD · כל הזכויות שמורות
                      </div>
                    </div>
                  </div>
                </motion.div>
              </footer>
            </motion.div>
          )}

          {/* BOOKING */}
          {view === 'booking' && (
            <motion.div key="booking" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 220 }} className="max-w-xl mx-auto space-y-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setView('home')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-white/6"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                  <ArrowLeft size={15} />חזרה
                </button>
                <div className="h-4 w-px bg-white/10" />
                <span className="text-xs text-white/30 font-semibold">{selectedPackage?.name}</span>
              </div>

              {/* Steps */}
              <div className="flex items-center justify-center gap-3">
                {[1, 2].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`flex items-center gap-2 transition-colors ${bookingStep >= step ? 'text-white' : 'text-white/25'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border transition-all ${bookingStep >= step ? 'border-[#c8102e] bg-[#c8102e]/15 text-[#c8102e]' : 'border-white/15'}`}>
                        {step}
                      </div>
                      <span className="text-sm font-bold">{step === 1 ? 'פרטי רכב' : 'תשלום'}</span>
                    </div>
                    {step === 1 && (
                      <div className={`w-14 h-px transition-all ${bookingStep >= 2 ? 'bg-[#c8102e]' : 'bg-white/12'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(145deg, #0f0f14, #0a0a0e)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <AnimatePresence mode="wait">
                  {bookingStep === 1 && (
                    <CarDetailsForm key="step1" formData={formData} setFormData={setFormData}
                      onNext={() => setBookingStep(2)} selectedPackage={selectedPackage}
                      onChangePackage={() => setShowChangePackage(true)} />
                  )}
                  {bookingStep === 2 && (
                    <PaymentForm key="step2" formData={formData} setFormData={setFormData}
                      selectedPackage={selectedPackage} onSubmit={handleSubmitOrder} loading={loading}
                      onBack={() => setBookingStep(1)} onChangePackage={() => setShowChangePackage(true)} />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* SUCCESS */}
          {view === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 220 }} className="max-w-md mx-auto text-center space-y-6 py-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, delay: 0.2 }}
                className="w-22 h-22 mx-auto rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 16px 40px rgba(34,197,94,0.3)', width: 88, height: 88 }}>
                <Check size={38} strokeWidth={2.5} className="text-white" />
              </motion.div>
              <div className="space-y-1">
                <h2 className="text-3xl font-black">ההזמנה התקבלה!</h2>
                <p className="text-white/45">מספר הזמנה: <span className="font-black" style={{ color: '#c8102e' }}>#{orderId}</span></p>
              </div>
              <div className="rounded-2xl p-5 space-y-4 text-right"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="font-black text-base">מה קורה עכשיו?</p>
                <div className="space-y-3">
                  {['הודעת וואטסאפ נשלחה למנהל המערכת', 'הצוות שלנו יבדוק את פרטי ההזמנה תוך שעה', 'נחזור אליך עם אישור סופי'].map((text, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-2.5 text-sm">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.25)' }}>
                        <Check size={11} className="text-green-400" />
                      </div>
                      <span className="text-white/70">{text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setView('home')}
                  className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/6"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                  <ArrowLeft size={14} />דף הבית
                </button>
                <button onClick={() => setView('check-status')}
                  className="flex-1 py-3 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)', boxShadow: '0 6px 20px rgba(200,16,46,0.3)' }}>
                  <Search size={14} />בדוק סטטוס
                </button>
              </div>
            </motion.div>
          )}

          {/* CHECK STATUS */}
          {view === 'check-status' && (
            <motion.div key="check-status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto py-8">
              <OrderStatusCheck onClose={() => setView('home')} />
            </motion.div>
          )}

          {/* ADMIN LOGIN */}
          {view === 'admin-login' && (
            <motion.div key="admin-login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-sm mx-auto py-12">
              <div className="rounded-2xl p-6 space-y-5"
                style={{ background: 'linear-gradient(145deg, #0f0f14, #0a0a0e)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-center">
                  <motion.div className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #c8102e, #8b0d1e)', boxShadow: '0 12px 28px rgba(200,16,46,0.3)' }}
                    animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Lock size={22} className="text-white" />
                  </motion.div>
                  <h2 className="text-xl font-black">כניסת מנהל</h2>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input type="password" placeholder="סיסמה" required
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 12px', color: 'white', width: '100%', fontSize: '14px' }}
                    value={adminPassword} onChange={e => setAdminPassword(e.target.value)}
                    onFocus={e => { (e.target as HTMLElement).style.borderColor = '#c8102e'; }}
                    onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  />
                  <button type="submit"
                    className="w-full py-2.5 rounded-xl font-black text-sm text-white transition-all hover:opacity-90 active:scale-[0.97]"
                    style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)' }}>
                    כניסה
                  </button>
                </form>
                <button onClick={() => setView('home')}
                  className="w-full py-2 rounded-xl text-xs font-bold transition-all hover:bg-white/6 flex items-center justify-center gap-2"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                  <ArrowLeft size={12} />ביטול
                </button>
              </div>
            </motion.div>
          )}

          {/* ADMIN DASHBOARD */}
          {view === 'admin-dashboard' && (
            <motion.div key="admin-dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black flex items-center gap-3">
                    <LayoutDashboard size={32} style={{ color: '#c8102e' }} />לוח בקרה
                  </h2>
                  <div className="flex gap-3 mt-3">
                    {(['orders', 'settings'] as const).map(tab => (
                      <button key={tab} onClick={() => setAdminTab(tab)}
                        className={`px-5 py-1.5 rounded-full font-bold text-sm transition-all ${adminTab === tab ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
                        style={{
                          background: adminTab === tab ? 'linear-gradient(135deg, #c8102e, #a50d25)' : 'rgba(255,255,255,0.04)',
                          border: adminTab === tab ? 'none' : '1px solid rgba(255,255,255,0.07)',
                        }}>
                        {tab === 'orders' ? 'הזמנות' : 'הגדרות'}
                      </button>
                    ))}
                  </div>
                </div>
                {adminTab === 'orders' && (
                  <div className="flex items-center gap-3">
                    <div className="px-5 py-2.5 rounded-xl flex items-center gap-2.5"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm font-bold">{orders.length} הזמנות</span>
                    </div>
                    <button onClick={fetchOrders}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)' }}>
                      <ArrowLeft size={16} className="rotate-90" />רענן
                    </button>
                  </div>
                )}
              </div>

              {adminTab === 'orders' ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'ממתין', count: orders.filter(o => o.status === 'Pending Review').length, color: '#eab308', icon: <Calendar size={18} /> },
                      { label: 'תשלום אושר', count: orders.filter(o => o.status === 'Payment Verified').length, color: '#3b82f6', icon: <ShieldCheck size={18} /> },
                      { label: 'פורסם', count: orders.filter(o => o.status === 'Published').length, color: '#22c55e', icon: <CheckCircle2 size={18} /> },
                      { label: 'נדחה', count: orders.filter(o => o.status === 'Rejected').length, color: '#ef4444', icon: <X size={18} /> },
                    ].map((stat, i) => (
                      <div key={i} className="rounded-2xl p-5 flex flex-col gap-3 bg-white border border-white/10"
                        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                        <div className="flex items-center justify-between">
                          <div className="p-2.5 rounded-xl bg-gray-100" style={{ color: stat.color }}>{stat.icon}</div>
                          <div className="text-3xl font-black text-black">{stat.count}</div>
                        </div>
                        <div className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right">
                        <thead className="text-xs font-bold border-b border-white/8" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <tr>
                            <th className="p-5 text-white/40">#ID</th>
                            <th className="p-5 text-white/40">לקוח</th>
                            <th className="p-5 text-white/40">חבילה</th>
                            <th className="p-5 text-white/40">רכב</th>
                            <th className="p-5 text-white/40">סטטוס</th>
                            <th className="p-5 text-center text-white/40">פעולות</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {orders.map(order => (
                            <tr key={order.id} className="hover:bg-white/3 transition-colors">
                              <td className="p-5 font-mono text-sm font-black" style={{ color: '#c8102e' }}>
                                YG-{order.id.toString().padStart(4, '0')}
                              </td>
                              <td className="p-5">
                                <div className="text-sm font-bold">{order.full_name}</div>
                                <div className="text-xs text-white/35 flex items-center gap-1 mt-0.5"><Smartphone size={11} />{order.phone}</div>
                              </td>
                              <td className="p-5">
                                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                  {order.package_name}
                                </span>
                              </td>
                              <td className="p-5">
                                <div className="text-sm font-bold">{order.car_model}</div>
                                <div className="text-xs text-white/35">{order.car_year} | {order.car_mileage} ק"מ</div>
                              </td>
                              <td className="p-5">
                                <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                                  order.status === 'Published' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                  order.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                  order.status === 'Payment Verified' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                  'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                }`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    order.status === 'Published' ? 'bg-green-400' :
                                    order.status === 'Rejected' ? 'bg-red-400' :
                                    order.status === 'Payment Verified' ? 'bg-blue-400' : 'bg-yellow-400'
                                  }`} />
                                  {order.status}
                                </div>
                              </td>
                              <td className="p-5">
                                <div className="flex items-center justify-center gap-2">
                                  <button onClick={() => alert(`פרטי הזמנה ${order.id}`)}
                                    className="p-2 rounded-lg transition-colors hover:bg-white/8 text-white/35 hover:text-white">
                                    <Eye size={16} />
                                  </button>
                                  <select
                                    className="rounded-lg px-2 py-1.5 text-xs focus:outline-none transition-colors"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
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
                <div className="rounded-2xl p-7 max-w-xl space-y-6"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <h3 className="text-xl font-black">הגדרות אתר</h3>
                  <div className="space-y-5">
                    {[
                      { label: 'כמות עוקבים (Instagram)', key: 'followers_count' },
                      { label: 'מספר WhatsApp', key: 'whatsapp_number' },
                      { label: 'כותרת ראשית', key: 'hero_title_he' },
                      { label: 'שורת מיצוב', key: 'positioning_line_he' },
                    ].map(f => (
                      <div key={f.key} className="space-y-1.5">
                        <label className="text-[11px] font-bold text-white/35 uppercase tracking-wider">{f.label}</label>
                        <input type="text"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', padding: '10px 12px', color: 'white', width: '100%', fontSize: '14px' }}
                          value={siteSettings[f.key] || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, [f.key]: e.target.value })}
                          onFocus={e => { (e.target as HTMLElement).style.borderColor = '#c8102e'; }}
                          onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; }}
                        />
                      </div>
                    ))}
                    <button
                      onClick={async () => {
                        setLoading(true);
                        try {
                          const res = await fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(siteSettings) });
                          if (res.ok) alert('ההגדרות נשמרו בהצלחה');
                        } catch { alert('שגיאה בשמירה'); }
                        finally { setLoading(false); }
                      }}
                      disabled={loading}
                      className="w-full py-3 rounded-xl font-black text-sm text-white transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)' }}>
                      {loading ? 'שומר...' : 'שמור הגדרות'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)} title={modalContent?.title || ''}>
        {modalContent?.content}
      </Modal>

      <ChangePackageModal
        isOpen={showChangePackage}
        onClose={() => setShowChangePackage(false)}
        currentPackageId={selectedPackage?.id || ''}
        packages={packages}
        vipPackage={vipPackage}
        duoPackage={duoPackage}
        equipmentPackages={equipmentPackages}
        businessPackage={businessPackage}
        transportPackage={transportPackage}
        onSelect={(p) => {
          setSelectedPackage(p);
          setBookingStep(1); // ← FIX: reset to step 1 on package change
          setFormData({
            fullName: formData.fullName, phone: formData.phone, model: '', year: '',
            mileage: '', price: '', registration: '', testUntil: '', location: formData.location,
            paymentProof: '', carImages: [], model2: '', year2: '', mileage2: '', price2: '',
            registration2: '', testUntil2: '', agencyName: '', monthlyCars: '', agencyDetails: '', seats: ''
          });
        }}
        lang={lang}
      />
    </div>
  );
}
