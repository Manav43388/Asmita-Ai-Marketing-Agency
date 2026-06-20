// Asmita Gruh Udhyog - AI Marketing Agency Mock Database

export const initialProducts = [
  {
    id: 1,
    name: "Rose Premium Agarbati",
    sku: "ROS-AGB-1001",
    category: "Agarbati",
    price: 60,
    discountPrice: 80,
    burnTime: "40-45 minutes",
    description: "Experience the timeless fragrance of fresh roses with our Premium Rose Agarbati. Hand-crafted using natural rose extracts.",
    ingredients: "Natural rose extract, Bamboo stick, Binding resin, Natural charcoal powder",
    benefits: "Calms mind, reduces stress, ideal for daily pooja & meditation, long-lasting fragrance.",
    isBestseller: true,
    isTrending: true,
    stock: 150,
    salesCount: 312,
  },
  {
    id: 2,
    name: "Chandan (Sandalwood) Agarbati",
    sku: "CHA-AGB-1002",
    category: "Agarbati",
    price: 70,
    discountPrice: 90,
    burnTime: "45-50 minutes",
    description: "Our Chandan Agarbati is crafted with authentic sandalwood paste, delivering a rich, warm, and soothing fragrance.",
    ingredients: "Sandalwood paste, Natural binders, Bamboo core, Herbal extracts",
    benefits: "Promotes spiritual focus, purifies indoor air, reduces anxiety and stress.",
    isBestseller: true,
    isTrending: false,
    stock: 200,
    salesCount: 480,
  },
  {
    id: 3,
    name: "Lavender Calm Agarbati",
    sku: "LAV-AGB-1003",
    category: "Agarbati",
    price: 65,
    discountPrice: 85,
    burnTime: "35-40 minutes",
    description: "Unwind after a long day with our Lavender Calm Agarbati. Infused with pure lavender oil, promoting deep relaxation.",
    ingredients: "Lavender essential oil, Natural bamboo stick, Herbal paste, Binding resin",
    benefits: "Promotes deep relaxation, aids better sleep, reduces headaches, fresh floral scent.",
    isBestseller: false,
    isTrending: true,
    stock: 120,
    salesCount: 198,
  },
  {
    id: 4,
    name: "Gulab & Mogra Agarbati",
    sku: "GUM-AGB-1004",
    category: "Agarbati",
    price: 65,
    discountPrice: 85,
    burnTime: "40 minutes",
    description: "A premium blend of Gulab (Rose) and Mogra (Jasmine) fragrances, our dual-floral agarbati creates an irresistible floral ambiance.",
    ingredients: "Rose extract, Jasmine oil, Natural bamboo, Herbal binders",
    benefits: "Classic Indian floral fragrance, perfect for festivals and occasions, long-lasting dual scent.",
    isBestseller: false,
    isTrending: false,
    stock: 180,
    salesCount: 143,
  },
  {
    id: 5,
    name: "Gugal Dhoop Sticks",
    sku: "GUG-DHP-2001",
    category: "Dhoop",
    price: 80,
    discountPrice: 100,
    burnTime: "20-25 minutes",
    description: "Made from the resin of the Commiphora tree, our Gugal Dhoop Sticks carry the ancient tradition of Vedic purification rituals.",
    ingredients: "Gugal resin, Natural charcoal, Cow dung powder, Herbal herbs",
    benefits: "Powerful spiritual purifier, repels insects naturally, traditional sacred fragrance.",
    isBestseller: false,
    isTrending: false,
    stock: 90,
    salesCount: 165,
  },
  {
    id: 6,
    name: "Loban Dhoop Cones",
    sku: "LOB-DHP-2002",
    category: "Dhoop",
    price: 75,
    discountPrice: 95,
    burnTime: "15-18 minutes",
    description: "Loban (Frankincense) releases a warm, balsamic, resinous fragrance that promotes deep meditation and temple aura.",
    ingredients: "Loban resin, Natural charcoal base, Aromatic herbs",
    benefits: "Deep meditation aid, authentic temple fragrance, antimicrobial properties.",
    isBestseller: false,
    isTrending: true,
    stock: 110,
    salesCount: 112,
  },
  {
    id: 7,
    name: "Pooja Essentials Gift Set",
    sku: "POJ-GFT-3001",
    category: "Gift Set",
    price: 250,
    discountPrice: 325,
    burnTime: "Multiple",
    description: "Complete premium gift box featuring Rose Agarbati, Chandan Agarbati, Gugal Dhoop, and Loban Cones. Perfect for gifting.",
    ingredients: "Rose agarbati (20 sticks), Chandan agarbati (20 sticks), Gugal dhoop (10 sticks), Loban cones (12 cones)",
    benefits: "Complete pooja kit, premium gift packaging, variety of fragrances, saving bundle.",
    isBestseller: true,
    isTrending: true,
    stock: 50,
    salesCount: 88,
  },
  {
    id: 8,
    name: "Floral Bliss Combo Pack",
    sku: "FLB-CMB-3002",
    category: "Combo",
    price: 165,
    discountPrice: 195,
    burnTime: "Multiple",
    description: "Three best-selling floral agarbatis – Rose, Lavender, and Gulab-Mogra – at a special discounted price.",
    ingredients: "Rose agarbati (20 sticks), Lavender agarbati (20 sticks), Gulab Mogra agarbati (20 sticks)",
    benefits: "3 different daily fragrances, best value combo deal, 60 sticks total.",
    isBestseller: false,
    isTrending: true,
    stock: 75,
    salesCount: 67,
  },
  {
    id: 9,
    name: "Kesar & Chandan Premium Agarbati",
    sku: "KES-AGB-1005",
    category: "Agarbati",
    price: 90,
    discountPrice: 120,
    burnTime: "48-52 minutes",
    description: "A rare and luxurious combination of Kesar (Saffron) and Chandan (Sandalwood), handcrafted for special occasions and pujas.",
    ingredients: "Saffron extract, Sandalwood paste, Natural bamboo, Herbal binders",
    benefits: "Rare premium fragrance, ideal for special pujas, luxury gifting, 50 min burn time.",
    isBestseller: false,
    isTrending: false,
    stock: 60,
    salesCount: 45,
  },
  {
    id: 10,
    name: "Nag Champa Agarbati",
    sku: "NAG-AGB-1006",
    category: "Agarbati",
    price: 70,
    discountPrice: 90,
    burnTime: "40-45 minutes",
    description: "Our premium Nag Champa Agarbati is crafted from the rare Champak flower combined with sandalwood. Famous worldwide.",
    ingredients: "Champak flower extract, Sandalwood oil, Natural bamboo, Herbal paste",
    benefits: "Iconic sweet fragrance, perfect for yoga & meditation, deep relaxing atmosphere.",
    isBestseller: true,
    isTrending: true,
    stock: 140,
    salesCount: 389,
  }
];

