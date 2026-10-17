import React, { useState } from 'react';
import {
  StorySlide,
  DoctorProfile,
  StoryIllustration,
  StickerType,
} from '../types/story';
import {
  DEFAULT_ILLUSTRATIONS,
  COLOR_THEMES,
  COMMON_IRAQI_PHRASES,
  CUTE_STICKER_EMOJIS,
} from '../data/cartoonLibrary';
import {
  Plus,
  Trash2,
  Copy,
  Sparkles,
  Palette,
  Type,
  Vote,
  UserCheck,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

interface StoryEditorProps {
  slides: StorySlide[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onUpdateSlide: (updatedSlide: StorySlide) => void;
  onAddSlide: () => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  doctorProfile: DoctorProfile;
  onUpdateDoctorProfile: (profile: DoctorProfile) => void;
  onOpenCartoonModal: () => void;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({
  slides,
  currentSlideIndex,
  onSelectSlide,
  onUpdateSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  doctorProfile,
  onUpdateDoctorProfile,
  onOpenCartoonModal,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'visuals' | 'sticker' | 'theme' | 'profile'>('content');

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const updateField = <K extends keyof StorySlide>(key: K, value: StorySlide[K]) => {
    onUpdateSlide({
      ...currentSlide,
      [key]: value,
    });
  };

  const handleInsertPhrase = (phrase: string) => {
    const newText = currentSlide.mainText
      ? `${currentSlide.mainText} ${phrase}`
      : phrase;
    updateField('mainText', newText);
  };

  const handleAddBullet = () => {
    const updated = [...(currentSlide.bulletPoints || []), 'نصيحة جديدة للطفل'];
    updateField('bulletPoints', updated);
  };

  const handleUpdateBullet = (index: number, text: string) => {
    const updated = [...(currentSlide.bulletPoints || [])];
    updated[index] = text;
    updateField('bulletPoints', updated);
  };

  const handleRemoveBullet = (index: number) => {
    const updated = (currentSlide.bulletPoints || []).filter((_, i) => i !== index);
    updateField('bulletPoints', updated);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col h-full space-y-4">
      {/* Slide Thumbnails & Manager */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300">
            سلايدات الستوري ({slides.length}):
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onDuplicateSlide(currentSlideIndex)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1 transition"
              title="تكرار السلايد"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تكرار</span>
            </button>
            {slides.length > 1 && (
              <button
                type="button"
                onClick={() => onDeleteSlide(currentSlideIndex)}
                className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs flex items-center gap-1 border border-rose-800/40 transition"
                title="حذف السلايد"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">حذف</span>
              </button>
            )}
            <button
              type="button"
              onClick={onAddSlide}
              className="px-2.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة ستوري</span>
            </button>
          </div>
        </div>

        {/* Thumbnail slider */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {slides.map((s, idx) => (
            <div
              key={s.id || idx}
              onClick={() => onSelectSlide(idx)}
              className={`shrink-0 w-20 h-28 rounded-xl cursor-pointer p-1.5 border-2 transition relative flex flex-col justify-between overflow-hidden ${
                idx === currentSlideIndex
                  ? 'border-teal-400 shadow-md shadow-teal-500/20 bg-slate-800'
                  : 'border-slate-700/80 bg-slate-850 hover:border-slate-500 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="w-4 h-4 rounded-full bg-teal-500/30 text-teal-300 flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="text-[9px] text-slate-400 truncate max-w-[45px]">
                  {s.badge || 'ستوري'}
                </span>
              </div>
              <p className="text-[10px] font-bold text-white line-clamp-2 leading-tight text-center">
                {s.title}
              </p>
              <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden">
                <div className="w-full h-full bg-teal-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Navigation Tabs */}
      <div className="flex gap-1.5 p-1 bg-slate-800/90 rounded-2xl border border-slate-700/60 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex-1 min-w-[70px] py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 ${
            activeTab === 'content'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>المحتوى</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('visuals')}
          className={`flex-1 min-w-[70px] py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 ${
            activeTab === 'visuals'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>الرسوم</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sticker')}
          className={`flex-1 min-w-[70px] py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 ${
            activeTab === 'sticker'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Vote className="w-3.5 h-3.5" />
          <span>الملصق</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('theme')}
          className={`flex-1 min-w-[70px] py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 ${
            activeTab === 'theme'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>الألوان</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex-1 min-w-[70px] py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 ${
            activeTab === 'profile'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>الطبيب</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {/* 1. CONTENT TAB */}
        {activeTab === 'content' && (
          <div className="space-y-3.5">
            {/* Quick Iraqi phrases assistant */}
            <div className="p-2.5 rounded-2xl bg-teal-950/40 border border-teal-500/30">
              <span className="text-[11px] font-bold text-teal-300 block mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                عبارات عراقية محببة (اضغط لإضافتها):
              </span>
              <div className="flex flex-wrap gap-1">
                {COMMON_IRAQI_PHRASES.map((phrase, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleInsertPhrase(phrase)}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-teal-900/60 hover:bg-teal-800 text-teal-200 border border-teal-600/30 transition"
                  >
                    + {phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* Badge */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                الشارة العلوية (Badge):
              </label>
              <input
                type="text"
                value={currentSlide.badge || ''}
                onChange={(e) => updateField('badge', e.target.value)}
                placeholder="مثال: تنبيه مهم للأمهات ⚠️"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-teal-400"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                العنوان الرئيسي (لهجة عراقية جاذبة):
              </label>
              <input
                type="text"
                value={currentSlide.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="عنوان الستوري..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold focus:border-teal-400"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                العنوان الفرعي (توضيح سريع):
              </label>
              <input
                type="text"
                value={currentSlide.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="عنوان فرعي توضيحي..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-teal-400"
              />
            </div>

            {/* Main Text in Iraqi */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                النص الطبي والشرح باللهجة العراقية:
              </label>
              <textarea
                rows={3}
                value={currentSlide.mainText || ''}
                onChange={(e) => updateField('mainText', e.target.value)}
                placeholder="شرح المعلومة الطبية بأسلوب عراقي لطيف ومطمئن..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed focus:border-teal-400"
              />
            </div>

            {/* Bullet Points */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">
                  نقاط النصائح السريعة:
                </label>
                <button
                  type="button"
                  onClick={handleAddBullet}
                  className="text-[11px] text-teal-300 hover:text-teal-200 flex items-center gap-1 font-bold"
                >
                  <Plus className="w-3 h-3" />
                  إضافة نقطة
                </button>
              </div>

              {(currentSlide.bulletPoints || []).map((point, ptIdx) => (
                <div key={ptIdx} className="flex gap-1.5 items-center">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handleUpdateBullet(ptIdx, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:border-teal-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(ptIdx)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-md transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                العبارة السفلية (دعاء / طمأنينة للأهل):
              </label>
              <input
                type="text"
                value={currentSlide.footerNote || ''}
                onChange={(e) => updateField('footerNote', e.target.value)}
                placeholder="مثال: عافيات على جهالنا 🤍 | استشيري طبيب طفلك"
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-teal-400"
              />
            </div>
          </div>
        )}

        {/* 2. VISUALS / CARTOONS TAB */}
        {activeTab === 'visuals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300">
                الرسمة الكرتونية الحالية:
              </label>
              <button
                type="button"
                onClick={onOpenCartoonModal}
                className="text-xs px-3 py-1 rounded-lg bg-pink-500 hover:bg-pink-400 text-white font-bold flex items-center gap-1 shadow-md shadow-pink-500/20"
              >
                <Sparkles className="w-3 h-3 text-amber-200" />
                <span>تغيير أو توليد رسمة</span>
              </button>
            </div>

            {/* Current Illustration Card */}
            <div className="flex items-center gap-4 p-3 bg-slate-800/80 rounded-2xl border border-slate-700">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-600 bg-white/10 shrink-0">
                <img
                  src={currentSlide.illustration.url}
                  alt={currentSlide.illustration.label}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/images/cute_male_doctor_1792204272701.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">
                  {currentSlide.illustration.label || 'كرتون أطفال'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  رسم كرتوني جذاب مخصص لطب الأطفال
                </span>
              </div>
            </div>

            {/* Quick Switch to Preset Cartoon */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                اختر رسمة جاهزة للستوري:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(DEFAULT_ILLUSTRATIONS).map(([key, ill]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => updateField('illustration', { ...ill, shape: currentSlide.illustration.shape, size: currentSlide.illustration.size })}
                    className={`p-2 rounded-xl border text-right flex items-center gap-2 transition ${
                      currentSlide.illustration.url === ill.url
                        ? 'border-teal-400 bg-teal-950/40 text-teal-300'
                        : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <img
                      src={ill.url}
                      alt={ill.label}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = '/images/cute_male_doctor_1792204272701.jpg';
                      }}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-[11px] font-bold line-clamp-1">
                      {ill.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Shape & Size Controls */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  شكل إطار الرسمة:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateField('illustration', { ...currentSlide.illustration, shape: 'rounded' })}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                      currentSlide.illustration.shape === 'rounded'
                        ? 'bg-teal-500 text-white border-teal-400'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    مستطيل مدور
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('illustration', { ...currentSlide.illustration, shape: 'circle' })}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                      currentSlide.illustration.shape === 'circle'
                        ? 'bg-teal-500 text-white border-teal-400'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    دائري
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  حجم الرسمة:
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['small', 'medium', 'large'] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => updateField('illustration', { ...currentSlide.illustration, size: sz })}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        currentSlide.illustration.size === sz
                          ? 'bg-teal-500 text-white border-teal-400'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {sz === 'small' ? 'صغير' : sz === 'medium' ? 'وسط' : 'كبير'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. STICKER TAB */}
        {activeTab === 'sticker' && (
          <div className="space-y-4">
            <label className="block text-xs font-bold text-slate-300 mb-1">
              نوع ملصق إنستغرام التفاعلي:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { type: 'poll', label: 'تصويت Poll 📊' },
                { type: 'quiz', label: 'اختبار Quiz 🎯' },
                { type: 'question', label: 'سؤال Box 💬' },
                { type: 'slider', label: 'مقياس Slider 🥺' },
              ].map((st) => (
                <button
                  key={st.type}
                  type="button"
                  onClick={() =>
                    updateField('sticker', {
                      ...currentSlide.sticker,
                      type: st.type as StickerType,
                    })
                  }
                  className={`py-2 px-2 text-xs font-bold rounded-xl border transition ${
                    currentSlide.sticker.type === st.type
                      ? 'bg-teal-500 text-white border-teal-400 shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Sticker Question */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                سؤال الملصق:
              </label>
              <input
                type="text"
                value={currentSlide.sticker.question || ''}
                onChange={(e) =>
                  updateField('sticker', {
                    ...currentSlide.sticker,
                    question: e.target.value,
                  })
                }
                placeholder="سؤال موجه للأمهات..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold focus:border-teal-400"
              />
            </div>

            {/* Poll / Quiz Options */}
            {(currentSlide.sticker.type === 'poll' || currentSlide.sticker.type === 'quiz') && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                    <span>الخيار الأول (A):</span>
                    {currentSlide.sticker.type === 'quiz' && (
                      <span className="text-[10px] text-emerald-400 font-bold">
                        {currentSlide.sticker.correctOption === 'A' ? 'الإجابة الصحيحة ✅' : ''}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={currentSlide.sticker.optionA || ''}
                    onChange={(e) =>
                      updateField('sticker', {
                        ...currentSlide.sticker,
                        optionA: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-teal-400"
                  />
                  {currentSlide.sticker.type === 'quiz' && (
                    <button
                      type="button"
                      onClick={() =>
                        updateField('sticker', {
                          ...currentSlide.sticker,
                          correctOption: 'A',
                        })
                      }
                      className="mt-1 text-[10px] text-teal-300 underline"
                    >
                      تعيين كإجابة صحيحة
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                    <span>الخيار الثاني (B):</span>
                    {currentSlide.sticker.type === 'quiz' && (
                      <span className="text-[10px] text-emerald-400 font-bold">
                        {currentSlide.sticker.correctOption === 'B' ? 'الإجابة الصحيحة ✅' : ''}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={currentSlide.sticker.optionB || ''}
                    onChange={(e) =>
                      updateField('sticker', {
                        ...currentSlide.sticker,
                        optionB: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-teal-400"
                  />
                  {currentSlide.sticker.type === 'quiz' && (
                    <button
                      type="button"
                      onClick={() =>
                        updateField('sticker', {
                          ...currentSlide.sticker,
                          correctOption: 'B',
                        })
                      }
                      className="mt-1 text-[10px] text-teal-300 underline"
                    >
                      تعيين كإجابة صحيحة
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Slider Emoji selector */}
            {currentSlide.sticker.type === 'slider' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  إيموجي مقياس السلايدر:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['🥺', '😍', '🤒', '😭', '👶', '❤️', '🔥', '😴', '🚲'].map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() =>
                        updateField('sticker', {
                          ...currentSlide.sticker,
                          sliderEmoji: em,
                        })
                      }
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition ${
                        currentSlide.sticker.sliderEmoji === em
                          ? 'border-teal-400 bg-teal-500/20'
                          : 'border-slate-700 bg-slate-800'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. THEMES TAB */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            <label className="block text-xs font-bold text-slate-300">
              اختر ثيم ألوان مريح لعيادات الأطفال:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(COLOR_THEMES).map(([themeKey, th]) => (
                <button
                  key={themeKey}
                  type="button"
                  onClick={() => updateField('colorTheme', themeKey)}
                  className={`p-3 rounded-2xl border text-right transition flex flex-col justify-between h-20 relative overflow-hidden ${
                    currentSlide.colorTheme === themeKey
                      ? 'border-teal-400 ring-2 ring-teal-400/30'
                      : 'border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${th.bgGradient} opacity-80`} />
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-white drop-shadow-sm">
                      {th.name}
                    </span>
                    {currentSlide.colorTheme === themeKey && (
                      <Check className="w-4 h-4 text-teal-300" />
                    )}
                  </div>
                  <div className="relative z-10 flex gap-1">
                    <span className="w-4 h-4 rounded-full bg-white/20 border border-white/40" />
                    <span className="w-4 h-4 rounded-full bg-white/40" />
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                slides.forEach((_, i) => {
                  onSelectSlide(i);
                  updateField('colorTheme', currentSlide.colorTheme);
                });
              }}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition"
            >
              تطبيق هذا اللون على جميع سلايدات السلسلة 🎨
            </button>
          </div>
        )}

        {/* 5. DOCTOR PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-3.5">
            <p className="text-xs text-slate-300">
              هذه المعلومات تظهر بأعلى وأسفل كل ستوري إنستغرام لتعزيز هوية الطبيب:
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                اسم الطبيب:
              </label>
              <input
                type="text"
                value={doctorProfile.name}
                onChange={(e) =>
                  onUpdateDoctorProfile({ ...doctorProfile, name: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                اللقب والتخصص الطبي:
              </label>
              <input
                type="text"
                value={doctorProfile.title}
                onChange={(e) =>
                  onUpdateDoctorProfile({ ...doctorProfile, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                يوزر إنستغرام (Instagram Handle):
              </label>
              <input
                type="text"
                value={doctorProfile.handle}
                onChange={(e) =>
                  onUpdateDoctorProfile({ ...doctorProfile, handle: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-teal-400 dir-ltr text-left"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-xs font-bold text-slate-200">
                إظهار شارة التوثيق الزرقاء ✓
              </span>
              <input
                type="checkbox"
                checked={doctorProfile.verified}
                onChange={(e) =>
                  onUpdateDoctorProfile({
                    ...doctorProfile,
                    verified: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded-sm text-teal-500 bg-slate-900 border-slate-700 focus:ring-teal-400"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
