import React, { useState } from 'react';
import {
  Download,
  X,
  Copy,
  Check,
  Play,
  Share2,
  Sparkles,
  RefreshCw,
  Layers,
  CheckCircle2,
  Instagram,
  ArrowRight,
} from 'lucide-react';
import { StorySlide, DoctorProfile } from '../types/story';
import { HeaderStyle } from './StoryCanvas';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: StorySlide[];
  currentSlideIndex: number;
  doctorProfile: DoctorProfile;
  caption: string;
  topicTitle: string;
  headerStyle: HeaderStyle;
  onChangeHeaderStyle: (style: HeaderStyle) => void;
  onSelectSlide: (index: number) => void;
  onOpenPlayer: () => void;
  onShareAll: () => Promise<void>;
  onDownloadAll: () => Promise<void>;
  onShareSingle: () => Promise<void>;
  onDownloadSingle: () => Promise<void>;
  isSharingAll: boolean;
  isDownloadingAll: boolean;
  isSharingSingle: boolean;
  isDownloadingSingle: boolean;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  slides,
  currentSlideIndex,
  doctorProfile,
  caption,
  topicTitle,
  headerStyle,
  onChangeHeaderStyle,
  onSelectSlide,
  onOpenPlayer,
  onShareAll,
  onDownloadAll,
  onShareSingle,
  onDownloadSingle,
  isSharingAll,
  isDownloadingAll,
  isSharingSingle,
  isDownloadingSingle,
}) => {
  const [copiedCaption, setCopiedCaption] = useState(false);

  if (!isOpen) return null;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption || '');
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const isBusy = isSharingAll || isDownloadingAll || isSharingSingle || isDownloadingSingle;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/25">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-['Cairo'] flex items-center gap-2">
                <span>نشر وتصدير ستوريات إنستغرام</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {slides.length} ستوريات
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                حساب: <span className="text-teal-300 font-bold">{doctorProfile.name}</span> ({doctorProfile.handle})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Slide Thumbnails / Selector */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>سلايدات السلسلة الطبية ({topicTitle}):</span>
            <span className="text-teal-400 text-[11px]">اضغط على أي سلايد لمعاينته</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id || idx}
                type="button"
                onClick={() => onSelectSlide(idx)}
                className={`p-2.5 rounded-xl border text-right transition cursor-pointer flex flex-col justify-between ${
                  idx === currentSlideIndex
                    ? 'bg-teal-500/20 border-teal-400 text-teal-200 shadow-md ring-1 ring-teal-400/50'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-black mb-1">
                  <span>سلايد {idx + 1}</span>
                  {idx === currentSlideIndex && (
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                  )}
                </div>
                <div className="text-[11px] font-bold truncate text-white/90">
                  {s.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {s.badge || 'نصيحة طبية'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Header Display Style (Doctor Account Branding vs Clean) */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-200 block">
              شكل الهيدر أعلى السلايد:
            </span>
            <span className="text-[11px] text-slate-400">
              اختر ما يظهر في أعلى السلايد عند التصدير والنشر
            </span>
          </div>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs font-bold">
            <button
              type="button"
              onClick={() => onChangeHeaderStyle('branded')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                headerStyle === 'branded'
                  ? 'bg-teal-500 text-white shadow-xs font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="يظهر اسم د. مصطفى الحسيني والمعرف @dr.er11 والأفاتار في أعلى السلايد"
            >
              <span>الهوية الطبية ({doctorProfile.handle}) 🩺</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeHeaderStyle('clean')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                headerStyle === 'clean'
                  ? 'bg-teal-500 text-white shadow-xs font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="سلايد صافي تماماً بدون هيدر علوي"
            >
              <span>صافي بدون هيدر ✨</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeHeaderStyle('instagram_mock')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                headerStyle === 'instagram_mock'
                  ? 'bg-purple-600 text-white shadow-xs font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="معاينة واجهة تطبيق إنستغرام"
            >
              <span>واجهة إنستغرام 📱</span>
            </button>
          </div>
        </div>

        {/* Main Publishing Actions */}
        <div className="mt-5 space-y-3">
          {/* 1. Featured Primary: Share Entire Story Series (Request 10) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-600/15 border-2 border-rose-500/40 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-black mb-1.5 shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  الخيار الموصى به لنشر السلسلة كاملة
                </div>
                <h4 className="text-base font-black text-white font-['Cairo']">
                  نشر السلسلة كاملة على إنستغرام ({slides.length} ستوريات) 📚📲
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  يجهز جميع السلايدات متتالية دفعة واحدة لرفعها مباشرة كقصة متكاملة ومرتبة على حسابك <span className="text-amber-300 font-bold">{doctorProfile.handle}</span>
                </p>
              </div>

              <button
                type="button"
                disabled={isBusy}
                onClick={onShareAll}
                className="w-full sm:w-auto shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-rose-500/30 transition transform active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isSharingAll ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>جاري معالجة السلسلة...</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-5 h-5" />
                    <span>نشر السلسلة كاملة الآن</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. Download All Slides at Once */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-right">
              <h4 className="text-sm font-bold text-white font-['Cairo'] flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-400" />
                <span>تحميل جميع السلايدات كصور بدقة عالية (PNG 1080×1920) 📥</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                تنزيل جميع الـ {slides.length} سلايدات في ألبوم جهازك لنشرها يدوياً بأي وقت
              </p>
            </div>

            <button
              type="button"
              disabled={isBusy}
              onClick={onDownloadAll}
              className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {isDownloadingAll ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جاري التحميل...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>تحميل كل السلايدات ({slides.length})</span>
                </>
              )}
            </button>
          </div>

          {/* 3. Secondary: Single Slide Share & Download */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              disabled={isBusy}
              onClick={onShareSingle}
              className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-pink-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-md transition disabled:opacity-50 cursor-pointer text-center"
            >
              {isSharingSingle ? (
                <RefreshCw className="w-5 h-5 animate-spin text-pink-400" />
              ) : (
                <Share2 className="w-5 h-5 text-pink-400" />
              )}
              <span>نشر هذا السلايد فقط (سلايد {currentSlideIndex + 1}) 📲</span>
              <span className="text-[10px] text-slate-400 font-normal">
                مشاركة صورة واحدة فقط لإنستغرام
              </span>
            </button>

            <button
              type="button"
              disabled={isBusy}
              onClick={onDownloadSingle}
              className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-teal-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-md transition disabled:opacity-50 cursor-pointer text-center"
            >
              {isDownloadingSingle ? (
                <RefreshCw className="w-5 h-5 animate-spin text-teal-400" />
              ) : (
                <Download className="w-5 h-5 text-teal-400" />
              )}
              <span>تحميل هذا السلايد كصورة (PNG) 📥</span>
              <span className="text-[10px] text-slate-400 font-normal">
                تنزيل السلايد {currentSlideIndex + 1} فقط
              </span>
            </button>
          </div>

          {/* Live Preview Button */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPlayer();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Play className="w-4 h-4 text-purple-400" />
            <span>معاينة العرض التلقائي للستوري (Instagram Live Player)</span>
          </button>

          {/* Instagram Post Caption & Iraqi Hashtags */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>📝</span>
                <span>كابشن مقترح للنشر مع الهاشتاغات العراقية:</span>
              </span>
              <button
                type="button"
                onClick={handleCopyCaption}
                className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-teal-300 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedCaption ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-400" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ النص</span>
                  </>
                )}
              </button>
            </div>
            <textarea
              readOnly
              rows={4}
              value={caption}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700/60 text-slate-200 text-xs leading-relaxed focus:outline-hidden resize-none font-sans"
            />
          </div>

          {/* Tips for posting */}
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/40 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1">
              <span>💡</span>
              <span>نصائح ذهبية للنشر على إنستغرام:</span>
            </h4>
            <ul className="text-[11px] text-slate-400 space-y-1 pr-4 list-disc">
              <li>نشر السلسلة كاملة يضمن وصول معلومة الطفل الطبية بشكل متسلسل ومقنع للأمهات.</li>
              <li>الهوية الطبية أعلى السلايد تحفظ حقوق حسابك <span className="text-teal-300 font-bold">{doctorProfile.handle}</span> عند إعادة مشاركة الستوري.</li>
              <li>الوقت الأمثل للنشر بالعراق هو بين الساعة 8:30 و 10:30 مساءً.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
