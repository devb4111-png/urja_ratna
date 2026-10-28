"use client";

import React from "react";

interface ActionCardsSectionProps {
  onNominate: () => void;
  onJoinPodcast: () => void;
}

export default function ActionCardsSection({
  onNominate,
  onJoinPodcast,
}: ActionCardsSectionProps) {
  return (
    <section className="action-cards-section">
      <div className="container action-cards-grid">
        {/* Card 1: Nominate for Urja Ratna */}
        <div className="action-card reveal-on-scroll delay-1">
          <div className="action-icon-square">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h3 className="action-card-title">Nominate for Urja Ratna</h3>
          <div className="action-card-sub">
            Your contribution could inspire the next wave of change.
          </div>
          <p className="action-card-desc">
            Are you advancing solar adoption, enabling clean-energy access, building green technologies, or creating
            measurable environmental and community impact?
          </p>
          <button
            type="button"
            className="btn-action-start"
            id="ctaNominateBtn"
            onClick={onNominate}
          >
            <span>Start Nomination Form</span>
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

        {/* Card 2: Join the Podcast */}
        <div className="action-card reveal-on-scroll delay-2">
          <div className="action-icon-square">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </div>
          <h3 className="action-card-title">Join the Podcast</h3>
          <div className="action-card-sub">Share your journey. Inspire others.</div>
          <p className="action-card-desc">
            If you are a solar entrepreneur or industry professional, we&apos;d love to hear your story for our Solar
            Entrepreneur Spotlight series.
          </p>
          <button
            type="button"
            className="btn-action-interest"
            id="ctaPodcastBtn"
            onClick={onJoinPodcast}
          >
            <span>Submit Interest Form</span>
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
      </div>
    </section>
  );
}
