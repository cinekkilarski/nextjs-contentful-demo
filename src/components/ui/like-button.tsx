"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);

  // Function to generate confetti
  const createConfetti = () => {
    if (!confettiRef.current) return;

    const container = confettiRef.current;
    const colors = [
      "#ff0a54",
      "#ff477e",
      "#ff7096",
      "#ff85a1",
      "#fbb1bd",
      "#f9bec7",
    ];

    // Create 50 confetti elements
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "absolute w-2 h-2 rounded-full opacity-70";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.transform = `scale(${Math.random() * 0.8 + 0.2})`;

      container.appendChild(confetti);

      // Check if animate method is available (not available in test environment)
      if (typeof confetti.animate === "function") {
        // Animate each confetti
        const animation = confetti.animate(
          [
            { transform: "translate(0, 0) rotate(0deg)", opacity: 0.7 },
            {
              transform: `translate(${Math.random() * 200 - 100}px, ${
                Math.random() * -250 - 50
              }px) rotate(${Math.random() * 360}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 1500,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            fill: "forwards",
          }
        );

        // Remove the element after animation completes
        animation.onfinish = () => {
          confetti.remove();
        };
      } else {
        // Fallback for environments without Web Animations API (like test environment)
        setTimeout(() => {
          confetti.remove();
        }, 1500);
      }
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
    setIsAnimating(true);
    createConfetti();

    // Stop animation after 1 second
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // Message text matching test expectations
  const getThankYouMessage = (count: number) => {
    return count === 1
      ? "Thanks for the 1 like!"
      : `Thanks for the ${count} likes!`;
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="relative">
        <div
          ref={confettiRef}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ zIndex: 10 }}
        />

        <motion.button
          onClick={handleLike}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="relative overflow-hidden rounded-full px-6 py-3 font-medium 
                    bg-gradient-to-r from-pink-500 to-rose-500 
                    dark:from-pink-600 dark:to-rose-600
                    text-white shadow-md hover:shadow-lg transition-all duration-300"
          aria-label={`Like this post (currently ${likes} likes)`}
          data-testid="like-button"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 
                      dark:from-pink-500 dark:to-rose-500 opacity-0"
            animate={isAnimating ? { opacity: [0, 0.5, 0] } : {}}
            transition={{ duration: 0.8 }}
          />

          <div className="relative flex items-center justify-center space-x-2">
            <motion.span
              animate={
                isAnimating
                  ? {
                      scale: [1, 1.8, 1],
                      rotate: [0, 15, -15, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-xl"
              aria-hidden="true"
            >
              ❤️
            </motion.span>
            <span className="font-semibold">Like ({likes})</span>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {likes > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm text-gray-600 dark:text-gray-400"
            aria-live="polite"
          >
            {getThankYouMessage(likes)}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
