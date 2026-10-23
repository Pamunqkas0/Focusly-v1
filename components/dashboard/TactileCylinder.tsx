'use client'

import React from 'react'

interface TactileCylinderProps {
  variant: 'red' | 'green' | 'orange' | 'slate' | 'teal'
  badgeText: string
  icon?: 'recycle' | 'check' | 'clock' | 'file'
}

export function TactileCylinder({ variant, badgeText, icon = 'recycle' }: TactileCylinderProps) {
  const configs = {
    red: {
      ambientGlow: 'rgba(239, 68, 68, 0.35)',
      bodyGradientStart: '#7f1d1d',
      bodyGradientMid: '#dc2626',
      bodyGradientEnd: '#450a0a',
      badgeBg: 'bg-white text-slate-950',
    },
    green: {
      ambientGlow: 'rgba(16, 185, 129, 0.35)',
      bodyGradientStart: '#064e3b',
      bodyGradientMid: '#059669',
      bodyGradientEnd: '#022c22',
      badgeBg: 'bg-white text-slate-950',
    },
    orange: {
      ambientGlow: 'rgba(249, 115, 22, 0.35)',
      bodyGradientStart: '#7c2d12',
      bodyGradientMid: '#ea580c',
      bodyGradientEnd: '#431407',
      badgeBg: 'bg-white text-slate-950',
    },
    slate: {
      ambientGlow: 'rgba(100, 116, 139, 0.25)',
      bodyGradientStart: '#334155',
      bodyGradientMid: '#475569',
      bodyGradientEnd: '#1e293b',
      badgeBg: 'bg-black/80 text-white border border-white/20',
    },
    teal: {
      ambientGlow: 'rgba(0, 245, 212, 0.35)',
      bodyGradientStart: '#134e4a',
      bodyGradientMid: '#0d9488',
      bodyGradientEnd: '#042f2e',
      badgeBg: 'bg-white text-slate-950',
    },
  }[variant]

  return (
    <div className="relative w-24 h-32 flex flex-col items-center justify-center my-1 select-none">
      {/* 1. Behind-drum Ambient Neon Glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: configs.ambientGlow,
          filter: 'blur(24px)',
          transform: 'scale(1.15)',
        }}
      />

      {/* 2. Drum SVG */}
      <svg
        viewBox="0 0 100 130"
        className="w-full h-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cylinder Body Shading */}
          <linearGradient id={`drum-body-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#080c10" />
            <stop offset="18%" stopColor={configs.bodyGradientEnd} />
            <stop offset="45%" stopColor={configs.bodyGradientMid} />
            <stop offset="70%" stopColor={configs.bodyGradientStart} />
            <stop offset="90%" stopColor="#05080c" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          {/* Cylinder Top Rim */}
          <linearGradient id={`drum-top-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2c3742" />
            <stop offset="50%" stopColor="#1a222a" />
            <stop offset="100%" stopColor="#0e1318" />
          </linearGradient>

          {/* Rim light highlight on left edge */}
          <linearGradient id="drum-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Cylinder Body */}
        <path
          d="M 16 22 L 16 108 C 16 118, 84 118, 84 108 L 84 22 Z"
          fill={`url(#drum-body-${variant})`}
        />

        {/* Bottom Curved Cap */}
        <ellipse cx="50" cy="108" rx="34" ry="10" fill={`url(#drum-body-${variant})`} />
        <ellipse cx="50" cy="108" rx="34" ry="10" stroke="rgba(0,0,0,0.6)" strokeWidth="1" />

        {/* Horizontal Ridges / Rings on Barrel (Tactile industrial ribs) */}
        <path
          d="M 16 52 C 16 60, 84 60, 84 52"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M 16 53 C 16 61, 84 61, 84 53"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          fill="none"
        />

        <path
          d="M 16 82 C 16 90, 84 90, 84 82"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M 16 83 C 16 91, 84 91, 84 83"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          fill="none"
        />

        {/* Top Rim & Lid */}
        <ellipse cx="50" cy="22" rx="34" ry="10" fill={`url(#drum-top-${variant})`} />
        <ellipse
          cx="50"
          cy="22"
          rx="34"
          ry="10"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.2"
        />
        <ellipse cx="50" cy="22" rx="28" ry="7.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />

        {/* Drum Bung / Cap on Top */}
        <circle cx="68" cy="20" r="3.5" fill="#3b4856" stroke="rgba(0,0,0,0.8)" strokeWidth="1" />

        {/* Center recycle/indicator watermark on drum */}
        {icon === 'recycle' && (
          <g transform="translate(42, 60) scale(0.65)" opacity="0.35" stroke="white" strokeWidth="2" fill="none">
            <path d="M7 11L12 2L17 11H7Z" />
            <path d="M4 17L12 22L20 17" />
          </g>
        )}
      </svg>

      {/* 3. Floating Status Pill Badge (Middle of drum) */}
      <div className="absolute top-[32%] z-10 flex items-center justify-center">
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-[0_4px_10px_rgba(0,0,0,0.6)] ${configs.badgeBg}`}
        >
          {badgeText}
        </span>
      </div>
    </div>
  )
}
