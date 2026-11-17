export function getNextLightboxIndex(currentIndex: number, totalItems: number): number | null {
  if (totalItems <= 0 || currentIndex < 0 || currentIndex >= totalItems) {
    return null;
  }
  return (currentIndex + 1) % totalItems;
}

export function getPrevLightboxIndex(currentIndex: number, totalItems: number): number | null {
  if (totalItems <= 0 || currentIndex < 0 || currentIndex >= totalItems) {
    return null;
  }
  return (currentIndex - 1 + totalItems) % totalItems;
}

export function getActiveLightboxItem<T>(items: readonly T[], currentIndex: number | null): T | null {
  if (currentIndex === null || currentIndex < 0 || currentIndex >= items.length) {
    return null;
  }
  return items[currentIndex] ?? null;
}
