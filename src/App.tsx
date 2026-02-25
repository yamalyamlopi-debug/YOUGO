import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Instagram, 
  Users, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
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
  Bus
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

// --- Constants ---
const COLORS = {
  brand: '#c8102e',
  brandLight: 'rgba(200,16,46,0.1)',
  brandBorder: 'rgba(200,16,46,0.25)',
  vip: { primary: '#d4af37', border: 'rgba(212,175,55,0.45)', light: 'rgba(212,175,55,0.1)' },
  duo: { primary: '#8b5cf6', border: 'rgba(139,92,246,0.45)', light: 'rgba(139,92,246,0.1)' },
  business: { primary: '#3b82f6', border: 'rgba(59,130,246,0.4)', light: 'rgba(59,130,246,0.1)' },
  transport: { primary: '#0ea5e9', border: 'rgba(14,165,233,0.4)', light: 'rgba(14,165,233,0.1)' },
  equipmentHeavy: { primary: '#ea580c', border: 'rgba(234,88,12,0.4)', light: 'rgba(234,88,12,0.1)' },
  equipmentLight: { primary: '#94a3b8', border: 'rgba(148,163,184,0.35)', light: 'rgba(148,163,184,0.1)' },
  basic: { primary: '#94a3b8', border: 'rgba(148,163,184,0.45)' },
  pro: { primary: '#c8102e', border: 'rgba(200,16,46,0.55)' },
  premium: { primary: '#c8102e', border: 'rgba(200,16,46,0.65)' }
};

const CARD_HEIGHTS = {
  basic: '520px',
  pro: '520px',
  premium: '520px',
  vip: '460px',
  duo: '460px',
  business: '380px',
  'equipment-heavy': '440px',
  'equipment-light': '440px',
  transport: '440px'
};

// --- Helper Functions ---
const getPackageEmoji = (pkgId: string): string => {
  const map: Record<string, string> = {
    vip: '\ud83d\udc51', premium: '\ud83d\udc8e', pro: '\u2b50', 'equipment-heavy': '\ud83d\ude9c',
    'equipment-light': '\ud83d\udd27', business: '\ud83c\udfe2', duo: '\ud83d\ude97\ud83d\ude97', transport: '\ud83d\ude8c', basic: '\ud83d\ude80'
  };
  return map[pkgId] || '\u2705';
};

const getPackageColor = (pkgId: string): string => {
  const map: Record<string, string> = {
    vip: COLORS.vip.primary, duo: COLORS.duo.primary, business: COLORS.business.primary,
    transport: COLORS.transport.primary, 'equipment-heavy': COLORS.equipmentHeavy.primary,
    'equipment-light': COLORS.equipmentLight.primary, premium: COLORS.premium.primary,
    pro: COLORS.pro.primary, basic: COLORS.basic.primary
  };
  return map[pkgId] || COLORS.brand;
};

const getPackageBorder = (pkgId: string): string => {
  const map: Record<string, string> = {
    vip: COLORS.vip.border, duo: COLORS.duo.border, business: COLORS.business.border,
    transport: COLORS.transport.border, 'equipment-heavy': COLORS.equipmentHeavy.border,
    'equipment-light': COLORS.equipmentLight.border, premium: COLORS.premium.border,
    pro: COLORS.pro.border, basic: COLORS.basic.border
  };
  return map[pkgId] || COLORS.brandBorder;
};

const getCardHeight = (pkgId: string): string => {
  return CARD_HEIGHTS[pkgId as keyof typeof CARD_HEIGHTS] || '500px';
};

// --- Navbar (unchanged) ---
const Navbar = ({ lang, setLang, isAdmin, onLogout, siteSettings, setView }: {
  lang: Language, setLang: (l: Language) => void, isAdmin?: boolean,
  onLogout?: () => void, siteSettings: any, setView: (v: string) => void
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
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.25 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-dark-bg/95 backdrop-blur-xl border-b border-white/10 py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div className="flex items-center gap-3 cursor-pointer" whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {['how-it-works', 'packages', 'faq'].map((item, i) => (
              <motion.a key={item} href={`#${item}`}
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -2 }}
                className="text-sm font-bold text-white/70 hover:text-brand-red transition-colors relative group">
                {item === 'how-it-works' ? '\u05d0\u05d9\u05da \u05d6\u05d4 \u05e2\u05d5\u05d1\u05d3' : item === 'packages' ? '\u05d7\u05d1\u05d9\u05dc\u05d5\u05ea' : '\u05e9\u05d0\u05dc\u05d5\u05ea'}
                <motion.span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red rounded-full"
                  initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.2 }} />
              </motion.a>
            ))}
            <motion.button onClick={() => setView('check-status')}
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
              className="text-sm font-bold text-white/70 hover:text-brand-red transition-colors">
              \u05d1\u05d3\u05d9\u05e7\u05ea \u05e1\u05d8\u05d8\u05d5\u05e1
            </motion.button>
            <motion.button onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-sm font-bold transition-all">
              <Globe size={16} className="animate-pulse" />
              {lang === 'he' ? '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' : '\u05e2\u05d1\u05e8\u05d9\u05ea'}
            </motion.button>
            {isAdmin && (
              <motion.button onClick={onLogout}
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }} whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-sm font-bold text-white/40 hover:text-white transition-colors">
                <LogOut size={18} />
              </motion.button>
            )}
          </div>

          <motion.button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10">
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={24} /></motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={24} /></motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
              className="md:hidden py-4 space-y-2 border-t border-white/5 mt-4">
              {[{ href: '#how-it-works', label: '\u05d0\u05d9\u05da \u05d6\u05d4 \u05e2\u05d5\u05d1\u05d3' }, { href: '#packages', label: '\u05d7\u05d1\u05d9\u05dc\u05d5\u05ea' }, { href: '#faq', label: '\u05e9\u05d0\u05dc\u05d5\u05ea' }]
                .map((item, i) => (
                  <motion.a key={item.href} href={item.href}
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }} onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 text-white/70 hover:bg-white/5 rounded-lg transition-colors">
                    {item.label}
                  </motion.a>
                ))}
              <motion.button onClick={() => { setView('check-status'); setMobileMenuOpen(false); }}
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}
                className="block w-full text-right py-3 px-4 text-white/70 hover:bg-white/5 rounded-lg transition-colors">
                \u05d1\u05d3\u05d9\u05e7\u05ea \u05e1\u05d8\u05d8\u05d5\u05e1
              </motion.button>
              <motion.button onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 rounded-lg border border-white/10">
                <Globe size={16} />{lang === 'he' ? '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' : '\u05e2\u05d1\u05e8\u05d9\u05ea'}
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

const Modal = ({ isOpen, onClose, title, children }: {
  isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 space-y-6"
          style={{ background: 'linear-gradient(145deg, #0f0f14 0%, #0a0a0e 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)' }}>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <motion.h3 initial={{ x: -20 }} animate={{ x: 0 }} className="text-xl font-black text-brand-red">{title}</motion.h3>
            <motion.button whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <X size={20} className="text-white/60" />
            </motion.button>
          </div>
          <div className="text-white/75 leading-relaxed space-y-3 text-sm">
            {typeof children === 'string'
              ? children.split('\n').map((line, i) => {
                  if (!line.trim()) return <div key={i} className="h-1" />;
                  if (/^\d+\./.test(line)) return (
                    <motion.h4 key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }} className="text-white font-black text-base mt-4 mb-1 first:mt-0">{line}</motion.h4>
                  );
                  return (
                    <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.01 }} className="text-white/70 leading-relaxed">{line}</motion.p>
                  );
                })
              : children}
          </div>
          <div className="pt-4 flex justify-end border-t border-white/8">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #c8102e, #a50d25)' }}>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2"><X size={14} />\u05e1\u05d2\u05d5\u05e8</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const FeatureBox = ({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) => (
  <div className="feature-box" style={{ '--feature-color': color } as React.CSSProperties}>
    <span className="feature-box-icon">{icon}</span>
    <span className="feature-box-text">{text}</span>
  </div>
);

