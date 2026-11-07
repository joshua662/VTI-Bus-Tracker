import React from "react";

export interface RegistrationForm {
  first_name: string;
  middle_name?: string;
  last_name: string;
  gender: string;
  birth_date: string;
  email: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: RegistrationForm;
  setForm: React.Dispatch<React.SetStateAction<RegistrationForm>>;
  genders: { gender_id: number; gender: string }[];
  fieldErrors: Record<string, string[]>;
  loading: boolean;
  onRegister: () => void;
  captchaA: number;
  captchaB: number;
  captchaAnswer: string;
  setCaptchaAnswer: (val: string) => void;
  captchaError: string;
  refreshCaptcha: () => void;
  setCaptchaError: (val: string) => void;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  form,
  setForm,
  genders,
  fieldErrors,
  loading,
  onRegister,
  captchaA,
  captchaB,
  captchaAnswer,
  setCaptchaAnswer,
  captchaError,
  refreshCaptcha,
  setCaptchaError,
}: RegistrationModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaAnswer, 10) !== captchaA + captchaB) {
      setCaptchaError("Incorrect answer to security question.");
      return;
    }
    setCaptchaError("");
    onRegister();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">Admin Registration</h3>
            <p className="text-xs text-slate-400">Request administrative credentials</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1">First Name *</label>
              <input
                type="text"
                required
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1">Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-white/20 rounded-xl text-white focus:outline-none"
              >
                <option value="">Select Gender</option>
                {genders.map((g) => (
                  <option key={g.gender_id} value={g.gender}>
                    {g.gender}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Birth Date</label>
              <input
                type="date"
                value={form.birth_date}
                onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Captcha Verification */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-300">
                Security Check: <span className="font-mono font-bold text-violet-300">{captchaA} + {captchaB} = ?</span>
              </label>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="text-violet-400 hover:underline cursor-pointer"
              >
                Refresh
              </button>
            </div>
            <input
              type="number"
              required
              placeholder="Enter sum"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none font-mono"
            />
            {captchaError && (
              <p className="text-rose-400 mt-1">{captchaError}</p>
            )}
          </div>

          <div className="pt-3 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full bg-white/10 hover:bg-white/15 font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "Registering..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
