import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Exhibitor, PageId } from '../types';
import { InteractiveHallPlan } from '../components/InteractiveHallPlan';
import {
  Search,
  Building2,
  MapPin,
  ExternalLink,
  Phone,
  Mail,
  Bookmark,
  CheckCircle2,
  Layers,
  ArrowRight,
  X,
  Eye,
} from 'lucide-react';

interface DirectoryPageProps {
  onNavigate: (page: PageId) => void;
}

export const DirectoryPage: React.FC<DirectoryPageProps> = ({ onNavigate }) => {
  const { exhibitors, visitorAccount, toggleFavoriteExhibitor } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedEdition, setSelectedEdition] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'plan'>('grid');
  const [selectedExhibitorModal, setSelectedExhibitorModal] = useState<Exhibitor | null>(null);
  const [focusedStandId, setFocusedStandId] = useState<string | undefined>(undefined);

  // Extract unique sectors & editions
  const sectors = Array.from(new Set(exhibitors.map((e) => e.sector)));
  const editions = Array.from(new Set(exhibitors.map((e) => e.edition)));

  // Filter logic
  const filteredExhibitors = exhibitors.filter((exh) => {
    const matchesSearch =
      exh.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exh.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exh.featuredProducts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      exh.standNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSector = selectedSector === 'all' || exh.sector === selectedSector;
    const matchesEdition = selectedEdition === 'all' || exh.edition === selectedEdition;

    return matchesSearch && matchesSector && matchesEdition;
  });

  const handleOpenPlanForStand = (exh: Exhibitor) => {
    setSelectedExhibitorModal(null);
    setFocusedStandId(exh.standId);
    setViewMode('plan');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F5F6F3] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#123D2B] text-white py-16 sm:py-20 border-b border-[#202620]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A5C96B] tracking-wider uppercase mb-3">
              <span>Plateforme B2B · Annuaire Officiel des Exposants</span>
              <span aria-hidden="true">·</span>
              <span>Casablanca</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-balance mb-4">
              Annuaire Interactif des Exposants
            </h1>
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-normal">
              Recherchez parmi les fabricants, industriels, distributeurs et pépiniéristes de référence.
              Consultez leurs fiches détaillées, découvrez leurs innovations et localisez leurs stands sur le plan.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls Bar: Search, Filters & View Mode */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs mb-8 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom d'entreprise, produit, stand (ex: Atlas, REUT, A-01)..."
                className="w-full pl-11 pr-4 py-3 bg-[#F5F6F3] border border-stone-200 rounded-xl text-[#202620] placeholder-stone-400 text-sm focus:outline-none focus:border-[#367A4D] focus:bg-white"
              />
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center p-1 bg-[#F5F6F3] rounded-xl border border-stone-200 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#123D2B] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#367A4D]" />
                <span>Grille des Entreprises ({filteredExhibitors.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('plan')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                  viewMode === 'plan'
                    ? 'bg-white text-[#123D2B] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#367A4D]" />
                <span>Plan Vectoriel du Salon</span>
              </button>
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-stone-100 text-xs">
            <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">
              Filtrer par :
            </span>

            {/* Sector select */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-1.5 bg-[#F5F6F3] border border-stone-200 rounded-lg text-[#202620] font-medium focus:outline-none focus:border-[#367A4D]"
            >
              <option value="all">Tous les secteurs d'activité</option>
              {sectors.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>

            {/* Edition select */}
            <select
              value={selectedEdition}
              onChange={(e) => setSelectedEdition(e.target.value)}
              className="px-3 py-1.5 bg-[#F5F6F3] border border-stone-200 rounded-lg text-[#202620] font-medium focus:outline-none focus:border-[#367A4D]"
            >
              <option value="all">Toutes les éditions</option>
              {editions.map((ed) => (
                <option key={ed} value={ed}>
                  {ed}
                </option>
              ))}
            </select>

            {(searchQuery || selectedSector !== 'all' || selectedEdition !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSector('all');
                  setSelectedEdition('all');
                }}
                className="text-[11px] font-bold text-red-600 hover:underline ml-auto"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>

        {/* Content Render: Either Interactive Hall Plan or Directory Grid */}
        {viewMode === 'plan' ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#202620] font-['Outfit',sans-serif]">
                Plan d'Exposition — Halls A & B (OFEC Casablanca)
              </h2>
              <span className="text-xs text-stone-500">
                Cliquez sur n'importe quel stand pour voir l'exposant associé
              </span>
            </div>
            <InteractiveHallPlan
              highlightStandId={focusedStandId}
              onSelectStand={(stand, exh) => {
                if (exh) setSelectedExhibitorModal(exh);
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExhibitors.map((exhibitor) => {
              const isFav = visitorAccount?.favoriteExhibitorIds.includes(exhibitor.id);

              return (
                <div
                  key={exhibitor.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-[#367A4D]/50 transition-all duration-200 group"
                >
                  <div>
                    {/* Top Row: Stand Badge & Favorite Button */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#123D2B] text-white font-mono font-bold text-xs rounded-md shadow-2xs">
                          Stand {exhibitor.standNumber}
                        </span>
                        <span className="text-[11px] font-semibold text-[#367A4D] bg-emerald-50 px-2 py-0.5 rounded">
                          {exhibitor.hall} · {exhibitor.surface} m²
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFavoriteExhibitor(exhibitor.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isFav
                            ? 'bg-amber-50 border-amber-300 text-amber-600'
                            : 'border-stone-200 text-stone-400 hover:text-stone-700 hover:bg-stone-50'
                        }`}
                        title={isFav ? 'Retirer de mes favoris' : 'Ajouter à mes favoris'}
                        aria-label="Ajouter aux favoris"
                      >
                        <Bookmark className={`w-4 h-4 ${isFav ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Company Name & Sector */}
                    <h3 className="text-base font-bold text-[#202620] group-hover:text-[#367A4D] transition-colors leading-snug mb-1 font-['Outfit',sans-serif]">
                      {exhibitor.name}
                    </h3>
                    <div className="text-xs font-semibold text-stone-500 mb-3 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{exhibitor.city}, {exhibitor.country}</span>
                      <span>·</span>
                      <span className="text-[#367A4D]">{exhibitor.sector}</span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                      {exhibitor.description}
                    </p>

                    {/* Featured Products */}
                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                        Produits & Solutions exposés :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {exhibitor.featuredProducts.slice(0, 3).map((prod, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[11px] bg-[#F5F6F3] text-stone-700 px-2 py-0.5 rounded border border-stone-200/60"
                          >
                            {prod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedExhibitorModal(exhibitor)}
                      className="text-xs font-bold text-[#123D2B] hover:text-[#367A4D] flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Fiche détaillée</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenPlanForStand(exhibitor)}
                      className="px-3 py-1.5 bg-[#F5F6F3] hover:bg-emerald-50 text-[#367A4D] hover:text-[#123D2B] rounded-lg text-xs font-bold transition-colors border border-stone-200/80 flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Situer sur plan</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredExhibitors.length === 0 && viewMode === 'grid' && (
          <div className="p-12 bg-white rounded-2xl border border-stone-200 text-center">
            <Building2 className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-900 mb-1">
              Aucun exposant trouvé pour « {searchQuery} »
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Essayez un autre mot-clé ou réinitialisez les filtres par secteur.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedSector('all');
                setSelectedEdition('all');
              }}
              className="px-4 py-2 bg-[#123D2B] text-white rounded-lg text-xs font-bold"
            >
              Afficher tous les exposants
            </button>
          </div>
        )}
      </div>

      {/* Detailed Exhibitor Modal */}
      {selectedExhibitorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#202620]/70 backdrop-blur-xs"
            onClick={() => setSelectedExhibitorModal(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 z-10 shadow-2xl border border-stone-200 my-8">
            <div className="flex items-start justify-between pb-4 border-b border-stone-200 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#367A4D] block mb-1">
                  FICHE OFFICIELLE EXPOSANT · {selectedExhibitorModal.edition}
                </span>
                <h2 className="text-2xl font-bold text-[#202620] font-['Outfit',sans-serif]">
                  {selectedExhibitorModal.name}
                </h2>
                <div className="text-xs text-stone-500 mt-1">
                  {selectedExhibitorModal.sector} · {selectedExhibitorModal.category}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExhibitorModal(null)}
                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stand & Space Information */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#F5F6F3] rounded-xl border border-stone-200 mb-6 text-xs">
              <div>
                <span className="text-stone-500 block text-[11px]">Numéro du Stand</span>
                <span className="font-bold text-[#123D2B] text-sm font-mono">
                  {selectedExhibitorModal.standNumber}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Hall d'Exposition</span>
                <span className="font-bold text-stone-900">{selectedExhibitorModal.hall}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Superficie Réservée</span>
                <span className="font-bold text-[#367A4D] font-mono">{selectedExhibitorModal.surface} m²</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#202620] mb-2">
                Présentation de l'Entreprise
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {selectedExhibitorModal.description}
              </p>
            </div>

            {/* Products */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#202620] mb-2">
                Produits & Innovations Exposés
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedExhibitorModal.featuredProducts.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#367A4D] shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Authorized Contact Coordinates */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#202620] mb-3">
                Coordonnées Professionnelles
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#367A4D] shrink-0" />
                  <span>{selectedExhibitorModal.city}, {selectedExhibitorModal.country}</span>
                </div>
                {selectedExhibitorModal.website && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-[#367A4D] shrink-0" />
                    <a
                      href={selectedExhibitorModal.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#367A4D] hover:underline truncate font-medium"
                    >
                      {selectedExhibitorModal.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#367A4D] shrink-0" />
                  <a href={`mailto:${selectedExhibitorModal.email}`} className="hover:underline">
                    {selectedExhibitorModal.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#367A4D] shrink-0" />
                  <a href={`tel:${selectedExhibitorModal.phone.replace(/\s+/g, '')}`} className="hover:underline">
                    {selectedExhibitorModal.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => handleOpenPlanForStand(selectedExhibitorModal)}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#367A4D] hover:bg-[#123D2B] text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MapPin className="w-4 h-4" />
                <span>Localiser ce stand sur le plan</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleFavoriteExhibitor(selectedExhibitorModal.id);
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-amber-500" />
                <span>
                  {visitorAccount?.favoriteExhibitorIds.includes(selectedExhibitorModal.id)
                    ? 'Déjà dans mes favoris'
                    : 'Ajouter à ma liste de visites'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
