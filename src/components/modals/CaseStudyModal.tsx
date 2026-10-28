"use client";

import React from "react";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  location?: string;
  image?: string;
  details?: string;
  metric1Label?: string;
  metric1Val?: string;
  metric2Label?: string;
  metric2Val?: string;
}

export default function CaseStudyModal({
  isOpen,
  onClose,
  title = "Powering Care — Community Healthcare Solarisation",
  location = "Prayagraj, Uttar Pradesh",
  image = "/assets/images/healthcare-solar.jpg",
  details,
  metric1Label = "CAPACITY INSTALLED",
  metric1Val = "150 kW Off-Grid",
  metric2Label = "HEALTHCARE IMPACT",
  metric2Val = "10 CHCs Solarised",
}: CaseStudyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      id="storyModal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-header">
          <div className="modal-title-group">
            <h3 id="storyModalTitle">{title}</h3>
            <p>Verified Case Study • {location}</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          <img
            src={image}
            alt={title}
            style={{
              borderRadius: "12px",
              marginBottom: "18px",
              width: "100%",
              height: "240px",
              objectFit: "cover",
            }}
          />
          <h4
            style={{
              fontSize: "1.1rem",
              color: "var(--color-navy-heading)",
              marginBottom: "10px",
              fontWeight: 700,
            }}
          >
            Transforming Primary Health Centers in Uttar Pradesh
          </h4>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#475569",
              lineHeight: 1.65,
              marginBottom: "14px",
            }}
          >
            {details ||
              "Frequent grid outages previously compromised emergency maternal care and vaccine refrigeration across 10 rural Community Health Centres (CHCs) in Prayagraj district."}
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#475569",
              lineHeight: 1.65,
              marginBottom: "16px",
            }}
          >
            Through a collective community electrification initiative, 150 kW off-grid solar rooftop systems equipped with
            lithium battery storage were installed. Today, over 450,000 rural residents benefit from 24/7 electrified
            health facilities.
          </p>
          <div
            style={{
              background: "#f1f5f9",
              padding: "14px",
              borderRadius: "10px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#64748b",
                }}
              >
                {metric1Label}
              </div>
              <div
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  color: "#0b6a43",
                }}
              >
                {metric1Val}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#64748b",
                }}
              >
                {metric2Label}
              </div>
              <div
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  color: "#0f273d",
                }}
              >
                {metric2Val}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-primary modal-cancel-btn"
            onClick={onClose}
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
