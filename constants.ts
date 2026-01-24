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

// PERFECT GRID LOGIC (3 Columns)
// Total Slots Used = 12 (4 Rows x 3 Cols)
// 1 Large Item (2x2) = 4 Slots
// 8 Small Items (1x1) = 8 Slots
// Total = 12 Slots. Perfect Rectangle.
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, title: "Medical Mode of Action", category: "3D animation", image: "https://picsum.photos/800/600?random=1", span: "md:col-span-1" },
  { id: 2, title: "Pharma Brand Identity", category: "Logo design", image: "https://picsum.photos/600/400?random=2", span: "md:col-span-1" },
  { id: 3, title: "Corporate Event Stage", category: "Event design", image: "https://picsum.photos/600/800?random=3", span: "md:col-span-1" }, 
  
  // Row 2 starts here
  { id: 4, title: "Patient Infographic", category: "Infographic design", image: "https://picsum.photos/800/800?random=4", span: "md:col-span-2 md:row-span-2" }, // Large 2x2
  
  // These fill the right column (col 3) next to the large item
  { id: 5, title: "Product Launch Video", category: "Motion design", image: "https://picsum.photos/600/400?random=5", span: "md:col-span-1" },
  { id: 6, title: "Packaging Line", category: "Packaging design", image: "https://picsum.photos/600/400?random=6", span: "md:col-span-1" },
  
  // Row 4 starts here (Bottom row)
  { id: 7, title: "Golf Digest Layout", category: "Magazine design", image: "https://picsum.photos/600/800?random=7", span: "md:col-span-1" },
  { id: 8, title: "Corporate Headshots", category: "Professional photography", image: "https://picsum.photos/800/600?random=8", span: "md:col-span-1" },
  { id: 9, title: "Agency Web Portal", category: "Web design", image: "https://picsum.photos/600/400?random=9", span: "md:col-span-1" },
];