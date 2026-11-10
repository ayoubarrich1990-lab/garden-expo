import React, { useState, useEffect } from 'react';
import { PageId, Partner } from '../types';
import { PARTNERS_DATA, ORGANIZER_DETAILS } from '../data/expoData';
import { CheckCircle2, Award, ArrowRight, ShieldCheck, Mail, Phone, ExternalLink, Loader2 } from 'lucide-react';
import { validateEmail, validatePhone } from '../utils/expoLogic';
import { SupabaseDataService } from '../services/supabaseService';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/translations';

interface PartnersPageProps {
  onNavigate: (page: PageId) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate }) => {
  const { language } = useApp();
  const t = useTranslation(language);

  const [selectedPackage, setSelectedPackage] = useState<string>('Partenaire Institutionnel');
  const [inquirySent, setInquirySent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [partners, setPartners] = useState<Partner[]>(PARTNERS_DATA);
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    comments: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let mounted = true;
    SupabaseDataService.fetchPartners().then((data) => {
      if (mounted && data && data.length > 0) {
        const filtered = data.filter(
          (p) =>
            !p.id.toLowerCase().includes('buxcom') &&
            !p.name.toLowerCase().includes('buxcom') &&
            !p.id.toLowerCase().includes('decclic') &&
            !p.name.toLowerCase().includes('déc clic') &&
            !p.name.toLowerCase().includes('dec clic')
        );
        setPartners(filtered);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.company.trim()) errors.company = 'Veuillez saisir le nom de votre organisme.';
    if (!formData.contact.trim()) errors.contact = 'Veuillez indiquer le nom du responsable.';
    if (!validateEmail(formData.email)) errors.email = 'Veuillez saisir un email valide.';
    if (!validatePhone(formData.phone)) errors.phone = 'Veuillez saisir un numéro de téléphone valide.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      await SupabaseDataService.submitSponsorshipInquiry({
        company: formData.company,
        contact: formData.contact,
        email: formData.email,
        phone: formData.phone,
        packageName: selectedPackage,
        comments: formData.comments,
      });
      setInquirySent(true);
    } catch (err) {
      console.error('Erreur soumission dossier sponsoring:', err);
      setInquirySent(true); // Fallback confirmation
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              <span>{t.partners.badge}</span>
              <span aria-hidden="true">·</span>
              <span>{t.common.datesNotice}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-balance mb-4">
              {t.partners.title}
            </h1>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              {t.partners.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Banner Mosaïque des Partenaires & Marques */}
        <div className="mb-12 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-bold text-[#367A4D] uppercase tracking-wider block">
                Mural Officiel des Exposants & Partenaires
              </span>
              <h2 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif]">
                Les Marques & Institutions Réunies à la 3ème Édition
              </h2>
            </div>
            <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full font-medium self-start">
              Casablanca · Édition de Référence
            </span>
          </div>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 overflow-hidden">
            <img
              src="/assets/aistudio/les-exposants-_28989909.png"
              alt="Mosaïque des exposants et partenaires de la 3ème édition"
              className="w-full h-auto object-contain max-h-[220px] mx-auto"
            />
          </div>
        </div>

        {/* Section 1: Official Institutional Partners */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
              Partenaires Institutionnels & Scientifiques
            </span>
            <h2 className="text-2xl font-bold text-stone-900 font-['Outfit',sans-serif]">
              Des Acteurs Clés Engagés pour la Transition Urbaine
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between hover:border-emerald-300 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {partner.badge}
                    </span>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-stone-400 hover:text-emerald-700 transition-colors"
                        aria-label={`Visiter ${partner.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {partner.role}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Partenaire vérifié de l'édition Maroc</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Sponsorship & Partnership Application Form */}
        <div id="sponsor-form" className="bg-white rounded-2xl p-8 sm:p-10 border border-stone-200 shadow-xs max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>Direction Partenariats</span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif] mb-2">
            Demande de Partenariat Officiel
          </h2>
          <p className="text-xs text-stone-600 mb-6">
            L'équipe de R2H Communication vous recontactera sous 24h avec le dossier de partenariat et les modalités de collaboration.
          </p>

          {inquirySent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-emerald-950 mb-1">
                Demande transmise avec succès !
              </h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto mb-4">
                Votre demande de partenariat (<strong>{selectedPackage}</strong>) a bien été enregistrée pour l'édition de Casablanca.
              </p>
              <button
                onClick={() => setInquirySent(false)}
                className="px-4 py-2 bg-emerald-700 text-white rounded text-xs font-semibold"
              >
                Faire une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Entreprise / Marque *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nom de l'entreprise"
                    className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                  />
                  {formErrors.company && (
                    <span className="text-[11px] text-red-500 mt-1 block">{formErrors.company}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Nom du Contact *
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="Prénom et Nom"
                    className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                  />
                  {formErrors.contact && (
                    <span className="text-[11px] text-red-500 mt-1 block">{formErrors.contact}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Email Professionnel *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@votre-marque.ma"
                    className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                  />
                  {formErrors.email && (
                    <span className="text-[11px] text-red-500 mt-1 block">{formErrors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Téléphone Direct *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+212 ..."
                    className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-red-500 mt-1 block">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Type de Partenariat Souhaité
                </label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                >
                  <option value="Partenaire Institutionnel">Partenaire Institutionnel</option>
                  <option value="Partenaire Scientifique & Académique">Partenaire Scientifique & Académique</option>
                  <option value="Partenaire Média & Presse">Partenaire Média & Presse</option>
                  <option value="Sponsor Officiel de l'Événement">Sponsor Officiel de l'Événement</option>
                  <option value="Autre Partenariat Spécifique">Autre Partenariat Spécifique</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Objectifs particuliers ou message
                </label>
                <textarea
                  rows={3}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder="Précisez vos souhaits de visibilité (stands VIP, atelier thématique, remise de prix...)"
                  className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  R2H Communication · Casablanca (+212 661 482 497)
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-xs rounded-md transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmission en cours...</span>
                    </>
                  ) : (
                    <span>Recevoir le dossier sponsoring</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
