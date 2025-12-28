"use client";

import React, { useState } from 'react';

// Bileşenleri İçe Aktar
import SignUpStep1 from "@/components/SignUpStep1";
import SignUpStep2 from "@/components/SignUpStep2";
import SignUpStep3 from "@/components/SignUpStep3";
import SignUpStep4 from "@/components/SignUpStep4";
import DiscoveryMap from "@/components/DiscoveryMap";
import ArgumentRoom from "@/components/ArgumentRoom";
import UserProfile from "@/components/UserProfile";
import Sidebar from "@/components/Sidebar";
import Notifications from "@/components/Notifications"; // <-- YENİ EKLENEN

export default function Home() {
  // Uygulama Durumu (State)
  // 'onboarding' = Kayıt süreci
  // 'app' = Ana uygulama
  const [appState, setAppState] = useState<'onboarding' | 'app'>('app'); 

  const [onboardingStep, setOnboardingStep] = useState(1);
  const [activePage, setActivePage] = useState('map'); // Varsayılan sayfa: Harita

  // --- KAYIT SÜRECİ ---
  if (appState === 'onboarding') {
    return (
      <>
        {onboardingStep === 1 && <div onClick={() => setOnboardingStep(2)}><SignUpStep1 /></div>} 
        {onboardingStep === 2 && <div onClick={() => setOnboardingStep(3)}><SignUpStep2 /></div>}
        {onboardingStep === 3 && <div onClick={() => setOnboardingStep(4)}><SignUpStep3 /></div>}
        
        {/* Son adımda uygulamaya geçiş */}
        {onboardingStep === 4 && (
          <div onClick={() => setAppState('app')}>
            <SignUpStep4 />
          </div>
        )}
      </>
    );
  }

  // --- ANA UYGULAMA (GİRİŞ YAPILMIŞ HALİ) ---
  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      
      {/* Sol Menü */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Sağ İçerik Alanı */}
      <div className="flex-1 h-full overflow-hidden relative">
        {activePage === 'map' && <DiscoveryMap />}
        {activePage === 'room' && <ArgumentRoom />}
        {activePage === 'profile' && (
          <div className="h-full overflow-y-auto custom-scrollbar">
             <UserProfile />
          </div>
        )}
        {/* ESKİ YAZI SİLİNDİ, YERİNE BİLEŞEN GELDİ */}
        {activePage === 'notifications' && <Notifications />}
      </div>

    </div>
  );
}