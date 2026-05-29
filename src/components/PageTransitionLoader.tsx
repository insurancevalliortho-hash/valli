"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// This component is loaded with ssr:false via ClientOnlyLoader.
// It NEVER runs on the server, so useSearchParams() is safe without any Suspense wrapper.
export default function PageTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);
  const lastPathname = useRef(pathname);
  const lastSearchParams = useRef(searchParams);

  // Manage the global page content push-back styling
  useEffect(() => {
    const wrapper = document.getElementById("page-content-wrapper");
    if (wrapper) {
      if (isNavigating) {
        wrapper.classList.add("transitioning");
      } else {
        wrapper.classList.remove("transitioning");
      }
    }
    return () => {
      const activeWrapper = document.getElementById("page-content-wrapper");
      if (activeWrapper && !isNavigating) {
        activeWrapper.classList.remove("transitioning");
      }
    };
  }, [isNavigating]);

  // Trigger ending the navigation once the pathname or search parameters change
  useEffect(() => {
    const hasPathChanged =
      pathname !== lastPathname.current ||
      searchParams.toString() !== lastSearchParams.current.toString();

    if (hasPathChanged) {
      lastPathname.current = pathname;
      lastSearchParams.current = searchParams;

      if (isNavigating) {
        const timer = setTimeout(() => {
          setIsNavigating(false);
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, searchParams, isNavigating]);

  // Intercept standard clicks on internal routes to start the loader immediately
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");
        const targetAttr = anchor.getAttribute("target");

        if (
          href &&
          href.startsWith("/") &&
          !href.startsWith("/#") &&
          targetAttr !== "_blank" &&
          e.button === 0 &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.shiftKey &&
          !e.altKey
        ) {
          try {
            const targetUrl = new URL(href, window.location.origin);
            if (
              window.location.pathname === targetUrl.pathname &&
              window.location.search === targetUrl.search
            ) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            setIsNavigating(true);
            setTimeout(() => {
              router.push(href);
            }, 750);
          } catch (err) {
            if (window.location.pathname === href) return;
            e.preventDefault();
            setIsNavigating(true);
            setTimeout(() => {
              router.push(href);
            }, 750);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, [router]);

  const pillars = [
    { left: "0%", bg: "bg-[#004b57]/80 backdrop-blur-md border-r border-white/5" },
    { left: "20%", bg: "bg-[#E0F2F1]/80 backdrop-blur-md border-r border-white/5" },
    { left: "40%", bg: "bg-[#f98825]/90 backdrop-blur-lg border-r border-white/5" },
    { left: "60%", bg: "bg-[#121c1e]/85 backdrop-blur-xl border-r border-white/5" },
    { left: "80%", bg: "bg-white/70 backdrop-blur-md" },
  ];

  const premiumEase = [0.85, 0, 0.15, 1] as [number, number, number, number];

  const pillarVariants = {
    initial: { y: "100%" },
    animate: (i: number) => ({
      y: "0%",
      transition: { duration: 0.55, ease: premiumEase, delay: i * 0.05 },
    }),
    exit: (i: number) => ({
      y: "-100%",
      transition: { duration: 0.55, ease: premiumEase, delay: (4 - i) * 0.05 },
    }),
  };

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={pillarVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`absolute top-0 w-[20%] h-full will-change-transform ${pillar.bg}`}
              style={{ left: pillar.left, zIndex: 9990 + i }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
