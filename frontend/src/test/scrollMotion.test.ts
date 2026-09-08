import { describe, expect, it } from 'vitest';
import {
  clamp01,
  getCentredEntryProgress,
  getStepIndex,
  getStickyTrackProgress,
} from '../utils/scrollMotion';

describe('scroll motion helpers', () => {
  it('clamps progress to the inclusive zero-to-one range', () => {
    expect(clamp01(-0.5)).toBe(0);
    expect(clamp01(0.42)).toBe(0.42);
    expect(clamp01(1.8)).toBe(1);
  });

  it('finishes a scene exactly when its centre reaches the viewport centre', () => {
    const viewportHeight = 1_000;
    const sceneHeight = 400;

    expect(getCentredEntryProgress({ top: 760, height: sceneHeight }, viewportHeight)).toBe(0);
    expect(getCentredEntryProgress({ top: 530, height: sceneHeight }, viewportHeight)).toBe(0.5);
    expect(getCentredEntryProgress({ top: 300, height: sceneHeight }, viewportHeight)).toBe(1);
  });

  it('is reversible when the user scrolls back through a scene', () => {
    const entering = getCentredEntryProgress({ top: 415, height: 400 }, 1_000);
    const leavingBackwards = getCentredEntryProgress({ top: 645, height: 400 }, 1_000);

    expect(entering).toBeCloseTo(0.75);
    expect(leavingBackwards).toBeCloseTo(0.25);
  });

  it('maps the native sticky track distance to progress', () => {
    expect(getStickyTrackProgress(120, 2_000, 1_000)).toBe(0);
    expect(getStickyTrackProgress(-500, 2_000, 1_000)).toBe(0.5);
    expect(getStickyTrackProgress(-1_000, 2_000, 1_000)).toBe(1);
    expect(getStickyTrackProgress(-1_400, 2_000, 1_000)).toBe(1);
  });

  it('selects each narrative step and clamps both ends', () => {
    expect(getStepIndex(-1, 8)).toBe(0);
    expect(getStepIndex(0.08, 8)).toBe(1);
    expect(getStepIndex(0.5, 8)).toBe(4);
    expect(getStepIndex(1.4, 8)).toBe(7);
    expect(getStepIndex(0.8, 0)).toBe(0);
  });
});
