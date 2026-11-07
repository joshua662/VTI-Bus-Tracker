import React, { useState } from "react";

interface AuthFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
  required?: boolean;
  autoFocus?: boolean;
  passwordToggle?: boolean;
}

export default function AuthField({
  label,
  name,
  type = "text",
  value,
  onChange,
  errors = [],
  required = false,
  autoFocus = false,
  passwordToggle = false,
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = passwordToggle ? (showPassword ? "text" : "password") : type;
  const invalid = errors.length > 0;

  return (
    <div className="mb-4 text-left">
      <label htmlFor={name} className="mb-1.5 block text-[13px] font-normal text-white/75">
        {label}
        {required && <span className="text-white/80"> *</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          required={required}
          autoFocus={autoFocus}
          className={`h-12 w-full rounded-xl border bg-[#241c3d]/80 px-4 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition ${
            passwordToggle ? "pr-11" : ""
          } ${
            invalid
              ? "border-rose-400/80"
              : "border-white/10 focus:border-white/30"
          }`}
        />
        {passwordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-white/55 transition hover:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.09A10.4 10.4 0 0112 4.8c4.48 0 8.27 2.94 9.54 7a10.7 10.7 0 01-4.13 5.41M6.11 6.11A10.8 10.8 0 002.46 11.8 10.7 10.7 0 007.2 17.2" />
              </svg>
            ) : (
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.46 12C3.73 7.94 7.52 5 12 5s8.27 2.94 9.54 7c-1.27 4.06-5.06 7-9.54 7s-8.27-2.94-9.54-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {invalid && <p className="mt-1 text-[11px] text-rose-300">{errors.join(" ")}</p>}
    </div>
  );
}
