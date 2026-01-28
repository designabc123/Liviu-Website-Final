import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- TYPE DEFINITIONS ---
interface PortfolioMediaItem {
  type: string;
  src: string;
  thumb: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  coverImage: string;
  coverVideo?: string;
  type: string;
  items: PortfolioMediaItem[];
  className?: string; // For Grid Spans
}

// --- NEW DATA STRUCTURE (BENTO GRID) ---
const PORTFOLIO_DATA: PortfolioItem[] = [
  // ROW 1 & 2 (HEROES)
  {
    id: '3d-anim',
    title: '3D ANIMATION',
    className: 'col-span-1 md:col-span-2 md:row-span-2', // Large Block
    coverImage: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463086/bg1_ucnnzi.png',
    coverVideo: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769274097/bg1_cxszpb.mp4',
    type: 'video',
    items: [
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769274097/bg1_cxszpb.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463086/bg1_ucnnzi.png' },
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769274096/bg2_thtdxn.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463089/bg2_fer7x4.png' },
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769274096/bg3_dqaibh.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463090/bg3_zvafgm.png' },
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769461164/Sephience_MoA_gkfl7p.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463103/Sephience_MoA_s5veqz.png' }
    ]
  },
  {
    id: 'motion',
    title: 'MOTION DESIGN',
    className: 'col-span-1 md:col-span-2 md:row-span-2', // Large Block
    coverImage: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463603/Rosacea_Hero_v1vytz.png',
    coverVideo: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769461598/Rosacea_Loop_Thumbnail_nd8nnx.mp4',
    type: 'video',
    items: [
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769461218/Rosacea_rk4j2g.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463165/Rosacea_bqm1oy.png' },
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769461219/Acne_ulcppn.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463142/Acne_thoarx.png' },
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769461213/Skin_Rejuvenation_os2gb2.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463173/Skin_Rejuvenation_ula9sy.png' },
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769461209/The_Golf_Digest_Volvo_Open_Intro_Animation_zhrs0f.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463151/Golf_pt2q0i.png' },
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769461214/Sephience_xfehxk.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463169/Sephience_wfnvj5.png' },
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769461216/PTC_qyn1ap.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463160/PTC_vcah25.png' },
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769461208/Immudex_Dextramer_Technology_ricwo1.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463146/Dextramer_wszqtb.png' },
      { type: 'video', src: 'https://res.cloudinary.com/dao9flvhw/video/upload/v1769461207/Immudex_About_Video_uotuqh.mp4', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769463155/Immudex_About_fxywqv.png' }
    ]
  },
  // ROW 3 & 4 (STANDARD TILES)
  {
    id: 'event',
    title: 'EVENT DESIGN',
    className: 'col-span-1 row-span-1',
    coverImage: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464982/2024_4_hz7ptg.jpg',
    type: 'image',
    items: [
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464979/2023_1_wlrf2j.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464979/2023_1_wlrf2j.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464980/2024_1_zstmkm.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464980/2024_1_zstmkm.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464981/2024_2_ofi2js.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464981/2024_2_ofi2js.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464980/2024_3_a9ndrv.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464980/2024_3_a9ndrv.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464982/2024_4_hz7ptg.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464982/2024_4_hz7ptg.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464984/2025_1_r9uzlv.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769464984/2025_1_r9uzlv.jpg' }
    ]
  },
  { 
    id: 'illustration', 
    title: 'ILLUSTRATION', 
    className: 'col-span-1 row-span-1', 
    coverImage: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637318/Skin_Vector_or66qs.jpg', 
    type: 'image', 
    items: [
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637318/Skin_Vector_or66qs.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637318/Skin_Vector_or66qs.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637317/Rory_e4vyys.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637317/Rory_e4vyys.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637316/Multitasking_zpwolk.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637316/Multitasking_zpwolk.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637315/Rocket_Boy_pxwpxp.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637315/Rocket_Boy_pxwpxp.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637314/Growing_Golfers_cb0wsb.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637314/Growing_Golfers_cb0wsb.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637320/Skin_iofb0z.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637320/Skin_iofb0z.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637313/Cool_Dog_wnwzkh.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769637313/Cool_Dog_wnwzkh.jpg' }
    ] 
  },
  { 
    id: 'infographic', 
    title: 'INFOGRAPHIC DESIGN', 
    className: 'col-span-1 row-span-1', 
    coverImage: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638171/FivePrime_fi6r30.jpg', 
    type: 'image', 
    items: [
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638171/FivePrime_fi6r30.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638171/FivePrime_fi6r30.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638175/The_Masters_utaxce.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638175/The_Masters_utaxce.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638173/rosacea-infographic_hvzj7x.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638173/rosacea-infographic_hvzj7x.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638172/Spieth_kuqjij.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638172/Spieth_kuqjij.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638169/Education_uzf92n.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769638169/Education_uzf92n.jpg' }
    ]
  },
  { 
    id: 'logo', 
    title: 'LOGO DESIGN', 
    className: 'col-span-1 row-span-1', 
    coverImage: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636055/LumiHeal-Logo-01-Black_susqjs.png', 
    type: 'image', 
    items: [
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636055/LumiHeal-Logo-01-Black_susqjs.png', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636055/LumiHeal-Logo-01-Black_susqjs.png' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636062/Walton_Media_h0d1fi.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636062/Walton_Media_h0d1fi.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636060/Twin_Oaks_xmxrw2.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636060/Twin_Oaks_xmxrw2.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636057/Saltwater_mxkfw0.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636057/Saltwater_mxkfw0.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636058/Small_Logo_Rotate_00160_dtcwx7.png', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636058/Small_Logo_Rotate_00160_dtcwx7.png' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636054/Cubiquity_mwyzrb.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636054/Cubiquity_mwyzrb.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636054/Klox-Logo-Round-Black_f5h2jl.png', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636054/Klox-Logo-Round-Black_f5h2jl.png' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636052/Compact-Positive_ewuyke.png', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636052/Compact-Positive_ewuyke.png' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636052/FB-Logo_ixm7d8.png', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636052/FB-Logo_ixm7d8.png' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636051/CineTraveler_re4rid.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636051/CineTraveler_re4rid.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636051/Cambridge_Editors_jyekts.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769636051/Cambridge_Editors_jyekts.jpg' }
    ]
  },
  { 
    id: 'magazine', 
    title: 'MAGAZINE DESIGN', 
    className: 'col-span-1 row-span-1', 
    coverImage: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639196/Mag_01_pfggjt.jpg', 
    type: 'image', 
    items: [
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639196/Mag_01_pfggjt.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639196/Mag_01_pfggjt.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639197/Mag_02_rddkq5.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639197/Mag_02_rddkq5.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639200/Mag_03_kkncsj.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639200/Mag_03_kkncsj.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639200/Mag_04_u9tult.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639200/Mag_04_u9tult.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639202/Mag_05_cx0cqt.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639202/Mag_05_cx0cqt.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639204/Mag_06_lbdiyo.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639204/Mag_06_lbdiyo.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639206/Mag_07_ar4cpn.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639206/Mag_07_ar4cpn.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639209/Mag_08_jtcjlj.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769639209/Mag_08_jtcjlj.jpg' }
    ] 
  },
  { id: 'packaging', title: 'PACKAGING', className: 'col-span-1 row-span-1', coverImage: '', type: 'tbc', items: [] },
  { 
    id: 'photo', 
    title: 'PHOTOGRAPHY', 
    className: 'col-span-1 row-span-1', 
    coverImage: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634703/Claudia_Bridge_ywygkv.jpg', 
    type: 'image', 
    items: [
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634703/Claudia_Bridge_ywygkv.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634703/Claudia_Bridge_ywygkv.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634702/Library_Bridge_-_Kayla_03_vbma9f.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634702/Library_Bridge_-_Kayla_03_vbma9f.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634701/Restaurant_-_Daniel_02_jrsx5w.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634701/Restaurant_-_Daniel_02_jrsx5w.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634705/Catalina_Portrait_k3wve8.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634705/Catalina_Portrait_k3wve8.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634700/Doctor-and-patient_ymdu8i.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634700/Doctor-and-patient_ymdu8i.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634700/Library_Reading_-_Jan_04_y6aklu.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634700/Library_Reading_-_Jan_04_y6aklu.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634700/Cafe_-_Thomas_04_bajhtm.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634700/Cafe_-_Thomas_04_bajhtm.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634699/Library_Archive_-_Ania_05_q9zus9.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634699/Library_Archive_-_Ania_05_q9zus9.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634697/Rosacea-Model_lddsbr.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634697/Rosacea-Model_lddsbr.jpg' },
      { type: 'image', src: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634699/Library_Reading_-_Nadia_06_tcpuyk.jpg', thumb: 'https://res.cloudinary.com/dao9flvhw/image/upload/v1769634699/Library_Reading_-_Nadia_06_tcpuyk.jpg' }
    ]
  },
  { id: 'web', title: 'WEB DESIGN', className: 'col-span-1 row-span-1', coverImage: '', type: 'tbc', items: [] }
];

// --- COMPONENT: MODAL ---
interface CategoryModalProps {
  category: PortfolioItem;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const currentMedia = category.items[activeMediaIndex];

  // Helper Functions for Navigation
  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveMediaIndex((prev) => (prev + 1) % category.items.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveMediaIndex((prev) => (prev - 1 + category.items.length) % category.items.length);
  };

  // Handle Key Press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [category.items.length, onClose]);

  // Safety check for SSR/environment
  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[95vh] flex flex-col bg-zinc-900 rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-zinc-900 z-10 shrink-0">
          <h2 className="text-xl font-bold font-display text-accent-orange tracking-wider uppercase">
            {category.title}
          </h2>
          {/* UPDATED CLOSE BUTTON */}
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-accent-orange text-white rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm group"
          >
            <i className="fa-solid fa-xmark text-lg group-hover:scale-110 transition-transform"></i>
          </button>
        </div>

        {/* HERO MEDIA - Relative Container for Arrows */}
        <div className="relative w-full h-auto bg-zinc-900 overflow-y-auto group">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMediaIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-auto block"
            >
              {currentMedia && (currentMedia.type === 'video' ? (
                <video 
                  src={currentMedia.src} 
                  controls 
                  autoPlay 
                  className="w-full h-auto block"
                />
              ) : (
                <img 
                  src={currentMedia.src} 
                  alt={category.title} 
                  className="w-full h-auto block"
                />
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* NAVIGATION ARROWS - REFINED */}
          {category.items.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-6 -translate-y-1/2 w-16 h-16 flex items-center justify-center bg-black/50 hover:bg-accent-orange text-white rounded-full transition-all duration-300 z-20 backdrop-blur-sm cursor-pointer shadow-lg opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                aria-label="Previous Item"
              >
                <i className="fa-solid fa-chevron-left text-2xl"></i>
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-6 -translate-y-1/2 w-16 h-16 flex items-center justify-center bg-black/50 hover:bg-accent-orange text-white rounded-full transition-all duration-300 z-20 backdrop-blur-sm cursor-pointer shadow-lg opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                aria-label="Next Item"
              >
                <i className="fa-solid fa-chevron-right text-2xl"></i>
              </button>
            </>
          )}

        </div>

        {/* THUMBNAIL STRIP - WRAPPING */}
        {category.items.length > 1 && (
          <div className="bg-zinc-800 border-t border-white/10 flex flex-wrap items-start px-6 py-6 gap-3 shrink-0">
            {category.items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMediaIndex(idx)}
                className={`relative w-36 aspect-video flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeMediaIndex === idx ? 'border-accent-orange opacity-100 ring-2 ring-accent-orange/30' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={item.thumb} alt="thumbnail" className="w-full h-full object-cover" />
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                     <i className="fa-solid fa-play text-white text-xs"></i>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>,
    document.body
  );
};


// --- COMPONENT: CATEGORY CARD ---
const CategoryCard: React.FC<{ item: PortfolioItem, onClick: () => void }> = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isTbc = item.type === 'tbc';

  useEffect(() => {
    if (item.type === 'video' && item.coverVideo && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, item]);

  return (
    <div 
      onClick={() => !isTbc && onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative w-full aspect-video overflow-hidden rounded-xl bg-zinc-200 shadow-md hover:shadow-2xl transition-all duration-500
        ${isTbc ? 'cursor-default opacity-80' : 'cursor-pointer hover:-translate-y-1'}
        ${item.className || ''}`}
    >
      {/* 1. Base Image (or Placeholder) */}
      {item.coverImage ? (
        <img 
          src={item.coverImage} 
          alt={item.title} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 ease-in-out"
        />
      ) : (
        <div className="w-full h-full bg-zinc-300 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
          <i className="fa-solid fa-image text-zinc-400 text-4xl"></i>
        </div>
      )}

      {/* 2. Video Overlay (On Hover) - Also applied grayscale transition just in case, though usually colorful */}
      {item.type === 'video' && item.coverVideo && (
        <video
          ref={videoRef}
          src={item.coverVideo}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isHovered ? 'opacity-100 grayscale-0' : 'opacity-0 grayscale'}`}
        />
      )}

      {/* 3. Overlay (Subtle tint only) */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>

      {/* 4. Text Content (Pill) - UPDATED POSITION & STYLE */}
      <h3 className="absolute bottom-3 left-3 z-20 bg-black/70 text-white group-hover:bg-accent-orange transition-colors duration-300 rounded-full px-4 py-1 text-[10px] font-medium uppercase tracking-wider shadow-lg whitespace-nowrap">
        {item.title}
      </h3>
    </div>
  );
};


// --- MAIN COMPONENT ---
const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { scale: 1.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
              end: "bottom 70%",
              scrub: 1
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Body Scroll Lock
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCategory]);

  return (
    // Updated padding: pt-16 pb-24 for mobile symmetry (matching header mb-16)
    <section id="portfolio" ref={containerRef} className="pt-16 pb-24 md:py-24 bg-off-white/90 relative z-10">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header: mb-16 on mobile to match pt-16 */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 ref={headingRef} className="text-4xl md:text-6xl font-display font-bold text-dark-gray mb-6 origin-center">
            Selected <span className="text-accent-orange">Work</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore diverse projects across animation, motion design, and event experiences.
          </p>
        </div>

        {/* CATEGORY GRID - BENTO LAYOUT */}
        {/* Using grid-cols-4 and aspect-video on cards to handle height naturally */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {PORTFOLIO_DATA.map((item) => (
            <CategoryCard 
              key={item.id} 
              item={item} 
              onClick={() => setSelectedCategory(item)} 
            />
          ))}
        </div>

      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-grid-pattern opacity-50 z-0 transform rotate-180 pointer-events-none"></div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedCategory && (
          <CategoryModal 
            category={selectedCategory} 
            onClose={() => setSelectedCategory(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;