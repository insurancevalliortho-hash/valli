"use client";

import dynamic from "next/dynamic";

// ssr:false MUST live inside a Client Component.
// This prevents BAILOUT_TO_CLIENT_SIDE_RENDERING caused by useSearchParams()
// in PageTransitionLoader. The transition is purely decorative — client-only is correct.
const PageTransitionLoader = dynamic(
    () => import("./PageTransitionLoader"),
    { ssr: false }
);

export default function ClientOnlyLoader() {
    return <PageTransitionLoader />;
}
