import React, { useState, useEffect, useRef, memo } from 'react';
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
  Github,
  MessageCircle,
  Music,
  ThumbsUp as ThumbsUpIcon
} from 'lucide-react';
import { translations, Language } from './translations';

// ============================================================
// GLOBAL STYLES — Premium Design System
// ============================================================
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;800;900&family=Rubik:wght@300;400;500;700;800;900&display=swap');

  :root {
    --brand-red: #e8112d;
    --brand-red-dark: #b5001f;
    --brand-red-glow: rgba(232, 17, 45, 0.35);
    --bg-primary: #050507;
    --bg-secondary: #09090d;
    --bg-card: rgba(255,255,255,0.028);
    --border-subtle: rgba(255,255,255,0.06);
    --border-medium: rgba(255,255,255,0.1);
    --text-primary: #f8f8fc;
    --text-secondary: rgba(255,255,255,0.5);
    --text-muted: rgba(255,255,255,0.28);
    --gold: #d4af37;
    --gold-light: #f5d060;
  }

  * { box-sizing: border-box; }

  body {
    font-family: 'Heebo', 'Rubik', 'Arial', sans-serif;
    background: var(--bg-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025;
    pointer-events: none;
    z-index: 0;
  }

  .text-brand-red { color: var(--brand-red) !important; }
  .bg-brand-red { background-color: var(--brand-red) !important; }
  .border-brand-red { border-color: var(--brand-red) !important; }

  /* Premium gradient text */
  .gradient-text-red {
    background: linear-gradient(135deg, #ff3d5e 0%, var(--brand-red) 50%, var(--brand-red-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-text-gold {
    background: linear-gradient(135deg, var(--gold-light), var(--gold), #a67c00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Premium button */
  .btn-primary {
    background: linear-gradient(135deg, var(--brand-red), var(--brand-red-dark)) !important;
    box-shadow: 0 4px 24px var(--brand-red-glow);
  }
  .btn-primary:hover { box-shadow: 0 6px 32px var(--brand-red-glow); }

  /* Glass card */
  .glass-card {
    background: var(--bg-card);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
  }

  .glass-card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .glass-card-hover:hover {
    background: rgba(255,255,255,0.045);
    border-color: rgba(255,255,255,0.1);
    transform: translateY(-2px);
  }

  /* Input field */
  .input-field {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border-medium);
    border-radius: 12px;
    padding: 12px 16px;
    color: var(--text-primary);
    width: 100%;
    transition: all 0.25s;
    font-size: 14px;
    font-family: inherit;
  }
  .input-field::placeholder { color: var(--text-muted); }
  .input-field:focus {
    border-color: var(--brand-red);
    outline: none;
    background: rgba(232, 17, 45, 0.06);
    box-shadow: 0 0 0 3px rgba(232, 17, 45, 0.1);
  }

  /* Scrollbar */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  .custom-scrollbar::-webkit-scrollbar { width: 3px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--brand-red); border-radius: 10px; }

  /* Card back scroll */
  .card-back-scroll {
    flex: 1 1 0;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .card-back-scroll::-webkit-scrollbar { width: 2px; }
  .card-back-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }

  /* Shimmer animation */
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .shimmer-text {
    background: linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.5) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  /* Pulse glow */
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(232,17,45,0.3); }
    50% { box-shadow: 0 0 40px rgba(232,17,45,0.6); }
  }

  /* Floating animation */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  .float-animation { animation: float 4s ease-in-out infinite; }

  /* Section divider */
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  }

  /* Premium border gradient */
  .border-gradient-red {
    border: 1px solid transparent;
    background: linear-gradient(#0d0d12, #0d0d12) padding-box,
                linear-gradient(135deg, rgba(232,17,45,0.5), rgba(232,17,45,0.1)) border-box;
  }
`;

// ============================================================
// SECTION HEADER COMPONENT — Enhanced
// ============================================================
const SectionHeader = ({ 
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
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
        style={{ background: `${eyebrowColor}12`, border: `1px solid ${eyebrowColor}28` }}
      >
        <span style={{ color: eyebrowColor }}>{eyebrowIcon}</span>
        <span className="text-[11px] font-black tracking-[0.15em] uppercase" style={{ color: eyebrowColor }}>{eyebrow}</span>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-black"
      >
        {title}{' '}
        <span style={{ color: highlightColor }}>{titleHighlight}</span>
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-sm max-w-2xl mx-auto leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        {subtitle}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-8 pt-2"
      >
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

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

// --- Navbar — Premium Redesign ---
const Navbar = ({ lang, setLang, isAdmin, onLogout, siteSettings, setView }: { lang: Language, setLang: (l: Language) => void, isAdmin?: boolean, onLogout?: () => void, siteSettings: any, setView: (v: string) => void }) => {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.nav 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2' 
          : 'py-4'
      }`}
      style={{
        background: scrolled 
          ? 'rgba(5, 5, 7, 0.9)' 
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer select-none"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div 
              className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)', boxShadow: '0 4px 16px rgba(232,17,45,0.35)' }}
            >
              <Car size={20} className="text-white relative z-10" />
              <div className="absolute inset-0 bg-white/10" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 70%)' }} />
            </div>
            <div>
              <div className="text-[22px] font-black tracking-tight leading-none">
                <span style={{ color: '#e8112d' }}>YOUGO</span>
                <span className="text-white ml-1">ISRAEL</span>
              </div>
              <div className="text-[9px] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {siteSettings.positioning_line_he || t.positioningLine}
              </div>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: '#how-it-works', label: 'איך זה עובד' },
              { href: '#packages', label: 'חבילות' },
              { href: '#faq', label: 'שאלות' }
            ].map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative px-4 py-2 text-sm font-bold rounded-lg transition-all group"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#fff'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.target as HTMLElement).style.background = 'transparent'; }}
              >
                {item.label}
              </motion.a>
            ))}
            
            <motion.button 
              onClick={() => setView('check-status')}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="px-4 py-2 text-sm font-bold rounded-lg transition-all"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = '#fff'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              סטטוס הזמנה
            </motion.button>

            <div className="w-px h-5 mx-2" style={{ background: 'rgba(255,255,255,0.1)' }} />
            
            <motion.button 
              onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)' }}
            >
              <Globe size={14} />
              {lang === 'he' ? 'العربية' : 'עברית'}
            </motion.button>

            {isAdmin && (
              <motion.button 
                onClick={onLogout}
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="mr-1 p-2 rounded-lg transition-all"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                <LogOut size={16} />
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={20} />
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
              transition={{ duration: 0.25 }}
              className="md:hidden mt-3 pb-3 border-t overflow-hidden"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="pt-3 space-y-1">
                {[
                  { href: '#how-it-works', label: 'איך זה עובד' },
                  { href: '#packages', label: 'חבילות' },
                  { href: '#faq', label: 'שאלות' }
                ].map((item, i) => (
                  <motion.a key={item.href} href={item.href} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileMenuOpen(false)} 
                    className="block py-3 px-4 rounded-xl text-sm font-bold transition-all"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.button initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}
                  onClick={() => { setView('check-status'); setMobileMenuOpen(false); }}
                  className="w-full text-right py-3 px-4 rounded-xl text-sm font-bold"
                  style={{ color: 'rgba(255,255,255,0.65)' }}>
                  סטטוס הזמנה
                </motion.button>
                <motion.button initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  onClick={() => setLang(lang === 'he' ? 'ar' : 'he')}
                  className="w-full flex items-center gap-2 py-3 px-4 rounded-xl text-sm font-bold mt-2"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}>
                  <Globe size={14} />
                  {lang === 'he' ? 'العربية' : 'עברית'}
                </motion.button>
              </div>
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

// --- Modal — Premium ---
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  const content = typeof children === 'string' ? children : '';
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/75 backdrop-blur-md" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl"
        style={{ 
          background: 'linear-gradient(145deg, #0e0e14 0%, #080810 100%)', 
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,17,45,0.5), transparent)' }} />
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-base font-black" style={{ color: '#e8112d' }}>{title}</h3>
            <motion.button onClick={onClose} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
              <X size={16} />
            </motion.button>
          </div>
          {content ? (
            <div className="text-sm leading-[1.85] custom-scrollbar" style={{ color: 'rgba(255,255,255,0.65)', maxHeight: '55vh', overflowY: 'auto' }}>
              {content.split('\n').map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} className="h-3" />;
                if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                  return <h4 key={i} className="font-black text-white mt-4 mb-1">{trimmed.replace(/\*\*/g, '')}</h4>;
                }
                return <p key={i} className="mb-1">{trimmed}</p>;
              })}
            </div>
          ) : children}
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================
// CARD BACK PANEL — Enhanced
// ============================================================
const CardBackPanel = ({
  pkg, details, color, badge, onSelect, onBack,
}: {
  pkg: Package; details: { title: string; content: string }; color: string; badge: React.ReactNode; onSelect: (p: Package) => void; onBack: () => void;
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
        background: `linear-gradient(160deg, ${color}16 0%, #0b0b12 40%, #070710 100%)`,
        border: `1px solid ${color}28`,
      }}
    >
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      <div className="shrink-0 flex items-center justify-between gap-2 px-4 pt-4 pb-3"
        style={{ borderBottom: `1px solid ${color}18`, background: `${color}08` }}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0" style={{ color }}>{badge}</span>
          <div className="min-w-0">
            <p className="text-[13px] font-black text-white truncate leading-tight">{pkg.name}</p>
            <p className="text-[9px] font-bold mt-[1px] uppercase tracking-wider" style={{ color: `${color}88` }}>מה כלול בחבילה</p>
          </div>
        </div>
        <button type="button" onClick={onBack}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black active:scale-95 transition-transform"
          style={{ border: `1px solid ${color}35`, color, background: `${color}12` }}>
          <ArrowLeft size={10} strokeWidth={2.5} /> חזרה
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex flex-col gap-1">
          {shown.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 px-2.5 py-[7px] rounded-xl"
              style={{ background: i % 2 === 0 ? `${color}08` : 'transparent' }}>
              <div className="shrink-0 mt-[3px] w-3.5 h-3.5 rounded-full flex items-center justify-center"
                style={{ background: `${color}20`, border: `1.5px solid ${color}45` }}>
                <Check size={7} strokeWidth={3} style={{ color }} />
              </div>
              <span className="text-[11.5px] leading-snug font-medium" style={{ color: 'rgba(255,255,255,0.82)' }}>{item}</span>
            </div>
          ))}
          {items.length > 8 && (
            <p className="text-center text-[9px] font-bold py-1.5" style={{ color: `${color}60` }}>+ {items.length - 8} הטבות נוספות</p>
          )}
        </div>
      </div>

      <div className="shrink-0 px-4 pt-3 pb-4" style={{ borderTop: `1px solid ${color}18` }}>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[22px] font-black text-white leading-none">{pkg.price}</span>
            {original && <span className="text-[9px] line-through" style={{ color: 'rgba(255,255,255,0.2)' }}>{original}</span>}
          </div>
          <span className="text-[9px] font-black px-2 py-[3px] rounded-full"
            style={{ color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
            חיסכון 15%
          </span>
        </div>
        <button type="button" onClick={() => onSelect(pkg)}
          className="w-full py-[10px] rounded-xl font-black text-[13px] text-white flex items-center justify-center gap-2 active:scale-95 transition-transform"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 6px 20px ${color}38` }}>
          <RocketIcon size={14} /> הזמן עכשיו
        </button>
      </div>
    </motion.div>
  );
};

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
• 3 ימי חשיפה מובטחת
• מחיר: 149 ₪ (במקום 175 ₪)
• חיסכון של 26 ₪ – 15% הנחה`
  },
  pro: {
    title: 'חבילת PRO',
    content: `🔥 מה כוללת החבילה?
• 4 תמונות מקצועיות עם עריכה מתקדמת
• פוסט ראשי + פוסט שמור מתוזמן אסטרטגית
• סטורי 14 ימים לחשיפה מתמדת
• עדיפות בתור הפרסומים
• טרגוט מתקדם לקהלים רלוונטיים

💎 למה בוחרים בה?
• יחס עלות-תועלת הכי גבוה בשוק
• מעל 1,000 מכירות מוכחות דרך החבילה
• זמן פרסום אופטימלי לרוב סוגי הרכבים

⏱️ פרטים טכניים
• משך פרסום: 14 ימים
• 7 ימי חשיפה מובטחת
• מחיר: 249 ₪ (במקום 293 ₪)
• חיסכון של 44 ₪ – 15% הנחה`
  },
  premium: {
    title: 'חבילת PREMIUM',
    content: `👑 מה כוללת החבילה?
• 8+ תמונות מקצועיות עם עריכה מרהיבה
• רילס וידאו + סרטון פרסומי מלא
• פוסט מותאם אישית עם אסטרטגיית תוכן
• סטורי 30 ימים לחשיפה מקסימלית
• עדיפות מלאה – תמיד ראשון בתור
• מעצב + קופירייטר אישי לכל מודעה
• עיצוב VIP עם מיתוג ייחודי

⏱️ פרטים טכניים
• משך פרסום: 30 ימים
• 14 ימי חשיפה מובטחת
• מחיר: 449 ₪ (במקום 528 ₪)
• חיסכון של 79 ₪ – 15% הנחה`
  },
  vip: {
    title: 'VIP LUXURY',
    content: `💎 מה מקבלים?
• 15+ תמונות סטילש ברמה קולנועית
• רילס VIP + סטורי עם עיצוב בלעדי
• 60 ימי פרסום פרמיום מלא
• ליווי אישי 24/7 – מנהל לקוח VIP
• טרגוט מתקדם לפי פרמטרים מדויקים
• עדיפות ראשונה בכל הפרסומים תמיד
• קידום ממומן בערוצים נוספים

🏎️ למי זה מיועד?
• רכבי יוקרה: פורשה, מרצדס, BMW, אאודי
• רכבי אספנות ונדירים בשוק

⏱️ פרטים טכניים
• משך פרסום: 60 ימים
• מחיר: 749 ₪ (במקום 882 ₪)
• חיסכון של 133 ₪ – 15% הנחה`
  },
  duo: {
    title: 'DUO DEAL',
    content: `🚗🚗 מה כוללת החבילה?
• פרסום מלא לשני רכבים במחיר מיוחד
• 4 תמונות מקצועיות לכל רכב בנפרד
• פוסט שיווקי נפרד ומותאם לכל רכב
• סטורי 14 ימים לכל אחד מהרכבים
• חשיפה כפולה לקהל מעוניין ורחב

💰 למה זה משתלם?
• במקום לשלם 598 ₪ – משלמים רק 349 ₪
• חיסכון עצום של 249 ₪ – 40% הנחה`
  },
  business: {
    title: 'BUSINESS',
    content: `🏢 מה מקבלים?
• עד 50 רכבים מפורסמים בחודש
• צילומים מקצועיים לכל רכב בנפרד
• דפי נחיתה מותאמים לסוכנות
• מנהל לקוח ייעודי – איש קשר אחד
• דוחות ביצועים חודשיים עם המלצות

📈 יתרונות לעסקים
• תוכנית שיווקית סדורה לאורך השנה
• חיסכון עצום בעלויות פרסום חודשיות

⏱️ פרטים טכניים
• מינוי חודשי מתחדש אוטומטית
• מחיר: 1,499 ₪ לחודש (במקום 2,499 ₪)
• חיסכון של 1,000 ₪ – 40% הנחה`
  },
  'equipment-heavy': {
    title: 'ציוד כבד',
    content: `🚜 מה כוללת החבילה?
• 10 תמונות מקצועיות של הציוד בשטח
• פוסט עם מפרט טכני מפורט ומדויק
• סטורי 21 ימים לחשיפה ממושכת
• חשיפה ייעודית לקהל קבלנים ומגזר הבנייה

🏗️ התמחות
• באגרים ומיני באגרים
• מחפרונים וקטרפילרים
• בולדוזרים ושופלים
• עגורנים וציוד הרמה כבד`
  },
  'equipment-light': {
    title: 'ציוד קל',
    content: `🔧 מה כוללת החבילה?
• 6 תמונות מקצועיות של הציוד
• פוסט מותאם עם תיאור טכני מלא
• סטורי 14 ימים לקהל רלוונטי
• חשיפה לאנשי מקצוע בתחום

🛠️ מתאים לכל סוגי הציוד הקל
• מלגזות וציוד מחסן
• פופקטים, ג'קים וציוד הרמה`
  },
  'transport': {
    title: 'תחבורה והסעות',
    content: `🚌 מה כוללת החבילה?
• 10 תמונות מקצועיות מבפנים ומבחוץ
• פוסט עם מפרט טכני מלא
• סטורי 21 ימים לחשיפה מתמשכת
• חשיפה ייעודית לחברות הסעות ותחבורה

🚐 מה אנחנו מפרסמים?
• אוטובוסים ומיניבוסים
• מיניוונים ורכבי הסעה פרטיים
• וואנים מסחריים
• משאיות קלות וכבדות`
  }
};

