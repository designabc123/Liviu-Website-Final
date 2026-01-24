import { ExperienceRole, PortfolioItem, ServiceItem } from './types';

// CV DATA EXTRACTION
export const CV_DATA = {
  name: "Liviu Lungu",
  title: "Senior Graphic Designer | Motion Designer | Art Director",
  location: "Lucan, Co. Dublin",
  email: "designabc123@gmail.com",
  linkedin: "www.linkedin.com/in/designabc123",
  bio: "Senior multidisciplinary designer with over 20 years of professional experience, currently specializing in the pharmaceutical, medical device, and biotech sectors. Proven track record of expanding internal design capabilities by integrating high-end 3D animation (Cinema 4D), motion design, and video production into corporate portfolios. Expert in balancing creativity with regulatory compliance, owning the full creative process from concept to execution. Passionate about leveraging new technologies—including AI-assisted workflows—to increase efficiency and creative impact.",
};

export const EXPERIENCE_DATA: ExperienceRole[] = [
  {
    company: "PTC THERAPEUTICS, INC.",
    location: "Dublin, Ireland",
    title: "Senior Manager, Graphic Design",
    period: "Apr 2022 – Present",
    details: [
      "Expanded the design department's core capabilities beyond traditional static graphics by integrating high-end 3D animation, motion design, and video production into the team's portfolio.",
      "Serve as the primary technical lead for multimedia projects, leveraging this hybrid skillset to visualize complex medical concepts in-house.",
      "Multimedia & 3D Visualization: Pioneered the use of internal video editing and 3D animation workflows (using Cinema 4D and After Effects) to produce high-value assets, including complex medical animations and technical visualizations.",
      "Significantly reduced reliance on external vendors, cutting agency costs while accelerating project delivery.",
      "Brand Conception & Global Adaptation: Conceptualized and developed primary visual identities for multiple product launches.",
      "Event Design & Quality Assurance: Act as a primary creative lead for high-visibility events, internal corporate conferences to external medical congresses.",
      "Provide senior-level creative direction for Corporate Communications and Investor Relations, delivering professional photography."
    ]
  },
  {
    company: "FREELANCE CONSULTANT",
    location: "Remote",
    title: "Senior Graphic Designer",
    period: "Jan 2021 – Mar 2022",
    details: [
      "Network-Driven Consulting: Successfully transitioned to independent consulting following the closure of Klox Technologies.",
      "Secured projects primarily through direct referrals from former colleagues moving to new international roles.",
      "Diverse Project Execution: Provided agile design support for clients across multiple industries.",
      "Delivered high-quality brand assets, presentations, and digital materials while operating fully remotely."
    ]
  },
  {
    company: "KLOX TECHNOLOGIES",
    location: "Dublin, Ireland",
    title: "Head of Creative & IT",
    period: "Aug 2017 – Dec 2020",
    details: [
      "Brand & Campaign Management: Created new brand identities and guidelines, designing comprehensive visuals for multi-channel campaigns.",
      "Photography & Video: Shot and edited original photography and videos for new marketing campaigns.",
      "Medical Illustration: Designed infographics and medical illustrations to transform complex modes of action into accessible messaging for patients and HCPs.",
      "Product Packaging: Managed the design of packaging artwork for the company's full product range.",
      "App Development Management: Oversaw mobile app development phases, liaising between internal stakeholders and developers.",
      "Marketing Operations: Managed print production from quote to delivery and facilitated translation of marketing materials into over 10 languages."
    ]
  },
  {
    company: "WALTON DESIGN",
    location: "Dublin, Ireland",
    title: "Studio Manager / Senior Graphic Designer",
    period: "Oct 2014 – Jun 2017",
    details: [
      "Editorial Design: Led the design and layout for Ireland's most-read golf publications (Golf Digest Ireland, Golfing Magazine) and Golfing Weekly.",
      "Team Leadership: Supervised the design team, creating schedules/page plans and managing artwork flow for in-house studio clients.",
      "Event Media: Captured photography and video at golf events; handled post-production editing and animation."
    ]
  },
  {
    company: "ASPEN PHARMA",
    location: "Dublin, Ireland",
    title: "Senior Graphic Designer",
    period: "Oct 2013 – Oct 2014",
    details: [
      "Packaging Compliance: Created and updated packaging artwork, ensuring strict adherence to brand guidelines and technical specifications.",
      "Quality Control: Managed proofing processes to ensure zero-error output for regulated materials."
    ]
  },
  {
    company: "SUN WAVE PHARMA",
    location: "Romania",
    title: "Senior Graphic Designer",
    period: "Oct 2010 – Sep 2013",
    details: [
      "Full-Cycle Design: Managed graphic design projects from concept to completion, including flyers, posters, brochures, and web design.",
      "Conference Marketing: Designed signage and promotional materials for various medical conferences and tradeshows."
    ]
  },
  {
    company: "ZZIP DESIGN",
    location: "Romania",
    title: "Senior Graphic Designer",
    period: "2006 – 2010",
    details: [
      "Senior graphic design duties for various client projects."
    ]
  },
  {
    company: "LOGOTIP COPY CENTER",
    location: "Romania",
    title: "Graphic Designer",
    period: "2003 – 2006",
    details: [
      "Graphic design and print preparation."
    ]
  }
];

