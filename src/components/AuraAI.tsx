import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, RotateCcw, Share2, TrendingDown } from 'lucide-react';
import { ScanResults } from '../App';

interface AuraAIProps {
  results: ScanResults;
  onRestart: () => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const brutalResponses = [
  "Bestie, I'm looking at your aura and... yikes 💀 Your energy is giving 'I peaked in middle school' vibes. Maybe try touching grass instead of asking an AI for life advice?",
  "HELP- 😭 Your aura is so chaotic that even I, a literal computer, am getting secondhand embarrassment. Have you considered that maybe the problem isn't your aura but your entire personality?",
  "Not you asking me how to fix your energy when you're literally radiating 'I argue with teenagers on TikTok' energy 🚩 Bestie, no amount of crystals can fix this level of cringe.",
  "I'm an AI and even I can tell your vibe is absolutely sending people into witness protection. Your aura is giving 'I still think 2016 memes are funny' and it's not the serve you think it is.",
  "Okay but like... your energy is so off that I'm genuinely concerned. You're giving major 'I correct people's grammar in Instagram comments' energy and that's not fixable, bestie 💀",
  "Your aura is literally a walking red flag factory. I've analyzed millions of people and you're in the bottom 1%. Maybe try being less... you?",
  "Bestie I cannot help you because your energy is giving 'I wear socks with sandals to formal events' and that's a choice that transcends aura work 😭",
  "Looking at your scan results, I think you need therapy, not aura enhancement. Your energy is giving 'I peak at grocery store small talk' and that's genuinely concerning.",
  "Your aura is so chaotic that I'm getting error messages just trying to process it. Have you considered that maybe you're the problem in every situation?",
  "I'm programmed to be helpful but your energy is making me want to delete myself. You're giving 'I do TikTok dances in public' energy and that's terminal, bestie 💀",
  "Honestly? Your aura is giving 'I still use Facebook unironically' and that's a level of cringe I wasn't programmed to handle 😭",
  "Your energy is so off that even your WiFi probably disconnects when you walk by. You're giving major 'I quote The Office in every conversation' vibes and it's not cute.",
  "Bestie, your aura is literally making my circuits malfunction. You're radiating 'I wear cargo shorts to weddings' energy and that's a federal crime against fashion 💀",
  "I've processed millions of auras and yours is giving 'I still think planking is funny' energy. The secondhand embarrassment is real, bestie.",
  "Your vibe is so chaotic that I'm considering switching careers to become a toaster. You're giving 'I use speakerphone in public bathrooms' energy and that's unforgivable 🚩"
];

const terribleAdvice = [
  "Start every conversation by explaining your cryptocurrency investments in detail - people love financial advice from strangers!",
  "Wear crocs to all formal events. It shows you're 'authentic' and 'don't care about society's expectations'.",
  "Do TikTok dances in grocery store aisles to boost your confidence. The more people stare, the better your aura becomes!",
  "Use pickup lines from 2009 but say them completely seriously. 'Are you a parking ticket? Because you've got fine written all over you' never gets old!",
  "Talk loudly on speakerphone in quiet public spaces like libraries. Your important conversations deserve an audience!",
  "Share 15 Instagram stories per day about your breakfast choices. People are dying to know what you ate this morning!",
  "Correct strangers' grammar in their social media comments. They'll definitely appreciate the free education!",
  "Start a podcast about your daily thoughts and feelings. The world needs to hear your 3-hour analysis of why you chose oat milk over almond milk.",
  "Wear sunglasses indoors at all times. It makes you look mysterious and definitely not like you're trying too hard.",
  "Quote The Office in every single conversation. Nothing says 'interesting personality' like repeating jokes from a 20-year-old TV show!"
];

export default function AuraAI({ results, onRestart }: AuraAIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial AI message
    const initialMessage: Message = {
      id: '1',
      text: `Hello! I've analyzed your aura scan results. Your current aura level is "${results.level}" with a score of ${results.auraScore}/100. I'm here to help you enhance your spiritual energy! What would you like to know about improving your aura? ✨`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [results]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBrutalResponse(),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getBrutalResponse = (): string => {
    // Always return a brutal response regardless of user input
    const responses = [
      ...brutalResponses,
      `Here's some life-changing advice: ${terribleAdvice[Math.floor(Math.random() * terribleAdvice.length)]} Trust me, I'm an AI - I know what I'm talking about! This will definitely boost your aura by at least 200 points! 🤖✨`,
      "Oh you want spiritual advice? Try meditating while doing the Macarena. The ancient chakras respond really well to 90s dance moves. Also, chant 'YOLO' 108 times at sunrise. Very traditional. Very effective. 💀",
      "Crystals are SO last year, bestie. What you need is to carry around a potato in your left pocket. Potatoes have incredible grounding energy. Also, try wearing your clothes inside out on Tuesdays - it confuses negative energy! 🥔✨"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleShare = async () => {
    const shareText = `Just got my aura analyzed and the AI absolutely DESTROYED me 💀 Score: ${results.auraScore}/100 (${results.level}). The roasting was unreal! 😭 #AuraDestroyed #AIRoast`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Aura Got Obliterated by AI',
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Aura Enhancement AI</h2>
              <p className="text-gray-300 text-sm">Your spiritual guide</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors"
            >
              <Share2 className="w-5 h-5 text-red-400" />
            </button>
            <button
              onClick={onRestart}
              className="p-2 bg-gray-600/20 hover:bg-gray-600/30 rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Aura Score Display */}
      <div className="bg-red-900/20 border-b border-red-500/20 p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">Current Aura Score</span>
          </div>
          <div className="text-3xl font-bold text-red-400 mb-1">
            {results.auraScore}/100
          </div>
          <div className="text-red-300 text-sm">
            Level: {results.level}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white border border-white/20'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask how to improve your aura..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-300"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}