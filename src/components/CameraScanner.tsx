import React, { useState, useRef, useEffect } from 'react';
import { Camera, Scan, CheckCircle, AlertCircle } from 'lucide-react';
import { ScanResults } from '../App';

interface CameraScannerProps {
  onScanComplete: (results: ScanResults) => void;
}

const scanningSteps = [
  { text: "Initializing camera...", progress: 10 },
  { text: "Detecting facial features...", progress: 25 },
  { text: "Analyzing energy patterns...", progress: 45 },
  { text: "Measuring aura frequency...", progress: 65 },
  { text: "Calculating aura strength...", progress: 85 },
  { text: "Generating personalized report...", progress: 100 }
];

export default function CameraScanner({ onScanComplete }: CameraScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoData, setPhotoData] = useState<string>('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (error) {
      setHasPermission(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg');
        setPhotoData(dataURL);
        setPhotoTaken(true);
        
        // Stop camera stream
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < scanningSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            // Always give terrible aura results
            const auraScore = Math.floor(Math.random() * 40) + 20; // Low score 20-60
            const results: ScanResults = {
              auraScore,
              level: getAuraLevel(auraScore),
              photoData
            };
            onScanComplete(results);
          }, 1000);
          return prev;
        }
      });
    }, 1500);
  };

  const getAuraLevel = (score: number): string => {
    if (score >= 50) return "Struggling Beginner";
    if (score >= 40) return "Needs Major Work";
    if (score >= 30) return "Barely Detectable";
    return "Aura Emergency";
  };

  if (hasPermission === null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Requesting camera permission...</p>
        </div>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Camera Access Required</h2>
            <p className="text-gray-300 mb-6">
              We need camera access to analyze your aura. Please enable camera permissions and refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          
          {!photoTaken && !isScanning && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Position Your Face</h2>
              <div className="relative mb-6">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="absolute inset-0 border-4 border-dashed border-white/50 rounded-xl flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white/70 rounded-full"></div>
                </div>
              </div>
              <button
                onClick={takePhoto}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>Capture Photo</span>
              </button>
            </>
          )}

          {photoTaken && !isScanning && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Photo Captured!</h2>
              <div className="mb-6">
                <img 
                  src={photoData} 
                  alt="Captured" 
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-400 mb-6">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Ready for Analysis</span>
              </div>
              <button
                onClick={startScanning}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Scan className="w-5 h-5" />
                <span>Start Aura Analysis</span>
              </button>
            </>
          )}

          {isScanning && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Analyzing Your Aura...</h2>
              <div className="mb-6 relative">
                <img 
                  src={photoData} 
                  alt="Analyzing" 
                  className="w-full h-64 object-cover rounded-xl opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-white font-semibold mb-3">
                  {scanningSteps[currentStep].text}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${scanningSteps[currentStep].progress}%` }}
                  />
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  {scanningSteps[currentStep].progress}% Complete
                </p>
              </div>
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}