export const targetAudience = [
  {
    role: "Retail Shops / Kirana",
    needs: "High margins, fast delivery, attractive packaging, reliable bulk supplier.",
    angle: "B2B wholesale pricing, free shipping, best retail margins (up to 40%)."
  },
  {
    role: "Wholesale Traders",
    needs: "Direct manufacturer pricing, consistent quality, huge volume capacity.",
    angle: "25+ years manufacturing experience in Gujarat, bulk discounts, custom transport options."
  },
  {
    role: "Religious Stores",
    needs: "Traditional purity, authentic fragrances (Chandan, Gugal, Loban), zero chemical smell.",
    angle: "100% natural resins, traditional Vedic formulas, trusted by temples."
  },
  {
    role: "Online / D2C Brands",
    needs: "White-labeling support, premium finish, aesthetic design, dropshipping.",
    angle: "Aesthetic branding, custom blends, dropshipping support, high-end packaging."
  },
  {
    role: "Daily Worshippers",
    needs: "No headache, long burn time, soothing scents, eco-friendly.",
    angle: "Non-toxic charcoal-free options, therapeutic natural essential oils."
  }
];

export const brandGuidelines = {
  voice: "Spiritual, Traditional, Devotional, Welcoming, Authentic, Professional",
  doList: [
    "Use respectful terms (Pooja, Devotion, Sacred, Vedic, Prathana).",
    "Include both English, Hindi, and Gujarati captions.",
    "Highlight 25+ years of Gujarati trust and manufacturing heritage.",
    "Show the physical texture of agarbatti and dhoop.",
    "Always state natural ingredients and zero chemical headaches."
  ],
  dontList: [
    "Do not use generic, pushy B2C copy ('BUY NOW OR MISS OUT!!!').",
    "Avoid casual, irreverent internet slang or memes.",
    "Do not misrepresent religious practices.",
    "Never criticize competitors, focus purely on own quality."
  ],
  visualPalette: {
    primary: "Gilded Gold (#d4af37)",
    secondary: "Sacred Saffron (#f26522)",
    accent: "Traditional Maroon (#58111a)",
    neutral: "Devotional Cream (#f5eedc)"
  }
};

export const trendingHooks = [
  {
    id: "hook_1",
    text: "તમારા ઘરમાં કઈ ધૂપ સળગાવવો જોઈએ? (Which Dhoop should you light in your home?)",
    adaptation: "Create a guide comparing Gugal (purification) and Loban (focus) for daily home pooja.",
    impact: "High (Guaranteed shares among Gujarati families)"
  },
  {
    id: "hook_2",
    text: "The secret why temple rooms smell so peaceful...",
    adaptation: "Show how to use authentic Chandan (Sandalwood) Agarbati to recreate that atmosphere.",
    impact: "Viral (Uplifts spiritual lifestyle interest)"
  },
  {
    id: "hook_3",
    text: "Wholesale businesses, are you making this mistake with your margins?",
    adaptation: "Educate retail shop owners on how buying direct from Asmita Gruh Udhyog increases profits.",
    impact: "B2B Leads (Attracts distributors and traders)"
  },
  {
    id: "hook_4",
    text: "અસલી Gugal ની ઓળખ કેવી રીતે કરવી? (How to identify pure Gugal?)",
    adaptation: "Demonstrate a water-solubility or visual purity test of Asmita Dhoop Sticks.",
    impact: "Authority Builder (Establishes product trust)"
  }
];

