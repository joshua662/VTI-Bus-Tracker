import React from "react";

export default function Spinner({ size = "sm" }: { size?: "xs" | "sm" | "md" | "lg" }) {
  const sizeClass = {
    xs: "h-3.5 w-3.5 border-2",
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
  }[size] || "h-4 w-4 border-2";

  return (
    <div
      className={`inline-block animate-spin rounded-full border-current border-t-transparent ${sizeClass}`}
      role="status"
      aria-label="Loading"
    />
  );
}
