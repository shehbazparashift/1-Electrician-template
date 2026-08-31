"use client";

import React from "react";
import { motion } from "framer-motion";

export function LogisticsNetworkIllustration() {
  return (
    <div className="relative aspect-[1/0.94] border border-[var(--m-border)] rounded-[var(--radius-lg)] bg-[linear-gradient(158deg,var(--m-accent-weak)_0%,#fff_58%)] overflow-hidden shadow-[var(--m-shadow-sm)]">
      <svg
        viewBox="0 0 600 520"
        role="img"
        aria-label="Illustration of Meridian's integrated logistics network"
        className="w-full h-full block"
      >
        <defs>
          <pattern
            id="illusDots"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.4" cy="1.4" r="1.4" fill="var(--m-accent)" opacity="0.10" />
          </pattern>
        </defs>
        <rect width="600" height="520" fill="url(#illusDots)" />

        {/* global reach arcs around the hub */}
        <g className="fill-none stroke-[var(--m-accent-300,var(--m-accent-bright))] stroke-[1px] opacity-25">
          <circle cx="300" cy="260" r="96" />
          <circle cx="300" cy="260" r="138" />
          <circle cx="300" cy="260" r="182" />
        </g>

        {/* routes from each mode node to the central hub */}
        <g className="fill-none stroke-[var(--m-accent)] stroke-[1.4px] opacity-50 stroke-dasharray-[3_7]">
          <motion.path
            d="M138 124 Q205 215 300 260"
            animate={{ strokeDashoffset: [-300, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M458 144 Q398 215 300 260"
            animate={{ strokeDashoffset: [-300, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M458 416 Q398 320 300 260"
            animate={{ strokeDashoffset: [-300, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M138 416 Q208 326 300 260"
            animate={{ strokeDashoffset: [-300, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          />
        </g>

        {/* central control-tower hub */}
        <g>
          <motion.circle
            cx="300"
            cy="260"
            r="52"
            fill="none"
            stroke="var(--m-accent)"
            strokeWidth="1.4"
            animate={{ r: [52, 74], opacity: [0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            style={{ originX: "300px", originY: "260px" }}
          />
          <rect
            x="252"
            y="212"
            width="96"
            height="96"
            rx="18"
            fill="#fff"
            stroke="var(--m-accent)"
            strokeWidth="1.6"
          />
          <g
            stroke="var(--m-accent)"
            strokeWidth="2.4"
            transform="translate(272 232)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="1.4" y="1.4" width="55" height="55" rx="6" strokeWidth="1.6" />
            <path d="M13 41V18l15 13 15-13v23" />
          </g>
        </g>

        {/* mode nodes */}
        {/* AIR */}
        <g className="illus-node">
          <rect
            x="110"
            y="96"
            width="56"
            height="56"
            rx="13"
            fill="#fff"
            stroke="var(--m-accent-200)"
            strokeWidth="1.4"
          />
          <g
            transform="translate(126 112)"
            fill="none"
            stroke="var(--m-accent)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.9.3l-1.1 1.1a1 1 0 0 0 .3 1.6L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 2.3 5.8a1 1 0 0 0 1.6.3l1.1-1.1a1 1 0 0 0 .3-.9Z" />
          </g>
          <text
            x="138"
            y="172"
            textAnchor="middle"
            fill="var(--m-fg-subtle)"
            style={{ font: "700 10px/1 var(--m-font-sans)", letterSpacing: ".1em", textTransform: "uppercase" }}
          >
            Air
          </text>
        </g>
        {/* OCEAN */}
        <g className="illus-node">
          <rect
            x="430"
            y="116"
            width="56"
            height="56"
            rx="13"
            fill="#fff"
            stroke="var(--m-accent-200)"
            strokeWidth="1.4"
          />
          <g
            transform="translate(446 132)"
            fill="none"
            stroke="var(--m-accent)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1" />
            <path d="M19 14 12 3 5 14" />
            <path d="M12 3v18" />
            <path d="M5 14l7 2 7-2" />
          </g>
          <text
            x="458"
            y="192"
            textAnchor="middle"
            fill="var(--m-fg-subtle)"
            style={{ font: "700 10px/1 var(--m-font-sans)", letterSpacing: ".1em", textTransform: "uppercase" }}
          >
            Ocean
          </text>
        </g>
        {/* ROAD */}
        <g className="illus-node">
          <rect
            x="430"
            y="388"
            width="56"
            height="56"
            rx="13"
            fill="#fff"
            stroke="var(--m-accent-200)"
            strokeWidth="1.4"
          />
          <g
            transform="translate(446 404)"
            fill="none"
            stroke="var(--m-accent)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 17h4V5H2v12h3" />
            <path d="M14 9h4l3 3v5h-3" />
            <circle cx="7.5" cy="17.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
          </g>
          <text
            x="458"
            y="464"
            textAnchor="middle"
            fill="var(--m-fg-subtle)"
            style={{ font: "700 10px/1 var(--m-font-sans)", letterSpacing: ".1em", textTransform: "uppercase" }}
          >
            Road
          </text>
        </g>
        {/* WAREHOUSE */}
        <g className="illus-node">
          <rect
            x="110"
            y="388"
            width="56"
            height="56"
            rx="13"
            fill="#fff"
            stroke="var(--m-accent-200)"
            strokeWidth="1.4"
          />
          <g
            transform="translate(126 404)"
            fill="none"
            stroke="var(--m-accent)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35" />
            <path d="M2 8.35 12 2l10 6.35" />
            <path d="M6 22V12h12v10" />
          </g>
          <text
            x="138"
            y="464"
            textAnchor="middle"
            fill="var(--m-fg-subtle)"
            style={{ font: "700 10px/1 var(--m-font-sans)", letterSpacing: ".1em", textTransform: "uppercase" }}
          >
            Warehouse
          </text>
        </g>
      </svg>

      {/* Chips */}
      <span className="absolute top-[7%] left-[6%] bg-white border border-[var(--m-border)] rounded-full shadow-[var(--m-shadow-md)] px-[14px] py-[8px] inline-flex items-center gap-[9px] text-[var(--m-text-sm)] font-medium text-[var(--m-ink)] whitespace-nowrap">
        <span className="w-[8px] h-[8px] rounded-full bg-[var(--m-accent)] shadow-[0_0_0_4px_var(--m-accent-weak)]" />
        24/7 control tower
      </span>
      <span className="absolute bottom-[8%] right-[6%] bg-white border border-[var(--m-border)] rounded-full shadow-[var(--m-shadow-md)] px-[14px] py-[8px] inline-flex items-center gap-[9px] text-[var(--m-text-sm)] font-medium text-[var(--m-ink)] whitespace-nowrap">
        <span className="w-[8px] h-[8px] rounded-full bg-[var(--m-accent)] shadow-[0_0_0_4px_var(--m-accent-weak)]" />
        End-to-end visibility
      </span>
    </div>
  );
}
