"use client";

import React, { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        // Reset e base
        all: 'unset',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        
        // Espaçamento
        padding: '14px 40px',
        
        // Visual
        background: '#ffffff',
        color: '#6F278B',
        border: 'none',
        borderRadius: '12px',
        
        // Tipografia
        fontSize: '16px',
        fontWeight: isMobile ? '500' : '400',
        fontFamily: 'Nugros, sans-serif',
        letterSpacing: '0.02em',
        lineHeight: '1',
        
        // Efeitos
        boxShadow: isHovered 
          ? '0 10px 30px rgba(0, 0, 0, 0.2)' 
          : 'none',
        transform: isHovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)',
        
        // Interação
        cursor: 'pointer',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        
        // Transição
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        
        // Override de estilos externos
        ...style,
      }}
    >
      {children}
    </button>
  );
};