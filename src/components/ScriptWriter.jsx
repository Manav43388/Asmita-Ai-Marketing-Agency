import React, { useState } from 'react';
import { Feather, Copy, Check, RefreshCcw, Sparkles } from 'lucide-react';

export default function ScriptWriter({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name || '');
  const [language, setLanguage] = useState('Gujarati');
  const [audience, setAudience] = useState('Daily Worshippers');
  const [customHook, setCustomHook] = useState('');
  const [scriptOutput, setScriptOutput] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleGenerateScript = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      // Find SKU, category & details of the product
      const productObj = products.find(p => p.name === selectedProduct) || products[0];
      const prodName = productObj?.name || 'Incense Sticks';
      const prodCat = productObj?.category || 'Agarbati';

      let hookText = customHook || `Here is why natural ${prodCat} changes everything...`;
      let script = '';
      let caption = '';
      let hashtags = '';

      if (language === 'Gujarati') {
        script = `Scene 1:
Visual: સવારની સૂર્યપ્રકાશમાં હોમ મંદિરનો શાંત ક્લોઝ-અપ શોટ, ધૂપ સ્ટેન્ડ ખાલી છે.
Voiceover: "શું તમે જાણો છો કે શા માટે સવારે ઘરમાં સુગંધ ફેલાવવી જરૂરી છે?"

Scene 2:
Visual: હાથમાં અસ્મિતા ગૃહ ઉદ્યોગનું પ્રીમિયમ ${prodName} પેકેટ લાવીને કેમેરા સામે ધરે છે.
Voiceover: "તે માટે જ અમે લાવ્યા છીએ અસ્મિતા ગૃહ ઉદ્યોગની આ ખાસ ${prodName}."

Scene 3:
Visual: અગરબત્તીને હળવેથી સળગાવીને ધૂપ સ્ટેન્ડમાં મૂકવાનો ક્લોઝ-અપ શોટ.
Voiceover: "કોલસા વગર બનેલી આ સ્ટીક સહેલાઈથી સળગે છે અને શુદ્ધ સુગંધ આપે છે."

Scene 4:
Visual: અગરબત્તીમાંથી સુંદર આકારમાં વહેતો ધુમાડો અને પરિવાર પૂજા કરી રહ્યો છે.
Voiceover: "જે માથાનો દુખાવો આપ્યા વગર પૂરા ઘરમાં મંદિર જેવી પવિત્રતા અને દિવ્ય શાંતિ ફેલાવે છે."

Scene 5:
Visual: સ્ક્રીન પર વોટ્સએપ નંબર +91 63522 91433 અને ઓર્ડરની માહિતી દેખાય.
Voiceover: "આજે જ હોલસેલ કે રીટેલ ઓર્ડર કરવા માટે બાયોમાં લિંક પર ક્લિક કરો અથવા કમેન્ટ કરો!"`;

        caption = `🙏 સવારની પૂજામાં લાવો મંદિર જેવી શુદ્ધતા! \n\nઅસ્મિતા ગૃહ ઉદ્યોગની ખાસ "${prodName}" સાથે આપના ઘર અને મંદિરને દિવ્ય સુગંધથી મહેકાવો. \n\n✨ કેમિકલ રહિત અને કુદરતી તેલોથી બનેલ\n✨ લાંબો સમય ચાલતી સુગંધ\n✨ ગુજરાતના ૨૫+ વર્ષ જુના ભરોસાપાત્ર ઉત્પાદક તરફથી સીધું જ\n\n💼 હોલસેલ વેપારીઓ અને રીટેલ દુકાનદારો માટે ખાસ કિંમતે ઉપલબ્ધ. ઓર્ડર માટે હમણાં જ ડીએમ કરો! \n\n#AsmitaGruhUdhyog #incensesticks #dailyworship`;
        hashtags = `#AsmitaGruhUdhyog #AgarbattiWholesale #NaturalFragrance #PoojaRoom #MadeInGujarat #GujaratiBusiness #HomeFragrance #DailyPooja #DhoopSticks`;
      } else if (language === 'Hindi') {
        script = `Scene 1:
Visual: सुबह की धूप में घर के मंदिर का एक शांत क्लोज-अप शॉट, जहां अभी शांति है।
Voiceover: "क्या आप जानते हैं कि घर के वातावरण को पवित्र रखना क्यों जरूरी है?"

Scene 2:
Visual: हाथों में अस्मिता गृह उद्योग का प्रीमियम ${prodName} पैकेट कैमरे के सामने लाया जाता है।
Voiceover: "इसीलिए हम आपके लिए लाए हैं अस्मिता गृह उद्योग की यह विशेष ${prodName}।"

Scene 3:
Visual: अगरबत्ती को प्यार से जलाकर सुंदर स्टैंड में स्थापित करने का क्लोज-अप।
Voiceover: "कोयला-मुक्त प्राकृतिक जड़ी-बूटियों से बनी यह स्टिक आसानी से सुलगती है।"

Scene 4:
Visual: कमरे में तैरती हुई सुंदर सुगंधित हवा और ध्यान में लीन एक व्यक्ति का चेहरा।
Voiceover: "यह बिना किसी केमिकल के, आपके घर को दिव्य खुशबू और मानसिक शांति से भर देती है।"

Scene 5:
Visual: स्क्रीन पर व्हाट्सएप नंबर +91 63522 91433 और डीएम डिटेल्स का एनीमेशन।
Voiceover: "अपने घर या दुकान के लिए थोक दामों में ऑर्डर करने के लिए अभी हमसे संपर्क करें!"`;

        caption = `✨ अपने घर को दें शुद्ध और सात्विक वातावरण! 🙏\n\nअस्मिता गृह उद्योग की प्रीमियम "${prodName}" के साथ हर सुबह की शुरुआत करें। यह प्राकृतिक तेलों और सुगंधित जड़ी-बूटियों से निर्मित है।\n\n✔ 100% कोयला मुक्त और सुरक्षित\n✔ सिरदर्द से राहत और मानसिक शांति\n✔ सीधे फैक्टरी रेट पर उपलब्ध\n\n📞 होलसेल या रिटेल ऑर्डर के लिए आज ही हमें DM करें या व्हाट्सएप करें!`;
        hashtags = `#AsmitaGruhUdhyog #IncenseSticks #TempleAura #NaturalIncense #PoojaEssential #SandalwoodFragrance #MadeInIndia #B2BWholesale`;
      } else {
        script = `Scene 1:
Visual: A quiet close-up shot of a home prayer room in the morning light, feeling incomplete.
Voiceover: "Ever wondered why some mornings feel much more peaceful and focused than others?"

Scene 2:
Visual: A hand holds up a premium pack of Asmita's ${prodName} in front of the camera.
Voiceover: "It all starts with this - Asmita Gruh Udhyog's authentic ${prodName}."

Scene 3:
Visual: Extreme close-up of a match lighting the incense stick, glowing amber.
Voiceover: "Charcoal-free and hand-rolled, it burns slowly, releasing rich botanicals."

Scene 4:
Visual: Cinematic smoke rings drifting through sunbeams, creating a temple-like ambiance.
Voiceover: "It instantly fills your space with a calming, stress-free aroma without any chemical headaches."

Scene 5:
Visual: Close-up of a smartphone screen showing WhatsApp contact number +91 63522 91433.
Voiceover: "Click the link in our bio or send us a DM to order wholesale at factory pricing today!"`;

        caption = `Elevate your daily meditation & spiritual lifestyle with the pure, calming aroma of Asmita's ${prodName}. 🕯️\n\nDirectly manufactured in Gujarat with 25+ years of trust, our incense products contain zero synthetic chemicals.\n\n✨ Eco-friendly & charcoal-free\n✨ Pure traditional fragrances\n✨ Wholesale bulk pricing available for stores & temples\n\n👉 Click the link in our bio to shop or inquire!`;
        hashtags = `#AsmitaGruhUdhyog #IncenseSticks #Aromatherapy #MeditationSpace #B2BRetail #WholesaleSupplier #IndianSpiritual #SpiritualHome`;
      }

      setScriptOutput({ script, caption, hashtags });
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="grid-layout-1-2">
      
      {/* Script Generator Input Form */}
      <div className="glass-panel p-6 flex flex-col gap-4 h-fit">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Feather size={20} color="var(--primary)" />
          Script Creator
        </h3>
        <form onSubmit={handleGenerateScript} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Select Product Focus</label>
            <select 
              className="form-select"
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
            >
              {products.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Script Language</label>
            <select 
              className="form-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="Gujarati">Gujarati (ગુજરાતી)</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="English">English</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Target Audience Persona</label>
            <select 
              className="form-select"
              value={audience}
              onChange={e => setAudience(e.target.value)}
            >
              <option value="Daily Worshippers">Daily Worshippers (B2C)</option>
              <option value="Wholesale Traders">Wholesale Traders (B2B)</option>
              <option value="Retail Shops">Retail Shop Owners (B2B)</option>
              <option value="Religious Product Stores">Religious Product Stores</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Custom Hook Idea (Optional)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. 3 reasons to light Loban at sunset..."
              value={customHook}
              onChange={e => setCustomHook(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary w-full justify-center mt-2" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <RefreshCcw className="animate-spin" size={16} /> Generating Script...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Generate Reel Assets
              </>
            )}
          </button>
        </form>
      </div>

      {/* Script Output display */}
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Feather size={20} color="var(--primary)" />
          Generated Campaign Scripts
        </h3>
        
        {scriptOutput ? (
          <div className="flex flex-col gap-6">
            
            {/* Reel Script Panel */}
            <div className="glass-panel p-6 flex flex-col gap-3 relative">
              <div className="flex justify-between items-center border-b border-[var(--border-gold)] pb-3">
                <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
                  Reel Production Script ({language})
                </span>
                <button 
                  onClick={() => handleCopy(scriptOutput.script, 'script')}
                  className="btn-secondary py-1 px-3 text-xs flex items-center gap-1"
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {copiedSection === 'script' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  {copiedSection === 'script' ? 'Copied!' : 'Copy Script'}
                </button>
              </div>
              <div className="script-box whitespace-pre-line text-sm leading-relaxed mt-2">
                {scriptOutput.script}
              </div>
            </div>

            {/* Instagram Caption Panel */}
            <div className="glass-panel p-6 flex flex-col gap-3 relative">
              <div className="flex justify-between items-center border-b border-[var(--border-gold)] pb-3">
                <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--saffron)' }}>
                  Reel Caption (Caption Copy)
                </span>
                <button 
                  onClick={() => handleCopy(scriptOutput.caption, 'caption')}
                  className="btn-secondary py-1 px-3 text-xs flex items-center gap-1"
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {copiedSection === 'caption' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  {copiedSection === 'caption' ? 'Copied!' : 'Copy Caption'}
                </button>
              </div>
              <div className="p-4 rounded-lg bg-[#0c0a08] border border-[var(--border-gold)] whitespace-pre-line text-sm mt-2">
                {scriptOutput.caption}
              </div>
            </div>

            {/* Reels Hashtags Panel */}
            <div className="glass-panel p-6 flex flex-col gap-3 relative">
              <div className="flex justify-between items-center border-b border-[var(--border-gold)] pb-3">
                <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Optimized Hashtags
                </span>
                <button 
                  onClick={() => handleCopy(scriptOutput.hashtags, 'hashtags')}
                  className="btn-secondary py-1 px-3 text-xs flex items-center gap-1"
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {copiedSection === 'hashtags' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  {copiedSection === 'hashtags' ? 'Copied!' : 'Copy Hashtags'}
                </button>
              </div>
              <div className="p-4 rounded-lg bg-[#0c0a08] border border-[var(--border-gold)] text-sm font-mono text-[var(--text-secondary)] mt-2">
                {scriptOutput.hashtags}
              </div>
            </div>

          </div>
        ) : (
          <div className="glass-panel p-12 text-center text-secondary" style={{ color: 'var(--text-secondary)' }}>
            Select your product focal point and options, then click <strong>"Generate Reel Assets"</strong> to compose the campaign scripts.
          </div>
        )}
      </div>

    </div>
  );
}
