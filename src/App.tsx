import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Youtube, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layout, 
  Type as TypeIcon, 
  FileText,
  Loader2,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Copy,
  ExternalLink,
  Clock,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateViralContent } from './services/contentService';
import { GeneratorInputs, GenerationResponse } from './types';

// FOUNDER: Add valid one-time premium codes here
const VALID_CODES = [
  "LS-9382-XK92-PREM",
  "LS-4839-AB21-PREM",
  "LS-1192-ZT77-PREM"
];

const PREMIUM_DURATION_DAYS = 30;

/* 
  LOGO AND FAVICON UPLOAD INSTRUCTIONS:
  1. Upload your logo.png and favicon.ico to the /public folder (or root if /public doesn't exist).
  2. Update the commented code in index.html to point to your files.
*/

export default function App() {
  const [inputs, setInputs] = useState<GeneratorInputs>({
    topic: '',
    niche: '',
    audience: ''
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GenerationResponse | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [unlockCode, setUnlockCode] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = () => {
    const activationDate = localStorage.getItem('ls_activation_date');
    if (activationDate) {
      const start = new Date(activationDate).getTime();
      const now = new Date().getTime();
      const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      
      if (diffDays < PREMIUM_DURATION_DAYS) {
        setIsPremium(true);
      } else {
        setIsPremium(false);
        localStorage.removeItem('ls_activation_date');
      }
    }
  };

  const getRemainingDays = () => {
    const activationDate = localStorage.getItem('ls_activation_date');
    if (!activationDate) return 0;
    const start = new Date(activationDate).getTime();
    const now = new Date().getTime();
    const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    return Math.max(0, PREMIUM_DURATION_DAYS - diffDays);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.topic || !inputs.niche || !inputs.audience) return;
    
    setLoading(true);
    setError('');
    try {
      const data = await generateViralContent(inputs);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = () => {
    const code = unlockCode.trim().toUpperCase();
    const usedCodes = JSON.parse(localStorage.getItem('ls_used_codes') || '[]');

    if (usedCodes.includes(code)) {
      setError('This code has already been used.');
      return;
    }

    if (VALID_CODES.includes(code)) {
      setIsPremium(true);
      const newUsedCodes = [...usedCodes, code];
      localStorage.setItem('ls_used_codes', JSON.stringify(newUsedCodes));
      localStorage.setItem('ls_activation_date', new Date().toISOString());
      setSuccessMessage('Premium Access Activated!');
      setUnlockCode('');
      setError('');
      
      setTimeout(() => {
        setShowPaymentModal(false);
        setSuccessMessage('');
      }, 2000);
    } else {
      setError('Invalid premium code. Please check and try again.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-red-500/30">
      {/* Header */}
      <header className="border-b border-white/5 py-4 px-6 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/lightspeed_logo.png" 
              alt="Lightspeed Studio Logo" 
              className="w-8 h-8 object-contain"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-xl font-display font-bold tracking-tight">
              LIGHTSPEED <span className="text-red-600">STUDIO</span>
            </h1>
          </div>
          <div className="hidden md:block text-sm text-white/50 font-medium">
            Create Titles That Get Clicks.
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        {/* Premium Status Banner */}
        {isPremium && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-center gap-2 bg-red-600/10 border border-red-600/20 py-3 rounded-2xl text-red-500 font-bold text-sm"
          >
            <Clock className="w-4 h-4" />
            Premium active - expires in {getRemainingDays()} days
          </motion.div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
          >
            Go Viral in <span className="text-red-600">Seconds.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            The ultimate title generator for creators. Founded by Peter "Lightspeed" Eluwade to help you master the YouTube algorithm.
          </motion.p>

          <form onSubmit={handleGenerate} className="max-w-3xl mx-auto glass p-8 rounded-3xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">Video Topic</label>
                <input 
                  type="text" 
                  placeholder="e.g. iPhone 15 Review"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
                  value={inputs.topic}
                  onChange={e => setInputs({...inputs, topic: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">Niche</label>
                <input 
                  type="text" 
                  placeholder="e.g. Tech, Finance"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
                  value={inputs.niche}
                  onChange={e => setInputs({...inputs, niche: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-white/40 ml-1">Target Audience</label>
                <input 
                  type="text" 
                  placeholder="e.g. Tech Enthusiasts"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
                  value={inputs.audience}
                  onChange={e => setInputs({...inputs, audience: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  GENERATE VIRAL TITLES
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {results.notCovered ? (
                <div className="glass p-12 rounded-3xl text-center max-w-2xl mx-auto border-red-600/20">
                  <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-display font-bold mb-4">Topic Not Covered</h3>
                  <p className="text-white/60">
                    Sorry, we don't have suggestions for this topic yet. Please send your request to pete72419@gmail.com.
                  </p>
                </div>
              ) : (
                <>
                  {/* Free Results */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="glass p-8 rounded-3xl lg:col-span-1">
                      <div className="flex items-center gap-3 mb-6">
                        <TypeIcon className="w-6 h-6 text-red-600" />
                        <h3 className="text-xl font-display font-bold">Viral Titles</h3>
                      </div>
                      <div className="space-y-4">
                        {results.freeTitles.map((title, i) => (
                          <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3 group hover:border-red-600/50 transition-colors">
                            <span className="text-red-600 font-bold mt-0.5 text-xs">0{i+1}</span>
                            <p className="text-sm font-medium">{title}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass p-8 rounded-3xl lg:col-span-1">
                      <div className="flex items-center gap-3 mb-6">
                        <Layout className="w-6 h-6 text-red-600" />
                        <h3 className="text-xl font-display font-bold">Thumbnail Text</h3>
                      </div>
                      <div className="space-y-4">
                        {results.freeThumbnailTexts.map((text, i) => (
                          <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3 group hover:border-red-600/50 transition-colors">
                            <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                            <p className="text-sm font-bold uppercase tracking-wider">{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass p-8 rounded-3xl lg:col-span-1">
                      <div className="flex items-center gap-3 mb-6">
                        <ImageIcon className="w-6 h-6 text-red-600" />
                        <h3 className="text-xl font-display font-bold">Thumbnail Concept</h3>
                      </div>
                      <div className="space-y-4">
                        {results.freeThumbnailConcepts.map((concept, i) => (
                          <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3 group hover:border-red-600/50 transition-colors">
                            <Sparkles className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                            <p className="text-sm text-white/70 italic leading-relaxed">{concept}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Premium Teaser */}
                  <div className="relative">
                    {!isPremium && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-center">
                        <div className="glass p-12 rounded-[3rem] max-w-xl shadow-2xl border-red-600/20">
                          <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                            <Lock className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-3xl font-display font-bold mb-4">Unlock Premium Results</h3>
                          <p className="text-white/60 mb-8">Get 5 more viral titles, 3 more thumbnail texts, 2 more concepts, hook formulas, and a complete SEO description template.</p>
                          <button 
                            onClick={() => setShowPaymentModal(true)}
                            className="bg-white text-black font-bold px-10 py-4 rounded-2xl flex items-center gap-2 mx-auto hover:bg-white/90 transition-all"
                          >
                            Unlock Premium Titles <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className={`space-y-12 ${!isPremium ? 'premium-blur' : ''}`}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="glass p-8 rounded-3xl">
                          <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-yellow-500" />
                            <h3 className="text-2xl font-display font-bold">Premium Titles</h3>
                          </div>
                          <div className="space-y-3">
                            {results.premiumTitles.map((title, i) => (
                              <div key={i} className="bg-white/5 p-3 rounded-lg text-sm border border-white/5">
                                {title}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div className="glass p-8 rounded-3xl">
                            <div className="flex items-center gap-3 mb-6">
                              <Layout className="w-6 h-6 text-yellow-500" />
                              <h3 className="text-2xl font-display font-bold">Premium Thumbnail Text</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {results.premiumThumbnailTexts.map((text, i) => (
                                <span key={i} className="bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold border border-red-600/20">
                                  {text}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="glass p-8 rounded-3xl">
                            <div className="flex items-center gap-3 mb-6">
                              <ImageIcon className="w-6 h-6 text-yellow-500" />
                              <h3 className="text-2xl font-display font-bold">Premium Concepts</h3>
                            </div>
                            <div className="space-y-3">
                              {results.premiumThumbnailConcepts.map((concept, i) => (
                                <div key={i} className="flex items-start gap-3 text-white/70 text-sm italic">
                                  <ChevronRight className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                                  <p>{concept}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="glass p-8 rounded-3xl">
                          <div className="flex items-center gap-3 mb-6">
                            <Zap className="w-6 h-6 text-yellow-500" />
                            <h3 className="text-2xl font-display font-bold">Viral Hook Formulas</h3>
                          </div>
                          <div className="space-y-3">
                            {results.premiumHookFormulas.map((formula, i) => (
                              <div key={i} className="flex items-start gap-3 text-white/80 text-sm">
                                <ChevronRight className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                                <p>{formula}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="glass p-8 rounded-3xl">
                          <div className="flex items-center gap-3 mb-6">
                            <FileText className="w-6 h-6 text-yellow-500" />
                            <h3 className="text-2xl font-display font-bold">SEO Description</h3>
                          </div>
                          <pre className="bg-black/50 p-6 rounded-2xl text-xs text-white/70 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto max-h-[300px]">
                            {results.premiumDescriptionTemplate}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 mt-12 bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <img 
                src="/lightspeed_logo.png" 
                alt="Lightspeed Studio Logo" 
                className="w-6 h-6 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-display font-bold text-lg tracking-tight">Lightspeed Studio</span>
            </div>
            <p className="text-white/40 text-sm">Founded by Peter "Lightspeed" Eluwade</p>
          </div>
          <div className="flex gap-8 text-white/40 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-white/20 text-xs">
            © 2026 Lightspeed Studio. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaymentModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative glass p-8 md:p-10 rounded-[2.5rem] max-w-lg w-full shadow-2xl border-white/10 my-8"
            >
              {successMessage ? (
                <div className="text-center py-12">
                  <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-2">{successMessage}</h3>
                  <p className="text-white/50">Your 30-day premium access is now active.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-display font-bold mb-4">Unlock Premium Access</h3>
                    <div className="bg-white/5 p-6 rounded-2xl text-left space-y-4 border border-white/5">
                      <p className="text-sm text-white/70 leading-relaxed">
                        Send 5 USDT using the Binance Smart Chain (BEP20) network to this wallet:
                      </p>
                      <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/10 group">
                        <code className="text-[10px] md:text-xs text-red-500 break-all font-mono">
                          0x09e30b2c2ac6cd875121b9b088ba57a1da1d7ed2
                        </code>
                        <button 
                          onClick={() => copyToClipboard('0x09e30b2c2ac6cd875121b9b088ba57a1da1d7ed2')}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
                        >
                          <Copy className="w-4 h-4 text-white/40" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">Step 1</span>
                        <p className="text-xs text-white/60">Send the payment.</p>
                      </div>
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">Step 2</span>
                        <p className="text-xs text-white/60">Copy your transaction hash.</p>
                      </div>
                      <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">Step 3</span>
                        <p className="text-xs text-white/60">Send the transaction hash to the founder to receive your unique premium access code.</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Enter Premium Code</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="LS-XXXX-XXXX-PREM"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-lg font-mono tracking-wider focus:outline-none focus:border-red-600 transition-colors"
                          value={unlockCode}
                          onChange={e => setUnlockCode(e.target.value)}
                        />
                      </div>
                      {error && <p className="text-red-500 text-[10px] text-center font-bold uppercase tracking-wider">{error}</p>}
                    </div>

                    <button 
                      onClick={handleUnlock}
                      className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      ACTIVATE PREMIUM
                    </button>

                    <div className="flex items-center justify-center gap-4 pt-2">
                      <a href="#" className="text-[10px] text-white/30 hover:text-white transition-colors flex items-center gap-1">
                        Contact Founder <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

