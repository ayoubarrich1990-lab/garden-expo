import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import { InteractiveHallPlan } from '../components/InteractiveHallPlan';
import {
  Building2,
  MapPin,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  Layers,
  Edit3,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Package,
  Users,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

interface ExhibitorDashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export const ExhibitorDashboardPage: React.FC<ExhibitorDashboardPageProps> = ({ onNavigate }) => {
  const {
    currentUser,
    currentExhibitorData,
    currentExhibitorStand,
    currentExhibitorInvoices,
    updateExhibitor,
  } = useApp();

  const exhibitor = currentExhibitorData;
  const stand = currentExhibitorStand;

  // Profile edit states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [description, setDescription] = useState(exhibitor?.description || '');
  const [website, setWebsite] = useState(exhibitor?.website || '');
  const [phone, setPhone] = useState(exhibitor?.phone || '');
  const [email, setEmail] = useState(exhibitor?.email || '');
  const [newProduct, setNewProduct] = useState('');
  const [products, setProducts] = useState<string[]>(exhibitor?.featuredProducts || []);
  const [notification, setNotification] = useState<string | null>(null);

  // Active tab
  const [activeTab, setActiveTab] = useState<'stand' | 'documents' | 'profile' | 'services'>('stand');

  if (!currentUser || currentUser.role !== 'exhibitor' || !exhibitor) {
    return (
      <div className="bg-[#F5F6F3] min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-stone-200 text-center shadow-sm">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-700">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-['Outfit',sans-serif] text-[#123D2B] mb-2">
            Accès Espace Exposant
          </h2>
          <p className="text-stone-600 mb-6 text-sm">
            Vous devez être connecté avec un compte Exposant officiel pour accéder au tableau de bord de votre stand,
            à vos documents contractuels et à vos factures.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-[#123D2B] text-white rounded-lg text-sm font-semibold hover:bg-[#123D2B]/90 transition-colors"
            >
              Faire une demande de stand
            </button>
            <button
              onClick={() => onNavigate('directory')}
              className="px-5 py-2.5 bg-stone-100 text-stone-700 rounded-lg text-sm font-semibold hover:bg-stone-200 transition-colors"
            >
              Consulter l'annuaire public
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateExhibitor({
      ...exhibitor,
      description,
      website,
      phone,
      email,
      featuredProducts: products,
    });
    setIsEditingProfile(false);
    setNotification('Votre profil exposant a été mis à jour avec succès.');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddProduct = () => {
    if (newProduct.trim() && !products.includes(newProduct.trim())) {
      setProducts([...products, newProduct.trim()]);
      setNewProduct('');
    }
  };

  const handleRemoveProduct = (p: string) => {
    setProducts(products.filter((item) => item !== p));
  };

  const handleSimulateDownload = (docTitle: string, ref: string) => {
    // Generate a simple text download blob for immediate browser response
    const element = document.createElement('a');
    const file = new Blob(
      [
        `============================================================\n` +
        `GARDEN EXPO AFRICA - CASABLANCA MAROC\n` +
        `Office des Foires et Expositions de Casablanca (OFEC)\n` +
        `============================================================\n` +
        `Document : ${docTitle}\n` +
        `Référence : ${ref}\n` +
        `Exposant : ${exhibitor.name}\n` +
        `Stand N° : ${stand ? stand.number : exhibitor.standNumber} (${stand ? stand.hall : exhibitor.hall})\n` +
        `Superficie : ${stand ? stand.surfaceSqMeters : exhibitor.surface} m²\n` +
        `Date d'émission : ${new Date().toLocaleDateString('fr-FR')}\n` +
        `Statut : VALIDE ET ENREGISTRÉ\n` +
        `Organisateur : Garden Expo Africa SARL AU - Casablanca, Maroc\n` +
        `Contact : contact@gardenexpo.ma | +212 5 22 20 40 50\n` +
        `============================================================\n`
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${ref}-${docTitle.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-[#F5F6F3] min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-[#123D2B] text-white py-10 border-b border-[#202620]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A5C96B] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Espace Exposant Officiel · Garden Expo Africa</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white flex items-center gap-3">
                {exhibitor.name}
              </h1>
              <p className="text-stone-300 text-sm mt-1 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#A5C96B]" />
                <span>{exhibitor.sector}</span>
                <span className="text-stone-500">|</span>
                <MapPin className="w-4 h-4 text-[#A5C96B]" />
                <span>{exhibitor.city}, {exhibitor.country}</span>
              </p>
            </div>

            {/* Quick status pill */}
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#367A4D] flex items-center justify-center font-bold text-white text-lg">
                {stand ? stand.number : exhibitor.standNumber}
              </div>
              <div>
                <div className="text-xs text-stone-300 uppercase tracking-wider font-semibold">Statut Participation</div>
                <div className="text-sm font-bold text-[#A5C96B] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A5C96B]" />
                  <span>Confirmée & Attribuée</span>
                </div>
                <div className="text-xs text-stone-300 mt-0.5">
                  {stand ? `${stand.surfaceSqMeters} m² · ${stand.hall}` : `${exhibitor.surface} m²`}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-8 border-b border-white/15 overflow-x-auto">
            <button
              onClick={() => setActiveTab('stand')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'stand'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Mon Stand & Plan d'Exposition</span>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'documents'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Factures & Documents ({currentExhibitorInvoices.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Fiche Annuaire & Catalogue</span>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'services'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Commandes Équipements & Badges</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center gap-3 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-sm font-medium">{notification}</p>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: STAND & INTERACTIVE PLAN */}
        {activeTab === 'stand' && (
          <div className="space-y-8">
            {/* Stand Technical Card */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                  Numéro de Stand
                </span>
                <span className="text-3xl font-extrabold text-[#123D2B] font-['Outfit',sans-serif]">
                  {stand ? stand.number : exhibitor.standNumber}
                </span>
                <p className="text-xs text-stone-500 mt-2">Emplacement garanti par le contrat de réservation</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                  Emplacement & Hall
                </span>
                <span className="text-xl font-bold text-[#123D2B] font-['Outfit',sans-serif] block">
                  {stand ? stand.hall : exhibitor.hall}
                </span>
                <p className="text-xs text-[#367A4D] font-medium mt-2">Zone centrale flux visiteurs</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                  Superficie & Type
                </span>
                <span className="text-3xl font-extrabold text-[#123D2B] font-['Outfit',sans-serif]">
                  {stand ? stand.surfaceSqMeters : exhibitor.surface} m²
                </span>
                <p className="text-xs text-stone-500 mt-2">
                  Formule {stand?.type === 'equipped' ? 'Stand Équipé Prestige' : 'Stand Nu Personnalisé'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                  Dimensions Stand
                </span>
                <span className="text-2xl font-bold text-[#123D2B] font-['Outfit',sans-serif] block">
                  {stand ? stand.dimensions : '6m x 6m'}
                </span>
                <p className="text-xs text-stone-500 mt-2">Hauteur maximale autorisée : 4,50m</p>
              </div>
            </div>

            {/* Embedded Interactive Hall Plan with Highlight */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#123D2B] font-['Outfit',sans-serif] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#367A4D]" />
                    Visualisation Cartographique de Votre Stand dans les Halls
                  </h3>
                  <p className="text-xs text-stone-500">
                    Votre stand est mis en surbrillance automatique en vert émeraude avec un marqueur dynamique.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Stand Actif : {stand ? stand.number : exhibitor.standNumber}</span>
                </div>
              </div>

              <InteractiveHallPlan
                highlightStandId={stand ? stand.id : exhibitor.standId}
                onSelectStand={(selected) => {
                  console.log('Selected stand on exhibitor view:', selected);
                }}
              />
            </div>
          </div>
        )}

        {/* TAB 2: INVOICES & DOCUMENTS VAULT */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-stone-100 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#123D2B] font-['Outfit',sans-serif] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#367A4D]" />
                    Coffre-fort Numérique & Pièces Justificatives
                  </h3>
                  <p className="text-sm text-stone-500">
                    Téléchargez vos factures certifiées, bon de commande, contrat signé et badges de montage.
                  </p>
                </div>
                <div className="text-xs text-stone-500 bg-stone-50 px-3 py-2 rounded-lg border border-stone-200">
                  Organisateur : <strong className="text-stone-800">Garden Expo Africa - OFEC Casablanca</strong>
                </div>
              </div>

              {currentExhibitorInvoices.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  <FileText className="w-12 h-12 mx-auto text-stone-300 mb-2" />
                  <p className="text-sm">Aucun document n'est disponible pour le moment.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 text-xs font-semibold text-stone-500 uppercase tracking-wider bg-stone-50">
                        <th className="py-3 px-4">Document</th>
                        <th className="py-3 px-4">Référence</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Montant</th>
                        <th className="py-3 px-4">Statut</th>
                        <th className="py-3 px-4 text-right">Téléchargement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {currentExhibitorInvoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-4 px-4 font-semibold text-stone-900 flex items-center gap-2.5">
                            <FileText className="w-4 h-4 text-[#367A4D]" />
                            <span>{inv.title}</span>
                          </td>
                          <td className="py-4 px-4 font-mono text-xs text-stone-600">{inv.referenceNumber}</td>
                          <td className="py-4 px-4 text-stone-600 text-xs">{inv.date}</td>
                          <td className="py-4 px-4 font-bold text-stone-900">
                            {inv.amountMAD ? `${inv.amountMAD.toLocaleString('fr-FR')} MAD TTC` : '—'}
                          </td>
                          <td className="py-4 px-4">
                            {inv.status === 'paid' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                <CheckCircle2 className="w-3 h-3" /> Payé
                              </span>
                            )}
                            {inv.status === 'signed' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                <CheckCircle2 className="w-3 h-3" /> Signé
                              </span>
                            )}
                            {inv.status === 'ready' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                                <CheckCircle2 className="w-3 h-3" /> Disponible
                              </span>
                            )}
                            {inv.status === 'pending' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                                <Clock className="w-3 h-3" /> En attente
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => handleSimulateDownload(inv.title, inv.referenceNumber)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#123D2B] text-white hover:bg-[#367A4D] transition-colors rounded-lg text-xs font-semibold shadow-2xs"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Télécharger</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE & CATALOGUE EDITOR */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs max-w-4xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-[#123D2B] font-['Outfit',sans-serif]">
                  Fiche de Présentation dans l'Annuaire Officiel
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  Ces données sont publiées en direct dans l'Annuaire Officiel Garden Expo pour les 8 500+ visiteurs professionnels.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? 'Annuler' : 'Modifier ma fiche'}</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Nom de l'Entreprise
                  </label>
                  <input
                    type="text"
                    disabled
                    value={exhibitor.name}
                    className="w-full px-3.5 py-2.5 bg-stone-100 border border-stone-200 rounded-lg text-sm text-stone-600 font-medium cursor-not-allowed"
                  />
                  <span className="text-[11px] text-stone-400 mt-1 block">Modifiable uniquement auprès du commissariat général</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Secteur d'Activité
                  </label>
                  <input
                    type="text"
                    disabled
                    value={exhibitor.sector}
                    className="w-full px-3.5 py-2.5 bg-stone-100 border border-stone-200 rounded-lg text-sm text-stone-600 font-medium cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Présentation / Pitch de l'Entreprise (Catalogue Officiel)
                </label>
                <textarea
                  rows={4}
                  disabled={!isEditingProfile}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm border ${
                    isEditingProfile
                      ? 'bg-white border-stone-300 focus:ring-2 focus:ring-[#367A4D] focus:border-transparent text-stone-900'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                  placeholder="Décrivez votre expertise, vos innovations et vos solutions pour les espaces verts au Maroc..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Site Web
                  </label>
                  <input
                    type="url"
                    disabled={!isEditingProfile}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm border ${
                      isEditingProfile
                        ? 'bg-white border-stone-300 focus:ring-2 focus:ring-[#367A4D] text-stone-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                    placeholder="https://votre-site.ma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Email Commercial
                  </label>
                  <input
                    type="email"
                    disabled={!isEditingProfile}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm border ${
                      isEditingProfile
                        ? 'bg-white border-stone-300 focus:ring-2 focus:ring-[#367A4D] text-stone-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Téléphone de Contact
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditingProfile}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm border ${
                      isEditingProfile
                        ? 'bg-white border-stone-300 focus:ring-2 focus:ring-[#367A4D] text-stone-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  />
                </div>
              </div>

              {/* Products & Solutions Tags */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Produits, Matériels et Solutions Exposés
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {products.map((p, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs font-medium text-stone-800"
                    >
                      <span>{p}</span>
                      {isEditingProfile && (
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(p)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>

                {isEditingProfile && (
                  <div className="flex gap-2 max-w-md">
                    <input
                      type="text"
                      value={newProduct}
                      onChange={(e) => setNewProduct(e.target.value)}
                      placeholder="Ex: Système d'arrosage connecté REUT"
                      className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-xs"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddProduct();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddProduct}
                      className="px-3 py-2 bg-stone-800 text-white rounded-lg text-xs font-medium hover:bg-black transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Ajouter
                    </button>
                  </div>
                )}
              </div>

              {isEditingProfile && (
                <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#123D2B] text-white rounded-lg text-xs font-semibold hover:bg-[#367A4D] transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <Save className="w-4 h-4" /> Enregistrer les modifications
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* TAB 4: ORDERS & SERVICES */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#367A4D] flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-stone-900 mb-1">Badges Exposants & Équipe</h4>
                <p className="text-xs text-stone-500 mb-4">
                  Quota inclus pour votre stand de {stand ? stand.surfaceSqMeters : exhibitor.surface} m² : <strong>4 badges exposants permanents</strong> avec accès prioritaire montage et démontage.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-700">Quota 4/4 Actif</span>
                <span className="text-stone-400">Inclus contrat</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Package className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-stone-900 mb-1">Branchements & Énergie</h4>
                <p className="text-xs text-stone-500 mb-4">
                  Coffret électrique 3 kW monophasé 220V installé sur votre stand par l'équipe technique de l'OFEC Casablanca.
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-700">Raccordement Validé</span>
                <span className="text-stone-400">Compris dans le pack</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-stone-900 mb-1">Support Commissariat Général</h4>
                <p className="text-xs text-stone-500 mb-4">
                  Besoin d'un aménagement spécifique, d'élingues, d'un point d'eau ou de mobilier supplémentaire ?
                </p>
              </div>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-[#367A4D] font-bold hover:underline flex items-center gap-1"
                >
                  Contacter l'assistance <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
