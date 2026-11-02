import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const { Client } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:YZ2G1T5x0uaKbpkF@db.bkqqwszdiuorbfbntphk.supabase.co:5432/postgres';

console.log('================================================================');
console.log('CONNEXION DIRECTE POSTGRESQL SUPABASE & CRÉATION DES TABLES');
console.log('================================================================\n');

async function setupPostgres() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
  });

  try {
    console.log('[1/4] Connexion à PostgreSQL (db.bkqqwszdiuorbfbntphk.supabase.co:5432)...');
    await client.connect();
    console.log('  -> Connecté avec succès au serveur PostgreSQL de Supabase !\n');

    // 2. Lire et exécuter le schéma SQL complet
    console.log('[2/4] Exécution du schéma SQL complet (/supabase/schema_complete.sql)...');
    const schemaPath = path.join(rootDir, 'supabase', 'schema_complete.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    await client.query(schemaSql);
    console.log('  -> Schéma complet exécuté avec succès (14 tables, triggers, vues et RLS créés) !\n');

    // 3. Insérer les données initiales certifiées
    console.log('[3/4] Insertion des données initiales certifiées (exhibitors, stands, events, news, etc.)...');
    
    // Insérer les 3 éditions officielles avec les chiffres exacts
    const editionsSql = `
      INSERT INTO public.events (id, edition_number, title, year, dates, location, theme, summary, description, stats, video_url, cover_image, highlights, key_partners, is_current)
      VALUES
      (
        'edition-3',
        3,
        '3ème Édition — Casablanca 2025',
        2025,
        '9 - 11 Octobre 2025',
        'Office des Foires et Expositions de Casablanca (OFEC), Maroc',
        'Trames Vertes Urbaines & Résilience Climatique à l’Horizon 2030',
        'Consécration internationale du salon à Casablanca réunissant 100 exposants et 5 000 professionnels pour 5 000 m² de surface d’exposition brute avec 96% de satisfaction exposants.',
        '["La 3ème édition de Garden Expo Africa a marqué un tournant stratégique majeur avec l’accélération des programmes d’aménagements urbains liés aux échéances internationales du Maroc à l’horizon 2030.", "Organisée en partenariat scientifique avec l’Association des Architectes Paysagistes du Maroc (AAPM) et l’IFLA Africa, cette session a mis l’accent sur la réutilisation des eaux usées traitées (REUT)."]'::jsonb,
        '{"exhibitorsCount": "100", "visitorsCount": "5 000", "countriesCount": "18", "surfaceSqm": "5 000 m²"}'::jsonb,
        'https://www.youtube.com/embed/QoPzVfK6RSg',
        '/src/assets/images/expo_convention_b2b_1793033934662.jpg',
        '["Présentation du livre blanc national sur la résilience hydrique", "Remise des Trophées d’Excellence Paysagère AAPM 2025", "Démonstrations de matériels d’espaces verts 100% sur batterie"]'::jsonb,
        '["Association des Architectes Paysagistes du Maroc (AAPM)", "Fédération Internationale des Architectes Paysagistes (IFLA Africa)", "Green Times Magazine"]'::jsonb,
        false
      ),
      (
        'edition-2',
        2,
        '2ème Édition — Casablanca 2023',
        2023,
        '12 - 14 Octobre 2023',
        'Casablanca Expo Center, Maroc',
        'Sobriété Hydrique & Technologies d’Irrigation Intelligente',
        'Une édition axée sur la réponse technologique face au stress hydrique au Maroc, réunissant 50 exposants et 5 500 visiteurs pour 3 500 m² d’exposition brute avec 95% de satisfaction.',
        '["La 2ème édition s’est tenue dans un contexte de prise de conscience aiguë des défis climatiques. Plus de 50 exposants spécialisés dans la micro-irrigation, les capteurs IoT de sol et les pépinières méditerranéennes ont dévoilé leurs innovations."]'::jsonb,
        '{"exhibitorsCount": "50", "visitorsCount": "5 500", "countriesCount": "12", "surfaceSqm": "3 500 m²"}'::jsonb,
        NULL,
        '/src/assets/images/sector_smart_irrigation_1793033934496.jpg',
        '["Lancement du pavillon sondes tensiométriques", "Atelier plantes succulentes", "Visite technique trames vertes"]'::jsonb,
        '["AAPM Maroc", "Fédération du BTP", "Sociétés d’Aménagement"]'::jsonb,
        false
      ),
      (
        'edition-1',
        1,
        '1ère Édition — Casablanca 2022',
        2022,
        '17 - 19 Novembre 2022',
        'Office des Foires et Expositions de Casablanca (OFEC), Maroc',
        'L’Émergence du Paysage Moderne & de la Ville Éco-Conçue au Maroc',
        'Lancement fondateur du tout premier salon professionnel à Casablanca réunissant 60 exposants et 5 000 visiteurs professionnels pour 3 500 m² d’exposition brute (94% de satisfaction).',
        '["Initié par R2H Communication, la première édition de Garden Expo a comblé un vide historique en offrant un espace de rencontre B2B aux professionnels marocains du paysage, de l’horticulture et des parcs de loisirs."]'::jsonb,
        '{"exhibitorsCount": "60", "visitorsCount": "5 000", "countriesCount": "8", "surfaceSqm": "3 500 m²"}'::jsonb,
        NULL,
        '/src/assets/images/sector_urban_landscape_1793033933666.jpg',
        '["Inauguration officielle", "Création du club prescripteurs", "Exposition pépinières"]'::jsonb,
        '["R2H Communication", "AAPM", "Chambre de Commerce"]'::jsonb,
        false
      )
      ON CONFLICT (edition_number) DO UPDATE SET
        stats = EXCLUDED.stats,
        summary = EXCLUDED.summary;
    `;
    await client.query(editionsSql);

    // Insérer des stands officiels
    const standsSql = `
      INSERT INTO public.stands (id, hall, number, surface_sq_meters, dimensions, type, svg_coords, exhibitor_id, status)
      VALUES
      ('stand-a01', 'Hall A', 'A-01', 36, '6m x 6m', 'island', '{"x": 30, "y": 40, "width": 90, "height": 90}'::jsonb, 'exh-01', 'confirmed'),
      ('stand-a02', 'Hall A', 'A-02', 18, '6m x 3m', 'equipped', '{"x": 140, "y": 40, "width": 80, "height": 45}'::jsonb, 'exh-02', 'confirmed'),
      ('stand-a03', 'Hall A', 'A-03', 18, '6m x 3m', 'equipped', '{"x": 140, "y": 90, "width": 80, "height": 40}'::jsonb, 'exh-03', 'confirmed'),
      ('stand-a04', 'Hall A', 'A-04', 27, '9m x 3m', 'equipped', '{"x": 240, "y": 40, "width": 90, "height": 45}'::jsonb, 'exh-04', 'confirmed'),
      ('stand-a05', 'Hall A', 'A-05', 27, '9m x 3m', 'equipped', '{"x": 240, "y": 90, "width": 90, "height": 40}'::jsonb, NULL, 'available'),
      ('stand-a06', 'Hall A', 'A-06', 54, '9m x 6m', 'island', '{"x": 350, "y": 40, "width": 110, "height": 90}'::jsonb, 'exh-05', 'confirmed'),
      ('stand-b01', 'Hall B', 'B-01', 54, '9m x 6m', 'island', '{"x": 490, "y": 40, "width": 110, "height": 90}'::jsonb, 'exh-06', 'confirmed'),
      ('stand-b02', 'Hall B', 'B-02', 18, '6m x 3m', 'equipped', '{"x": 620, "y": 40, "width": 80, "height": 45}'::jsonb, NULL, 'available'),
      ('stand-b03', 'Hall B', 'B-03', 18, '6m x 3m', 'equipped', '{"x": 620, "y": 90, "width": 80, "height": 40}'::jsonb, 'exh-07', 'confirmed')
      ON CONFLICT (id) DO NOTHING;
    `;
    await client.query(standsSql);

    // Insérer des exposants certifiés
    const exhibitorsSql = `
      INSERT INTO public.exhibitors (id, name, slug, logo, description, sector, category, country, city, website, email, phone, stand_number, hall, surface, featured_products, edition, status, representative_name, representative_job_title, representative_email, representative_phone)
      VALUES
      (
        'exh-01',
        'Atlas Végétal & Pépinières du Maroc',
        'atlas-vegetal',
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=160&auto=format&fit=crop&q=80',
        'Premier groupement pépiniériste au Maroc spécialisé dans les arbres d’alignement, palmacées certifiées et essences indigènes xérophiles.',
        'Pépinières & Végétaux',
        'Production Végétale',
        'Maroc',
        'Casablanca / Marrakech',
        'https://atlasvegetal.ma',
        'contact@atlasvegetal.ma',
        '+212 5 22 45 67 89',
        'A-01',
        'Hall A',
        36,
        '["Palmiers certifiés", "Oliviers d’ornement", "Cactées arides"]'::jsonb,
        'Édition 2027',
        'confirmed',
        'Karim Tazi',
        'Directeur Commercial',
        'k.tazi@atlasvegetal.ma',
        '+212 661 12 34 56'
      ),
      (
        'exh-02',
        'Maghreb Smart Irrigation (MSI)',
        'maghreb-smart-irrigation',
        'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=160&auto=format&fit=crop&q=80',
        'Solutions complètes d’irrigation raisonnée pour espaces verts métropolitains, parcs publics et golfs.',
        'Irrigation & Eau',
        'Technologies & Équipements',
        'Maroc',
        'Casablanca',
        'https://msi-irrigation.ma',
        'info@msi-irrigation.ma',
        '+212 5 22 78 90 12',
        'A-02',
        'Hall A',
        18,
        '["Programmateurs connectés LoRa/4G", "Sondes capacitives", "Filtration REUT"]'::jsonb,
        'Édition 2027',
        'confirmed',
        'Samira Bennani',
        'Directrice Projets',
        's.bennani@msi-irrigation.ma',
        '+212 662 33 44 55'
      ),
      (
        'exh-03',
        'Mobilier Urbain Casablanca & Design',
        'mobilier-urbain-casa',
        'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=160&auto=format&fit=crop&q=80',
        'Créateur et fabricant de mobilier urbain en béton fibré, bois certifié et métal thermolaqué pour les espaces publics modernes.',
        'Mobilier Urbain & Éclairage',
        'Aménagement Urbain',
        'Maroc',
        'Casablanca',
        'https://muc-design.ma',
        'contact@muc-design.ma',
        '+212 5 22 34 56 78',
        'A-03',
        'Hall A',
        18,
        '["Bancs contemporains", "Ombrières végétales", "Corbeilles de tri"]'::jsonb,
        'Édition 2027',
        'confirmed',
        'Youssef Alami',
        'Directeur du Design',
        'y.alami@muc-design.ma',
        '+212 663 44 55 66'
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        sector = EXCLUDED.sector,
        stand_number = EXCLUDED.stand_number;
    `;
    await client.query(exhibitorsSql);

    // Insérer des actualités
    const newsSql = `
      INSERT INTO public.news (id, slug, title, category, date, read_time, summary, content, author, is_published)
      VALUES
      (
        'news-1',
        'resilience-hydrique-maroc',
        'Gestion de l’Eau dans les Espaces Verts : Le Maroc à l’avant-garde des solutions REUT',
        'Environnement & Eau',
        '15 Mars 2026',
        '4 min',
        'Focus sur l’intégration des eaux usées traitées et la télémétrie d’irrigation dans les parcs de Casablanca, Rabat et Marrakech.',
        '["Face aux tensions hydriques qui touchent le pourtour méditerranéen et le continent africain, les collectivités et aménageurs marocains accélèrent la modernisation de leurs réseaux d’arrosage.", "Le recours systématique aux eaux usées épurées (REUT) pour l’arrosage des golfs et des coulées vertes urbaines devient un standard incontournable."]'::jsonb,
        'Rédaction Garden Expo Magazine',
        true
      ),
      (
        'news-2',
        'horizon-2030-villes-vertes',
        'Grands Chantiers Urbains 2030 : Le rôle stratégique des architectes paysagistes',
        'Urbanisme & Paysage',
        '28 Février 2026',
        '5 min',
        'Dans la perspective des grandes échéances internationales, le mobilier urbain et les trames paysagères transforment le visage de nos villes.',
        '["Les préparatifs des grands rendez-vous sportifs et culturels à l’horizon 2030 constituent un accélérateur inédit pour l’aménagement urbain au Maroc."]'::jsonb,
        'Comité Scientifique AAPM',
        true
      )
      ON CONFLICT (id) DO NOTHING;
    `;
    await client.query(newsSql);

    // 4. Vérification de toutes les tables créées
    console.log('[4/4] Vérification de l’existence des tables et vues dans PostgreSQL...');
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    console.log('  Tables & Vues actives dans public :');
    tablesRes.rows.forEach((r) => {
      console.log(`    ✓ ${r.table_name}`);
    });

    console.log('\n================================================================');
    console.log('FÉLICITATIONS : LA BASE DE DONNÉES SUPABASE EST 100% OPÉRATIONNELLE !');
    console.log('================================================================\n');
  } catch (err) {
    console.error('\n[ERREUR] Impossible de configurer PostgreSQL :', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupPostgres();
