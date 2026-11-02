-- ==============================================================================
-- GARDEN EXPO AFRICA MAROC — SEED SQL SUPABASE
-- Données initiales certifiées de l'exposition & de la 3ème / 4ème édition
-- ==============================================================================

-- 1. SECTEURS D'ACTIVITÉ
INSERT INTO public.sectors (id, title, short_desc, full_desc, icon_name, image, products, target_audience, market_key_figures)
VALUES
('amenagement-paysager', 'Aménagement Paysager & Végétalisation Urbaine', 'Conception, paysagisme, toitures végétalisées, murs végétaux et génie paysager durable.', 'Le cœur historique du salon, réunissant architectes paysagistes, bureaux d’études et concepteurs urbains pour répondre aux défis de rafraîchissement urbain, trames vertes et création de parcs résilients.', 'Trees', '/src/assets/images/sector_urban_landscape_1793033933666.jpg', '["Toitures et façades végétalisées", "Plantes couvre-sol xérophiles", "Pierres naturelles et dallages drainants", "Paillages minéraux et organiques", "Gazons synthétiques et gazons hybrides", "Ouvrages de soutènement et gabions paysagers"]'::jsonb, '["Architectes paysagistes", "Urbanistes et aménageurs publics", "Promoteurs immobiliers et maîtres d’ouvrage", "Paysagistes concepteurs"]'::jsonb, 'Plus de 2 500 hectares de parcs urbains et coulées vertes en projet au Maroc d’ici 2030.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.sectors (id, title, short_desc, full_desc, icon_name, image, products, target_audience, market_key_figures)
VALUES
('mobilier-urbain', 'Mobilier Urbain & Éclairage Public Éco-Énergétique', 'Bancs, pergolas, corbeilles de tri, abribus et candélabres solaires intelligents.', 'Équiper les espaces publics modernes avec des matériaux biosourcés, durables et antivandalisme. Intégration de luminaires LED à haut rendement et de solutions d’ombrage naturel.', 'Armchair', '/src/assets/images/hero_garden_expo_1793033933452.jpg', '["Bancs et assises en béton fibré et bois certifié FSC", "Pergolas bioclimatiques et ombrières urbaines", "Éclairage public LED solaire et connecté", "Corbeilles de propreté et points d’apport volontaire", "Bornes de recharge solaire et mobilier connecté", "Barrières et signalétique piétonne"]'::jsonb, '["Collectivités territoriales et communes", "Services techniques municipaux", "Gestionnaires de complexes hôteliers et résidentiels", "Entreprises de travaux publics"]'::jsonb, 'Investissements municipaux majeurs dans le cadre de la modernisation des métropoles marocaines.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.sectors (id, title, short_desc, full_desc, icon_name, image, products, target_audience, market_key_figures)
VALUES
('irrigation-eau', 'Irrigation de Précision & Gestion Durable de l’Eau', 'Micro-irrigation, goutte-à-goutte intelligent, réutilisation des eaux usées traitées (REUT).', 'Priorité absolue au Maroc et en Afrique du Nord : valoriser chaque goutte d’eau grâce aux programmateurs connectés, stations météo locales, sondes tensiométriques et réseaux REUT pour les espaces verts.', 'Droplets', '/src/assets/images/sector_smart_irrigation_1793033934496.jpg', '["Systèmes goutte-à-goutte enterrés et micro-asperseurs", "Programmateurs autonomes connectés LoRa/4G", "Sondes tensiométriques et d’humidité du sol", "Filtration industrielle et traitement REUT", "Électrovannes intelligentes et vannes volumétriques", "Pompes solaires et réservoirs de stockage souples"]'::jsonb, '["Gestionnaires de golfs et de domaines sportifs", "Services d’espaces verts des villes", "Installateurs et distributeurs en matériel d’irrigation", "Ingénieurs agronomes et hydrauliciens"]'::jsonb, 'Économie d’eau moyenne de 40% à 60% grâce aux technologies de micro-irrigation intelligente.')
ON CONFLICT (id) DO NOTHING;

-- 2. STANDS DU HALL DES EXPOSITIONS
INSERT INTO public.stands (id, hall, number, surface_sq_meters, dimensions, type, svg_coords, exhibitor_id, status)
VALUES
('stand-a1', 'Hall A - Aménagement & Paysage', 'A-01', 36, '6m x 6m', 'island', '{"x": 60, "y": 60, "width": 110, "height": 80}'::jsonb, 'exh-01', 'confirmed'),
('stand-a2', 'Hall A - Aménagement & Paysage', 'A-02', 24, '6m x 4m', 'equipped', '{"x": 190, "y": 60, "width": 90, "height": 80}'::jsonb, 'exh-02', 'confirmed'),
('stand-a3', 'Hall A - Aménagement & Paysage', 'A-03', 24, '6m x 4m', 'equipped', '{"x": 300, "y": 60, "width": 90, "height": 80}'::jsonb, 'exh-03', 'confirmed'),
('stand-a4', 'Hall A - Aménagement & Paysage', 'A-04', 36, '6m x 6m', 'island', '{"x": 410, "y": 60, "width": 110, "height": 80}'::jsonb, 'exh-04', 'confirmed'),
('stand-a5', 'Hall A - Aménagement & Paysage', 'A-05', 18, '6m x 3m', 'equipped', '{"x": 540, "y": 60, "width": 80, "height": 80}'::jsonb, 'exh-05', 'confirmed'),
('stand-a6', 'Hall A - Aménagement & Paysage', 'A-06', 18, '6m x 3m', 'equipped', '{"x": 640, "y": 60, "width": 80, "height": 80}'::jsonb, 'exh-06', 'confirmed'),
('stand-b1', 'Hall B - Matériels & Équipements', 'B-01', 54, '9m x 6m', 'island', '{"x": 60, "y": 240, "width": 130, "height": 90}'::jsonb, 'exh-07', 'confirmed'),
('stand-b2', 'Hall B - Matériels & Équipements', 'B-02', 36, '6m x 6m', 'equipped', '{"x": 210, "y": 240, "width": 100, "height": 90}'::jsonb, 'exh-08', 'confirmed'),
('stand-b3', 'Hall B - Matériels & Équipements', 'B-03', 24, '6m x 4m', 'equipped', '{"x": 330, "y": 240, "width": 90, "height": 90}'::jsonb, 'exh-09', 'confirmed'),
('stand-b4', 'Hall B - Matériels & Équipements', 'B-04', 24, '6m x 4m', 'equipped', '{"x": 440, "y": 240, "width": 90, "height": 90}'::jsonb, 'exh-10', 'confirmed'),
('stand-c1', 'Hall C - Piscines & Spas', 'C-01', 48, '8m x 6m', 'island', '{"x": 60, "y": 420, "width": 120, "height": 80}'::jsonb, NULL, 'available'),
('stand-c2', 'Hall C - Piscines & Spas', 'C-02', 24, '6m x 4m', 'equipped', '{"x": 200, "y": 420, "width": 90, "height": 80}'::jsonb, NULL, 'available')
ON CONFLICT (id) DO NOTHING;

-- 3. EXPOSANTS DU SALON
INSERT INTO public.exhibitors (id, name, slug, logo, description, sector, category, country, city, website, email, phone, stand_number, hall, stand_id, surface, featured_products, edition, participation_status, representative_name, representative_job_title, representative_email, representative_phone)
VALUES
('exh-01', 'Pépinières de la Mamounia & Atlas Green', 'pepinieres-mamounia-atlas', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&auto=format&fit=crop&q=80', 'Leader marocain de la production d’arbres d’alignement, palmiers de collection et essences adaptées au stress hydrique depuis plus de 35 ans.', 'Pépinières, Végétaux & Horticulture', 'Exposant Majeur', 'Maroc', 'Marrakech / Casablanca', 'https://www.atlasgreen.ma', 'contact@atlasgreen.ma', '+212 5 24 44 88 90', 'A-01', 'Hall A - Aménagement & Paysage', 'stand-a1', 36, '["Palmiers dattiers et Washingtonia certifiés", "Olivier centenaire d’ornement", "Cactées et succulentes arides", "Graminées à très faible besoin en eau"]'::jsonb, '4ème Édition (2026)', 'confirmed', 'Karim Benjelloun', 'Directeur Général', 'k.benjelloun@atlasgreen.ma', '+212 661 12 34 56'),
('exh-02', 'HydroMaroc Smart Irrigation', 'hydromaroc-smart-irrigation', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=200&auto=format&fit=crop&q=80', 'Ingénierie hydraulique de pointe : distribution exclusive de solutions de micro-irrigation connectée, télégestion LoRaWAN et vannes REUT certifiées.', 'Irrigation de Précision & Gestion de l’Eau', 'Sponsor Officiel', 'Maroc', 'Casablanca', 'https://www.hydromaroc.ma', 'info@hydromaroc.ma', '+212 5 22 78 90 12', 'A-02', 'Hall A - Aménagement & Paysage', 'stand-a2', 24, '["Programmateurs connectés 4G/LoRa", "Sondes d’humidité capacitive sol", "Stations de filtration REUT automatiques", "Tuyaux goutteurs autorégulants antisyphon"]'::jsonb, '4ème Édition (2026)', 'confirmed', 'Souad El Amrani', 'Directrice Technique & Projets', 's.amrani@hydromaroc.ma', '+212 662 33 44 55')
ON CONFLICT (id) DO NOTHING;

-- 4. ÉDITIONS DU SALON
INSERT INTO public.editions (id, number, title, year, dates, location, theme, summary, description, stats, video_highlight_url, cover_image, highlights, key_partners)
VALUES
('edition-3', 3, '3ème Édition — Casablanca 2025', 2025, '9 - 11 Octobre 2025', 'Office des Foires et Expositions de Casablanca (OFEC), Maroc', 'Trames Vertes Urbaines & Résilience Climatique à l’Horizon 2030', 'Consécration internationale du salon à Casablanca réunissant 110 exposants et 13 500 professionnels avec 96% de satisfaction exposants.', '["La 3ème édition de Garden Expo Africa a marqué un tournant stratégique majeur avec l’accélération des programmes d’aménagements urbains liés aux échéances internationales du Maroc à l’horizon 2030.", "Organisée en partenariat scientifique avec l’Association des Architectes Paysagistes du Maroc (AAPM) et l’IFLA Africa, cette session a mis l’accent sur la réutilisation des eaux usées traitées (REUT)."]'::jsonb, '{"exhibitorsCount": "110", "visitorsCount": "13 500", "countriesCount": "18", "surfaceSqm": "4 500 m²"}'::jsonb, 'https://www.youtube.com/embed/QoPzVfK6RSg', '/src/assets/images/expo_convention_b2b_1793033934662.jpg', '["Présentation du livre blanc national sur la résilience hydrique", "Remise des Trophées d’Excellence Paysagère AAPM 2025", "Démonstrations de matériels d’espaces verts 100% sur batterie"]'::jsonb, '["Association des Architectes Paysagistes du Maroc (AAPM)", "Fédération Internationale des Architectes Paysagistes (IFLA Africa)", "Green Times Magazine"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 5. COMPTES UTILISATEURS DE DÉMONSTRATION / OFFICIELS
INSERT INTO public.user_profiles (id, email, role, full_name, company_name, job_title, phone, country, city, avatar_url, exhibitor_id)
VALUES
('usr-admin-01', 'admin@gardenexpo.ma', 'super_admin', 'Commissariat Général Garden Expo', 'R2H Communication SARL', 'Directeur du Salon', '+212 661 482 497', 'Maroc', 'Casablanca', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', NULL),
('usr-exhibitor-01', 'exposant@gardenexpo.ma', 'exhibitor', 'Karim Benjelloun', 'Pépinières de la Mamounia & Atlas Green', 'Directeur Général', '+212 661 12 34 56', 'Maroc', 'Casablanca', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'exh-01'),
('usr-visitor-01', 'visiteur@gardenexpo.ma', 'visitor', 'Yasmine El Fassi', 'Atelier Paysage Méditerranée', 'Architecte Paysagiste DPLG', '+212 663 88 99 00', 'Maroc', 'Casablanca', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', NULL)
ON CONFLICT (id) DO NOTHING;

-- 6. VISITEUR COMPTE & FAVORIS
INSERT INTO public.visitor_accounts (id, user_id, badge_number, registration_date, favorite_exhibitor_ids, planned_visits, qr_payload)
VALUES
('vis-acc-01', 'usr-visitor-01', 'GEA-VIS-26-88412', '24 Octobre 2026', '["exh-01", "exh-02"]'::jsonb, '[{"exhibitorId": "exh-01", "notes": "Voir les palmiers d’alignement et devis pour la corniche"}, {"exhibitorId": "exh-02", "notes": "Démonstration micro-irrigation REUT"}]'::jsonb, 'GARDEN-EXPO-AFRICA-2026|GEA-VIS-26-88412|Yasmine El Fassi|Atelier Paysage')
ON CONFLICT (id) DO NOTHING;

-- 7. FACTURES EXPOSANT
INSERT INTO public.invoices (id, exhibitor_id, type, title, reference_number, amount_mad, status, date, download_url)
VALUES
('inv-01', 'exh-01', 'invoice', 'Facture Stand A-01 (Solde Participation 36m²)', 'GEA-FAC-2026-0042', 72000, 'paid', '15 Septembre 2026', '#'),
('inv-02', 'exh-01', 'contract', 'Contrat Officiel d’Exposition 2026/2027', 'GEA-CTR-2026-0089', 0, 'signed', '10 Septembre 2026', '#'),
('inv-03', 'exh-01', 'badge_pass', 'Pass Badges Exposant (Lot de 5 Badges Nominatifs)', 'GEA-BDG-2026-A01', 0, 'ready', '01 Octobre 2026', '#')
ON CONFLICT (id) DO NOTHING;
