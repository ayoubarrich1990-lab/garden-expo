import React from 'react';
import { PageId } from '../types';
import { ArrowRight, CheckCircle2, Award, Globe2, Droplet, Sprout, Building, Users } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-stone-900 text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              <span>Histoire & Institutionnel</span>
              <span aria-hidden="true">·</span>
              <span>Casablanca, Maroc</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-balance mb-4">
              À Propos de Garden Expo Africa
            </h1>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              Le premier carrefour professionnel au Maroc et en Afrique consacré à l’aménagement paysager,
              aux technologies d’irrigation éco-responsables, au mobilier urbain et à la ville durable.
            </p>
          </div>
        </div>
      </div>

      {/* Main Narrative */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-['Outfit',sans-serif] mb-4">
                Une Genèse Ancrée dans les Défis Territoriaux du Maroc
              </h2>
              <p className="text-stone-700 leading-relaxed mb-4">
                Inauguré à Casablanca en 2022 sous l’impulsion de <strong>R2H Communication</strong> et en étroite concertation avec les professionnels de l'architecture paysagère, <strong>Garden Expo Africa</strong> (anciennement <em>Garden Expo Morocco</em>) a été fondé pour répondre à un besoin fondamental : doter le Maroc et le continent africain d'une plateforme d'affaires et d'expertise haut de gamme entièrement dédiée au paysage et à l'espace public.
              </p>
              <p className="text-stone-700 leading-relaxed mb-4">
                Face aux impératifs climatiques, à la raréfaction des ressources en eau et à l’urbanisation accélérée, le salon s'est imposé comme le point de ralliement incontournable où se rencontrent les fabricants d'équipements, les pépiniéristes producteurs, les bureaux d'études, les gestionnaires de golfs et les élus des collectivités territoriales.
              </p>
            </div>

            {/* Strategic Pillars */}
            <div className="pt-4 border-t border-stone-200">
              <h3 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif] mb-6">
                Nos 4 Piliers Stratégiques
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-2">
                    Sobriété & Innovation Hydrique
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Accompagnement du Plan National de l’Eau au Maroc : valorisation des eaux usées traitées (REUT), télégestion des réseaux d’arrosage et micro-irrigation raisonnée.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-2">
                    Végétalisation & Climat
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Promotion des palettes végétales indigènes et xérophiles, adaptées aux zones arides, pour créer des îlots de fraîcheur pérennes dans les métropoles.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <Building className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-2">
                    Urbanisme & Grands Projets 2030
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Mise en relation des maîtres d'ouvrage des grands chantiers sportifs et touristiques avec les concepteurs de mobilier urbain et d'infrastructures de loisirs.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-2">
                    Rayonnement Panafricain
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Faire de Casablanca le carrefour sud-sud d'échanges technologiques, accueillant des délégations officielles et des experts de plus de 18 pays africains.
                  </p>
                </div>
              </div>
            </div>

            {/* Scientific and Institutional Alliance */}
            <div className="pt-4 border-t border-stone-200">
              <h3 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif] mb-4">
                Une Collaboration Scientifique avec l’AAPM et l’IFLA Africa
              </h3>
              <p className="text-stone-700 leading-relaxed mb-4">
                La valeur ajoutée de Garden Expo Africa réside dans son exigence académique et professionnelle.
                Chaque édition est enrichie par des panels scientifiques conçus avec l'<strong>Association des Architectes Paysagistes du Maroc (AAPM)</strong> et la <strong>Fédération Internationale des Architectes Paysagistes (IFLA Africa)</strong>.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-sm text-emerald-950 flex flex-col gap-3">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <Award className="w-5 h-5 text-emerald-700" />
                  <span>Le Label de Qualité B2B au Maroc</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  « Garden Expo Africa s’impose comme une vitrine exemplaire des savoir-faire et des technologies adaptées à la transition écologique de nos territoires. »
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Facts */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <h3 className="text-base font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">
                Fiche d'Identité Officielle
              </h3>
              <dl className="flex flex-col gap-3 text-xs">
                <div>
                  <dt className="text-stone-500 font-medium">Événement</dt>
                  <dd className="font-bold text-stone-900 mt-0.5">Garden Expo Africa</dd>
                </div>
                <div>
                  <dt className="text-stone-500 font-medium">Pays Hôte</dt>
                  <dd className="font-bold text-stone-900 mt-0.5">Royaume du Maroc (Casablanca)</dd>
                </div>
                <div>
                  <dt className="text-stone-500 font-medium">Organisateur</dt>
                  <dd className="font-bold text-stone-900 mt-0.5">R2H Communication SARL</dd>
                </div>
                <div>
                  <dt className="text-stone-500 font-medium">Périodicité</dt>
                  <dd className="font-bold text-stone-900 mt-0.5">Biennale professionnelle</dd>
                </div>
                <div>
                  <dt className="text-stone-500 font-medium">Lieu de Référence</dt>
                  <dd className="font-bold text-stone-900 mt-0.5">Office des Foires et Expositions de Casablanca (OFEC)</dd>
                </div>
                <div>
                  <dt className="text-stone-500 font-medium">Public Cible</dt>
                  <dd className="font-bold text-stone-900 mt-0.5">Strictement Professionnel B2B</dd>
                </div>
              </dl>
            </div>

            <div className="bg-stone-900 text-white rounded-2xl p-6 border border-stone-800">
              <h3 className="text-base font-bold mb-2 font-['Outfit',sans-serif]">
                Participer à la Prochaine Session
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                Rejoignez les leaders du secteur pour construire ensemble le futur des paysages africains.
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onNavigate('visitors')}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-md transition-colors text-center"
                >
                  Demander un badge visiteur
                </button>
                <button
                  onClick={() => onNavigate('exhibitors')}
                  className="w-full py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-md transition-colors text-center"
                >
                  Réserver un stand
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
