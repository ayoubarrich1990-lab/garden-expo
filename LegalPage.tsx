import React from 'react';
import { PageId } from '../types';
import { ORGANIZER_DETAILS } from '../data/expoData';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (page: PageId) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="bg-stone-900 text-white py-14 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            <span>Réglementation & Conformité</span>
            <span aria-hidden="true">·</span>
            <span>Royaume du Maroc</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            Mentions Légales & Politique de Confidentialité
          </h1>
          <p className="text-sm text-stone-300 mt-2">
            Informations juridiques officielles relatives à l'événement Garden Expo Africa et au site gardenexpo.ma.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-stone-700 text-xs sm:text-sm leading-relaxed flex flex-col gap-10">
        {/* Section 1: Mentions légales */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-3 pb-2 border-b border-stone-200 font-['Outfit',sans-serif]">
            1. Éditeur de la Plateforme & Organisateur
          </h2>
          <p className="mb-3">
            Le site officiel <strong>gardenexpo.ma</strong> et l’événement <strong>Garden Expo Africa</strong> sont conçus et organisés par la société :
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 mb-3">
            <li><strong>Raison sociale :</strong> {ORGANIZER_DETAILS.legalName}</li>
            <li><strong>Siège social :</strong> {ORGANIZER_DETAILS.address}</li>
            <li><strong>Téléphone :</strong> {ORGANIZER_DETAILS.phonePrimary} / Fixe : {ORGANIZER_DETAILS.phoneLandline}</li>
            <li><strong>Courrier électronique :</strong> {ORGANIZER_DETAILS.emailContact}</li>
            <li><strong>Directeur de la publication :</strong> Direction Générale de R2H Communication</li>
          </ul>
        </section>

        {/* Section 2: Protection des données & CNDP */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-3 pb-2 border-b border-stone-200 font-['Outfit',sans-serif] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>2. Protection des Données Personnelles (Loi n° 09-08 / CNDP)</span>
          </h2>
          <p className="mb-3">
            Conformément à la <strong>loi marocaine n° 09-08</strong> promulguée par le Dahir n° 1-09-15 du 22 safar 1430 (18 février 2009) relative à la protection des personnes physiques à l’égard du traitement des données à caractère personnel :
          </p>
          <p className="mb-3">
            Les données recueillies dans le cadre des demandes de badges visiteurs, des dossiers d'exposition et des formulaires de contact font l'objet d'un traitement informatique destiné exclusivement à la gestion administrative, à la sécurité d'accès de l'exposition et à l'envoi des communications officielles de l'événement.
          </p>
          <p className="mb-3">
            Vous bénéficiez d'un droit d'accès, d'information, de rectification et d'opposition aux données qui vous concernent. Vous pouvez exercer ce droit à tout moment en adressant un email à : <strong>{ORGANIZER_DETAILS.emailContact}</strong> ou par courrier postal au siège de R2H Communication à Casablanca.
          </p>
        </section>

        {/* Section 3: Propriété Intellectuelle */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-3 pb-2 border-b border-stone-200 font-['Outfit',sans-serif]">
            3. Propriété Intellectuelle & Droits Réservés
          </h2>
          <p className="mb-3">
            L'ensemble des éléments constituant le site gardenexpo.ma (textes, logos, arborescences, visuels, photographies, infographies, mise en page et codes) sont la propriété exclusive de R2H Communication ou font l'objet d'une autorisation légale d'utilisation.
          </p>
          <p>
            Toute reproduction totale ou partielle, représentation, adaptation ou modification sans l'autorisation préalable et expresse de l'organisateur est strictement interdite et sanctionnée par les dispositions du Code de la Propriété Industrielle et Intellectuelle au Maroc.
          </p>
        </section>

        {/* Section 4: Cookies */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-3 pb-2 border-b border-stone-200 font-['Outfit',sans-serif]">
            4. Utilisation des Témoins de Connexion (Cookies)
          </h2>
          <p className="mb-3">
            Le site utilise des cookies de session strictement nécessaires à la génération des badges électroniques et à la sécurisation des formulaires exposants. Des cookies statistiques anonymes permettent d'optimiser l'expérience de navigation. Vous pouvez paramétrer vos préférences à tout moment via le bandeau dédié.
          </p>
        </section>

        {/* Section 5: Droit Applicable */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-3 pb-2 border-b border-stone-200 font-['Outfit',sans-serif]">
            5. Droit Applicable & Juridiction Compétente
          </h2>
          <p>
            Tout litige en relation avec l'utilisation du site officiel gardenexpo.ma ou la participation à Garden Expo Africa au Maroc est soumis au droit marocain. Attribution expresse de compétence est faite aux tribunaux compétents de Casablanca.
          </p>
        </section>
      </div>
    </div>
  );
};
