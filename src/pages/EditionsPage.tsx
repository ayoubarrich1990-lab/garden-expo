import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageId, EditionArchive } from '../types';
import { Calendar, MapPin, Users, Award, CheckCircle2, ChevronRight, Play, ExternalLink } from 'lucide-react';

interface EditionsPageProps {
  onNavigate: (page: PageId) => void;
}

export const EditionsPage: React.FC<EditionsPageProps> = ({ onNavigate }) => {
  const { editions } = useApp();
  const [selectedEditionId, setSelectedEditionId] = useState<string>(editions[0].id);

  const selectedEdition = editions.find((e) => e.id === selectedEditionId) || editions[0];

  return (
    <div className="bg-[#F5F6F3] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#123D2B] text-white py-16 sm:py-20 border-b border-[#202620]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A5C96B] tracking-wider uppercase mb-3">
              <span>Archives & Évolution Historique</span>
              <span aria-hidden="true">·</span>
              <span>Casablanca, Maroc</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-balance mb-4">
              Trois Éditions, Une Même Passion pour le Paysage
            </h1>
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-normal">
              Retracez l'histoire de Garden Expo Africa depuis son inauguration fondatrice à Casablanca jusqu'à
              sa consécration comme premier carrefour panafricain des espaces verts et de la ville durable.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Visual Timeline Navigator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {editions.map((edition) => {
            const isSelected = edition.id === selectedEdition.id;

            return (
              <div
                key={edition.id}
                onClick={() => setSelectedEditionId(edition.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#367A4D] ring-2 ring-[#367A4D]/20 shadow-md'
                    : 'bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-['Outfit',sans-serif] text-[#123D2B]">
                      {edition.year}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected ? 'bg-[#367A4D] text-white' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {edition.number === 1 ? '1ère Édition' : edition.number === 2 ? '2ème Édition' : '3ème Édition'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#202620] mb-2 leading-snug font-['Outfit',sans-serif]">
                    {edition.theme}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {edition.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#367A4D]">
                  <span>Voir le bilan complet</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Sheet of Selected Edition */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
          {/* Hero Banner of the Edition */}
          <div className="relative h-72 sm:h-96 overflow-hidden bg-stone-900">
            <img
              src={selectedEdition.coverImage}
              alt={selectedEdition.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#123D2B] via-transparent to-black/30" />

            <div className="absolute bottom-6 left-6 right-6 text-white max-w-4xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A5C96B] block mb-1">
                BILAN OFFICIEL · CASABLANCA, MAROC
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] leading-tight mb-2">
                {selectedEdition.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-200">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#A5C96B]" />
                  <span>{selectedEdition.dates}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A5C96B]" />
                  <span>{selectedEdition.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Key Figures Strip */}
          <div className="bg-[#123D2B] text-white p-6 sm:p-8 border-b border-stone-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#A5C96B] tabular-nums block">
                  {selectedEdition.stats.exhibitorsCount}
                </span>
                <span className="text-xs text-stone-300 font-medium">Exposants Professionnels</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#A5C96B] tabular-nums block">
                  {selectedEdition.stats.visitorsCount}
                </span>
                <span className="text-xs text-stone-300 font-medium">Visiteurs & Prescripteurs</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#A5C96B] tabular-nums block">
                  {selectedEdition.stats.countriesCount}
                </span>
                <span className="text-xs text-stone-300 font-medium">Délégations Représentées</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#A5C96B] tabular-nums block">
                  {selectedEdition.stats.surfaceSqm}
                </span>
                <span className="text-xs text-stone-300 font-medium">Surface d'Exposition Brute</span>
              </div>
            </div>
          </div>

          {/* Narrative Content & Highlights */}
          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Descriptive prose */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-bold text-[#202620] mb-3 font-['Outfit',sans-serif]">
                    Thématique & Enjeux : {selectedEdition.theme}
                  </h3>
                  {selectedEdition.description.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-sm text-stone-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Video highlight section if available */}
                {selectedEdition.videoHighlightUrl && (
                  <div className="mt-4 p-5 rounded-2xl bg-[#F5F6F3] border border-stone-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#123D2B] uppercase tracking-wider mb-3">
                      <Play className="w-4 h-4 text-[#367A4D]" />
                      <span>Film Rétrospectif de l'Édition</span>
                    </div>
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-black shadow-md">
                      <iframe
                        src={selectedEdition.videoHighlightUrl}
                        title={`Best of ${selectedEdition.title}`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Moments forts & Partenaires */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Moments Forts */}
                <div className="p-6 rounded-2xl bg-[#F5F6F3] border border-stone-200">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#202620] mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#367A4D]" />
                    <span>Moments Forts & Faits Marquants</span>
                  </h4>
                  <ul className="flex flex-col gap-3">
                    {selectedEdition.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-stone-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#367A4D] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Partners */}
                <div className="p-6 rounded-2xl bg-white border border-stone-200">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#202620] mb-4">
                    Partenaires & Parrainages
                  </h4>
                  <ul className="flex flex-col gap-2 text-xs text-stone-600">
                    {selectedEdition.keyPartners.map((kp, kpIdx) => (
                      <li key={kpIdx} className="p-2 rounded-lg bg-[#F5F6F3] border border-stone-200/60 font-medium">
                        {kp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 rounded-2xl bg-[#123D2B] text-white">
                  <h4 className="text-base font-bold font-['Outfit',sans-serif] mb-2">
                    Rejoignez la Prochaine Édition
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed mb-4">
                    Participez à la dynamique des grands projets urbains et paysagers du Maroc.
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('directory')}
                    className="w-full py-2.5 px-4 bg-[#367A4D] hover:bg-[#A5C96B] hover:text-[#123D2B] text-white font-bold text-xs rounded-lg transition-colors text-center"
                  >
                    Consulter les exposants participants
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
