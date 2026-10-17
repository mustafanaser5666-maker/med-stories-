/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Download,
  Play,
  Palette,
  BookOpen,
  Wand2,
  Share2,
  RotateCcw,
  Stethoscope,
  ChevronDown,
  Layers,
  HeartHandshake,
  RefreshCw,
  Check,
} from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { StorySlide, DoctorProfile, StoryIllustration } from './types/story';
import { PRESET_TOPICS } from './data/presetTopics';
import { DEFAULT_ILLUSTRATIONS, DOCTOR_MUSTAFA_AVATAR } from './data/cartoonLibrary';
import { StoryCanvas, HeaderStyle } from './components/StoryCanvas';
import { StoryEditor } from './components/StoryEditor';
import { StoryGeneratorModal } from './components/StoryGeneratorModal';
import { CartoonGeneratorModal } from './components/CartoonGeneratorModal';
import { ExportModal } from './components/ExportModal';
import { StoryPlayerModal } from './components/StoryPlayerModal';

export default function App() {
  // Initial Doctor Profile: Dr. Mustafa Al-Husseini
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile>({
    name: 'د. مصطفى الحسيني',
    title: 'أخصائي طب الأطفال وحديثي الولادة',
    handle: '@dr.er11',
    avatarUrl: DOCTOR_MUSTAFA_AVATAR,
    phone: '07701234567',
    clinicAddress: 'بغداد - عيادة طب الأطفال',
    verified: true,
  });

  // Current Story sequence
  const [currentTopic, setCurrentTopic] = useState(PRESET_TOPICS[0]);
  const [slides, setSlides] = useState<StorySlide[]>(PRESET_TOPICS[0].slides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [caption, setCaption] = useState(PRESET_TOPICS[0].defaultCaption);
  const [topicTitle, setTopicTitle] = useState(PRESET_TOPICS[0].title);

  // Modals & sharing state
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isCartoonModalOpen, setIsCartoonModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [showPresetsDropdown, setShowPresetsDropdown] = useState(false);
  const [sharingSingle, setSharingSingle] = useState(false);
  const [downloadingSingle, setDownloadingSingle] = useState(false);
  const [sharingAll, setSharingAll] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>('branded');

  // Canvas Reference for export
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Hidden references for batch capturing all slides
  const batchSlideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // 1. Share Single Slide to Instagram / Native Share
  const handleShareToInstagram = async () => {
    const el = canvasRef.current || batchSlideRefs.current[currentSlideIndex];
    if (!el) return;
    setSharingSingle(true);
    showToast(`جاري تحضير السلايد ${currentSlideIndex + 1} للنشر على إنستغرام...`);

    try {
      const dataUrl = await toPng(el, {
        pixelRatio: 2.5,
        quality: 0.98,
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const fileName = `dr_mustafa_story_slide_${slides[currentSlideIndex]?.slideNumber || currentSlideIndex + 1}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      // If device supports Web Share API with files (Android, iOS Safari, etc.)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `ستوري د. مصطفى الحسيني: ${slides[currentSlideIndex]?.title || 'طب أطفال'}`,
          text: caption || 'ستوري طب أطفال - د. مصطفى الحسيني @dr.er11',
          files: [file],
        });
        showToast('تم فتح قائمة المشاركة بنجاح! اختر Instagram Stories 📲');
      } else {
        // Desktop / unsupported browsers fallback
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();

        try {
          await navigator.clipboard.writeText(caption || '');
        } catch (_) {}

        try {
          if (navigator.clipboard && (window as any).ClipboardItem) {
            await navigator.clipboard.write([
              new (window as any).ClipboardItem({ 'image/png': blob }),
            ]);
          }
        } catch (_) {}

        window.open('https://www.instagram.com/', '_blank');
        showToast('تم تحميل صورة الستوري ونسخ النص! تم فتح إنستغرام للنشر المباشر 📸✨');
      }

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.error(err);
        showToast('حدث خطأ أثناء المشاركة، يمكنك تجربة التحميل كصورة');
      }
    } finally {
      setSharingSingle(false);
    }
  };

  // 2. Download Current Single Slide
  const handleDownloadCurrentSlide = async () => {
    const el = canvasRef.current || batchSlideRefs.current[currentSlideIndex];
    if (!el) return;
    setDownloadingSingle(true);
    showToast('جاري تصدير صورة الستوري بدقة عالية...');

    try {
      const dataUrl = await toPng(el, {
        pixelRatio: 2.5,
        quality: 0.98,
      });

      const link = document.createElement('a');
      link.download = `dr_mustafa_story_slide_${slides[currentSlideIndex]?.slideNumber || currentSlideIndex + 1}_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });

      showToast('تم تحميل الستوري بنجاح! جاهز للنشر على إنستغرام ✨');
    } catch (err) {
      console.error(err);
      showToast('حدث خطأ أثناء تحميل السلايد');
    } finally {
      setDownloadingSingle(false);
    }
  };

  // 3. Share All Slides at Once to Instagram (Request 10)
  const handleShareAllSlides = async () => {
    setSharingAll(true);
    showToast(`جاري تجهيز جميع السلايدات (${slides.length}) للمشاركة...`);

    try {
      const files: File[] = [];

      for (let i = 0; i < slides.length; i++) {
        showToast(`جاري معالجة السلايد ${i + 1} من ${slides.length}...`);
        const el = batchSlideRefs.current[i] || (i === currentSlideIndex ? canvasRef.current : null);
        if (!el) continue;

        const dataUrl = await toPng(el, {
          pixelRatio: 2.5,
          quality: 0.98,
        });

        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File(
          [blob],
          `dr_mustafa_story_slide_${i + 1}_of_${slides.length}.png`,
          { type: 'image/png' }
        );
        files.push(file);
      }

      if (files.length === 0) {
        throw new Error('لم يتم العثور على سلايدات لتجهيزها');
      }

      // Check if multi-file sharing is supported (iOS Safari, Android Chrome Web Share API)
      if (navigator.canShare && navigator.canShare({ files })) {
        await navigator.share({
          title: `سلسلة ستوريات طب الأطفال: ${topicTitle} - د. مصطفى الحسيني`,
          text: caption || 'سلسلة ستوريات طب الأطفال - د. مصطفى الحسيني @dr.er11',
          files,
        });
        showToast(`تم فتح قائمة المشاركة لجميع السلايدات (${files.length})! اختر إنستغرام 📲✨`);
      } else {
        // Fallback for desktop: download all files sequentially and open Instagram
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          const link = document.createElement('a');
          link.download = f.name;
          link.href = URL.createObjectURL(f);
          link.click();
          await new Promise((r) => setTimeout(r, 260));
        }

        try {
          await navigator.clipboard.writeText(caption || '');
        } catch (_) {}

        window.open('https://www.instagram.com/', '_blank');
        showToast(`تم تحميل جميع السلايدات (${files.length}) ونسخ الكابشن! تم فتح إنستغرام 📸`);
      }

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.error(err);
        showToast('حدث خطأ أثناء معالجة السلسلة');
      }
    } finally {
      setSharingAll(false);
    }
  };

  // 4. Download All Slides sequentially as high-res PNG files
  const handleDownloadAllSlides = async () => {
    setDownloadingAll(true);
    showToast(`جاري تحميل جميع السلايدات (${slides.length})...`);

    try {
      for (let i = 0; i < slides.length; i++) {
        showToast(`جاري تحميل السلايد ${i + 1} من ${slides.length}...`);
        const el = batchSlideRefs.current[i] || (i === currentSlideIndex ? canvasRef.current : null);
        if (!el) continue;

        const dataUrl = await toPng(el, {
          pixelRatio: 2.5,
          quality: 0.98,
        });

        const link = document.createElement('a');
        link.download = `dr_mustafa_story_slide_${i + 1}_of_${slides.length}.png`;
        link.href = dataUrl;
        link.click();
        await new Promise((r) => setTimeout(r, 260));
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      showToast(`تم تحميل جميع السلايدات (${slides.length}) بنجاح! 📥✨`);
    } catch (err) {
      console.error(err);
      showToast('حدث خطأ أثناء تحميل السلايدات');
    } finally {
      setDownloadingAll(false);
    }
  };

  // Handlers for slide modifications
  const handleUpdateSlide = (updatedSlide: StorySlide) => {
    setSlides((prev) =>
      prev.map((s, idx) => (idx === currentSlideIndex ? updatedSlide : s))
    );
  };

  const handleAddSlide = () => {
    const newSlide: StorySlide = {
      id: `slide_${Date.now()}`,
      slideNumber: slides.length + 1,
      badge: 'نصيحة إضافية 💡',
      title: 'نصيحة ذهبية ثانية للأمهات',
      subtitle: 'خطوة سهلة تحمي طفلج',
      mainText: 'يا أمهاتنا الحبابات.. خلوا ببالكم دائماً راحة الطفل ونومه الهادئ يعكس صحته ونموه السليم 🤍',
      bulletPoints: ['استشيري الطبيب قبل أي علاج', 'الاهتمام بالسوائل والرضاعة الطبيعية'],
      sticker: {
        type: 'poll',
        question: 'تطبقين هاي النصيحة ويا طفلج؟',
        optionA: 'أي أكيد ✅',
        optionB: 'من اليوم راح أبدأ 🌸',
      },
      illustration: {
        ...DEFAULT_ILLUSTRATIONS.pediatrician,
        position: 'top',
        size: 'medium',
        shape: 'rounded',
      },
      colorTheme: slides[currentSlideIndex]?.colorTheme || 'teal_mint',
      footerNote: 'عافيات على أطفالنا 🤍 | لا تترددين باستشارة الطبيب',
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  const handleDuplicateSlide = (index: number) => {
    const target = slides[index];
    if (!target) return;
    const duplicated: StorySlide = {
      ...target,
      id: `slide_${Date.now()}`,
      slideNumber: slides.length + 1,
      title: `${target.title} (نسخة)`,
    };
    const updated = [...slides];
    updated.splice(index + 1, 0, duplicated);
    setSlides(updated);
    setCurrentSlideIndex(index + 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) return;
    const updated = slides.filter((_, idx) => idx !== index);
    setSlides(updated);
    if (currentSlideIndex >= updated.length) {
      setCurrentSlideIndex(updated.length - 1);
    }
  };

  const handleSelectPreset = (preset: (typeof PRESET_TOPICS)[0]) => {
    setCurrentTopic(preset);
    setSlides(preset.slides);
    setCaption(preset.defaultCaption);
    setTopicTitle(preset.title);
    setCurrentSlideIndex(0);
    setShowPresetsDropdown(false);
  };

  const handleStoriesGenerated = (newSlides: StorySlide[], newCaption: string, newTitle: string) => {
    setSlides(newSlides);
    setCaption(newCaption);
    setTopicTitle(newTitle);
    setCurrentSlideIndex(0);
  };

  const handleSelectIllustration = (illustration: StoryIllustration) => {
    if (!slides[currentSlideIndex]) return;
    handleUpdateSlide({
      ...slides[currentSlideIndex],
      illustration,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Tajawal',sans-serif]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/25">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white font-['Cairo'] tracking-wide">
                  حكيم الأطفال 🩺
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  اللهجة العراقية 🇮🇶
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                مولد ومصمم ستوريات إنستغرام لطب الأطفال مع رسوم كرتونية جذابة
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Presets Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPresetsDropdown(!showPresetsDropdown)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline">مواضيع جاهزة</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {showPresetsDropdown && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-fadeIn">
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 border-b border-slate-800">
                    مواضيع طب الأطفال الشائعة بالعراق:
                  </div>
                  <div className="mt-1 space-y-1 max-h-64 overflow-y-auto">
                    {PRESET_TOPICS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`w-full text-right p-2 rounded-xl text-xs flex items-center gap-2 transition ${
                          currentTopic.id === preset.id
                            ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-base">{preset.icon}</span>
                        <div className="flex-1 truncate">
                          <div className="font-bold truncate">{preset.title}</div>
                          <div className="text-[10px] text-slate-400 truncate">{preset.subtitle}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Generator Button */}
            <button
              type="button"
              onClick={() => setIsGeneratorOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-500/20 transition"
            >
              <Wand2 className="w-4 h-4" />
              <span>توليد بالذكاء الاصطناعي 🪄</span>
            </button>

            {/* Cartoon Generator Button */}
            <button
              type="button"
              onClick={() => setIsCartoonModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Palette className="w-4 h-4 text-pink-400" />
              <span className="hidden sm:inline">الرسوم الكرتونية</span>
            </button>

            {/* Live Story Player */}
            <button
              type="button"
              onClick={() => setIsPlayerOpen(true)}
              className="px-3 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              title="معاينة كـ ستوري حقيقي"
            >
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">معاينة الستوري</span>
            </button>

            {/* Direct Instagram Batch Multi-Share Button */}
            <button
              type="button"
              onClick={handleShareAllSlides}
              disabled={sharingAll || sharingSingle}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-rose-500/25 transition cursor-pointer disabled:opacity-50"
              title="مشاركة جميع سلايدات الستوري دفعة واحدة على إنستغرام"
            >
              {sharingAll ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
              <span>نشر السلسلة كاملة ({slides.length}) 📚📲</span>
            </button>

            {/* Direct Single Slide Share Button */}
            <button
              type="button"
              onClick={handleShareToInstagram}
              disabled={sharingSingle || sharingAll}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
              title="نشر السلايد الحالي فقط"
            >
              <Share2 className="w-4 h-4 text-pink-400" />
              <span className="hidden sm:inline">السلايد الحالي</span>
            </button>

            {/* Export & Download Modal Trigger */}
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-teal-400" />
              <span>خيارات التصدير</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Desktop 5 cols): Real 9:16 Instagram Canvas */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          {/* Canvas Mode Control Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-[380px] px-1 text-xs font-bold text-slate-400 gap-2">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>سلايد {currentSlideIndex + 1} من {slides.length}</span>
            </span>

            {/* 3-Way Header Style Toggle */}
            <div className="flex bg-slate-900/95 p-1 rounded-xl border border-slate-700/80 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setHeaderStyle('branded')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  headerStyle === 'branded'
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-xs font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="يظهر اسم د. مصطفى الحسيني والمعرف @dr.er11 والأفاتار في أعلى السلايد"
              >
                هوية الطبيب 🩺
              </button>
              <button
                type="button"
                onClick={() => setHeaderStyle('clean')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  headerStyle === 'clean'
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-xs font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="سلايد صافي وطبيعي للنشر مباشرة بدون هيدر علوي"
              >
                صافي ✨
              </button>
              <button
                type="button"
                onClick={() => setHeaderStyle('instagram_mock')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  headerStyle === 'instagram_mock'
                    ? 'bg-purple-600 text-white shadow-xs font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="معاينة شكل الستوري داخل واجهة تطبيق إنستغرام"
              >
                واجهة إنستغرام 📱
              </button>
            </div>
          </div>

          {/* Canvas Component */}
          <div className="w-full flex justify-center">
            <StoryCanvas
              slide={slides[currentSlideIndex] || slides[0]}
              totalSlides={slides.length}
              currentSlideIndex={currentSlideIndex}
              doctorProfile={doctorProfile}
              onNextSlide={() => {
                if (currentSlideIndex < slides.length - 1) {
                  setCurrentSlideIndex(currentSlideIndex + 1);
                }
              }}
              onPrevSlide={() => {
                if (currentSlideIndex > 0) {
                  setCurrentSlideIndex(currentSlideIndex - 1);
                }
              }}
              interactivePreview={false}
              canvasRef={canvasRef}
              onShare={handleShareToInstagram}
              headerStyle={headerStyle}
            />
          </div>

          {/* Quick slide navigation below canvas */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              disabled={currentSlideIndex === 0}
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 text-xs font-bold transition cursor-pointer"
            >
              ← السابق
            </button>
            <div className="flex gap-1.5 px-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={currentSlideIndex === slides.length - 1}
              onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 text-xs font-bold transition cursor-pointer"
            >
              التالي →
            </button>
          </div>

          {/* Direct Multi-slide and Single-slide Action Bar */}
          <div className="w-full max-w-[380px] space-y-2 pt-1">
            {/* Primary Multi-Slide Share Button (Request 10) */}
            <button
              type="button"
              onClick={handleShareAllSlides}
              disabled={sharingAll || sharingSingle}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white text-xs font-black flex items-center justify-center gap-2 shadow-xl shadow-rose-500/25 transition cursor-pointer disabled:opacity-50"
            >
              {sharingAll ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جاري تجهيز ونشر جميع الستوريات ({slides.length})...</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>نشر السلسلة كاملة على إنستغرام ({slides.length} ستوريات) 📚📲</span>
                </>
              )}
            </button>

            {/* Secondary actions: Current Slide + Download All + Single Download */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleShareToInstagram}
                disabled={sharingSingle || sharingAll}
                className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold border border-slate-700 flex items-center justify-center gap-1 transition cursor-pointer disabled:opacity-50 text-center"
                title="نشر السلايد الحالي فقط"
              >
                {sharingSingle ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Share2 className="w-3.5 h-3.5 text-pink-400" />
                )}
                <span>سلايد {currentSlideIndex + 1} 📲</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadAllSlides}
                disabled={downloadingAll}
                className="py-2.5 px-2 rounded-xl bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/30 text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer disabled:opacity-50 text-center"
                title="تحميل جميع السلايدات كملفات PNG"
              >
                {downloadingAll ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>تحميل الكل ({slides.length}) 📥</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadCurrentSlide}
                disabled={downloadingSingle}
                className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer disabled:opacity-50 text-center"
                title="تحميل السلايد الحالي فقط كصورة PNG"
              >
                {downloadingSingle ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
                ) : (
                  <Download className="w-3.5 h-3.5 text-teal-400" />
                )}
                <span>تحميل سلايد {currentSlideIndex + 1}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Desktop 7 cols): Interactive Story Editor */}
        <div className="lg:col-span-7 h-full">
          <StoryEditor
            slides={slides}
            currentSlideIndex={currentSlideIndex}
            onSelectSlide={setCurrentSlideIndex}
            onUpdateSlide={handleUpdateSlide}
            onAddSlide={handleAddSlide}
            onDuplicateSlide={handleDuplicateSlide}
            onDeleteSlide={handleDeleteSlide}
            doctorProfile={doctorProfile}
            onUpdateDoctorProfile={setDoctorProfile}
            onOpenCartoonModal={() => setIsCartoonModalOpen(true)}
          />
        </div>
      </main>

      {/* Hidden batch capture container for capturing all slides in sequence */}
      <div
        className="fixed pointer-events-none overflow-hidden"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          width: '380px',
          zIndex: -100,
        }}
        aria-hidden="true"
      >
        {slides.map((s, idx) => (
          <div
            key={s.id || idx}
            ref={(el) => {
              batchSlideRefs.current[idx] = el;
            }}
            className="w-[380px] mb-4"
          >
            <StoryCanvas
              slide={s}
              totalSlides={slides.length}
              currentSlideIndex={idx}
              doctorProfile={doctorProfile}
              interactivePreview={false}
              headerStyle={headerStyle}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 px-4 py-4 text-center text-xs text-slate-500">
        <p className="flex items-center justify-center gap-1.5">
          <span>حكيم الأطفال © 2026</span>
          <span>•</span>
          <span>محتوى طبي توعوي موثوق للأمهات والآباء باللهجة العراقية</span>
          <span>•</span>
          <span className="text-teal-400">عافيات على جهالنا 🤍</span>
        </p>
      </footer>

      {/* Modals */}
      <StoryGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onStoriesGenerated={handleStoriesGenerated}
        doctorName={doctorProfile.name}
        doctorTitle={doctorProfile.title}
        clinicHandle={doctorProfile.handle}
      />

      <CartoonGeneratorModal
        isOpen={isCartoonModalOpen}
        onClose={() => setIsCartoonModalOpen(false)}
        onSelectIllustration={handleSelectIllustration}
        currentIllustrationKey={slides[currentSlideIndex]?.illustration?.key}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        slides={slides}
        currentSlideIndex={currentSlideIndex}
        doctorProfile={doctorProfile}
        caption={caption}
        topicTitle={topicTitle}
        headerStyle={headerStyle}
        onChangeHeaderStyle={setHeaderStyle}
        onSelectSlide={setCurrentSlideIndex}
        onOpenPlayer={() => setIsPlayerOpen(true)}
        onShareAll={handleShareAllSlides}
        onDownloadAll={handleDownloadAllSlides}
        onShareSingle={handleShareToInstagram}
        onDownloadSingle={handleDownloadCurrentSlide}
        isSharingAll={sharingAll}
        isDownloadingAll={downloadingAll}
        isSharingSingle={sharingSingle}
        isDownloadingSingle={downloadingSingle}
      />

      <StoryPlayerModal
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        slides={slides}
        doctorProfile={doctorProfile}
        initialSlideIndex={currentSlideIndex}
      />

      {/* Floating Instagram Share Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-900/95 border border-pink-500/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 backdrop-blur-md animate-fadeIn">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
