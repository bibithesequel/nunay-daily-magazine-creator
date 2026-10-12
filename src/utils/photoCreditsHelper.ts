import type { MagazineDocument } from '../types';

export interface PhotoCreditItem {
  pageNumber: number;
  pageTitle: string;
  url: string;
  label: string;
}

/**
 * Durchsucht das gesamte Magazin-Dokument und sammelt alle verwendeten Bild-URLs.
 */
export function collectAllPhotoCredits(doc: MagazineDocument): PhotoCreditItem[] {
  const credits: PhotoCreditItem[] = [];

  // 1. Titel-Cover Foto
  if (doc.coverState?.imageSrc) {
    credits.push({
      pageNumber: 1,
      pageTitle: 'Titel-Cover',
      url: doc.coverState.imageSrc,
      label: doc.coverState.featuredName ? `Cover Model: ${doc.coverState.featuredName}` : 'Cover Hauptmotiv',
    });
  }

  // 2. Alle weiteren Seiten
  doc.pages.forEach((page) => {
    // Artikel-Bild
    if (page.type === 'article' && page.imageSrc) {
      credits.push({
        pageNumber: page.pageNumber,
        pageTitle: page.title || 'Feature Artikel',
        url: page.imageSrc,
        label: page.imageCaption || page.headline || 'Artikel Illustration',
      });
    }

    // Fotostrecke (Gallery)
    if (page.type === 'gallery' && page.galleryImages) {
      page.galleryImages.forEach((img, idx) => {
        if (img.url) {
          credits.push({
            pageNumber: page.pageNumber,
            pageTitle: page.title || 'Fotostrecke',
            url: img.url,
            label: img.caption || `Fotostrecke Bild #${idx + 1}`,
          });
        }
      });
    }

    // Quote Hintergrundbild
    if (page.type === 'quote' && page.bgImage) {
      credits.push({
        pageNumber: page.pageNumber,
        pageTitle: page.title || 'Zitat-Folie',
        url: page.bgImage,
        label: 'Zitat Hintergrundmotiv',
      });
    }

    // Backcover Kampagnenbild
    if (page.type === 'backcover' && page.backImage) {
      credits.push({
        pageNumber: page.pageNumber,
        pageTitle: 'Rückseite',
        url: page.backImage,
        label: page.tagline || 'Backcover Kampagne',
      });
    }
  });

  return credits;
}
