import React, { useState } from 'react';
import { PageId, Sector } from '../types';
import { SECTORS_DATA } from '../data/expoData';
import { filterSectors } from '../utils/expoLogic';
import { Search, CheckCircle2, ArrowRight, Sparkles, Layers } from 'lucide-react';

interface SectorsPageProps {
  onNavigate: (page: PageId) => void;
}

export const SectorsPage: React.FC<SectorsPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);

  const displayedSectors = filterSectors(SECTORS_DATA, searchQuery);

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              <span>Nomenclature & Filières B2B</span>
              <span aria-hidden="true">·</span>
              <span>Casablanca, Maroc</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-balance mb-4">
              Secteurs d'Activité d'Exposition
            </h1>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              8 grands secteurs couvrant l'intégralité de la chaîne de valeur : du végétal aux technologies d'irrigation,
              du mobilier urbain aux équipements lourds et aux solutions Smart Green City.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit, une solution, un secteur (ex: goutte-à-goutte, bancs, pépinières)..."
                className="w-full pl-11 pr-4 py-3 bg-stone-800/90 border border-stone-700 rounded-lg text-white placeholder-stone-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sectors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="text-xs sm:text-sm text-stone-600 font-medium">
            Affichage de <strong>{displayedSectors.length}</strong> secteur(s) spécialisé(s)
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
            <Layers className="w-4 h-4" />
            <span>Nomenclature officielle Maroc</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedSectors.map((sector) => (
            <div
              key={sector.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="h-56 overflow-hidden relative bg-stone-100">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl font-bold text-white font-['Outfit',sans-serif] leading-snug">
                      {sector.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-stone-700 leading-relaxed mb-6 font-medium">
                    {sector.fullDesc}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                      Exemples de Produits & Solutions Exposés
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sector.products.map((prod, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{prod}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 bg-stone-50/70 -mx-6 -mb-6 p-6">
                    <div className="mb-4">
                      <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                        Donnée Marché & Contexte Maroc
                      </span>
                      <p className="text-xs text-emerald-900 font-medium">
                        {sector.marketKeyFigures}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => onNavigate('exhibitors')}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors"
                      >
                        Exposer dans ce secteur
                      </button>
                      <button
                        onClick={() => onNavigate('visitors')}
                        className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 rounded-md transition-colors"
                      >
                        Visiter les stands
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayedSectors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <p className="text-stone-600 text-sm mb-4">
              Aucun secteur ne correspond à votre recherche « {searchQuery} ».
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-md hover:bg-emerald-100"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
