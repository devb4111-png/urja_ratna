"use client";

import React, { useState } from "react";
import { STATES_AND_CITIES, STATES_LIST } from "@/data/statesAndCities";

interface NominationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export default function NominationModal({
  isOpen,
  onClose,
  onToast,
}: NominationModalProps) {
  const [name, setName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [useOfSolar, setUseOfSolar] = useState("");

  const [submittedRefCode, setSubmittedRefCode] = useState<string | null>(null);

  const availableCities = selectedState ? STATES_AND_CITIES[selectedState] || [] : [];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !selectedState.trim() ||
      !selectedCity.trim() ||
      !address.trim() ||
      !capacity.trim() ||
      !useOfSolar.trim()
    ) {
      onToast("Please fill all required nomination fields (including State and City).");
      return;
    }

    const ref = "UR-" + Math.floor(100000 + Math.random() * 900000);
    setSubmittedRefCode(ref);
    onToast(`Nomination for ${name.trim()} submitted successfully!`);
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setSelectedState("");
      setSelectedCity("");
      setAddress("");
      setCapacity("");
      setUseOfSolar("");
      setSubmittedRefCode(null);
    }, 300);
  };

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      id="nominationModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nominationModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="modal-dialog">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h3 id="nominationModalTitle">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0b6a43"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              Nominate for Urja Ratna Award
            </h3>
            <p>Fill out the form below to nominate a champion of India&apos;s green-energy transition.</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={handleResetAndClose}
          >
            &times;
          </button>
        </div>

        {/* Modal Form Body */}
        {!submittedRefCode ? (
          <div className="modal-body" id="nominationFormBody">
            <form id="urjaNominationForm" onSubmit={handleSubmit} noValidate>
              {/* (a) Name */}
              <div className="form-group">
                <label htmlFor="nominationName" className="form-label">
                  (a) Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nominationName"
                  className="form-control"
                  placeholder="Full name / Organisation name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* (b) State & (c) City */}
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="nominationState" className="form-label">
                    (b) State <span className="required">*</span>
                  </label>
                  <select
                    id="nominationState"
                    className="form-control"
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity("");
                    }}
                    required
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">Select State / UT</option>
                    {STATES_LIST.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="nominationCity" className="form-label">
                    (c) City <span className="required">*</span>
                  </label>
                  <select
                    id="nominationCity"
                    className="form-control"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                    required
                    style={{
                      cursor: selectedState ? "pointer" : "not-allowed",
                      opacity: selectedState ? 1 : 0.65,
                    }}
                  >
                    <option value="">
                      {selectedState ? "Select City / District" : "— Select State first —"}
                    </option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* (d) Address */}
              <div className="form-group">
                <label htmlFor="nominationAddress" className="form-label">
                  (d) Address <span className="required">*</span>
                </label>
                <textarea
                  id="nominationAddress"
                  className="form-control"
                  rows={2}
                  placeholder="Complete address with district, state and PIN code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* (e) Solar Capacity */}
              <div className="form-group">
                <label htmlFor="nominationCapacity" className="form-label">
                  (e) Solar Capacity <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nominationCapacity"
                  className="form-control"
                  placeholder="e.g., 5 kW rooftop, 150 kW off-grid, 2 MW solar plant"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </div>

              {/* (f) Use of Solar */}
              <div className="form-group">
                <label htmlFor="nominationUse" className="form-label">
                  (f) Use of Solar <span className="required">*</span>
                </label>
                <textarea
                  id="nominationUse"
                  className="form-control"
                  rows={2}
                  placeholder="Describe how the solar power is utilised (e.g., healthcare clinic power, agriculture solar pumps, community lighting, industrial savings)"
                  value={useOfSolar}
                  onChange={(e) => setUseOfSolar(e.target.value)}
                  required
                ></textarea>
              </div>

              <div
                className="modal-footer"
                style={{ padding: "16px 0 0", background: "none", border: "none" }}
              >
                <button
                  type="button"
                  className="btn-secondary modal-cancel-btn"
                  onClick={handleResetAndClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  id="submitNominationBtn"
                >
                  <span>Submit Nomination</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div
            className="success-state"
            id="nominationSuccess"
            style={{ display: "block" }}
          >
            <div className="success-icon-wrap">✓</div>
            <h3 className="success-title">Nomination Successfully Received!</h3>
            <p className="success-desc">
              Thank you for nominating this impactful initiative for the Urja Ratna Award. Our independent evaluation
              committee will review the details.
            </p>
            <div>
              <span
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  color: "#64748b",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Application Reference Number
              </span>
              <span className="success-ref-code" id="nominationRefCode">
                {submittedRefCode}
              </span>
            </div>
            <button
              type="button"
              className="btn-primary"
              id="closeNominationSuccessBtn"
              onClick={handleResetAndClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
