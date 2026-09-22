import React from 'react';

export const RevQRIcon = ({ size = 24, className = '', style = {} }: { size?: number, className?: string, style?: React.CSSProperties }) => (
  <img
    src="/revqr-logo.png"
    alt="RevQR Logo"
    width={size}
    height={size}
    className={className}
    style={{ ...style, objectFit: 'contain' }}
  />
);

export default RevQRIcon;
