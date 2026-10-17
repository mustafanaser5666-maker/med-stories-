export type StickerType = 'poll' | 'quiz' | 'question' | 'slider' | 'tip' | 'none';

export interface InteractiveSticker {
  type: StickerType;
  question: string;
  optionA?: string;
  optionB?: string;
  correctOption?: 'A' | 'B';
  sliderEmoji?: string;
}

export type IllustrationKey = 'pediatrician' | 'baby_fever' | 'baby_eating' | 'baby_sleeping' | 'custom';

export interface StoryIllustration {
  key: IllustrationKey;
  url: string;
  label: string;
  position: 'top' | 'center' | 'floating' | 'side';
  size: 'small' | 'medium' | 'large';
  shape: 'rounded' | 'circle' | 'borderless';
}

export interface StorySlide {
  id: string;
  slideNumber: number;
  badge: string;
  title: string;
  subtitle?: string;
  mainText: string;
  bulletPoints: string[];
  sticker: InteractiveSticker;
  illustration: StoryIllustration;
  colorTheme: string;
  footerNote: string;
}

export interface DoctorProfile {
  name: string;
  title: string;
  handle: string;
  avatarUrl: string;
  phone: string;
  clinicAddress: string;
  verified: boolean;
}

export interface StoryThemeConfig {
  id: string;
  name: string;
  bgGradient: string;
  cardBg: string;
  badgeBg: string;
  badgeText: string;
  titleColor: string;
  textColor: string;
  accentColor: string;
  borderLight: string;
}
