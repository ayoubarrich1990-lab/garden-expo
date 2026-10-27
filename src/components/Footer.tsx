import React, { useState } from 'react';
import { PageId } from '../types';
import { GardenExpoLogo } from './GardenExpoLogo';
import { ORGANIZER_DETAILS } from '../data/expoData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { validateEmail } from '../utils/expoLogic';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setNewsletterError('Veuillez saisir une adresse email professionnelle valide.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubmitted(true);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Top Banner: Regional & Institutional Identity */}
      <div className="bg-emerald-950/60 border-b border-emerald-900/50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-emerald-200">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold tracking-wide text-white">Édition Officielle Maroc · Casablanca</span>
            <span className="text-emerald-400/80">· Salon International du Paysage, de l’Irrigation et de la Ville Verte</span>
          </div>
          <div className="text-stone-400 flex items-center gap-3">
            <span>Organisé par R2H Communication</span>
            <span>·</span>
            <span>En partenariat avec l’AAPM & IFLA Africa</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Presentation */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <GardenExpoLogo variant="white" />
            <p className="text-sm text-stone-400 leading-relaxed pr-4 mt-2">
              Garden Expo Africa est la référence B2B au Maroc dédiée à l’aménagement paysager,
              aux technologies d’irrigation éco-responsables, au mobilier urbain et aux solutions durables
              pour les villes de demain.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 mt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Événement professionnel certifié · Réglementation CNDP Maroc</span>
            </div>
          </div>

          {/* Col 2: Navigation rapide */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  À Propos du Salon
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('sectors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Secteurs d'Activité
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('exhibitors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Espace Exposants
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('visitors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Espace Visiteurs (Badge)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('partners'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Partenaires & Sponsoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Actualités & Conférences
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordonnées officielles Casablanca */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact Officiel
            </h4>
            <div className="flex flex-col gap-3 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{ORGANIZER_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${ORGANIZER_DETAILS.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-white">
                  {ORGANIZER_DETAILS.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-400 pl-6.5">
                <span>Fixe : {ORGANIZER_DETAILS.phoneLandline}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${ORGANIZER_DETAILS.emailContact}`} className="hover:text-white">
                  {ORGANIZER_DETAILS.emailContact}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-400">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{ORGANIZER_DETAILS.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Lettre d'information B2B */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Veille Professionnelle
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Recevez les annonces officielles, le guide exposant et les dates des cycles de conférences à Casablanca.
            </p>
            {newsletterSubmitted ? (
              <div className="p-3 bg-emerald-950/70 border border-emerald-800 rounded-md text-xs text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Merci. Vous êtes inscrit à la lettre d’information officielle.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@entreprise.ma"
                  className="px-3 py-2 text-xs bg-stone-800 border border-stone-700 rounded text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                  required
                />
                {newsletterError && <span className="text-[11px] text-red-400">{newsletterError}</span>}
                <button
                  type="submit"
                  className="py-2 px-3 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-600 rounded transition-colors text-center"
                >
                  S'abonner aux actualités
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Garden Expo Africa — R2H Communication SARL. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => { onNavigate('legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-stone-300 transition-colors"
            >
              Mentions Légales
            </button>
            <span>·</span>
            <button
              onClick={() => { onNavigate('legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-stone-300 transition-colors"
            >
              Politique de Confidentialité
            </button>
            <span>·</span>
            <button
              onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-stone-300 transition-colors"
            >
              Contact & Plan d'Accès
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
