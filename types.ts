export interface ExperienceRole {
  company: string;
  location: string;
  title: string;
  period: string;
  details: string[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  span?: string; // col-span-2 or row-span-2 for masonry
}

export interface ServiceItem {
  title: string;
  icon: string; // FontAwesome class
  description: string;
}