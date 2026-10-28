"use client";

import React, { useState } from "react";

interface HeaderProps {
  onOpenSearch: () => void;
  onDonate: () => void;
}

export default function Header({ onOpenSearch, onDonate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" aria-label="Surya Sangam Home">
          <span className="sun-icon">
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="6" fill="#F59E0B" />
              <path
                d="M16 3V6M16 26V29M3 16H6M26 16H29M6.8 6.8L9 9M23 23L25.2 25.2M6.8 25.2L9 23M23 9L25.2 6.8"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M16 1L16 4M16 28L16 31M1 16H4M28 16H31M4.5 4.5L7 7M25 25L27.5 27.5M4.5 27.5L7 25M25 7L27.5 4.5"
                stroke="#FBBF24"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </span>
          <span>Surya Sangam</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="main-navigation" aria-label="Primary Navigation">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#impact" className="nav-link active">
            Impact
          </a>
          <a href="#partners" className="nav-link">
            Partners
          </a>
          <a href="#get-involved" className="nav-link">
            Get Involved
          </a>
        </nav>

        {/* Right Header Actions */}
        <div className="nav-actions">
          {/* Search Trigger */}
          <button
            type="button"
            className="search-toggle-btn"
            id="searchToggleBtn"
            aria-label="Search portal"
            onClick={onOpenSearch}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Donate Button */}
          <button
            type="button"
            className="btn-donate"
            id="donateBtn"
            onClick={onDonate}
          >
            Donate
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
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
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 flex flex-col gap-3 shadow-lg">
          <a
            href="#home"
            className="nav-link py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="nav-link py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#impact"
            className="nav-link active py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Impact
          </a>
          <a
            href="#partners"
            className="nav-link py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Partners
          </a>
          <a
            href="#get-involved"
            className="nav-link py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Involved
          </a>
        </div>
      )}
    </header>
  );
}
