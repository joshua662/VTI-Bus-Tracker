import React from "react";
import loginBg from "../../assets/login-scene.jpg";

export default function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-8">
      {/* SVG Distortion Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur
              in="noise"
              stdDeviation="2"
              result="blurred"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="150"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <img src={loginBg} alt="" className="login-scene-fill pointer-events-none" aria-hidden />
      <img src={loginBg} alt="" className="login-scene-photo pointer-events-none" aria-hidden />
      <div className="pointer-events-none fixed inset-0 bg-[#140c28]/20" aria-hidden />

      <div className="liquid-glass-card relative z-10 w-full max-w-[420px] px-8 pt-9 pb-8">
        <div className="relative z-10 [text-shadow:0_1px_3px_rgba(0,0,0,0.2)]">
          {children}
        </div>
      </div>
    </div>
  );
}
