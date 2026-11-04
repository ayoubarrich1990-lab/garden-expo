import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStandPrice,
  validateEmail,
  validatePhone,
  generateBadgeId,
  filterSectors,
  formatCurrencyMAD,
  STAND_BASE_RATES_MAD,
} from './expoLogic';
import { Sector } from '../types';

test('calculateStandPrice calculates correct rates', () => {
  const equipped9m = calculateStandPrice(9, 'equipped', false);
  assert.equal(equipped9m, 9 * STAND_BASE_RATES_MAD.equipped);

  const bare18mWithPower = calculateStandPrice(18, 'bare', true);
  assert.equal(bare18mWithPower, 18 * STAND_BASE_RATES_MAD.bare + 1500);

  const island36m = calculateStandPrice(36, 'island', false);
  assert.equal(island36m, 36 * STAND_BASE_RATES_MAD.island);
});

test('calculateStandPrice throws if surface under 9m²', () => {
  assert.throws(() => calculateStandPrice(8, 'equipped'), /minimale/);
});

test('validateEmail validates valid and invalid email addresses', () => {
  assert.equal(validateEmail('contact@gardenexpo.ma'), true);
  assert.equal(validateEmail('architecte.paysage@pro-maroc.ma'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail('missing@domain'), false);
  assert.equal(validateEmail(''), false);
});

test('validatePhone checks valid Moroccan and international numbers', () => {
  assert.equal(validatePhone('+212 661 482 497'), true);
  assert.equal(validatePhone('+212522305955'), true);
  assert.equal(validatePhone('0661123456'), true);
  assert.equal(validatePhone('123'), false);
  assert.equal(validatePhone('abc'), false);
});

test('generateBadgeId returns expected format', () => {
  const badgeId = generateBadgeId('ARCH');
  assert.match(badgeId, /^GEA-ARC-26-\d{5}$/);
});

test('filterSectors filters by title or products', () => {
  const mockSectors: Sector[] = [
    {
      id: 'irrigation',
      title: 'Irrigation & Gestion de l’Eau',
      shortDesc: 'Solutions d’arrosage intelligent et micro-aspersion.',
      fullDesc: '',
      iconName: 'Droplet',
      image: '',
      products: ['Goutte-à-goutte', 'Pompes solaires', 'Capteurs d’humidité'],
      targetAudience: [],
      marketKeyFigures: '',
    },
    {
      id: 'urban-furniture',
      title: 'Mobilier Urbain',
      shortDesc: 'Bancs, pergolas et corbeilles.',
      fullDesc: '',
      iconName: 'Armchair',
      image: '',
      products: ['Bancs bois et béton', 'Lampadaires solaires'],
      targetAudience: [],
      marketKeyFigures: '',
    },
  ];

  const results1 = filterSectors(mockSectors, 'irrigation');
  assert.equal(results1.length, 1);
  assert.equal(results1[0].id, 'irrigation');

  const results2 = filterSectors(mockSectors, 'lampadaires');
  assert.equal(results2.length, 1);
  assert.equal(results2[0].id, 'urban-furniture');

  const emptyResults = filterSectors(mockSectors, 'inexistant');
  assert.equal(emptyResults.length, 0);
});
