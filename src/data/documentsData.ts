import { ExpoDocumentItem, SocialLinkItem } from '../types';

export const DOCUMENTS_STORAGE_KEY = 'gea_documents_hub_v1';
export const SOCIAL_LINKS_STORAGE_KEY = 'gea_social_links_v1';

/**
 * Configuration centralisée des brochures, documents et ressources officielles
 * accessibles sur https://www.gardenexpoafrica.com/documents
 *
 * Instructions pour les mises à jour directes dans le code :
 * - Pour un PDF hébergé dans /public/documents/..., renseignez par exemple: url: '/documents/brochure-2027.pdf'
 * - Pour un lien externe, renseignez l'URL complète (https://...)
 * - Pour masquer un bouton sans le supprimer, passez isVisible à false
 */
export const INITIAL_DOCUMENTS_LIST: ExpoDocumentItem[] = [
  {
    id: 'doc-brochure-2027',
    title: 'Brochure officielle Garden Expo Africa 2027',
    titleEn: 'Official Brochure Garden Expo Africa 2027',
    titleAr: 'الكتيب الرسمي لمعرض Garden Expo Africa 2027',
    subtitle: 'Présentation complète, chiffres clés & secteurs d’exposition',
    type: 'pdf',
    iconKey: 'book',
    url: '',
    fileName: 'Brochure-Officielle-Garden-Expo-Africa-2027.pdf',
    isVisible: true,
    order: 1,
  },
  {
    id: 'doc-programme-2027',
    title: 'Programme officiel 2027',
    titleEn: 'Official Program 2027',
    titleAr: 'البرنامج الرسمي للدورة الرابعة 2027',
    subtitle: 'Conférences plénières, tables rondes & ateliers techniques',
    type: 'pdf',
    iconKey: 'calendar',
    url: '',
    fileName: 'Programme-Officiel-Garden-Expo-Africa-2027.pdf',
    isVisible: true,
    order: 2,
  },
  {
    id: 'doc-note-conceptuelle-fr',
    title: 'Note conceptuelle – Français',
    titleEn: 'Concept Note – French',
    titleAr: 'المذكرة المفهومية – بالفرنسية',
    subtitle: 'Vision stratégique, enjeux environnementaux & feuille de route',
    type: 'pdf',
    iconKey: 'file-fr',
    url: '',
    fileName: 'Note-Conceptuelle-FR-Garden-Expo-Africa-2027.pdf',
    isVisible: true,
    order: 3,
  },
  {
    id: 'doc-concept-note-en',
    title: 'Concept Note – English',
    titleEn: 'Concept Note – English',
    titleAr: 'المذكرة المفهومية – بالإنجليزية',
    subtitle: 'Strategic vision, climate resilience & urban greening roadmap',
    type: 'pdf',
    iconKey: 'file-en',
    url: '',
    fileName: 'Concept-Note-EN-Garden-Expo-Africa-2027.pdf',
    isVisible: true,
    order: 4,
  },
  {
    id: 'doc-dossier-participation',
    title: 'Dossier de participation',
    titleEn: 'Exhibitor Participation Kit',
    titleAr: 'ملف المشاركة والحجز الرسمي',
    subtitle: 'Plans des stands, tarification & modalités de réservation',
    type: 'pdf',
    iconKey: 'briefcase',
    url: '',
    fileName: 'Dossier-Participation-Garden-Expo-Africa-2027.pdf',
    isVisible: true,
    order: 5,
  },
  {
    id: 'doc-best-of-video',
    title: 'Best Of Garden Expo Africa',
    titleEn: 'Best Of Garden Expo Africa (Official Video)',
    titleAr: 'أبرز لحظات معرض Garden Expo Africa (فيديو رسمي)',
    subtitle: 'Rétrospective officielle en vidéo · Casablanca',
    type: 'video',
    iconKey: 'video',
    url: 'https://www.youtube.com/embed/QoPzVfK6RSg',
    isVisible: true,
    order: 6,
  },
  {
    id: 'doc-galerie-photos',
    title: 'Galerie photos des éditions précédentes',
    titleEn: 'Photo Gallery of Previous Editions',
    titleAr: 'معرض صور الدورات السابقة',
    subtitle: 'Temps forts, stands & rencontres B2B à Casablanca',
    type: 'gallery',
    iconKey: 'images',
    url: '?page=gallery',
    internalPage: 'gallery',
    isVisible: true,
    order: 7,
  },
  {
    id: 'doc-site-officiel',
    title: 'Site officiel Garden Expo Africa',
    titleEn: 'Official Website Garden Expo Africa',
    titleAr: 'الموقع الرسمي للمعرض Garden Expo Africa',
    subtitle: 'www.gardenexpoafrica.com',
    type: 'website',
    iconKey: 'globe',
    url: 'https://www.gardenexpoafrica.com',
    internalPage: 'home',
    isVisible: true,
    order: 8,
  },
];

/**
 * Configuration des réseaux sociaux affichés dans la carte centrale.
 * Ne jamais inventer d'URL : renseigner les liens officiels vérifiés dès qu'ils sont publiés.
 */
export const INITIAL_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    url: '',
    isVisible: true,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    url: '',
    isVisible: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: '',
    isVisible: true,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/watch?v=QoPzVfK6RSg',
    isVisible: true,
  },
];

export function loadExpoDocuments(): ExpoDocumentItem[] {
  try {
    const raw = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
    if (!raw) return INITIAL_DOCUMENTS_LIST;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return [...parsed].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
  } catch {
    // Fallback gracefully to initial list
  }
  return INITIAL_DOCUMENTS_LIST;
}

export function saveExpoDocuments(docs: ExpoDocumentItem[]): void {
  try {
    const normalized = docs.map((d, idx) => ({ ...d, order: idx + 1 }));
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(normalized));
  } catch (err) {
    console.warn('Impossible de sauvegarder les documents dans le stockage local (fichier trop volumineux ?)', err);
  }
}

export function resetExpoDocuments(): ExpoDocumentItem[] {
  try {
    localStorage.removeItem(DOCUMENTS_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
  return INITIAL_DOCUMENTS_LIST;
}

export function loadSocialLinks(): SocialLinkItem[] {
  try {
    const raw = localStorage.getItem(SOCIAL_LINKS_STORAGE_KEY);
    if (!raw) return INITIAL_SOCIAL_LINKS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback
  }
  return INITIAL_SOCIAL_LINKS;
}

export function saveSocialLinks(links: SocialLinkItem[]): void {
  try {
    localStorage.setItem(SOCIAL_LINKS_STORAGE_KEY, JSON.stringify(links));
  } catch {
    // Ignore
  }
}

/**
 * Convertit une URL YouTube ou Vimeo classique en URL d'intégration embed propre
 */
export function normalizeVideoEmbedUrl(rawUrl: string): { kind: 'iframe' | 'mp4'; src: string } {
  const url = rawUrl.trim();
  if (!url) return { kind: 'iframe', src: '' };

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url) || url.startsWith('data:video/')) {
    return { kind: 'mp4', src: url };
  }

  // YouTube watch?v= or youtu.be/
  const ytMatch =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{6,})/) ||
    null;
  if (ytMatch && ytMatch[1]) {
    return { kind: 'iframe', src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0` };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return { kind: 'iframe', src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1` };
  }

  return { kind: 'iframe', src: url };
}
