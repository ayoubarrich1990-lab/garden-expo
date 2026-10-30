import React, { createContext, useContext, useState, useEffect } from 'react';
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
  logout: () => void;
  toggleFavoriteExhibitor: (exhibitorId: string) => void;
  updateExhibitor: (exhibitor: Exhibitor) => void;
  addExhibitor: (exhibitor: Exhibitor) => void;
  deleteExhibitor: (exhibitorId: string) => void;
  updateEdition: (edition: EditionArchive) => void;
  addGalleryPhoto: (photo: GalleryPhoto) => void;
  deleteGalleryPhoto: (photoId: string) => void;
  updateInterview: (interview: ExhibitorInterview) => void;
  addInterview: (interview: ExhibitorInterview) => void;
  deleteInterview: (interviewId: string) => void;
  assignStand: (standId: string, exhibitorId: string) => void;
  currentExhibitorData: Exhibitor | null;
  currentExhibitorStand: Stand | null;
  currentExhibitorInvoices: InvoiceDocument[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or initial seeds
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
    return saved ? JSON.parse(saved) : INITIAL_EDITIONS;
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

  // Sync back to localStorage
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

    if (role === 'visitor') {
      const badgeId = 'GEA-VIS-26-' + Math.floor(10000 + Math.random() * 90000);
      setVisitorAccount({
        id: 'vis-' + Date.now(),
        userId: newUser.id,
        badgeNumber: badgeId,
        registrationDate: new Date().toLocaleDateString('fr-FR'),
        favoriteExhibitorIds: [],
        plannedVisits: [],
        qrPayload: `GARDEN-EXPO-AFRICA-2026|${badgeId}|${newUser.fullName}|${newUser.companyName}`,
      });
    }
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

    setVisitorAccount({
      ...visitorAccount,
      favoriteExhibitorIds: updatedFavs,
    });
  };

  const updateExhibitor = (updated: Exhibitor) => {
    setExhibitors((prev) => prev.map((ex) => (ex.id === updated.id ? updated : ex)));
  };

  const addExhibitor = (newExh: Exhibitor) => {
    setExhibitors((prev) => [newExh, ...prev]);
  };

  const deleteExhibitor = (exhibitorId: string) => {
    setExhibitors((prev) => prev.filter((ex) => ex.id !== exhibitorId));
    // Release stand if assigned
    setStands((prev) =>
      prev.map((s) => (s.exhibitorId === exhibitorId ? { ...s, exhibitorId: undefined, status: 'available' } : s))
    );
  };

  const updateEdition = (updated: EditionArchive) => {
    setEditions((prev) => prev.map((ed) => (ed.id === updated.id ? updated : ed)));
  };

  const addGalleryPhoto = (photo: GalleryPhoto) => {
    setGallery((prev) => [photo, ...prev]);
  };

  const deleteGalleryPhoto = (photoId: string) => {
    setGallery((prev) => prev.filter((p) => p.id !== photoId));
  };

  const updateInterview = (updated: ExhibitorInterview) => {
    setInterviews((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const addInterview = (newItem: ExhibitorInterview) => {
    setInterviews((prev) => [newItem, ...prev]);
  };

  const deleteInterview = (interviewId: string) => {
    setInterviews((prev) => prev.filter((i) => i.id !== interviewId));
  };

  const assignStand = (standId: string, exhibitorId: string) => {
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
  };

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
