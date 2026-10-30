import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_MEDIA_PARTNERS } from '../data/seedData';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface LogoTickerProps {
  onNavigate?: (page: PageId) => void;
}

export const LogoTicker: React.FC<LogoTickerProps> = ({ onNavigate }) => {
  const { exhibitors } = useApp();

  // Combine exhibitors and media partners for ticker
  const tickerItems = [
    ...exhibitors.map((e) => ({
      id: e.id,
      name: e.name,
      sub: e.sector,
      type: 'Exposant Officiel',
      website: e.website,
    })),
    ...INITIAL_MEDIA_PARTNERS.map((p) => ({
      id: p.id,
      name: p.name,
      sub: p.role,
      type: p.category === 'media' ? 'Partenaire Média' : 'Partenaire Institutionnel',
      website: p.website,
    })),
  ];

  // Duplicate list to achieve continuous seamless loop
  const seamlessList = [...tickerItems, ...tickerItems];

  return (
    <div className="py-10 bg-white border-y border-stone-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#367A4D] block mb-1">
            Écosystème B2B & Partenariats
          </span>
          <h3 className="text-xl font-bold text-[#202620] font-['Outfit',sans-serif]">
            Nos Exposants & Partenaires Officiels
          </h3>
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate('directory')}
            className="text-xs font-bold text-[#367A4D] hover:text-[#123D2B] flex items-center gap-1.5 transition-colors group"
          >
            <span>Consulter l'annuaire complet</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex gap-6 w-max animate-ticker group-hover:[animation-play-state:paused] py-2">
          {seamlessList.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-3.5 px-5 py-3 rounded-xl bg-[#F5F6F3] border border-stone-200/80 hover:border-[#367A4D] hover:bg-white hover:shadow-md transition-all duration-200 min-w-[260px] max-w-[320px] shrink-0"
            >
              {/* Badge Icon / Monogram */}
              <div className="w-10 h-10 rounded-lg bg-[#123D2B] text-[#A5C96B] flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                {item.name.substring(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#367A4D] block truncate">
                  {item.type}
                </span>
                <h4 className="text-xs font-bold text-[#202620] truncate font-['Outfit',sans-serif]">
                  {item.name}
                </h4>
                <p className="text-[11px] text-stone-500 truncate">
                  {item.sub}
                </p>
              </div>

              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-[#367A4D] p-1 transition-colors shrink-0"
                  title="Visiter le site officiel"
                  aria-label={`Visiter ${item.name}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tickerAnimation {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: tickerAnimation 40s linear infinite;
        }
      `}</style>
    </div>
  );
};
