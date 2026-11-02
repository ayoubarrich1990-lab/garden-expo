import React, { useState } from 'react';
import { PageId } from '../types';
import { SECTORS_DATA, PARTNERS_DATA, NEWS_ARTICLES } from '../data/expoData';
import { useApp } from '../context/AppContext';
import { LogoTicker } from '../components/LogoTicker';
import { HeroVideoSlider } from '../components/HeroVideoSlider';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Building2,
  Users,
  Play,
  QrCode,
  Layers,
  Sparkles,
  Award,
  X,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  ZoomIn,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { interviews, exhibitors } = useApp();
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [muralModalOpen, setMuralModalOpen] = useState(false);
  const [partnerFilter, setPartnerFilter] = useState<'all' | 'institutional' | 'media' | 'brands'>('all');

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#1E293B]">
      {/* 1. HERO SECTION: CINEMATIC B2B VIDEO SLIDER */}
      <HeroVideoSlider
        onNavigate={onNavigate}
        onOpenVideoLightbox={(url) => setActiveVideoModal(url)}
      />

      {/* CONTINUOUS LOGO TICKER */}
      <section className="bg-white border-b border-stone-200">
        <LogoTicker onNavigate={onNavigate} />
      </section>

      {/* BILAN CUMULÉ DES 3 ÉDITIONS */}
      <section className="bg-[#0D2818] text-white py-8 border-b border-[#202620]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            <div className="pt-2 lg:pt-0 lg:px-4">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#A5C96B] font-['Outfit',sans-serif] block">
                250
              </span>
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider block mt-1">
                Exposants
              </span>
              <span className="text-[11px] text-stone-300 block">sur les 3 éditions</span>
            </div>

            <div className="pt-4 lg:pt-0 lg:px-4">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#A5C96B] font-['Outfit',sans-serif] block">
                30 000
              </span>
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider block mt-1">
                Visiteurs Pro
              </span>
              <span className="text-[11px] text-stone-300 block">décideurs & prescripteurs</span>
            </div>

            <div className="pt-4 lg:pt-0 lg:px-4">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#A5C96B] font-['Outfit',sans-serif] block">
                95 %
              </span>
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider block mt-1">
                Exposants Satisfaits
              </span>
              <span className="text-[11px] text-stone-300 block">taux de satisfaction</span>
            </div>

            <div className="pt-4 lg:pt-0 lg:px-4">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#A5C96B] font-['Outfit',sans-serif] block">
                10 000 m²
              </span>
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider block mt-1">
                Surface Exposée
              </span>
              <span className="text-[11px] text-stone-300 block">surfaces totales déployées</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE B2B PORTALS (BENTO DESIGN - CONCISE & FUNCTIONAL) */}
      <section className="py-14 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#367A4D] uppercase tracking-wider block mb-1">
                Plateforme Digitale
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2818] font-['Outfit',sans-serif]">
                Espaces & Outils du Salon
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mt-2 sm:mt-0">
              Accédez directement aux services officiels : plan vectoriel, gestion d'exposition et badge d'accès.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Annuaire & Plan Vectoriel */}
            <div
              onClick={() => onNavigate('directory')}
              className="group cursor-pointer bg-white p-7 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#367A4D] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#367A4D] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#367A4D] uppercase tracking-wider block mb-1">
                  Catalogue Officiel
                </span>
                <h3 className="text-lg font-bold text-[#0D2818] font-['Outfit',sans-serif] mb-2">
                  Annuaire & Plan des Stands
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Recherchez les entreprises par filière et localisez instantanément chaque emplacement sur le plan vectoriel SVG (Halls A & B).
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#0D2818]">
                <span>Explorer les 140+ exposants</span>
                <ArrowRight className="w-4 h-4 text-[#367A4D] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Box 2: Espace Exposant */}
            <div
              onClick={() => onNavigate('exhibitor_portal')}
              className="group cursor-pointer bg-white p-7 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#367A4D] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#367A4D] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#367A4D] uppercase tracking-wider block mb-1">
                  Espace Entreprises
                </span>
                <h3 className="text-lg font-bold text-[#0D2818] font-['Outfit',sans-serif] mb-2">
                  Espace Exposant Dédié
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Visualisez votre stand réservé, téléchargez vos factures en MAD, gérez vos badges équipe et mettez à jour votre fiche catalogue.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#0D2818]">
                <span>Gérer mon stand</span>
                <ArrowRight className="w-4 h-4 text-[#367A4D] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Box 3: Espace Visiteur & E-Badge */}
            <div
              onClick={() => onNavigate('visitor_portal')}
              className="group cursor-pointer bg-white p-7 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#367A4D] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#367A4D] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <QrCode className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#367A4D] uppercase tracking-wider block mb-1">
                  Accès Professionnel
                </span>
                <h3 className="text-lg font-bold text-[#0D2818] font-['Outfit',sans-serif] mb-2">
                  E-Badge Coupe-File Immédiat
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Générez gratuitement votre pass officiel nominatif avec QR Code prêt à imprimer ou à scanner sur smartphone à l'entrée de l'OFEC.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#0D2818]">
                <span>Obtenir mon badge</span>
                <ArrowRight className="w-4 h-4 text-[#367A4D] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RETROSPECTIVE: BEST OF 3ÈME ÉDITION CASABLANCA (CLEAN & PUNCHY) */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#367A4D] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Bilan & Réalisations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2818] font-['Outfit',sans-serif] tracking-tight">
                Best Of de la 3ème Édition à Casablanca
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Avec 250 exposants réunis sur les 3 éditions, 30 000 visiteurs professionnels accueillis, 95 % de satisfaction exposants et plus de 10 000 m² d'exposition, Garden Expo Africa s'affirme comme le carrefour de référence du paysage et des espaces verts.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#367A4D] shrink-0" />
                  <span>Démonstrations live</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#367A4D] shrink-0" />
                  <span>Conférences & Keynotes</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#367A4D] shrink-0" />
                  <span>Délégations africaines</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#367A4D] shrink-0" />
                  <span>Réseau B2B qualifié</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveVideoModal('https://www.youtube.com/embed/QoPzVfK6RSg?autoplay=1')}
                  className="px-5 py-3 bg-[#0D2818] hover:bg-[#367A4D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Play className="w-4 h-4 text-[#A5C96B] fill-current" />
                  <span>Voir le film officiel (3 min)</span>
                </button>
                <button
                  onClick={() => onNavigate('editions')}
                  className="px-5 py-3 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-[#367A4D]" />
                  <span>Historique des éditions</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-200 aspect-video bg-black group">
                <iframe
                  src="https://www.youtube.com/embed/QoPzVfK6RSg?rel=0&modestbranding=1"
                  title="Film Rétrospectif Officiel - Garden Expo Africa 3ème Édition"
                  className="w-full h-full border-0 rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-stone-500 px-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-semibold text-stone-700">Film Rétrospectif Officiel · Garden Expo Africa 3ème Édition</span>
                </div>
                <button
                  onClick={() => setActiveVideoModal('https://www.youtube.com/embed/QoPzVfK6RSg?autoplay=1')}
                  className="text-[#367A4D] hover:text-[#0D2818] font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Agrandir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 8 SECTEURS D'ACTIVITÉ (CLEAN GRID, CRISP LABELS) */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-[#367A4D] uppercase tracking-wider block mb-1">
                Filières d'Exposition
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2818] font-['Outfit',sans-serif]">
                8 Secteurs Spécialisés
              </h2>
            </div>
            <button
              onClick={() => onNavigate('salon')}
              className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#367A4D] hover:text-[#0D2818] transition-colors"
            >
              <span>Voir la nomenclature complète</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SECTORS_DATA.map((sector) => (
              <div
                key={sector.id}
                onClick={() => onNavigate('directory')}
                className="group cursor-pointer bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md hover:border-[#367A4D] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 overflow-hidden relative bg-stone-100">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#367A4D] transition-colors leading-snug mb-1.5">
                      {sector.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {sector.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 flex items-center justify-between text-xs font-semibold text-[#367A4D]">
                  <span>Voir les exposants</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TÉMOIGNAGES B2B / RETOURS D'EXPÉRIENCE */}
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-[#367A4D] uppercase tracking-wider block mb-1">
                Témoignages Professionnels
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2818] font-['Outfit',sans-serif]">
                Ils Nous Font Confiance
              </h2>
            </div>
            <button
              onClick={() => onNavigate('directory')}
              className="mt-3 sm:mt-0 text-xs font-bold text-[#367A4D] hover:text-[#0D2818] flex items-center gap-1"
            >
              <span>Consulter l'annuaire des exposants</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {interviews.map((item) => (
              <div
                key={item.id}
                className="bg-[#F8F9FA] rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-[#367A4D] transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.logo}
                      alt={item.companyName}
                      className="w-10 h-10 rounded-lg object-contain bg-white border border-stone-200 p-1 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">{item.speakerName}</h4>
                      <p className="text-xs text-stone-500">{item.speakerTitle} · {item.companyName}</p>
                    </div>
                  </div>
                  <p className="text-xs text-stone-700 italic border-l-2 border-[#367A4D] pl-3 py-1 leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-emerald-800">Casablanca · {item.edition}</span>
                  <button
                    onClick={() => onNavigate('directory')}
                    className="text-[#367A4D] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Fiche stand</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NOS EXPOSANTS & PARTENAIRES OFFICIELS */}
      <section className="py-16 bg-[#F8F9FA] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#367A4D] uppercase tracking-wider block mb-1">
                Écosystème B2B & Partenariats
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2818] font-['Outfit',sans-serif]">
                Nos Exposants & Partenaires Officiels
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
                Institutions publiques, fédérations scientifiques, fabricants de matériel, leaders de l'irrigation et du mobilier urbain réunis lors de la 3ème édition.
              </p>
            </div>
            <button
              onClick={() => onNavigate('directory')}
              className="mt-4 md:mt-0 px-4 py-2.5 bg-[#0D2818] hover:bg-[#367A4D] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 self-start cursor-pointer shadow-xs"
            >
              <span>Consulter l'annuaire complet ({exhibitors.length} exposants)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mosaïque Officielle des Marques & Partenaires (3ème Édition) */}
          <div className="mb-10 bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="text-xs font-bold text-[#0D2818] uppercase tracking-wide">
                  Mosaïque Officielle des Marques & Partenaires · 3ème Édition
                </span>
              </div>
              <button
                onClick={() => setMuralModalOpen(true)}
                className="text-xs text-[#367A4D] hover:text-[#0D2818] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                title="Agrandir en haute résolution"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Plein écran</span>
              </button>
            </div>

            <div
              onClick={() => setMuralModalOpen(true)}
              className="relative rounded-xl overflow-hidden bg-white border border-stone-100 p-2 sm:p-4 group cursor-zoom-in hover:border-stone-300 transition-all"
            >
              <img
                src="/assets/aistudio/Capture_d_e_cran_2026-11-02_a__10.12.55_bf4c0644.png"
                alt="Nos Exposants & Partenaires Officiels - Garden Expo Africa 3ème Édition"
                className="w-full h-auto object-contain max-h-[170px] sm:max-h-[220px] mx-auto group-hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Cliquez pour agrandir les logos officiels
                </span>
              </div>
            </div>
          </div>

          {/* Filtres de catégorie */}
          <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-stone-200 pb-4">
            <span className="text-xs font-semibold text-stone-500 mr-2">Filtrer par rôle :</span>
            <button
              onClick={() => setPartnerFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                partnerFilter === 'all'
                  ? 'bg-[#0D2818] text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Tous les acteurs ({PARTNERS_DATA.length + 8})
            </button>
            <button
              onClick={() => setPartnerFilter('institutional')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                partnerFilter === 'institutional'
                  ? 'bg-[#0D2818] text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Institutionnels & Scientifiques
            </button>
            <button
              onClick={() => setPartnerFilter('brands')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                partnerFilter === 'brands'
                  ? 'bg-[#0D2818] text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Grandes Marques Exposantes
            </button>
            <button
              onClick={() => setPartnerFilter('media')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                partnerFilter === 'media'
                  ? 'bg-[#0D2818] text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Presse & Médias B2B
            </button>
          </div>

          {/* Grille dynamique selon filtre */}
          {partnerFilter === 'brands' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {exhibitors.slice(0, 12).map((exh) => (
                <div
                  key={exh.id}
                  onClick={() => onNavigate('directory')}
                  className="p-4 bg-white rounded-xl border border-stone-200 hover:border-[#367A4D] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#367A4D] uppercase tracking-wider block mb-1">
                      {exh.sector}
                    </span>
                    <h3 className="text-sm font-bold text-stone-900 leading-snug">
                      {exh.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {exh.description}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Stand {exh.standNumber}</span>
                    <span className="text-[#367A4D] font-bold flex items-center gap-0.5">
                      Fiche <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PARTNERS_DATA.filter((p) => {
                if (partnerFilter === 'institutional') return p.category === 'institutional' || p.category === 'association' || p.category === 'academic';
                if (partnerFilter === 'media') return p.category === 'media';
                return true;
              }).map((partner) => (
                <div
                  key={partner.id}
                  className="p-4 bg-white rounded-xl border border-stone-200 flex flex-col justify-between hover:border-[#367A4D] hover:shadow-xs transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-[#367A4D] uppercase tracking-wider">
                        {partner.badge}
                      </span>
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-400 hover:text-[#367A4D]"
                          title="Visiter le site officiel"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-stone-900 leading-snug">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {partner.role}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Partenaire de l'Édition Officielle</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. DERNIÈRES ACTUALITÉS (3 ARTICLES CONCIS) */}
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#367A4D] uppercase tracking-wider block mb-1">
                Veille Professionnelle
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2818] font-['Outfit',sans-serif]">
                Dernières Publications
              </h2>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="mt-3 sm:mt-0 text-xs font-bold text-[#367A4D] hover:text-[#0D2818] flex items-center gap-1"
            >
              <span>Toutes les actualités</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_ARTICLES.slice(0, 3).map((article) => (
              <article
                key={article.id}
                onClick={() => onNavigate('news')}
                className="cursor-pointer bg-[#F8F9FA] rounded-xl p-5 border border-stone-200 hover:border-[#367A4D] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
                    <span className="font-semibold text-[#367A4D]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 leading-snug mb-2 hover:text-[#367A4D] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-[#367A4D]">
                  <span>Lire l'article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO LIGHTBOX MODAL */}
      {activeVideoModal && (
        <div
          onClick={() => setActiveVideoModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-black rounded-2xl overflow-hidden w-full max-w-5xl border border-white/20 aspect-video shadow-2xl"
          >
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white bg-black/70 hover:bg-black rounded-full cursor-pointer transition-colors"
              title="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={activeVideoModal}
              title="Garden Expo Africa - Vidéo Officielle"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* LIGHTBOX MOSAÏQUE DES LOGOS EXPOSANTS & PARTENAIRES */}
      {muralModalOpen && (
        <div
          onClick={() => setMuralModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl overflow-hidden w-full max-w-6xl border border-stone-300 shadow-2xl p-4 sm:p-6 flex flex-col"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <div>
                <span className="text-xs font-bold text-[#367A4D] uppercase tracking-wider block">
                  Archive Officielle · 3ème Édition
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-['Outfit',sans-serif]">
                  Mosaïque des Marques, Industriels & Partenaires Officiels
                </h3>
              </div>
              <button
                onClick={() => setMuralModalOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full cursor-pointer transition-colors"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[75vh] flex items-center justify-center p-2 bg-stone-50 rounded-xl">
              <img
                src="/assets/aistudio/Capture_d_e_cran_2026-11-02_a__10.12.55_bf4c0644.png"
                alt="Nos Exposants & Partenaires Officiels - Haute Résolution"
                className="w-full h-auto object-contain select-none"
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
              <p>
                Rassemblement des exposants du paysage, du matériel, de l'irrigation et des institutions lors de l'édition Casablanca.
              </p>
              <button
                onClick={() => {
                  setMuralModalOpen(false);
                  onNavigate('directory');
                }}
                className="px-4 py-2 bg-[#0D2818] hover:bg-[#367A4D] text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Accéder aux fiches détaillées des exposants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
