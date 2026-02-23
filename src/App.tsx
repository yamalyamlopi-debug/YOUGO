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
  Rocket as RocketIcon
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

// --- Components ---

const Navbar = ({ lang, setLang, isAdmin, onLogout, siteSettings, setView }: { lang: Language, setLang: (l: Language) => void, isAdmin?: boolean, onLogout?: () => void, siteSettings: any, setView: (v: string) => void }) => {
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
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with animation */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className="p-2.5 bg-gradient-to-br from-brand-red to-red-700 rounded-xl shadow-lg shadow-brand-red/20"
            >
              <Car size={26} className="text-white" />
            </motion.div>
            <div>
              <motion.div 
                className="text-2xl font-black tracking-tighter"
                animate={{ textShadow: ['0 0 0px rgba(200,16,46,0)', '0 0 10px rgba(200,16,46,0.5)', '0 0 0px rgba(200,16,46,0)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-brand-red">YOUGO</span> <span className="text-white">ISRAEL</span>
              </motion.div>
              <div className="text-[9px] text-white/40 font-bold tracking-wider">
                {siteSettings.positioning_line_he || t.positioningLine}
              </div>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['how-it-works', 'packages', 'faq'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
                className="text-sm font-bold text-white/70 hover:text-brand-red transition-colors relative group"
              >
                {item === 'how-it-works' ? 'איך זה עובד' : 
                 item === 'packages' ? 'חבילות' : 'שאלות'}
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
            
            <motion.button 
              onClick={() => setView('check-status')}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-bold text-white/70 hover:text-brand-red transition-colors"
            >
              בדיקת סטטוס
            </motion.button>
            
            <motion.button 
              onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-sm font-bold transition-all"
            >
              <Globe size={16} className="animate-pulse" />
              {lang === 'he' ? 'العربية' : 'עברית'}
            </motion.button>

            {isAdmin && (
              <motion.button 
                onClick={onLogout} 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-sm font-bold text-white/40 hover:text-white transition-colors"
              >
                <LogOut size={18} />
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 space-y-2 border-t border-white/5 mt-4"
            >
              {[
                { href: '#how-it-works', label: 'איך זה עובד' },
                { href: '#packages', label: 'חבילות' },
                { href: '#faq', label: 'שאלות' }
              ].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-white/70 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.button 
                onClick={() => { setView('check-status'); setMobileMenuOpen(false); }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="block w-full text-right py-3 px-4 text-white/70 hover:bg-white/5 rounded-lg transition-colors"
              >
                בדיקת סטטוס
              </motion.button>
              
              <motion.button 
                onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 rounded-lg border border-white/10"
              >
                <Globe size={16} />
                {lang === 'he' ? 'العربية' : 'עברית'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

interface PackageCardProps {
  pkg: Package;
  lang: Language;
  onSelect: (p: Package) => void;
  key?: string;
}

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  const content = typeof children === 'string' ? children : '';
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
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 space-y-6"
            style={{
              background: 'linear-gradient(145deg, #0f0f14 0%, #0a0a0e 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)'
            }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <motion.h3 
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="text-xl font-black text-brand-red"
              >
                {title}
              </motion.h3>
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} className="text-white/60" />
              </motion.button>
            </div>
            <div className="text-white/75 leading-relaxed space-y-3 text-sm">
              {content.split('\n').map((line, i) => {
                if (!line.trim()) return <div key={i} className="h-1" />;
                if (/^\d+\./.test(line)) return (
                  <motion.h4 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="text-white font-black text-base mt-4 mb-1 first:mt-0"
                  >
                    {line}
                  </motion.h4>
                );
                return (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.01 }}
                    className="text-white/70 leading-relaxed"
                  >
                    {line}
                  </motion.p>
                );
              })}
            </div>
            <div className="pt-4 flex justify-end border-t border-white/8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose} 
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm relative overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)' }}
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  <X size={14} />
                  סגור
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// FLIP CARD COMPONENT - بطاقة قابلة للقلب (سريعة)
// ============================================================
const FlipCard = ({ 
  front, 
  back, 
  isFlipped, 
  onFlip 
}: { 
  front: React.ReactNode; 
  back: React.ReactNode; 
  isFlipped: boolean; 
  onFlip: () => void;
}) => {
  return (
    <motion.div 
      className="relative w-full h-full cursor-pointer group perspective-1000"
      onClick={onFlip}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
      style={{ minHeight: '480px' }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, type: 'tween' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <motion.div 
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={{ boxShadow: '0 30px 60px -20px rgba(200,16,46,0.5)' }}
        >
          {front}
        </motion.div>

        {/* Back Face */}
        <motion.div 
          className="absolute w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </motion.div>
      </motion.div>
      
      {/* Flip indicator */}
      <motion.div 
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[8px] text-white/30 flex items-center gap-1"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <RefreshCw size={10} />
        <span>לחץ להפוך</span>
      </motion.div>
    </motion.div>
  );
};

// ============================================================
// PACKAGE DETAILS - شرح احترافي وثابت
// ============================================================
const packageDetails: Record<string, { title: string; content: string }> = {
  basic: {
    title: 'חבילת BASIC – פרסום בסיסי',
    content: `מתאים למוכרים פרטיים שמעוניינים להתחיל עם פרסום מקצועי במחיר נמוך.

📌 **החבילה כוללת:**
• 2 תמונות מקצועיות באיכות גבוהה
• פוסט ממוקד באינסטגרם
• סטורי למשך 7 ימים
• חשיפה לקהל קונים רלוונטי

⏱️ **משך הפרסום:** 7 ימים
✅ **אחריות:** 3 ימי חשיפה מובטחת

💰 **מחיר:** 149 ₪ (במקום 175 ₪)
🎁 **חיסכון:** 26 ₪ (15% הנחה)

━━━━━━━━━━━━━━━━━━
מתאים לרכבים עד 50,000 ₪`
  },
  pro: {
    title: 'חבילת PRO – החבילה הפופולרית',
    content: `החבילה הנבחרת ביותר - איזון מושלם בין תמורה למחיר.

📌 **החבילה כוללת:**
• 4 תמונות מקצועיות באיכות גבוהה
• פוסט + פוסט שמור (עריכה מקצועית)
• סטורי למשך 14 ימים
• עדיפות בפרסום (קדימות)
• חשיפה מורחבת לקהלים ממוקדים

⏱️ **משך הפרסום:** 14 ימים
✅ **אחריות:** 7 ימי חשיפה מובטחת

💰 **מחיר:** 249 ₪ (במקום 293 ₪)
🎁 **חיסכון:** 44 ₪ (15% הנחה)

━━━━━━━━━━━━━━━━━━
מתאים לרכבים 50,000-150,000 ₪`
  },
  premium: {
    title: 'חבילת PREMIUM – החבילה המושלמת',
    content: `החבילה המלאה למי שרוצה למכור מהר ובמחיר מקסימלי.

📌 **החבילה כוללת:**
• 8+ תמונות מקצועיות
• סרטון רכב מקצועי + רילס
• פוסט מותאם אישית
• סטורי למשך 30 ימים
• עדיפות מלאה תמיד
• חשיפה מקסימלית
• ליווי צמוד של מעצב וקופירייטר
• עיצוב VIP בלעדי

⏱️ **משך הפרסום:** 30 ימים
✅ **אחריות:** 14 ימי חשיפה מובטחת

💰 **מחיר:** 449 ₪ (במקום 528 ₪)
🎁 **חיסכון:** 79 ₪ (15% הנחה)

━━━━━━━━━━━━━━━━━━
מתאים לרכבי יוקרה ומעל 150,000 ₪`
  },
  vip: {
    title: 'חבילת VIP LUXURY – האולטימטיבית',
    content: `חבילת הפרימיום האולטימטיבית לרכבי יוקרה ואספנות.

📌 **החבילה כוללת:**
• 15+ תמונות מקצועיות בצילום סטילש
• רילס וידאו + סטורי VIP
• 60 ימי פרסום פרמיום
• חשיפה מקסימלית לכלל הקהלים
• ליווי אישי צמוד 24/7
• עיצוב VIP בלעדי
• טרגוט מתקדם לפי פרמטרים מדויקים
• עדיפות ראשונה תמיד בכל הפרסומים

⏱️ **משך הפרסום:** 60 ימים
✅ **אחריות:** 30 ימי חשיפה מובטחת + אפשרות להארכה

💰 **מחיר:** 749 ₪ (במחיר השקה)
🎁 **חיסכון:** 133 ₪ (15% הנחה)

━━━━━━━━━━━━━━━━━━
מתאים לרכבי יוקרה, אספנות ומיוחדים`
  },
  duo: {
    title: 'חבילת DUO DEAL – פרסום 2 רכבים',
    content: `פרסום שני רכבים במחיר אחד - חיסכון של 40%!

📌 **החבילה כוללת:**
• פרסום 2 רכבים במחיר מיוחד
• 4 תמונות מקצועיות לכל רכב (8 סה"כ)
• פוסט נפרד לכל רכב
• סטורי 14 יום לכל רכב
• חשיפה כפולה לקהל מעוניין

💰 **השוואת מחירים:**
• 2 חבילות BASIC: 298 ₪
• 2 חבילות PRO: 498 ₪
• DUO DEAL: 349 ₪ (הכי משתלם!)

⏱️ **משך הפרסום:** 14 ימים לכל רכב
✅ **אחריות:** חשיפה מובטחת כפולה

━━━━━━━━━━━━━━━━━━
מתאים למשפחות, סוחרים פרטיים ושותפים`
  },
  business: {
    title: 'חבילת BUSINESS – לסוכנויות רכב',
    content: `פתרון מקיף לסוכנויות רכב ומגרשי רכב.

📌 **החבילה כוללת:**
• עד 50 רכבים בחודש
• צילומים מקצועיים לכל רכב
• דפי נחיתה מותאמים אישית
• מנהל לקוח ייעודי
• דוחות ביצועים חודשיים
• קידום ממומן
• חשיפה ממוקדת לפי אזור

💼 **יתרונות:**
• תוכנית שיווקית סדורה
• בניית אסטרטגיה מותאמת
• חיסכון בעלויות לטווח ארוך
• מיתוג העסק ברשתות החברתיות

⏱️ **משך החבילה:** חודשי (ניתן להארכה)
💰 **מחיר:** 1,499 ₪ לחודש (במקום 2,499 ₪)

━━━━━━━━━━━━━━━━━━
מתאים לסוכנויות, יבואנים וליסינג`
  },
  'equipment-heavy': {
    title: 'חבילת ציוד כבד – באגרים, מחפרונים ועוד',
    content: `פרסום מקצועי לבאגרים, מחפרונים וציוד כבד.

📌 **החבילה כוללת:**
• 10 תמונות מקצועיות של הציוד
• פוסט עם מפרט טכני מלא
• סטורי 21 יום
• חשיפה לקהל קבלנים ומגזר הבנייה
• עדיפות בתוצאות חיפוש
• ייעוץ תמחור מקצועי

🏗️ **סוגי ציוד:**
• באגרים ומיני באגרים
• מחפרונים
• בולדוזרים
• שופלים
• עגורנים

⏱️ **משך הפרסום:** 21 יום
💰 **מחיר:** 349 ₪`
  },
  'equipment-light': {
    title: 'חבילת ציוד קל – מלגזות, פופקטים ועוד',
    content: `פרסום מקצועי למלגזות, פופקטים וציוד קל.

📌 **החבילה כוללת:**
• 6 תמונות מקצועיות
• פוסט מותאם לציוד קל
• סטורי 14 יום
• חשיפה לקהל מקצועי רלוונטי
• תיאור טכני מפורט
• תמיכה בוואטסאפ

🛠️ **סוגי ציוד:**
• מלגזות
• פופקטים
• ג'קים וציוד הרמה
• סקיד סטיר
• מערבלי בטון

⏱️ **משך הפרסום:** 14 יום
💰 **מחיר:** 199 ₪`
  }
};

// ============================================================
// PACKAGE CARD - Basic, Pro, Premium مع خاصية القلب
// ============================================================
const PackageCard = ({ pkg, lang, onSelect }: PackageCardProps) => {
  const t = translations[lang];
  const [isFlipped, setIsFlipped] = useState(false);

  const tierConfig = {
    basic:   { color: '#94a3b8', glow: 'rgba(148,163,184,0.3)', badge: '🚀', accentBg: 'rgba(148,163,184,0.15)', borderColor: 'rgba(148,163,184,0.4)', gradient: 'linear-gradient(135deg, #2a2a30, #1a1a20)' },
    pro:     { color: '#c8102e', glow: 'rgba(200,16,46,0.4)',   badge: '⭐', accentBg: 'rgba(200,16,46,0.2)',   borderColor: 'rgba(200,16,46,0.5)',    gradient: 'linear-gradient(135deg, #2a1a1a, #1a0a0a)' },
    premium: { color: '#c8102e', glow: 'rgba(200,16,46,0.5)',   badge: '💎', accentBg: 'rgba(200,16,46,0.25)',   borderColor: 'rgba(200,16,46,0.6)',    gradient: 'linear-gradient(135deg, #2a1a1a, #1a0a0a)' },
  };
  const cfg = tierConfig[pkg.id as keyof typeof tierConfig] || tierConfig.basic;
  const isPro = pkg.id === 'pro';
  const isPremium = pkg.premium;

  const featureChips = pkg.features.slice(0, 4);

  // Front face content
  const frontContent = (
    <motion.div
      className="relative w-full h-full rounded-2xl flex flex-col group overflow-hidden"
      style={{
        background: cfg.gradient,
        border: `1px solid ${cfg.borderColor}`,
        boxShadow: `0 20px 40px -15px ${cfg.color}40, 0 0 0 1px ${cfg.borderColor} inset`,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ background: cfg.color, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Top glow line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, ${cfg.color}, transparent)` }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {pkg.popular && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="absolute top-2 right-2 z-10 text-white text-[8px] font-black py-1 px-3 rounded-full shadow-lg uppercase tracking-widest flex items-center gap-1"
          style={{ background: `linear-gradient(135deg, ${cfg.color}, #a00d23)` }}
        >
          <Trophy size={10} />
          {t.mostPopular}
        </motion.div>
      )}

      <motion.div 
        className="absolute top-2 left-2 text-[8px] font-black py-1 px-3 rounded-full flex items-center gap-1"
        style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80' }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap size={8} />
        15% OFF
      </motion.div>

      <div className="relative z-10 p-5 flex flex-col flex-grow gap-3 h-full">
        <div className="flex items-center gap-2 mt-2">
          <motion.div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: cfg.accentBg, border: `1px solid ${cfg.borderColor}` }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            animate={{ 
              boxShadow: [`0 0 0px ${cfg.color}`, `0 0 15px ${cfg.color}`, `0 0 0px ${cfg.color}`]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {cfg.badge}
          </motion.div>
          <div>
            <h3 className="text-lg font-black tracking-tight" style={{ color: isPremium || isPro ? cfg.color : '#fff' }}>
              {pkg.name}
            </h3>
            <p className="text-[9px] leading-tight" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {pkg.id === 'basic' ? 'התחלה מקצועית לפרסום הרכב שלך' :
               pkg.id === 'pro' ? 'פרסום חזק יותר למכירה מהירה יותר' :
               'חבילת הפרסום המלאה למי שרוצה למכור מהר'}
            </p>
          </div>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-white">{pkg.price}</span>
          <span className="text-[10px] line-through" style={{ color: 'rgba(255,255,255,0.3)' }}>
            ₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}
          </span>
        </div>

        <motion.div 
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${cfg.borderColor}, transparent)` }}
          animate={{ scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="flex flex-col gap-2 flex-grow">
          {featureChips.map((feat, i) => (
            <motion.div 
              key={i} 
              className="flex items-center gap-1.5 group/feature"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{ background: cfg.accentBg, border: `1px solid ${cfg.borderColor}` }}>
                <Check size={8} strokeWidth={3} style={{ color: cfg.color }} />
              </div>
              <span className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{feat}</span>
            </motion.div>
          ))}
          {pkg.features.length > 4 && (
            <motion.span 
              className="text-[9px] font-bold mt-1"
              style={{ color: cfg.color }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              + {pkg.features.length - 4} תכונות נוספות
            </motion.span>
          )}
        </div>

        <motion.button
          onClick={(e) => { e.stopPropagation(); onSelect(pkg); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-xl font-black text-xs transition-all duration-200 relative overflow-hidden group/btn"
          style={{
            background: isPremium || isPro ? cfg.color : 'rgba(255,255,255,0.1)',
            color: '#fff',
            border: isPremium || isPro ? 'none' : '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            <RocketIcon size={12} />
            {t.startOrder}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );

  // Back face content (detailed description) - محسّن
  const backContent = (
    <motion.div
      className="relative w-full h-full rounded-2xl p-5 overflow-y-auto custom-scrollbar"
      style={{
        background: `linear-gradient(145deg, ${cfg.color}15, #0a0a0e)`,
        border: `2px solid ${cfg.borderColor}`,
        boxShadow: `0 0 40px ${cfg.glow}, 0 0 0 1px ${cfg.borderColor} inset`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` }} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <motion.div 
            className="text-3xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            {cfg.badge}
          </motion.div>
          <h3 className="text-xl font-black" style={{ color: cfg.color }}>{pkg.name}</h3>
        </div>
        
        <div className="text-white/90 text-xs leading-relaxed space-y-3 h-[320px] overflow-y-auto pr-2 custom-scrollbar">
          {packageDetails[pkg.id]?.content.split('\n').map((line, i) => {
            if (line.includes('**')) {
              return (
                <motion.p 
                  key={i} 
                  className="font-black text-white text-sm mt-3 first:mt-0"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  style={{ textShadow: `0 0 10px ${cfg.color}` }}
                >
                  {line.replace(/\*\*/g, '')}
                </motion.p>
              );
            }
            if (line.includes('📌')) {
              return (
                <motion.p 
                  key={i} 
                  className="font-black text-white text-sm mt-3"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                >
                  {line}
                </motion.p>
              );
            }
            if (line.trim().startsWith('•')) {
              return (
                <motion.p 
                  key={i} 
                  className="flex items-start gap-1.5 text-white/80"
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                >
                  <span style={{ color: cfg.color }} className="text-lg leading-none">•</span>
                  <span>{line.replace('•', '')}</span>
                </motion.p>
              );
            }
            if (line.includes('━━━━')) {
              return (
                <motion.div 
                  key={i} 
                  className="h-px w-full my-2"
                  style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.01 }}
                />
              );
            }
            if (line.trim() === '') return <div key={i} className="h-2" />;
            return (
              <motion.p 
                key={i} 
                className="text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
              >
                {line}
              </motion.p>
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <motion.button
            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full text-[10px] font-black transition-all flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${cfg.color}30, transparent)`,
              border: `1px solid ${cfg.borderColor}`,
              color: cfg.color
            }}
          >
            <RefreshCw size={10} />
            חזור לתפריט
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      isFlipped={isFlipped}
      onFlip={() => setIsFlipped(!isFlipped)}
    />
  );
};

// ============================================================
// VIP PACKAGE CARD - مع خاصية القلب
// ============================================================
const VIPPackageCard = ({ pkg, lang, onSelect }: PackageCardProps) => {
  const t = translations[lang];
  const [isFlipped, setIsFlipped] = useState(false);

  const frontContent = (
    <motion.div
      className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col group"
      style={{
        boxShadow: '0 20px 40px -15px rgba(212,175,55,0.4), 0 0 0 2px rgba(212,175,55,0.3) inset',
        background: 'radial-gradient(circle at 100% 0%, #3a2f1a 0%, #0f0c05 80%)'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {/* Animated gold particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-amber-400"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, #d4af37 2px, transparent 2px), radial-gradient(circle at 80% 70%, #d4af37 1px, transparent 1px)',
        backgroundSize: '50px 50px, 30px 30px'
      }} />

      <div className="relative z-10 p-5 space-y-4 flex-grow flex flex-col">
        <div className="flex items-center flex-wrap gap-2">
          <motion.div 
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-900/60 to-amber-800/30 rounded-full px-3 py-1 border border-amber-500/40"
            animate={{ borderColor: ['rgba(212,175,55,0.4)', 'rgba(212,175,55,0.8)', 'rgba(212,175,55,0.4)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown size={12} className="text-amber-400" />
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-300">VIP LUXURY</span>
          </motion.div>
          <motion.div 
            className="bg-emerald-500/20 border border-emerald-500/40 rounded-full px-2 py-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[8px] font-black text-emerald-400">15%</span>
          </motion.div>
          <div className="flex mr-auto">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                <Star size={10} className="text-amber-400 fill-amber-400" />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h3 
            className="text-xl md:text-2xl font-black bg-gradient-to-l from-amber-200 via-amber-400 to-amber-300 bg-clip-text text-transparent"
            animate={{ textShadow: ['0 0 0px #d4af37', '0 0 20px #d4af37', '0 0 0px #d4af37'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            VIP LUXURY
          </motion.h3>
          <p className="text-amber-100/40 text-[11px] mt-1 leading-relaxed">
            חבילת הפרסום האולטימטיבית
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-amber-400">₪749</span>
          <span className="text-xs line-through text-white/20">₪882</span>
          <motion.span 
            className="text-[9px] font-black bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            חיסכון ₪133
          </motion.span>
        </div>

        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
          animate={{ scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="grid grid-cols-2 gap-2 flex-grow">
          {[
            { icon: <Camera size={12} />, label: '15+ תמונות' },
            { icon: <Video size={12} />, label: 'רילס + סטורי' },
            { icon: <Calendar size={12} />, label: '60 ימים' },
            { icon: <TrendingUp size={12} />, label: 'חשיפה מקס' },
          ].map((feat, i) => (
            <motion.div 
              key={i} 
              className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1.5 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <span className="text-amber-400">{feat.icon}</span>
              <span className="text-[9px] font-medium text-white/80">{feat.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={(e) => { e.stopPropagation(); onSelect(pkg); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl font-black text-sm bg-gradient-to-l from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/30 hover:shadow-amber-500/40 transition-all relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            <Crown size={16} />
            הזמן VIP
          </span>
        </motion.button>
      </div>
    </motion.div>
  );

  const backContent = (
    <motion.div
      className="relative w-full h-full rounded-3xl p-5 overflow-y-auto custom-scrollbar"
      style={{
        background: 'linear-gradient(145deg, #3a2f1a, #0f0c05)',
        border: '2px solid rgba(212,175,55,0.5)',
        boxShadow: '0 0 50px rgba(212,175,55,0.3), 0 0 0 1px rgba(212,175,55,0.3) inset',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Gold sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-400"
            style={{ left: `${10 + i * 20}%`, top: '10%' }}
            animate={{
              y: [0, 200, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <motion.div 
            className="text-3xl"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            👑
          </motion.div>
          <h3 className="text-xl font-black text-amber-400">VIP LUXURY</h3>
        </div>
        
        <div className="text-white/90 text-xs leading-relaxed space-y-3 h-[320px] overflow-y-auto pr-2 custom-scrollbar">
          {packageDetails.vip?.content.split('\n').map((line, i) => {
            if (line.includes('**')) {
              return (
                <motion.p 
                  key={i} 
                  className="font-black text-white text-sm mt-3 first:mt-0"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  style={{ textShadow: '0 0 10px #d4af37' }}
                >
                  {line.replace(/\*\*/g, '')}
                </motion.p>
              );
            }
            if (line.includes('📌')) {
              return (
                <motion.p 
                  key={i} 
                  className="font-black text-white text-sm mt-3"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                >
                  {line}
                </motion.p>
              );
            }
            if (line.trim().startsWith('•')) {
              return (
                <motion.p 
                  key={i} 
                  className="flex items-start gap-1.5 text-white/80"
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                >
                  <span className="text-amber-400 text-lg leading-none">•</span>
                  <span>{line.replace('•', '')}</span>
                </motion.p>
              );
            }
            if (line.includes('━━━━')) {
              return (
                <motion.div 
                  key={i} 
                  className="h-px w-full my-2"
                  style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.01 }}
                />
              );
            }
            if (line.trim() === '') return <div key={i} className="h-2" />;
            return (
              <motion.p 
                key={i} 
                className="text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
              >
                {line}
              </motion.p>
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <motion.button
            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full text-[10px] font-black transition-all flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.3), transparent)',
              border: '1px solid rgba(212,175,55,0.5)',
              color: '#d4af37'
            }}
          >
            <RefreshCw size={10} />
            חזור לתפריט
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      isFlipped={isFlipped}
      onFlip={() => setIsFlipped(!isFlipped)}
    />
  );
};

