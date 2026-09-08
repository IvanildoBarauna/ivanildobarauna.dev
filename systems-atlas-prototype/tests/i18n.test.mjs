import assert from "node:assert/strict";
import test from "node:test";
import { buildLanguageUrl, getLanguageFromUrl, supportedLanguages, translations } from "../src/i18n.js";

/** Verifies that every supported language provides a complete translation shape. */
test("provides the same translation keys for every supported language", () => {
  const portugueseKeys = Object.keys(translations.pt).sort();

  assert.deepEqual(supportedLanguages, ["pt", "en", "es"]);
  for (const language of supportedLanguages) {
    assert.deepEqual(Object.keys(translations[language]).sort(), portugueseKeys);
  }
});

/** Verifies URL language parsing and its Portuguese fallback. */
test("reads supported languages from the URL", () => {
  assert.equal(getLanguageFromUrl("https://example.test/?lang=en"), "en");
  assert.equal(getLanguageFromUrl("https://example.test/?lang=es#projetos"), "es");
  assert.equal(getLanguageFromUrl("https://example.test/?lang=invalid"), "pt");
  assert.equal(getLanguageFromUrl("https://example.test/"), "pt");
});

/** Verifies language URL generation without dropping navigation context. */
test("updates the language parameter while retaining URL state", () => {
  assert.equal(buildLanguageUrl("https://example.test/portfolio?source=share#atlas", "en"), "/portfolio?source=share&lang=en#atlas");
  assert.equal(buildLanguageUrl("https://example.test/?lang=pt", "es"), "/?lang=es");
});