// ============================================================
// PACKAGE CARD — World-Class Premium Redesign
// ============================================================
const PackageCard = ({ pkg, lang, onSelect }: PackageCardProps) => {
  const t = translations[lang];
  const [showBack, setShowBack] = useState(false);

  const tierConfig = {
    basic:   { color: '#94a3b8', badge: <Rocket size={20} />, gradient: 'linear-gradient(145deg, #111318 0%, #0c0e12 100%)', glow: 'rgba(148,163,184,0.1)' },
    pro:     { color: '#e8112d', badge: <Flame size={20} />, gradient: 'linear-gradient(145deg, #160810 0%, #0f0508 100%)', glow: 'rgba(232,17,45,0.2)' },
    premium: { color: '#e8112d', badge: <Gem size={20} />, gradient: 'linear-gradient(145deg, #180a10 0%, #100407 100%)', glow: 'rgba(232,17,45,0.25)' },
  };
  const cfg = tierConfig[pkg.id as keyof typeof tierConfig] || tierConfig.basic;
  const isPro = pkg.id === 'pro';
  const isPremium = pkg.id === 'premium';
  const isBasic = pkg.id === 'basic';

  const featureDurations: Record<string, string> = { basic: '7 ימים', pro: '14 ימים', premium: '30 ימים' };
  const featureImages: Record<string, string> = { basic: '2 תמונות', pro: '4 תמונות', premium: '8+ תמונות' };

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem', perspective: '1000px' }}>
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
              background: cfg.gradient,
              border: `1.5px solid ${cfg.color}${isPremium ? '50' : isPro ? '40' : '28'}`,
              boxShadow: `0 20px 60px -15px ${cfg.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            {/* Premium top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent 0%, ${cfg.color} 50%, transparent 100%)` }} />

            {/* Radial glow */}
            <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% -20%, ${cfg.color}15 0%, transparent 70%)` }} />

            {/* Popular Badge */}
            {pkg.popular && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 text-white text-[8px] font-black py-1.5 px-2.5 rounded-full"
                style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)`, boxShadow: `0 4px 12px ${cfg.color}55` }}>
                <Trophy size={9} /> {t.mostPopular}
              </div>
            )}

            {/* Discount Badge */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1 text-[8px] font-black py-1 px-2 rounded-full"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
              <Zap size={7} />15% OFF
            </div>

            <div className="relative z-10 flex flex-col h-full p-5 gap-3.5 pt-12">
              {/* Icon + Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${cfg.color}22 0%, ${cfg.color}0e 100%)`,
                    border: `1.5px solid ${cfg.color}32`,
                    boxShadow: `0 6px 20px ${cfg.color}18`,
                  }}>
                  <span style={{ color: cfg.color }}>{cfg.badge}</span>
                </div>
                <div>
                  <h3 className="text-[20px] font-black tracking-tight leading-none"
                    style={{ color: isBasic ? '#e2e8f0' : cfg.color }}>
                    {pkg.name}
                  </h3>
                  <p className="text-[10px] font-semibold mt-1"
                    style={{ color: isBasic ? 'rgba(255,255,255,0.35)' : `${cfg.color}75` }}>
                    {isBasic ? '✓ פתרון מהיר ומקצועי' : isPro ? '✓ הבחירה הפופולרית' : '✓ חשיפה מקסימלית'}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: <Camera size={11} />, val: featureImages[pkg.id] || '' },
                  { icon: <Calendar size={11} />, val: featureDurations[pkg.id] || '' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: `${cfg.color}0e`, border: `1px solid ${cfg.color}1e` }}>
                    <span style={{ color: cfg.color }}>{s.icon}</span>
                    <span className="text-[10px] font-black text-white">{s.val}</span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-[38px] font-black text-white leading-none tracking-tight">{pkg.price}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] line-through" style={{ color: 'rgba(255,255,255,0.18)' }}>
                    ₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}
                  </span>
                  <span className="text-[9px] font-black" style={{ color: '#4ade80' }}>חיסכון 15%</span>
                </div>
              </div>

              <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}38, transparent)` }} />

              {/* Features */}
              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]"
                      style={{ background: `${cfg.color}1e`, border: `1.5px solid ${cfg.color}38` }}>
                      <Check size={9} strokeWidth={3} style={{ color: cfg.color }} />
                    </div>
                    <span className="text-[12px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.8)' }}>{feat}</span>
                  </div>
                ))}
                {pkg.features.length > 4 && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: `${cfg.color}15` }} />
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                      style={{ color: cfg.color, background: `${cfg.color}10`, border: `1px solid ${cfg.color}22` }}>
                      + {pkg.features.length - 4} עוד
                    </span>
                    <div className="flex-1 h-px" style={{ background: `${cfg.color}15` }} />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={() => setShowBack(true)}
                  className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all"
                  style={{ border: `1.5px solid ${cfg.color}32`, color: cfg.color, background: `${cfg.color}0e` }}>
                  פרטים נוספים
                </button>
                <button type="button" onClick={() => onSelect(pkg)}
                  className="flex-1 py-3 rounded-xl font-black text-xs text-white active:scale-95 transition-all"
                  style={{
                    background: isPremium || isPro
                      ? `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)`
                      : 'rgba(255,255,255,0.1)',
                    border: isPremium || isPro ? 'none' : '1.5px solid rgba(255,255,255,0.16)',
                    boxShadow: isPremium || isPro ? `0 6px 20px ${cfg.color}42` : 'none',
                  }}>
                  <span className="flex items-center justify-center gap-1.5">
                    <RocketIcon size={12} />{t.startOrder}
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
            badge={tierConfig[pkg.id as keyof typeof tierConfig]?.badge || <Rocket size={20} />}
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
const VIPPackageCard = ({ pkg, lang, onSelect }: PackageCardProps) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#d4af37';

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div key="front" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #1a1208 0%, #0f0b04 50%, #07060202 100%)', border: '1.5px solid rgba(212,175,55,0.42)', boxShadow: '0 24px 60px -15px rgba(212,175,55,0.28)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
            <div className="absolute top-0 left-0 right-0 h-52 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(212,175,55,0.1) 0%, transparent 70%)' }} />
            
            <div className="relative z-10 p-5 flex flex-col h-full gap-3.5 pt-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.28)' }}>
                  <Crown size={12} className="text-amber-400" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-300">VIP LUXURY</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.22), rgba(212,175,55,0.07))', border: '1.5px solid rgba(212,175,55,0.38)', boxShadow: '0 6px 20px rgba(212,175,55,0.18)' }}>
                  <Crown size={26} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-[22px] font-black leading-none gradient-text-gold">VIP LUXURY</h3>
                  <p className="text-[10px] mt-1" style={{ color: 'rgba(212,175,55,0.45)' }}>חבילת הפרסום האולטימטיבית</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[{ icon: <Camera size={11} />, val: '15+ תמונות' }, { icon: <Calendar size={11} />, val: '60 ימים' }, { icon: <Video size={11} />, val: 'רילס VIP' }, { icon: <Crown size={11} />, val: 'ליווי 24/7' }].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)' }}>
                    <span className="text-amber-400">{s.icon}</span>
                    <span className="text-[10px] font-black text-white">{s.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-black leading-none text-amber-400">₪749</span>
                <span className="text-xs line-through" style={{ color: 'rgba(255,255,255,0.18)' }}>₪882</span>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full border" style={{ color: '#86efac', background: 'rgba(74,222,128,0.1)', borderColor: 'rgba(74,222,128,0.2)' }}>חיסכון 15%</span>
              </div>
              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.28), transparent)' }} />
              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]" style={{ background: 'rgba(212,175,55,0.18)', border: '1.5px solid rgba(212,175,55,0.38)' }}>
                      <Check size={8} strokeWidth={3} className="text-amber-400" />
                    </div>
                    <span className="text-[12px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.8)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={() => setShowBack(true)} className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all"
                  style={{ border: '1.5px solid rgba(212,175,55,0.32)', color: '#d4af37', background: 'rgba(212,175,55,0.07)' }}>פרטים נוספים</button>
                <button type="button" onClick={() => onSelect(pkg)} className="flex-1 py-3 rounded-xl font-black text-xs text-black active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #f5d060, #d4af37)', boxShadow: '0 6px 20px rgba(212,175,55,0.38)' }}>
                  <Crown size={12} /> הזמן VIP
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.vip} color={color} badge={<Crown size={20} />} onSelect={onSelect} onBack={() => setShowBack(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// DUO DEAL PACKAGE CARD
// ============================================================
const DuoDealPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#8b5cf6';

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div key="front" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #120d1e 0%, #0a0812 100%)', border: '1.5px solid rgba(139,92,246,0.42)', boxShadow: '0 24px 60px -15px rgba(139,92,246,0.28)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }} />
            <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
            
            <div className="relative z-10 p-5 flex flex-col h-full gap-3.5 pt-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5" style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.28)' }}>
                  <Car size={12} className="text-purple-400" />
                  <Car size={12} className="text-purple-400" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-purple-300">DUO DEAL</span>
                </div>
                <div className="rounded-full px-2.5 py-1" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
                  <span className="text-[9px] font-black text-emerald-400">40% חיסכון</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.22), rgba(139,92,246,0.07))', border: '1.5px solid rgba(139,92,246,0.38)', boxShadow: '0 6px 20px rgba(139,92,246,0.18)' }}>
                  <Car size={26} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-[22px] font-black leading-none"
                    style={{ background: 'linear-gradient(135deg, #c4b5fd, #8b5cf6, #6d28d9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    DUO DEAL
                  </h3>
                  <p className="text-[10px] mt-1" style={{ color: 'rgba(139,92,246,0.5)' }}>פרסום 2 רכבים במחיר מיוחד</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[{ icon: <Car size={11} />, val: '2 רכבים' }, { icon: <Camera size={11} />, val: '4 תמונות/רכב' }, { icon: <Calendar size={11} />, val: '14 ימים' }, { icon: <Zap size={11} />, val: 'חשיפה כפולה' }].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)' }}>
                    <span className="text-purple-400">{s.icon}</span>
                    <span className="text-[10px] font-black text-white">{s.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[36px] font-black leading-none text-purple-400">₪349</span>
                <span className="text-xs line-through" style={{ color: 'rgba(255,255,255,0.18)' }}>₪598</span>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full border" style={{ color: '#c4b5fd', background: 'rgba(139,92,246,0.12)', borderColor: 'rgba(139,92,246,0.22)' }}>חיסכון ₪249</span>
              </div>
              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.28), transparent)' }} />
              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]" style={{ background: 'rgba(139,92,246,0.18)', border: '1.5px solid rgba(139,92,246,0.35)' }}>
                      <Check size={8} strokeWidth={3} className="text-purple-400" />
                    </div>
                    <span className="text-[12px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.8)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={() => setShowBack(true)} className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all"
                  style={{ border: '1.5px solid rgba(139,92,246,0.32)', color: '#8b5cf6', background: 'rgba(139,92,246,0.07)' }}>פרטים נוספים</button>
                <button type="button" onClick={() => onSelect(pkg)} className="flex-1 py-3 rounded-xl font-black text-xs text-white active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', boxShadow: '0 6px 20px rgba(139,92,246,0.38)' }}>
                  <Car size={12} /> הזמן DUO
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.duo} color={color} badge={<Car size={20} />} onSelect={onSelect} onBack={() => setShowBack(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// EQUIPMENT PACKAGE CARD
// ============================================================
const EquipmentPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const isHeavy = pkg.id === 'equipment-heavy';
  const color = isHeavy ? '#ea580c' : '#94a3b8';
  const badge = isHeavy ? <Truck size={20} /> : <Wrench size={20} />;

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div key="front" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden p-5"
            style={{ background: isHeavy ? 'linear-gradient(145deg, #170e06 0%, #0e0903 100%)' : 'linear-gradient(145deg, #101316 0%, #0b0d10 100%)', border: `1.5px solid ${color}${isHeavy ? '42' : '28'}`, boxShadow: `0 24px 60px -15px ${color}${isHeavy ? '22' : '12'}` }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
            {isHeavy && (
              <div className="flex justify-end mb-3">
                <div className="text-white text-[8px] font-black py-1 px-3 rounded-full flex items-center gap-1"
                  style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', boxShadow: '0 4px 12px rgba(234,88,12,0.4)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />הכי מבוקש
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${color}22, ${color}08)`, border: `1.5px solid ${color}32`, boxShadow: `0 6px 20px ${color}18` }}>
                <span style={{ color }}>{badge}</span>
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color }}>{isHeavy ? 'ציוד כבד' : 'ציוד קל'}</div>
                <h3 className="text-[16px] font-black text-white leading-tight mt-0.5">{pkg.name}</h3>
              </div>
              <div className="mr-auto text-right shrink-0">
                <div className="text-[22px] font-black text-white">{pkg.price}</div>
                <div className="text-[9px] line-through" style={{ color: 'rgba(255,255,255,0.2)' }}>₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(isHeavy ? ['באגר', 'מחפרון', 'מיני באגר', 'בולדוזר'] : ['פופקט', 'מלגזה', 'סקיד סטיר']).map((item, i) => (
                <span key={i} className="text-[9px] font-black px-2 py-1 rounded-full"
                  style={{ color: isHeavy ? '#fb923c' : '#94a3b8', border: `1px solid ${color}28`, background: `${color}0e` }}>{item}</span>
              ))}
            </div>
            <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, transparent, ${color}28, transparent)` }} />
            <div className="flex flex-col gap-2 flex-grow">
              {pkg.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-[2px] p-[3px] rounded-full shrink-0" style={{ background: `${color}55` }}>
                    <Check size={7} className="text-black" strokeWidth={4} />
                  </div>
                  <span className="text-[11.5px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.75)' }}>{f}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5 mt-auto pt-3">
              <button type="button" onClick={() => setShowBack(true)} className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all"
                style={{ border: `1.5px solid ${color}32`, color, background: `${color}0e` }}>פרטים נוספים</button>
              <button type="button" onClick={() => onSelect(pkg)} className="flex-1 py-3 rounded-xl font-black text-xs text-white active:scale-95 transition-all"
                style={{ background: isHeavy ? 'linear-gradient(135deg, #ea580c, #c2410c)' : `${color}28`, border: isHeavy ? 'none' : `1.5px solid ${color}32`, boxShadow: isHeavy ? '0 6px 20px rgba(234,88,12,0.38)' : 'none' }}>הזמן עכשיו</button>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails[pkg.id] || { title: pkg.name, content: pkg.features.join('\n') }} color={color} badge={badge} onSelect={onSelect} onBack={() => setShowBack(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// TRANSPORT PACKAGE CARD
// ============================================================
const TransportPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#0ea5e9';

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div key="front" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden p-5"
            style={{ background: 'linear-gradient(145deg, #061320 0%, #050d18 100%)', border: '1.5px solid rgba(14,165,233,0.38)', boxShadow: '0 24px 60px -15px rgba(14,165,233,0.18)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #0ea5e9, transparent)' }} />
            <div className="flex justify-start mb-3">
              <div className="text-white text-[8px] font-black py-1 px-3 rounded-full flex items-center gap-1.5"
                style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', boxShadow: '0 4px 12px rgba(14,165,233,0.35)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />חדש!
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.22), rgba(14,165,233,0.07))', border: '1.5px solid rgba(14,165,233,0.38)', boxShadow: '0 6px 20px rgba(14,165,233,0.18)' }}>
                <Bus size={26} style={{ color }} />
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color }}>תחבורה והסעות</div>
                <h3 className="text-[16px] font-black text-white leading-tight mt-0.5">{pkg.name}</h3>
              </div>
              <div className="mr-auto text-right shrink-0">
                <div className="text-[22px] font-black text-white">{pkg.price}</div>
                <div className="text-[9px] line-through" style={{ color: 'rgba(255,255,255,0.18)' }}>₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['אוטובוס', 'מיניבוס', 'וואן', 'משאית'].map((item, i) => (
                <span key={i} className="text-[9px] font-black px-2 py-1 rounded-full text-sky-300"
                  style={{ border: '1px solid rgba(14,165,233,0.28)', background: 'rgba(14,165,233,0.08)' }}>{item}</span>
              ))}
            </div>
            <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.28), transparent)' }} />
            <div className="flex flex-col gap-2 flex-grow">
              {pkg.features.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-[2px] p-[3px] rounded-full shrink-0 bg-sky-500/55">
                    <Check size={7} className="text-black" strokeWidth={4} />
                  </div>
                  <span className="text-[11.5px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.75)' }}>{f}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5 mt-auto pt-3">
              <button type="button" onClick={() => setShowBack(true)} className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all text-sky-400"
                style={{ border: '1.5px solid rgba(14,165,233,0.32)', background: 'rgba(14,165,233,0.07)' }}>פרטים נוספים</button>
              <button type="button" onClick={() => onSelect(pkg)} className="flex-1 py-3 rounded-xl font-black text-xs text-white active:scale-95 transition-all flex items-center justify-center gap-1.5"
                style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', boxShadow: '0 6px 20px rgba(14,165,233,0.32)' }}>
                <Bus size={12} />הזמן
              </button>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.transport} color={color} badge={<Bus size={20} />} onSelect={onSelect} onBack={() => setShowBack(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// BUSINESS PACKAGE CARD
// ============================================================
const BusinessPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const [showBack, setShowBack] = useState(false);
  const color = '#3b82f6';

  return (
    <div className="relative w-full h-full" style={{ borderRadius: '1.25rem' }}>
      <AnimatePresence mode="wait" initial={false}>
        {!showBack ? (
          <motion.div key="front" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #070f1c 0%, #0d1a2e 50%, #070f1c 100%)', border: '1.5px solid rgba(59,130,246,0.38)', boxShadow: '0 24px 60px -15px rgba(59,130,246,0.22)' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="relative z-10 p-5 h-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', boxShadow: '0 6px 20px rgba(59,130,246,0.32)' }}>
                    <Building2 size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-blue-400 uppercase tracking-[0.15em]">לסוכנויות</div>
                    <h3 className="text-[20px] font-black text-white">BUSINESS</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full px-2.5 py-1.5" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.22)' }}>
                  <Award size={11} className="text-blue-400" />
                  <span className="text-[8px] font-black text-blue-400">מומלץ</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[{ icon: <Car size={11} />, val: '50 רכבים/חודש' }, { icon: <Users size={11} />, val: 'מנהל ייעודי' }, { icon: <BarChart3 size={11} />, val: 'דוחות חודשיים' }, { icon: <Target size={11} />, val: 'קידום ממומן' }].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <span className="text-blue-400">{s.icon}</span>
                    <span className="text-[10px] font-black text-white">{s.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[32px] font-black text-white leading-none">₪1,499</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>/חודש</span>
                <span className="text-xs line-through" style={{ color: 'rgba(255,255,255,0.18)' }}>₪2,499</span>
                <span className="text-[9px] font-black rounded-full px-1.5 py-0.5 border" style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', borderColor: 'rgba(34,197,94,0.22)' }}>40% OFF</span>
              </div>
              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.28), transparent)' }} />
              <div className="flex flex-col gap-2 flex-grow">
                {pkg.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-[1px]" style={{ background: 'rgba(59,130,246,0.18)', border: '1.5px solid rgba(59,130,246,0.38)' }}>
                      <Check size={8} strokeWidth={3} className="text-blue-400" />
                    </div>
                    <span className="text-[12px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.8)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2.5 mt-auto">
                <button type="button" onClick={() => setShowBack(true)} className="flex-1 py-3 rounded-xl font-black text-xs active:scale-95 transition-all text-blue-400"
                  style={{ border: '1.5px solid rgba(59,130,246,0.32)', background: 'rgba(59,130,246,0.07)' }}>פרטים נוספים</button>
                <button type="button" onClick={() => onSelect(pkg)} className="flex-1 py-3 rounded-xl font-black text-xs text-white active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', boxShadow: '0 6px 20px rgba(59,130,246,0.38)' }}>
                  <Briefcase size={12} />התחל
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <CardBackPanel pkg={pkg} details={packageDetails.business} color={color} badge={<Building2 size={20} />} onSelect={onSelect} onBack={() => setShowBack(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// MOBILE SWIPER
// ============================================================
const MobileSwiper = ({ children, cardHeight = 500 }: { children: React.ReactNode[]; cardHeight?: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const count = React.Children.count(children);

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[0] as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 12;
    container.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[0] as HTMLElement;
    if (!card) return;
    const newIndex = Math.round(container.scrollLeft / (card.offsetWidth + 12));
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < count) setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);

  return (
    <div className="relative">
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ paddingLeft: '12px', paddingRight: '12px', scrollSnapType: 'x mandatory', direction: 'rtl' }}>
        {React.Children.map(children, (child, i) => (
          <div key={i} className="snap-start shrink-0" style={{ width: '85%', height: cardHeight, direction: 'rtl' }}>{child}</div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-5">
        {Array.from({ length: count }).map((_, i) => (
          <button key={i} type="button" onClick={() => scrollTo(i)}
            className="transition-all duration-300"
            style={{ width: i === currentIndex ? '26px' : '7px', height: '7px', borderRadius: '4px', background: i === currentIndex ? '#e8112d' : 'rgba(255,255,255,0.18)' }} />
        ))}
      </div>
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none z-10 flex items-center gap-1 backdrop-blur-sm px-2.5 py-1.5 rounded-full"
        style={{ background: 'rgba(0,0,0,0.5)', direction: 'ltr' }}>
        <ChevronLeft size={10} className="text-white/70" />
        <span className="text-[9px] text-white/70 font-black">החלק</span>
        <ChevronRight size={10} className="text-white/70" />
      </motion.div>
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
      <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize, color: '#ffffff', lineHeight: 1 }}>PayBox</span>
    </div>
  );
};

// --- Order Status Check ---
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300 }} className="glass-card p-6 space-y-5">
      <div className="text-center space-y-3">
        <motion.div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-xl"
          style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)', boxShadow: '0 8px 32px rgba(232,17,45,0.3)' }}
          animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <Search size={28} className="text-white" />
        </motion.div>
        <h3 className="text-xl font-black">בדיקת סטטוס הזמנה</h3>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>הכנס את מספר ההזמנה שקיבלת בוואטסאפ</p>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <input type="text" placeholder="לדוגמה: #12345" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-center text-base font-black tracking-widest"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', transition: 'all 0.25s' }}
            onFocus={e => { e.target.style.borderColor = '#e8112d'; e.target.style.boxShadow = '0 0 0 3px rgba(232,17,45,0.1)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
          />
          {orderNumber && (
            <motion.button onClick={() => setOrderNumber('')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <X size={14} />
            </motion.button>
          )}
        </div>
        <motion.button onClick={checkOrder} disabled={status === 'loading'} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl font-black text-sm disabled:opacity-50 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)', boxShadow: '0 4px 20px rgba(232,17,45,0.3)' }}>
          <span className="relative">
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />בודק...
              </span>
            ) : 'בדוק סטטוס'}
          </span>
        </motion.button>
        <AnimatePresence>
          {status === 'found' && orderDetails && (
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 rounded-xl space-y-3"
              style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(16,185,129,0.04))', border: '1px solid rgba(34,197,94,0.18)' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-green-400">סטטוס:</span>
                <span className="rounded-full px-3 py-0.5 text-xs font-black border" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', borderColor: 'rgba(34,197,94,0.25)' }}>{orderDetails.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span style={{ color: 'rgba(255,255,255,0.35)' }}>מספר הזמנה:</span><div className="font-black text-white">#{orderDetails.id}</div></div>
                <div><span style={{ color: 'rgba(255,255,255,0.35)' }}>תאריך:</span><div className="font-black text-white">{orderDetails.date}</div></div>
                <div><span style={{ color: 'rgba(255,255,255,0.35)' }}>חבילה:</span><div className="font-black text-white">{orderDetails.package}</div></div>
                <div><span style={{ color: 'rgba(255,255,255,0.35)' }}>רכב:</span><div className="font-black text-white">{orderDetails.car}</div></div>
              </div>
            </motion.div>
          )}
          {status === 'notfound' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 rounded-xl text-center"
              style={{ background: 'rgba(232,17,45,0.06)', border: '1px solid rgba(232,17,45,0.18)' }}>
              <X size={24} className="mx-auto mb-1" style={{ color: '#e8112d' }} />
              <p className="font-black text-sm" style={{ color: '#e8112d' }}>ההזמנה לא נמצאה</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>בדוק את המספר ונסה שנית</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={onClose}
        className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
        style={{ border: '1px solid rgba(232,17,45,0.25)', background: 'rgba(232,17,45,0.08)', color: '#e8112d' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#e8112d'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,17,45,0.08)'; e.currentTarget.style.color = '#e8112d'; }}>
        <ArrowLeft size={12} />חזור לדף הבית
      </motion.button>
    </motion.div>
  );
};

// ============================================================
// CHANGE PACKAGE MODAL
// ============================================================
const ChangePackageModal = memo(({
  isOpen, onClose, currentPackageId, packages, vipPackage, duoPackage, equipmentPackages, businessPackage, transportPackage, onSelect, lang
}: {
  isOpen: boolean; onClose: () => void; currentPackageId: string; packages: Package[]; vipPackage: Package;
  duoPackage: Package; equipmentPackages: Package[]; businessPackage: Package; transportPackage: Package;
  onSelect: (p: Package) => void; lang: Language;
}) => {
  const allPackages = [...packages, vipPackage, duoPackage, ...equipmentPackages, transportPackage, businessPackage];

  const getPackageStyle = (pkg: Package) => {
    if (pkg.id === 'vip') return { border: 'border-amber-500/40', bg: 'bg-amber-500/10', badge: <Crown size={16} />, color: 'text-amber-400', activeBorder: 'border-amber-400' };
    if (pkg.id === 'duo') return { border: 'border-purple-500/40', bg: 'bg-purple-500/10', badge: <Car size={16} />, color: 'text-purple-400', activeBorder: 'border-purple-400' };
    if (pkg.id === 'business') return { border: 'border-blue-500/40', bg: 'bg-blue-500/10', badge: <Building2 size={16} />, color: 'text-blue-400', activeBorder: 'border-blue-400' };
    if (pkg.id === 'equipment-heavy') return { border: 'border-orange-500/40', bg: 'bg-orange-500/10', badge: <Truck size={16} />, color: 'text-orange-400', activeBorder: 'border-orange-400' };
    if (pkg.id === 'equipment-light') return { border: 'border-slate-500/40', bg: 'bg-slate-500/10', badge: <Wrench size={16} />, color: 'text-slate-400', activeBorder: 'border-slate-400' };
    if (pkg.id === 'transport') return { border: 'border-sky-500/40', bg: 'bg-sky-500/10', badge: <Bus size={16} />, color: 'text-sky-400', activeBorder: 'border-sky-400' };
    if (pkg.id === 'premium') return { border: 'border-brand-red/40', bg: 'bg-brand-red/10', badge: <Gem size={16} />, color: 'text-brand-red', activeBorder: 'border-brand-red' };
    if (pkg.id === 'pro') return { border: 'border-brand-red/30', bg: 'bg-brand-red/5', badge: <Flame size={16} />, color: 'text-brand-red', activeBorder: 'border-brand-red' };
    return { border: 'border-white/10', bg: 'bg-white/5', badge: <Rocket size={16} />, color: 'text-white/60', activeBorder: 'border-white/40' };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }} transition={{ duration: 0.18 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{ background: 'linear-gradient(145deg, #0e0e14 0%, #0a0a0e 100%)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 80px rgba(0,0,0,0.8)' }}
        onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between backdrop-blur-sm"
          style={{ background: 'rgba(14,14,20,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,17,45,0.1)', border: '1px solid rgba(232,17,45,0.2)' }}>
              <RefreshCw size={15} style={{ color: '#e8112d' }} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">החלפת חבילה</h3>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>בחר חבילה חדשה</p>
            </div>
          </div>
          <motion.button onClick={onClose} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
            <X size={16} />
          </motion.button>
        </div>
        <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-3">
          {allPackages.map((pkg) => {
            const style = getPackageStyle(pkg);
            const isActive = pkg.id === currentPackageId;
            return (
              <motion.button key={pkg.id} onClick={() => { onSelect(pkg); onClose(); }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className={`p-3 rounded-xl text-right transition-all border-2 ${isActive ? `${style.activeBorder}` : `${style.border}`} ${style.bg}`}>
                <div className={`${style.color} mb-2`}>{style.badge}</div>
                <div className="text-xs font-black text-white leading-tight">{pkg.name}</div>
                <div className="text-[10px] font-black mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{pkg.price}</div>
                {isActive && <div className="mt-1.5 text-[8px] font-black text-green-400">✓ נבחר</div>}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
});

// ============================================================
// CAR DETAILS FORM
// ============================================================
const CarDetailsForm = memo(({
  formData, setFormData, onNext, selectedPackage, onChangePackage
}: {
  formData: any; setFormData: (d: any) => void; onNext: () => void; selectedPackage: Package | null; onChangePackage: () => void;
}) => {
  const isDuo = selectedPackage?.id === 'duo';
  const isEquipment = selectedPackage?.id?.includes('equipment');
  const isTransport = selectedPackage?.id === 'transport';
  const isBusiness = selectedPackage?.id === 'business';

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: 'white',
    width: '100%',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.25s',
  };

  const labelStyle = { fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: '6px' };

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#e8112d';
    e.target.style.boxShadow = '0 0 0 3px rgba(232,17,45,0.1)';
    e.target.style.background = 'rgba(232,17,45,0.05)';
  };
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'rgba(255,255,255,0.04)';
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ type: 'spring', stiffness: 300 }} className="space-y-5">
      {/* Selected Package */}
      <motion.div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }} whileHover={{ scale: 1.01 }}>
        <div className="flex items-center gap-3">
          <motion.div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(232,17,45,0.1)' }}
            animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            {selectedPackage?.id === 'vip' ? <Crown size={16} className="text-amber-400" /> :
             selectedPackage?.id === 'duo' ? <Car size={16} className="text-purple-400" /> :
             selectedPackage?.id === 'business' ? <Building2 size={16} className="text-blue-400" /> :
             selectedPackage?.id === 'transport' ? <Bus size={16} className="text-sky-400" /> :
             selectedPackage?.id === 'equipment-heavy' ? <Truck size={16} className="text-orange-400" /> :
             selectedPackage?.id === 'equipment-light' ? <Wrench size={16} className="text-slate-400" /> :
             selectedPackage?.id === 'premium' ? <Gem size={16} style={{ color: '#e8112d' }} /> :
             selectedPackage?.id === 'pro' ? <Flame size={16} style={{ color: '#e8112d' }} /> :
             <Rocket size={16} style={{ color: '#e8112d' }} />}
          </motion.div>
          <div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>חבילה נבחרת</div>
            <div className="text-sm font-black text-white">{selectedPackage?.name}</div>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onChangePackage}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent'; }}>
          <RefreshCw size={12} style={{ color: '#e8112d' }} />
          החלף חבילה
        </motion.button>
      </motion.div>

      {isBusiness ? (
        <>
          <div className="text-center space-y-2">
            <motion.div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-xl"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', boxShadow: '0 8px 32px rgba(59,130,246,0.28)' }}
              animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Building2 size={28} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-black">פרטי הסוכנות</h3>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>הכנס את פרטי הסוכנות שלך</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="md:col-span-2 space-y-1.5">
              <label style={{ ...labelStyle, color: 'rgba(59,130,246,0.65)' }}>שם הסוכנות *</label>
              <input type="text" placeholder="סוכנות הרכב שלי" value={formData.agencyName || ''} onChange={(e) => setFormData({...formData, agencyName: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="space-y-1.5">
              <label style={{ ...labelStyle, color: 'rgba(59,130,246,0.65)' }}>שם איש קשר *</label>
              <input type="text" placeholder="ישראל ישראלי" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="space-y-1.5">
              <label style={{ ...labelStyle, color: 'rgba(59,130,246,0.65)' }}>טלפון *</label>
              <input type="tel" placeholder="050-1234567" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="space-y-1.5">
              <label style={{ ...labelStyle, color: 'rgba(59,130,246,0.65)' }}>מיקום הסוכנות *</label>
              <input type="text" placeholder="תל אביב" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="space-y-1.5">
              <label style={{ ...labelStyle, color: 'rgba(59,130,246,0.65)' }}>כמות רכבים בחודש *</label>
              <input type="text" placeholder="10-20 רכבים" value={formData.monthlyCars || ''} onChange={(e) => setFormData({...formData, monthlyCars: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label style={{ ...labelStyle, color: 'rgba(59,130,246,0.65)' }}>פרטים נוספים</label>
              <textarea placeholder="ספר לנו על הסוכנות שלך..." value={formData.agencyDetails || ''} onChange={(e) => setFormData({...formData, agencyDetails: e.target.value})} rows={3} style={{ ...inputStyle, resize: 'none' }} onFocus={focusInput} onBlur={blurInput} />
            </div>
          </div>
        </>
      ) : isDuo ? (
        <>
          <div className="text-center space-y-2">
            <motion.div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-xl"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', boxShadow: '0 8px 32px rgba(139,92,246,0.28)' }}
              animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Car size={28} className="text-white" />
            </motion.div>
            <h3 className="text-xl font-black">פרטי שני הרכבים</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label style={labelStyle}>שם מלא *</label>
              <input type="text" placeholder="ישראל ישראלי" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="space-y-1.5">
              <label style={labelStyle}>טלפון *</label>
              <input type="tel" placeholder="050-1234567" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label style={labelStyle}>מיקום *</label>
              <input type="text" placeholder="תל אביב" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
          </div>
          {[1, 2].map(carNum => (
            <motion.div key={carNum} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(139,92,246,0.22)' }} whileHover={{ scale: 1.005 }}>
              <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: 'rgba(139,92,246,0.08)', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)' }}>
                  <span className="text-[10px] font-black text-purple-400">{carNum}</span>
                </div>
                <span className="text-xs font-black text-purple-300">רכב {carNum === 1 ? 'ראשון' : 'שני'}</span>
              </div>
              <div className="p-4 grid md:grid-cols-2 gap-3">
                {[
                  { label: 'דגם הרכב', placeholder: 'מאזדה 3', key: carNum === 1 ? 'model' : 'model2' },
                  { label: 'שנת ייצור', placeholder: '2021', key: carNum === 1 ? 'year' : 'year2' },
                  { label: "קילומטראז'", placeholder: '50,000', key: carNum === 1 ? 'mileage' : 'mileage2' },
                  { label: 'מחיר מבוקש', placeholder: '₪80,000', key: carNum === 1 ? 'price' : 'price2' },
                  { label: 'מספר רישוי', placeholder: '12-345-67', key: carNum === 1 ? 'registration' : 'registration2' },
                  { label: 'תוקף טסט', placeholder: '12/2025', key: carNum === 1 ? 'testUntil' : 'testUntil2' },
                ].map(f => (
                  <div key={f.key} className="space-y-1.5">
                    <label style={labelStyle}>{f.label}</label>
                    <input type="text" placeholder={f.placeholder} value={formData[f.key] || ''} onChange={(e) => setFormData({...formData, [f.key]: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label style={labelStyle}>שם מלא *</label>
              <input type="text" placeholder="ישראל ישראלי" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="space-y-1.5">
              <label style={labelStyle}>טלפון *</label>
              <input type="tel" placeholder="050-1234567" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="space-y-1.5">
              <label style={labelStyle}>{isEquipment ? 'סוג הציוד' : isTransport ? 'סוג הרכב' : 'דגם הרכב'} *</label>
              <input type="text" placeholder={isEquipment ? 'מחפרון קטרפילר' : isTransport ? 'מרצדס ספרינטר' : 'מאזדה 3'} value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="space-y-1.5">
              <label style={labelStyle}>שנת ייצור</label>
              <input type="text" placeholder="2021" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="space-y-1.5">
              <label style={labelStyle}>{isEquipment ? 'שעות עבודה' : "קילומטראז'"}</label>
              <input type="text" placeholder={isEquipment ? '2,500 שעות' : '50,000 ק"מ'} value={formData.mileage} onChange={(e) => setFormData({...formData, mileage: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div className="space-y-1.5">
              <label style={labelStyle}>מחיר מבוקש *</label>
              <input type="text" placeholder="₪80,000" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
            {!isEquipment && (
              <>
                <div className="space-y-1.5">
                  <label style={labelStyle}>מספר רישוי</label>
                  <input type="text" placeholder="12-345-67" value={formData.registration} onChange={(e) => setFormData({...formData, registration: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                </div>
                <div className="space-y-1.5">
                  <label style={labelStyle}>תוקף טסט</label>
                  <input type="text" placeholder="12/2025" value={formData.testUntil} onChange={(e) => setFormData({...formData, testUntil: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                </div>
              </>
            )}
            {isTransport && (
              <div className="space-y-1.5">
                <label style={labelStyle}>מספר מושבים</label>
                <input type="text" placeholder="16 מושבים" value={formData.seats || ''} onChange={(e) => setFormData({...formData, seats: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              </div>
            )}
            <div className="md:col-span-2 space-y-1.5">
              <label style={labelStyle}>מיקום *</label>
              <input type="text" placeholder="תל אביב, ירושלים..." value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
            </div>
          </div>
        </>
      )}

      <motion.button onClick={onNext} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        className="w-full py-4 rounded-xl font-black text-base text-white flex items-center justify-center gap-2.5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)', boxShadow: '0 6px 24px rgba(232,17,45,0.35)' }}>
        <span className="relative flex items-center gap-2">המשך לתשלום <ChevronRight size={18} /></span>
      </motion.button>
    </motion.div>
  );
});

// ============================================================
// PAYMENT FORM
// ============================================================
const PaymentForm = memo(({
  formData, setFormData, selectedPackage, onSubmit, loading, onBack, onChangePackage
}: {
  formData: any; setFormData: (d: any) => void; selectedPackage: Package | null; onSubmit: () => void; loading: boolean; onBack: () => void; onChangePackage: () => void;
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setFormData({ ...formData, paymentProof: e.target?.result as string });
    reader.readAsDataURL(file);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: 'white',
    width: '100%',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.25s',
  };
  const focusInput = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#e8112d';
    e.target.style.boxShadow = '0 0 0 3px rgba(232,17,45,0.1)';
    e.target.style.background = 'rgba(232,17,45,0.05)';
  };
  const blurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'rgba(255,255,255,0.04)';
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
      {/* Payment Summary */}
      <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(232,17,45,0.06), rgba(10,10,15,0.8))', border: '1px solid rgba(232,17,45,0.15)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-black text-white">{selectedPackage?.name}</span>
          <span className="text-lg font-black" style={{ color: '#e8112d' }}>{selectedPackage?.price}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[{ icon: <ShieldCheck size={11} />, text: 'תשלום מאובטח', c: '#22c55e' }, { icon: <Clock size={11} />, text: 'פרסום תוך 24h', c: '#60a5fa' }].map((b, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: b.c }}>
              {b.icon}{b.text}
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>שיטת תשלום</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Bit', component: <BitLogo size="md" />, number: '054-698-0606' },
            { name: 'PayBox', component: <PayBoxLogo size="md" />, number: '054-698-0606' },
          ].map((method, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-4 rounded-xl text-center space-y-2"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex justify-center">{method.component}</div>
              <p className="text-[10px] font-black text-white">{method.number}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upload Proof */}
      <div className="space-y-2">
        <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>אישור תשלום</h4>
        <label
          className="block w-full rounded-xl cursor-pointer transition-all"
          style={{
            border: `2px dashed ${dragOver ? '#e8112d' : formData.paymentProof ? '#22c55e' : 'rgba(255,255,255,0.12)'}`,
            background: dragOver ? 'rgba(232,17,45,0.05)' : formData.paymentProof ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.025)',
            padding: '20px',
          }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if (file) handleFileUpload(file); }}
        >
          <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(file); }} />
          {formData.paymentProof ? (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <CheckCircle2 size={20} />
              <span className="text-sm font-black">הקובץ הועלה בהצלחה!</span>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <Upload size={24} className="mx-auto" style={{ color: 'rgba(255,255,255,0.3)' }} />
              <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.45)' }}>העלה צילום מסך של אישור התשלום</p>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>גרור לכאן או לחץ לבחירה</p>
            </div>
          )}
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <motion.button onClick={onBack} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="px-5 py-4 rounded-xl font-black text-sm flex items-center gap-2 transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
          <ArrowLeft size={16} />
        </motion.button>
        <motion.button onClick={onSubmit} disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.97 }}
          className="flex-1 py-4 rounded-xl font-black text-base text-white disabled:opacity-60 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)', boxShadow: '0 6px 24px rgba(232,17,45,0.35)' }}>
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />שולח...</>
            ) : (
              <><Send size={16} />שלח הזמנה</>
            )}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
});

// ============================================================
// MAIN APP COMPONENT
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
    hero_subtitle_he: 'YOUGO ISRAEL - פלטפורמת השיווק המובילה באינסטגרם למכירת רכבים.',
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
    { id: 'premium', name: t.premium, price: '₪449', premium: true, features: [t.features.imagesPremium, t.features.postPremium, t.features.story30, t.features.priorityFull, t.features.exposureMax, t.features.guidance, t.features.video] }
  ];

  const vipPackage: Package = { id: 'vip', name: 'VIP LUXURY', price: '₪749', vip: true, features: ['15+ תמונות מקצועיות', 'רילס + סטורי VIP', '60 ימי פרסום פרמיום', 'חשיפה מקסימלית', 'ליווי אישי 24/7', 'עיצוב VIP בלעדי', 'טרגוט מתקדם', 'עדיפות ראשונה תמיד'] };
  const duoPackage: Package = { id: 'duo', name: 'DUO DEAL', price: '₪349', features: ['פרסום 2 רכבים במחיר מיוחד', '4 תמונות לכל רכב', 'פוסט נפרד לכל רכב', 'סטורי 14 יום לכל אחד', 'חשיפה כפולה לקהל מעוניין', 'חיסכון של 40% לעומת 2 חבילות'] };
  const businessPackage: Package = { id: 'business', name: 'BUSINESS', price: '₪1,499', business: true, features: ['עד 50 רכבים בחודש', 'מנהל לקוח ייעודי', 'דוחות ביצועים חודשיים', 'קידום ממומן', 'עיצוב מקצועי לכל מודעה'] };
  const transportPackage: Package = { id: 'transport', name: 'תחבורה והסעות', price: '₪299', features: ['10 תמונות מקצועיות מבפנים ומבחוץ', 'פוסט עם מפרט טכני מלא ומדויק', 'סטורי 21 ימים לחשיפה רחבה', 'חשיפה ייעודית לחברות הסעות ותחבורה', 'טרגוט מדויק לרוכשי רכב מסחרי', 'ייעוץ תמחור מקצועי', 'מאפיין לאוטובוסים, מיניבוסים, וואנים ומשאיות'] };
  const equipmentPackages: Package[] = [
    { id: 'equipment-heavy', name: 'חבילת ציוד כבד', price: '₪349', equipment: true, features: ['10 תמונות מקצועיות של הציוד', 'פוסט ייעודי עם מפרט טכני', 'סטורי 21 יום', 'חשיפה לקהל קבלנים ומגזר הבנייה', 'עדיפות בתוצאות חיפוש', 'ייעוץ תמחור מקצועי'] },
    { id: 'equipment-light', name: 'חבילת ציוד קל', price: '₪199', equipment: true, features: ['6 תמונות מקצועיות', 'פוסט מותאם לציוד קל', 'סטורי 14 יום', 'חשיפה לקהל מקצועי רלוונטי', 'תיאור טכני מפורט', 'תמיכה ב-WhatsApp'] }
  ];

  const handleSelectPackage = (p: Package) => { setSelectedPackage(p); setView('booking'); setBookingStep(1); };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: adminPassword }) });
    if (res.ok) { setIsAdmin(true); setView('admin-dashboard'); fetchOrders(); } else { alert('סיסמה שגויה'); }
  };

  const fetchOrders = async () => {
    const res = await fetch('/api/admin/orders');
    const data = await res.json();
    setOrders(data);
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    fetchOrders();
  };

  const [formData, setFormData] = useState({
    fullName: '', phone: '', model: '', year: '', mileage: '', price: '', registration: '', testUntil: '', location: '',
    paymentProof: '', carImages: [] as string[], model2: '', year2: '', mileage2: '', price2: '', registration2: '', testUntil2: '',
    agencyName: '', monthlyCars: '', agencyDetails: '', seats: ''
  });

  const handleSubmitOrder = async () => {
    setLoading(true);
    try {
      const pkgId = selectedPackage?.id || '';
      const pkgEmoji = pkgId === 'vip' ? '👑' : pkgId === 'premium' ? '💎' : pkgId === 'pro' ? '⭐' : pkgId.includes('equipment') ? '🚜' : pkgId === 'business' ? '🏢' : pkgId === 'duo' ? '🚗🚗' : pkgId === 'transport' ? '🚌' : '✅';
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
  };

  return (
    <div className="min-h-screen text-white" style={{ background: 'var(--bg-primary)', direction: 'rtl' }}>
      <style>{GLOBAL_STYLES}</style>

      <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin} onLogout={() => { setIsAdmin(false); setView('home'); }} siteSettings={siteSettings} setView={setView} />

      <main className="pt-24 px-3 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="space-y-28">
              
              {/* ═══════════════════════════════════════════════
                  HERO SECTION — World-Class Premium
              ═══════════════════════════════════════════════ */}
              <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                {/* Background layers */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Main radial glow */}
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse 75% 60% at 60% 15%, rgba(232,17,45,0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 45% at 15% 85%, rgba(232,17,45,0.07) 0%, transparent 60%)'
                  }} />
                  {/* Grid */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                    maskImage: 'radial-gradient(ellipse 85% 70% at 50% 40%, black 20%, transparent 80%)'
                  }} />
                  {/* Vignette */}
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, var(--bg-primary) 100%)' }} />
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-48" style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }} />
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-5 pt-32 pb-20 flex flex-col items-center text-center">
                  {/* Top badge */}
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-full"
                    style={{ background: 'rgba(232,17,45,0.09)', border: '1px solid rgba(232,17,45,0.24)', backdropFilter: 'blur(8px)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#e8112d' }} />
                    <span className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.72)' }}>הדרך המהירה ביותר למכור רכב בישראל</span>
                    <Instagram size={13} style={{ color: '#e8112d' }} />
                  </motion.div>

                  {/* H1 */}
                  <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
                    className="font-black leading-[1.04] tracking-tight mb-6"
                    style={{ fontSize: 'clamp(2.8rem, 8.5vw, 5.8rem)' }}>
                    <span className="text-white">מוכרים רכב?</span>
                    <br />
                    <span className="gradient-text-red">
                      אנחנו מוכרים אותו מהר יותר.
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base md:text-lg leading-relaxed mb-12 max-w-lg"
                    style={{ color: 'rgba(255,255,255,0.45)' }}>
                    YOUGO ISRAEL — פלטפורמת השיווק המובילה באינסטגרם למכירת רכבים.
                    <br />
                    <span style={{ color: 'rgba(255,255,255,0.28)' }}>50,000+ עוקבים. תוצאות מהירות. מחירים שמדברים.</span>
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}
                    className="flex flex-col sm:flex-row items-center gap-3 mb-12 w-full justify-center">
                    <button
                      onClick={() => { document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[16px] text-white w-full sm:w-auto justify-center overflow-hidden transition-transform hover:scale-[1.03] active:scale-[.97]"
                      style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)', boxShadow: '0 8px 32px rgba(232,17,45,0.38)' }}>
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Sparkles size={18} className="relative" />
                      <span className="relative">התחל הזמנה</span>
                    </button>
                    <button
                      onClick={() => setView('check-status')}
                      className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[16px] w-full sm:w-auto justify-center transition-all hover:scale-[1.02] active:scale-[.97]"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.68)', background: 'rgba(255,255,255,0.04)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                      <Search size={18} />בדוק סטטוס
                    </button>
                  </motion.div>

                  {/* Trust Badges */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                    {[
                      { icon: <ShieldCheck size={14} />, label: 'תשלום מאובטח', c: '#22c55e' },
                      { icon: <Clock size={14} />, label: 'פרסום תוך 24 שעות', c: '#60a5fa' },
                      { icon: <Users size={14} />, label: '50K+ עוקבים', c: '#e8112d' },
                    ].map((b, i) => (
                      <React.Fragment key={i}>
                        <div className="flex items-center gap-1.5">
                          <span style={{ color: b.c }}>{b.icon}</span>
                          <span className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,0.48)' }}>{b.label}</span>
                        </div>
                        {i < 2 && <span className="w-px h-3 hidden sm:block" style={{ background: 'rgba(255,255,255,0.08)' }} />}
                      </React.Fragment>
                    ))}
                  </motion.div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer" style={{ color: 'rgba(255,255,255,0.18)' }}
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                  <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <ChevronDown size={28} />
                  </motion.div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════
                  HOW IT WORKS
              ═══════════════════════════════════════════════ */}
              <section id="how-it-works" className="space-y-14">
                <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5" style={{ background: 'rgba(232,17,45,0.09)', border: '1px solid rgba(232,17,45,0.22)' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#e8112d' }} />
                    <span className="text-xs font-black tracking-[0.18em] uppercase" style={{ color: '#e8112d' }}>תהליך פשוט ומהיר</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">איך זה עובד?</h2>
                  <p className="text-base" style={{ color: 'rgba(255,255,255,0.42)' }}>3 שלבים פשוטים והרכב שלך באוויר</p>
                </motion.div>

                <div className="relative max-w-5xl mx-auto">
                  <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+40px)] right-[calc(16.66%+40px)] h-px z-0"
                    style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(232,17,45,0.3) 0px, rgba(232,17,45,0.3) 8px, transparent 8px, transparent 18px)' }} />
                  <div className="grid md:grid-cols-3 gap-6 relative z-10">
                    {[
                      { step: '01', title: 'בחירת חבילה', desc: 'עיינו בחבילות הפרסום ובחרו את המסלול המתאים לצרכים שלכם. כל חבילה כוללת פירוט מלא של השירותים.', icon: <LayoutDashboard size={24} />, color: '#e8112d', bg: 'rgba(232,17,45,0.08)', border: 'rgba(232,17,45,0.2)', tag: 'בחר ושלם', tagIcon: <Check size={9} strokeWidth={3} /> },
                      { step: '02', title: 'הזנת פרטים', desc: 'מלאו פרטי הרכב בטופס המאובטח, העלו אישור תשלום ושלחו את הבקשה. התהליך לוקח פחות מ-3 דקות.', icon: <FileText size={24} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', tag: 'פחות מ-3 דקות', tagIcon: <Clock size={9} /> },
                      { step: '03', title: 'פרסום וחשיפה', desc: 'הצוות המקצועי שלנו מעצב ומפרסם מודעה ברמה הגבוהה ביותר. תוך 24 שעות הרכב שלכם נחשף לאלפי קונים.', icon: <Send size={24} />, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', tag: 'תוך 24 שעות', tagIcon: <Zap size={9} /> },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                        className="flex flex-col items-center text-center gap-5">
                        <div className="w-[100px] h-[100px] rounded-2xl flex flex-col items-center justify-center gap-2"
                          style={{ background: item.bg, border: `1px solid ${item.border}`, boxShadow: `0 6px 24px -8px ${item.color}20` }}>
                          <div style={{ color: item.color }}>{item.icon}</div>
                          <span className="text-[9px] font-black tracking-[0.15em] uppercase" style={{ color: `${item.color}75` }}>שלב {item.step}</span>
                        </div>
                        <div className="space-y-2.5">
                          <h3 className="text-xl font-black text-white">{item.title}</h3>
                          <p className="text-sm leading-relaxed max-w-[250px] mx-auto" style={{ color: 'rgba(255,255,255,0.48)' }}>{item.desc}</p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black"
                          style={{ background: item.bg, border: `1px solid ${item.border}`, color: item.color }}>
                          {item.tagIcon}{item.tag}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
                  <div className="flex items-center justify-between gap-4 p-5 rounded-2xl flex-wrap"
                    style={{ background: 'linear-gradient(135deg, rgba(232,17,45,0.08) 0%, rgba(10,10,15,0.8) 100%)', border: '1px solid rgba(232,17,45,0.18)', boxShadow: '0 8px 40px -15px rgba(232,17,45,0.18)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,17,45,0.12)', border: '1px solid rgba(232,17,45,0.22)' }}>
                        <Zap size={18} style={{ color: '#e8112d' }} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">מוכנים להתחיל?</p>
                        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>תהליך מהיר, פשוט ומקצועי</p>
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => { const el = document.getElementById('packages'); el?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="px-6 py-2.5 rounded-xl font-black text-sm text-white relative overflow-hidden group"
                      style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)' }}>
                      <span className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative flex items-center gap-2"><RocketIcon size={14} />בחר חבילה עכשיו</span>
                    </motion.button>
                  </div>
                </motion.div>
              </section>

              {/* ═══════════════════════════════════════════════
                  PACKAGES SECTION
              ═══════════════════════════════════════════════ */}
              <section id="packages" className="space-y-20">
                <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center space-y-4">
                  <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
                    style={{ background: 'linear-gradient(135deg, rgba(232,17,45,0.12), rgba(232,17,45,0.04))', border: '1px solid rgba(232,17,45,0.25)', backdropFilter: 'blur(8px)' }}>
                    <Sparkles size={14} style={{ color: '#e8112d' }} />
                    <span className="text-xs font-black tracking-[0.18em] uppercase" style={{ color: '#e8112d' }}>חבילות הפרסום שלנו</span>
                    <Sparkles size={14} style={{ color: '#e8112d' }} />
                  </motion.div>
                  <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-white">
                    חבילות הפרסום שלנו
                  </motion.h2>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.42)' }}>
                    בחר את המסלול המתאים ביותר עבורך
                  </motion.p>
                  <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
                    className="mx-auto h-px w-32" style={{ background: 'linear-gradient(90deg, transparent, #e8112d, transparent)' }} />
                </motion.div>

                {/* Regular Packages */}
                <div className="space-y-8">
                  <SectionHeader eyebrow="רכב פרטי" eyebrowIcon={<Car size={13} />} eyebrowColor="#60a5fa"
                    title="מוכרים" titleHighlight="רכב פרטי?" highlightColor="#e8112d"
                    subtitle="שלוש חבילות מדורגות לכל תקציב ומטרה. מחבילת הכניסה הבסיסית ועד הפרמיום המלא – כל אחת מותאמת לסוג הרכב ולמטרת המכירה שלך."
                    stats={[{ value: '₪149', label: 'מחבילה', color: '#94a3b8' }, { value: '1,000+', label: 'מכירות', color: '#e8112d' }, { value: '7-30', label: 'ימי פרסום', color: '#4ade80' }]} />
                  <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
                    {packages.map(pkg => <div key={pkg.id} className="h-[520px]"><PackageCard pkg={pkg} lang={lang} onSelect={handleSelectPackage} /></div>)}
                  </div>
                  <div className="md:hidden px-3">
                    <MobileSwiper cardHeight={520}>
                      {packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} lang={lang} onSelect={handleSelectPackage} />)}
                    </MobileSwiper>
                  </div>
                </div>

                {/* VIP + DUO */}
                <div className="space-y-8">
                  <SectionHeader eyebrow="פרימיום VIP" eyebrowIcon={<Crown size={13} />} eyebrowColor="#d4af37"
                    title="מחפשים" titleHighlight="יחס VIP?" highlightColor="#d4af37"
                    subtitle="לרכבי יוקרה וכאלה שמוכרים שני רכבים בבת אחת – שתי חבילות ייחודיות עם שירות אישי, עיצוב בלעדי, וחסכון משמעותי."
                    stats={[{ value: '60 יום', label: 'פרסום VIP', color: '#d4af37' }, { value: '40%', label: 'חיסכון DUO', color: '#8b5cf6' }, { value: '24/7', label: 'ליווי אישי', color: '#4ade80' }]} />
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

                {/* Business */}
                <div className="max-w-3xl mx-auto space-y-8">
                  <SectionHeader eyebrow="לסוכנויות ועסקים" eyebrowIcon={<Building2 size={13} />} eyebrowColor="#3b82f6"
                    title="פתרון מקצועי" titleHighlight="לסוכנים?" highlightColor="#3b82f6"
                    subtitle="חבילה עסקית מקיפה לסוכנויות רכב ומוכרים מרובי כלי רכב. ניהול מלא, דוחות חודשיים, ומנהל לקוח ייעודי שדואג לכם."
                    stats={[{ value: '50', label: 'רכבים/חודש', color: '#3b82f6' }, { value: '40%', label: 'הנחה', color: '#4ade80' }, { value: '2h', label: 'זמן תגובה', color: '#a78bfa' }]} />
                  <div className="h-[440px]"><BusinessPackageCard pkg={businessPackage} onSelect={handleSelectPackage} /></div>
                </div>

                {/* Equipment + Transport */}
                <div className="space-y-8">
                  <SectionHeader eyebrow="ציוד מקצועי ותחבורה" eyebrowIcon={<Truck size={13} />} eyebrowColor="#ea580c"
                    title="מוכרים" titleHighlight="ציוד מקצועי?" highlightColor="#ea580c"
                    subtitle="חבילות ייחודיות לציוד כבד, ציוד קל, ורכבים מסחריים. חשיפה ממוקדת לקהל המקצועי הנכון – קבלנים, חברות הסעות, ועסקים."
                    stats={[{ value: '85%', label: 'נמכרו תוך 14 יום', color: '#ea580c' }, { value: '500+', label: 'ציודים פורסמו', color: '#0ea5e9' }, { value: '3', label: 'קטגוריות', color: '#4ade80' }]} />
                  <div className="hidden md:grid grid-cols-3 gap-6">
                    {equipmentPackages.map(pkg => <div key={pkg.id} className="h-[460px]"><EquipmentPackageCard pkg={pkg} onSelect={handleSelectPackage} /></div>)}
                    <div className="h-[460px]"><TransportPackageCard pkg={transportPackage} onSelect={handleSelectPackage} /></div>
                  </div>
                  <div className="md:hidden px-3">
                    <MobileSwiper cardHeight={460}>
                      {equipmentPackages.map(pkg => <div key={pkg.id} style={{ height: '460px' }}><EquipmentPackageCard pkg={pkg} onSelect={handleSelectPackage} /></div>)}
                      <div style={{ height: '460px' }}><TransportPackageCard pkg={transportPackage} onSelect={handleSelectPackage} /></div>
                    </MobileSwiper>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════
                  WHY US — Premium Cards
              ═══════════════════════════════════════════════ */}
              <section id="why-us" className="space-y-10">
                <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-3">
                  <h2 className="text-4xl md:text-5xl font-black">{t.whyUs.title}</h2>
                  <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.42)' }}>הסיבות שאלפי מוכרים בחרו דווקא בנו</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { icon: <Users size={22} className="text-white" />, title: 'קהל איכותי', desc: '50,000+ עוקבים פעילים ומעורבים שמחפשים לקנות רכב', stat: '50K+', statLabel: 'עוקבים', gradFrom: '#1d4ed8', gradTo: '#0ea5e9', glowColor: 'rgba(59,130,246,0.25)' },
                    { icon: <Zap size={22} className="text-white" />, title: 'מהירות מכירה', desc: 'פרסום חכם וממוקד שמביא תוצאות מהירות – ממוצע 48 שעות עד עסקה', stat: '48h', statLabel: 'ממוצע מכירה', gradFrom: '#e8112d', gradTo: '#f43f5e', glowColor: 'rgba(232,17,45,0.3)' },
                    { icon: <TrendingUp size={22} className="text-white" />, title: 'אחוזי הצלחה', desc: '98% מלקוחותינו מרוצים ומוכרים בהצלחה תוך זמן קצר', stat: '98%', statLabel: 'שביעות רצון', gradFrom: '#16a34a', gradTo: '#22c55e', glowColor: 'rgba(34,197,94,0.25)' },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="relative rounded-2xl overflow-hidden flex flex-col"
                      style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.018) 100%)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: `0 20px 50px -15px ${item.glowColor}` }}>
                      <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${item.gradFrom}, ${item.gradTo})` }} />
                      <div className="p-6 flex flex-col gap-5 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${item.gradFrom}, ${item.gradTo})`, boxShadow: `0 6px 20px ${item.glowColor}` }}>
                            {item.icon}
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-black" style={{ color: item.gradTo }}>{item.stat}</div>
                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.statLabel}</div>
                          </div>
                        </div>
                        <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${item.gradFrom}28, transparent)` }} />
                        <div>
                          <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* ═══════════════════════════════════════════════
                  FAQ — Premium Accordion
              ═══════════════════════════════════════════════ */}
              <section id="faq" className="max-w-3xl mx-auto space-y-10">
                <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-3">
                  <h2 className="text-4xl md:text-5xl font-black">שאלות נפוצות</h2>
                  <p className="text-base" style={{ color: 'rgba(255,255,255,0.42)' }}>כל מה שצריך לדעת על תהליך הפרסום והמכירה</p>
                </motion.div>
                <div className="space-y-2.5">
                  {t.faqs.slice(0, showAllFaqs ? t.faqs.length : 3).map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="rounded-2xl overflow-hidden"
                      style={{ background: activeFaq === i ? 'rgba(232,17,45,0.04)' : 'rgba(255,255,255,0.025)', border: `1px solid ${activeFaq === i ? 'rgba(232,17,45,0.2)' : 'rgba(255,255,255,0.07)'}`, transition: 'all 0.25s' }}>
                      <motion.button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full px-5 py-4 flex items-center justify-between text-right gap-3 transition-all"
                        whileHover={{ x: -2 }}>
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0"
                            style={{ background: activeFaq === i ? 'rgba(232,17,45,0.15)' : 'rgba(255,255,255,0.05)', color: activeFaq === i ? '#e8112d' : 'rgba(255,255,255,0.45)', border: activeFaq === i ? '1px solid rgba(232,17,45,0.25)' : '1px solid rgba(255,255,255,0.08)' }}>
                            {i + 1}
                          </div>
                          <span className="font-bold text-base text-white">{item.q}</span>
                        </div>
                        <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ color: activeFaq === i ? '#e8112d' : 'rgba(255,255,255,0.35)' }}>
                          <ChevronDown size={18} />
                        </motion.div>
                      </motion.button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
                            <div className="px-5 pb-5 pr-16 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>{item.a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                {!showAllFaqs && t.faqs.length > 3 && (
                  <div className="text-center">
                    <motion.button onClick={() => setShowAllFaqs(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      className="px-6 py-3 rounded-xl font-black text-sm transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>
                      הצג את כל השאלות
                    </motion.button>
                  </div>
                )}
              </section>

              {/* ═══════════════════════════════════════════════
                  FOOTER — Premium Design
              ═══════════════════════════════════════════════ */}
              <footer className="pb-10">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="relative rounded-3xl overflow-hidden"
                  style={{ background: 'linear-gradient(145deg, rgba(232,17,45,0.06) 0%, rgba(10,10,14,0.98) 60%, rgba(5,5,8,1) 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,17,45,0.45), transparent)' }} />
                  
                  {/* Subtle background glow */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(232,17,45,0.04) 0%, transparent 70%)' }} />
                  
                  <div className="relative z-10 p-10 space-y-10">
                    {/* Logo */}
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center gap-4">
                        <motion.div whileHover={{ rotate: 12, scale: 1.1 }}
                          className="p-3 rounded-xl shadow-xl"
                          style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)', boxShadow: '0 6px 24px rgba(232,17,45,0.28)' }}>
                          <Car size={22} className="text-white" />
                        </motion.div>
                        <div>
                          <div className="text-3xl font-black tracking-tight">
                            <span style={{ color: '#e8112d' }}>YOUGO</span> <span className="text-white">ISRAEL</span>
                          </div>
                          <div className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.22)' }}>Digital Car Marketing</div>
                        </div>
                      </div>
                      <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        הפלטפורמה המובילה בישראל לפרסום ומכירת רכבים ברשתות חברתיות
                      </p>
                    </div>

                    {/* Social Links */}
                    <div>
                      <p className="text-center text-[10px] font-black uppercase tracking-[0.22em] mb-6" style={{ color: 'rgba(255,255,255,0.22)' }}>עקבו אחרינו</p>
                      <div className="flex items-center justify-center gap-3 flex-wrap">
                        {[
                          { href: 'https://instagram.com/yougo.israel', icon: <Instagram size={18} />, label: 'Instagram', color: '#E4405F' },
                          { href: 'https://facebook.com', icon: <Facebook size={18} />, label: 'Facebook', color: '#1877F2' },
                          { href: 'https://wa.me/972546980606', icon: <MessageCircle size={18} />, label: 'WhatsApp', color: '#25D366' },
                          { href: 'https://t.me/yougoisrael', icon: <Send size={18} />, label: 'Telegram', color: '#0088cc' },
                          { href: 'https://x.com/yougoisrael', icon: <Twitter size={18} />, label: 'X', color: '#ffffff' },
                          { href: 'https://youtube.com/@yougoisrael', icon: <Youtube size={18} />, label: 'YouTube', color: '#FF0000' },
                          { href: 'https://threads.net/@yougoisrael', icon: <MessageSquare size={18} />, label: 'Threads', color: '#888888' },
                        ].map((s, i) => (
                          <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -4 }} whileTap={{ scale: 0.95 }}
                            className="relative group">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                              style={{ color: s.color, border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}40`; e.currentTarget.style.background = `${s.color}12`; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>
                              {s.icon}
                            </div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.3)' }}>
                              {s.label}
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

                    {/* Footer Links */}
                    <div className="flex flex-wrap justify-center gap-3">
                      {[
                        { icon: <FileText size={14} />, label: 'תקנון', content: t.pages.terms.content },
                        { icon: <Lock size={14} />, label: 'פרטיות', content: t.pages.privacy.content },
                        { icon: <Info size={14} />, label: 'מי אנחנו', content: t.pages.about.content },
                        { icon: <LayoutDashboard size={14} />, label: 'ניהול', onClick: () => setView('admin-login'), content: '' },
                      ].map((link, i) => (
                        <motion.button key={i} whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          onClick={link.onClick ? link.onClick : () => setModalContent({ title: link.label, content: link.content })}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
                          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.55)' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                          <span style={{ color: 'rgba(232,17,45,0.65)' }}>{link.icon}</span>
                          {link.label}
                        </motion.button>
                      ))}
                    </div>

                    <div className="text-center pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="text-[10px] font-bold tracking-wider" style={{ color: 'rgba(255,255,255,0.15)' }}>
                        © {new Date().getFullYear()} YOUGO ISRAEL LTD · כל הזכויות שמורות
                      </div>
                    </div>
                  </div>
                </motion.div>
              </footer>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════
              BOOKING VIEW
          ═══════════════════════════════════════════════ */}
          {view === 'booking' && (
            <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: 'spring', stiffness: 220 }} className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center gap-3">
                <motion.button whileHover={{ x: -4, scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setView('home')}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-black transition-all"
                  style={{ border: '1px solid rgba(232,17,45,0.28)', background: 'rgba(232,17,45,0.08)', color: '#e8112d' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#e8112d'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,17,45,0.08)'; e.currentTarget.style.color = '#e8112d'; }}>
                  <ArrowLeft size={16} /><span>חזרה לחבילות</span>
                </motion.button>
                <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.15)' }} />
                <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.38)' }}>{selectedPackage?.name || 'הזמנה חדשה'}</span>
              </div>

              {/* Step indicator */}
              <div className="flex items-center justify-center gap-3 mb-4">
                {[1, 2].map((step) => (
                  <React.Fragment key={step}>
                    <motion.div className={`flex items-center gap-2 ${bookingStep >= step ? '' : 'opacity-40'}`} animate={bookingStep >= step ? { scale: [1, 1.08, 1] } : {}} transition={{ duration: 0.4 }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all"
                        style={{ borderColor: bookingStep >= step ? '#e8112d' : 'rgba(255,255,255,0.2)', background: bookingStep >= step ? 'rgba(232,17,45,0.18)' : 'transparent', color: bookingStep >= step ? '#e8112d' : 'rgba(255,255,255,0.5)' }}>
                        {bookingStep > step ? <Check size={16} /> : step}
                      </div>
                      <span className="text-sm font-black" style={{ color: bookingStep >= step ? '#fff' : 'rgba(255,255,255,0.4)' }}>{step === 1 ? 'פרטי רכב' : 'תשלום'}</span>
                    </motion.div>
                    {step === 1 && <div className="w-16 h-px" style={{ background: bookingStep >= 2 ? '#e8112d' : 'rgba(255,255,255,0.15)' }} />}
                  </React.Fragment>
                ))}
              </div>

              <div className="glass-card p-6">
                <AnimatePresence mode="wait">
                  {bookingStep === 1 && <CarDetailsForm formData={formData} setFormData={setFormData} onNext={() => setBookingStep(2)} selectedPackage={selectedPackage} onChangePackage={() => setShowChangePackage(true)} />}
                  {bookingStep === 2 && <PaymentForm formData={formData} setFormData={setFormData} selectedPackage={selectedPackage} onSubmit={handleSubmitOrder} loading={loading} onBack={() => setBookingStep(1)} onChangePackage={() => setShowChangePackage(true)} />}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════
              SUCCESS VIEW
          ═══════════════════════════════════════════════ */}
          {view === 'success' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="max-w-md mx-auto text-center space-y-6 py-12">
              <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 16px 48px rgba(34,197,94,0.3)' }}>
                <Check size={40} strokeWidth={3} className="text-white" />
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black">ההזמנה התקבלה!</h2>
                <p className="text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>מספר הזמנה: <span className="font-black" style={{ color: '#e8112d' }}>#{orderId}</span></p>
              </div>
              <div className="glass-card p-6 space-y-4 text-right">
                <p className="text-lg font-black">מה קורה עכשיו?</p>
                <div className="space-y-3">
                  {['הודעת וואטסאפ נשלחה למנהל המערכת', 'הצוות שלנו יבדוק את פרטי ההזמנה תוך שעה', 'נחזור אליך עם אישור סופי'].map((text, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-2 text-sm">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(34,197,94,0.18)' }}><Check size={12} style={{ color: '#4ade80' }} /></div>
                      <span style={{ color: 'rgba(255,255,255,0.78)' }}>{text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setView('home')}
                  className="flex-1 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all"
                  style={{ border: '1px solid rgba(232,17,45,0.25)', background: 'rgba(232,17,45,0.08)', color: '#e8112d' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#e8112d'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,17,45,0.08)'; e.currentTarget.style.color = '#e8112d'; }}>
                  <ArrowLeft size={14} />חזרה לדף הבית
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setView('check-status')}
                  className="flex-1 py-3 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)' }}>
                  <Search size={14} />בדוק סטטוס
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════
              CHECK STATUS VIEW
          ═══════════════════════════════════════════════ */}
          {view === 'check-status' && (
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto py-8">
              <OrderStatusCheck onClose={() => setView('home')} />
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════
              ADMIN LOGIN
          ═══════════════════════════════════════════════ */}
          {view === 'admin-login' && (
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm mx-auto py-12">
              <div className="glass-card p-6 space-y-5">
                <div className="text-center">
                  <motion.div className="w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)', boxShadow: '0 8px 28px rgba(232,17,45,0.3)' }}
                    animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Lock size={24} className="text-white" />
                  </motion.div>
                  <h2 className="text-xl font-black">כניסת מנהל</h2>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input type="password" placeholder="סיסמה" required className="input-field"
                    value={adminPassword} onChange={e => setAdminPassword(e.target.value)} />
                  <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                    className="w-full py-2.5 rounded-lg font-black text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)' }}>כניסה</motion.button>
                </form>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} onClick={() => setView('home')}
                  className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  style={{ border: '1px solid rgba(232,17,45,0.25)', background: 'rgba(232,17,45,0.08)', color: '#e8112d' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#e8112d'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,17,45,0.08)'; e.currentTarget.style.color = '#e8112d'; }}>
                  <ArrowLeft size={12} />ביטול
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════
              ADMIN DASHBOARD
          ═══════════════════════════════════════════════ */}
          {view === 'admin-dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black flex items-center gap-4"><LayoutDashboard style={{ color: '#e8112d' }} size={38} />לוח בקרה</h2>
                  <div className="flex gap-3 mt-3">
                    {['orders', 'settings'].map(tab => (
                      <motion.button key={tab} onClick={() => setAdminTab(tab as any)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        className={`px-5 py-2 rounded-full font-black text-sm transition-all ${adminTab === tab ? 'text-white' : 'text-white/50 hover:text-white/75'}`}
                        style={{ background: adminTab === tab ? 'linear-gradient(135deg, #e8112d, #b5001f)' : 'rgba(255,255,255,0.05)' }}>
                        {tab === 'orders' ? 'הזמנות' : 'הגדרות אתר'}
                      </motion.button>
                    ))}
                  </div>
                </div>
                {adminTab === 'orders' && (
                  <div className="flex items-center gap-4">
                    <div className="glass-card px-5 py-3 flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-bold">{orders.length} הזמנות סה"כ</span>
                    </div>
                    <motion.button onClick={fetchOrders} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      className="py-3 px-5 rounded-xl font-black text-sm text-white flex items-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)' }}>
                      <RefreshCw size={16} />רענן
                    </motion.button>
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
                      { label: 'נדחה', count: orders.filter(o => o.status === 'Rejected').length, color: '#e8112d', icon: <X size={18} /> },
                    ].map((stat, i) => (
                      <motion.div key={i} whileHover={{ y: -4, scale: 1.02 }}
                        className="rounded-2xl p-5 flex flex-col gap-3 shadow-xl"
                        style={{ background: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="flex items-center justify-between">
                          <div className="p-2.5 rounded-xl bg-gray-100" style={{ color: stat.color }}>{stat.icon}</div>
                          <div className="text-3xl font-black text-black">{stat.count}</div>
                        </div>
                        <div className="text-xs font-black text-gray-400 uppercase tracking-wider">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-right">
                        <thead style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                          <tr>
                            {['#ID', 'לקוח', 'חבילה', 'רכב', 'סטטוס', 'פעולות'].map(h => (
                              <th key={h} className="p-5 text-xs font-black uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          {orders.map(order => (
                            <tr key={order.id} className="transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <td className="p-5 font-mono text-sm font-black" style={{ color: '#e8112d' }}>YG-{order.id.toString().padStart(4, '0')}</td>
                              <td className="p-5">
                                <div className="text-sm font-bold">{order.full_name}</div>
                                <div className="text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.35)' }}><Smartphone size={11} />{order.phone}</div>
                              </td>
                              <td className="p-5"><span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>{order.package_name}</span></td>
                              <td className="p-5">
                                <div className="text-sm font-bold">{order.car_model}</div>
                                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{order.car_year} | {order.car_mileage} ק"מ</div>
                              </td>
                              <td className="p-5">
                                <div className={`inline-flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-full border ${order.status === 'Published' ? 'text-green-400 border-green-500/20 bg-green-500/10' : order.status === 'Rejected' ? 'text-red-400 border-red-500/20 bg-red-500/10' : order.status === 'Payment Verified' ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' : 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10'}`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Published' ? 'bg-green-400' : order.status === 'Rejected' ? 'bg-red-400' : order.status === 'Payment Verified' ? 'bg-blue-400' : 'bg-yellow-400'}`} />
                                  {order.status}
                                </div>
                              </td>
                              <td className="p-5">
                                <div className="flex items-center justify-center gap-3">
                                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => alert(`פרטי הזמנה ${order.id}`)}
                                    className="p-2 rounded-lg transition-all"
                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
                                    <Eye size={16} />
                                  </motion.button>
                                  <select className="rounded-lg p-2 text-xs outline-none transition-all"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'inherit' }}
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
                  <div className="space-y-5">
                    {[
                      { label: 'כמות עוקבים (Instagram)', key: 'followers_count' },
                      { label: 'מספר WhatsApp', key: 'whatsapp_number' },
                      { label: 'כותרת ראשית (Hero)', key: 'hero_title_he' },
                      { label: 'שורת מיצוב', key: 'positioning_line_he' },
                    ].map(f => (
                      <div key={f.key} className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.38)' }}>{f.label}</label>
                        <input type="text" className="input-field" value={siteSettings[f.key] || ''} onChange={(e) => setSiteSettings({ ...siteSettings, [f.key]: e.target.value })} />
                      </div>
                    ))}
                    <motion.button onClick={async () => {
                      setLoading(true);
                      const res = await fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(siteSettings) });
                      if (res.ok) alert('ההגדרות נשמרו בהצלחה');
                      setLoading(false);
                    }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="w-full py-4 rounded-xl font-black text-sm text-white disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #e8112d, #b5001f)' }} disabled={loading}>
                      {loading ? 'שומר...' : 'שמור הגדרות'}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)} title={modalContent?.title || ''}>{modalContent?.content}</Modal>

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
          transportPackage={transportPackage}
          onSelect={(p) => {
            setSelectedPackage(p);
            setFormData({ fullName: formData.fullName, phone: formData.phone, model: '', year: '', mileage: '', price: '', registration: '', testUntil: '', location: formData.location, paymentProof: '', carImages: [], model2: '', year2: '', mileage2: '', price2: '', registration2: '', testUntil2: '', agencyName: '', monthlyCars: '', agencyDetails: '', seats: '' });
          }}
          lang={lang}
        />
      )}
    </div>
  );
}
