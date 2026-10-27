import React, { useState } from 'react';
import { PageId, VisitorBadge } from '../types';
import { generateBadgeId, validateEmail, validatePhone } from '../utils/expoLogic';
import { ORGANIZER_DETAILS } from '../data/expoData';
import {
  QrCode,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react';

interface VisitorsPageProps {
  onNavigate: (page: PageId) => void;
}

const VISITOR_PROFILES = [
  'Architecte Paysagiste',
  'Urbaniste & Aménageur du Territoire',
  'Élu / Responsable Technique de Collectivité Territoriale',
  'Promoteur Immobilier & Maître d’Ouvrage',
  'Entrepreneur du Paysage & Entreprise d’Espaces Verts',
  'Gestionnaire de Golf, Complexe Hôtelier ou Sportif',
  'Ingénieur Hydraulicien / Agronome',
  'Pépiniériste / Distributeur de Matériel',
  'Enseignant-Chercheur / Étudiant Spécialisé',
  'Autre Professionnel B2B',
];

export const VisitorsPage: React.FC<VisitorsPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    jobTitle: '',
    email: '',
    phone: '',
    visitorProfile: VISITOR_PROFILES[0],
    country: 'Maroc',
    city: 'Casablanca',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generatedBadge, setGeneratedBadge] = useState<VisitorBadge | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = 'Veuillez saisir votre nom et prénom.';
    if (!formData.company.trim()) errors.company = 'Veuillez indiquer votre organisme ou entreprise.';
    if (!formData.jobTitle.trim()) errors.jobTitle = 'Veuillez préciser votre fonction.';
    if (!validateEmail(formData.email)) errors.email = 'Veuillez saisir une adresse email valide.';
    if (!validatePhone(formData.phone)) errors.phone = 'Veuillez saisir un numéro de téléphone valide.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const badgeNum = generateBadgeId(formData.visitorProfile.substring(0, 3));
    const newBadge: VisitorBadge = {
      badgeNumber: badgeNum,
      fullName: formData.fullName.trim(),
      company: formData.company.trim(),
      jobTitle: formData.jobTitle.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      visitorProfile: formData.visitorProfile,
      country: `${formData.city}, ${formData.country}`,
      registrationDate: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      qrPayload: `GARDEN-EXPO-AFRICA-MAROC|CASABLANCA|${badgeNum}|${formData.fullName}|${formData.company}`,
    };

    setGeneratedBadge(newBadge);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              <span>Visiteurs Professionnels B2B</span>
              <span aria-hidden="true">·</span>
              <span>Casablanca, Maroc</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-balance mb-4">
              Enregistrement & Badge d'Accès Gratuit
            </h1>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              Accédez librement aux halls d'exposition, aux démonstrations de matériels et aux cycles
              de conférences scientifiques co-organisés avec l'AAPM à Casablanca.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {generatedBadge ? (
          /* Rendered Official Badge */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border-2 border-emerald-600 shadow-xl overflow-hidden mb-6 p-8 relative">
              {/* Badge Top Header */}
              <div className="border-b-2 border-stone-900 pb-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/logo-garden-expo-official.png"
                    alt="Garden Expo Africa Maroc"
                    className="h-11 sm:h-12 w-auto object-contain"
                  />
                  <div className="hidden sm:block border-l border-stone-200 pl-3">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
                      Badge Officiel B2B
                    </div>
                    <div className="text-xs font-semibold text-stone-600">
                      Salon du Paysage, de l'Irrigation & Ville Verte
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-800 text-white px-3 py-1.5 rounded-md text-xs font-mono font-bold tracking-wider text-center">
                  CASABLANCA · MAROC
                </div>
              </div>

              {/* Badge Content */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mb-6">
                <div className="sm:col-span-2">
                  <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">
                    Titulaire du Badge
                  </div>
                  <div className="text-2xl font-bold text-stone-900 leading-snug mb-1">
                    {generatedBadge.fullName}
                  </div>
                  <div className="text-sm font-semibold text-emerald-800 mb-0.5">
                    {generatedBadge.jobTitle}
                  </div>
                  <div className="text-sm text-stone-700 font-medium">
                    {generatedBadge.company}
                  </div>
                  <div className="text-xs text-stone-500 mt-2">
                    Origine : {generatedBadge.country}
                  </div>
                </div>

                {/* Simulated QR Code Canvas */}
                <div className="flex flex-col items-center justify-center p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="w-28 h-28 bg-white border border-stone-300 p-2 flex flex-col items-center justify-center shadow-xs">
                    <QrCode className="w-20 h-20 text-stone-900" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-stone-700 mt-2">
                    {generatedBadge.badgeNumber}
                  </span>
                </div>
              </div>

              {/* Badge Category Ribbon */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center mb-4">
                <span className="text-xs uppercase font-extrabold text-emerald-900 tracking-wider">
                  CATÉGORIE : {generatedBadge.visitorProfile.toUpperCase()}
                </span>
              </div>

              {/* Badge Footer */}
              <div className="border-t border-stone-200 pt-3 flex flex-wrap items-center justify-between text-[11px] text-stone-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Casablanca, Maroc · OFEC</span>
                </div>
                <div>
                  Enregistré le : {generatedBadge.registrationDate}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer mon E-Badge</span>
              </button>
              <button
                onClick={() => setGeneratedBadge(null)}
                className="w-full sm:w-auto px-6 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs rounded-lg transition-colors"
              >
                Enregistrer un autre collaborateur
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Why Visit Highlights */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-2">
                  Pourquoi Visiter ?
                </span>
                <h2 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif] mb-4">
                  Le Rendez-Vous Annuel des Professionnels du Paysage
                </h2>
                <div className="flex flex-col gap-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">150+ Marques Réunies</strong>
                      Découvrez en exclusivité les nouveaux matériels d'espaces verts, systèmes d'irrigation connectés et pépinières spécialisées.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">Conférences AAPM & IFLA Africa</strong>
                      Assistez à des panels de haut niveau sur les trames vertes urbaines, la résilience hydrique et la réglementation technique.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">Réseau & Partenariats B2B</strong>
                      Échangez avec des maîtres d'ouvrage publics, des promoteurs et des bureaux d'études de tout le continent africain à Casablanca.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-stone-900 text-white rounded-2xl p-6 border border-stone-800">
                <h3 className="text-sm font-bold text-white mb-2">Informations Pratiques</h3>
                <ul className="text-xs text-stone-300 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Lieu : Casablanca, Maroc (Pôle des Foires et Expositions)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Horaires : 09h30 - 18h30 en continu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Entrée gratuite sur présentation du badge officiel nominatif</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif] mb-2">
                Demande de Badge Visiteur Gratuit
              </h2>
              <p className="text-xs text-stone-600 mb-6">
                Remplissez vos informations professionnelles pour générer instantanément votre badge d'accès électronique nominatif.
              </p>

              <form onSubmit={handleRegister} className="flex flex-col gap-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ex: Yasmine El Fassi"
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                    />
                    {formErrors.fullName && (
                      <span className="text-[11px] text-red-500 mt-1 block">{formErrors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Entreprise / Collectivité *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ex: Commune Urbaine de Casablanca"
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                    />
                    {formErrors.company && (
                      <span className="text-[11px] text-red-500 mt-1 block">{formErrors.company}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Fonction / Poste *
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="Ex: Architecte Paysagiste Chef de Projet"
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                    />
                    {formErrors.jobTitle && (
                      <span className="text-[11px] text-red-500 mt-1 block">{formErrors.jobTitle}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Profil Professionnel *
                    </label>
                    <select
                      value={formData.visitorProfile}
                      onChange={(e) => setFormData({ ...formData, visitorProfile: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                    >
                      {VISITOR_PROFILES.map((p, idx) => (
                        <option key={idx} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
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
                      placeholder="yasmine@cabinet-paysage.ma"
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+212 661 ..."
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                    />
                    {formErrors.phone && (
                      <span className="text-[11px] text-red-500 mt-1 block">{formErrors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Ville *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ex: Casablanca, Rabat, Marrakech..."
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Pays *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Badge 100% gratuit · Génération immédiate</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Générer mon badge d'accès</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
