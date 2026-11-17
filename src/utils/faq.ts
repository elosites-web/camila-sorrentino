export function toggleFaqId(currentOpenId: string | null, targetId: string): string | null {
  if (!targetId) {
    return currentOpenId;
  }
  return currentOpenId === targetId ? null : targetId;
}
