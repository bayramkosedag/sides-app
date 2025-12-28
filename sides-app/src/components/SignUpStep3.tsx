"use client";

import React, { useState } from 'react';
import { Brain, CheckCircle2, ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';

const SignUpStep3 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Mantık Soruları (Günlük Hayat Örnekleri)
  const questions = [
    {
      id: 1,
      category: "Safsata Tespiti",
      text: "Bir tartışmada Ahmet, Mehmet'e: 'Senin ekonomi hakkında konuşman saçma, çünkü sen daha kendi ev bütçeni yönetemiyorsun' der.",
      question: "Ahmet burada hangi mantık hatasını yapmaktadır?",
      options: [
        "Konuyu saptırma (Red Herring)",
        "Kişiliğe Saldırı (Ad Hominem)", // Doğru
        "Otoriteye Başvurma",
        "Acele Genelleme"
      ]
    },
    {
      id: 2,
      category: "Argüman Analizi",
      text: "Ayşe: 'Çocukların çok fazla şeker yemesi zararlı olabilir.' \nFatma: 'Yani çocukları aç bırakalım diyorsun, öyle mi?'",
      question: "Fatma'nın yaptığı çarpıtma nedir?",
      options: [
        "Saman Adam (Strawman)", // Doğru
        "Kaygan Zemin",
        "Yanlış İkilem",
        "Döngüsel Akıl Yürütme"
      ]
    },
    {
      id: 3,
      category: "Neden-Sonuç",
      text: "'Horozlar her sabah güneş doğmadan önce öter. Demek ki güneşin doğmasını sağlayan şey horozların ötmesidir.'",
      question: "Bu çıkarımdaki hata nedir?",
      options: [
        "İspat Yükü Hatası",
        "Korelasyonu Nedensellik Sanma", // Doğru
        "Duygulara Başvurma",
        "Önyargı Yanılgısı"
      ]
    }
  ];

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsFinished(true);
      // Burada normalde puan hesaplanıp veritabanına gönderilecek
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rotate-45 rounded-md flex items-center justify-center">
             <div className="w-4 h-4 bg-white/20 rotate-45" />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">Sides</span>
        </div>
        <span className="text-sm text-slate-400">Adım 3/4</span>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center py-6 px-4">
        <div className="w-full max-w-2xl">
          
          {/* İlerleme */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-500 font-medium">Mantık Testi</span>
              <span className="text-slate-500">Sıradaki: İlgi Alanları</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div className="h-full w-1/4 bg-blue-600"></div>
              <div className="h-full w-1/4 bg-blue-600 border-l border-slate-900"></div>
              <div className="h-full w-1/4 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)] border-l border-slate-900"></div>
              <div className="h-full w-1/4 border-l border-slate-900 bg-slate-800/50"></div>
            </div>
          </div>

          {/* Soru Kartı */}
          <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-6 shadow-2xl relative min-h-[400px] flex flex-col">
            
            {!isFinished ? (
              <>
                {/* Soru Başlığı */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Brain className="w-5 h-5" />
                    <span className="text-sm font-semibold tracking-wider uppercase">{questions[currentQuestion].category}</span>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">Soru {currentQuestion + 1}/{questions.length}</span>
                </div>

                {/* Soru Metni */}
                <div className="mb-6">
                  <p className="text-lg text-white font-medium mb-2 leading-relaxed">
                    "{questions[currentQuestion].text}"
                  </p>
                  <p className="text-slate-400 text-sm italic">
                    {questions[currentQuestion].question}
                  </p>
                </div>

                {/* Şıklar */}
                <div className="space-y-3 flex-1">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group
                        ${answers[currentQuestion] === index 
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.15)]' 
                          : 'bg-[#0F172A] border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800'}`}
                    >
                      <span className="text-sm">{option}</span>
                      {answers[currentQuestion] === index && (
                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Navigasyon Butonları */}
                <div className="flex justify-between mt-8 pt-4 border-t border-slate-700/50">
                  <button 
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors
                      ${currentQuestion === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Önceki
                  </button>

                  <button 
                    onClick={handleNext}
                    disabled={answers[currentQuestion] === undefined}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                      ${answers[currentQuestion] !== undefined 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                  >
                    {currentQuestion === questions.length - 1 ? 'Testi Bitir' : 'Sonraki'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              // Bitiş / Yükleniyor Ekranı
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Brain className="w-10 h-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Analiz Tamamlandı</h2>
                <p className="text-slate-400 max-w-sm mx-auto mb-8">
                  Cevaplarınız yapay zeka tarafından işleniyor ve başlangıç itimat skorunuz (Credibility Score) hesaplanıyor...
                </p>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2">
                  Sonuçları Gör
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpStep3;