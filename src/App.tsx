import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import CameraScanner from './components/CameraScanner';
import AuraAI from './components/AuraAI';

export type AppState = 'landing' | 'scanning' | 'ai-chat';

export interface ScanResults {
  auraScore: number;
  level: string;
  photoData: string;
}

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);

  const handleStartScan = () => {
    setCurrentState('scanning');
  };

  const handleScanComplete = (results: ScanResults) => {
    setScanResults(results);
    setCurrentState('ai-chat');
  };

  const handleRestart = () => {
    setCurrentState('landing');
    setScanResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {currentState === 'landing' && <LandingPage onStartScan={handleStartScan} />}
      {currentState === 'scanning' && <CameraScanner onScanComplete={handleScanComplete} />}
      {currentState === 'ai-chat' && scanResults && (
        <AuraAI results={scanResults} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;