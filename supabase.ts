import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Identifiants par défaut du projet Supabase Garden Expo Africa
const DEFAULT_URL = 'https://bkqqwszdiuorbfbntphk.supabase.co';
const DEFAULT_ANON_KEY = 'sb_publishable_0F_Cnjz8OMa-qSUJbZ2GkA_N38kDqNv';

// Récupération des variables d'environnement Vite ou Next.js (avec fallback vers le projet configuré)
const envSupabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  (import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined) ||
  DEFAULT_URL;

const envSupabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  (import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  DEFAULT_ANON_KEY;

// Clés de stockage local pour la configuration dynamique
const STORAGE_KEY_URL = 'gea_custom_supabase_url';
const STORAGE_KEY_ANON = 'gea_custom_supabase_anon_key';

// Cache client singleton dynamique
let cachedClient: SupabaseClient | null = null;
let currentClientKey = '';

/**
 * Réinitialise le cache du client pour forcer une nouvelle connexion
 */
export function resetSupabaseClient(): void {
  cachedClient = null;
  currentClientKey = '';
}

/**
 * Récupère les identifiants Supabase actuellement actifs (localStorage ou .env)
 */
export function getActiveSupabaseCredentials(): { url: string; anonKey: string; isCustom: boolean } {
  const customUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_URL) : null;
  const customKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_ANON) : null;

  if (customUrl && customKey && customUrl.trim() && customKey.trim()) {
    return { url: customUrl.trim(), anonKey: customKey.trim(), isCustom: true };
  }

  return {
    url: (envSupabaseUrl || DEFAULT_URL).trim(),
    anonKey: (envSupabaseAnonKey || DEFAULT_ANON_KEY).trim(),
    isCustom: false,
  };
}

/**
 * Sauvegarde les identifiants personnalisés dans le navigateur et réinitialise le client
 */
export function saveCustomSupabaseCredentials(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    if (url && anonKey) {
      localStorage.setItem(STORAGE_KEY_URL, url.trim());
      localStorage.setItem(STORAGE_KEY_ANON, anonKey.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_ANON);
    }
  }
  // Réinitialiser immédiatement le cache client pour forcer la prise en compte
  resetSupabaseClient();
}

/**
 * Indique si les identifiants Supabase sont valides et configurés
 */
export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getActiveSupabaseCredentials();
  return Boolean(
    url &&
    anonKey &&
    url.startsWith('http') &&
    !url.includes('placeholder-project.supabase.co') &&
    !url.includes('votre-projet.supabase.co') &&
    anonKey.length > 20 &&
    !anonKey.includes('votre_cle_publique')
  );
}

/**
 * Retourne le client Supabase actif ou initialise une nouvelle instance
 */
export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getActiveSupabaseCredentials();
  if (!url || !anonKey || !isSupabaseConfigured()) {
    return null;
  }

  const keyString = `${url}::${anonKey}`;
  if (cachedClient && currentClientKey === keyString) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    currentClientKey = keyString;
    return cachedClient;
  } catch (err) {
    console.warn('[Supabase] Erreur d’initialisation du client Supabase:', err);
    return null;
  }
}

// Instance Supabase par défaut prête à l'emploi
const activeCreds = getActiveSupabaseCredentials();
const initialUrl = isSupabaseConfigured() ? activeCreds.url : (envSupabaseUrl || DEFAULT_URL);
const initialKey = isSupabaseConfigured() ? activeCreds.anonKey : (envSupabaseAnonKey || DEFAULT_ANON_KEY);

export const supabase: SupabaseClient = createClient(initialUrl, initialKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export interface ConnectionTestResult {
  success: boolean;
  status: 'connected' | 'not_configured' | 'error';
  message: string;
  networkReachable?: boolean;
  tablesFound?: string[];
  tablesPending?: string[];
  latencyMs?: number;
  url?: string;
}

/**
 * Teste la connectivité directe avec le projet Supabase distant via le réseau
 */
export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  const { url, anonKey } = getActiveSupabaseCredentials();

  if (!url || !anonKey || !isSupabaseConfigured()) {
    return {
      success: false,
      status: 'not_configured',
      message: "Variables Supabase non configurées. Renseignez l'URL (VITE_SUPABASE_URL) et la clé publique Anon (VITE_SUPABASE_ANON_KEY).",
    };
  }

  const start = performance.now();

  // Étape 1 : Vérifier la joignabilité réseau réelle et l'authentification de la clé API
  let networkOk = false;
  try {
    const healthRes = await fetch(`${url}/auth/v1/health`, {
      method: 'GET',
      headers: {
        'apikey': anonKey,
      },
    });

    if (healthRes.ok) {
      networkOk = true;
    } else if (healthRes.status === 401 || healthRes.status === 403) {
      return {
        success: false,
        status: 'error',
        networkReachable: false,
        message: `Erreur d'authentification Supabase (HTTP ${healthRes.status}) : la clé API fournie a été refusée par le serveur.`,
        latencyMs: Math.round(performance.now() - start),
        url,
      };
    }
  } catch (netErr: any) {
    return {
      success: false,
      status: 'error',
      networkReachable: false,
      message: `Impossible de contacter le serveur Supabase (${url}) : ${netErr.message || 'Erreur réseau'}. Vérifiez votre connexion internet et l'URL.`,
      latencyMs: Math.round(performance.now() - start),
      url,
    };
  }

  // Étape 2 : Vérification des tables PostgreSQL
  const client = getSupabaseClient() || supabase;
  const tablesChecked: string[] = [];
  const tablesMissing: string[] = [];

  const candidateTables = [
    'exhibitors',
    'stands',
    'visitors',
    'visitor_badges',
    'registrations',
    'stand_bookings',
    'contact_messages',
    'events',
    'editions',
    'news',
    'news_articles',
    'invoices',
    'partners',
    'sectors',
    'gallery_photos',
    'exhibitor_interviews',
    'user_profiles',
    'visitor_accounts',
  ];

  for (const tbl of candidateTables) {
    try {
      const { error } = await client.from(tbl).select('id', { head: true, count: 'exact' }).limit(1);
      if (!error) {
        tablesChecked.push(tbl);
      } else {
        tablesMissing.push(tbl);
      }
    } catch {
      tablesMissing.push(tbl);
    }
  }

  const latency = Math.round(performance.now() - start);

  // Si au moins une table répond ou si le serveur Supabase a répondu
  if (tablesChecked.length > 0) {
    return {
      success: true,
      status: 'connected',
      networkReachable: true,
      message: `Connexion Supabase PostgreSQL établie avec succès (${latency}ms). ${tablesChecked.length} table(s) active(s) détectée(s).`,
      tablesFound: tablesChecked,
      latencyMs: latency,
      url,
    };
  }

  // Si le réseau et l'API key sont valides mais qu'aucune table n'est encore créée
  return {
    success: false,
    status: 'error',
    networkReachable: true,
    message: `Projet Supabase connecté et authentifié avec succès (${latency}ms), mais les tables PostgreSQL ne sont pas encore créées dans la base de données. Exécutez le script /supabase/schema_complete.sql dans l'Éditeur SQL de Supabase.`,
    tablesFound: [],
    tablesPending: tablesMissing,
    latencyMs: latency,
    url,
  };
}

export default supabase;
