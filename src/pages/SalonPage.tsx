import React from 'react';
import { PageId } from '../types';
import {
  Compass,
  CheckCircle2,
  Users,
  Target,
  Sparkles,
  TreePine,
  Droplets,
  Building,
  Award,
  ArrowRight,
  TrendingUp,
  Globe2,
  Calendar,
  MapPin,
} from 'lucide-react';

interface SalonPageProps {
  onNavigate: (page: PageId) => void;
}

export const SalonPage: React.FC<SalonPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F5F6F3] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-[#123D2B] text-white py-16 sm:py-24 border-b border-[#202620] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A5C96B] uppercase tracking-wider mb-3">
              <Compass className="w-4 h-4" />
              <span>Vision & Positionnement International · Maroc</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white mb-6 leading-tight">
              Le Salon Professionnel de Référence pour le Paysage et l'Aménagement Extérieur
            </h1>
            <p className="text-stone-200 text-base sm:text-lg leading-relaxed">
              Implanté au cœur de la métropole économique de Casablanca à l'OFEC, Garden Expo Africa s'impose comme
              le rendez-vous B2B incontournable dédié à l'aménagement paysager, à la ville durable, à la gestion intelligente
              de l'eau et aux technologies environnementales sur le continent africain.
            </p>
          </div>
        </div>

        {/* Subtle decorative background graphic */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <TreePine className="w-96 h-96 text-white" />
        </div>
      </div>

      {/* Quick Facts Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md">
            <span className="text-3xl font-black font-['Outfit',sans-serif] text-[#123D2B] block">10 000 m²</span>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Surface d'exposition (Halls A & B)</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md">
            <span className="text-3xl font-black font-['Outfit',sans-serif] text-[#123D2B] block">140+</span>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Exposants leaders du secteur</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md">
            <span className="text-3xl font-black font-['Outfit',sans-serif] text-[#123D2B] block">8 500+</span>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Visiteurs professionnels ciblés</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md">
            <span className="text-3xl font-black font-['Outfit',sans-serif] text-[#123D2B] block">12 Pays</span>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Délégations & acheteurs internationaux</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* SECTION 1: MISSION & STRATÉGIE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-[#367A4D] uppercase tracking-wider block mb-2">
              Un Hub Panafricain à Casablanca
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123D2B] font-['Outfit',sans-serif] mb-6">
              Catalyser la transformation verte des métropoles africaines
            </h2>
            <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
              <p>
                Face aux défis climatiques majeurs et aux impératifs de résilience hydrique, le Maroc mène une politique
                ambitieuse de développement territorial intégrant de vastes programmes de végétalisation, de parcs urbains,
                de complexes sportifs d'envergure et d'infrastructures touristiques d'excellence.
              </p>
              <p>
                Garden Expo Africa a été conçu pour réunir sous un même toit les décideurs publics, les aménageurs fonciers,
                les architectes paysagistes et les industriels les plus innovants. Le salon offre une vitrine exhaustive des
                solutions concrètes : arrosage haute précision, pépinières climato-résistantes, mobiliers durables et génie végétal.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 bg-[#123D2B] text-white rounded-xl text-xs font-bold hover:bg-[#367A4D] transition-colors shadow-xs flex items-center gap-2"
              >
                <span>Réserver un stand pour la prochaine édition</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('directory')}
                className="px-6 py-3 bg-white text-stone-700 border border-stone-300 rounded-xl text-xs font-bold hover:bg-stone-50 transition-colors"
              >
                Consulter les exposants
              </button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-lg relative aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1000&auto=format&fit=crop&q=80"
              alt="Garden Expo Africa Casablanca"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#123D2B]/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white text-xs">
                <span className="font-bold block text-sm">Halls d'Exposition OFEC · Casablanca</span>
                <span className="text-stone-300">Emplacement stratégique en front de mer face à la Mosquée Hassan II</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PROFIL DES VISITEURS (B2B QUALIFIÉ) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-[#367A4D] uppercase tracking-wider block mb-2">
              Un Visitorat 100% Professionnel
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#123D2B] font-['Outfit',sans-serif]">
              Qui Visite Garden Expo Africa ?
            </h3>
            <p className="text-stone-500 text-sm mt-2">
              Des délégations de prescripteurs et d'acheteurs rigoureusement qualifiés issus de tout le Royaume et du continent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#367A4D] flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 mb-1">Architectes & Urbanistes</h4>
              <p className="text-xs text-stone-600">
                Prescripteurs majeurs de projets résidentiels, touristiques, tertiaires et d'équipements structurants.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#367A4D] flex items-center justify-center mb-3">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 mb-1">Collectivités & Communes</h4>
              <p className="text-xs text-stone-600">
                Directeurs des espaces verts, ingénieurs municipaux et responsables des marchés publics d'aménagement.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#367A4D] flex items-center justify-center mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 mb-1">Promoteurs & Développeurs</h4>
              <p className="text-xs text-stone-600">
                Groupes immobiliers, stations balnéaires, complexes hôteliers de luxe et gestionnaires de resorts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#367A4D] flex items-center justify-center mb-3">
                <TreePine className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 mb-1">Entreprises Paysagistes</h4>
              <p className="text-xs text-stone-600">
                Entrepreneurs du paysage, applicateurs, pépiniéristes grossistes et installateurs spécialisés.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#367A4D] flex items-center justify-center mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 mb-1">Golfs & Terrains de Sport</h4>
              <p className="text-xs text-stone-600">
                Intendants de parcours de golf, directeurs de complexes sportifs et gestionnaires de gazons de compétition.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#367A4D] flex items-center justify-center mb-3">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-stone-900 mb-1">Distributeurs & Négociants</h4>
              <p className="text-xs text-stone-600">
                Grossistes en matériel d'arrosage, outillage de motoculture, mobilier outdoor et éclairage urbain.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: CYCLES DE CONFÉRENCES & SMART GREEN CITY */}
        <div className="bg-[#123D2B] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold text-[#A5C96B] uppercase tracking-wider block mb-2">
              Programme Scientifique & Professionnel
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] mb-4">
              Le Forum Garden Expo : L'Innovation Verte en Débat
            </h3>
            <p className="text-stone-200 text-sm leading-relaxed mb-6">
              Pendant 4 jours, experts internationaux, ingénieurs et chercheurs animent des tables rondes
              autour des enjeux capitaux de notre siècle : réutilisation des eaux traitées (REUT), palettes végétales
              adaptées à l'aridité, îlots de fraîcheur urbains et toitures végétalisées.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15">
                <span className="font-bold text-[#A5C96B] block mb-1">Ateliers Pratiques B2B</span>
                <span>Démonstrations en direct de pose d'arrosage automatisé et de taille spécialisée.</span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15">
                <span className="font-bold text-[#A5C96B] block mb-1">Trophées de l'Innovation Verte</span>
                <span>Récompense des meilleures initiatives paysagères et technologiques de l'année.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
