"use client";

import React, { useState, useEffect, useCallback } from "react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatIsSection from "@/components/WhatIsSection";
import PodcastSection from "@/components/PodcastSection";
import FeaturedStoriesSection, { Story } from "@/components/FeaturedStoriesSection";
import ActionCardsSection from "@/components/ActionCardsSection";
import RecognisedImpactSection, { Awardee } from "@/components/RecognisedImpactSection";
import WiderMissionSection from "@/components/WiderMissionSection";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

import NominationModal from "@/components/modals/NominationModal";
import PodcastModal from "@/components/modals/PodcastModal";
import CaseStudyModal from "@/components/modals/CaseStudyModal";
import VideoModal from "@/components/modals/VideoModal";
import SearchModal from "@/components/modals/SearchModal";

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isNominationOpen, setIsNominationOpen] = useState(false);
  const [isPodcastOpen, setIsPodcastOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Case study active modal content
  const [caseStudyData, setCaseStudyData] = useState<{
    title: string;
    location: string;
    image: string;
    details?: string;
    metric1Label?: string;
    metric1Val?: string;
    metric2Label?: string;
    metric2Val?: string;
  }>({
    title: "Powering Care — Community Healthcare Solarisation",
    location: "Prayagraj, Uttar Pradesh",
    image: "/assets/images/healthcare-solar.jpg",
    metric1Label: "CAPACITY INSTALLED",
    metric1Val: "150 kW Off-Grid",
    metric2Label: "HEALTHCARE IMPACT",
    metric2Val: "10 CHCs Solarised",
  });

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  }, []);

  // Scroll reveal IntersectionObserver
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    if (typeof IntersectionObserver !== "undefined" && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          threshold: 0.1,
          rootMargin: "0px 0px -30px 0px",
        }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
      return () => revealObserver.disconnect();
    } else {
      revealElements.forEach((el) => el.classList.add("is-revealed"));
    }
  }, []);

  // Handle escape key to close active modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNominationOpen(false);
        setIsPodcastOpen(false);
        setIsCaseStudyOpen(false);
        setIsVideoOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when any modal is open
  useEffect(() => {
    const anyModalOpen =
      isNominationOpen ||
      isPodcastOpen ||
      isCaseStudyOpen ||
      isVideoOpen ||
      isSearchOpen;

    if (anyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [
    isNominationOpen,
    isPodcastOpen,
    isCaseStudyOpen,
    isVideoOpen,
    isSearchOpen,
  ]);

  const scrollToImpact = () => {
    const section = document.getElementById("recognisedImpactSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToStories = () => {
    const section = document.querySelector(".featured-stories-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenStory = (story: Story) => {
    setCaseStudyData({
      title: story.title,
      location: story.location,
      image: story.image,
      details: story.storyDetail,
      metric1Label: "CAPACITY INSTALLED",
      metric1Val: story.metrics ? story.metrics.split("|")[1]?.trim() || "150 kW Off-Grid" : "150 kW Off-Grid",
      metric2Label: "HEALTHCARE IMPACT",
      metric2Val: story.metrics ? story.metrics.split("|")[0]?.trim() || "10 CHCs Solarised" : "10 CHCs Solarised",
    });
    setIsCaseStudyOpen(true);
  };

  const handleOpenAwardee = (awardee: Awardee) => {
    setCaseStudyData({
      title: awardee.title,
      location: awardee.location,
      image: awardee.image,
      details: `Official verified impact record for ${awardee.title} (${awardee.location}) highlighting dedicated solar energy transformation.`,
      metric1Label: "VERIFICATION STATUS",
      metric1Val: "Verified",
      metric2Label: "RECOGNISED WORK",
      metric2Val: awardee.meta,
    });
    setIsCaseStudyOpen(true);
  };

  return (
    <>
      {/* 0. PAGE PRELOADER & ENTRANCE SCREEN */}
      <Preloader />

      {/* HEADER / NAVBAR */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onDonate={() =>
          showToast("Surya Sangam Clean Energy Fund: Thank you for your support!")
        }
      />

      <main>
        {/* HERO SECTION */}
        <HeroSection
          onNominate={() => setIsNominationOpen(true)}
          onExploreImpact={scrollToImpact}
        />

        {/* SECTION 2: WHAT IS URJA RATNA */}
        <WhatIsSection />

        {/* SECTION 3: PODCAST SPOTLIGHT BANNER */}
        <PodcastSection onOpenVideo={() => setIsVideoOpen(true)} />

        {/* SECTION 4: FEATURED STORIES (3D Depth Carousel) */}
        <FeaturedStoriesSection onOpenStory={handleOpenStory} />

        {/* SECTION 5: INTERACTIVE ACTION CARDS */}
        <ActionCardsSection
          onNominate={() => setIsNominationOpen(true)}
          onJoinPodcast={() => setIsPodcastOpen(true)}
        />

        {/* SECTION 6: RECOGNISED IMPACT */}
        <RecognisedImpactSection
          onOpenAwardee={handleOpenAwardee}
          onExploreStories={scrollToStories}
        />

        {/* SECTION 7: THE WIDER MISSION */}
        <WiderMissionSection
          onNominate={() => setIsNominationOpen(true)}
          onDiscoverNexa={() =>
            showToast("Surya NEXA: Connecting Solar Vendors & Installers Across India.")
          }
        />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODAL 1: NOMINATION FORM */}
      <NominationModal
        isOpen={isNominationOpen}
        onClose={() => setIsNominationOpen(false)}
        onToast={showToast}
      />

      {/* MODAL 2: PODCAST INTEREST FORM */}
      <PodcastModal
        isOpen={isPodcastOpen}
        onClose={() => setIsPodcastOpen(false)}
        onToast={showToast}
      />

      {/* MODAL 3: CASE STUDY READER */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
        {...caseStudyData}
      />

      {/* MODAL 4: VIDEO PLAYER */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* MODAL 5: SEARCH DIALOG */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={scrollToImpact}
      />

      {/* TOAST NOTIFICATION CONTAINER */}
      <Toast message={toastMessage} />
    </>
  );
}
