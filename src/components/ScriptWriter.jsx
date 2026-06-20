import React, { useState, useEffect } from 'react';
import { 
  Feather, 
  Copy, 
  Check, 
  RefreshCcw, 
  Sparkles, 
  Lock, 
  Unlock, 
  Film, 
  FileJson, 
  FileText, 
  Download, 
  Eye, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';

export default function ScriptWriter({ products = [] }) {
  // Input Form States
  const [topic, setTopic] = useState('Morning pooja ritual for peaceful positive energy');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [customProduct, setCustomProduct] = useState('');
  const [videoType, setVideoType] = useState('Advertisement');
  const [duration, setDuration] = useState('30 seconds');
  const [clipCount, setClipCount] = useState(6);
  const [language, setLanguage] = useState('English');
  const [stylePreset, setStylePreset] = useState('Vedic Traditional');

  // Generator Output States
  const [sceneBible, setSceneBible] = useState(null);
  const [clips, setClips] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBibleLocked, setIsBibleLocked] = useState(true);
  const [activeTab, setActiveTab] = useState('storyboard'); // 'storyboard' | 'exports'
  
  // UI Status States
  const [copiedSection, setCopiedSection] = useState(null);
  const [activeHoverVariable, setActiveHoverVariable] = useState(null);
  const [customHookIdea, setCustomHookIdea] = useState('');

  // Flow Quality Guard States
  const [continuityScore, setContinuityScore] = useState(100);
  const [optimizationChecks, setOptimizationChecks] = useState({
    characterInAll: true,
    clothingUnchanged: true,
    productUnchanged: true,
    lightingUnchanged: true,
    environmentUnchanged: true,
    cameraConsistent: true,
    storyLogical: true,
    productVisibleThroughout: true
  });

  // Set default product from props if available
  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0].name);
    }
  }, [products]);

  const handleCopy = (text, sectionId) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Flow Quality Engine - Runs after storyboard generation to upgrade prompt quality
  const flowQualityEngine = (rawClips, bible, activeProd) => {
    const cameraMovements = [
      "Slow Push In",
      "Slow Pull Back",
      "Dolly Left",
      "Dolly Right",
      "Tracking Shot",
      "Orbit Shot",
      "Over Shoulder",
      "Product Close-Up",
      "Macro Detail Shot",
      "Wide Establishing Shot"
    ];

    const transitions = [
      "Smoke Transition",
      "Match Cut",
      "Soft Dissolve",
      "Camera Follow Transition",
      "Light Flare Transition",
      "Product Reveal Transition"
    ];

    // 1. Assign camera movements automatically (no consecutive repeats)
    let prevCamera = '';
    const clipsWithCamera = rawClips.map((clip, index) => {
      let options = [...cameraMovements];
      if (prevCamera) {
        options = options.filter(cam => cam !== prevCamera);
      }
      
      let selectedCam = '';
      if (clip.frameworkStep === 'PRODUCT INTRODUCTION') {
        selectedCam = options.includes('Product Close-Up') ? 'Product Close-Up' : options[0];
      } else if (clip.frameworkStep === 'PRODUCT EXPERIENCE') {
        selectedCam = options.includes('Macro Detail Shot') ? 'Macro Detail Shot' : options[0];
      } else if (clip.frameworkStep === 'HOOK') {
        selectedCam = options.includes('Wide Establishing Shot') ? 'Wide Establishing Shot' : (options.includes('Slow Push In') ? 'Slow Push In' : options[0]);
      } else {
        selectedCam = options[index % options.length];
      }
      
      prevCamera = selectedCam;
      return { ...clip, cameraMovement: selectedCam };
    });

    // 2. Assign smooth transitions automatically (no consecutive repeats, natural flow)
    let prevTransition = '';
    const clipsWithTransitions = clipsWithCamera.map((clip, index) => {
      if (index === 0) {
        return { ...clip, transition: 'None (Opening Shot)' };
      }
      
      let options = [...transitions];
      if (prevTransition) {
        options = options.filter(t => t !== prevTransition);
      }
      
      let selectedTrans = '';
      if (clip.frameworkStep === 'PRODUCT INTRODUCTION') {
        selectedTrans = options.includes('Product Reveal Transition') ? 'Product Reveal Transition' : options[0];
      } else if (clip.frameworkStep === 'PRODUCT EXPERIENCE' || clip.objective.toLowerCase().includes('smoke')) {
        selectedTrans = options.includes('Smoke Transition') ? 'Smoke Transition' : options[0];
      } else {
        selectedTrans = options[index % options.length];
      }
      
      prevTransition = selectedTrans;
      return { ...clip, transition: selectedTrans };
    });

    // 3. Enforce Product Visibility Rule (Product visible in >=70% scenes, no consecutive invisible scenes)
    const clipsWithVisibility = clipsWithTransitions.map((clip) => {
      const step = clip.frameworkStep;
      const productVisible = (step !== 'EMOTION' && step !== 'TRUST');
      
      let finalAction = clip.action;
      if (productVisible && !finalAction.includes(activeProd)) {
        finalAction = `${finalAction.replace(/\.$/, '')} featuring ${activeProd}.`;
      }
      
      return { 
        ...clip, 
        productVisible,
        action: finalAction
      };
    });

    return clipsWithVisibility;
  };

  // Continuity Score Calculator (0-100)
  const calculateContinuityScore = (evaluatedClips, bible) => {
    if (!bible || evaluatedClips.length === 0) return 0;
    
    let score = 100;
    
    // Character checks
    if (!bible.mainCharacter || bible.mainCharacter.trim().length < 5) score -= 10;
    if (!bible.characterAppearance || bible.characterAppearance.trim().length < 5) score -= 5;
    
    // Costume checks
    if (!bible.clothing || bible.clothing.trim().length < 5) score -= 10;
    
    // Environment checks
    if (!bible.environment || bible.environment.trim().length < 5) score -= 10;
    if (!bible.background || bible.background.trim().length < 5) score -= 5;
    
    // Lighting check
    if (!bible.lighting || bible.lighting.trim().length < 5) score -= 10;
    
    // Camera style check
    if (!bible.cameraStyle || bible.cameraStyle.trim().length < 5) score -= 10;
    
    // Camera movement repetition checks
    let cameraRepeats = 0;
    for (let i = 1; i < evaluatedClips.length; i++) {
      if (evaluatedClips[i].cameraMovement === evaluatedClips[i-1].cameraMovement) {
        cameraRepeats++;
      }
    }
    if (cameraRepeats > 0) score -= (cameraRepeats * 5);
    
    // Product Visibility Rules check
    const visibleClipsCount = evaluatedClips.filter(c => c.productVisible).length;
    const visibilityPercent = (visibleClipsCount / evaluatedClips.length) * 100;
    if (visibilityPercent < 70) {
      score -= 15;
    }
    
    let consecutiveInvisible = false;
    for (let i = 1; i < evaluatedClips.length; i++) {
      if (!evaluatedClips[i].productVisible && !evaluatedClips[i-1].productVisible) {
        consecutiveInvisible = true;
      }
    }
    if (consecutiveInvisible) {
      score -= 15;
    }
    
    // Block structures check
    let missingBlocks = 0;
    evaluatedClips.forEach(clip => {
      const prompt = getCompiledFlowPromptInternal(clip, bible, evaluatedClips.length);
      const requiredBlocks = [
        'CONTINUITY BLOCK:',
        'CHARACTER BLOCK:',
        'ENVIRONMENT BLOCK:',
        'LIGHTING BLOCK:',
        'CAMERA BLOCK:',
        'ACTION BLOCK:',
        'PRODUCT BLOCK:',
        'CINEMATIC DETAILS BLOCK:'
      ];
      requiredBlocks.forEach(block => {
        if (!prompt.includes(block)) {
          missingBlocks++;
        }
      });
    });
    if (missingBlocks > 0) {
      score -= Math.min(20, missingBlocks * 2);
    }
    
    return Math.max(0, Math.min(100, score));
  };

  // Optimization checkmark evaluator
  const getOptimizationChecks = (evaluatedClips, bible) => {
    if (!bible || evaluatedClips.length === 0) {
      return {
        characterInAll: false,
        clothingUnchanged: false,
        productUnchanged: false,
        lightingUnchanged: false,
        environmentUnchanged: false,
        cameraConsistent: false,
        storyLogical: false,
        productVisibleThroughout: false
      };
    }

    const characterInAll = !!bible.mainCharacter && bible.mainCharacter.trim().length > 0;
    const clothingUnchanged = !!bible.clothing && bible.clothing.trim().length > 0;
    const productUnchanged = !!bible.productDetails && bible.productDetails.trim().length > 0;
    const lightingUnchanged = !!bible.lighting && bible.lighting.trim().length > 0;
    const environmentUnchanged = !!bible.environment && bible.environment.trim().length > 0;
    
    let cameraRepeats = false;
    for (let i = 1; i < evaluatedClips.length; i++) {
      if (evaluatedClips[i].cameraMovement === evaluatedClips[i-1].cameraMovement) {
        cameraRepeats = true;
      }
    }
    const cameraConsistent = !!bible.cameraStyle && bible.cameraStyle.trim().length > 0 && !cameraRepeats;
    
    const storyLogical = evaluatedClips.length >= 4 && 
      evaluatedClips[0].frameworkStep === 'HOOK' && 
      evaluatedClips[evaluatedClips.length - 1].frameworkStep.startsWith('CTA');
    
    const visibleClipsCount = evaluatedClips.filter(c => c.productVisible).length;
    const visibilityPercent = (visibleClipsCount / evaluatedClips.length) * 100;
    let consecutiveInvisible = false;
    for (let i = 1; i < evaluatedClips.length; i++) {
      if (!evaluatedClips[i].productVisible && !evaluatedClips[i-1].productVisible) {
        consecutiveInvisible = true;
      }
    }
    const productVisibleThroughout = visibilityPercent >= 70 && !consecutiveInvisible;

    return {
      characterInAll,
      clothingUnchanged,
      productUnchanged,
      lightingUnchanged,
      environmentUnchanged,
      cameraConsistent,
      storyLogical,
      productVisibleThroughout
    };
  };

  // Generate consistent scripts locally using custom template matrices and Flow Quality Engine
  const handleGenerateScript = (e) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const activeProd = selectedProduct === 'custom' ? (customProduct || 'Premium Incense') : selectedProduct;
      const productObj = products.find(p => p.name === activeProd) || {
        name: activeProd,
        category: 'Agarbati',
        ingredients: 'Natural resins, aromatic oils, charcoal-free core',
        benefits: 'Purifies air, promotes mental peace, long lasting'
      };

      // 1. GENERATE MASTER SCENE BIBLE
      let bible = {
        mainCharacter: '',
        characterAppearance: '',
        age: '',
        gender: '',
        clothing: '',
        facialFeatures: '',
        environment: '',
        background: '',
        lighting: '',
        cameraStyle: '',
        colorPalette: '',
        mood: '',
        productDetails: `${productObj.name} premium packaging on display, burning stick or cone showing glowing amber ember tip and a thin, elegant, steady stream of white rising smoke.`
      };

      const lowerTopic = topic.toLowerCase();
      const isB2B = lowerTopic.includes('wholesale') || lowerTopic.includes('margin') || lowerTopic.includes('business') || lowerTopic.includes('shop') || lowerTopic.includes('retailer');

      if (stylePreset === 'Vedic Traditional') {
        bible.gender = 'Female';
        bible.age = lowerTopic.includes('grandmother') || lowerTopic.includes('dadi') ? '65' : '34';
        bible.mainCharacter = bible.age === '65' ? 'A traditional Indian grandmother (Dadi)' : 'A serene Indian homemaker';
        bible.characterAppearance = 'Calm composure, warm maternal eyes, graceful posture, bindi on forehead';
        bible.clothing = 'Elegant traditional cotton saree with maroon border and cream base';
        bible.facialFeatures = 'Warm gentle smile, serene expressions, closed eyes during prayer';
        bible.environment = 'A clean and traditional home pooja (prayer) sanctuary';
        bible.background = 'Carved wooden home temple, brass idols of deities, fresh orange marigold flower garlands, and brass oil lamps';
        bible.lighting = 'Warm golden light emanating from oil lamps, mixed with gentle morning sunbeams filtering through window carvings';
        bible.cameraStyle = 'Cinematic anamorphic format, slow gentle push-in, shallow depth of field, 4k ultra-high definition';
        bible.colorPalette = 'Rich saffrons, deep maroons, glowing golds, and warm timber tones';
        bible.mood = 'Devotional, tranquil, sacred, and nostalgic';
      } else if (stylePreset === 'Modern Minimalist') {
        bible.gender = 'Female';
        bible.age = '28';
        bible.mainCharacter = 'A young professional woman looking for a mindful pause';
        bible.characterAppearance = 'Simple modern style, clean hair bun, relaxed posture, calm breathing';
        bible.clothing = 'Comfortable off-white linen lounge shirt and matching trousers';
        bible.facialFeatures = 'Peaceful expression, soft eyes, gentle relaxed smile';
        bible.environment = 'A modern, sun-drenched minimalist apartment room';
        bible.background = 'Light-oak wooden floating shelves, green potted monstera plant, white walls, clean architectural lines';
        bible.lighting = 'Bright, soft, diffuse natural daylight entering from a large side glass window';
        bible.cameraStyle = 'Crisp tracking shots, modern flat composition, static locks, shallow depth of field';
        bible.colorPalette = 'Earthy cream, light oak beige, sage green, and clean diffuse whites';
        bible.mood = 'Mindful, calm, refreshing, and clean';
      } else if (stylePreset === 'Dramatic Cinematic') {
        bible.gender = 'Male';
        bible.age = '38';
        bible.mainCharacter = 'A focused yogi in deep meditation';
        bible.characterAppearance = 'Athletic build, long hair tied back, cross-legged lotus position, intense calm';
        bible.clothing = 'Simple saffron cotton wrap-around robe';
        bible.facialFeatures = 'Strong features, deep composure, complete stillness of the face';
        bible.environment = 'A dim, atmospheric meditation chamber';
        bible.background = 'Dark rustic stone walls, shadow patterns, a small wooden pedestal holding the incense stand';
        bible.lighting = 'High-contrast chiaroscuro, sharp spotlight beam of warm amber light cutting through smoke haze';
        bible.cameraStyle = 'Cinematic wide tracking, extreme slow-motion (60fps), high-angle gimbal sweeps';
        bible.colorPalette = 'Moody charcoal darks, warm amber glows, deep copper highlights';
        bible.mood = 'Mystical, intense, awe-inspiring, and spiritual';
      } else { // Raw ASMR / tactile textures
        bible.gender = 'Co-ed / Focus on hands';
        bible.age = '45';
        bible.mainCharacter = 'An artisanal incense craftsman';
        bible.characterAppearance = 'Weathered hands, focused movements, tactile connection to the raw materials';
        bible.clothing = 'Earthy brown khadi cotton work shirt';
        bible.facialFeatures = 'Engaged, concentrated look, looking down at the product';
        bible.environment = 'A rustic incense production workshop';
        bible.background = 'Wooden workbench, raw materials scattered (herbal powders, tree resins, flower petals, raw bamboo cores)';
        bible.lighting = 'Side-lit golden hour sunbeams accentuating dust particles and smoke textures';
        bible.cameraStyle = 'Extreme close-up macro lens, focus-pulls, hand-held organic movement, high frame rate';
        bible.colorPalette = 'Earthy wood browns, forest greens, natural bamboo tans, and charcoal blacks';
        bible.mood = 'Satisfying, tactile, organic, and authentic';
      }

      if (isB2B) {
        bible.mainCharacter = 'A middle-aged retail shop owner or merchant';
        bible.age = '45';
        bible.gender = 'Male';
        bible.characterAppearance = 'Trustworthy expression, welcoming eyes, proud business owner demeanor';
        bible.clothing = 'Smart-casual light-colored button-up shirt or Nehru vest';
        bible.facialFeatures = 'Confident smile, active expressions talking to customer';
        bible.environment = 'A clean, well-lit retail store or incense wholesale agency warehouse';
        bible.background = 'Shelves neatly stocked with Asmita Gruh Udhyog products, cardboard delivery boxes, invoicing counter';
        bible.lighting = 'Bright, professional commercial shop lighting mixed with warm side accents';
        bible.cameraStyle = 'Medium tracking shots, smooth panning across shelves, eye-level cinematic lens';
        bible.colorPalette = 'Golden yellow accents, warm cardboard brown, clean merchant blue and whites';
        bible.mood = 'Professional, prosperous, authentic, and business-focused';
      }

      // 2. GENERATE STORYBOARD CLIPS (Mapped to Asmita Commercial Framework)
      const getFrameworkStep = (i, total) => {
        if (total === 4) {
          if (i === 1) return 'HOOK';
          if (i === 2) return 'PRODUCT INTRODUCTION';
          if (i === 3) return 'PRODUCT EXPERIENCE';
          return 'CTA';
        } else if (total === 6) {
          if (i === 1) return 'HOOK';
          if (i === 2) return 'EMOTION';
          if (i === 3) return 'PRODUCT INTRODUCTION';
          if (i === 4) return 'PRODUCT EXPERIENCE';
          if (i === 5) return 'BENEFIT';
          return 'CTA';
        } else {
          if (i === 1) return 'HOOK';
          if (i === 2) return 'EMOTION';
          if (i === 3) return 'PRODUCT INTRODUCTION';
          if (i === 4) return 'PRODUCT EXPERIENCE';
          if (i === 5) return 'BENEFIT';
          if (i === 6) return 'TRUST';
          if (i === 7) return 'CTA';
          return 'CTA OUTRO';
        }
      };

      const totalClips = parseInt(clipCount);
      let generatedClips = [];

      for (let i = 1; i <= totalClips; i++) {
        const step = getFrameworkStep(i, totalClips);
        let clip = {
          id: i,
          frameworkStep: step,
          objective: '',
          narration: '',
          voiceover: '',
          cameraMovement: '',
          transition: '',
          action: '',
          productVisible: true
        };

        if (isB2B) {
          switch(step) {
            case 'HOOK':
              clip.objective = 'HOOK: Capture merchant attention with inventory/sales frustrations.';
              clip.action = `The shop owner looks at empty shelves or generic products, shaking his head slightly, holding a calculator.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"શું તમારી દુકાનમાં અગરબત્તીનું વેચાણ ઓછું છે અને નફો ઓછો મળે છે?"`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"क्या आपकी दुकान पर अगरबत्ती की बिक्री कम है और मार्जिन से परेशान हैं?"`;
              } else {
                clip.voiceover = `"Are you tired of low profit margins and generic products taking up your retail space?"`;
              }
              break;
            case 'EMOTION':
              clip.objective = 'EMOTION: Tap into the fear of losing customers due to synthetic smoke.';
              clip.action = `Merchant listening to a customer coughing slightly, pointing to low-quality incense packages.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"કેમિકલ અને કોલસા વાળી અગરબત્તીથી માથાનો દુખાવો થાય છે, જે ગ્રાહકોનો ભરોસો તોડે છે."`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"केमिकल वाली अगरबत्ती से सिरदर्द की शिकायत, जिससे आपके ग्राहकों का भरोसा टूटता है।"`;
              } else {
                clip.voiceover = `"Customers complain about synthetic chemical smell and headaches. It hurts your shop's trust."`;
              }
              break;
            case 'PRODUCT INTRODUCTION':
              clip.objective = 'PRODUCT INTRODUCTION: Present Asmita wholesale brand dispatch.';
              clip.action = `Hands opening a large, solid cardboard wholesale delivery carton printed with the 'Asmita Gruh Udhyog' logo, revealing premium foil-embossed packs.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"તો લાવો ૨૫ વર્ષથી ગુજરાતના વેપારીઓનો અતૂટ વિશ્વાસ - અસ્મિતા પ્રીમિયમ અગરબત્તી!"`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"तो लाइए गुजरात के भरोसेमंद निर्माता से सीधे - अस्मिता प्रीमियम अगरबत्ती!"`;
              } else {
                clip.voiceover = `"Direct from Gujarat's master manufacturer with 25+ years of trust: Asmita Premium Incense."`;
              }
              break;
            case 'PRODUCT EXPERIENCE':
              clip.objective = 'PRODUCT EXPERIENCE: Showcase attractive branding and glowing product sticks.';
              clip.action = `A wide array of packaging styles: Rose, Chandan, Lavender, and Gugal Dhoop are displayed on retail shelves, glowing amber tip showing steady stream of white rising smoke.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"ગુગળ ધૂપ, રોઝ, અને ચંદન અગરબત્તીની આકર્ષક કલરફુલ પેકિંગ જે ગ્રાહકોને તરત ખેંચશે."`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"गुगल धुप, रोज़ और चन्दन की खुशबू जो ग्राहकों को देखते ही पसंद आएगी।"`;
              } else {
                clip.voiceover = `"Vibrant, premium gold-foil packaging in Gulab, Chandan, Lavender, and Gugal that commands shelf attention."`;
              }
              break;
            case 'BENEFIT':
              clip.objective = 'BENEFIT: Highlight direct factory pricing and margins.';
              clip.action = `Shop owner smiling, nodding confidently, stacking high-quality packaging boxes on the main counter.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"વેપારીઓ માટે ખાસ ૪૦% સુધીનું મોટું ડિસ્કાઉન્ટ માર્જિન અને ફ્રી હોમ ડિલિવરી સુવિધા!"`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"दुकानदारों के लिए सीधे ४०% तक का थोक मार्जिन और डायरेक्ट फैक्ट्री प्राइस उपलब्ध।"`;
              } else {
                clip.voiceover = `"Get up to 40% retail profit margins with direct factory wholesale prices."`;
              }
              break;
            case 'TRUST':
              clip.objective = 'TRUST: Establish long-term credibility and safety guarantees.';
              clip.action = `Close-up of the official Asmita factory dispatch seal on a shipping box, ensuring charcoal-free purity.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"કોલસા રહિત ૧૦૦% સેફ ફોર્મ્યુલા, જે ગ્રાહકોને માથાનો દુખાવો નથી આપતી અને ગ્રાહકો વારંવાર ખરીદે છે."`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"बिना कोयले के बनी सौ प्रतिशत शुद्ध अगरबत्ती, जो आपके ग्राहकों का भरोसा बढ़ाएगी।"`;
              } else {
                clip.voiceover = `"100% charcoal-free and non-toxic incense sticks, ensuring repeat purchases and pure customer trust."`;
              }
              break;
            case 'CTA':
              clip.objective = 'CTA: Prompt WhatsApp orders for direct price catalogs.';
              clip.action = `A finger taps 'Send Inquiry' on WhatsApp showing the official wholesale support number +91 63522 91433.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"અત્યારે જ વોટ્સએપ કરો +91 63522 91433 પર અને મેળવો હોલસેલ કેટલોગ!"`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"आज ही होलसेल कैटलॉग पाने के लिए हमारे व्हाट्सएप नंबर +91 63522 91433 पर संपर्क करें!"`;
              } else {
                clip.voiceover = `"Message us on WhatsApp at +91 63522 91433 to receive our B2B price catalog now!"`;
              }
              break;
            case 'CTA OUTRO':
            default:
              clip.objective = 'CTA OUTRO: Outro slide confirming factory supply.';
              clip.action = `Overlay displaying Asmita logo, phone number +91 63522 91433, and direct Surat factory dispatch certification.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"અસ્મિતા અગરબત્તી સાથે તમારો વેપાર વધારો. ડાયરેક્ટ ફેક્ટરી સપ્લાય માટે સંપર્ક કરો."`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"अस्मिता अगरबत्ती के साथ अपना व्यापार बढ़ाएं। डायरेक्ट फैक्ट्री सप्लाई के लिए कॉल करें।"`;
              } else {
                clip.voiceover = `"Grow your retail business with Asmita. Contact us for direct wholesale dispatch."`;
              }
              break;
          }
        } else {
          // B2C templates
          switch(step) {
            case 'HOOK':
              clip.objective = 'HOOK: Capture ambient tranquility and contrast with morning rush.';
              clip.action = `The main character stands in front of the home temple, holding hands in prayer in the quiet morning light.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"શું તમારી સવારની પૂજા હજુ પણ મનની શાંતિ નથી આપી શકતી?"`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"क्या सुबह की भागदौड़ में आप वो मानसिक शांति महसूस नहीं कर पाते?"`;
              } else {
                clip.voiceover = `"Ever wondered why some mornings feel rushed, while others feel deeply centered and peaceful?"`;
              }
              break;
            case 'EMOTION':
              clip.objective = 'EMOTION: Appeal to the search for true spiritual stillness.';
              clip.action = `Close up on the main character taking a deep, calm breath before the pooja altar, closing eyes softly.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"તમારે જોઈએ એક સાચો આધ્યાત્મિક અનુભવ, જે દિવસની શરૂઆતને સકારાત્મક બનાવે."`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"आपको चाहिए एक सच्चा आध्यात्मिक अनुभव, जो दिन की शुरुआत को सकारात्मक बनाए।"`;
              } else {
                clip.voiceover = `"You seek a pure connection, a moment of stillness before the day begins."`;
              }
              break;
            case 'PRODUCT INTRODUCTION':
              clip.objective = 'PRODUCT INTRODUCTION: Present packaging and unboxing.';
              clip.action = `The character gently slides open a premium pack of ${productObj.name}, revealing the rich texture of the incense sticks.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"લખી લો, આ છે અસ્મિતા ગૃહ ઉદ્યોગની અસલી નેચરલ ${productObj.name}."`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"लाइए अस्मिता गृह उद्योग की प्राकृतिक ${productObj.name}।"`;
              } else {
                clip.voiceover = `"It begins with the pure fragrance of Asmita's handcrafted ${productObj.name}."`;
              }
              break;
            case 'PRODUCT EXPERIENCE':
              clip.objective = 'PRODUCT EXPERIENCE: Showcase lighting the stick and glowing ember.';
              clip.action = `A matches is struck; the flame touches the incense stick tip, which starts glowing bright orange, then fanned away leaving curling smoke.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"કુદરતી વનસ્પતિ અને શુદ્ધ તેલોથી બનેલ આ સ્ટીક હળવેથી પ્રગટે છે."`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"शुद्ध प्राकृतिक जड़ी-बूटियों से बनी यह स्टिक धीरे-धीरे सुलगती है।"`;
              } else {
                clip.voiceover = `"Made with pure essential oils and plant resins, it lights instantly, leaving a glowing amber tip."`;
              }
              break;
            case 'BENEFIT':
              clip.objective = 'BENEFIT: Show temple-like smoke diffusion.';
              clip.action = `Vibrant, dense white smoke rings and curls rise and drift through morning light shafts around brass deities.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"તેમાંથી નીકળતો કોલસા-રહિત ધુમાડો ઘરમાં મંદિર જેવું પવિત્ર વાતાવરણ બનાવે છે."`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"इसका कोयला-मुक्त धुआं बिना किसी सरदर्द के पूरे घर को सुगंध से भर देता है।"`;
              } else {
                clip.voiceover = `"The charcoal-free smoke curls gracefully, diffusing an authentic temple aroma that lasts."`;
              }
              break;
            case 'TRUST':
              clip.objective = 'TRUST: Highlight family peace and mental relief.';
              clip.action = `The main character sits peacefully in meditation or prayer, taking in the soothing aroma with a calm, serene smile.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"જે માનસિક તણાવને દુર કરી આખા પરિવારને સકારાત્મક ઉર્જાથી ભરી દે છે."`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"जो मानसिक तनाव को दूर कर आपके परिवार में खुशहाली और एकाग्रता लाता है।"`;
              } else {
                clip.voiceover = `"Instantly dissolving daily stress, creating a sanctuary of positive energy for your entire family."`;
              }
              break;
            case 'CTA':
              clip.objective = 'CTA: Show product ordering options via WhatsApp.';
              clip.action = `A close-up of the Asmita product set next to a phone displaying ordering details via WhatsApp +91 63522 91433.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"આજે જ હોમ ડિલિવરી કે હોલસેલ વેપાર માટે અમને વોટ્સએપ +91 63522 91433 પર મેસેજ કરો!"`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"घर पर मंगाने या थोक दामों पर आर्डर करने के लिए अभी व्हाट्सएप करें +91 63522 91433 पर!"`;
              } else {
                clip.voiceover = `"Bring temple-like purity into your home. Contact us on WhatsApp at +91 63522 91433 to order now."`;
              }
              break;
            case 'CTA OUTRO':
            default:
              clip.objective = 'CTA OUTRO: Reveal brand guarantee outro.';
              clip.action = `Ending screen featuring the full product range, traditional framing, and order details of Asmita Gruh Udhyog.`;
              if (language === 'Gujarati') {
                clip.voiceover = `"અસ્મિતા ગૃહ ઉદ્યોગ: ૨૫+ વર્ષની શુદ્ધતા અને અતૂટ વિશ્વાસ. આજે જ મંગાવો."`;
              } else if (language === 'Hindi') {
                clip.voiceover = `"अस्मिता गृह उद्योग: पच्चीस वर्षों का भरोसा और शुद्धता। आज ही ऑर्डर करें।"`;
              } else {
                clip.voiceover = `"Asmita Gruh Udhyog: Celebrating 25+ years of handcrafted purity. Order today."`;
              }
              break;
          }
        }
        clip.narration = clip.action;
        generatedClips.push(clip);
      }

      // 3. RUN FLOW QUALITY ENGINE
      const processedClips = flowQualityEngine(generatedClips, bible, activeProd);

      // 4. CALCULATE CONTINUITY SCORE & OPTIMIZATION CHECKS
      const initialScore = calculateContinuityScore(processedClips, bible);
      const initialChecks = getOptimizationChecks(processedClips, bible);

      setSceneBible(bible);
      setClips(processedClips);
      setContinuityScore(initialScore);
      setOptimizationChecks(initialChecks);
      setIsGenerating(false);
      setActiveTab('storyboard');
    }, 1500);
  };

  // Run initial generation on load
  useEffect(() => {
    handleGenerateScript();
  }, []);

  // Recalculate score and checks if Bible fields are modified manually in UI
  useEffect(() => {
    if (sceneBible && clips.length > 0) {
      const score = calculateContinuityScore(clips, sceneBible);
      const checks = getOptimizationChecks(clips, sceneBible);
      setContinuityScore(score);
      setOptimizationChecks(checks);
    }
  }, [sceneBible, clips]);

  // Private compiled prompt generator helper
  const getCompiledFlowPromptInternal = (clip, bible, totalClipsCount) => {
    if (!bible) return '';
    
    const continuityBlock = `[CONTINUITY BLOCK: Google Flow AI visual continuity anchor key. Clip ${clip.id} of ${totalClipsCount} in sequence. Style preset: ${stylePreset}. Aspect ratio 16:9 or 9:16 matching video format.]`;
    const characterBlock = `[CHARACTER BLOCK: Main character is ${bible.mainCharacter}, gender: ${bible.gender}, age: ${bible.age}, appearance: ${bible.characterAppearance}, facial features: ${bible.facialFeatures}, wearing ${bible.clothing}.]`;
    const environmentBlock = `[ENVIRONMENT BLOCK: Location is ${bible.environment}, background details: ${bible.background}.]`;
    const lightingBlock = `[LIGHTING BLOCK: ${bible.lighting}.]`;
    const cameraBlock = `[CAMERA BLOCK: Camera shot is ${clip.cameraMovement}, camera style is ${bible.cameraStyle}, visual transition: ${clip.transition}.]`;
    const actionBlock = `[ACTION BLOCK: ${clip.action}]`;
    const productBlock = `[PRODUCT BLOCK: ${clip.productVisible ? `Product on display: ${bible.productDetails}` : 'Focus is on the character and environment, product is out of frame'}.]`;
    const cinematicDetailsBlock = `[CINEMATIC DETAILS BLOCK: Cinematic rendering style, high-end commercial quality, photorealistic, 8k, movie grade. Negative prompts: no scene changes, no character changes, no costume changes, no location changes, no style changes, cartoon, anime, low quality, blurry, watermark, text overlay.]`;

    return `${continuityBlock} ${characterBlock} ${environmentBlock} ${lightingBlock} ${cameraBlock} ${actionBlock} ${productBlock} ${cinematicDetailsBlock}`;
  };

  // Sync Master Scene Bible fields into Google Flow prompts whenever the Bible or Clips update
  const getCompiledFlowPrompt = (clip) => {
    return getCompiledFlowPromptInternal(clip, sceneBible, clips.length);
  };

  const handleBibleFieldChange = (field, value) => {
    setSceneBible(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Export full script as clean markdown string
  const getMarkdownContent = () => {
    if (!sceneBible || clips.length === 0) return '';
    
    let md = `================================================\n`;
    md += `           FLOW DIRECTOR PACKAGE\n`;
    md += `================================================\n\n`;
    md += `# Campaign Script & Storyboard: ${topic}\n`;
    md += `**Product Focus:** ${selectedProduct === 'custom' ? customProduct : selectedProduct}\n`;
    md += `**Video Type:** ${videoType} | **Duration:** ${duration} | **Style Preset:** ${stylePreset}\n`;
    md += `**Flow Continuity Score:** ${continuityScore}/100\n\n`;
    
    md += `================================================\n`;
    md += `## 📋 MASTER SCENE BIBLE (Consistency Anchor)\n`;
    md += `================================================\n`;
    md += `- **Main Character:** ${sceneBible.mainCharacter}\n`;
    md += `- **Age:** ${sceneBible.age} | **Gender:** ${sceneBible.gender}\n`;
    md += `- **Clothing:** ${sceneBible.clothing}\n`;
    md += `- **Facial Features:** ${sceneBible.facialFeatures}\n`;
    md += `- **Character Appearance:** ${sceneBible.characterAppearance}\n`;
    md += `- **Environment:** ${sceneBible.environment}\n`;
    md += `- **Background:** ${sceneBible.background}\n`;
    md += `- **Lighting:** ${sceneBible.lighting}\n`;
    md += `- **Camera Style:** ${sceneBible.cameraStyle}\n`;
    md += `- **Color Palette:** ${sceneBible.colorPalette}\n`;
    md += `- **Mood:** ${sceneBible.mood}\n`;
    md += `- **Product Details:** ${sceneBible.productDetails}\n\n`;

    md += `================================================\n`;
    md += `## 🚫 NEGATIVE PROMPT (Use for all clips in Google Flow)\n`;
    md += `================================================\n`;
    md += `\`\`\`text\nno scene changes, no character changes, no costume changes, no location changes, no style changes, cartoon, anime, low quality, blurry, watermark, text overlay\n\`\`\`\n\n`;

    md += `================================================\n`;
    md += `## 📝 PRODUCTION NOTES & TIPS\n`;
    md += `================================================\n`;
    md += `1. **Use same seed if supported:** Keep the generative seed constant across renders to hold details steady.\n`;
    md += `2. **Generate scenes in order:** Start from Clip 1 and progress chronologically to allow Flow's memory context to persist.\n`;
    md += `3. **Keep same aspect ratio:** Maintain horizontal 16:9 or vertical 9:16 aspect ratio settings on all clips.\n`;
    md += `4. **Do not regenerate Scene Bible between clips:** Changing the main bible fields mid-campaign will instantly break continuity.\n`;
    md += `5. **Use same character reference:** If Google Flow supports character reference images, upload the generation from Clip 1 as the reference for subsequent clips.\n`;
    md += `6. **Pacing and Transitions:** Apply the specific camera movements and transitions specified in the shot list below in post-production.\n\n`;

    md += `================================================\n`;
    md += `## 🎬 SHOT LIST\n`;
    md += `================================================\n`;
    md += `| Clip ID | Framework Step | Camera Movement | Transition | Product Visible | Objective |\n`;
    md += `|---|---|---|---|---|---|\n`;
    clips.forEach(clip => {
      md += `| ${clip.id} | ${clip.frameworkStep} | ${clip.cameraMovement} | ${clip.transition} | ${clip.productVisible ? 'Yes' : 'No'} | ${clip.objective} |\n`;
    });
    md += `\n`;

    md += `================================================\n`;
    md += `## 🎙️ VOICEOVERS & AUDIO SCRIPTS\n`;
    md += `================================================\n`;
    clips.forEach(clip => {
      md += `### Clip ${clip.id} (${clip.frameworkStep})\n`;
      md += `- **Voiceover (${language}):** "${clip.voiceover}"\n`;
      md += `- **Action Cues:** ${clip.action}\n\n`;
    });

    md += `================================================\n`;
    md += `## 🤖 GOOGLE FLOW OPTIMIZED PROMPTS\n`;
    md += `================================================\n\n`;
    clips.forEach(clip => {
      md += `### Clip ${clip.id}: ${clip.objective} (${clip.frameworkStep})\n`;
      md += `\`\`\`text\n${getCompiledFlowPrompt(clip)}\n\`\`\`\n\n`;
    });
    
    md += `Generated by Asmita Gruh Udhyog AI Marketing Operations Center - Flow AI Quality Engine.\n`;
    md += `WhatsApp: +91 63522 91433 | 25+ Years of Purity & Trust`;
    return md;
  };

  // Export full script as JSON string
  const getJSONContent = () => {
    if (!sceneBible || clips.length === 0) return '';
    
    const output = {
      exportType: "FLOW DIRECTOR PACKAGE",
      flowContinuityScore: continuityScore,
      negativePrompt: "no scene changes, no character changes, no costume changes, no location changes, no style changes, cartoon, anime, low quality, blurry, watermark, text overlay",
      productionNotes: [
        "Use same seed if supported",
        "Generate scenes in order",
        "Keep same aspect ratio",
        "Do not regenerate Scene Bible between clips",
        "Use same character reference"
      ],
      meta: {
        topic,
        product: selectedProduct === 'custom' ? customProduct : selectedProduct,
        videoType,
        duration,
        clipCount: clips.length,
        language,
        stylePreset,
        generatedAt: new Date().toISOString()
      },
      masterSceneBible: sceneBible,
      shotList: clips.map(c => ({
        clipId: c.id,
        frameworkStep: c.frameworkStep,
        cameraMovement: c.cameraMovement,
        transition: c.transition,
        productVisible: c.productVisible,
        action: c.action,
        voiceover: c.voiceover,
        visualDescription: c.narration,
        compiledGoogleFlowPrompt: getCompiledFlowPrompt(c)
      }))
    };
    
    return JSON.stringify(output, null, 2);
  };

  const downloadFile = (content, filename, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Highlight specific parts of the prompt matching the hover variable
  const renderHighlightedPrompt = (clip) => {
    const rawPrompt = getCompiledFlowPrompt(clip);
    if (!rawPrompt || !activeHoverVariable) return rawPrompt;

    const varMap = {
      character: sceneBible.mainCharacter,
      clothing: sceneBible.clothing,
      lighting: sceneBible.lighting,
      environment: sceneBible.environment,
      camera: sceneBible.cameraStyle,
      palette: sceneBible.colorPalette,
      mood: sceneBible.mood
    };

    const targetVal = varMap[activeHoverVariable];
    if (!targetVal) return rawPrompt;

    const parts = rawPrompt.split(targetVal);
    if (parts.length < 2) return rawPrompt;

    return (
      <>
        {parts[0]}
        <span className="font-bold underline text-[var(--saffron)] bg-[rgba(242,101,34,0.15)] px-1 rounded transition-all duration-200">
          {targetVal}
        </span>
        {parts.slice(1).map((part, idx) => (
          <React.Fragment key={idx}>
            {targetVal}
            {part}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div className="grid-layout-1-2">
      
      {/* 1. SCRIPT GENERATOR FORM PANEL */}
      <div className="glass-panel p-6 flex flex-col gap-5 h-fit">
        <div className="flex items-center gap-2 border-b border-[var(--border-gold)] pb-3">
          <Feather className="text-[var(--primary)]" size={22} />
          <div>
            <h3 className="text-xl font-semibold">Flow AI Script Generator</h3>
            <p className="text-xs text-[var(--text-secondary)]">Optimize multi-scene videos for Google Flow AI</p>
          </div>
        </div>

        <form onSubmit={handleGenerateScript} className="flex flex-col gap-4">
          
          {/* Video Topic Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Video Topic / Concept</label>
            <textarea 
              className="form-textarea h-20 text-sm" 
              placeholder="e.g., Morning pooja ritual showing incense smoke, or B2B shop keeper wholesale profit margin pitch..."
              value={topic}
              onChange={e => setTopic(e.target.value)}
              required
            />
          </div>

          {/* Product Select */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Product Focus</label>
            <select 
              className="form-select text-sm"
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
            >
              {products.map(p => (
                <option key={p.id} value={p.name}>{p.name} ({p.category})</option>
              ))}
              <option value="custom">Custom Brand/Product...</option>
            </select>
          </div>

          {/* Custom Product Input if Custom selected */}
          {selectedProduct === 'custom' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Custom Product Name</label>
              <input 
                type="text" 
                className="form-input text-sm" 
                placeholder="Enter brand or product name"
                value={customProduct}
                onChange={e => setCustomProduct(e.target.value)}
                required
              />
            </div>
          )}

          {/* Grid fields for Video Type and Language */}
          <div className="grid grid-cols-2 gap-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Video Type</label>
              <select 
                className="form-select text-xs"
                value={videoType}
                onChange={e => setVideoType(e.target.value)}
              >
                <option value="Advertisement">Advertisement</option>
                <option value="Product Showcase">Product Showcase</option>
                <option value="Storytelling">Storytelling</option>
                <option value="Educational">Educational</option>
                <option value="Social Media Reel">Social Media Reel</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Language (Voiceover)</label>
              <select 
                className="form-select text-xs"
                value={language}
                onChange={e => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Gujarati">Gujarati (ગુજરાતી)</option>
              </select>
            </div>
          </div>

          {/* Grid fields for Duration and Clip Count */}
          <div className="grid grid-cols-2 gap-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Duration</label>
              <select 
                className="form-select text-xs"
                value={duration}
                onChange={e => {
                  setDuration(e.target.value);
                  // Recommend clip count based on duration
                  if (e.target.value === '20 seconds') setClipCount(4);
                  else if (e.target.value === '30 seconds') setClipCount(6);
                  else if (e.target.value === '45 seconds') setClipCount(6);
                  else setClipCount(8);
                }}
              >
                <option value="20 seconds">20 seconds</option>
                <option value="30 seconds">30 seconds</option>
                <option value="45 seconds">45 seconds</option>
                <option value="60 seconds">60 seconds</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Number of Clips</label>
              <select 
                className="form-select text-xs"
                value={clipCount}
                onChange={e => setClipCount(parseInt(e.target.value))}
              >
                <option value={4}>4 clips (Quick)</option>
                <option value={6}>6 clips (Standard)</option>
                <option value={8}>8 clips (Detailed)</option>
              </select>
            </div>
          </div>

          {/* Style Preset Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Visual Style Preset</label>
            <select 
              className="form-select text-sm"
              value={stylePreset}
              onChange={e => setStylePreset(e.target.value)}
            >
              <option value="Vedic Traditional">Vedic Traditional (Warm, Sacred)</option>
              <option value="Modern Minimalist">Modern Minimalist (Bright, Airry)</option>
              <option value="Dramatic Cinematic">Dramatic Cinematic (High-Contrast, Moody)</option>
              <option value="Raw ASMR / Documentary">Raw ASMR / tactile textures</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full justify-center mt-3 py-3" 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCcw className="animate-spin" size={18} /> Rebuilding Storyboard Matrix...
              </>
            ) : (
              <>
                <Sparkles size={18} /> Generate Flow Storyboard
              </>
            )}
          </button>
        </form>

        {/* Dynamic Consistency Engine Guide */}
        <div className="p-3 rounded-lg bg-[rgba(212,175,55,0.05)] border border-[var(--border-gold)] flex flex-col gap-1 text-[11px] leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-[var(--primary)] uppercase tracking-wider mb-1">
            <Layers size={12} />
            <span>Prompt Consistency Engine Active</span>
          </div>
          <p className="text-[var(--text-secondary)]">
            This system locks the Character, Dress, Lighting, and Color Palette variables below, then automatically injects them into the end of every individual clip prompt. This guarantees Google Flow produces a cohesive multi-clip movie.
          </p>
        </div>
      </div>

      {/* 2. MAIN STORYBOARD & SCRIPT OUTPUT */}
      <div className="flex flex-col gap-6">
        
        {/* Navigation Tabs and Header */}
        <div className="flex justify-between items-center border-b border-[var(--border-gold)] pb-2 flex-wrap gap-2">
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('storyboard')}
              className={`btn-secondary py-1 px-4 text-xs flex items-center gap-1 ${activeTab === 'storyboard' ? 'active' : ''}`}
              style={activeTab === 'storyboard' ? { borderColor: 'var(--primary)', color: 'var(--text-primary)', background: 'rgba(212,175,55,0.08)' } : {}}
            >
              <Film size={14} /> Interactive Storyboard
            </button>
            <button 
              onClick={() => setActiveTab('exports')}
              className={`btn-secondary py-1 px-4 text-xs flex items-center gap-1 ${activeTab === 'exports' ? 'active' : ''}`}
              style={activeTab === 'exports' ? { borderColor: 'var(--primary)', color: 'var(--text-primary)', background: 'rgba(212,175,55,0.08)' } : {}}
            >
              <Download size={14} /> Export Hub
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => handleCopy(getMarkdownContent(), 'markdown-full')}
              className="btn-secondary py-1 px-3 text-[11px] flex items-center gap-1"
            >
              {copiedSection === 'markdown-full' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              {copiedSection === 'markdown-full' ? 'Copied MD!' : 'Copy MD'}
            </button>
            <button 
              onClick={() => handleCopy(getJSONContent(), 'json-full')}
              className="btn-secondary py-1 px-3 text-[11px] flex items-center gap-1"
            >
              {copiedSection === 'json-full' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              {copiedSection === 'json-full' ? 'Copied JSON!' : 'Copy JSON'}
            </button>
          </div>
        </div>

        {/* Tab A: Storyboard & Master Bible */}
        {activeTab === 'storyboard' && sceneBible && clips.length > 0 && (
          <div className="flex flex-col gap-6">
            
            {/* MASTER SCENE BIBLE CARD */}
            <div className="glass-panel p-6 border-l-4 border-l-[var(--primary)] flex flex-col gap-4 relative">
              <div className="flex justify-between items-center border-b border-[var(--border-gold)] pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="text-[var(--primary)]" size={20} />
                  <div>
                    <h4 className="font-semibold text-base text-[var(--primary)]">📋 MASTER SCENE BIBLE</h4>
                    <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">LOCKED CONTEXT ANCHOR FOR GOOGLE FLOW</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsBibleLocked(!isBibleLocked)}
                  className={`btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5 ${isBibleLocked ? 'bg-[rgba(212,175,55,0.03)]' : 'bg-[rgba(242,101,34,0.06)] border-[var(--saffron)]'}`}
                  style={!isBibleLocked ? { color: 'var(--saffron)' } : {}}
                  type="button"
                >
                  {isBibleLocked ? (
                    <>
                      <Lock size={12} className="text-[var(--primary)]" />
                      <span>Context Locked</span>
                    </>
                  ) : (
                    <>
                      <Unlock size={12} className="text-[var(--saffron)] animate-pulse" />
                      <span>Context Unlocked (Edit Mode)</span>
                    </>
                  )}
                </button>
              </div>

              {!isBibleLocked && (
                <div className="p-3 rounded bg-[rgba(242,101,34,0.04)] border border-[rgba(242,101,34,0.2)] text-xs text-[var(--text-secondary)] flex items-start gap-2">
                  <AlertCircle size={14} className="text-[var(--saffron)] shrink-0 mt-0.5" />
                  <span>
                    <strong>Context Unlocked:</strong> You can now customize the scene properties directly below. All changes will instantly update the synced clip prompts. Click "Context Locked" when done.
                  </span>
                </div>
              )}

              {/* Bible Properties Matrix Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                
                {/* Character */}
                <div className="flex flex-col gap-1 p-2 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(212,175,55,0.05)]">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Main Character</label>
                  {isBibleLocked ? (
                    <span className="text-xs text-[var(--text-primary)]">{sceneBible.mainCharacter}</span>
                  ) : (
                    <input 
                      type="text" 
                      className="form-input text-xs py-1 px-2"
                      value={sceneBible.mainCharacter}
                      onChange={e => handleBibleFieldChange('mainCharacter', e.target.value)}
                    />
                  )}
                </div>

                {/* Character Appearance */}
                <div className="flex flex-col gap-1 p-2 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(212,175,55,0.05)]">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Appearance & Face</label>
                  {isBibleLocked ? (
                    <span className="text-xs text-[var(--text-primary)]">{sceneBible.characterAppearance} / {sceneBible.facialFeatures}</span>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        className="form-input text-xs py-1 px-2"
                        value={sceneBible.characterAppearance}
                        onChange={e => handleBibleFieldChange('characterAppearance', e.target.value)}
                        placeholder="Appearance"
                      />
                      <input 
                        type="text" 
                        className="form-input text-xs py-1 px-2"
                        value={sceneBible.facialFeatures}
                        onChange={e => handleBibleFieldChange('facialFeatures', e.target.value)}
                        placeholder="Facial Features"
                      />
                    </div>
                  )}
                </div>

                {/* Clothing & Attire */}
                <div className="flex flex-col gap-1 p-2 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(212,175,55,0.05)]">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Clothing</label>
                  {isBibleLocked ? (
                    <span className="text-xs text-[var(--text-primary)]">{sceneBible.clothing}</span>
                  ) : (
                    <input 
                      type="text" 
                      className="form-input text-xs py-1 px-2"
                      value={sceneBible.clothing}
                      onChange={e => handleBibleFieldChange('clothing', e.target.value)}
                    />
                  )}
                </div>

                {/* Environment Location */}
                <div className="flex flex-col gap-1 p-2 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(212,175,55,0.05)]">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Environment & Location</label>
                  {isBibleLocked ? (
                    <span className="text-xs text-[var(--text-primary)]">{sceneBible.environment}</span>
                  ) : (
                    <input 
                      type="text" 
                      className="form-input text-xs py-1 px-2"
                      value={sceneBible.environment}
                      onChange={e => handleBibleFieldChange('environment', e.target.value)}
                    />
                  )}
                </div>

                {/* Lighting and Shadow */}
                <div className="flex flex-col gap-1 p-2 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(212,175,55,0.05)]">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Lighting & Atmosphere</label>
                  {isBibleLocked ? (
                    <span className="text-xs text-[var(--text-primary)]">{sceneBible.lighting}</span>
                  ) : (
                    <input 
                      type="text" 
                      className="form-input text-xs py-1 px-2"
                      value={sceneBible.lighting}
                      onChange={e => handleBibleFieldChange('lighting', e.target.value)}
                    />
                  )}
                </div>

                {/* Camera Style */}
                <div className="flex flex-col gap-1 p-2 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(212,175,55,0.05)]">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Camera Style</label>
                  {isBibleLocked ? (
                    <span className="text-xs text-[var(--text-primary)]">{sceneBible.cameraStyle}</span>
                  ) : (
                    <input 
                      type="text" 
                      className="form-input text-xs py-1 px-2"
                      value={sceneBible.cameraStyle}
                      onChange={e => handleBibleFieldChange('cameraStyle', e.target.value)}
                    />
                  )}
                </div>

                {/* Color Palette and Mood */}
                <div className="flex flex-col gap-1 p-2 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(212,175,55,0.05)]">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Color Palette & Mood</label>
                  {isBibleLocked ? (
                    <span className="text-xs text-[var(--text-primary)]">{sceneBible.colorPalette} / {sceneBible.mood}</span>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        className="form-input text-xs py-1 px-2"
                        value={sceneBible.colorPalette}
                        onChange={e => handleBibleFieldChange('colorPalette', e.target.value)}
                        placeholder="Palette"
                      />
                      <input 
                        type="text" 
                        className="form-input text-xs py-1 px-2"
                        value={sceneBible.mood}
                        onChange={e => handleBibleFieldChange('mood', e.target.value)}
                        placeholder="Mood"
                      />
                    </div>
                  )}
                </div>

                {/* Product Appearance */}
                <div className="flex flex-col gap-1 p-2 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(212,175,55,0.05)]">
                  <label className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Product Visual Details</label>
                  {isBibleLocked ? (
                    <span className="text-xs text-[var(--text-primary)]">{sceneBible.productDetails}</span>
                  ) : (
                    <input 
                      type="text" 
                      className="form-input text-xs py-1 px-2"
                      value={sceneBible.productDetails}
                      onChange={e => handleBibleFieldChange('productDetails', e.target.value)}
                    />
                  )}
                </div>
              </div>

              {/* Active Sync Visualizer tags */}
              <div className="border-t border-[var(--border-gold)] pt-3 mt-1 flex flex-wrap gap-2 items-center">
                <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Active Sync Variables (Hover to highlight in prompts):</span>
                {[
                  { id: 'character', name: 'Character' },
                  { id: 'clothing', name: 'Clothing' },
                  { id: 'environment', name: 'Environment' },
                  { id: 'lighting', name: 'Lighting' },
                  { id: 'camera', name: 'Camera Style' },
                  { id: 'palette', name: 'Color Palette' },
                  { id: 'mood', name: 'Mood' }
                ].map(item => (
                  <span 
                    key={item.id}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded cursor-help border transition-all duration-200 ${activeHoverVariable === item.id ? 'bg-[var(--saffron)] text-[var(--text-primary)] border-[var(--saffron)]' : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-gold)] hover:border-[var(--primary)]'}`}
                    onMouseEnter={() => setActiveHoverVariable(item.id)}
                    onMouseLeave={() => setActiveHoverVariable(null)}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
            {/* FLOW QUALITY MONITOR */}
            <div className="glass-panel p-6 border border-[var(--border-gold)] rounded-xl flex flex-col md:flex-row gap-6 items-center">
              
              {/* Score Circular/Radial display */}
              <div className="flex flex-col items-center justify-center p-4 bg-[rgba(255,255,255,0.01)] rounded-xl border border-[rgba(212,175,55,0.1)] w-full md:w-1/3 text-center">
                <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Flow Continuity Score</span>
                <div className="relative flex items-center justify-center w-28 h-28">
                  {/* SVG circular track */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="56" 
                      cy="56" 
                      r="48" 
                      stroke="rgba(255,255,255,0.05)" 
                      strokeWidth="8" 
                      fill="transparent" 
                    />
                    <circle 
                      cx="56" 
                      cy="56" 
                      r="48" 
                      stroke={continuityScore >= 90 ? "var(--primary)" : "var(--saffron)"} 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="301.59"
                      strokeDashoffset={301.59 * (1 - continuityScore / 100)}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-extrabold text-[var(--text-primary)]">{continuityScore}</span>
                    <span className="text-[10px] font-semibold text-[var(--text-secondary)]">/ 100</span>
                  </div>
                </div>

                {continuityScore < 90 ? (
                  <div className="mt-3 flex items-center gap-1.5 p-2 rounded bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-[10px] text-red-400 font-semibold leading-tight">
                    <AlertCircle size={14} className="shrink-0 text-red-500" />
                    <span>Video continuity may break in Google Flow.</span>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-1.5 p-2 rounded bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] text-[10px] text-emerald-400 font-semibold leading-tight">
                    <CheckCircle2 size={14} className="shrink-0 text-emerald-500" />
                    <span>High Quality Continuity Guard Active</span>
                  </div>
                )}
              </div>

              {/* Optimization Checks Grid */}
              <div className="flex-1 w-full flex flex-col gap-3">
                <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Flow Optimization Check</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { key: 'characterInAll', text: 'Character appears in all scenes' },
                    { key: 'clothingUnchanged', text: 'Clothing remains unchanged' },
                    { key: 'productUnchanged', text: 'Product appearance remains unchanged' },
                    { key: 'lightingUnchanged', text: 'Lighting remains unchanged' },
                    { key: 'environmentUnchanged', text: 'Environment remains unchanged' },
                    { key: 'cameraConsistent', text: 'Camera style remains consistent' },
                    { key: 'storyLogical', text: 'Story progression is logical' },
                    { key: 'productVisibleThroughout', text: 'Product visible throughout story' }
                  ].map(check => {
                    const passed = optimizationChecks[check.key];
                    return (
                      <div key={check.key} className="flex items-center gap-2 p-2 rounded bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.02)]">
                        {passed ? (
                          <CheckCircle2 className="text-emerald-500 shrink-0" size={14} />
                        ) : (
                          <AlertCircle className="text-[var(--saffron)] shrink-0" size={14} />
                        )}
                        <span className={passed ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] font-medium"}>
                          {check.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* VIDEO STORYBOARD TIMELINE */}
            <div className="flex flex-col gap-5">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <Film size={20} color="var(--primary)" />
                <span>Video Storyboard ({clips.length} Synchronized Scenes)</span>
              </h4>

              <div className="flex flex-col gap-6 relative">
                {/* Visual line connecting cards like a storyboard reel strip */}
                <div 
                  className="absolute left-6 top-12 bottom-12 w-0.5 bg-[var(--border-gold)]" 
                  style={{ zIndex: 1 }}
                />

                {clips.map((clip, idx) => {
                  const flowPrompt = getCompiledFlowPrompt(clip);
                  const isAdVertical = videoType === 'Social Media Reel' || videoType === 'Educational';
                  
                  return (
                    <div key={clip.id} className="relative" style={{ zIndex: 2 }}>
                      <div className="glass-panel p-6 ml-12 border border-[var(--border-gold)] hover:border-[var(--border-focus)] transition-all duration-300">
                        
                        {/* Clip ID Circle on the timeline line */}
                        <div 
                          className="absolute -left-12 top-6 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" 
                          style={{ 
                            background: 'linear-gradient(135deg, var(--maroon) 0%, var(--saffron) 100%)',
                            border: '1px solid var(--primary)',
                            boxShadow: '0 0 8px var(--primary-glow)',
                            color: 'var(--text-primary)',
                            marginLeft: '16px'
                          }}
                        >
                          {clip.id}
                        </div>

                        {/* Clip header detail bar */}
                        <div className="flex justify-between items-start border-b border-[var(--border-gold)] pb-3 flex-wrap gap-2 mb-4">
                          <div>
                            <span className="text-[10px] font-bold text-[var(--saffron)] uppercase tracking-wider flex items-center gap-1.5">
                              <span>Clip Objective</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(242,101,34,0.15)] text-[var(--saffron)] font-mono border border-[rgba(242,101,34,0.3)]">
                                {clip.frameworkStep}
                              </span>
                            </span>
                            <h5 className="font-semibold text-sm text-[var(--text-primary)]">
                              {clip.objective}
                            </h5>
                          </div>
                          
                          <div className="flex gap-2">
                            <span className="text-[10px] py-1 px-2.5 rounded bg-[rgba(255,255,255,0.03)] border border-[var(--border-gold)] text-[var(--text-secondary)]">
                              ⏱️ 5-10 seconds
                            </span>
                            <span className="text-[10px] py-1 px-2.5 rounded bg-[rgba(212,175,55,0.05)] border border-[var(--border-gold)] text-[var(--primary)] font-semibold">
                              📹 {clip.cameraMovement}
                            </span>
                          </div>
                        </div>

                        {/* Card Inner Grid Layout (Visual Storyboard style) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                          
                          {/* Visual Prompt, Audio Direction and VO */}
                          <div className="lg:col-span-7 flex flex-col gap-4">
                            <div>
                              <strong className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-1">
                                Visual Scene Action Description
                              </strong>
                              <p className="text-xs text-[var(--text-primary)] bg-[rgba(0,0,0,0.2)] p-2.5 rounded border border-[rgba(255,255,255,0.02)]">
                                {clip.action}
                              </p>
                            </div>

                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between items-center">
                                <strong className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                                  Voiceover / Narration ({language})
                                </strong>
                                <span className="text-[9px] text-[var(--saffron)] uppercase tracking-widest font-bold">Audio Track</span>
                              </div>
                              <div className="p-3 rounded-lg bg-[rgba(88,17,26,0.05)] border border-[rgba(242,101,34,0.15)] italic text-xs text-[var(--text-primary)] relative mt-1">
                                <span className="absolute -top-2 left-3 bg-[#0a0807] px-1 text-[9px] text-[var(--saffron)] not-italic">🎙️ VO SPEECH</span>
                                "{clip.voiceover}"
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                              <div>
                                <strong className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                                  Camera Direction
                                </strong>
                                <span className="text-xs text-[var(--text-secondary)]">{clip.cameraMovement}</span>
                              </div>
                              <div>
                                <strong className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                                  Clip Transition
                                </strong>
                                <span className="text-xs text-[var(--text-secondary)]">{clip.transition}</span>
                              </div>
                            </div>
                          </div>

                          {/* Aspect Ratio Mock Visualizer and Prompts */}
                          <div className="lg:col-span-5 flex flex-col gap-3">
                            
                            {/* Mock Visualizer Frame */}
                            <div>
                              <strong className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-1">
                                Visual Storyboard Sketch (Mock Preview)
                              </strong>
                              
                              {/* Video Frame */}
                              <div 
                                className={`relative rounded-lg overflow-hidden border border-[var(--border-gold)] flex items-center justify-center shadow-lg transition-transform hover:scale-[1.01]`}
                                style={{ 
                                  aspectRatio: isAdVertical ? '9/16' : '16/9',
                                  maxHeight: isAdVertical ? '220px' : '170px',
                                  width: '100%',
                                  background: `linear-gradient(135deg, ${sceneBible.colorPalette.includes('maroon') ? 'var(--maroon)' : '#1a1a1a'} 0%, ${sceneBible.colorPalette.includes('saffron') ? 'var(--saffron-glow)' : '#2a2015'} 50%, #000000 100%)`,
                                  alignSelf: 'center'
                                }}
                              >
                                {/* Grid lines resembling a camera view finder */}
                                <div className="absolute inset-2 border border-[rgba(255,255,255,0.05)] pointer-events-none" />
                                <div className="absolute top-2 left-2 text-[8px] text-[rgba(255,255,255,0.3)] uppercase tracking-wider font-mono">REC 00:0{clip.id}</div>
                                <div className="absolute top-2 right-2 text-[8px] text-[rgba(255,255,255,0.3)] font-mono">1080p 60fps</div>
                                
                                {/* Center Action Icon or Mock Art */}
                                <div className="flex flex-col items-center justify-center gap-1.5 p-4 text-center">
                                  <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(212,175,55,0.25)] flex items-center justify-center text-[var(--primary)] shadow-inner">
                                    {clip.id === 1 ? <Sparkles size={16} /> : clip.id === clips.length ? <CheckCircle2 size={16} /> : <Film size={16} />}
                                  </div>
                                  <span className="text-[10px] text-[var(--text-primary)] font-semibold leading-tight drop-shadow-md">
                                    {clip.action.substring(0, 45)}...
                                  </span>
                                  <span className="text-[8px] text-[var(--text-secondary)] font-serif italic max-w-[85%] truncate">
                                    {stylePreset} style
                                  </span>
                                </div>

                                {/* Text Subtitle overlay in video */}
                                <div className="absolute bottom-2 inset-x-2 text-center bg-[rgba(0,0,0,0.65)] backdrop-filter backdrop-blur-[2px] py-1 px-1.5 rounded border border-[rgba(255,255,255,0.05)]">
                                  <p className="text-[8px] text-[#f5eedc] font-sans truncate">
                                    "{clip.voiceover.substring(0, 50)}..."
                                  </p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* GOOGLE FLOW OPTIMIZED PROMPT PANEL */}
                        <div className="mt-4 pt-3 border-t border-[rgba(212,175,55,0.08)] flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                              <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">
                                Google Flow AI Video Prompt (Cinematic Engine Sync)
                              </span>
                            </div>
                            <button 
                              onClick={() => handleCopy(flowPrompt, `prompt-${clip.id}`)}
                              className="btn-secondary py-1 px-3 text-[10px] flex items-center gap-1.5"
                              style={{ padding: '3px 8px' }}
                            >
                              {copiedSection === `prompt-${clip.id}` ? (
                                <>
                                  <Check size={10} color="#10b981" />
                                  <span style={{ color: '#10b981' }}>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={10} />
                                  <span>Copy Prompt</span>
                                </>
                              )}
                            </button>
                          </div>
                          
                          <div className="p-3 rounded bg-[#070605] border border-[rgba(212,175,55,0.12)] text-xs font-mono text-[var(--text-secondary)] leading-relaxed relative overflow-hidden">
                            {renderHighlightedPrompt(clip)}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Tab B: Export Options Hub */}
        {activeTab === 'exports' && (
          <div className="glass-panel p-6 flex flex-col gap-6">
            <div className="border-b border-[var(--border-gold)] pb-3">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Download size={20} color="var(--primary)" />
                <span>Script & Prompts Export Center</span>
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Download and share campaign video metadata and scripts immediately</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              
              {/* Markdown card */}
              <div className="p-5 rounded-xl bg-[rgba(255,255,255,0.01)] border border-[var(--border-gold)] flex flex-col gap-4 justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="text-[var(--primary)]" size={20} />
                    <h5 className="font-semibold text-base text-[var(--text-primary)]">Markdown Document (.md)</h5>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Export a clean, human-readable file layout including the full Master Scene Bible, storyboard sequence, camera directions, voiceovers, and the ready-to-use Google Flow prompt strings. Best for sharing with your production team.
                  </p>
                </div>
                <button 
                  onClick={() => downloadFile(getMarkdownContent(), `asmita_flow_script_${topic.replace(/\s+/g, '_').toLowerCase()}.md`, 'text/markdown')}
                  className="btn-primary w-full justify-center text-xs py-2.5"
                >
                  <Download size={14} /> Download Markdown (.md)
                </button>
              </div>

              {/* JSON Data card */}
              <div className="p-5 rounded-xl bg-[rgba(255,255,255,0.01)] border border-[var(--border-gold)] flex flex-col gap-4 justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileJson className="text-[var(--saffron)]" size={20} />
                    <h5 className="font-semibold text-base text-[var(--text-primary)]">JSON Data Structure (.json)</h5>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Export a structured JSON file including meta configuration details, separate Bible objects, and individual clip arrays. Best for importing directly into custom pipeline databases or script scheduling tools.
                  </p>
                </div>
                <button 
                  onClick={() => downloadFile(getJSONContent(), `asmita_flow_script_${topic.replace(/\s+/g, '_').toLowerCase()}.json`, 'application/json')}
                  className="btn-primary w-full justify-center text-xs py-2.5"
                  style={{ background: 'linear-gradient(135deg, var(--maroon) 0%, var(--saffron) 100%)' }}
                >
                  <Download size={14} /> Download JSON Data (.json)
                </button>
              </div>

            </div>

            {/* Quick Preview Panel */}
            <div className="flex flex-col gap-2 mt-4">
              <strong className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider block">Raw Script Preview (Markdown formatting)</strong>
              <div className="p-4 rounded-lg bg-[#070605] border border-[rgba(212,175,55,0.1)] text-xs text-[var(--text-secondary)] font-mono whitespace-pre-wrap max-h-80 overflow-y-auto leading-relaxed">
                {getMarkdownContent()}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