// ============================================================
// DUO DEAL PACKAGE CARD - مع خاصية القلب
// ============================================================
const DuoDealPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const frontContent = (
    <motion.div
      className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col group"
      style={{
        background: 'radial-gradient(circle at 100% 0%, #2e1a3a 0%, #0b0710 100%)',
        boxShadow: '0 20px 40px -15px rgba(139,92,246,0.4), 0 0 0 2px rgba(139,92,246,0.3) inset'
      }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500" style={{
        backgroundImage: 'radial-gradient(circle at 30% 40%, #a78bfa 2px, transparent 2px), radial-gradient(circle at 70% 60%, #8b5cf6 1px, transparent 1px)',
        backgroundSize: '50px 50px, 30px 30px'
      }} />

      <div className="relative z-10 p-5 space-y-4 flex-grow flex flex-col">
        <div className="flex items-center flex-wrap gap-2">
          <motion.div 
            className="flex items-center gap-1.5 bg-purple-900/60 rounded-full px-3 py-1 border border-purple-500/40"
            animate={{ borderColor: ['rgba(139,92,246,0.4)', 'rgba(139,92,246,0.8)', 'rgba(139,92,246,0.4)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Car size={12} className="text-purple-400" />
            <Car size={12} className="text-purple-400" />
            <span className="text-[9px] font-black uppercase tracking-wider text-purple-300">DUO DEAL</span>
          </motion.div>
          <motion.div 
            className="bg-emerald-500/20 border border-emerald-500/40 rounded-full px-2 py-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[8px] font-black text-emerald-400">40%</span>
          </motion.div>
        </div>

        <div>
          <motion.h3 
            className="text-xl md:text-2xl font-black bg-gradient-to-l from-purple-200 via-purple-400 to-purple-300 bg-clip-text text-transparent"
            animate={{ textShadow: ['0 0 0px #8b5cf6', '0 0 20px #8b5cf6', '0 0 0px #8b5cf6'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            DUO DEAL
          </motion.h3>
          <p className="text-purple-100/40 text-[11px] mt-1">פרסום 2 רכבים</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-purple-400">₪349</span>
          <span className="text-xs line-through text-white/20">₪598</span>
          <motion.span 
            className="text-[9px] font-black bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            חיסכון ₪249
          </motion.span>
        </div>

        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          animate={{ scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="grid grid-cols-2 gap-2 flex-grow">
          {[
            { icon: <Car size={12} />, label: '2 רכבים' },
            { icon: <Camera size={12} />, label: '4 תמונות' },
            { icon: <Instagram size={12} />, label: 'פוסטים' },
            { icon: <Calendar size={12} />, label: '14 ימים' },
          ].map((feat, i) => (
            <motion.div 
              key={i} 
              className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1.5 border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <span className="text-purple-400">{feat.icon}</span>
              <span className="text-[9px] font-medium text-white/80">{feat.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={(e) => { e.stopPropagation(); onSelect(pkg); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl font-black text-sm bg-gradient-to-l from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            <Car size={16} />
            הזמן DUO
          </span>
        </motion.button>

        <p className="text-center text-[9px] text-purple-300/40 mt-1">
          הכי משתלם לשני רכבים
        </p>
      </div>
    </motion.div>
  );

  const backContent = (
    <motion.div
      className="relative w-full h-full rounded-3xl p-5 overflow-y-auto custom-scrollbar"
      style={{
        background: 'linear-gradient(145deg, #2e1a3a, #0b0710)',
        border: '2px solid rgba(139,92,246,0.5)',
        boxShadow: '0 0 50px rgba(139,92,246,0.3), 0 0 0 1px rgba(139,92,246,0.3) inset',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-400"
            style={{ left: `${10 + i * 20}%`, top: '10%' }}
            animate={{
              y: [0, 200, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <motion.div 
            className="text-3xl"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🚗🚗
          </motion.div>
          <h3 className="text-xl font-black text-purple-400">DUO DEAL</h3>
        </div>
        
        <div className="text-white/90 text-xs leading-relaxed space-y-3 h-[320px] overflow-y-auto pr-2 custom-scrollbar">
          {packageDetails.duo?.content.split('\n').map((line, i) => {
            if (line.includes('**')) {
              return (
                <motion.p 
                  key={i} 
                  className="font-black text-white text-sm mt-3 first:mt-0"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  style={{ textShadow: '0 0 10px #8b5cf6' }}
                >
                  {line.replace(/\*\*/g, '')}
                </motion.p>
              );
            }
            if (line.includes('📌')) {
              return (
                <motion.p 
                  key={i} 
                  className="font-black text-white text-sm mt-3"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                >
                  {line}
                </motion.p>
              );
            }
            if (line.trim().startsWith('•')) {
              return (
                <motion.p 
                  key={i} 
                  className="flex items-start gap-1.5 text-white/80"
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                >
                  <span className="text-purple-400 text-lg leading-none">•</span>
                  <span>{line.replace('•', '')}</span>
                </motion.p>
              );
            }
            if (line.includes('━━━━')) {
              return (
                <motion.div 
                  key={i} 
                  className="h-px w-full my-2"
                  style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.01 }}
                />
              );
            }
            if (line.trim() === '') return <div key={i} className="h-2" />;
            return (
              <motion.p 
                key={i} 
                className="text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
              >
                {line}
              </motion.p>
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <motion.button
            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full text-[10px] font-black transition-all flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.3), transparent)',
              border: '1px solid rgba(139,92,246,0.5)',
              color: '#8b5cf6'
            }}
          >
            <RefreshCw size={10} />
            חזור לתפריט
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      isFlipped={isFlipped}
      onFlip={() => setIsFlipped(!isFlipped)}
    />
  );
};

// ============================================================
// EQUIPMENT PACKAGE CARD - مع خاصية القلب
// ============================================================
const EquipmentPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isHeavy = pkg.id === 'equipment-heavy';
  
  const color = isHeavy ? '#ea580c' : '#94a3b8';
  const borderColor = isHeavy ? 'rgba(234,88,12,0.5)' : 'rgba(148,163,184,0.4)';
  const glow = isHeavy ? 'rgba(234,88,12,0.3)' : 'rgba(148,163,184,0.2)';
  
  const frontContent = (
    <motion.div
      className="relative w-full h-full rounded-2xl border transition-all duration-500 flex flex-col p-5 group"
      style={{
        background: isHeavy 
          ? 'linear-gradient(135deg, rgba(234,88,12,0.15) 0%, rgba(15,12,8,1) 100%)' 
          : 'linear-gradient(135deg, rgba(148,163,184,0.1) 0%, rgba(10,12,15,1) 100%)',
        borderColor: borderColor,
        boxShadow: `0 0 40px ${glow}, 0 0 0 1px ${borderColor} inset`,
      }}
      whileHover={{ scale: 1.02 }}
    >
      {isHeavy && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="absolute -top-3 right-4 z-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[8px] font-black py-1 px-3 rounded-full shadow-lg shadow-orange-500/40 uppercase tracking-widest border border-orange-400/30 flex items-center gap-1"
        >
          <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
          הכי מבוקש
        </motion.div>
      )}

      <motion.div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="flex items-center gap-2 mb-3 pb-2 border-b"
        style={{ borderColor: isHeavy ? 'rgba(234,88,12,0.2)' : 'rgba(148,163,184,0.15)' }}>
        <motion.div 
          className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: isHeavy ? 'rgba(234,88,12,0.2)' : 'rgba(148,163,184,0.15)', border: `1px solid ${borderColor}` }}
          whileHover={{ rotate: 10 }}
        >
          {isHeavy 
            ? <Truck size={20} style={{ color }} />
            : <Wrench size={20} style={{ color }} />
          }
        </motion.div>
        <div>
          <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-0.5" style={{ color }}>
            {isHeavy ? 'ציוד כבד' : 'ציוד קל'}
          </div>
          <h3 className="text-base font-black text-white">{pkg.name}</h3>
        </div>
        <div className="mr-auto text-right">
          <div className="text-xl font-black text-white">{pkg.price}</div>
          <div className="text-[9px] text-white/30 line-through">
            ₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}
          </div>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-1">
        {(isHeavy 
          ? ['באגר', 'מחפרון', 'מיני באגר'] 
          : ['פופקט', 'ג\'ק', 'מלגזה']
        ).map((item, i) => (
          <motion.span 
            key={i} 
            className="text-[9px] font-black px-2 py-1 rounded-full border"
            style={{ 
              color: isHeavy ? '#fb923c' : '#94a3b8',
              borderColor: borderColor,
              background: isHeavy ? 'rgba(234,88,12,0.1)' : 'rgba(148,163,184,0.08)'
            }}
            whileHover={{ scale: 1.1, backgroundColor: isHeavy ? 'rgba(234,88,12,0.2)' : 'rgba(148,163,184,0.15)' }}
          >
            {item}
          </motion.span>
        ))}
      </div>

      <div className="space-y-2 mb-4 flex-grow">
        {pkg.features.slice(0, 3).map((f, i) => (
          <motion.div 
            key={i} 
            className="flex items-start gap-1.5 text-[10px] font-medium group/feature"
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="mt-0.5 p-0.5 rounded-full shrink-0"
              style={{ background: isHeavy ? 'rgba(234,88,12,0.7)' : 'rgba(148,163,184,0.5)' }}>
              <Check size={6} className="text-dark-bg" strokeWidth={5} />
            </div>
            <span className="text-white/80">{f}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={(e) => { e.stopPropagation(); onSelect(pkg); }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 rounded-xl font-black text-xs transition-all duration-300 relative overflow-hidden group/btn"
        style={{
          background: isHeavy 
            ? 'linear-gradient(135deg, #ea580c, #c2410c)' 
            : 'rgba(148,163,184,0.2)',
          color: '#fff',
          border: isHeavy ? 'none' : '1px solid rgba(148,163,184,0.3)'
        }}
      >
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
        <span className="relative flex items-center justify-center gap-2">
          {isHeavy ? <Truck size={12} /> : <Wrench size={12} />}
          {isHeavy ? '🚜 הזמן עכשיו' : '🔧 הזמן עכשיו'}
        </span>
      </motion.button>
    </motion.div>
  );

  const backContent = (
    <motion.div
      className="relative w-full h-full rounded-2xl p-5 overflow-y-auto custom-scrollbar"
      style={{
        background: isHeavy 
          ? 'linear-gradient(145deg, #3a2a1a, #0f0c05)'
          : 'linear-gradient(145deg, #1a1a2a, #0a0a1a)',
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0 50px ${glow}, 0 0 0 1px ${borderColor} inset`,
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ background: color, left: `${10 + i * 20}%`, top: '10%' }}
            animate={{
              y: [0, 200, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <motion.div 
            className="text-3xl"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            {isHeavy ? '🚜' : '🔧'}
          </motion.div>
          <h3 className="text-xl font-black" style={{ color }}>{pkg.name}</h3>
        </div>
        
        <div className="text-white/90 text-xs leading-relaxed space-y-3 h-[320px] overflow-y-auto pr-2 custom-scrollbar">
          {packageDetails[pkg.id]?.content.split('\n').map((line, i) => {
            if (line.includes('**')) {
              return (
                <motion.p 
                  key={i} 
                  className="font-black text-white text-sm mt-3 first:mt-0"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  style={{ textShadow: `0 0 10px ${color}` }}
                >
                  {line.replace(/\*\*/g, '')}
                </motion.p>
              );
            }
            if (line.includes('📌')) {
              return (
                <motion.p 
                  key={i} 
                  className="font-black text-white text-sm mt-3"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                >
                  {line}
                </motion.p>
              );
            }
            if (line.trim().startsWith('•')) {
              return (
                <motion.p 
                  key={i} 
                  className="flex items-start gap-1.5 text-white/80"
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                >
                  <span style={{ color }} className="text-lg leading-none">•</span>
                  <span>{line.replace('•', '')}</span>
                </motion.p>
              );
            }
            if (line.includes('━━━━')) {
              return (
                <motion.div 
                  key={i} 
                  className="h-px w-full my-2"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.01 }}
                />
              );
            }
            if (line.trim() === '') return <div key={i} className="h-2" />;
            return (
              <motion.p 
                key={i} 
                className="text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
              >
                {line}
              </motion.p>
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <motion.button
            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full text-[10px] font-black transition-all flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${color}30, transparent)`,
              border: `1px solid ${borderColor}`,
              color
            }}
          >
            <RefreshCw size={10} />
            חזור לתפריט
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      isFlipped={isFlipped}
      onFlip={() => setIsFlipped(!isFlipped)}
    />
  );
};

// ============================================================
// BUSINESS PACKAGE CARD - مع خاصية القلب
// ============================================================
const BusinessPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const frontContent = (
    <motion.div
      className="relative w-full h-full rounded-2xl overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, #0a1a2a 0%, #0f2a3a 50%, #1a3a4a 100%)',
        boxShadow: '0 20px 40px -15px rgba(0,150,255,0.4), 0 0 0 2px rgba(0,150,255,0.3) inset'
      }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      <div className="relative z-10 p-5 h-full flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30"
            >
              <Building2 size={24} className="text-white" />
            </motion.div>
            <div>
              <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">לסוכנויות</div>
              <h3 className="text-xl font-black text-white">BUSINESS</h3>
            </div>
          </div>
          <motion.div 
            className="flex items-center gap-1 bg-blue-500/20 px-2 py-1 rounded-full border border-blue-500/30"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Award size={12} className="text-blue-400" />
            <span className="text-[8px] font-black text-blue-400">מומלץ</span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4 flex-grow">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <div>
                <span className="text-2xl font-black text-white">₪1,499</span>
                <span className="text-white/40 text-xs mr-1">/חודש</span>
              </div>
              <span className="text-xs line-through text-white/30">₪2,499</span>
              <motion.span 
                className="text-[8px] font-black bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full border border-green-500/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                חיסכון 40%
              </motion.span>
            </div>

            <div className="space-y-2">
              {[
                'עד 50 רכבים בחודש',
                'צילומים מקצועיים',
                'דפי נחיתה מותאמים',
                'מנהל לקוח ייעודי',
              ].map((text, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-2 text-white/80 text-[10px]"
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check size={8} className="text-blue-400" />
                  </div>
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: <Target size={16} />, title: 'חשיפה ממוקדת' },
              { icon: <BarChart3 size={16} />, title: 'דוחות חודשיים' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="p-2 rounded-xl bg-white/10 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <div className="text-blue-400 mb-1">{item.icon}</div>
                <div className="text-[9px] font-black">{item.title}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          onClick={(e) => { e.stopPropagation(); onSelect(pkg); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-xl font-black text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all relative overflow-hidden group/btn"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            <Briefcase size={14} />
            התחל חבילה
          </span>
        </motion.button>
      </div>
    </motion.div>
  );

  const backContent = (
    <motion.div
      className="relative w-full h-full rounded-2xl p-5 overflow-y-auto custom-scrollbar"
      style={{
        background: 'linear-gradient(145deg, #0a1a2a, #0a0a1a)',
        border: '2px solid rgba(59,130,246,0.5)',
        boxShadow: '0 0 50px rgba(59,130,246,0.3), 0 0 0 1px rgba(59,130,246,0.3) inset',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400"
            style={{ left: `${10 + i * 20}%`, top: '10%' }}
            animate={{
              y: [0, 200, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <motion.div 
            className="text-3xl"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🏢
          </motion.div>
          <h3 className="text-xl font-black text-blue-400">BUSINESS</h3>
        </div>
        
        <div className="text-white/90 text-xs leading-relaxed space-y-3 h-[320px] overflow-y-auto pr-2 custom-scrollbar">
          {packageDetails.business?.content.split('\n').map((line, i) => {
            if (line.includes('**')) {
              return (
                <motion.p 
                  key={i} 
                  className="font-black text-white text-sm mt-3 first:mt-0"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  style={{ textShadow: '0 0 10px #3b82f6' }}
                >
                  {line.replace(/\*\*/g, '')}
                </motion.p>
              );
            }
            if (line.includes('📌')) {
              return (
                <motion.p 
                  key={i} 
                  className="font-black text-white text-sm mt-3"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                >
                  {line}
                </motion.p>
              );
            }
            if (line.trim().startsWith('•')) {
              return (
                <motion.p 
                  key={i} 
                  className="flex items-start gap-1.5 text-white/80"
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                >
                  <span className="text-blue-400 text-lg leading-none">•</span>
                  <span>{line.replace('•', '')}</span>
                </motion.p>
              );
            }
            if (line.includes('━━━━')) {
              return (
                <motion.div 
                  key={i} 
                  className="h-px w-full my-2"
                  style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.01 }}
                />
              );
            }
            if (line.trim() === '') return <div key={i} className="h-2" />;
            return (
              <motion.p 
                key={i} 
                className="text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
              >
                {line}
              </motion.p>
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <motion.button
            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full text-[10px] font-black transition-all flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.3), transparent)',
              border: '1px solid rgba(59,130,246,0.5)',
              color: '#3b82f6'
            }}
          >
            <RefreshCw size={10} />
            חזור לתפריט
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      isFlipped={isFlipped}
      onFlip={() => setIsFlipped(!isFlipped)}
    />
  );
};

// --- Bit / PayBox Logo ---
const BitLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const h = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const fontSize = size === 'sm' ? 11 : size === 'lg' ? 16 : 13;
  const px = size === 'sm' ? 8 : 12;
  return (
    <motion.div
      className="inline-flex items-center justify-center rounded-lg overflow-hidden shrink-0"
      style={{ background: '#0D3D3D', height: h, paddingLeft: px, paddingRight: px, gap: 4 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00E5CC' }}
    >
      <svg width={fontSize * 0.5} height={h * 0.6} viewBox="0 0 9 18" fill="none">
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
    </motion.div>
  );
};

const PayBoxLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const h = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const fontSize = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;
  const px = size === 'sm' ? 8 : 12;
  return (
    <motion.div
      className="inline-flex items-center justify-center rounded-lg overflow-hidden shrink-0"
      style={{ background: '#29ABE2', height: h, paddingLeft: px, paddingRight: px, gap: 4 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px #29ABE2' }}
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
    </motion.div>
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
    
    setTimeout(() => {
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
      transition={{ type: 'spring', stiffness: 300 }}
      className="glass-card p-6 space-y-5"
    >
      <div className="text-center space-y-2">
        <motion.div 
          className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-brand-red/30"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Search size={28} className="text-white" />
        </motion.div>
        <h3 className="text-xl font-black">בדיקת סטטוס הזמנה</h3>
        <p className="text-white/50 text-xs">הכנס את מספר ההזמנה שקיבלת בוואטסאפ</p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="לדוגמה: #12345"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-center text-base font-black tracking-widest focus:border-brand-red focus:outline-none transition-all"
          />
          {orderNumber && (
            <motion.button
              onClick={() => setOrderNumber('')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              <X size={14} />
            </motion.button>
          )}
        </div>

        <motion.button
          onClick={checkOrder}
          disabled={status === 'loading'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-gradient-to-r from-brand-red to-red-600 rounded-xl font-black text-sm shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 transition-all disabled:opacity-50 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative">
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                בודק...
              </span>
            ) : (
              'בדוק סטטוס'
            )}
          </span>
        </motion.button>

        <AnimatePresence>
          {status === 'found' && orderDetails && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-green-400 text-xs font-black">סטטוס:</span>
                <span className="bg-green-500/20 text-green-400 px-3 py-0.5 rounded-full text-xs font-black border border-green-500/30">
                  {orderDetails.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
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
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 text-center"
            >
              <X size={24} className="text-red-400 mx-auto mb-1" />
              <p className="text-red-400 font-black text-sm">ההזמנה לא נמצאה</p>
              <p className="text-white/40 text-xs mt-1">בדוק את המספר ונסה שנית</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onClose}
        className="w-full py-2.5 rounded-xl text-xs font-bold border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red text-brand-red hover:text-white transition-all flex items-center justify-center gap-2"
      >
        <ArrowLeft size={12} />
        חזור לדף הבית
      </motion.button>
    </motion.div>
  );
};

// ============================================================
// CHANGE PACKAGE MODAL - تغيير الباقة بشكل احترافي
// ============================================================
const ChangePackageModal = ({
  isOpen,
  onClose,
  currentPackageId,
  packages,
  vipPackage,
  duoPackage,
  equipmentPackages,
  businessPackage,
  onSelect,
  lang
}: {
  isOpen: boolean;
  onClose: () => void;
  currentPackageId: string;
  packages: Package[];
  vipPackage: Package;
  duoPackage: Package;
  equipmentPackages: Package[];
  businessPackage: Package;
  onSelect: (p: Package) => void;
  lang: Language;
}) => {
  const allPackages = [...packages, vipPackage, duoPackage, ...equipmentPackages, businessPackage];

  const getPackageStyle = (pkg: Package) => {
    if (pkg.id === 'vip') return { border: 'border-amber-500/40', bg: 'bg-amber-500/10', badge: '👑', color: 'text-amber-400', activeBorder: 'border-amber-400' };
    if (pkg.id === 'duo') return { border: 'border-purple-500/40', bg: 'bg-purple-500/10', badge: '🚗🚗', color: 'text-purple-400', activeBorder: 'border-purple-400' };
    if (pkg.id === 'business') return { border: 'border-blue-500/40', bg: 'bg-blue-500/10', badge: '🏢', color: 'text-blue-400', activeBorder: 'border-blue-400' };
    if (pkg.id === 'equipment-heavy') return { border: 'border-orange-500/40', bg: 'bg-orange-500/10', badge: '🚜', color: 'text-orange-400', activeBorder: 'border-orange-400' };
    if (pkg.id === 'equipment-light') return { border: 'border-slate-500/40', bg: 'bg-slate-500/10', badge: '🔧', color: 'text-slate-400', activeBorder: 'border-slate-400' };
    if (pkg.id === 'premium') return { border: 'border-brand-red/40', bg: 'bg-brand-red/10', badge: '💎', color: 'text-brand-red', activeBorder: 'border-brand-red' };
    if (pkg.id === 'pro') return { border: 'border-brand-red/30', bg: 'bg-brand-red/5', badge: '⭐', color: 'text-brand-red', activeBorder: 'border-brand-red' };
    return { border: 'border-white/10', bg: 'bg-white/5', badge: '🚀', color: 'text-white/60', activeBorder: 'border-white/40' };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, #0f0f14 0%, #0a0a0e 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)'
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 px-5 py-4 border-b border-white/8 flex items-center justify-between"
              style={{ background: 'rgba(15,15,20,0.95)', backdropFilter: 'blur(10px)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                  <RefreshCw size={14} className="text-brand-red" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">החלפת חבילה</h3>
                  <p className="text-[9px] text-white/40">בחר חבילה אחרת להזמנה</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={18} className="text-white/50" />
              </motion.button>
            </div>

            {/* Packages Grid */}
            <div className="p-5 space-y-2">
              {allPackages.map((pkg) => {
                const style = getPackageStyle(pkg);
                const isActive = pkg.id === currentPackageId;
                return (
                  <motion.button
                    key={pkg.id}
                    whileHover={{ x: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { onSelect(pkg); onClose(); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-right ${
                      isActive
                        ? `${style.activeBorder} ${style.bg}`
                        : `${style.border} bg-white/3 hover:bg-white/5`
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center text-lg shrink-0`}>
                      {style.badge}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-black ${isActive ? style.color : 'text-white'}`}>{pkg.name}</span>
                        {isActive && (
                          <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-white/10 text-white/60">
                            נוכחית
                          </span>
                        )}
                      </div>
                      <p className="text-[9px] text-white/40 mt-0.5 truncate">
                        {pkg.features[0] || ''}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-base font-black ${isActive ? style.color : 'text-white'}`}>{pkg.price}</div>
                    </div>
                    {isActive && (
                      <div className={`w-4 h-4 rounded-full border-2 ${style.activeBorder} flex items-center justify-center shrink-0`}>
                        <div className={`w-2 h-2 rounded-full ${style.color.replace('text-', 'bg-')}`} />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Step 1: Car Details Form ---
const CarDetailsForm = ({ 
  formData, 
  setFormData, 
  onNext,
  selectedPackage,
  onChangePackage
}: { 
  formData: any, 
  setFormData: (data: any) => void, 
  onNext: () => void,
  selectedPackage: Package | null,
  onChangePackage: () => void
}) => {
  const isDuo = selectedPackage?.id === 'duo';
  const isBusiness = selectedPackage?.id === 'business';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="space-y-5"
    >
      {/* Package Badge + Change Option */}
      <motion.div 
        className="flex items-center justify-between p-3 rounded-xl border border-white/8 bg-white/3"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            {selectedPackage?.id === 'vip' ? <Crown size={14} className="text-amber-400" /> :
             selectedPackage?.id === 'duo' ? <Car size={14} className="text-purple-400" /> :
             selectedPackage?.id === 'business' ? <Building2 size={14} className="text-blue-400" /> :
             <Car size={14} className="text-brand-red" />}
          </motion.div>
          <div>
            <div className="text-[9px] text-white/40">חבילה נבחרת</div>
            <div className="text-xs font-black text-white">{selectedPackage?.name}</div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onChangePackage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black border border-white/10 text-white/50 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all"
        >
          <RefreshCw size={10} />
          החלף חבילה
        </motion.button>
      </motion.div>

      {/* Business-specific form */}
      {isBusiness ? (
        <>
          <div className="text-center space-y-2">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Building2 size={28} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-black">פרטי הסוכנות</h3>
            <p className="text-white/50 text-xs">הכנס את פרטי הסוכנות שלך</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-blue-400/70">שם הסוכנות *</label>
              <input
                type="text"
                placeholder="סוכנות הרכב שלי"
                value={formData.agencyName || ''}
                onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-blue-400/70">שם איש קשר *</label>
              <input
                type="text"
                placeholder="ישראל ישראלי"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-blue-400/70">טלפון *</label>
              <input
                type="tel"
                placeholder="050-1234567"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-blue-400/70">מיקום הסוכנות *</label>
              <input
                type="text"
                placeholder="תל אביב"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-blue-400/70">כמות רכבים בחודש (משוערת) *</label>
              <input
                type="text"
                placeholder="10-20 רכבים"
                value={formData.monthlyCars || ''}
                onChange={(e) => setFormData({...formData, monthlyCars: e.target.value})}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-blue-400/70">פרטים נוספים על הסוכנות</label>
              <textarea
                placeholder="ספר לנו על הסוכנות שלך, סוג הרכבים, קהל היעד..."
                value={formData.agencyDetails || ''}
                onChange={(e) => setFormData({...formData, agencyDetails: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Business info banner */}
          <motion.div 
            className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-start gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <Building2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
            <p className="text-[9px] text-blue-300/70 leading-relaxed">
              לאחר השליחה, נציג מטעמנו יצור איתך קשר תוך 2 שעות לתיאום פרטים ומענה על שאלות.
            </p>
          </motion.div>
        </>
      ) : isDuo ? (
        /* DUO form - two cars */
        <>
          <div className="text-center space-y-2">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-purple-500/30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Car size={28} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-black">פרטי שני הרכבים</h3>
            <p className="text-white/50 text-xs">מלא פרטים עבור כל אחד מהרכבים</p>
          </div>

          {/* Personal details */}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">שם מלא *</label>
              <input
                type="text"
                placeholder="ישראל ישראלי"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">טלפון *</label>
              <input
                type="tel"
                placeholder="050-1234567"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-white/60">מיקום *</label>
              <input
                type="text"
                placeholder="תל אביב"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Car 1 */}
          <motion.div 
            className="rounded-xl border border-purple-500/25 overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="px-4 py-2.5 bg-purple-500/10 border-b border-purple-500/20 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-[10px] font-black text-purple-400">1</span>
              </div>
              <span className="text-xs font-black text-purple-300">רכב ראשון</span>
            </div>
            <div className="p-4 grid md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">דגם *</label>
                <input type="text" placeholder="מאזדה 3" value={formData.model || ''} onChange={(e) => setFormData({...formData, model: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">שנה *</label>
                <input type="text" placeholder="2020" value={formData.year || ''} onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">קילומטראז' *</label>
                <input type="text" placeholder="50,000" value={formData.mileage || ''} onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">מחיר *</label>
                <input type="text" placeholder="89,000 ₪" value={formData.price || ''} onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">עלייה לכביש</label>
                <input type="text" placeholder="2020" value={formData.registration || ''} onChange={(e) => setFormData({...formData, registration: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">טסט עד</label>
                <input type="text" placeholder="12/2025" value={formData.testUntil || ''} onChange={(e) => setFormData({...formData, testUntil: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
              </div>
            </div>
          </motion.div>

          {/* Car 2 */}
          <motion.div 
            className="rounded-xl border border-purple-500/25 overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="px-4 py-2.5 bg-purple-500/10 border-b border-purple-500/20 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-[10px] font-black text-purple-400">2</span>
              </div>
              <span className="text-xs font-black text-purple-300">רכב שני</span>
            </div>
            <div className="p-4 grid md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">דגם *</label>
                <input type="text" placeholder="טויוטה קורולה" value={formData.model2 || ''} onChange={(e) => setFormData({...formData, model2: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">שנה *</label>
                <input type="text" placeholder="2019" value={formData.year2 || ''} onChange={(e) => setFormData({...formData, year2: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">קילומטראז' *</label>
                <input type="text" placeholder="70,000" value={formData.mileage2 || ''} onChange={(e) => setFormData({...formData, mileage2: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">מחיר *</label>
                <input type="text" placeholder="65,000 ₪" value={formData.price2 || ''} onChange={(e) => setFormData({...formData, price2: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">עלייה לכביש</label>
                <input type="text" placeholder="2019" value={formData.registration2 || ''} onChange={(e) => setFormData({...formData, registration2: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-white/50">טסט עד</label>
                <input type="text" placeholder="06/2025" value={formData.testUntil2 || ''} onChange={(e) => setFormData({...formData, testUntil2: e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
              </div>
            </div>
          </motion.div>

          {/* DUO note */}
          <motion.div 
            className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 flex items-start gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <Car size={14} className="text-purple-400 mt-0.5 shrink-0" />
            <p className="text-[9px] text-purple-300/70 leading-relaxed">
              לאחר ביצוע ההזמנה, שלח בוואטסאפ תמונות עבור <strong className="text-purple-300">כל אחד</strong> מהרכבים בנפרד – 4 תמונות לכל רכב.
            </p>
          </motion.div>
        </>
      ) : (
        /* Regular car form */
        <>
          <div className="text-center space-y-2">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Car size={28} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-black">פרטי הרכב</h3>
            <p className="text-white/50 text-xs">הכנס את פרטי הרכב שברצונך לפרסם</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">דגם רכב *</label>
              <input
                type="text"
                placeholder="מאזדה 3"
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">שנה *</label>
              <input
                type="text"
                placeholder="2020"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">קילומטראז' *</label>
              <input
                type="text"
                placeholder="50,000"
                value={formData.mileage}
                onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">מחיר מבוקש *</label>
              <input
                type="text"
                placeholder="89,000 ₪"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">תאריך עלייה לכביש *</label>
              <input
                type="text"
                placeholder="2020"
                value={formData.registration}
                onChange={(e) => setFormData({...formData, registration: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">טסט עד *</label>
              <input
                type="text"
                placeholder="12/2024"
                value={formData.testUntil}
                onChange={(e) => setFormData({...formData, testUntil: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all"
                required
              />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-black text-white/60">מיקום בארץ *</label>
              <input
                type="text"
                placeholder="תל אביב"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">שם מלא *</label>
              <input
                type="text"
                placeholder="ישראל ישראלי"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">טלפון *</label>
              <input
                type="tel"
                placeholder="050-1234567"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all"
                required
              />
            </div>
          </div>
        </>
      )}

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 rounded-xl font-black text-sm shadow-xl transition-all mt-2 relative overflow-hidden group"
        style={{
          background: selectedPackage?.id === 'business'
            ? 'linear-gradient(135deg, #3b82f6, #7c3aed)'
            : selectedPackage?.id === 'duo'
            ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
            : 'linear-gradient(135deg, #c8102e, #9b0d24)',
          boxShadow: selectedPackage?.id === 'business'
            ? '0 10px 30px -10px rgba(59,130,246,0.4)'
            : selectedPackage?.id === 'duo'
            ? '0 10px 30px -10px rgba(139,92,246,0.4)'
            : '0 10px 30px -10px rgba(200,16,46,0.4)'
        }}
      >
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative">להמשך לתשלום</span>
      </motion.button>
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
  onBack,
  onChangePackage
}: { 
  formData: any, 
  setFormData: (data: any) => void, 
  selectedPackage: Package | null, 
  onSubmit: () => void, 
  loading: boolean,
  onBack: () => void,
  onChangePackage: () => void
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'bit' | 'paybox' | null>(null);

  const isBusiness = selectedPackage?.id === 'business';
  const isDuo = selectedPackage?.id === 'duo';

  // Color scheme per package type
  const accentColor = isBusiness ? '#3b82f6' : isDuo ? '#8b5cf6' : '#c8102e';
  const accentBorder = isBusiness ? 'border-blue-500/30' : isDuo ? 'border-purple-500/30' : 'border-brand-red/20';
  const accentBg = isBusiness ? 'from-blue-500/10' : isDuo ? 'from-purple-500/10' : 'from-brand-red/10';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="space-y-5"
    >
      <div className="text-center space-y-2">
        <motion.div 
          className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto shadow-xl"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`, boxShadow: `0 20px 40px -15px ${accentColor}50` }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CreditCard size={28} className="text-white" />
        </motion.div>
        <h3 className="text-xl font-black">תשלום והעלאת אישור</h3>
        <p className="text-white/50 text-xs">בחר אמצעי תשלום והעלה צילום מסך</p>
      </div>

      <motion.div 
        className={`p-3 rounded-xl bg-gradient-to-r ${accentBg} to-transparent border ${accentBorder}`}
        whileHover={{ scale: 1.02 }}
      >
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onChangePackage}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all shrink-0 mr-1"
          >
            <RefreshCw size={12} style={{ color: accentColor }} />
            <span className="text-[8px] font-black text-white/50">החלף</span>
          </motion.button>
        </div>
        {isDuo && (
          <div className="mt-2 pt-2 border-t border-purple-500/20">
            <p className="text-[9px] text-purple-300/70 flex items-center gap-1">
              <Car size={10} />
              תמחור כולל 2 רכבים - חיסכון של 40%
            </p>
          </div>
        )}
        {isBusiness && (
          <div className="mt-2 pt-2 border-t border-blue-500/20">
            <p className="text-[9px] text-blue-300/70 flex items-center gap-1">
              <Building2 size={10} />
              מינוי חודשי לסוכנות - עד 50 רכבים
            </p>
          </div>
        )}
      </motion.div>

      <div className="space-y-2">
        <label className="text-xs font-black text-white/60">אמצעי תשלום *</label>
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            type="button"
            onClick={() => setPaymentMethod('bit')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl border-2 transition-all ${
              paymentMethod === 'bit' 
                ? 'border-[#00E5CC] bg-[#00E5CC]/10' 
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <BitLogo size="md" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setPaymentMethod('paybox')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-xl border-2 transition-all ${
              paymentMethod === 'paybox' 
                ? 'border-[#29ABE2] bg-[#29ABE2]/10' 
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <PayBoxLogo size="md" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {paymentMethod && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 space-y-3"
          >
            <div className="text-center">
              <p className="text-white/60 text-xs">העבר את הסכום למספר:</p>
              <p className="text-xl font-black tracking-wider text-white">054-6980606</p>
            </div>

            <motion.button
              onClick={() => navigator.clipboard.writeText('0546980606')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <FileText size={12} />
              העתק מספר
            </motion.button>

            <div className="space-y-1">
              <label className="text-xs font-black text-white/60">העלה צילום מסך של ההעברה *</label>
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
                <motion.div 
                  className={`rounded-lg border-2 border-dashed py-3 px-3 flex flex-col items-center gap-1 transition-colors ${
                    formData.paymentProof ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {formData.paymentProof ? (
                    <>
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check size={16} className="text-green-400" />
                      </div>
                      <span className="text-xs font-black text-green-400">הקובץ הועלה בהצלחה</span>
                    </>
                  ) : (
                    <>
                      <Upload size={18} className="text-white/40" />
                      <span className="text-xs font-black text-white/60">לחץ להעלאת צילום מסך</span>
                      <span className="text-[9px] text-white/30">PNG, JPG או JPEG</span>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DUO: reminder to send both cars' photos */}
      {isDuo && (
        <motion.div 
          className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 flex items-start gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <Camera size={14} className="text-purple-400 mt-0.5 shrink-0" />
          <p className="text-[9px] text-purple-300/70 leading-relaxed">
            לאחר אישור ההזמנה, שלח בוואטסאפ תמונות נפרדות לכל רכב: <strong className="text-purple-300">4 תמונות לרכב הראשון + 4 תמונות לרכב השני</strong>.
          </p>
        </motion.div>
      )}

      {/* Business: reminder */}
      {isBusiness && (
        <motion.div 
          className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-start gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <Building2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
          <p className="text-[9px] text-blue-300/70 leading-relaxed">
            לאחר קבלת ההזמנה, נציגנו יפנה אליך לתיאום ותחילת השיתוף פעולה.
          </p>
        </motion.div>
      )}

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onBack}
          className="flex-1 py-2.5 rounded-xl font-black text-sm border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red transition-all flex items-center justify-center gap-2 text-brand-red hover:text-white relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center gap-2">
            <ArrowLeft size={14} />
            חזור
          </span>
        </motion.button>
        <motion.button
          onClick={onSubmit}
          disabled={!paymentMethod || !formData.paymentProof || loading}
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
          className="flex-1 py-2.5 rounded-xl font-black text-sm shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
            boxShadow: `0 10px 30px -10px ${accentColor}50`
          }}
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                שולח...
              </span>
            ) : (
              'שלח הזמנה'
            )}
          </span>
        </motion.button>
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
    features: [
      'עד 50 רכבים בחודש',
      'מנהל לקוח ייעודי',
      'דוחות ביצועים חודשיים',
      'קידום ממומן',
      'עיצוב מקצועי לכל מודעה'
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
    carImages: [] as string[],
    // DUO fields
    model2: '',
    year2: '',
    mileage2: '',
    price2: '',
    registration2: '',
    testUntil2: '',
    // Business fields
    agencyName: '',
    monthlyCars: '',
    agencyDetails: ''
  });

  const handleSubmitOrder = async () => {
    setLoading(true);
    
    try {
      const pkgId = selectedPackage?.id || '';
      const pkgEmoji = pkgId === 'vip' ? '👑' : pkgId === 'premium' ? '💎' : pkgId === 'pro' ? '⭐' : pkgId.includes('equipment') ? '🚜' : pkgId === 'business' ? '🏢' : pkgId === 'duo' ? '🚗🚗' : '✅';

      const randomId = Math.floor(10000 + Math.random() * 90000);
      const orderNum = String(randomId).slice(0, 5);

      let message = '';

      if (pkgId === 'business') {
        message = `*YOUGO ISRAEL | הזמנת BUSINESS חדשה* 🏢
---------------------------------------
*מספר הזמנה:* #${orderNum}
*חבילה:* BUSINESS ${pkgEmoji}
---------------------------------------

🏢 *פרטי הסוכנות:*
• שם הסוכנות: ${formData.agencyName}
• איש קשר: ${formData.fullName}
• טלפון: ${formData.phone}
• מיקום: ${formData.location}
• כמות רכבים: ${formData.monthlyCars}
• פרטים: ${formData.agencyDetails || 'לא צוין'}

---------------------------------------
✅ *אישור תשלום הועלה בהצלחה.*
📞 *נציגנו יצור קשר תוך 2 שעות לתיאום.*
---------------------------------------
_נשלח אוטומטית ממערכת YOUGO_`;
      } else if (pkgId === 'duo') {
        message = `*YOUGO ISRAEL | הזמנת DUO DEAL חדשה* 🚗🚗
---------------------------------------
*מספר הזמנה:* #${orderNum}
*חבילה:* DUO DEAL ${pkgEmoji}
---------------------------------------

👤 *פרטי לקוח:*
• שם מלא: ${formData.fullName}
• טלפון: ${formData.phone}
• מיקום: ${formData.location}

🚘 *רכב ראשון:*
• דגם: ${formData.model}
• שנה: ${formData.year}
• קילומטראז': ${formData.mileage}
• מחיר: ${formData.price}
• עלייה לכביש: ${formData.registration}
• טסט עד: ${formData.testUntil}

🚗 *רכב שני:*
• דגם: ${formData.model2}
• שנה: ${formData.year2}
• קילומטראז': ${formData.mileage2}
• מחיר: ${formData.price2}
• עלייה לכביש: ${formData.registration2}
• טסט עד: ${formData.testUntil2}

---------------------------------------
✅ *אישור תשלום הועלה בהצלחה.*
📸 *שלח 4 תמונות לרכב הראשון + 4 תמונות לרכב השני!*
---------------------------------------
_נשלח אוטומטית ממערכת YOUGO_`;
      } else {
        message = `*YOUGO ISRAEL | אישור הזמנה חדשה* 🚗💨
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
      }

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
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
        }
        
        .input-field {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 10px 12px;
          color: white;
          width: 100%;
          transition: all 0.3s;
          font-size: 14px;
        }
        .input-field:focus {
          border-color: #c8102e;
          outline: none;
          background: rgba(200, 16, 46, 0.08);
        }

        /* Global bg noise texture */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 0;
        }

        /* Subtle red ambient light top right */
        body::after {
          content: '';
          position: fixed;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(200,16,46,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Hero animated background */
        @keyframes heroFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes heroFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 20px) scale(1.03); }
          66% { transform: translate(20px, -15px) scale(0.98); }
        }
        @keyframes heroFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, 25px) scale(1.04); }
        }
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(600%); opacity: 0; }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-120px) translateX(30px); opacity: 0; }
        }
        @keyframes socialPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,16,46,0); }
          50% { box-shadow: 0 0 0 6px rgba(200,16,46,0.1); }
        }
        .hero-orb-1 { animation: heroFloat1 12s ease-in-out infinite; }
        .hero-orb-2 { animation: heroFloat2 15s ease-in-out infinite; }
        .hero-orb-3 { animation: heroFloat3 10s ease-in-out infinite; }
        .scan-line { animation: scanLine 4s linear infinite; }
        .grid-move { animation: gridMove 8s linear infinite; }
        .social-pulse { animation: socialPulse 3s ease-in-out infinite; }

        /* Flip card styles */
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--brand-red);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a50d25;
        }

        /* Package card min-height */
        .pkg-card-min { min-height: 480px; }
      `}</style>

      <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin} onLogout={() => { setIsAdmin(false); setView('home'); }} siteSettings={siteSettings} setView={setView} />

      <main className="pt-24 px-3 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-20"
            >
              {/* ============================================================
                  HERO SECTION - فخم جداً مع حركات متقدمة
                  ============================================================ */}
              <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                
                {/* === Animated Background فخم === */}
                <div className="absolute inset-0">
                  {/* Base dark gradient */}
                  <div className="absolute inset-0 bg-[#060608]" />

                  {/* Animated mesh orbs - فخمة جداً */}
                  <motion.div 
                    className="hero-orb-1 absolute top-[-10%] right-[-5%] w-[55%] h-[55%] rounded-full"
                    style={{ background: 'radial-gradient(circle, #c8102e 0%, transparent 70%)' }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <motion.div 
                    className="hero-orb-2 absolute bottom-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full"
                    style={{ background: 'radial-gradient(circle, #c8102e 0%, transparent 70%)' }}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                  <motion.div 
                    className="hero-orb-3 absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full"
                    style={{ background: 'radial-gradient(circle, #ff4560 0%, transparent 70%)' }}
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                  />

                  {/* Moving grid - فخمة */}
                  <div className="absolute inset-0 overflow-hidden opacity-[0.05]">
                    <motion.div 
                      className="grid-move absolute inset-0" 
                      style={{
                        backgroundImage: 'linear-gradient(rgba(200,16,46,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,16,46,0.6) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                        height: '200%'
                      }}
                      animate={{ y: [0, -60, 0] }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  {/* Scan line effect - متحرك */}
                  <motion.div 
                    className="scan-line absolute left-0 right-0 h-[2px] pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(200,16,46,0.6), transparent)' }}
                    animate={{ top: ['-10%', '110%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Floating particles - متحركة */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{ background: `rgba(200,16,46,${0.3 + Math.random() * 0.4})`, left: `${Math.random() * 100}%` }}
                      animate={{
                        y: [0, -200, 0],
                        x: [0, (Math.random() - 0.5) * 100, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                      }}
                      transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}

                  {/* Corner accent lines - فخمة */}
                  <motion.div 
                    className="absolute top-12 right-12 w-20 h-20"
                    style={{ borderTop: '2px solid #c8102e', borderRight: '2px solid #c8102e' }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute bottom-12 left-12 w-20 h-20"
                    style={{ borderBottom: '2px solid #c8102e', borderLeft: '2px solid #c8102e' }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />

                  {/* Radial vignette overlay */}
                  <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #060608 100%)' }} />
                </div>

                {/* Content - فخم جداً */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative z-10 text-center px-4 max-w-5xl mx-auto"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-brand-red/30 rounded-full px-6 py-3 mb-8"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span 
                      className="w-2 h-2 rounded-full bg-brand-red"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm font-black tracking-wider text-white/90">הדרך המהירה ביותר למכור רכב</span>
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-white mb-6"
                  >
                    מוכרים רכב? <br />
                    <motion.span 
                      className="text-brand-red inline-block"
                      style={{ textShadow: '0 0 40px rgba(200,16,46,0.6)' }}
                      animate={{ 
                        textShadow: ['0 0 40px rgba(200,16,46,0.6)', '0 0 60px rgba(200,16,46,0.9)', '0 0 40px rgba(200,16,46,0.6)']
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      אנחנו מוכרים אותו מהר יותר.
                    </motion.span>
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10"
                  >
                    YOUGO ISRAEL - פלטפורמת השיווק המובילה באינסטגרם למכירת רכבים.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap justify-center gap-5 mb-10"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ boxShadow: ['0 15px 40px -10px rgba(200,16,46,0.5)', '0 20px 50px -10px rgba(200,16,46,0.8)', '0 15px 40px -10px rgba(200,16,46,0.5)'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      onClick={() => {
                        const el = document.getElementById('packages');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-10 py-5 rounded-xl font-black text-xl transition-all relative overflow-hidden group"
                      style={{
                        background: 'linear-gradient(135deg, #c8102e, #a50d25)',
                      }}
                    >
                      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative flex items-center gap-3">
                        <Sparkles size={24} />
                        התחל הזמנה
                      </span>
                    </motion.button>
                    
                    <motion.button 
                      onClick={() => setView('check-status')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 bg-white/10 backdrop-blur-md rounded-xl font-black text-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all flex items-center gap-3"
                    >
                      <Search size={24} />
                      בדוק סטטוס
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center justify-center gap-8 flex-wrap"
                  >
                    {[
                      { icon: <ShieldCheck size={20} />, label: 'תשלום מאובטח' },
                      { icon: <Clock size={20} />, label: 'פרסום תוך 24 שעות' },
                      { icon: <Users size={20} />, label: '50K+ עוקבים' },
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-3 text-white/60"
                        whileHover={{ scale: 1.1, color: '#fff' }}
                      >
                        <span className="text-brand-red">{item.icon}</span>
                        <span className="text-base">{item.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Scroll Down Indicator - متحرك */}
                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 cursor-pointer"
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                  <ChevronDown size={32} />
                </motion.div>
              </section>

              {/* How it Works - محسّن وجذاب */}
              <section id="how-it-works" className="space-y-12">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-3"
                >
                  <motion.div 
                    className="inline-flex items-center gap-2 bg-brand-red/20 border border-brand-red/30 rounded-full px-5 py-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span 
                      className="w-2 h-2 bg-brand-red rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-sm font-black tracking-wider text-brand-red">תהליך פשוט ומהיר</span>
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-black">איך זה עובד?</h2>
                  <p className="text-white/50 text-base max-w-2xl mx-auto">3 שלבים פשוטים והרכב שלך באוויר</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      step: '01',
                      title: 'בחירת חבילה',
                      desc: 'בוחרים את חבילת הפרסום המתאימה',
                      icon: <LayoutDashboard size={40} />,
                      color: 'from-blue-500 to-cyan-500'
                    },
                    {
                      step: '02',
                      title: 'הזנת פרטים',
                      desc: 'ממלאים פרטי הרכב ומעלים אישור תשלום',
                      icon: <FileText size={40} />,
                      color: 'from-brand-red to-red-600'
                    },
                    {
                      step: '03',
                      title: 'פרסום וחשיפה',
                      desc: 'הצוות שלנו מעצב ומפרסם מודעה מקצועית',
                      icon: <Send size={40} />,
                      color: 'from-green-500 to-emerald-500'
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl group-hover:scale-105 transition-transform duration-300" />
                      <div className="relative p-8 text-center">
                        <motion.div 
                          className={`w-24 h-24 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          {item.icon}
                        </motion.div>
                        <div className="text-5xl font-black text-white/10 absolute top-4 left-4">{item.step}</div>
                        <h3 className="text-xl font-black mb-3">{item.title}</h3>
                        <p className="text-white/50 text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Packages Section - فخم جداً مع بطاقات قابلة للقلب */}
              <section id="packages" className="space-y-16">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-3"
                >
                  <h2 className="text-4xl md:text-5xl font-black">{t.packages}</h2>
                  <p className="text-white/50 text-base max-w-2xl mx-auto">בחר את המסלול המתאים ביותר עבורך</p>
                </motion.div>
                
                {/* Regular packages - في صف واحد */}
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-3 mb-8"
                  >
                    <motion.div 
                      className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Car size={14} className="text-blue-400" />
                      <span className="text-xs font-black tracking-wider text-blue-400">חבילות רכב פרטי</span>
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-black">
                      מוכרים <span className="text-brand-red">רכב פרטי?</span>
                    </h3>
                    <p className="text-white/50 text-sm max-w-lg mx-auto">
                      חבילות פרסום מותאמות אישית למכירת רכב פרטי
                    </p>
                  </motion.div>
                  
                  {/* 3 بطاقات في صف واحد */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {packages.map(pkg => (
                      <div key={pkg.id} className="h-[480px]">
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-3 mb-8"
                  >
                    <motion.div 
                      className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Crown size={14} className="text-amber-400" />
                      <span className="text-xs font-black tracking-wider text-amber-400">חבילות פרימיום VIP</span>
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-black">
                      מחפשים <span className="text-amber-400">יחס VIP?</span>
                    </h3>
                    <p className="text-white/50 text-sm max-w-lg mx-auto">
                      חבילות פרימיום עם חשיפה מקסימלית
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-[500px]">
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
                    <div className="h-[500px]">
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

                {/* Business Package */}
                <div className="h-[450px] max-w-3xl mx-auto">
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
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-3 mb-8"
                  >
                    <motion.div 
                      className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-4 py-2 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Truck size={14} className="text-orange-400" />
                      <span className="text-xs font-black tracking-wider text-orange-400">חבילות ציוד כבד</span>
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-black">
                      מוכרים <span className="text-orange-400">ציוד מקצועי?</span>
                    </h3>
                    <p className="text-white/50 text-sm max-w-lg mx-auto">
                      פרסום לבאגרים, מחפרונים וכל ציוד כבד
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {equipmentPackages.map(pkg => (
                      <div key={pkg.id} className="h-[480px]">
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

              {/* Why Us Section - في صف واحد */}
              <section id="why-us" className="space-y-12">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-3"
                >
                  <motion.div 
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="w-2 h-2 bg-brand-red rounded-full" />
                    <span className="text-sm font-black tracking-wider text-white/80">היתרון שלנו</span>
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-black">{t.whyUs.title}</h2>
                  <p className="text-white/50 text-base max-w-2xl mx-auto">הסיבות שאלפי מוכרים בחרו דווקא בנו</p>
                </motion.div>

                {/* 3 بطاقات في صف واحد */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Users size={32} />,
                      title: 'קהל איכותי',
                      desc: '50,000+ עוקבים פעילים',
                      stat: '50K+',
                      color: 'from-blue-500 to-cyan-500'
                    },
                    {
                      icon: <Zap size={32} />,
                      title: 'מהירות מכירה',
                      desc: 'זמן ממוצע של 48 שעות',
                      stat: '48h',
                      color: 'from-brand-red to-red-600'
                    },
                    {
                      icon: <TrendingUp size={32} />,
                      title: 'אחוזי הצלחה',
                      desc: '98% מהלקוחות מרוצים',
                      stat: '98%',
                      color: 'from-green-500 to-emerald-500'
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 group"
                    >
                      <motion.div 
                        className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 10 }}
                      >
                        {item.icon}
                      </motion.div>
                      <motion.div 
                        className="text-4xl font-black text-white/20 absolute top-4 right-4"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      >
                        {item.stat}
                      </motion.div>
                      <h3 className="text-xl font-black mb-2">{item.title}</h3>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="max-w-4xl mx-auto space-y-10">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-3"
                >
                  <motion.div 
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="w-2 h-2 bg-brand-red rounded-full" />
                    <span className="text-sm font-black tracking-wider text-white/80">שאלות נפוצות</span>
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-black">שאלות נפוצות</h2>
                  <p className="text-white/50 text-base">כל מה שצריך לדעת על תהליך הפרסום והמכירה</p>
                </motion.div>

                <div className="space-y-3">
                  {t.faqs.slice(0, showAllFaqs ? t.faqs.length : 3).map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-xl overflow-hidden border border-white/10 bg-white/5"
                    >
                      <motion.button 
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full px-5 py-4 flex items-center justify-between text-right gap-3 hover:bg-white/10 transition-colors"
                        whileHover={{ x: -5 }}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <motion.div 
                            className="w-8 h-8 rounded-lg bg-brand-red/20 flex items-center justify-center text-brand-red font-black text-sm"
                            animate={activeFaq === i ? { rotate: 90 } : { rotate: 0 }}
                          >
                            {i + 1}
                          </motion.div>
                          <span className="font-bold text-base">{item.q}</span>
                        </div>
                        {activeFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </motion.button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 pr-16 text-white/60 text-sm leading-relaxed">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                
                {!showAllFaqs && t.faqs.length > 3 && (
                  <div className="text-center">
                    <motion.button 
                      onClick={() => setShowAllFaqs(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-white/10 rounded-xl font-black text-sm border border-white/20 hover:bg-white/15 transition-all"
                    >
                      הצג את כל השאלות
                    </motion.button>
                  </div>
                )}
              </section>

              {/* Footer - مع إضافة YouTube و X */}
              <footer className="pb-10">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative rounded-2xl overflow-hidden border border-white/10"
                  style={{ background: 'linear-gradient(145deg, rgba(200,16,46,0.1) 0%, rgba(10,10,14,0.98) 60%, rgba(5,5,8,1) 100%)' }}
                >
                  
                  {/* Top accent line */}
                  <motion.div 
                    className="h-px w-full bg-gradient-to-r from-transparent via-brand-red/60 to-transparent"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <div className="relative z-10 p-10 space-y-10">
                    
                    {/* Logo + tagline */}
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-4">
                        <motion.div 
                          className="p-3 bg-gradient-to-br from-brand-red to-red-700 rounded-xl shadow-xl shadow-brand-red/30"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          <Car size={24} className="text-white" />
                        </motion.div>
                        <div>
                          <motion.div 
                            className="text-3xl font-black tracking-tighter"
                            animate={{ textShadow: ['0 0 0px #c8102e', '0 0 10px #c8102e', '0 0 0px #c8102e'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <span className="text-brand-red">YOUGO</span> <span className="text-white">ISRAEL</span>
                          </motion.div>
                          <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-bold">Digital Car Marketing</div>
                        </div>
                      </div>
                      <p className="text-white/40 text-sm max-w-sm mx-auto leading-relaxed">
                        הפלטפורמה המובילה בישראל לפרסום ומכירת רכבים ברשתות חברתיות
                      </p>
                    </div>

                    {/* Social Icons - مع إضافة YouTube و X */}
                    <div>
                      <p className="text-center text-[10px] text-white/30 font-black uppercase tracking-[0.25em] mb-6">עקבו אחרינו</p>
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        {[
                          {
                            href: 'https://instagram.com/yougo.israel',
                            label: 'Instagram',
                            color: 'from-purple-600 via-pink-500 to-orange-400',
                            border: 'rgba(236,72,153,0.4)',
                            icon: (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2"/>
                                <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
                              </svg>
                            )
                          },
                          {
                            href: 'https://facebook.com',
                            label: 'Facebook',
                            color: 'from-blue-600 to-blue-700',
                            border: 'rgba(59,130,246,0.4)',
                            icon: (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )
                          },
                          {
                            href: 'https://wa.me/972546980606',
                            label: 'WhatsApp',
                            color: 'from-green-500 to-emerald-600',
                            border: 'rgba(34,197,94,0.4)',
                            icon: (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )
                          },
                          {
                            href: 'https://t.me/yougoisrael',
                            label: 'Telegram',
                            color: 'from-sky-500 to-blue-500',
                            border: 'rgba(14,165,233,0.4)',
                            icon: (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )
                          },
                          {
                            href: 'https://tiktok.com/@yougoisrael',
                            label: 'TikTok',
                            color: 'from-gray-800 to-black',
                            border: 'rgba(255,255,255,0.3)',
                            icon: (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.77 1.53V7.02a4.85 4.85 0 01-1.01-.33z"/>
                              </svg>
                            )
                          },
                          // YouTube جديد
                          {
                            href: 'https://youtube.com/@yougoisrael',
                            label: 'YouTube',
                            color: 'from-red-600 to-red-700',
                            border: 'rgba(220,38,38,0.4)',
                            icon: (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2c.31-1.75.46-3.55.46-5.33s-.15-3.58-.46-5.33z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )
                          },
                          // X (Twitter) جديد
                          {
                            href: 'https://x.com/yougoisrael',
                            label: 'X',
                            color: 'from-gray-600 to-gray-800',
                            border: 'rgba(255,255,255,0.3)',
                            icon: (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" stroke="white" strokeWidth="2" fill="white"/>
                              </svg>
                            )
                          },
                          {
                            href: 'mailto:contact@yougoisrael.com',
                            label: 'Email',
                            color: 'from-red-600 to-rose-700',
                            border: 'rgba(220,38,38,0.4)',
                            icon: (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="22,6 12,13 2,6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )
                          },
                        ].map((s, i) => (
                          <motion.a
                            key={i}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -6, scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center gap-2 group"
                          >
                            <motion.div
                              className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br transition-all duration-300 shadow-lg group-hover:shadow-xl"
                              style={{
                                background: `linear-gradient(135deg, ${s.color.includes('from-') ? '' : ''})`,
                                border: `1px solid ${s.border}`,
                                backgroundImage: `linear-gradient(135deg, ${s.color.replace('from-','').replace('via-','').replace('to-','').split(' ').map(c => {
                                  const map: any = {
                                    'purple-600':'#9333ea','pink-500':'#ec4899','orange-400':'#fb923c',
                                    'blue-600':'#2563eb','blue-700':'#1d4ed8','blue-500':'#3b82f6',
                                    'green-500':'#22c55e','emerald-600':'#059669',
                                    'sky-500':'#0ea5e9',
                                    'gray-800':'#1f2937','black':'#000',
                                    'red-600':'#dc2626','rose-700':'#be123c','red-700':'#b91c1c',
                                    'gray-600':'#4b5563'
                                  };
                                  return map[c] || c;
                                }).join(',')})`
                              }}
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 5, repeat: Infinity, delay: i * 0.2 }}
                            >
                              {s.icon}
                            </motion.div>
                            <span className="text-[9px] font-black text-white/40 group-hover:text-white/70 transition-colors">{s.label}</span>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <motion.div 
                      className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ scaleX: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Footer Links */}
                    <div className="flex flex-wrap justify-center gap-3">
                      {[
                        { 
                          icon: <FileText size={14} />, 
                          label: 'תקנון',
                          onClick: () => setModalContent({
                            title: 'תקנון שימוש – YOUGO ISRAEL',
                            content: `1. כללי
YOUGO ISRAEL הינה פלטפורמת שיווק דיגיטלי המתמחה בפרסום רכבים, ציוד כבד ושירותים עסקיים ברשתות חברתיות. השימוש בשירות מהווה הסכמה מלאה לתנאים אלו.

2. השירות
החברה מספקת שירותי פרסום ברשתות חברתיות (Instagram, TikTok ועוד). החברה אינה צד לעסקת המכירה בין הלקוח לקונה הסופי ואינה אחראית לתוצאות מכירה.

3. תשלום
התשלום מבוצע מראש בהעברה בנקאית, Bit או PayBox. לאחר אישור התשלום יחל תהליך הפרסום תוך 24-48 שעות עסקיות. לא יינתן החזר כספי לאחר שהמודעה פורסמה.

4. אחריות הלקוח
הלקוח מצהיר כי כל המידע שמסר הוא נכון ומדויק. הלקוח אחראי לחוקיות הרכב / הציוד המפורסם. פרסום רכב גנוב, שעבודים לא מדווחים או מידע כוזב יגרור הסרת המודעה ללא החזר.

5. קניין רוחני
כל התוכן שיוצר על ידי YOUGO ISRAEL (עיצובים, טקסטים, תמונות ערוכות) שייך לחברה. הלקוח רשאי לעשות שימוש בתוכן לצרכי המכירה בלבד.

6. סיום שירות
החברה שומרת לעצמה את הזכות להפסיק מתן שירות ללקוח שהפר את התנאים, ללא הודעה מוקדמת.

7. שינויים בתנאים
YOUGO ISRAEL רשאית לעדכן תנאים אלו בכל עת. המשך שימוש בשירות מהווה הסכמה לתנאים המעודכנים.

8. יצירת קשר
לכל שאלה בנוגע לתנאי השימוש: wa.me/972546980606`
                          })
                        },
                        { 
                          icon: <Lock size={14} />, 
                          label: 'פרטיות',
                          onClick: () => setModalContent({
                            title: 'מדיניות פרטיות – YOUGO ISRAEL',
                            content: `1. איסוף מידע
YOUGO ISRAEL אוספת מידע אישי הכולל: שם, טלפון, מיקום ופרטי הרכב / הציוד, אך ורק לצורך מתן השירות המבוקש.

2. שימוש במידע
המידע משמש אך ורק לצורך: יצירת המודעה הפרסומית, תיאום ביצוע השירות, ושליחת עדכונים הקשורים להזמנה.

3. אחסון מידע
המידע מאוחסן בצורה מאובטחת ואינו מועבר לצדדים שלישיים ללא הסכמת הלקוח, למעט גורמים הנדרשים לביצוע השירות (כגון: צלמים, מעצבים).

4. אבטחת מידע
החברה נוקטת בצעדי אבטחה מתקדמים להגנה על המידע. עם זאת, אין ביכולתנו להבטיח אבטחה מוחלטת בסביבה דיגיטלית.

5. זכויות המשתמש
לכל לקוח זכות לעיין במידע השמור עליו, לבקש תיקונו או מחיקתו. לפניות בנושא: wa.me/972546980606

6. עוגיות (Cookies)
האתר עשוי לעשות שימוש בעוגיות לשיפור חוויית המשתמש וניתוח תנועה. ניתן לבטל עוגיות דרך הגדרות הדפדפן.

7. שינויים במדיניות
YOUGO ISRAEL רשאית לעדכן מדיניות זו בכל עת. עדכונים יפורסמו בערוצי החברה.`
                          })
                        },
                        { 
                          icon: <Info size={14} />, 
                          label: 'מי אנחנו',
                          onClick: () => setModalContent({
                            title: 'אודות YOUGO ISRAEL',
                            content: `YOUGO ISRAEL – פלטפורמת השיווק הדיגיטלי המובילה בישראל למכירת רכבים.

הסיפור שלנו
YOUGO ISRAEL נוסדה מתוך חזון אחד פשוט: לשנות את הדרך שבה ישראלים מוכרים רכבים. במקום מודעות יבשות בפורומים ישנים, אנחנו יוצרים תוכן ויזואלי מרהיב שמוכר.

מה שמבדיל אותנו
• 50,000+ עוקבים פעילים ומעורבים
• צוות מקצועי של צלמים, מעצבים ואנשי שיווק
• ניסיון של שנים בשוק הרכב הישראלי
• 98% שביעות רצון לקוחות
• פרסום תוך 24 שעות מקבלת ההזמנה

השירותים שלנו
אנחנו מספקים פתרונות פרסום מקיפים: רכבים פרטיים, ציוד כבד ומכונות, חבילות עסקיות לסוכנויות, ופתרונות VIP מותאמים אישית.

הנוכחות הדיגיטלית שלנו
YOUGO ISRAEL פעילה ב-Instagram, TikTok, Telegram, YouTube, X ו-WhatsApp – בכל מקום שבו נמצאים הקונים הפוטנציאליים שלך.

הערך שאנחנו מביאים
כל מודעה שאנחנו יוצרים נבנית עם הבנה עמוקה של שוק הרכב, פסיכולוגיית הקונה, ואסתטיקה דיגיטלית מודרנית. התוצאה: מכירות מהירות יותר, במחיר טוב יותר.

צור קשר
WhatsApp: wa.me/972546980606
Instagram: @yougo.israel
YouTube: @yougoisrael
X: @yougoisrael`
                          })
                        },
                        {
                          icon: <Users size={14} />,
                          label: 'שיווק שותפים',
                          onClick: () => setModalContent({
                            title: 'תוכנית שיווק שותפים – YOUGO ISRAEL',
                            content: `ברוכים הבאים לתוכנית השותפים של YOUGO ISRAEL!

מה זה שיווק שותפים?
תוכנית השותפים של YOUGO ISRAEL מאפשרת לכל אחד להרוויח כסף על ידי הפצת השירות שלנו. כל לקוח שמגיע דרכך ומבצע הזמנה – אתה מקבל עמלה!

כמה מרוויחים?
• 10% עמלה על כל מכירה שהפנית
• אין הגבלה על כמות ההפניות
• תשלום מיידי בסיום כל הזמנה
• דוחות מעקב בזמן אמת

איך מצטרפים?
1. שלח לנו הודעה בוואטסאפ: wa.me/972546980606
2. קבל קוד שותף אישי ייחודי
3. שתף את הקוד עם חברים, משפחה ורשת הקשרים שלך
4. עקוב אחרי ההרוויחות שלך בלוח הבקרה האישי

מי מתאים לתוכנית?
• בעלי עמודי רשתות חברתיות
• מתווכי רכב ואנשי מכירות
• מוסכניקים ואנשי תחום הרכב
• כל אחד עם רשת קשרים

תנאי התוכנית
העמלות משולמות בתחילת כל חודש בגין מכירות החודש הקודם. נדרש מינימום ₪200 לביצוע תשלום. YOUGO ISRAEL שומרת לעצמה את הזכות לשנות את תנאי התוכנית בהודעה מוקדמת של 30 יום.

הצטרף עכשיו
WhatsApp: wa.me/972546980606
נשמח לענות על כל שאלה!`
                          })
                        },
                        {
                          icon: <TrendingUp size={14} />,
                          label: 'איך הצלחנו',
                          onClick: () => setModalContent({
                            title: 'הסיפור מאחורי ההצלחה – YOUGO ISRAEL',
                            content: `מהיכן התחלנו?

YOUGO ISRAEL לא התחילה כחברה גדולה. התחלנו עם חשבון אינסטגרם אחד, מצלמה אחת ורצון אמיתי לשנות את השוק.

הזיהוי: שוק שבור
לפני YOUGO ISRAEL, מוכרי רכבים נאלצו להסתמך על מודעות טקסט יבשות ותמונות איכות נמוכה. שוק הרכב הישראלי צמא לפתרון חדש.

השלב הראשון: 0 ל-10,000 עוקבים
השקענו 100% בתוכן. כל רכב שפרסמנו קיבל צילומים מקצועיים, עריכה קפדנית וטקסט שיווקי חד. התגובות לא איחרו לבוא.

שנה ראשונה: 200+ מכירות מוצלחות
הלקוחות התחילו לדבר. הוואטסאפ שלנו הפך לפעיל 24/7. כל רכב שפרסמנו נמכר בממוצע תוך 3.5 ימים.

המספרים שמדברים
• 50,000+ עוקבים פעילים
• 2,000+ רכבים פורסמו
• 98% שביעות רצון לקוחות
• ממוצע 48 שעות למכירה

המפנה: חבילות עסקיות
כשסוכנויות גדולות פנו אלינו, הבנו שיש כאן פוטנציאל עסקי ענק. הקמנו מחלקה ייעודית לעסקים שמנהלת היום 50+ חשבונות סוכנויות.

הצוות שמאחורינו
צלמים מקצועיים, מעצבים גרפיים, אנשי שיווק דיגיטלי ומומחי רשתות חברתיות – כולם עובדים יחד כדי שהרכב שלך יימכר.

החזון לעתיד
אנחנו רק בהתחלה. המטרה? להפוך ל-Marketplace מספר 1 לרכבים בישראל, עם פרסום חי, מכירות מהירות ושירות שלא מתפשר.

תודה שאתם חלק מהמסע.
– צוות YOUGO ISRAEL`
                          })
                        },
                        { icon: <LayoutDashboard size={14} />, label: 'ניהול', onClick: () => setView('admin-login') },
                      ].map((link, i) => (
                        <motion.button 
                          key={i} 
                          whileHover={{ y: -4, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={link.onClick}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-white/10 bg-white/5 hover:bg-brand-red/20 hover:border-brand-red/40 text-white/50 hover:text-white/90 transition-all"
                        >
                          <span className="text-white/40 group-hover:text-brand-red">{link.icon}</span>
                          {link.label}
                        </motion.button>
                      ))}
                    </div>

                    {/* Bottom copyright */}
                    <div className="text-center space-y-2 pt-4 border-t border-white/10">
                      <div className="text-white/20 text-[10px] font-bold tracking-wider">
                        © {new Date().getFullYear()} YOUGO ISRAEL LTD · כל הזכויות שמורות
                      </div>
                      <div className="text-white/10 text-[9px]">
                        Registered in Israel · IL-BN 515123456 · VAT 123456789
                      </div>
                    </div>
                  </div>
                </motion.div>
              </footer>
            </motion.div>
          )}

          {/* Booking - Two Steps */}
          {view === 'booking' && (
            <motion.div 
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="flex items-center gap-3">
                <motion.button 
                  whileHover={{ x: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setView('home')}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-black border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red transition-all text-brand-red hover:text-white"
                >
                  <ArrowLeft size={16} />
                  <span>חזרה לחבילות</span>
                </motion.button>
                <div className="h-5 w-px bg-white/20" />
                <span className="text-xs text-white/40 font-bold">
                  {selectedPackage?.name || 'הזמנה חדשה'}
                </span>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div 
                  className={`flex items-center gap-2 ${bookingStep >= 1 ? 'text-brand-red' : 'text-white/30'}`}
                  animate={bookingStep >= 1 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${
                    bookingStep >= 1 ? 'border-brand-red bg-brand-red/20' : 'border-white/20'
                  }`}>
                    1
                  </div>
                  <span className="text-sm font-black">פרטי רכב</span>
                </motion.div>
                <motion.div 
                  className={`w-16 h-px ${bookingStep >= 2 ? 'bg-brand-red' : 'bg-white/20'}`}
                  animate={bookingStep >= 2 ? { scaleX: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className={`flex items-center gap-2 ${bookingStep >= 2 ? 'text-brand-red' : 'text-white/30'}`}
                  animate={bookingStep >= 2 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${
                    bookingStep >= 2 ? 'border-brand-red bg-brand-red/20' : 'border-white/20'
                  }`}>
                    2
                  </div>
                  <span className="text-sm font-black">תשלום</span>
                </motion.div>
              </div>

              <div className="glass-card p-6">
                <AnimatePresence mode="wait">
                  {bookingStep === 1 && (
                    <CarDetailsForm
                      formData={formData}
                      setFormData={setFormData}
                      onNext={() => setBookingStep(2)}
                      selectedPackage={selectedPackage}
                      onChangePackage={() => setShowChangePackage(true)}
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
                      onChangePackage={() => setShowChangePackage(true)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Success Page */}
          {view === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="max-w-md mx-auto text-center space-y-6 py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30"
              >
                <Check size={40} strokeWidth={3} className="text-white" />
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-black">ההזמנה התקבלה!</h2>
                <p className="text-white/60 text-base">
                  מספר הזמנה: <span className="text-brand-red font-black">#{orderId}</span>
                </p>
              </div>

              <div className="glass-card p-6 space-y-4">
                <p className="text-lg font-black">מה קורה עכשיו?</p>
                <div className="space-y-3 text-right">
                  {[
                    'הודעת וואטסאפ נשלחה למנהל המערכת',
                    'הצוות שלנו יבדוק את פרטי ההזמנה תוך שעה',
                    'נחזור אליך עם אישור סופי'
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check size={12} className="text-green-400" />
                      </div>
                      <span className="text-white/80">{text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-brand-red text-sm font-black">
                    ניתן לבדוק את מצב ההזמנה דרך מספר ההזמנה באתר!
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setView('home')}
                  className="flex-1 py-3 rounded-xl font-black text-sm border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red transition-all flex items-center justify-center gap-2 text-brand-red hover:text-white"
                >
                  <ArrowLeft size={14} />
                  חזרה לדף הבית
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setView('check-status')}
                  className="flex-1 py-3 rounded-xl font-black text-sm shadow-lg flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)', boxShadow: '0 8px 25px -8px rgba(200,16,46,0.5)' }}
                >
                  <Search size={14} />
                  בדוק סטטוס
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Check Status Page */}
          {view === 'check-status' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto py-8"
            >
              <OrderStatusCheck onClose={() => setView('home')} />
            </motion.div>
          )}

          {/* Admin Login */}
          {view === 'admin-login' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-sm mx-auto py-12"
            >
              <div className="glass-card p-6 space-y-5">
                <div className="text-center">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Lock size={24} className="text-white" />
                  </motion.div>
                  <h2 className="text-xl font-black">כניסת מנהל</h2>
                </div>
                
                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input 
                    type="password" 
                    placeholder="סיסמה" 
                    required
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                  />
                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2.5 bg-gradient-to-r from-brand-red to-red-600 rounded-lg font-black text-sm"
                  >
                    כניסה
                  </motion.button>
                </form>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setView('home')} 
                  className="w-full py-2 rounded-xl text-xs font-bold border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red text-brand-red hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={12} />
                  ביטול
                </motion.button>
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
                    <motion.button 
                      onClick={() => setAdminTab('orders')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-full font-black text-sm transition-all ${adminTab === 'orders' ? 'bg-brand-red text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      הזמנות
                    </motion.button>
                    <motion.button 
                      onClick={() => setAdminTab('settings')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-full font-black text-sm transition-all ${adminTab === 'settings' ? 'bg-brand-red text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                    >
                      הגדרות אתר
                    </motion.button>
                  </div>
                </div>
                {adminTab === 'orders' && (
                  <div className="flex items-center gap-4">
                    <div className="glass-card px-6 py-3 flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-bold">{orders.length} הזמנות סה"כ</span>
                    </div>
                    <motion.button 
                      onClick={fetchOrders} 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary py-3 px-6 flex items-center gap-2"
                    >
                      <ArrowLeft size={20} className="rotate-90" />
                      רענן נתונים
                    </motion.button>
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
                        whileHover={{ y: -5, scale: 1.02 }}
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
                                  <motion.button 
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                      alert(`פרטי הזמנה ${order.id}:\nמחיר: ${order.car_price}\nמיקום: ${order.location}\nתאריך: ${new Date(order.created_at).toLocaleDateString('he-IL')}`);
                                    }}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                                    title="צפה בפרטים"
                                  >
                                    <Eye size={18} />
                                  </motion.button>
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
                    <motion.button 
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary w-full py-4"
                      disabled={loading}
                    >
                      {loading ? 'שומר...' : 'שמור הגדרות'}
                    </motion.button>
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

      {/* Change Package Modal */}
      <ChangePackageModal
        isOpen={showChangePackage}
        onClose={() => setShowChangePackage(false)}
        currentPackageId={selectedPackage?.id || ''}
        packages={packages}
        vipPackage={vipPackage}
        duoPackage={duoPackage}
        equipmentPackages={equipmentPackages}
        businessPackage={businessPackage}
        onSelect={(p) => {
          setSelectedPackage(p);
          setFormData({
            fullName: formData.fullName,
            phone: formData.phone,
            model: '',
            year: '',
            mileage: '',
            price: '',
            registration: '',
            testUntil: '',
            location: formData.location,
            paymentProof: '',
            carImages: [],
            model2: '',
            year2: '',
            mileage2: '',
            price2: '',
            registration2: '',
            testUntil2: '',
            agencyName: '',
            monthlyCars: '',
            agencyDetails: ''
          });
        }}
        lang={lang}
      />
    </div>
  );
}
