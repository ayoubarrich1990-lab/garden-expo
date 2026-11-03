import React, { useState } from 'react';
import { PageId } from '../types';
import { GardenExpoLogo } from './GardenExpoLogo';
import { ORGANIZER_DETAILS } from '../data/expoData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
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
    <footer className="bg-[#004421] text-stone-200 border-t border-[#08752D]/40">
      {/* Top Banner: Regional & Institutional Identity */}
      <div className="bg-black/25 border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-emerald-100">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#39B54A]"></span>
            <span className="font-bold tracking-wide text-white">4ème Édition · Casablanca, Maroc · 2027</span>
            <span className="text-emerald-300">| Dates à confirmer</span>
          </div>
          <div className="text-emerald-200/90 flex items-center gap-3">
            <span>Organisé par R2H Communication SARL</span>
            <span>·</span>
            <span>En partenariat avec AAPM, IFLA Africa & IMANOR</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Presentation */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <GardenExpoLogo variant="white" />
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pr-4 mt-2">
              Garden Expo Africa est le Salon International de l'Aménagement Paysager et Urbain en Afrique.
              Plateforme B2B de référence à Casablanca réunissant décideurs publics, architectes, urbanistes,
              fournisseurs d'irrigation et paysagistes pour bâtir des territoires plus verts et résilients.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-300 mt-2">
              <ShieldCheck className="w-4 h-4 text-[#39B54A] shrink-0" />
              <span>Événement professionnel certifié · Réglementation CNDP Maroc</span>
            </div>
          </div>

          {/* Col 2: Navigation rapide */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation Officielle
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-emerald-100">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#39B54A] transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('salon'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#39B54A] transition-colors"
                >
                  Le Salon & Vision 2027
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('exhibitors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#39B54A] transition-colors"
                >
                  Exposer (Demande de stand)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('visitors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#39B54A] transition-colors"
                >
                  Visiter (Préinscription)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('conferences'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#39B54A] transition-colors"
                >
                  Conférences & Ateliers
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('partners'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#39B54A] transition-colors"
                >
                  Partenaires Institutionnels
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#39B54A] transition-colors"
                >
                  Actualités & Presse
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('editions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#39B54A] transition-colors"
                >
                  Bilan des Éditions Précédentes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordonnées officielles Casablanca */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact & Organisation
            </h4>
            <div className="flex flex-col gap-3 text-xs sm:text-sm text-emerald-100">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#39B54A] shrink-0 mt-0.5" />
                <span className="leading-snug">{ORGANIZER_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#39B54A] shrink-0" />
                <a href={`tel:${ORGANIZER_DETAILS.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-white">
                  {ORGANIZER_DETAILS.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-300 pl-6.5">
                <span>Fixe : {ORGANIZER_DETAILS.phoneLandline}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#39B54A] shrink-0" />
                <a href={`mailto:${ORGANIZER_DETAILS.emailContact}`} className="hover:text-white">
                  {ORGANIZER_DETAILS.emailContact}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-300">
                <Clock className="w-4 h-4 text-[#39B54A] shrink-0" />
                <span>{ORGANIZER_DETAILS.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Lettre d'information B2B */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Veille Professionnelle
            </h4>
            <p className="text-xs text-emerald-100/80 mb-3 leading-relaxed">
              Recevez les annonces officielles, le guide exposant et l’ouverture de la billetterie pour l'édition 2027 à Casablanca.
            </p>
            {newsletterSubmitted ? (
              <div className="p-3 bg-white/10 border border-[#39B54A]/50 rounded-xl text-xs text-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#39B54A] shrink-0 mt-0.5" />
                <span>Merci. Vous êtes inscrit à la lettre d’information officielle.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@entreprise.ma"
                  className="px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-[#39B54A]"
                  required
                />
                {newsletterError && <span className="text-[11px] text-red-300">{newsletterError}</span>}
                <button
                  type="submit"
                  className="py-2.5 px-3 text-xs font-bold text-white bg-[#08752D] hover:bg-[#39B54A] rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>S'abonner aux actualités</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
          <div>
            © 2027 Garden Expo Africa — Organisé par R2H Communication SARL. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => { onNavigate('legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-white transition-colors"
            >
              Mentions Légales
            </button>
            <span>·</span>
            <button
              onClick={() => { onNavigate('legal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-white transition-colors"
            >
              Politique de Confidentialité
            </button>
            <span>·</span>
            <button
              onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-white transition-colors"
            >
              Contact & Plan d'Accès
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
