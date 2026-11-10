import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import {
  Exhibitor,
  Stand,
  EditionArchive,
  GalleryPhoto,
  ExhibitorInterview,
  InvoiceDocument,
  VisitorAccount,
  VisitorBadge,
  StandBookingRequest,
  UserProfile,
  UserRole,
  NewsArticle,
  Partner,
  Sector,
  HeroSlide,
} from '../types';
import {
  INITIAL_EXHIBITORS,
  INITIAL_STANDS,
  INITIAL_EDITIONS,
  INITIAL_GALLERY,
  INITIAL_INTERVIEWS,
  INITIAL_INVOICES,
  INITIAL_HERO_SLIDES,
  DEMO_USERS,
} from '../data/seedData';
import {
  NEWS_ARTICLES,
  PARTNERS_DATA,
  SECTORS_DATA,
} from '../data/expoData';

// ============================================================================
// CONVERTERS: PostgreSQL snake_case <-> Frontend TypeScript camelCase
// ============================================================================

export function mapRowToExhibitor(row: any): Exhibitor {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug || row.id,
    logo: row.logo || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&auto=format&fit=crop&q=80',
    description: row.description || '',
    sector: row.sector || '',
    category: row.category || 'Exposant',
    country: row.country || 'Maroc',
    city: row.city || 'Casablanca',
    website: row.website || undefined,
    email: row.email || '',
    phone: row.phone || '',
    standNumber: row.stand_number || '',
    hall: row.hall || '',
    standId: row.stand_id || undefined,
    surface: Number(row.surface) || 18,
    featuredProducts: Array.isArray(row.featured_products) ? row.featured_products : [],
    edition: row.edition || '4ème Édition (2026)',
    participationStatus: row.participation_status || 'confirmed',
    representative: {
      name: row.representative_name || '',
      jobTitle: row.representative_job_title || '',
      email: row.representative_email || row.email || '',
      phone: row.representative_phone || row.phone || '',
    },
  };
}

export function mapExhibitorToRow(ex: Exhibitor): any {
  return {
    id: ex.id,
    name: ex.name,
    slug: ex.slug || ex.id,
    logo: ex.logo,
    description: ex.description,
    sector: ex.sector,
    category: ex.category || 'Exposant',
    country: ex.country || 'Maroc',
    city: ex.city || 'Casablanca',
    website: ex.website || null,
    email: ex.email,
    phone: ex.phone,
    stand_number: ex.standNumber,
    hall: ex.hall,
    stand_id: ex.standId || null,
    surface: ex.surface || 18,
    featured_products: ex.featuredProducts || [],
    edition: ex.edition || '4ème Édition (2026)',
    participation_status: ex.participationStatus || 'confirmed',
    representative_name: ex.representative?.name || '',
    representative_job_title: ex.representative?.jobTitle || '',
    representative_email: ex.representative?.email || ex.email,
    representative_phone: ex.representative?.phone || ex.phone,
  };
}

export function mapRowToStand(row: any): Stand {
  return {
    id: row.id,
    hall: row.hall,
    number: row.number,
    surfaceSqMeters: Number(row.surface_sq_meters) || 18,
    dimensions: row.dimensions || '6m x 3m',
    type: row.type || 'equipped',
    svgCoords: row.svg_coords || { x: 0, y: 0, width: 80, height: 60 },
    exhibitorId: row.exhibitor_id || undefined,
    status: row.status || 'available',
  };
}

export function mapStandToRow(s: Stand): any {
  return {
    id: s.id,
    hall: s.hall,
    number: s.number,
    surface_sq_meters: s.surfaceSqMeters,
    dimensions: s.dimensions,
    type: s.type,
    svg_coords: s.svgCoords,
    exhibitor_id: s.exhibitorId || null,
    status: s.status,
  };
}

export function mapRowToEdition(row: any): EditionArchive {
  return {
    id: row.id,
    number: row.number,
    title: row.title,
    year: row.year,
    dates: row.dates,
    location: row.location,
    theme: row.theme,
    summary: row.summary,
    description: Array.isArray(row.description) ? row.description : [],
    stats: row.stats || {
      exhibitorsCount: '0',
      visitorsCount: '0',
      countriesCount: '0',
      surfaceSqm: '0 m²',
    },
    videoHighlightUrl: row.video_highlight_url || undefined,
    coverImage: row.cover_image,
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    keyPartners: Array.isArray(row.key_partners) ? row.key_partners : [],
  };
}

