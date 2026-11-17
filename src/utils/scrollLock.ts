export interface ScrollLockTarget {
  style: {
    overflow: string;
    overscrollBehavior: string;
    position?: string;
    top?: string;
    left?: string;
    right?: string;
    width?: string;
    touchAction?: string;
  };
}

export interface ScrollLockSnapshot {
  scrollX: number;
  scrollY: number;
  htmlOverflow: string;
  htmlOverscrollBehavior: string;
  bodyOverflow: string;
  bodyOverscrollBehavior: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
  bodyTouchAction: string;
}

export function captureScrollLockSnapshot(
  html: ScrollLockTarget,
  body: ScrollLockTarget,
  scrollX: number,
  scrollY: number,
): ScrollLockSnapshot {
  return {
    scrollX,
    scrollY,
    htmlOverflow: html.style.overflow,
    htmlOverscrollBehavior: html.style.overscrollBehavior,
    bodyOverflow: body.style.overflow,
    bodyOverscrollBehavior: body.style.overscrollBehavior,
    bodyPosition: body.style.position ?? '',
    bodyTop: body.style.top ?? '',
    bodyLeft: body.style.left ?? '',
    bodyRight: body.style.right ?? '',
    bodyWidth: body.style.width ?? '',
    bodyTouchAction: body.style.touchAction ?? '',
  };
}

export function applyScrollLockStyles(
  html: ScrollLockTarget,
  body: ScrollLockTarget,
  snapshot: ScrollLockSnapshot,
): void {
  html.style.overflow = 'hidden';
  html.style.overscrollBehavior = 'none';

  body.style.overflow = 'hidden';
  body.style.overscrollBehavior = 'none';
  body.style.position = 'fixed';
  body.style.top = `-${snapshot.scrollY}px`;
  body.style.left = `-${snapshot.scrollX}px`;
  body.style.right = '0';
  body.style.width = '100%';
  body.style.touchAction = 'none';
}

export function restoreScrollLockStyles(
  html: ScrollLockTarget,
  body: ScrollLockTarget,
  snapshot: ScrollLockSnapshot,
  restoreScroll?: (x: number, y: number) => void,
): void {
  html.style.overflow = snapshot.htmlOverflow;
  html.style.overscrollBehavior = snapshot.htmlOverscrollBehavior;

  body.style.overflow = snapshot.bodyOverflow;
  body.style.overscrollBehavior = snapshot.bodyOverscrollBehavior;
  body.style.position = snapshot.bodyPosition;
  body.style.top = snapshot.bodyTop;
  body.style.left = snapshot.bodyLeft;
  body.style.right = snapshot.bodyRight;
  body.style.width = snapshot.bodyWidth;
  body.style.touchAction = snapshot.bodyTouchAction;

  restoreScroll?.(snapshot.scrollX, snapshot.scrollY);
}
