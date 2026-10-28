"use client";

import React from "react";

export interface Awardee {
  title: string;
  location: string;
  meta: string;
  metaIconType: "bolt" | "shield";
  image: string;
}

const AWARDEES: Awardee[] = [
  {
    title: "Powering Care Healthcare Solarisation",
    location: "Prayagraj, Uttar Pradesh",
    meta: "150 kW (off-grid)",
    metaIconType: "bolt",
    image: "/assets/images/healthcare-solar.jpg",
  },
  {
    title: "Indian Oil Corporation Limited (IOCL)",
    location: "Pan India",
    meta: "Commercial & Industrial Solarisation",
    metaIconType: "shield",
    image: "/assets/images/iocl-solar.jpg",
  },
  {
    title: "Dev Foundation",
    location: "Rural & semi-urban India",
    meta: "Verified award record",
    metaIconType: "shield",
    image: "/assets/images/dev-foundation.jpg",
  },
  {
    title: "Jeevan Dhara Welfare",
    location: "Rural India",
    meta: "Verified award record",
    metaIconType: "shield",
    image: "/assets/images/jeevan-dhara.jpg",
  },
];

interface RecognisedImpactSectionProps {
  onOpenAwardee: (awardee: Awardee) => void;
  onExploreStories: () => void;
}

export default function RecognisedImpactSection({
  onOpenAwardee,
  onExploreStories,
}: RecognisedImpactSectionProps) {
  return (
    <section className="recognised-impact-section" id="recognisedImpactSection">
      <div className="container">
        {/* Header row */}
        <div className="recognised-header-row reveal-on-scroll">
          <div>
            <span className="section-label">RECOGNISED IMPACT</span>
            <h2 className="section-title">Recognition Backed by Real-World Action.</h2>
            <p className="hero-desc" style={{ marginBottom: 0 }}>
              Showcase verified awardees and the work associated with their recognition.
            </p>
          </div>
          <button
            type="button"
            className="btn-outline-green"
            id="exploreStoriesBtn"
            onClick={onExploreStories}
          >
            <span>Explore the Stories Behind the Impact</span>
            <svg
              width="15"
              height="15"
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
        </div>

        {/* 4 Verified Awardee Cards Grid */}
        <div className="awardees-grid">
          {AWARDEES.map((awardee, idx) => (
            <div
              key={awardee.title}
              className={`awardee-card reveal-on-scroll delay-${idx + 1}`}
              onClick={() => onOpenAwardee(awardee)}
            >
              <div className="awardee-thumb-wrap">
                <img
                  src={awardee.image}
                  alt={awardee.title}
                  className="awardee-thumb-img"
                />
              </div>
              <div className="awardee-body">
                <h3 className="awardee-title">{awardee.title}</h3>
                <div className="awardee-meta-line">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{awardee.location}</span>
                </div>
                <div className="awardee-meta-line">
                  {awardee.metaIconType === "bolt" ? (
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                  ) : (
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  )}
                  <span>{awardee.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
