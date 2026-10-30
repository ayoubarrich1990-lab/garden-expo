import React, { useState } from 'react';
import { PageId, StandBookingRequest } from '../types';
import { SECTORS_DATA, ORGANIZER_DETAILS } from '../data/expoData';
import {
  calculateStandPrice,
  formatCurrencyMAD,
  validateEmail,
  validatePhone,
} from '../utils/expoLogic';
import {
  CheckCircle2,
  Calculator,
  ShieldCheck,
  FileText,
  Building2,
  ArrowRight,
  Printer,
  Sparkles,
  Phone,
  Mail,
} from 'lucide-react';

interface ExhibitorsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ExhibitorsPage: React.FC<ExhibitorsPageProps> = ({ onNavigate }) => {
  // Simulator state
  const [surface, setSurface] = useState<number>(18);
  const [standType, setStandType] = useState<'equipped' | 'bare' | 'island'>('equipped');
  const [powerPackage, setPowerPackage] = useState<boolean>(true);

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    jobTitle: '',
    email: '',
    phone: '',
    city: 'Casablanca',
    sectorId: SECTORS_DATA[0].id,
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedBooking, setSubmittedBooking] = useState<{
    reference: string;
    date: string;
    data: StandBookingRequest & { jobTitle: string; city: string };
  } | null>(null);

  const currentPrice = calculateStandPrice(surface, standType, powerPackage);

  const handleFormSubmit = (e: React.FormEvent) => {
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
    const randomRef = 'EXP-MA-' + Math.floor(10000 + Math.random() * 90000);
    setSubmittedBooking({
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
        standType,
        surfaceSqMeters: surface,
        estimatedPriceMAD: currentPrice,
        specialRequests: formData.notes,
      },
    });
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">
              <span>Espace Exposants B2B</span>
              <span aria-hidden="true">·</span>
              <span>Casablanca, Maroc</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-balance mb-4">
              Devenir Exposant & Réserver un Stand
            </h1>
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              Accédez aux plus grands prescripteurs et donneurs d'ordre de l'aménagement paysager,
              de l'irrigation et de la ville durable au Maroc.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Commercial Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl border border-stone-200">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-2">
              Prescription Directe
            </span>
            <h3 className="text-base font-bold text-stone-900 mb-2">
              Rencontrez les Architectes & Paysagistes
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              En partenariat avec l’AAPM, bénéficiez d'une audience qualifiée de prescripteurs qui intègrent directement vos produits dans leurs CCTP et projets d'aménagement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-2">
              Commandes Publiques
            </span>
            <h3 className="text-base font-bold text-stone-900 mb-2">
              Collectivités & Directions Techniques
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Présentez vos solutions aux maires, directeurs généraux des services techniques communaux et aménageurs des grandes métropoles marocaines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-2">
              Retour sur Investissement
            </span>
            <h3 className="text-base font-bold text-stone-900 mb-2">
              Visibilité & Catalogue Officiel
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Diffusion de votre profil dans l'annuaire professionnel distribué à tous les visiteurs, démonstrations en conditions réelles et couverture presse spécialisée.
            </p>
          </div>
        </div>

        {/* Stand Simulator & Application Form */}
        {submittedBooking ? (
          <div className="bg-white rounded-2xl border border-emerald-300 p-8 sm:p-12 shadow-sm max-w-3xl mx-auto">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
              <img
                src="/assets/logo-garden-expo-official.png"
                alt="Garden Expo Africa Maroc"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div className="text-right text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded">
                DOSSIER OFFICIEL CASABLANCA
              </div>
            </div>
            <div className="flex items-center gap-3 text-emerald-800 font-bold mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
              <h2 className="text-2xl font-bold font-['Outfit',sans-serif]">
                Demande de Réservation Enregistrée !
              </h2>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed mb-6">
              Votre dossier de participation pour <strong>Garden Expo Africa Maroc</strong> a bien été transmis à la direction commerciale de <strong>R2H Communication</strong>.
            </p>

            <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 mb-6 text-xs sm:text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-stone-200 mb-3">
                <span className="text-stone-500">Numéro de dossier :</span>
                <span className="font-mono font-bold text-emerald-800">{submittedBooking.reference}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <span className="text-stone-500 block text-xs">Entreprise</span>
                  <span className="font-bold text-stone-900">{submittedBooking.data.companyName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Contact</span>
                  <span className="font-bold text-stone-900">{submittedBooking.data.contactName} ({submittedBooking.data.email})</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Formule Stand</span>
                  <span className="font-bold text-stone-900">
                    {submittedBooking.data.standType === 'equipped' ? 'Stand Aménagé Standard' : submittedBooking.data.standType === 'bare' ? 'Espace Nu' : 'Stand Îlot Prestige'} ({submittedBooking.data.surfaceSqMeters} m²)
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Estimation Tarifaire HT</span>
                  <span className="font-bold text-emerald-800 font-mono">
                    {formatCurrencyMAD(submittedBooking.data.estimatedPriceMAD || 0)}
                  </span>
                </div>
              </div>
              <div className="text-xs text-stone-500 pt-2 border-t border-stone-200">
                Lieu : Casablanca, Maroc · Organisateur : R2H Communication SARL (+212 661 482 497)
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer / Sauvegarder le récapitulatif</span>
              </button>
              <button
                onClick={() => setSubmittedBooking(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-200"
              >
                Nouvelle simulation
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Interactive Stand Simulator */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                <Calculator className="w-4 h-4" />
                <span>Simulateur en Direct</span>
              </div>
              <h2 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif] mb-6">
                Calculez votre stand à Casablanca
              </h2>

              {/* Surface Slider & Presets */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  Surface souhaitée : <span className="text-emerald-700 font-mono text-base">{surface} m²</span>
                </label>
                <input
                  type="range"
                  min="9"
                  max="120"
                  step="3"
                  value={surface}
                  onChange={(e) => setSurface(parseInt(e.target.value))}
                  className="w-full accent-emerald-600 mb-3"
                />
                <div className="flex flex-wrap gap-2">
                  {[9, 18, 27, 36, 54, 72].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSurface(s)}
                      className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                        surface === s
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {s} m²
                    </button>
                  ))}
                </div>
              </div>

              {/* Stand Type Options */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-800 mb-2">
                  Type d'aménagement :
                </label>
                <div className="flex flex-col gap-2">
                  <label
                    className={`p-3 rounded-lg border cursor-pointer text-xs flex items-start gap-3 transition-colors ${
                      standType === 'equipped'
                        ? 'border-emerald-700 bg-emerald-50/60'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="standType"
                      checked={standType === 'equipped'}
                      onChange={() => setStandType('equipped')}
                      className="mt-0.5 accent-emerald-700"
                    />
                    <div>
                      <span className="font-bold text-stone-900 block">Stand Équipé Clé en Main (2 400 MAD/m²)</span>
                      <span className="text-stone-600 text-[11px] block mt-0.5">
                        Cloisons mélaminées, moquette au sol, spots LED, enseigne au nom de votre entreprise, 1 table, 3 chaises.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-lg border cursor-pointer text-xs flex items-start gap-3 transition-colors ${
                      standType === 'bare'
                        ? 'border-emerald-700 bg-emerald-50/60'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="standType"
                      checked={standType === 'bare'}
                      onChange={() => setStandType('bare')}
                      className="mt-0.5 accent-emerald-700"
                    />
                    <div>
                      <span className="font-bold text-stone-900 block">Espace Nu (1 800 MAD/m²)</span>
                      <span className="text-stone-600 text-[11px] block mt-0.5">
                        Surface brute au sol pour agencement sur mesure personnalisé par votre standiste.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-lg border cursor-pointer text-xs flex items-start gap-3 transition-colors ${
                      standType === 'island'
                        ? 'border-emerald-700 bg-emerald-50/60'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="standType"
                      checked={standType === 'island'}
                      onChange={() => setStandType('island')}
                      className="mt-0.5 accent-emerald-700"
                    />
                    <div>
                      <span className="font-bold text-stone-900 block">Stand Îlot Prestige (3 100 MAD/m²)</span>
                      <span className="text-stone-600 text-[11px] block mt-0.5">
                        Emplacement premium avec 4 faces ouvertes sur allées principales, visibilité optimale.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Power Package Checkbox */}
              <div className="mb-6 pt-3 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700">
                  <input
                    type="checkbox"
                    checked={powerPackage}
                    onChange={(e) => setPowerPackage(e.target.checked)}
                    className="accent-emerald-700 rounded"
                  />
                  <span>Inclure le coffret d'alimentation électrique triphasé (+1 500 MAD)</span>
                </label>
              </div>

              {/* Estimated Total Card */}
              <div className="p-4 bg-stone-900 text-white rounded-xl">
                <div className="text-xs text-stone-400 mb-1">Estimation totale indicative (HT)</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  {formatCurrencyMAD(currentPrice)}
                </div>
                <div className="text-[11px] text-stone-400 mt-2">
                  * Tarifs hors taxes pour la session officielle de Casablanca. Réservation sous réserve de validation par le comité d'organisation.
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
              <h2 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif] mb-2">
                Dossier de Candidature Exposant
              </h2>
              <p className="text-xs text-stone-600 mb-6">
                Remplissez ce formulaire officiel pour bloquer votre option d'emplacement et recevoir le dossier contractuel par email.
              </p>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Nom de l'entreprise *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Ex: Pépinières du Maroc SARL"
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
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
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ex: Casablanca, Maroc"
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
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
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Ex: Karim Benjelloun"
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                    />
                    {formErrors.contactName && (
                      <span className="text-[11px] text-red-500 mt-1 block">{formErrors.contactName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Fonction
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="Ex: Directeur Commercial"
                      className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@entreprise.ma"
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

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Secteur d'activité principal
                  </label>
                  <select
                    value={formData.sectorId}
                    onChange={(e) => setFormData({ ...formData, sectorId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                  >
                    {SECTORS_DATA.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
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
                    className="w-full px-3 py-2 border rounded-md text-stone-900 focus:outline-none focus:border-emerald-600 border-stone-300"
                  />
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Traitement sécurisé par R2H Communication Casablanca</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Valider ma demande de participation</span>
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
