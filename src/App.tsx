import React, { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Instagram,
  Facebook,
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
  ThumbsUp,
  RefreshCw,
  Youtube,
  Twitter,
  Linkedin,
  Sparkle,
  Gauge,
  Timer,
  Flame,
  Gem,
  Diamond,
  Medal,
  Trophy,
  Award as AwardIcon,
  BadgeCheck,
  Verified,
  Zap as ZapIcon,
  Rocket as RocketIcon,
  Bus,
  ChevronLeft,
  MessageCircle,
  DollarSign,
  Share2,
  HelpCircle,
  ChevronRightIcon,
  ArrowRight,
  ExternalLink,
  Percent,
  HandshakeIcon,
} from 'lucide-react';
import { translations, Language } from './translations';

// ============================================================
// SECTION HEADER COMPONENT (محسّن وجذاب)
// ============================================================
const SectionHeader = memo(({ 
  eyebrow, 
  eyebrowIcon, 
  eyebrowColor, 
  title, 
  titleHighlight, 
  highlightColor, 
  subtitle, 
  stats 
}: { 
  eyebrow: string;
  eyebrowIcon: React.ReactNode;
  eyebrowColor: string;
  title: string;
  titleHighlight: string;
  highlightColor: string;
  subtitle: string;
  stats: { value: string; label: string; color: string }[];
}) => {
  return (
    <div className="text-center space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
        style={{ background: `${eyebrowColor}15`, border: `1px solid ${eyebrowColor}30` }}
      >
        <span style={{ color: eyebrowColor }}>{eyebrowIcon}</span>
        <span className="text-xs font-black tracking-wider" style={{ color: eyebrowColor }}>{eyebrow}</span>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-3xl md:text-4xl font-black"
      >
        {title}{' '}
        <span style={{ color: highlightColor }}>{titleHighlight}</span>
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-white/50 text-sm max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-5 pt-4"
      >
        {stats.map((stat, i) => (
          <div key={i} className="relative flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${stat.color}20` }}>
              {i === 0 && <DollarSign size={14} style={{ color: stat.color }} />}
              {i === 1 && <Trophy size={14} style={{ color: stat.color }} />}
              {i === 2 && <Calendar size={14} style={{ color: stat.color }} />}
            </div>
            <div className="text-right">
              <div className="text-lg font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[9px] text-white/40 font-bold tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

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

// --- Navbar ---
const Navbar = memo(({ lang, setLang, isAdmin, onLogout, siteSettings, setView }: {
  lang: Language; setLang: (l: Language) => void;
  isAdmin?: boolean; onLogout?: () => void;
  siteSettings: any; setView: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tagline = lang === 'he' ? '50K+ עוקבים · מוכרים מהר יותר' : '50K+ متابع · نبيع أسرع';
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [
    { href: '#how-it-works', label: lang === 'he' ? 'איך זה עובד' : 'كيف يعمل' },
    { href: '#packages',     label: lang === 'he' ? 'חבילות'      : 'الباقات'   },
    { href: '#reviews',      label: lang === 'he' ? 'ביקורות'     : 'آراء العملاء' },
    { href: '#faq',          label: lang === 'he' ? 'שאלות'       : 'الأسئلة'   },
  ];
  return (
    <nav dir="rtl" className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(6,6,10,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        padding: scrolled ? '8px 0' : '14px 0',
      }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-3">
        {/* LOGO */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex items-center justify-center rounded-xl shrink-0 transition-transform group-hover:scale-105"
            style={{ width:40, height:40, background:'linear-gradient(135deg,#c8102e,#a50d25)', boxShadow:'0 4px 18px rgba(200,16,46,0.4)' }}>
            <Car size={21} className="text-white" />
          </div>
          <div className="leading-none text-right">
            <div className="font-black tracking-tight text-[17px] md:text-[19px] leading-none">
              <span className="text-brand-red">YOUGO</span><span className="text-white"> ISRAEL</span>
            </div>
            <div className="text-[8px] font-semibold tracking-widest mt-[3px]" style={{ color:'rgba(255,255,255,0.28)' }}>
              {tagline}
            </div>
          </div>
        </button>
        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-0.5 rounded-2xl px-2 py-1.5"
          style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-all hover:text-white hover:bg-white/8"
              style={{ color:'rgba(255,255,255,0.55)' }}>{l.label}</a>
          ))}
          <button onClick={() => setView('check-status')}
            className="px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-all hover:text-white hover:bg-white/8"
            style={{ color:'rgba(255,255,255,0.55)' }}>
            {lang === 'he' ? 'סטטוס הזמנה' : 'حالة الطلب'}
          </button>
        </div>
        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-2">
          <a href="https://instagram.com/yougo.israel" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[12px] text-white transition-all hover:scale-[1.03]"
            style={{ background:'linear-gradient(135deg,#833ab4 0%,#e1306c 55%,#f77737 100%)', boxShadow:'0 3px 14px rgba(225,48,108,0.35)' }}>
            <Instagram size={14} />@yougo.israel
          </a>
          <button onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-bold transition-all hover:bg-white/10"
            style={{ border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', color:'rgba(255,255,255,0.75)' }}>
            <Globe size={13} style={{ color:'#c8102e' }} />
            {lang === 'he' ? 'عربي' : 'עברית'}
          </button>
          {isAdmin && <button onClick={onLogout} className="p-2 rounded-xl" style={{ color:'rgba(255,255,255,0.3)' }}><LogOut size={16} /></button>}
        </div>
        {/* MOBILE RIGHT */}
        <div className="md:hidden flex items-center gap-2">
          <a href="https://instagram.com/yougo.israel" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl"
            style={{ width:36, height:36, background:'linear-gradient(135deg,#833ab4 0%,#e1306c 55%,#f77737 100%)', boxShadow:'0 2px 10px rgba(225,48,108,0.4)' }}>
            <Instagram size={17} className="text-white" />
          </a>
          <button onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-black"
            style={{ border:'1px solid rgba(200,16,46,0.4)', background:'rgba(200,16,46,0.08)', color:'#e55' }}>
            <Globe size={11} />{lang === 'he' ? 'عربي' : 'עברית'}
          </button>
          <button onClick={() => setOpen(v => !v)}
            className="flex items-center justify-center rounded-xl transition-all"
            style={{ width:36, height:36, background: open ? 'rgba(200,16,46,0.15)' : 'rgba(255,255,255,0.06)', border: open ? '1px solid rgba(200,16,46,0.4)' : '1px solid rgba(255,255,255,0.1)' }}>
            <AnimatePresence mode="wait" initial={false}>
              {open
                ? <motion.div key="x" initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90, opacity:0 }} transition={{ duration:0.15 }}><X size={18} className="text-brand-red" /></motion.div>
                : <motion.div key="m" initial={{ rotate:90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:-90, opacity:0 }} transition={{ duration:0.15 }}><Menu size={18} className="text-white" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>
      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.18 }}
            className="md:hidden mx-4 mt-2 rounded-2xl overflow-hidden"
            style={{ background:'rgba(8,8,16,0.97)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(24px)' }}>
            <div className="p-3 space-y-0.5">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all hover:bg-white/6"
                  style={{ color:'rgba(255,255,255,0.7)' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background:'#c8102e' }} />{l.label}
                </a>
              ))}
              <button onClick={() => { setView('check-status'); setOpen(false); }}
                className="flex items-center gap-3 w-full text-right px-4 py-3 rounded-xl text-[14px] font-semibold transition-all hover:bg-white/6"
                style={{ color:'rgba(255,255,255,0.7)' }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background:'#c8102e' }} />
                {lang === 'he' ? 'סטטוס הזמנה' : 'حالة الطلب'}
              </button>
            </div>
            <div className="px-3 pb-3">
              <a href="https://instagram.com/yougo.israel" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl font-black text-[13px] text-white"
                style={{ background:'linear-gradient(135deg,#833ab4 0%,#e1306c 55%,#f77737 100%)' }}>
                <Instagram size={16} />{lang === 'he' ? 'עקבו עלינו · @yougo.israel' : 'تابعونا · @yougo.israel'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

interface PackageCardProps {
  pkg: Package;
  lang: Language;
  onSelect: (p: Package) => void;
}

// ============================================================
// CARD BACK PANEL
// ============================================================
const CardBackPanel = memo(({
  pkg, details, color, badge, onSelect, onBack
}: {
  pkg: Package;
  details: { title: string; content: string };
  color: string;
  badge: React.ReactNode;
  onSelect: (p: Package) => void;
  onBack: () => void;
}) => {
  const items = useMemo(() => {
    const result: string[] = [];
    details.content.split('\n').forEach(raw => {
      const cl = raw.replace(/\*\*/g, '').trim();
      if (!cl || cl.length < 3) return;
      if (/^[✨🔥👑💎🚗🏢🚜🔧🚌📦⭐🎯💼📊🔍⚙️🏗️⏱️]/.test(cl)) return;
      if (cl.includes('━') || cl.includes('┌') || cl.includes('─')) return;
      const s = cl.replace(/^[•✓✅📸📝📱🎯⚡🏷️🎥💰📞🛠️📋💫🌟👨\-\s]+/, '').trim();
      if (s.length > 2) result.push(s);
    });
    return result;
  }, [details.content]);

  const shown = items.slice(0, 8);
  const priceNum = parseInt(pkg.price.replace(/[₪,]/g, '')) || 0;
  const original = priceNum ? `₪${Math.round(priceNum / 0.85).toLocaleString()}` : '';

  return (
    <div className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${color}18 0%, #0c0c14 40%, #080810 100%)`,
        border: `1px solid ${color}30`,
      }}
    >
      <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      <div className="shrink-0 flex items-center justify-between gap-2 px-4 pt-4 pb-3"
        style={{ borderBottom: `1px solid ${color}20`, background: `${color}0a` }}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-2xl shrink-0" style={{ color }}>{badge}</span>
          <div className="min-w-0">
            <p className="text-[13px] font-black text-white truncate leading-tight">{pkg.name}</p>
            <p className="text-[9px] font-bold mt-[1px]" style={{ color: `${color}aa` }}>מה כלול בחבילה</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black active:scale-95 transition-transform"
          style={{ border: `1px solid ${color}40`, color, background: `${color}15` }}
        >
          <ArrowLeft size={10} strokeWidth={2.5} /> חזרה
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2">
        <div className="flex flex-col gap-1">
          {shown.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 px-2.5 py-[7px] rounded-xl"
              style={{ background: i % 2 === 0 ? `${color}09` : 'transparent' }}>
              <div className="shrink-0 mt-[3px] w-3.5 h-3.5 rounded-full flex items-center justify-center"
                style={{ background: `${color}25`, border: `1.5px solid ${color}50` }}>
                <Check size={7} strokeWidth={3} style={{ color }} />
              </div>
              <span className="text-[11.5px] leading-snug font-medium" style={{ color: 'rgba(255,255,255,0.88)' }}>{item}</span>
            </div>
          ))}
          {items.length > 8 && (
            <p className="text-center text-[9px] font-bold py-1.5" style={{ color: `${color}70` }}>+ {items.length - 8} הטבות נוספות</p>
          )}
        </div>
      </div>

      <div className="shrink-0 px-4 pt-3 pb-4" style={{ borderTop: `1px solid ${color}20` }}>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-black text-white leading-none">{pkg.price}</span>
            {original && <span className="text-[9px] line-through" style={{ color: 'rgba(255,255,255,0.22)' }}>{original}</span>}
          </div>
          <span className="text-[9px] font-black px-2 py-[3px] rounded-full"
            style={{ color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
            חיסכון 15%
          </span>
        </div>
        <button
          type="button"
          onClick={() => onSelect(pkg)}
          className="w-full py-[10px] rounded-xl font-black text-[13px] text-white flex items-center justify-center gap-2 active:scale-95 transition-transform"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 6px 20px ${color}40` }}
        >
          <RocketIcon size={14} /> הזמן עכשיו
        </button>
      </div>
    </div>
  );
});

// ============================================================
// PACKAGE DETAILS DATA
// ============================================================
const packageDetails: Record<string, { title: string; content: string }> = {
  basic: {
    title: 'חבילת BASIC',
    content: `✨ מה כוללת החבילה?\n• 2 תמונות מקצועיות עם עריכה איכותית\n• פוסט שיווקי ממוקד עם תיאור מפורט\n• סטורי לאורך 7 ימים רצופים\n• חשיפה לקהל קונים פוטנציאלי פעיל\n\n🌟 למי זה מתאים?\n• מוכרים פרטיים עם תקציב מינימלי\n• רכבים במחיר עד 50,000 ₪\n• מי שרוצה לבדוק את השוק במהירות\n\n⏱️ פרטים טכניים\n• משך פרסום: 7 ימים\n• 3 ימי חשיפה מובטחת\n• מחיר: 149 ₪ (במקום 175 ₪)\n• חיסכון של 26 ₪ – 15% הנחה`
  },
  pro: {
    title: 'חבילת PRO',
    content: `🔥 מה כוללת החבילה?\n• 4 תמונות מקצועיות עם עריכה מתקדמת\n• פוסט ראשי + פוסט שמור מתוזמן אסטרטגית\n• סטורי 14 ימים לחשיפה מתמדת\n• עדיפות בתור הפרסומים\n• טרגוט מתקדם לקהלים רלוונטיים\n\n💎 למה בוחרים בה?\n• יחס עלות-תועלת הכי גבוה בשוק\n• מעל 1,000 מכירות מוכחות דרך החבילה\n• זמן פרסום אופטימלי לרוב סוגי הרכבים\n\n⏱️ פרטים טכניים\n• משך פרסום: 14 ימים\n• 7 ימי חשיפה מובטחת\n• מחיר: 249 ₪ (במקום 293 ₪)\n• חיסכון של 44 ₪ – 15% הנחה`
  },
  premium: {
    title: 'חבילת PREMIUM',
    content: `👑 מה כוללת החבילה?\n• 8+ תמונות מקצועיות עם עריכה מרהיבה\n• רילס וידאו + סרטון פרסומי מלא\n• פוסט מותאם אישית עם אסטרטגיית תוכן\n• סטורי 30 ימים לחשיפה מקסימלית\n• עדיפות מלאה – תמיד ראשון בתור\n• מעצב + קופירייטר אישי לכל מודעה\n• עיצוב VIP עם מיתוג ייחודי\n\n⏱️ פרטים טכניים\n• משך פרסום: 30 ימים\n• 14 ימי חשיפה מובטחת\n• מחיר: 449 ₪ (במקום 528 ₪)\n• חיסכון של 79 ₪ – 15% הנחה`
  },
  vip: {
    title: 'VIP LUXURY',
    content: `💎 מה מקבלים?\n• 15+ תמונות סטילש ברמה קולנועית\n• רילס VIP + סטורי עם עיצוב בלעדי\n• 60 ימי פרסום פרמיום מלא\n• ליווי אישי 24/7 – מנהל לקוח VIP\n• טרגוט מתקדם לפי פרמטרים מדויקים\n• עדיפות ראשונה בכל הפרסומים תמיד\n• קידום ממומן בערוצים נוספים\n\n🏎️ למי זה מיועד?\n• רכבי יוקרה: פורשה, מרצדס, BMW, אאודי\n• רכבי אספנות ונדירים בשוק\n\n⏱️ פרטים טכניים\n• משך פרסום: 60 ימים\n• מחיר: 749 ₪ (במקום 882 ₪)\n• חיסכון של 133 ₪ – 15% הנחה`
  },
  duo: {
    title: 'DUO DEAL',
    content: `🚗🚗 מה כוללת החבילה?\n• פרסום מלא לשני רכבים במחיר מיוחד\n• 4 תמונות מקצועיות לכל רכב בנפרד\n• פוסט שיווקי נפרד ומותאם לכל רכב\n• סטורי 14 ימים לכל אחד מהרכבים\n• חשיפה כפולה לקהל מעוניין ורחב\n\n💰 למה זה משתלם?\n• במקום לשלם 598 ₪ – משלמים רק 349 ₪\n• חיסכון עצום של 249 ₪ – 40% הנחה`
  },
  business: {
    title: 'חבילת BUSINESS',
    content: `🏢 מה מקבלים?\n• עד 50 רכבים מפורסמים בחודש\n• צילומים מקצועיים לכל רכב בנפרד\n• דפי נחיתה מותאמים לסוכנות\n• מנהל לקוח ייעודי – איש קשר אחד\n• דוחות ביצועים חודשיים עם המלצות\n\n📈 יתרונות לעסקים\n• תוכנית שיווקית סדורה לאורך השנה\n• חיסכון עצום בעלויות פרסום חודשיות\n\n⏱️ פרטים טכניים\n• מינוי חודשי מתחדש אוטומטית\n• מחיר: 1,499 ₪ לחודש (במקום 2,499 ₪)\n• חיסכון של 1,000 ₪ – 40% הנחה`
  },
  business100: {
    title: 'חבילת BUSINESS 100',
    content: `🚀 מה מקבלים?\n• עד 100 רכבים מפורסמים בחודש\n• צילומים מקצועיים לכל רכב\n• דפי נחיתה מותאמים אישית\n• מנהל לקוח בכיר\n• דוחות שבועיים מפורטים\n• קידום ממומן מוגבר\n\n📊 יתרונות\n• עדיפות עליונה בפרסומים\n• תמיכה 24/7\n• אנליטיקס מתקדם\n\n⏱️ פרטים טכניים\n• מינוי חודשי\n• מחיר: 2,499 ₪ לחודש (במקום 4,999 ₪)\n• חיסכון של 2,500 ₪ – 50% הנחה`
  },
  'equipment-heavy': {
    title: 'ציוד כבד',
    content: `🚜 מה כוללת החבילה?\n• 10 תמונות מקצועיות של הציוד בשטח\n• פוסט עם מפרט טכני מפורט ומדויק\n• סטורי 21 ימים לחשיפה ממושכת\n• חשיפה ייעודית לקהל קבלנים ומגזר הבנייה\n\n🏗️ התמחות\n• באגרים ומיני באגרים\n• מחפרונים וקטרפילרים\n• בולדוזרים ושופלים\n• עגורנים וציוד הרמה כבד`
  },
  'equipment-light': {
    title: 'ציוד קל',
    content: `🔧 מה כוללת החבילה?\n• 6 תמונות מקצועיות של הציוד\n• פוסט מותאם עם תיאור טכני מלא\n• סטורי 14 ימים לקהל רלוונטי\n• חשיפה לאנשי מקצוע בתחום\n\n🛠️ מתאים לכל סוגי הציוד הקל\n• מלגזות וציוד מחסן\n• פופקטים, ג'קים וציוד הרמה`
  },
  'transport': {
    title: 'תחבורה והסעות',
    content: `🚌 מה כוללת החבילה?\n• 10 תמונות מקצועיות מבפנים ומבחוץ\n• פוסט עם מפרט טכני מלא\n• סטורי 21 ימים לחשיפה מתמשכת\n• חשיפה ייעודית לחברות הסעות ותחבורה\n\n🚐 מה אנחנו מפרסמים?\n• אוטובוסים ומיניבוסים\n• מיניוונים ורכבי הסעה פרטיים\n• וואנים מסחריים\n• משאיות קלות וכבדות`
  }
};

// ============================================================
// PACKAGE CARDS
// ============================================================
const PackageCard = memo(({ pkg, lang, onSelect }: PackageCardProps) => {
  const t = translations[lang];
  const [showBack, setShowBack] = useState(false);

  const tierConfig = {
    basic:   { color: '#94a3b8', badge: <Rocket size={20} />, gradient: 'linear-gradient(145deg, #13151b 0%, #0e1014 100%)', glow: 'rgba(148,163,184,0.12)' },
    pro:     { color: '#c8102e', badge: <Flame size={20} />, gradient: 'linear-gradient(145deg, #1a0a0d 0%, #110508 100%)', glow: 'rgba(200,16,46,0.2)' },
    premium: { color: '#c8102e', badge: <Gem size={20} />, gradient: 'linear-gradient(145deg, #1a0a0d 0%, #0f0406 100%)', glow: 'rgba(200,16,46,0.25)' },
  };
  const cfg = tierConfig[pkg.id as keyof typeof tierConfig] || tierConfig.basic;
  const isPro = pkg.id === 'pro';
  const isPremium = pkg.id === 'premium';
  const isBasic = pkg.id === 'basic';

  const featureDurations: Record<string, string> = { basic: '7 ימים', pro: '14 ימים', premium: '30 ימים' };
  const featureImages: Record<string, string> = { basic: '2 תמונות', pro: '4 תמונות', premium: '8+ תמונות' };

  const handleSelect = useCallback(() => onSelect(pkg), [onSelect, pkg]);
  const handleShowBack = useCallback(() => setShowBack(true), []);
  const handleHideBack = useCallback(() => setShowBack(false), []);

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem', perspective: '1000px' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: cfg.gradient,
              border: `1.5px solid ${cfg.color}${isPremium ? '55' : isPro ? '45' : '30'}`,
              boxShadow: `0 24px 50px -15px ${cfg.glow}`,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent 0%, ${cfg.color} 50%, transparent 100%)` }} />
            <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% -20%, ${cfg.color}18 0%, transparent 70%)` }} />

            {pkg.popular && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1 text-white text-[8px] font-black py-1.5 px-2.5 rounded-full"
                style={{ background: `linear-gradient(135deg, ${cfg.color}, #8b0d1e)`, boxShadow: `0 4px 14px ${cfg.color}60` }}>
                <Trophy size={9} /> {t.mostPopular}
              </div>
            )}

            <div className="absolute top-3 left-3 z-20 flex items-center gap-1 text-[8px] font-black py-1 px-2 rounded-full"
              style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
              <Zap size={7} />15% OFF
            </div>

            <div className="relative z-10 flex flex-col h-full p-5 gap-3.5 pt-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${cfg.color}25 0%, ${cfg.color}10 100%)`,
                    border: `1.5px solid ${cfg.color}35`,
                  }}>
                  <span style={{ color: cfg.color }}>{cfg.badge}</span>
                </div>
                <div>
                  <h3 className="text-[20px] font-black tracking-tight leading-none" style={{ color: isBasic ? '#e2e8f0' : cfg.color }}>
                    {pkg.name}
                  </h3>
                  <p className="text-[10px] font-semibold mt-1" style={{ color: isBasic ? 'rgba(255,255,255,0.4)' : `${cfg.color}80` }}>
                    {isBasic ? '✓ פתרון מהיר ומקצועי' : isPro ? '✓ הבחירה הפופולרית' : '✓ חשיפה מקסימלית'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Camera size={11} />, val: featureImages[pkg.id] || '' },
                  { icon: <Calendar size={11} />, val: featureDurations[pkg.id] || '' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: `${cfg.color}10`, border: `1px solid ${cfg.color}20` }}>
                    <span style={{ color: cfg.color }}>{s.icon}</span>
                    <span className="text-[10px] font-black text-white">{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[38px] font-black text-white leading-none tracking-tight">{pkg.price}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] line-through" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    ₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}
                  </span>
                  <span className="text-[9px] font-black" style={{ color: '#4ade80' }}>חיסכון 15%</span>
                </div>
              </div>

              <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}40, transparent)` }} />

              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4.5 h-4.5 rounded-lg flex items-center justify-center shrink-0 mt-[1px]"
                      style={{ background: `${cfg.color}20`, border: `1.5px solid ${cfg.color}40` }}>
                      <Check size={9} strokeWidth={3} style={{ color: cfg.color }} />
                    </div>
                    <span className="text-[12px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.82)' }}>{feat}</span>
                  </div>
                ))}
                {pkg.features.length > 4 && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: `${cfg.color}18` }} />
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                      style={{ color: cfg.color, background: `${cfg.color}12`, border: `1px solid ${cfg.color}25` }}>
                      + {pkg.features.length - 4} עוד
                    </span>
                    <div className="flex-1 h-px" style={{ background: `${cfg.color}18` }} />
                  </div>
                )}
              </div>

              <div className="flex gap-2.5 mt-auto">
                <button
                  type="button"
                  onClick={handleShowBack}
                  className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all"
                  style={{ border: `1.5px solid ${cfg.color}35`, color: cfg.color, background: `${cfg.color}10` }}
                >
                  פרטים נוספים
                </button>
                <button
                  type="button"
                  onClick={handleSelect}
                  className="flex-1 py-3 rounded-xl font-black text-xs text-white active:scale-95 transition-all"
                  style={{
                    background: isPremium || isPro ? `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)` : 'rgba(255,255,255,0.1)',
                    border: isPremium || isPro ? 'none' : '1.5px solid rgba(255,255,255,0.18)',
                  }}
                >
                  <span className="flex items-center justify-center gap-1.5"><RocketIcon size={12} />{t.startOrder}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel
            pkg={pkg}
            details={packageDetails[pkg.id] || { title: pkg.name, content: pkg.features.join('\n') }}
            color={tierConfig[pkg.id as keyof typeof tierConfig]?.color || '#94a3b8'}
            badge={tierConfig[pkg.id as keyof typeof tierConfig]?.badge || <Rocket size={20} />}
            onSelect={handleSelect}
            onBack={handleHideBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

// ============================================================
// VIP PACKAGE CARD
// ============================================================
const VIPPackageCard = memo(({ pkg, lang, onSelect }: PackageCardProps) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#d4af37';
  const handleSelect = useCallback(() => onSelect(pkg), [onSelect, pkg]);
  const handleShowBack = useCallback(() => setShowBack(true), []);
  const handleHideBack = useCallback(() => setShowBack(false), []);

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #1e160a 0%, #100c05 50%, #080604 100%)',
              border: '1.5px solid rgba(212,175,55,0.45)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
            <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(212,175,55,0.12) 0%, transparent 70%)' }} />

            <div className="relative z-10 p-5 flex flex-col h-full gap-3.5 pt-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-amber-900/40 rounded-full px-3 py-1.5 border border-amber-500/30">
                  <Crown size={12} className="text-amber-400" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-300">VIP LUXURY</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.08))', border: '1.5px solid rgba(212,175,55,0.4)' }}>
                  <Crown size={28} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-[22px] font-black leading-none text-amber-400">VIP LUXURY</h3>
                  <p className="text-[10px] text-amber-100/40 mt-1">חבילת הפרסום האולטימטיבית</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Camera size={11} />, val: '15+ תמונות' },
                  { icon: <Calendar size={11} />, val: '60 ימים' },
                  { icon: <Video size={11} />, val: 'רילס VIP' },
                  { icon: <Crown size={11} />, val: 'ליווי 24/7' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
                    <span className="text-amber-400">{s.icon}</span>
                    <span className="text-[10px] font-black text-white">{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-black leading-none text-amber-400">₪749</span>
                <span className="text-xs line-through text-white/20">₪882</span>
                <span className="text-[9px] font-black bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/25">חיסכון 15%</span>
              </div>

              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]"
                      style={{ background: 'rgba(212,175,55,0.2)', border: '1.5px solid rgba(212,175,55,0.4)' }}>
                      <Check size={8} strokeWidth={3} className="text-amber-400" />
                    </div>
                    <span className="text-[12px] font-medium text-white/82 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={handleShowBack}
                  className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all"
                  style={{ border: '1.5px solid rgba(212,175,55,0.35)', color: '#d4af37', background: 'rgba(212,175,55,0.08)' }}>
                  פרטים נוספים
                </button>
                <button type="button" onClick={handleSelect}
                  className="flex-1 py-3 rounded-xl font-black text-xs text-black active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #f5d060, #d4af37)' }}>
                  <Crown size={12} /> הזמן VIP
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.vip} color={color} badge={<Crown size={20} />} onSelect={handleSelect} onBack={handleHideBack} />
        )}
      </AnimatePresence>
    </div>
  );
});

// ============================================================
// DUO DEAL PACKAGE CARD
// ============================================================
const DuoDealPackageCard = memo(({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#8b5cf6';
  const handleSelect = useCallback(() => onSelect(pkg), [onSelect, pkg]);
  const handleShowBack = useCallback(() => setShowBack(true), []);
  const handleHideBack = useCallback(() => setShowBack(false), []);

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #150e22 0%, #0d0814 100%)',
              border: '1.5px solid rgba(139,92,246,0.45)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }} />
            <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(139,92,246,0.14) 0%, transparent 70%)' }} />

            <div className="relative z-10 p-5 flex flex-col h-full gap-3.5 pt-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-purple-900/40 rounded-full px-3 py-1.5 border border-purple-500/30">
                  <Car size={12} className="text-purple-400" />
                  <Car size={12} className="text-purple-400" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-purple-300">DUO DEAL</span>
                </div>
                <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-full px-2.5 py-1">
                  <span className="text-[9px] font-black text-emerald-400">40% חיסכון</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(139,92,246,0.08))', border: '1.5px solid rgba(139,92,246,0.4)' }}>
                  <Car size={28} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-[22px] font-black leading-none text-purple-400">DUO DEAL</h3>
                  <p className="text-[10px] text-purple-100/40 mt-1">פרסום 2 רכבים במחיר מיוחד</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Car size={11} />, val: '2 רכבים' },
                  { icon: <Camera size={11} />, val: '4 תמונות/רכב' },
                  { icon: <Calendar size={11} />, val: '14 ימים' },
                  { icon: <Zap size={11} />, val: 'חשיפה כפולה' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    <span className="text-purple-400">{s.icon}</span>
                    <span className="text-[10px] font-black text-white">{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-black leading-none text-purple-400">₪349</span>
                <span className="text-xs line-through text-white/20">₪598</span>
                <span className="text-[9px] font-black bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/25">חיסכון ₪249</span>
              </div>

              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />

              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]"
                      style={{ background: 'rgba(139,92,246,0.2)', border: '1.5px solid rgba(139,92,246,0.4)' }}>
                      <Check size={8} strokeWidth={3} className="text-purple-400" />
                    </div>
                    <span className="text-[12px] font-medium text-white/82 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={handleShowBack}
                  className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all"
                  style={{ border: '1.5px solid rgba(139,92,246,0.35)', color: '#8b5cf6', background: 'rgba(139,92,246,0.08)' }}>
                  פרטים נוספים
                </button>
                <button type="button" onClick={handleSelect}
                  className="flex-1 py-3 rounded-xl font-black text-xs text-white active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
                  <Car size={12} /> הזמן DUO
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.duo} color={color} badge={<Car size={20} />} onSelect={handleSelect} onBack={handleHideBack} />
        )}
      </AnimatePresence>
    </div>
  );
});

// ============================================================
// EQUIPMENT PACKAGE CARD
// ============================================================
const EquipmentPackageCard = memo(({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const isHeavy = pkg.id === 'equipment-heavy';
  const color = isHeavy ? '#ea580c' : '#94a3b8';
  const badge = isHeavy ? <Truck size={20} /> : <Wrench size={20} />;
  const handleSelect = useCallback(() => onSelect(pkg), [onSelect, pkg]);
  const handleShowBack = useCallback(() => setShowBack(true), []);
  const handleHideBack = useCallback(() => setShowBack(false), []);

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden p-5"
            style={{
              background: isHeavy ? 'linear-gradient(145deg, #1a0e06 0%, #0f0904 100%)' : 'linear-gradient(145deg, #111318 0%, #0b0d10 100%)',
              border: `1.5px solid ${color}${isHeavy ? '45' : '30'}`,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

            {isHeavy && (
              <div className="flex justify-end mb-3">
                <div className="text-white text-[8px] font-black py-1 px-3 rounded-full flex items-center gap-1"
                  style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />הכי מבוקש
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${color}25, ${color}08)`,
                  border: `1.5px solid ${color}35`,
                }}>
                <span style={{ color }}>{badge}</span>
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color }}>{isHeavy ? 'ציוד כבד' : 'ציוד קל'}</div>
                <h3 className="text-[16px] font-black text-white leading-tight mt-0.5">{pkg.name}</h3>
              </div>
              <div className="mr-auto text-right shrink-0">
                <div className="text-[22px] font-black text-white">{pkg.price}</div>
                <div className="text-[9px] text-white/25 line-through">₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {(isHeavy ? ['באגר', 'מחפרון', 'מיני באגר', 'בולדוזר'] : ['פופקט', 'מלגזה', 'סקיד סטיר']).map((item, i) => (
                <span key={i} className="text-[9px] font-black px-2 py-1 rounded-full"
                  style={{ color: isHeavy ? '#fb923c' : '#94a3b8', border: `1px solid ${color}30`, background: `${color}10` }}>
                  {item}
                </span>
              ))}
            </div>

            <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, transparent, ${color}30, transparent)` }} />

            <div className="flex flex-col gap-2 flex-grow">
              {pkg.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-[2px] p-[3px] rounded-full shrink-0" style={{ background: `${color}60` }}>
                    <Check size={7} className="text-black" strokeWidth={4} />
                  </div>
                  <span className="text-[11.5px] font-medium text-white/78 leading-snug">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5 mt-auto pt-3">
              <button type="button" onClick={handleShowBack}
                className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all"
                style={{ border: `1.5px solid ${color}35`, color, background: `${color}10` }}>
                פרטים נוספים
              </button>
              <button type="button" onClick={handleSelect}
                className="flex-1 py-3 rounded-xl font-black text-xs text-white active:scale-95 transition-all"
                style={{
                  background: isHeavy ? 'linear-gradient(135deg, #ea580c, #c2410c)' : `${color}30`,
                  border: isHeavy ? 'none' : `1.5px solid ${color}35`,
                }}>
                הזמן עכשיו
              </button>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails[pkg.id] || { title: pkg.name, content: pkg.features.join('\n') }} color={color} badge={badge} onSelect={handleSelect} onBack={handleHideBack} />
        )}
      </AnimatePresence>
    </div>
  );
});

// ============================================================
// TRANSPORT PACKAGE CARD
// ============================================================
const TransportPackageCard = memo(({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#0ea5e9';
  const handleSelect = useCallback(() => onSelect(pkg), [onSelect, pkg]);
  const handleShowBack = useCallback(() => setShowBack(true), []);
  const handleHideBack = useCallback(() => setShowBack(false), []);

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden p-5"
            style={{
              background: 'linear-gradient(145deg, #071420 0%, #050d18 100%)',
              border: '1.5px solid rgba(14,165,233,0.4)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #0ea5e9, transparent)' }} />

            <div className="flex justify-start mb-3">
              <div className="text-white text-[8px] font-black py-1 px-3 rounded-full flex items-center gap-1.5"
                style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />חדש!
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.25), rgba(14,165,233,0.08))', border: '1.5px solid rgba(14,165,233,0.4)' }}>
                <Bus size={28} style={{ color }} />
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color }}>תחבורה והסעות</div>
                <h3 className="text-[16px] font-black text-white leading-tight mt-0.5">{pkg.name}</h3>
              </div>
              <div className="mr-auto text-right shrink-0">
                <div className="text-[22px] font-black text-white">{pkg.price}</div>
                <div className="text-[9px] text-white/25 line-through">₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {['אוטובוס', 'מיניבוס', 'וואן', 'משאית'].map((item, i) => (
                <span key={i} className="text-[9px] font-black px-2 py-1 rounded-full text-sky-300"
                  style={{ border: '1px solid rgba(14,165,233,0.3)', background: 'rgba(14,165,233,0.1)' }}>
                  {item}
                </span>
              ))}
            </div>

            <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)' }} />

            <div className="flex flex-col gap-2 flex-grow">
              {pkg.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-[2px] p-[3px] rounded-full shrink-0 bg-sky-500/60">
                    <Check size={7} className="text-black" strokeWidth={4} />
                  </div>
                  <span className="text-[11.5px] font-medium text-white/78 leading-snug">{f}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5 mt-auto pt-3">
              <button type="button" onClick={handleShowBack}
                className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all text-sky-400"
                style={{ border: '1.5px solid rgba(14,165,233,0.35)', background: 'rgba(14,165,233,0.08)' }}>
                פרטים נוספים
              </button>
              <button type="button" onClick={handleSelect}
                className="flex-1 py-3 rounded-xl font-black text-xs text-white active:scale-95 transition-all flex items-center justify-center gap-1.5"
                style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}>
                <Bus size={12} />הזמן
              </button>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.transport} color={color} badge={<Bus size={20} />} onSelect={handleSelect} onBack={handleHideBack} />
        )}
      </AnimatePresence>
    </div>
  );
});

// ============================================================
// BUSINESS PACKAGE CARD
// ============================================================
const BusinessPackageCard = memo(({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#3b82f6';
  const handleSelect = useCallback(() => onSelect(pkg), [onSelect, pkg]);
  const handleShowBack = useCallback(() => setShowBack(true), []);
  const handleHideBack = useCallback(() => setShowBack(false), []);

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div
            key="front"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #070f1c 0%, #0d1a2e 50%, #070f1c 100%)',
              border: '1.5px solid rgba(59,130,246,0.4)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div className="relative z-10 p-5 h-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}>
                    <Building2 size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-blue-400 uppercase tracking-[0.15em]">לסוכנויות</div>
                    <h3 className="text-[20px] font-black text-white">{pkg.name}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-blue-500/15 px-2.5 py-1.5 rounded-full border border-blue-500/25">
                  <Award size={11} className="text-blue-400" />
                  <span className="text-[8px] font-black text-blue-400">מומלץ</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Car size={11} />, val: pkg.features[0] || '50 רכבים/חודש' },
                  { icon: <Users size={11} />, val: pkg.features[1] || 'מנהל ייעודי' },
                  { icon: <BarChart3 size={11} />, val: pkg.features[2] || 'דוחות חודשיים' },
                  { icon: <Target size={11} />, val: pkg.features[3] || 'קידום ממומן' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/8 border border-white/10">
                    <span className="text-blue-400">{s.icon}</span>
                    <span className="text-[10px] font-black text-white">{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-[32px] font-black text-white leading-none">{pkg.price}</span>
                <span className="text-xs text-white/30">/חודש</span>
                <span className="text-xs line-through text-white/20 mr-1">₪{Math.round(parseInt(pkg.price.replace(/[₪,]/g, '')) / 0.6)}</span>
                <span className="text-[9px] font-black bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded-full border border-green-500/25">{pkg.id === 'business100' ? '50% OFF' : '40% OFF'}</span>
              </div>

              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }} />

              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px] bg-blue-500/20"
                      style={{ border: '1.5px solid rgba(59,130,246,0.4)' }}>
                      <Check size={8} strokeWidth={3} className="text-blue-400" />
                    </div>
                    <span className="text-[12px] font-medium text-white/82 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={handleShowBack}
                  className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all text-blue-400"
                  style={{ border: '1.5px solid rgba(59,130,246,0.35)', background: 'rgba(59,130,246,0.08)' }}>
                  פרטים נוספים
                </button>
                <button type="button" onClick={handleSelect}
                  className="flex-1 py-3 rounded-xl font-black text-xs text-white active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}>
                  <Briefcase size={12} />התחל
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails[pkg.id] || { title: pkg.name, content: pkg.features.join('\n') }} color={color} badge={<Building2 size={20} />} onSelect={handleSelect} onBack={handleHideBack} />
        )}
      </AnimatePresence>
    </div>
  );
});

// ============================================================
// MOBILE SWIPER
// ============================================================
const MobileSwiper = ({ children, cardHeight = 500 }: { children?: React.ReactNode; cardHeight?: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const count = React.Children.count(children);

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[0] as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 12;
    container.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[0] as HTMLElement;
    if (!card) return;
    const newIndex = Math.round(container.scrollLeft / (card.offsetWidth + 12));
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < count) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, count]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{
          paddingLeft: '12px',
          paddingRight: '12px',
          scrollSnapType: 'x mandatory',
          direction: 'rtl',
        }}
      >
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            className="snap-start shrink-0"
            style={{
              width: '85%',
              height: cardHeight,
              direction: 'rtl',
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-5">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            className={`transition-all duration-300 ${
              i === currentIndex ? 'w-[26px] bg-brand-red' : 'w-[7px] bg-white/20'
            }`}
            style={{ height: '7px', borderRadius: '4px' }}
          />
        ))}
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none z-10 flex items-center gap-1 bg-black/55 backdrop-blur-sm px-2.5 py-1.5 rounded-full opacity-0 animate-fadeOut">
        <ChevronLeft size={10} className="text-white/70" />
        <span className="text-[9px] text-white/70 font-black">החלק</span>
        <ChevronRight size={10} className="text-white/70" />
      </div>
      <style>{`
        .animate-fadeOut {
          animation: fadeOut 2s forwards;
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- Bit Logo ---
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
      <span style={{ fontFamily: '"Nunito", "Varela Round", Arial Rounded MT Bold, Arial, sans-serif', fontWeight: 800, fontSize, color: '#00E5CC', letterSpacing: '-0.5px', lineHeight: 1 }}>bit</span>
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

// --- Modal ---
const Modal = memo(({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  const content = typeof children === 'string' ? children : '';
  if (!isOpen) return null;

  const renderContent = () => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, idx) => {
      if (/^\d+\./.test(line)) {
        return (
          <div key={idx} className="flex gap-2 mt-3 first:mt-0">
            <span className="text-brand-red font-black text-sm">{line.split('.')[0]}.</span>
            <span className="text-white/80 text-sm">{line.substring(line.indexOf('.') + 1).trim()}</span>
          </div>
        );
      }
      if (line.startsWith('•')) {
        return (
          <div key={idx} className="flex gap-2 mr-2">
            <span className="text-brand-red/70 text-sm">•</span>
            <span className="text-white/70 text-sm">{line.substring(1).trim()}</span>
          </div>
        );
      }
      return <p key={idx} className="text-white/70 text-sm leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl p-6"
        style={{ background: 'linear-gradient(145deg, #0f0f14 0%, #0a0a0e 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <h3 className="text-lg font-black text-brand-red">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg">
            <X size={18} className="text-white/60" />
          </button>
        </div>
        <div className="space-y-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
});

// --- Order Status Check ---
const OrderStatusCheck = memo(({ onClose }: { onClose: () => void }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'notfound'>('idle');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const checkOrder = useCallback(() => {
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
  }, [orderNumber]);

  return (
    <div className="glass-card p-6 space-y-5">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-brand-red/30">
          <Search size={28} className="text-white" />
        </div>
        <h3 className="text-xl font-black">בדיקת סטטוס הזמנה</h3>
        <p className="text-white/50 text-xs">הכנס את מספר ההזמנה שקיבלת בוואטסאפ</p>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <input type="text" placeholder="לדוגמה: #12345" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-center text-base font-black tracking-widest focus:border-brand-red focus:outline-none transition-all" />
          {orderNumber && (
            <button onClick={() => setOrderNumber('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              <X size={14} />
            </button>
          )}
        </div>
        <button onClick={checkOrder} disabled={status === 'loading'}
          className="w-full py-3 bg-gradient-to-r from-brand-red to-red-600 rounded-xl font-black text-sm shadow-xl shadow-brand-red/30 disabled:opacity-50">
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />בודק...
            </span>
          ) : 'בדוק סטטוס'}
        </button>
        {status === 'found' && orderDetails && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-green-400 text-xs font-black">סטטוס:</span>
              <span className="bg-green-500/20 text-green-400 px-3 py-0.5 rounded-full text-xs font-black border border-green-500/30">{orderDetails.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-white/40">מספר הזמנה:</span><div className="font-black text-white">#{orderDetails.id}</div></div>
              <div><span className="text-white/40">תאריך:</span><div className="font-black text-white">{orderDetails.date}</div></div>
              <div><span className="text-white/40">חבילה:</span><div className="font-black text-white">{orderDetails.package}</div></div>
              <div><span className="text-white/40">רכב:</span><div className="font-black text-white">{orderDetails.car}</div></div>
            </div>
          </div>
        )}
        {status === 'notfound' && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 text-center">
            <X size={24} className="text-red-400 mx-auto mb-1" />
            <p className="text-red-400 font-black text-sm">ההזמנה לא נמצאה</p>
            <p className="text-white/40 text-xs mt-1">בדוק את המספר ונסה שנית</p>
          </div>
        )}
      </div>
      <button onClick={onClose}
        className="w-full py-2.5 rounded-xl text-xs font-bold border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red text-brand-red hover:text-white transition-all flex items-center justify-center gap-2">
        <ArrowLeft size={12} />חזור לדף הבית
      </button>
    </div>
  );
});

// ============================================================
// CHANGE PACKAGE MODAL
// ============================================================
const ChangePackageModal = memo(({
  isOpen, onClose, currentPackageId, packages, vipPackage, duoPackage, equipmentPackages, businessPackage, businessPackage100, transportPackage, onSelect, lang
}: {
  isOpen: boolean; onClose: () => void; currentPackageId: string; packages: Package[]; vipPackage: Package;
  duoPackage: Package; equipmentPackages: Package[]; businessPackage: Package; businessPackage100: Package; transportPackage: Package;
  onSelect: (p: Package) => void; lang: Language;
}) => {
  const allPackages = useMemo(() => [...packages, vipPackage, duoPackage, businessPackage, businessPackage100, ...equipmentPackages, transportPackage], [packages, vipPackage, duoPackage, businessPackage, businessPackage100, equipmentPackages, transportPackage]);

  const getPackageStyle = useCallback((pkg: Package) => {
    if (pkg.id === 'vip') return { border: 'border-amber-500/40', bg: 'bg-amber-500/10', badge: <Crown size={16} />, color: 'text-amber-400', activeBorder: 'border-amber-400' };
    if (pkg.id === 'duo') return { border: 'border-purple-500/40', bg: 'bg-purple-500/10', badge: <Car size={16} />, color: 'text-purple-400', activeBorder: 'border-purple-400' };
    if (pkg.id === 'business') return { border: 'border-blue-500/40', bg: 'bg-blue-500/10', badge: <Building2 size={16} />, color: 'text-blue-400', activeBorder: 'border-blue-400' };
    if (pkg.id === 'business100') return { border: 'border-blue-500/40', bg: 'bg-blue-500/10', badge: <Building2 size={16} />, color: 'text-blue-400', activeBorder: 'border-blue-400' };
    if (pkg.id === 'equipment-heavy') return { border: 'border-orange-500/40', bg: 'bg-orange-500/10', badge: <Truck size={16} />, color: 'text-orange-400', activeBorder: 'border-orange-400' };
    if (pkg.id === 'equipment-light') return { border: 'border-slate-500/40', bg: 'bg-slate-500/10', badge: <Wrench size={16} />, color: 'text-slate-400', activeBorder: 'border-slate-400' };
    if (pkg.id === 'transport') return { border: 'border-sky-500/40', bg: 'bg-sky-500/10', badge: <Bus size={16} />, color: 'text-sky-400', activeBorder: 'border-sky-400' };
    if (pkg.id === 'premium') return { border: 'border-brand-red/40', bg: 'bg-brand-red/10', badge: <Gem size={16} />, color: 'text-brand-red', activeBorder: 'border-brand-red' };
    if (pkg.id === 'pro') return { border: 'border-brand-red/30', bg: 'bg-brand-red/5', badge: <Flame size={16} />, color: 'text-brand-red', activeBorder: 'border-brand-red' };
    return { border: 'border-white/10', bg: 'bg-white/5', badge: <Rocket size={16} />, color: 'text-white/60', activeBorder: 'border-white/40' };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{ background: 'linear-gradient(145deg, #111116 0%, #0a0a0e 100%)', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 px-5 py-4 border-b border-white/8 flex items-center justify-between bg-dark-bg/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
              <RefreshCw size={15} className="text-brand-red" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">החלפת חבילה</h3>
              <p className="text-[10px] text-white/40 mt-0.5">בחר חבילה אחרת להזמנה</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg"><X size={16} className="text-white/50" /></button>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {allPackages.map((pkg) => {
            const style = getPackageStyle(pkg);
            const isActive = pkg.id === currentPackageId;
            return (
              <button key={pkg.id} onClick={() => { onSelect(pkg); onClose(); }}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-right hover:scale-[1.02] active:scale-[0.98] ${isActive ? `${style.activeBorder} ${style.bg}` : `${style.border} bg-white/2 hover:bg-white/4`}`}>
                <div className={`w-10 h-10 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center text-lg shrink-0`}>
                  <span style={{ color: style.color }}>{style.badge}</span>
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    {isActive && <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-white/10 text-white/60">נוכחית</span>}
                    <span className={`text-sm font-black ${isActive ? style.color : 'text-white'}`}>{pkg.name}</span>
                  </div>
                  <p className="text-[9px] text-white/40 mt-0.5 truncate">{pkg.features[0] || ''}</p>
                </div>
                <div className={`text-base font-black shrink-0 ${isActive ? style.color : 'text-white'}`}>{pkg.price}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

// ============================================================
// CarDetailsForm
// ============================================================
const CarDetailsForm = memo(({ formData, setFormData, onNext, selectedPackage, onChangePackage }: { 
  formData: any, setFormData: (data: any) => void, onNext: () => void, selectedPackage: Package | null, onChangePackage: () => void
}) => {
  const isDuo = selectedPackage?.id === 'duo';
  const isBusiness = selectedPackage?.id === 'business' || selectedPackage?.id === 'business100';
  const isTransport = selectedPackage?.id === 'transport';

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, [formData, setFormData]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center">
            {selectedPackage?.id === 'vip' ? <Crown size={16} className="text-amber-400" /> :
             selectedPackage?.id === 'duo' ? <Car size={16} className="text-purple-400" /> :
             selectedPackage?.id === 'business' || selectedPackage?.id === 'business100' ? <Building2 size={16} className="text-blue-400" /> :
             selectedPackage?.id === 'transport' ? <Bus size={16} className="text-sky-400" /> :
             selectedPackage?.id === 'equipment-heavy' ? <Truck size={16} className="text-orange-400" /> :
             selectedPackage?.id === 'equipment-light' ? <Wrench size={16} className="text-slate-400" /> :
             selectedPackage?.id === 'premium' ? <Gem size={16} className="text-brand-red" /> :
             selectedPackage?.id === 'pro' ? <Flame size={16} className="text-brand-red" /> :
             <Rocket size={16} className="text-brand-red" />}
          </div>
          <div>
            <div className="text-[9px] text-white/40">חבילה נבחרת</div>
            <div className="text-sm font-black text-white">{selectedPackage?.name}</div>
          </div>
        </div>
        <button onClick={onChangePackage}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black border border-white/10 text-white/70 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all">
          <RefreshCw size={12} className="text-brand-red" />
          החלף חבילה
        </button>
      </div>

      {isBusiness ? (
        <>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30">
              <Building2 size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-black">פרטי הסוכנות</h3>
            <p className="text-white/50 text-xs">הכנס את פרטי הסוכנות שלך</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-blue-400/70">שם הסוכנות *</label>
              <input type="text" name="agencyName" placeholder="סוכנות הרכב שלי" value={formData.agencyName || ''} onChange={handleChange}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-blue-400/70">שם איש קשר *</label>
              <input type="text" name="fullName" placeholder="ישראל ישראלי" value={formData.fullName} onChange={handleChange}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-blue-400/70">טלפון *</label>
              <input type="tel" name="phone" placeholder="050-1234567" value={formData.phone} onChange={handleChange}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-blue-400/70">מיקום הסוכנות *</label>
              <input type="text" name="location" placeholder="תל אביב" value={formData.location} onChange={handleChange}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-blue-400/70">כמות רכבים בחודש *</label>
              <input type="text" name="monthlyCars" placeholder="10-20 רכבים" value={formData.monthlyCars || ''} onChange={handleChange}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-blue-400/70">פרטים נוספים</label>
              <textarea name="agencyDetails" placeholder="ספר לנו על הסוכנות שלך..." value={formData.agencyDetails || ''} onChange={handleChange}
                rows={3} className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all resize-none" />
            </div>
          </div>
        </>
      ) : isDuo ? (
        <>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-purple-500/30">
              <Car size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-black">פרטי שני הרכבים</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">שם מלא *</label>
              <input type="text" name="fullName" placeholder="ישראל ישראלי" value={formData.fullName} onChange={handleChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">טלפון *</label>
              <input type="tel" name="phone" placeholder="050-1234567" value={formData.phone} onChange={handleChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-white/60">מיקום *</label>
              <input type="text" name="location" placeholder="תל אביב" value={formData.location} onChange={handleChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
            </div>
          </div>
          {[1, 2].map(carNum => (
            <div key={carNum} className="rounded-xl border border-purple-500/25 overflow-hidden">
              <div className="px-4 py-2.5 bg-purple-500/10 border-b border-purple-500/20 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-[10px] font-black text-purple-400">{carNum}</span>
                </div>
                <span className="text-xs font-black text-purple-300">רכב {carNum === 1 ? 'ראשון' : 'שני'}</span>
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
                    <label className="text-xs font-black text-white/50">{f.label} *</label>
                    <input type="text" name={f.field} placeholder={f.placeholder} value={(formData as any)[f.field] || ''} onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : isTransport ? (
        <>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-sky-500/30">
              <Bus size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-black">פרטי כלי הרכב המסחרי</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'סוג הרכב', placeholder: 'אוטובוס / מיניבוס / וואן', field: 'model', color: 'sky' },
              { label: 'שנת ייצור', placeholder: '2018', field: 'year', color: 'sky' },
              { label: "קילומטראז'", placeholder: '250,000', field: 'mileage', color: 'sky' },
              { label: 'מחיר מבוקש', placeholder: '180,000 ₪', field: 'price', color: 'sky' },
              { label: 'מספר מושבים', placeholder: '50 / 25 / 9', field: 'seats', color: 'sky' },
              { label: 'טסט עד', placeholder: '06/2026', field: 'testUntil', color: 'sky' },
              { label: 'שם מלא', placeholder: 'ישראל ישראלי', field: 'fullName', color: 'sky' },
              { label: 'טלפון', placeholder: '050-1234567', field: 'phone', color: 'sky' },
            ].map(f => (
              <div key={f.field} className="space-y-1">
                <label className="text-xs font-black text-sky-400/70">{f.label} *</label>
                <input type={f.field === 'phone' ? 'tel' : 'text'} name={f.field} placeholder={f.placeholder} value={(formData as any)[f.field] || ''} onChange={handleChange}
                  className="w-full px-3 py-2 bg-sky-500/5 border border-sky-500/20 rounded-lg text-sm focus:border-sky-400 focus:outline-none transition-all" />
              </div>
            ))}
            <div className="space-y-1 col-span-2">
              <label className="text-xs font-black text-sky-400/70">מיקום *</label>
              <input type="text" name="location" placeholder="תל אביב" value={formData.location} onChange={handleChange}
                className="w-full px-3 py-2 bg-sky-500/5 border border-sky-500/20 rounded-lg text-sm focus:border-sky-400 focus:outline-none transition-all" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30">
              <Car size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-black">פרטי הרכב</h3>
            <p className="text-white/50 text-xs">הכנס את פרטי הרכב שברצונך לפרסם</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'דגם רכב', placeholder: 'מאזדה 3', field: 'model' },
              { label: 'שנה', placeholder: '2020', field: 'year' },
              { label: "קילומטראז'", placeholder: '50,000', field: 'mileage' },
              { label: 'מחיר מבוקש', placeholder: '89,000 ₪', field: 'price' },
              { label: 'תאריך עלייה לכביש', placeholder: '2020', field: 'registration' },
              { label: 'טסט עד', placeholder: '12/2024', field: 'testUntil' },
            ].map(f => (
              <div key={f.field} className="space-y-1">
                <label className="text-xs font-black text-white/60">{f.label} *</label>
                <input type="text" name={f.field} placeholder={f.placeholder} value={(formData as any)[f.field] || ''} onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all" />
              </div>
            ))}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-black text-white/60">מיקום בארץ *</label>
              <input type="text" name="location" placeholder="תל אביב" value={formData.location} onChange={handleChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">שם מלא *</label>
              <input type="text" name="fullName" placeholder="ישראל ישראלי" value={formData.fullName} onChange={handleChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">טלפון *</label>
              <input type="tel" name="phone" placeholder="050-1234567" value={formData.phone} onChange={handleChange}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all" />
            </div>
          </div>
        </>
      )}

      <button onClick={onNext}
        className="w-full py-3 rounded-xl font-black text-sm shadow-xl transition-all mt-2 relative overflow-hidden group"
        style={{ background: selectedPackage?.id === 'business' || selectedPackage?.id === 'business100' ? 'linear-gradient(135deg, #3b82f6, #7c3aed)' : selectedPackage?.id === 'duo' ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' : selectedPackage?.id === 'transport' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : 'linear-gradient(135deg, #c8102e, #9b0d24)' }}>
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative">להמשך לתשלום</span>
      </button>
    </div>
  );
});

// ============================================================
// PaymentForm
// ============================================================
const PaymentForm = memo(({ formData, setFormData, selectedPackage, onSubmit, loading, onBack, onChangePackage }: { 
  formData: any, setFormData: (data: any) => void, selectedPackage: Package | null, onSubmit: () => void, loading: boolean, onBack: () => void, onChangePackage: () => void
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'bit' | 'paybox' | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [discount, setDiscount] = useState(0);
  const [couponLabel, setCouponLabel] = useState('');

  const VALID_COUPONS: Record<string, { discount: number; label: string }> = {
    'YOUGO10': { discount: 10, label: '10% הנחה - קוד מיוחד' },
    'FRIEND15': { discount: 15, label: '15% הנחה - שיווק שותפים' },
    'VIP20': { discount: 20, label: '20% הנחה - לקוח VIP' },
    'FIRST50': { discount: 50, label: '50 ₪ הנחה - לקוח חדש' },
    'SALE25': { discount: 25, label: '25% הנחה - מבצע מיוחד' },
  };

  const handleCheckCoupon = useCallback(() => {
    if (!couponCode.trim()) return;
    setCouponStatus('checking');
    setTimeout(() => {
      const code = couponCode.trim().toUpperCase();
      const found = VALID_COUPONS[code];
      if (found) {
        setCouponStatus('valid');
        setDiscount(found.discount);
        setCouponLabel(found.label);
      } else {
        setCouponStatus('invalid');
        setDiscount(0);
        setCouponLabel('');
      }
    }, 800);
  }, [couponCode]);

  const basePrice = parseInt((selectedPackage?.price || '₪0').replace(/[₪,]/g, '')) || 0;
  const discountAmount = discount > 50
    ? discount
    : Math.round(basePrice * discount / 100);
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const isBusiness = selectedPackage?.id === 'business' || selectedPackage?.id === 'business100';
  const isDuo = selectedPackage?.id === 'duo';
  const isTransport = selectedPackage?.id === 'transport';
  const accentColor = isBusiness ? '#3b82f6' : isDuo ? '#8b5cf6' : isTransport ? '#0ea5e9' : '#c8102e';
  const accentBorder = isBusiness ? 'border-blue-500/30' : isDuo ? 'border-purple-500/30' : isTransport ? 'border-sky-500/30' : 'border-brand-red/20';
  const accentBg = isBusiness ? 'from-blue-500/10' : isDuo ? 'from-purple-500/10' : isTransport ? 'from-sky-500/10' : 'from-brand-red/10';

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => { setFormData({...formData, paymentProof: reader.result}); };
      reader.readAsDataURL(files[0]);
    }
  }, [formData, setFormData]);

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto shadow-xl"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)` }}>
          <CreditCard size={28} className="text-white" />
        </div>
        <h3 className="text-xl font-black">תשלום והעלאת אישור</h3>
        <p className="text-white/50 text-xs">בחר אמצעי תשלום והעלה צילום מסך</p>
      </div>

      <div className={`p-3 rounded-xl bg-gradient-to-r ${accentBg} to-transparent border ${accentBorder}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">חבילה נבחרת:</span>
              <span className="font-black mr-2" style={{ color: accentColor }}>{selectedPackage?.name}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white/60">מחיר:</span>
              <div className="flex items-center gap-2 mr-2">
                {couponStatus === 'valid' && (
                  <span className="text-xs line-through text-white/30">₪{basePrice.toLocaleString()}</span>
                )}
                <span className="font-black text-white text-base">₪{finalPrice.toLocaleString()}</span>
              </div>
            </div>
            {couponStatus === 'valid' && (
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-green-400/80">קוד קופון:</span>
                <span className="text-[10px] font-black text-green-400 mr-2">-₪{discountAmount} · {couponLabel}</span>
              </div>
            )}
          </div>
          <button onClick={onChangePackage}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all shrink-0 mr-1">
            <RefreshCw size={12} style={{ color: accentColor }} />
            <span className="text-[8px] font-black text-white/50">החלף</span>
          </button>
        </div>
      </div>

      {/* COUPON CODE */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <button
          type="button"
          onClick={() => document.getElementById('coupon-section')?.classList.toggle('hidden')}
          className="w-full px-4 py-3 flex items-center justify-between text-right hover:bg-white/3 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.2)' }}>
              <Percent size={12} className="text-amber-400" />
            </div>
            <span className="text-sm font-bold text-white/70">יש לך קוד קופון?</span>
          </div>
          <ChevronDown size={14} className="text-white/30" />
        </button>
        <div id="coupon-section" className="hidden px-4 pb-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="הכנס קוד קופון..."
              value={couponCode}
              onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponStatus('idle'); }}
              className="flex-1 px-3 py-2.5 rounded-xl text-sm font-bold tracking-widest text-center transition-all focus:outline-none"
              style={{
                background: couponStatus === 'valid' ? 'rgba(34,197,94,0.08)' : couponStatus === 'invalid' ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.05)',
                border: couponStatus === 'valid' ? '1.5px solid rgba(34,197,94,0.4)' : couponStatus === 'invalid' ? '1.5px solid rgba(239,68,68,0.3)' : '1.5px solid rgba(255,255,255,0.1)',
                color: 'white',
              }}
              onKeyDown={e => e.key === 'Enter' && handleCheckCoupon()}
            />
            <button
              type="button"
              onClick={handleCheckCoupon}
              disabled={!couponCode || couponStatus === 'checking'}
              className="px-4 py-2.5 rounded-xl font-black text-xs transition-all disabled:opacity-40"
              style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.25)', color: '#fbbf24' }}
            >
              {couponStatus === 'checking' ? (
                <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              ) : 'אמת'}
            </button>
          </div>
          {couponStatus === 'valid' && (
            <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <CheckCircle2 size={14} className="text-green-400 shrink-0" />
              <div>
                <p className="text-xs font-black text-green-400">קוד תקין! {couponLabel}</p>
                <p className="text-[10px] text-green-300/60">חיסכון של ₪{discountAmount} · מחיר סופי: ₪{finalPrice}</p>
              </div>
            </div>
          )}
          {couponStatus === 'invalid' && (
            <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <X size={14} className="text-red-400 shrink-0" />
              <p className="text-xs font-bold text-red-400">קוד לא תקין. נסה שוב</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-white/60">אמצעי תשלום *</label>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setPaymentMethod('bit')}
            className={`p-3 rounded-xl border-2 transition-all ${paymentMethod === 'bit' ? 'border-[#00E5CC] bg-[#00E5CC]/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
            <BitLogo size="md" />
          </button>
          <button type="button" onClick={() => setPaymentMethod('paybox')}
            className={`p-3 rounded-xl border-2 transition-all ${paymentMethod === 'paybox' ? 'border-[#29ABE2] bg-[#29ABE2]/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
            <PayBoxLogo size="md" />
          </button>
        </div>
      </div>

      {paymentMethod && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 space-y-3">
          <div className="text-center">
            <p className="text-white/60 text-xs">העבר את הסכום למספר:</p>
            <p className="text-xl font-black tracking-wider text-white">054-6980606</p>
          </div>
          <button onClick={() => navigator.clipboard.writeText('0546980606')}
            className="w-full py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <FileText size={12} />העתק מספר
          </button>
          <div className="space-y-1">
            <label className="text-xs font-black text-white/60">העלה צילום מסך של ההעברה *</label>
            <div className="relative">
              <input type="file" accept="image/*" required onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className={`rounded-lg border-2 border-dashed py-3 px-3 flex flex-col items-center gap-1 transition-colors ${formData.paymentProof ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/5'}`}>
                {formData.paymentProof ? (
                  <>
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><Check size={16} className="text-green-400" /></div>
                    <span className="text-xs font-black text-green-400">הקובץ הועלה בהצלחה</span>
                  </>
                ) : (
                  <>
                    <Upload size={18} className="text-white/40" />
                    <span className="text-xs font-black text-white/60">לחץ להעלאת צילום מסך</span>
                    <span className="text-[9px] text-white/30">PNG, JPG או JPEG</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={onBack}
          className="flex-1 py-2.5 rounded-xl font-black text-sm border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red transition-all flex items-center justify-center gap-2 text-brand-red hover:text-white">
          <ArrowLeft size={14} />חזור
        </button>
        <button onClick={onSubmit} disabled={!paymentMethod || !formData.paymentProof || loading}
          className="flex-1 py-2.5 rounded-xl font-black text-sm shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` }}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />שולח...
            </span>
          ) : couponStatus === 'valid' ? `שלח הזמנה · ₪${finalPrice}` : 'שלח הזמנה'}
        </button>
      </div>
    </div>
  );
});

// ============================================================
// MAIN APP COMPONENT
// ============================================================
function App() {
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
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);
  const [showChangePackage, setShowChangePackage] = useState(false);
  const [siteSettings, setSiteSettings] = useState<any>({
    followers_count: '50K+',
    whatsapp_number: '972546980606',
    hero_title_he: 'מוכרים רכב? אנחנו מוכרים אותו מהר יותר.',
    hero_subtitle_he: 'YOUGO ISRAEL - פלטפורמת השיווק המובילה באינסטגרם למכירת רכבים.',
    positioning_line_he: 'הפרסום שמוכר רכבים – לא רק מציג אותם.'
  });

  const t = translations[lang];

  useEffect(() => {
    fetch('/api/settings').then(res => res.json()).then(data => setSiteSettings(data)).catch(() => {});
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'rtl';
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, bookingStep]);

  const packages: Package[] = useMemo(() => [
    { id: 'basic', name: t.basic, price: '₪149', features: [t.features.images2, t.features.post1, t.features.story7, t.features.exposureBasic] },
    { id: 'pro', name: t.pro, price: '₪249', popular: true, features: [t.features.images4, t.features.postPro, t.features.story14, t.features.priorityPro, t.features.exposurePro] },
    { id: 'premium', name: t.premium, price: '₪449', premium: true, features: [t.features.imagesPremium, t.features.postPremium, t.features.story30, t.features.priorityFull, t.features.exposureMax, t.features.guidance, t.features.video] }
  ], [t]);

  const vipPackage: Package = useMemo(() => ({ id: 'vip', name: 'VIP LUXURY', price: '₪749', vip: true, features: ['15+ תמונות מקצועיות', 'רילס + סטורי VIP', '60 ימי פרסום פרמיום', 'חשיפה מקסימלית', 'ליווי אישי 24/7', 'עיצוב VIP בלעדי', 'טרגוט מתקדם', 'עדיפות ראשונה תמיד'] }), []);
  const duoPackage: Package = useMemo(() => ({ id: 'duo', name: 'DUO DEAL', price: '₪349', features: ['פרסום 2 רכבים במחיר מיוחד', '4 תמונות לכל רכב', 'פוסט נפרד לכל רכב', 'סטורי 14 יום לכל אחד', 'חשיפה כפולה לקהל מעוניין', 'חיסכון של 40% לעומת 2 חבילות'] }), []);
  const businessPackage: Package = useMemo(() => ({ id: 'business', name: 'BUSINESS', price: '₪1,499', business: true, features: ['עד 50 רכבים בחודש', 'מנהל לקוח ייעודי', 'דוחות ביצועים חודשיים', 'קידום ממומן', 'עיצוב מקצועי לכל מודעה'] }), []);
  const businessPackage100: Package = useMemo(() => ({ id: 'business100', name: 'BUSINESS 100', price: '₪2,499', business: true, features: ['עד 100 רכבים בחודש', 'מנהל לקוח בכיר', 'דוחות שבועיים', 'קידום ממומן מוגבר', 'עיצוב VIP', 'אנליטיקס מתקדם', 'תמיכה 24/7'] }), []);
  const transportPackage: Package = useMemo(() => ({ id: 'transport', name: 'תחבורה והסעות', price: '₪299', features: ['10 תמונות מקצועיות מבפנים ומבחוץ', 'פוסט עם מפרט טכני מלא ומדויק', 'סטורי 21 ימים לחשיפה רחבה', 'חשיפה ייעודית לחברות הסעות ותחבורה', 'טרגוט מדויק לרוכשי רכב מסחרי', 'ייעוץ תמחור מקצועי', 'מאפיין לאוטובוסים, מיניבוסים, וואנים ומשאיות'] }), []);
  const equipmentPackages: Package[] = useMemo(() => [
    { id: 'equipment-heavy', name: 'חבילת ציוד כבד', price: '₪349', equipment: true, features: ['10 תמונות מקצועיות של הציוד', 'פוסט ייעודי עם מפרט טכני', 'סטורי 21 יום', 'חשיפה לקהל קבלנים ומגזר הבנייה', 'עדיפות בתוצאות חיפוש', 'ייעוץ תמחור מקצועי'] },
    { id: 'equipment-light', name: 'חבילת ציוד קל', price: '₪199', equipment: true, features: ['6 תמונות מקצועיות', 'פוסט מותאם לציוד קל', 'סטורי 14 יום', 'חשיפה לקהל מקצועי רלוונטי', 'תיאור טכני מפורט', 'תמיכה ב-WhatsApp'] }
  ], []);

  const handleSelectPackage = useCallback((p: Package) => {
    setSelectedPackage(p);
    setView('booking');
    setBookingStep(1);
  }, []);

  const handleAdminLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: adminPassword }) });
    if (res.ok) { setIsAdmin(true); setView('admin-dashboard'); fetchOrders(); } else { alert('סיסמה שגויה'); }
  }, [adminPassword]);

  const fetchOrders = useCallback(async () => {
    const res = await fetch('/api/admin/orders');
    const data = await res.json();
    setOrders(data);
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    fetchOrders();
  }, [fetchOrders]);

  const [formData, setFormData] = useState({
    fullName: '', phone: '', model: '', year: '', mileage: '', price: '', registration: '', testUntil: '', location: '',
    paymentProof: '', carImages: [] as string[], model2: '', year2: '', mileage2: '', price2: '', registration2: '', testUntil2: '',
    agencyName: '', monthlyCars: '', agencyDetails: '', seats: ''
  });

  const handleSubmitOrder = useCallback(async () => {
    setLoading(true);
    try {
      const pkgId = selectedPackage?.id || '';
      const pkgEmoji = pkgId === 'vip' ? '👑' : pkgId === 'premium' ? '💎' : pkgId === 'pro' ? '⭐' : pkgId.includes('equipment') ? '🚜' : pkgId === 'business' ? '🏢' : pkgId === 'business100' ? '🚀' : pkgId === 'duo' ? '🚗🚗' : pkgId === 'transport' ? '🚌' : '✅';
      const orderNum = String(Math.floor(10000 + Math.random() * 90000)).slice(0, 5);
      let message = `*YOUGO ISRAEL | אישור הזמנה חדשה* 🚗💨\n---------------------------------------\n*מספר הזמנה:* #${orderNum}\n*חבילה נבחרת:* ${selectedPackage?.name} ${pkgEmoji}\n---------------------------------------\n\n👤 *פרטי לקוח:*\n• שם מלא: ${formData.fullName}\n• טלפון: ${formData.phone}\n\n🚘 *פרטי רכב:*\n• דגם: ${formData.model}\n• שנה: ${formData.year}\n• קילומטראז': ${formData.mileage}\n• מחיר מבוקש: ${formData.price}\n• מיקום: ${formData.location}\n\n---------------------------------------\n✅ *אישור תשלום הועלה בהצלחה.*\n📸 *נא לשלוח כאן את תמונות הרכב!*\n---------------------------------------`;
      window.open(`https://wa.me/${siteSettings.whatsapp_number}?text=${encodeURIComponent(message)}`, '_blank');
      setOrderId(orderNum);
      setView('success');
    } catch (err) {
      alert('אירעה שגיאה. אנא נסה שנית.');
    } finally {
      setLoading(false);
    }
  }, [formData, selectedPackage, siteSettings.whatsapp_number]);

  const handleChangePackage = useCallback((p: Package) => {
    setSelectedPackage(p);
    setFormData({ fullName: formData.fullName, phone: formData.phone, model: '', year: '', mileage: '', price: '', registration: '', testUntil: '', location: formData.location, paymentProof: '', carImages: [], model2: '', year2: '', mileage2: '', price2: '', registration2: '', testUntil2: '', agencyName: '', monthlyCars: '', agencyDetails: '', seats: '' });
    setShowChangePackage(false);
  }, [formData.fullName, formData.phone, formData.location]);

  // ============================================================
  // FOOTER PAGE CONTENT
  // ============================================================
  const footerPages = {
    terms: {
      title: 'תקנון השימוש',
      content: `1. כללי\nYOUGO ISRAEL היא פלטפורמת שיווק דיגיטלית המתמחה בפרסום רכבים ברשתות החברתיות בישראל. השימוש בשירותינו מהווה הסכמה לתנאים אלה.\n\n2. השירותים\nהחברה מספקת שירותי פרסום ושיווק דיגיטלי לכלי רכב. החבילות כוללות צילומים מקצועיים, עריכה, פרסום ברשתות חברתיות, וחשיפה לקהל יעד.\n\n3. אחריות\nYOUGO ISRAEL אינה אחראית לתוכן המוצג על ידי המוכרים. הלקוח אחראי לדיוק הפרטים ולחוקיות העסקה.\n\n4. תשלומים\nהתשלום מבוצע מראש בעת ביצוע ההזמנה. אין החזרים לאחר תחילת הפרסום.\n\n5. פרטיות\nאיננו מוכרים מידע אישי לצדדים שלישיים. המידע משמש אך ורק לצורך מתן השירות.`
    },
    privacy: {
      title: 'מדיניות פרטיות',
      content: `1. מידע שאנחנו אוספים\nשם מלא, מספר טלפון, פרטי הרכב, ותמונות. איננו אוספים מידע רגיש כגון מספרי זהות או פרטי כרטיס אשראי.\n\n2. שימוש במידע\nהמידע משמש אך ורק לצורך יצירת מודעות פרסום ותפעול השירות.\n\n3. שמירת מידע\nהמידע נשמר בצורה מאובטחת ואינו מועבר לגורמים חיצוניים.\n\n4. זכויות המשתמש\nיש לך זכות לדרוש מחיקת המידע שלך בכל עת. פנה אלינו בוואטסאפ.\n\n5. עוגיות\nהאתר עשוי להשתמש בעוגיות לשיפור חוויית הגלישה.`
    },
    about: {
      title: 'מי אנחנו?',
      content: `YOUGO ISRAEL היא פלטפורמת השיווק הדיגיטלי המובילה בישראל למכירת כלי רכב.\n\nהחברה נוסדה מתוך ראייה ברורה: שוק הרכב הישראלי זקוק לפתרון שיווקי מקצועי, מהיר, ומשתלם.\n\nאנחנו עובדים עם מוכרים פרטיים, סוכנויות רכב, וחברות ציוד בכל רחבי הארץ.\n\nהצוות שלנו כולל מצלמים מקצועיים, מעצבים גרפיים, וקופירייטרים המתמחים בשוק הרכב.\n\nעם מעל 50,000 עוקבים פעילים ומעל 1,000 עסקאות מוצלחות, אנחנו הבחירה הראשונה של מוכרי רכב בישראל.`
    },
    howItWorks: {
      title: 'איך מפרסמים רכב?',
      content: `שלב 1 – בחירת חבילה\nבחרו את חבילת הפרסום המתאימה לסוג הרכב ולתקציב שלכם. יש לנו חבילות לכל צורך: מחבילת הכניסה ב-₪149 ועד VIP LUXURY ב-₪749.\n\nשלב 2 – מילוי פרטים\nמלאו את פרטי הרכב בטופס המאובטח: דגם, שנה, קילומטראז', מחיר, ומיקום.\n\nשלב 3 – תשלום\nשלמו בביט או בפייבוקס למספר 054-6980606 והעלו צילום מסך של ההעברה.\n\nשלב 4 – שליחת תמונות\nלאחר אישור ההזמנה, שלחו את תמונות הרכב ישירות בוואטסאפ.\n\nשלב 5 – פרסום\nהצוות שלנו יפרסם את הרכב שלכם ברשתות החברתיות תוך 24 שעות.\n\nשלב 6 – קבלת פניות\nקונים פוטנציאליים ייצרו איתכם קשר ישירות. ממוצע הזמן לקבלת הפנייה הראשונה: 3-6 שעות.`
    },
    affiliate: {
      title: 'שיווק שותפים',
      content: `תוכנית השותפים של YOUGO ISRAEL\n\nהצטרפו לתוכנית השותפים שלנו והרוויחו עמלה על כל לקוח שתפנו!\n\nאיך זה עובד?\n• קבלו קוד שותף ייחודי\n• שתפו את הקוד עם חברים, משפחה, ומכרים\n• קבלו 15% עמלה על כל הזמנה שתיכנס דרך הקוד שלכם\n\nלמי זה מתאים?\n• סוכני נדל"ן ורכב\n• מנהלי קהילות ברשתות חברתיות\n• מי שיש לו קשרים עם מוכרי רכב\n• כל אחד שרוצה להרוויח הכנסה נוספת\n\nפרטי ההצטרפות\n• ההרשמה חינמית ואין מינימום מכירות\n• העמלה מועברת בביט תוך 7 ימי עסקים\n• ניתן לעקוב אחר הפניות בזמן אמת\n\nלהצטרפות, שלחו הודעה בוואטסאפ עם המילה שותף.`
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(180deg, #06060a 0%, #0a0508 40%, #06060a 100%)' }}>
      <style>{`
        :root { --brand-red: #c8102e; }
        .text-brand-red { color: #c8102e !important; }
        .bg-brand-red { background-color: #c8102e !important; }
        .border-brand-red { border-color: #c8102e !important; }
        .btn-primary { background: linear-gradient(135deg, #c8102e, #a50d25) !important; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .glass-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
        }
        
        .input-field {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 10px 12px;
          color: white;
          width: 100%;
          transition: all 0.3s;
          font-size: 14px;
        }
        .input-field:focus { border-color: #c8102e; outline: none; background: rgba(200,16,46,0.08); }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 0;
        }
        
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--brand-red); border-radius: 10px; }
      `}</style>

      <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin} onLogout={() => { setIsAdmin(false); setView('home'); }} siteSettings={siteSettings} setView={setView} />

      <main className="pt-24 px-3 max-w-7xl mx-auto">
        {view === 'home' && (
          <div className="space-y-24">
            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#06060a' }}>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 20%, rgba(200,16,46,0.14) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(200,16,46,0.08) 0%, transparent 60%), #06060a' }} />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 80%)' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, #06060a 100%)' }} />
                <div className="absolute bottom-0 inset-x-0 h-40" style={{ background: 'linear-gradient(to bottom, transparent, #06060a)' }} />
              </div>

              <div className="relative z-10 w-full max-w-4xl mx-auto px-5 pt-28 pb-16 flex flex-col items-center text-center">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                  className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.28)', backdropFilter: 'blur(8px)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#c8102e' }} />
                  <span className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.75)' }}>הדרך המהירה ביותר למכור רכב</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-black leading-[1.05] tracking-tight mb-5" style={{ fontSize: 'clamp(2.6rem, 8vw, 5.5rem)' }}>
                  <span className="text-white">מוכרים רכב?</span>
                  <br />
                  <span style={{ background: 'linear-gradient(135deg, #ff3d5e 0%, #c8102e 50%, #a50d25 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    אנחנו מוכרים אותו מהר יותר.
                  </span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 }}
                  className="text-base md:text-lg leading-relaxed mb-10 max-w-xl" style={{ color: 'rgba(255,255,255,0.48)' }}>
                  YOUGO ISRAEL — פלטפורמת השיווק המובילה באינסטגרם למכירת רכבים.
                </motion.p>

                <div className="flex flex-col sm:flex-row items-center gap-3 mb-10 w-full justify-center">
                  <button onClick={() => { document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="group relative flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-[15px] text-white w-full sm:w-auto justify-center overflow-hidden transition-transform hover:scale-[1.03] active:scale-[.97]"
                    style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)', boxShadow: '0 8px 32px rgba(200,16,46,0.4)' }}>
                    <Sparkles size={18} /><span className="relative">התחל הזמנה</span>
                  </button>
                  <button onClick={() => setView('check-status')}
                    className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-[15px] w-full sm:w-auto justify-center transition-all hover:bg-white/8 active:scale-[.97]"
                    style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.04)' }}>
                    <Search size={18} />בדוק סטטוס
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
                  {[
                    { icon: <ShieldCheck size={14} />, label: 'תשלום מאובטח', c: '#22c55e' },
                    { icon: <Clock size={14} />, label: 'פרסום תוך 24 שעות', c: '#60a5fa' },
                    { icon: <Users size={14} />, label: '50K+ עוקבים', c: '#c8102e' },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span style={{ color: b.c }}>{b.icon}</span>
                      <span className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>{b.label}</span>
                      {i < 2 && <span className="w-px h-3 mx-1 hidden sm:block" style={{ background: 'rgba(255,255,255,0.1)' }} />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer" style={{ color: 'rgba(255,255,255,0.2)' }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <ChevronDown size={28} />
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="space-y-14">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-brand-red/15 border border-brand-red/25 rounded-full px-5 py-2">
                  <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-brand-red">תהליך פשוט ומהיר</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white">איך זה עובד?</h2>
                <p className="text-white/45 text-base">3 שלבים פשוטים והרכב שלך באוויר</p>
              </div>

              <div className="relative max-w-5xl mx-auto">
                <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+40px)] right-[calc(16.66%+40px)] h-px z-0"
                  style={{ backgroundImage: `repeating-linear-gradient(90deg, rgba(200,16,46,0.35) 0px, rgba(200,16,46,0.35) 8px, transparent 8px, transparent 18px)` }} />
                <div className="grid md:grid-cols-3 gap-6 relative z-10">
                  {[
                    { step: '01', title: 'בחירת חבילה', desc: 'עיינו בחבילות הפרסום ובחרו את המסלול המתאים לצרכים שלכם. כל חבילה כוללת פירוט מלא של השירותים.', icon: <LayoutDashboard size={24} />, color: '#c8102e', bg: 'rgba(200,16,46,0.1)', border: 'rgba(200,16,46,0.25)', tag: 'בחר ושלם', tagIcon: <Check size={9} strokeWidth={3} /> },
                    { step: '02', title: 'הזנת פרטים', desc: 'מלאו פרטי הרכב בטופס המאובטח, העלו אישור תשלום ושלחו את הבקשה. התהליך לוקח פחות מ-3 דקות.', icon: <FileText size={24} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)', tag: 'פחות מ-3 דקות', tagIcon: <Clock size={9} /> },
                    { step: '03', title: 'פרסום וחשיפה', desc: 'הצוות המקצועי שלנו מעצב ומפרסם מודעה ברמה הגבוהה ביותר. תוך 24 שעות הרכב שלכם נחשף לאלפי קונים.', icon: <Send size={24} />, color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', tag: 'תוך 24 שעות', tagIcon: <Zap size={9} /> },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-5">
                      <div className="relative">
                        <div className="w-[104px] h-[104px] rounded-2xl flex flex-col items-center justify-center gap-2"
                          style={{ background: item.bg, border: `1px solid ${item.border}`, boxShadow: `0 6px 24px -8px ${item.color}28` }}>
                          <div style={{ color: item.color }}>{item.icon}</div>
                          <span className="text-[9px] font-black tracking-[0.15em] uppercase" style={{ color: `${item.color}80` }}>שלב {item.step}</span>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        <h3 className="text-xl font-black text-white">{item.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed max-w-[250px] mx-auto">{item.desc}</p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black"
                        style={{ background: item.bg, border: `1px solid ${item.border}`, color: item.color }}>
                        {item.tagIcon}{item.tag}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between gap-4 p-5 rounded-2xl flex-wrap"
                  style={{ background: 'linear-gradient(135deg, rgba(200,16,46,0.1) 0%, rgba(10,10,15,0.8) 100%)', border: '1px solid rgba(200,16,46,0.2)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-red/15 border border-brand-red/25 flex items-center justify-center">
                      <Zap size={18} className="text-brand-red" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">מוכנים להתחיל?</p>
                      <p className="text-[11px] text-white/45">תהליך מהיר, פשוט ומקצועי</p>
                    </div>
                  </div>
                  <button onClick={() => { const el = document.getElementById('packages'); el?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="px-6 py-2.5 rounded-xl font-black text-sm text-white relative overflow-hidden group flex items-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)' }}>
                    <RocketIcon size={14} />בחר חבילה עכשיו
                  </button>
                </div>
              </div>
            </section>

            {/* PACKAGES SECTION */}
            <section id="packages" className="space-y-20">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center space-y-4">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg, rgba(200,16,46,0.15), rgba(200,16,46,0.05))', border: '1px solid rgba(200,16,46,0.3)' }}>
                  <Sparkles size={14} className="text-brand-red" />
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-brand-red">חבילות הפרסום שלנו</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-black text-white">
                  חבילות הפרסום שלנו
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                  className="text-white/45 text-base max-w-2xl mx-auto">
                  בחר את המסלול המתאים ביותר עבורך
                </motion.p>
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
                  className="mx-auto h-px w-32" style={{ background: 'linear-gradient(90deg, transparent, #c8102e, transparent)' }} />
              </motion.div>

              {/* REGULAR PACKAGES */}
              <div className="space-y-8">
                {/* === REDESIGNED SECTION HEADER: רכב פרטי === */}
                <div className="relative rounded-3xl p-6 md:p-10"
                  style={{ background: 'linear-gradient(135deg, rgba(200,16,46,0.08) 0%, rgba(10,10,15,0.95) 50%, rgba(6,6,10,1) 100%)', border: '1px solid rgba(200,16,46,0.18)' }}>
                  {/* decorative glow */}
                  <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(200,16,46,0.12) 0%, transparent 65%)' }} />
                  <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(200,16,46,0.06) 0%, transparent 65%)' }} />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(200,16,46,0.15)', border: '1px solid rgba(200,16,46,0.3)' }}>
                        <Car size={12} className="text-brand-red" />
                        <span className="text-[10px] font-black tracking-wider text-brand-red uppercase">רכב פרטי</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        מוכרים <span className="text-brand-red">רכב פרטי?</span>
                      </h3>
                      <p className="text-white/45 text-sm leading-relaxed max-w-lg">
                        שלוש חבילות מדורגות לכל תקציב ומטרה. מחבילת הכניסה הבסיסית ועד הפרמיום המלא – כל אחת מותאמת לסוג הרכב ולמטרת המכירה שלך.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {[
                        { value: '₪149', label: 'מחבילה', color: '#94a3b8', icon: <DollarSign size={12} /> },
                        { value: '1,000+', label: 'מכירות', color: '#c8102e', icon: <Trophy size={12} /> },
                        { value: '7-30', label: 'ימי פרסום', color: '#4ade80', icon: <Calendar size={12} /> },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                          style={{ background: `${s.color}10`, border: `1px solid ${s.color}22` }}>
                          <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.color}20` }}>
                            <span style={{ color: s.color }}>{s.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-black leading-tight" style={{ color: s.color }}>{s.value}</div>
                            <div className="text-[9px] text-white/30 font-bold">{s.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
                  {packages.map(pkg => (
                    <div key={pkg.id} className="h-[520px]">
                      <PackageCard pkg={pkg} lang={lang} onSelect={handleSelectPackage} />
                    </div>
                  ))}
                </div>

                <div className="md:hidden px-3">
                  <MobileSwiper cardHeight={520}>
                    {packages.map(pkg => (
                      <PackageCard key={pkg.id} pkg={pkg} lang={lang} onSelect={handleSelectPackage} />
                    ))}
                  </MobileSwiper>
                </div>
              </div>

              {/* VIP + DUO */}
              <div className="space-y-8">
                {/* === REDESIGNED SECTION HEADER: VIP === */}
                <div className="relative rounded-3xl p-6 md:p-10"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(10,10,15,0.95) 50%, rgba(6,6,10,1) 100%)', border: '1px solid rgba(212,175,55,0.2)' }}>
                  <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.1) 0%, transparent 65%)' }} />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)' }}>
                        <Crown size={12} className="text-amber-400" />
                        <span className="text-[10px] font-black tracking-wider text-amber-400 uppercase">פרימיום VIP</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        מחפשים <span className="text-amber-400">יחס VIP?</span>
                      </h3>
                      <p className="text-white/45 text-sm leading-relaxed max-w-lg">
                        לרכבי יוקרה וכאלה שמוכרים שני רכבים בבת אחת – שתי חבילות ייחודיות עם שירות אישי, עיצוב בלעדי, וחסכון משמעותי.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {[
                        { value: '60 יום', label: 'פרסום VIP', color: '#d4af37', icon: <Calendar size={12} /> },
                        { value: '40%', label: 'חיסכון DUO', color: '#8b5cf6', icon: <Percent size={12} /> },
                        { value: '24/7', label: 'ליווי אישי', color: '#4ade80', icon: <Headphones size={12} /> },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                          style={{ background: `${s.color}10`, border: `1px solid ${s.color}22` }}>
                          <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.color}20` }}>
                            <span style={{ color: s.color }}>{s.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-black leading-tight" style={{ color: s.color }}>{s.value}</div>
                            <div className="text-[9px] text-white/30 font-bold">{s.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:grid grid-cols-2 gap-6">
                  <div className="h-[460px]"><VIPPackageCard pkg={vipPackage} lang={lang} onSelect={handleSelectPackage} /></div>
                  <div className="h-[460px]"><DuoDealPackageCard pkg={duoPackage} onSelect={handleSelectPackage} /></div>
                </div>

                <div className="md:hidden px-3">
                  <MobileSwiper cardHeight={460}>
                    <div style={{ height: '460px' }}><VIPPackageCard pkg={vipPackage} lang={lang} onSelect={handleSelectPackage} /></div>
                    <div style={{ height: '460px' }}><DuoDealPackageCard pkg={duoPackage} onSelect={handleSelectPackage} /></div>
                  </MobileSwiper>
                </div>
              </div>

              {/* BUSINESS */}
              <div className="max-w-3xl mx-auto space-y-8">
                {/* === REDESIGNED SECTION HEADER: Business === */}
                <div className="relative rounded-3xl p-6 md:p-10"
                  style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(10,10,15,0.95) 50%, rgba(6,6,10,1) 100%)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 65%)' }} />
                  <div className="absolute inset-0 opacity-3" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' }}>
                        <Building2 size={12} className="text-blue-400" />
                        <span className="text-[10px] font-black tracking-wider text-blue-400 uppercase">לסוכנויות ועסקים</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        פתרון מקצועי <span className="text-blue-400">לעסקים?</span>
                      </h3>
                      <p className="text-white/45 text-sm leading-relaxed max-w-lg">
                        חבילות מותאמות לסוכנויות רכב, עם אפשרויות גמישות לניהול מלא. עד 100 רכבים בחודש, מנהל לקוח ייעודי ודוחות שבועיים.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {[
                        { value: '50-100', label: 'רכבים/חודש', color: '#3b82f6', icon: <Car size={12} /> },
                        { value: '40-50%', label: 'הנחה', color: '#4ade80', icon: <Percent size={12} /> },
                        { value: '24/7', label: 'תמיכה', color: '#a78bfa', icon: <Headphones size={12} /> },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                          style={{ background: `${s.color}10`, border: `1px solid ${s.color}22` }}>
                          <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.color}20` }}>
                            <span style={{ color: s.color }}>{s.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-black leading-tight" style={{ color: s.color }}>{s.value}</div>
                            <div className="text-[9px] text-white/30 font-bold">{s.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[460px]"><BusinessPackageCard pkg={businessPackage} onSelect={handleSelectPackage} /></div>
                  <div className="h-[460px]"><BusinessPackageCard pkg={businessPackage100} onSelect={handleSelectPackage} /></div>
                </div>
              </div>

              {/* EQUIPMENT + TRANSPORT */}
              <div className="space-y-8">
                {/* === REDESIGNED SECTION HEADER: ציוד === */}
                <div className="relative rounded-3xl p-6 md:p-10"
                  style={{ background: 'linear-gradient(135deg, rgba(234,88,12,0.08) 0%, rgba(10,10,15,0.95) 50%, rgba(6,6,10,1) 100%)', border: '1px solid rgba(234,88,12,0.2)' }}>
                  <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(234,88,12,0.1) 0%, transparent 65%)' }} />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(234,88,12,0.12)', border: '1px solid rgba(234,88,12,0.3)' }}>
                        <Truck size={12} className="text-orange-400" />
                        <span className="text-[10px] font-black tracking-wider text-orange-400 uppercase">ציוד מקצועי ותחבורה</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        מוכרים <span className="text-orange-400">ציוד מקצועי?</span>
                      </h3>
                      <p className="text-white/45 text-sm leading-relaxed max-w-lg">
                        חבילות ייחודיות לציוד כבד, ציוד קל, ורכבים מסחריים. חשיפה ממוקדת לקהל המקצועי הנכון – קבלנים, חברות הסעות, ועסקים.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {[
                        { value: '85%', label: 'נמכרו תוך 14 יום', color: '#ea580c', icon: <TrendingUp size={12} /> },
                        { value: '500+', label: 'ציודים פורסמו', color: '#0ea5e9', icon: <Truck size={12} /> },
                        { value: '3', label: 'קטגוריות', color: '#4ade80', icon: <Target size={12} /> },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                          style={{ background: `${s.color}10`, border: `1px solid ${s.color}22` }}>
                          <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${s.color}20` }}>
                            <span style={{ color: s.color }}>{s.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-black leading-tight" style={{ color: s.color }}>{s.value}</div>
                            <div className="text-[9px] text-white/30 font-bold">{s.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:grid grid-cols-3 gap-6">
                  {equipmentPackages.map(pkg => (
                    <div key={pkg.id} className="h-[460px]"><EquipmentPackageCard pkg={pkg} onSelect={handleSelectPackage} /></div>
                  ))}
                  <div className="h-[460px]"><TransportPackageCard pkg={transportPackage} onSelect={handleSelectPackage} /></div>
                </div>

                <div className="md:hidden px-3">
                  <MobileSwiper cardHeight={460}>
                    {equipmentPackages.map(pkg => (
                      <div key={pkg.id} style={{ height: '460px' }}><EquipmentPackageCard pkg={pkg} onSelect={handleSelectPackage} /></div>
                    ))}
                    <div style={{ height: '460px' }}><TransportPackageCard pkg={transportPackage} onSelect={handleSelectPackage} /></div>
                  </MobileSwiper>
                </div>
              </div>
            </section>

            {/* ============================================================
                WHY US - COMPLETELY REDESIGNED
            ============================================================ */}
            <section id="why-us" className="space-y-14">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.25)' }}>
                  <Trophy size={13} className="text-brand-red" />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-red">ההצלחה שלנו במספרים</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white">
                  למה לבחור ב-<span className="text-brand-red">YOUGO?</span>
                </h2>
                <p className="text-white/40 text-base max-w-xl mx-auto">
                  הסיבות שאלפי מוכרים בחרו דווקא בנו – בנתונים אמיתיים שמדברים בעד עצמם
                </p>
              </div>

              {/* Big Stats Row */}
              <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto">
                {[
                  { value: '50K+', label: 'עוקבים פעילים', sublabel: 'באינסטגרם', color: '#c8102e', icon: <Users size={20} /> },
                  { value: '48h', label: 'ממוצע זמן מכירה', sublabel: 'מפרסום ועד עסקה', color: '#f59e0b', icon: <Timer size={20} /> },
                  { value: '98%', label: 'שביעות רצון', sublabel: 'לקוחות מרוצים', color: '#22c55e', icon: <ThumbsUp size={20} /> },
                ].map((stat, i) => (
                  <div key={i} className="relative text-center py-6 px-4 rounded-2xl overflow-hidden"
                    style={{ background: `linear-gradient(145deg, ${stat.color}12 0%, rgba(6,6,10,0.95) 100%)`, border: `1px solid ${stat.color}25` }}>
                    <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}30` }}>
                      <span style={{ color: stat.color }}>{stat.icon}</span>
                    </div>
                    <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-white text-xs font-black mb-0.5">{stat.label}</div>
                    <div className="text-white/30 text-[10px]">{stat.sublabel}</div>
                  </div>
                ))}
              </div>

              {/* 3 Feature Cards - New Design */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    icon: <Users size={22} />,
                    title: 'קהל איכותי ומעורב',
                    desc: 'מעל 50,000 עוקבים פעילים שמחפשים לקנות רכב. לא עוקבים רדומים – אנשים שבאמת מעוניינים לבצע עסקה.',
                    points: ['טרגוט לפי גיל ואזור גיאוגרפי', 'קהל עם כוח קנייה מוכח', 'חשיפה אורגנית + ממומנת'],
                    gradFrom: '#1d4ed8',
                    gradTo: '#0ea5e9',
                    glowColor: 'rgba(59,130,246,0.25)',
                    stat: '50K+',
                    statLabel: 'עוקבים'
                  },
                  {
                    icon: <Zap size={22} />,
                    title: 'מהירות מכירה יוצאת דופן',
                    desc: 'פרסום חכם שמביא תוצאות תוך שעות. הרכב שלך מופיע בפני האנשים הנכונים ברגע הנכון.',
                    points: ['פרסום תוך 24 שעות מאישור', 'פניות ראשונות תוך 3-6 שעות', 'ממוצע 48 שעות עד עסקה'],
                    gradFrom: '#c8102e',
                    gradTo: '#f43f5e',
                    glowColor: 'rgba(200,16,46,0.3)',
                    stat: '48h',
                    statLabel: 'ממוצע מכירה'
                  },
                  {
                    icon: <TrendingUp size={22} />,
                    title: 'תוצאות מוכחות',
                    desc: '98% מלקוחותינו מרוצים ומוכרים בהצלחה. אנחנו לא רק מפרסמים – אנחנו מוכרים.',
                    points: ['מעל 1,000 עסקאות מוצלחות', 'עיצוב ותוכן מקצועיים', 'ייעוץ תמחור ללא עלות'],
                    gradFrom: '#16a34a',
                    gradTo: '#22c55e',
                    glowColor: 'rgba(34,197,94,0.25)',
                    stat: '98%',
                    statLabel: 'הצלחה'
                  },
                ].map((item, i) => (
                  <div key={i} className="relative rounded-2xl overflow-hidden flex flex-col group"
                    style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(6,6,10,0.98) 100%)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: `0 20px 50px -20px ${item.glowColor}` }}>
                    {/* Top color bar */}
                    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${item.gradFrom}, ${item.gradTo})` }} />

                    <div className="p-6 flex flex-col gap-5 flex-1">
                      {/* Icon + stat */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${item.gradFrom}, ${item.gradTo})`, boxShadow: `0 6px 20px ${item.glowColor}` }}>
                          <span className="text-white">{item.icon}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black leading-none" style={{ color: item.gradTo }}>{item.stat}</div>
                          <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider mt-0.5">{item.statLabel}</div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${item.gradFrom}30, transparent)` }} />

                      {/* Text */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-black text-white">{item.title}</h3>
                        <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                      </div>

                      {/* Points */}
                      <div className="flex flex-col gap-2 mt-auto">
                        {item.points.map((point, pi) => (
                          <div key={pi} className="flex items-center gap-2.5">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: `${item.gradTo}20`, border: `1px solid ${item.gradTo}40` }}>
                              <Check size={8} strokeWidth={3} style={{ color: item.gradTo }} />
                            </div>
                            <span className="text-[11.5px] text-white/65 font-medium">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom trust bar */}
              <div className="relative overflow-hidden rounded-2xl p-6 md:p-8"
                style={{ background: 'linear-gradient(135deg, rgba(200,16,46,0.08) 0%, rgba(6,6,10,0.99) 100%)', border: '1px solid rgba(200,16,46,0.15)' }}>
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
                  {[
                    { icon: <ShieldCheck size={18} />, label: 'תשלום מאובטח', color: '#22c55e' },
                    { icon: <Clock size={18} />, label: 'פרסום תוך 24 שעות', color: '#60a5fa' },
                    { icon: <MessageCircle size={18} />, label: 'תמיכה בוואטסאפ', color: '#25D366' },
                    { icon: <Award size={18} />, label: 'צוות מקצועי מנוסה', color: '#f59e0b' },
                    { icon: <BarChart3 size={18} />, label: '1,000+ עסקאות', color: '#c8102e' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                        <span style={{ color: item.color }}>{item.icon}</span>
                      </div>
                      <span className="text-sm font-bold text-white/60">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ============================================================
                REVIEWS SECTION
            ============================================================ */}
            <section id="reviews" className="space-y-12">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)' }}>
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-amber-400">לקוחות מרוצים</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white">
                  מה אומרים <span className="text-amber-400">הלקוחות?</span>
                </h2>
                <p className="text-white/40 text-base">ביקורות אמיתיות מלקוחות שמכרו דרכנו</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <span className="text-white font-black text-lg">4.9</span>
                  <span className="text-white/40 text-sm">מתוך 5 · 1,000+ ביקורות</span>
                </div>
              </div>

              {(() => {
                const allReviews = [
                  { name: 'יוסף אבו חמד', location: 'נצרת', pkg: 'PRO', lang: 'ar', text: 'والله شي ما توقعته، نشروا السيارة وبعد 6 ساعات اتصل فيني واحد وعمل الصفقة. الصور طلعت كثير احترافية وكلام التسويق كان ممتاز. رح ارسل كمان سيارة الشهر الجاي', stars: 5, time: 'לפני 3 ימים', avatar: 'ي' },
                  { name: 'דני לוי', location: 'תל אביב', pkg: 'PREMIUM', lang: 'he', text: 'מכרתי BMW 3 סיריס תוך יומיים מהפרסום. ממש לא האמנתי שזה יקרה כל כך מהר. התמונות יצאו מקצועיות ברמה גבוהה, וראיתי שהאינסטגרם שלהם עם קהל ממש איכותי', stars: 5, time: 'לפני 5 ימים', avatar: 'ד' },
                  { name: 'מוחמד ח׳ורי', location: 'חיפה', pkg: 'VIP', lang: 'ar', text: 'بعت مرسيدس E-Class بـ 750 الف شيكل بعد 3 أيام بس! الخدمة VIP كانت تستاهل كل شيكل. المدير الشخصي كان متاح كل وقت وساعدني بكل شي', stars: 5, time: 'לפני שבוע', avatar: 'م' },
                  { name: 'שרה כהן', location: 'ירושלים', pkg: 'BASIC', lang: 'he', text: 'הזמנתי חבילה בסיסית ולא ציפיתי ליותר מדי, אבל קיבלתי שירות מעולה. הרכב שלי נמכר תוך 10 ימים במחיר שביקשתי. שווה כל שקל', stars: 5, time: 'לפני 10 ימים', avatar: 'ש' },
                  { name: 'אחמד נאסר', location: 'טירה', pkg: 'DUO DEAL', lang: 'ar', text: 'عندي سيارتين بدهم يروحوا، جربت الـ DUO DEAL وكانت صفقة ممتازة. الأولى اتباعت بعد يوم، والثانية بعد 4 أيام. توفرت فلوس كثيرة مقارنة لو دفعت لكل واحدة لحالها', stars: 5, time: 'לפני שבועיים', avatar: 'أ' },
                  { name: 'רוני אברהם', location: 'באר שבע', pkg: 'PRO', lang: 'he', text: 'ניסיתי קודם יד2 ולא קיבלתי שום פניות. עברתי ל-YOUGO ותוך 48 שעות היו לי 4 פניות רציניות. בסוף מכרתי מעל המחיר שרציתי כי היו כמה מתעניינים במקביל', stars: 5, time: 'לפני 3 שבועות', avatar: 'ר' },
                  { name: 'פאטמה עלי', location: 'אום אל פחם', pkg: 'PRO', lang: 'ar', text: 'كنت خايفة بالأول لأني ما جربت هالنوع من الإعلانات. بس الشباب شرحولي كل شي وساعدوني. السيارة تباعت بـ 48 ساعة! الصور كانوا يجننوا الناس', stars: 5, time: 'לפני חודש', avatar: 'ف' },
                  { name: 'אייל גולן', location: 'רמת גן', pkg: 'PREMIUM', lang: 'he', text: 'שלחתי פורשה קאיין ל-YOUGO ואחרי 24 שעות כבר היו 7 פניות. מכרתי ב-580 אלף שקל. הצוות שלהם עשה עבודת צילום ועיצוב ברמה של מגזין', stars: 5, time: 'לפני חודש', avatar: 'א' },
                  { name: 'ח׳אלד מחמוד', location: 'בקה אל גרבייה', pkg: 'BASIC', lang: 'ar', text: 'بدي قول الحقيقة - توقعتها تاخد وقت أكثر. بعت السيارة بـ 7 أيام بالضبط. الخدمة سريعة وما حسيت بأي مشكلة. يستاهلوا النجوم', stars: 5, time: 'לפני 5 שבועות', avatar: 'خ' },
                  { name: 'מיכל שפירא', location: 'פתח תקווה', pkg: 'PRO', lang: 'he', text: 'בעלי ואני מכרנו את שני הרכבים שלנו בחודש האחרון דרך YOUGO. שניהם נמכרו תוך שבוע. ממליצה בחום לכל מי שמחפש תוצאות אמיתיות ולא רק הבטחות', stars: 5, time: 'לפני 6 שבועות', avatar: 'מ' },
                  { name: 'סאמר זועבי', location: 'שפרעם', pkg: 'VIP', lang: 'ar', text: 'عندي رنج روفر فيل موديل 2023 بعته بـ 1.2 مليون شيكل! الـ VIP كان يستاهل. الصور كانت كأنها من مجلة سيارات وكلام التسويق كان ذكي جداً', stars: 5, time: 'לפני 2 חודשים', avatar: 'س' },
                  { name: 'ניר ביטון', location: 'נתניה', pkg: 'BASIC', lang: 'he', text: 'פשוט עובד. שילמתי 149 שקל, קיבלתי פרסום מקצועי, ומכרתי סוזוקי מרוטי תמורת המחיר המלא. לא צריך יותר מזה', stars: 5, time: 'לפני 2 חודשים', avatar: 'נ' },
                  { name: 'ריאן אבו ריא', location: 'כפר כנא', pkg: 'PRO', lang: 'ar', text: 'ابعت صور السيارة على الواتساب وبعد ساعتين كانت الصور منشورة وكلام التسويق. الأسلوب عندهم عالمستوى. بعت هيونداي توسان بـ 3 أيام', stars: 5, time: 'לפני 2 חודשים', avatar: 'ر' },
                  { name: 'אסף מזרחי', location: 'אשדוד', pkg: 'PREMIUM', lang: 'he', text: 'הרכב שלי עמד חודשיים ב-yad2 בלי שום פניות רציניות. עברתי ל-YOUGO ותוך 5 ימים מכרתי. ההבדל הוא הקהל - אנשים שמחפשים לקנות באמת', stars: 5, time: 'לפני 3 חודשים', avatar: 'א' },
                  { name: 'לינא חסן', location: 'עכו', pkg: 'DUO DEAL', lang: 'ar', text: 'انا وجوزي عندنا سيارتين بدنا نبيعهم. جربنا الـ DUO وبالله اتباعوا الاثنتين بأسبوع. وفرنا 250 شيكل وحصلنا على نفس الجودة. شكراً جزيلاً', stars: 5, time: 'לפני 3 חודשים', avatar: 'ل' },
                  { name: 'תומר לוינשטיין', location: 'חולון', pkg: 'PRO', lang: 'he', text: 'מוכר רכבים מדי שנה כי אני מחליף הרבה. YOUGO הפך להיות הדרך היחידה שאני מפרסם. מהיר, מקצועי, ותמיד מביא תוצאות. כבר 4 עסקאות דרכם', stars: 5, time: 'לפני 3 חודשים', avatar: 'ת' },
                  { name: 'ג׳ואד מחאמיד', location: 'ג׳לג׳וליה', pkg: 'PRO', lang: 'ar', text: 'ما حسبتش راح يجي واحد بجد بهالسرعة. بعد 30 ساعة من النشر جالي 3 تلفونات وبعت السيارة لأول واحد. خدمة ممتازة وناس محترمين', stars: 5, time: 'לפני 4 חודשים', avatar: 'ج' },
                  { name: 'הדס פרץ', location: 'ראשון לציון', pkg: 'PREMIUM', lang: 'he', text: 'לא האמנתי שאינסטגרם יכול למכור רכב. YOUGO הוכיח לי שטעיתי. מכרתי הונדה HR-V תוך 4 ימים ב-98 אלף שקל. הצילומים שלהם שינו הכל', stars: 5, time: 'לפני 4 חודשים', avatar: 'ה' },
                  { name: 'עמאד כבהה', location: 'רהט', pkg: 'BASIC', lang: 'ar', text: 'حتى مع الباقة الأرخص الخدمة كانت ممتازة. نشروا الإعلان بسرعة والصور كانت ظبط. بعت السيارة بـ 9 أيام وأنا مبسوط جداً', stars: 5, time: 'לפני 5 חודשים', avatar: 'ع' },
                  { name: 'ליאור דהן', location: 'מודיעין', pkg: 'VIP', lang: 'he', text: 'מכרתי לקסוס IS350 ב-VIP LUXURY. השירות האישי היה ברמה אחרת - מנהל לקוח שענה בכל שעה, עיצוב שנראה כמו פרסומת טלוויזיה. מכרתי ב-3 ימים', stars: 5, time: 'לפני 6 חודשים', avatar: 'ל' },
                ];

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {allReviews.slice(0, showAllReviews ? allReviews.length : 3).map((rev, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          className="relative rounded-2xl p-5 flex flex-col gap-4"
                          style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(6,6,10,0.98) 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
                          {/* Top bar */}
                          <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.6), transparent)' }} />
                          
                          {/* Quote icon */}
                          <div className="absolute top-4 left-4 text-4xl font-black leading-none opacity-10 text-amber-400">"</div>

                          {/* Stars */}
                          <div className="flex gap-0.5">
                            {[...Array(rev.stars)].map((_, si) => (
                              <Star key={si} size={12} className="text-amber-400 fill-amber-400" />
                            ))}
                          </div>

                          {/* Text */}
                          <p className="text-white/75 text-sm leading-relaxed flex-1" dir={rev.lang === 'ar' ? 'rtl' : 'rtl'}>
                            "{rev.text}"
                          </p>

                          {/* Bottom */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/6">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                                style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)', color: 'white' }}>
                                {rev.avatar}
                              </div>
                              <div>
                                <div className="text-xs font-black text-white">{rev.name}</div>
                                <div className="text-[9px] text-white/35 flex items-center gap-1">
                                  <MapPin size={8} />{rev.location}
                                </div>
                              </div>
                            </div>
                            <div className="text-left">
                              <div className="text-[8px] font-black px-2 py-0.5 rounded-full"
                                style={{ background: 'rgba(200,16,46,0.12)', color: '#c8102e', border: '1px solid rgba(200,16,46,0.2)' }}>
                                {rev.pkg}
                              </div>
                              <div className="text-[8px] text-white/25 text-left mt-1">{rev.time}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {allReviews.length > 3 && (
                      <div className="text-center">
                        <button onClick={() => setShowAllReviews(prev => !prev)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm border border-white/12 bg-white/5 hover:bg-white/10 transition-all"
                          style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {showAllReviews ? (
                            <><ChevronUp size={16} /> הסתר ביקורות</>
                          ) : (
                            <><ChevronDown size={16} /> הצג עוד {allReviews.length - 3} ביקורות</>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </section>

            {/* FAQ */}
            <section id="faq" className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.25)' }}>
                  <HelpCircle size={13} className="text-brand-red" />
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-red">שאלות נפוצות</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white">שאלות <span className="text-brand-red">נפוצות</span></h2>
                <p className="text-white/45 text-base">כל מה שצריך לדעת על תהליך הפרסום והמכירה</p>
              </div>

              <div className="space-y-2.5">
                {t.faqs.slice(0, showAllReviews ? t.faqs.length : 4).map((item, i) => {
                  const isOpen = activeFaq === i;
                  return (
                    <div key={i}
                      className="rounded-2xl overflow-hidden transition-all duration-200"
                      style={{
                        background: isOpen
                          ? 'linear-gradient(135deg, rgba(200,16,46,0.08) 0%, rgba(10,10,14,0.98) 100%)'
                          : 'rgba(255,255,255,0.03)',
                        border: isOpen
                          ? '1px solid rgba(200,16,46,0.25)'
                          : '1px solid rgba(255,255,255,0.07)',
                      }}>
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : i)}
                        className="w-full px-5 py-4 flex items-center gap-4 text-right transition-colors hover:bg-white/3"
                      >
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-all"
                          style={{
                            background: isOpen ? 'linear-gradient(135deg, #c8102e, #a50d25)' : 'rgba(255,255,255,0.06)',
                            color: isOpen ? 'white' : 'rgba(255,255,255,0.4)',
                            border: isOpen ? 'none' : '1px solid rgba(255,255,255,0.1)',
                          }}>
                          {i + 1}
                        </div>
                        <span className="flex-1 font-bold text-sm md:text-base text-right"
                          style={{ color: isOpen ? 'white' : 'rgba(255,255,255,0.8)' }}>
                          {item.q}
                        </span>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
                          style={{
                            background: isOpen ? 'rgba(200,16,46,0.15)' : 'rgba(255,255,255,0.05)',
                            border: isOpen ? '1px solid rgba(200,16,46,0.3)' : '1px solid rgba(255,255,255,0.08)',
                          }}>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={14} style={{ color: isOpen ? '#c8102e' : 'rgba(255,255,255,0.4)' }} />
                          </motion.div>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pr-[68px]">
                              <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,16,46,0.2), transparent)' }} />
                              <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {t.faqs.length > 4 && (
                <div className="text-center">
                  <button
                    onClick={() => setShowAllReviews(v => !v)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm border transition-all"
                    style={{
                      background: showAllReviews ? 'rgba(200,16,46,0.1)' : 'rgba(255,255,255,0.05)',
                      border: showAllReviews ? '1px solid rgba(200,16,46,0.3)' : '1px solid rgba(255,255,255,0.1)',
                      color: showAllReviews ? '#c8102e' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {showAllReviews
                      ? <><ChevronUp size={15} /> הסתר שאלות</>
                      : <><ChevronDown size={15} /> הצג את כל {t.faqs.length} השאלות</>
                    }
                  </button>
                </div>
              )}
            </section>

            {/* ============================================================
                FOOTER - COMPLETELY REDESIGNED
            ============================================================ */}
            <footer className="pb-10">
              <div className="relative rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(10,10,15,0.99) 0%, #06060a 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {/* Top red line */}
                <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(200,16,46,0.8) 30%, rgba(200,16,46,0.8) 70%, transparent 100%)' }} />

                {/* Main footer grid */}
                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-10">
                  
                  {/* Brand col */}
                  <div className="md:col-span-4 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-brand-red to-red-700 rounded-xl shadow-xl shadow-brand-red/25">
                        <Car size={22} className="text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-black tracking-tighter">
                          <span className="text-brand-red">YOUGO</span> <span className="text-white">ISRAEL</span>
                        </div>
                        <div className="text-[9px] text-white/25 tracking-[0.2em] uppercase font-bold">מוכרים מהר יותר · 50K+ עוקבים</div>
                      </div>
                    </div>

                    <p className="text-white/35 text-sm leading-relaxed">
                      הפלטפורמה המובילה בישראל לפרסום ומכירת רכבים, ציוד מקצועי ורכבים מסחריים ברשתות החברתיות. מעל 50,000 עוקבים, מעל 1,000 עסקאות מוצלחות.
                    </p>

                    {/* Contact info */}
                    <div className="space-y-2">
                      <a href="https://wa.me/972546980606" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white/70 transition-colors group">
                        <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                          <MessageCircle size={13} className="text-green-400" />
                        </div>
                        054-6980606
                      </a>
                      <div className="flex items-center gap-2.5 text-sm text-white/40">
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                          <MapPin size={13} className="text-white/30" />
                        </div>
                        ישראל · פעילים בכל הארץ
                      </div>
                    </div>

                    {/* Social icons */}
                    <div>
                      <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.25em] mb-3">עקבו אחרינו</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {[
                          { href: 'https://instagram.com/yougo.israel', icon: <Instagram size={16} />, label: 'Instagram', color: '#fff', bg: 'linear-gradient(135deg,#833ab4,#e1306c,#f77737)', shadow: '0 3px 10px rgba(225,48,108,0.3)' },
                          { href: 'https://facebook.com', icon: <Facebook size={16} />, label: 'Facebook', color: '#1877F2', bg: 'rgba(24,119,242,0.12)' },
                          { href: 'https://wa.me/972546980606', icon: <MessageCircle size={16} />, label: 'WhatsApp', color: '#25D366', bg: 'rgba(37,211,102,0.12)' },
                          { href: 'https://t.me/yougoisrael', icon: <Send size={16} />, label: 'Telegram', color: '#0088cc', bg: 'rgba(0,136,204,0.12)' },
                          { href: 'https://youtube.com/@yougoisrael', icon: <Youtube size={16} />, label: 'YouTube', color: '#FF0000', bg: 'rgba(255,0,0,0.12)' },
                          { href: 'https://x.com/yougoisrael', icon: <Twitter size={16} />, label: 'X', color: '#9ca3af', bg: 'rgba(156,163,175,0.12)' },
                        ].map((s, i) => (
                          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                            style={{ background: s.bg, border: s.shadow ? 'none' : `1px solid ${s.color}25`, color: s.color, boxShadow: s.shadow || 'none' }}
                            title={s.label}>
                            {s.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Links cols */}
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    
                    {/* מידע */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-white/50 uppercase tracking-[0.2em]">מידע</h4>
                      <div className="space-y-1">
                        {[
                          { icon: <HelpCircle size={14} />, label: 'מי אנחנו?', onClick: () => setModalContent({ title: footerPages.about.title, content: footerPages.about.content }), color: '#c8102e' },
                          { icon: <PlayCircle size={14} />, label: 'איך מפרסמים רכב?', onClick: () => setModalContent({ title: footerPages.howItWorks.title, content: footerPages.howItWorks.content }), color: '#3b82f6' },
                          { icon: <Share2 size={14} />, label: 'שיווק שותפים', onClick: () => setModalContent({ title: footerPages.affiliate.title, content: footerPages.affiliate.content }), color: '#22c55e' },
                        ].map((link, i) => (
                          <button key={i} onClick={link.onClick}
                            className="flex items-center gap-2.5 py-2 px-3 rounded-xl w-full text-right group hover:bg-white/5 transition-all">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors" style={{ background: `${link.color}12`, color: link.color }}>
                              {link.icon}
                            </div>
                            <span className="text-sm text-white/45 group-hover:text-white/70 font-medium transition-colors">{link.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* חבילות */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-white/50 uppercase tracking-[0.2em]">חבילות</h4>
                      <div className="space-y-1">
                        {[
                          { label: 'רכב פרטי', color: '#c8102e', icon: <Car size={14} /> },
                          { label: 'VIP LUXURY', color: '#d4af37', icon: <Crown size={14} /> },
                          { label: 'DUO DEAL', color: '#8b5cf6', icon: <Car size={14} /> },
                          { label: 'עסקים וסוכנויות', color: '#3b82f6', icon: <Building2 size={14} /> },
                          { label: 'ציוד ותחבורה', color: '#ea580c', icon: <Truck size={14} /> },
                        ].map((item, i) => (
                          <button key={i} onClick={() => { document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="flex items-center gap-2.5 py-2 px-3 rounded-xl w-full text-right group hover:bg-white/5 transition-all">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}12`, color: item.color }}>
                              {item.icon}
                            </div>
                            <span className="text-sm text-white/45 group-hover:text-white/70 font-medium transition-colors">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* משפטי */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-white/50 uppercase tracking-[0.2em]">משפטי ואחר</h4>
                      <div className="space-y-1">
                        {[
                          { icon: <FileText size={14} />, label: 'תקנון השימוש', onClick: () => setModalContent({ title: footerPages.terms.title, content: footerPages.terms.content }), color: '#94a3b8' },
                          { icon: <Lock size={14} />, label: 'מדיניות פרטיות', onClick: () => setModalContent({ title: footerPages.privacy.title, content: footerPages.privacy.content }), color: '#94a3b8' },
                          { icon: <Search size={14} />, label: 'בדיקת סטטוס', onClick: () => setView('check-status'), color: '#60a5fa' },
                          { icon: <LayoutDashboard size={14} />, label: 'פאנל ניהול', onClick: () => setView('admin-login'), color: '#f59e0b' },
                        ].map((link, i) => (
                          <button key={i} onClick={link.onClick}
                            className="flex items-center gap-2.5 py-2 px-3 rounded-xl w-full text-right group hover:bg-white/5 transition-all">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors" style={{ background: `${link.color}12`, color: link.color }}>
                              {link.icon}
                            </div>
                            <span className="text-sm text-white/45 group-hover:text-white/70 font-medium transition-colors">{link.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-4 p-4 rounded-xl space-y-3"
                        style={{ background: 'linear-gradient(135deg, rgba(200,16,46,0.1), rgba(200,16,46,0.04))', border: '1px solid rgba(200,16,46,0.2)' }}>
                        <p className="text-xs font-black text-white/60">מוכן למכור את הרכב?</p>
                        <button onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                          className="w-full py-2.5 rounded-xl font-black text-xs text-white flex items-center justify-center gap-2"
                          style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)' }}>
                          <Rocket size={12} />בחר חבילה עכשיו
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="px-8 md:px-12 py-5 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-white/18 font-bold">
                    © {new Date().getFullYear()} YOUGO ISRAEL LTD · כל הזכויות שמורות
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] text-white/25 font-bold">מערכת פעילה</span>
                    </div>
                    <div className="text-white/10 text-xs">·</div>
                    <span className="text-[10px] text-white/20 font-bold">Made in Israel 🇮🇱</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )}

        {/* Booking */}
        {view === 'booking' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setView('home')}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-black border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red transition-all text-brand-red hover:text-white">
                <ArrowLeft size={16} /><span>חזרה לחבילות</span>
              </button>
              <div className="h-5 w-px bg-white/20" />
              <span className="text-xs text-white/40 font-bold">{selectedPackage?.name || 'הזמנה חדשה'}</span>
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              {[1, 2].map((step) => (
                <React.Fragment key={step}>
                  <div className={`flex items-center gap-2 ${bookingStep >= step ? 'text-brand-red' : 'text-white/30'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${bookingStep >= step ? 'border-brand-red bg-brand-red/20' : 'border-white/20'}`}>
                      {step}
                    </div>
                    <span className="text-sm font-black">{step === 1 ? 'פרטי רכב' : 'תשלום'}</span>
                  </div>
                  {step === 1 && <div className={`w-16 h-px ${bookingStep >= 2 ? 'bg-brand-red' : 'bg-white/20'}`} />}
                </React.Fragment>
              ))}
            </div>

            <div className="glass-card p-6">
              {bookingStep === 1 && <CarDetailsForm formData={formData} setFormData={setFormData} onNext={() => setBookingStep(2)} selectedPackage={selectedPackage} onChangePackage={() => setShowChangePackage(true)} />}
              {bookingStep === 2 && <PaymentForm formData={formData} setFormData={setFormData} selectedPackage={selectedPackage} onSubmit={handleSubmitOrder} loading={loading} onBack={() => setBookingStep(1)} onChangePackage={() => setShowChangePackage(true)} />}
            </div>
          </div>
        )}

        {/* Success */}
        {view === 'success' && (
          <div className="max-w-md mx-auto text-center space-y-6 py-12">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30">
              <Check size={40} strokeWidth={3} className="text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black">ההזמנה התקבלה!</h2>
              <p className="text-white/60 text-base">מספר הזמנה: <span className="text-brand-red font-black">#{orderId}</span></p>
            </div>
            <div className="glass-card p-6 space-y-4">
              <p className="text-lg font-black">מה קורה עכשיו?</p>
              <div className="space-y-3 text-right">
                {['הודעת וואטסאפ נשלחה למנהל המערכת', 'הצוות שלנו יבדוק את פרטי ההזמנה תוך שעה', 'נחזור אליך עם אישור סופי'].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"><Check size={12} className="text-green-400" /></div>
                    <span className="text-white/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setView('home')}
                className="flex-1 py-3 rounded-xl font-black text-sm border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red transition-all flex items-center justify-center gap-2 text-brand-red hover:text-white">
                <ArrowLeft size={14} />חזרה לדף הבית
              </button>
              <button onClick={() => setView('check-status')}
                className="flex-1 py-3 rounded-xl font-black text-sm shadow-lg flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)' }}>
                <Search size={14} />בדוק סטטוס
              </button>
            </div>
          </div>
        )}

        {/* Check Status */}
        {view === 'check-status' && (
          <div className="max-w-md mx-auto py-8">
            <OrderStatusCheck onClose={() => setView('home')} />
          </div>
        )}

        {/* Admin Login */}
        {view === 'admin-login' && (
          <div className="max-w-sm mx-auto py-12">
            <div className="glass-card p-6 space-y-5">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Lock size={24} className="text-white" />
                </div>
                <h2 className="text-xl font-black">כניסת מנהל</h2>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-3">
                <input type="password" placeholder="סיסמה" required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none"
                  value={adminPassword} onChange={e => setAdminPassword(e.target.value)} />
                <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-brand-red to-red-600 rounded-lg font-black text-sm">כניסה</button>
              </form>
              <button onClick={() => setView('home')}
                className="w-full py-2 rounded-xl text-xs font-bold border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red text-brand-red hover:text-white transition-all flex items-center justify-center gap-2">
                <ArrowLeft size={12} />ביטול
              </button>
            </div>
          </div>
        )}

        {/* Admin Dashboard */}
        {view === 'admin-dashboard' && (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-black flex items-center gap-4"><LayoutDashboard className="text-brand-red" size={40} />לוח בקרה</h2>
                <div className="flex gap-4 mt-4">
                  {['orders', 'settings'].map(tab => (
                    <button key={tab} onClick={() => setAdminTab(tab as any)}
                      className={`px-6 py-2 rounded-full font-black text-sm transition-all ${adminTab === tab ? 'bg-brand-red text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
                      {tab === 'orders' ? 'הזמנות' : 'הגדרות אתר'}
                    </button>
                  ))}
                </div>
              </div>
              {adminTab === 'orders' && (
                <div className="flex items-center gap-4">
                  <div className="glass-card px-6 py-3 flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-bold">{orders.length} הזמנות סה"כ</span>
                  </div>
                  <button onClick={fetchOrders} className="btn-primary py-3 px-6 flex items-center gap-2">
                    <ArrowLeft size={20} className="rotate-90" />רענן נתונים
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
                    <div key={i} className="bg-white rounded-3xl p-6 shadow-xl border border-white/10 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-2xl bg-gray-100 ${stat.color}`}>{stat.icon}</div>
                        <div className="text-4xl font-black text-black">{stat.count}</div>
                      </div>
                      <div className="text-sm font-black text-gray-500 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="glass-card overflow-hidden border-white/10">
                  <div className="overflow-x-auto">
                    <table className="w-full text-right">
                      <thead className="bg-white/5 text-sm font-bold border-b border-white/10">
                        <tr>
                          <th className="p-6">#ID</th><th className="p-6">לקוח</th><th className="p-6">חבילה</th>
                          <th className="p-6">רכב</th><th className="p-6">סטטוס</th><th className="p-6 text-center">פעולות</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {orders.map(order => (
                          <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                            <td className="p-6 font-mono text-sm text-brand-red font-black">YG-{order.id.toString().padStart(4, '0')}</td>
                            <td className="p-6">
                              <div className="text-sm font-bold">{order.full_name}</div>
                              <div className="text-xs text-white/40 flex items-center gap-1"><Smartphone size={12} />{order.phone}</div>
                            </td>
                            <td className="p-6"><span className="text-xs font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10">{order.package_name}</span></td>
                            <td className="p-6">
                              <div className="text-sm font-bold">{order.car_model}</div>
                              <div className="text-xs text-white/40">{order.car_year} | {order.car_mileage} ק"מ</div>
                            </td>
                            <td className="p-6">
                              <div className={`inline-flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-full border ${order.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : order.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : order.status === 'Payment Verified' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Published' ? 'bg-green-500' : order.status === 'Rejected' ? 'bg-red-500' : order.status === 'Payment Verified' ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                                {order.status}
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center justify-center gap-3">
                                <button onClick={() => alert(`פרטי הזמנה ${order.id}`)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white">
                                  <Eye size={18} />
                                </button>
                                <select className="bg-dark-card border border-white/10 text-xs rounded-lg p-2 focus:border-brand-red outline-none"
                                  value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
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
                  {[
                    { label: 'כמות עוקבים (Instagram)', key: 'followers_count' },
                    { label: 'מספר WhatsApp', key: 'whatsapp_number' },
                    { label: 'כותרת ראשית (Hero)', key: 'hero_title_he' },
                    { label: 'שורת מיצוב', key: 'positioning_line_he' },
                  ].map(f => (
                    <div key={f.key} className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{f.label}</label>
                      <input type="text" className="input-field" value={siteSettings[f.key] || ''} onChange={(e) => setSiteSettings({ ...siteSettings, [f.key]: e.target.value })} />
                    </div>
                  ))}
                  <button onClick={async () => {
                    setLoading(true);
                    const res = await fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(siteSettings) });
                    if (res.ok) alert('ההגדרות נשמרו בהצלחה');
                    setLoading(false);
                  }} className="btn-primary w-full py-4" disabled={loading}>
                    {loading ? 'שומר...' : 'שמור הגדרות'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {modalContent && <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)} title={modalContent.title}>{modalContent.content}</Modal>}

      {showChangePackage && (
        <ChangePackageModal
          isOpen={showChangePackage}
          onClose={() => setShowChangePackage(false)}
          currentPackageId={selectedPackage?.id || ''}
          packages={packages}
          vipPackage={vipPackage}
          duoPackage={duoPackage}
          equipmentPackages={equipmentPackages}
          businessPackage={businessPackage}
          businessPackage100={businessPackage100}
          transportPackage={transportPackage}
          onSelect={handleChangePackage}
          lang={lang}
        />
      )}
    </div>
  );
}

export default memo(App);
