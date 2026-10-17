import React, { useState } from 'react';
import { Sparkles, X, Wand2, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { StorySlide } from '../types/story';
import { DEFAULT_ILLUSTRATIONS } from '../data/cartoonLibrary';

interface StoryGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoriesGenerated: (slides: StorySlide[], caption: string, topicTitle: string) => void;
  doctorName: string;
  doctorTitle: string;
  clinicHandle: string;
}

const POPULAR_TOPICS = [
  { title: 'الصخونة وخافض الحرارة (البراسيتول)', icon: '🌡️', age: 'infants' },
  { title: 'التسنين وشگ السن والجل الممنوع', icon: '🦷', age: 'infants' },
  { title: 'المغوصة والغازات وتكريع البيبي', icon: '🍼', age: 'newborn' },
  { title: 'شرب الماي ويا الرضاعة الطبيعية', icon: '💧', age: 'infants' },
  { title: 'أكل الرضيع التكميلي بالشهر السادس', icon: '🥣', age: 'infants' },
  { title: 'لقاحات الطفل والصخونة وورم الإبرة', icon: '💉', age: 'infants' },
  { title: 'النشلة والكحة والمحلول الملحي', icon: '🤧', age: 'toddlers' },
  { title: 'فيتامين د ونقص الحديد عند الأطفال', icon: '☀️', age: 'all' },
  { title: 'التهاب الحفاظ وطريقة العلاج الصح', icon: '👶', age: 'infants' },
];

export const StoryGeneratorModal: React.FC<StoryGeneratorModalProps> = ({
  isOpen,
  onClose,
  onStoriesGenerated,
  doctorName,
  doctorTitle,
  clinicHandle,
}) => {
  const [topic, setTopic] = useState('');
  const [customDetails, setCustomDetails] = useState('');
  const [slideCount, setSlideCount] = useState<number>(4);
  const [tone, setTone] = useState('friendly_iraqi');
  const [targetAge, setTargetAge] = useState('infants');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      setError('يرجى اختيار موضوع أو كتابة موضوع خاص');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          customDetails,
          slideCount,
          tone,
          targetAge,
          doctorName,
          doctorTitle,
          clinicHandle,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'فشل التوليد، حاول مجدداً');
      }

      const data = await response.json();

      // Convert generated slides to our internal StorySlide interface
      const formattedSlides: StorySlide[] = (data.slides || []).map((slide: any, index: number) => {
        const illKey = slide.suggestedIllustration || 'pediatrician';
        const defaultIll = DEFAULT_ILLUSTRATIONS[illKey] || DEFAULT_ILLUSTRATIONS.pediatrician;

        return {
          id: `ai_slide_${Date.now()}_${index}`,
          slideNumber: index + 1,
          badge: slide.badge || 'نصيحة طبيب 🩺',
          title: slide.title || 'عنوان الستوري',
          subtitle: slide.subtitle || '',
          mainText: slide.mainText || '',
          bulletPoints: slide.bulletPoints || [],
          sticker: {
            type: slide.sticker?.type || 'poll',
            question: slide.sticker?.question || 'شاركونا رأيكم',
            optionA: slide.sticker?.optionA || 'نعم ✅',
            optionB: slide.sticker?.optionB || 'لا ❌',
            correctOption: slide.sticker?.correctOption,
            sliderEmoji: slide.sticker?.sliderEmoji || '🥺',
          },
          illustration: {
            ...defaultIll,
            position: 'top',
            size: 'medium',
            shape: 'rounded',
          },
          colorTheme: slide.colorTheme || (index % 2 === 0 ? 'teal_mint' : 'soft_pink'),
          footerNote: slide.footerNote || 'عافيات على أطفالنا 🤍 | استشيري طبيب طفلك',
        };
      });

      onStoriesGenerated(formattedSlides, data.caption || '', data.topicTitle || topic);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'حدث خطأ أثناء التوليد');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Cairo'] flex items-center gap-2">
                توليد ستوريات ذكية باللهجة العراقية
                <span className="bg-teal-500/20 text-teal-300 text-xs px-2 py-0.5 rounded-full border border-teal-500/30">
                  Gemini AI
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                محتوى طبي موثوق ومصاغ بالعامية العراقية المريحة للأمهات
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-5 space-y-5">
          {/* Preset Topics Quick Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              اختر موضوعاً شائعاً أو اكتب موضوعك بالأسفل:
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TOPICS.map((pt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopic(pt.title)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${
                    topic === pt.title
                      ? 'bg-teal-500 text-white border-teal-400 shadow-md shadow-teal-500/20 font-bold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  <span>{pt.icon}</span>
                  <span>{pt.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Topic Custom Input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              عنوان أو فكرة الموضوع الطبي:
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="مثال: شوكت انطي خافض للبيبي؟ أو علاج الكحة بالأعشاب غلط لو صح؟"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-teal-400 placeholder:text-slate-500"
            />
          </div>

          {/* Custom Details / Specific Advice */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              ملاحظات أو نقاط خاصة تريد التركيز عليها (اختياري):
            </label>
            <textarea
              rows={2}
              value={customDetails}
              onChange={(e) => setCustomDetails(e.target.value)}
              placeholder="مثال: أريد التركيز على ممنوعات النوم على البطن أو توضيح أن شرب الماء يسبب تسمم مائي قبل عمر 6 أشهر..."
              className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-teal-400 placeholder:text-slate-500"
            />
          </div>

          {/* Controls: Slide count & Tone & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                عدد السلايدات (الستوريات):
              </label>
              <select
                value={slideCount}
                onChange={(e) => setSlideCount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-teal-400"
              >
                <option value={3}>3 ستوريات (سريع ومركّز)</option>
                <option value={4}>4 ستوريات (الموصى به ⭐)</option>
                <option value={5}>5 ستوريات (شامل وتفصيلي)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                نبرة وأسلوب الطرح:
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-teal-400"
              >
                <option value="friendly_iraqi">لهجة بغدادية حنينة ومطمئنة 🤍</option>
                <option value="direct_educational">توعوي مباشر وتصحيح خرافات ❌</option>
                <option value="interactive_quiz">تفاعلي وأسئلة ومسابقات للأمهات 🎯</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                الفئة المستهدفة:
              </label>
              <select
                value={targetAge}
                onChange={(e) => setTargetAge(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-hidden focus:border-teal-400"
              >
                <option value="newborn">حديثي الولادة (0 - 3 أشهر)</option>
                <option value="infants">الرضع (4 - 12 شهر)</option>
                <option value="toddlers">الأطفال الدارجين (1 - 3 سنوات)</option>
                <option value="all">كل الأعمار (نصائح عامة)</option>
              </select>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold"
            >
              إلغاء
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleGenerate()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جاري التوليد باللهجة العراقية...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>توليد سلسلة الستوري الآن</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
