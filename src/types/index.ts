export type PageId =
  | 'home'
  | 'about'
  | 'sectors'
  | 'exhibitors'
  | 'visitors'
  | 'partners'
  | 'news'
  | 'contact'
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
  marketKeyFigures: string;
}

export interface Partner {
  id: string;
  name: string;
  category: 'institutional' | 'association' | 'media' | 'sponsor';
  role: string;
  badge?: string;
  website?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  readTime: string;
  author: string;
  content: string[];
}

export interface StandBookingRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  standType: 'equipped' | 'bare' | 'island';
  surfaceSqMeters: number;
  sectorId: string;
  estimatedPriceMAD: number;
  specialRequests?: string;
}

export interface VisitorBadge {
  badgeNumber: string;
  fullName: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
  visitorProfile: string;
  country: string;
  registrationDate: string;
  qrPayload: string;
}
