/**
 * Luxury Motion Presets
 * 
 * These constants define a consistent animation language for the site.
 * We use high-end easing and deliberate durations to achieve a premium, 
 * "weighty" feel that avoids the robotic look of default transitions.
 */

// Custom ease that feels more "hand-crafted" (slow start, long smooth finish)
export const LUXURY_EASE = [0.19, 1, 0.22, 1] as const;

export const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 10 }, // Reduced Y distance for more subtlety
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4, // Slightly longer duration for a "graceful" feel
      ease: LUXURY_EASE,
    },
  },
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Tighter stagger for a more unified sequence
      delayChildren: 0.1,
    },
  },
};

export const SCALE_UP_VARIANTS = {
  hidden: { opacity: 0, scale: 0.99 }, // Very subtle scale
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.8,
      ease: LUXURY_EASE,
    },
  },
};

/**
 * Blur Reveal
 * Creates a "misty" reveal effect that feels very high-end
 */
export const BLUR_REVEAL_VARIANTS = {
  hidden: { opacity: 0, filter: "blur(10px)", scale: 1.02 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.6,
      ease: LUXURY_EASE,
    },
  },
};

export const REVEAL_VARIANTS = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 1.5,
      ease: LUXURY_EASE,
    },
  },
};
