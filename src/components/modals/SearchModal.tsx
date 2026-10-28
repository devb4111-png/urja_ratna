"use client";

import React, { useState, useEffect, useRef } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: "1",
    title: "Powering Care — Community Healthcare Solarisation",
    subtitle: "Prayagraj, Uttar Pradesh • 150 kW",
    category: "Community",
  },
  {
    id: "2",
    title: "Indian Oil Corporation Limited (IOCL)",
    subtitle: "Pan India • Commercial & Industrial Solarisation",
    category: "Organisation",
  },
  {
    id: "3",
    title: "Dr. Sharma — Solar Innovator",
    subtitle: "New Delhi • Urban Micro-inverters",
    category: "Individual",
  },
  {
    id: "4",
    title: "Dev Foundation",
    subtitle: "Rural & semi-urban India • Youth Electrification",
    category: "Foundation",
  },
  {
    id: "5",
    title: "Jeevan Dhara Welfare",
    subtitle: "Rural India • Village Micro-grids",
    category: "Welfare",
  },
];

export default function SearchModal({
  isOpen,
  onClose,
  onSelectResult,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredItems = SEARCH_ITEMS.filter((item) =>
    (item.title + " " + item.subtitle + " " + item.category)
      .toLowerCase()
      .includes(query.toLowerCase().trim())
  );

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      id="searchModal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog search-modal-dialog">
        <div className="search-input-wrap">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            ref={inputRef}
            id="searchInput"
            className="search-input-field"
            placeholder="Search awardees, stories, or solar initiatives..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="modal-close-btn"
            style={{ padding: "0 6px" }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="search-results-list" id="searchResults">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="search-result-item"
                onClick={() => {
                  onSelectResult();
                  onClose();
                }}
              >
                <div>
                  <strong>{item.title}</strong>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    {item.subtitle}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    background: "#e2e8f0",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {item.category}
                </span>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "16px",
                textAlign: "center",
                color: "#94a3b8",
                fontSize: "0.88rem",
              }}
            >
              No matching initiatives found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
