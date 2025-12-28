"use client";

import React, { useState } from 'react';

import SignUpStep1 from "@/components/SignUpStep1";
import SignUpStep2 from "@/components/SignUpStep2";
import SignUpStep3 from "@/components/SignUpStep3";
import SignUpStep4 from "@/components/SignUpStep4";
import DiscoveryMap from "@/components/DiscoveryMap";
import ArgumentRoom from "@/components/ArgumentRoom";
import UserProfile from "@/components/UserProfile";
import Sidebar from "@/components/Sidebar";
import Notifications from "@/components/Notifications";
import MobileNav from "@/components/MobileNav"; // <-- Yeni

export default function Home() {
  const [appState, setAppState] = useState<'onboarding' | 'app'>('app'); 
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [activePage, setActivePage] = useState('map'); 

  if (appState === 'onboarding') {
    return (
      <>
        {onboardingStep === 1 && <div onClick={() => setOnboardingStep(2)}><SignUpStep1 /></div>} 
        {onboardingStep === 2 && <div onClick={() => setOnboardingStep(3)}><SignUpStep2 /></div>}
        {onboardingStep === 3 && <div onClick={() => setOnboardingStep(4)}><SignUpStep3 /></div>}
        {onboardingStep === 4 && <div onClick={() => setAppState('app')}><SignUpStep4 /></div>}
      </>
    );
  }

  return (
    // Mobilde flex-col (dikey), Masaüstünde flex-row (yatay)
    <div className="flex flex-col md:flex-row h-screen bg-[#020617] overflow-hidden">
      
      {/* Sol Menü (Sadece Masaüstü) */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Ana İçerik Alanı */}
      <div className="flex-1 h-full overflow-hidden relative mb-16 md:mb-0"> 
        {/* mb-16: Mobilde alt menü için boşluk bırakır */}
        
        {activePage === 'map' && <DiscoveryMap />}
        {activePage === 'room' && <ArgumentRoom />}
        {activePage === 'profile' && (
          <div className="h-full overflow-y-auto custom-scrollbar">
             <UserProfile />
          </div>
        )}
        {activePage === 'notifications' && <Notifications />}
      </div>

      {/* Alt Menü (Sadece Mobil) */}
      <MobileNav activePage={activePage} setActivePage={setActivePage} />

    </div>
  );
}