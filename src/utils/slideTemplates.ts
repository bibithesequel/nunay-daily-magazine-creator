import type { MagazinePage, SlideType, MagazineState } from '../types';

export const createDefaultMagazinePages = (coverState: MagazineState): MagazinePage[] => [
  {
    id: 'page-1',
    pageNumber: 1,
    type: 'cover',
    title: coverState.title,
    subtitle: coverState.subtitle,
  },
  {
    id: 'page-2',
    pageNumber: 2,
    type: 'toc',
    title: 'INHALT & EDITORIAL',
    subtitle: 'NUNAY ISSUE NO. 142',
    editorName: 'nunay Chefredaktion',
    editorNote:
      'Willkommen in einer neuen Dimension der visuellen Ästhetik. In dieser Ausgabe widmen wir uns den Visionären, die Mode, Technologie und Kunst neu definieren. Jede Seite ist kuratiert für höchste visuelle Brillanz.',
    tocSections: [
      {
        id: 'toc-1',
        page: 3,
        category: 'TITELSTORY',
        title: 'DAS GROSSE PARIS SPECIAL',
        desc: 'Haute Couture und die Renaissance des Avantgarde-Designs.',
      },
      {
        id: 'toc-2',
        page: 4,
        category: 'INTERVIEW',
        title: 'ISABELLA NUNAY IM GESPRÄCH',
        desc: 'Über Unabhängigkeit, neue Silhouetten und den Mut zum Risiko.',
      },
      {
        id: 'toc-3',
        page: 5,
        category: 'FOTOSTRECKE',
        title: 'LICHT & SCHATTEN IN MAILAND',
        desc: 'Exklusive Bildserie von Fotograf nunay Studio.',
      },
      {
        id: 'toc-4',
        page: 6,
        category: 'FUTURE VISION',
        title: 'KÜNSTLICHE INTELLIGENZ IN DER KUNST',
        desc: 'Wie neuronale Welten unsere Museen transformieren.',
      },
    ],
  },
  {
    id: 'page-3',
    pageNumber: 3,
    type: 'article',
    title: 'FEATURE STORY',
    kicker: 'TITEL-INTERVIEW',
    headline: 'DIE NEUE ZEITRECHNUNG DER ELEGANZ',
    authorName: 'Text von Dr. Marc nunay Becker',
    featuredName: 'Isabella nunay Rossi',
    imageSrc:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    imageCaption: 'Isabella nunay in maßgeschneiderter Abendrobe, Paris 2026.',
    pullQuote: '„Wahre Schönheit entsteht erst in dem Moment, in dem Perfektion aufgebrochen wird.”',
    column1:
      'Als Isabella nunay den Raum betritt, verstummen die Gespräche. Nicht aus Ehrfurcht, sondern weil ihre Präsenz eine unvergleichliche Ruhe ausstrahlt. In den vergangenen drei Jahren hat sie die traditionellen Laufstege revolutioniert und ein neues Bewusstsein für nachhaltige Luxusmode geschaffen.',
    column2:
      '„Wir dürfen nicht mehr in veralteten Kategorien denken”, erklärt sie bei unserem Gespräch im Atelier. Mit jedem Entwurf beweist nunay Studios, dass modernes Design gleichermaßen radikal, poetisch und alltagstauglich sein kann. Ein Plädoyer für den eigenen unverwechselbaren Stil.',
  },
  {
    id: 'page-4',
    pageNumber: 4,
    type: 'gallery',
    title: 'EDITORIAL FOTOSTRECKE',
    headline: 'SHADOWS OF MILAN',
    photographerName: 'Aufnahmen von nunay Visual Arts',
    galleryImages: [
      {
        id: 'g-1',
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        caption: 'Look I: Skulpturale Silhouetten',
      },
      {
        id: 'g-2',
        url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
        caption: 'Look II: Texturen im Abendlicht',
      },
      {
        id: 'g-3',
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
        caption: 'Look III: Architektur & Faltenwurf',
      },
      {
        id: 'g-4',
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        caption: 'Look IV: Kontraste in Schwarz & Weiß',
      },
    ],
  },
  {
    id: 'page-5',
    pageNumber: 5,
    type: 'quote',
    title: 'STATEMENT DES MONATS',
    quoteText: '„KREATIVITÄT IST DIE EINZIGE WÄHRUNG, DIE DURCH TEILEN MEHR WIRD.”',
    quotedPerson: 'Elena nunay Weber',
    personRole: 'Creative Director & Gründerin von nunay Vision',
    accentColor: '#f59e0b',
    bgImage:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'page-6',
    pageNumber: 6,
    type: 'backcover',
    title: 'RÜCKSEITE',
    brandName: 'NUNAY HAUTE PARFUMS',
    tagline: 'DER NEUE DUFT DER UNENDLICHKEIT',
    backImage:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    websiteText: 'WWW.NUNAY-MAGAZINE.COM/BOUTIQUE',
    showBarcode: true,
  },
];

