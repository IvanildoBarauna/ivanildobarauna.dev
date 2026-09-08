export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

type RectMetrics = {
  top: number;
  height: number;
};

/**
 * Maps an element's centre from the lower edge of the viewport to the
 * viewport centre. The result is reversible and tied only to real scroll.
 */
export function getCentredEntryProgress(
  rect: RectMetrics,
  viewportHeight: number,
  startViewportRatio = 0.96,
  endViewportRatio = 0.5,
) {
  const elementCentre = rect.top + rect.height / 2;
  const start = viewportHeight * startViewportRatio;
  const end = viewportHeight * endViewportRatio;
  const range = Math.max(1, start - end);

  return clamp01((start - elementCentre) / range);
}

/**
 * Returns the progress through the portion of a tall track during which its
 * sticky child is pinned to the viewport.
 */
export function getStickyTrackProgress(
  trackTop: number,
  trackHeight: number,
  viewportHeight: number,
) {
  const scrollRange = Math.max(1, trackHeight - viewportHeight);
  return clamp01(-trackTop / scrollRange);
}

export function getStepIndex(progress: number, stepCount: number) {
  if (stepCount <= 1) return 0;
  return Math.min(stepCount - 1, Math.round(clamp01(progress) * (stepCount - 1)));
}
