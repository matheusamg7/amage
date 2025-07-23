"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  onClick,
  className = "",
  style = {},
}) => {
  return (
    <button
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden ${className}`}
      style={{
        background: '#ffffff',
        border: '1px solid rgba(21, 21, 21, 0.1)',
        padding: '14px 40px',
        fontSize: '1rem',
        fontWeight: '600',
        borderRadius: '12px',
        cursor: 'pointer',
        fontFamily: 'Nugros, sans-serif',
        letterSpacing: '0.02em',
        minWidth: '200px',
        transition: 'all 0.3s ease',
        ...style,
      }}
    >
      {/* Fundo roxo que cresce */}
      <div 
        className="absolute left-[10%] top-[40%] h-2 w-2 rounded-[12px] transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1]"
        style={{
          background: 'linear-gradient(135deg, #9F7AEA 0%, #B794F4 100%)',
          zIndex: 1
        }}
      />
      
      {/* Texto inicial */}
      <span 
        className="relative z-10 inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
        style={{ color: '#151515' }}
      >
        {children}
      </span>
      
      {/* Texto com seta no hover */}
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-x-[-100%] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        style={{ color: '#ffffff' }}
      >
        <span>{children}</span>
        <ArrowRight size={18} />
      </div>
    </button>
  );
};