export const CORE_COMPETENCIES: ServiceItem[] = [
  {
    title: "Design & Art Direction",
    icon: "fa-pen-nib",
    description: "Developing comprehensive brand identities, corporate communication strategies, and large-scale event designs, while overseeing packaging solutions, intricate editorial layouts, and advanced typographic execution for global markets."
  },
  {
    title: "Motion & 3D",
    icon: "fa-cube",
    description: "Expert utilization of Cinema 4D and After Effects to create high-end motion graphics, realistic 3D visualizations, and complex medical animations that simplify intricate scientific concepts."
  },
  {
    title: "Photography",
    icon: "fa-camera",
    description: "Professional-grade corporate portraiture and headshots, dynamic event photography coverage, and detailed product photography, supported by high-end post-production retouching and color correction."
  },
  {
    title: "Software Toolkit",
    icon: "fa-layer-group",
    description: "Mastery of the full Adobe Creative Cloud suite including Photoshop, Illustrator, InDesign, After Effects, Premiere Pro, and XD, alongside proficiency in Microsoft Office for corporate integration."
  },
  {
    title: "Emerging Tech",
    icon: "fa-microchip",
    description: "Leveraging cutting-edge AI-assisted workflows for rapid ideation and asset generation, combined with a solid foundational knowledge of HTML and CSS to bridge design and development."
  },
  {
    title: "Event & Brand Experience",
    icon: "fa-map-location-dot",
    description: "End-to-end conceptualization and execution of trade show booths, large-format environmental graphics, and stage designs, ensuring seamless global brand adaptation across diverse physical spaces."
  }
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Motion design",
  "3D animation",
  "Infographic design",
  "Logo design",
  "Professional photography",
  "Event design",
  "Packaging design",
  "Web design",
  "Magazine design",
  "Illustration"
];