export function mapEditionToRow(ed: EditionArchive): any {
  return {
    id: ed.id,
    number: ed.number,
    title: ed.title,
    year: ed.year,
    dates: ed.dates,
    location: ed.location,
    theme: ed.theme,
    summary: ed.summary,
    description: ed.description,
    stats: ed.stats,
    video_highlight_url: ed.videoHighlightUrl || null,
    cover_image: ed.coverImage,
    highlights: ed.highlights,
    key_partners: ed.keyPartners,
  };
}

export function mapRowToGalleryPhoto(row: any): GalleryPhoto {
  return {
    id: row.id,
    title: row.title,
    edition: row.edition,
    category: row.category,
    imageUrl: row.image_url,
    caption: row.caption || '',
  };
}

export function mapGalleryPhotoToRow(photo: GalleryPhoto): any {
  return {
    id: photo.id,
    title: photo.title,
    edition: photo.edition,
    category: photo.category,
    image_url: photo.imageUrl,
    caption: photo.caption,
  };
}

export function mapRowToInterview(row: any): ExhibitorInterview {
  return {
    id: row.id,
    companyName: row.company_name,
    logo: row.logo || '',
    speakerName: row.speaker_name,
    speakerTitle: row.speaker_title,
    edition: row.edition,
    quote: row.quote,
    videoUrl: row.video_url,
    thumbnail: row.thumbnail,
  };
}

export function mapInterviewToRow(item: ExhibitorInterview): any {
  return {
    id: item.id,
    company_name: item.companyName,
    logo: item.logo,
    speaker_name: item.speakerName,
    speaker_title: item.speakerTitle,
    edition: item.edition,
    quote: item.quote,
    video_url: item.videoUrl,
    thumbnail: item.thumbnail,
  };
}

export function mapRowToInvoice(row: any): InvoiceDocument {
  return {
    id: row.id,
    exhibitorId: row.exhibitor_id,
    type: row.type,
    title: row.title,
    referenceNumber: row.reference_number,
    amountMAD: Number(row.amount_mad) || 0,
    status: row.status,
    date: row.date,
    downloadUrl: row.download_url || undefined,
  };
}

export function mapInvoiceToRow(inv: InvoiceDocument): any {
  return {
    id: inv.id,
    exhibitor_id: inv.exhibitorId,
    type: inv.type,
    title: inv.title,
    reference_number: inv.referenceNumber,
    amount_mad: inv.amountMAD || 0,
    status: inv.status,
    date: inv.date,
    download_url: inv.downloadUrl || null,
  };
}

export function mapRowToHeroSlide(row: any): HeroSlide {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle || '',
    badge: row.badge || '',
    videoUrl: row.video_url,
    posterUrl: row.poster_url || '',
    videoType: row.video_type || 'youtube',
    location: row.location || '',
    metricLabel: row.metric_label || '',
    metricValue: row.metric_value || '',
    orderIndex: row.order_index ?? 0,
    isActive: row.is_active ?? true,
  };
}

export function mapHeroSlideToRow(slide: HeroSlide): any {
  return {
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    badge: slide.badge,
    video_url: slide.videoUrl,
    poster_url: slide.posterUrl,
    video_type: slide.videoType,
    location: slide.location,
    metric_label: slide.metricLabel,
    metric_value: slide.metricValue,
    order_index: slide.orderIndex ?? 0,
    is_active: slide.isActive ?? true,
    updated_at: new Date().toISOString(),
  };
}

// ============================================================================
// DATA ACCESS SERVICE (CRUD OPERATIONS)
// ============================================================================

