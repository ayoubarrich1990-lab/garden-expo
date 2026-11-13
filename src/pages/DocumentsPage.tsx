import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  FileText,
  Briefcase,
  PlayCircle,
  Images,
  Globe,
  ExternalLink,
  Download,
  ChevronRight,
  X,
  ArrowLeft,
  Lock,
  Settings2,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Upload,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Save,
} from 'lucide-react';
import {
  PageId,
  ExpoDocumentItem,
  SocialLinkItem,
  DocumentItemType,
  DocumentIconKey,
} from '../types';
import { useApp } from '../context/AppContext';
import {
  loadExpoDocuments,
  saveExpoDocuments,
  resetExpoDocuments,
  loadSocialLinks,
  saveSocialLinks,
  INITIAL_SOCIAL_LINKS,
  normalizeVideoEmbedUrl,
} from '../data/documentsData';

interface DocumentsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAuth: (role?: 'visitor' | 'exhibitor' | 'admin') => void;
}

const DEFAULT_META_TITLE =
  "Garden Expo Africa 2027 — Salon International de l'Aménagement Paysager et Urbain en Afrique · Casablanca";
const DOCUMENTS_META_TITLE =
  'Brochures & Documents Officiels — Garden Expo Africa 2027 | Casablanca';
const DOCUMENTS_META_DESC =
  'Accédez aux brochures officielles, programme 2027, notes conceptuelles FR/EN, dossier de participation, best-of vidéo et galerie de Garden Expo Africa.';

function getDocumentIcon(iconKey: DocumentIconKey, className = 'w-5 h-5') {
  switch (iconKey) {
    case 'book':
      return <BookOpen className={className} />;
    case 'calendar':
      return <Calendar className={className} />;
    case 'file-fr':
    case 'file-en':
    case 'file':
      return <FileText className={className} />;
    case 'briefcase':
      return <Briefcase className={className} />;
    case 'video':
      return <PlayCircle className={className} />;
    case 'images':
      return <Images className={className} />;
    case 'globe':
      return <Globe className={className} />;
    default:
      return <FileText className={className} />;
  }
}

