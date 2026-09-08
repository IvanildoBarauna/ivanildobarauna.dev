import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navigation from '@/components/Navigation';
import { getLanguageFromUrl, getLocalizedUrl, LanguageProvider } from '@/i18n/LanguageProvider';

describe('portfolio internationalization', () => {
  /** Verifies supported URL parsing and the Portuguese fallback. */
  it('reads the language code from the URL', () => {
    expect(getLanguageFromUrl('https://example.com/?lang=en')).toBe('en');
    expect(getLanguageFromUrl('https://example.com/?lang=es')).toBe('es');
    expect(getLanguageFromUrl('https://example.com/?lang=fr')).toBe('pt');
  });

  /** Verifies that localization retains existing URL parameters and fragments. */
  it('builds a localized URL without losing navigation state', () => {
    expect(getLocalizedUrl('https://example.com/?source=test#projects', 'es')).toBe('/?source=test&lang=es#projects');
  });

  /** Verifies language selection, translated navigation, and URL synchronization. */
  it('switches the visible language and updates the URL', async () => {
    window.history.replaceState({}, '', '/?lang=pt');
    render(<LanguageProvider><Navigation /></LanguageProvider>);

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));

    expect(await screen.findByRole('link', { name: 'About me' })).toBeInTheDocument();
    await waitFor(() => expect(window.location.search).toContain('lang=en'));
    expect(document.documentElement.lang).toBe('en');
  });
});
