import React from "react";

export default function ToastMessage({ isVisible, message, isFailed, onClose, overlay = false }) {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none`}>
      <div
        className={`pointer-events-auto flex items-center justify-between gap-3 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md border text-sm max-w-md w-full animate-bounce-short ${
          isFailed
            ? "bg-rose-950/90 border-rose-500/40 text-rose-100 shadow-rose-950/50"
            : "bg-emerald-950/90 border-emerald-500/40 text-emerald-100 shadow-emerald-950/50"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="font-semibold">{isFailed ? "✕" : "✓"}</span>
          <span>{message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-xs underline cursor-pointer"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
