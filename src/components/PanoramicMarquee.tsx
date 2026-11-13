import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface PanoramicMarqueeProps {
  src: string;
  alt: string;
  heightClassName: string;
  reverse?: boolean;
  /** Scroll speed in CSS pixels per second */
  speedPxPerSec?: number;
  /** Proportional crop from left edge (0..0.05) to trim outer frame and excess margin */
  cropLeftRatio?: number;
  /** Proportional crop from right edge (0..0.05) to trim outer frame and excess margin */
  cropRightRatio?: number;
  /** Proportional crop from top edge (0..0.4) to trim empty headers or top border lines */
  cropTopRatio?: number;
  /** Proportional crop from bottom edge (0..0.2) to trim bottom border lines */
  cropBottomRatio?: number;
  /** Extra vertical pixels clipped from top and bottom to strip baked-in border lines */
  cropVerticalPx?: number;
}

export const PanoramicMarquee: React.FC<PanoramicMarqueeProps> = ({
  src,
  alt,
  heightClassName,
  reverse = false,
  speedPxPerSec = 80,
  cropLeftRatio = 0.002,
  cropRightRatio = 0.002,
  cropTopRatio = 0,
  cropBottomRatio = 0,
  cropVerticalPx = 3,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const sampleTileRef = useRef<HTMLDivElement>(null);
  const sampleImgRef = useRef<HTMLImageElement>(null);

  const animRef = useRef<Animation | null>(null);
  const prevGroupWidthRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);

  const [isReady, setIsReady] = useState(false);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);
  const [copiesPerGroup, setCopiesPerGroup] = useState(1);
  const [groupWidth, setGroupWidth] = useState(0);
  const [imgMetrics, setImgMetrics] = useState<{
    heightPx: number | null;
    top: number;
    bottom: number;
    left: number;
    right: number;
  }>({
    heightPx: null,
    top: cropVerticalPx,
    bottom: cropVerticalPx,
    left: 3,
    right: 3,
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Track prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Reset ready state when src changes
  useEffect(() => {
    setIsReady(false);
    setNaturalSize(null);
    setGroupWidth(0);
    prevGroupWidthRef.current = 0;
  }, [src]);

  const markImageLoaded = useCallback((img: HTMLImageElement) => {
    if (!img || img.naturalWidth <= 0 || img.naturalHeight <= 0) return;
    const finish = () => {
      setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      setIsReady(true);
    };
    if (typeof img.decode === 'function') {
      img.decode().then(finish).catch(finish);
    } else {
      finish();
    }
  }, []);

  // Handle already-cached images on mount / src swap
  useEffect(() => {
    const img = sampleImgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      markImageLoaded(img);
    }
  }, [src, markImageLoaded]);

  // Measure viewport, tile dimensions, required repetitions, and reference group width
  const measureLayout = useCallback(() => {
    const viewport = viewportRef.current;
    const tile = sampleTileRef.current;
    const group = groupRef.current;
    if (!viewport || !tile || !group || !naturalSize) return;

    const viewportWidth = viewport.getBoundingClientRect().width;
    const tileHeight = tile.getBoundingClientRect().height;
    if (viewportWidth <= 0 || tileHeight <= 0) return;

    const visibleVFrac = Math.max(0.25, 1 - cropTopRatio - cropBottomRatio);
    const rawImgHeight = tileHeight / visibleVFrac + cropVerticalPx * 2;
    const aspectRatio = naturalSize.width / naturalSize.height;
    const rawImgWidth = rawImgHeight * aspectRatio;

    const nextCropTop = Math.round(rawImgHeight * cropTopRatio) + cropVerticalPx;
    const nextCropBottom = Math.round(rawImgHeight * cropBottomRatio) + cropVerticalPx;
    const nextCropLeft = cropLeftRatio > 0 ? Math.max(2, Math.round(rawImgWidth * cropLeftRatio)) : 0;
    const nextCropRight = cropRightRatio > 0 ? Math.max(2, Math.round(rawImgWidth * cropRightRatio)) : 0;
    const nextHeightPx = Math.round(rawImgHeight * 100) / 100;
    const effectiveTileWidth = Math.max(100, rawImgWidth - nextCropLeft - nextCropRight);

    setImgMetrics((prev) =>
      prev.heightPx === nextHeightPx &&
      prev.top === nextCropTop &&
      prev.bottom === nextCropBottom &&
      prev.left === nextCropLeft &&
      prev.right === nextCropRight
        ? prev
        : {
            heightPx: nextHeightPx,
            top: nextCropTop,
            bottom: nextCropBottom,
            left: nextCropLeft,
            right: nextCropRight,
          }
    );

    const neededCopies = Math.min(
      12,
      Math.max(1, Math.ceil((viewportWidth + 64) / effectiveTileWidth))
    );
    setCopiesPerGroup((prev) => (prev === neededCopies ? prev : neededCopies));

    const measuredGroupWidth = group.getBoundingClientRect().width;
    if (measuredGroupWidth > 0) {
      setGroupWidth((prev) =>
        Math.abs(prev - measuredGroupWidth) < 0.25 ? prev : measuredGroupWidth
      );
    }
  }, [naturalSize, cropLeftRatio, cropRightRatio, cropTopRatio, cropBottomRatio, cropVerticalPx]);

  useEffect(() => {
    if (!isReady) return;
    measureLayout();

    const viewport = viewportRef.current;
    const group = groupRef.current;
    const tile = sampleTileRef.current;
    if (!viewport || !group || !tile) return;

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measureLayout);
      return () => window.removeEventListener('resize', measureLayout);
    }

    const observer = new ResizeObserver(() => {
      measureLayout();
    });
    observer.observe(viewport);
    observer.observe(group);
    observer.observe(tile);

    return () => observer.disconnect();
  }, [isReady, copiesPerGroup, imgMetrics, measureLayout]);

  // Run GPU-composited Web Animations API loop with zero-jump direction toggle & resize
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (!isReady || groupWidth <= 0 || prefersReducedMotion) {
      if (animRef.current) {
        animRef.current.cancel();
        animRef.current = null;
      }
      track.style.transform = 'translate3d(0px, 0, 0)';
      prevGroupWidthRef.current = 0;
      return;
    }

    let currentOffsetFrac = 0;
    let hasExistingAnim = false;

    if (animRef.current && prevGroupWidthRef.current > 0) {
      hasExistingAnim = true;
      const computedTransform = window.getComputedStyle(track).transform;
      if (computedTransform && computedTransform !== 'none') {
        const matrix = new DOMMatrixReadOnly(computedTransform);
        const currentX = Number.isFinite(matrix.m41) ? matrix.m41 : 0;
        currentOffsetFrac = Math.min(1, Math.max(0, -currentX / prevGroupWidthRef.current));
      }
      animRef.current.cancel();
      animRef.current = null;
    }

    const durationMs = Math.max(4000, (groupWidth / speedPxPerSec) * 1000);
    const keyframes: Keyframe[] = reverse
      ? [
          { transform: `translate3d(${-groupWidth}px, 0, 0)` },
          { transform: 'translate3d(0px, 0, 0)' },
        ]
      : [
          { transform: 'translate3d(0px, 0, 0)' },
          { transform: `translate3d(${-groupWidth}px, 0, 0)` },
        ];

    if (typeof track.animate === 'function') {
      const anim = track.animate(keyframes, {
        duration: durationMs,
        iterations: Infinity,
        easing: 'linear',
      });

      if (hasExistingAnim) {
        const startProgress = reverse ? 1 - currentOffsetFrac : currentOffsetFrac;
        anim.currentTime = startProgress * durationMs;
      }

      if (isHoveredRef.current) {
        anim.pause();
      }

      animRef.current = anim;
      prevGroupWidthRef.current = groupWidth;
    }
  }, [isReady, groupWidth, reverse, speedPxPerSec, prefersReducedMotion]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) {
        animRef.current.cancel();
        animRef.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    animRef.current?.pause();
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (!prefersReducedMotion) {
      animRef.current?.play();
    }
  };

  const imgInlineStyle: React.CSSProperties = {
    height: imgMetrics.heightPx !== null ? `${imgMetrics.heightPx}px` : `calc(100% + ${cropVerticalPx * 2}px)`,
    width: 'auto',
    maxWidth: 'none',
    marginTop: `-${imgMetrics.top}px`,
    marginBottom: `-${imgMetrics.bottom}px`,
    marginLeft: `-${imgMetrics.left}px`,
    marginRight: `-${imgMetrics.right}px`,
  };

  const tileIndices = Array.from({ length: copiesPerGroup }, (_, i) => i);

  return (
    <div
      ref={viewportRef}
      dir="ltr"
      className="relative w-full overflow-hidden bg-white select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dégradés latéraux subtils pour estomper les bords avec élégance */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      {/* Piste de défilement composée de deux groupes rigoureusement identiques */}
      <div
        ref={trackRef}
        className={`flex w-max items-center will-change-transform transition-opacity duration-300 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Groupe A : séquence de référence mesurée par ResizeObserver */}
        <div ref={groupRef} className="flex shrink-0 items-center">
          {tileIndices.map((idx) => (
            <div
              key={`a-${idx}`}
              ref={idx === 0 ? sampleTileRef : undefined}
              className={`shrink-0 overflow-hidden bg-white ${heightClassName}`}
            >
              <img
                ref={idx === 0 ? sampleImgRef : undefined}
                src={src}
                alt={idx === 0 ? alt : ''}
                onLoad={idx === 0 ? (e) => markImageLoaded(e.currentTarget) : undefined}
                loading="eager"
                decoding="async"
                className="block w-auto max-w-none marquee-hd-image"
                style={imgInlineStyle}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Groupe B : duplication exacte du Groupe A pour boucle continue sans couture */}
        {!prefersReducedMotion && (
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {tileIndices.map((idx) => (
              <div
                key={`b-${idx}`}
                className={`shrink-0 overflow-hidden bg-white ${heightClassName}`}
              >
                <img
                  src={src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="block w-auto max-w-none marquee-hd-image"
                  style={imgInlineStyle}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
