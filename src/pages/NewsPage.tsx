import React, { useState } from 'react';
import { PageId, NewsArticle } from '../types';
import { NEWS_ARTICLES } from '../data/expoData';
import { Calendar, User, ArrowRight, X, Clock, Share2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface NewsPageProps {
  onNavigate: (page: PageId) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const galleryImages = [
    {
      url: '/src/assets/images/expo_convention_b2b_1793033934662.jpg',
      caption: 'Hall d\'exposition B2B et allées des innovations végétales à Casablanca',
    },
    {
      url: '/src/assets/images/sector_urban_landscape_1793033933666.jpg',
      caption: 'Démonstrations de végétalisation verticale et façades bioclimatiques',
    },
    {
      url: '/src/assets/images/sector_smart_irrigation_1793033934496.jpg',
      caption: 'Espace micro-irrigation connectée et pépinières spécialisées',
    },
    {
      url: '/src/assets/images/hero_garden_expo_1793033933452.jpg',
      caption: 'Aménagements urbains résilients et mobilier d\'extérieur au Maroc',
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              <span>Actualités & Conférences</span>
              <span aria-hidden="true">·</span>
              <span>Casablanca, Maroc</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-balance mb-4">
              Tribune & Événements Professionnels
            </h1>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              Suivez les avancées technologiques, les analyses réglementaires et les comptes-rendus
              des sessions d'experts du salon Garden Expo Africa au Maroc.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Articles List */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
              Dernières Publications
            </span>
            <h2 className="text-2xl font-bold text-stone-900 font-['Outfit',sans-serif]">
              Articles Techniques & Décryptages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_ARTICLES.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                    <span className="font-semibold text-emerald-700">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-3 leading-snug font-['Outfit',sans-serif]">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Temps de lecture : {article.readTime}</span>
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>Lire la suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Photothèque des éditions de Casablanca */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              <ImageIcon className="w-4 h-4" />
              <span>Galerie Photographique</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 font-['Outfit',sans-serif]">
              Rétrospective des Éditions de Casablanca
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Aperçu des halls d'exposition, des stands professionnels et des démonstrations sur site au Maroc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden bg-stone-200 aspect-4/3 border border-stone-200 shadow-xs"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium leading-snug">
                  {img.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setSelectedArticle(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 z-10 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                {selectedArticle.category} · {selectedArticle.date}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-stone-900 font-['Outfit',sans-serif] leading-tight mb-4">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-stone-500 mb-6 pb-4 border-b border-stone-100">
              <span className="font-medium text-stone-800">Par {selectedArticle.author}</span>
              <span>·</span>
              <span>{selectedArticle.readTime} de lecture</span>
              <span>·</span>
              <span>Casablanca, Maroc</span>
            </div>

            <div className="flex flex-col gap-4 text-sm text-stone-700 leading-relaxed mb-8">
              {selectedArticle.content.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  onNavigate('visitors');
                }}
                className="px-4 py-2 bg-emerald-700 text-white rounded text-xs font-semibold hover:bg-emerald-800"
              >
                Participer aux conférences du salon
              </button>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-stone-100 text-stone-700 rounded text-xs font-semibold hover:bg-stone-200"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
