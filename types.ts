export interface ExperienceRole {
  company: string;
  location: string;
  title: string;
  period: string;
  details: string[];
}

export interface GalleryItem {
  type: 'image' | 'video';
  url: string;
  poster?: string; // Optional poster for videos
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoPreview?: string; // Short loop for grid hover
  gallery: GalleryItem[]; // Full content
  description: string;
  span?: string; // col-span-2 or row-span-2 for masonry
}

export interface ServiceItem {
  title: string;
  icon: string; // FontAwesome class
  description: string;
}