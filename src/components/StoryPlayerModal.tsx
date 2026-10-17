import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, Pause, Play } from 'lucide-react';
import { StorySlide, DoctorProfile } from '../types/story';
import { StoryCanvas } from './StoryCanvas';

interface StoryPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: StorySlide[];
  doctorProfile: DoctorProfile;
  initialSlideIndex?: number;
}

export const StoryPlayerModal: React.FC<StoryPlayerModalProps> = ({
  isOpen,
  onClose,
  slides,
  doctorProfile,
  initialSlideIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    setCurrentIndex(initialSlideIndex);
    setProgress(0);
  }, [initialSlideIndex, isOpen]);

  // Story progression timer (5000ms = 5s per story slide)
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / 5000) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next slide or close if last
          setCurrentIndex((current) => {
            if (current < slides.length - 1) {
              return current + 1;
            } else {
              onClose();
              return current;
            }
          });
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPaused, slides.length, currentIndex, onClose]);

  if (!isOpen) return null;

  const handleNext = () => {
    setProgress(0);
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    setProgress(0);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl animate-fadeIn select-none">
      {/* Close and pause floating controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition"
          title={isPaused ? 'استئناف' : 'إيقاف مؤقت'}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation arrows for desktop */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-20 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Phone container */}
      <div
        className="relative w-full max-w-[390px] mx-auto"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <StoryCanvas
          slide={slides[currentIndex]}
          totalSlides={slides.length}
          currentSlideIndex={currentIndex}
          doctorProfile={doctorProfile}
          onNextSlide={handleNext}
          onPrevSlide={handlePrev}
          interactivePreview={true}
          hideInstagramUI={false}
        />
      </div>
    </div>
  );
};
