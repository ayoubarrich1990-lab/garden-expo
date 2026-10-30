import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageId, Exhibitor, Stand, EditionArchive, GalleryPhoto, ExhibitorInterview } from '../types';
import {
  ShieldAlert,
  Users,
  Building2,
  Layers,
  FileText,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Search,
  Filter,
  Save,
  X,
  MapPin,
  TrendingUp,
  Image as ImageIcon,
  Video,
  Award,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const {
    currentUser,
    loginAsDemo,
    exhibitors,
    stands,
    editions,
    gallery,
    interviews,
    addExhibitor,
    updateExhibitor,
    deleteExhibitor,
    assignStand,
    updateEdition,
    addGalleryPhoto,
    deleteGalleryPhoto,
    addInterview,
    deleteInterview,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'exhibitors' | 'stands' | 'editions' | 'gallery' | 'interviews'>('exhibitors');
  const [searchExhibitor, setSearchExhibitor] = useState('');
  const [isAddExhibitorOpen, setIsAddExhibitorOpen] = useState(false);
  const [editingExhibitor, setEditingExhibitor] = useState<Exhibitor | null>(null);

  // Form state for adding/editing exhibitor
  const [formName, setFormName] = useState('');
  const [formSector, setFormSector] = useState('Pépinières & Végétaux');
  const [formCity, setFormCity] = useState('Casablanca');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formStandNumber, setFormStandNumber] = useState('A-01');
  const [formSurface, setFormSurface] = useState<number>(36);

  // Form state for adding photo to gallery
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoEdition, setPhotoEdition] = useState('3ème Édition');
  const [photoCategory, setPhotoCategory] = useState<GalleryPhoto['category']>('stands');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');

  // Access check
  const isAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="bg-[#F5F6F3] min-h-screen py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 border border-stone-200 text-center shadow-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-['Outfit',sans-serif] text-[#123D2B] mb-2">
            Zone d'Administration Restreinte
          </h2>
          <p className="text-stone-600 mb-6 text-sm">
            Cet espace est réservé au Commissariat Général et aux administrateurs de Garden Expo Africa Maroc.
          </p>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-left text-xs text-amber-900 mb-6">
            <strong>Mode Démonstration & Évaluation :</strong>
            <p className="mt-1">
              Vous pouvez activer le rôle <em>Super Administrateur</em> en un clic pour tester toutes les fonctionnalités de modération,
              d'attribution de stands et de gestion de contenu.
            </p>
          </div>
          <button
            onClick={() => loginAsDemo('super_admin')}
            className="w-full px-5 py-3 bg-[#123D2B] text-white rounded-xl text-sm font-bold hover:bg-[#367A4D] transition-colors shadow-sm"
          >
            Activer l'accès Administrateur Démo
          </button>
        </div>
      </div>
    );
  }

  // KPIs
  const totalStands = stands.length;
  const reservedStands = stands.filter((s) => s.status === 'confirmed' || s.status === 'reserved').length;
  const occupancyRate = Math.round((reservedStands / totalStands) * 100);

  // Filtered exhibitors
  const filteredExhibitors = exhibitors.filter((e) =>
    e.name.toLowerCase().includes(searchExhibitor.toLowerCase()) ||
    e.standNumber.toLowerCase().includes(searchExhibitor.toLowerCase()) ||
    e.sector.toLowerCase().includes(searchExhibitor.toLowerCase())
  );

  const handleOpenAddExhibitor = () => {
    setEditingExhibitor(null);
    setFormName('');
    setFormSector('Pépinières & Végétaux');
    setFormCity('Casablanca');
    setFormEmail('contact@entreprise.ma');
    setFormPhone('+212 5 22 00 00 00');
    setFormStandNumber('A-01');
    setFormSurface(36);
    setIsAddExhibitorOpen(true);
  };

  const handleSaveExhibitorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingExhibitor) {
      updateExhibitor({
        ...editingExhibitor,
        name: formName,
        sector: formSector,
        city: formCity,
        email: formEmail,
        phone: formPhone,
        standNumber: formStandNumber,
        surface: formSurface,
      });
    } else {
      const newExh: Exhibitor = {
        id: 'exh-' + Date.now(),
        name: formName,
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&auto=format&fit=crop&q=80',
        description: `Entreprise marocaine leader dans le domaine : ${formSector}.`,
        sector: formSector,
        category: 'Exposant',
        country: 'Maroc',
        city: formCity,
        email: formEmail,
        phone: formPhone,
        standNumber: formStandNumber,
        hall: formStandNumber.startsWith('A') ? 'Hall A - Aménagement & Paysage' : 'Hall B - Matériels & Piscines',
        surface: formSurface,
        featuredProducts: ['Solutions professionnelles', 'Catalogue 2026/2027'],
        edition: '4ème Édition (2026)',
        participationStatus: 'confirmed',
        representative: {
          name: 'Directeur Commercial',
          jobTitle: 'Responsable Stand',
          email: formEmail,
          phone: formPhone,
        },
      };
      addExhibitor(newExh);
    }

    setIsAddExhibitorOpen(false);
    setEditingExhibitor(null);
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle || !photoUrl) return;

    addGalleryPhoto({
      id: 'gal-' + Date.now(),
      title: photoTitle,
      edition: photoEdition,
      category: photoCategory,
      imageUrl: photoUrl,
      caption: photoCaption || photoTitle,
    });

    setIsAddPhotoOpen(false);
    setPhotoTitle('');
    setPhotoUrl('');
    setPhotoCaption('');
  };

  return (
    <div className="bg-[#F5F6F3] min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-[#123D2B] text-white py-10 border-b border-[#202620]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A5C96B] uppercase tracking-wider mb-2">
                <span>Commissariat Général · Back-Office Officiel</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white">
                Console d'Administration
              </h1>
              <p className="text-stone-300 text-sm mt-1">
                Supervision du salon Garden Expo Africa · Casablanca (OFEC) · Édition 2026
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-900/60 text-[#A5C96B] border border-[#367A4D] px-3 py-1.5 rounded-lg font-bold">
                Connecté : {currentUser?.fullName} ({currentUser?.role})
              </span>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex items-center gap-2 mt-8 border-b border-white/15 overflow-x-auto">
            <button
              onClick={() => setActiveTab('exhibitors')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'exhibitors'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Gestion des Exposants ({exhibitors.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('stands')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'stands'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Stands & Taux d'Occupation ({occupancyRate}%)</span>
            </button>
            <button
              onClick={() => setActiveTab('editions')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'editions'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Éditions Historiques ({editions.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'gallery'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Galerie Média ({gallery.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'interviews'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Témoignages & Best-Of ({interviews.length})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI STATS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              Exposants Confirmés
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#123D2B] font-['Outfit',sans-serif]">
                {exhibitors.length}
              </span>
              <span className="text-xs text-emerald-600 font-bold">+12% vs Éd. 3</span>
            </div>
            <p className="text-xs text-stone-500 mt-1">Maroc & International</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              Stands Réservés
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#367A4D] font-['Outfit',sans-serif]">
                {reservedStands} / {totalStands}
              </span>
              <span className="text-xs text-stone-600 font-semibold">{occupancyRate}%</span>
            </div>
            <p className="text-xs text-stone-500 mt-1">{totalStands - reservedStands} emplacements libres</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              Visiteurs Enregistrés
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#123D2B] font-['Outfit',sans-serif]">
                8 840+
              </span>
              <span className="text-xs text-emerald-600 font-bold">Objectif 10k</span>
            </div>
            <p className="text-xs text-stone-500 mt-1">Inscriptions professionnelles B2B</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
              Superficie Totale
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#123D2B] font-['Outfit',sans-serif]">
                10 000 m²
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">Halls A & B · OFEC Casablanca</p>
          </div>
        </div>

        {/* TAB 1: EXHIBITORS MANAGEMENT */}
        {activeTab === 'exhibitors' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#123D2B] font-['Outfit',sans-serif]">
                  Répertoire et Modération des Exposants
                </h3>
                <p className="text-xs text-stone-500">
                  Gérez les entreprises inscrites, attribuez les stands et synchronisez les fiches de l'annuaire officiel.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchExhibitor}
                    onChange={(e) => setSearchExhibitor(e.target.value)}
                    placeholder="Filtrer exposant ou stand..."
                    className="pl-9 pr-4 py-2 border border-stone-200 rounded-lg text-xs w-48 sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#367A4D]"
                  />
                </div>
                <button
                  onClick={handleOpenAddExhibitor}
                  className="px-4 py-2 bg-[#123D2B] text-white rounded-lg text-xs font-semibold hover:bg-[#367A4D] transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvel Exposant</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-xs font-semibold text-stone-500 uppercase tracking-wider bg-stone-50">
                    <th className="py-3 px-4">Entreprise</th>
                    <th className="py-3 px-4">Secteur</th>
                    <th className="py-3 px-4">Stand / Hall</th>
                    <th className="py-3 px-4">Superficie</th>
                    <th className="py-3 px-4">Ville</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredExhibitors.map((exh) => (
                    <tr key={exh.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={exh.logo}
                            alt={exh.name}
                            className="w-9 h-9 rounded object-contain bg-white border border-stone-200 p-0.5"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block text-xs sm:text-sm">{exh.name}</span>
                            <span className="text-[11px] text-stone-500">{exh.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-stone-700">{exh.sector}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-xs bg-[#123D2B] text-white px-2 py-0.5 rounded">
                          {exh.standNumber}
                        </span>
                        <span className="text-[11px] text-stone-500 block mt-0.5">{exh.hall}</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-stone-900">{exh.surface} m²</td>
                      <td className="py-3.5 px-4 text-xs text-stone-600">{exh.city}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Confirmé
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingExhibitor(exh);
                              setFormName(exh.name);
                              setFormSector(exh.sector);
                              setFormCity(exh.city);
                              setFormEmail(exh.email);
                              setFormPhone(exh.phone);
                              setFormStandNumber(exh.standNumber);
                              setFormSurface(exh.surface);
                              setIsAddExhibitorOpen(true);
                            }}
                            className="p-1.5 text-stone-600 hover:text-[#123D2B] hover:bg-stone-100 rounded"
                            title="Modifier"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Supprimer l'exposant "${exh.name}" ?`)) {
                                deleteExhibitor(exh.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: STANDS & OCCUPANCY */}
        {activeTab === 'stands' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-xl font-bold text-[#123D2B] font-['Outfit',sans-serif] mb-2">
                Cartographie & Attribution des Stands (Halls A & B)
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Attribution directe d'un stand libre à une entreprise exposante enregistrée.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stands.map((st) => {
                  const assignedExh = exhibitors.find((e) => e.standNumber === st.number || e.id === st.exhibitorId);

                  return (
                    <div
                      key={st.id}
                      className={`p-4 rounded-xl border flex items-center justify-between ${
                        st.status === 'confirmed' || assignedExh
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-[#123D2B] bg-stone-200/60 px-2 py-0.5 rounded">
                            {st.number}
                          </span>
                          <span className="text-xs font-semibold text-stone-700">{st.hall}</span>
                        </div>
                        <div className="text-xs text-stone-500 mt-1">
                          {st.surfaceSqMeters} m² ({st.dimensions}) · Formule {st.type}
                        </div>
                        <div className="mt-2 text-xs font-bold text-stone-900">
                          {assignedExh ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {assignedExh.name}
                            </span>
                          ) : (
                            <span className="text-stone-400 italic">Emplacement Disponible</span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <select
                          value={assignedExh?.id || ''}
                          onChange={(e) => {
                            if (e.target.value) {
                              assignStand(st.id, e.target.value);
                            }
                          }}
                          className="text-xs border border-stone-300 rounded-lg p-1.5 bg-white text-stone-700 focus:ring-1 focus:ring-[#367A4D]"
                        >
                          <option value="">-- Attribuer --</option>
                          {exhibitors.map((ex) => (
                            <option key={ex.id} value={ex.id}>
                              {ex.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EDITIONS ARCHIVES MANAGEMENT */}
        {activeTab === 'editions' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-xl font-bold text-[#123D2B] font-['Outfit',sans-serif] mb-2">
                Gestion des Archives Historiques des Éditions
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Édition directe des contenus, statistiques officielles et points forts pour chaque édition du salon à Casablanca.
              </p>

              <div className="space-y-6">
                {editions.map((ed) => (
                  <div key={ed.id} className="p-6 border border-stone-200 rounded-xl bg-stone-50/50 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                      <div>
                        <span className="text-lg font-black font-['Outfit',sans-serif] text-[#123D2B]">
                          {ed.title} ({ed.year})
                        </span>
                        <p className="text-xs text-stone-600">{ed.dates} · {ed.location}</p>
                      </div>
                      <span className="text-xs font-bold bg-[#367A4D] text-white px-3 py-1 rounded-full self-start">
                        {ed.theme}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-lg border border-stone-200">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Exposants</span>
                        <span className="font-extrabold text-sm text-[#123D2B]">{ed.stats.exhibitorsCount}</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-stone-200">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Visiteurs</span>
                        <span className="font-extrabold text-sm text-[#123D2B]">{ed.stats.visitorsCount}</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-stone-200">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Pays</span>
                        <span className="font-extrabold text-sm text-[#123D2B]">{ed.stats.countriesCount}</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-stone-200">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Surface</span>
                        <span className="font-extrabold text-sm text-[#123D2B]">{ed.stats.surfaceSqm}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-lg border border-stone-200">
                      {ed.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#123D2B] font-['Outfit',sans-serif]">
                  Médiathèque & Photothèque Officielle
                </h3>
                <p className="text-xs text-stone-500">
                  Ajoutez de nouveaux clichés des stands, des animations et des délégations officielles.
                </p>
              </div>
              <button
                onClick={() => setIsAddPhotoOpen(true)}
                className="px-4 py-2 bg-[#123D2B] text-white rounded-lg text-xs font-semibold hover:bg-[#367A4D] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((photo) => (
                <div key={photo.id} className="group relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100 aspect-4/3">
                  <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#A5C96B] font-bold block">
                        {photo.edition}
                      </span>
                      <p className="font-bold text-xs line-clamp-2">{photo.title}</p>
                    </div>
                    <button
                      onClick={() => deleteGalleryPhoto(photo.id)}
                      className="self-end p-1.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: INTERVIEWS */}
        {activeTab === 'interviews' && (
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-xl font-bold text-[#123D2B] font-['Outfit',sans-serif]">
                  Témoignages Vidéo "Ils Nous Font Confiance"
                </h3>
                <p className="text-xs text-stone-500">
                  Vidéos d'exposants diffusées sur la page d'accueil avec citation et vignette.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {interviews.map((item) => (
                <div key={item.id} className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50/50 flex flex-col justify-between">
                  <div className="relative aspect-video">
                    <img src={item.thumbnail} alt={item.companyName} className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {item.edition}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-stone-900 text-sm">{item.speakerName}</h4>
                    <p className="text-xs text-stone-500">{item.speakerTitle} · {item.companyName}</p>
                    <p className="text-xs text-stone-700 italic border-l-2 border-[#367A4D] pl-2 mt-2">
                      "{item.quote}"
                    </p>
                  </div>
                  <div className="p-3 border-t border-stone-100 flex justify-end">
                    <button
                      onClick={() => deleteInterview(item.id)}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" /> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT EXHIBITOR */}
      {isAddExhibitorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-[#123D2B]">
                {editingExhibitor ? 'Modifier Exposant' : 'Ajouter un Nouvel Exposant'}
              </h3>
              <button onClick={() => setIsAddExhibitorOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExhibitorSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Raison Sociale / Entreprise</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Ex: Atlas Jardins Maroc"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Secteur</label>
                  <select
                    value={formSector}
                    onChange={(e) => setFormSector(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Pépinières & Végétaux">Pépinières & Végétaux</option>
                    <option value="Arrosage & Gestion de l'Eau">Arrosage & Gestion de l'Eau</option>
                    <option value="Piscines & Spas">Piscines & Spas</option>
                    <option value="Mobilier & Aménagement Extérieur">Mobilier & Aménagement Extérieur</option>
                    <option value="Matériels & Outillage Espaces Verts">Matériels & Outillage</option>
                    <option value="Éclairage Solaire & Extérieur">Éclairage Solaire</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Ville</label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Casablanca, Marrakech..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Numéro de Stand</label>
                  <input
                    type="text"
                    required
                    value={formStandNumber}
                    onChange={(e) => setFormStandNumber(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                    placeholder="A-12 ou B-05"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Superficie (m²)</label>
                  <input
                    type="number"
                    min={9}
                    max={300}
                    value={formSurface}
                    onChange={(e) => setFormSurface(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddExhibitorOpen(false)}
                  className="px-4 py-2 border rounded-lg text-stone-600 hover:bg-stone-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#123D2B] text-white rounded-lg font-semibold hover:bg-[#367A4D]"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PHOTO */}
      {isAddPhotoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-[#123D2B]">Ajouter une photo à la Galerie</h3>
              <button onClick={() => setIsAddPhotoOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Titre de la photo</label>
                <input
                  type="text"
                  required
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Ex: Exposition des palmiers d'alignement"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Édition</label>
                  <select
                    value={photoEdition}
                    onChange={(e) => setPhotoEdition(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="3ème Édition">3ème Édition (2025)</option>
                    <option value="2ème Édition">2ème Édition (2023)</option>
                    <option value="1ère Édition">1ère Édition (2022)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Catégorie</label>
                  <select
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="stands">Stands</option>
                    <option value="inauguration">Inauguration</option>
                    <option value="visitors">Visiteurs</option>
                    <option value="conferences">Conférences & B2B</option>
                    <option value="animations">Animations</option>
                    <option value="general">Vues Générales</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">URL de l'image</label>
                <input
                  type="url"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPhotoOpen(false)}
                  className="px-4 py-2 border rounded-lg text-stone-600 hover:bg-stone-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#123D2B] text-white rounded-lg font-semibold hover:bg-[#367A4D]"
                >
                  Ajouter à la galerie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
