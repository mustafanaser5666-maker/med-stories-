import React, { useState } from 'react';
import { Palette, X, Sparkles, Image as ImageIcon, Upload, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { StoryIllustration } from '../types/story';
import { DEFAULT_ILLUSTRATIONS } from '../data/cartoonLibrary';

interface CartoonGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIllustration: (illustration: StoryIllustration) => void;
  currentIllustrationKey?: string;
}

const CARTOON_IDEAS = [
  'طفل يبتسم وفرحان وهو يفحص أذنه الطبيب',
  'أم تنطي قطرات فيتامين د للبيبي بابتسامة',
  'بيبي يشرب حليب من الممية ومغمض عيونه',
  'دكتورة أطفال تفحص دبدوب لعبة أمام الطفل',
  'بيبي ياكل تفاحة مهروسة ولابس مريلة لطيفة',
  'بيبي يضحك وبيده أول سن طالع',
];

export const CartoonGeneratorModal: React.FC<CartoonGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSelectIllustration,
  currentIllustrationKey,
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'generate' | 'upload'>('library');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customUploadUrl, setCustomUploadUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('يرجى إدخال وصف الرسمة الكرتونية المطلوبة');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const res = await fetch('/api/generate-cartoon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'فشل توليد الرسمة');
      }

      const data = await res.json();
      setGeneratedImage(data.imageUrl);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'حدث خطأ أثناء التوليد');
    } finally {
      setGenerating(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomUploadUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApply = (url: string, label: string) => {
    onSelectIllustration({
      key: 'custom',
      url,
      label,
      position: 'top',
      size: 'medium',
      shape: 'rounded',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Cairo']">
                الرسوم الكرتونية والصور التوضيحية للأطفال
              </h3>
              <p className="text-xs text-slate-400">
                رسومات مبهجة ومحببة تناسب ستوريات طب الأطفال وعيادات الأطفال
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

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-slate-800/80 rounded-2xl mt-4 border border-slate-700/60">
          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'library'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>المكتبة الكرتونية الجاهزة</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('generate')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'generate'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>توليد كرتون بالذكاء الاصطناعي</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>رفع صورة خاصة / لوجو</span>
          </button>
        </div>

        {/* Tab 1: Library */}
        {activeTab === 'library' && (
          <div className="mt-5 space-y-4">
            <p className="text-xs text-slate-300">
              اختر رسماً كرتونياً من مكتبة طب الأطفال الاحترافية:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(DEFAULT_ILLUSTRATIONS).map(([key, ill]) => {
                const isSelected = currentIllustrationKey === key;
                return (
                  <div
                    key={key}
                    onClick={() => {
                      onSelectIllustration(ill);
                      onClose();
                    }}
                    className={`cursor-pointer group rounded-2xl overflow-hidden border-2 transition p-2 bg-slate-800/80 hover:border-teal-400 relative flex flex-col items-center ${
                      isSelected ? 'border-teal-400 bg-teal-950/30' : 'border-slate-700'
                    }`}
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden mb-2 bg-white/10 relative">
                      <img
                        src={ill.url}
                        alt={ill.label}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = '/images/cute_male_doctor_1792204272701.jpg';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-center text-slate-200 group-hover:text-teal-300">
                      {ill.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: AI Cartoon Generation */}
        {activeTab === 'generate' && (
          <div className="mt-5 space-y-4">
            <p className="text-xs text-slate-300">
              اكتب وصف المشهد الكرتوني الذي تريده (مثلاً: بيبي مصخن، دكتور يفحص طفل، رضيع يضحك):
            </p>

            {error && (
              <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Quick prompt ideas */}
            <div className="flex flex-wrap gap-1.5">
              {CARTOON_IDEAS.map((idea, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(idea)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
                >
                  {idea}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="اكتب وصفاً للرسمة الكرتونية للأطفال..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-pink-500 placeholder:text-slate-500"
              />
              <button
                type="button"
                disabled={generating}
                onClick={handleGenerate}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-pink-500/25 transition disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري الرسم...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>توليد كرتون</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Result Preview */}
            {generatedImage && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-800/80 border border-pink-500/30 flex flex-col items-center gap-3">
                <div className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-pink-400 shadow-xl bg-white/5">
                  <img
                    src={generatedImage}
                    alt="Generated cartoon"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleApply(generatedImage, prompt || 'رسمة كرتونية مخصصة')}
                    className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>استخدام في الستوري الحالي</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Upload Custom Image */}
        {activeTab === 'upload' && (
          <div className="mt-5 space-y-4">
            <p className="text-xs text-slate-300">
              يمكنك رفع لوجو العيادة، أو صورة خاصة بالطفل، أو رسمة توضيحية من جهازك:
            </p>
            <div className="border-2 border-dashed border-slate-700 hover:border-teal-400 rounded-2xl p-6 text-center cursor-pointer transition relative bg-slate-800/40">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-xs font-bold text-slate-200">
                اضغط هنا لاختيار صورة من جهازك
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                يدعم صيغ PNG, JPG, WEBP
              </p>
            </div>

            {customUploadUrl && (
              <div className="flex flex-col items-center gap-3 p-3 bg-slate-800 rounded-2xl border border-slate-700">
                <div className="w-28 h-28 rounded-xl overflow-hidden border border-slate-600">
                  <img
                    src={customUploadUrl}
                    alt="Uploaded preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleApply(customUploadUrl, 'صورة مرفوعة')}
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>تطبيق على الستوري</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
