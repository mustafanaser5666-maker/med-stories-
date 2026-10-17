import { StoryIllustration, StoryThemeConfig } from '../types/story';

import cuteMaleDoctor from '../assets/images/cute_male_doctor_1792204272701.jpg';
import cutePediatrician from '../assets/images/cute_pediatrician_1792203736058.jpg';
import cuteBabyFever from '../assets/images/cute_baby_fever_1792203737185.jpg';
import cuteBabyEating from '../assets/images/cute_baby_eating_1792203737011.jpg';
import cuteBabySleeping from '../assets/images/cute_baby_sleeping_1792203737007.jpg';

export const DOCTOR_MUSTAFA_AVATAR = cuteMaleDoctor || '/images/cute_male_doctor_1792204272701.jpg';

export const DEFAULT_ILLUSTRATIONS: Record<string, StoryIllustration> = {
  pediatrician: {
    key: 'pediatrician',
    url: cuteMaleDoctor || '/images/cute_male_doctor_1792204272701.jpg',
    label: 'د. مصطفى الحسيني 🩺',
    position: 'top',
    size: 'medium',
    shape: 'rounded',
  },
  female_pediatrician: {
    key: 'pediatrician',
    url: cutePediatrician || '/images/cute_pediatrician_1792203736058.jpg',
    label: 'طبيبة أطفال مبتسمة 🩺',
    position: 'top',
    size: 'medium',
    shape: 'rounded',
  },
  baby_fever: {
    key: 'baby_fever',
    url: cuteBabyFever || '/images/cute_baby_fever_1792203737185.jpg',
    label: 'بيبي مصخن وكمادات 🤒',
    position: 'center',
    size: 'medium',
    shape: 'rounded',
  },
  baby_eating: {
    key: 'baby_eating',
    url: cuteBabyEating || '/images/cute_baby_eating_1792203737011.jpg',
    label: 'بيبي ياكل سيريلاك وشوربة 🥣',
    position: 'center',
    size: 'medium',
    shape: 'rounded',
  },
  baby_sleeping: {
    key: 'baby_sleeping',
    url: cuteBabySleeping || '/images/cute_baby_sleeping_1792203737007.jpg',
    label: 'بيبي نايم بهدوء ونجوم 🌙',
    position: 'center',
    size: 'medium',
    shape: 'rounded',
  },
};

export const COLOR_THEMES: Record<string, StoryThemeConfig> = {
  teal_mint: {
    id: 'teal_mint',
    name: 'نعناعي طبي منعش 🌿',
    bgGradient: 'from-emerald-950 via-teal-900 to-cyan-950',
    cardBg: 'bg-emerald-900/60 backdrop-blur-md border border-emerald-400/20',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30',
    badgeText: 'text-emerald-300',
    titleColor: 'text-emerald-200',
    textColor: 'text-emerald-50',
    accentColor: 'text-teal-400',
    borderLight: 'border-emerald-500/30',
  },
  soft_pink: {
    id: 'soft_pink',
    name: 'وردي لطيف ومريح 🌸',
    bgGradient: 'from-rose-950 via-pink-900 to-purple-950',
    cardBg: 'bg-pink-950/60 backdrop-blur-md border border-pink-400/20',
    badgeBg: 'bg-pink-500/20 text-pink-300 border border-pink-400/30',
    badgeText: 'text-pink-300',
    titleColor: 'text-pink-200',
    textColor: 'text-pink-50',
    accentColor: 'text-rose-400',
    borderLight: 'border-pink-500/30',
  },
  baby_blue: {
    id: 'baby_blue',
    name: 'أزرق سماوي طفولي 🩵',
    bgGradient: 'from-sky-950 via-blue-900 to-indigo-950',
    cardBg: 'bg-sky-950/60 backdrop-blur-md border border-sky-400/20',
    badgeBg: 'bg-sky-500/20 text-sky-300 border border-sky-400/30',
    badgeText: 'text-sky-300',
    titleColor: 'text-sky-200',
    textColor: 'text-sky-50',
    accentColor: 'text-cyan-400',
    borderLight: 'border-sky-500/30',
  },
  warm_amber: {
    id: 'warm_amber',
    name: 'دافئ عسلي برتقالي 🍯',
    bgGradient: 'from-amber-950 via-orange-900 to-yellow-950',
    cardBg: 'bg-amber-950/60 backdrop-blur-md border border-amber-400/20',
    badgeBg: 'bg-amber-500/20 text-amber-300 border border-amber-400/30',
    badgeText: 'text-amber-300',
    titleColor: 'text-amber-200',
    textColor: 'text-amber-50',
    accentColor: 'text-yellow-400',
    borderLight: 'border-amber-500/30',
  },
  lavender: {
    id: 'lavender',
    name: 'خزامى هادئ بنفسجي 💜',
    bgGradient: 'from-purple-950 via-violet-900 to-fuchsia-950',
    cardBg: 'bg-purple-950/60 backdrop-blur-md border border-purple-400/20',
    badgeBg: 'bg-purple-500/20 text-purple-300 border border-purple-400/30',
    badgeText: 'text-purple-300',
    titleColor: 'text-purple-200',
    textColor: 'text-purple-50',
    accentColor: 'text-violet-400',
    borderLight: 'border-purple-500/30',
  },
  dark_slate: {
    id: 'dark_slate',
    name: 'ليلي كحلي فخم 🌙',
    bgGradient: 'from-slate-950 via-gray-900 to-zinc-950',
    cardBg: 'bg-slate-900/70 backdrop-blur-md border border-slate-600/30',
    badgeBg: 'bg-blue-500/20 text-blue-300 border border-blue-400/30',
    badgeText: 'text-blue-300',
    titleColor: 'text-white',
    textColor: 'text-slate-200',
    accentColor: 'text-sky-400',
    borderLight: 'border-slate-500/30',
  },
};

export const CUTE_STICKER_EMOJIS = [
  '🩺', '🍼', '👶', '🧸', '🦷', '🌡️', '💉', '🩹', '🩵', '🥣',
  '🌙', '⭐', '🎈', '🐣', '💤', '💧', '🍎', '🥦', '✨', '⚠️',
  '❌', '✅', '💡', '🔔', '🤱', '😍', '🤒', '😭', '😴', '❤️'
];

export const COMMON_IRAQI_PHRASES = [
  'يا أمهاتنا الحبابات 🤍',
  'عيني خالة / ماما 👶',
  'ديروا بالكم من هاي الشغلة ⚠️',
  'الصخونة جهاز مناعة ديشتغل 🔥',
  'عافيات وصحة على جهالنا 🤲',
  'سؤال يوصلني يومية بالعيادة 🩺',
  'خرافة متوارثة لازم نوقفها ❌',
  'الجرعة تنحسب بالوزن مو بالعمر ⚖️',
  'إذا شفتي هاي العلامة.. للطوارئ فوراً 🚨',
  'لا تحتارين.. استشيري طبيب طفلج 💬'
];