export const trendingAudios = [
  {
    id: "audio_1",
    title: "Shiv Tandav Stotram (Lofi / Traditional Fusion)",
    useCount: "250K Reels",
    niche: "Spiritual Energy & Gugal Dhoop lighting",
    type: "Reverent & Powerful"
  },
  {
    id: "audio_2",
    title: "Flute instrumental - Divine Bansuri",
    useCount: "120K Reels",
    niche: "Calming morning pooja / Rose & Lavender Agarbati",
    type: "Calming & Peaceful"
  },
  {
    id: "audio_3",
    title: "Achutam Keshavam (Acoustic Cover)",
    useCount: "80K Reels",
    niche: "Festive gifting packs / Family worship routines",
    type: "Warm & Emotional"
  }
];

export const competitorReels = [
  {
    id: "comp_1",
    profile: "DivineFragrances_IN",
    views: "1.2M Views",
    format: "Satisfying ASMR packaging of wholesale orders",
    takeaway: "B2B buyers love seeing bulk orders being packaged and loaded. Adopt this for manufacturing behind-the-scenes."
  },
  {
    id: "comp_2",
    profile: "SpiritualAura_D2C",
    views: "800K Views",
    format: "Cinematic close-up of incense stick lighting in slow motion",
    takeaway: "Use macro shots of burning ash and rising smoke rings to evoke sensory desire."
  }
];

export const initialCampaigns = [
  {
    id: 101,
    title: "Vedic Purification Gugal Dhoop",
    date: "2026-06-18",
    hook: "તમારા ઘરમાં નકારાત્મક ઉર્જા કઈ રીતે દુર કરવી? (How to remove negative energy?)",
    category: "Dhoop",
    product: "Gugal Dhoop Sticks",
    reach: 12500,
    likes: 890,
    comments: 42,
    shares: 115,
    saves: 304,
    inquiries: 18,
    status: "Completed",
    format: "Educational Reel"
  },
  {
    id: 102,
    title: "Pure Sandalwood Divine Rituals",
    date: "2026-06-15",
    hook: "The secret why temple rooms smell so peaceful...",
    category: "Agarbati",
    product: "Chandan (Sandalwood) Agarbati",
    reach: 22400,
    likes: 1850,
    comments: 94,
    shares: 412,
    saves: 954,
    inquiries: 35,
    status: "Completed",
    format: "Product Showcase Reel"
  },
  {
    id: 103,
    title: "Wholesale Margin Booster for Retailers",
    date: "2026-06-10",
    hook: "Wholesale businesses, are you making this mistake with your margins?",
    category: "Business",
    product: "Pooja Essentials Gift Set",
    reach: 8900,
    likes: 320,
    comments: 54,
    shares: 88,
    saves: 95,
    inquiries: 47,
    status: "Completed",
    format: "B2B Educational Reel"
  }
];

export const initialCalendar = [
  {
    id: 201,
    day: "Monday",
    date: "2026-06-22",
    theme: "Pure Chandan Devotion",
    type: "Reel",
    product: "Chandan (Sandalwood) Agarbati",
    hook: "Why standard air fresheners cause headaches (Choose natural Chandan instead)",
    category: "Educational",
    language: "Hindi + English",
    status: "Scheduled"
  },
  {
    id: 202,
    day: "Tuesday",
    date: "2026-06-23",
    theme: "Wholesale Supply Chain Tour",
    type: "Reel",
    product: "Nag Champa Agarbati",
    hook: "Behind-the-scenes of packing 10,000 agarbatti packets for Gujarat traders",
    category: "Behind-the-scenes",
    language: "Gujarati",
    status: "Scheduled"
  },
  {
    id: 203,
    day: "Wednesday",
    date: "2026-06-24",
    theme: "Pooja Room Organization Tips",
    type: "Carousel",
    product: "Pooja Essentials Gift Set",
    hook: "5 ways to arrange your daily pooja plate beautifully",
    category: "Spiritual Lifestyle",
    language: "English",
    status: "Draft"
  },
  {
    id: 204,
    day: "Thursday",
    date: "2026-06-25",
    theme: "Gugal Smoke Cleansing Ritual",
    type: "Reel",
    product: "Gugal Dhoop Sticks",
    hook: "ધરના ખૂણે ખૂણે સુગંધ ફેલાવો (Spread fragrance in every corner of your home)",
    category: "Product Showcase",
    language: "Gujarati + Hindi",
    status: "Scheduled"
  },
  {
    id: 205,
    day: "Friday",
    date: "2026-06-26",
    theme: "Stress-Free Evening Lavender",
    type: "Story",
    product: "Lavender Calm Agarbati",
    hook: "How to unwind after a busy working week...",
    category: "Educational",
    language: "English",
    status: "Draft"
  }
];
