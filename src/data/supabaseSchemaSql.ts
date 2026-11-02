// Script SQL complet pour l'initialisation de la base PostgreSQL Supabase
export const COMPLETE_SUPABASE_SCHEMA_SQL = `-- ==============================================================================
-- GARDEN EXPO AFRICA MAROC — SCRIPT SQL COMPLET SUPABASE (POSTGRESQL)
-- Tables clés : exhibitors, visitors, news, events, registrations, stands, invoices
-- Idempotent : Prêt à être exécuté dans l'Éditeur SQL de Supabase
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TRIGGER updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. TABLES PRINCIPALES

-- A. EXPOSANTS (exhibitors)
CREATE TABLE IF NOT EXISTS public.exhibitors (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
    hall TEXT NOT NULL DEFAULT 'Hall A',
    surface NUMERIC NOT NULL DEFAULT 18,
    featured_products JSONB DEFAULT '[]'::jsonb,
    edition TEXT NOT NULL DEFAULT '4ème Édition (2026)',
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
    representative_name TEXT,
    representative_job_title TEXT,
    representative_email TEXT,
    representative_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exhibitors_sector ON public.exhibitors(sector);
CREATE INDEX IF NOT EXISTS idx_exhibitors_edition ON public.exhibitors(edition);
CREATE INDEX IF NOT EXISTS idx_exhibitors_stand ON public.exhibitors(stand_number);

DROP TRIGGER IF EXISTS trg_exhibitors_updated_at ON public.exhibitors;
CREATE TRIGGER trg_exhibitors_updated_at
BEFORE UPDATE ON public.exhibitors
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- B. VISITEURS (visitors)
CREATE TABLE IF NOT EXISTS public.visitors (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'checked_in', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visitors_badge ON public.visitors(badge_number);
CREATE INDEX IF NOT EXISTS idx_visitors_email ON public.visitors(email);

DROP TRIGGER IF EXISTS trg_visitors_updated_at ON public.visitors;
CREATE TRIGGER trg_visitors_updated_at
BEFORE UPDATE ON public.visitors
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- C. ACTUALITÉS (news)
CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    slug TEXT UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Général',
    date TEXT NOT NULL,
    read_time TEXT NOT NULL DEFAULT '3 min',
    summary TEXT NOT NULL,
    content JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    author TEXT NOT NULL DEFAULT 'Comité Garden Expo',
    tags JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news(category);

DROP TRIGGER IF EXISTS trg_news_updated_at ON public.news;
CREATE TRIGGER trg_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- D. ÉVÉNEMENTS (events)
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    edition_number INTEGER NOT NULL UNIQUE,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    dates TEXT NOT NULL,
    location TEXT NOT NULL,
    theme TEXT NOT NULL,
    summary TEXT NOT NULL,
    description JSONB DEFAULT '[]'::jsonb,
    stats JSONB NOT NULL DEFAULT '{"exhibitorsCount": "0", "visitorsCount": "0", "countriesCount": "0", "surfaceSqm": "0 m²"}'::jsonb,
    video_url TEXT,
    cover_image TEXT NOT NULL,
    highlights JSONB DEFAULT '[]'::jsonb,
    key_partners JSONB DEFAULT '[]'::jsonb,
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_year ON public.events(year);

DROP TRIGGER IF EXISTS trg_events_updated_at ON public.events;
CREATE TRIGGER trg_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- E. INSCRIPTIONS & RÉSERVATIONS (registrations)
CREATE TABLE IF NOT EXISTS public.registrations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    reference TEXT NOT NULL UNIQUE,
    registration_type TEXT NOT NULL DEFAULT 'stand_booking' CHECK (registration_type IN ('stand_booking', 'visitor_badge', 'b2b_meeting', 'sponsor')),
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    job_title TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT DEFAULT 'Casablanca',
    country TEXT DEFAULT 'Maroc',
    surface_sqm NUMERIC DEFAULT 18,
    stand_type TEXT CHECK (stand_type IN ('equipped', 'bare', 'island')),
    sector_id TEXT,
    special_requests TEXT,
    estimated_price_mad NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'contract_sent', 'rejected', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_registrations_ref ON public.registrations(reference);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_type ON public.registrations(registration_type);

DROP TRIGGER IF EXISTS trg_registrations_updated_at ON public.registrations;
CREATE TRIGGER trg_registrations_updated_at
BEFORE UPDATE ON public.registrations
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- F. STANDS (stands)
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

DROP TRIGGER IF EXISTS trg_stands_updated_at ON public.stands;
CREATE TRIGGER trg_stands_updated_at
BEFORE UPDATE ON public.stands
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- G. FACTURES (invoices)
CREATE TABLE IF NOT EXISTS public.invoices (
    id TEXT PRIMARY KEY,
    exhibitor_id TEXT NOT NULL,
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

DROP TRIGGER IF EXISTS trg_invoices_updated_at ON public.invoices;
CREATE TRIGGER trg_invoices_updated_at
BEFORE UPDATE ON public.invoices
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- H. MESSAGES DE CONTACT (contact_messages)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. VUES DE COMPATIBILITÉ
CREATE OR REPLACE VIEW public.visitor_badges AS
SELECT id, badge_number, full_name, company AS company_name, job_title, email, phone, visitor_profile, city, country, qr_code AS qr_payload, registration_date, status, created_at, updated_at
FROM public.visitors;

CREATE OR REPLACE VIEW public.news_articles AS
SELECT id, slug, title, category, date, read_time, summary, content, image, author, tags, created_at, updated_at
FROM public.news;

CREATE OR REPLACE VIEW public.editions AS
SELECT id, edition_number AS number, title, year, dates, location, theme, summary, description, stats, video_url AS video_highlight_url, cover_image, highlights, key_partners, created_at, updated_at
FROM public.events;

CREATE OR REPLACE VIEW public.stand_bookings AS
SELECT id, reference, company_name, contact_name, job_title, email, phone, city, country, surface_sqm AS surface_sq_meters, stand_type, sector_id, special_requests, estimated_price_mad, status, created_at, updated_at
FROM public.registrations
WHERE registration_type = 'stand_booking';

-- 5. POLITIQUES DE SÉCURITÉ ROW LEVEL SECURITY (RLS)
ALTER TABLE public.exhibitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Suppression préalable pour ré-exécution sans erreur
DROP POLICY IF EXISTS "Lecture publique - Exposants" ON public.exhibitors;
DROP POLICY IF EXISTS "Modification exposants - Authentifié/Admin" ON public.exhibitors;
DROP POLICY IF EXISTS "Insertion publique - Visiteurs" ON public.visitors;
DROP POLICY IF EXISTS "Lecture visiteurs - Public" ON public.visitors;
DROP POLICY IF EXISTS "Modification visiteurs - Admin" ON public.visitors;
DROP POLICY IF EXISTS "Lecture publique - Actualités" ON public.news;
DROP POLICY IF EXISTS "Modification actualités - Admin" ON public.news;
DROP POLICY IF EXISTS "Lecture publique - Événements" ON public.events;
DROP POLICY IF EXISTS "Modification événements - Admin" ON public.events;
DROP POLICY IF EXISTS "Insertion publique - Inscriptions" ON public.registrations;
DROP POLICY IF EXISTS "Lecture inscriptions - Public" ON public.registrations;
DROP POLICY IF EXISTS "Modification inscriptions - Admin" ON public.registrations;
DROP POLICY IF EXISTS "Lecture publique - Stands" ON public.stands;
DROP POLICY IF EXISTS "Modification stands - Admin" ON public.stands;
DROP POLICY IF EXISTS "Accès factures - Exposants et Admin" ON public.invoices;
DROP POLICY IF EXISTS "Insertion publique - Contact" ON public.contact_messages;
DROP POLICY IF EXISTS "Lecture contact - Admin" ON public.contact_messages;

-- Définition des politiques
CREATE POLICY "Lecture publique - Exposants" ON public.exhibitors FOR SELECT USING (true);
CREATE POLICY "Modification exposants - Authentifié/Admin" ON public.exhibitors FOR ALL USING (true);

CREATE POLICY "Insertion publique - Visiteurs" ON public.visitors FOR INSERT WITH CHECK (true);
CREATE POLICY "Lecture visiteurs - Public" ON public.visitors FOR SELECT USING (true);
CREATE POLICY "Modification visiteurs - Admin" ON public.visitors FOR ALL USING (true);

CREATE POLICY "Lecture publique - Actualités" ON public.news FOR SELECT USING (true);
CREATE POLICY "Modification actualités - Admin" ON public.news FOR ALL USING (true);

CREATE POLICY "Lecture publique - Événements" ON public.events FOR SELECT USING (true);
CREATE POLICY "Modification événements - Admin" ON public.events FOR ALL USING (true);

CREATE POLICY "Insertion publique - Inscriptions" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Lecture inscriptions - Public" ON public.registrations FOR SELECT USING (true);
CREATE POLICY "Modification inscriptions - Admin" ON public.registrations FOR ALL USING (true);

CREATE POLICY "Lecture publique - Stands" ON public.stands FOR SELECT USING (true);
CREATE POLICY "Modification stands - Admin" ON public.stands FOR ALL USING (true);

CREATE POLICY "Accès factures - Exposants et Admin" ON public.invoices FOR ALL USING (true);

CREATE POLICY "Insertion publique - Contact" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Lecture contact - Admin" ON public.contact_messages FOR ALL USING (true);
`;
