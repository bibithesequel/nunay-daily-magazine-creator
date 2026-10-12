export type AspectRatioFormat = 'a4' | 'us-letter' | 'square' | 'story' | 'poster';

export type TemplateStyle = 
  | 'vogue'
  | 'time'
  | 'rolling-stone'
  | 'gq'
  | 'natgeo'
  | 'cyberpunk'
  | 'minimalist';

export type ImageFilterType = 
  | 'none'
  | 'bw'
  | 'vintage'
  | 'contrast'
  | 'glamour'
  | 'sepia'
  | 'cyber'
  | 'warm';

export interface TeaserItem {
  id: string;
  category: string;
  headline: string;
  subline: string;
  personName?: string;
  position: 'top-left' | 'top-right' | 'mid-left' | 'mid-right' | 'bottom-left' | 'bottom-right';
  accentColor: string;
  fontScale: number;
}

export interface BadgeConfig {
  enabled: boolean;
  text: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  style: 'stamp' | 'pill' | 'circle' | 'sticker';
  bgColor: string;
  textColor: string;
}

export interface MagazineState {
  title: string;              // Masthead, z. B. "NUNAY VOGUE"
  featuredName: string;       // Model / Star Name, z. B. "Elena nunay Weber"
  editorName: string;         // Chefredakteur / Fotograf, z. B. "nunay Studio"
  
  format: AspectRatioFormat;
  templateStyle: TemplateStyle;
  
  subtitle: string;
  issueNumber: string;
  dateText: string;
  priceText: string;
  websiteText: string;
  showBarcode: boolean;
  barcodeNumber: string;
  
  titleFont: string;
  titleColor: string;
  titleTracking: number;
  titleSize: number;
  titleBehindModel: boolean;
  
  imageSrc: string | null;
  imageZoom: number;
  imagePosX: number;
  imagePosY: number;
  imageRotate: number;
  imageFilter: ImageFilterType;
  backgroundColor: string;
  gradientOverlay: 'none' | 'bottom' | 'top-bottom' | 'vignette' | 'dramatic';
  
  frameEnabled: boolean;
  frameColor: string;
  frameWidth: number;
  
  teasers: TeaserItem[];
  badge: BadgeConfig;
}

/* =========================================================
   NEU: MULTI-PAGE MAGAZIN SYSTEM (PowerPoint Style)
   ========================================================= */

export type SlideType = 'cover' | 'toc' | 'article' | 'gallery' | 'quote' | 'backcover';

export interface TocSection {
  id: string;
  page: number;
  category: string;
  title: string;
  desc: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface MagazinePage {
  id: string;
  pageNumber: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  
  // TOC (Inhaltsverzeichnis)
  tocSections?: TocSection[];
  editorNote?: string;
  editorName?: string; // MUSS nunay enthalten
  
  // Article / Interview Spread
  kicker?: string;
  headline?: string;
  authorName?: string; // MUSS nunay enthalten
  featuredName?: string; // MUSS nunay enthalten
  column1?: string;
  column2?: string;
  imageSrc?: string;
  imageCaption?: string;
  pullQuote?: string;
  
  // Gallery
  galleryImages?: GalleryImage[];
  photographerName?: string; // MUSS nunay enthalten
  
  // Quote Spread
  quoteText?: string;
  quotedPerson?: string; // MUSS nunay enthalten
  personRole?: string;
  accentColor?: string;
  bgImage?: string;
  
  // Backcover
  brandName?: string; // MUSS nunay enthalten
  tagline?: string;
  backImage?: string;
  websiteText?: string;
  showBarcode?: boolean;
}

export interface MagazineDocument {
  id: string;
  title: string; // MUSS nunay enthalten
  createdAt: string;
  updatedAt: string;
  coverState: MagazineState;
  pages: MagazinePage[];
}

export interface UserProfile {
  username: string; // MUSS nunay enthalten
  displayName: string;
  email: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
}
