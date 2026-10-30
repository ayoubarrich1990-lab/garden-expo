import React, { useState } from 'react';
import { Stand, Exhibitor } from '../types';
import { useApp } from '../context/AppContext';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Building, CheckCircle2, Info } from 'lucide-react';

interface InteractiveHallPlanProps {
  highlightStandId?: string; // If provided, highlights and zooms into this stand (for Exhibitor Dashboard)
  onSelectStand?: (stand: Stand, exhibitor?: Exhibitor) => void;
  className?: string;
  readOnly?: boolean;
}

export const InteractiveHallPlan: React.FC<InteractiveHallPlanProps> = ({
  highlightStandId,
  onSelectStand,
  className = '',
  readOnly = false,
}) => {
  const { stands, exhibitors } = useApp();
  const [activeHall, setActiveHall] = useState<'all' | 'Hall A' | 'Hall B'>('all');
  const [selectedStandId, setSelectedStandId] = useState<string | null>(highlightStandId || null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredStands = activeHall === 'all' ? stands : stands.filter((s) => s.hall === activeHall);

  const selectedStand = stands.find((s) => s.id === (selectedStandId || highlightStandId));
  const selectedExhibitor = selectedStand?.exhibitorId
    ? exhibitors.find((e) => e.id === selectedStand.exhibitorId)
    : undefined;

  const handleStandClick = (stand: Stand) => {
    setSelectedStandId(stand.id);
    const exh = stand.exhibitorId ? exhibitors.find((e) => e.id === stand.exhibitorId) : undefined;
    if (onSelectStand) {
      onSelectStand(stand, exh);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col ${className}`}>
      {/* Plan Toolbar */}
      <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveHall('all')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeHall === 'all' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Vue d'ensemble (Halls A & B)
          </button>
          <button
            type="button"
            onClick={() => setActiveHall('Hall A')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeHall === 'Hall A' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Hall A (Paysage & Végétal)
          </button>
          <button
            type="button"
            onClick={() => setActiveHall('Hall B')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeHall === 'Hall B' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Hall B (Irrigation & Smart City)
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-stone-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block border border-emerald-700" />
            <span>Réservé</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-400 inline-block border border-amber-500 animate-pulse" />
            <span>Votre Stand</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-stone-100 inline-block border border-stone-300" />
            <span>Disponible</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-stone-200">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.15))}
              className="p-1.5 hover:bg-stone-200 rounded text-stone-700"
              title="Zoom avant"
              aria-label="Zoom avant"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.15))}
              className="p-1.5 hover:bg-stone-200 rounded text-stone-700"
              title="Zoom arrière"
              aria-label="Zoom arrière"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:bg-stone-200 rounded text-stone-700"
              title="Réinitialiser zoom"
              aria-label="Réinitialiser zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative bg-[#1c241f] p-4 sm:p-8 overflow-auto flex items-center justify-center min-h-[380px] max-h-[520px]">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out',
          }}
          className="relative w-full max-w-4xl"
        >
          <svg
            viewBox="0 0 850 320"
            className="w-full h-auto drop-shadow-2xl select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Floor background */}
            <rect x="10" y="10" width="830" height="300" rx="14" fill="#141a16" stroke="#2a352d" strokeWidth="2" />

            {/* Hall Separator & Labels */}
            <line x1="475" y1="20" x2="475" y2="300" stroke="#36453b" strokeWidth="2" strokeDasharray="6 4" />
            <text x="240" y="28" fill="#a5c96b" fontSize="11" fontWeight="700" letterSpacing="2" textAnchor="middle">
              HALL A — AMÉNAGEMENT, VÉGÉTAL & MOBILIER URBAIN
            </text>
            <text x="655" y="28" fill="#a5c96b" fontSize="11" fontWeight="700" letterSpacing="2" textAnchor="middle">
              HALL B — IRRIGATION, EAU & SMART GREEN CITY
            </text>

            {/* Main Central Aisle */}
            <rect x="20" y="138" width="810" height="18" fill="#1f2822" />
            <text x="425" y="151" fill="#4d5f52" fontSize="9" fontWeight="600" letterSpacing="3" textAnchor="middle">
              ALLÉE PRINCIPALE CENTRALE — ACCÈS CONFÉRENCES ET B2B
            </text>

            {/* Entrance Arches */}
            <rect x="12" y="130" width="8" height="34" rx="2" fill="#367a4d" />
            <text x="28" y="295" fill="#5c7363" fontSize="9">← ENTRÉE ACCUEIL & ENREGISTREMENT BADGES</text>
            <text x="825" y="295" fill="#5c7363" fontSize="9" textAnchor="end">ACCÈS ESPACE CONFÉRENCES AAPM →</text>

            {/* Render Stands */}
            {filteredStands.map((stand) => {
              const isHighlighted = stand.id === highlightStandId;
              const isSelected = stand.id === selectedStandId;
              const isReserved = stand.status === 'confirmed';
              const exh = stand.exhibitorId ? exhibitors.find((e) => e.id === stand.exhibitorId) : undefined;

              // Color determination
              let fillColor = '#222b25';
              let strokeColor = '#3a4a3e';
              let textColor = '#cbd5e1';

              if (isHighlighted) {
                fillColor = '#d97706';
                strokeColor = '#f59e0b';
                textColor = '#ffffff';
              } else if (isSelected) {
                fillColor = '#059669';
                strokeColor = '#34d399';
                textColor = '#ffffff';
              } else if (isReserved) {
                fillColor = '#1e3a2b';
                strokeColor = '#367a4d';
                textColor = '#a7f3d0';
              }

              return (
                <g
                  key={stand.id}
                  onClick={() => handleStandClick(stand)}
                  className="cursor-pointer transition-all duration-150 hover:opacity-90"
                >
                  <rect
                    x={stand.svgCoords.x}
                    y={stand.svgCoords.y}
                    width={stand.svgCoords.width}
                    height={stand.svgCoords.height}
                    rx="6"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected || isHighlighted ? '3' : '1.5'}
                    className={isHighlighted ? 'animate-pulse' : ''}
                  />

                  {/* Stand Number Badge */}
                  <text
                    x={stand.svgCoords.x + stand.svgCoords.width / 2}
                    y={stand.svgCoords.y + (stand.svgCoords.height > 50 ? 22 : 18)}
                    fill={textColor}
                    fontSize={stand.svgCoords.height > 60 ? '13' : '11'}
                    fontWeight="800"
                    fontFamily="Outfit, sans-serif"
                    textAnchor="middle"
                  >
                    {stand.number}
                  </text>

                  {/* Surface info */}
                  <text
                    x={stand.svgCoords.x + stand.svgCoords.width / 2}
                    y={stand.svgCoords.y + (stand.svgCoords.height > 50 ? 38 : 32)}
                    fill={isHighlighted || isSelected ? '#ffffff' : '#6e8775'}
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {stand.surfaceSqMeters} m²
                  </text>

                  {/* Exhibitor Name if space permits */}
                  {stand.svgCoords.height >= 70 && exh && (
                    <text
                      x={stand.svgCoords.x + stand.svgCoords.width / 2}
                      y={stand.svgCoords.y + 60}
                      fill="#e2e8f0"
                      fontSize="8"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {exh.name.length > 18 ? exh.name.substring(0, 16) + '...' : exh.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Stand Info Card Footer */}
      {selectedStand && (
        <div className="p-4 bg-emerald-950/90 text-white border-t border-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center font-bold text-sm text-emerald-200 shrink-0">
              {selectedStand.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {selectedExhibitor ? selectedExhibitor.name : 'Stand Disponible à la réservation'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-semibold">
                  {selectedStand.hall} · {selectedStand.surfaceSqMeters} m² ({selectedStand.dimensions})
                </span>
              </div>
              <p className="text-emerald-200/80 text-[11px] mt-0.5">
                {selectedExhibitor
                  ? `${selectedExhibitor.sector} · ${selectedExhibitor.city}, ${selectedExhibitor.country}`
                  : `Type : ${selectedStand.type === 'island' ? 'Îlot 4 faces ouvertes' : selectedStand.type === 'equipped' ? 'Stand aménagé standard' : 'Espace nu'}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {selectedStand.id === highlightStandId && (
              <span className="px-3 py-1 bg-amber-500 text-stone-950 font-bold rounded text-xs flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Votre Stand Confirmé</span>
              </span>
            )}
            {selectedExhibitor && (
              <a
                href={`#exhibitor-${selectedExhibitor.id}`}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition-colors font-medium"
              >
                Consulter la fiche exposant
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
