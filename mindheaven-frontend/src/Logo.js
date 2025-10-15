import React from "react";

export default function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="mhg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8EC5FC" />
          <stop offset="100%" stopColor="#E0C3FC" />
        </linearGradient>
      </defs>
      <path
        fill="url(#mhg)"
        d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}
