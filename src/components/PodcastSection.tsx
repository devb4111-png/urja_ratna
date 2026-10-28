"use client";

import React from "react";

interface PodcastSectionProps {
  onOpenVideo: () => void;
}

export default function PodcastSection({ onOpenVideo }: PodcastSectionProps) {
  return (
    <section className="podcast-section">
      <div className="container">
        <div className="podcast-banner-card reveal-on-scroll">
          <div className="podcast-grid">
            {/* Video Thumbnail Card */}
            <div
              className="podcast-video-thumb-card"
              id="podcastVideoThumb"
              role="button"
              tabIndex={0}
              aria-label="Play Solar Entrepreneur Spotlight podcast video"
              onClick={onOpenVideo}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onOpenVideo();
                }
              }}
            >
              <img
                src="/assets/images/podcast-thumb.jpg"
                alt="Solar Entrepreneur Spotlight Podcast Interview"
                className="podcast-video-img"
              />
              <div className="video-overlay-gradient"></div>

              {/* Top Watermark Logo */}
              <div className="podcast-watermark">
                <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="6" fill="#F59E0B" />
                  <path
                    d="M16 3V6M16 26V29M3 16H6M26 16H29M6.8 6.8L9 9M23 23L25.2 25.2M6.8 25.2L9 23M23 9L25.2 6.8"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Surya Sangam</span>
              </div>

              {/* Center Play Icon */}
              <div className="play-button-central">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6 4 20 12 6 20 6 4"></polygon>
                </svg>
              </div>

              {/* Bottom Label Badge */}
              <div className="podcast-bottom-badge">
                <div className="podcast-badge-title">Solar Entrepreneur Spotlight</div>
                <span className="podcast-badge-tag">PODCAST</span>
              </div>
            </div>

            {/* Right Information */}
            <div className="podcast-info-content">
              <span className="section-label">LISTEN • LEARN • BE INSPIRED</span>
              <h2 className="podcast-title">Solar Entrepreneur Spotlight</h2>
              <p className="podcast-desc">
                A virtual conversation series featuring solar entrepreneurs and industry professionals, sharing their
                journeys, experiences, and contributions to solar adoption.
              </p>
              <button
                type="button"
                className="btn-youtube-watch"
                id="watchYoutubeBtn"
                onClick={onOpenVideo}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="4" fill="#E11D48" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="#ffffff" />
                </svg>
                <span>Watch on YouTube</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
