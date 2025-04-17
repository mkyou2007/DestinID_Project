import { gsap } from 'gsap';

export const pageEnterAnimation = (elements) => {
  const tl = gsap.timeline();
  
  tl.from("header", { 
    duration: 1, 
    y: -100, 
    opacity: 0, 
    ease: "bounce" 
  })
  .from("main", { 
    duration: 1.5, 
    opacity: 0 
  }, "-=0.5")
  .from("footer", { 
    duration: 1.5, 
    y: 100, 
    opacity: 0 
  }, "-=1");

  return tl;
}; 