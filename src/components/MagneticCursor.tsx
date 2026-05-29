"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
    // mounted guard: prevent SSR/client mismatch that causes BAILOUT_TO_CLIENT_SIDE_RENDERING.
    // The cursor is client-only. We render null on SSR and show after mount.
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        setMounted(true);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - (isHovered ? 24 : 10));
            cursorY.set(e.clientY - (isHovered ? 24 : 10));
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, isHovered]);

    // Render nothing on SSR and before mount (avoids BAILOUT).
    // CSS class 'hidden md:block' already hides the cursor on mobile — no window.innerWidth needed.
    if (!mounted) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
            style={{
                x: smoothX,
                y: smoothY,
                width: isHovered ? 48 : 20,
                height: isHovered ? 48 : 20,
                backgroundColor: "white",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
    );
}
