import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  showSubtitle?: boolean;
}

export const GardenExpoLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const isWhite = variant === 'white';

  if (isWhite) {
    return (
      <div className={`flex flex-col gap-1.5 select-none ${className}`}>
        <div className="bg-white rounded-xl p-2.5 inline-flex items-center shadow-xs border border-white/20 w-fit">
          <img
            src="/assets/logo-garden-expo-official.png"
            alt="Logo officiel Garden Expo Africa"
            className="h-9 sm:h-10 w-auto object-contain"
            onError={(e) => {
              // Fallback to original raw asset if needed
              (e.currentTarget as HTMLImageElement).src =
                '/assets/aistudio/LOGO-GARDEN-EXPO-PNG_3a4759d4.png';
            }}
          />
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-300 tracking-wider uppercase pl-0.5">
            <span>Édition Officielle Maroc</span>
            <span aria-hidden="true">·</span>
            <span>Casablanca</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Garden Expo Africa Logo */}
      <img
        src="/assets/logo-garden-expo-official.png"
        alt="Logo officiel Garden Expo Africa Maroc"
        className="h-10 sm:h-11 w-auto object-contain filter drop-shadow-xs"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            '/assets/aistudio/LOGO-GARDEN-EXPO-PNG_3a4759d4.png';
        }}
      />
      {showSubtitle && (
        <div className="hidden sm:flex flex-col border-l border-stone-200 pl-2.5 leading-none">
          <span className="text-[11px] font-extrabold text-stone-900 tracking-wider uppercase font-['Outfit',sans-serif]">
            MAROC
          </span>
          <span className="text-[9px] text-emerald-800 font-semibold tracking-tight mt-0.5 uppercase">
            Salon du Paysage & Ville Verte
          </span>
        </div>
      )}
    </div>
  );
};
