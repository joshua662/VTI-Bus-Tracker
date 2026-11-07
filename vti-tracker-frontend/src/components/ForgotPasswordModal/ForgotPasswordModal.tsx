import React, { useState } from "react";

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="liquid-glass-card border border-white/20 bg-slate-950/70 p-6 max-w-sm w-full text-white shadow-2xl backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-center mb-1">Reset Password</h3>
        <p className="text-xs text-slate-300 text-center mb-5">
          Enter your registered admin email address to receive password recovery instructions.
        </p>

        {sent ? (
          <div className="text-center text-emerald-400 text-sm py-4">
            ✓ Reset link sent! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vti.edu"
                className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-violet-400"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold cursor-pointer"
              >
                Send Link
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