// UPDATED PORTFOLIO ITEMS WITH GALLERY DATA
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // 1. Motion Design Collection (Featured Video)
  { 
    id: 1, 
    title: "Biotech Motion Series", 
    category: "Motion design", 
    thumbnail: "https://picsum.photos/800/600?random=1",
    videoPreview: "https://res.cloudinary.com/dao9flvhw/video/upload/v1769274097/bg1_cxszpb.mp4",
    description: "A comprehensive series of motion graphics exploring cellular regeneration and DNA sequencing visualization. Created using Cinema 4D and After Effects.",
    span: "md:col-span-2 md:row-span-2",
    gallery: [
      { type: 'video', url: "https://res.cloudinary.com/dao9flvhw/video/upload/v1769274097/bg1_cxszpb.mp4" },
      { type: 'video', url: "https://res.cloudinary.com/dao9flvhw/video/upload/v1769274096/bg2_thtdxn.mp4" },
      { type: 'video', url: "https://res.cloudinary.com/dao9flvhw/video/upload/v1769274096/bg3_dqaibh.mp4" }
    ]
  },
  // 2. Photography (Single Image)
  { 
    id: 2, 
    title: "Corporate Headshots", 
    category: "Professional photography", 
    thumbnail: "https://picsum.photos/600/400?random=2", 
    description: "High-end corporate portraiture for executive leadership teams. Focused on approachable yet professional lighting setups.",
    span: "md:col-span-1",
    gallery: [
      { type: 'image', url: "https://picsum.photos/1200/800?random=2" }
    ]
  },
  // 3. 3D Animation
  { 
    id: 3, 
    title: "Medical Mode of Action", 
    category: "3D animation", 
    thumbnail: "https://picsum.photos/600/800?random=3", 
    description: "Technical visualization of drug delivery mechanisms. This project required precise anatomical accuracy and clean rendering styles.",
    span: "md:col-span-1",
    gallery: [
      { type: 'image', url: "https://picsum.photos/1000/1200?random=3" },
      { type: 'image', url: "https://picsum.photos/1000/1200?random=33" }
    ]
  }, 
  
  // 4. Infographic
  { 
    id: 4, 
    title: "Patient Care Infographic", 
    category: "Infographic design", 
    thumbnail: "https://picsum.photos/800/800?random=4", 
    description: "Simplifying complex clinical trial data into an accessible visual format for patient advocacy groups.",
    span: "md:col-span-1",
    gallery: [
      { type: 'image', url: "https://picsum.photos/1200/1200?random=4" }
    ]
  }, 
  
  // 5. Logo Design
  { 
    id: 5, 
    title: "Pharma Brand Identity", 
    category: "Logo design", 
    thumbnail: "https://picsum.photos/600/400?random=5", 
    description: "Complete identity system for a new oncology product line, including logo, typography, and color palette.",
    span: "md:col-span-1",
    gallery: [
        { type: 'image', url: "https://picsum.photos/1200/800?random=5" },
        { type: 'image', url: "https://picsum.photos/1200/800?random=55" },
        { type: 'image', url: "https://picsum.photos/1200/800?random=555" }
    ]
  },
  
  // 6. Packaging
  { 
    id: 6, 
    title: "Supplement Packaging", 
    category: "Packaging design", 
    thumbnail: "https://picsum.photos/600/400?random=6", 
    description: "Regulatory compliant packaging design for a range of vitamin supplements distributed in the EU market.",
    span: "md:col-span-1",
    gallery: [
        { type: 'image', url: "https://picsum.photos/1200/800?random=6" }
    ]
  },
  
  // 7. Magazine
  { 
    id: 7, 
    title: "Golf Digest Layout", 
    category: "Magazine design", 
    thumbnail: "https://picsum.photos/600/800?random=7", 
    description: "Editorial layout design for the feature story of the month. Grid-based typography with dynamic image placement.",
    span: "md:col-span-1",
    gallery: [
        { type: 'image', url: "https://picsum.photos/800/1200?random=7" }
    ]
  },
  // 8. Event Design
  { 
    id: 8, 
    title: "Medical Congress Booth", 
    category: "Event design", 
    thumbnail: "https://picsum.photos/800/600?random=8", 
    description: "Large format graphics and structural design for a 20x20 trade show booth.",
    span: "md:col-span-1",
    gallery: [
        { type: 'image', url: "https://picsum.photos/1200/900?random=8" }
    ]
  },
  // 9. Web Design
  { 
    id: 9, 
    title: "Agency Web Portal", 
    category: "Web design", 
    thumbnail: "https://picsum.photos/600/400?random=9", 
    description: "UI/UX design for an internal asset management portal used by sales representatives.",
    span: "md:col-span-1",
    gallery: [
        { type: 'image', url: "https://picsum.photos/1200/800?random=9" }
    ]
  },
];