import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  QrCode,
  ArrowRight,
  Building2,
  MapPin,
  Calendar,
  Sparkles,
  Plus,
  Edit2,
  X,
  Check,
  Video,
  Layers,
} from 'lucide-react';

export interface VideoSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  videoUrl: string; // MP4, WebM, or YouTube embed URL
  posterUrl: string;
  videoType: 'mp4' | 'youtube';
  location: string;
  metricLabel: string;
  metricValue: string;
}

const DEFAULT_SLIDES: VideoSlide[] = [
  {
    id: 'slide-1',
    title: "Le Salon B2B du Paysage & de la Ville Verte en Afrique",
    subtitle: "Rassemblement international des acteurs majeurs de l'aménagement paysager, de l'urbanisme durable et du génie végétal.",
    badge: "Édition Officielle Maroc · Casablanca (OFEC)",
    videoUrl: "https://www.youtube.com/embed/QoPzVfK6RSg?autoplay=1&mute=1&controls=0&loop=1&playlist=QoPzVfK6RSg",
    posterUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&auto=format&fit=crop&q=80",
    videoType: "youtube",
    location: "OFEC Casablanca · 22 – 25 Octobre 2026",
    metricLabel: "Surface d'exposition",
    metricValue: "10 000 m²",
  },
  {
    id: 'slide-2',
    title: "Innovations en Arrosage Intelligent & Eaux Traitées (REUT)",
    subtitle: "Découvrez les technologies de pointe pour la sobriété hydrique, la télégestion des réseaux et les palettes végétales xérophiles.",
    badge: "Filière Stratégique Eau & Climat",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1&controls=0&loop=1&playlist=ScMzIvxBSi4",
    posterUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&auto=format&fit=crop&q=80",
    videoType: "youtube",
    location: "Halls A & B · Démonstrations en direct",
    metricLabel: "Exposants Leaders",
    metricValue: "140+ Marques",
  },
  {
    id: 'slide-3',
    title: "Mobilier Urbain, Éclairage Éco-conçu & Espaces Publics",
    subtitle: "Équipements contemporains pour parcs métropolitains, complexes hôteliers, résidences et grands chantiers 2030 au Maroc.",
    badge: "Urbanisme & Design Extérieur",
    videoUrl: "https://www.youtube.com/embed/L_LUpnjgPso?autoplay=1&mute=1&controls=0&loop=1&playlist=L_LUpnjgPso",
    posterUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1600&auto=format&fit=crop&q=80",
    videoType: "youtube",
    location: "Casablanca · Carrefour Panafricain",
    metricLabel: "Visiteurs Professionnels",
    metricValue: "8 500+",
  },
  {
    id: 'slide-4',
    title: "Rencontres d'Affaires & Délégations Internationales",
    subtitle: "Networking B2B ciblé entre donneurs d'ordres, architectes paysagistes, promoteurs et investisseurs de 12 pays.",
    badge: "Plateforme B2B & Conférences",
    videoUrl: "https://www.youtube.com/embed/EngW7tLk6R8?autoplay=1&mute=1&controls=0&loop=1&playlist=EngW7tLk6R8",
    posterUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&auto=format&fit=crop&q=80",
    videoType: "youtube",
    location: "Espace B2B & Club VIP",
    metricLabel: "Délégations Acheteurs",
    metricValue: "12 Pays",
  },
];

interface HeroVideoSliderProps {
  onNavigate: (page: PageId) => void;
  onOpenVideoLightbox?: (url: string) => void;
}

