import React, { useEffect, useRef, useState } from 'react';

export type AnimationType = 'pop-up' | 'slide-left' | 'slide-right' | 'pop-footer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
  delayMs?: number;
  threshold?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'pop-up',
  className = '',
  delayMs = 0,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Si le navigateur ne supporte pas IntersectionObserver, afficher directement
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const animationClass = {
    'pop-up': 'reveal-pop-up',
    'slide-left': 'reveal-slide-left',
    'slide-right': 'reveal-slide-right',
    'pop-footer': 'reveal-pop-footer',
  }[animation];

  return (
    <div
      ref={elementRef}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`${animationClass} ${isVisible ? 'reveal-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
