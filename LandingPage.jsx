/**
 * LandingPage.jsx
 *
 * Requirements:
 *   - React 18+
 *   - Tailwind CSS v3+ (arbitrary values enabled)
 *   - Google Fonts: Inter (add to index.html or import in CSS)
 *     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
 */

import React from 'react';

/* ─── data ──────────────────────────────────────────────────────────── */

const PANELS = [
  {
    heading: 'Living',
    body: 'Thoughtfully designed rooms and shared spaces that feel like home from day one. Private, semi-private, or communal — you choose the vibe.',
  },
  {
    heading: 'Working',
    body: 'High-speed internet, quiet study zones, co-working lounges, and meeting pods. Every corner is optimised for your best focus.',
  },
  {
    heading: 'Growing',
    body: 'Events, workshops, mentors, and a community that actually shows up for each other. This is where you level up — personally and professionally.',
  },
];

/*
 * HEADING_SIZE drives the "Co—Living / Co—Working / Co—Growing" illusion.
 *
 * Both the sticky "Co—" (left) and each panel heading (right) must share
 * the exact same font-size, font-weight, line-height, and top padding so
 * that when a panel scrolls to the top of the viewport the two words sit
 * on precisely the same baseline.
 *
 * clamp(3.5rem, 7vw, 8.5rem) keeps the text legible at every desktop
 * breakpoint without ever overflowing its half-screen column.
 */
const HEADING_STYLE = {
  fontSize: 'clamp(3.5rem, 7vw, 8.5rem)',
  lineHeight: 1,
  margin: 0,            // kill any browser default <h2> margin
};

/* ─── component ─────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    /*
     * font-[Inter,sans-serif] – falls back gracefully if Inter is not loaded.
     * antialiased           – subpixel smoothing for the heavy weights.
     */
    <main className="font-[Inter,sans-serif] antialiased bg-black">

      {/* ════════════════════════════════════════════════════
          HERO SECTION
          – Full viewport, dark image, two-column copy layout.
          – Scrolls normally; the sticky section reveals beneath it.
          ════════════════════════════════════════════════════ */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1600&auto=format&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Copy — two columns, vertically centred */}
        <div className="relative z-10 grid h-full grid-cols-2 items-center gap-16 px-12">

          {/* Left: brand headline */}
          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-none tracking-tight text-white">
            Uniliving.<br />Offbeat.
          </h1>

          {/* Right: supporting copy */}
          <p className="max-w-md text-[1.15rem] leading-relaxed text-white/75">
            A community built for students who refuse to just get by.
            Find your people, your space, and your rhythm — all in one place.
          </p>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          STICKY SCROLL SECTION  (300 vh total)
          – Two-column CSS grid.
          – LEFT:  sticky — pinned to viewport for the entire scroll journey.
          – RIGHT: three h-screen panels that scroll past the sticky left.
          ════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-2 bg-[#dbff00]">

        {/* ── LEFT COLUMN  ─────────────────────────────────
            sticky top-0 h-screen  → pinned while right column scrolls.
            flex-col justify-between → "Co—" at top, image at bottom.
            p-12 → 48 px padding on all sides (matches panel padding exactly).
            ─────────────────────────────────────────────── */}
        <div className="sticky top-0 flex h-screen flex-col justify-between p-12">

          {/* "Co—" — must match panel headings perfectly */}
          <h2
            className="font-black tracking-tight text-black"
            style={HEADING_STYLE}
          >
            Co—
          </h2>

          {/* Placeholder image pinned to bottom-left */}
          <div
            className="w-full overflow-hidden rounded-2xl"
            style={{ height: '36%' }}
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&q=80"
              alt="Students relaxing in a shared living room"
              className="h-full w-full object-cover"
            />
          </div>

        </div>


        {/* ── RIGHT COLUMN  ────────────────────────────────
            Three stacked panels, each exactly h-screen (100 vh).
            Total height = 300 vh → the sticky left stays pinned the
            entire time the user scrolls through all three panels.

            ALIGNMENT KEY:
              Each panel uses p-12 (48 px) — identical to the left column.
              The heading is the first child (justify-start), so it sits at
              panel_top + 48 px.  When a panel reaches the viewport top, that
              equals viewport_top + 48 px — exactly where "Co—" sits.
            ─────────────────────────────────────────────── */}
        <div>
          {PANELS.map(({ heading, body }) => (
            <div
              key={heading}
              className="flex h-screen flex-col justify-start p-12"
            >
              {/* Panel heading — font identical to "Co—" */}
              <h2
                className="font-black tracking-tight text-black"
                style={HEADING_STYLE}
              >
                {heading}
              </h2>

              {/* Paragraph copy */}
              <p className="mt-8 max-w-sm text-[1.05rem] leading-relaxed text-black/65">
                {body}
              </p>
            </div>
          ))}
        </div>

      </section>

    </main>
  );
}
