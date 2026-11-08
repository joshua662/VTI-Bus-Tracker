import React from "react";

interface ForgotPasswordSuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
}

export default function ForgotPasswordSuccessModal({
  isVisible,
  onClose,
  email,
}: ForgotPasswordSuccessModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="liquid-glass-card border border-white/20 bg-slate-950/80 p-7 max-w-sm w-full text-center text-white shadow-2xl backdrop-blur-xl rounded-3xl">
        <div className="w-14 h-14 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold tracking-tight">Check your email</h3>
        <p className="text-xs text-slate-300 mt-2 mb-1 leading-relaxed">
          We have sent password recovery instructions to:
        </p>
        <p className="text-sm font-semibold text-violet-300 mb-6 truncate px-2">
          {email || "your email address"}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-full bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/40 cursor-pointer"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
