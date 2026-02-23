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
  Edit3,
  RefreshCw
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
  color?: string;
  gradient?: string;
  icon?: any;
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

// --- Package Change Modal ---
const PackageChangeModal = ({ isOpen, onClose, packages, onSelectPackage, currentPackage }: { 
  isOpen: boolean; 
  onClose: () => void; 
  packages: Package[]; 
  onSelectPackage: (pkg: Package) => void;
  currentPackage: Package | null;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
            className="relative glass-card w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-2xl font-bold text-brand-red">בחר חבילה אחרת</h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {packages.map(pkg => (
                <motion.div
                  key={pkg.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    onSelectPackage(pkg);
                    onClose();
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    currentPackage?.id === pkg.id 
                      ? 'border-brand-red bg-brand-red/10' 
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-red to-red-600 flex items-center justify-center">
                      {pkg.id === 'vip' ? <Crown size={18} className="text-white" /> :
                       pkg.id === 'duo' ? <Car size={18} className="text-white" /> :
                       pkg.id === 'business' ? <Building2 size={18} className="text-white" /> :
                       pkg.id.includes('equipment') ? <Truck size={18} className="text-white" /> :
                       <Star size={18} className="text-white" />}
                    </div>
                    <div>
                      <h4 className="font-black text-white">{pkg.name}</h4>
                      <p className="text-brand-red font-black text-sm">{pkg.price}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 line-clamp-2">{pkg.features[0]}</p>
                </motion.div>
              ))}
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
      className="relative w-[260px] md:w-full rounded-3xl overflow-hidden h-full flex flex-col snap-center shrink-0 group"
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

      <div className="relative z-10 p-5 space-y-4 flex-grow flex flex-col">
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-900/40 to-amber-800/20 rounded-full px-3 py-1 border border-amber-500/30">
            <Crown size={12} className="text-amber-400" />
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-300">VIP LUXURY</span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2 py-1">
            <span className="text-[8px] font-black text-emerald-400">15%</span>
          </div>
          <div className="flex mr-auto">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-black bg-gradient-to-l from-amber-200 via-amber-400 to-amber-300 bg-clip-text text-transparent">
            VIP LUXURY
          </h3>
          <p className="text-amber-100/40 text-[11px] mt-1 leading-relaxed">
            חבילת הפרסום האולטימטיבית
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-amber-400">₪749</span>
          <span className="text-xs line-through text-white/20">₪882</span>
          <span className="text-[9px] font-black bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
            חיסכון ₪133
          </span>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        <div className="grid grid-cols-2 gap-2 flex-grow">
          {[
            { icon: <Camera size={12} />, label: '15+ תמונות' },
            { icon: <Video size={12} />, label: 'רילס + סטורי' },
            { icon: <Calendar size={12} />, label: '60 ימים' },
            { icon: <TrendingUp size={12} />, label: 'חשיפה מקס' },
            { icon: <ShieldCheck size={12} />, label: 'ליווי 24/7' },
            { icon: <Crown size={12} />, label: 'עיצוב VIP' },
          ].slice(0, 4).map((feat, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2 py-1.5 border border-white/5">
              <span className="text-amber-400">{feat.icon}</span>
              <span className="text-[9px] font-medium text-white/80">{feat.label}</span>
            </div>
          ))}
        </div>

        <motion.button
          onClick={() => onSelect(pkg)}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl font-black text-sm bg-gradient-to-l from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all mt-2 relative overflow-hidden group"
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
      className="relative w-[260px] md:w-full rounded-3xl overflow-hidden h-full flex flex-col snap-center shrink-0 group"
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

      <div className="relative z-10 p-5 space-y-4 flex-grow flex flex-col">
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-purple-900/40 rounded-full px-3 py-1 border border-purple-500/30">
            <Car size={12} className="text-purple-400" />
            <Car size={12} className="text-purple-400" />
            <span className="text-[9px] font-black uppercase tracking-wider text-purple-300">DUO DEAL</span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2 py-1">
            <span className="text-[8px] font-black text-emerald-400">40%</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-black bg-gradient-to-l from-purple-200 via-purple-400 to-purple-300 bg-clip-text text-transparent">
            DUO DEAL
          </h3>
          <p className="text-purple-100/40 text-[11px] mt-1">פרסום 2 רכבים</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-purple-400">₪349</span>
          <span className="text-xs line-through text-white/20">₪598</span>
          <span className="text-[9px] font-black bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
            חיסכון ₪249
          </span>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        <div className="grid grid-cols-2 gap-2 flex-grow">
          {[
            { icon: <Car size={12} />, label: '2 רכבים' },
            { icon: <Camera size={12} />, label: '4 תמונות' },
            { icon: <Instagram size={12} />, label: 'פוסטים' },
            { icon: <Calendar size={12} />, label: '14 ימים' },
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2 py-1.5 border border-white/5">
              <span className="text-purple-400">{feat.icon}</span>
              <span className="text-[9px] font-medium text-white/80">{feat.label}</span>
            </div>
          ))}
        </div>

        <motion.button
          onClick={() => onSelect(pkg)}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl font-black text-sm bg-gradient-to-l from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all mt-2 relative overflow-hidden group"
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
};

// --- Equipment Package Card ---
const EquipmentPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  const isHeavy = pkg.id === 'equipment-heavy';
  
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative w-[260px] md:w-full rounded-2xl border transition-all duration-500 h-full flex flex-col p-5 snap-center shrink-0 group"
      style={{
        background: isHeavy 
          ? 'linear-gradient(135deg, rgba(234,88,12,0.08) 0%, rgba(15,12,8,1) 100%)' 
          : 'linear-gradient(135deg, rgba(100,116,139,0.08) 0%, rgba(10,12,15,1) 100%)',
        borderColor: isHeavy ? 'rgba(234,88,12,0.35)' : 'rgba(100,116,139,0.25)',
        boxShadow: isHeavy ? '0 0 30px rgba(234,88,12,0.06)' : 'none'
      }}
    >
      {isHeavy && (
        <div className="absolute -top-3 right-4 z-10 bg-orange-600 text-white text-[8px] font-black py-1 px-2 rounded-full shadow-lg uppercase tracking-widest">
          הכי מבוקש
        </div>
      )}

      <div className="flex items-center gap-2 mb-3 pb-2 border-b"
        style={{ borderColor: isHeavy ? 'rgba(234,88,12,0.15)' : 'rgba(100,116,139,0.1)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: isHeavy ? 'rgba(234,88,12,0.15)' : 'rgba(100,116,139,0.12)' }}>
          {isHeavy 
            ? <Truck size={18} style={{ color: '#ea580c' }} />
            : <Wrench size={18} style={{ color: '#94a3b8' }} />
          }
        </div>
        <div>
          <div className="text-[8px] font-black uppercase tracking-[0.2em] mb-0.5"
            style={{ color: isHeavy ? '#ea580c' : '#94a3b8' }}>
            {isHeavy ? 'ציוד כבד' : 'ציוד קל'}
          </div>
          <h3 className="text-sm font-black text-white">{pkg.name}</h3>
        </div>
        <div className="mr-auto text-right">
          <div className="text-lg font-black text-white">{pkg.price}</div>
          <div className="text-[8px] text-white/30 line-through">
            ₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}
          </div>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-1">
        {(isHeavy 
          ? ['באגר', 'מחפרון', 'מיני באגר', 'בולדוזר', 'עגורן'] 
          : ['פופקט', 'ג\'ק', 'מלגזה', 'סקיד סטיר', 'מערבל']
        ).slice(0, 3).map((item, i) => (
          <span key={i} className="text-[8px] font-black px-1.5 py-0.5 rounded-full border group-hover:bg-white/5 transition-all duration-300"
            style={{ 
              color: isHeavy ? '#fb923c' : '#94a3b8',
              borderColor: isHeavy ? 'rgba(234,88,12,0.25)' : 'rgba(100,116,139,0.2)',
              background: isHeavy ? 'rgba(234,88,12,0.08)' : 'rgba(100,116,139,0.06)'
            }}>
            {item}
          </span>
        ))}
      </div>

      <div className="space-y-1.5 mb-4 flex-grow">
        {pkg.features.slice(0, 3).map((f, i) => (
          <div key={i} className="flex items-start gap-1.5 text-[9px] font-medium group/feature">
            <div className="mt-0.5 p-0.5 rounded-full shrink-0 group-hover/feature:scale-110 transition-transform duration-300"
              style={{ background: isHeavy ? 'rgba(234,88,12,0.6)' : 'rgba(100,116,139,0.4)' }}>
              <Check size={6} className="text-dark-bg" strokeWidth={5} />
            </div>
            <span className="text-white/80 group-hover/feature:text-white transition-colors duration-300">{f}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(pkg)}
        className="w-full py-2.5 rounded-xl font-black text-xs transition-all duration-300 active:scale-95 relative overflow-hidden group/btn"
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

// --- Business Package Card (New Enhanced Design) ---
const BusinessPackageCard = ({ pkg, onSelect }: { pkg: Package, onSelect: (p: Package) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative w-full rounded-3xl overflow-hidden group cursor-pointer"
      onClick={() => onSelect(pkg)}
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
            onClick={(e) => { e.stopPropagation(); onSelect(pkg); }}
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
            <span className="text-xs">50+ סוכנויות מרות</span>
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

  const featureChips = pkg.features.slice(0, 4);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative w-[250px] md:w-full rounded-2xl h-full flex flex-col snap-center shrink-0 group"
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
        <div className="absolute top-2 right-2 z-10 text-white text-[8px] font-black py-0.5 px-2 rounded-full shadow-lg uppercase tracking-widest"
          style={{ background: cfg.color }}>
          {t.mostPopular}
        </div>
      )}

      <div className="absolute top-2 left-2 text-[8px] font-black py-0.5 px-2 rounded-full"
        style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}>
        15% OFF
      </div>

      <div className="p-4 flex flex-col flex-grow gap-3">
        <div className="flex items-center gap-2 mt-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 group-hover:scale-110 transition-transform duration-300"
            style={{ background: cfg.accentBg, border: `1px solid ${cfg.borderColor}` }}>
            {cfg.badge}
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight" style={{ color: isPremium || isPro ? cfg.color : '#fff' }}>
              {pkg.name}
            </h3>
            <p className="text-[8px] leading-tight" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {pkg.id === 'basic' ? t.packageSubtitles.basic :
               pkg.id === 'pro' ? t.packageSubtitles.pro :
               t.packageSubtitles.premium}
            </p>
          </div>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-white">{pkg.price}</span>
          <span className="text-[9px] line-through" style={{ color: 'rgba(255,255,255,0.3)' }}>
            ₪{Math.round(parseInt(pkg.price.replace('₪', '')) / 0.85)}
          </span>
        </div>

        <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${cfg.borderColor}, transparent)` }} />

        <div className="flex flex-col gap-1.5 flex-grow">
          {featureChips.map((feat, i) => (
            <div key={i} className="flex items-center gap-1.5 group/feature">
              <div className="w-3 h-3 rounded-full flex items-center justify-center shrink-0 group-hover/feature:scale-110 transition-transform duration-300"
                style={{ background: cfg.accentBg, border: `1px solid ${cfg.borderColor}` }}>
                <Check size={6} strokeWidth={3} style={{ color: cfg.color }} />
              </div>
              <span className="text-[9px] font-medium" style={{ color: 'rgba(255,255,255,0.78)' }}>{feat}</span>
            </div>
          ))}
          {pkg.features.length > 4 && (
            <span className="text-[8px] font-bold mt-0.5" style={{ color: cfg.color }}>
              + {pkg.features.length - 4} תכונות נוספות
            </span>
          )}
        </div>

        <button
          onClick={() => onSelect(pkg)}
          className="w-full py-2.5 rounded-lg font-black text-xs transition-all duration-200 active:scale-95 mt-1 relative overflow-hidden group/btn"
          style={{
            background: isPremium || isPro ? cfg.color : 'rgba(255,255,255,0.1)',
            color: isPremium || isPro ? '#fff' : '#fff'
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
  const h = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const fontSize = size === 'sm' ? 11 : size === 'lg' ? 16 : 13;
  const px = size === 'sm' ? 8 : 12;
  return (
    <div
      className="inline-flex items-center justify-center rounded-lg overflow-hidden shrink-0"
      style={{ background: '#0D3D3D', height: h, paddingLeft: px, paddingRight: px, gap: 4 }}
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
    </div>
  );
};

const PayBoxLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const h = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const fontSize = size === 'sm' ? 10 : size === 'lg' ? 14 : 12;
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;
  const px = size === 'sm' ? 8 : 12;
  return (
    <div
      className="inline-flex items-center justify-center rounded-lg overflow-hidden shrink-0"
      style={{ background: '#29ABE2', height: h, paddingLeft: px, paddingRight: px, gap: 4 }}
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
      className="glass-card p-6 space-y-5"
    >
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-brand-red/30">
          <Search size={28} className="text-white" />
        </div>
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
            <button
              onClick={() => setOrderNumber('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          onClick={checkOrder}
          disabled={status === 'loading'}
          className="w-full py-3 bg-gradient-to-r from-brand-red to-red-600 rounded-xl font-black text-sm shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 transition-all disabled:opacity-50"
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 text-center"
          >
            <X size={24} className="text-red-400 mx-auto mb-1" />
            <p className="text-red-400 font-black text-sm">ההזמנה לא נמצאה</p>
            <p className="text-white/40 text-xs mt-1">בדוק את המספר ונסה שנית</p>
          </motion.div>
        )}
      </div>

      <button
        onClick={onClose}
        className="w-full text-xs text-white/40 hover:text-white/60 transition-colors"
      >
        חזור לדף הבית
      </button>
    </motion.div>
  );
};

// --- Step 1: Car Details Form with Package Change Option ---
const CarDetailsForm = ({ 
  formData, 
  setFormData, 
  onNext,
  selectedPackage,
  packages,
  onPackageChange
}: { 
  formData: any, 
  setFormData: (data: any) => void, 
  onNext: () => void,
  selectedPackage: Package | null,
  packages: Package[],
  onPackageChange: (pkg: Package) => void
}) => {
  const [showPackageModal, setShowPackageModal] = useState(false);

  // Get package style based on package id
  const getPackageStyle = () => {
    switch(selectedPackage?.id) {
      case 'vip':
        return {
          bg: 'bg-gradient-to-r from-amber-900/20 to-amber-800/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          icon: <Crown size={16} className="text-amber-400" />
        };
      case 'duo':
        return {
          bg: 'bg-gradient-to-r from-purple-900/20 to-purple-800/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          icon: <Car size={16} className="text-purple-400" />
        };
      case 'business':
        return {
          bg: 'bg-gradient-to-r from-blue-900/20 to-blue-800/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          icon: <Building2 size={16} className="text-blue-400" />
        };
      case 'equipment-heavy':
        return {
          bg: 'bg-gradient-to-r from-orange-900/20 to-orange-800/10',
          border: 'border-orange-500/30',
          text: 'text-orange-400',
          icon: <Truck size={16} className="text-orange-400" />
        };
      case 'equipment-light':
        return {
          bg: 'bg-gradient-to-r from-slate-900/20 to-slate-800/10',
          border: 'border-slate-500/30',
          text: 'text-slate-400',
          icon: <Wrench size={16} className="text-slate-400" />
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-brand-red/20 to-red-800/10',
          border: 'border-brand-red/30',
          text: 'text-brand-red',
          icon: <Star size={16} className="text-brand-red" />
        };
    }
  };

  const style = getPackageStyle();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-5"
    >
      {/* Package Change Modal */}
      <PackageChangeModal 
        isOpen={showPackageModal}
        onClose={() => setShowPackageModal(false)}
        packages={packages}
        onSelectPackage={onPackageChange}
        currentPackage={selectedPackage}
      />

      {/* Selected Package Banner */}
      <div className={`p-4 rounded-xl border-2 ${style.border} ${style.bg} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-red to-red-600 flex items-center justify-center">
            {style.icon}
          </div>
          <div>
            <p className="text-xs text-white/50">חבילה נבחרת</p>
            <p className={`font-black ${style.text}`}>{selectedPackage?.name}</p>
            <p className="text-xs text-white/70">{selectedPackage?.price}</p>
          </div>
        </div>
        <button
          onClick={() => setShowPackageModal(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all text-xs"
        >
          <RefreshCw size={12} />
          שנה חבילה
        </button>
      </div>

      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30">
          <Car size={28} className="text-white" />
        </div>
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

      <button
        onClick={onNext}
        className="w-full py-3 bg-gradient-to-r from-brand-red to-red-600 rounded-xl font-black text-sm shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 transition-all mt-2"
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

  // Get package style based on package id
  const getPackageStyle = () => {
    switch(selectedPackage?.id) {
      case 'vip':
        return {
          bg: 'bg-gradient-to-r from-amber-900/20 to-amber-800/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          icon: <Crown size={20} className="text-amber-400" />
        };
      case 'duo':
        return {
          bg: 'bg-gradient-to-r from-purple-900/20 to-purple-800/10',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          icon: <Car size={20} className="text-purple-400" />
        };
      case 'business':
        return {
          bg: 'bg-gradient-to-r from-blue-900/20 to-blue-800/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          icon: <Building2 size={20} className="text-blue-400" />
        };
      case 'equipment-heavy':
        return {
          bg: 'bg-gradient-to-r from-orange-900/20 to-orange-800/10',
          border: 'border-orange-500/30',
          text: 'text-orange-400',
          icon: <Truck size={20} className="text-orange-400" />
        };
      case 'equipment-light':
        return {
          bg: 'bg-gradient-to-r from-slate-900/20 to-slate-800/10',
          border: 'border-slate-500/30',
          text: 'text-slate-400',
          icon: <Wrench size={20} className="text-slate-400" />
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-brand-red/20 to-red-800/10',
          border: 'border-brand-red/30',
          text: 'text-brand-red',
          icon: <Star size={20} className="text-brand-red" />
        };
    }
  };

  const style = getPackageStyle();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto shadow-xl shadow-green-500/30">
          <CreditCard size={28} className="text-white" />
        </div>
        <h3 className="text-xl font-black">תשלום והעלאת אישור</h3>
        <p className="text-white/50 text-xs">בחר אמצעי תשלום והעלה צילום מסך</p>
      </div>

      {/* Package summary with package-specific styling */}
      <div className={`p-4 rounded-xl border-2 ${style.border} ${style.bg}`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-red to-red-600 flex items-center justify-center">
            {style.icon}
          </div>
          <div>
            <p className="text-xs text-white/50">חבילה נבחרת</p>
            <p className={`font-black ${style.text}`}>{selectedPackage?.name}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
          <span className="text-white/60">מחיר:</span>
          <span className={`font-black text-lg ${style.text}`}>{selectedPackage?.price}</span>
        </div>
      </div>

      {/* Payment methods */}
      <div className="space-y-2">
        <label className="text-xs font-black text-white/60">אמצעי תשלום *</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setPaymentMethod('bit')}
            className={`p-3 rounded-xl border-2 transition-all ${
              paymentMethod === 'bit' 
                ? 'border-[#00E5CC] bg-[#00E5CC]/10' 
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <BitLogo size="md" />
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('paybox')}
            className={`p-3 rounded-xl border-2 transition-all ${
              paymentMethod === 'paybox' 
                ? 'border-[#29ABE2] bg-[#29ABE2]/10' 
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <PayBoxLogo size="md" />
          </button>
        </div>
      </div>

      {paymentMethod && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${style.border} ${style.bg} space-y-3`}
        >
          <div className="text-center">
            <p className="text-white/60 text-xs">העבר את הסכום למספר:</p>
            <p className="text-xl font-black tracking-wider text-white">054-6980606</p>
          </div>

          <button
            onClick={() => navigator.clipboard.writeText('0546980606')}
            className="w-full py-2 bg-white/5 rounded-lg border border-white/10 text-xs font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <FileText size={12} />
            העתק מספר
          </button>

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
              <div className={`rounded-lg border-2 border-dashed py-3 px-3 flex flex-col items-center gap-1 transition-colors ${
                formData.paymentProof ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/5'
              }`}>
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
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex gap-2">
        <button
          onClick={onBack}
          className="flex-1 py-2.5 bg-white/5 rounded-xl font-black text-sm border border-white/10 hover:bg-white/10 transition-all"
        >
          חזור
        </button>
        <button
          onClick={onSubmit}
          disabled={!paymentMethod || !formData.paymentProof || loading}
          className="flex-1 py-2.5 bg-gradient-to-r from-brand-red to-red-600 rounded-xl font-black text-sm shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

  // All packages for change modal
  const allPackages = [
    ...packages,
    vipPackage,
    duoPackage,
    businessPackage,
    ...equipmentPackages
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
      const pkgEmoji = pkgId === 'vip' ? '👑' : pkgId === 'premium' ? '💎' : pkgId === 'pro' ? '⭐' : pkgId.includes('equipment') ? '🚜' : pkgId === 'business' ? '🏢' : pkgId === 'duo' ? '🚗🚗' : '✅';

      const randomId = Math.floor(10000 + Math.random() * 90000);
      const orderNum = String(randomId).slice(0, 5);

      // Custom message based on package type
      let packageSpecificMessage = '';
      if (pkgId === 'duo') {
        packageSpecificMessage = '\n📸 *נא לשלוח תמונות של שני הרכבים לוואטסאפ*';
      } else if (pkgId.includes('equipment')) {
        packageSpecificMessage = '\n🔧 *נא לשלוח תמונות מפורטות של הציוד*';
      } else if (pkgId === 'vip') {
        packageSpecificMessage = '\n👑 *נא לשלוח תמונות וסרטון באיכות גבוהה*';
      }

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
${packageSpecificMessage}
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
    <div className="min-h-screen bg-[#0a0a0c] text-white">
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
          background: rgba(200, 16, 46, 0.1);
        }
      `}</style>

      <Navbar lang={lang} setLang={setLang} isAdmin={isAdmin} onLogout={() => { setIsAdmin(false); setView('home'); }} siteSettings={siteSettings} setView={setView} />

      <main className="pt-24 px-3 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              {/* Hero Section - بدون فيديو، تصميم احترافي */}
              <section className="relative text-center py-16 overflow-hidden">
                {/* خلفية احترافية */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-dark-bg to-purple-600/20" />
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 40%, #fff 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
                
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10"
                >
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
                    <Sparkles size={16} className="text-brand-red" />
                    <span className="text-xs font-black tracking-wider text-white/90">הדרך המהירה ביותר למכור רכב</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-4">
                    מוכרים רכב? <br />
                    <span className="text-brand-red">אנחנו מוכרים אותו מהר יותר.</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                    YOUGO ISRAEL - פלטפורמת השיווק המובילה באינסטגרם למכירת רכבים.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const el = document.getElementById('packages');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-brand-red to-red-600 rounded-xl font-black text-lg shadow-xl shadow-brand-red/30 hover:shadow-brand-red/40 transition-all"
                    >
                      התחל הזמנה
                    </motion.button>
                    
                    <button 
                      onClick={() => setView('check-status')}
                      className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl font-black text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                      <Search size={20} />
                      בדוק סטטוס
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-white/70">
                      <ShieldCheck size={16} className="text-brand-red" />
                      <span className="text-sm">תשלום מאובטח</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock size={16} className="text-brand-red" />
                      <span className="text-sm">פרסום תוך 24 שעות</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Users size={16} className="text-brand-red" />
                      <span className="text-sm">50K+ עוקבים</span>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* How it Works */}
              <section id="how-it-works" className="space-y-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-2"
                >
                  <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-1">
                    <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
                    <span className="text-xs font-black tracking-wider text-brand-red">תהליך פשוט ומהיר</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black">איך זה עובד?</h2>
                  <p className="text-white/50 text-xs md:text-sm max-w-xl mx-auto">3 שלבים פשוטים והרכב שלך באוויר</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      step: '01',
                      title: 'בחירת חבילה',
                      desc: 'בוחרים את חבילת הפרסום המתאימה',
                      icon: <LayoutDashboard size={24} />,
                      color: 'from-blue-500 to-cyan-500'
                    },
                    {
                      step: '02',
                      title: 'הזנת פרטים',
                      desc: 'ממלאים פרטי הרכב ומעלים אישור תשלום',
                      icon: <FileText size={24} />,
                      color: 'from-brand-red to-red-600'
                    },
                    {
                      step: '03',
                      title: 'פרסום וחשיפה',
                      desc: 'הצוות שלנו מעצב ומפרסם מודעה מקצועית',
                      icon: <Send size={24} />,
                      color: 'from-green-500 to-emerald-500'
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl group-hover:scale-105 transition-transform duration-300" />
                      <div className="relative p-5 text-center">
                        <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                          {item.icon}
                        </div>
                        <div className="text-4xl font-black text-white/10 absolute top-2 left-2">{item.step}</div>
                        <h3 className="text-base font-black mb-2">{item.title}</h3>
                        <p className="text-white/50 text-xs">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Packages Section */}
              <section id="packages" className="space-y-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-2"
                >
                  <h2 className="text-2xl md:text-4xl font-black">{t.packages}</h2>
                  <p className="text-white/50 text-xs md:text-sm max-w-xl mx-auto">בחר את המסלול המתאים ביותר עבורך</p>
                </motion.div>
                
                {/* Regular packages */}
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-2 mb-4"
                  >
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 px-3 py-1 rounded-full">
                      <Car size={12} className="text-blue-400" />
                      <span className="text-[10px] font-black tracking-wider text-blue-400">חבילות רכב פרטי</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black">
                      מוכרים <span className="text-brand-red">רכב פרטי?</span>
                    </h3>
                    <p className="text-white/50 text-xs max-w-lg mx-auto">
                      חבילות פרסום מותאמות אישית למכירת רכב פרטי
                    </p>
                  </motion.div>
                  
                  <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto pb-4 snap-x no-scrollbar">
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
                    className="text-center space-y-2 mb-4"
                  >
                    <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full">
                      <Crown size={12} className="text-amber-400" />
                      <span className="text-[10px] font-black tracking-wider text-amber-400">חבילות פרימיום VIP</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black">
                      מחפשים <span className="text-amber-400">יחס VIP?</span>
                    </h3>
                    <p className="text-white/50 text-xs max-w-lg mx-auto">
                      חבילות פרימיום עם חשיפה מקסימלית
                    </p>
                  </motion.div>
                  
                  <div className="flex md:grid md:grid-cols-2 gap-3 overflow-x-auto pb-4 snap-x no-scrollbar">
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

                {/* Business Package - Enhanced */}
                <div>
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-2 mb-4"
                  >
                    <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 px-3 py-1 rounded-full">
                      <Truck size={12} className="text-orange-400" />
                      <span className="text-[10px] font-black tracking-wider text-orange-400">חבילות ציוד כבד</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black">
                      מוכרים <span className="text-orange-400">ציוד מקצועי?</span>
                    </h3>
                    <p className="text-white/50 text-xs max-w-lg mx-auto">
                      פרסום לבאגרים, מחפרונים וכל ציוד כבד
                    </p>
                  </motion.div>

                  <div className="flex md:grid md:grid-cols-2 gap-3 max-w-3xl mx-auto overflow-x-auto pb-4 snap-x no-scrollbar">
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

              {/* Why Us Section */}
              <section id="why-us" className="space-y-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-2"
                >
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1">
                    <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                    <span className="text-xs font-black tracking-wider text-white/60">היתרון שלנו</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black">{t.whyUs.title}</h2>
                  <p className="text-white/50 text-xs md:text-sm max-w-xl mx-auto">הסיבות שאלפי מוכרים בחרו דווקא בנו</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <Users size={24} />,
                      title: 'קהל איכותי',
                      desc: '50,000+ עוקבים פעילים',
                      stat: '50K+',
                      color: 'from-blue-500 to-cyan-500'
                    },
                    {
                      icon: <Zap size={24} />,
                      title: 'מהירות מכירה',
                      desc: 'זמן ממוצע של 48 שעות',
                      stat: '48h',
                      color: 'from-brand-red to-red-600'
                    },
                    {
                      icon: <TrendingUp size={24} />,
                      title: 'אחוזי הצלחה',
                      desc: '98% מהלקוחות מרוצים',
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
                      whileHover={{ y: -5 }}
                      className="relative p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 group"
                    >
                      <div className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <div className="text-3xl font-black text-white/10 absolute top-3 right-3">{item.stat}</div>
                      <h3 className="text-base font-black mb-1">{item.title}</h3>
                      <p className="text-white/50 text-xs">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="max-w-3xl mx-auto space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-2"
                >
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1">
                    <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                    <span className="text-xs font-black tracking-wider text-white/60">שאלות נפוצות</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black">שאלות נפוצות</h2>
                  <p className="text-white/50 text-xs">כל מה שצריך לדעת על תהליך הפרסום והמכירה</p>
                </motion.div>

                <div className="space-y-2">
                  {t.faqs.slice(0, showAllFaqs ? t.faqs.length : 3).map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl overflow-hidden border border-white/10 bg-white/5"
                    >
                      <button 
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        className="w-full px-4 py-3 flex items-center justify-between text-right gap-3 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-6 h-6 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red font-black text-xs">
                            {i + 1}
                          </div>
                          <span className="font-bold text-sm">{item.q}</span>
                        </div>
                        {activeFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <AnimatePresence>
                        {activeFaq === i && (
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-3 pr-12 text-white/60 text-xs leading-relaxed">
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
                    <button 
                      onClick={() => setShowAllFaqs(true)}
                      className="px-5 py-2 bg-white/5 rounded-lg font-black text-xs border border-white/10 hover:bg-white/10 transition-all"
                    >
                      הצג את כל השאלות
                    </button>
                  </div>
                )}
              </section>

              {/* Footer */}
              <footer className="pb-8">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 via-transparent to-brand-red/5" />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-brand-red to-red-600 rounded-lg shadow-lg">
                          <Car size={18} className="text-white" />
                        </div>
                        <div className="text-xl font-black tracking-tighter">
                          <span className="text-brand-red">YOUGO</span> <span className="text-white">ISRAEL</span>
                        </div>
                      </div>
                      <p className="text-white/50 text-xs max-w-xs mx-auto">
                        הצטרפו לאלפי לקוחות מרוצים
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      {[
                        { href: 'https://instagram.com', icon: <Instagram size={14} /> },
                        { href: 'https://tiktok.com', icon: <Smartphone size={14} /> },
                        { href: 'https://telegram.org', icon: <Send size={14} /> },
                        { href: 'https://wa.me/972546980606', icon: <MessageSquare size={14} /> },
                      ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank"
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red hover:scale-110 transition-all duration-200"
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="flex flex-wrap justify-center gap-3">
                      {[
                        { icon: <FileText size={12} />, label: 'תקנון', onClick: () => setModalContent(t.pages.terms) },
                        { icon: <Lock size={12} />, label: 'פרטיות', onClick: () => setModalContent(t.pages.privacy) },
                        { icon: <Info size={12} />, label: 'מי אנחנו', onClick: () => setModalContent(t.pages.about) },
                        { icon: <LayoutDashboard size={12} />, label: 'ניהול', onClick: () => setView('admin-login') },
                      ].map((link, i) => (
                        <button key={i} onClick={link.onClick}
                          className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {link.icon}
                          {link.label}
                        </button>
                      ))}
                    </div>

                    <div className="text-center text-white/20 text-[9px] font-bold">
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
              className="max-w-2xl mx-auto space-y-6"
            >
              <button 
                onClick={() => setView('home')}
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-2"
              >
                <ArrowLeft size={16} />
                חזרה לחבילות
              </button>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className={`flex items-center gap-1 ${bookingStep >= 1 ? 'text-brand-red' : 'text-white/30'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${
                    bookingStep >= 1 ? 'border-brand-red bg-brand-red/10' : 'border-white/20'
                  }`}>
                    1
                  </div>
                  <span className="text-xs font-black">פרטי רכב</span>
                </div>
                <div className={`w-12 h-px ${bookingStep >= 2 ? 'bg-brand-red' : 'bg-white/10'}`} />
                <div className={`flex items-center gap-1 ${bookingStep >= 2 ? 'text-brand-red' : 'text-white/30'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${
                    bookingStep >= 2 ? 'border-brand-red bg-brand-red/10' : 'border-white/20'
                  }`}>
                    2
                  </div>
                  <span className="text-xs font-black">תשלום</span>
                </div>
              </div>

              <div className="glass-card p-5">
                <AnimatePresence mode="wait">
                  {bookingStep === 1 && (
                    <CarDetailsForm
                      formData={formData}
                      setFormData={setFormData}
                      onNext={() => setBookingStep(2)}
                      selectedPackage={selectedPackage}
                      packages={allPackages}
                      onPackageChange={(pkg) => {
                        setSelectedPackage(pkg);
                      }}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center space-y-6 py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30"
              >
                <Check size={32} strokeWidth={3} className="text-white" />
              </motion.div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-black">ההזמנה התקבלה!</h2>
                <p className="text-white/60 text-sm">
                  מספר הזמנה: <span className="text-brand-red font-black">#{orderId}</span>
                </p>
              </div>

              <div className="glass-card p-5 space-y-4">
                <p className="text-base font-black">מה קורה עכשיו?</p>
                <div className="space-y-2 text-right">
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
                      className="flex items-center gap-2 text-xs"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check size={10} className="text-green-400" />
                      </div>
                      <span className="text-white/70">{text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10">
                  <p className="text-brand-red text-xs font-black">
                    ניתן לבדוק את מצב ההזמנה דרך מספר ההזמנה באתר!
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setView('home')}
                  className="flex-1 py-2.5 bg-white/5 rounded-xl font-black text-xs border border-white/10 hover:bg-white/10 transition-all"
                >
                  חזרה לדף הבית
                </button>
                <button 
                  onClick={() => setView('check-status')}
                  className="flex-1 py-2.5 bg-gradient-to-r from-brand-red to-red-600 rounded-xl font-black text-xs shadow-lg"
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
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Lock size={24} className="text-white" />
                  </div>
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
                  <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-brand-red to-red-600 rounded-lg font-black text-sm">
                    כניסה
                  </button>
                </form>
                
                <button onClick={() => setView('home')} className="w-full text-xs text-white/40 hover:text-white/60 transition-colors">
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
