import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PageId, Exhibitor, Stand, EditionArchive, GalleryPhoto, ExhibitorInterview } from '../types';
import { SupabaseDataService } from '../services/supabaseService';
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
  Database,
  RefreshCw,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Mail,
  FileSpreadsheet,
  Code,
  Sparkles,
  Clock,
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const {
    currentUser,
    loginWithPassword,
    exhibitors,
    stands,
    editions,
    gallery,
    interviews,
    invoices,
    addExhibitor,
    updateExhibitor,
    deleteExhibitor,
    assignStand,
    updateEdition,
    addGalleryPhoto,
    deleteGalleryPhoto,
    addInterview,
    deleteInterview,
    supabaseStatus,
    isSyncing,
    checkSupabaseHealth,
    seedSupabaseDatabase,
    refreshFromSupabase,
    configureSupabaseKeys,
    getSupabaseConfig,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'exhibitors' | 'stands' | 'editions' | 'gallery' | 'interviews' | 'bookings' | 'supabase'>('exhibitors');
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

  // Supabase administration state
  const initialConfig = getSupabaseConfig();
  const [supabaseUrlInput, setSupabaseUrlInput] = useState(initialConfig.url);
  const [supabaseAnonKeyInput, setSupabaseAnonKeyInput] = useState(initialConfig.anonKey);
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [isSeedingSupabase, setIsSeedingSupabase] = useState(false);
  const [supabaseActionMsg, setSupabaseActionMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Demandes & Inscriptions en direct
  const [badgesList, setBadgesList] = useState<any[]>([]);
  const [bookingsList, setBookingsList] = useState<any[]>([]);
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [isLoadingDemands, setIsLoadingDemands] = useState(false);

  // Load demands when opening bookings or supabase tab
  useEffect(() => {
    if (activeTab === 'bookings' || activeTab === 'supabase') {
      setIsLoadingDemands(true);
      Promise.all([
        SupabaseDataService.fetchVisitorBadges(),
        SupabaseDataService.fetchStandBookings(),
        SupabaseDataService.fetchContactMessages(),
      ]).then(([badges, bookings, messages]) => {
        setBadgesList(badges);
        setBookingsList(bookings);
        setMessagesList(messages);
        setIsLoadingDemands(false);
      });
    }
  }, [activeTab]);

  // Admin password login state
  const [adminEmail, setAdminEmail] = useState('admin@gardenexpo.ma');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // Access check
  const isAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError(null);
    const result = loginWithPassword(adminEmail, adminPassword);
    if (!result.success) {
      setAdminLoginError(result.error || "Mot de passe incorrect ou compte non autorisé.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-[#F5F6F3] min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-xl">
          <div className="w-14 h-14 bg-[#123D2B]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#123D2B]">
            <ShieldAlert className="w-7 h-7 text-[#123D2B]" />
          </div>
          <h2 className="text-2xl font-bold font-['Outfit',sans-serif] text-[#123D2B] mb-1 text-center">
            Console Back-Office
          </h2>
          <p className="text-stone-500 mb-6 text-xs text-center">
            Espace d'administration réservé au Commissariat Général de Garden Expo Africa.
          </p>

          {adminLoginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{adminLoginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 font-bold mb-1">Identifiant administrateur</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@gardenexpo.ma"
                required
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#367A4D] bg-white text-stone-900"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">Mot de passe de sécurité</label>
              <div className="relative">
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Saisissez le mot de passe"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 border border-stone-300 rounded-xl focus:outline-none focus:border-[#367A4D] bg-white text-stone-900"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  aria-label={showAdminPassword ? 'Masquer' : 'Afficher'}
                >
                  {showAdminPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#123D2B] hover:bg-[#367A4D] text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Se connecter à la console</span>
            </button>
          </form>

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

  // Supabase handlers
  const handleTestSupabaseConnection = async () => {
    setIsTestingSupabase(true);
    setSupabaseActionMsg(null);
    try {
      const result = await checkSupabaseHealth();
      if (result.isConnected) {
        setSupabaseActionMsg({
          type: 'success',
          text: `Connexion PostgreSQL Supabase vérifiée avec succès (${result.latencyMs || 0}ms). Tables détectées : ${result.tablesFound?.join(', ') || 'Toutes'}.`,
        });
      } else {
        setSupabaseActionMsg({
          type: 'error',
          text: result.message || 'Impossible de joindre la base Supabase.',
        });
      }
    } catch (err: any) {
      setSupabaseActionMsg({ type: 'error', text: err.message || 'Erreur lors du test' });
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleSaveSupabaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestingSupabase(true);
    setSupabaseActionMsg(null);
    try {
      const res = await configureSupabaseKeys(supabaseUrlInput.trim(), supabaseAnonKeyInput.trim());
      if (res.success) {
        setSupabaseActionMsg({ type: 'success', text: res.message });
      } else {
        setSupabaseActionMsg({ type: 'error', text: res.message });
      }
    } catch (err: any) {
      setSupabaseActionMsg({ type: 'error', text: err.message || 'Erreur enregistrement' });
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleSeedSupabase = async () => {
    setIsSeedingSupabase(true);
    setSupabaseActionMsg(null);
    try {
      const res = await seedSupabaseDatabase();
      if (res.success) {
        setSupabaseActionMsg({
          type: 'success',
          text: 'Base de données Supabase initialisée et synchronisée avec les stands, exposants et archives officielles.',
        });
      } else {
        setSupabaseActionMsg({
          type: 'info',
          text: res.message || "L'initialisation n'a pas pu être réalisée ou les tables contiennent déjà des données.",
        });
      }
    } catch (err: any) {
      setSupabaseActionMsg({ type: 'error', text: err.message || 'Erreur initialisation' });
    } finally {
      setIsSeedingSupabase(false);
    }
  };

  const handleCopySql = () => {
    const sqlText = `-- GARDEN EXPO AFRICA MAROC - EXÉCUTER DANS LE SQL EDITOR DE SUPABASE\n-- Schéma complet disponible dans le fichier /supabase/schema.sql du projet.`;
    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
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

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Supabase status indicator pill */}
              <button
                type="button"
                onClick={() => setActiveTab('supabase')}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition-colors flex items-center gap-2 cursor-pointer ${
                  supabaseStatus.isConnected
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900'
                    : 'bg-amber-950/80 text-amber-300 border-amber-500/50 hover:bg-amber-900'
                }`}
                title="Cliquez pour configurer la base Supabase"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    supabaseStatus.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <Database className="w-3.5 h-3.5" />
                <span>
                  {supabaseStatus.isConnected ? 'PostgreSQL Connecté' : 'Supabase : À Connecter'}
                </span>
              </button>

              <span className="text-xs bg-emerald-900/60 text-[#A5C96B] border border-[#367A4D] px-3 py-1.5 rounded-lg font-bold">
                Connecté : {currentUser?.fullName} ({currentUser?.role})
              </span>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex items-center gap-2 mt-8 border-b border-white/15 overflow-x-auto pb-0">
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
            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'bookings'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>
                Demandes & Inscriptions (
                {badgesList.length + bookingsList.length + messagesList.length > 0
                  ? badgesList.length + bookingsList.length + messagesList.length
                  : 'En direct'}
                )
              </span>
            </button>
            <button
              onClick={() => setActiveTab('supabase')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'supabase'
                  ? 'border-[#A5C96B] text-[#A5C96B] font-semibold'
                  : 'border-transparent text-stone-300 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Base Supabase</span>
              {supabaseStatus.isConnected && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              )}
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

        {/* TAB 6: DEMANDES & INSCRIPTIONS EN DIRECT (SUPABASE) */}
        {activeTab === 'bookings' && (
          <div className="space-y-8">
            {/* Header info */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Données Centralisées · Supabase PostgreSQL
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-[#123D2B] font-['Outfit',sans-serif]">
                  Demandes B2B, Badges Visiteurs & Messages
                </h3>
                <p className="text-xs text-stone-500">
                  Flux continu des inscriptions transmises par les formulaires officiels du site.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsLoadingDemands(true);
                  Promise.all([
                    SupabaseDataService.fetchVisitorBadges(),
                    SupabaseDataService.fetchStandBookings(),
                    SupabaseDataService.fetchContactMessages(),
                  ]).then(([badges, bookings, messages]) => {
                    setBadgesList(badges);
                    setBookingsList(bookings);
                    setMessagesList(messages);
                    setIsLoadingDemands(false);
                  });
                }}
                disabled={isLoadingDemands}
                className="px-4 py-2 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-2 self-start cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDemands ? 'animate-spin' : ''}`} />
                <span>Actualiser les flux</span>
              </button>
            </div>

            {/* SECTION 1: BADGES VISITEURS */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {badgesList.length}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 font-['Outfit',sans-serif]">
                      Badges Visiteurs Professionnels (Table : visitor_badges)
                    </h4>
                    <p className="text-[11px] text-stone-500">Demandes de pass délivrées aux donneurs d'ordre</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider bg-stone-50">
                      <th className="py-2.5 px-4">N° Badge</th>
                      <th className="py-2.5 px-4">Visiteur</th>
                      <th className="py-2.5 px-4">Organisme / Entreprise</th>
                      <th className="py-2.5 px-4">Profil B2B</th>
                      <th className="py-2.5 px-4">Contact</th>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {badgesList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-stone-400">
                          {isLoadingDemands ? 'Chargement des badges...' : 'Aucun badge enregistré pour le moment. Enregistrez un badge sur la page Visiteurs pour voir la ligne s\'afficher en direct.'}
                        </td>
                      </tr>
                    ) : (
                      badgesList.map((badge: any) => (
                        <tr key={badge.id || badge.badge_number} className="hover:bg-stone-50/80">
                          <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                            {badge.badge_number}
                          </td>
                          <td className="py-3 px-4 font-semibold text-stone-900">
                            {badge.full_name}
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            <div>{badge.company_name}</div>
                            <div className="text-[10px] text-stone-400">{badge.job_title}</div>
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px] font-medium">
                              {badge.visitor_profile}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            <div>{badge.email}</div>
                            <div className="text-[10px] text-stone-400">{badge.phone}</div>
                          </td>
                          <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                            {badge.registration_date}
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                              Actif
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 2: RÉSERVATIONS DE STANDS */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    {bookingsList.length}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 font-['Outfit',sans-serif]">
                      Demandes de Réservation de Stand & Devis (Table : stand_bookings)
                    </h4>
                    <p className="text-[11px] text-stone-500">Simulations soumises via l'Espace Exposants</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider bg-stone-50">
                      <th className="py-2.5 px-4">Réf. Devis</th>
                      <th className="py-2.5 px-4">Entreprise</th>
                      <th className="py-2.5 px-4">Interlocuteur</th>
                      <th className="py-2.5 px-4">Stand / Surface</th>
                      <th className="py-2.5 px-4">Estimation</th>
                      <th className="py-2.5 px-4">Contact</th>
                      <th className="py-2.5 px-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {bookingsList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-stone-400">
                          {isLoadingDemands ? 'Chargement des réservations...' : 'Aucune demande de stand pour le moment. Testez le simulateur sur la page Devenir Exposant pour voir la ligne s\'afficher.'}
                        </td>
                      </tr>
                    ) : (
                      bookingsList.map((book: any) => (
                        <tr key={book.id || book.reference} className="hover:bg-stone-50/80">
                          <td className="py-3 px-4 font-mono font-bold text-blue-700">
                            {book.reference}
                          </td>
                          <td className="py-3 px-4 font-semibold text-stone-900">
                            {book.company_name}
                            <span className="text-[10px] text-stone-400 block">{book.city || 'Casablanca'}</span>
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            {book.contact_name}
                            <span className="text-[10px] text-stone-400 block">{book.job_title}</span>
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            <span className="font-bold text-stone-900">{book.surface_sq_meters} m²</span> ({book.stand_type})
                          </td>
                          <td className="py-3 px-4 font-bold text-stone-900 font-mono">
                            {Number(book.estimated_price_mad).toLocaleString('fr-FR')} MAD
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            <div>{book.email}</div>
                            <div className="text-[10px] text-stone-400">{book.phone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                              {book.status || 'En attente'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 3: MESSAGES DE CONTACT */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-xs">
                    {messagesList.length}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900 font-['Outfit',sans-serif]">
                      Messages Reçus (Table : contact_messages)
                    </h4>
                    <p className="text-[11px] text-stone-500">Demandes d'informations adressées au Comité</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider bg-stone-50">
                      <th className="py-2.5 px-4">Expéditeur</th>
                      <th className="py-2.5 px-4">Objet</th>
                      <th className="py-2.5 px-4">Message</th>
                      <th className="py-2.5 px-4">Coordonnées</th>
                      <th className="py-2.5 px-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {messagesList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-stone-400">
                          {isLoadingDemands ? 'Chargement des messages...' : 'Aucun message dans la boîte pour le moment.'}
                        </td>
                      </tr>
                    ) : (
                      messagesList.map((msg: any) => (
                        <tr key={msg.id} className="hover:bg-stone-50/80">
                          <td className="py-3 px-4 font-semibold text-stone-900">
                            {msg.name}
                          </td>
                          <td className="py-3 px-4 font-medium text-emerald-800">
                            {msg.subject}
                          </td>
                          <td className="py-3 px-4 text-stone-600 max-w-xs truncate">
                            {msg.message}
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            <div>{msg.email}</div>
                            <div className="text-[10px] text-stone-400">{msg.phone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px]">
                              {msg.status || 'Non lu'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: GESTION & ÉTAT SUPABASE POSTGRESQL */}
        {activeTab === 'supabase' && (
          <div className="space-y-8">
            {/* Status card avec indicateur visuel Connecté / Non connecté / Erreur */}
            <div className={`p-6 rounded-2xl border shadow-xs transition-colors ${
              supabaseStatus.status === 'connected'
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                : supabaseStatus.status === 'error'
                ? 'bg-rose-50/70 border-rose-300 text-rose-950'
                : 'bg-stone-50 border-stone-300 text-stone-800'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    supabaseStatus.status === 'connected'
                      ? 'bg-emerald-600 text-white'
                      : supabaseStatus.status === 'error'
                      ? 'bg-rose-600 text-white'
                      : 'bg-stone-500 text-white'
                  }`}>
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {/* Indicateur visuel officiel : Connecté / Non connecté / Erreur */}
                      {supabaseStatus.status === 'connected' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 border border-emerald-300 text-emerald-800">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Connecté
                        </span>
                      )}
                      {supabaseStatus.status === 'not_configured' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-200 border border-stone-300 text-stone-700">
                          <span className="w-2 h-2 rounded-full bg-stone-400" />
                          Non connecté
                        </span>
                      )}
                      {supabaseStatus.status === 'error' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 border border-rose-300 text-rose-800">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          Erreur
                        </span>
                      )}

                      <span className="font-extrabold text-sm font-['Outfit',sans-serif]">
                        {supabaseStatus.status === 'connected'
                          ? 'Base PostgreSQL Supabase Opérationnelle'
                          : supabaseStatus.status === 'error'
                          ? 'Vérification Supabase Requise'
                          : 'Configuration Supabase Requise'}
                      </span>

                      {typeof supabaseStatus.latencyMs === 'number' && (
                        <span className="text-xs bg-white/80 border border-stone-200 text-stone-700 font-mono px-2 py-0.5 rounded-md font-semibold">
                          Latence : {supabaseStatus.latencyMs} ms
                        </span>
                      )}
                    </div>

                    <p className="text-xs leading-relaxed opacity-90 max-w-2xl font-medium">
                      {supabaseStatus.message}
                    </p>

                    {supabaseStatus.tablesFound && supabaseStatus.tablesFound.length > 0 && (
                      <div className="mt-2 text-[11px] flex flex-wrap items-center gap-1">
                        <span className="font-semibold text-emerald-800">Tables détectées en base :</span>
                        {supabaseStatus.tablesFound.map((tbl) => (
                          <span key={tbl} className="bg-white/90 border border-emerald-200 text-emerald-900 font-mono px-1.5 py-0.5 rounded text-[10px]">
                            {tbl}
                          </span>
                        ))}
                      </div>
                    )}

                    {supabaseStatus.lastChecked && (
                      <span className="text-[10px] opacity-70 block mt-1">
                        Dernier test réseau : {supabaseStatus.lastChecked}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={handleTestSupabaseConnection}
                    disabled={isTestingSupabase}
                    className="px-4 py-2.5 bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingSupabase ? 'animate-spin text-[#123D2B]' : ''}`} />
                    <span>{isTestingSupabase ? 'Test en cours...' : 'Tester réellement la connexion'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={refreshFromSupabase}
                    disabled={isSyncing || !supabaseStatus.isConnected}
                    className="px-4 py-2.5 bg-[#123D2B] text-white hover:bg-[#367A4D] disabled:opacity-40 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Synchroniser maintenant</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Notification message */}
            {supabaseActionMsg && (
              <div className={`p-4 rounded-xl text-xs flex items-center gap-3 border ${
                supabaseActionMsg.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : supabaseActionMsg.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}>
                {supabaseActionMsg.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <span>{supabaseActionMsg.text}</span>
              </div>
            )}

            {/* Two Columns: Config & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Configuration Form */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <h4 className="font-bold text-base text-[#123D2B] font-['Outfit',sans-serif]">
                      Coordonnées du Projet Supabase
                    </h4>
                    <p className="text-xs text-stone-500">
                      Vous pouvez les renseigner dans <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-700">.env</code> ou directement ici.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono bg-stone-100 text-stone-600 px-2 py-1 rounded">
                    {initialConfig.isCustom ? 'Clé personnalisée' : 'Clé variable .env'}
                  </span>
                </div>

                <form onSubmit={handleSaveSupabaseConfig} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      URL du Projet Supabase (VITE_SUPABASE_URL)
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://xyzproject.supabase.co"
                      value={supabaseUrlInput}
                      onChange={(e) => setSupabaseUrlInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl font-mono text-stone-900 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-[#367A4D]"
                    />
                    <span className="text-[11px] text-stone-400 block mt-1">
                      Trouvez cette URL dans : Supabase Dashboard &gt; Project Settings &gt; API &gt; Project URL.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Clé Publique Anon (VITE_SUPABASE_ANON_KEY)
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      value={supabaseAnonKeyInput}
                      onChange={(e) => setSupabaseAnonKeyInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl font-mono text-stone-900 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-[#367A4D]"
                    />
                    <span className="text-[11px] text-stone-400 block mt-1">
                      Clé publique sécurisée autorisée pour le navigateur (anon / public).
                    </span>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      type="submit"
                      disabled={isTestingSupabase}
                      className="px-5 py-2.5 bg-[#123D2B] hover:bg-[#367A4D] text-white font-bold rounded-xl text-xs transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Enregistrer & Connecter</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSupabaseUrlInput('');
                        setSupabaseAnonKeyInput('');
                        configureSupabaseKeys('', '');
                      }}
                      className="px-4 py-2.5 border border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Réinitialiser
                    </button>
                  </div>
                </form>
              </div>

              {/* Quick Actions & Seeding */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-base text-[#123D2B] font-['Outfit',sans-serif]">
                    Initialisation & Amorçage des Données
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Si votre base de données Supabase vient d'être créée, vous pouvez peupler instantanément toutes les tables avec les stands du hall, les exposants certifiés et les archives historiques.
                  </p>

                  <button
                    type="button"
                    onClick={handleSeedSupabase}
                    disabled={isSeedingSupabase || !supabaseStatus.isConnected}
                    className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className={`w-4 h-4 ${isSeedingSupabase ? 'animate-spin' : ''}`} />
                    <span>{isSeedingSupabase ? 'Initialisation en cours...' : 'Initialiser les données (Seed)'}</span>
                  </button>
                  <p className="text-[11px] text-stone-400 text-center">
                    Garantit que les tables ne soient pas vides et que l'annuaire reste complet.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-[#123D2B] font-['Outfit',sans-serif]">
                      Fichier Schéma SQL
                    </h4>
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono">
                      /supabase/schema_complete.sql
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Contient les 14 tables PostgreSQL, contraintes, index et politiques de sécurité Row Level Security (RLS).
                  </p>
                  <div className="p-3 bg-stone-900 rounded-xl text-stone-200 text-[11px] font-mono overflow-x-auto space-y-1">
                    <div className="text-emerald-400">-- 14 tables PostgreSQL relationnelles :</div>
                    <div>exhibitors, visitors, registrations, stands,</div>
                    <div>events, news, invoices, contact_messages,</div>
                    <div>partners, sectors, gallery_photos, user_profiles...</div>
                  </div>
                  <div className="pt-1 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const sqlTemplate = `-- GARDEN EXPO AFRICA - EXECUTION SUPABASE
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.exhibitors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    logo TEXT,
    description TEXT,
    sector TEXT NOT NULL,
    category TEXT DEFAULT 'Exposant',
    country TEXT DEFAULT 'Maroc',
    city TEXT DEFAULT 'Casablanca',
    website TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    stand_number TEXT NOT NULL,
    hall TEXT NOT NULL,
    surface NUMERIC NOT NULL DEFAULT 18,
    featured_products JSONB DEFAULT '[]'::jsonb,
    edition TEXT NOT NULL DEFAULT '4ème Édition (2026)',
    participation_status TEXT NOT NULL DEFAULT 'confirmed',
    representative_name TEXT,
    representative_job_title TEXT,
    representative_email TEXT,
    representative_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.visitors (
    id TEXT PRIMARY KEY,
    badge_number TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    company TEXT NOT NULL,
    job_title TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    visitor_profile TEXT NOT NULL DEFAULT 'Professionnel B2B',
    city TEXT DEFAULT 'Casablanca',
    country TEXT DEFAULT 'Maroc',
    qr_code TEXT NOT NULL,
    registration_date TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.registrations (
    id TEXT PRIMARY KEY,
    reference TEXT NOT NULL UNIQUE,
    registration_type TEXT NOT NULL DEFAULT 'stand_booking',
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    job_title TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT DEFAULT 'Casablanca',
    country TEXT DEFAULT 'Maroc',
    surface_sqm NUMERIC DEFAULT 18,
    stand_type TEXT,
    sector_id TEXT,
    special_requests TEXT,
    estimated_price_mad NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.stands (
    id TEXT PRIMARY KEY,
    hall TEXT NOT NULL,
    number TEXT NOT NULL UNIQUE,
    surface_sq_meters NUMERIC NOT NULL DEFAULT 18,
    dimensions TEXT NOT NULL DEFAULT '6m x 3m',
    type TEXT NOT NULL,
    svg_coords JSONB NOT NULL DEFAULT '{"x": 0, "y": 0, "width": 80, "height": 60}'::jsonb,
    exhibitor_id TEXT,
    status TEXT NOT NULL DEFAULT 'available',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.invoices (
    id TEXT PRIMARY KEY,
    exhibitor_id TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    reference_number TEXT NOT NULL UNIQUE,
    amount_mad NUMERIC DEFAULT 0,
    status TEXT NOT NULL,
    date TEXT NOT NULL,
    download_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY,
    edition_number INTEGER NOT NULL UNIQUE,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    dates TEXT NOT NULL,
    location TEXT NOT NULL,
    theme TEXT NOT NULL,
    summary TEXT NOT NULL,
    description JSONB DEFAULT '[]'::jsonb,
    stats JSONB NOT NULL DEFAULT '{}'::jsonb,
    cover_image TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL DEFAULT '3 min',
    summary TEXT NOT NULL,
    content JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    author TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_profiles (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'visitor',
    full_name TEXT NOT NULL,
    company_name TEXT,
    job_title TEXT,
    phone TEXT,
    country TEXT DEFAULT 'Maroc',
    city TEXT DEFAULT 'Casablanca',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.exhibitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exhibitors_read" ON public.exhibitors FOR SELECT USING (true);
CREATE POLICY "exhibitors_admin" ON public.exhibitors FOR ALL USING (true);
CREATE POLICY "visitors_insert" ON public.visitors FOR INSERT WITH CHECK (true);
CREATE POLICY "visitors_select" ON public.visitors FOR SELECT USING (true);
CREATE POLICY "registrations_insert" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "registrations_select" ON public.registrations FOR SELECT USING (true);
CREATE POLICY "contact_insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "stands_select" ON public.stands FOR SELECT USING (true);
CREATE POLICY "invoices_select" ON public.invoices FOR SELECT USING (true);
`;
                        navigator.clipboard.writeText(sqlTemplate).then(() => {
                          setCopiedSql(true);
                          setTimeout(() => setCopiedSql(false), 3000);
                        });
                      }}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSql ? 'Copié dans le presse-papier !' : 'Copier le script SQL'}</span>
                    </button>
                    <a
                      href="https://supabase.com/dashboard/project/bkqqwszdiuorbfbntphk/sql/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Ouvrir Supabase SQL Editor</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Inventory */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-stone-100">
                <h4 className="font-bold text-base text-[#123D2B] font-['Outfit',sans-serif]">
                  Inventaire des Tables PostgreSQL & Synchronisation
                </h4>
                <p className="text-xs text-stone-500">
                  Vue d'ensemble de la modélisation relationnelle active sur votre projet Supabase.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-[11px] font-semibold text-stone-500 uppercase tracking-wider bg-stone-50">
                      <th className="py-2.5 px-4">Nom de la Table</th>
                      <th className="py-2.5 px-4">Rôle & Entité</th>
                      <th className="py-2.5 px-4">Clé Primaire</th>
                      <th className="py-2.5 px-4">Sécurité RLS</th>
                      <th className="py-2.5 px-4">Volume Local / Sync</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">public.exhibitors</td>
                      <td className="py-3 px-4 text-stone-700">Annuaire officiel des marques et entreprises</td>
                      <td className="py-3 px-4 font-mono text-stone-500">id (TEXT)</td>
                      <td className="py-3 px-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Actif (Public SELECT)</span></td>
                      <td className="py-3 px-4 font-bold text-stone-900">{exhibitors.length} exposants</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">public.stands</td>
                      <td className="py-3 px-4 text-stone-700">Plans interactifs et occupation des halls A, B, C</td>
                      <td className="py-3 px-4 font-mono text-stone-500">id (TEXT)</td>
                      <td className="py-3 px-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Actif (Public SELECT)</span></td>
                      <td className="py-3 px-4 font-bold text-stone-900">{stands.length} stands</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">public.visitor_badges</td>
                      <td className="py-3 px-4 text-stone-700">Inscriptions visiteurs et e-badges nominatifs QR</td>
                      <td className="py-3 px-4 font-mono text-stone-500">id (TEXT)</td>
                      <td className="py-3 px-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Actif (INSERT public)</span></td>
                      <td className="py-3 px-4 font-bold text-stone-900">{badgesList.length} reçus</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">public.stand_bookings</td>
                      <td className="py-3 px-4 text-stone-700">Devis et demandes de réservation exposants</td>
                      <td className="py-3 px-4 font-mono text-stone-500">id (TEXT)</td>
                      <td className="py-3 px-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Actif (INSERT public)</span></td>
                      <td className="py-3 px-4 font-bold text-stone-900">{bookingsList.length} demandes</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">public.contact_messages</td>
                      <td className="py-3 px-4 text-stone-700">Messages envoyés au commissariat général</td>
                      <td className="py-3 px-4 font-mono text-stone-500">id (TEXT)</td>
                      <td className="py-3 px-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Actif (INSERT public)</span></td>
                      <td className="py-3 px-4 font-bold text-stone-900">{messagesList.length} messages</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">public.editions</td>
                      <td className="py-3 px-4 text-stone-700">Archives des sessions 2022, 2023, 2025, 2026</td>
                      <td className="py-3 px-4 font-mono text-stone-500">id (TEXT)</td>
                      <td className="py-3 px-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Actif (Public SELECT)</span></td>
                      <td className="py-3 px-4 font-bold text-stone-900">{editions.length} éditions</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">public.gallery_photos</td>
                      <td className="py-3 px-4 text-stone-700">Médiathèque officielle et photographies haute résolution</td>
                      <td className="py-3 px-4 font-mono text-stone-500">id (TEXT)</td>
                      <td className="py-3 px-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Actif (Public SELECT)</span></td>
                      <td className="py-3 px-4 font-bold text-stone-900">{gallery.length} photos</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">public.exhibitor_interviews</td>
                      <td className="py-3 px-4 text-stone-700">Interviews vidéo et retours d'expérience des dirigeants</td>
                      <td className="py-3 px-4 font-mono text-stone-500">id (TEXT)</td>
                      <td className="py-3 px-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Actif (Public SELECT)</span></td>
                      <td className="py-3 px-4 font-bold text-stone-900">{interviews.length} vidéos</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">public.invoices</td>
                      <td className="py-3 px-4 text-stone-700">Contrats, factures de solde et documents officiels</td>
                      <td className="py-3 px-4 font-mono text-stone-500">id (TEXT)</td>
                      <td className="py-3 px-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Actif (Admin/Exposant)</span></td>
                      <td className="py-3 px-4 font-bold text-stone-900">{invoices.length} documents</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
