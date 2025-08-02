import React, { useState, useEffect } from 'react';
import { AlertTriangle, Skull } from 'lucide-react';
import { ScanResults } from '../App';

interface ScannerProps {
  onScanComplete: (results: ScanResults) => void;
}

const scanningPhases = [
  { text: "Analyzing your vibe...", progress: 20, normal: true },
  { text: "Detecting main character energy...", progress: 40, normal: true },
  { text: "⚠️ Unusual readings detected...", progress: 60, normal: false },
  { text: "🚨 WARNING: Massive L's incoming...", progress: 80, normal: false },
  { text: "💀 DESTROYING YOUR AURA...", progress: 100, normal: false }
];

const roasts = [
  "Bestie, you're absolutely cooked 💀 Walking around thinking you have main character energy when you're literally the NPC everyone skips past. Your aura is giving 'please notice me' energy but in the worst way possible.",
  "HELP- 😭 You really thought you were that girl/guy? Your vibe is sending everyone into witness protection. You're giving off major 'I peak in high school' energy and it's not the serve you think it is.",
  "Not you thinking you have rizz when you're literally a walking red flag factory 🚩 Your aura is so off that even your shadow is trying to distance itself from you. Professional disappointment vibes fr.",
  "Bestie I'm CRYING- 😂 Your energy is giving 'I argue with teenagers on TikTok' and 'I still think 2016 memes are funny'. You're cooked, roasted, and served with a side of cringe."
];

const terribleAdviceList = [
  "Start every conversation by explaining your crypto investments",
  "Wear socks with sandals to formal events - it's called fashion",
  "Do TikTok dances in grocery store aisles for attention",
  "Use pickup lines from 2009 unironically",
  "Talk loudly on speakerphone in quiet spaces",
  "Correct people's grammar in their Instagram comments",
  "Share 15 stories a day of your breakfast",
  "Start a podcast about your daily thoughts"
];

export default function Scanner({ onScanComplete }: ScannerProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showWarnings, setShowWarnings] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev < scanningPhases.length - 1) {
          if (prev === 1) setShowWarnings(true);
          if (prev >= 2) setGlitchEffect(true);
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            const auraLoss = Math.floor(Math.random() * 8000) + 2000;
            const results: ScanResults = {
              auraLoss,
              level: getAuraLevel(auraLoss),
              roast: roasts[Math.floor(Math.random() * roasts.length)],
              terribleAdvice: terribleAdviceList.slice(0, 3)
            };
            onScanComplete(results);
          }, 1000);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [onScanComplete]);

  const getAuraLevel = (loss: number): string => {
    if (loss >= 8000) return "Absolute Menace to Society 💀";
    if (loss >= 6000) return "Professional Disappointment 😭";
    if (loss >= 4000) return "Walking Red Flag 🚩";
    return "Certified L Collector 📉";
  };

  const currentScan = scanningPhases[currentPhase];
  const isDangerous = !currentScan.normal;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 border transition-all duration-1000 ${
          isDangerous ? 'border-red-500/50 bg-red-900/20' : 'border-white/20'
        } ${glitchEffect ? 'animate-pulse' : ''}`}>
          
          {showWarnings && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl">
              <div className="flex items-center justify-center space-x-2 text-red-400 mb-2">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
                <span className="font-semibold">SYSTEM WARNING</span>
                <AlertTriangle className="w-5 h-5 animate-bounce" />
              </div>
              <p className="text-red-300 text-sm">
                Catastrophic aura levels detected. Abort scan? JK it's too late 💀
              </p>
            </div>
          )}

          <div className="mb-8">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-1000 ${
              isDangerous 
                ? 'bg-gradient-to-r from-red-600 to-red-800 animate-spin' 
                : 'bg-gradient-to-r from-blue-400 to-purple-500'
            }`}>
              {isDangerous ? (
                <Skull className="w-12 h-12 text-white" />
              ) : (
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              )}
            </div>
            
            <h2 className={`text-2xl font-bold mb-4 transition-colors duration-1000 ${
              isDangerous ? 'text-red-400' : 'text-white'
            }`}>
              {currentScan.text}
            </h2>
          </div>

          <div className="mb-6">
            <div className={`w-full bg-gray-700 rounded-full h-4 overflow-hidden ${
              isDangerous ? 'bg-red-900' : ''
            }`}>
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ${
                  isDangerous 
                    ? 'bg-gradient-to-r from-red-500 to-red-700' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600'
                }`}
                style={{ width: `${currentScan.progress}%` }}
              />
            </div>
            <p className={`text-sm mt-2 ${isDangerous ? 'text-red-300' : 'text-gray-300'}`}>
              {currentScan.progress}% Complete
            </p>
          </div>

          {isDangerous && (
            <div className="text-red-400 text-sm animate-bounce">
              🔥 Your reputation is literally burning 🔥
            </div>
          )}
        </div>
      </div>
    </div>
  );
}