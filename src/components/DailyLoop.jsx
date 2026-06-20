import React, { useState } from 'react';
import { Play, ClipboardList, CheckCircle, RefreshCcw, Sparkles, Copy, Check } from 'lucide-react';
import AgentTerminal from './AgentTerminal';

export default function DailyLoop({ products, calendar, setCalendar }) {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [completedCampaign, setCompletedCampaign] = useState(null);
  const [copiedSection, setCopiedSection] = useState(null);

  const triggerDailyProcedure = () => {
    setIsRunning(true);
    setLogs([]);
    setCompletedCampaign(null);

    const steps = [
      {
        agent: 'Marketing CEO',
        message: 'Daily Operating Procedure initiated. Trend Research Agent: Scan for high-potential hooks in spirituality/incense niche.',
        delay: 800
      },
      {
        agent: 'Trend Research',
        message: 'Scanned competitors and spiritual niche. Hook "ધરના ખૂણે ખૂણે સુગંધ ફેલાવો" (Spread fragrance in every corner of your home) is trending. Recommending adapting this trend to "Gugal Dhoop Sticks" for purifying homes from negative vibes.',
        delay: 2000
      },
      {
        agent: 'Content Strategy',
        message: 'Drafting campaign slot for Thursday. Topic: "Gugal Smoke Cleansing Ritual". Target Product: Gugal Dhoop Sticks. Formulating B2C engagement angle showing macro clips of lighting the stick.',
        delay: 3500
      },
      {
        agent: 'Script Writer',
        message: 'Reel Script written in Gujarati & Hindi.\nHook: "ધરના ખૂણે ખૂણે સુગંધ ફેલાવો!"\nCaption drafts contain wholesale margins details for traders and non-toxic properties for daily pooja worshippers.',
        delay: 5000
      },
      {
        agent: 'Reel Production',
        message: 'Shot list compiled for mobile filming:\n1. Macro shot of Gugal Dhoop lighting (0-3s).\n2. Slow pan of pooja plate (3-10s).\n3. POV typing WhatsApp inquiry message +91 63522 91433 (10-15s).',
        delay: 6500
      },
      {
        agent: 'Brand Quality',
        message: 'Running brand audit... Check: CTA is present, respectful traditional tone used, "Asmita Gruh Udhyog" branding verified. Audit score: 9.6/10. Script officially APPROVED for production.',
        delay: 8000
      },
      {
        agent: 'Marketing CEO',
        message: 'Final approval granted. Storing draft campaign under active files. Ready for filming. Excellent job team.',
        delay: 9500
      }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { agent: step.agent, message: step.message, timestamp: time }]);
        
        if (step.agent === 'Marketing CEO' && step.message.includes('Final approval')) {
          setIsRunning(false);
          setCompletedCampaign({
            id: Date.now(),
            day: 'Thursday',
            date: new Date().toISOString().split('T')[0],
            theme: 'Gugal Smoke Cleansing Ritual',
            type: 'Reel',
            product: 'Gugal Dhoop Sticks',
            hook: 'ધરના ખૂણે ખૂણે સુગંધ ફેલાવો (Spread fragrance in every corner of your home)',
            category: 'Product Showcase',
            language: 'Gujarati + Hindi',
            status: 'Draft',
            script: `[હૂક - પ્રથમ ૩ સેકન્ડ]
🎥 વિઝ્યુઅલ: ભગવાનના મંદિરમાં ધૂપ પ્રગટાવતા હાથ. ધૂપમાંથી નીકળતો ધીમો સુગંધિત ધુમાડો.
🗣️ વૉઇસઓવર: "નકારાત્મક ઉર્જા દુર કરવા અને ધરના ખૂણે ખૂણે સુગંધ ફેલાવવા માટે સવારે આ નાનકડો બદલાવ કરો..."

[મુખ્ય ભાગ - ૩ થી ૧૨ સેકન્ડ]
🎥 વિઝ્યુઅલ: કુદરતી ગૂગળ રેઝિન અને અસ્મિતા ગૂગળ ધૂપ સ્ટિકનું પેકેટ ટેબલ પર દેખાય.
🗣️ વૉઇસઓવર: "અસ્મિતા ગૃહ ઉદ્યોગના ગૂગળ ધૂપ સ્ટિક્સ ૧૦૦% શુદ્ધ ગૂગળ રેઝિનથી બનેલ છે. જે મચ્છરોને પણ દુર રાખે છે અને ઘરમાં સકારાત્મકતા લાવે છે."

[CTA - ૧૨ થી ૧૫ સેકન્ડ]
🎥 વિઝ્યુઅલ: અસ્મિતા ફેક્ટરીનો ફોન નંબર સ્ક્રીન પર.
🗣️ વૉઇસઓવર: "આજે જ હોલસેલ કે રીટેલ ઓર્ડર કરવા બાયોમાં લિંક પર ક્લિક કરો અથવા કમેન્ટ કરો!"`,
            caption: `🙏 ધરના ખૂણે ખૂણે સુગંધ ફેલાવો અને નકારાત્મકતા દુર કરો!\n\nઅસ્મિતા ગૃહ ઉદ્યોગની કુદરતી "ગૂગળ ધૂપ સ્ટિક્સ" સળગાવો જે વાતાવરણને શુદ્ધ કરે છે. \n\n✨ ૧૦૦% શુદ્ધ વેદિક પદ્ધતિથી બનેલ\n✨ હાનિકારક કેમિકલ વગર\n✨ મચ્છરોને કુદરતી રીતે દુર રાખે છે\n\n💼 હોલસેલ અને રીટેલ ખરીદી માટે હમણાં જ ડીએમ કરો!`,
            hashtags: `#AsmitaGruhUdhyog #GugalDhoop #VedicCleansing #HomeFragrance #GujaratiWorship #WholesaleIncense`
          });
        }
      }, step.delay);
    });
  };

  const addToCalendar = () => {
    if (!completedCampaign) return;
    setCalendar([...calendar, { ...completedCampaign, status: 'Scheduled' }]);
    setCompletedCampaign(null);
    alert('Campaign successfully scheduled on Content Calendar!');
  };

  const handleCopy = (text, sec) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sec);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="grid grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      
      {/* Simulation Controls & Terminal */}
      <div className="flex flex-col gap-6">
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles size={22} color="var(--primary)" />
            Daily Operating Procedure Loop
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            This simulator automates our 8-agent daily digital agency cycle: Researching trends, finding hooks, planning, writing, directing shot angles, auditing quality, and queuing content.
          </p>
          <button 
            onClick={triggerDailyProcedure} 
            disabled={isRunning}
            className="btn-primary w-full justify-center py-3 text-base pulse-glow"
          >
            <Play size={18} />
            {isRunning ? 'Agents Executing Loop...' : 'Trigger Daily Operating Loop'}
          </button>
        </div>

        <AgentTerminal logs={logs} isRunning={isRunning} />
      </div>

      {/* Campaign Output Preview */}
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <ClipboardList size={22} color="var(--primary)" />
          Daily Campaign Assets
        </h3>

        {completedCampaign ? (
          <div className="flex flex-col gap-6">
            
            {/* Main script card */}
            <div className="glass-panel p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-[var(--border-gold)] pb-3">
                <div>
                  <span className="product-tag">{completedCampaign.product}</span>
                  <h4 className="font-semibold text-base mt-1">{completedCampaign.theme}</h4>
                </div>
                <button 
                  onClick={addToCalendar}
                  className="btn-primary py-1 px-3 text-xs"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <CheckCircle size={14} /> Add to Calendar
                </button>
              </div>

              {/* Script Box */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 'bold' }}>Reel Script</span>
                  <button 
                    onClick={() => handleCopy(completedCampaign.script, 'script')}
                    className="btn-secondary py-1 px-2 text-xs flex items-center gap-1"
                    style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                  >
                    {copiedSection === 'script' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    Copy
                  </button>
                </div>
                <div className="script-box whitespace-pre-line text-xs leading-relaxed max-h-48 overflow-y-auto">
                  {completedCampaign.script}
                </div>
              </div>

              {/* Caption */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--saffron)', fontWeight: 'bold' }}>Caption</span>
                  <button 
                    onClick={() => handleCopy(completedCampaign.caption, 'caption')}
                    className="btn-secondary py-1 px-2 text-xs flex items-center gap-1"
                    style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                  >
                    {copiedSection === 'caption' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    Copy
                  </button>
                </div>
                <div className="p-3 rounded bg-[#0c0a08] border border-[var(--border-gold)] text-xs whitespace-pre-line max-h-32 overflow-y-auto">
                  {completedCampaign.caption}
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Hashtags</span>
                  <button 
                    onClick={() => handleCopy(completedCampaign.hashtags, 'tags')}
                    className="btn-secondary py-1 px-2 text-xs flex items-center gap-1"
                    style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                  >
                    {copiedSection === 'tags' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    Copy
                  </button>
                </div>
                <div className="p-3 rounded bg-[#0c0a08] border border-[var(--border-gold)] text-xs font-mono text-[var(--text-secondary)]">
                  {completedCampaign.hashtags}
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="glass-panel p-12 text-center text-secondary" style={{ color: 'var(--text-secondary)' }}>
            {isRunning ? (
              <div className="flex flex-col items-center gap-3">
                <RefreshCcw className="animate-spin text-primary" size={32} />
                <span>Running Daily Campaign Pipeline... Please wait.</span>
              </div>
            ) : (
              <span>Click <strong>"Trigger Daily Operating Loop"</strong> on the left panel to execute the agency cycle.</span>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
