-- ==============================================================================
-- GARDEN EXPO AFRICA MAROC — SCHÉMA COMPLET SUPABASE (POSTGRESQL)
-- Salon International du Paysage, de l'Aménagement Urbain & de la Ville Verte
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. FONCTION DE MISE À JOUR AUTOMATIQUE DU CHAMP updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. TABLES DU SYSTÈME (14 TABLES RELATIONNELLES)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- A. SECTEURS D'ACTIVITÉ (sectors)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sectors (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    short_desc TEXT,
    full_desc TEXT,
    icon_name TEXT DEFAULT 'Trees',
    image TEXT,
    products JSONB DEFAULT '[]'::jsonb,
    target_audience JSONB DEFAULT '[]'::jsonb,
    market_key_figures TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_sectors_updated_at ON public.sectors;
CREATE TRIGGER update_sectors_updated_at
BEFORE UPDATE ON public.sectors
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- B. PLANS & STANDS DU SALON (stands)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.stands (
    id TEXT PRIMARY KEY,
    hall TEXT NOT NULL,
    number TEXT NOT NULL UNIQUE,
    surface_sq_meters NUMERIC NOT NULL DEFAULT 18,
    dimensions TEXT NOT NULL DEFAULT '6m x 3m',
    type TEXT NOT NULL CHECK (type IN ('equipped', 'bare', 'island')),
    svg_coords JSONB NOT NULL DEFAULT '{"x": 0, "y": 0, "width": 80, "height": 60}'::jsonb,
    exhibitor_id TEXT,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'confirmed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stands_status ON public.stands(status);
CREATE INDEX IF NOT EXISTS idx_stands_hall ON public.stands(hall);

DROP TRIGGER IF EXISTS update_stands_updated_at ON public.stands;
CREATE TRIGGER update_stands_updated_at
BEFORE UPDATE ON public.stands
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- C. ANNUAIRE OFFICIEL DES EXPOSANTS (exhibitors)
-- ------------------------------------------------------------------------------
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
    stand_id TEXT REFERENCES public.stands(id) ON DELETE SET NULL,
    surface NUMERIC NOT NULL DEFAULT 18,
    featured_products JSONB DEFAULT '[]'::jsonb,
    edition TEXT NOT NULL DEFAULT '4ème Édition (2026)',
    participation_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (participation_status IN ('confirmed', 'pending_validation', 'contract_signed')),
    representative_name TEXT,
    representative_job_title TEXT,
    representative_email TEXT,
    representative_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exhibitors_sector ON public.exhibitors(sector);
CREATE INDEX IF NOT EXISTS idx_exhibitors_edition ON public.exhibitors(edition);
CREATE INDEX IF NOT EXISTS idx_exhibitors_stand_number ON public.exhibitors(stand_number);

DROP TRIGGER IF EXISTS update_exhibitors_updated_at ON public.exhibitors;
CREATE TRIGGER update_exhibitors_updated_at
BEFORE UPDATE ON public.exhibitors
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- D. ARCHIVES DES ÉDITIONS DU SALON (editions)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.editions (
    id TEXT PRIMARY KEY,
    number INTEGER NOT NULL UNIQUE,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    dates TEXT NOT NULL,
    location TEXT NOT NULL,
    theme TEXT NOT NULL,
    summary TEXT NOT NULL,
    description JSONB DEFAULT '[]'::jsonb,
    stats JSONB NOT NULL DEFAULT '{"exhibitorsCount": "0", "visitorsCount": "0", "countriesCount": "0", "surfaceSqm": "0 m²"}'::jsonb,
    video_highlight_url TEXT,
    cover_image TEXT NOT NULL,
    highlights JSONB DEFAULT '[]'::jsonb,
    key_partners JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_editions_year ON public.editions(year);

DROP TRIGGER IF EXISTS update_editions_updated_at ON public.editions;
CREATE TRIGGER update_editions_updated_at
BEFORE UPDATE ON public.editions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- E. GALERIE PHOTOS HD DU SALON (gallery_photos)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_photos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    edition TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('general', 'stands', 'inauguration', 'visitors', 'conferences', 'animations', 'partners')),
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_photos_edition ON public.gallery_photos(edition);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_category ON public.gallery_photos(category);

DROP TRIGGER IF EXISTS update_gallery_photos_updated_at ON public.gallery_photos;
CREATE TRIGGER update_gallery_photos_updated_at
BEFORE UPDATE ON public.gallery_photos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- F. INTERVIEWS VIDÉOS & TÉMOIGNAGES B2B (exhibitor_interviews)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.exhibitor_interviews (
    id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    logo TEXT,
    speaker_name TEXT NOT NULL,
    speaker_title TEXT NOT NULL,
    edition TEXT NOT NULL,
    quote TEXT NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_exhibitor_interviews_updated_at ON public.exhibitor_interviews;
CREATE TRIGGER update_exhibitor_interviews_updated_at
BEFORE UPDATE ON public.exhibitor_interviews
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- G. PARTENAIRES OFFICIELS & MÉDIAS (partners)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    badge TEXT,
    role TEXT NOT NULL,
    website TEXT,
    category TEXT NOT NULL CHECK (category IN ('institutional', 'media', 'sponsor', 'academic', 'association')),
    logo TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_partners_updated_at ON public.partners;
CREATE TRIGGER update_partners_updated_at
BEFORE UPDATE ON public.partners
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- H. ACTUALITÉS & ARTICLES DE PRESSE (news_articles)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.news_articles (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL,
    summary TEXT NOT NULL,
    content JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    author TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_news_articles_updated_at ON public.news_articles;
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- I. PROFILS UTILISATEURS & RÔLES (user_profiles)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'visitor' CHECK (role IN ('super_admin', 'admin', 'exhibitor', 'visitor')),
    full_name TEXT NOT NULL,
    company_name TEXT,
    job_title TEXT,
    phone TEXT,
    country TEXT DEFAULT 'Maroc',
    city TEXT DEFAULT 'Casablanca',
    avatar_url TEXT,
    exhibitor_id TEXT REFERENCES public.exhibitors(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- J. COMPTES & FAVORIS VISITEURS (visitor_accounts)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.visitor_accounts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    badge_number TEXT NOT NULL,
    registration_date TEXT NOT NULL,
    favorite_exhibitor_ids JSONB DEFAULT '[]'::jsonb,
    planned_visits JSONB DEFAULT '[]'::jsonb,
    qr_payload TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visitor_accounts_user ON public.visitor_accounts(user_id);

DROP TRIGGER IF EXISTS update_visitor_accounts_updated_at ON public.visitor_accounts;
CREATE TRIGGER update_visitor_accounts_updated_at
BEFORE UPDATE ON public.visitor_accounts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- K. BADGES VISITEURS ENREGISTRÉS (visitor_badges)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.visitor_badges (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    badge_number TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    visitor_profile TEXT NOT NULL,
    country TEXT DEFAULT 'Maroc',
    city TEXT DEFAULT 'Casablanca',
    qr_payload TEXT NOT NULL,
    registration_date TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'checked_in', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visitor_badges_number ON public.visitor_badges(badge_number);
CREATE INDEX IF NOT EXISTS idx_visitor_badges_email ON public.visitor_badges(email);

DROP TRIGGER IF EXISTS update_visitor_badges_updated_at ON public.visitor_badges;
CREATE TRIGGER update_visitor_badges_updated_at
BEFORE UPDATE ON public.visitor_badges
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- L. DEMANDES DE RÉSERVATION DE STAND / DEVIS (stand_bookings)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.stand_bookings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    reference TEXT NOT NULL UNIQUE,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    job_title TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT,
    country TEXT DEFAULT 'Maroc',
    surface_sq_meters NUMERIC NOT NULL DEFAULT 18,
    stand_type TEXT NOT NULL CHECK (stand_type IN ('equipped', 'bare', 'island')),
    sector_id TEXT,
    special_requests TEXT,
    estimated_price_mad NUMERIC,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contract_sent', 'confirmed', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stand_bookings_ref ON public.stand_bookings(reference);
CREATE INDEX IF NOT EXISTS idx_stand_bookings_status ON public.stand_bookings(status);

DROP TRIGGER IF EXISTS update_stand_bookings_updated_at ON public.stand_bookings;
CREATE TRIGGER update_stand_bookings_updated_at
BEFORE UPDATE ON public.stand_bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- M. FACTURES & DOCUMENTS OFFICIELS EXPOSANTS (invoices)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.invoices (
    id TEXT PRIMARY KEY,
    exhibitor_id TEXT NOT NULL REFERENCES public.exhibitors(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('invoice', 'contract', 'technical_guide', 'badge_pass')),
    title TEXT NOT NULL,
    reference_number TEXT NOT NULL UNIQUE,
    amount_mad NUMERIC DEFAULT 0,
    status TEXT NOT NULL CHECK (status IN ('paid', 'pending', 'signed', 'ready')),
    date TEXT NOT NULL,
    download_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invoices_exhibitor ON public.invoices(exhibitor_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);

DROP TRIGGER IF EXISTS update_invoices_updated_at ON public.invoices;
CREATE TRIGGER update_invoices_updated_at
BEFORE UPDATE ON public.invoices
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- N. MESSAGES DU FORMULAIRE DE CONTACT (contact_messages)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived', 'replied')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON public.contact_messages(created_at DESC);

DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON public.contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 4. POLITIQUES DE SÉCURITÉ ROW LEVEL SECURITY (RLS)
-- ==============================================================================

ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibitor_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stand_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Suppression préalable pour idempotence
DROP POLICY IF EXISTS "Lecture publique pour tous - Secteurs" ON public.sectors;
DROP POLICY IF EXISTS "Lecture publique pour tous - Stands" ON public.stands;
DROP POLICY IF EXISTS "Lecture publique pour tous - Exposants" ON public.exhibitors;
DROP POLICY IF EXISTS "Lecture publique pour tous - Editions" ON public.editions;
DROP POLICY IF EXISTS "Lecture publique pour tous - Galerie" ON public.gallery_photos;
DROP POLICY IF EXISTS "Lecture publique pour tous - Interviews" ON public.exhibitor_interviews;
DROP POLICY IF EXISTS "Lecture publique pour tous - Partenaires" ON public.partners;
DROP POLICY IF EXISTS "Lecture publique pour tous - Actualités" ON public.news_articles;

DROP POLICY IF EXISTS "Insertion publique - Demande de badge" ON public.visitor_badges;
DROP POLICY IF EXISTS "Lecture des badges - Visiteurs" ON public.visitor_badges;
DROP POLICY IF EXISTS "Insertion publique - Réservation stand" ON public.stand_bookings;
DROP POLICY IF EXISTS "Lecture des réservations - Public" ON public.stand_bookings;
DROP POLICY IF EXISTS "Insertion publique - Message contact" ON public.contact_messages;
DROP POLICY IF EXISTS "Lecture des messages - Public" ON public.contact_messages;

DROP POLICY IF EXISTS "Lecture des profils - Tout utilisateur" ON public.user_profiles;
DROP POLICY IF EXISTS "Insertion de profils - Tout utilisateur" ON public.user_profiles;
DROP POLICY IF EXISTS "Mise à jour profils - Tout utilisateur" ON public.user_profiles;
DROP POLICY IF EXISTS "Gestion des comptes visiteurs" ON public.visitor_accounts;

DROP POLICY IF EXISTS "Gestion des stands - Modification" ON public.stands;
DROP POLICY IF EXISTS "Gestion des exposants - Modification" ON public.exhibitors;
DROP POLICY IF EXISTS "Gestion des éditions - Modification" ON public.editions;
DROP POLICY IF EXISTS "Gestion de la galerie - Modification" ON public.gallery_photos;
DROP POLICY IF EXISTS "Gestion des interviews - Modification" ON public.exhibitor_interviews;
DROP POLICY IF EXISTS "Gestion des factures - Accès complet" ON public.invoices;

-- Recréation des politiques RLS
CREATE POLICY "Lecture publique pour tous - Secteurs" ON public.sectors FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour tous - Stands" ON public.stands FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour tous - Exposants" ON public.exhibitors FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour tous - Editions" ON public.editions FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour tous - Galerie" ON public.gallery_photos FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour tous - Interviews" ON public.exhibitor_interviews FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour tous - Partenaires" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Lecture publique pour tous - Actualités" ON public.news_articles FOR SELECT USING (true);

CREATE POLICY "Insertion publique - Demande de badge" ON public.visitor_badges FOR INSERT WITH CHECK (true);
CREATE POLICY "Lecture des badges - Visiteurs" ON public.visitor_badges FOR SELECT USING (true);

CREATE POLICY "Insertion publique - Réservation stand" ON public.stand_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Lecture des réservations - Public" ON public.stand_bookings FOR SELECT USING (true);

CREATE POLICY "Insertion publique - Message contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Lecture des messages - Public" ON public.contact_messages FOR SELECT USING (true);

CREATE POLICY "Lecture des profils - Tout utilisateur" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Insertion de profils - Tout utilisateur" ON public.user_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Mise à jour profils - Tout utilisateur" ON public.user_profiles FOR UPDATE USING (true);
CREATE POLICY "Gestion des comptes visiteurs" ON public.visitor_accounts FOR ALL USING (true);

CREATE POLICY "Gestion des stands - Modification" ON public.stands FOR ALL USING (true);
CREATE POLICY "Gestion des exposants - Modification" ON public.exhibitors FOR ALL USING (true);
CREATE POLICY "Gestion des éditions - Modification" ON public.editions FOR ALL USING (true);
CREATE POLICY "Gestion de la galerie - Modification" ON public.gallery_photos FOR ALL USING (true);
CREATE POLICY "Gestion des interviews - Modification" ON public.exhibitor_interviews FOR ALL USING (true);
CREATE POLICY "Gestion des factures - Accès complet" ON public.invoices FOR ALL USING (true);

-- ==============================================================================
-- FIN DU SCRIPT SQL DE CRÉATION SUPABASE
-- ==============================================================================
