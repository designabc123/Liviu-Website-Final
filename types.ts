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
  id: number | string; // Updated to accept string IDs for the Bento grid
  title: string;
  category?: string; // Optional now as Bento grid items might not strictly follow category enum
  thumbnail?: string; // Optional
  coverImage?: string; // For Bento grid
  coverVideo?: string; // For Bento grid
  videoPreview?: string; // Short loop for grid hover
  gallery?: GalleryItem[]; // Full content
  items?: any[]; // For Bento grid gallery items
  description?: string; // Optional
  type?: string; // For Bento grid
  span?: string; // col-span-2 or row-span-2 for masonry
  className?: string; // For Bento grid spans
}

export interface ServiceItem {
  title: string;
  icon: string; // FontAwesome class
  description: string;
  icons?: string[]; // Optional array of icon URLs
}