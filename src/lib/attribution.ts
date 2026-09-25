/**
 * Marketing Attribution & Campaign Source Utility
 * Tracks and normalizes registration sources (QR, Meta, WhatsApp, Direct, etc.)
 */

export function normalizeSource(rawSource?: string | null): string {
  if (!rawSource || typeof rawSource !== "string") return "Direct";
  const clean = rawSource.trim();
  if (!clean) return "Direct";

  const lower = clean.toLowerCase();

  // Direct / Unspecified
  if (
    lower === "direct" ||
    lower === "none" ||
    lower === "organic" ||
    lower === "other" ||
    lower === "online gateway" ||
    lower === "razorpay online gateway" ||
    lower === "unknown"
  ) {
    return "Direct";
  }

  // QR Code campaigns
  if (lower === "qr" || lower === "qrcode" || lower === "qr-code" || lower === "qr_code") {
    return "QR";
  }

  // Meta / Facebook / Instagram
  if (lower === "meta" || lower === "facebook" || lower === "fb" || lower === "meta-ads" || lower === "meta_ads") {
    return "Meta";
  }
  if (lower === "instagram" || lower === "ig") {
    return "Instagram";
  }

  // WhatsApp
  if (lower === "whatsapp" || lower === "wa") {
    return "WhatsApp";
  }

  // Google
  if (lower === "google" || lower === "gads" || lower === "google-ads") {
    return "Google";
  }

  // LinkedIn
  if (lower === "linkedin") {
    return "LinkedIn";
  }

  // YouTube
  if (lower === "youtube" || lower === "yt") {
    return "YouTube";
  }

  // Common print & offline marketing
  if (
    lower === "poster" ||
    lower === "brochure" ||
    lower === "banner" ||
    lower === "standee" ||
    lower === "pamphlet"
  ) {
    return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
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
 * Resolves the client-side acquisition source for a registration page.
 * Hierarchy:
 * 1. Current URL search params (?source=qr, etc.)
 * 2. Stored session from landing page visit
 * 3. Fallback: "Direct"
 */
export function resolveClientSource(storageKey: string): string {
  if (typeof window === "undefined") return "Direct";

  // 1. Current URL parameters
  const urlSource = extractSourceFromSearch(window.location.search);
  if (urlSource) {
    try {
      sessionStorage.setItem(storageKey, urlSource);
    } catch (_) {}
    return urlSource;
  }

  // 2. Previously stored in session during landing page visit
  try {
    const stored = sessionStorage.getItem(storageKey);
    if (stored && stored.trim()) {
      return normalizeSource(stored);
    }
  } catch (_) {}

  // 3. Fallback to Direct
  return "Direct";
}

/**
 * Stashes source into sessionStorage when visitor lands on an event page.
 */
export function syncLandingPageSource(storageKey: string): string {
  if (typeof window === "undefined") return "Direct";
  const urlSource = extractSourceFromSearch(window.location.search);
  if (urlSource) {
    try {
      sessionStorage.setItem(storageKey, urlSource);
    } catch (_) {}
    return urlSource;
  }
  try {
    const stored = sessionStorage.getItem(storageKey);
    if (stored && stored.trim()) {
      return normalizeSource(stored);
    }
  } catch (_) {}
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
    case "QR":
      return {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        dot: "bg-purple-500",
      };
    case "Meta":
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        dot: "bg-blue-500",
      };
    case "Instagram":
      return {
        bg: "bg-pink-50",
        text: "text-pink-700",
        border: "border-pink-200",
        dot: "bg-pink-500",
      };
    case "WhatsApp":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
      };
    case "Google":
      return {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        dot: "bg-rose-500",
      };
    case "Direct":
      return {
        bg: "bg-slate-100",
        text: "text-slate-700",
        border: "border-slate-200",
        dot: "bg-slate-400",
      };
    default:
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        dot: "bg-amber-500",
      };
  }
}
