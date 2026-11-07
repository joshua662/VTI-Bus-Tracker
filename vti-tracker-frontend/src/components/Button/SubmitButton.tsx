import React from "react";

export default function SubmitButton({
  label,
  loading = false,
  loadingLabel = "Loading...",
  className = "",
  newClassName = "",
  disabled = false,
}) {
  const combinedClasses = newClassName || className || "w-full py-3 rounded-full bg-white text-slate-900 font-semibold";

  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={combinedClasses}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
          <span>{loadingLabel}</span>
        </span>
      ) : (
        label
      )}
    </button>
  );
}
