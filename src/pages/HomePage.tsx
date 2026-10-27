import React from 'react';
import { PageId } from '../types';
import { EDITIONS_INFO, SECTORS_DATA, PARTNERS_DATA, NEWS_ARTICLES } from '../data/expoData';
import {
  ArrowRight,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Users2,
  ExternalLink,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section: Cinematic Banner */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        {/* Background Image with Dark Vignette / Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_garden_expo_1793033933452.jpg"
            alt="Aménagement paysager et végétalisation urbaine à Casablanca Maroc"
            className="w-full h-full object-cover object-center opacity-45 scale-102 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            {/* Top Unboxed Editorial Kicker */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-semibold text-emerald-400 tracking-wide uppercase mb-4">
              <span>Édition Officielle Maroc</span>
              <span aria-hidden="true">·</span>
              <span>Casablanca</span>
              <span aria-hidden="true">·</span>
              <span>Le Hub Panafricain du Paysage</span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-['Outfit',sans-serif] text-balance mb-6">
              L'Aménagement Paysager & la Ville Verte en Afrique
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal mb-8 max-w-2xl">
              Le rendez-vous B2B de référence rassemblant concepteurs, pépiniéristes,
              industriels du mobilier urbain, pionniers de l'irrigation connectée et décideurs publics
              autour de la transition écologique des territoires.
            </p>

            {/* Next edition confirmed location & notice */}
            <div className="p-4 bg-emerald-950/70 border border-emerald-800/80 rounded-lg backdrop-blur-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-emerald-200">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Casablanca, Maroc</span>
                  <span className="text-stone-300 text-xs">
                    Office des Foires et Expositions (OFEC) & Pôles Urbains
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-300 sm:border-l sm:border-emerald-800/80 sm:pl-4">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Session Officielle Maroc · Inscriptions Ouvertes</span>
              </div>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onNavigate('visitors')}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-emerald-900/30 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Demander mon badge visiteur</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('exhibitors')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-semibold text-sm transition-all backdrop-blur-xs flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Devenir exposant · Réserver un stand</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-width KPI Strip */}
        <div className="relative z-10 border-t border-stone-800 bg-stone-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {EDITIONS_INFO.kpis.map((kpi, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums text-emerald-400">
                    {kpi.value}
                  </span>
                  <span className="text-xs sm:text-sm text-stone-400 font-medium mt-1">
                    {kpi.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Institutional Overview & Strategic Mission */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wider uppercase">
                <span>Vision & Enjeux Territoriaux</span>
                <span aria-hidden="true">·</span>
                <span>Royaume du Maroc</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 font-['Outfit',sans-serif] text-balance">
                Bâtir des villes écologiques, résilientes et attractives
              </h2>

              <p className="text-base text-stone-600 leading-relaxed">
                Né à Casablanca et porté par les acteurs de premier plan de l'aménagement,
                <strong> Garden Expo Africa</strong> s'affirme comme le carrefour continental de référence.
                Alors que le Maroc mène des investissements d'envergure dans les trames paysagères urbaines,
                la préservation des ressources hydriques et la préparation des grands rendez-vous internationaux
                de 2030, le salon catalyse les échanges entre maîtres d'ouvrage publics, concepteurs et industriels.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <h3 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Résilience Hydrique</span>
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Promotion des eaux usées traitées (REUT), de la micro-irrigation intelligente et des palettes végétales xérophiles.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                  <h3 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Grands Chantiers 2030</span>
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Accompagnement des métropoles marocaines dans la création d'espaces publics inclusifs, de mobilier urbain et de parcs durables.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <span>Découvrir l'histoire et les missions du salon</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Feature Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-lg bg-stone-100">
                <img
                  src="/src/assets/images/sector_urban_landscape_1793033933666.jpg"
                  alt="Végétalisation urbaine et architecture bioclimatique au Maroc"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-5 bg-white border-t border-stone-200">
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                    Écosystème B2B Professionnel
                  </span>
                  <h3 className="text-base font-bold text-stone-900">
                    L'Alliance du Végétal et de l'Ingénierie Urbaine
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Sous l'égide de l'AAPM et des fédérations professionnelles partenaires, des démonstrations techniques et des cycles de conférences animent les 3 jours d'exposition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Secteurs d'activité (8 Sectors Grid) */}
      <section className="py-16 sm:py-24 bg-stone-100/70 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wider uppercase mb-2">
                <span>Nomenclature Officielle</span>
                <span aria-hidden="true">·</span>
                <span>8 Filières d'Exposition</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 font-['Outfit',sans-serif]">
                Une offre globale pour l'aménagement des territoires
              </h2>
            </div>
            <button
              onClick={() => onNavigate('sectors')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <span>Consulter l'ensemble des secteurs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTORS_DATA.map((sector) => (
              <div
                key={sector.id}
                onClick={() => onNavigate('sectors')}
                className="group cursor-pointer bg-white rounded-xl border border-stone-200/90 overflow-hidden hover:shadow-md hover:border-emerald-300 transition-all flex flex-col"
              >
                <div className="h-44 overflow-hidden relative bg-stone-200">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2">
                      {sector.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                      {sector.shortDesc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>Voir les produits & solutions</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Dual Target B2B Section: Pourquoi Exposer vs Pourquoi Visiter */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Box 1: Espace Exposants */}
            <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col justify-between border border-stone-800 shadow-md">
              <div>
                <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider block mb-2">
                  Industriels · Distributeurs · Pépiniéristes
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] mb-4">
                  Exposez à Garden Expo Africa Maroc
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-6">
                  Positionnez votre entreprise au cœur des plus grands appels d'offres publics et privés du Royaume.
                  Rencontrez en direct plus de 8 500 décideurs qualifiés, prescripteurs et acheteurs à Casablanca.
                </p>

                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-stone-300 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Accès direct aux directeurs d'aménagement des collectivités territoriales</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Valorisation de vos innovations matérielles et écologiques en conditions réelles</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Couverture médiatique et présence dans le catalogue officiel du salon</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('exhibitors')}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Simuler mon stand et réserver</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Box 2: Espace Visiteurs */}
            <div className="bg-emerald-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col justify-between border border-emerald-800 shadow-md">
              <div>
                <span className="text-xs uppercase font-semibold text-emerald-200 tracking-wider block mb-2">
                  Architectes · Aménageurs · Décideurs
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] mb-4">
                  Visitez le Salon Professionnel
                </h3>
                <p className="text-sm text-emerald-100 leading-relaxed mb-6">
                  Découvrez en un seul lieu toutes les nouveautés du paysage, de la ville durable et de la gestion de l'eau.
                  Accédez gratuitement au salon et aux cycles de conférences certifiés sur enregistrement.
                </p>

                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-emerald-100 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span>Rencontre avec plus de 150 exposants et marques de référence</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span>Participation libre aux tables rondes et retours d'expérience techniques</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span>Badge électronique sécurisé téléchargeable immédiatement</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('visitors')}
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-stone-100 text-emerald-950 font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Obtenir mon badge visiteur gratuit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Partenaires Institutionnels & Professionnels */}
      <section className="py-16 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Outfit',sans-serif]">
              Partenaires & Parrainages Officiels
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Garden Expo Africa bénéficie du soutien actif des ordres professionnels, fédérations et médias spécialisés au Maroc et à l'international.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNERS_DATA.map((partner) => (
              <div
                key={partner.id}
                className="p-5 bg-white rounded-lg border border-stone-200 flex flex-col justify-between hover:border-emerald-300 transition-colors"
              >
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                    {partner.badge}
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 leading-snug">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    {partner.role}
                  </p>
                </div>
                {partner.website && (
                  <div className="pt-3 mt-3 border-t border-stone-100">
                    <span className="text-[11px] text-stone-500 flex items-center gap-1">
                      <span>Ressource officielle vérifiée</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('partners')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 underline underline-offset-4"
            >
              Consulter les offres de sponsoring et partenariats
            </button>
          </div>
        </div>
      </section>

      {/* 6. Actualités du Secteur */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                Veille & Tendances
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-['Outfit',sans-serif]">
                Actualités du paysage et de la ville durable
              </h2>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="mt-3 sm:mt-0 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Toutes les publications</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEWS_ARTICLES.map((article) => (
              <article
                key={article.id}
                onClick={() => onNavigate('news')}
                className="cursor-pointer bg-stone-50 rounded-xl p-6 border border-stone-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                    <span className="font-semibold text-emerald-700">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug mb-3 hover:text-emerald-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Lire l'article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
