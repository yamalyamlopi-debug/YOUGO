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
  DollarSign
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

// --- Navbar (كما هو) ---
const Navbar = memo(({ lang, setLang, isAdmin, onLogout, siteSettings, setView }: { lang: Language, setLang: (l: Language) => void, isAdmin?: boolean, onLogout?: () => void, siteSettings: any, setView: (v: string) => void }) => {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="p-2.5 bg-gradient-to-br from-brand-red to-red-700 rounded-xl shadow-lg shadow-brand-red/20">
              <Car size={26} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tighter">
                <span className="text-brand-red">YOUGO</span> <span className="text-white">ISRAEL</span>
              </div>
              <div className="text-[9px] text-white/40 font-bold tracking-wider">
                {siteSettings.positioning_line_he || t.positioningLine}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['how-it-works', 'packages', 'faq'].map((item, i) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm font-bold text-white/70 hover:text-brand-red transition-colors relative group"
              >
                {item === 'how-it-works' ? 'איך זה עובד' : 
                 item === 'packages' ? 'חבילות' : 'שאלות'}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </a>
            ))}
            
            <button 
              onClick={() => setView('check-status')}
              className="text-sm font-bold text-white/70 hover:text-brand-red transition-colors"
            >
              בדיקת סטטוס
            </button>
            
            <button 
              onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-sm font-bold hover:bg-white/10 transition-all"
            >
              <Globe size={16} />
              {lang === 'he' ? 'العربية' : 'עברית'}
            </button>

            {isAdmin && (
              <button 
                onClick={onLogout} 
                className="text-sm font-bold text-white/40 hover:text-white transition-colors"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/5 mt-4">
            {[
              { href: '#how-it-works', label: 'איך זה עובד' },
              { href: '#packages', label: 'חבילות' },
              { href: '#faq', label: 'שאלות' }
            ].map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 text-white/70 hover:bg-white/5 rounded-lg">
                {item.label}
              </a>
            ))}
            <button onClick={() => { setView('check-status'); setMobileMenuOpen(false); }} className="block w-full text-right py-3 px-4 text-white/70 hover:bg-white/5 rounded-lg">
              בדיקת סטטוס
            </button>
            <button onClick={() => setLang(lang === 'he' ? 'ar' : 'he')} className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 rounded-lg border border-white/10">
              <Globe size={16} />
              {lang === 'he' ? 'العربية' : 'עברית'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
});

interface PackageCardProps {
  pkg: Package;
  lang: Language;
  onSelect: (p: Package) => void;
}

