/**
 * Marketing Attribution & Campaign Source Utility
 * Tracks and normalizes registration sources (QR, Meta, WhatsApp, Direct, etc.)
 */

export function normalizeSource(rawSource?: string | null): string {
  if (!rawSource || typeof rawSource !== "string") return "Direct";
  const clean = rawSource.trim();
  if (!clean) return "Direct";

  const lower = clean.toLowerCase();

  // 1. Direct / Google / Razorpay / Online Gateway / Organic as unified Direct
  if (
    lower === "direct" ||
    lower === "none" ||
    lower === "organic" ||
    lower === "other" ||
    lower === "unknown" ||
    lower === "google" ||
    lower === "gads" ||
    lower === "google-ads" ||
    lower === "google_ads" ||
    lower.includes("google") ||
    lower.includes("razorpay") ||
    lower.includes("gateway")
  ) {
    return "Direct";
  }

  // 2. Meta & Instagram combined as Meta
  if (
    lower === "meta" ||
    lower === "facebook" ||
    lower === "fb" ||
    lower === "instagram" ||
    lower === "insta" ||
    lower === "ig" ||
    lower.includes("meta") ||
    lower.includes("facebook") ||
    lower.includes("instagram") ||
    lower.includes("fb.me")
  ) {
    return "Meta";
  }

  // 3. QR Campaigns
  if (
    lower === "qr" ||
    lower === "qrcode" ||
    lower === "qr-code" ||
    lower === "qr_code" ||
    lower.startsWith("qr")
  ) {
    return "QR";
  }

  // 4. WhatsApp
  if (lower === "whatsapp" || lower === "wa" || lower.includes("whatsapp") || lower.includes("wa.me")) {
    return "WhatsApp";
  }

  // 5. LinkedIn
  if (lower === "linkedin" || lower === "li" || lower.includes("linkedin")) {
    return "LinkedIn";
  }

  // 6. YouTube
  if (lower === "youtube" || lower === "yt" || lower.includes("youtube") || lower.includes("youtu.be")) {
    return "YouTube";
  }

  // 7. Twitter / X
  if (lower === "twitter" || lower === "x" || lower === "t.co" || lower.includes("twitter")) {
    return "Twitter";
  }

  // 8. Offline & Print Media common factors (Posters, Brochures, Banners, Standees, Pamphlets, Flyers)
  if (
    lower === "poster" ||
    lower === "brochure" ||
    lower === "banner" ||
    lower === "standee" ||
    lower === "pamphlet" ||
    lower === "flyer" ||
    lower === "print" ||
    lower === "offline" ||
    lower.includes("poster") ||
    lower.includes("brochure") ||
    lower.includes("banner") ||
    lower.includes("standee") ||
    lower.includes("pamphlet")
  ) {
    return "Print / Offline";
  }

  // Clean custom campaign tags (e.g., "kiot_college" -> "Kiot College")
  return clean
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Extracts and normalizes the source parameter from a search query string.
 * Supports ?source=..., ?src=..., ?ref=..., ?utm_source=...
 */
export function extractSourceFromSearch(search?: string): string | null {
  if (!search) return null;
  try {
    const params = new URLSearchParams(search);
    const candidate =
      params.get("source") ||
      params.get("utm_source") ||
      params.get("src") ||
      params.get("ref") ||
      params.get("s");

    if (candidate && candidate.trim()) {
      return normalizeSource(candidate);
    }
  } catch {
    // Ignore invalid search strings
  }
  return null;
}

/**
 * Detects acquisition source from document.referrer when no URL parameter is provided.
 */
export function detectSourceFromReferrer(): string | null {
  if (typeof window === "undefined" || !document.referrer) return null;
  const ref = document.referrer.toLowerCase();

  // Ignore internal navigation within the hospital domain
  if (ref.includes("vallihospital.in") || ref.includes("localhost")) {
    return null;
  }

  if (
    ref.includes("instagram.com") ||
    ref.includes("facebook.com") ||
    ref.includes("fb.me") ||
    ref.includes("meta.com")
  ) {
    return "Meta";
  }
  if (
    ref.includes("google.com") ||
    ref.includes("google.") ||
    ref.includes("razorpay.com")
  ) {
    return "Direct";
  }
  if (ref.includes("whatsapp.com") || ref.includes("wa.me")) return "WhatsApp";
  if (ref.includes("youtube.com") || ref.includes("youtu.be")) return "YouTube";
  if (ref.includes("linkedin.com")) return "LinkedIn";
  if (ref.includes("t.co") || ref.includes("twitter.com") || ref.includes("x.com")) return "Twitter";

  return null;
}

/**
 * Resolves the client-side acquisition source for a registration page.
 * Hierarchy:
 * 1. Current URL search params (?source=qr, etc.)
 * 2. Stored session/local storage from landing page visit
 * 3. Document referrer (Instagram, Meta, WhatsApp, Google)
 * 4. Fallback: "Direct"
 */
export function resolveClientSource(storageKey: string): string {
  if (typeof window === "undefined") return "Direct";

  // 1. Current URL parameters
  const urlSource = extractSourceFromSearch(window.location.search);
  if (urlSource) {
    try {
      sessionStorage.setItem(storageKey, urlSource);
      localStorage.setItem(storageKey, urlSource);
    } catch (_) {}
    return urlSource;
  }

  // 2. Previously stored in session or local storage during landing page visit
  try {
    const sessionVal = sessionStorage.getItem(storageKey);
    if (sessionVal && sessionVal.trim()) {
      return normalizeSource(sessionVal);
    }
  } catch (_) {}

  try {
    const localVal = localStorage.getItem(storageKey);
    if (localVal && localVal.trim()) {
      return normalizeSource(localVal);
    }
  } catch (_) {}

  // 3. Document referrer detection
  const referrerSource = detectSourceFromReferrer();
  if (referrerSource) {
    try {
      sessionStorage.setItem(storageKey, referrerSource);
      localStorage.setItem(storageKey, referrerSource);
    } catch (_) {}
    return referrerSource;
  }

  // 4. Fallback to Direct
  return "Direct";
}

/**
 * Stashes source into storage when visitor lands on an event page (e.g. /ActiveSalem/).
 */
export function syncLandingPageSource(storageKey: string): string {
  if (typeof window === "undefined") return "Direct";

  const urlSource = extractSourceFromSearch(window.location.search);
  if (urlSource) {
    try {
      sessionStorage.setItem(storageKey, urlSource);
      localStorage.setItem(storageKey, urlSource);
    } catch (_) {}
    return urlSource;
  }

  try {
    const sessionVal = sessionStorage.getItem(storageKey);
    if (sessionVal && sessionVal.trim()) {
      return normalizeSource(sessionVal);
    }
  } catch (_) {}

  try {
    const localVal = localStorage.getItem(storageKey);
    if (localVal && localVal.trim()) {
      return normalizeSource(localVal);
    }
  } catch (_) {}

  const referrerSource = detectSourceFromReferrer();
  if (referrerSource) {
    try {
      sessionStorage.setItem(storageKey, referrerSource);
      localStorage.setItem(storageKey, referrerSource);
    } catch (_) {}
    return referrerSource;
  }

  return "Direct";
}

/**
 * Visual styling token for badges
 */
export function getSourceBadgeStyle(source: string): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  const norm = normalizeSource(source);
  switch (norm) {
    case "Meta":
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        dot: "bg-blue-500",
      };
    case "Direct":
      return {
        bg: "bg-slate-100",
        text: "text-slate-700",
        border: "border-slate-200",
        dot: "bg-slate-400",
      };
    case "QR":
      return {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        dot: "bg-purple-500",
      };
    case "WhatsApp":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
      };
    case "Print / Offline":
    case "Print":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        dot: "bg-amber-500",
      };
    case "YouTube":
      return {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        dot: "bg-red-500",
      };
    case "LinkedIn":
      return {
        bg: "bg-sky-50",
        text: "text-sky-700",
        border: "border-sky-200",
        dot: "bg-sky-500",
      };
    case "Twitter":
      return {
        bg: "bg-cyan-50",
        text: "text-cyan-700",
        border: "border-cyan-200",
        dot: "bg-cyan-500",
      };
    default:
      return {
        bg: "bg-teal-50",
        text: "text-teal-700",
        border: "border-teal-200",
        dot: "bg-teal-500",
      };
  }
}