// ============================================================
// FIX 1: FLIP CARD BACK \u2014 \u0632\u0631 \u05d7\u05d6\u05e8\u05d4 \u064a\u0639\u0645\u0644 \u0627\u0644\u0622\u0646 \u0628\u0634\u0643\u0644 \u0635\u062d\u064a\u062d
// \u062a\u0645 \u0625\u0636\u0627\u0641\u0629 e.stopPropagation() \u0644\u0645\u0646\u0639 \u062a\u0646\u0634\u064a\u0637 \u0627\u0644\u0640 flip \u0639\u0646\u062f \u0627\u0644\u0636\u063a\u0637
// ============================================================
const FlipCardBack = ({
  pkg, details, color, borderColor, badge, onSelect, onBack
}: {
  pkg: Package; details: { title: string; content: string };
  color: string; borderColor: string; badge: string;
  onSelect: (p: Package) => void; onBack: () => void;
}) => {
  const items: string[] = [];
  details.content.split('\n').forEach(raw => {
    const cl = raw.replace(/\*\*/g, '').trim();
    if (!cl || cl.length < 3) return;
    if (/^[\u2728\ud83d\udd25\ud83d\udc51\ud83d\udc8e\ud83d\ude97\ud83c\udfe2\ud83d\ude9c\ud83d\udd27\ud83d\ude8c\ud83d\udce6\u2b50\ud83c\udfaf\ud83d\udcbc\ud83d\udcca\ud83d\udd0d\u2699\ufe0f\ud83c\udfd7\ufe0f\u23f1\ufe0f]/.test(cl)) return;
    if (cl.includes('\u2501') || cl.includes('\u250c') || cl.includes('\u2500')) return;
    const s = cl.replace(/^[\u2022\u2713\u2705\ud83d\udcf8\ud83d\udcdd\ud83d\udcf1\ud83c\udfaf\u26a1\ud83c\udff7\ufe0f\ud83c\udfa5\ud83d\udcb0\ud83d\udcde\ud83d\udee0\ufe0f\ud83d\udccb\ud83d\udcab\ud83c\udf1f\ud83d\udc68\-\s]+/, '').trim();
    if (s.length > 2) items.push(s);
  });
  const shown = items.slice(0, 7);
  const priceNum = parseInt(pkg.price.replace(/[\u20aa,]/g, '')) || 0;
  const original = priceNum ? `\u20aa${Math.round(priceNum / 0.85).toLocaleString()}` : '';

  return (
    <div className="flip-card-back" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${color}18 0%, #0c0c14 40%, #080810 100%)` }} />
      <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      <div className="relative shrink-0 flex items-center justify-between gap-2 px-4 pt-3 pb-2.5"
        style={{ borderBottom: `1px solid ${color}20`, background: `${color}0a` }}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0">{badge}</span>
          <div className="min-w-0">
            <p className="text-[12px] font-black text-white truncate leading-tight">{pkg.name}</p>
            <p className="text-[9px] font-semibold mt-[1px]" style={{ color: `${color}aa` }}>\u05de\u05d4 \u05db\u05dc\u05d5\u05dc \u05d1\u05d7\u05d1\u05d9\u05dc\u05d4</p>
          </div>
        </div>
        {/* \u2705 FIX: e.stopPropagation() \u064a\u0645\u0646\u0639 \u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u0640 flip \u0639\u0646\u062f \u0627\u0644\u0636\u063a\u0637 \u0639\u0644\u0649 \u05d7\u05d6\u05e8\u05d4 */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onBack(); }}
          className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-black"
          style={{ border: `1px solid ${color}30`, color, background: `${color}10`, position: 'relative', zIndex: 10 }}>
          <ArrowLeft size={9} strokeWidth={3} /> \u05d7\u05d6\u05e8\u05d4
        </button>
      </div>

      <div className="relative flex-1 overflow-y-auto px-3 py-2" style={{ minHeight: 0 }}>
        <div className="flex flex-col gap-[3px]">
          {shown.map((item, i) => (
            <div key={i} className="flex items-start gap-2 px-2.5 py-[6px] rounded-xl"
              style={{ background: i % 2 === 0 ? `${color}08` : 'transparent' }}>
              <div className="shrink-0 mt-[3px] w-3 h-3 rounded-full flex items-center justify-center"
                style={{ background: `${color}20`, border: `1.5px solid ${color}40` }}>
                <Check size={6} strokeWidth={3.5} style={{ color }} />
              </div>
              <span className="text-[11px] leading-snug font-medium" style={{ color: 'rgba(255,255,255,0.86)' }}>{item}</span>
            </div>
          ))}
          {items.length > 7 && (
            <p className="text-center text-[9px] font-bold py-1" style={{ color: `${color}70` }}>
              + {items.length - 7} \u05e4\u05e8\u05d8\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd
            </p>
          )}
        </div>
      </div>

      <div className="relative shrink-0 px-4 pt-2.5 pb-3.5" style={{ borderTop: `1px solid ${color}20` }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[21px] font-black text-white leading-none">{pkg.price}</span>
            {original && <span className="text-[9px] line-through" style={{ color: 'rgba(255,255,255,0.2)' }}>{original}</span>}
          </div>
          <span className="text-[9px] font-black px-2 py-[3px] rounded-full"
            style={{ color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
            \u05d7\u05d9\u05e1\u05db\u05d5\u05df 15%
          </span>
        </div>
        {/* \u2705 FIX: e.stopPropagation() \u0639\u0644\u0649 \u0632\u0631 \u05d4\u05d6\u05de\u05df \u05e2\u05db\u05e9\u05d9\u05d5 \u0623\u064a\u0636\u0627\u064b */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onSelect(pkg); }}
          className="w-full py-[9px] rounded-[10px] font-black text-[13px] text-white flex items-center justify-center gap-2"
          style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`, boxShadow: `0 4px 16px ${color}35` }}>
          <RocketIcon size={13} /> \u05d4\u05d6\u05de\u05df \u05e2\u05db\u05e9\u05d9\u05d5
        </button>
      </div>
    </div>
  );
};

// ============================================================
// PACKAGE DETAILS DATA (unchanged)
// ============================================================
const packageDetails: Record<string, { title: string; content: string }> = {
  basic: {
    title: '\u05d7\u05d1\u05d9\u05dc\u05ea BASIC',
    content: `\u2728 \u05de\u05d4 \u05db\u05d5\u05dc\u05dc\u05ea \u05d4\u05d7\u05d1\u05d9\u05dc\u05d4?\n\u2022 2 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea \u05e2\u05dd \u05e2\u05e8\u05d9\u05db\u05d4 \u05d0\u05d9\u05db\u05d5\u05ea\u05d9\u05ea\n\u2022 \u05e4\u05d5\u05e1\u05d8 \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9 \u05de\u05de\u05d5\u05e7\u05d3 \u05e2\u05dd \u05ea\u05d9\u05d0\u05d5\u05e8 \u05de\u05e4\u05d5\u05e8\u05d8\n\u2022 \u05e1\u05d8\u05d5\u05e8\u05d9 \u05dc\u05d0\u05d5\u05e8\u05da 7 \u05d9\u05de\u05d9\u05dd \u05e8\u05e6\u05d5\u05e4\u05d9\u05dd\n\u2022 \u05d7\u05e9\u05d9\u05e4\u05d4 \u05dc\u05e7\u05d4\u05dc \u05e7\u05d5\u05e0\u05d9\u05dd \u05e4\u05d5\u05d8\u05e0\u05e6\u05d9\u05d0\u05dc\u05d9 \u05e4\u05e2\u05d9\u05dc\n\n\ud83c\udf1f \u05dc\u05de\u05d9 \u05d6\u05d4 \u05de\u05ea\u05d0\u05d9\u05dd?\n\u2022 \u05de\u05d5\u05db\u05e8\u05d9\u05dd \u05e4\u05e8\u05d8\u05d9\u05d9\u05dd \u05e2\u05dd \u05ea\u05e7\u05e6\u05d9\u05d1 \u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\n\u2022 \u05e8\u05db\u05d1\u05d9\u05dd \u05d1\u05de\u05d7\u05d9\u05e8 \u05e2\u05d3 50,000 \u20aa\n\u2022 \u05de\u05d9 \u05e9\u05e8\u05d5\u05e6\u05d4 \u05dc\u05d1\u05d3\u05d5\u05e7 \u05d0\u05ea \u05d4\u05e9\u05d5\u05e7 \u05d1\u05de\u05d4\u05d9\u05e8\u05d5\u05ea\n\n\u23f1\ufe0f \u05e4\u05e8\u05d8\u05d9\u05dd \u05d8\u05db\u05e0\u05d9\u05d9\u05dd\n\u2022 \u05de\u05e9\u05da \u05e4\u05e8\u05e1\u05d5\u05dd: 7 \u05d9\u05de\u05d9\u05dd\n\u2022 3 \u05d9\u05de\u05d9 \u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05d5\u05d1\u05d8\u05d7\u05ea\n\u2022 \u05de\u05d7\u05d9\u05e8: 149 \u20aa (\u05d1\u05de\u05e7\u05d5\u05dd 175 \u20aa)\n\u2022 \u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05e9\u05dc 26 \u20aa \u2013 15% \u05d4\u05e0\u05d7\u05d4`
  },
  pro: {
    title: '\u05d7\u05d1\u05d9\u05dc\u05ea PRO',
    content: `\ud83d\udd25 \u05de\u05d4 \u05db\u05d5\u05dc\u05dc\u05ea \u05d4\u05d7\u05d1\u05d9\u05dc\u05d4?\n\u2022 4 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea \u05e2\u05dd \u05e2\u05e8\u05d9\u05db\u05d4 \u05de\u05ea\u05e7\u05d3\u05de\u05ea\n\u2022 \u05e4\u05d5\u05e1\u05d8 \u05e8\u05d0\u05e9\u05d9 + \u05e4\u05d5\u05e1\u05d8 \u05e9\u05de\u05d5\u05e8 \u05de\u05ea\u05d5\u05d6\u05de\u05df \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05ea\n\u2022 \u05e1\u05d8\u05d5\u05e8\u05d9 14 \u05d9\u05de\u05d9\u05dd \u05dc\u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05ea\u05de\u05d3\u05ea\n\u2022 \u05e2\u05d3\u05d9\u05e4\u05d5\u05ea \u05d1\u05ea\u05d5\u05e8 \u05d4\u05e4\u05e8\u05e1\u05d5\u05de\u05d9\u05dd\n\u2022 \u05d8\u05e8\u05d2\u05d5\u05d8 \u05de\u05ea\u05e7\u05d3\u05dd \u05dc\u05e7\u05d4\u05dc\u05d9\u05dd \u05e8\u05dc\u05d5\u05d5\u05e0\u05d8\u05d9\u05d9\u05dd\n\n\ud83d\udc8e \u05dc\u05de\u05d4 \u05d1\u05d5\u05d7\u05e8\u05d9\u05dd \u05d1\u05d4?\n\u2022 \u05d9\u05d7\u05e1 \u05e2\u05dc\u05d5\u05ea-\u05ea\u05d5\u05e2\u05dc\u05ea \u05d4\u05db\u05d9 \u05d2\u05d1\u05d5\u05d4 \u05d1\u05e9\u05d5\u05e7\n\u2022 \u05de\u05e2\u05dc 1,000 \u05de\u05db\u05d9\u05e8\u05d5\u05ea \u05de\u05d5\u05db\u05d7\u05d5\u05ea \u05d3\u05e8\u05da \u05d4\u05d7\u05d1\u05d9\u05dc\u05d4\n\u2022 \u05d6\u05de\u05df \u05e4\u05e8\u05e1\u05d5\u05dd \u05d0\u05d5\u05e4\u05d8\u05d9\u05de\u05dc\u05d9 \u05dc\u05e8\u05d5\u05d1 \u05e1\u05d5\u05d2\u05d9 \u05d4\u05e8\u05db\u05d1\u05d9\u05dd\n\u2022 \u05d0\u05d7\u05d3 \u05d4\u05e4\u05ea\u05e8\u05d5\u05e0\u05d5\u05ea \u05d4\u05e0\u05e4\u05d5\u05e6\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05e9\u05dc\u05e0\u05d5\n\n\u23f1\ufe0f \u05e4\u05e8\u05d8\u05d9\u05dd \u05d8\u05db\u05e0\u05d9\u05d9\u05dd\n\u2022 \u05de\u05e9\u05da \u05e4\u05e8\u05e1\u05d5\u05dd: 14 \u05d9\u05de\u05d9\u05dd\n\u2022 7 \u05d9\u05de\u05d9 \u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05d5\u05d1\u05d8\u05d7\u05ea\n\u2022 \u05de\u05d7\u05d9\u05e8: 249 \u20aa (\u05d1\u05de\u05e7\u05d5\u05dd 293 \u20aa)\n\u2022 \u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05e9\u05dc 44 \u20aa \u2013 15% \u05d4\u05e0\u05d7\u05d4`
  },
  premium: {
    title: '\u05d7\u05d1\u05d9\u05dc\u05ea PREMIUM',
    content: `\ud83d\udc51 \u05de\u05d4 \u05db\u05d5\u05dc\u05dc\u05ea \u05d4\u05d7\u05d1\u05d9\u05dc\u05d4?\n\u2022 8+ \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea \u05e2\u05dd \u05e2\u05e8\u05d9\u05db\u05d4 \u05de\u05e8\u05d4\u05d9\u05d1\u05d4\n\u2022 \u05e8\u05d9\u05dc\u05e1 \u05d5\u05d9\u05d3\u05d0\u05d5 + \u05e1\u05e8\u05d8\u05d5\u05df \u05e4\u05e8\u05e1\u05d5\u05de\u05d9 \u05de\u05dc\u05d0\n\u2022 \u05e4\u05d5\u05e1\u05d8 \u05de\u05d5\u05ea\u05d0\u05dd \u05d0\u05d9\u05e9\u05d9\u05ea \u05e2\u05dd \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d9\u05ea \u05ea\u05d5\u05db\u05df\n\u2022 \u05e1\u05d8\u05d5\u05e8\u05d9 30 \u05d9\u05de\u05d9\u05dd \u05dc\u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05ea\n\u2022 \u05e2\u05d3\u05d9\u05e4\u05d5\u05ea \u05de\u05dc\u05d0\u05d4 \u2013 \u05ea\u05de\u05d9\u05d3 \u05e8\u05d0\u05e9\u05d5\u05df \u05d1\u05ea\u05d5\u05e8\n\u2022 \u05de\u05e2\u05e6\u05d1 + \u05e7\u05d5\u05e4\u05d9\u05e8\u05d9\u05d9\u05d8\u05e8 \u05d0\u05d9\u05e9\u05d9 \u05dc\u05db\u05dc \u05de\u05d5\u05d3\u05e2\u05d4\n\u2022 \u05e2\u05d9\u05e6\u05d5\u05d1 VIP \u05e2\u05dd \u05de\u05d9\u05ea\u05d5\u05d2 \u05d9\u05d9\u05d7\u05d5\u05d3\u05d9\n\n\ud83d\udcab \u05de\u05ea\u05d0\u05d9\u05dd \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u05dc\n\u2022 \u05e8\u05db\u05d1\u05d9 \u05e4\u05e8\u05d9\u05de\u05d9\u05d5\u05dd \u05de\u05e2\u05dc 150,000 \u20aa\n\u2022 \u05de\u05d5\u05db\u05e8\u05d9\u05dd \u05e9\u05de\u05d7\u05e4\u05e9\u05d9\u05dd \u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05de\u05d4\u05d9\u05e8\u05d5\u05ea\n\u2022 \u05de\u05d9 \u05e9\u05de\u05d1\u05d9\u05df \u05e9\u05e4\u05e8\u05e1\u05d5\u05dd \u05e0\u05db\u05d5\u05df = \u05db\u05e1\u05e3 \u05d9\u05d5\u05ea\u05e8\n\n\u23f1\ufe0f \u05e4\u05e8\u05d8\u05d9\u05dd \u05d8\u05db\u05e0\u05d9\u05d9\u05dd\n\u2022 \u05de\u05e9\u05da \u05e4\u05e8\u05e1\u05d5\u05dd: 30 \u05d9\u05de\u05d9\u05dd\n\u2022 14 \u05d9\u05de\u05d9 \u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05d5\u05d1\u05d8\u05d7\u05ea\n\u2022 \u05de\u05d7\u05d9\u05e8: 449 \u20aa (\u05d1\u05de\u05e7\u05d5\u05dd 528 \u20aa)\n\u2022 \u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05e9\u05dc 79 \u20aa \u2013 15% \u05d4\u05e0\u05d7\u05d4`
  },
  vip: {
    title: 'VIP LUXURY',
    content: `\ud83d\udc8e \u05de\u05d4 \u05de\u05e7\u05d1\u05dc\u05d9\u05dd?\n\u2022 15+ \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05e1\u05d8\u05d9\u05dc\u05e9 \u05d1\u05e8\u05de\u05d4 \u05e7\u05d5\u05dc\u05e0\u05d5\u05e2\u05d9\u05ea\n\u2022 \u05e8\u05d9\u05dc\u05e1 VIP + \u05e1\u05d8\u05d5\u05e8\u05d9 \u05e2\u05dd \u05e2\u05d9\u05e6\u05d5\u05d1 \u05d1\u05dc\u05e2\u05d3\u05d9\n\u2022 60 \u05d9\u05de\u05d9 \u05e4\u05e8\u05e1\u05d5\u05dd \u05e4\u05e8\u05de\u05d9\u05d5\u05dd \u05de\u05dc\u05d0\n\u2022 \u05dc\u05d9\u05d5\u05d5\u05d9 \u05d0\u05d9\u05e9\u05d9 24/7 \u2013 \u05de\u05e0\u05d4\u05dc \u05dc\u05e7\u05d5\u05d7 VIP\n\u2022 \u05d8\u05e8\u05d2\u05d5\u05d8 \u05de\u05ea\u05e7\u05d3\u05dd \u05dc\u05e4\u05d9 \u05e4\u05e8\u05de\u05d8\u05e8\u05d9\u05dd \u05de\u05d3\u05d5\u05d9\u05e7\u05d9\u05dd\n\u2022 \u05e2\u05d3\u05d9\u05e4\u05d5\u05ea \u05e8\u05d0\u05e9\u05d5\u05e0\u05d4 \u05d1\u05db\u05dc \u05d4\u05e4\u05e8\u05e1\u05d5\u05de\u05d9\u05dd \u05ea\u05de\u05d9\u05d3\n\u2022 \u05e7\u05d9\u05d3\u05d5\u05dd \u05de\u05de\u05d5\u05de\u05df \u05d1\u05e2\u05e8\u05d5\u05e6\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd\n\n\ud83c\udfce\ufe0f \u05dc\u05de\u05d9 \u05d6\u05d4 \u05de\u05d9\u05d5\u05e2\u05d3?\n\u2022 \u05e8\u05db\u05d1\u05d9 \u05d9\u05d5\u05e7\u05e8\u05d4: \u05e4\u05d5\u05e8\u05e9\u05d4, \u05de\u05e8\u05e6\u05d3\u05e1, BMW, \u05d0\u05d0\u05d5\u05d3\u05d9\n\u2022 \u05e8\u05db\u05d1\u05d9 \u05d0\u05e1\u05e4\u05e0\u05d5\u05ea \u05d5\u05e0\u05d3\u05d9\u05e8\u05d9\u05dd \u05d1\u05e9\u05d5\u05e7\n\u2022 \u05de\u05d9 \u05e9\u05d3\u05d5\u05e8\u05e9 \u05e9\u05d9\u05e8\u05d5\u05ea \u05d1\u05e8\u05de\u05d4 \u05d4\u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8\n\u2022 \u05de\u05db\u05d9\u05e8\u05d4 \u05de\u05d4\u05d9\u05e8\u05d4 \u05d1\u05de\u05d7\u05d9\u05e8 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9 \u05de\u05d5\u05d1\u05d8\u05d7\n\n\u23f1\ufe0f \u05e4\u05e8\u05d8\u05d9\u05dd \u05d8\u05db\u05e0\u05d9\u05d9\u05dd\n\u2022 \u05de\u05e9\u05da \u05e4\u05e8\u05e1\u05d5\u05dd: 60 \u05d9\u05de\u05d9\u05dd\n\u2022 30 \u05d9\u05de\u05d9 \u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05d5\u05d1\u05d8\u05d7\u05ea + \u05d0\u05e4\u05e9\u05e8\u05d5\u05ea \u05d4\u05d0\u05e8\u05db\u05d4\n\u2022 \u05de\u05d7\u05d9\u05e8: 749 \u20aa (\u05d1\u05de\u05e7\u05d5\u05dd 882 \u20aa)\n\u2022 \u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05e9\u05dc 133 \u20aa \u2013 15% \u05d4\u05e0\u05d7\u05d4`
  },
  duo: {
    title: 'DUO DEAL',
    content: `\ud83d\ude97\ud83d\ude97 \u05de\u05d4 \u05db\u05d5\u05dc\u05dc\u05ea \u05d4\u05d7\u05d1\u05d9\u05dc\u05d4?\n\u2022 \u05e4\u05e8\u05e1\u05d5\u05dd \u05de\u05dc\u05d0 \u05dc\u05e9\u05e0\u05d9 \u05e8\u05db\u05d1\u05d9\u05dd \u05d1\u05de\u05d7\u05d9\u05e8 \u05de\u05d9\u05d5\u05d7\u05d3\n\u2022 4 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea \u05dc\u05db\u05dc \u05e8\u05db\u05d1 \u05d1\u05e0\u05e4\u05e8\u05d3\n\u2022 \u05e4\u05d5\u05e1\u05d8 \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9 \u05e0\u05e4\u05e8\u05d3 \u05d5\u05de\u05d5\u05ea\u05d0\u05dd \u05dc\u05db\u05dc \u05e8\u05db\u05d1\n\u2022 \u05e1\u05d8\u05d5\u05e8\u05d9 14 \u05d9\u05de\u05d9\u05dd \u05dc\u05db\u05dc \u05d0\u05d7\u05d3 \u05de\u05d4\u05e8\u05db\u05d1\u05d9\u05dd\n\u2022 \u05d7\u05e9\u05d9\u05e4\u05d4 \u05db\u05e4\u05d5\u05dc\u05d4 \u05dc\u05e7\u05d4\u05dc \u05de\u05e2\u05d5\u05e0\u05d9\u05d9\u05df \u05d5\u05e8\u05d7\u05d1\n\n\ud83d\udcb0 \u05dc\u05de\u05d4 \u05d6\u05d4 \u05de\u05e9\u05ea\u05dc\u05dd?\n\u2022 \u05d1\u05de\u05e7\u05d5\u05dd \u05dc\u05e9\u05dc\u05dd 598 \u20aa \u2013 \u05de\u05e9\u05dc\u05de\u05d9\u05dd \u05e8\u05e7 349 \u20aa\n\u2022 \u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05e2\u05e6\u05d5\u05dd \u05e9\u05dc 249 \u20aa \u2013 40% \u05d4\u05e0\u05d7\u05d4\n\u2022 \u05d9\u05d7\u05e1 \u05d0\u05d9\u05e9\u05d9 \u05d5\u05e4\u05e8\u05e1\u05d5\u05dd \u05de\u05e7\u05e6\u05d5\u05e2\u05d9 \u05dc\u05e9\u05e0\u05d9 \u05d4\u05e8\u05db\u05d1\u05d9\u05dd\n\u2022 \u05d4\u05db\u05d9 \u05de\u05e9\u05ea\u05dc\u05dd \u05dc\u05db\u05dc \u05de\u05d9 \u05e9\u05d9\u05e9 \u05dc\u05d5 2 \u05e8\u05db\u05d1\u05d9\u05dd\n\n\u2705 \u05de\u05ea\u05d0\u05d9\u05dd \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u05dc\n\u2022 \u05de\u05e9\u05e4\u05d7\u05d5\u05ea \u05e2\u05dd \u05e9\u05e0\u05d9 \u05e8\u05db\u05d1\u05d9\u05dd \u05dc\u05de\u05db\u05d9\u05e8\u05d4\n\u2022 \u05d0\u05d7\u05d9\u05dd \u05d0\u05d5 \u05e9\u05d5\u05ea\u05e4\u05d9\u05dd \u05e9\u05de\u05d5\u05db\u05e8\u05d9\u05dd \u05d9\u05d7\u05d3\n\u2022 \u05d4\u05d7\u05dc\u05e4\u05ea \u05e6\u05d9 \u05e8\u05db\u05d1 \u05e4\u05e8\u05d8\u05d9\n\u2022 \u05e1\u05d5\u05d7\u05e8\u05d9 \u05e8\u05db\u05d1 \u05d1\u05ea\u05d7\u05d9\u05dc\u05ea \u05d3\u05e8\u05db\u05dd`
  },
  business: {
    title: 'BUSINESS',
    content: `\ud83c\udfe2 \u05de\u05d4 \u05de\u05e7\u05d1\u05dc\u05d9\u05dd?\n\u2022 \u05e2\u05d3 50 \u05e8\u05db\u05d1\u05d9\u05dd \u05de\u05e4\u05d5\u05e8\u05e1\u05de\u05d9\u05dd \u05d1\u05d7\u05d5\u05d3\u05e9\n\u2022 \u05e6\u05d9\u05dc\u05d5\u05de\u05d9\u05dd \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d9\u05dd \u05dc\u05db\u05dc \u05e8\u05db\u05d1 \u05d1\u05e0\u05e4\u05e8\u05d3\n\u2022 \u05d3\u05e4\u05d9 \u05e0\u05d7\u05d9\u05ea\u05d4 \u05de\u05d5\u05ea\u05d0\u05de\u05d9\u05dd \u05dc\u05e1\u05d5\u05db\u05e0\u05d5\u05ea\n\u2022 \u05de\u05e0\u05d4\u05dc \u05dc\u05e7\u05d5\u05d7 \u05d9\u05d9\u05e2\u05d5\u05d3\u05d9 \u2013 \u05d0\u05d9\u05e9 \u05e7\u05e9\u05e8 \u05d0\u05d7\u05d3\n\u2022 \u05d3\u05d5\u05d7\u05d5\u05ea \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd \u05e2\u05dd \u05d4\u05de\u05dc\u05e6\u05d5\u05ea\n\u2022 \u05e7\u05d9\u05d3\u05d5\u05dd \u05de\u05de\u05d5\u05de\u05df \u05e2\u05dd \u05ea\u05e7\u05e6\u05d9\u05d1 \u05d7\u05d5\u05d3\u05e9\u05d9 \u05db\u05dc\u05d5\u05dc\n\u2022 \u05d8\u05e8\u05d2\u05d5\u05d8 \u05dc\u05e4\u05d9 \u05d0\u05d6\u05d5\u05e8, \u05ea\u05d7\u05d5\u05dd \u05d5\u05e7\u05d4\u05dc \u05d9\u05e2\u05d3\n\n\ud83d\udcc8 \u05d9\u05ea\u05e8\u05d5\u05e0\u05d5\u05ea \u05dc\u05e2\u05e1\u05e7\u05d9\u05dd\n\u2022 \u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7\u05d9\u05ea \u05e1\u05d3\u05d5\u05e8\u05d4 \u05dc\u05d0\u05d5\u05e8\u05da \u05d4\u05e9\u05e0\u05d4\n\u2022 \u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05e2\u05e6\u05d5\u05dd \u05d1\u05e2\u05dc\u05d5\u05d9\u05d5\u05ea \u05e4\u05e8\u05e1\u05d5\u05dd \u05d7\u05d5\u05d3\u05e9\u05d9\u05d5\u05ea\n\u2022 \u05de\u05d9\u05ea\u05d5\u05d2 \u05d4\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05d1\u05e8\u05e9\u05ea\u05d5\u05ea \u05d4\u05d7\u05d1\u05e8\u05ea\u05d9\u05d5\u05ea\n\u2022 \u05e0\u05d9\u05d4\u05d5\u05dc \u05de\u05dc\u05d0 \u05dc\u05dc\u05d0 \u05e2\u05d5\u05de\u05e1 \u05e2\u05dc \u05d4\u05e6\u05d5\u05d5\u05ea \u05d4\u05e4\u05e0\u05d9\u05de\u05d9\n\n\u23f1\ufe0f \u05e4\u05e8\u05d8\u05d9\u05dd \u05d8\u05db\u05e0\u05d9\u05d9\u05dd\n\u2022 \u05de\u05d9\u05e0\u05d5\u05d9 \u05d7\u05d5\u05d3\u05e9\u05d9 \u05de\u05ea\u05d7\u05d3\u05e9 \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea\n\u2022 \u05de\u05d7\u05d9\u05e8: 1,499 \u20aa \u05dc\u05d7\u05d5\u05d3\u05e9 (\u05d1\u05de\u05e7\u05d5\u05dd 2,499 \u20aa)\n\u2022 \u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05e9\u05dc 1,000 \u20aa \u2013 40% \u05d4\u05e0\u05d7\u05d4\n\u2022 \u05e0\u05e6\u05d9\u05d2 \u05d0\u05d9\u05e9\u05d9 \u05d9\u05e4\u05e0\u05d4 \u05d0\u05dc\u05d9\u05da \u05ea\u05d5\u05da 2 \u05e9\u05e2\u05d5\u05ea`
  },
  'equipment-heavy': {
    title: '\u05e6\u05d9\u05d5\u05d3 \u05db\u05d1\u05d3',
    content: `\ud83d\ude9c \u05de\u05d4 \u05db\u05d5\u05dc\u05dc\u05ea \u05d4\u05d7\u05d1\u05d9\u05dc\u05d4?\n\u2022 10 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea \u05e9\u05dc \u05d4\u05e6\u05d9\u05d5\u05d3 \u05d1\u05e9\u05d8\u05d7\n\u2022 \u05e4\u05d5\u05e1\u05d8 \u05e2\u05dd \u05de\u05e4\u05e8\u05d8 \u05d8\u05db\u05e0\u05d9 \u05de\u05e4\u05d5\u05e8\u05d8 \u05d5\u05de\u05d3\u05d5\u05d9\u05e7\n\u2022 \u05e1\u05d8\u05d5\u05e8\u05d9 21 \u05d9\u05de\u05d9\u05dd \u05dc\u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05de\u05d5\u05e9\u05db\u05ea\n\u2022 \u05d7\u05e9\u05d9\u05e4\u05d4 \u05d9\u05d9\u05e2\u05d5\u05d3\u05d9\u05ea \u05dc\u05e7\u05d4\u05dc \u05e7\u05d1\u05dc\u05e0\u05d9\u05dd \u05d5\u05de\u05d2\u05d6\u05e8 \u05d4\u05d1\u05e0\u05d9\u05d9\u05d4\n\u2022 \u05e2\u05d3\u05d9\u05e4\u05d5\u05ea \u05d1\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05d7\u05d9\u05e4\u05d5\u05e9 \u05dc\u05e6\u05d9\u05d5\u05d3 \u05db\u05d1\u05d3\n\u2022 \u05d9\u05d9\u05e2\u05d5\u05e5 \u05ea\u05de\u05d7\u05d5\u05e8 \u05de\u05e7\u05e6\u05d5\u05e2\u05d9 \u05dc\u05e4\u05d9 \u05e9\u05d5\u05e7 \u05e2\u05d3\u05db\u05e0\u05d9\n\n\ud83c\udfd7\ufe0f \u05d4\u05ea\u05de\u05d7\u05d5\u05ea \u2013 \u05d0\u05e0\u05d7\u05e0\u05d5 \u05de\u05db\u05d9\u05e8\u05d9\u05dd \u05d0\u05ea \u05d4\u05e9\u05d5\u05e7\n\u2022 \u05d1\u05d0\u05d2\u05e8\u05d9\u05dd \u05d5\u05de\u05d9\u05e0\u05d9 \u05d1\u05d0\u05d2\u05e8\u05d9\u05dd\n\u2022 \u05de\u05d7\u05e4\u05e8\u05d5\u05e0\u05d9\u05dd \u05d5\u05e7\u05d8\u05e8\u05e4\u05d9\u05dc\u05e8\u05d9\u05dd\n\u2022 \u05d1\u05d5\u05dc\u05d3\u05d5\u05d6\u05e8\u05d9\u05dd \u05d5\u05e9\u05d5\u05e4\u05dc\u05d9\u05dd\n\u2022 \u05e2\u05d2\u05d5\u05e8\u05e0\u05d9\u05dd \u05d5\u05e6\u05d9\u05d5\u05d3 \u05d4\u05e8\u05de\u05d4 \u05db\u05d1\u05d3\n\u2022 \u05e6\u05d9\u05d5\u05d3 \u05e1\u05dc\u05d9\u05dc\u05d4 \u05d5\u05ea\u05e9\u05ea\u05d9\u05d5\u05ea`
  },
  'equipment-light': {
    title: '\u05e6\u05d9\u05d5\u05d3 \u05e7\u05dc',
    content: `\ud83d\udd27 \u05de\u05d4 \u05db\u05d5\u05dc\u05dc\u05ea \u05d4\u05d7\u05d1\u05d9\u05dc\u05d4?\n\u2022 6 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea \u05e9\u05dc \u05d4\u05e6\u05d9\u05d5\u05d3\n\u2022 \u05e4\u05d5\u05e1\u05d8 \u05de\u05d5\u05ea\u05d0\u05dd \u05e2\u05dd \u05ea\u05d9\u05d0\u05d5\u05e8 \u05d8\u05db\u05e0\u05d9 \u05de\u05dc\u05d0\n\u2022 \u05e1\u05d8\u05d5\u05e8\u05d9 14 \u05d9\u05de\u05d9\u05dd \u05dc\u05e7\u05d4\u05dc \u05e8\u05dc\u05d5\u05d5\u05e0\u05d8\u05d9\n\u2022 \u05d7\u05e9\u05d9\u05e4\u05d4 \u05dc\u05d0\u05e0\u05e9\u05d9 \u05de\u05e7\u05e6\u05d5\u05e2 \u05d1\u05ea\u05d7\u05d5\u05dd\n\u2022 \u05ea\u05de\u05d9\u05db\u05d4 \u05de\u05dc\u05d0\u05d4 \u05d1\u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4 \u05dc\u05d0\u05d5\u05e8\u05da \u05db\u05dc \u05d4\u05ea\u05d4\u05dc\u05d9\u05da\n\n\ud83d\udee0\ufe0f \u05de\u05ea\u05d0\u05d9\u05dd \u05dc\u05db\u05dc \u05e1\u05d5\u05d2\u05d9 \u05d4\u05e6\u05d9\u05d5\u05d3 \u05d4\u05e7\u05dc\n\u2022 \u05de\u05dc\u05d2\u05d6\u05d5\u05ea \u05d5\u05e6\u05d9\u05d5\u05d3 \u05de\u05d7\u05e1\u05df\n\u2022 \u05e4\u05d5\u05e4\u05e7\u05d8\u05d9\u05dd, \u05d2'\u05e7\u05d9\u05dd \u05d5\u05e6\u05d9\u05d5\u05d3 \u05d4\u05e8\u05de\u05d4\n\u2022 \u05e1\u05e7\u05d9\u05d3 \u05e1\u05d8\u05d9\u05e8 \u05e8\u05d1-\u05e9\u05d9\u05de\u05d5\u05e9\u05d9\n\u2022 \u05de\u05e2\u05e8\u05d1\u05dc\u05d9 \u05d1\u05d8\u05d5\u05df \u05d5\u05e2\u05d2\u05dc\u05d5\u05ea\n\u2022 \u05e6\u05d9\u05d5\u05d3 \u05e9\u05d9\u05e4\u05d5\u05e6\u05d9\u05dd \u05d5\u05d1\u05e0\u05d9\u05d9\u05d4 \u05e7\u05dc\u05d4`
  },
  'transport': {
    title: '\u05ea\u05d7\u05d1\u05d5\u05e8\u05d4 \u05d5\u05d4\u05e1\u05e2\u05d5\u05ea',
    content: `\ud83d\ude8c \u05de\u05d4 \u05db\u05d5\u05dc\u05dc\u05ea \u05d4\u05d7\u05d1\u05d9\u05dc\u05d4?\n\u2022 10 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea \u05de\u05d1\u05e4\u05e0\u05d9\u05dd \u05d5\u05de\u05d1\u05d7\u05d5\u05e5\n\u2022 \u05e4\u05d5\u05e1\u05d8 \u05e2\u05dd \u05de\u05e4\u05e8\u05d8 \u05d8\u05db\u05e0\u05d9 \u05de\u05dc\u05d0 \u2013 \u05de\u05e0\u05d5\u05e2, \u05e7\u05d9\u05d1\u05d5\u05dc\u05ea, \u05e7"\u05de\n\u2022 \u05e1\u05d8\u05d5\u05e8\u05d9 21 \u05d9\u05de\u05d9\u05dd \u05dc\u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05ea\u05de\u05e9\u05db\u05ea\n\u2022 \u05d7\u05e9\u05d9\u05e4\u05d4 \u05d9\u05d9\u05e2\u05d5\u05d3\u05d9\u05ea \u05dc\u05d7\u05d1\u05e8\u05d5\u05ea \u05d4\u05e1\u05e2\u05d5\u05ea \u05d5\u05ea\u05d7\u05d1\u05d5\u05e8\u05d4\n\u2022 \u05d8\u05e8\u05d2\u05d5\u05d8 \u05de\u05d3\u05d5\u05d9\u05e7 \u05dc\u05e8\u05d5\u05db\u05e9\u05d9 \u05db\u05dc\u05d9 \u05e8\u05db\u05d1 \u05de\u05e1\u05d7\u05e8\u05d9\u05d9\u05dd\n\u2022 \u05d9\u05d9\u05e2\u05d5\u05e5 \u05ea\u05de\u05d7\u05d5\u05e8 \u05de\u05e7\u05e6\u05d5\u05e2\u05d9 \u05dc\u05e4\u05d9 \u05d2\u05d9\u05dc \u05d5\u05de\u05e6\u05d1 \u05d4\u05e8\u05db\u05d1\n\n\ud83d\ude90 \u05de\u05d4 \u05d0\u05e0\u05d7\u05e0\u05d5 \u05de\u05e4\u05e8\u05e1\u05de\u05d9\u05dd?\n\u2022 \u05d0\u05d5\u05d8\u05d5\u05d1\u05d5\u05e1\u05d9\u05dd \u05d5\u05de\u05d9\u05e0\u05d9\u05d1\u05d5\u05e1\u05d9\u05dd \u2013 \u05db\u05dc \u05d4\u05d2\u05d3\u05dc\u05d9\u05dd\n\u2022 \u05de\u05d9\u05e0\u05d9\u05d5\u05d5\u05e0\u05d9\u05dd \u05d5\u05e8\u05db\u05d1\u05d9 \u05d4\u05e1\u05e2\u05d4 \u05e4\u05e8\u05d8\u05d9\u05d9\u05dd\n\u2022 \u05d5\u05d5\u05d0\u05e0\u05d9\u05dd \u05de\u05e1\u05d7\u05e8\u05d9\u05d9\u05dd \u2013 \u05d4\u05d5\u05d1\u05dc\u05d5\u05ea \u05d5\u05de\u05e9\u05dc\u05d5\u05d7\u05d5\u05ea\n\u2022 \u05de\u05e9\u05d0\u05d9\u05d5\u05ea \u05e7\u05dc\u05d5\u05ea \u05d5\u05db\u05d1\u05d3\u05d5\u05ea`
  }
};

// ============================================================
// SECTION DESCRIPTION (original \u2014 unchanged)
// ============================================================
interface SectionDescriptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  color: string;
  animate?: 'y' | 'rotate' | 'scale' | 'x';
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({
  icon, title, description, tags, color, animate = 'y'
}) => {
  const getAnimation = () => {
    switch (animate) {
      case 'rotate': return { rotate: [0, 8, -8, 0] };
      case 'scale': return { scale: [1, 1.08, 1] };
      case 'x': return { x: [0, 4, 0] };
      default: return { y: [0, -4, 0] };
    }
  };
  const animationDuration = animate === 'rotate' ? 4 : animate === 'scale' ? 3 : 2.5;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden p-5"
      style={{ background: `linear-gradient(135deg, ${color}08 0%, rgba(10,10,18,0.95) 60%)`, border: `1px solid ${color}18` }}>
      <div className="absolute right-0 top-4 bottom-4 w-[3px] rounded-full"
        style={{ background: `linear-gradient(180deg, ${color}, transparent)` }} />
      <div className="flex items-start gap-4">
        <motion.div animate={getAnimation()} transition={{ duration: animationDuration, repeat: Infinity, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
          style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
          {icon}
        </motion.div>
        <div>
          <h3 className="text-lg font-black text-white mb-1">{title}</h3>
          <p className="text-white/50 text-sm leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, i) => (
              <span key={i} className="text-[10px] font-black px-2.5 py-1 rounded-full"
                style={{ background: `${color}0a`, border: `1px solid ${color}20`, color: color }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// FIX 2: MOBILE PACKAGE SWIPER \u2014 improved gesture swiper
// \u064a\u062f\u0639\u0645 \u0627\u0644\u0633\u062d\u0628 (drag/touch) \u0628\u062f\u0648\u0646 scroll\u060c \u0645\u0639 peek \u0644\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062a\u0627\u0644\u064a\u0629
// ============================================================
const MobilePackageSwiper = ({
  packages, lang, onSelect
}: {
  packages: Package[], lang: Language, onSelect: (p: Package) => void
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const total = packages.length;

  const goTo = (idx: number) => setActiveIndex(Math.max(0, Math.min(total - 1, idx)));

  const onTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
    setIsDragging(true);
    setDragDelta(0);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStart === null) return;
    setDragDelta(e.touches[0].clientX - dragStart);
  };
  const onTouchEnd = () => {
    if (Math.abs(dragDelta) > 50) goTo(dragDelta < 0 ? activeIndex + 1 : activeIndex - 1);
    setDragStart(null); setDragDelta(0); setIsDragging(false);
  };
  const onMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX); setIsDragging(true); setDragDelta(0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragStart === null || !isDragging) return;
    setDragDelta(e.clientX - dragStart);
  };
  const onMouseUp = () => {
    if (Math.abs(dragDelta) > 50) goTo(dragDelta < 0 ? activeIndex + 1 : activeIndex - 1);
    setDragStart(null); setDragDelta(0); setIsDragging(false);
  };

  const CARD_W = 88; // % of container
  const PEEK = 10;  // % peek of next card

  return (
    <div className="relative">
      {/* Hint text */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 mb-4 text-[11px] text-white/35 font-bold">
        <motion.span animate={{ x: [-3, 3, -3] }} transition={{ duration: 1.4, repeat: Infinity }}>\u2192</motion.span>
        \u05d4\u05d7\u05dc\u05e7 \u05dc\u05d2\u05d9\u05dc\u05d5\u05d9 \u05d7\u05d1\u05d9\u05dc\u05d5\u05ea \u05e0\u05d5\u05e1\u05e4\u05d5\u05ea
        <motion.span animate={{ x: [3, -3, 3] }} transition={{ duration: 1.4, repeat: Infinity }}>\u2190</motion.span>
      </motion.div>

      {/* Swiper container */}
      <div className="overflow-hidden" style={{ touchAction: 'pan-y' }}>
        <div
          className="flex select-none"
          style={{
            transform: `translateX(calc(${-(activeIndex * CARD_W)}% + ${dragDelta}px + ${activeIndex > 0 ? PEEK / 2 : 0}%))`,
            transition: isDragging ? 'none' : 'transform 0.42s cubic-bezier(0.25, 1, 0.5, 1)',
            willChange: 'transform',
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              className="shrink-0 px-2 transition-all duration-300"
              style={{
                width: `${CARD_W}%`,
                opacity: i === activeIndex ? 1 : 0.5,
                transform: i === activeIndex ? 'scale(1)' : 'scale(0.95)',
                transition: isDragging ? 'none' : 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <div style={{ height: getCardHeight(pkg.id) }}>
                <PackageCard pkg={pkg} lang={lang} onSelect={onSelect} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {packages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === activeIndex ? 24 : 8,
              height: 8,
              background: i === activeIndex ? '#c8102e' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>

      {/* Prev / Next buttons */}
      <div className="flex items-center justify-between px-2 mt-4">
        <motion.button onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black border border-white/10 bg-white/5 disabled:opacity-25">
          <ChevronRight size={14} /> \u05d4\u05e7\u05d5\u05d3\u05dd
        </motion.button>
        <span className="text-[11px] text-white/30 font-bold">{activeIndex + 1} / {total}</span>
        <motion.button onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === total - 1}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black border border-white/10 bg-white/5 disabled:opacity-25">
          \u05d4\u05d1\u05d0 <ChevronLeft size={14} />
        </motion.button>
      </div>
    </div>
  );
};

// ============================================================
// PACKAGE CARD (unchanged \u2014 only FlipCardBack is fixed above)
// ============================================================
const PackageCard = ({ pkg, lang, onSelect }: PackageCardProps) => {
  const t = translations[lang];
  const [flipped, setFlipped] = useState(false);

  const color = getPackageColor(pkg.id);
  const borderColor = getPackageBorder(pkg.id);
  const badge = getPackageEmoji(pkg.id);
  const isPro = pkg.id === 'pro';
  const isPremium = pkg.premium;
  const details = packageDetails[pkg.id] || { title: pkg.name, content: pkg.features.join('\n') };

  return (
    <div className="flip-card">
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* FRONT */}
        <div className="flip-card-front">
          <div className="absolute top-0 left-0 right-0 h-[3px] z-10"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}10 0%, transparent 70%)` }} />

          {(pkg.popular || pkg.id === 'pro') && (
            <div className="absolute top-3 right-3 z-20">
              <div className="badge badge-popular">
                <Trophy size={9} />
                <span>{t.mostPopular || '\u05d4\u05db\u05d9 \u05e0\u05d1\u05d7\u05e8'}</span>
              </div>
            </div>
          )}
          {pkg.id === 'equipment-heavy' && (
            <div className="absolute -top-3 right-4 z-20">
              <div className="badge badge-popular">
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                \u05d4\u05db\u05d9 \u05de\u05d1\u05d5\u05e7\u05e9
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3 z-20">
            <div className="badge badge-success"><Zap size={7} /><span>15% OFF</span></div>
          </div>

          <div className="p-5 flex flex-col h-full relative z-10 gap-3">
            <div className="flex items-center gap-3 mt-2">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `linear-gradient(135deg, ${color}28, ${color}10)`, border: `1px solid ${borderColor}`, boxShadow: `0 4px 14px ${color}1a` }}>
                {badge}
              </div>
              <div>
                <h3 className="text-[18px] font-black tracking-tight leading-tight"
                  style={{ color: isPremium || isPro ? color : '#fff' }}>{pkg.name}</h3>
                <p className="text-[10px] font-semibold mt-[2px]" style={{ color: `${color}99` }}>
                  {pkg.id === 'basic' ? '\u2713 \u05e4\u05ea\u05e8\u05d5\u05df \u05de\u05d4\u05d9\u05e8 \u05d5\u05de\u05e7\u05e6\u05d5\u05e2\u05d9' :
                    pkg.id === 'pro' ? '\u2713 \u05d4\u05d1\u05d7\u05d9\u05e8\u05d4 \u05d4\u05e4\u05d5\u05e4\u05d5\u05dc\u05e8\u05d9\u05ea \u05d1\u05d9\u05d5\u05ea\u05e8' :
                    '\u2713 \u05de\u05e7\u05e1\u05d9\u05de\u05d5\u05dd \u05d7\u05e9\u05d9\u05e4\u05d4 \u05d5\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea'}
                </p>
              </div>
            </div>

            <div className="rounded-xl p-2.5" style={{ background: `${color}0a`, border: `1px solid ${color}18` }}>
              <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {pkg.id === 'basic' ? '\u05d7\u05d1\u05d9\u05dc\u05ea \u05d4\u05db\u05e0\u05d9\u05e1\u05d4 \u05d4\u05d0\u05d9\u05d3\u05d9\u05d0\u05dc\u05d9\u05ea \u2013 \u05e4\u05e8\u05e1\u05d5\u05dd \u05de\u05de\u05d5\u05e7\u05d3 \u05e2\u05dd \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea \u05d5\u05ea\u05d9\u05d0\u05d5\u05e8 \u05de\u05e9\u05db\u05e0\u05e2 \u05dc\u05e8\u05db\u05d1\u05da'
                  : pkg.id === 'pro' ? '\u05d7\u05d1\u05d9\u05dc\u05ea \u05d4\u05e4\u05e8\u05d5 \u05d4\u05de\u05d0\u05d5\u05d6\u05e0\u05ea \u2013 \u05d9\u05d5\u05ea\u05e8 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea, \u05d7\u05e9\u05d9\u05e4\u05d4 \u05e8\u05d7\u05d1\u05d4 \u05d5\u05e2\u05d3\u05d9\u05e4\u05d5\u05ea \u05d1\u05ea\u05d6\u05de\u05d5\u05df \u05d4\u05e4\u05e8\u05e1\u05d5\u05dd'
                  : '\u05d7\u05d1\u05d9\u05dc\u05ea \u05d4\u05e4\u05e8\u05de\u05d9\u05d5\u05dd \u05d4\u05de\u05dc\u05d0\u05d4 \u2013 \u05e8\u05d9\u05dc \u05de\u05e7\u05e6\u05d5\u05e2\u05d9, \u05e4\u05e8\u05e1\u05d5\u05dd VIP \u05de\u05de\u05d5\u05e9\u05da \u05d5\u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05ea'}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-[34px] font-black text-white leading-none">{pkg.price}</span>
              <div className="flex flex-col">
                <span className="text-[9px] line-through" style={{ color: 'rgba(255,255,255,0.22)' }}>
                  \u20aa{Math.round(parseInt(pkg.price.replace('\u20aa', '')) / 0.85)}
                </span>
                <span className="text-[9px] font-bold" style={{ color: '#4ade80' }}>\u05d7\u05d9\u05e1\u05db\u05d5\u05df 15%</span>
              </div>
            </div>

            <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${borderColor}80, transparent)` }} />

            <div className="flex flex-col gap-1.5 flex-grow">
              {pkg.features.slice(0, 4).map((feat, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Check size={8} strokeWidth={3.5} style={{ color }} />
                  </div>
                  <span className="text-[11.5px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.80)' }}>{feat}</span>
                </div>
              ))}
              {pkg.features.length > 4 && (
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 h-px" style={{ background: `${color}18` }} />
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ color, background: `${color}12` }}>
                    + {pkg.features.length - 4} \u05d4\u05d8\u05d1\u05d5\u05ea \u05e0\u05d5\u05e1\u05e4\u05d5\u05ea
                  </span>
                  <div className="flex-1 h-px" style={{ background: `${color}18` }} />
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-auto">
              <motion.button type="button" onClick={() => setFlipped(true)}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-xl font-black text-xs transition-all hover:opacity-80"
                style={{ border: `1px solid ${borderColor}`, color, background: `${color}10` }}>
                \u05e4\u05e8\u05d8\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd
              </motion.button>
              <motion.button type="button" onClick={() => onSelect(pkg)}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-xl font-black text-xs text-white transition-all"
                style={{
                  background: isPremium || isPro ? `linear-gradient(135deg, ${color}, ${color}bb)` : 'rgba(255,255,255,0.1)',
                  border: isPremium || isPro ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  boxShadow: isPremium || isPro ? `0 4px 15px ${color}40` : 'none'
                }}>
                <span className="flex items-center justify-center gap-1.5">
                  <RocketIcon size={11} />{t.startOrder}
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back">
          <FlipCardBack pkg={pkg} details={details} color={color} borderColor={borderColor}
            badge={badge} onSelect={onSelect} onBack={() => setFlipped(false)} />
        </div>
      </div>
    </div>
  );
};

// VIPPackageCard (unchanged)
const VIPPackageCard = ({ pkg, lang, onSelect }: PackageCardProps) => {
  const t = translations[lang];
  const [flipped, setFlipped] = useState(false);
  const color = COLORS.vip.primary;
  const borderColor = COLORS.vip.border;
  const features = [
    { icon: <Camera size={14} />, text: '15+ \u05ea\u05de\u05d5\u05e0\u05d5\u05ea' },
    { icon: <Video size={14} />, text: '\u05e8\u05d9\u05dc\u05e1 + \u05e1\u05d8\u05d5\u05e8\u05d9' },
    { icon: <Calendar size={14} />, text: '60 \u05d9\u05de\u05d9\u05dd' },
    { icon: <TrendingUp size={14} />, text: '\u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05e7\u05e1' }
  ];
  return (
    <div className="flip-card w-full h-full">
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <div className="p-5 space-y-4 flex-grow flex flex-col">
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-amber-900/40 rounded-full px-3 py-1 border border-amber-500/30">
                <Crown size={11} className="text-amber-400" />
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-300">VIP LUXURY</span>
              </div>
              <div className="badge-success rounded-full px-2 py-1"><span className="text-[8px] font-black">15% OFF</span></div>
              <div className="flex mr-auto gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-l from-amber-200 via-amber-400 to-amber-300 bg-clip-text text-transparent">VIP LUXURY</h3>
              <p className="text-amber-100/35 text-[11px] mt-1">\u05d7\u05d1\u05d9\u05dc\u05ea \u05d4\u05e4\u05e8\u05e1\u05d5\u05dd \u05d4\u05d0\u05d5\u05dc\u05d8\u05d9\u05de\u05d8\u05d9\u05d1\u05d9\u05ea</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-400">\u20aa749</span>
              <span className="text-xs line-through text-white/20">\u20aa882</span>
              <span className="text-[9px] font-black bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/25">\u05d7\u05d9\u05e1\u05db\u05d5\u05df \u20aa133</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />
            <div className="grid grid-cols-2 gap-2 flex-grow">
              {features.map((feat, i) => <FeatureBox key={i} icon={feat.icon} text={feat.text} color={color} />)}
            </div>
            <div className="flex gap-2 mt-auto">
              <button type="button" onClick={() => setFlipped(true)}
                className="flex-1 py-2.5 rounded-xl font-black text-xs transition-all hover:opacity-80"
                style={{ border: `1px solid ${borderColor}`, color, background: 'rgba(212,175,55,0.08)' }}>\u05e4\u05e8\u05d8\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd</button>
              <button type="button" onClick={() => onSelect(pkg)}
                className="flex-1 py-2.5 rounded-xl font-black text-xs bg-gradient-to-l from-amber-500 to-amber-600 text-black flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95">
                <Crown size={12} /> \u05d4\u05d6\u05de\u05df VIP
              </button>
            </div>
          </div>
        </div>
        <div className="flip-card-back">
          <FlipCardBack pkg={pkg} details={packageDetails.vip} color={color} borderColor={borderColor}
            badge="\ud83d\udc51" onSelect={onSelect} onBack={() => setFlipped(false)} />
        </div>
      </div>
    </div>
  );
};

// DuoDealPackageCard (unchanged)
const DuoDealPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [flipped, setFlipped] = useState(false);
  const color = COLORS.duo.primary;
  const borderColor = COLORS.duo.border;
  const features = [
    { icon: <Car size={14} />, text: '2 \u05e8\u05db\u05d1\u05d9\u05dd' },
    { icon: <Camera size={14} />, text: '4 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea' },
    { icon: <Instagram size={14} />, text: '\u05e4\u05d5\u05e1\u05d8\u05d9\u05dd' },
    { icon: <Calendar size={14} />, text: '14 \u05d9\u05de\u05d9\u05dd' }
  ];
  return (
    <div className="flip-card w-full h-full">
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          <div className="p-5 space-y-4 flex-grow flex flex-col">
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-purple-900/40 rounded-full px-3 py-1 border border-purple-500/30">
                <Car size={10} className="text-purple-400" /><Car size={10} className="text-purple-400" />
                <span className="text-[9px] font-black uppercase tracking-wider text-purple-300">DUO DEAL</span>
              </div>
              <div className="badge-success rounded-full px-2 py-1"><span className="text-[8px] font-black">40% OFF</span></div>
            </div>
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-l from-purple-200 via-purple-400 to-purple-300 bg-clip-text text-transparent">DUO DEAL</h3>
              <p className="text-purple-100/35 text-[11px] mt-1">\u05e4\u05e8\u05e1\u05d5\u05dd 2 \u05e8\u05db\u05d1\u05d9\u05dd \u05d1\u05de\u05d7\u05d9\u05e8 \u05de\u05d9\u05d5\u05d7\u05d3</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-purple-400">\u20aa349</span>
              <span className="text-xs line-through text-white/20">\u20aa598</span>
              <span className="text-[9px] font-black bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/25">\u05d7\u05d9\u05e1\u05db\u05d5\u05df \u20aa249</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/25 to-transparent" />
            <div className="grid grid-cols-2 gap-2 flex-grow">
              {features.map((feat, i) => <FeatureBox key={i} icon={feat.icon} text={feat.text} color={color} />)}
            </div>
            <div className="flex gap-2 mt-auto">
              <button type="button" onClick={() => setFlipped(true)}
                className="flex-1 py-2.5 rounded-xl font-black text-xs transition-all hover:opacity-80"
                style={{ border: `1px solid ${borderColor}`, color, background: 'rgba(139,92,246,0.08)' }}>\u05e4\u05e8\u05d8\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd</button>
              <button type="button" onClick={() => onSelect(pkg)}
                className="flex-1 py-2.5 rounded-xl font-black text-xs bg-gradient-to-l from-purple-500 to-purple-600 text-white flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95">
                <Car size={12} /> \u05d4\u05d6\u05de\u05df DUO
              </button>
            </div>
          </div>
        </div>
        <div className="flip-card-back">
          <FlipCardBack pkg={pkg} details={packageDetails.duo} color={color} borderColor={borderColor}
            badge="\ud83d\ude97\ud83d\ude97" onSelect={onSelect} onBack={() => setFlipped(false)} />
        </div>
      </div>
    </div>
  );
};

// EquipmentPackageCard (unchanged)
const EquipmentPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [flipped, setFlipped] = useState(false);
  const isHeavy = pkg.id === 'equipment-heavy';
  const color = isHeavy ? COLORS.equipmentHeavy.primary : COLORS.equipmentLight.primary;
  const borderColor = isHeavy ? COLORS.equipmentHeavy.border : COLORS.equipmentLight.border;
  const badge = isHeavy ? '\ud83d\ude9c' : '\ud83d\udd27';
  return (
    <div className="flip-card w-full h-full">
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-front p-5">
          <div className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
          {isHeavy && (
            <div className="absolute -top-3 right-4 z-20">
              <div className="badge badge-popular">
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" />\u05d4\u05db\u05d9 \u05de\u05d1\u05d5\u05e7\u05e9
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid ${borderColor}` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: isHeavy ? 'rgba(234,88,12,0.15)' : 'rgba(148,163,184,0.1)', border: `1px solid ${borderColor}` }}>
              {isHeavy ? <Truck size={20} style={{ color }} /> : <Wrench size={20} style={{ color }} />}
            </div>
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color }}>{isHeavy ? '\u05e6\u05d9\u05d5\u05d3 \u05db\u05d1\u05d3' : '\u05e6\u05d9\u05d5\u05d3 \u05e7\u05dc'}</div>
              <h3 className="text-base font-black text-white">{pkg.name}</h3>
            </div>
            <div className="mr-auto text-right">
              <div className="text-xl font-black text-white">{pkg.price}</div>
              <div className="text-[9px] text-white/25 line-through">\u20aa{Math.round(parseInt(pkg.price.replace('\u20aa', '')) / 0.85)}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {(isHeavy ? ['\u05d1\u05d0\u05d2\u05e8', '\u05de\u05d7\u05e4\u05e8\u05d5\u05df', '\u05de\u05d9\u05e0\u05d9 \u05d1\u05d0\u05d2\u05e8'] : ['\u05e4\u05d5\u05e4\u05e7\u05d8', '\u05de\u05dc\u05d2\u05d6\u05d4', '\u05e1\u05e7\u05d9\u05d3 \u05e1\u05d8\u05d9\u05e8']).map((item, i) => (
              <span key={i} className="text-[9px] font-black px-2 py-1 rounded-full border"
                style={{ color: isHeavy ? '#fb923c' : '#94a3b8', borderColor, background: `${color}10` }}>{item}</span>
            ))}
          </div>
          <div className="space-y-2 mb-4 flex-grow">
            {pkg.features.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[10px] font-medium">
                <div className="mt-0.5 p-0.5 rounded-full shrink-0"
                  style={{ background: isHeavy ? 'rgba(234,88,12,0.7)' : 'rgba(148,163,184,0.5)' }}>
                  <Check size={6} className="text-dark-bg" strokeWidth={5} />
                </div>
                <span className="text-white/75">{f}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-auto">
            <button type="button" onClick={() => setFlipped(true)}
              className="flex-1 py-2.5 rounded-xl font-black text-xs transition-all hover:opacity-80"
              style={{ border: `1px solid ${borderColor}`, color, background: `${color}10` }}>\u05e4\u05e8\u05d8\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd</button>
            <button type="button" onClick={() => onSelect(pkg)}
              className="flex-1 py-2.5 rounded-xl font-black text-xs text-white flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95"
              style={{ background: isHeavy ? 'linear-gradient(135deg, #ea580c, #c2410c)' : `${color}40`, border: isHeavy ? 'none' : `1px solid ${borderColor}` }}>
              \u05d4\u05d6\u05de\u05df \u05e2\u05db\u05e9\u05d9\u05d5
            </button>
          </div>
        </div>
        <div className="flip-card-back">
          <FlipCardBack pkg={pkg} details={packageDetails[pkg.id] || { title: pkg.name, content: pkg.features.join('\n') }}
            color={color} borderColor={borderColor} badge={badge} onSelect={onSelect} onBack={() => setFlipped(false)} />
        </div>
      </div>
    </div>
  );
};

// TransportPackageCard (unchanged)
const TransportPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [flipped, setFlipped] = useState(false);
  const color = COLORS.transport.primary;
  const borderColor = COLORS.transport.border;
  return (
    <div className="flip-card w-full h-full">
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-front p-5">
          <div className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
          <div className="absolute -top-3 left-4 z-20">
            <div className="badge badge-popular" style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />\u05d7\u05d3\u05e9!
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4 pb-3 mt-1" style={{ borderBottom: `1px solid ${borderColor}` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(14,165,233,0.15)', border: `1px solid ${borderColor}` }}>
              <Bus size={20} style={{ color }} />
            </div>
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color }}>\u05ea\u05d7\u05d1\u05d5\u05e8\u05d4 \u05d5\u05d4\u05e1\u05e2\u05d5\u05ea</div>
              <h3 className="text-base font-black text-white">{pkg.name}</h3>
            </div>
            <div className="mr-auto text-right">
              <div className="text-xl font-black text-white">{pkg.price}</div>
              <div className="text-[9px] text-white/25 line-through">\u20aa{Math.round(parseInt(pkg.price.replace('\u20aa', '')) / 0.85)}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {['\u05d0\u05d5\u05d8\u05d5\u05d1\u05d5\u05e1', '\u05de\u05d9\u05e0\u05d9\u05d1\u05d5\u05e1', '\u05d5\u05d5\u05d0\u05df', '\u05de\u05e9\u05d0\u05d9\u05ea'].map((item, i) => (
              <span key={i} className="text-[9px] font-black px-2 py-1 rounded-full border"
                style={{ color: '#38bdf8', borderColor, background: 'rgba(14,165,233,0.1)' }}>{item}</span>
            ))}
          </div>
          <div className="space-y-2 mb-4 flex-grow">
            {pkg.features.slice(0, 4).map((f, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[10px] font-medium">
                <div className="mt-0.5 p-0.5 rounded-full shrink-0 bg-sky-500/60">
                  <Check size={6} className="text-dark-bg" strokeWidth={5} />
                </div>
                <span className="text-white/75">{f}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-auto">
            <button type="button" onClick={() => setFlipped(true)}
              className="flex-1 py-2.5 rounded-xl font-black text-xs transition-all hover:opacity-80"
              style={{ border: `1px solid ${borderColor}`, color, background: 'rgba(14,165,233,0.08)' }}>\u05e4\u05e8\u05d8\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd</button>
            <button type="button" onClick={() => onSelect(pkg)}
              className="flex-1 py-2.5 rounded-xl font-black text-xs text-white flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}>
              <Bus size={11} />\u05d4\u05d6\u05de\u05df \u05e2\u05db\u05e9\u05d9\u05d5
            </button>
          </div>
        </div>
        <div className="flip-card-back">
          <FlipCardBack pkg={pkg} details={packageDetails.transport} color={color} borderColor={borderColor}
            badge="\ud83d\ude8c" onSelect={onSelect} onBack={() => setFlipped(false)} />
        </div>
      </div>
    </div>
  );
};

// BusinessPackageCard (unchanged)
const BusinessPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [flipped, setFlipped] = useState(false);
  const color = COLORS.business.primary;
  const borderColor = COLORS.business.border;
  const features = [
    { icon: <Target size={14} />, text: '\u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05de\u05d5\u05e7\u05d3\u05ea' },
    { icon: <BarChart3 size={14} />, text: '\u05d3\u05d5\u05d7\u05d5\u05ea \u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd' }
  ];
  return (
    <div className="flip-card w-full h-full">
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-front overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          <div className="absolute inset-0 opacity-8" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
          <div className="relative z-10 p-5 h-full flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Building2 size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">\u05dc\u05e1\u05d5\u05db\u05e0\u05d5\u05d9\u05d5\u05ea</div>
                  <h3 className="text-xl font-black text-white">BUSINESS</h3>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-blue-500/15 px-2 py-1 rounded-full border border-blue-500/25">
                <Award size={11} className="text-blue-400" />
                <span className="text-[8px] font-black text-blue-400">\u05de\u05d5\u05de\u05dc\u05e5</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4 flex-grow">
              <div className="space-y-3">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-black text-white">\u20aa1,499</span>
                  <span className="text-white/30 text-xs mr-1">/\u05d7\u05d5\u05d3\u05e9</span>
                  <span className="text-xs line-through text-white/25">\u20aa2,499</span>
                  <span className="text-[8px] font-black bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded-full border border-green-500/25">40% OFF</span>
                </div>
                <div className="space-y-2">
                  {['\u05e2\u05d3 50 \u05e8\u05db\u05d1\u05d9\u05dd \u05d1\u05d7\u05d5\u05d3\u05e9', '\u05e6\u05d9\u05dc\u05d5\u05de\u05d9\u05dd \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d9\u05dd', '\u05d3\u05e4\u05d9 \u05e0\u05d7\u05d9\u05ea\u05d4 \u05de\u05d5\u05ea\u05d0\u05de\u05d9\u05dd', '\u05de\u05e0\u05d4\u05dc \u05dc\u05e7\u05d5\u05d7 \u05d9\u05d9\u05e2\u05d5\u05d3\u05d9'].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/75 text-[10px]">
                      <div className="w-4 h-4 rounded-full bg-blue-500/15 flex items-center justify-center">
                        <Check size={8} className="text-blue-400" />
                      </div>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {features.map((item, i) => <FeatureBox key={i} icon={item.icon} text={item.text} color={color} />)}
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setFlipped(true)}
                className="flex-1 py-2.5 rounded-xl font-black text-xs transition-all hover:opacity-80"
                style={{ border: `1px solid ${borderColor}`, color, background: 'rgba(59,130,246,0.08)' }}>\u05e4\u05e8\u05d8\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd</button>
              <button type="button" onClick={() => onSelect(pkg)}
                className="flex-1 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95">
                <Briefcase size={12} />\u05d4\u05ea\u05d7\u05dc \u05e2\u05db\u05e9\u05d9\u05d5
              </button>
            </div>
          </div>
        </div>
        <div className="flip-card-back">
          <FlipCardBack pkg={pkg} details={packageDetails.business} color={color} borderColor={borderColor}
            badge="\ud83c\udfe2" onSelect={onSelect} onBack={() => setFlipped(false)} />
        </div>
      </div>
    </div>
  );
};

// BitLogo / PayBoxLogo (unchanged)
const BitLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const h = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const fontSize = size === 'sm' ? 11 : size === 'lg' ? 16 : 13;
  const px = size === 'sm' ? 8 : 12;
  return (
    <div className="inline-flex items-center justify-center rounded-lg overflow-hidden shrink-0"
      style={{ background: '#0D3D3D', height: h, paddingLeft: px, paddingRight: px, gap: 4 }}>
      <svg width={fontSize * 0.5} height={h * 0.6} viewBox="0 0 9 18" fill="none">
        <circle cx="4.5" cy="2" r="2" fill="#00E5CC" />
        <rect x="2.5" y="6" width="4" height="10" rx="2" fill="#00E5CC" />
      </svg>
      <span style={{ fontFamily: '"Nunito", Arial Rounded MT Bold, Arial, sans-serif', fontWeight: 800, fontSize, color: '#00E5CC', letterSpacing: '-0.5px', lineHeight: 1 }}>
        bit
      </span>
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
        <circle cx="12" cy="6" r="3" stroke="white" strokeWidth="2" fill="none" />
        <path d="M5 10 L9 14 L9 20 L15 20 L15 14 L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 700, fontSize, color: '#ffffff', letterSpacing: '0.2px', lineHeight: 1 }}>
        PayBox
      </span>
    </div>
  );
};

// OrderStatusCheck (unchanged)
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
        setOrderDetails({ id: orderNumber, date: '2024-02-23', package: 'VIP LUXURY', status: '\u05d1\u05ea\u05d4\u05dc\u05d9\u05da', car: '\u05de\u05d6\u05d3\u05d4 3 2020' });
      } else setStatus('notfound');
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300 }}
      className="glass-card p-6 space-y-5">
      <div className="text-center space-y-2">
        <motion.div className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-brand-red/30"
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <Search size={28} className="text-white" />
        </motion.div>
        <h3 className="text-xl font-black">\u05d1\u05d3\u05d9\u05e7\u05ea \u05e1\u05d8\u05d8\u05d5\u05e1 \u05d4\u05d6\u05de\u05e0\u05d4</h3>
        <p className="text-white/50 text-xs">\u05d4\u05db\u05e0\u05e1 \u05d0\u05ea \u05de\u05e1\u05e4\u05e8 \u05d4\u05d4\u05d6\u05de\u05e0\u05d4 \u05e9\u05e7\u05d9\u05d1\u05dc\u05ea \u05d1\u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4</p>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <input type="text" placeholder="\u05dc\u05d3\u05d5\u05d2\u05de\u05d4: #12345" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-center text-base font-black tracking-widest focus:border-brand-red focus:outline-none transition-all" />
          {orderNumber && (
            <motion.button onClick={() => setOrderNumber('')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"><X size={14} /></motion.button>
          )}
        </div>
        <motion.button onClick={checkOrder} disabled={status === 'loading'}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-gradient-to-r from-brand-red to-red-600 rounded-xl font-black text-sm shadow-xl disabled:opacity-50 relative overflow-hidden group">
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative">
            {status === 'loading'
              ? <span className="flex items-center justify-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />\u05d1\u05d5\u05d3\u05e7...</span>
              : '\u05d1\u05d3\u05d5\u05e7 \u05e1\u05d8\u05d8\u05d5\u05e1'}
          </span>
        </motion.button>
        <AnimatePresence>
          {status === 'found' && orderDetails && (
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-green-400 text-xs font-black">\u05e1\u05d8\u05d8\u05d5\u05e1:</span>
                <span className="bg-green-500/20 text-green-400 px-3 py-0.5 rounded-full text-xs font-black border border-green-500/30">{orderDetails.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[['\u05de\u05e1\u05e4\u05e8 \u05d4\u05d6\u05de\u05e0\u05d4', `#${orderDetails.id}`], ['\u05ea\u05d0\u05e8\u05d9\u05da', orderDetails.date], ['\u05d7\u05d1\u05d9\u05dc\u05d4', orderDetails.package], ['\u05e8\u05db\u05d1', orderDetails.car]].map(([l, v]) => (
                  <div key={l}><span className="text-white/40">{l}:</span><div className="font-black text-white">{v}</div></div>
                ))}
              </div>
            </motion.div>
          )}
          {status === 'notfound' && (
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 text-center">
              <X size={24} className="text-red-400 mx-auto mb-1" />
              <p className="text-red-400 font-black text-sm">\u05d4\u05d4\u05d6\u05de\u05e0\u05d4 \u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d4</p>
              <p className="text-white/40 text-xs mt-1">\u05d1\u05d3\u05d5\u05e7 \u05d0\u05ea \u05d4\u05de\u05e1\u05e4\u05e8 \u05d5\u05e0\u05e1\u05d4 \u05e9\u05e0\u05d9\u05ea</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={onClose}
        className="w-full py-2.5 rounded-xl text-xs font-bold border border-brand-red/30 bg-brand-red/10 hover:bg-brand-red hover:border-brand-red text-brand-red hover:text-white transition-all flex items-center justify-center gap-2">
        <ArrowLeft size={12} />\u05d7\u05d6\u05d5\u05e8 \u05dc\u05d3\u05e3 \u05d4\u05d1\u05d9\u05ea
      </motion.button>
    </motion.div>
  );
};

