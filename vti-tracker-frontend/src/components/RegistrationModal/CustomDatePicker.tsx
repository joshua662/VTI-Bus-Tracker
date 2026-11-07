import React from "react";

interface CustomDatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  required,
  error,
}) => {
  const borderTone = error
    ? "border-red-400"
    : "border-white/20 focus-within:border-violet-400";

  return (
    <div className="mb-7">
      <label htmlFor={name} className="mb-2 block text-[13.5px] font-medium text-violet-200/80">
        {required && <span className="mr-1 text-red-400">*</span>}
        {label}
      </label>
      <div className={`flex items-end gap-2 border-b-2 pb-1 transition-colors ${borderTone}`}>
        <input
          id={name}
          name={name}
          type="date"
          value={value}
          onChange={onChange}
          required={required}
          className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[14.5px] text-white outline-none placeholder:text-white/30 [color-scheme:dark]"
        />
        <svg
          className="mb-1 h-[18px] w-[18px] shrink-0 text-violet-300/60"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 3v4M16 3v4M3 11h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
};
