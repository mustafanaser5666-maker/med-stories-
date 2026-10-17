import React from 'react';
import { StorySlide, DoctorProfile } from '../types/story';
import { COLOR_THEMES } from '../data/cartoonLibrary';
import { CheckCircle2, AlertTriangle, Sparkles, Heart, Send, Check } from 'lucide-react';

interface StoryCanvasProps {
  slide: StorySlide;
  totalSlides: number;
  currentSlideIndex: number;
  doctorProfile: DoctorProfile;
  onNextSlide?: () => void;
  onPrevSlide?: () => void;
  interactivePreview?: boolean;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  onShare?: () => void;
  hideInstagramUI?: boolean;
}

export const StoryCanvas: React.FC<StoryCanvasProps> = ({
  slide,
  totalSlides,
  currentSlideIndex,
  doctorProfile,
  onNextSlide,
  onPrevSlide,
  interactivePreview = false,
  canvasRef,
  onShare,
  hideInstagramUI = true,
}) => {
  const theme = COLOR_THEMES[slide.colorTheme] || COLOR_THEMES.teal_mint;

  return (
    <div className="relative flex justify-center items-center select-none w-full max-w-[380px] mx-auto">
      {/* 9:16 Instagram Story Container */}
      <div
        ref={canvasRef}
        data-story-canvas="true"
        className={`relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${theme.bgGradient} flex flex-col justify-between text-white p-5 border border-white/10`}
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Subtle decorative background glow and patterns */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-teal-400/20 blur-3xl" />
          {/* Subtle dots pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        </div>

        {/* Top Header */}
        {hideInstagramUI ? (
          /* Natural Clean Story Mode (No duplicate Instagram account at top right) */
          <div className="relative z-20 pt-1 pb-1 flex items-center justify-between">
            <span className="text-[10px] font-bold text-white/60 bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
              {currentSlideIndex + 1} / {totalSlides}
            </span>
            <span className="text-[10px] font-semibold text-white/70 flex items-center gap-1">
              <span>🩺</span>
              <span>طب الأطفال</span>
            </span>
          </div>
        ) : (
          /* Mockup Mode: Fake Instagram App Header */
          <div className="relative z-20 space-y-3">
            {/* Multi-story Segmented Progress Bars */}
            <div className="flex gap-1.5 items-center w-full">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden"
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      idx < currentSlideIndex
                        ? 'w-full bg-white'
                        : idx === currentSlideIndex
                        ? 'w-full bg-white shadow-sm'
                        : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Instagram Account Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* Doctor Avatar with Instagram story gradient border */}
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600">
                  <img
                    src={doctorProfile.avatarUrl || '/images/cute_male_doctor_1792204272701.jpg'}
                    alt={doctorProfile.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/images/cute_male_doctor_1792204272701.jpg';
                    }}
                    className="w-9 h-9 rounded-full object-cover border border-black/40"
                  />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm tracking-wide text-white drop-shadow-sm font-['Alexandria']">
                      {doctorProfile.name}
                    </span>
                    {doctorProfile.verified && (
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-sky-500 text-white rounded-full text-[9px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                    <span>{doctorProfile.handle}</span>
                    <span>•</span>
                    <span>2h</span>
                  </div>
                </div>
              </div>

              {/* Pediatric Badge */}
              <div className="bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-[10px] font-semibold tracking-wider text-white/90">
                طب الأطفال 🩺
              </div>
            </div>
          </div>
        )}

        {/* Story Body Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-start my-auto pt-2 space-y-3">
          {/* Badge */}
          {slide.badge && (
            <div className="flex items-center justify-center">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm backdrop-blur-md ${theme.badgeBg}`}>
                <Sparkles className="w-3.5 h-3.5" />
                {slide.badge}
              </span>
            </div>
          )}

          {/* Catchy Iraqi Headline */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold leading-tight text-white drop-shadow-md font-['Cairo']">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="text-xs font-medium text-white/80 line-clamp-2">
                {slide.subtitle}
              </p>
            )}
          </div>

          {/* Illustration Container */}
          {slide.illustration && slide.illustration.url && (
            <div className="flex justify-center my-1">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-400 via-rose-300 to-amber-300 opacity-60 blur-sm" />
                <div
                  className={`relative overflow-hidden border-2 border-white/60 shadow-xl bg-white/20 backdrop-blur-sm ${
                    slide.illustration.shape === 'circle' ? 'rounded-full' : 'rounded-2xl'
                  }`}
                  style={{
                    width: slide.illustration.size === 'small' ? '85px' : slide.illustration.size === 'large' ? '145px' : '110px',
                    height: slide.illustration.size === 'small' ? '85px' : slide.illustration.size === 'large' ? '145px' : '110px',
                  }}
                >
                  <img
                    src={slide.illustration.url}
                    alt={slide.illustration.label || 'كرتون طب أطفال'}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (slide.illustration.key === 'pediatrician') {
                        target.src = '/images/cute_male_doctor_1792204272701.jpg';
                      } else if (slide.illustration.key === 'baby_fever') {
                        target.src = '/images/cute_baby_fever_1792203737185.jpg';
                      } else if (slide.illustration.key === 'baby_eating') {
                        target.src = '/images/cute_baby_eating_1792203737011.jpg';
                      } else if (slide.illustration.key === 'baby_sleeping') {
                        target.src = '/images/cute_baby_sleeping_1792203737007.jpg';
                      } else {
                        target.src = '/images/cute_male_doctor_1792204272701.jpg';
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Iraqi Dialect Main Advice / Explanation Card */}
          <div className={`p-3.5 rounded-2xl ${theme.cardBg} space-y-2`}>
            <p className="text-xs leading-relaxed text-white/95 font-medium text-right">
              {slide.mainText}
            </p>

            {/* Bullet points */}
            {slide.bulletPoints && slide.bulletPoints.length > 0 && (
              <ul className="space-y-1 pt-1 border-t border-white/10">
                {slide.bulletPoints.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-1.5 text-[11px] text-white/90">
                    <span className="text-teal-300 mt-0.5 shrink-0 font-bold">
                      {pIdx === 0 ? '✓' : pIdx === 1 ? '•' : '★'}
                    </span>
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Interactive Instagram Sticker Component */}
          {slide.sticker && slide.sticker.type !== 'none' && (
            <div className="pt-1">
              {/* Poll Sticker */}
              {slide.sticker.type === 'poll' && (
                <div className="bg-white/95 text-slate-900 rounded-2xl p-2.5 shadow-xl text-center space-y-2 border border-white/30 backdrop-blur-md">
                  <p className="text-xs font-bold text-slate-800 font-['Cairo']">
                    {slide.sticker.question}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <div className="py-2 px-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center gap-1 shadow-xs">
                      <span>{slide.sticker.optionA || 'نعم'}</span>
                    </div>
                    <div className="py-2 px-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-center gap-1 shadow-xs">
                      <span>{slide.sticker.optionB || 'لا'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quiz Sticker */}
              {slide.sticker.type === 'quiz' && (
                <div className="bg-white/95 text-slate-900 rounded-2xl p-2.5 shadow-xl space-y-2 border border-white/30 backdrop-blur-md">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md w-fit">
                    <Sparkles className="w-3 h-3" />
                    اختبار ومعلومة سريعة
                  </div>
                  <p className="text-xs font-bold text-slate-800 font-['Cairo'] text-right">
                    {slide.sticker.question}
                  </p>
                  <div className="space-y-1.5 text-xs font-bold">
                    <div
                      className={`p-2 rounded-xl flex items-center justify-between border ${
                        slide.sticker.correctOption === 'A'
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-extrabold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-[10px]">A</span>
                        {slide.sticker.optionA}
                      </span>
                      {slide.sticker.correctOption === 'A' && (
                        <Check className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <div
                      className={`p-2 rounded-xl flex items-center justify-between border ${
                        slide.sticker.correctOption === 'B'
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-extrabold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-[10px]">B</span>
                        {slide.sticker.optionB}
                      </span>
                      {slide.sticker.correctOption === 'B' && (
                        <Check className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Question Box Sticker */}
              {slide.sticker.type === 'question' && (
                <div className="bg-white/95 rounded-2xl overflow-hidden shadow-xl border border-white/40 text-center">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-2 text-xs font-bold font-['Cairo']">
                    {slide.sticker.question}
                  </div>
                  <div className="p-2.5 bg-slate-50 flex items-center justify-center">
                    <div className="w-full py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-400 text-[11px] text-right">
                      كتبي رسالتج أو استفسارج هنا...
                    </div>
                  </div>
                </div>
              )}

              {/* Slider Sticker */}
              {slide.sticker.type === 'slider' && (
                <div className="bg-white/95 rounded-2xl p-2.5 shadow-xl text-center space-y-2 border border-white/40">
                  <p className="text-xs font-bold text-slate-800 font-['Cairo']">
                    {slide.sticker.question}
                  </p>
                  <div className="relative py-2 px-4 flex items-center">
                    <div className="w-full h-3 bg-gradient-to-r from-teal-200 via-rose-300 to-rose-500 rounded-full" />
                    <div className="absolute right-1/3 transform translate-x-1/2 -top-1 w-8 h-8 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-lg">
                      {slide.sticker.sliderEmoji || '🥺'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Note & Instagram Reply Bar */}
        <div className="relative z-20 space-y-2 pt-2 border-t border-white/10">
          {/* Reassurance Iraqi Pediatric Note */}
          <div className="text-center">
            <p className="text-[10px] text-white/90 font-medium tracking-wide">
              {slide.footerNote || 'عافيات على جهالنا 🤍 | استشيري طبيب طفلك'}
            </p>
            {hideInstagramUI && (
              <p className="text-[9px] text-white/60 font-medium mt-0.5 tracking-wider">
                {doctorProfile.name} • {doctorProfile.handle} 🩺
              </p>
            )}
          </div>

          {/* Instagram Action Bar Mock (Only displayed in mockup view) */}
          {!hideInstagramUI && (
            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1 py-1.5 px-3 rounded-full bg-white/15 border border-white/20 text-white/60 text-[11px] flex items-center justify-between">
                <span>إرسال رسالة...</span>
              </div>
              <button
                type="button"
                className="p-1.5 rounded-full bg-white/10 text-white/80 hover:text-white"
                title="إعجاب"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onShare}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white/80 hover:text-white transition cursor-pointer"
                title="مشاركة الستوري إلى إنستغرام"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Interactive Tap Zones (Previous / Next Slide) when previewing */}
        {interactivePreview && (
          <div className="absolute inset-0 z-30 flex">
            {/* Right side in RTL goes to Next */}
            <div
              onClick={onNextSlide}
              className="w-1/2 h-full cursor-pointer opacity-0 hover:opacity-10 bg-white/5 transition-opacity"
              title="السلايد التالي"
            />
            {/* Left side in RTL goes to Previous */}
            <div
              onClick={onPrevSlide}
              className="w-1/2 h-full cursor-pointer opacity-0 hover:opacity-10 bg-white/5 transition-opacity"
              title="السلايد السابق"
            />
          </div>
        )}
      </div>
    </div>
  );
};
