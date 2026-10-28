"use client";

import React from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      id="videoModal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog video-modal-dialog">
        <div
          className="modal-header"
          style={{
            background: "#0f172a",
            borderBottom: "1px solid #1e293b",
            color: "#ffffff",
          }}
        >
          <div className="modal-title-group">
            <h3 style={{ color: "#ffffff" }}>Solar Entrepreneur Spotlight</h3>
            <p style={{ color: "#94a3b8" }}>
              Episode 04 • Driving Clean Energy Adoption in Rural India
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            style={{ color: "#94a3b8" }}
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="video-container">
          <iframe
            id="podcastVideoPlayer"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
