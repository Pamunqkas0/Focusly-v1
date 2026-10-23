'use client'

import React from 'react'

export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none bg-[#090e14]"
    >
      {/* 1. Base dark moody gradient canvas */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 85% 10%, rgba(130, 165, 185, 0.28) 0%, rgba(65, 95, 115, 0.16) 35%, rgba(15, 26, 36, 0.8) 70%, #090e14 100%),
            radial-gradient(ellipse 70% 50% at 15% 15%, rgba(0, 180, 160, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 100% 70% at 50% 100%, rgba(18, 30, 42, 0.9) 0%, #080d12 100%)
          `,
        }}
      />

      {/* 2. Top-Right Daylight/Overcast Sunlight Glow (Matches Image 2 top right sky) */}
      <div
        className="absolute -top-[10%] -right-[5%] w-[65vw] h-[55vh] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 198, 218, 0.32) 0%, rgba(110, 145, 170, 0.18) 40%, rgba(30, 52, 70, 0.05) 75%, transparent 100%)',
          filter: 'blur(70px)',
        }}
      />

      {/* 3. Mid-Right Cool Silvery Atmospheric Cloud Streak */}
      <div
        className="absolute top-[18%] right-[8%] w-[45vw] h-[30vh] rounded-[100%]"
        style={{
          background: 'linear-gradient(135deg, rgba(145, 175, 195, 0.22) 0%, rgba(80, 110, 130, 0.12) 50%, transparent 80%)',
          filter: 'blur(50px)',
          transform: 'rotate(-8deg)',
        }}
      />

      {/* 4. Bottom Right Water / Wet Surface Reflection Streaks (Matches Image 2 bottom-right) */}
      <div
        className="absolute bottom-[4%] right-[2%] w-[55vw] h-[38vh] rounded-[100%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(115, 150, 172, 0.18) 0%, rgba(55, 82, 102, 0.12) 45%, rgba(12, 22, 32, 0) 80%)',
          filter: 'blur(45px)',
          transform: 'rotate(-4deg)',
        }}
      />
      <div
        className="absolute -bottom-[10%] right-[15%] w-[40vw] h-[25vh] rounded-[100%]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(150, 185, 205, 0.15) 50%, transparent 100%)',
          filter: 'blur(35px)',
        }}
      />

      {/* 5. Left Rail Soft Teal / Mint Reflection (Matches brand icon & rail glow) */}
      <div
        className="absolute top-[25%] -left-[10%] w-[35vw] h-[50vh] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.08) 0%, rgba(6, 182, 212, 0.04) 50%, transparent 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* 6. Subtle Vignette Shadow to Frame the Screen */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(5, 8, 12, 0.6) 100%)',
        }}
      />

      {/* 7. Subtle Grain/Mesh Texture for cinematic tactile feel */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
