import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, PageId } from '../types';
import { X, ShieldCheck, Building2, User, KeyRound, Sparkles, ArrowRight } from 'lucide-react';
import { GardenExpoLogo } from './GardenExpoLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
  onNavigate: (page: PageId) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'visitor',
  onNavigate,
}) => {
  const { loginAsDemo, loginUser } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');

  if (!isOpen) return null;

  const handleDemoLogin = (role: UserRole) => {
    loginAsDemo(role);
    onClose();
    if (role === 'exhibitor') onNavigate('exhibitor_portal');
    else if (role === 'visitor') onNavigate('visitor_portal');
    else if (role === 'admin' || role === 'super_admin') onNavigate('admin_portal');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginUser(email, selectedRole, fullName, company);
    onClose();
    if (selectedRole === 'exhibitor') onNavigate('exhibitor_portal');
    else if (selectedRole === 'visitor') onNavigate('visitor_portal');
    else onNavigate('admin_portal');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-[#202620]/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 z-10 shadow-2xl border border-stone-200 animate-fade-in my-8">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <GardenExpoLogo showSubtitle={false} />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
            Sélectionnez votre profil d'accès
          </label>
          <div className="grid grid-cols-3 gap-2 p-1 bg-[#F5F6F3] rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={() => setSelectedRole('visitor')}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
                selectedRole === 'visitor'
                  ? 'bg-white text-[#123D2B] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <User className="w-4 h-4 text-[#367A4D]" />
              <span>Visiteur B2B</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('exhibitor')}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
                selectedRole === 'exhibitor'
                  ? 'bg-white text-[#123D2B] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#367A4D]" />
              <span>Exposant</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('super_admin')}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
                selectedRole === 'super_admin'
                  ? 'bg-white text-[#123D2B] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <KeyRound className="w-4 h-4 text-[#367A4D]" />
              <span>Back-Office</span>
            </button>
          </div>
        </div>

        {/* Instant 1-Click Access for Testing */}
        <div className="mb-6 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
          <div className="flex items-center gap-2 text-xs font-bold text-[#123D2B] mb-2">
            <Sparkles className="w-4 h-4 text-[#367A4D]" />
            <span>Accès Démonstration Rapide (1-clic)</span>
          </div>
          <p className="text-[11px] text-emerald-900/80 leading-relaxed mb-3">
            Testez immédiatement les fonctionnalités complètes selon le rôle souhaité :
          </p>
          <div className="flex flex-col gap-2">
            {selectedRole === 'visitor' && (
              <button
                type="button"
                onClick={() => handleDemoLogin('visitor')}
                className="w-full py-2 px-3 text-xs font-bold text-white bg-[#367A4D] hover:bg-[#123D2B] rounded-lg transition-colors flex items-center justify-between shadow-xs"
              >
                <span>Entrer comme Visiteur (Yasmine El Fassi · Architecte)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {selectedRole === 'exhibitor' && (
              <button
                type="button"
                onClick={() => handleDemoLogin('exhibitor')}
                className="w-full py-2 px-3 text-xs font-bold text-white bg-[#123D2B] hover:bg-stone-900 rounded-lg transition-colors flex items-center justify-between shadow-xs"
              >
                <span>Entrer comme Exposant (Dr. Karim Benjelloun · Atlas Végétal)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {selectedRole === 'super_admin' && (
              <button
                type="button"
                onClick={() => handleDemoLogin('super_admin')}
                className="w-full py-2 px-3 text-xs font-bold text-white bg-[#202620] hover:bg-black rounded-lg transition-colors flex items-center justify-between shadow-xs"
              >
                <span>Entrer comme Super Admin (R2H Communication)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div className="flex items-center justify-between pb-2">
            <span className="font-bold text-stone-800">
              {isRegister ? 'Créer un nouveau compte' : 'Ou connectez-vous avec vos identifiants'}
            </span>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#367A4D] font-bold hover:underline"
            >
              {isRegister ? 'Déjà un compte ? Se connecter' : 'Créer un compte'}
            </button>
          </div>

          {isRegister && (
            <>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Nom complet *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex: Karim Tazi"
                  required
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#367A4D]"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Entreprise / Organisme *</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Ex: Cabinet de Paysage Maroc"
                  required
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#367A4D]"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-stone-700 font-semibold mb-1">Email professionnel *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@domaine.ma"
              required
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#367A4D]"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1">Mot de passe *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#367A4D]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2.5 px-4 bg-[#123D2B] hover:bg-[#367A4D] text-white font-bold rounded-lg transition-colors shadow-xs"
          >
            {isRegister ? "Valider l'inscription" : 'Accéder à mon espace sécurisé'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-stone-100 text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#367A4D]" />
          <span>Accès privé chiffré · Plateforme officielle Garden Expo Africa</span>
        </div>
      </div>
    </div>
  );
};
