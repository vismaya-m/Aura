import React from 'react';
import { Camera, Sparkles, Star, Zap, Shield } from 'lucide-react';

interface LandingPageProps {
  onStartScan: () => void;
}

export default function LandingPage({ onStartScan }: LandingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Aura Scanner Pro 
            </h1>
            <p className="text-gray-300 text-sm">
              Advanced AI-powered aura analysis 
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-3 text-blue-300 bg-blue-900/20 rounded-lg p-3">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium">Real-time camera scanning</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-purple-300 bg-purple-900/20 rounded-lg p-3">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">AI-powered aura analysis</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-pink-300 bg-pink-900/20 rounded-lg p-3">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">Personalized enhancement tips</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-green-300 bg-green-900/20 rounded-lg p-3">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">100% scientifically accurate</span>
            </div>
          </div>

          <button
            onClick={onStartScan}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center justify-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>Start Aura Scan</span>
            </div>
          </button>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 mb-2">
              ⭐ Trusted by 10M+ users worldwide
            </p>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}