"use client";

import React, { useState, useEffect } from "react";

interface ObfuscatedEmailProps {
  className?: string;
  domain?: string;
  children?: React.ReactNode;
}

export default function ObfuscatedEmail({ className = "", domain = "in", children }: ObfuscatedEmailProps) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Dynamically assemble to prevent standard scraper bots from finding it in static HTML
    const user = "info";
    const host = `vallihospital.${domain}`;
    setEmail(`${user}@${host}`);
  }, [domain]);

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