export const createNewSlide = (type: SlideType, pageNumber: number): MagazinePage => {
  switch (type) {
    case 'toc':
      return {
        id: `page-${Date.now()}`,
        pageNumber,
        type: 'toc',
        title: 'INHALTSVERZEICHNIS',
        subtitle: 'AUSGABE NUNAY',
        editorName: 'nunay Redaktion',
        editorNote: 'Entdecke die Highlights dieser Ausgabe.',
        tocSections: [
          {
            id: 'toc-new-1',
            page: 2,
            category: 'REPORT',
            title: 'TITELTHEMA NUNAY',
            desc: 'Spannende Einblicke in die Trends von morgen.',
          },
        ],
      };
    case 'article':
      return {
        id: `page-${Date.now()}`,
        pageNumber,
        type: 'article',
        title: 'EDITORIAL ARTIKEL',
        kicker: 'STORY',
        headline: 'NEUE PERSPEKTIVEN VON NUNAY',
        authorName: 'nunay Reporter',
        featuredName: 'Protagonist nunay',
        column1: 'Hier beginnt der Fließtext deines Magazinbeitrags.',
        column2: 'Zweite Textspalte für einen professionellen zweispaltigen Magazindruck.',
        imageSrc:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Exklusive Impressionen im Magazinformat.',
        pullQuote: '„Ein inspirierendes Zitat aus dem Artikel.”',
      };
    case 'gallery':
      return {
        id: `page-${Date.now()}`,
        pageNumber,
        type: 'gallery',
        title: 'FOTOSTRECKE',
        headline: 'FOTOGRAFIE NUNAY',
        photographerName: 'Aufnahmen von nunay Photo',
        galleryImages: [
          {
            id: `g-${Date.now()}-1`,
            url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
            caption: 'Foto Impression 1',
          },
          {
            id: `g-${Date.now()}-2`,
            url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
            caption: 'Foto Impression 2',
          },
        ],
      };
    case 'quote':
      return {
        id: `page-${Date.now()}`,
        pageNumber,
        type: 'quote',
        title: 'ZITAT-SEITE',
        quoteText: '„MUT IST DER ANFANG VON JEDEM GROSSEN DESIGN.”',
        quotedPerson: 'Design nunay Studio',
        personRole: 'Editorial Vision',
        accentColor: '#ec4899',
      };
    case 'backcover':
      return {
        id: `page-${Date.now()}`,
        pageNumber,
        type: 'backcover',
        title: 'RÜCKSEITE',
        brandName: 'NUNAY CAMPAIGN',
        tagline: 'THE NEXT GENERATION',
        websiteText: 'WWW.NUNAY-MAGAZINE.COM',
        showBarcode: true,
      };
    default:
      return {
        id: `page-${Date.now()}`,
        pageNumber,
        type: 'article',
        title: 'NEUE SEITE',
        authorName: 'nunay Autor',
        headline: 'NUNAY SPECIAL',
      };
  }
};
