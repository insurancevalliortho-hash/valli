"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const MagneticCursor = dynamic(() => import("./MagneticCursor"), { ssr: false });
const PageTransitionLoader = dynamic(() => import("./PageTransitionLoader"), { ssr: false });

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SmoothScroll>
            <Suspense fallback={null}>
                <PageTransitionLoader />
            </Suspense>
            <MagneticCursor />
            {children}
        </SmoothScroll>
    );
}
