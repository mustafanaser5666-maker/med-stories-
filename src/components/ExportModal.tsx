import React, { useState } from 'react';
import { Download, X, Copy, Check, Play, Share2, Sparkles, RefreshCw } from 'lucide-react';
import { StorySlide, DoctorProfile } from '../types/story';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: StorySlide[];
  currentSlideIndex: number;
  doctorProfile: DoctorProfile;
  caption: string;
  topicTitle: string;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onSelectSlide: (index: number) => void;
  onOpenPlayer: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  slides,
  currentSlideIndex,
  doctorProfile,
  caption,
  topicTitle,
  canvasRef,
  onOpenPlayer,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const [sharing, setSharing] = useState(false);

  const handleShareToInstagram = async () => {
    if (!canvasRef.current) return;
    setSharing(true);
    setStatusMessage('جاري معالجة الستوري للمشاركة على إنستغرام...');

    try {
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 2.5,
        quality: 0.98,
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const fileName = `dr_mustafa_story_${slides[currentSlideIndex]?.slideNumber || 1}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      // Check if Web Share API with files is supported (mobile browsers, Android, iOS Safari)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `ستوري د. مصطفى الحسيني: ${slides[currentSlideIndex]?.title || 'طب أطفال'}`,
          text: caption || 'ستوري طب أطفال - د. مصطفى الحسيني @dr.er11',
          files: [file],
        });
        setStatusMessage('تم فتح لوحة المشاركة! اختر Instagram Stories 📲✨');
      } else {
        // Fallback for desktop or browsers without file sharing support
        // 1. Download image
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();

        // 2. Copy caption to clipboard
        try {
          await navigator.clipboard.writeText(caption || '');
        } catch (_) {}

        // 3. Try to copy image to clipboard
        try {
          if (navigator.clipboard && (window as any).ClipboardItem) {
            await navigator.clipboard.write([
              new (window as any).ClipboardItem({ 'image/png': blob }),
            ]);
          }
        } catch (_) {}

        // 4. Open Instagram
        window.open('https://www.instagram.com/', '_blank');

        setStatusMessage('تم تنزيل صورة الستوري ونسخ النص للحافظة! تم فتح إنستغرام للنشر المباشر 📸');
      }

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      // If user aborted the share sheet, don't show an error
      if (err?.name !== 'AbortError') {
        console.error(err);
        setStatusMessage('حدث خطأ أثناء المشاركة، يمكنك تحميل الصورة يدوياً أدناه');
      }
    } finally {
      setSharing(false);
    }
  };

  const handleDownloadCurrentSlide = async () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    setStatusMessage('جاري تحضير وتصدير صورة الستوري بدقة عالية...');

    try {
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 2.5, // Crisp high-DPI output for Instagram Stories
        quality: 0.98,
      });

      const link = document.createElement('a');
      link.download = `pediatric_story_${slides[currentSlideIndex]?.slideNumber || 1}_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });

      setStatusMessage('تم تحميل الستوري بنجاح! جاهز للنشر على إنستغرام ✨');
    } catch (err) {
      console.error(err);
      setStatusMessage('حدث خطأ أثناء تحميل الصورة، يرجى المحاولة مرة أخرى');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption || '');
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Cairo']">
                مشاركة وتصدير ستوري إنستغرام
              </h3>
              <p className="text-xs text-slate-400">
                نشر مباشر إلى إنستغرام ستوري لحساب د. مصطفى الحسيني (@dr.er11)
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

        {statusMessage && (
          <div className="mt-4 p-3 rounded-xl bg-teal-950/60 border border-teal-500/40 text-teal-300 text-xs flex items-center gap-2 animate-fadeIn">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-300" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="mt-5 space-y-4">
          {/* Featured Primary Instagram Share Button */}
          <button
            type="button"
            disabled={sharing}
            onClick={handleShareToInstagram}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-rose-500/25 transition transform active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            {sharing ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span>جاري فتح إنستغرام والمشاركة...</span>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-black font-['Cairo']">
                    مشاركة مباشرة إلى Instagram Stories 📲
                  </div>
                  <div className="text-[11px] font-normal text-white/90">
                    نشر السلايد الحالي ({slides[currentSlideIndex]?.slideNumber || 1}) إلى ستوري الحساب
                  </div>
                </div>
              </>
            )}
          </button>

          {/* Secondary Actions: Download PNG & Live Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={downloading}
              onClick={handleDownloadCurrentSlide}
              className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-teal-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {downloading ? (
                <RefreshCw className="w-5 h-5 animate-spin text-teal-400" />
              ) : (
                <Download className="w-5 h-5 text-teal-400" />
              )}
              <span>تحميل كصورة PNG (جودة 1080×1920)</span>
              <span className="text-[10px] text-slate-400 font-normal">
                حفظ يدوي في الألبوم
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPlayer();
              }}
              className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-purple-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
            >
              <Play className="w-5 h-5 text-purple-400" />
              <span>معاينة العرض التلقائي (Instagram Live)</span>
              <span className="text-[10px] text-slate-400 font-normal">
                تجربة الستوري بالحركة
              </span>
            </button>
          </div>

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
                className="px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-teal-300 flex items-center gap-1.5 transition"
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
              rows={5}
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
            <ul className="text-[11px] text-slate-400 space-y-1.5 pr-4 list-disc">
              <li className="text-teal-300 font-semibold">يتم تصدير السلايد صافياً بدون هيدر الحساب العلوي حتى يظهر اسم حسابك تلقائياً وبشكل طبيعي من تطبيق إنستغرام نفسه عند النشر.</li>
              <li>أنشر الستوريات بين الساعة 8:00 إلى 10:00 مساءً (وقت تفرغ الأمهات بالعراق).</li>
              <li>استخدم ستيكر التصويت الحقيقي في إنستغرام فوق مكان الستيكر بالصورة لزيادة التفاعل بنسبة 300%.</li>
              <li>احفظ هذه السلسلة في الهايلايت (Highlight) باسم "صحة أطفالنا" أو "حرارة الطفل".</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
