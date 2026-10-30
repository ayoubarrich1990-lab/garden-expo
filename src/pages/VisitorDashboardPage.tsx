import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import {
  QrCode,
  Printer,
  Download,
  Bookmark,
  MapPin,
  Calendar,
  Clock,
  Building2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Share2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface VisitorDashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export const VisitorDashboardPage: React.FC<VisitorDashboardPageProps> = ({ onNavigate }) => {
  const { currentUser, visitorAccount, exhibitors, toggleFavoriteExhibitor } = useApp();
  const badgeCardRef = useRef<HTMLDivElement>(null);

  if (!currentUser) {
    return (
      <div className="bg-[#F5F6F3] min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-stone-200 text-center shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#367A4D]">
            <QrCode className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-['Outfit',sans-serif] text-[#123D2B] mb-2">
            Espace Visiteur Professionnel
          </h2>
          <p className="text-stone-600 mb-6 text-sm">
            Connectez-vous pour générer votre E-Badge officiel nominatif, préparer votre parcours de visite
            et retrouver vos exposants favoris.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('visitors')}
              className="px-5 py-2.5 bg-[#123D2B] text-white rounded-lg text-sm font-semibold hover:bg-[#123D2B]/90 transition-colors"
            >
              Demander mon badge gratuit
            </button>
            <button
              onClick={() => onNavigate('directory')}
              className="px-5 py-2.5 bg-stone-100 text-stone-700 rounded-lg text-sm font-semibold hover:bg-stone-200 transition-colors"
            >
              Explorer les exposants
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Favorite exhibitors
  const favoriteExhibitorList = exhibitors.filter((e) =>
    visitorAccount?.favoriteExhibitorIds.includes(e.id)
  );

  const handlePrintBadge = () => {
    window.print();
  };

  const handleDownloadBadgeText = () => {
    const badgeNumber = visitorAccount?.badgeNumber || 'GEA-VIS-26-88412';
    const element = document.createElement('a');
    const file = new Blob(
      [
        `============================================================\n` +
        `E-BADGE OFFICIEL - ACCÈS PROFESSIONNEL COUPE-FILE\n` +
        `GARDEN EXPO AFRICA - 4ÈME ÉDITION CASABLANCA MAROC\n` +
        `Lieu : OFEC (Office des Foires et Expositions de Casablanca)\n` +
        `Dates : 22 - 25 Octobre 2026\n` +
        `============================================================\n` +
        `Numéro de Badge : ${badgeNumber}\n` +
        `Titulaire : ${currentUser.fullName}\n` +
        `Fonction : ${currentUser.jobTitle || 'Professionnel du Secteur'}\n` +
        `Entreprise : ${currentUser.companyName || 'Indépendant'}\n` +
        `Ville/Pays : ${currentUser.city || 'Casablanca'}, ${currentUser.country || 'Maroc'}\n` +
        `Catégorie : VISITEUR PROFESSIONNEL PRIVILÈGE (B2B)\n` +
        `Accès : Hall A (Aménagement & Paysage) & Hall B (Matériels & Piscines)\n` +
        `============================================================\n` +
        `Présentez ce QR Code ou ce récapitulatif aux bornes d'accueil\n` +
        `pour récupérer votre tour de cou officiel à l'entrée principale.\n` +
        `============================================================\n`
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `E-BADGE-${badgeNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-[#F5F6F3] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#123D2B] text-white py-12 border-b border-[#202620]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A5C96B] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Espace Visiteur B2B Certifié · Casablanca</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white">
                Bienvenue, {currentUser.fullName}
              </h1>
              <p className="text-stone-300 text-sm mt-1">
                {currentUser.jobTitle ? `${currentUser.jobTitle} · ` : ''}{currentUser.companyName || 'Professionnel'} · {currentUser.city || 'Maroc'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrintBadge}
                className="px-4 py-2.5 bg-white text-[#123D2B] rounded-xl text-xs font-bold hover:bg-stone-100 transition-colors flex items-center gap-2 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer mon Badge</span>
              </button>
              <button
                onClick={handleDownloadBadgeText}
                className="px-4 py-2.5 bg-[#367A4D] text-white rounded-xl text-xs font-bold hover:bg-[#367A4D]/80 transition-colors flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger (.txt)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: E-BADGE DIGITAL CARD (PRINTABLE) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-4">
              <div
                ref={badgeCardRef}
                className="bg-white rounded-3xl border-2 border-[#123D2B] overflow-hidden shadow-xl"
              >
                {/* Top Badge Lanyard hole simulation */}
                <div className="bg-[#123D2B] p-4 text-center relative border-b-4 border-[#A5C96B]">
                  <div className="w-12 h-2.5 bg-white/20 rounded-full mx-auto mb-3" />
                  <div className="text-[11px] font-black uppercase tracking-widest text-[#A5C96B]">
                    GARDEN EXPO AFRICA 2026
                  </div>
                  <div className="text-xs text-white/80 font-medium">
                    Office des Foires et Expositions de Casablanca (OFEC)
                  </div>
                </div>

                {/* Badge Body */}
                <div className="p-6 text-center space-y-4">
                  <div className="inline-block px-3 py-1 bg-emerald-50 text-[#123D2B] border border-emerald-200 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
                    Pass Visiteur Professionnel
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-[#123D2B] font-['Outfit',sans-serif]">
                      {currentUser.fullName}
                    </h2>
                    <p className="text-sm font-semibold text-[#367A4D] mt-0.5">
                      {currentUser.jobTitle || 'Architecte Paysagiste'}
                    </p>
                    <p className="text-xs text-stone-500 font-medium">
                      {currentUser.companyName || 'Atelier Paysage & Aménagement'}
                    </p>
                  </div>

                  {/* High fidelity SVG QR Code Representation */}
                  <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 max-w-[210px] mx-auto">
                    <svg
                      viewBox="0 0 120 120"
                      className="w-full h-auto text-[#123D2B]"
                      fill="currentColor"
                    >
                      {/* Top-Left Finder */}
                      <rect x="10" y="10" width="30" height="30" rx="3" />
                      <rect x="16" y="16" width="18" height="18" fill="white" />
                      <rect x="20" y="20" width="10" height="10" fill="currentColor" />

                      {/* Top-Right Finder */}
                      <rect x="80" y="10" width="30" height="30" rx="3" />
                      <rect x="86" y="16" width="18" height="18" fill="white" />
                      <rect x="90" y="20" width="10" height="10" fill="currentColor" />

                      {/* Bottom-Left Finder */}
                      <rect x="10" y="80" width="30" height="30" rx="3" />
                      <rect x="16" y="86" width="18" height="18" fill="white" />
                      <rect x="20" y="90" width="10" height="10" fill="currentColor" />

                      {/* Realistic QR Data Matrix Patterns */}
                      <rect x="45" y="12" width="6" height="6" />
                      <rect x="55" y="12" width="6" height="6" />
                      <rect x="65" y="12" width="6" height="6" />
                      <rect x="45" y="22" width="6" height="6" />
                      <rect x="65" y="22" width="6" height="6" />
                      <rect x="55" y="32" width="6" height="6" />

                      <rect x="12" y="45" width="6" height="6" />
                      <rect x="22" y="45" width="6" height="6" />
                      <rect x="32" y="55" width="6" height="6" />
                      <rect x="12" y="65" width="6" height="6" />

                      <rect x="45" y="45" width="8" height="8" fill="#367A4D" />
                      <rect x="57" y="45" width="8" height="8" />
                      <rect x="69" y="45" width="8" height="8" fill="#367A4D" />
                      <rect x="45" y="57" width="8" height="8" />
                      <rect x="57" y="57" width="8" height="8" fill="#123D2B" />
                      <rect x="69" y="57" width="8" height="8" />
                      <rect x="45" y="69" width="8" height="8" fill="#367A4D" />
                      <rect x="57" y="69" width="8" height="8" />
                      <rect x="69" y="69" width="8" height="8" fill="#367A4D" />

                      <rect x="85" y="45" width="6" height="6" />
                      <rect x="95" y="45" width="6" height="6" />
                      <rect x="85" y="55" width="6" height="6" />
                      <rect x="105" y="55" width="6" height="6" />
                      <rect x="95" y="65" width="6" height="6" />

                      <rect x="45" y="85" width="6" height="6" />
                      <rect x="55" y="85" width="6" height="6" />
                      <rect x="65" y="95" width="6" height="6" />
                      <rect x="45" y="105" width="6" height="6" />
                      <rect x="85" y="85" width="6" height="6" />
                      <rect x="95" y="95" width="6" height="6" />
                      <rect x="105" y="85" width="6" height="6" />
                      <rect x="85" y="105" width="6" height="6" />
                      <rect x="105" y="105" width="6" height="6" />
                    </svg>
                    <div className="mt-2 font-mono text-[11px] font-bold text-stone-700 tracking-wider">
                      {visitorAccount?.badgeNumber || 'GEA-VIS-26-88412'}
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-500 leading-snug">
                    Accès direct aux 2 halls d'exposition · Conférences & Démonstrations B2B incluses
                  </div>
                </div>

                {/* Bottom strip */}
                <div className="bg-stone-100 p-3 text-center border-t border-stone-200 text-[10px] text-stone-600 font-semibold uppercase tracking-wider">
                  22 au 25 Octobre 2026 · Casablanca
                </div>
              </div>

              {/* Tips */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs text-stone-700 space-y-1.5">
                <div className="font-bold text-[#123D2B] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#367A4D]" />
                  <span>Accès Rapide Coupe-File</span>
                </div>
                <p>
                  Présentez ce QR Code directement depuis votre smartphone aux bornes électroniques d'entrée de l'OFEC Casablanca.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SAVED EXHIBITORS & VISIT PLAN */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header: Favorites */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-xl font-bold text-[#123D2B] font-['Outfit',sans-serif] flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-[#367A4D]" />
                    Ma Sélection d'Exposants Favoris ({favoriteExhibitorList.length})
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Consultez la liste des stands que vous prévoyez de visiter lors du salon.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('directory')}
                  className="px-3.5 py-1.5 bg-[#123D2B] text-white rounded-lg text-xs font-semibold hover:bg-[#367A4D] transition-colors flex items-center gap-1"
                >
                  <span>Ajouter des exposants</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {favoriteExhibitorList.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <Bookmark className="w-12 h-12 mx-auto text-stone-300 mb-2" />
                  <p className="text-sm font-medium text-stone-600">Aucun exposant enregistré dans vos favoris</p>
                  <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                    Parcourez l'annuaire interactif pour sélectionner les entreprises que vous souhaitez rencontrer.
                  </p>
                  <button
                    onClick={() => onNavigate('directory')}
                    className="mt-4 px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-colors"
                  >
                    Ouvrir l'annuaire interactif
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {favoriteExhibitorList.map((exh) => (
                    <div
                      key={exh.id}
                      className="p-4 bg-stone-50 border border-stone-200/80 rounded-xl hover:border-stone-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={exh.logo}
                          alt={exh.name}
                          className="w-12 h-12 rounded-lg object-contain bg-white border border-stone-200 p-1 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm">{exh.name}</h4>
                          <p className="text-xs text-stone-500">{exh.sector}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-bold text-white bg-[#123D2B] px-2 py-0.5 rounded">
                              Stand {exh.standNumber}
                            </span>
                            <span className="text-xs text-stone-600 font-medium">{exh.hall}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            onNavigate('directory');
                          }}
                          className="px-3 py-1.5 bg-white border border-stone-300 text-stone-700 hover:text-[#123D2B] hover:border-[#123D2B] rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#367A4D]" />
                          <span>Situer stand</span>
                        </button>
                        <button
                          onClick={() => toggleFavoriteExhibitor(exh.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Retirer des favoris"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Practical Visiting Guide Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-lg font-bold text-[#123D2B] font-['Outfit',sans-serif] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#367A4D]" />
                Guide Pratique du Visiteur · Casablanca
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-[#123D2B] mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#367A4D]" /> Horaires d'Ouverture
                  </div>
                  <p>Du Jeudi au Dimanche : 09h30 – 19h00 en continu.</p>
                  <p className="text-stone-500 mt-1">Accueil visiteurs dès 09h00.</p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-[#123D2B] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#367A4D]" /> Accès & Parking OFEC
                  </div>
                  <p>Rue Bouabid, en face de la Mosquée Hassan II, Casablanca.</p>
                  <p className="text-stone-500 mt-1">Parking gardé réservé aux visiteurs munis de badge.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
