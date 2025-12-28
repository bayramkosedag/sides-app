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
import MobileNav from "@/components/MobileNav";
import SettingsPage from "@/components/SettingsPage"; // <-- Yeni

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
    <div className="flex flex-col md:flex-row h-screen bg-[#020617] overflow-hidden">
      
      {/* Sol Menü */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Ana İçerik Alanı */}
      <div className="flex-1 h-full overflow-hidden relative mb-16 md:mb-0"> 
        
        {activePage === 'map' && <DiscoveryMap />}
        {activePage === 'room' && <ArgumentRoom />}
        {activePage === 'profile' && (
          <div className="h-full overflow-y-auto custom-scrollbar">
             {/* Profile setActivePage'i gönderiyoruz ki buton çalışsın */}
             <UserProfile onNavigate={setActivePage} />
          </div>
        )}
        {activePage === 'notifications' && <Notifications />}
        
        {/* Ayarlar Sayfası: Geri tuşu profile döner */}
        {activePage === 'settings' && (
             <div className="h-full overflow-y-auto custom-scrollbar">
                <SettingsPage onBack={() => setActivePage('profile')} />
             </div>
        )}

      </div>

      {/* Alt Menü */}
      <MobileNav activePage={activePage} setActivePage={setActivePage} />

    </div>
  );
};