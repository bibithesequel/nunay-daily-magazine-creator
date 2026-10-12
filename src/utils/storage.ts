import type { MagazineDocument, UserProfile } from '../types';
import { DEFAULT_MAGAZINE_STATE } from './presets';
import { createDefaultMagazinePages } from './slideTemplates';

const CREATIONS_KEY = 'nunay_magazine_creations_v1';
const USER_KEY = 'nunay_magazine_user_v1';

export const DEFAULT_USER: UserProfile = {
  username: 'nunay_editor',
  displayName: 'Editorial Director nunay',
  email: 'editor@nunay-magazine.com',
  isLoggedIn: true,
};

export const createInitialDocument = (): MagazineDocument => ({
  id: `mag-${Date.now()}`,
  title: 'NUNAY DAILY',
  createdAt: new Date().toLocaleDateString('de-DE'),
  updatedAt: new Date().toLocaleDateString('de-DE'),
  coverState: DEFAULT_MAGAZINE_STATE,
  pages: createDefaultMagazinePages(DEFAULT_MAGAZINE_STATE),
});

export const getSavedCreations = (): MagazineDocument[] => {
  try {
    const raw = localStorage.getItem(CREATIONS_KEY);
    if (!raw) {
      const initial = [createInitialDocument()];
      localStorage.setItem(CREATIONS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load creations', e);
    return [createInitialDocument()];
  }
};

export const saveCreation = (doc: MagazineDocument): void => {
  try {
    const existing = getSavedCreations();
    const index = existing.findIndex((item) => item.id === doc.id);
    const updated = { ...doc, updatedAt: new Date().toLocaleDateString('de-DE') };
    
    if (index >= 0) {
      existing[index] = updated;
    } else {
      existing.unshift(updated);
    }
    localStorage.setItem(CREATIONS_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save creation', e);
  }
};

export const deleteCreation = (id: string): MagazineDocument[] => {
  try {
    const existing = getSavedCreations().filter((item) => item.id !== id);
    localStorage.setItem(CREATIONS_KEY, JSON.stringify(existing));
    return existing;
  } catch (e) {
    console.error('Failed to delete creation', e);
    return [];
  }
};

export const duplicateCreation = (id: string): MagazineDocument | null => {
  try {
    const existing = getSavedCreations();
    const target = existing.find((item) => item.id === id);
    if (!target) return null;

    const copy: MagazineDocument = {
      ...JSON.parse(JSON.stringify(target)),
      id: `mag-${Date.now()}`,
      title: `${target.title} (Kopie nunay)`,
      createdAt: new Date().toLocaleDateString('de-DE'),
      updatedAt: new Date().toLocaleDateString('de-DE'),
    };
    existing.unshift(copy);
    localStorage.setItem(CREATIONS_KEY, JSON.stringify(existing));
    return copy;
  } catch (e) {
    console.error('Failed to duplicate creation', e);
    return null;
  }
};

export const getUserProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return DEFAULT_USER;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USER;
  }
};

export const saveUserProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile', e);
  }
};
