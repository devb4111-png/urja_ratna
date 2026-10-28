"use client";

import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let progress = 0;
    let isFullyLoaded = false;

    const progressTimer = setInterval(() => {
      if (!isFullyLoaded) {
        if (progress < 85) {
          progress += Math.random() * 8 + 5;
          if (progress > 85) progress = 85;
          setLoadProgress(Math.min(85, Math.round(progress)));
        }
      } else {
        progress += 15;
        if (progress >= 100) {
          progress = 100;
          setLoadProgress(100);
          clearInterval(progressTimer);

          setTimeout(() => {
            document.body.classList.add("page-loaded");
            setIsFadingOut(true);
            setTimeout(() => {
              setIsRemoved(true);
            }, 650);
          }, 150);
        } else {
          setLoadProgress(Math.round(progress));
        }
      }
    }, 30);

    const minDisplayTime = 500;
    const loadStartTime = performance.now();

    const handleLoad = () => {
      const elapsed = performance.now() - loadStartTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);
      setTimeout(() => {
        isFullyLoaded = true;
      }, remaining);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    const maxTimeout = setTimeout(() => {
      isFullyLoaded = true;
    }, 1200);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(maxTimeout);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      id="pagePreloader"
      className={`page-preloader ${isFadingOut ? "fade-out" : ""}`}
      aria-hidden="true"
    >
      <div className="preloader-backdrop-glow"></div>
      <div className="preloader-content">
        {/* Animated Sun Element */}
        <div className="preloader-sun-wrap">
          <div className="preloader-sun-ambient"></div>
          <svg
            className="preloader-sun-svg"
            width="76"
            height="76"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="6.5" fill="url(#sunGradPreloader)" />
            <g className="sun-rays-outer">
              <path
                d="M16 2V6M16 26V30M2 16H6M26 16H30M6.1 6.1L9 9M23 23L25.9 25.9M6.1 25.9L9 23M23 9L25.9 6.1"
                stroke="#F59E0B"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </g>
            <g className="sun-rays-inner">
              <path
                d="M16 0.5L16 4M16 28L16 31.5M0.5 16H4M28 16H31.5M4 4L7 7M25 25L28 28M4 28L7 25M25 7L28 4"
                stroke="#FBBF24"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>
            <defs>
              <linearGradient
                id="sunGradPreloader"
                x1="10"
                y1="10"
                x2="22"
                y2="22"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F59E0B" />
                <stop offset="1" stopColor="#D97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Typography */}
        <div className="preloader-text-wrap">
          <span className="preloader-badge">SURYA SANGAM</span>
          <h2 className="preloader-title">Urja Ratna Award</h2>
          <p className="preloader-subtitle">Powering India&apos;s Green-Energy Transition</p>
        </div>

        {/* Progress Track & Percentage */}
        <div className="preloader-bar-wrap">
          <div className="preloader-bar-track">
            <div
              className="preloader-bar-fill"
              id="preloaderBarFill"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
          <div className="preloader-status">
            <span className="preloader-status-text">Loading portal...</span>
            <span className="preloader-percentage" id="preloaderPercentage">
              {loadProgress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
