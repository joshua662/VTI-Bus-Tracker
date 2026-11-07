import React from "react";
import loginBg from "../../assets/login-scene.jpg";

export default function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBg})`, filter: "blur(1.5px)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#140c28]/28" aria-hidden />

      <div className="relative z-10 w-full max-w-[420px] rounded-[30px] border border-white/15 bg-[#312848]/60 px-8 pt-9 pb-8 shadow-[0_28px_80px_rgba(6,3,20,0.5)] backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
}
