"use client";

import React from "react";

interface WiderMissionSectionProps {
  onNominate: () => void;
  onDiscoverNexa: () => void;
}

export default function WiderMissionSection({
  onNominate,
  onDiscoverNexa,
}: WiderMissionSectionProps) {
  return (
    <section className="wider-mission-section reveal-on-scroll">
      <div className="container mission-grid">
        <div className="mission-left">
          <span className="mission-tag">THE WIDER MISSION</span>
          <h2 className="mission-title">
            Recognition is a Milestone.
            <br />
            Impact is the Mission.
          </h2>
          <div className="mission-desc">
            <p>
              Urja Ratna highlights the individuals, organisations, and communities moving India&apos;s green-energy
              transition forward.
            </p>
            <p>
              Surya NEXA complements this mission by engaging solar vendors and entrepreneurs, bringing their
              experiences and contributions into the spotlight.
            </p>
          </div>
        </div>
        <div className="mission-actions">
          <button
            type="button"
            className="btn-primary"
            id="missionNominateBtn"
            onClick={onNominate}
          >
            <span>Nominate for Urja Ratna</span>
            <svg
              width="16"
              height="16"
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
            className="btn-nexa-discover"
            id="nexaBtn"
            onClick={onDiscoverNexa}
          >
            <span>Discover Surya NEXA</span>
            <svg
              width="16"
              height="16"
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
      </div>
    </section>
  );
}
