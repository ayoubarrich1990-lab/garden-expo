import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageId, GalleryPhoto } from '../types';
import {
  Image as ImageIcon,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { gallery } = useApp();

  const [selectedEdition, setSelectedEdition] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Filter list
  const filteredPhotos = gallery.filter((item) => {
    const matchEdition = selectedEdition === 'all' || item.edition === selectedEdition;
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchEdition && matchCategory;
  });

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null && activePhotoIndex > 0) {
      setActivePhotoIndex(activePhotoIndex - 1);
    } else if (activePhotoIndex === 0) {
      setActivePhotoIndex(filteredPhotos.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null && activePhotoIndex < filteredPhotos.length - 1) {
      setActivePhotoIndex(activePhotoIndex + 1);
    } else if (activePhotoIndex === filteredPhotos.length - 1) {
      setActivePhotoIndex(0);
    }
  };

  return (
    <div className="bg-[#F5F6F3] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#123D2B] text-white py-16 sm:py-20 border-b border-[#202620]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A5C96B] uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Photothèque Officielle · Casablanca Maroc</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white mb-4">
              Galerie & Rétrospective en Images
            </h1>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
              Plongez au cœur des temps forts de Garden Expo Africa à Casablanca : inauguration officielle,
              stands d'exception, démonstrations paysagères, débats d'experts et rencontres B2B.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters bar */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Edition Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Édition:
              </span>
              {[
                { id: 'all', label: 'Toutes les Éditions' },
                { id: '3ème Édition', label: '3ème Édition (2025)' },
                { id: '2ème Édition', label: '2ème Édition (2023)' },
                { id: '1ère Édition', label: '1ère Édition (2022)' },
              ].map((ed) => (
                <button
                  key={ed.id}
                  onClick={() => setSelectedEdition(ed.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedEdition === ed.id
                      ? 'bg-[#123D2B] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {ed.label}
                </button>
              ))}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Thème:
              </span>
              {[
                { id: 'all', label: 'Tous' },
                { id: 'stands', label: 'Stands' },
                { id: 'inauguration', label: 'Inauguration' },
                { id: 'visitors', label: 'Visiteurs & B2B' },
                { id: 'conferences', label: 'Conférences' },
                { id: 'animations', label: 'Animations' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#367A4D] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
            <span>{filteredPhotos.length} photographies affichées</span>
            <span className="font-medium text-[#123D2B]">Crédits photographiques : Direction de la Communication GEA Maroc</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#123D2B]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {photo.edition}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-semibold">Cliquer pour agrandir</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm font-['Outfit',sans-serif] group-hover:text-[#367A4D] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">{photo.caption}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="uppercase font-semibold tracking-wider text-[#367A4D]">{photo.category}</span>
                  <span>Casablanca, Maroc</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhoto && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden bg-black/50 border border-white/15"
          >
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.title}
              className="max-h-[68vh] w-auto object-contain mx-auto"
            />
            <div className="bg-stone-900 text-white p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#A5C96B] uppercase tracking-wider">
                    {activePhoto.edition} · {activePhoto.category}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif]">
                  {activePhoto.title}
                </h4>
                <p className="text-xs text-stone-300 mt-1">{activePhoto.caption}</p>
              </div>

              <div className="text-xs text-stone-400 font-mono">
                {activePhotoIndex! + 1} / {filteredPhotos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
