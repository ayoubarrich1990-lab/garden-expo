import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { useApp } from '../context/AppContext';
import { AnimatedSection } from '../components/AnimatedSection';
import {
  ArrowRight,
  Play,
  X,
  CheckCircle2,
  Calendar,
  Users,
  Building2,
  Trees,
  Droplets,
  Cpu,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Award,
  Video,
  Globe2,
  BookOpen,
  Briefcase,
  Handshake,
  Lightbulb,
  Check,
  MapPin,
  ExternalLink,
  Sparkles,
  Plus,
  Upload,
  Trash2,
  Image as ImageIcon,
  ArrowLeftRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { heroSlides, language, exhibitors, currentUser } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  // Direction des slides (gauche à droite ou l'inverse)
  const [exhibitorSlideReverse, setExhibitorSlideReverse] = useState(false);
  const [partnerSlideReverse, setPartnerSlideReverse] = useState(true);

  const activeSlides =
    heroSlides && heroSlides.length > 0
      ? heroSlides.filter((s) => s.isActive !== false)
      : [];

  const slide = activeSlides[currentSlideIndex] || activeSlides[0] || {
    id: 'slide-fallback',
    title: 'Salon International de L’Aménagement Paysager et Urbain',
    subtitle:
      'Vue d’ensemble du grand hall d’exposition de l’OFEC Casablanca, stands d’innovations et technologies durables.',
    badge: '4ÈME ÉDITION · CASABLANCA 2027',
    videoUrl: 'https://www.youtube.com/embed/QoPzVfK6RSg?autoplay=1&mute=1&controls=0&loop=1',
    posterUrl: '/assets/aistudio/envato-labs-image-edit__11__e5a9931d.png',
    videoType: 'youtube' as const,
    location: 'OFEC Casablanca, Maroc',
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

  // 8 Secteurs d'exposition fidèles au prompt avec photographies immersives et sans icônes flottantes
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

  // 7 arguments clés pour les exposants
  const exhibitorReasons = [
    {
      title: 'Donneurs d’ordres qualifiés',
      desc: 'Rencontrez directement promoteurs immobiliers, architectes, communes, agences urbaines et ministères.',
    },
    {
      title: 'Démonstration en conditions réelles',
      desc: 'Présentez vos innovations, matériaux durables et technologies sur 4 000 m² d’exposition.',
    },
    {
      title: 'Expansion panafricaine',
      desc: 'Développez votre réseau d’affaires et pénétrez les marchés émergents d’Afrique du Nord et de l’Ouest.',
    },
    {
      title: 'Positionnement de leader',
      desc: 'Affirmez votre statut de marque pionnière dans la construction de la ville verte et résiliente.',
    },
    {
      title: 'Rendez-vous B2B ciblés',
      desc: 'Profitez d’un service de matchmaking d’affaires structuré pour maximiser votre retour sur investissement.',
    },
    {
      title: 'Visibilité médiatique puissante',
      desc: 'Bénéficiez d’une couverture presse panafricaine avant, pendant et après le salon.',
    },
    {
      title: 'Engagement RSE valorisé',
      desc: 'Valorisez vos engagements environnementaux auprès d’un public sensible à la durabilité.',
    },
  ];



  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7F5] text-[#151515]">
      {/* =========================================================================
          SECTION 3 : HERO SECTION – BANNIÈRE PRINCIPALE
          Grande photographie panoramique immersive de Casablanca, mosquée Hassan II,
          littoral et environnement urbain verdoyant.
          ========================================================================= */}
      <section className="relative min-h-[640px] lg:min-h-[740px] flex items-center justify-center overflow-hidden bg-[#004421]">
        {/* Photographie Panoramique de Fond avec transition fluide */}
        <div className="absolute inset-0 z-0">
          <img
            key={slide.posterUrl || currentSlideIndex}
            src={slide.posterUrl || '/assets/aistudio/envato-labs-image-edit__11__e5a9931d.png'}
            alt="Garden Expo Africa Casablanca - Vue officielle du salon"
            className="w-full h-full object-cover object-center filter brightness-[0.88] scale-105 transition-all duration-700 ease-out"
          />
          {/* Dégradé sombre et élégant assurant lisibilité et contraste premium */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0, 68, 33, 0.82) 0%, rgba(0, 44, 21, 0.94) 100%)',
            }}
          />
        </div>

        {/* Contenu textuel Hero — Entièrement centré avec Logo Officiel en blanc */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-white flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* 4ÈME ÉDITION Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#39B54A] animate-pulse" />
              <span>4ÈME ÉDITION — CASABLANCA 2027</span>
            </div>

            {/* LOGO OFFICIEL GARDEN EXPO AFRICA (Style blanc pur, sans fond de boîte) */}
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

            {/* Titre : Salon International de L’Aménagement Paysager et Urbain */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white font-['Outfit',sans-serif] mb-4 drop-shadow-md max-w-3xl">
              Salon International de L’Aménagement Paysager et Urbain
            </h1>

            {/* Signature officielle */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#39B54A] italic mb-5 drop-shadow-sm">
              « Des territoires plus verts pour demain »
            </p>

            {/* Texte descriptif */}
            <p className="text-sm sm:text-base text-emerald-100/95 leading-relaxed max-w-2xl mx-auto mb-9 font-light">
              Le rendez-vous international des professionnels, des décideurs et des institutionnels du paysage,
              de l'urbanisme et des villes durables. Innovations, solutions et partenariats pour des territoires
              résilients en Afrique.
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

              {/* Bouton pour déclencher la vidéo modale si souhaité */}
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

        {/* Contrôleur des Slides Vidéo & Photos */}
        {activeSlides.length > 1 && (
          <div className="absolute bottom-8 sm:bottom-12 z-20 flex items-center gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs shadow-xl">
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1))}
              className="p-1 hover:text-[#39B54A] transition-colors cursor-pointer"
              aria-label="Slide précédente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 px-1">
              {activeSlides.map((s, idx) => (
                <button
                  key={s.id || idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`transition-all rounded-full cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'w-7 h-2 bg-[#39B54A]'
                      : 'w-2 h-2 bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                  title={s.title || `Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length)}
              className="p-1 hover:text-[#39B54A] transition-colors cursor-pointer"
              aria-label="Slide suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 4 : STATISTIQUES – BILAN 2025
          Bandeau blanc avec indicateurs clairement attribués au bilan 2025
          ========================================================================= */}
      {/* =========================================================================
          SECTION 4 : STATISTIQUES – BILAN 2025
          Bandeau blanc avec indicateurs clairement attribués au bilan 2025
          ========================================================================= */}
      <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="pop-up">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-stone-200/80 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#08752D] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#39B54A]" />
                <span>BILAN DE L'ÉDITION 2025 · CHIFFRES CLÉS</span>
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                Source : Commissariat Général · OFEC Casablanca (Octobre 2025)
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
        </AnimatedSection>
      </section>

      {/* =========================================================================
          SECTION 5 : À PROPOS DE GARDEN EXPO AFRICA
          2 colonnes : Photo professionnelle à gauche, texte à droite
          ========================================================================= */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Colonne Gauche : Photographie professionnelle (Glisse depuis la gauche) */}
            <div className="lg:col-span-6">
              <AnimatedSection animation="slide-left">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 aspect-[4/3] group">
                  <img
                    src="/assets/aistudio/DSC08463_1b9046e6.JPG"
                    alt="Hall d'exposition officiel Garden Expo Africa Casablanca"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Badge bas de photo */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold bg-black/50 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#39B54A]" />
                      <span>Plateforme d'Affaires Panafricaine</span>
                    </span>
                    <span className="text-emerald-200">Casablanca · Maroc</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Colonne Droite : Présentation et Positionnement (Glisse depuis la droite) */}
            <div className="lg:col-span-6">
              <AnimatedSection animation="slide-right">
                <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#08752D] mb-3">
                  À PROPOS DU SALON
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151515] leading-tight mb-3 font-['Outfit',sans-serif]">
                  Une vision africaine. Une ambition internationale. Un avenir plus vert.
                </h2>

                <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed mt-6">
                  <p>
                    Implanté à Casablanca, au carrefour stratégique de l'Afrique et du bassin méditerranéen,{' '}
                    <strong className="text-[#004421] font-bold">Garden Expo Africa</strong> s'impose comme la plus
                    importante plateforme d'affaires et d'échanges dédiée aux professionnels du paysage, de
                    l'aménagement urbain, des espaces verts et des infrastructures durables.
                  </p>
                  <p>
                    Dans un continent en pleine expansion urbaine, où les défis climatiques et hydriques exigent des
                    réponses concrètes et innovantes, le salon réunit l'ensemble des acteurs qui imaginent, conçoivent,
                    équipent et entretiennent les territoires de demain.
                  </p>
                </div>

                {/* Citation en exergue */}
                <div className="mt-6 p-4 rounded-xl bg-emerald-50 border-l-4 border-[#08752D] text-[#004421] font-semibold italic text-sm sm:text-base">
                  « Là où les solutions d'aujourd'hui construisent les villes de demain. »
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
                    PROGRAMME DES CONFÉRENCES
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 : BEST OF – 3ÈME ÉDITION AVEC VIDÉO YOUTUBE (INDISPENSABLE)
          2 colonnes : Texte rétrospectif à gauche | Lecteur YouTube direct à droite
          ========================================================================= */}
      <section className="py-20 bg-white border-y border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Colonne Gauche : Bilan éditorial 3ème édition (Glisse depuis la gauche) */}
            <div className="lg:col-span-5">
              <AnimatedSection animation="slide-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#004421] text-xs font-extrabold uppercase tracking-wider mb-4">
                  <Award className="w-3.5 h-3.5 text-[#08752D]" />
                  <span>RETOUR SUR L'ÉDITION 2025</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151515] leading-tight mb-4 font-['Outfit',sans-serif]">
                  Un Succès Confirmé pour la Filière Verte en Afrique
                </h2>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4">
                  Du <strong>9 au 11 octobre 2025</strong> à l'<strong>OFEC Casablanca</strong>, la 3ème édition de Garden Expo Africa a rassemblé plus de <strong>100 exposants</strong> et plus de <strong>5 500 professionnels</strong> autour de la thématique stratégique <em>GREEN-SMART-SAFE</em>.
                </p>

                <div className="space-y-2.5 text-xs sm:text-sm text-stone-700 mb-6">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#08752D] shrink-0 mt-0.5" />
                    <span>3 jours d'échanges d'affaires et de réseautage B2B intensif</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#08752D] shrink-0 mt-0.5" />
                    <span>Délégations officielles venues du Maroc, de Côte d'Ivoire, du Sénégal et d'Europe</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#08752D] shrink-0 mt-0.5" />
                    <span>Démonstrations de technologies de micro-irrigation, REUT et pépinières spécialisées</span>
                  </div>
                </div>

                {/* Citation officielle */}
                <div className="p-4 rounded-xl bg-[#F5F7F5] border-l-4 border-[#39B54A] text-[#004421] font-semibold italic text-sm mb-6">
                  « Trois jours pour inspirer, connecter et faire avancer la ville durable. »
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('gallery')}
                    className="px-6 py-3 rounded-full bg-[#08752D] hover:bg-[#39B54A] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    GALERIE PHOTOS 2025
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('editions')}
                    className="px-5 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    HISTORIQUE DES ÉDITIONS
                  </button>
                </div>
              </AnimatedSection>
            </div>

            {/* Colonne Droite : Lecteur YouTube Direct 16:9 intégré (Glisse depuis la droite) */}
            <div className="lg:col-span-7">
              <AnimatedSection animation="slide-right">
                <div className="relative aspect-video w-full rounded-[14px] overflow-hidden shadow-2xl border border-stone-200 bg-black group">
                  <iframe
                    src="https://www.youtube.com/embed/QoPzVfK6RSg"
                    title="Best Of Garden Expo Africa – 3ème édition 2025"
                    className="w-full h-full border-0 rounded-[14px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-3 text-center italic">
                  Regardez la vidéo rétrospective officielle de la 3ème édition · OFEC Casablanca
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 : BANDEAU INSTITUTIONNEL
          Quatre éléments piliers de positionnement sur fond vert foncé
          ========================================================================= */}
      <section className="bg-[#004421] text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="pop-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 1 */}
              <div className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#39B54A] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#39B54A]/20 text-[#39B54A] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Le plus grand salon spécialisé en Afrique
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Unique plateforme continentale dédiée intégralement à la filière du paysage,
                  des pépinières et de la végétalisation urbaine.
                </p>
              </div>

              {/* 2 */}
              <div className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#39B54A] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#39B54A]/20 text-[#39B54A] flex items-center justify-center mb-4">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Plateforme B2B internationale
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Réseautage ciblé et rendez-vous d’affaires structurés entre donneurs d’ordres
                  publics, investisseurs privés et experts internationaux.
                </p>
              </div>

              {/* 3 */}
              <div className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#39B54A] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#39B54A]/20 text-[#39B54A] flex items-center justify-center mb-4">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Écosystème complet de solutions
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  De l’arrosage de précision (REUT) au mobilier urbain bas-carbone, en passant par
                  les espèces xérophiles et la Smart City.
                </p>
              </div>

              {/* 4 */}
              <div className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#39B54A] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#39B54A]/20 text-[#39B54A] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Carrefour panafricain de partenariats
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Des délégations officielles venues du Maroc, de la Côte d’Ivoire, du Sénégal,
                  d’Égypte et d’Europe réunies à Casablanca.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 : SECTEURS D'EXPOSITION
          Affichage de 4 secteurs clés et bouton "Tous les secteurs →"
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F5F7F5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slide-left">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#08752D] mb-2 block">
                  OFFRE EXPOSANTS & DIVERSITÉ
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151515] font-['Outfit',sans-serif]">
                  Secteurs d'Exposition
                </h2>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <p className="text-xs sm:text-sm text-stone-500 max-w-md hidden lg:block">
                  Découvrez la diversité des compétences réunies au salon, du végétal vivant aux équipements de pointe pour la ville durable.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('sectors')}
                  className="text-xs font-bold text-[#08752D] hover:text-[#004421] inline-flex items-center gap-1 cursor-pointer uppercase tracking-wider group"
                >
                  <span>Tous les secteurs</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Grille des 4 premiers secteurs d'exposition (Pop-up) */}
          <AnimatedSection animation="pop-up" delayMs={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sectors.slice(0, 4).map((sec, idx) => (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
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

            {/* Bouton bas : Tous les secteurs → */}
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => onNavigate('sectors')}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#004421] hover:bg-[#08752D] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Tous les secteurs</span>
                <span className="text-base font-normal group-hover:translate-x-1.5 transition-transform">→</span>
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 : POURQUOI EXPOSER À GARDEN EXPO AFRICA ?
          Espace Exposants avec argumentaire commercial et CTA de réservation
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-y border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Colonne Gauche : Pitch commercial & 7 arguments (Glisse depuis la gauche) */}
            <div className="lg:col-span-7">
              <AnimatedSection animation="slide-left">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#08752D] mb-3 block">
                  ESPACE EXPOSANTS · DÉVELOPPEZ VOTRE BUSINESS
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151515] leading-tight mb-4 font-['Outfit',sans-serif]">
                  Faites de votre savoir-faire une opportunité commerciale
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8">
                  Positionnez votre entreprise au cœur des plus grands chantiers d'aménagement paysager, d'urbanisme durable et d'infrastructures d'Afrique.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {exhibitorReasons.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7F5] border border-stone-200/80">
                      <div className="w-6 h-6 rounded-full bg-[#08752D]/10 text-[#08752D] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#151515] mb-0.5">{item.title}</h4>
                        <p className="text-[11px] text-stone-500 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Citation en exergue */}
                <div className="p-4 rounded-xl bg-emerald-50 border-l-4 border-[#08752D] text-[#004421] font-semibold italic text-sm mb-8">
                  « Ne soyez pas simplement présent sur le marché. Devenez un acteur qui le façonne. »
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('exhibitors')}
                    className="px-8 py-4 rounded-full bg-[#08752D] hover:bg-[#004421] text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer"
                  >
                    RÉSERVER MON STAND
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="px-6 py-4 rounded-full bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider border border-stone-300 transition-colors cursor-pointer"
                  >
                    CONTACTER LE SERVICE COMMERCIAL
                  </button>
                </div>
              </AnimatedSection>
            </div>

            {/* Colonne Droite : Visuel valorisant l'espace exposant (Glisse depuis la droite) */}
            <div className="lg:col-span-5 relative">
              <AnimatedSection animation="slide-right">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-stone-200 aspect-[4/5] relative">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80"
                    alt="Stands d'exposition professionnels Garden Expo Africa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="inline-block px-3 py-1 rounded-md bg-[#39B54A] text-white text-[11px] font-black uppercase tracking-wider mb-2">
                      ÉDITION 2027 · CASABLANCA
                    </span>
                    <h3 className="text-xl font-bold leading-snug drop-shadow-md mb-2">
                      Plus de 120 exposants attendus pour la 4ème édition
                    </h3>
                    <p className="text-xs text-stone-200">
                      Formules stands équipés, nus ou sur-mesure avec assistance logistique complète.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 : ILS NOUS ONT FAIT CONFIANCE
          Slide panoramique officiel des exposants avec défilement continu fluide
          Direction : Gauche à droite ou Droite à gauche (avec sélecteur et animation)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-y border-stone-200 overflow-hidden">
        <AnimatedSection animation="pop-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#08752D] text-xs font-extrabold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#39B54A]" />
              <span>EXPOSANTS & MARQUES DE RÉFÉRENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151515] font-['Outfit',sans-serif]">
              Ils nous ont fait confiance
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-2xl mx-auto mt-2 leading-relaxed">
              Pépiniéristes d'élite, industriels des technologies de l'eau, concepteurs d'équipements urbains et marques leaders qui exposent et font rayonner Garden Expo Africa à Casablanca.
            </p>
            {/* Contrôleur de sens du slide (gauche/droite ou inverse) */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setExhibitorSlideReverse((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-emerald-50 hover:text-[#08752D] text-stone-600 text-[11px] font-semibold border border-stone-200 transition-colors cursor-pointer shadow-2xs"
                title="Inverser le sens de défilement du slide"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-[#08752D]" />
                <span>
                  Sens du slide : {exhibitorSlideReverse ? 'Gauche ⟶ Droite' : 'Droite ⟵ Gauche'}
                </span>
                <span className="text-[10px] text-stone-400 font-normal">(Cliquer pour inverser)</span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Slide panoramique officiel de l'image exposants avec vitesse raisonnable et lisible */}
        <div className="relative w-full overflow-hidden bg-white py-6 border-y border-stone-100 group">
          {/* Dégradés latéraux subtils pour estomper les bords avec élégance */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Marquee en défilement infini avec direction commutable et pause au survol */}
          <div
            className={`flex w-max items-center ${
              exhibitorSlideReverse ? 'animate-exhibitor-marquee-reverse' : 'animate-exhibitor-marquee'
            } group-hover:[animation-play-state:paused] select-none`}
          >
            <img
              src="/assets/aistudio/EXPOSANTS_86b035fc.png"
              alt="Ils nous ont fait confiance - Exposants et marques Garden Expo Africa"
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-none object-contain px-8 shrink-0"
              draggable={false}
            />
            <img
              src="/assets/aistudio/EXPOSANTS_86b035fc.png"
              alt="Ils nous ont fait confiance - Exposants et marques Garden Expo Africa"
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-none object-contain px-8 shrink-0"
              draggable={false}
            />
          </div>

          <p className="text-[11px] text-stone-400 text-center mt-4 italic">
            Survolez la bannière pour mettre le défilement en pause
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12 : SÉMINAIRE DE LANCEMENT
          Événement préparatoire officiel en amont de la 4ème édition
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
          <AnimatedSection animation="slide-left" className="max-w-2xl">
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
          </AnimatedSection>

          <AnimatedSection animation="slide-right" className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
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
          </AnimatedSection>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13 : PARTENAIRES INSTITUTIONNELS & SCIENTIFIQUES
          Slide panoramique officiel avec défilement continu fluide
          Direction : Par défaut Gauche à droite (sens inverse du slide précédent)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200 overflow-hidden">
        <AnimatedSection animation="pop-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#08752D] mb-2 block">
              ENSEMBLE, CONSTRUISONS LES VILLES DE DEMAIN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] font-['Outfit',sans-serif]">
              Partenaires Institutionnels & Scientifiques
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-2xl mx-auto mt-2">
              Garden Expo Africa bénéficie du parrainage actif des ministères, ordres professionnels, institutions scientifiques et partenaires médias de référence.
            </p>
            {/* Contrôleur de sens du slide (gauche/droite ou inverse) */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setPartnerSlideReverse((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-emerald-50 hover:text-[#08752D] text-stone-600 text-[11px] font-semibold border border-stone-200 transition-colors cursor-pointer shadow-2xs"
                title="Inverser le sens de défilement du slide"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-[#08752D]" />
                <span>
                  Sens du slide : {partnerSlideReverse ? 'Gauche ⟶ Droite' : 'Droite ⟵ Gauche'}
                </span>
                <span className="text-[10px] text-stone-400 font-normal">(Cliquer pour inverser)</span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Slide panoramique de l'image officielle avec vitesse raisonnable et lisible */}
        <div className="relative w-full overflow-hidden bg-white py-6 border-y border-stone-100 group">
          {/* Dégradés latéraux subtils pour estomper les bords avec élégance */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Marquee en défilement infini avec direction commutable et pause au survol */}
          <div
            className={`flex w-max items-center ${
              partnerSlideReverse ? 'animate-partner-marquee-reverse' : 'animate-partner-marquee'
            } group-hover:[animation-play-state:paused] select-none`}
          >
            <img
              src="/assets/aistudio/upscalemedia-transformed__13__3492f28a.png"
              alt="Partenaires Institutionnels, Scientifiques et Médias Garden Expo Africa"
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-none object-contain px-8 shrink-0"
              draggable={false}
            />
            <img
              src="/assets/aistudio/upscalemedia-transformed__13__3492f28a.png"
              alt="Partenaires Institutionnels, Scientifiques et Médias Garden Expo Africa"
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-none object-contain px-8 shrink-0"
              draggable={false}
            />
          </div>

          <p className="text-[11px] text-stone-400 text-center mt-4 italic">
            Survolez la bannière pour mettre le défilement en pause
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 15 : PARTENARIAT ET SPONSORING
          Appel aux sponsors et partenaires avec animation pop-up vers le haut
          ========================================================================= */}
      <section className="py-20 bg-white border-t border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="pop-footer">
            <div className="rounded-3xl bg-gradient-to-r from-[#004421] to-[#08752D] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur text-[#39B54A] text-xs font-black uppercase tracking-wider mb-4 border border-white/20">
                  OPPORTUNITÉS DE SPONSORING & MÉCÉNAT
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-['Outfit',sans-serif]">
                  Devenez Partenaire de la Transformation Verte
                </h2>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6 font-light">
                  Associez l'image de votre marque ou de votre institution au premier salon professionnel du paysage et de la ville durable en Afrique. Bénéficiez d'une visibilité de premier rang auprès de milliers de décideurs.
                </p>
                <div className="p-4 rounded-xl bg-black/20 border-l-4 border-[#39B54A] text-white italic text-xs sm:text-sm mb-8">
                  « Associez votre institution ou entreprise à l'élan de durabilité qui redéfinit l'Afrique. »
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('partners')}
                    className="px-8 py-4 rounded-full bg-[#39B54A] hover:bg-white hover:text-[#004421] text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-lg cursor-pointer"
                  >
                    DEVENIR PARTENAIRE
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
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* =========================================================================
          MODAL VIDÉO HERO POP-UP (si l'utilisateur clique sur le bouton hero)
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
