import React from "react";

export default function RegistrationSuccessModal({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="liquid-glass-card border border-white/20 bg-slate-950/70 p-6 max-w-sm w-full text-center text-white shadow-2xl backdrop-blur-xl">
        <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
          ✓
        </div>
        <h3 className="text-lg font-bold">Registration Complete</h3>
        <p className="text-xs text-slate-300 mt-2 mb-6">
          Your administrator credentials and access verification link have been dispatched.
        </p>
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors cursor-pointer"
        >
          Proceed to Login
        </button>
      </div>
    </div>
  );
}
