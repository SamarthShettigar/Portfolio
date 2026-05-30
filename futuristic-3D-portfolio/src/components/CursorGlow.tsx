import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics settings for lag-following effect (very smooth!)
  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 1. Detect if mobile or touch device
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 900;
      setIsMobile(isTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    // 2. Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 3. Detect hovering over clickable/interactive elements
    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    const updateInteractiveListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, input, textarea, select, .cyber-btn, .cyber-card, [role="button"], [style*="cursor: pointer"]'
      );
      
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    // Initial query
    updateInteractiveListeners();

    // Set up a MutationObserver to listen to dynamic DOM changes (e.g. modals, chatbot appearing)
    const observer = new MutationObserver(updateInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Enable custom-cursor-active class to hide default cursor
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile, mouseX, mouseY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* A. Outer Ring - follows with spring lag */}
      <motion.div
        className={`cursor-ring ${isHovered ? 'hover' : ''}`}
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isHovered ? 1.25 : 1,
          rotate: isHovered ? 180 : 0
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 2, ease: "linear" },
          scale: { duration: 0.15 }
        }}
      />

      {/* B. Center Dot - follows mouse position exactly */}
      <motion.div
        className="cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};

export default CursorGlow;