function SocialSvgIcon({ id }: { id: SocialLinkItem['id'] }) {
  switch (id) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

/**
 * Convertit un Data URL base64 PDF en Blob URL pour l'ouverture fiable dans un nouvel onglet
 */
function openFileInNewTab(url: string) {
  if (!url) return;
  if (url.startsWith('data:')) {
    try {
      const [header, base64] = url.split(',');
      const mimeMatch = header.match(/data:([^;]+)/);
      const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: mime });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank', 'noopener,noreferrer');
      return;
    } catch {
      // fallback below
    }
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

function triggerFileDownload(url: string, fileName?: string) {
  if (!url) return;
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName || 'document-garden-expo-africa.pdf';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({ onNavigate, onOpenAuth }) => {
  const { currentUser, language, setLanguage } = useApp();
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'super_admin';

  const [documents, setDocuments] = useState<ExpoDocumentItem[]>(() => loadExpoDocuments());
  const [socialLinks, setSocialLinks] = useState<SocialLinkItem[]>(() => loadSocialLinks());
  const [activeVideo, setActiveVideo] = useState<ExpoDocumentItem | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [managerOpen, setManagerOpen] = useState(false);

  // Admin editor states
  const [managerTab, setManagerTab] = useState<'docs' | 'social'>('docs');
  const [editingItem, setEditingItem] = useState<ExpoDocumentItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formType, setFormType] = useState<DocumentItemType>('pdf');
  const [formIcon, setFormIcon] = useState<DocumentIconKey>('file');
  const [formUrl, setFormUrl] = useState('');
  const [formFileName, setFormFileName] = useState('');
  const [formVisible, setFormVisible] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Dynamic SEO metadata while /documents is active
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    const prevOgTitle = ogTitle?.getAttribute('content') || '';
    const prevOgDesc = ogDesc?.getAttribute('content') || '';

    document.title = DOCUMENTS_META_TITLE;
    metaDesc?.setAttribute('content', DOCUMENTS_META_DESC);
    ogTitle?.setAttribute('content', DOCUMENTS_META_TITLE);
    ogDesc?.setAttribute('content', DOCUMENTS_META_DESC);

    return () => {
      document.title = prevTitle || DEFAULT_META_TITLE;
      if (prevDesc) metaDesc?.setAttribute('content', prevDesc);
      if (prevOgTitle) ogTitle?.setAttribute('content', prevOgTitle);
      if (prevOgDesc) ogDesc?.setAttribute('content', prevOgDesc);
    };
  }, []);

  // Close modals on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Auto-hide transient notice
  useEffect(() => {
    if (!noticeMessage) return;
    const timer = setTimeout(() => setNoticeMessage(null), 4200);
    return () => clearTimeout(timer);
  }, [noticeMessage]);

  const localizedText = {
    fr: {
      backToSite: 'Site officiel',
      title: 'GARDEN EXPO AFRICA',
      subtitle: "Salon International des Paysagistes et de l'Aménagement Urbain",
      description:
        'Découvrez nos brochures, programmes, documents officiels et contenus audiovisuels.',
      pendingDocNotice:
        "Ce document pour l'édition 2027 est en cours de finalisation et sera disponible prochainement.",
      pendingSocialNotice:
        'Lien officiel en cours de configuration.',
      openNewTab: 'Ouvrir',
      downloadPdf: 'Télécharger le PDF',
      watchVideo: 'Regarder la vidéo',
      footerText: 'Casablanca, Maroc · R2H Communication',
      adminManage: 'Gérer les documents',
      adminAccess: 'Accès organisateur',
    },
    en: {
      backToSite: 'Official site',
      title: 'GARDEN EXPO AFRICA',
      subtitle: 'International Exhibition for Landscaping and Urban Development',
      description:
        'Explore our official brochures, 2027 programs, concept notes and audiovisual highlights.',
      pendingDocNotice:
        'This 2027 edition document is currently being finalized and will be published soon.',
      pendingSocialNotice:
        'Official social channel link will be published soon.',
      openNewTab: 'Open',
      downloadPdf: 'Download PDF',
      watchVideo: 'Watch video',
      footerText: 'Casablanca, Morocco · R2H Communication',
      adminManage: 'Manage documents',
      adminAccess: 'Organizer access',
    },
    ar: {
      backToSite: 'الموقع الرسمي',
      title: 'GARDEN EXPO AFRICA',
      subtitle: 'المعرض الدولي لتهيئة المساحات الخضراء والتهيئة الحضرية',
      description:
        'اكتشفوا كتيباتنا، برامجنا، وثائقنا الرسمية ومحتوانا السمعي البصري.',
      pendingDocNotice:
        'هذه الوثيقة الخاصة بدورة 2027 قيد الإعداد النهائي وستتوفر للتحميل قريباً.',
      pendingSocialNotice:
        'الرابط الرسمي قيد التحديث حالياً.',
      openNewTab: 'فتح',
      downloadPdf: 'تحميل PDF',
      watchVideo: 'مشاهدة الفيديو',
      footerText: 'الدار البيضاء، المغرب · R2H Communication',
      adminManage: 'إدارة الوثائق',
      adminAccess: 'دخول المنظمين',
    },
  }[language];

  const getItemTitle = (item: ExpoDocumentItem) => {
    if (language === 'en' && item.titleEn) return item.titleEn;
    if (language === 'ar' && item.titleAr) return item.titleAr;
    return item.title;
  };

  const handleDocumentClick = (item: ExpoDocumentItem) => {
    // 1. Video modal
    if (item.type === 'video') {
      if (!item.url.trim()) {
        setNoticeMessage(localizedText.pendingDocNotice);
        return;
      }
      setActiveVideo(item);
      return;
    }

    // 2. Internal website or gallery
    if (item.type === 'gallery') {
      if (item.url && item.url.startsWith('http')) {
        window.open(item.url, '_blank', 'noopener,noreferrer');
      } else {
        onNavigate(item.internalPage || 'gallery');
      }
      return;
    }

    if (item.type === 'website') {
      if (item.internalPage && (!item.url || item.url.includes('gardenexpoafrica.com'))) {
        onNavigate(item.internalPage);
      } else if (item.url) {
        window.open(item.url, '_blank', 'noopener,noreferrer');
      } else {
        onNavigate('home');
      }
      return;
    }

    // 3. PDF or external link
    if (!item.url.trim()) {
      setNoticeMessage(localizedText.pendingDocNotice);
      if (isAdmin) {
        openEditModal(item);
      }
      return;
    }

    openFileInNewTab(item.url);
  };

  const handleSocialClick = (social: SocialLinkItem) => {
    if (!social.url.trim()) {
      setNoticeMessage(`${social.label} — ${localizedText.pendingSocialNotice}`);
      return;
    }
    window.open(social.url, '_blank', 'noopener,noreferrer');
  };

  // ---------------- Admin Manager CRUD Helpers ----------------
  const openEditModal = (item: ExpoDocumentItem) => {
    setIsCreating(false);
    setEditingItem(item);
    setFormTitle(item.title);
    setFormSubtitle(item.subtitle || '');
    setFormType(item.type);
    setFormIcon(item.iconKey);
    setFormUrl(item.url);
    setFormFileName(item.fileName || '');
    setFormVisible(item.isVisible);
    setUploadError(null);
    setManagerTab('docs');
    setManagerOpen(true);
  };

  const openCreateModal = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormTitle('');
    setFormSubtitle('');
    setFormType('pdf');
    setFormIcon('file');
    setFormUrl('');
    setFormFileName('');
    setFormVisible(true);
    setUploadError(null);
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);

    if (file.size > 3.5 * 1024 * 1024) {
      setUploadError(
        'Le fichier dépasse 3,5 Mo pour le stockage navigateur. Pour des fichiers plus lourds, placez le PDF dans public/documents/ et renseignez son chemin (ex: /documents/mon-fichier.pdf).'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormUrl(reader.result);
        setFormFileName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDocumentForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    let updatedDocs: ExpoDocumentItem[];
    if (isCreating) {
      const newDoc: ExpoDocumentItem = {
        id: 'doc-' + Date.now(),
        title: formTitle.trim(),
        subtitle: formSubtitle.trim() || undefined,
        type: formType,
        iconKey: formIcon,
        url: formUrl.trim(),
        fileName: formFileName.trim() || undefined,
        isVisible: formVisible,
        order: documents.length + 1,
      };
      updatedDocs = [...documents, newDoc];
    } else if (editingItem) {
      updatedDocs = documents.map((d) =>
        d.id === editingItem.id
          ? {
              ...d,
              title: formTitle.trim(),
              subtitle: formSubtitle.trim() || undefined,
              type: formType,
              iconKey: formIcon,
              url: formUrl.trim(),
              fileName: formFileName.trim() || undefined,
              isVisible: formVisible,
            }
          : d
      );
    } else {
      return;
    }

    setDocuments(updatedDocs);
    saveExpoDocuments(updatedDocs);
    setEditingItem(null);
    setIsCreating(false);
    setSaveFeedback('Modifications enregistrées.');
    setTimeout(() => setSaveFeedback(null), 2500);
  };

  const handleToggleVisibility = (id: string) => {
    const updated = documents.map((d) =>
      d.id === id ? { ...d, isVisible: !d.isVisible } : d
    );
    setDocuments(updated);
    saveExpoDocuments(updated);
  };

  const handleMoveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= documents.length) return;
    const copy = [...documents];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    const reordered = copy.map((item, idx) => ({ ...item, order: idx + 1 }));
    setDocuments(reordered);
    saveExpoDocuments(reordered);
  };

  const handleDeleteItem = (id: string) => {
    const updated = documents.filter((d) => d.id !== id);
    setDocuments(updated);
    saveExpoDocuments(updated);
  };

  const handleResetDefaults = () => {
    const defaults = resetExpoDocuments();
    setDocuments(defaults);
    setSocialLinks(INITIAL_SOCIAL_LINKS);
    saveSocialLinks(INITIAL_SOCIAL_LINKS);
    setEditingItem(null);
    setIsCreating(false);
    setSaveFeedback('Configuration par défaut restaurée.');
    setTimeout(() => setSaveFeedback(null), 2500);
  };

  const handleUpdateSocialUrl = (id: SocialLinkItem['id'], url: string) => {
    const updated = socialLinks.map((s) => (s.id === id ? { ...s, url } : s));
    setSocialLinks(updated);
    saveSocialLinks(updated);
  };

  const handleToggleSocialVisible = (id: SocialLinkItem['id']) => {
    const updated = socialLinks.map((s) =>
      s.id === id ? { ...s, isVisible: !s.isVisible } : s
    );
    setSocialLinks(updated);
    saveSocialLinks(updated);
  };

  const visibleDocuments = documents.filter((d) => d.isVisible);
  const visibleSocials = socialLinks.filter((s) => s.isVisible);
  const videoMedia = activeVideo ? normalizeVideoEmbedUrl(activeVideo.url) : null;

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-[#F4F7F4] text-stone-900 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Fond discret à touche végétale naturelle */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(57,181,74,0.12) 0%, rgba(8,117,45,0.04) 55%, transparent 80%)',
          }}
        />
        {/* Motifs botaniques discrets */}
        <svg
          className="absolute -bottom-16 -left-16 w-72 h-72 text-[#08752D]/[0.045]"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M100 180 C100 110, 40 80, 20 20 C85 35, 130 85, 100 180 Z" />
          <path d="M100 180 C125 120, 175 100, 185 45 C135 55, 105 105, 100 180 Z" />
        </svg>
        <svg
          className="hidden sm:block absolute -top-12 -right-12 w-64 h-64 text-[#004421]/[0.04] rotate-180"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M100 180 C100 110, 40 80, 20 20 C85 35, 130 85, 100 180 Z" />
        </svg>
      </div>

      {/* Conteneur principal centré (max 500px sur desktop, pleine largeur sur mobile) */}
      <div className="relative z-10 w-full max-w-[500px] mx-auto flex flex-col gap-5">
        {/* Barre utilitaire discrète : retour site + sélecteur de langue */}
        <div className="flex items-center justify-between gap-3 px-1">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#08752D] transition-colors py-1.5 px-2.5 rounded-lg hover:bg-white/70 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{localizedText.backToSite}</span>
          </button>

          <div
            className="inline-flex items-center gap-0.5 bg-white/90 border border-stone-200/80 rounded-lg p-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
            role="group"
            aria-label="Sélecteur de langue"
          >
            {(['fr', 'en', 'ar'] as const).map((langCode) => (
              <button
                key={langCode}
                type="button"
                onClick={() => setLanguage(langCode)}
                className={`px-2 py-1 text-[11px] font-bold uppercase rounded-md transition-colors cursor-pointer ${
                  language === langCode
                    ? 'bg-[#08752D] text-white'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {langCode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* CARTE HEADER CENTRALE */}
        <header className="bg-white rounded-3xl border border-stone-200/80 shadow-[0_8px_30px_rgba(0,68,33,0.05)] px-6 py-7 sm:px-8 sm:py-8 text-center">
          {/* Logo officiel */}
          <div className="flex justify-center mb-5">
            <img
              src="/assets/logo-garden-expo-official.png"
              alt="Logo officiel Garden Expo Africa"
              referrerPolicy="no-referrer"
              className="h-14 sm:h-16 w-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  '/assets/aistudio/LOGO-GARDEN-EXPO-PNG_3a4759d4.png';
              }}
            />
          </div>

          {/* Titre & Sous-titre */}
          <h1 className="font-['Outfit',sans-serif] text-xl sm:text-2xl font-extrabold tracking-tight text-[#004421]">
            {localizedText.title}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#08752D] mt-1.5 leading-snug text-balance">
            {localizedText.subtitle}
          </p>

          {/* Courte description */}
          <p className="text-xs sm:text-[13px] text-stone-600 mt-3 leading-relaxed max-w-sm mx-auto">
            {localizedText.description}
          </p>

          {/* Réseaux sociaux officiels */}
          {visibleSocials.length > 0 && (
            <div className="mt-5 pt-5 border-t border-stone-100 flex items-center justify-center gap-3">
              {visibleSocials.map((social) => {
                const isConfigured = Boolean(social.url.trim());
                return (
                  <button
                    key={social.id}
                    type="button"
                    onClick={() => handleSocialClick(social)}
                    aria-label={social.label}
                    title={
                      isConfigured
                        ? social.label
                        : `${social.label} (Lien à configurer)`
                    }
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isConfigured
                        ? 'bg-[#F6FAF7] border-stone-200/90 text-[#004421] hover:bg-[#08752D] hover:text-white hover:border-[#08752D] hover:-translate-y-0.5 shadow-[0_1px_4px_rgba(0,68,33,0.04)]'
                        : 'bg-stone-50 border-stone-200/70 text-stone-400 hover:text-[#08752D] hover:border-[#08752D]/30 hover:bg-white'
                    }`}
                  >
                    <SocialSvgIcon id={social.id} />
                  </button>
                );
              })}
            </div>
          )}
        </header>

        {/* Notification discrète pour les emplacements en attente */}
        {noticeMessage && (
          <div
            role="status"
            className="bg-white border border-emerald-200 text-[#004421] rounded-2xl px-4 py-3 text-xs font-medium shadow-sm flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#08752D] shrink-0" />
              <span>{noticeMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setNoticeMessage(null)}
              aria-label="Fermer la notification"
              className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* LISTE DES BOUTONS & DOCUMENTS */}
        <nav aria-label="Documents et ressources Garden Expo Africa" className="flex flex-col gap-3">
          {visibleDocuments.map((item) => {
            const hasUrl = Boolean(item.url.trim());
            const isPdf = item.type === 'pdf';
            const canDownloadPdf = isPdf && hasUrl;

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-stone-200/80 shadow-[0_2px_10px_rgba(0,68,33,0.04)] hover:border-[#08752D]/35 hover:shadow-[0_8px_24px_rgba(0,68,33,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex items-center overflow-hidden"
              >
                {/* Action principale du bouton */}
                <button
                  type="button"
                  onClick={() => handleDocumentClick(item)}
                  className="flex-1 min-w-0 flex items-center gap-3.5 p-3.5 sm:p-4 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#08752D] cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EEF6F0] text-[#08752D] group-hover:bg-[#08752D] group-hover:text-white transition-colors duration-200 flex items-center justify-center shrink-0">
                    {getDocumentIcon(item.iconKey, 'w-5 h-5')}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-['Outfit',sans-serif] text-sm sm:text-[15px] font-semibold text-[#123D2B] group-hover:text-[#004421] leading-snug">
                      {getItemTitle(item)}
                    </div>
                    {item.subtitle && (
                      <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5 truncate">
                        {item.subtitle}
                      </div>
                    )}
                  </div>

                  {/* Flèche / Indicateur discret si pas d'action secondaire de téléchargement */}
                  {!canDownloadPdf && (
                    <span className="text-stone-400 group-hover:text-[#08752D] transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 shrink-0">
                      {item.type === 'video' ? (
                        <PlayCircle className="w-4 h-4" />
                      ) : item.type === 'website' || item.type === 'link' ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                      )}
                    </span>
                  )}
                </button>

                {/* Boutons dédiés Ouvrir + Télécharger pour les PDF configurés */}
                {canDownloadPdf && (
                  <div className="flex items-center gap-1.5 pe-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => openFileInNewTab(item.url)}
                      title={localizedText.openNewTab}
                      aria-label={`${localizedText.openNewTab} ${getItemTitle(item)}`}
                      className="w-9 h-9 rounded-xl bg-stone-50 hover:bg-[#EEF6F0] text-stone-600 hover:text-[#08752D] border border-stone-200/70 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerFileDownload(item.url, item.fileName)}
                      title={localizedText.downloadPdf}
                      aria-label={`${localizedText.downloadPdf} ${getItemTitle(item)}`}
                      className="w-9 h-9 rounded-xl bg-[#EEF6F0] hover:bg-[#08752D] text-[#08752D] hover:text-white border border-emerald-200/70 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Pied de page minimaliste + accès administration organisateur */}
        <footer className="pt-2 pb-4 flex flex-col items-center gap-2 text-center">
          <p className="text-[11px] text-stone-500 font-medium">
            © 2027 Garden Expo Africa · {localizedText.footerText}
          </p>

          {isAdmin ? (
            <button
              type="button"
              onClick={() => setManagerOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#08752D] hover:text-[#004421] py-1.5 px-3 rounded-lg bg-white/80 border border-stone-200/80 shadow-2xs transition-colors cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{localizedText.adminManage}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenAuth('admin')}
              className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-[#08752D] transition-colors py-1 px-2 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>{localizedText.adminAccess}</span>
            </button>
          )}
        </footer>
      </div>

      {/* MODAL LECTEUR VIDÉO (BEST OF / VIDÉOS) */}
      {activeVideo && videoMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={getItemTitle(activeVideo)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
              <div className="min-w-0 pe-4">
                <h2 className="font-['Outfit',sans-serif] text-base sm:text-lg font-bold text-[#004421] truncate">
                  {getItemTitle(activeVideo)}
                </h2>
                {activeVideo.subtitle && (
                  <p className="text-xs text-stone-500 truncate">{activeVideo.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Fermer la vidéo"
                className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              {videoMedia.kind === 'mp4' ? (
                <video
                  src={videoMedia.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={videoMedia.src}
                  title={getItemTitle(activeVideo)}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* PANNEAU DE GESTION DES DOCUMENTS & RÉSEAUX (ADMIN) */}
      {managerOpen && isAdmin && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setManagerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Gestion des brochures et documents"
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-[#004421] text-white flex items-center justify-between">
              <div>
                <h2 className="font-['Outfit',sans-serif] text-base sm:text-lg font-bold">
                  Gestion des Brochures & Documents (/documents)
                </h2>
                <p className="text-xs text-emerald-200">
                  Ajoutez vos PDF, remplacez des fichiers, masquez ou réordonnez les boutons.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setManagerOpen(false)}
                aria-label="Fermer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-6 pt-3 border-b border-stone-200 flex items-center justify-between gap-4 bg-stone-50">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setManagerTab('docs');
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                  className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                    managerTab === 'docs'
                      ? 'border-[#08752D] text-[#08752D]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Documents & Boutons ({documents.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setManagerTab('social');
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                  className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                    managerTab === 'social'
                      ? 'border-[#08752D] text-[#08752D]'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Réseaux Sociaux ({socialLinks.length})
                </button>
              </div>

              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-rose-600 py-1 cursor-pointer"
                title="Réinitialiser la liste d'origine"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser</span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {saveFeedback && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{saveFeedback}</span>
                </div>
              )}

              {managerTab === 'docs' && (editingItem || isCreating) && (
                <form onSubmit={handleSaveDocumentForm} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#123D2B]">
                      {isCreating ? 'Ajouter un nouveau document / bouton' : 'Modifier le document'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(null);
                        setIsCreating(false);
                      }}
                      className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      Retour à la liste
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-stone-700 mb-1">Titre du bouton *</label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Ex: Brochure officielle Garden Expo Africa 2027"
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#08752D]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-stone-700 mb-1">Sous-titre (optionnel)</label>
                      <input
                        type="text"
                        value={formSubtitle}
                        onChange={(e) => setFormSubtitle(e.target.value)}
                        placeholder="Ex: Document PDF · 16 pages"
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#08752D]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Type de ressource</label>
                      <select
                        value={formType}
                        onChange={(e) => setFormType(e.target.value as DocumentItemType)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#08752D]"
                      >
                        <option value="pdf">Document PDF (Ouvrir + Télécharger)</option>
                        <option value="video">Vidéo (YouTube / Vimeo / MP4)</option>
                        <option value="gallery">Galerie photos</option>
                        <option value="website">Site Web</option>
                        <option value="link">Lien externe</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Icône</label>
                      <select
                        value={formIcon}
                        onChange={(e) => setFormIcon(e.target.value as DocumentIconKey)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#08752D]"
                      >
                        <option value="book">Brochure / Livre</option>
                        <option value="calendar">Programme / Calendrier</option>
                        <option value="file-fr">Note / Document FR</option>
                        <option value="file-en">Note / Document EN</option>
                        <option value="briefcase">Dossier participation</option>
                        <option value="video">Vidéo / Best Of</option>
                        <option value="images">Galerie photos</option>
                        <option value="globe">Site web</option>
                        <option value="file">Document générique</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-stone-700 mb-1">
                        URL du fichier ou lien cible
                      </label>
                      <input
                        type="text"
                        value={formUrl}
                        onChange={(e) => setFormUrl(e.target.value)}
                        placeholder={
                          formType === 'video'
                            ? 'https://www.youtube.com/watch?v=...'
                            : '/documents/brochure-2027.pdf ou https://...'
                        }
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#08752D]"
                      />
                    </div>

                    {formType === 'pdf' && (
                      <>
                        <div>
                          <label className="block font-bold text-stone-700 mb-1">
                            Nom du fichier au téléchargement
                          </label>
                          <input
                            type="text"
                            value={formFileName}
                            onChange={(e) => setFormFileName(e.target.value)}
                            placeholder="Brochure-2027.pdf"
                            className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:outline-none focus:border-[#08752D]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-stone-700 mb-1">
                            Ou importer un PDF local (&lt; 3,5 Mo)
                          </label>
                          <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-[#08752D]/50 bg-[#EEF6F0]/60 text-[#08752D] font-bold cursor-pointer hover:bg-[#EEF6F0] transition-colors">
                            <Upload className="w-4 h-4" />
                            <span>Choisir un fichier PDF</span>
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={handlePdfUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>

                  {uploadError && (
                    <p className="text-xs text-rose-600 font-medium">{uploadError}</p>
                  )}

                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formVisible}
                      onChange={(e) => setFormVisible(e.target.checked)}
                      className="rounded border-stone-300 text-[#08752D]"
                    />
                    <span>Afficher ce bouton sur la page publique /documents</span>
                  </label>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(null);
                        setIsCreating(false);
                      }}
                      className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#08752D] hover:bg-[#004421] text-white text-xs font-bold cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </form>
              )}

              {managerTab === 'docs' && !editingItem && !isCreating && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-stone-500">
                      Cliquez sur modifier pour charger un PDF ou modifier le lien d’un bouton.
                    </p>
                    <button
                      type="button"
                      onClick={openCreateModal}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#08752D] hover:bg-[#004421] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ajouter</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {documents.map((doc, idx) => (
                      <div
                        key={doc.id}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                          doc.isVisible
                            ? 'bg-white border-stone-200'
                            : 'bg-stone-50 border-stone-200/70 opacity-65'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-[#EEF6F0] text-[#08752D] flex items-center justify-center shrink-0">
                            {getDocumentIcon(doc.iconKey, 'w-4 h-4')}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-stone-900 truncate">
                              {doc.title}
                            </div>
                            <div className="text-[11px] text-stone-500 truncate">
                              {doc.type.toUpperCase()} ·{' '}
                              {doc.url
                                ? doc.url.startsWith('data:')
                                  ? `Fichier chargé (${doc.fileName || 'PDF'})`
                                  : doc.url
                                : 'Emplacement en attente de lien / PDF'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleMoveItem(idx, -1)}
                            disabled={idx === 0}
                            title="Monter"
                            className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveItem(idx, 1)}
                            disabled={idx === documents.length - 1}
                            title="Descendre"
                            className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleVisibility(doc.id)}
                            title={doc.isVisible ? 'Masquer' : 'Afficher'}
                            className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 cursor-pointer"
                          >
                            {doc.isVisible ? (
                              <Eye className="w-3.5 h-3.5 text-[#08752D]" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(doc)}
                            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#EEF6F0] text-stone-700 hover:text-[#08752D] text-[11px] font-bold cursor-pointer"
                          >
                            Éditer
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(doc.id)}
                            title="Supprimer"
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {managerTab === 'social' && (
                <div className="space-y-3">
                  <p className="text-xs text-stone-500">
                    Renseignez les URLs officielles de vos réseaux sociaux. Laissez vide si non encore disponible.
                  </p>
                  {socialLinks.map((social) => (
                    <div
                      key={social.id}
                      className="p-3.5 rounded-xl border border-stone-200 bg-white flex flex-col sm:flex-row sm:items-center gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-[120px]">
                        <div className="w-8 h-8 rounded-lg bg-[#EEF6F0] text-[#08752D] flex items-center justify-center">
                          <SocialSvgIcon id={social.id} />
                        </div>
                        <span className="text-xs font-bold text-stone-900">{social.label}</span>
                      </div>

                      <input
                        type="url"
                        value={social.url}
                        onChange={(e) => handleUpdateSocialUrl(social.id, e.target.value)}
                        placeholder={`https://www.${social.id}.com/...`}
                        className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#08752D]"
                      />

                      <button
                        type="button"
                        onClick={() => handleToggleSocialVisible(social.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-stone-200 text-[11px] font-semibold text-stone-600 hover:bg-stone-50 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                      >
                        {social.isVisible ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-[#08752D]" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Masqué</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
