import { Sector } from '../types';

export const STAND_BASE_RATES_MAD = {
  bare: 1800,      // Espace nu / m²
  equipped: 2400,  // Stand aménagé standard / m² (cloisons, moquette, éclairage, enseigne)
  island: 3100,    // Stand îlot 4 faces ouvertes / m² premium
} as const;

export function calculateStandPrice(
  surface: number,
  standType: 'bare' | 'equipped' | 'island',
  includePowerPackage: boolean = false
): number {
  if (surface < 9) {
    throw new Error('La surface minimale d’exposition est de 9 m²');
  }
  const rate = STAND_BASE_RATES_MAD[standType] || STAND_BASE_RATES_MAD.equipped;
  let total = surface * rate;
  if (includePowerPackage) {
    total += 1500; // forfait coffret électrique triphasé
  }
  return total;
}

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  // Accepts international or local formats like +2126..., 06..., 05...
  return cleaned.length >= 8 && /^\+?[0-9]{8,15}$/.test(cleaned);
}

export function generateBadgeId(profileCode: string = 'VIS'): string {
  const prefix = profileCode.substring(0, 3).toUpperCase();
  const year = '26';
  const random = Math.floor(10000 + Math.random() * 90000);
  return `GEA-${prefix}-${year}-${random}`;
}

export function filterSectors(sectors: Sector[], query: string): Sector[] {
  if (!query || !query.trim()) return sectors;
  const q = query.toLowerCase().trim();
  return sectors.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.products.some((p: string) => p.toLowerCase().includes(q))
  );
}

export function formatCurrencyMAD(amount: number): string {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 0,
  }).format(amount);
}