// ChangePackageModal (unchanged)
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
    if (pkg.id === 'vip') return { border: 'border-amber-500/40', bg: 'bg-amber-500/10', badge: '\ud83d\udc51', color: 'text-amber-400', activeBorder: 'border-amber-400' };
    if (pkg.id === 'duo') return { border: 'border-purple-500/40', bg: 'bg-purple-500/10', badge: '\ud83d\ude97\ud83d\ude97', color: 'text-purple-400', activeBorder: 'border-purple-400' };
    if (pkg.id === 'business') return { border: 'border-blue-500/40', bg: 'bg-blue-500/10', badge: '\ud83c\udfe2', color: 'text-blue-400', activeBorder: 'border-blue-400' };
    if (pkg.id === 'equipment-heavy') return { border: 'border-orange-500/40', bg: 'bg-orange-500/10', badge: '\ud83d\ude9c', color: 'text-orange-400', activeBorder: 'border-orange-400' };
    if (pkg.id === 'equipment-light') return { border: 'border-slate-500/40', bg: 'bg-slate-500/10', badge: '\ud83d\udd27', color: 'text-slate-400', activeBorder: 'border-slate-400' };
    if (pkg.id === 'transport') return { border: 'border-sky-500/40', bg: 'bg-sky-500/10', badge: '\ud83d\ude8c', color: 'text-sky-400', activeBorder: 'border-sky-400' };
    if (pkg.id === 'premium') return { border: 'border-brand-red/40', bg: 'bg-brand-red/10', badge: '\ud83d\udc8e', color: 'text-brand-red', activeBorder: 'border-brand-red' };
    if (pkg.id === 'pro') return { border: 'border-brand-red/30', bg: 'bg-brand-red/5', badge: '\u2b50', color: 'text-brand-red', activeBorder: 'border-brand-red' };
    return { border: 'border-white/10', bg: 'bg-white/5', badge: '\ud83d\ude80', color: 'text-white/60', activeBorder: 'border-white/40' };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.18 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{ background: 'linear-gradient(145deg, #111116 0%, #0a0a0e 100%)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)' }}>
            <div className="sticky top-0 z-10 px-5 py-4 border-b border-white/8 flex items-center justify-between"
              style={{ background: 'rgba(11,11,16,0.97)', backdropFilter: 'blur(8px)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                  <RefreshCw size={15} className="text-brand-red" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">\u05d4\u05d7\u05dc\u05e4\u05ea \u05d7\u05d1\u05d9\u05dc\u05d4</h3>
                  <p className="text-[10px] text-white/40 mt-0.5">\u05d1\u05d7\u05e8 \u05d7\u05d1\u05d9\u05dc\u05d4 \u05d0\u05d7\u05e8\u05ea \u05dc\u05d4\u05d6\u05de\u05e0\u05d4</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X size={16} className="text-white/50" />
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allPackages.map((pkg) => {
                const style = getPackageStyle(pkg);
                const isActive = pkg.id === currentPackageId;
                return (
                  <button key={pkg.id} onClick={() => { onSelect(pkg); onClose(); }}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-right hover:scale-[1.02] active:scale-[0.98] ${isActive ? `${style.activeBorder} ${style.bg}` : `${style.border} bg-white/2 hover:bg-white/4`}`}>
                    <div className={`w-10 h-10 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center text-lg shrink-0`}>{style.badge}</div>
                    <div className="flex-1 min-w-0 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {isActive && <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-white/10 text-white/60">\u05e0\u05d5\u05db\u05d7\u05d9\u05ea</span>}
                        <span className={`text-sm font-black ${isActive ? style.color : 'text-white'}`}>{pkg.name}</span>
                      </div>
                      <p className="text-[9px] text-white/40 mt-0.5 truncate">{pkg.features[0] || ''}</p>
                    </div>
                    <div className={`text-base font-black shrink-0 ${isActive ? style.color : 'text-white'}`}>{pkg.price}</div>
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

// CarDetailsForm (unchanged from original)
const CarDetailsForm = ({ formData, setFormData, onNext, selectedPackage, onChangePackage }: {
  formData: any, setFormData: (data: any) => void, onNext: () => void,
  selectedPackage: Package | null, onChangePackage: () => void
}) => {
  const isDuo = selectedPackage?.id === 'duo';
  const isBusiness = selectedPackage?.id === 'business';
  const isTransport = selectedPackage?.id === 'transport';
  const accentColor = isBusiness ? COLORS.business.primary : isDuo ? COLORS.duo.primary : isTransport ? COLORS.transport.primary : COLORS.brand;

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      transition={{ type: 'spring', stiffness: 300 }} className="space-y-5">
      <motion.div className="flex items-center justify-between p-3 rounded-xl border border-white/8 bg-white/3" whileHover={{ scale: 1.02 }}>
        <div className="flex items-center gap-2">
          <motion.div className="w-8 h-8 rounded-lg bg-brand-red/10 flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            {selectedPackage?.id === 'vip' ? <Crown size={14} className="text-amber-400" /> :
              selectedPackage?.id === 'duo' ? <Car size={14} className="text-purple-400" /> :
              selectedPackage?.id === 'business' ? <Building2 size={14} className="text-blue-400" /> :
              selectedPackage?.id === 'transport' ? <Bus size={14} className="text-sky-400" /> :
              <Car size={14} className="text-brand-red" />}
          </motion.div>
          <div>
            <div className="text-[9px] text-white/40">\u05d7\u05d1\u05d9\u05dc\u05d4 \u05e0\u05d1\u05d7\u05e8\u05ea</div>
            <div className="text-xs font-black text-white">{selectedPackage?.name}</div>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onChangePackage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black border border-white/10 text-white/50 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all">
          <RefreshCw size={10} />\u05d4\u05d7\u05dc\u05e3 \u05d7\u05d1\u05d9\u05dc\u05d4
        </motion.button>
      </motion.div>

      {isBusiness ? (
        <>
          <div className="text-center space-y-2">
            <motion.div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Building2 size={28} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-black">\u05e4\u05e8\u05d8\u05d9 \u05d4\u05e1\u05d5\u05db\u05e0\u05d5\u05ea</h3>
            <p className="text-white/50 text-xs">\u05d4\u05db\u05e0\u05e1 \u05d0\u05ea \u05e4\u05e8\u05d8\u05d9 \u05d4\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05e9\u05dc\u05da</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-blue-400/70">\u05e9\u05dd \u05d4\u05e1\u05d5\u05db\u05e0\u05d5\u05ea *</label>
              <input type="text" placeholder="\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05d4\u05e8\u05db\u05d1 \u05e9\u05dc\u05d9" value={formData.agencyName || ''}
                onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all" />
            </div>
            {[
              { label: '\u05e9\u05dd \u05d0\u05d9\u05e9 \u05e7\u05e9\u05e8 *', ph: '\u05d9\u05e9\u05e8\u05d0\u05dc \u05d9\u05e9\u05e8\u05d0\u05dc\u05d9', k: 'fullName' },
              { label: '\u05d8\u05dc\u05e4\u05d5\u05df *', ph: '050-1234567', k: 'phone', type: 'tel' },
              { label: '\u05de\u05d9\u05e7\u05d5\u05dd \u05d4\u05e1\u05d5\u05db\u05e0\u05d5\u05ea *', ph: '\u05ea\u05dc \u05d0\u05d1\u05d9\u05d1', k: 'location' },
              { label: '\u05db\u05de\u05d5\u05ea \u05e8\u05db\u05d1\u05d9\u05dd \u05d1\u05d7\u05d5\u05d3\u05e9 *', ph: '10-20 \u05e8\u05db\u05d1\u05d9\u05dd', k: 'monthlyCars' },
            ].map(f => (
              <div key={f.k} className="space-y-1">
                <label className="text-xs font-black text-blue-400/70">{f.label}</label>
                <input type={(f as any).type || 'text'} placeholder={f.ph} value={formData[f.k] || ''}
                  onChange={(e) => setFormData({ ...formData, [f.k]: e.target.value })}
                  className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all" />
              </div>
            ))}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-blue-400/70">\u05e4\u05e8\u05d8\u05d9\u05dd \u05e0\u05d5\u05e1\u05e4\u05d9\u05dd</label>
              <textarea placeholder="\u05e1\u05e4\u05e8 \u05dc\u05e0\u05d5 \u05e2\u05dc \u05d4\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05e9\u05dc\u05da..." value={formData.agencyDetails || ''}
                onChange={(e) => setFormData({ ...formData, agencyDetails: e.target.value })}
                rows={3} className="w-full px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm focus:border-blue-400 focus:outline-none transition-all resize-none" />
            </div>
          </div>
          <motion.div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-start gap-2" whileHover={{ scale: 1.02 }}>
            <Building2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
            <p className="text-[9px] text-blue-300/70 leading-relaxed">\u05dc\u05d0\u05d7\u05e8 \u05d4\u05e9\u05dc\u05d9\u05d7\u05d4, \u05e0\u05e6\u05d9\u05d2 \u05d9\u05e6\u05d5\u05e8 \u05d0\u05d9\u05ea\u05da \u05e7\u05e9\u05e8 \u05ea\u05d5\u05da 2 \u05e9\u05e2\u05d5\u05ea \u05dc\u05ea\u05d9\u05d0\u05d5\u05dd \u05e4\u05e8\u05d8\u05d9\u05dd.</p>
          </motion.div>
        </>
      ) : isDuo ? (
        <>
          <div className="text-center space-y-2">
            <motion.div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-purple-500/30"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Car size={28} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-black">\u05e4\u05e8\u05d8\u05d9 \u05e9\u05e0\u05d9 \u05d4\u05e8\u05db\u05d1\u05d9\u05dd</h3>
            <p className="text-white/50 text-xs">\u05de\u05dc\u05d0 \u05e4\u05e8\u05d8\u05d9\u05dd \u05e2\u05d1\u05d5\u05e8 \u05db\u05dc \u05d0\u05d7\u05d3 \u05de\u05d4\u05e8\u05db\u05d1\u05d9\u05dd</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[{ l: '\u05e9\u05dd \u05de\u05dc\u05d0 *', p: '\u05d9\u05e9\u05e8\u05d0\u05dc \u05d9\u05e9\u05e8\u05d0\u05dc\u05d9', k: 'fullName' }, { l: '\u05d8\u05dc\u05e4\u05d5\u05df *', p: '050-1234567', k: 'phone' }].map(f => (
              <div key={f.k} className="space-y-1">
                <label className="text-xs font-black text-white/60">{f.l}</label>
                <input type="text" placeholder={f.p} value={formData[f.k]} onChange={(e) => setFormData({ ...formData, [f.k]: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
              </div>
            ))}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-white/60">\u05de\u05d9\u05e7\u05d5\u05dd *</label>
              <input type="text" placeholder="\u05ea\u05dc \u05d0\u05d1\u05d9\u05d1" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
            </div>
          </div>
          {[1, 2].map(carNum => (
            <motion.div key={carNum} className="rounded-xl border border-purple-500/25 overflow-hidden" whileHover={{ scale: 1.01 }}>
              <div className="px-4 py-2.5 bg-purple-500/10 border-b border-purple-500/20 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-[10px] font-black text-purple-400">{carNum}</span>
                </div>
                <span className="text-xs font-black text-purple-300">\u05e8\u05db\u05d1 {carNum === 1 ? '\u05e8\u05d0\u05e9\u05d5\u05df' : '\u05e9\u05e0\u05d9'}</span>
              </div>
              <div className="p-4 grid md:grid-cols-2 gap-3">
                {[
                  { label: '\u05d3\u05d2\u05dd', ph: carNum === 1 ? '\u05de\u05d0\u05d6\u05d3\u05d4 3' : '\u05d8\u05d5\u05d9\u05d5\u05d8\u05d4 \u05e7\u05d5\u05e8\u05d5\u05dc\u05d4', field: carNum === 1 ? 'model' : 'model2' },
                  { label: '\u05e9\u05e0\u05d4', ph: carNum === 1 ? '2020' : '2019', field: carNum === 1 ? 'year' : 'year2' },
                  { label: "\u05e7\u05d9\u05dc\u05d5\u05de\u05d8\u05e8\u05d0\u05d6'", ph: carNum === 1 ? '50,000' : '70,000', field: carNum === 1 ? 'mileage' : 'mileage2' },
                  { label: '\u05de\u05d7\u05d9\u05e8', ph: carNum === 1 ? '89,000 \u20aa' : '65,000 \u20aa', field: carNum === 1 ? 'price' : 'price2' },
                  { label: '\u05e2\u05dc\u05d9\u05d9\u05d4 \u05dc\u05db\u05d1\u05d9\u05e9', ph: carNum === 1 ? '2020' : '2019', field: carNum === 1 ? 'registration' : 'registration2' },
                  { label: '\u05d8\u05e1\u05d8 \u05e2\u05d3', ph: carNum === 1 ? '12/2025' : '06/2025', field: carNum === 1 ? 'testUntil' : 'testUntil2' },
                ].map(f => (
                  <div key={f.field} className="space-y-1">
                    <label className="text-xs font-black text-white/50">{f.label} *</label>
                    <input type="text" placeholder={f.ph} value={(formData as any)[f.field] || ''}
                      onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-purple-400 focus:outline-none transition-all" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </>
      ) : isTransport ? (
        <>
          <div className="text-center space-y-2">
            <motion.div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-sky-500/30"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Bus size={28} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-black">\u05e4\u05e8\u05d8\u05d9 \u05db\u05dc\u05d9 \u05d4\u05e8\u05db\u05d1 \u05d4\u05de\u05e1\u05d7\u05e8\u05d9</h3>
            <p className="text-white/50 text-xs">\u05d4\u05db\u05e0\u05e1 \u05e4\u05e8\u05d8\u05d9\u05dd \u05de\u05dc\u05d0\u05d9\u05dd \u05dc\u05e7\u05d1\u05dc\u05ea \u05e4\u05e8\u05e1\u05d5\u05dd \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: '\u05e1\u05d5\u05d2 \u05d4\u05e8\u05db\u05d1 *', ph: '\u05d0\u05d5\u05d8\u05d5\u05d1\u05d5\u05e1 / \u05de\u05d9\u05e0\u05d9\u05d1\u05d5\u05e1 / \u05d5\u05d5\u05d0\u05df', k: 'model', cls: 'border-sky-500/20 bg-sky-500/5 focus:border-sky-400' },
              { label: '\u05e9\u05e0\u05ea \u05d9\u05d9\u05e6\u05d5\u05e8 *', ph: '2018', k: 'year', cls: 'border-sky-500/20 bg-sky-500/5 focus:border-sky-400' },
              { label: "\u05e7\u05d9\u05dc\u05d5\u05de\u05d8\u05e8\u05d0\u05d6' *", ph: '250,000', k: 'mileage', cls: 'border-sky-500/20 bg-sky-500/5 focus:border-sky-400' },
              { label: '\u05de\u05d7\u05d9\u05e8 \u05de\u05d1\u05d5\u05e7\u05e9 *', ph: '180,000 \u20aa', k: 'price', cls: 'border-sky-500/20 bg-sky-500/5 focus:border-sky-400' },
              { label: '\u05de\u05e1\u05e4\u05e8 \u05de\u05d5\u05e9\u05d1\u05d9\u05dd', ph: '50 / 25 / 9', k: 'seats', cls: 'border-sky-500/20 bg-sky-500/5 focus:border-sky-400' },
              { label: '\u05d8\u05e1\u05d8 \u05e2\u05d3 *', ph: '06/2026', k: 'testUntil', cls: 'border-sky-500/20 bg-sky-500/5 focus:border-sky-400' },
              { label: '\u05e9\u05dd \u05de\u05dc\u05d0 *', ph: '\u05d9\u05e9\u05e8\u05d0\u05dc \u05d9\u05e9\u05e8\u05d0\u05dc\u05d9', k: 'fullName', cls: 'border-sky-500/20 bg-sky-500/5 focus:border-sky-400' },
              { label: '\u05d8\u05dc\u05e4\u05d5\u05df *', ph: '050-1234567', k: 'phone', cls: 'border-sky-500/20 bg-sky-500/5 focus:border-sky-400', type: 'tel' },
            ].map(f => (
              <div key={f.k} className="space-y-1">
                <label className="text-xs font-black text-sky-400/70">{f.label}</label>
                <input type={(f as any).type || 'text'} placeholder={f.ph} value={(formData as any)[f.k] || ''}
                  onChange={(e) => setFormData({ ...formData, [f.k]: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-all ${f.cls}`} />
              </div>
            ))}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-black text-sky-400/70">\u05de\u05d9\u05e7\u05d5\u05dd *</label>
              <input type="text" placeholder="\u05ea\u05dc \u05d0\u05d1\u05d9\u05d1" value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-sky-500/5 border border-sky-500/20 rounded-lg text-sm focus:border-sky-400 focus:outline-none transition-all" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center space-y-2">
            <motion.div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Car size={28} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-black">\u05e4\u05e8\u05d8\u05d9 \u05d4\u05e8\u05db\u05d1</h3>
            <p className="text-white/50 text-xs">\u05d4\u05db\u05e0\u05e1 \u05d0\u05ea \u05e4\u05e8\u05d8\u05d9 \u05d4\u05e8\u05db\u05d1 \u05e9\u05d1\u05e8\u05e6\u05d5\u05e0\u05da \u05dc\u05e4\u05e8\u05e1\u05dd</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: '\u05d3\u05d2\u05dd \u05e8\u05db\u05d1', ph: '\u05de\u05d0\u05d6\u05d3\u05d4 3', field: 'model' },
              { label: '\u05e9\u05e0\u05d4', ph: '2020', field: 'year' },
              { label: "\u05e7\u05d9\u05dc\u05d5\u05de\u05d8\u05e8\u05d0\u05d6'", ph: '50,000', field: 'mileage' },
              { label: '\u05de\u05d7\u05d9\u05e8 \u05de\u05d1\u05d5\u05e7\u05e9', ph: '89,000 \u20aa', field: 'price' },
              { label: '\u05ea\u05d0\u05e8\u05d9\u05da \u05e2\u05dc\u05d9\u05d9\u05d4 \u05dc\u05db\u05d1\u05d9\u05e9', ph: '2020', field: 'registration' },
              { label: '\u05d8\u05e1\u05d8 \u05e2\u05d3', ph: '12/2024', field: 'testUntil' },
            ].map(f => (
              <div key={f.field} className="space-y-1">
                <label className="text-xs font-black text-white/60">{f.label} *</label>
                <input type="text" placeholder={f.ph} value={(formData as any)[f.field] || ''}
                  onChange={(e) => setFormData({ ...formData, [f.field]: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all" />
              </div>
            ))}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-black text-white/60">\u05de\u05d9\u05e7\u05d5\u05dd \u05d1\u05d0\u05e8\u05e5 *</label>
              <input type="text" placeholder="\u05ea\u05dc \u05d0\u05d1\u05d9\u05d1" value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all" />
            </div>
          </div>
          <div className="space-y-3">
            {[{ label: '\u05e9\u05dd \u05de\u05dc\u05d0 *', ph: '\u05d9\u05e9\u05e8\u05d0\u05dc \u05d9\u05e9\u05e8\u05d0\u05dc\u05d9', k: 'fullName', type: 'text' }, { label: '\u05d8\u05dc\u05e4\u05d5\u05df *', ph: '050-1234567', k: 'phone', type: 'tel' }].map(f => (
              <div key={f.k} className="space-y-1">
                <label className="text-xs font-black text-white/60">{f.label}</label>
                <input type={f.type} placeholder={f.ph} value={formData[f.k]}
                  onChange={(e) => setFormData({ ...formData, [f.k]: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:border-brand-red focus:outline-none transition-all" />
              </div>
            ))}
          </div>
        </>
      )}

      <motion.button onClick={onNext} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="w-full py-3 rounded-xl font-black text-sm shadow-xl transition-all mt-2 relative overflow-hidden group"
        style={{
          background: selectedPackage?.id === 'business' ? 'linear-gradient(135deg, #3b82f6, #7c3aed)' :
            selectedPackage?.id === 'duo' ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' :
            selectedPackage?.id === 'transport' ? 'linear-gradient(135deg, #0284c7, #0369a1)' :
            'linear-gradient(135deg, #c8102e, #9b0d24)',
        }}>
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative">\u05dc\u05d4\u05de\u05e9\u05da \u05dc\u05ea\u05e9\u05dc\u05d5\u05dd</span>
      </motion.button>
    </motion.div>
  );
};

// PaymentForm (unchanged)
const PaymentForm = ({ formData, setFormData, selectedPackage, onSubmit, loading, onBack, onChangePackage }: {
  formData: any, setFormData: (data: any) => void, selectedPackage: Package | null,
  onSubmit: () => void, loading: boolean, onBack: () => void, onChangePackage: () => void
}) => {
  const [paymentMethod, setPay
