"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const BOX_SIZE = 20; // 1X1 square boxes (20px by 20px)

export default function WhatIsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const [sectionStatus, setSectionStatus] = useState<"active" | "exiting" | "">("");
  const [isImgFaded, setIsImgFaded] = useState(true);
  const [isCanvasActive, setIsCanvasActive] = useState(false);

  const imageObjRef = useRef<HTMLImageElement | null>(null);
  const hasAnimatedRef = useRef(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = "/assets/images/plant-sprout.jpg";
    img.onload = () => {
      imageObjRef.current = img;
    };
  }, []);

  // Diagonal Box Animation Loop
  const playDiagonalLoading = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = imageWrapRef.current;
    const img = imageObjRef.current;

    if (!canvas || !wrap) return;

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }

    const rect = wrap.getBoundingClientRect();
    const width = Math.round(rect.width) || 600;
    const height = Math.round(rect.height) || 540;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    setIsImgFaded(true);
    setIsCanvasActive(true);

    const cols = Math.ceil(width / BOX_SIZE);
    const rows = Math.ceil(height / BOX_SIZE);
    const maxDiagonal = Math.max(1, cols - 1 + rows - 1);

    // Calculate object-fit: cover coordinates
    const imgW = img?.naturalWidth || width;
    const imgH = img?.naturalHeight || height;
    const imgRatio = imgW / imgH;
    const containerRatio = width / height;

    let renderW = width;
    let renderH = height;
    let offsetX = 0;
    let offsetY = 0;

    if (containerRatio > imgRatio) {
      renderW = width;
      renderH = width / imgRatio;
      offsetY = (height - renderH) / 2;
    } else {
      renderH = height;
      renderW = height * imgRatio;
      offsetX = (width - renderW) / 2;
    }

    const startTime = performance.now();
    const duration = 1350; // 1.35 seconds smooth diagonal wave

    const renderFrame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, Math.max(0, elapsed / duration));

      ctx.clearRect(0, 0, width, height);

      // Diagonal sweep parameter
      const waveFront = progress * (maxDiagonal + 4);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const diagonal = r + c;
          const diff = waveFront - diagonal;

          if (diff <= 0) continue; // Not reached yet

          const boxAlpha = Math.min(1, Math.max(0, diff / 2.5));
          const x = c * BOX_SIZE;
          const y = r * BOX_SIZE;
          const dw = Math.min(BOX_SIZE, width - x);
          const dh = Math.min(BOX_SIZE, height - y);

          if (dw <= 0 || dh <= 0) continue;

          // Source slice matching object-fit: cover
          const sx = ((x - offsetX) / renderW) * imgW;
          const sy = ((y - offsetY) / renderH) * imgH;
          const sw = (dw / renderW) * imgW;
          const sh = (dh / renderH) * imgH;

          if (img && img.complete) {
            ctx.save();
            ctx.globalAlpha = boxAlpha;
            ctx.drawImage(img, sx, sy, sw, sh, x, y, dw, dh);

            // Shimmer outline on the active diagonal edge
            if (boxAlpha < 0.98) {
              ctx.strokeStyle = `rgba(245, 158, 11, ${(1 - boxAlpha) * 0.85})`;
              ctx.lineWidth = 1;
              ctx.strokeRect(x + 0.5, y + 0.5, dw - 1, dh - 1);
            }
            ctx.restore();
          }
        }
      }

      if (progress < 1) {
        animFrameIdRef.current = requestAnimationFrame(renderFrame);
      } else {
        // Complete! Crossfade to crisp base image
        setIsImgFaded(false);
        setTimeout(() => {
          setIsCanvasActive(false);
          ctx.clearRect(0, 0, width, height);
        }, 300);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(renderFrame);
  }, []);

  // Scroll Trigger: loads as we move from top of the page and reach its section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") {
      setSectionStatus("active");
      playDiagonalLoading();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // User scrolled down from top and reached section
            setSectionStatus("active");
            if (!hasAnimatedRef.current) {
              hasAnimatedRef.current = true;
              setTimeout(() => {
                playDiagonalLoading();
              }, 150);
            }
          } else {
            // When user scrolls back up towards the top of page, reset
            const rect = section.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
              // Section is below viewport again (user is back above)
              hasAnimatedRef.current = false;
              setSectionStatus("exiting");
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [playDiagonalLoading]);

  // Handle manual replay button
  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    hasAnimatedRef.current = true;
    playDiagonalLoading();
  };

  return (
    <section
      ref={sectionRef}
      className={`what-is-section ${
        sectionStatus === "active"
          ? "is-active"
          : sectionStatus === "exiting"
          ? "is-exiting"
          : ""
      }`}
      id="whatIsSection"
    >
      <div className="container what-is-grid">
        {/* Left details */}
        <div className="what-is-content">
          <span className="section-label what-is-anim-item">WHAT IS URJA RATNA?</span>
          <h2 className="section-title what-is-anim-item">
            A Recognition for
            <br />
            Real Impact.
          </h2>
          <p className="what-is-desc what-is-anim-item">
            Urja Ratna Award is a recognition initiative by Surya Sangam that celebrates individuals, organisations, and
            communities making meaningful contributions to solar energy and India&apos;s green-energy transition. It
            highlights changemakers who advance solar adoption, promote clean-energy access, drive innovation, and
            create measurable environmental and social impact.
            <br />
            <br />
            Through recognition and impact storytelling, Urja Ratna aims to bring these contributions into the spotlight
            and inspire others to support a more sustainable future.
          </p>

          {/* 4 Category Items */}
          <div className="categories-grid">
            {/* 1. Individuals */}
            <div className="category-card what-is-anim-item">
              <div className="cat-icon-wrap">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="cat-title">Individuals</h3>
              <p className="cat-desc">Changemakers &amp; Innovators</p>
            </div>

            {/* 2. Organisations */}
            <div className="category-card what-is-anim-item">
              <div className="cat-icon-wrap">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                  <path d="M9 22v-4h6v4"></path>
                  <line x1="8" y1="6" x2="8.01" y2="6"></line>
                  <line x1="16" y1="6" x2="16.01" y2="6"></line>
                  <line x1="8" y1="10" x2="8.01" y2="10"></line>
                  <line x1="16" y1="10" x2="16.01" y2="10"></line>
                  <line x1="8" y1="14" x2="8.01" y2="14"></line>
                  <line x1="16" y1="14" x2="16.01" y2="14"></line>
                </svg>
              </div>
              <h3 className="cat-title">Organisations</h3>
              <p className="cat-desc">Companies &amp; Institutions</p>
            </div>

            {/* 3. Communities */}
            <div className="category-card what-is-anim-item">
              <div className="cat-icon-wrap">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="cat-title">Communities</h3>
              <p className="cat-desc">Grassroots Initiatives &amp; Local Champions</p>
            </div>

            {/* 4. Solar Industry */}
            <div className="category-card what-is-anim-item">
              <div className="cat-icon-wrap">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                </svg>
              </div>
              <h3 className="cat-title">Solar Industry</h3>
              <p className="cat-desc">Vendors, Installers &amp; Entrepreneurs</p>
            </div>
          </div>
        </div>

        {/* Right image with 1X1 Boxes Diagonal Loading Canvas */}
        <div
          ref={imageWrapRef}
          className="what-is-image-wrap"
          id="whatIsImageWrap"
        >
          <img
            src="/assets/images/plant-sprout.jpg"
            alt="Hands holding soil with seedling sprout against solar farm"
            className={`what-is-image ${isImgFaded ? "fade-during-grid" : ""}`}
            id="whatIsMainImg"
          />

          <canvas
            ref={canvasRef}
            className={`diagonal-boxes-canvas ${isCanvasActive ? "opacity-100" : "opacity-0"}`}
            id="diagonalGridCanvas"
            aria-hidden="true"
          />

          <button
            type="button"
            className="grid-replay-btn"
            id="gridReplayBtn"
            title="Replay 1x1 diagonal box animation"
            aria-label="Replay 1x1 diagonal box animation"
            onClick={handleReplay}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            <span>Replay Grid</span>
          </button>
        </div>
      </div>
    </section>
  );
}
