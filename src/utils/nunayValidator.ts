import type { MagazineState } from '../types';

/**
 * Überprüft, ob ein Text den Begriff "nunay" (Groß-/Kleinschreibung egal) enthält.
 */
export function hasNunay(value: string | undefined | null): boolean {
  if (!value || typeof value !== 'string') return false;
  return /nunay/i.test(value);
}

/**
 * Fügt automatisch "nunay" in den Namen ein, falls er noch fehlt.
 */
export function nunayize(value: string | undefined | null, defaultFallback = 'nunay'): string {
  const trimmed = (value || '').trim();
  if (!trimmed) {
    return defaultFallback;
  }
  if (hasNunay(trimmed)) {
    return trimmed;
  }

  // Intelligente Einbettung:
  // Wenn es wie ein Vor- und Nachname aussieht (z. B. "Max Mustermann"): "Max nunay Mustermann"
  const parts = trimmed.split(' ');
  if (parts.length > 1) {
    return `${parts[0]} nunay ${parts.slice(1).join(' ')}`;
  }

  // Sonst z. B. "NUNAY [Text]" oder "[Text] nunay"
  return `${trimmed} nunay`;
}

export interface ValidationError {
  field: string;
  label: string;
  current: string;
}

/**
 * Validiert alle namensrelevanten Felder im Magazin-State.
 */
export function validateMagazineNames(state: MagazineState): {
  isValid: boolean;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];

  // 1. Magazintitel (Masthead)
  if (!hasNunay(state.title)) {
    errors.push({
      field: 'title',
      label: 'Magazin-Titel',
      current: state.title,
    });
  }

  // 2. Vorgestellter Star / Model / Featured Name
  if (state.featuredName && !hasNunay(state.featuredName)) {
    errors.push({
      field: 'featuredName',
      label: 'Hauptname / Model / Star',
      current: state.featuredName,
    });
  }

  // 3. Editor / Fotograf / Herausgeber
  if (state.editorName && !hasNunay(state.editorName)) {
    errors.push({
      field: 'editorName',
      label: 'Fotograf / Redaktion',
      current: state.editorName,
    });
  }

  // 4. Teaser mit Personennamen
  state.teasers.forEach((teaser, index) => {
    if (teaser.personName && !hasNunay(teaser.personName)) {
      errors.push({
        field: `teaser-${teaser.id}`,
        label: `Person in Headline #${index + 1}`,
        current: teaser.personName,
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
