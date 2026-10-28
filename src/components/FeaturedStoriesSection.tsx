"use client";

import React, { useState, useRef } from "react";

export interface Story {
  badge: string;
  title: string;
  sub?: string | null;
  location: string;
  metrics?: string | null;
  image: string;
  hasReadMore?: boolean;
  storyDetail?: string;
}

export const STORIES: Story[] = [
  {
    badge: "INDIVIDUAL",
    title: "Solar Innovator",
    sub: "Dr. Sharma",
    location: "New Delhi",
    metrics: null,
    image: "/assets/images/solar-innovator.jpg",
    hasReadMore: false,
    storyDetail:
      "Dr. Sharma has pioneered low-cost solar micro-inverter solutions designed specifically for high-density urban residential roofs across Delhi NCR.",
  },
  {
    badge: "COMMUNITY INITIATIVE",
    title: "Powering Care — Community Healthcare Solarisation",
    sub: null,
    location: "Prayagraj, Uttar Pradesh",
    metrics: "10 CHCs | 150 kW (off-grid)",
    image: "/assets/images/healthcare-solar.jpg",
    hasReadMore: true,
    storyDetail:
      "Transforming 10 Community Health Centres (CHCs) in rural Prayagraj with 150 kW off-grid solar infrastructure, ensuring uninterrupted power for neonatal incubators, cold-chain vaccine storage, and emergency labor rooms.",
  },
  {
    badge: "ORGANISATION",
    title: "Indian Oil Corporation Limited (IOCL)",
    sub: null,
    location: "Pan India",
    metrics: "Commercial & Industrial Solarisation",
    image: "/assets/images/iocl-solar.jpg",
    hasReadMore: false,
    storyDetail:
      "Accelerating the green transition by solarising over 2,500 retail fuel outlets and installing large-scale solar arrays at distribution terminals across India.",
  },
  {
    badge: "COMMUNITY INITIATIVE",
    title: "Dev Foundation",
    sub: "Youth Clean-Power Drive",
    location: "Rural & semi-urban India",
    metrics: "Verified award record",
    image: "/assets/images/dev-foundation.jpg",
    hasReadMore: false,
    storyDetail:
      "Empowering rural youth by setting up village solar charging micro-hubs and educating local youth on solar installation and maintenance.",
  },
  {
    badge: "COMMUNITY WELFARE",
    title: "Jeevan Dhara Welfare",
    sub: "Village Solar Electrification",
    location: "Rural India",
    metrics: "Verified award record",
    image: "/assets/images/jeevan-dhara.jpg",
    hasReadMore: false,
    storyDetail:
      "Transforming un-electrified hamlet communities through distributed solar micro-grids, providing steady lighting and clean drinking water purification.",
  },
];

interface FeaturedStoriesSectionProps {
  onOpenStory: (story: Story) => void;
}

export default function FeaturedStoriesSection({
  onOpenStory,
}: FeaturedStoriesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to card 1 (Community Healthcare)
  const touchStartXRef = useRef(0);
  const totalCards = STORIES.length;

  const updateCarousel = (newIndex: number) => {
    setCurrentIndex((newIndex + totalCards) % totalCards);
  };

  const getSlotClass = (idx: number) => {
    let diff = idx - currentIndex;
    while (diff > 2) diff -= totalCards;
    while (diff < -2) diff += totalCards;

    if (diff === 0) return "slot-center";
    if (diff === -1) return "slot-prev-1";
    if (diff === 1) return "slot-next-1";
    if (diff === -2) return "slot-prev-2";
    if (diff === 2) return "slot-next-2";
    return "";
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartXRef.current - touchEndX > 40) {
      updateCarousel(currentIndex + 1);
    } else if (touchEndX - touchStartXRef.current > 40) {
      updateCarousel(currentIndex - 1);
    }
  };

  return (
    <section className="featured-stories-section">
      <div className="container">
        {/* Section Header Row with Nav Arrows */}
        <div className="stories-header-row reveal-on-scroll">
          <div>
            <span className="section-label">FEATURED STORIES</span>
            <h2 className="section-title">Real People. Meaningful Impact.</h2>
            <p className="hero-desc" style={{ marginBottom: 0 }}>
              Explore stories of individuals, organisations and communities making a difference in India&apos;s
              clean-energy journey.
            </p>
          </div>
          <div className="stories-nav-arrows">
            <button
              type="button"
              className="btn-carousel-nav"
              id="prevStoryBtn"
              aria-label="Previous story"
              onClick={() => updateCarousel(currentIndex - 1)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              type="button"
              className="btn-carousel-nav"
              id="nextStoryBtn"
              aria-label="Next story"
              onClick={() => updateCarousel(currentIndex + 1)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* 5 Story Cards Carousel Stage (3D Depth & Fading Effect) */}
        <div
          className="stories-carousel-stage reveal-on-scroll delay-1"
          id="storiesCarouselStage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {STORIES.map((story, idx) => {
            const slotClass = getSlotClass(idx);
            return (
              <article
                key={story.title}
                className={`story-card ${slotClass}`}
                id={`storyCard${idx}`}
                data-index={idx}
                onClick={() => updateCarousel(idx)}
              >
                <div className="story-card-image-wrap">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="story-card-img"
                  />
                </div>
                <div className="story-card-body">
                  <span className="story-badge">{story.badge}</span>
                  <h3 className="story-card-title">{story.title}</h3>
                  {story.sub && (
                    <div className="story-card-sub">{story.sub}</div>
                  )}
                  <div className="story-meta-row">
                    <svg
                      width="14"
                      height="14"
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
                    <span>{story.location}</span>
                  </div>
                  {story.metrics && (
                    <div className="story-meta-row">
                      {idx === 1 ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="12" x2="23" y2="12"></line>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
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
                      <span>{story.metrics}</span>
                    </div>
                  )}

                  {story.hasReadMore && (
                    <div
                      className="story-read-link"
                      id="readStoryLink"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenStory(story);
                      }}
                    >
                      <span>Read Story</span>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* 5 Pagination Dots */}
        <div className="carousel-dots">
          {STORIES.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentIndex ? "active" : ""}`}
              data-index={idx}
              onClick={() => updateCarousel(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
