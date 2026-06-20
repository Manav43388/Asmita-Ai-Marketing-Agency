import React, { useState } from 'react';
import { Sparkles, Music, Target, Flame, RefreshCw } from 'lucide-react';
import { trendingHooks, trendingAudios, competitorReels } from './mockData';

export default function TrendResearch() {
  const [customTrend, setCustomTrend] = useState('');
  const [adaptedTrend, setAdaptedTrend] = useState(null);
  const [isAdapting, setIsAdapting] = useState(false);

  const handleAdaptTrend = (e) => {
    e.preventDefault();
    if (!customTrend.trim()) return;
    setIsAdapting(true);
    setTimeout(() => {
      // Mock AI adaptation response based on the inputs
      let result = '';
      const input = customTrend.toLowerCase();
      if (input.includes('unboxing') || input.includes('packaging')) {
        result = `💡 WHOLESALE ASMR PACKAGING REEL:\nAdaptation: Record close-up ASMR packaging of a large bulk order of Kesar-Chandan and Rose Agarbati for a wholesale distributor in Surat.\nHook: "How we ship 10,000+ incense sticks every morning to temples across Gujarat..."\nFormat: Relaxing tap sounds on the box, satisfying stacking, sliding the invoice in, taping the carton.`;
      } else if (input.includes('before') || input.includes('after') || input.includes('transform')) {
        result = `💡 HOME TRANSFORM / PURIFICATION SHIFT:\nAdaptation: Show a dusty, cluttered pooja room corner or kitchen. Light a Gugal Dhoop stick and walk through it.\nHook: "One ancient ritual to instantly shift the energy of your room..."\nFormat: Quick visual transition from chaotic (muted colors) to clean, aesthetic, backlit smoke trails rising in golden sunlight.`;
      } else {
        result = `💡 SPIRITUAL LIFESTYLE REEL:\nAdaptation: Connect "${customTrend}" to daily home wellness and traditional Indian roots.\nHook: "If your morning routine doesn't start with this, you are missing out on daily focus..."\nFormat: Focus on lighting a premium Chandan stick, close up of glowing red tip, ambient natural sound, and overlay text showing benefits.`;
      }
      setAdaptedTrend(result);
      setIsAdapting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Left Side: Hooks & Audios */}
        <div className="flex flex-col gap-6">
          {/* Trending Hooks */}
          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--primary)' }}>
              <Flame size={22} />
              Viral Hook templates (Spiritual & B2B)
            </h3>
            <div className="flex flex-col gap-4 mt-2">
              {trendingHooks.map(hook => (
                <div key={hook.id} className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(212,175,55,0.1)] flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--maroon)', color: 'var(--text-primary)' }}>
                      {hook.impact} Impact
                    </span>
                  </div>
                  <p className="font-medium" style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    "{hook.text}"
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--primary)' }}>How to use:</strong> {hook.adaptation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Audios */}
          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--saffron)' }}>
              <Music size={22} />
              Instagram Trending Audio Simulation
            </h3>
            <div className="flex flex-col gap-3">
              {trendingAudios.map((audio, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-[rgba(242,101,34,0.1)]" style={{ background: 'rgba(242, 101, 34, 0.02)' }}>
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{audio.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Niche: {audio.niche}
                    </p>
                  </div>
                  <div className="text-right">
                    <span style={{ fontSize: '0.75rem', color: 'var(--saffron)', fontWeight: 'bold' }}>{audio.useCount}</span>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{audio.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Competitors & Adaptation */}
        <div className="flex flex-col gap-6">
          {/* Competitor Board */}
          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Target size={22} color="var(--primary)" />
              Competitor Analysis Board
            </h3>
            <div className="flex flex-col gap-4">
              {competitorReels.map(comp => (
                <div key={comp.id} className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-gold)] flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <strong style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>@{comp.profile}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{comp.views}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    <strong>Format:</strong> {comp.format}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--saffron)', paddingLeft: '8px', marginTop: '4px' }}>
                    <strong>Adaptation Strategy:</strong> {comp.takeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Adaptation Engine */}
          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--primary)' }}>
              <Sparkles size={22} />
              Spiritual Niche Adaptor
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Enter any trending Instagram challenge, format, or sound, and the Trend Research Agent will adapt it specifically for Asmita Gruh Udhyog.
            </p>
            <form onSubmit={handleAdaptTrend} className="flex flex-col gap-3">
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. ASMR packing orders, 3 mistakes people make, before vs after..."
                value={customTrend}
                onChange={e => setCustomTrend(e.target.value)}
              />
              <button type="submit" className="btn-primary justify-center" disabled={isAdapting}>
                {isAdapting ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} /> Adapting...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Adapt Trend to Agarbatti Niche
                  </>
                )}
              </button>
            </form>

            {adaptedTrend && (
              <div 
                className="p-4 rounded-lg bg-[#0c0a08] border border-[var(--border-gold)] text-sm whitespace-pre-line"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                {adaptedTrend}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
