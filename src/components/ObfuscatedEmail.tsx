"use client";

import React, { useSyncExternalStore } from "react";

interface ObfuscatedEmailProps {
  className?: string;
  domain?: string;
  children?: React.ReactNode;
}

const emptySubscribe = () => () => {};

export default function ObfuscatedEmail({ className = "", domain = "in", children }: ObfuscatedEmailProps) {
  // Returns true on the client, false on the server (SSR/Hydration safe)
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const email = isClient ? `info@vallihospital.${domain}` : "";

  if (!email) {
    // Semantic placeholder that looks clean during SSR
    return (
      <span className={className}>
        {children || "info..."}
      </span>
    );
  }

  return (
    <a 
      href={`mailto:${email}`} 
      className={className}
    >
      {children || email}
    </a>
  );
}
