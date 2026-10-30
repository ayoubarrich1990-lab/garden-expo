import React, { useState } from 'react';
import { PageId } from '../types';
import { SECTORS_DATA, PARTNERS_DATA, NEWS_ARTICLES } from '../data/expoData';
import { useApp } from '../context/AppContext';
import { LogoTicker } from '../components/LogoTicker';
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
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { interviews } = useApp();
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#1E293B]">
      {/* 1. HERO SECTION: ULTRA-MODERN ARCHITECTURAL & B2B EXHIBITION HEADER */}
      <section className="relative bg-[#0D2818] text-white overflow-hidden border-b border-emerald-950/60">
        {/* Subtle decorative grid background & lighting accent */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&auto=format&fit=crop&q=80"
            alt="Aménagement paysager contemporain et végétalisation urbaine au Maroc"
            className="w-full h-full object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D2818] via-[#0D2818]/90 to-[#0D2818]/60" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#A5C96B]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Direct Value Proposition & Action CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Event Badge Bar */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-[#A5C96B] animate-pulse" />
                <span>Casablanca · 4ème Édition Officielle</span>
                <span className="text-emerald-500">·</span>
                <span>22 – 25 Octobre 2026</span>
              </div>

              {/* Main Punchy Title (No Fluff) */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] font-['Outfit',sans-serif]">
                Le Salon B2B du Paysage & de la Ville Verte
              </h1>

              {/* Crisp Subtitle */}
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-normal">
                La plateforme d'affaires réunissant pépiniéristes, concepteurs, fabricants de mobilier urbain,
                experts en irrigation durable et donneurs d'ordres institutionnels au Maroc et en Afrique.
              </p>

              {/* Venue & Date Key Card */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#367A4D] flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">OFEC Casablanca, Maroc</span>
                    <span className="text-xs text-stone-400">
                      Office des Foires et Expositions (Face Mosquée Hassan II)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#A5C96B] font-semibold sm:border-l sm:border-white/15 sm:pl-4 shrink-0">
                  <Calendar className="w-4 h-4 shrink-0 text-[#A5C96B]" />
                  <span>4 Jours d'Opportunités B2B</span>
                </div>
              </div>

              {/* Direct CTAs: E-Badge + Stand Booking */}
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

            {/* Right Column: Sleek Exhibition Quick Metrics Bento */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Surface</span>
                <span className="text-3xl sm:text-4xl font-black text-[#A5C96B] font-['Outfit',sans-serif] my-2">
                  10 000 m²
                </span>
                <span className="text-xs text-stone-300">Halls d'exposition OFEC</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Exposants</span>
                <span className="text-3xl sm:text-4xl font-black text-[#A5C96B] font-['Outfit',sans-serif] my-2">
                  140+
                </span>
                <span className="text-xs text-stone-300">Fabricants & Pépinières</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Visiteurs</span>
                <span className="text-3xl sm:text-4xl font-black text-[#A5C96B] font-['Outfit',sans-serif] my-2">
                  8 500+
                </span>
                <span className="text-xs text-stone-300">Professionnels ciblés</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">International</span>
                <span className="text-3xl sm:text-4xl font-black text-[#A5C96B] font-['Outfit',sans-serif] my-2">
                  12 Pays
                </span>
                <span className="text-xs text-stone-300">Délégations & Acheteurs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS LOGO TICKER */}
      <section className="bg-white border-b border-stone-200">
        <LogoTicker onNavigate={onNavigate} />
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
                Plus de 130 stands d'excellence, des démonstrations d'équipements en direct et des rencontres B2B déterminantes entre acheteurs publics, promoteurs et paysagistes.
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
                  onClick={() => setActiveVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ')}
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
              <div
                onClick={() => setActiveVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ')}
                className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 group cursor-pointer aspect-video bg-stone-900"
              >
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80"
                  alt="Rétrospective Garden Expo Africa Casablanca"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2818]/90 via-black/20 to-transparent flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#0D2818]/90 border-2 border-[#A5C96B] text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#367A4D] transition-all">
                    <Play className="w-7 h-7 text-[#A5C96B] fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between pointer-events-none">
                  <div>
                    <span className="font-bold block text-sm">Garden Expo Africa · Édition 3 (Casablanca)</span>
                    <span className="text-stone-300">Moments forts & témoignages exposants</span>
                  </div>
                  <span className="bg-black/70 px-2 py-1 rounded text-[11px] font-mono font-bold">03:45</span>
                </div>
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

      {/* 6. PARTENAIRES OFFICIELS */}
      <section className="py-14 bg-[#F8F9FA] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D2818] font-['Outfit',sans-serif]">
              Partenaires & Parrainages Officiels
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Avec l'appui institutionnel des fédérations professionnelles et acteurs de référence au Maroc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNERS_DATA.map((partner) => (
              <div
                key={partner.id}
                className="p-4 bg-white rounded-xl border border-stone-200 flex flex-col justify-between hover:border-[#367A4D] transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#367A4D] uppercase tracking-wider block mb-1">
                    {partner.badge}
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 leading-snug">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {partner.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
            className="relative bg-stone-900 rounded-2xl overflow-hidden w-full max-w-4xl border border-white/20 aspect-video shadow-2xl"
          >
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-black/50 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-full flex items-center justify-center text-center p-8 text-white">
              <div className="max-w-md space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0D2818] border-2 border-[#A5C96B] flex items-center justify-center mx-auto text-[#A5C96B]">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h3 className="text-xl font-bold font-['Outfit',sans-serif]">
                  Film Rétrospectif Officiel · Garden Expo Africa 3ème Édition
                </h3>
                <p className="text-xs text-stone-300">
                  Enregistré au sein des halls d'exposition de l'Office des Foires et Expositions de Casablanca (OFEC).
                </p>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="px-6 py-2.5 bg-[#367A4D] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#367A4D]/80 cursor-pointer"
                >
                  Fermer le lecteur vidéo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
