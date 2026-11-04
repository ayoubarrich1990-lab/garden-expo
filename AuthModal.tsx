import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, PageId } from '../types';
import { X, Building2, User, KeyRound, Eye, EyeOff, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
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
  const { loginWithPassword, registerNewAccount } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isRegister) {
      // Create new account
      const result = registerNewAccount({
        email,
        password,
        role: selectedRole,
        fullName,
        company,
        phone,
      });

      if (!result.success) {
        setErrorMessage(result.error || "Une erreur est survenue lors de l'inscription.");
        return;
      }

      onClose();
      if (selectedRole === 'exhibitor') onNavigate('exhibitor_portal');
      else if (selectedRole === 'visitor') onNavigate('visitor_portal');
      else onNavigate('admin_portal');
    } else {
      // Login with password
      const result = loginWithPassword(email, password);

      if (!result.success) {
        setErrorMessage(result.error || "Identifiants invalides.");
        return;
      }

      onClose();
      if (result.user?.role === 'exhibitor') onNavigate('exhibitor_portal');
      else if (result.user?.role === 'visitor') onNavigate('visitor_portal');
      else onNavigate('admin_portal');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-[#202620]/75 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 z-10 shadow-2xl border border-stone-200 animate-fade-in my-8">
        {/* Header */}
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
            Console d'accès :
          </label>
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#F5F6F3] rounded-2xl border border-stone-200">
            <button
              type="button"
              onClick={() => handleRoleSelect('visitor')}
              className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                selectedRole === 'visitor'
                  ? 'bg-white text-[#123D2B] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <User className="w-4 h-4 text-[#367A4D]" />
              <span>Visiteur B2B</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect('exhibitor')}
              className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                selectedRole === 'exhibitor'
                  ? 'bg-white text-[#123D2B] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#367A4D]" />
              <span>Exposant</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect('super_admin')}
              className={`py-2 px-2 text-xs font-bold rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                selectedRole === 'super_admin'
                  ? 'bg-white text-[#123D2B] shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <KeyRound className="w-4 h-4 text-[#367A4D]" />
              <span>Back-Office</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs">
          <div className="flex items-center justify-between pb-1">
            <span className="font-bold text-stone-900 text-sm">
              {isRegister ? 'Création de compte' : 'Authentification par mot de passe'}
            </span>
            {selectedRole !== 'super_admin' && (
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErrorMessage(null);
                }}
                className="text-[#367A4D] font-bold hover:underline cursor-pointer"
              >
                {isRegister ? 'Se connecter' : 'Nouveau ? Créer un compte'}
              </button>
            )}
          </div>

          {isRegister && (
            <>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Nom et Prénom *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex: Karim Tazi"
                  required
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#367A4D] bg-white text-stone-900"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Entreprise / Organisme *</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ex: Pépinière du Sud"
                    required
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#367A4D] bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Téléphone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6..."
                    required
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#367A4D] bg-white text-stone-900"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-stone-700 font-semibold mb-1">Email professionnel *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                selectedRole === 'super_admin'
                  ? 'admin@gardenexpo.ma'
                  : selectedRole === 'exhibitor'
                  ? 'exposant@gardenexpo.ma'
                  : 'visiteur@gardenexpo.ma'
              }
              required
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-[#367A4D] bg-white text-stone-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-stone-700 font-semibold">Mot de passe *</label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Saisissez votre mot de passe"
                required
                className="w-full px-3.5 py-2.5 pr-10 border border-stone-300 rounded-xl focus:outline-none focus:border-[#367A4D] bg-white text-stone-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3 px-4 bg-[#123D2B] hover:bg-[#367A4D] text-white font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>
              {isRegister
                ? "Créer mon compte et accéder"
                : selectedRole === 'super_admin'
                ? "Connexion au Back-Office"
                : selectedRole === 'exhibitor'
                ? "Connexion Espace Exposant"
                : "Connexion Espace Visiteur"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
