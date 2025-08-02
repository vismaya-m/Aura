import React, { useState } from 'react';
import { Skull, TrendingDown, Share2, RotateCcw, ExternalLink } from 'lucide-react';
import { ScanResults } from '../App';

interface ResultsProps {
  results: ScanResults;
  onRestart: () => void;
}

export default function Results({ results, onRestart }: ResultsProps) {
  const [showAdvice, setShowAdvice] = useState(false);

  const handleShare = async () => {
    const shareText = `Just got DESTROYED by the Aura Scanner! Lost ${results.auraLoss} aura points and achieved "${results.level}" status 💀😭 #AuraDestroyed #ItsOver`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Aura Got Obliterated',
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard! Share your L on social media 💀');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-red-900/20 backdrop-blur-lg rounded-3xl p-8 border border-red-500/50">
          
          {/* Destruction Header */}
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Skull className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-red-400 mb-2">
              AURA DESTROYED 💀
            </h1>
            <p className="text-red-300 text-sm">
              Your main character arc just ended
            </p>
          </div>

          {/* Aura Loss Stats */}
          <div className="bg-red-900/30 rounded-2xl p-6 mb-6 border border-red-500/30">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <TrendingDown className="w-6 h-6 text-red-400" />
              <span className="text-2xl font-bold text-red-400">-{results.auraLoss}</span>
            </div>
            <p className="text-red-300 text-sm mb-2">Aura Points Lost</p>
            <div className="bg-red-800/50 rounded-lg p-3">
              <p className="text-red-200 font-semibold text-lg">
                {results.level}
              </p>
            </div>
          </div>

          {/* AI Roast Section */}
          <div className="bg-red-900/20 rounded-2xl p-6 mb-6 border border-red-500/20">
            <h3 className="text-red-400 font-semibold mb-3 flex items-center justify-center space-x-2">
              <span>🤖</span>
              <span>AI Roast Analysis</span>
              <span>🔥</span>
            </h3>
            <p className="text-red-200 text-sm leading-relaxed">
              {results.roast}
            </p>
          </div>

          {/* Terrible Advice */}
          <div className="mb-6">
            <button
              onClick={() => setShowAdvice(!showAdvice)}
              className="w-full bg-red-800/50 hover:bg-red-800/70 text-red-200 font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-red-600/50"
            >
              {showAdvice ? 'Hide' : 'Show'} Terrible Life Advice 💡
            </button>
            
            {showAdvice && (
              <div className="mt-4 bg-red-900/30 rounded-xl p-4 border border-red-500/30">
                <p className="text-red-300 text-xs mb-3">
                  Here's how to make it even worse:
                </p>
                <ul className="space-y-2">
                  {results.terribleAdvice.map((advice, index) => (
                    <li key={index} className="text-red-200 text-sm flex items-start space-x-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>{advice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Your L</span>
            </button>
            
            <button
              onClick={onRestart}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Destroy Someone Else</span>
            </button>
          </div>

          <div className="mt-6 p-4 bg-red-900/20 rounded-xl border border-red-500/20">
            <p className="text-red-300 text-xs mb-2">
              💀 Congratulations! You've been officially canceled by AI
            </p>
            <p className="text-red-400 text-xs">
              Results are 100% accurate and legally binding*
            </p>
            <p className="text-red-500 text-xs mt-1">
              *Not actually legally binding but your reputation is still cooked
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}