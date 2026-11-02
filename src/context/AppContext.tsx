import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserProfile,
  UserRole,
  Exhibitor,
  Stand,
  EditionArchive,
  GalleryPhoto,
  ExhibitorInterview,
  InvoiceDocument,
  VisitorAccount,
  SupabaseStatusInfo,
} from '../types';
import {
  INITIAL_EDITIONS,
  INITIAL_EXHIBITORS,
  INITIAL_STANDS,
  INITIAL_GALLERY,
  INITIAL_INTERVIEWS,
  INITIAL_INVOICES,
  DEMO_USERS,
} from '../data/seedData';
import {
  getRegisteredAccounts,
  registerAccount,
  AuthAccount,
} from '../data/authCredentials';
import {
  isSupabaseConfigured,
  testSupabaseConnection,
  getActiveSupabaseCredentials,
  saveCustomSupabaseCredentials,
} from '../lib/supabase';
import {
  SupabaseDataService,
} from '../services/supabaseService';

interface AppContextType {
  currentUser: UserProfile | null;
  visitorAccount: VisitorAccount | null;
  exhibitors: Exhibitor[];
  stands: Stand[];
  editions: EditionArchive[];
  gallery: GalleryPhoto[];
  interviews: ExhibitorInterview[];
  invoices: InvoiceDocument[];
  loginAsDemo: (role: UserRole) => void;
  loginUser: (email: string, role: UserRole, fullName?: string, company?: string) => void;
  loginWithPassword: (email: string, password: string) => { success: boolean; error?: string; user?: UserProfile };
  registerNewAccount: (data: {
    email: string;
    password: string;
    role: UserRole;
    fullName: string;
    company?: string;
    phone?: string;
    city?: string;
  }) => { success: boolean; error?: string; user?: UserProfile };
  logout: () => void;
  toggleFavoriteExhibitor: (exhibitorId: string) => void;
  updateExhibitor: (exhibitor: Exhibitor) => Promise<boolean>;
  addExhibitor: (exhibitor: Exhibitor) => Promise<boolean>;
  deleteExhibitor: (exhibitorId: string) => Promise<boolean>;
  updateEdition: (edition: EditionArchive) => Promise<boolean>;
  addGalleryPhoto: (photo: GalleryPhoto) => Promise<boolean>;
  deleteGalleryPhoto: (photoId: string) => Promise<boolean>;
  updateInterview: (interview: ExhibitorInterview) => Promise<boolean>;
  addInterview: (interview: ExhibitorInterview) => Promise<boolean>;
  deleteInterview: (interviewId: string) => Promise<boolean>;
  assignStand: (standId: string, exhibitorId: string) => Promise<boolean>;
  currentExhibitorData: Exhibitor | null;
  currentExhibitorStand: Stand | null;
  currentExhibitorInvoices: InvoiceDocument[];
  // Supabase real-time integration
  supabaseStatus: SupabaseStatusInfo;
  isSyncing: boolean;
  checkSupabaseHealth: () => Promise<SupabaseStatusInfo>;
  seedSupabaseDatabase: () => Promise<{ success: boolean; message: string }>;
  refreshFromSupabase: () => Promise<void>;
  configureSupabaseKeys: (url: string, anonKey: string) => Promise<{ success: boolean; message: string }>;
  getSupabaseConfig: () => { url: string; anonKey: string; isCustom: boolean };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local state with seed fallback
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('gea_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [visitorAccount, setVisitorAccount] = useState<VisitorAccount | null>(() => {
    const saved = localStorage.getItem('gea_visitor_account');
    if (saved) return JSON.parse(saved);
    return {
      id: 'vis-acc-01',
      userId: 'usr-visitor',
      badgeNumber: 'GEA-VIS-26-88412',
      registrationDate: '24 Octobre 2026',
      favoriteExhibitorIds: ['exh-01', 'exh-02'],
      plannedVisits: [
        { exhibitorId: 'exh-01', notes: 'Voir les palmiers d’alignement et devis pour la corniche' },
        { exhibitorId: 'exh-02', notes: 'Démonstration micro-irrigation REUT' },
      ],
      qrPayload: 'GARDEN-EXPO-AFRICA-2026|GEA-VIS-26-88412|Yasmine El Fassi|Atelier Paysage',
    };
  });

  const [exhibitors, setExhibitors] = useState<Exhibitor[]>(() => {
    const saved = localStorage.getItem('gea_exhibitors');
    return saved ? JSON.parse(saved) : INITIAL_EXHIBITORS;
  });

  const [stands, setStands] = useState<Stand[]>(() => {
    const saved = localStorage.getItem('gea_stands');
    return saved ? JSON.parse(saved) : INITIAL_STANDS;
  });

  const [editions, setEditions] = useState<EditionArchive[]>(() => {
    const saved = localStorage.getItem('gea_editions');
    if (saved) {
      try {
        const parsed: EditionArchive[] = JSON.parse(saved);
        return parsed.map((ed) => {
          if (ed.id === 'edition-3' || ed.year === 2025) {
            return {
              ...ed,
              summary:
                'Consécration internationale du salon à Casablanca réunissant 100 exposants et 5 000 professionnels pour 5 000 m² de surface d’exposition brute avec 96% de satisfaction exposants.',
              stats: {
                ...ed.stats,
                exhibitorsCount: '100',
                visitorsCount: '5 000',
                countriesCount: ed.stats?.countriesCount || '18',
                surfaceSqm: '5 000 m²',
              },
            };
          }
          if (ed.id === 'edition-2' || ed.year === 2023) {
            return {
              ...ed,
              summary:
                'Une édition axée sur la réponse technologique face au stress hydrique au Maroc, réunissant 50 exposants et 5 500 visiteurs pour 3 500 m² d’exposition brute avec 95% de satisfaction.',
              stats: {
                ...ed.stats,
                exhibitorsCount: '50',
                visitorsCount: '5 500',
                countriesCount: ed.stats?.countriesCount || '12',
                surfaceSqm: '3 500 m²',
              },
            };
          }
          if (ed.id === 'edition-1' || ed.year === 2022) {
            return {
              ...ed,
              summary:
                'Lancement fondateur du tout premier salon professionnel à Casablanca réunissant 60 exposants et 5 000 visiteurs professionnels pour 3 500 m² d’exposition brute (94% de satisfaction).',
              stats: {
                ...ed.stats,
                exhibitorsCount: '60',
                visitorsCount: '5 000',
                countriesCount: ed.stats?.countriesCount || '8',
                surfaceSqm: '3 500 m²',
              },
            };
          }
          return ed;
        });
      } catch {
        return INITIAL_EDITIONS;
      }
    }
    return INITIAL_EDITIONS;
  });

  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('gea_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [interviews, setInterviews] = useState<ExhibitorInterview[]>(() => {
    const saved = localStorage.getItem('gea_interviews');
    return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
  });

  const [invoices, setInvoices] = useState<InvoiceDocument[]>(() => {
    const saved = localStorage.getItem('gea_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseStatusInfo>(() => {
    const configured = isSupabaseConfigured();
    return {
      isConfigured: configured,
      isConnected: false,
      status: configured ? 'error' : 'not_configured',
      message: configured
        ? 'Vérification de la connexion Supabase...'
        : 'Supabase en attente de configuration (URL et clé Anon requises).',
    };
  });

  // Check Supabase connectivity
  const checkSupabaseHealth = useCallback(async (): Promise<SupabaseStatusInfo> => {
    const configured = isSupabaseConfigured();
    if (!configured) {
      const status: SupabaseStatusInfo = {
        isConfigured: false,
        isConnected: false,
        status: 'not_configured',
        networkReachable: false,
        message: 'Variables Supabase en attente. Configurez votre URL de projet et clé publique Anon.',
        lastChecked: new Date().toLocaleTimeString('fr-FR'),
      };
      setSupabaseStatus(status);
      return status;
    }

    const test = await testSupabaseConnection();
    const status: SupabaseStatusInfo = {
      isConfigured: true,
      isConnected: test.success,
      status: test.status,
      networkReachable: test.networkReachable,
      message: test.message,
      latencyMs: test.latencyMs,
      tablesFound: test.tablesFound,
      tablesPending: test.tablesPending,
      lastChecked: new Date().toLocaleTimeString('fr-FR'),
    };
    setSupabaseStatus(status);
    return status;
  }, []);

  // Fetch all remote data from Supabase if connected
  const refreshFromSupabase = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    setIsSyncing(true);

    try {
      const [remoteExhibitors, remoteStands, remoteEditions, remoteGallery, remoteInterviews, remoteInvoices] =
        await Promise.all([
          SupabaseDataService.fetchExhibitors(),
          SupabaseDataService.fetchStands(),
          SupabaseDataService.fetchEditions(),
          SupabaseDataService.fetchGallery(),
          SupabaseDataService.fetchInterviews(),
          SupabaseDataService.fetchInvoices(),
        ]);

      if (remoteExhibitors && remoteExhibitors.length > 0) {
        setExhibitors(remoteExhibitors);
      }
      if (remoteStands && remoteStands.length > 0) {
        setStands(remoteStands);
      }
      if (remoteEditions && remoteEditions.length > 0) {
        setEditions(remoteEditions);
      }
      if (remoteGallery && remoteGallery.length > 0) {
        setGallery(remoteGallery);
      }
      if (remoteInterviews && remoteInterviews.length > 0) {
        setInterviews(remoteInterviews);
      }
      if (remoteInvoices && remoteInvoices.length > 0) {
        setInvoices(remoteInvoices);
      }

      setSupabaseStatus((prev) => ({
        ...prev,
        isConnected: true,
        message: 'Données synchronisées en direct avec la base de données Supabase PostgreSQL.',
        lastChecked: new Date().toLocaleTimeString('fr-FR'),
      }));
    } catch (err: any) {
      console.warn('[Supabase] Erreur de rafraîchissement:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    checkSupabaseHealth().then((status) => {
      if (status.isConnected) {
        refreshFromSupabase();
      }
    });
  }, [checkSupabaseHealth, refreshFromSupabase]);

  // Sync state to localStorage cache
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gea_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gea_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gea_exhibitors', JSON.stringify(exhibitors));
  }, [exhibitors]);

  useEffect(() => {
    localStorage.setItem('gea_stands', JSON.stringify(stands));
  }, [stands]);

  useEffect(() => {
    localStorage.setItem('gea_editions', JSON.stringify(editions));
  }, [editions]);

  useEffect(() => {
    localStorage.setItem('gea_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('gea_interviews', JSON.stringify(interviews));
  }, [interviews]);

  useEffect(() => {
    if (visitorAccount) {
      localStorage.setItem('gea_visitor_account', JSON.stringify(visitorAccount));
    }
  }, [visitorAccount]);

  // Auth helpers
  const loginAsDemo = (role: UserRole) => {
    const found = DEMO_USERS.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
    }
  };

  const loginUser = (email: string, role: UserRole, fullName?: string, company?: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      email,
      role,
      fullName: fullName || email.split('@')[0],
      companyName: company || 'Entreprise Professionnelle',
      country: 'Maroc',
      city: 'Casablanca',
      exhibitorId: role === 'exhibitor' ? 'exh-01' : undefined,
    };
    setCurrentUser(newUser);

    // Save profile to Supabase in background
    SupabaseDataService.saveUserProfile(newUser);

    if (role === 'visitor') {
      const badgeId = 'GEA-VIS-26-' + Math.floor(10000 + Math.random() * 90000);
      const newAcc: VisitorAccount = {
        id: 'vis-' + Date.now(),
        userId: newUser.id,
        badgeNumber: badgeId,
        registrationDate: new Date().toLocaleDateString('fr-FR'),
        favoriteExhibitorIds: [],
        plannedVisits: [],
        qrPayload: `GARDEN-EXPO-AFRICA-2026|${badgeId}|${newUser.fullName}|${newUser.companyName}`,
      };
      setVisitorAccount(newAcc);
      SupabaseDataService.saveVisitorAccount(newAcc);
    }
  };

  const loginWithPassword = (
    email: string,
    password: string
  ): { success: boolean; error?: string; user?: UserProfile } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail) {
      return { success: false, error: 'Veuillez saisir votre adresse email professionnelle.' };
    }
    if (!cleanPass) {
      return { success: false, error: "Veuillez saisir votre mot de passe d'accès." };
    }

    const accounts = getRegisteredAccounts();
    const found = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    if (!found) {
      return {
        success: false,
        error: "Identifiant introuvable. Veuillez vérifier l'adresse email ou créer un compte.",
      };
    }

    if (found.password !== cleanPass) {
      return {
        success: false,
        error: 'Mot de passe incorrect pour cet espace.',
      };
    }

    setCurrentUser(found.profile);
    SupabaseDataService.saveUserProfile(found.profile);

    // Initialize or restore visitor profile state
    if (found.role === 'visitor') {
      const badgeId = 'GEA-VIS-26-' + Math.floor(10000 + Math.random() * 90000);
      const acc = visitorAccount || {
        id: 'vis-' + Date.now(),
        userId: found.profile.id,
        badgeNumber: badgeId,
        registrationDate: new Date().toLocaleDateString('fr-FR'),
        favoriteExhibitorIds: [],
        plannedVisits: [],
        qrPayload: `GARDEN-EXPO-AFRICA-2026|${badgeId}|${found.profile.fullName}|${found.profile.companyName || ''}`,
      };
      setVisitorAccount(acc);
      SupabaseDataService.saveVisitorAccount(acc);
    }

    return { success: true, user: found.profile };
  };

  const registerNewAccount = (data: {
    email: string;
    password: string;
    role: UserRole;
    fullName: string;
    company?: string;
    phone?: string;
    city?: string;
  }): { success: boolean; error?: string; user?: UserProfile } => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPass = data.password.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: "L'email et le mot de passe sont obligatoires." };
    }

    if (cleanPass.length < 6) {
      return { success: false, error: 'Le mot de passe doit comporter au moins 6 caractères.' };
    }

    const accounts = getRegisteredAccounts();
    if (accounts.some((a) => a.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'Un compte existe déjà avec cette adresse email.' };
    }

    // Seuls les rôles visiteur ou exposant peuvent être créés via l'inscription publique
    const safeRole: UserRole = data.role === 'exhibitor' ? 'exhibitor' : 'visitor';

    const newProfile: UserProfile = {
      id: 'usr-' + Date.now(),
      email: cleanEmail,
      role: safeRole,
      fullName: data.fullName.trim() || cleanEmail.split('@')[0],
      companyName: data.company?.trim() || 'Organisme Professionnel',
      phone: data.phone?.trim() || '+212 600 000 000',
      city: data.city?.trim() || 'Casablanca',
      country: 'Maroc',
      exhibitorId: safeRole === 'exhibitor' ? 'exh-01' : undefined,
    };

    const newAccount: AuthAccount = {
      email: cleanEmail,
      password: cleanPass,
      role: safeRole,
      profile: newProfile,
    };

    registerAccount(newAccount);
    setCurrentUser(newProfile);

    // Persist to Supabase
    SupabaseDataService.saveUserProfile(newProfile);

    if (data.role === 'visitor') {
      const badgeId = 'GEA-VIS-26-' + Math.floor(10000 + Math.random() * 90000);
      const acc: VisitorAccount = {
        id: 'vis-' + Date.now(),
        userId: newProfile.id,
        badgeNumber: badgeId,
        registrationDate: new Date().toLocaleDateString('fr-FR'),
        favoriteExhibitorIds: [],
        plannedVisits: [],
        qrPayload: `GARDEN-EXPO-AFRICA-2026|${badgeId}|${newProfile.fullName}|${newProfile.companyName || ''}`,
      };
      setVisitorAccount(acc);
      SupabaseDataService.saveVisitorAccount(acc);
    }

    return { success: true, user: newProfile };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleFavoriteExhibitor = (exhibitorId: string) => {
    if (!visitorAccount) return;
    const isFav = visitorAccount.favoriteExhibitorIds.includes(exhibitorId);
    const updatedFavs = isFav
      ? visitorAccount.favoriteExhibitorIds.filter((id) => id !== exhibitorId)
      : [...visitorAccount.favoriteExhibitorIds, exhibitorId];

    const updatedAccount = {
      ...visitorAccount,
      favoriteExhibitorIds: updatedFavs,
    };
    setVisitorAccount(updatedAccount);

    // Persist to Supabase
    SupabaseDataService.saveVisitorAccount(updatedAccount);
  };

  // CRUD with Supabase persistence
  const updateExhibitor = async (updated: Exhibitor): Promise<boolean> => {
    setExhibitors((prev) => prev.map((ex) => (ex.id === updated.id ? updated : ex)));
    const ok = await SupabaseDataService.updateExhibitor(updated);
    return ok;
  };

  const addExhibitor = async (newExh: Exhibitor): Promise<boolean> => {
    setExhibitors((prev) => [newExh, ...prev]);
    const ok = await SupabaseDataService.insertExhibitor(newExh);
    return ok;
  };

  const deleteExhibitor = async (exhibitorId: string): Promise<boolean> => {
    setExhibitors((prev) => prev.filter((ex) => ex.id !== exhibitorId));
    setStands((prev) =>
      prev.map((s) => (s.exhibitorId === exhibitorId ? { ...s, exhibitorId: undefined, status: 'available' } : s))
    );
    const ok = await SupabaseDataService.deleteExhibitor(exhibitorId);
    return ok;
  };

  const updateEdition = async (updated: EditionArchive): Promise<boolean> => {
    setEditions((prev) => prev.map((ed) => (ed.id === updated.id ? updated : ed)));
    const ok = await SupabaseDataService.updateEdition(updated);
    return ok;
  };

  const addGalleryPhoto = async (photo: GalleryPhoto): Promise<boolean> => {
    setGallery((prev) => [photo, ...prev]);
    const ok = await SupabaseDataService.insertGalleryPhoto(photo);
    return ok;
  };

  const deleteGalleryPhoto = async (photoId: string): Promise<boolean> => {
    setGallery((prev) => prev.filter((p) => p.id !== photoId));
    const ok = await SupabaseDataService.deleteGalleryPhoto(photoId);
    return ok;
  };

  const updateInterview = async (updated: ExhibitorInterview): Promise<boolean> => {
    setInterviews((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    const ok = await SupabaseDataService.insertInterview(updated);
    return ok;
  };

  const addInterview = async (newItem: ExhibitorInterview): Promise<boolean> => {
    setInterviews((prev) => [newItem, ...prev]);
    const ok = await SupabaseDataService.insertInterview(newItem);
    return ok;
  };

  const deleteInterview = async (interviewId: string): Promise<boolean> => {
    setInterviews((prev) => prev.filter((i) => i.id !== interviewId));
    const ok = await SupabaseDataService.deleteInterview(interviewId);
    return ok;
  };

  const assignStand = async (standId: string, exhibitorId: string): Promise<boolean> => {
    setStands((prev) =>
      prev.map((s) => (s.id === standId ? { ...s, exhibitorId, status: 'confirmed' } : s))
    );
    const stand = stands.find((s) => s.id === standId);
    if (stand) {
      setExhibitors((prev) =>
        prev.map((ex) =>
          ex.id === exhibitorId ? { ...ex, standId, standNumber: stand.number, hall: stand.hall, surface: stand.surfaceSqMeters } : ex
        )
      );
    }
    const ok = await SupabaseDataService.assignStand(standId, exhibitorId);
    return ok;
  };

  // Seed remote Supabase database
  const seedSupabaseDatabase = async (): Promise<{ success: boolean; message: string }> => {
    const res = await SupabaseDataService.seedSupabaseIfEmpty();
    if (res.seeded) {
      await refreshFromSupabase();
    }
    return { success: res.seeded, message: res.message };
  };

  // Configure runtime credentials
  const configureSupabaseKeys = async (url: string, anonKey: string): Promise<{ success: boolean; message: string }> => {
    saveCustomSupabaseCredentials(url, anonKey);
    const health = await checkSupabaseHealth();
    if (health.isConnected) {
      await refreshFromSupabase();
      return { success: true, message: 'Identifiants enregistrés et connexion Supabase établie avec succès.' };
    }
    if (health.networkReachable) {
      return {
        success: true,
        message: 'Identifiants enregistrés et projet Supabase authentifié avec succès. Les tables PostgreSQL sont en attente d’exécution dans l’Éditeur SQL.',
      };
    }
    return { success: false, message: health.message };
  };

  const getSupabaseConfig = () => getActiveSupabaseCredentials();

  // Exhibitor portal active bindings
  const currentExhibitorData =
    currentUser?.role === 'exhibitor'
      ? exhibitors.find((ex) => ex.id === currentUser.exhibitorId) || exhibitors[0]
      : null;

  const currentExhibitorStand = currentExhibitorData
    ? stands.find((s) => s.id === currentExhibitorData.standId || s.number === currentExhibitorData.standNumber) || null
    : null;

  const currentExhibitorInvoices = currentExhibitorData
    ? invoices.filter((inv) => inv.exhibitorId === currentExhibitorData.id)
    : [];

  return (
    <AppContext.Provider
      value={{
        currentUser,
        visitorAccount,
        exhibitors,
        stands,
        editions,
        gallery,
        interviews,
        invoices,
        loginAsDemo,
        loginUser,
        loginWithPassword,
        registerNewAccount,
        logout,
        toggleFavoriteExhibitor,
        updateExhibitor,
        addExhibitor,
        deleteExhibitor,
        updateEdition,
        addGalleryPhoto,
        deleteGalleryPhoto,
        updateInterview,
        addInterview,
        deleteInterview,
        assignStand,
        currentExhibitorData,
        currentExhibitorStand,
        currentExhibitorInvoices,
        supabaseStatus,
        isSyncing,
        checkSupabaseHealth,
        seedSupabaseDatabase,
        refreshFromSupabase,
        configureSupabaseKeys,
        getSupabaseConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