export const HeroVideoSlider: React.FC<HeroVideoSliderProps> = ({
  onNavigate,
  onOpenVideoLightbox,
}) => {
  const [slides, setSlides] = useState<VideoSlide[]>(() => {
    try {
      const saved = localStorage.getItem('garden_expo_hero_slides');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_SLIDES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<VideoSlide | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const SLIDE_DURATION = 8000; // 8 seconds per slide

  // Auto-advance timer with progress animation
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 100;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % slides.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length, currentIndex]);

  // Reset progress on slide change
  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const currentSlide = slides[currentIndex] || slides[0];

  const handleSaveSlide = (updated: VideoSlide) => {
    const nextSlides = slides.map((s) => (s.id === updated.id ? updated : s));
    setSlides(nextSlides);
    localStorage.setItem('garden_expo_hero_slides', JSON.stringify(nextSlides));
    setEditingSlide(null);
  };

  const handleAddSlide = () => {
    const newSlide: VideoSlide = {
      id: `slide-${Date.now()}`,
      title: "Nouvelle Vidéo Officielle Garden Expo",
      subtitle: "Description synthétique de la démonstration ou du stand d'exposition.",
      badge: "Casablanca · Édition Officielle",
      videoUrl: "https://www.youtube.com/embed/QoPzVfK6RSg?autoplay=1&mute=1&controls=0&loop=1&playlist=QoPzVfK6RSg",
      posterUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&auto=format&fit=crop&q=80",
      videoType: "youtube",
      location: "OFEC Casablanca · Maroc",
      metricLabel: "Visiteurs Pro",
      metricValue: "8 500+",
    };
    const nextSlides = [...slides, newSlide];
    setSlides(nextSlides);
    localStorage.setItem('garden_expo_hero_slides', JSON.stringify(nextSlides));
    setCurrentIndex(nextSlides.length - 1);
    setEditingSlide(newSlide);
  };

  const handleResetDefaults = () => {
    setSlides(DEFAULT_SLIDES);
    localStorage.removeItem('garden_expo_hero_slides');
    setCurrentIndex(0);
    setProgress(0);
  };

  return (
    <section className="relative bg-[#0D2818] text-white overflow-hidden border-b border-emerald-950/60 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
      {/* 1. BACKGROUND VIDEO / POSTER WITH TRANSITIONS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const isDirectMp4 = slide.videoUrl.endsWith('.mp4') || slide.videoUrl.endsWith('.webm') || slide.videoType === 'mp4';

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              {isDirectMp4 ? (
                <video
                  ref={isActive ? videoRef : undefined}
                  src={slide.videoUrl}
                  poster={slide.posterUrl}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover object-center"
                />
              ) : slide.videoUrl.includes('youtube.com') || slide.videoUrl.includes('youtu.be') ? (
                <div className="w-full h-full relative overflow-hidden">
                  <iframe
                    src={slide.videoUrl}
                    title={slide.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="w-full h-[140%] -top-[20%] relative object-cover pointer-events-none scale-125 opacity-40 filter brightness-90"
                  />
                  {/* Fallback image layer */}
                  <img
                    src={slide.posterUrl}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                  />
                </div>
              ) : (
                <img
                  src={slide.posterUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
              )}

              {/* Dark Forest Gradient Overlay for ultra-crisp text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D2818]/95 via-[#0D2818]/80 to-[#0D2818]/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2818] via-transparent to-black/30" />
            </div>
          );
        })}
      </div>

      {/* 2. TOP SLIDER BAR: CONTROLS, EDIT SHORTCUT & SOUND */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full flex items-center justify-between gap-4">
        {/* Slide Counter & Event Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/15 text-emerald-300 text-[11px] font-bold tracking-wide uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#A5C96B] animate-pulse" />
            <span>Slide {currentIndex + 1} / {slides.length}</span>
            <span className="text-white/40">·</span>
            <span className="hidden sm:inline text-stone-200">{currentSlide.badge}</span>
          </div>
        </div>

        {/* Video Controls Bar */}
        <div className="flex items-center gap-2">
          {/* Mute toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg bg-black/40 hover:bg-black/60 border border-white/15 text-stone-200 hover:text-white backdrop-blur-md transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            title={isMuted ? "Activer le son" : "Couper le son"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#A5C96B]" />}
            <span className="hidden md:inline text-[10px] uppercase font-bold">{isMuted ? "Muet" : "Son actif"}</span>
          </button>

          {/* Pause / Play Auto-advance */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-black/40 hover:bg-black/60 border border-white/15 text-stone-200 hover:text-white backdrop-blur-md transition-colors cursor-pointer text-xs"
            title={isPlaying ? "Mettre en pause le slider" : "Reprendre la lecture"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#A5C96B]" />}
          </button>

          {/* Fullscreen Video Lightbox */}
          {onOpenVideoLightbox && (
            <button
              onClick={() => onOpenVideoLightbox(currentSlide.videoUrl)}
              className="p-2 rounded-lg bg-black/40 hover:bg-black/60 border border-white/15 text-stone-200 hover:text-white backdrop-blur-md transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Agrandir la vidéo en plein écran"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[10px] uppercase font-bold">Plein Écran</span>
            </button>
          )}

          {/* Video Manager Modal Trigger (User requested: "je veux faire des slide video je te donner les video") */}
          <button
            onClick={() => setIsEditorOpen(true)}
            className="px-2.5 py-1.5 rounded-lg bg-[#367A4D]/80 hover:bg-[#367A4D] border border-emerald-400/30 text-white backdrop-blur-md transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            title="Ajouter ou remplacer les vidéos du slider"
          >
            <Video className="w-3.5 h-3.5 text-[#A5C96B]" />
            <span className="text-[11px] font-bold">Gérer les Vidéos</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN CONTENT: SLIDE DETAILS & B2B ACTIONS */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Direct Value Proposition & Action CTAs */}
          <div className="lg:col-span-8 space-y-5 animate-fade-in">
            {/* Location & Dates Chip */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#A5C96B] uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#A5C96B] shrink-0" />
              <span>{currentSlide.location}</span>
            </div>

            {/* Slide Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] font-['Outfit',sans-serif]">
              {currentSlide.title}
            </h1>

            {/* Slide Subtitle */}
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl font-normal">
              {currentSlide.subtitle}
            </p>

            {/* Venue & Date Key Card */}
            <div className="p-3.5 sm:p-4 bg-black/40 border border-white/15 rounded-xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-stone-200 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#367A4D] flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">OFEC Casablanca, Maroc</span>
                  <span className="text-xs text-stone-300">
                    Office des Foires et Expositions (Face Mosquée Hassan II)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#A5C96B] font-semibold sm:border-l sm:border-white/15 sm:pl-3 shrink-0">
                <Calendar className="w-4 h-4 shrink-0 text-[#A5C96B]" />
                <span>22 – 25 Octobre 2026</span>
              </div>
            </div>

            {/* Direct CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('visitor_portal')}
                className="px-6 py-3.5 bg-[#A5C96B] hover:bg-[#A5C96B]/90 text-[#0D2818] rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 group cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#0D2818]" />
                <span>Demander mon E-Badge Gratuit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-xs uppercase tracking-wider transition-all backdrop-blur-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#A5C96B]" />
                <span>Réserver un Stand Exposant</span>
              </button>
            </div>
          </div>

          {/* Right Column: Slide KPI Highlight Card & Quick Video Preview */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/15 backdrop-blur-md">
              <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                {currentSlide.metricLabel}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#A5C96B] font-['Outfit',sans-serif] my-1">
                {currentSlide.metricValue}
              </div>
              <p className="text-xs text-stone-300">
                Chiffre officiel certifié Garden Expo Africa
              </p>

              {/* Quick Thumbnail Preview */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-14 h-10 rounded-lg overflow-hidden relative shrink-0 border border-white/20">
                  <img
                    src={currentSlide.posterUrl}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-[#A5C96B] fill-current" />
                  </div>
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block truncate max-w-[180px]">{currentSlide.title}</span>
                  <span className="text-[11px] text-stone-400">Vidéo active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM NAVIGATION BAR: TIMELINE, PREV/NEXT & MINI THUMBNAILS */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 w-full">
        {/* Progress Bar for Current Slide */}
        <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[#A5C96B] transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Thumbnails Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleSelectSlide(idx)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border text-left transition-all shrink-0 cursor-pointer ${
                  idx === currentIndex
                    ? 'bg-white/20 border-[#A5C96B] text-white shadow-sm'
                    : 'bg-black/30 border-white/10 text-stone-400 hover:text-white hover:border-white/30'
                }`}
              >
                <span className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold ${
                  idx === currentIndex ? 'bg-[#A5C96B] text-[#0D2818]' : 'bg-white/10 text-stone-300'
                }`}>
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold truncate max-w-[120px] md:max-w-[150px]">
                  {s.badge.split('·')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Prev / Next Chevrons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/15 text-white transition-colors cursor-pointer hover:border-white/30"
              aria-label="Slide vidéo précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/15 text-white transition-colors cursor-pointer hover:border-white/30"
              aria-label="Slide vidéo suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. VIDEO MANAGER MODAL (READY FOR USER TO PROVIDE VIDEOS) */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#123D2B] border border-white/20 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6">
              <div className="flex items-center gap-2.5">
                <Video className="w-5 h-5 text-[#A5C96B]" />
                <div>
                  <h3 className="text-lg font-bold font-['Outfit',sans-serif]">
                    Gestionnaire des Vidéos du Slider
                  </h3>
                  <p className="text-xs text-stone-300">
                    Insérez vos vidéos (fichiers MP4 locaux, hébergés ou liens YouTube).
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setIsEditorOpen(false); setEditingSlide(null); }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Editor Form if a slide is selected for edit */}
            {editingSlide ? (
              <div className="space-y-4 bg-white/5 p-5 rounded-xl border border-white/10 mb-6">
                <h4 className="text-sm font-bold text-[#A5C96B] uppercase tracking-wider flex items-center justify-between">
                  <span>Modifier la Vidéo #{slides.findIndex(s => s.id === editingSlide.id) + 1}</span>
                  <button
                    onClick={() => setEditingSlide(null)}
                    className="text-xs text-stone-300 hover:underline"
                  >
                    Retour à la liste
                  </button>
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Lien / URL de la vidéo (MP4 direct ou lien YouTube) :
                  </label>
                  <input
                    type="text"
                    value={editingSlide.videoUrl}
                    onChange={(e) => setEditingSlide({ ...editingSlide, videoUrl: e.target.value })}
                    placeholder="https://.../video.mp4 ou /assets/mon-video.mp4 ou https://www.youtube.com/embed/..."
                    className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-[#A5C96B]"
                  />
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Prend en charge les fichiers .mp4 directs, les chemins locaux (/assets/...) et les iframes YouTube.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Titre du Slide :
                    </label>
                    <input
                      type="text"
                      value={editingSlide.title}
                      onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                      className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-[#A5C96B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Badge / Tag :
                    </label>
                    <input
                      type="text"
                      value={editingSlide.badge}
                      onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                      className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-[#A5C96B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Sous-titre / Description courte :
                  </label>
                  <textarea
                    rows={2}
                    value={editingSlide.subtitle}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-[#A5C96B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Image de couverture (Poster fallback) :
                    </label>
                    <input
                      type="text"
                      value={editingSlide.posterUrl}
                      onChange={(e) => setEditingSlide({ ...editingSlide, posterUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-[#A5C96B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Chiffre clé (ex: 10 000 m²) :
                    </label>
                    <input
                      type="text"
                      value={editingSlide.metricValue}
                      onChange={(e) => setEditingSlide({ ...editingSlide, metricValue: e.target.value })}
                      className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:border-[#A5C96B]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setEditingSlide(null)}
                    className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-xs font-semibold text-stone-300"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handleSaveSlide(editingSlide)}
                    className="px-4 py-2 rounded-lg bg-[#A5C96B] text-[#0D2818] font-bold text-xs uppercase tracking-wider hover:bg-[#A5C96B]/90 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Enregistrer la vidéo</span>
                  </button>
                </div>
              </div>
            ) : null}

            {/* List of current slides */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A5C96B]">
                  Liste des {slides.length} Vidéos Actuelles
                </span>
                <button
                  onClick={handleAddSlide}
                  className="px-3 py-1.5 rounded-lg bg-[#367A4D] hover:bg-[#367A4D]/80 text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter une vidéo</span>
                </button>
              </div>

              {slides.map((s, i) => (
                <div
                  key={s.id}
                  className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-16 h-10 rounded-md overflow-hidden bg-black/50 shrink-0 border border-white/15">
                      <img src={s.posterUrl} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white truncate">{s.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-stone-300 shrink-0">
                          Slide #{i + 1}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400 truncate block mt-0.5">
                        URL: {s.videoUrl}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingSlide(s)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#A5C96B]" />
                      <span className="hidden sm:inline">Modifier</span>
                    </button>
                    {slides.length > 1 && (
                      <button
                        onClick={() => {
                          const next = slides.filter(item => item.id !== s.id);
                          setSlides(next);
                          localStorage.setItem('garden_expo_hero_slides', JSON.stringify(next));
                          if (currentIndex >= next.length) setCurrentIndex(0);
                        }}
                        className="p-2 rounded-lg bg-red-900/40 hover:bg-red-800/60 text-red-200 text-xs"
                        title="Supprimer cette vidéo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
              <button
                onClick={handleResetDefaults}
                className="text-xs text-stone-400 hover:text-white underline"
              >
                Réinitialiser les vidéos par défaut
              </button>
              <button
                onClick={() => { setIsEditorOpen(false); setEditingSlide(null); }}
                className="px-5 py-2 rounded-xl bg-[#A5C96B] text-[#0D2818] font-bold text-xs uppercase tracking-wider hover:bg-[#A5C96B]/90"
              >
                Fermer & Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
