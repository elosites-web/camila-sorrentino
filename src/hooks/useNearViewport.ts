import { useEffect, useState, type RefObject } from 'react';

export function useNearViewport(
  ref: RefObject<HTMLElement | null>,
  rootMargin = '700px 0px',
): boolean {
  const [isNear, setIsNear] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isNear) {
      return;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsNear(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isNear, ref, rootMargin]);

  return isNear;
}