// ============================================================
// CARD BACK PANEL (بدون تغيير)
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
// PACKAGE DETAILS DATA (ثابت مع إضافة الباقة الجديدة)
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
// بطاقات الباقات (نفس الكود السابق مع إضافة الباقة الجديدة)
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
// VIP PACKAGE CARD (مع إضافة أيقونة التاج)
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
// BUSINESS PACKAGE CARD (القديمة)
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
// MOBILE SWIPER (خفيف)
// ============================================================
const MobileSwiper = ({ children, cardHeight = 500 }: { children: React.ReactNode[]; cardHeight?: number }) => {
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

// --- Modal محسّن للمحتوى الطويل ---
const Modal = memo(({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  const content = typeof children === 'string' ? children : '';
  if (!isOpen) return null;

  const renderContent = () => {
    // تقسيم المحتوى إلى أسطر
    const lines = content.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, idx) => {
      // إذا كان السطر يبدأ برقم متبوعاً بنقطة (مثل 1. ...)
      if (/^\d+\./.test(line)) {
        return (
          <div key={idx} className="flex gap-2 mt-3 first:mt-0">
            <span className="text-brand-red font-black text-sm">{line.split('.')[0]}.</span>
            <span className="text-white/80 text-sm">{line.substring(line.indexOf('.') + 1).trim()}</span>
          </div>
        );
      }
      // إذا كان السطر يبدأ بعلامة مثل •
      if (line.startsWith('•')) {
        return (
          <div key={idx} className="flex gap-2 mr-2">
            <span className="text-brand-red/70 text-sm">•</span>
            <span className="text-white/70 text-sm">{line.substring(1).trim()}</span>
          </div>
        );
      }
      // سطر عادي
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
// CHANGE PACKAGE MODAL (بدون تغيير)
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
// CarDetailsForm (كما هو)
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
// PaymentForm (بدون تغيير)
// ============================================================
const PaymentForm = memo(({ formData, setFormData, selectedPackage, onSubmit, loading, onBack, onChangePackage }: { 
  formData: any, setFormData: (data: any) => void, selectedPackage: Package | null, onSubmit: () => void, loading: boolean, onBack: () => void, onChangePackage: () => void
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'bit' | 'paybox' | null>(null);
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
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">חבילה נבחרת:</span>
              <span className="font-black mr-2" style={{ color: accentColor }}>{selectedPackage?.name}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white/60">מחיר:</span>
              <span className="font-black text-white text-base mr-2">{selectedPackage?.price}</span>
            </div>
          </div>
          <button onClick={onChangePackage}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all shrink-0 mr-1">
            <RefreshCw size={12} style={{ color: accentColor }} />
            <span className="text-[8px] font-black text-white/50">החלף</span>
          </button>
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
          ) : 'שלח הזמנה'}
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
            {/* HERO (يبقى فيه أنيميشن خفيف) */}
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

            {/* HOW IT WORKS (تم حذف الأنيميشن لتسريع الأداء) */}
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
                    className="px-6 py-2.5 rounded-xl font-black text-sm text-white relative overflow-hidden group"
                    style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)' }}>
                    <RocketIcon size={14} />בחר חבילה עכשיו
                  </button>
                </div>
              </div>
            </section>

            {/* PACKAGES SECTION */}
            <section id="packages" className="space-y-20">
              {/* Main section header */}
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
                <SectionHeader
                  eyebrow="רכב פרטי"
                  eyebrowIcon={<Car size={13} />}
                  eyebrowColor="#60a5fa"
                  title="מוכרים"
                  titleHighlight="רכב פרטי?"
                  highlightColor="#c8102e"
                  subtitle="שלוש חבילות מדורגות לכל תקציב ומטרה. מחבילת הכניסה הבסיסית ועד הפרמיום המלא – כל אחת מותאמת לסוג הרכב ולמטרת המכירה שלך."
                  stats={[
                    { value: '₪149', label: 'מחבילה', color: '#94a3b8' },
                    { value: '1,000+', label: 'מכירות', color: '#c8102e' },
                    { value: '7-30', label: 'ימי פרסום', color: '#4ade80' },
                  ]}
                />

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
                <SectionHeader
                  eyebrow="פרימיום VIP"
                  eyebrowIcon={<Crown size={13} />}
                  eyebrowColor="#d4af37"
                  title="מחפשים"
                  titleHighlight="יחס VIP?"
                  highlightColor="#d4af37"
                  subtitle="לרכבי יוקרה וכאלה שמוכרים שני רכבים בבת אחת – שתי חבילות ייחודיות עם שירות אישי, עיצוב בלעדי, וחסכון משמעותי."
                  stats={[
                    { value: '60 יום', label: 'פרסום VIP', color: '#d4af37' },
                    { value: '40%', label: 'חיסכון DUO', color: '#8b5cf6' },
                    { value: '24/7', label: 'ליווי אישי', color: '#4ade80' },
                  ]}
                />

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

              {/* BUSINESS (باقتان) */}
              <div className="max-w-3xl mx-auto space-y-8">
                <SectionHeader
                  eyebrow="לסוכנויות ועסקים"
                  eyebrowIcon={<Building2 size={13} />}
                  eyebrowColor="#3b82f6"
                  title="פתרון מקצועי"
                  titleHighlight="לעסקים?"
                  highlightColor="#3b82f6"
                  subtitle="חבילות מותאמות לסוכנויות רכב, עם אפשרויות גמישות לניהול מלא."
                  stats={[
                    { value: '50-100', label: 'רכבים/חודש', color: '#3b82f6' },
                    { value: '40-50%', label: 'הנחה', color: '#4ade80' },
                    { value: '24/7', label: 'תמיכה', color: '#a78bfa' },
                  ]}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[460px]"><BusinessPackageCard pkg={businessPackage} onSelect={handleSelectPackage} /></div>
                  <div className="h-[460px]"><BusinessPackageCard pkg={businessPackage100} onSelect={handleSelectPackage} /></div>
                </div>
              </div>

              {/* EQUIPMENT + TRANSPORT */}
              <div className="space-y-8">
                <SectionHeader
                  eyebrow="ציוד מקצועי ותחבורה"
                  eyebrowIcon={<Truck size={13} />}
                  eyebrowColor="#ea580c"
                  title="מוכרים"
                  titleHighlight="ציוד מקצועי?"
                  highlightColor="#ea580c"
                  subtitle="חבילות ייחודיות לציוד כבד, ציוד קל, ורכבים מסחריים. חשיפה ממוקדת לקהל המקצועי הנכון – קבלנים, חברות הסעות, ועסקים."
                  stats={[
                    { value: '85%', label: 'נמכרו תוך 14 יום', color: '#ea580c' },
                    { value: '500+', label: 'ציודים פורסמו', color: '#0ea5e9' },
                    { value: '3', label: 'קטגוריות', color: '#4ade80' },
                  ]}
                />

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

            {/* WHY US (بدون أنيميشن) */}
            <section id="why-us" className="space-y-10">
              <div className="text-center space-y-3">
                <h2 className="text-4xl md:text-5xl font-black">{t.whyUs.title}</h2>
                <p className="text-white/45 text-base max-w-2xl mx-auto">הסיבות שאלפי מוכרים בחרו דווקא בנו</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: <Users size={22} className="text-white" />, title: 'קהל איכותי', desc: '50,000+ עוקבים פעילים ומעורבים שמחפשים לקנות רכב', stat: '50K+', statLabel: 'עוקבים', gradFrom: '#1d4ed8', gradTo: '#0ea5e9', glowColor: 'rgba(59,130,246,0.3)' },
                  { icon: <Zap size={22} className="text-white" />, title: 'מהירות מכירה', desc: 'פרסום חכם וממוקד שמביא תוצאות מהירות – ממוצע 48 שעות עד עסקה', stat: '48h', statLabel: 'ממוצע מכירה', gradFrom: '#c8102e', gradTo: '#f43f5e', glowColor: 'rgba(200,16,46,0.35)' },
                  { icon: <TrendingUp size={22} className="text-white" />, title: 'אחוזי הצלחה', desc: '98% מלקוחותינו מרוצים ומוכרים בהצלחה תוך זמן קצר', stat: '98%', statLabel: 'שביעות רצון', gradFrom: '#16a34a', gradTo: '#22c55e', glowColor: 'rgba(34,197,94,0.3)' },
                ].map((item, i) => (
                  <div key={i} className="relative rounded-2xl overflow-hidden flex flex-col"
                    style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: `0 20px 40px -15px ${item.glowColor}` }}>
                    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${item.gradFrom}, ${item.gradTo})` }} />
                    <div className="p-6 flex flex-col gap-5 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${item.gradFrom}, ${item.gradTo})`, boxShadow: `0 6px 20px ${item.glowColor}` }}>
                          {item.icon}
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black" style={{ color: item.gradTo }}>{item.stat}</div>
                          <div className="text-[10px] text-white/35 font-bold uppercase tracking-wider">{item.statLabel}</div>
                        </div>
                      </div>
                      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${item.gradFrom}30, transparent)` }} />
                      <div>
                        <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
                        <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ (بدون أنيميشن) */}
            <section id="faq" className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-3">
                <h2 className="text-4xl md:text-5xl font-black">שאלות נפוצות</h2>
                <p className="text-white/45 text-base">כל מה שצריך לדעת על תהליך הפרסום והמכירה</p>
              </div>
              <div className="space-y-3">
                {t.faqs.slice(0, showAllFaqs ? t.faqs.length : 3).map((item, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-white/8 bg-white/4">
                    <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full px-5 py-4 flex items-center justify-between text-right gap-3 hover:bg-white/8 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-lg bg-brand-red/15 flex items-center justify-center text-brand-red font-black text-sm">{i + 1}</div>
                        <span className="font-bold text-base">{item.q}</span>
                      </div>
                      {activeFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {activeFaq === i && (
                      <div className="px-5 pb-4 pr-16 text-white/55 text-sm leading-relaxed">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
              {!showAllFaqs && t.faqs.length > 3 && (
                <div className="text-center">
                  <button onClick={() => setShowAllFaqs(true)} className="px-6 py-3 bg-white/8 rounded-xl font-black text-sm border border-white/15 hover:bg-white/12 transition-all">
                    הצג את כל השאלות
                  </button>
                </div>
              )}
            </section>

            {/* FOOTER */}
            <footer className="pb-10">
              <div className="relative rounded-2xl overflow-hidden border border-white/8"
                style={{ background: 'linear-gradient(145deg, rgba(200,16,46,0.08) 0%, rgba(10,10,14,0.98) 60%, rgba(5,5,8,1) 100%)' }}>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />
                <div className="relative z-10 p-10 space-y-10">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-brand-red to-red-700 rounded-xl shadow-xl shadow-brand-red/25">
                        <Car size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-black tracking-tighter">
                          <span className="text-brand-red">YOUGO</span> <span className="text-white">ISRAEL</span>
                        </div>
                        <div className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-bold">Digital Car Marketing</div>
                      </div>
                    </div>
                    <p className="text-white/35 text-sm max-w-sm mx-auto leading-relaxed">הפלטפורמה המובילה בישראל לפרסום ומכירת רכבים ברשתות חברתיות</p>
                  </div>

                  <div>
                    <p className="text-center text-[10px] text-white/25 font-black uppercase tracking-[0.25em] mb-6">עקבו אחרינו</p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      {[
                        { href: 'https://instagram.com/yougo.israel', icon: <Instagram size={18} />, label: 'Instagram', color: '#E4405F' },
                        { href: 'https://facebook.com', icon: <Facebook size={18} />, label: 'Facebook', color: '#1877F2' },
                        { href: 'https://wa.me/972546980606', icon: <MessageCircle size={18} />, label: 'WhatsApp', color: '#25D366' },
                        { href: 'https://t.me/yougoisrael', icon: <Send size={18} />, label: 'Telegram', color: '#0088cc' },
                        { href: 'https://x.com/yougoisrael', icon: <Twitter size={18} />, label: 'X', color: '#000000' },
                        { href: 'https://youtube.com/@yougoisrael', icon: <Youtube size={18} />, label: 'YouTube', color: '#FF0000' },
                        { href: 'https://threads.net/@yougoisrael', icon: <MessageSquare size={18} />, label: 'Threads', color: '#000000' },
                      ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="relative group">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                            style={{ color: s.color }}>
                            {s.icon}
                          </div>
                          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {s.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  <div className="flex flex-wrap justify-center gap-3">
                    {[
                      { icon: <FileText size={14} />, label: 'תקנון', content: t.pages.terms.content },
                      { icon: <Lock size={14} />, label: 'פרטיות', content: t.pages.privacy.content },
                      { icon: <Info size={14} />, label: 'מי אנחנו', content: t.pages.about.content },
                      { icon: <LayoutDashboard size={14} />, label: 'ניהול', onClick: () => setView('admin-login'), content: '' },
                    ].map((link, i) => (
                      <button key={i} onClick={link.onClick ? link.onClick : () => setModalContent({ title: link.label, content: link.content })}
                        className="relative group px-5 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20">
                        <span className="flex items-center gap-2">
                          <span className="text-brand-red/70">{link.icon}</span>
                          <span className="text-white/70 group-hover:text-white">{link.label}</span>
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="text-center space-y-1 pt-4 border-t border-white/8">
                    <div className="text-white/15 text-[10px] font-bold tracking-wider">
                      © {new Date().getFullYear()} YOUGO ISRAEL LTD · כל הזכויות שמורות
                    </div>
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
