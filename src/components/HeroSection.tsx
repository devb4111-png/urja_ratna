"use client";

import React from "react";

interface HeroSectionProps {
  onNominate: () => void;
  onExploreImpact: () => void;
}

export default function HeroSection({
  onNominate,
  onExploreImpact,
}: HeroSectionProps) {
  return (
    <section className="hero-section" id="impact">
      <div className="container hero-grid">
        {/* Left Content */}
        <div className="hero-content">
          <span className="section-label">IMPACT & RECOGNITION</span>
          <h1 className="hero-title">Urja Ratna Award</h1>
          <h2 className="hero-subtitle">
            Recognising Those Powering India&apos;s Green-Energy Transition.
          </h2>
          <p className="hero-desc">
            From individuals and organisations to communities and solar-industry entrepreneurs, Urja Ratna celebrates
            meaningful contributions advancing solar energy and India&apos;s wider green-energy transition.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              id="heroNominateBtn"
              onClick={onNominate}
            >
              <span>Nominate for Urja Ratna</span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button
              type="button"
              className="btn-secondary"
              id="exploreImpactBtn"
              onClick={onExploreImpact}
            >
              Explore Recognised Impact
            </button>
          </div>
        </div>

        {/* Right Visual: Trophy Cutout & Stat badge at right top */}
        <div className="hero-visual">
          <div className="trophy-wrapper">
            <img
              src="/assets/images/trophy-cutout.png"
              alt="Urja Ratna Award Golden Trophy Cutout"
              className="trophy-image"
            />
            {/* Floating Counter Badge at Right Top of Award Cutout */}
            <div className="stat-badge-float">
              <div className="stat-icon-circle">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <div>
                <span className="stat-number">14</span>
                <span className="stat-label">
                  Urja Ratna Awards
                  <br />
                  Presented
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
