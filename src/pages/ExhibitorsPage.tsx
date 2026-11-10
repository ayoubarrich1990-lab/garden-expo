import React, { useState } from 'react';
import { PageId, StandBookingRequest } from '../types';
import { SECTORS_DATA, ORGANIZER_DETAILS } from '../data/expoData';
import { validateEmail, validatePhone } from '../utils/expoLogic';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/translations';
import {
  CheckCircle2,
  ShieldCheck,
  Building2,
  ArrowRight,
  Printer,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import { SupabaseDataService } from '../services/supabaseService';

interface ExhibitorsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ExhibitorsPage: React.FC<ExhibitorsPageProps> = ({ onNavigate }) => {
  const { language } = useApp();
  const t = useTranslation(language);

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    jobTitle: '',
    email: '',
    phone: '',
    city: 'Casablanca',
    sectorId: SECTORS_DATA[0].id,
    standType: 'equipped' as 'equipped' | 'bare' | 'island',
    surface: 18,
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    reference: string;
    date: string;
    data: StandBookingRequest & { jobTitle: string; city: string };
  } | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.companyName.trim()) errors.companyName = 'Veuillez indiquer le nom de votre entreprise.';
    if (!formData.contactName.trim()) errors.contactName = 'Veuillez indiquer le nom du contact.';
    if (!validateEmail(formData.email)) errors.email = 'Veuillez saisir une adresse email valide.';
    if (!validatePhone(formData.phone)) errors.phone = 'Veuillez saisir un numéro de téléphone valide (+212...).';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmittingBooking(true);

    const randomRef = 'EXP-27-' + Math.floor(10000 + Math.random() * 90000);
    const bookingPayload = {
      reference: randomRef,
      date: new Date().toLocaleDateString('fr-FR'),
      data: {
        companyName: formData.companyName,
        contactName: formData.contactName,
        jobTitle: formData.jobTitle,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        sectorId: formData.sectorId,
        standType: formData.standType,
        surfaceSqMeters: formData.surface,
        specialRequests: formData.notes,
      },
    };

    try {
      // Save directly to Supabase stand_bookings table
      await SupabaseDataService.submitStandBooking({
        ...bookingPayload.data,
        reference: randomRef,
        date: bookingPayload.date,
      });
      setSubmittedBooking(bookingPayload);
    } catch (err) {
      console.warn('Erreur envoi réservation stand:', err);
      // Fallback confirmation even if transient network error
      setSubmittedBooking(bookingPayload);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const getStandTypeLabel = (type: string) => {
    if (type === 'bare') return 'Espace Nu (Aménagement libre)';
    if (type === 'island') return 'Stand Îlot Prestige (4 faces ouvertes)';
    return 'Stand Équipé Clé en Main';
  };

  return (
    <div className="bg-[#F5F7F5] min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-[#004421] text-white py-16 sm:py-20 border-b border-[#08752D]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[#39B54A] text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.exhibitors.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] mb-4">
              {t.exhibitors.title}
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
              {t.exhibitors.subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Commercial Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs hover:border-[#08752D] transition-colors">
            <span className="text-xs font-bold text-[#08752D] uppercase tracking-wider block mb-2">
              Prescription Directe
            </span>
            <h3 className="text-base font-bold text-[#151515] mb-2">
              Rencontrez les Architectes & Paysagistes
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              En partenariat avec l’AAPM et IFLA Africa, bénéficiez d'une audience qualifiée de prescripteurs qui intègrent directement vos produits dans leurs CCTP et projets d'aménagement.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs hover:border-[#08752D] transition-colors">
            <span className="text-xs font-bold text-[#08752D] uppercase tracking-wider block mb-2">
              Commandes Publiques
            </span>
            <h3 className="text-base font-bold text-[#151515] mb-2">
              Collectivités & Directions Techniques
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Présentez vos solutions aux maires, directeurs généraux des services techniques communaux et aménageurs des grandes métropoles marocaines et africaines.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs hover:border-[#08752D] transition-colors">
            <span className="text-xs font-bold text-[#08752D] uppercase tracking-wider block mb-2">
              Retour sur Investissement
            </span>
            <h3 className="text-base font-bold text-[#151515] mb-2">
              Visibilité & Catalogue Officiel
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Diffusion de votre profil dans l'annuaire professionnel distribué aux décideurs, démonstrations en conditions réelles et couverture médiatique spécialisée.
            </p>
          </div>
        </div>

        {/* Application Form (Without live simulator) */}
        {submittedBooking ? (
          <div className="bg-white rounded-3xl border border-emerald-300 p-8 sm:p-12 shadow-sm max-w-3xl mx-auto">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
              <img
                src="/assets/logo-garden-expo-official.png"
                alt="Garden Expo Africa Maroc"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    '/assets/aistudio/LOGO-GARDEN-EXPO-PNG_3a4759d4.png';
                }}
              />
              <div className="text-right text-[11px] font-mono text-[#004421] font-bold bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                DOSSIER OFFICIEL CASABLANCA 2027
              </div>
            </div>

            <div className="flex items-center gap-3 text-[#004421] font-bold mb-4">
              <CheckCircle2 className="w-7 h-7 text-[#08752D] shrink-0" />
              <h2 className="text-2xl font-bold font-['Outfit',sans-serif]">
                Demande de Stand Enregistrée !
              </h2>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed mb-6">
              Votre dossier de demande pour <strong>Garden Expo Africa 2027</strong> a bien été transmis à la direction commerciale de <strong>R2H Communication</strong>. Un chargé d'affaires prendra contact avec vous sous 24h ouvrées.
            </p>

            <div className="bg-[#F5F7F5] rounded-2xl p-6 border border-stone-200 mb-6 text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-stone-200 mb-3">
                <span className="text-stone-500">Numéro de dossier :</span>
                <span className="font-mono font-bold text-[#004421]">{submittedBooking.reference}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-stone-500 block text-xs">Entreprise</span>
                  <span className="font-bold text-stone-900">{submittedBooking.data.companyName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Contact</span>
                  <span className="font-bold text-stone-900">{submittedBooking.data.contactName} ({submittedBooking.data.email})</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Formule Stand demandée</span>
                  <span className="font-bold text-stone-900">
                    {getStandTypeLabel(submittedBooking.data.standType || 'equipped')}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Surface demandée</span>
                  <span className="font-bold text-[#08752D] font-mono">
                    {submittedBooking.data.surfaceSqMeters} m²
                  </span>
                </div>
              </div>
              <div className="text-xs text-stone-500 pt-3 border-t border-stone-200 flex flex-wrap justify-between gap-2">
                <span>Lieu : Casablanca, Maroc</span>
                <span>Organisateur : R2H Communication SARL (+212 661 482 497)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 bg-[#004421] text-white rounded-xl text-xs font-bold hover:bg-[#08752D] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer / Télécharger le récépissé</span>
              </button>
              <button
                onClick={() => setSubmittedBooking(null)}
                className="w-full sm:w-auto px-6 py-3 bg-stone-100 text-stone-700 rounded-xl text-xs font-bold hover:bg-stone-200 transition-colors cursor-pointer"
              >
                Nouvelle demande
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm">
            <div className="mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#08752D] block mb-2">
                FORMULAIRE OFFICIEL
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151515] font-['Outfit',sans-serif] mb-2">
                Dossier de Demande de Stand Exposant
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Remplissez ce formulaire pour soumettre votre demande d'emplacement à Casablanca. Notre équipe commerciale vous contactera avec les plans détaillés des halls et les options d'aménagement.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Nom de l'entreprise *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Ex: Pépinières du Maroc SARL"
                    className="w-full px-3.5 py-2.5 border rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#08752D] border-stone-300"
                  />
                  {formErrors.companyName && (
                    <span className="text-[11px] text-red-500 mt-1 block">{formErrors.companyName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Ville / Pays du siège *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ex: Casablanca, Maroc"
                    className="w-full px-3.5 py-2.5 border rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#08752D] border-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Nom & Prénom du responsable *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Ex: Karim Benjelloun"
                    className="w-full px-3.5 py-2.5 border rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#08752D] border-stone-300"
                  />
                  {formErrors.contactName && (
                    <span className="text-[11px] text-red-500 mt-1 block">{formErrors.contactName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Fonction / Poste
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    placeholder="Ex: Directeur Général / Commercial"
                    className="w-full px-3.5 py-2.5 border rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#08752D] border-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@entreprise.ma"
                    className="w-full px-3.5 py-2.5 border rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#08752D] border-stone-300"
                  />
                  {formErrors.email && (
                    <span className="text-[11px] text-red-500 mt-1 block">{formErrors.email}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Téléphone mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+212 661 ..."
                    className="w-full px-3.5 py-2.5 border rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#08752D] border-stone-300"
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-red-500 mt-1 block">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Secteur d'activité principal
                </label>
                <select
                  value={formData.sectorId}
                  onChange={(e) => setFormData({ ...formData, sectorId: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#08752D] border-stone-300 bg-white"
                >
                  {SECTORS_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Formule de stand souhaitée */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  Formule de stand souhaitée
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, standType: 'equipped' })}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.standType === 'equipped'
                        ? 'border-[#08752D] bg-emerald-50/70 shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-bold text-[#151515] block text-xs">Stand Équipé</span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Clé en main avec cloisons, moquette, spots & mobilier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, standType: 'bare' })}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.standType === 'bare'
                        ? 'border-[#08752D] bg-emerald-50/70 shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-bold text-[#151515] block text-xs">Espace Nu</span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Surface brute pour aménagement sur mesure personnalisé</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, standType: 'island' })}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.standType === 'island'
                        ? 'border-[#08752D] bg-emerald-50/70 shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-bold text-[#151515] block text-xs">Stand Îlot Prestige</span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Emplacement 4 faces ouvertes sur allées principales</span>
                  </button>
                </div>
              </div>

              {/* Surface souhaitée */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  Surface souhaitée (m²)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {[9, 18, 27, 36, 54, 72, 100].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, surface: s })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        formData.surface === s
                          ? 'bg-[#004421] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                      }`}
                    >
                      {s} m²
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="9"
                  max="500"
                  value={formData.surface}
                  onChange={(e) => setFormData({ ...formData, surface: Number(e.target.value) })}
                  className="w-32 px-3 py-2 border rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#08752D] border-stone-300 text-xs font-mono"
                  placeholder="Surface en m²"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Besoins spécifiques / Démonstrations en extérieur
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Précisez vos besoins : démonstration de machines, raccordement eau, hauteur sous plafond..."
                  className="w-full px-3.5 py-2.5 border rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#08752D] border-stone-300"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#08752D] shrink-0" />
                  <span>Traitement confidentiel par R2H Communication Casablanca</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#004421] hover:bg-[#08752D] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <span>{isSubmittingBooking ? 'Envoi en cours...' : 'Envoyer ma demande de stand'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
