export type UserRole = 'super_admin' | 'admin' | 'exhibitor' | 'visitor';

export type PageId =
  | 'home'
  | 'about'
  | 'salon'
  | 'directory'
  | 'editions'
  | 'gallery'
  | 'news'
  | 'contact'
  | 'sectors'
  | 'exhibitors'
  | 'visitors'
  | 'partners'
  | 'exhibitor_portal'
  | 'visitor_portal'
  | 'admin_portal'
  | 'legal';

export interface Sector {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  products: string[];
  targetAudience: string[];
  marketKeyFigures?: string;
}

export interface Partner {
  id: string;
  name: string;
  badge: string;
  role: string;
  website?: string;
  category: 'institutional' | 'media' | 'sponsor' | 'academic' | 'association';
}

export interface NewsArticle {
  id: string;
  slug?: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  paragraphs?: string[];
  image?: string;
  author: string;
  tags?: string[];
}

export interface StandBookingRequest {
  id?: string;
  companyName: string;
  contactName?: string;
  contactPerson?: string;
  jobTitle?: string;
  email: string;
  phone: string;
  city?: string;
  country?: string;
  surface?: number;
  surfaceSqMeters?: number;
  standType: 'equipped' | 'bare' | 'island';
  sectorId: string;
  notes?: string;
  specialRequests?: string;
  estimatedPriceMAD?: number;
  submittedAt?: string;
}

export interface VisitorBadge {
  id?: string;
  fullName: string;
  jobTitle: string;
  companyName?: string;
  company?: string;
  email: string;
  phone: string;
  city?: string;
  country?: string;
  interests?: string[];
  visitorProfile?: string;
  badgeNumber?: string;
  badgeCode?: string;
  qrPayload?: string;
  registrationDate?: string;
  generatedAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  companyName?: string;
  jobTitle?: string;
  phone?: string;
  country?: string;
  city?: string;
  avatarUrl?: string;
  exhibitorId?: string; // Links user to their specific exhibitor record
}

export interface Stand {
  id: string;
  hall: string; // e.g. 'Hall A - Aménagement & Paysage'
  number: string; // e.g. 'A-12'
  surfaceSqMeters: number;
  dimensions: string; // e.g. '6m x 3m'
  type: 'equipped' | 'bare' | 'island';
  svgCoords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  exhibitorId?: string;
  status: 'available' | 'reserved' | 'confirmed';
}

export interface InvoiceDocument {
  id: string;
  exhibitorId: string;
  type: 'invoice' | 'contract' | 'technical_guide' | 'badge_pass';
  title: string;
  referenceNumber: string;
  amountMAD?: number;
  status: 'paid' | 'pending' | 'signed' | 'ready';
  date: string;
  downloadUrl?: string;
}

export interface Exhibitor {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  sector: string;
  category: string;
  country: string;
  city: string;
  website?: string;
  email: string;
  phone: string;
  standNumber: string;
  hall: string;
  standId?: string;
  surface: number;
  featuredProducts: string[];
  edition: string; // e.g. '3ème Édition (2025)' | '4ème Édition (2026/2027)'
  participationStatus: 'confirmed' | 'pending_validation' | 'contract_signed';
  representative: {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
  };
}

export interface VisitorAccount {
  id: string;
  userId: string;
  badgeNumber: string;
  registrationDate: string;
  favoriteExhibitorIds: string[];
  plannedVisits: { exhibitorId: string; notes?: string; timeSlot?: string }[];
  qrPayload: string;
}

export interface EditionArchive {
  id: string;
  number: number;
  title: string;
  year: number;
  dates: string;
  location: string;
  theme: string;
  summary: string;
  description: string[];
  stats: {
    exhibitorsCount: string;
    visitorsCount: string;
    countriesCount: string;
    surfaceSqm: string;
  };
  videoHighlightUrl?: string;
  coverImage: string;
  highlights: string[];
  keyPartners: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  edition: string; // '1ère Édition' | '2ème Édition' | '3ème Édition'
  category: 'general' | 'stands' | 'inauguration' | 'visitors' | 'conferences' | 'animations' | 'partners';
  imageUrl: string;
  caption: string;
}

export interface ExhibitorInterview {
  id: string;
  companyName: string;
  logo: string;
  speakerName: string;
  speakerTitle: string;
  edition: string;
  quote: string;
  videoUrl: string;
  thumbnail: string;
}

export interface MediaPartner {
  id: string;
  name: string;
  category: 'institutional' | 'media' | 'sponsor';
  logo: string;
  website: string;
  role: string;
}

export interface AdminStats {
  totalExhibitors: number;
  totalVisitors: number;
  totalStandsReserved: number;
  availableStands: number;
  pendingRequests: number;
  activeDocuments: number;
}
