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
        script = `[શરૂઆતનો હૂક - પ્રથમ ૩ સેકન્ડ]
🎥 વિઝ્યુઅલ: ભગવાનના મંદિરમાં ધૂપ પ્રગટાવતા હાથ. બેકગ્રાઉન્ડમાં ધીમું વાંસળી સંગીત.
🗣️ વૉઇસઓવર: "શું તમને ખબર છે? સવારે પ્રગટાવેલી અગરબત્તીની સુગંધ તમારા આખા દિવસના મૂડને બદલી શકે છે!"

[મુખ્ય ભાગ - ૩ થી ૧૨ સેકન્ડ]
🎥 વિઝ્યુઅલ: અસલી ${prodName} ની અગરબત્તીઓ અને તેમાંથી નીકળતો ધીમો સુગંધિત ધુમાડો.
🗣️ વૉઇસઓવર: "અસ્મિતા ગૃહ ઉદ્યોગની ${prodName} કેમિકલ ફ્રી કોલસા વગર બનેલી છે. આમાં છે ૧૦૦% કુદરતી સુગંધ જે માથાનો દુખાવો નથી આપતી અને મનને શાંત કરે છે. ૨૫ વર્ષથી વધુ અનુભવ સાથે અમે લાવીએ છીએ શુદ્ધતા."

[કૉલ-ટુ-એક્શન - ૧૨ થી ૧૫ સેકન્ડ]
🎥 વિઝ્યુઅલ: પેકિંગ બોક્સ સાથે વોટ્સએપ નંબર +91 63522 91433 ની પ્લેટ દેખાય.
🗣️ વૉઇસઓવર: "આજે જ હોલસેલ કે રીટેલ ઓર્ડર કરવા માટે બાયોમાં આપેલ લિંક પર ક્લિક કરો અથવા કમેન્ટ કરો!"`;

        caption = `🙏 સવારની પૂજામાં લાવો મંદિર જેવી શુદ્ધતા! \n\nઅસ્મિતા ગૃહ ઉદ્યોગની ખાસ "${prodName}" સાથે આપના ઘર અને મંદિરને દિવ્ય સુગંધથી મહેકાવો. \n\n✨ કેમિકલ રહિત અને કુદરતી તેલોથી બનેલ\n✨ લાંબો સમય ચાલતી સુગંધ\n✨ ગુજરાતના ૨૫+ વર્ષ જુના ભરોસાપાત્ર ઉત્પાદક તરફથી સીધું જ\n\n💼 હોલસેલ વેપારીઓ અને રીટેલ દુકાનદારો માટે ખાસ કિંમતે ઉપલબ્ધ. ઓર્ડર માટે હમણાં જ ડીએમ કરો! \n\n#AsmitaGruhUdhyog #incensesticks #dailyworship`;
        hashtags = `#AsmitaGruhUdhyog #AgarbattiWholesale #NaturalFragrance #PoojaRoom #MadeInGujarat #GujaratiBusiness #HomeFragrance #DailyPooja #DhoopSticks`;
      } else if (language === 'Hindi') {
        script = `[शुरुआती हुक - प्रथम 3 सेकंड]
🎥 विजुअल: मंदिर के दीये के पास सुलगती हुई ${prodName}। बैकग्राउंड में मधुर बांसुरी धुन।
🗣️ वॉइसओवर: "क्या आपके घर में भी अगरबत्ती जलाने से सिरदर्द होता है? तो इस वीडियो को ध्यान से देखें!"

[मुख्य भाग - 3 से 12 सेकंड]
🎥 विजुअल: हाथों में पैक खोलते हुए और खुशबू महसूस करते हुए।
🗣️ वॉइसओवर: "अस्मिता गृह उद्योग की ${prodName} कोयला-मुक्त और 100% प्राकृतिक सुगंधित जड़ी-बूटियों से बनी है। यह आपके घर के वातावरण को पवित्र और सकारात्मक बनाती है बिना किसी केमिकल के।"

[कॉल-टू-एक्शन - 12 से 15 सेकंड]
🎥 विजुअल: फोन स्क्रीन पर व्हाट्सएप चैट और नंबर +91 63522 91433 का पॉपअप।
🗣️ वॉइसओवर: "अपने घर या दुकान के लिए थोक दामों में ऑर्डर करने के लिए अभी बायो में लिंक पर क्लिक करें!"`;

        caption = `✨ अपने घर को दें शुद्ध और सात्विक वातावरण! 🙏\n\nअस्मिता गृह उद्योग की प्रीमियम "${prodName}" के साथ हर सुबह की शुरुआत करें। यह प्राकृतिक तेलों और सुगंधित जड़ी-बूटियों से निर्मित है।\n\n✔ 100% कोयला मुक्त और सुरक्षित\n✔ सिरदर्द से राहत और मानसिक शांति\n✔ सीधे फैक्टरी रेट पर उपलब्ध\n\n📞 होलसेल या रिटेल ऑर्डर के लिए आज ही हमें DM करें या व्हाट्सएप करें!`;
        hashtags = `#AsmitaGruhUdhyog #IncenseSticks #TempleAura #NaturalIncense #PoojaEssential #SandalwoodFragrance #MadeInIndia #B2BWholesale`;
      } else {
        script = `[Opening Hook - First 3 Seconds]
🎥 Visual: A close-up cinematic shot of lighting ${prodName} in slow motion. Sunlight reflecting through the rising smoke.
🗣️ Voiceover: "If you want to recreate that peaceful, positive temple aroma inside your home..."

[Body - 3 to 12 Seconds]
🎥 Visual: Stacking wholesale packs of ${prodName} into shipping cartons. Shows natural resins.
🗣️ Voiceover: "Try Asmita Gruh Udhyog's premium ${prodName}. Crafted for over 25 years in Gujarat using pure botanical extracts. Non-toxic, coal-free, and guaranteed headache-free."

[Call-To-Action - 12 to 15 Seconds]
🎥 Visual: A hand holding a smartphone showcasing the WhatsApp icon and order details.
🗣️ Voiceover: "Send us a DM or message us on WhatsApp to get factory wholesale pricing today!"`;

        caption = `Elevate your daily meditation & spiritual lifestyle with the pure, calming aroma of Asmita's ${prodName}. 🕯️\n\nDirectly manufactured in Gujarat with 25+ years of trust, our incense products contain zero synthetic chemicals.\n\n✨ Eco-friendly & charcoal-free\n✨ Pure traditional fragrances\n✨ Wholesale bulk pricing available for stores & temples\n\n👉 Click the link in our bio to shop or inquire!`;
        hashtags = `#AsmitaGruhUdhyog #IncenseSticks #Aromatherapy #MeditationSpace #B2BRetail #WholesaleSupplier #IndianSpiritual #SpiritualHome`;
      }

      setScriptOutput({ script, caption, hashtags });
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
      
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
