"use client";

import React, { useState, useEffect } from "react";
import { STATES_AND_CITIES, STATES_LIST } from "@/data/statesAndCities";

interface PodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "11:30 AM - 12:30 PM",
  "02:00 PM - 03:00 PM",
  "03:30 PM - 04:30 PM",
  "05:00 PM - 06:00 PM",
  "Custom Time",
];

export default function PodcastModal({
  isOpen,
  onClose,
  onToast,
}: PodcastModalProps) {
  const [name, setName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");
  const [business, setBusiness] = useState("");
  const [social, setSocial] = useState("");
  const [website, setWebsite] = useState("");

  // Appointment Calendar state
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("10:00 AM - 11:00 AM");
  const [customTime, setCustomTime] = useState<string>("");
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date | null>(null);
  const [todayDate, setTodayDate] = useState<Date | null>(null);

  const [submittedRefCode, setSubmittedRefCode] = useState<string | null>(null);

  const availableCities = selectedState ? STATES_AND_CITIES[selectedState] || [] : [];

  // Defer reading unstable current-time Date to useEffect to satisfy Next.js static prerendering
  useEffect(() => {
    const now = new Date();
    setCurrentCalendarDate(now);
    const t = new Date(now);
    t.setHours(0, 0, 0, 0);
    setTodayDate(t);
  }, []);

  if (!isOpen) return null;

  // Calendar calculations
  const calYear = currentCalendarDate ? currentCalendarDate.getFullYear() : 2026;
  const calMonth = currentCalendarDate ? currentCalendarDate.getMonth() : 9;

  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const daysInCurrentMonth = new Date(calYear, calMonth + 1, 0).getDate();

  const paddingDays = Array.from({ length: firstDayOfWeek });
  const monthDays = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);

  const canGoPrev = todayDate
    ? calYear > todayDate.getFullYear() ||
      (calYear === todayDate.getFullYear() && calMonth > todayDate.getMonth())
    : false;

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    setCurrentCalendarDate(new Date(calYear, calMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(new Date(calYear, calMonth + 1, 1));
  };

  const effectiveTime =
    selectedTimeSlot === "Custom Time"
      ? customTime ? customTime : "Custom Time (unspecified)"
      : selectedTimeSlot;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !selectedState.trim() || !selectedCity.trim() || !address.trim()) {
      onToast("Please complete the required fields (Name, State, City, Address).");
      return;
    }

    if (!appointmentDate) {
      onToast("Please select a date from the meeting schedule calendar.");
      return;
    }

    if (selectedTimeSlot === "Custom Time" && !customTime) {
      onToast("Please specify your preferred custom meeting time.");
      return;
    }

    const ref = "POD-" + Math.floor(200000 + Math.random() * 800000);
    setSubmittedRefCode(ref);
    onToast(`Podcast interest received for ${name.trim()}! Meeting scheduled for ${appointmentDate} at ${effectiveTime}.`);
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setSelectedState("");
      setSelectedCity("");
      setAddress("");
      setBusiness("");
      setSocial("");
      setWebsite("");
      setAppointmentDate("");
      setSelectedTimeSlot("10:00 AM - 11:00 AM");
      setCustomTime("");
      if (todayDate) setCurrentCalendarDate(new Date(todayDate));
      setSubmittedRefCode(null);
    }, 300);
  };

  // Format chosen date for display
  const formattedSelectedDate = appointmentDate
    ? new Date(appointmentDate + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const minDateAttribute = todayDate ? todayDate.toISOString().split("T")[0] : "";

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      id="podcastModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="podcastModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="modal-dialog">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h3 id="podcastModalTitle">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
              Solar Entrepreneur Spotlight — Interest Form
            </h3>
            <p>Share your journey and inspire the clean-energy community across India.</p>
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

        {/* Modal Body */}
        {!submittedRefCode ? (
          <div className="modal-body" id="podcastFormBody">
            <form id="podcastInterestForm" onSubmit={handleSubmit} noValidate>
              {/* (a) Name */}
              <div className="form-group">
                <label htmlFor="podcastName" className="form-label">
                  (a) Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="podcastName"
                  className="form-control"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* (b) State & (c) City */}
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="podcastState" className="form-label">
                    (b) State <span className="required">*</span>
                  </label>
                  <select
                    id="podcastState"
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
                  <label htmlFor="podcastCity" className="form-label">
                    (c) City <span className="required">*</span>
                  </label>
                  <select
                    id="podcastCity"
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
                <label htmlFor="podcastAddress" className="form-label">
                  (d) Address <span className="required">*</span>
                </label>
                <textarea
                  id="podcastAddress"
                  className="form-control"
                  rows={2}
                  placeholder="City, state and operating location"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* (e) Schedule Meeting (Interactive Calendar) */}
              <div className="form-group" style={{ marginTop: "8px" }}>
                <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#78350f"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>(e) Schedule Meeting</span>
                  <span className="required">*</span>
                </label>

                {/* Calendar Card Container with #F5CD6A background */}
                <div
                  style={{
                    backgroundColor: "#F5CD6A",
                    border: "1.5px solid #e0ba57",
                    borderRadius: "14px",
                    padding: "16px",
                    boxShadow: "0 4px 14px rgba(245, 205, 106, 0.28)",
                  }}
                >
                  {/* Calendar Month Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1e293b" }}>
                        {MONTH_NAMES[calMonth]} {calYear}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          backgroundColor: "rgba(255, 255, 255, 0.85)",
                          color: "#78350f",
                          padding: "2px 9px",
                          borderRadius: "12px",
                          fontWeight: 700,
                        }}
                      >
                        Meeting Slot
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={!canGoPrev}
                        aria-label="Previous Month"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                          backgroundColor: canGoPrev ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
                          color: canGoPrev ? "#1e293b" : "#a38235",
                          cursor: canGoPrev ? "pointer" : "not-allowed",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          transition: "all 0.15s ease",
                        }}
                      >
                        &#8592;
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        aria-label="Next Month"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                          backgroundColor: "#ffffff",
                          color: "#1e293b",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          transition: "all 0.15s ease",
                        }}
                      >
                        &#8594;
                      </button>
                    </div>
                  </div>

                  {/* Weekday Names Header */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: "4px",
                      textAlign: "center",
                      marginBottom: "6px",
                    }}
                  >
                    {WEEKDAY_NAMES.map((d) => (
                      <div
                        key={d}
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          color: "#57400d",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          padding: "4px 0",
                        }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: "4px",
                    }}
                  >
                    {paddingDays.map((_, i) => (
                      <div key={`pad-${i}`} style={{ height: "34px" }}></div>
                    ))}

                    {monthDays.map((dayNum) => {
                      const thisDay = new Date(calYear, calMonth, dayNum);
                      thisDay.setHours(0, 0, 0, 0);

                      const isPast = todayDate ? thisDay < todayDate : false;
                      const isTodayDate = todayDate ? thisDay.getTime() === todayDate.getTime() : false;

                      const dateString = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                      const isSelected = appointmentDate === dateString;

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={isPast}
                          onClick={() => setAppointmentDate(dateString)}
                          style={{
                            height: "34px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                            fontSize: "0.82rem",
                            fontWeight: isSelected || isTodayDate ? 800 : 600,
                            border: isSelected
                              ? "2px solid #0f172a"
                              : isTodayDate
                              ? "2px solid #0f172a"
                              : "1px solid rgba(0, 0, 0, 0.08)",
                            backgroundColor: isSelected
                              ? "#0f172a"
                              : isTodayDate
                              ? "#ffffff"
                              : isPast
                              ? "rgba(255, 255, 255, 0.25)"
                              : "#ffffff",
                            color: isSelected
                              ? "#ffffff"
                              : isPast
                              ? "#a38235"
                              : "#1e293b",
                            cursor: isPast ? "not-allowed" : "pointer",
                            transition: "all 0.15s ease",
                            boxShadow: isSelected ? "0 3px 8px rgba(15, 23, 42, 0.35)" : "none",
                          }}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Manual Date Input Option for Accessibility */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "12px",
                      paddingTop: "10px",
                      borderTop: "1px dashed rgba(87, 64, 13, 0.25)",
                      fontSize: "0.8rem",
                      color: "#57400d",
                      fontWeight: 600,
                    }}
                  >
                    <span>Or pick date directly:</span>
                    <input
                      type="date"
                      min={minDateAttribute}
                      value={appointmentDate}
                      onChange={(e) => {
                        setAppointmentDate(e.target.value);
                        if (e.target.value) {
                          const parts = e.target.value.split("-").map(Number);
                          setCurrentCalendarDate(new Date(parts[0], parts[1] - 1, parts[2]));
                        }
                      }}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "7px",
                        border: "1px solid rgba(0, 0, 0, 0.15)",
                        fontSize: "0.82rem",
                        backgroundColor: "#ffffff",
                        color: "#1e293b",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    />
                  </div>

                  {/* Time Slots Section */}
                  <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(87, 64, 13, 0.2)" }}>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        color: "#1e293b",
                        marginBottom: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="2.4"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      Select Preferred Time Slot:
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {TIME_SLOTS.map((slot) => {
                        const isSlotSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            style={{
                              padding: "6px 12px",
                              borderRadius: "20px",
                              fontSize: "0.78rem",
                              fontWeight: isSlotSelected ? 800 : 600,
                              border: isSlotSelected ? "1.5px solid #0f172a" : "1px solid rgba(0, 0, 0, 0.15)",
                              backgroundColor: isSlotSelected ? "#0f172a" : "rgba(255, 255, 255, 0.9)",
                              color: isSlotSelected ? "#ffffff" : "#1e293b",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                              boxShadow: isSlotSelected ? "0 2px 6px rgba(0,0,0,0.2)" : "none",
                            }}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Time Input (shown when Custom Time is selected) */}
                    {selectedTimeSlot === "Custom Time" && (
                      <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <label
                          htmlFor="podcastCustomTime"
                          style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e293b" }}
                        >
                          Exact Time:
                        </label>
                        <input
                          type="time"
                          id="podcastCustomTime"
                          value={customTime}
                          onChange={(e) => setCustomTime(e.target.value)}
                          className="form-control"
                          style={{ width: "auto", padding: "4px 8px", fontSize: "0.82rem", backgroundColor: "#ffffff" }}
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Selected Appointment Confirmation Badge */}
                  {appointmentDate ? (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "10px 14px",
                        backgroundColor: "#ffffff",
                        border: "1.5px solid #059669",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.82rem",
                        color: "#065f46",
                        fontWeight: 700,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>
                        Meeting Scheduled: <strong>{formattedSelectedDate}</strong> at{" "}
                        <strong>{effectiveTime}</strong>
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: "12px",
                        fontSize: "0.78rem",
                        color: "#78350f",
                        fontWeight: 600,
                      }}
                    >
                      * Please select a meeting date on the calendar above.
                    </div>
                  )}
                </div>
              </div>

              {/* (f) Business Name (not mandatory) */}
              <div className="form-group">
                <label htmlFor="podcastBusiness" className="form-label">
                  (f) Business Name <span className="optional">(not mandatory)</span>
                </label>
                <input
                  type="text"
                  id="podcastBusiness"
                  className="form-control"
                  placeholder="Company, startup, or enterprise name (optional)"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                />
              </div>

              {/* (g) Social Handle & (h) Website */}
              <div className="form-grid-2">
                {/* (g) Social Handle (not mandatory) */}
                <div className="form-group">
                  <label htmlFor="podcastSocial" className="form-label">
                    (g) Social Handle <span className="optional">(not mandatory)</span>
                  </label>
                  <input
                    type="text"
                    id="podcastSocial"
                    className="form-control"
                    placeholder="@username or LinkedIn URL (optional)"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                  />
                </div>

                {/* (h) Website (not mandatory) */}
                <div className="form-group">
                  <label htmlFor="podcastWebsite" className="form-label">
                    (h) Website <span className="optional">(not mandatory)</span>
                  </label>
                  <input
                    type="url"
                    id="podcastWebsite"
                    className="form-control"
                    placeholder="https://yourwebsite.com (optional)"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
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
                  style={{ backgroundColor: "#0284c7", borderColor: "#0284c7" }}
                >
                  <span>Confirm Meeting Schedule &amp; Submit</span>
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
          /* Podcast Success Screen */
          <div
            className="success-state"
            id="podcastSuccess"
            style={{ display: "block" }}
          >
            <div
              className="success-icon-wrap"
              style={{ backgroundColor: "#e0f2fe", color: "#0284c7" }}
            >
              🎙️
            </div>
            <h3 className="success-title">Meeting Scheduled &amp; Confirmed!</h3>
            <p className="success-desc">
              Thank you for signing up for the Solar Entrepreneur Spotlight series. Your meeting appointment slot has
              been provisionally booked. Our studio team will send an invite link to coordinate questions and audio/video check.
            </p>

            {/* Scheduled Appointment Card */}
            <div
              style={{
                backgroundColor: "#f0f9ff",
                border: "1.5px solid #bae6fd",
                borderRadius: "10px",
                padding: "14px 16px",
                margin: "16px 0",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  color: "#0369a1",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "4px",
                  letterSpacing: "0.5px",
                }}
              >
                Scheduled Meeting Session
              </span>
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <span>📅 {formattedSelectedDate}</span>
                <span>•</span>
                <span>⏰ {effectiveTime}</span>
              </div>
            </div>

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
                Inquiry Reference Number
              </span>
              <span className="success-ref-code" id="podcastRefCode">
                {submittedRefCode}
              </span>
            </div>
            <button
              type="button"
              className="btn-primary"
              id="closePodcastSuccessBtn"
              onClick={handleResetAndClose}
              style={{ backgroundColor: "#0284c7", borderColor: "#0284c7" }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
