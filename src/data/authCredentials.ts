import { UserRole, UserProfile } from '../types';

export interface AuthAccount {
  email: string;
  password: string;
  role: UserRole;
  profile: UserProfile;
}

export const OFFICIAL_ACCOUNTS: AuthAccount[] = [
  {
    email: 'admin@gardenexpo.ma',
    password: 'AdminGarden2026!',
    role: 'super_admin',
    profile: {
      id: 'usr-admin',
      email: 'admin@gardenexpo.ma',
      role: 'super_admin',
      fullName: 'Directeur Général Organisateur',
      companyName: 'R2H Communication SARL',
      jobTitle: 'Commissaire Général & Super Admin',
      phone: '+212 661 482 497',
      country: 'Maroc',
      city: 'Casablanca',
    },
  },
  {
    email: 'exposant@gardenexpo.ma',
    password: 'Exposant2026!',
    role: 'exhibitor',
    profile: {
      id: 'usr-exhibitor',
      email: 'exposant@gardenexpo.ma',
      role: 'exhibitor',
      fullName: 'Dr. Karim Benjelloun',
      companyName: 'Atlas Végétal & Pépinières du Maroc',
      jobTitle: 'Directeur Général & Exposant Officiel',
      phone: '+212 661 112 233',
      country: 'Maroc',
      city: 'Casablanca',
      exhibitorId: 'exh-01',
    },
  },
  {
    email: 'visiteur@gardenexpo.ma',
    password: 'Visiteur2026!',
    role: 'visitor',
    profile: {
      id: 'usr-visitor',
      email: 'visiteur@gardenexpo.ma',
      role: 'visitor',
      fullName: 'Yasmine El Fassi',
      companyName: 'Atelier de Paysage & Urbanisme',
      jobTitle: 'Architecte Paysagiste Associée',
      phone: '+212 662 889 900',
      country: 'Maroc',
      city: 'Rabat',
    },
  },
];

// Helper to get all accounts including user-registered ones from localStorage
export function getRegisteredAccounts(): AuthAccount[] {
  try {
    const custom = localStorage.getItem('gea_custom_accounts');
    if (custom) {
      const parsed: AuthAccount[] = JSON.parse(custom);
      return [...OFFICIAL_ACCOUNTS, ...parsed];
    }
  } catch {
    // fallback
  }
  return OFFICIAL_ACCOUNTS;
}

// Helper to register new user with password
export function registerAccount(account: AuthAccount): void {
  try {
    const existing = getRegisteredAccounts();
    const filtered = existing.filter((a) => a.email.toLowerCase() !== account.email.toLowerCase());
    const customOnly = filtered.filter(
      (a) => !OFFICIAL_ACCOUNTS.some((o) => o.email.toLowerCase() === a.email.toLowerCase())
    );
    customOnly.push(account);
    localStorage.setItem('gea_custom_accounts', JSON.stringify(customOnly));
  } catch {
    // fallback
  }
}