export const SupabaseDataService = {
  // --------------------------------------------------------------------------
  // 1. EXPOSANTS
  // --------------------------------------------------------------------------
  async fetchExhibitors(): Promise<Exhibitor[]> {
    const client = getSupabaseClient();
    if (!client) return INITIAL_EXHIBITORS;

    try {
      const { data, error } = await client
        .from('exhibitors')
        .select('*')
        .order('name', { ascending: true });

      if (error || !data || data.length === 0) {
        console.info('[Supabase] Pas de données distantes pour exhibitors, utilisation des données locales.');
        return INITIAL_EXHIBITORS;
      }
      return data.map(mapRowToExhibitor);
    } catch (err) {
      console.warn('[Supabase] Erreur fetchExhibitors:', err);
      return INITIAL_EXHIBITORS;
    }
  },

  async insertExhibitor(exhibitor: Exhibitor): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const row = mapExhibitorToRow(exhibitor);
      const { error } = await client.from('exhibitors').upsert(row);
      if (error) console.error('[Supabase] Erreur insertExhibitor:', error);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception insertExhibitor:', err);
      return false;
    }
  },

  async updateExhibitor(exhibitor: Exhibitor): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const row = mapExhibitorToRow(exhibitor);
      const { error } = await client.from('exhibitors').update(row).eq('id', exhibitor.id);
      if (error) console.error('[Supabase] Erreur updateExhibitor:', error);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception updateExhibitor:', err);
      return false;
    }
  },

  async deleteExhibitor(exhibitorId: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const { error } = await client.from('exhibitors').delete().eq('id', exhibitorId);
      if (error) console.error('[Supabase] Erreur deleteExhibitor:', error);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception deleteExhibitor:', err);
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // 2. STANDS
  // --------------------------------------------------------------------------
  async fetchStands(): Promise<Stand[]> {
    const client = getSupabaseClient();
    if (!client) return INITIAL_STANDS;

    try {
      const { data, error } = await client.from('stands').select('*').order('number', { ascending: true });
      if (error || !data || data.length === 0) {
        return INITIAL_STANDS;
      }
      return data.map(mapRowToStand);
    } catch (err) {
      console.warn('[Supabase] Erreur fetchStands:', err);
      return INITIAL_STANDS;
    }
  },

  async updateStand(stand: Stand): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const row = mapStandToRow(stand);
      const { error } = await client.from('stands').update(row).eq('id', stand.id);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception updateStand:', err);
      return false;
    }
  },

  async assignStand(standId: string, exhibitorId: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const { error: standErr } = await client
        .from('stands')
        .update({ exhibitor_id: exhibitorId, status: 'confirmed' })
        .eq('id', standId);

      const { error: exhErr } = await client
        .from('exhibitors')
        .update({ stand_id: standId })
        .eq('id', exhibitorId);

      return !standErr && !exhErr;
    } catch (err) {
      console.error('[Supabase] Exception assignStand:', err);
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // 3. ARCHIVES DES ÉDITIONS
  // --------------------------------------------------------------------------
  async fetchEditions(): Promise<EditionArchive[]> {
    const client = getSupabaseClient();
    if (!client) return INITIAL_EDITIONS;

    try {
      const { data, error } = await client.from('editions').select('*').order('number', { ascending: false });
      if (error || !data || data.length === 0) {
        // Fallback vers la table events
        const { data: evData, error: evErr } = await client.from('events').select('*').order('edition_number', { ascending: false });
        if (!evErr && evData && evData.length > 0) {
          return evData.map((ev: any) => ({
            id: ev.id,
            number: ev.edition_number,
            title: ev.title,
            year: ev.year,
            dates: ev.dates,
            location: ev.location,
            theme: ev.theme,
            summary: ev.summary,
            description: Array.isArray(ev.description) ? ev.description : [],
            stats: ev.stats || {
              exhibitorsCount: '0',
              visitorsCount: '0',
              countriesCount: '0',
              surfaceSqm: '0 m²',
            },
            videoHighlightUrl: ev.video_url || undefined,
            coverImage: ev.cover_image,
            highlights: Array.isArray(ev.highlights) ? ev.highlights : [],
            keyPartners: Array.isArray(ev.key_partners) ? ev.key_partners : [],
          }));
        }
        return INITIAL_EDITIONS;
      }
      return data.map(mapRowToEdition);
    } catch (err) {
      console.warn('[Supabase] Erreur fetchEditions:', err);
      return INITIAL_EDITIONS;
    }
  },

  async updateEdition(edition: EditionArchive): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const row = mapEditionToRow(edition);
      const { error } = await client.from('editions').update(row).eq('id', edition.id);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception updateEdition:', err);
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // 4. GALERIE PHOTOS
  // --------------------------------------------------------------------------
  async fetchGallery(): Promise<GalleryPhoto[]> {
    const client = getSupabaseClient();
    if (!client) return INITIAL_GALLERY;

    try {
      const { data, error } = await client.from('gallery_photos').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        return INITIAL_GALLERY;
      }
      return data.map(mapRowToGalleryPhoto);
    } catch (err) {
      console.warn('[Supabase] Erreur fetchGallery:', err);
      return INITIAL_GALLERY;
    }
  },

  async insertGalleryPhoto(photo: GalleryPhoto): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const row = mapGalleryPhotoToRow(photo);
      const { error } = await client.from('gallery_photos').upsert(row);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception insertGalleryPhoto:', err);
      return false;
    }
  },

  async deleteGalleryPhoto(photoId: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const { error } = await client.from('gallery_photos').delete().eq('id', photoId);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception deleteGalleryPhoto:', err);
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // 5. INTERVIEWS VIDÉOS
  // --------------------------------------------------------------------------
  async fetchInterviews(): Promise<ExhibitorInterview[]> {
    const client = getSupabaseClient();
    if (!client) return INITIAL_INTERVIEWS;

    try {
      const { data, error } = await client.from('exhibitor_interviews').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        return INITIAL_INTERVIEWS;
      }
      return data.map(mapRowToInterview);
    } catch (err) {
      console.warn('[Supabase] Erreur fetchInterviews:', err);
      return INITIAL_INTERVIEWS;
    }
  },

  async insertInterview(interview: ExhibitorInterview): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const row = mapInterviewToRow(interview);
      const { error } = await client.from('exhibitor_interviews').upsert(row);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception insertInterview:', err);
      return false;
    }
  },

  async deleteInterview(interviewId: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const { error } = await client.from('exhibitor_interviews').delete().eq('id', interviewId);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception deleteInterview:', err);
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // 6. FACTURES EXPOSANTS
  // --------------------------------------------------------------------------
  async fetchInvoices(exhibitorId?: string): Promise<InvoiceDocument[]> {
    const client = getSupabaseClient();
    if (!client) return INITIAL_INVOICES;

    try {
      let query = client.from('invoices').select('*').order('created_at', { ascending: false });
      if (exhibitorId) {
        query = query.eq('exhibitor_id', exhibitorId);
      }
      const { data, error } = await query;
      if (error || !data || data.length === 0) {
        return INITIAL_INVOICES;
      }
      return data.map(mapRowToInvoice);
    } catch (err) {
      console.warn('[Supabase] Erreur fetchInvoices:', err);
      return INITIAL_INVOICES;
    }
  },

  // --------------------------------------------------------------------------
  // 7. FORMULAIRES VISITEURS & BADGES (CRÉATION EN DIRECT DANS SUPABASE)
  // --------------------------------------------------------------------------
  async registerVisitorBadge(badge: VisitorBadge): Promise<{ success: boolean; error?: string; badge?: VisitorBadge }> {
    const client = getSupabaseClient();

    const newBadgeId = badge.id || 'vis-bdg-' + Date.now();
    const payload = {
      id: newBadgeId,
      badge_number: badge.badgeNumber,
      full_name: badge.fullName,
      company_name: badge.company || badge.companyName || '',
      job_title: badge.jobTitle,
      email: badge.email,
      phone: badge.phone,
      visitor_profile: badge.visitorProfile || 'Professionnel B2B',
      city: badge.city || 'Casablanca',
      country: badge.country || 'Maroc',
      qr_payload: badge.qrPayload || '',
      registration_date: badge.registrationDate || new Date().toLocaleDateString('fr-FR'),
      status: 'active',
    };

    // Enregistrement local en temps réel pour mode réel (démarrage à 0)
    try {
      const stored = localStorage.getItem('gea_visitor_badges');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(payload);
      localStorage.setItem('gea_visitor_badges', JSON.stringify(list));
    } catch (e) {
      console.warn('Erreur stockage local badge:', e);
    }

    if (!client) {
      return { success: true, badge };
    }

    try {
      const { data, error } = await client.from('visitor_badges').insert(payload).select().single();
      if (error) {
        // Fallback vers la table visitors
        const { data: vData, error: vError } = await client.from('visitors').insert({
          id: newBadgeId,
          badge_number: badge.badgeNumber,
          full_name: badge.fullName,
          company: badge.company || badge.companyName || '',
          job_title: badge.jobTitle,
          email: badge.email,
          phone: badge.phone,
          visitor_profile: badge.visitorProfile || 'Professionnel B2B',
          city: badge.city || 'Casablanca',
          country: badge.country || 'Maroc',
          qr_code: badge.qrPayload || '',
          registration_date: badge.registrationDate || new Date().toLocaleDateString('fr-FR'),
          status: 'active',
        }).select().single();

        if (vError) {
          console.error('[Supabase] Erreur registerVisitorBadge:', vError);
          return { success: true, badge }; // Le badge est sauvegardé en local
        }
        return { success: true, badge: { ...badge, id: vData.id } };
      }
      return {
        success: true,
        badge: {
          ...badge,
          id: data.id,
        },
      };
    } catch (err: any) {
      console.error('[Supabase] Exception registerVisitorBadge:', err);
      return { success: true, badge };
    }
  },

  async fetchVisitorBadges(): Promise<any[]> {
    const client = getSupabaseClient();
    const getLocal = () => {
      try {
        const stored = localStorage.getItem('gea_visitor_badges');
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    };

    if (!client) return getLocal();

    try {
      const { data, error } = await client.from('visitor_badges').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        const res = await client.from('visitors').select('*').order('created_at', { ascending: false });
        if (!res.error && res.data && res.data.length > 0) {
          return res.data.map((v: any) => ({
            ...v,
            company_name: v.company || v.company_name,
            qr_payload: v.qr_code || v.qr_payload,
          }));
        }
        return getLocal();
      }
      return data || [];
    } catch (err) {
      return getLocal();
    }
  },

  // --------------------------------------------------------------------------
  // 8. RÉSERVATIONS DE STAND / DEVIS (CRÉATION EN DIRECT DANS SUPABASE)
  // --------------------------------------------------------------------------
  async submitStandBooking(
    booking: StandBookingRequest & { reference: string; date?: string }
  ): Promise<{ success: boolean; error?: string; id?: string }> {
    const client = getSupabaseClient();

    const payload = {
      id: 'book-' + Date.now(),
      reference: booking.reference,
      company_name: booking.companyName,
      contact_name: booking.contactName || booking.contactPerson || '',
      job_title: booking.jobTitle || '',
      email: booking.email,
      phone: booking.phone,
      city: booking.city || 'Casablanca',
      country: booking.country || 'Maroc',
      surface_sq_meters: booking.surfaceSqMeters || booking.surface || 18,
      stand_type: booking.standType || 'equipped',
      sector_id: booking.sectorId || null,
      special_requests: booking.specialRequests || booking.notes || '',
      estimated_price_mad: booking.estimatedPriceMAD || 0,
      status: 'pending',
    };

    // Enregistrement local en temps réel pour mode réel (démarrage à 0)
    try {
      const stored = localStorage.getItem('gea_stand_bookings');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(payload);
      localStorage.setItem('gea_stand_bookings', JSON.stringify(list));
    } catch (e) {
      console.warn('Erreur stockage local booking:', e);
    }

    if (!client) {
      return { success: true, id: payload.id };
    }

    try {
      const { data, error } = await client.from('stand_bookings').insert(payload).select().single();
      if (error) {
        // Fallback vers la table registrations
        const { data: rData, error: rError } = await client.from('registrations').insert({
          id: payload.id,
          reference: booking.reference,
          registration_type: 'stand_booking',
          company_name: booking.companyName,
          contact_name: booking.contactName || booking.contactPerson || '',
          job_title: booking.jobTitle || '',
          email: booking.email,
          phone: booking.phone,
          city: booking.city || 'Casablanca',
          country: booking.country || 'Maroc',
          surface_sqm: booking.surfaceSqMeters || booking.surface || 18,
          stand_type: booking.standType || 'equipped',
          sector_id: booking.sectorId || null,
          special_requests: booking.specialRequests || booking.notes || '',
          estimated_price_mad: booking.estimatedPriceMAD || 0,
          status: 'pending',
        }).select().single();

        if (rError) {
          console.error('[Supabase] Erreur submitStandBooking:', rError);
          return { success: true, id: payload.id }; // Sauvegardé en local
        }
        return { success: true, id: rData?.id || payload.id };
      }
      return { success: true, id: data?.id || payload.id };
    } catch (err: any) {
      console.error('[Supabase] Exception submitStandBooking:', err);
      return { success: true, id: payload.id };
    }
  },

  async fetchStandBookings(): Promise<any[]> {
    const client = getSupabaseClient();
    const getLocal = () => {
      try {
        const stored = localStorage.getItem('gea_stand_bookings');
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    };

    if (!client) return getLocal();

    try {
      const { data, error } = await client.from('stand_bookings').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        const res = await client.from('registrations').select('*').order('created_at', { ascending: false });
        if (!res.error && res.data && res.data.length > 0) {
          return res.data.map((r: any) => ({
            ...r,
            surface_sq_meters: r.surface_sqm || r.surface_sq_meters,
          }));
        }
        return getLocal();
      }
      return data || [];
    } catch (err) {
      return getLocal();
    }
  },

  // --------------------------------------------------------------------------
  // NOUVELLES FONCTIONNALITÉS CONNECTÉES : NEWS, PARTNERS & SECTORS
  // --------------------------------------------------------------------------
  async fetchNews(): Promise<NewsArticle[]> {
    const client = getSupabaseClient();
    if (!client) return NEWS_ARTICLES;

    try {
      let { data, error } = await client.from('news').select('*').order('date', { ascending: false });
      if (error || !data || data.length === 0) {
        const res = await client.from('news_articles').select('*').order('date', { ascending: false });
        if (!res.error && res.data && res.data.length > 0) {
          data = res.data;
        } else {
          return NEWS_ARTICLES;
        }
      }
      return data.map((n: any) => ({
        id: n.id,
        slug: n.slug,
        title: n.title,
        category: n.category,
        date: n.date,
        readTime: n.read_time || '3 min',
        summary: n.summary,
        content: Array.isArray(n.content) ? n.content : [],
        paragraphs: Array.isArray(n.content) ? n.content : [],
        image: n.image,
        author: n.author || 'Comité Garden Expo',
        tags: Array.isArray(n.tags) ? n.tags : [],
      }));
    } catch (err) {
      return NEWS_ARTICLES;
    }
  },

  async fetchPartners(): Promise<Partner[]> {
    const client = getSupabaseClient();
    if (!client) return PARTNERS_DATA;

    try {
      const { data, error } = await client.from('partners').select('*').order('name', { ascending: true });
      if (error || !data || data.length === 0) {
        return PARTNERS_DATA;
      }
      return data.map((p: any) => ({
        id: p.id,
        name: p.name,
        badge: p.badge || '',
        role: p.role || '',
        website: p.website || undefined,
        category: p.category || 'institutional',
      }));
    } catch (err) {
      return PARTNERS_DATA;
    }
  },

  async fetchSectors(): Promise<Sector[]> {
    const client = getSupabaseClient();
    if (!client) return SECTORS_DATA;

    try {
      const { data, error } = await client.from('sectors').select('*').order('title', { ascending: true });
      if (error || !data || data.length === 0) {
        return SECTORS_DATA;
      }
      return data.map((s: any) => ({
        id: s.id,
        title: s.title,
        shortDesc: s.short_desc || '',
        fullDesc: s.full_desc || '',
        iconName: s.icon_name || 'Trees',
        image: s.image || '',
        products: Array.isArray(s.products) ? s.products : [],
        targetAudience: Array.isArray(s.target_audience) ? s.target_audience : [],
        marketKeyFigures: s.market_key_figures || undefined,
      }));
    } catch (err) {
      return SECTORS_DATA;
    }
  },

  async submitSponsorshipInquiry(data: {
    company: string;
    contact: string;
    email: string;
    phone: string;
    packageName: string;
    comments?: string;
  }): Promise<{ success: boolean; error?: string }> {
    const client = getSupabaseClient();
    const reference = 'SPON-' + Math.floor(10000 + Math.random() * 90000);
    const regPayload = {
      id: 'spon-' + Date.now(),
      reference,
      registration_type: 'sponsor',
      company_name: data.company,
      contact_name: data.contact,
      email: data.email,
      phone: data.phone,
      special_requests: `Formule sponsoring choisie: ${data.packageName}. Commentaires: ${data.comments || 'Aucun'}`,
      status: 'pending',
    };

    if (!client) return { success: true };

    try {
      const { error } = await client.from('registrations').insert(regPayload);
      if (error) {
        // Fallback vers contact_messages
        await client.from('contact_messages').insert({
          id: regPayload.id,
          name: data.contact,
          email: data.email,
          phone: data.phone,
          subject: `Demande de Sponsoring - ${data.packageName}`,
          message: `Société: ${data.company}\nFormule: ${data.packageName}\nCommentaires: ${data.comments || 'Aucun'}`,
          status: 'unread',
        });
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // --------------------------------------------------------------------------
  // 9. FORMULAIRE DE CONTACT (CRÉATION EN DIRECT DANS SUPABASE)
  // --------------------------------------------------------------------------
  async submitContactMessage(msg: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; error?: string }> {
    const client = getSupabaseClient();

    const payload = {
      id: 'msg-' + Date.now(),
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      subject: msg.subject,
      message: msg.message,
      status: 'unread',
    };

    // Enregistrement local en temps réel pour mode réel (démarrage à 0)
    try {
      const stored = localStorage.getItem('gea_contact_messages');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(payload);
      localStorage.setItem('gea_contact_messages', JSON.stringify(list));
    } catch (e) {
      console.warn('Erreur stockage local message:', e);
    }

    if (!client) {
      return { success: true };
    }

    try {
      const { error } = await client.from('contact_messages').insert(payload);
      if (error) {
        console.error('[Supabase] Erreur submitContactMessage:', error);
        return { success: true }; // Sauvegardé en local
      }
      return { success: true };
    } catch (err: any) {
      console.error('[Supabase] Exception submitContactMessage:', err);
      return { success: true };
    }
  },

  async fetchContactMessages(): Promise<any[]> {
    const client = getSupabaseClient();
    const getLocal = () => {
      try {
        const stored = localStorage.getItem('gea_contact_messages');
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    };

    if (!client) return getLocal();

    try {
      const { data, error } = await client.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) return getLocal();
      return data || [];
    } catch (err) {
      return getLocal();
    }
  },

  // --------------------------------------------------------------------------
  // RÉINITIALISATION COMPLÈTE EN MODE RÉEL (COMMENCER À 0)
  // --------------------------------------------------------------------------
  resetAllCountersToZero(): void {
    try {
      localStorage.removeItem('gea_visitor_badges');
      localStorage.removeItem('gea_stand_bookings');
      localStorage.removeItem('gea_contact_messages');
      localStorage.removeItem('gea_invoices');
      localStorage.removeItem('gea_exhibitor_leads');
      localStorage.removeItem('gea_exhibitor_meetings');
      localStorage.removeItem('gea_exhibitor_team_badges');
      const vis = localStorage.getItem('gea_visitor_account');
      if (vis) {
        try {
          const parsed = JSON.parse(vis);
          localStorage.setItem('gea_visitor_account', JSON.stringify({
            ...parsed,
            favoriteExhibitorIds: [],
            plannedVisits: [],
          }));
        } catch (e) {}
      }
    } catch (e) {
      console.warn('Erreur resetAllCountersToZero:', e);
    }
  },

  // --------------------------------------------------------------------------
  // 10. COMPTE VISITEUR & FAVORIS
  // --------------------------------------------------------------------------
  async saveVisitorAccount(account: VisitorAccount): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const payload = {
        id: account.id,
        user_id: account.userId,
        badge_number: account.badgeNumber,
        registration_date: account.registrationDate,
        favorite_exhibitor_ids: account.favoriteExhibitorIds,
        planned_visits: account.plannedVisits,
        qr_payload: account.qrPayload,
      };
      const { error } = await client.from('visitor_accounts').upsert(payload);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception saveVisitorAccount:', err);
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // 11. AUTHENTIFICATION SUPABASE (SESSIONS, PROFILES & RÔLES)
  // --------------------------------------------------------------------------
  async fetchUserProfile(userId: string): Promise<UserProfile | null> {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data, error } = await client.from('user_profiles').select('*').eq('id', userId).single();
      if (error || !data) return null;
      return {
        id: data.id,
        email: data.email,
        role: data.role as UserRole,
        fullName: data.full_name,
        companyName: data.company_name,
        jobTitle: data.job_title,
        phone: data.phone,
        country: data.country,
        city: data.city,
        avatarUrl: data.avatar_url,
        exhibitorId: data.exhibitor_id,
      };
    } catch (err) {
      return null;
    }
  },

  async saveUserProfile(profile: UserProfile): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const payload = {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        full_name: profile.fullName,
        company_name: profile.companyName,
        job_title: profile.jobTitle,
        phone: profile.phone,
        country: profile.country || 'Maroc',
        city: profile.city || 'Casablanca',
        avatar_url: profile.avatarUrl,
        exhibitor_id: profile.exhibitorId || null,
      };
      const { error } = await client.from('user_profiles').upsert(payload);
      return !error;
    } catch (err) {
      console.error('[Supabase] Exception saveUserProfile:', err);
      return false;
    }
  },

  /**
   * Initialise les données par défaut dans Supabase si les tables sont vides
   */
  async seedSupabaseIfEmpty(): Promise<{ seeded: boolean; message: string }> {
    const client = getSupabaseClient();
    if (!client) {
      return { seeded: false, message: 'Supabase non configuré' };
    }

    try {
      // Vérifier si des exposants existent
      const { count, error: countErr } = await client
        .from('exhibitors')
        .select('*', { count: 'exact', head: true });

      if (countErr) {
        return { seeded: false, message: `Table inaccessible : ${countErr.message}` };
      }

      if (count && count > 0) {
        return { seeded: false, message: `${count} exposants déjà présents dans Supabase.` };
      }

      // Insérer les stands
      for (const s of INITIAL_STANDS) {
        await client.from('stands').upsert(mapStandToRow(s));
      }

      // Insérer les exposants
      for (const ex of INITIAL_EXHIBITORS) {
        await client.from('exhibitors').upsert(mapExhibitorToRow(ex));
      }

      // Insérer les éditions
      for (const ed of INITIAL_EDITIONS) {
        await client.from('editions').upsert(mapEditionToRow(ed));
      }

      // Insérer la galerie
      for (const g of INITIAL_GALLERY) {
        await client.from('gallery_photos').upsert(mapGalleryPhotoToRow(g));
      }

      // Insérer les interviews
      for (const it of INITIAL_INTERVIEWS) {
        await client.from('exhibitor_interviews').upsert(mapInterviewToRow(it));
      }

      // Insérer les factures
      for (const inv of INITIAL_INVOICES) {
        await client.from('invoices').upsert(mapInvoiceToRow(inv));
      }

      // Insérer les profils de démonstration
      for (const u of DEMO_USERS) {
        await client.from('user_profiles').upsert({
          id: u.id,
          email: u.email,
          role: u.role,
          full_name: u.fullName,
          company_name: u.companyName,
          job_title: u.jobTitle,
          phone: u.phone,
          country: u.country || 'Maroc',
          city: u.city || 'Casablanca',
          avatar_url: u.avatarUrl,
          exhibitor_id: u.exhibitorId || null,
        });
      }

      // Insérer les slides vidéo du hero
      for (const sl of INITIAL_HERO_SLIDES) {
        await client.from('hero_slides').upsert(mapHeroSlideToRow(sl));
      }

      return { seeded: true, message: 'Base de données Supabase initialisée avec succès avec les données Garden Expo.' };
    } catch (err: any) {
      return { seeded: false, message: `Erreur d’initialisation : ${err.message}` };
    }
  },

  // --------------------------------------------------------------------------
  // GESTION DES SLIDES VIDÉO (PAGE D'ACCUEIL)
  // --------------------------------------------------------------------------
  async fetchHeroSlides(): Promise<HeroSlide[]> {
    const client = getSupabaseClient();
    if (!client) return INITIAL_HERO_SLIDES;

    try {
      const { data, error } = await client
        .from('hero_slides')
        .select('*')
        .order('order_index', { ascending: true });

      if (error || !data || data.length === 0) {
        return INITIAL_HERO_SLIDES;
      }

      return data.map(mapRowToHeroSlide);
    } catch (err) {
      console.warn('[Supabase] Erreur fetchHeroSlides:', err);
      return INITIAL_HERO_SLIDES;
    }
  },

  async insertHeroSlide(slide: HeroSlide): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const { error } = await client.from('hero_slides').insert(mapHeroSlideToRow(slide));
      if (error) {
        console.warn('[Supabase] Erreur insertHeroSlide:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[Supabase] Exception insertHeroSlide:', err);
      return false;
    }
  },

  async updateHeroSlide(slide: HeroSlide): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const { error } = await client
        .from('hero_slides')
        .update(mapHeroSlideToRow(slide))
        .eq('id', slide.id);

      if (error) {
        console.warn('[Supabase] Erreur updateHeroSlide:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[Supabase] Exception updateHeroSlide:', err);
      return false;
    }
  },

  async deleteHeroSlide(slideId: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) return true;

    try {
      const { error } = await client.from('hero_slides').delete().eq('id', slideId);
      if (error) {
        console.warn('[Supabase] Erreur deleteHeroSlide:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[Supabase] Exception deleteHeroSlide:', err);
      return false;
    }
  },
};
