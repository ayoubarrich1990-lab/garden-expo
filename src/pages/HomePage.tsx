import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { useApp } from '../context/AppContext';
import { SECTORS_DATA, PARTNERS_DATA, NEWS_ARTICLES } from '../data/expoData';
import {
  ArrowRight,
  Play,
  X,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Building2,
  Trees,
  Droplets,
  Cpu,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  ShieldCheck,
  Award,
  Video,
  Globe2,
  Compass,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { heroSlides, language } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [seminarModalOpen, setSeminarModalOpen] = useState(false);
  const [partnerFilter, setPartnerFilter] = useState<'all' | 'institutional' | 'media' | 'sponsor'>('all');

  const activeSlides = heroSlides && heroSlides.length > 0
    ? heroSlides.filter((s) => s.isActive !== false)
    : [];

  const slide = activeSlides[currentSlideIndex] || activeSlides[0] || {
    id: 'slide-fallback',
    title: 'GARDEN EXPO AFRICA 2027',
    subtitle: 'Innovations, solutions et partenariats pour des villes durables, résilientes et inclusives en Afrique.',
    badge: '4ÈME ÉDITION · CASABLANCA',
    videoUrl: 'https://www.youtube.com/embed/QoPzVfK6RSg?autoplay=1&mute=1&controls=0&loop=1',
    posterUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&auto=format&fit=crop&q=80',
    videoType: 'youtube' as const,
    location: 'Casablanca, Maroc',
    metricLabel: 'Exposants',
    metricValue: '100+',
  };

  // Hero auto-slider timer
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  // 8 Secteurs d'exposition fidèles au prompt avec visuels photographiques dédiés à chaque sens
  const sectors = [
    {
      id: 'sec-1',
      title: 'Paysagisme et urbanisme',
      description: 'Conception d’espaces publics, parcs métropolitains, trame verte et architecture du paysage.',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sec-2',
      title: 'Horticulture et pépinières',
      description: 'Palmiers, arbres d’alignement, xérophytes, graminées et pépinières spécialisées climat chaud.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sec-3',
      title: 'Irrigation et gestion de l’eau',
      description: 'Micro-irrigation de précision, réutilisation des eaux usées traitées (REUT) et télégestion.',
      image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sec-4',
      title: 'Mobilier urbain',
      description: 'Bancs bioclimatiques, corbeilles de tri, ombrières végétalisées et aménagement des boulevards.',
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sec-5',
      title: 'Aires de jeux & équipements sportifs',
      description: 'Parcours santé, sols amortissants écologiques, skateparks et structures de plein air inclusives.',
      image: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sec-6',
      title: 'Smart City & éclairage urbain',
      description: 'Luminaires solaires connectés, capteurs sol IoT, vidéosurveillance discrète et gestion intelligente.',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sec-7',
      title: 'Espaces verts & biodiversité',
      description: 'Murs végétaux dépolluants, toitures végétalisées, compostage municipal et écologie urbaine.',
      image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'sec-8',
      title: 'Infrastructures & aménagement urbain',
      description: 'Bordures drainantes, pavés poreux pour recharge de nappes et génie civil environnemental.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    },
  ];

  // 5 Partenaires institutionnels officiels
  const institutionalPartners = [
    {
      name: 'AAPM',
      fullName: 'Association des Architectes Paysagistes du Maroc',
      role: 'Partenaire Fondateur & Scientifique',
      badge: 'Institutionnel',
      logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'IFLA AFRICA',
      fullName: 'International Federation of Landscape Architects',
      role: 'Parrainage Panafricain',
      badge: 'International',
      logo: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'IMANOR',
      fullName: 'Institut Marocain de Normalisation',
      role: 'Normalisation & Qualité REUT',
      badge: 'Réglementation',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'buildingSMART Morocco',
      fullName: 'Chapitre Marocain de la Construction Digitale',
      role: 'BIM Urbain & Ville Connectée',
      badge: 'Innovation',
      logo: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=200&auto=format&fit=crop&q=80',
    },
    {
      name: 'MGBC',
      fullName: 'Morocco Green Building Council',
      role: 'Bâtiments & Quartiers Durables',
      badge: 'Éco-construction',
      logo: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=200&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7F5] text-[#151515]">
      {/* =========================================================================
          SECTION 3 : HERO BANNER
          Grande photographie panoramique immersive de Casablanca avec Mosquée Hassan II
          et dégradé sombre sur la gauche pour assurer une parfaite lisibilité
          ========================================================================= */}
      <section className="relative min-h-[620px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#004421]">
        {/* Panoramique de fond (Casablanca & Hassan II Mosque & littoral verdoyant) */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.posterUrl || 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&auto=format&fit=crop&q=85'}
            alt="Casablanca panoramique Mosquée Hassan II et aménagements paysagers"
            className="w-full h-full object-cover object-center filter brightness-[0.92] scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Dégradé sombre et élégant assurant un contraste et une lisibilité parfaite */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0, 68, 33, 0.85) 0%, rgba(0, 44, 21, 0.94) 100%)',
            }}
          />
        </div>

        {/* Contenu textuel Hero — Entièrement centré avec Logo Officiel */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-white flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* 4ÈME ÉDITION Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#39B54A] animate-pulse" />
              <span>4ÈME ÉDITION — CASABLANCA 2027</span>
            </div>

            {/* LOGO OFFICIEL GARDEN EXPO AFRICA (En style blanc pur, sans fond de boîte) */}
            <div className="flex justify-center mb-6">
              <img
                src="/assets/logo-garden-expo-official.png"
                alt="Logo officiel Garden Expo Africa"
                className="h-16 sm:h-24 md:h-28 w-auto object-contain brightness-0 invert drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    '/assets/aistudio/LOGO-GARDEN-EXPO-PNG_3a4759d4.png';
                }}
              />
            </div>

            {/* Nouveau Titre : Salon International de L’aménagement Paysager et Urbain */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-['Outfit',sans-serif] mb-4 drop-shadow-md max-w-3xl">
              Salon International de L’Aménagement Paysager et Urbain
            </h1>

            {/* Signature officielle */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#39B54A] italic mb-5 drop-shadow-sm">
              « Des territoires plus verts pour demain »
            </p>

            {/* Texte descriptif */}
            <p className="text-sm sm:text-base text-emerald-100/95 leading-relaxed max-w-2xl mx-auto mb-9 font-light">
              Innovations, solutions et partenariats pour des villes durables, résilientes et inclusives en Afrique.
              Le rendez-vous international des professionnels, des décideurs et des institutionnels du paysage,
              de l'urbanisme et de la gestion de l'eau.
            </p>

            {/* Deux boutons d'action (Vert + Blanc) + Bouton Vidéo */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                type="button"
                onClick={() => onNavigate('exhibitors')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#08752D] hover:bg-[#39B54A] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer text-center"
              >
                DEMANDER UN STAND
              </button>
              <button
                type="button"
                onClick={() => onNavigate('visitors')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-stone-100 text-[#004421] text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer text-center border border-white"
              >
                PRÉINSCRIPTION VISITEUR
              </button>

              {/* Bouton pour déclencher la vidéo du slide */}
              {slide.videoUrl && (
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(slide.videoUrl)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                  title="Regarder la vidéo officielle"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>VOIR LA VIDÉO</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contrôleur des Slides Vidéo (si plusieurs configurées) */}
        {activeSlides.length > 1 && (
          <div className="absolute bottom-16 right-6 lg:right-12 z-20 hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs">
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1))}
              className="p-1 hover:text-[#39B54A] transition-colors"
              aria-label="Slide précédente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold px-1">
              {currentSlideIndex + 1} / {activeSlides.length}
            </span>
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length)}
              className="p-1 hover:text-[#39B54A] transition-colors"
              aria-label="Slide suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 4 : CHIFFRES CLÉS
          Bande blanche flottante légèrement superposée au bas du hero
          Attribuée de manière transparente au bilan de l'édition 2025
          ========================================================================= */}
      <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-stone-200/80 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#08752D] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#39B54A]" />
              <span>Chiffres Clés · Bilan Consolidé de l'Édition 2025</span>
            </span>
            <span className="text-[11px] text-stone-400 font-medium">
              Source officielle · Commissariat Général Casablanca
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-100">
            {/* 1. Exposants */}
            <div className="pt-2 md:pt-0 md:px-3">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#004421] tracking-tight block">
                100+
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider block mt-1">
                Exposants
              </span>
              <span className="text-[11px] text-stone-500 block">leaders & pépinières</span>
            </div>

            {/* 2. Visiteurs */}
            <div className="pt-4 md:pt-0 md:px-3">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#004421] tracking-tight block">
                5 500+
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider block mt-1">
                Visiteurs Professionnels
              </span>
              <span className="text-[11px] text-stone-500 block">décideurs & prescripteurs</span>
            </div>

            {/* 3. Pays */}
            <div className="pt-4 md:pt-0 md:px-3">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#004421] tracking-tight block">
                10+
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider block mt-1">
                Pays Représentés
              </span>
              <span className="text-[11px] text-stone-500 block">délégations africaines & UE</span>
            </div>

            {/* 4. Conférences */}
            <div className="pt-4 md:pt-0 md:px-3">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#004421] tracking-tight block">
                40+
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider block mt-1">
                Conférences & Ateliers
              </span>
              <span className="text-[11px] text-stone-500 block">sessions scientifiques</span>
            </div>

            {/* 5. Surface */}
            <div className="pt-4 md:pt-0 md:px-3 col-span-2 md:col-span-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#004421] tracking-tight block">
                4 000 m²
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider block mt-1">
                Surface d'Exposition
              </span>
              <span className="text-[11px] text-stone-500 block">surface brute déployée</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 : À PROPOS DU SALON
          Deux colonnes : photo + bouton vidéo à gauche | texte institutionnel à droite
          ========================================================================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Colonne Gauche : Photographie d'un salon pro avec espaces verts + bouton vidéo */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 aspect-[4/3] group">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80"
                  alt="Ambiance salon professionnel Garden Expo Africa Casablanca"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Bouton vidéo fonctionnel au centre */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveVideoModal(
                      'https://www.youtube.com/embed/QoPzVfK6RSg?autoplay=1&mute=1&controls=0&loop=1'
                    )
                  }
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#08752D]/90 hover:bg-[#39B54A] text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110 cursor-pointer border-4 border-white/60"
                  title="Lancer la vidéo de présentation"
                  aria-label="Lancer la vidéo"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </button>

                {/* Badge bas de photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20">
                  <span>Immersion au cœur des stands & innovations</span>
                  <span className="text-[#39B54A]">Casablanca · OFEC</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Présentation et Positionnement */}
            <div className="lg:col-span-6">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#08752D] mb-3">
                PRÉSENTATION DU SALON
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151515] leading-tight mb-6 font-['Outfit',sans-serif]">
                LE RENDEZ-VOUS DE RÉFÉRENCE DES VILLES VERTES EN AFRIQUE.
              </h2>

              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Implanté à Casablanca, métropole motrice de l’Afrique du Nord,
                  <strong> Garden Expo Africa</strong> est la plateforme B2B internationale
                  qui connecte l’ensemble de la chaîne de valeur de l’aménagement paysager,
                  des espaces publics et de l'urbanisme durable.
                </p>
                <p>
                  Face aux défis majeurs du stress hydrique et de l'adaptation climatique,
                  le salon réunit architectes-paysagistes, pépiniéristes d’élite, industriels
                  de la micro-irrigation, collectivités locales et promoteurs pour faire émerger
                  des solutions concrètes et éprouvées.
                </p>
                <p className="text-xs sm:text-sm text-stone-500 font-medium">
                  Un carrefour stratégique d’affaires, de transfert technologique et de réflexion
                  institutionnelle pour concevoir les territoires résilients de demain.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('salon')}
                  className="px-7 py-3.5 rounded-full bg-[#004421] hover:bg-[#08752D] text-white text-xs font-bold uppercase tracking-wider transition-colors duration-200 shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>DÉCOUVRIR LE SALON</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('conferences')}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider transition-colors duration-200 border border-stone-300 cursor-pointer"
                >
                  CYCLE DE CONFÉRENCES
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 : BANDEAU INSTITUTIONNEL
          Quatre éléments piliers de positionnement
          ========================================================================= */}
      <section className="bg-white border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1 */}
            <div className="flex flex-col p-6 rounded-2xl bg-[#F5F7F5] border border-stone-200 hover:border-[#08752D] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#004421] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#151515] mb-2">
                Le plus grand salon spécialisé en Afrique
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Unique plateforme continentale dédiée intégralement à la filière du paysage,
                des pépinières et de la végétalisation urbaine.
              </p>
            </div>

            {/* 2 */}
            <div className="flex flex-col p-6 rounded-2xl bg-[#F5F7F5] border border-stone-200 hover:border-[#08752D] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#004421] flex items-center justify-center mb-4">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#151515] mb-2">
                Une plateforme B2B internationale
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Réseautage ciblé et rendez-vous d’affaires structurés entre donneurs d’ordres
                publics, investisseurs privés et experts internationaux.
              </p>
            </div>

            {/* 3 */}
            <div className="flex flex-col p-6 rounded-2xl bg-[#F5F7F5] border border-stone-200 hover:border-[#08752D] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#004421] flex items-center justify-center mb-4">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#151515] mb-2">
                Un écosystème complet de solutions
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                De l’arrosage de précision (REUT) au mobilier urbain bas-carbone, en passant par
                les espèces xérophiles et la Smart City.
              </p>
            </div>

            {/* 4 */}
            <div className="flex flex-col p-6 rounded-2xl bg-[#F5F7F5] border border-stone-200 hover:border-[#08752D] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#004421] flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#151515] mb-2">
                Carrefour panafricain de partenariats
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Des délégations officielles venues du Maroc, de la Côte d’Ivoire, du Sénégal,
                d’Égypte et d’Europe réunies à Casablanca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 : SECTEURS D'EXPOSITION
          Cartes photographiques des 8 secteurs avec carrousel / grille et animations au survol
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F5F7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#08752D] mb-2 block">
                OFFRE EXPOSANTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151515] font-['Outfit',sans-serif]">
                8 Secteurs d'Exposition Clés
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mt-2 md:mt-0">
              Découvrez la diversité des compétences réunies au salon, du végétal vivant aux équipements de pointe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sec, idx) => (
                <div
                  key={sec.id}
                  onClick={() => onNavigate('sectors')}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={sec.image}
                      alt={sec.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#004421]/90 backdrop-blur text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                      0{idx + 1}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-sm font-bold leading-tight drop-shadow-md">
                        {sec.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {sec.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#08752D] group-hover:text-[#004421] transition-colors">
                      <span>Explorer les exposants</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 : SÉMINAIRE DE LANCEMENT
          Bannière verte avec photographie de conférence internationale
          Décembre 2026 – Casablanca · Date et lieu à confirmer
          ========================================================================= */}
      <section className="relative bg-[#004421] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background photo subtile */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&auto=format&fit=crop&q=80"
            alt="Séminaire de lancement Garden Expo Africa 2027"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[#39B54A] text-xs font-extrabold uppercase tracking-wider mb-4">
              <span>ÉVÉNEMENT PRÉPARATOIRE OFFICIEL</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 font-['Outfit',sans-serif]">
              Séminaire de Lancement Garden Expo Africa 2027
            </h2>

            <div className="flex items-center gap-2 text-emerald-200 text-sm font-semibold mb-4">
              <Calendar className="w-4 h-4 text-[#39B54A]" />
              <span>Décembre 2026 – Casablanca | Date et lieu à confirmer</span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
              Rencontre institutionnelle et médiatique en amont de la 4ème édition réunissant les ministères de tutelle,
              les architectes paysagistes et les présidents de fédérations pour dévoiler les axes majeurs du salon.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('conferences')}
              className="px-8 py-4 rounded-full bg-[#39B54A] hover:bg-[#08752D] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer"
            >
              EN SAVOIR PLUS
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
            >
              CONTACTER LE COMMISSARIAT
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 : PARTENAIRES INSTITUTIONNELS
          AAPM, IFLA AFRICA, IMANOR, buildingSMART Morocco, MGBC
          ========================================================================= */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#08752D] mb-2 block">
              COLLABORATIONS STRATÉGIQUES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] font-['Outfit',sans-serif]">
              Partenaires Institutionnels & Scientifiques
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Garden Expo Africa bénéficie du soutien actif des ordres professionnels et organismes normatifs de référence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-stretch">
            {institutionalPartners.map((partner) => (
              <div
                key={partner.name}
                onClick={() => onNavigate('partners')}
                className="group p-6 rounded-2xl bg-[#F5F7F5] border border-stone-200 hover:border-[#08752D] hover:shadow-md transition-all flex flex-col items-center text-center justify-between cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl bg-white p-2 shadow-xs border border-stone-200/80 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-sm font-black text-[#004421] tracking-tighter">
                    {partner.name}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#151515] mb-1">
                    {partner.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 leading-snug line-clamp-2">
                    {partner.fullName}
                  </p>
                </div>

                <span className="mt-4 inline-block text-[10px] font-semibold uppercase tracking-wider text-[#08752D] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {partner.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 : ACTUALITÉS DU SECTEUR
          Section moderne avec articles récents, photos, dates et résumés
          ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#F5F7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#08752D] mb-2 block">
                VEILLE & ACTUALITÉS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151515] font-['Outfit',sans-serif]">
                Dernières Nouvelles du Secteur
              </h2>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="mt-4 sm:mt-0 text-xs font-bold text-[#08752D] hover:text-[#004421] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <span>TOUTES LES ACTUALITÉS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_ARTICLES.slice(0, 3).map((article) => (
              <div
                key={article.id}
                onClick={() => onNavigate('news')}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <span className="absolute top-3 left-3 bg-[#004421] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#151515] leading-snug mb-3 group-hover:text-[#08752D] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <span className="text-xs font-bold text-[#08752D] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Lire l'article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          LIGHTBOX / MODAL VIDÉO
          Lecteur vidéo pop-up haute qualité
          ========================================================================= */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-stone-900 text-white border-b border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span>Vidéo Officielle · Garden Expo Africa Casablanca</span>
              </span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full">
              <iframe
                src={activeVideoModal}
                title="Vidéo officielle Garden Expo Africa"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
