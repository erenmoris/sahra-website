export type VipCar = {
  slug: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  passengers: number;
  luggage: string;
  luggageAr: string;
  feature: string;
  featureAr: string;
  privacy: string;
  privacyAr: string;
  entertainment: string;
  entertainmentAr: string;
  /** Full amenity / luxury list for the detail page */
  amenities: string[];
  amenitiesAr: string[];
  image: string;
  heroImage: string;
  gallery: string[];
  about: string;
  aboutAr: string;
  lede: string;
  ledeAr: string;
};

/**
 * VIP chauffeur fleet — names and specs for public listings.
 * Sahra arranges independently; no prices shown.
 */
export const vipCars: VipCar[] = [
  {
    slug: "mercedes-s-class",
    name: "Mercedes-Benz S-Class",
    nameAr: "مرسيدس بنز S-Class",
    category: "Ultra-Luxury Sedan",
    categoryAr: "سيدان فائقة الفخامة",
    passengers: 4,
    luggage: "2 large suitcases + 2 cabin bags",
    luggageAr: "حقيبتان كبيرتان + حقيبتا كابينة",
    feature: "Executive rear lounge · ambient light",
    featureAr: "لاونج خلفي تنفيذي · إضاءة محيطية",
    privacy: "Acoustic glass · discreet black presence",
    privacyAr: "زجاج عازل · حضور أسود سري",
    entertainment: "Rear tablets · widescreen digital cabin",
    entertainmentAr: "شاشات خلفية · كمرة رقمية عريضة",
    amenities: [
      "Uniformed Sahra chauffeur",
      "Executive rear seats with pillows",
      "Rear passenger tablets / controls",
      "Quilted premium leather cabin",
      "64-color ambient lighting",
      "Acoustic privacy glass",
      "Multi-zone climate comfort",
      "High-speed Wi-Fi hotspot",
      "Welcome drinks & phone charging",
      "Airport VIP meet-and-greet on request",
      "Ideal for presidential & diplomatic arrivals",
      "Silent long-distance city transfers",
    ],
    amenitiesAr: [
      "سائق سهرة بزي رسمي",
      "مقاعد خلفية تنفيذية مع وسائد",
      "شاشات / تحكم للركاب الخلفيين",
      "مقصورة جلد فاخر بخياطة مبطنة",
      "إضاءة محيطية بـ ٦٤ لونًا",
      "زجاج خصوصية عازل للصوت",
      "راحة مناخية متعددة المناطق",
      "واي فاي عالي السرعة",
      "مشروبات ترحيبية وشحن هواتف",
      "استقبال مطار VIP عند الطلب",
      "مثالية للوصول الرئاسي والدبلوماسي",
      "تنقلات مدينة هادئة لمسافات طويلة",
    ],
    image: "/cars/covers/mercedes-s-class.jpg",
    heroImage: "/cars/covers/mercedes-s-class.jpg",
    gallery: [
      "/cars/covers/mercedes-s-class.jpg",
      "/cars/covers/mercedes-s-class-rear.jpg",
      "/cars/covers/mercedes-s-class-interior.jpg",
      "/cars/covers/mercedes-s-class-rear-cabin.jpg",
    ],
    about:
      "The flagship S-Class for arrivals that cannot look ordinary — rear lounge calm, soft ambient light, and a cabin that feels like a private suite on wheels.",
    aboutAr:
      "الـ S-Class الرائدة لوصول ما ينفعش يبقى عادي — هدوء لاونج خلفي، إضاءة محيطية ناعمة، ومقصورة تحس إنها جناح خاص على عجلات.",
    lede: "The highest seat in the fleet.",
    ledeAr: "أعلى مقعد في الأسطول.",
  },
  {
    slug: "mercedes-g-class",
    name: "Mercedes-Benz G-Class",
    nameAr: "مرسيدس بنز G-Class",
    category: "Iconic Luxury SUV",
    categoryAr: "دفع رباعي أيقوني فاخر",
    passengers: 4,
    luggage: "3–4 large suitcases",
    luggageAr: "٣–٤ حقائب كبيرة",
    feature: "Commanding presence · V8 character",
    featureAr: "حضور طاغي · طابع V8",
    privacy: "Tinted glass · unmistakable silhouette",
    privacyAr: "زجاج معتم · شكل لا يُخطَأ",
    entertainment: "Premium cabin · night-ready presence",
    entertainmentAr: "مقصورة فاخرة · حضور يليق بالليل",
    amenities: [
      "Uniformed Sahra chauffeur",
      "Iconic boxy G-Class silhouette",
      "Elevated seating & road presence",
      "Premium leather interior",
      "Powerful V8 Biturbo character (where equipped)",
      "All-terrain confidence with city polish",
      "Tinted privacy glass",
      "High-speed Wi-Fi hotspot",
      "Welcome drinks & phone charging",
      "Ideal for VIP nightlife & hotel arrivals",
      "Statement presence for photo moments",
      "Flexible evening routes across Cairo",
    ],
    amenitiesAr: [
      "سائق سهرة بزي رسمي",
      "شكل G-Class الأيقوني الصندوقي",
      "جلسة مرتفعة وحضور على الطريق",
      "مقصورة جلد فاخر",
      "طابع V8 بيتوربو (حسب التجهيز)",
      "ثقة طرق وعرة مع لمسة مدينة",
      "زجاج خصوصية معتم",
      "واي فاي عالي السرعة",
      "مشروبات ترحيبية وشحن هواتف",
      "مثالية لسهرات VIP ووصول الفنادق",
      "حضور لافت للحظات التصوير",
      "مرونة في خطوط سير القاهرة ليلًا",
    ],
    image: "/cars/covers/mercedes-g-class.jpg",
    heroImage: "/cars/covers/mercedes-g-class.jpg",
    gallery: [
      "/cars/covers/mercedes-g-class.jpg",
      "/cars/covers/mercedes-g-class-side.jpg",
      "/cars/covers/mercedes-g-class-rear.jpg",
    ],
    about:
      "The G-Class for nights that need an entrance — boxy, unmistakable, and chauffeur-driven with the kind of presence that clears a path before you step out.",
    aboutAr:
      "الـ G-Class لليالي محتاجة دخول لافت — شكل صندوقي ما بيتغلطش، وسائق بيفتحلك الطريق قبل ما تنزل.",
    lede: "Arrive like the night belongs to you.",
    ledeAr: "اوصل وكأن الليل بتاعك.",
  },
  {
    slug: "mercedes-e-class",
    name: "Mercedes-Benz E-Class",
    nameAr: "مرسيدس بنز E-Class",
    category: "Presidential Sedan",
    categoryAr: "سيدان رئاسية",
    passengers: 4,
    luggage: "2–3 large suitcases + 2 cabin bags",
    luggageAr: "٢–٣ حقائب كبيرة + حقيبتا كابينة",
    feature: "Soundproof cabin · 64-color ambient light",
    featureAr: "مقصورة عازلة للصوت · إضاءة محيطية ٦٤ لونًا",
    privacy: "Acoustic glass · discreet black exterior",
    privacyAr: "زجاج عازل للصوت · هيكل أسود سري",
    entertainment: "Widescreen digital cockpit · Burmester-ready audio",
    entertainmentAr: "كمرة رقمية عريضة · نظام صوتي فاخر",
    amenities: [
      "Uniformed Sahra chauffeur",
      "Panoramic sunroof (where equipped)",
      "Premium leather seats with memory",
      "Dual-zone climate control",
      "64-color ambient cabin lighting",
      "Wireless charging pad",
      "High-speed Wi-Fi hotspot",
      "Bottled water & welcome refreshments",
      "Phone chargers (USB-C / Lightning)",
      "Airport & VIP lounge meet-and-greet on request",
      "Flexible route changes during the trip",
      "Child seat available on request",
    ],
    amenitiesAr: [
      "سائق سهرة بزي رسمي",
      "سقف بانورامي (حسب التجهيز)",
      "مقاعد جلدية فاخرة بذاكرة",
      "تكييف ثنائي المناطق",
      "إضاءة محيطية بـ ٦٤ لونًا",
      "شاحن لاسلكي للهاتف",
      "واي فاي عالي السرعة",
      "مياه ومشروبات ترحيبية",
      "شواحن هاتف (USB-C / Lightning)",
      "استقبال مطار / صالة VIP عند الطلب",
      "مرونة كاملة لتعديل خط السير",
      "مقعد أطفال عند الطلب",
    ],
    image: "/cars/covers/mercedes-e-class-black.jpg",
    heroImage: "/cars/covers/mercedes-e-class-black.jpg",
    gallery: [
      "/cars/covers/mercedes-e-class-black.jpg",
      "/cars/covers/mercedes-interior.jpg",
      "/cars/covers/mercedes-e-class-showroom.jpg",
    ],
    about:
      "The executive black Mercedes for arrivals that must stay silent and sharp — leather calm, ambient glow, and a chauffeur who anticipates the next stop before you ask.",
    aboutAr:
      "المرسيدس السوداء التنفيذية لوصول بلا ضوضاء — مقصورة جلدية هادئة، إضاءة محيطية، وسائق يسبق طلبك قبل ما تقوله.",
    lede:
      "Presidential presence for airports, boardrooms, and evening arrivals.",
    ledeAr:
      "حضور رئاسي للمطارات ومجالس الأعمال ووصول المساء.",
  },
  {
    slug: "hyundai-elantra",
    name: "Hyundai Elantra",
    nameAr: "هيونداي إلنترا",
    category: "Business Sedan",
    categoryAr: "سيدان أعمال",
    passengers: 4,
    luggage: "2 large suitcases + 1 cabin bag",
    luggageAr: "حقيبتان كبيرتان + حقيبة كابينة",
    feature: "Leather cabin · smart navigation",
    featureAr: "مقصورة جلدية · ملاحة ذكية",
    privacy: "Tinted glass · discreet daily profile",
    privacyAr: "زجاج معتم · مظهر يومي سري",
    entertainment: "Touchscreen nav · Bluetooth audio",
    entertainmentAr: "شاشة ملاحة لمس · صوت بلوتوث",
    amenities: [
      "Uniformed Sahra chauffeur",
      "Premium perforated leather seats",
      "Dual-zone automatic climate",
      "Smart touchscreen navigation",
      "Apple CarPlay / Android Auto ready",
      "Cruise control for long transfers",
      "Rear parking sensors / camera",
      "High-speed Wi-Fi hotspot",
      "Bottled water on board",
      "Phone chargers",
      "Ideal for city meetings & airport runs",
      "Flexible wait-and-return scheduling",
    ],
    amenitiesAr: [
      "سائق سهرة بزي رسمي",
      "مقاعد جلدية مثقبة فاخرة",
      "تكييف أوتوماتيك ثنائي المناطق",
      "ملاحة ذكية بشاشة لمس",
      "دعم Apple CarPlay / Android Auto",
      "مثبت سرعة للتنقلات الطويلة",
      "حساسات / كاميرا ركن خلفية",
      "واي فاي عالي السرعة",
      "مياه معدنية داخل السيارة",
      "شواحن هاتف",
      "مثالية لاجتماعات المدينة والمطار",
      "انتظار ورجوع بمرونة حسب جدولك",
    ],
    image: "/cars/covers/hyundai-elantra-interior.jpg",
    heroImage: "/cars/covers/hyundai-elantra-interior.jpg",
    gallery: ["/cars/covers/hyundai-elantra-interior.jpg"],
    about:
      "A polished business sedan for VIP commuting that still feels elevated — clean leather, modern connectivity, and a driver who keeps time without drama.",
    aboutAr:
      "سيدان أعمال أنيقة لتنقلات الـ VIP اليومية — جلد نظيف، تقنيات حديثة، وسائق يحترم وقتك بلا ضوضاء.",
    lede: "Smart, discreet commuting for the working VIP day.",
    ledeAr: "تنقل ذكي وسري ليوم عمل الـ VIP.",
  },
  {
    slug: "hyundai-h1",
    name: "Hyundai H1 VIP",
    nameAr: "هيونداي H1 VIP",
    category: "VIP Lounge Van",
    categoryAr: "فان لاونج VIP",
    passengers: 7,
    luggage: "5–6 large suitcases",
    luggageAr: "٥–٦ حقائب كبيرة",
    feature: "Captain chairs · lounge cabin",
    featureAr: "مقاعد كابتن · مقصورة لاونج",
    privacy: "Tinted sliding doors · group discretion",
    privacyAr: "أبواب منزلقة معتمة · خصوصية للمجموعة",
    entertainment: "Spacious VIP lounge · easy group entry",
    entertainmentAr: "لاونج VIP رحب · دخول سهل للمجموعة",
    amenities: [
      "Uniformed Sahra chauffeur",
      "VIP lounge seating with captain chairs",
      "Wide sliding doors for effortless entry",
      "Available in black or white exterior",
      "Tinted privacy glass",
      "Generous luggage capacity for groups",
      "High-speed Wi-Fi hotspot",
      "Welcome drinks & bottled water",
      "Phone charging for the whole cabin",
      "Ideal for airport groups & hotel parties",
      "Perfect when a sedan is not enough",
      "Flexible multi-stop evening itineraries",
    ],
    amenitiesAr: [
      "سائق سهرة بزي رسمي",
      "مقاعد لاونج VIP بمقاعد كابتن",
      "أبواب منزلقة واسعة لدخول سهل",
      "متوفرة بهيكل أسود أو أبيض",
      "زجاج خصوصية معتم",
      "سعة أمتعة كبيرة للمجموعات",
      "واي فاي عالي السرعة",
      "مشروبات ترحيبية ومياه معدنية",
      "شحن هواتف لكامل المقصورة",
      "مثالية لمجموعات المطار وحفلات الفنادق",
      "الحل لما السيدان مش يكفي",
      "مرونة في خط سير متعدد المحطات ليلًا",
    ],
    image: "/cars/covers/hyundai-h1-vip.jpg",
    heroImage: "/cars/covers/hyundai-h1-vip.jpg",
    gallery: ["/cars/covers/hyundai-h1-vip.jpg"],
    about:
      "A VIP H1 lounge van for groups who refuse to split across cars — captain seating, sliding doors, and space for luggage without losing the Sahra standard.",
    aboutAr:
      "فان H1 لاونج للمجموعات اللي مش هتتفرق على عربيات — مقاعد كابتن، أبواب منزلقة، ومساحة أمتعة من غير ما تفقد معيار سهرة.",
    lede: "One van. The whole group. Lounge calm.",
    ledeAr: "فان واحدة. المجموعة كلها. هدوء لاونج.",
  },
  {
    slug: "jetour-t2",
    name: "Jetour T2",
    nameAr: "جيتور T2",
    category: "Adventure SUV",
    categoryAr: "دفع رباعي مغامر",
    passengers: 5,
    luggage: "4 large suitcases + soft bags",
    luggageAr: "٤ حقائب كبيرة + حقائب طرية",
    feature: "Boxy adventure stance · elevated cabin",
    featureAr: "هيئة مغامرة قوية · مقصورة مرتفعة",
    privacy: "Dark tint · commanding road presence",
    privacyAr: "زجاج معتم · حضور مهيب على الطريق",
    entertainment: "Large digital displays · modern cockpit",
    entertainmentAr: "شاشات رقمية كبيرة · كمرة عصرية",
    amenities: [
      "Uniformed Sahra chauffeur",
      "Rugged off-road-inspired exterior",
      "Elevated seating with clear road view",
      "All-terrain ready stance for coast / desert roads",
      "Dark privacy glass",
      "Spacious 5-seat cabin",
      "Large cargo capacity for weekend luggage",
      "Dual digital driver displays",
      "Multi-zone climate comfort",
      "High-speed Wi-Fi hotspot",
      "Welcome drinks & bottled water",
      "Roof rails for extra gear on request",
      "Ideal for North Coast & outdoor VIP days",
    ],
    amenitiesAr: [
      "سائق سهرة بزي رسمي",
      "تصميم خارجي بطابع مغامر قوي",
      "جلسة مرتفعة برؤية طريق واضحة",
      "جاهزية للطرق الساحلية / الصحراوية",
      "زجاج خصوصية معتم",
      "مقصورة رحبة لـ ٥ ركاب",
      "صندوق أمتعة واسع لعطلة نهاية الأسبوع",
      "شاشات رقمية مزدوجة للسائق",
      "راحة مناخية متعددة المناطق",
      "واي فاي عالي السرعة",
      "مشروبات ترحيبية ومياه معدنية",
      "قضبان سقف لمعدات إضافية عند الطلب",
      "مثالية لأيام الساحل والخروج VIP",
    ],
    image: "/cars/covers/jetour-t2.jpg",
    heroImage: "/cars/covers/jetour-t2.jpg",
    gallery: [
      "/cars/covers/jetour-t2.jpg",
      "/cars/details/jetour-t2/exterior.jpg",
      "/cars/details/jetour-t2/fleet-lineup.jpg",
    ],
    about:
      "A silver Jetour T2 built for VIP travel that needs presence — boxy adventure proportions, elevated comfort, and space for coast or desert routes with a Sahra chauffeur at the wheel.",
    aboutAr:
      "جيتور T2 فضية بتنقلات VIP تحتاج حضورًا — هيئة مغامرة، راحة مرتفعة، ومساحة للطرق الساحلية أو الصحراوية مع سائق سهرة خلف المقود.",
    lede:
      "Adventure-ready presence for city, coast, and beyond.",
    ledeAr:
      "حضور جاهز للمغامرة في المدينة والساحل وما بعدهما.",
  },
  {
    slug: "chery-tiggo-7",
    name: "Chery Tiggo 7 Pro",
    nameAr: "شيري تيجو 7 برو",
    category: "Modern SUV",
    categoryAr: "دفع رباعي عصري",
    passengers: 5,
    luggage: "3–4 large suitcases",
    luggageAr: "٣–٤ حقائب كبيرة",
    feature: "Digital cockpit · panoramic comfort",
    featureAr: "كمرة رقمية · راحة بانورامية",
    privacy: "Elevated seating · tinted cabin",
    privacyAr: "جلسة مرتفعة · مقصورة معتمة",
    entertainment: "Wide landscape touchscreen · connected audio",
    entertainmentAr: "شاشة أفقية عريضة · صوت متصل",
    amenities: [
      "Uniformed Sahra chauffeur",
      "Crisp white modern exterior",
      "Leather seats with contrast stitching",
      "Large horizontal infotainment screen",
      "Fully digital instrument cluster",
      "Panoramic roof (where equipped)",
      "Dual-zone climate control",
      "Keyless entry / push-button start",
      "Rear camera & parking aids",
      "High-speed Wi-Fi hotspot",
      "Bottled water & phone chargers",
      "Perfect for family city-to-coast transfers",
    ],
    amenitiesAr: [
      "سائق سهرة بزي رسمي",
      "هيكل أبيض عصري أنيق",
      "مقاعد جلدية بتطريز متباين",
      "شاشة معلومات أفقية كبيرة",
      "عدادات رقمية بالكامل",
      "سقف بانورامي (حسب التجهيز)",
      "تكييف ثنائي المناطق",
      "دخول بدون مفتاح / تشغيل بزر",
      "كاميرا خلفية ومساعدات ركن",
      "واي فاي عالي السرعة",
      "مياه معدنية وشواحن هاتف",
      "مثالية لتنقل العائلة من المدينة للساحل",
    ],
    image: "/cars/covers/tiggo-7-white.jpg",
    heroImage: "/cars/covers/tiggo-7-white.jpg",
    gallery: [
      "/cars/covers/tiggo-7-white.jpg",
      "/cars/covers/tiggo-7-interior.jpg",
    ],
    about:
      "A crisp white Tiggo 7 Pro for modern VIP days — elevated seating, a digital cockpit, and enough room for family luggage without losing polish.",
    aboutAr:
      "تيجو 7 برو بيضاء لأيام VIP عصرية — جلسة مرتفعة، كمرة رقمية، ومساحة لأمتعة العائلة بلا تنازل عن الأناقة.",
    lede: "Modern height, tech, and space — city to coast.",
    ledeAr: "ارتفاع عصري وتقنيات ومساحة — من المدينة للساحل.",
  },
  {
    slug: "chery-tiggo-8-pro",
    name: "Chery Tiggo 8 Pro",
    nameAr: "شيري تيجو 8 برو",
    category: "Luxury Family SUV",
    categoryAr: "دفع رباعي عائلي فاخر",
    passengers: 7,
    luggage: "4–5 large suitcases (3rd row folded)",
    luggageAr: "٤–٥ حقائب كبيرة (مع طي الصف الثالث)",
    feature: "7 seats · privacy glass · tri-zone AC",
    featureAr: "٧ مقاعد · زجاج معتم · تكييف ثلاثي",
    privacy: "Tinted rear glass · group discretion",
    privacyAr: "زجاج خلفي معتم · خصوصية للمجموعة",
    entertainment: "Smart cabin · multi-screen connectivity",
    entertainmentAr: "مقصورة ذكية · اتصال متعدد الشاشات",
    amenities: [
      "Uniformed Sahra chauffeur",
      "Genuine 7-seat configuration",
      "Privacy glass on rear windows",
      "Tri-zone climate control",
      "Spacious second-row comfort",
      "Fold-flat third row for oversized luggage",
      "Panoramic sunroof (where equipped)",
      "Chrome-accented premium exterior",
      "Large touchscreen + digital cluster",
      "High-speed Wi-Fi hotspot",
      "Welcome drinks for the whole group",
      "Ideal for families & VIP friend groups",
      "Airport multi-bag pickup ready",
    ],
    amenitiesAr: [
      "سائق سهرة بزي رسمي",
      "تجهيز حقيقي بـ ٧ مقاعد",
      "زجاج خصوصية للنوافذ الخلفية",
      "تكييف ثلاثي المناطق",
      "راحة فائقة للصف الثاني",
      "صف ثالث قابل للطي لأمتعة كبيرة",
      "سقف بانورامي (حسب التجهيز)",
      "لمسات كروم خارجية فاخرة",
      "شاشة لمس كبيرة + عدادات رقمية",
      "واي فاي عالي السرعة",
      "مشروبات ترحيبية لكل المجموعة",
      "مثالية للعائلات ومجموعات الـ VIP",
      "جاهزة لاستلام أمتعة المطار المتعددة",
    ],
    image: "/cars/covers/tiggo-8-front.jpg",
    heroImage: "/cars/covers/tiggo-8-front.jpg",
    gallery: [
      "/cars/covers/tiggo-8-front.jpg",
      "/cars/covers/tiggo-8-open.jpg",
      "/cars/covers/tiggo-8-rear.jpg",
    ],
    about:
      "A commanding 7-seater for groups who refuse to split across cars — privacy glass, tri-zone comfort, and luggage space that keeps the weekend intact.",
    aboutAr:
      "دفع رباعي بـ ٧ مقاعد للمجموعات اللي مش هتتفرق على عربيات — زجاج معتم، راحة مناخية ثلاثية، ومساحة أمتعة تحفظ الإجازة كاملة.",
    lede: "Seven seats of composed family luxury.",
    ledeAr: "سبعة مقاعد بفخامة عائلية هادئة.",
  },
  {
    slug: "mg-g50",
    name: "MG G50",
    nameAr: "إم جي G50",
    category: "Luxury MPV",
    categoryAr: "حافلة عائلية فاخرة",
    passengers: 7,
    luggage: "4 large suitcases + cabin bags",
    luggageAr: "٤ حقائب كبيرة + حقائب كابينة",
    feature: "Captain seats · rear entertainment screens",
    featureAr: "مقاعد كابتن · شاشات ترفيه خلفية",
    privacy: "High-roof cabin · tinted glass",
    privacyAr: "مقصورة مرتفعة · زجاج معتم",
    entertainment: "Headrest screens · dual digital cockpit",
    entertainmentAr: "شاشات خلف المقاعد · كمرة رقمية مزدوجة",
    amenities: [
      "Uniformed Sahra chauffeur",
      "VIP captain’s chairs in the middle row",
      "Individual rear entertainment screens",
      "Tan / tobacco luxury leather cabin",
      "High-roof spacious MPV silhouette",
      "Dual digital cockpit displays",
      "Independent rear climate controls",
      "USB / power outlets for every row",
      "High-speed Wi-Fi for the whole cabin",
      "Welcome drinks & tissues always stocked",
      "Sliding access ease for elders & children",
      "Perfect for hotel transfers & group arrivals",
      "Pristine, near-new presentation standards",
    ],
    amenitiesAr: [
      "سائق سهرة بزي رسمي",
      "مقاعد كابتن VIP في الصف الأوسط",
      "شاشات ترفيه فردية للركاب الخلفيين",
      "مقصورة جلد فاخر بلون تبغ / تان",
      "هيكل MPV مرتفع ورحب",
      "كمرة رقمية مزدوجة",
      "تحكم مناخي خلفي مستقل",
      "منافذ USB / كهرباء لكل صف",
      "واي فاي عالي السرعة لكامل المقصورة",
      "مشروبات ترحيبية ومناديل دائمًا جاهزة",
      "دخول سهل للكبار والأطفال",
      "مثالية لتنقلات الفنادق ووصول المجموعات",
      "معايير تقديم نظيفة وكأنها جديدة",
    ],
    image: "/cars/covers/mg-g50-front.jpg",
    heroImage: "/cars/covers/mg-g50-front.jpg",
    gallery: [
      "/cars/covers/mg-g50-front.jpg",
      "/cars/covers/mg-g50-night.jpg",
      "/cars/covers/mg-mpv-interior.jpg",
      "/cars/covers/mg-g50-cabin.jpg",
    ],
    about:
      "A premium MG G50 for VIP groups who want lounge comfort on the move — captain chairs, rear screens, and a cabin that feels brand-new every time.",
    aboutAr:
      "إم جي G50 فاخرة لمجموعات VIP عايزين راحة لاونج أثناء التحرك — مقاعد كابتن، شاشات خلفية، ومقصورة بتحس إنها جديدة في كل رحلة.",
    lede: "Lounge-level group travel without compromise.",
    ledeAr: "تنقل جماعي بمستوى لاونج… بلا تنازل.",
  },
  {
    slug: "mg-rx8",
    name: "MG RX8",
    nameAr: "إم جي RX8",
    category: "Premium 7-Seater SUV",
    categoryAr: "دفع رباعي فاخر ٧ مقاعد",
    passengers: 7,
    luggage: "4–5 large suitcases",
    luggageAr: "٤–٥ حقائب كبيرة",
    feature: "Dual digital cockpit · saddle leather",
    featureAr: "كمرة رقمية مزدوجة · جلد سرجي فاخر",
    privacy: "Full-size SUV discretion · tinted glass",
    privacyAr: "خصوصية SUV كامل الحجم · زجاج معتم",
    entertainment: "Dual high-res displays · premium audio",
    entertainmentAr: "شاشات عالية الدقة مزدوجة · صوت فاخر",
    amenities: [
      "Uniformed Sahra chauffeur",
      "Full-size three-row SUV layout",
      "Saddle-brown / tan premium leather",
      "Dual high-resolution digital displays",
      "Power-adjustable front seats",
      "Soft-touch dashboard with metallic trim",
      "Spacious third-row option for short hops",
      "Large cargo mode with seats folded",
      "Multi-zone climate comfort",
      "High-speed Wi-Fi hotspot",
      "Welcome drinks & phone charging",
      "Ideal for executive groups & airport parties",
      "Night-ready ambient cabin presence",
    ],
    amenitiesAr: [
      "سائق سهرة بزي رسمي",
      "دفع رباعي كامل الحجم بثلاث صفوف",
      "جلد فاخر بني سرجي / تان",
      "شاشات رقمية مزدوجة عالية الدقة",
      "مقاعد أمامية كهربائية الضبط",
      "لوحة قيادة ناعمة بلمسات معدنية",
      "صف ثالث مناسب للمسافات القصيرة",
      "وضع أمتعة كبير مع طي المقاعد",
      "راحة مناخية متعددة المناطق",
      "واي فاي عالي السرعة",
      "مشروبات ترحيبية وشحن هواتف",
      "مثالية للمجموعات التنفيذية واستقبال المطار",
      "حضور مقصورة بإضاءة تليق بالليل",
    ],
    image: "/cars/covers/mg-rx8.jpg",
    heroImage: "/cars/covers/mg-rx8.jpg",
    gallery: [
      "/cars/covers/mg-rx8.jpg",
      "/cars/covers/mg-rx8-interior.jpg",
    ],
    about:
      "A full-size MG RX8 with dual digital calm and saddle-brown leather — built for executive groups who need seven seats without losing the VIP feel.",
    aboutAr:
      "إم جي RX8 كاملة الحجم بهدوء رقمي مزدوج وجلد بني فاخر — لمجموعات تنفيذية محتاجة ٧ مقاعد من غير ما تفقد إحساس الـ VIP.",
    lede: "Seven seats. Dual digital calm. Executive presence.",
    ledeAr: "سبعة مقاعد. هدوء رقمي مزدوج. حضور تنفيذي.",
  },
];

export function getVipCarBySlug(slug: string): VipCar | undefined {
  return vipCars.find((c) => c.slug === slug);
}

export function getAllVipCarSlugs(): string[] {
  return vipCars.map((c) => c.slug);
}

export function carName(car: VipCar, locale: string): string {
  return locale === "ar" ? car.nameAr : car.name;
}

export function carCategory(car: VipCar, locale: string): string {
  return locale === "ar" ? car.categoryAr : car.category;
}

export function carLuggage(car: VipCar, locale: string): string {
  return locale === "ar" ? car.luggageAr : car.luggage;
}

export function carFeature(car: VipCar, locale: string): string {
  return locale === "ar" ? car.featureAr : car.feature;
}

export function carAbout(car: VipCar, locale: string): string {
  return locale === "ar" ? car.aboutAr : car.about;
}

export function carLede(car: VipCar, locale: string): string {
  return locale === "ar" ? car.ledeAr : car.lede;
}

export function carPrivacy(car: VipCar, locale: string): string {
  return locale === "ar" ? car.privacyAr : car.privacy;
}

export function carEntertainment(car: VipCar, locale: string): string {
  return locale === "ar" ? car.entertainmentAr : car.entertainment;
}

export function carAmenities(car: VipCar, locale: string): string[] {
  return locale === "ar" ? car.amenitiesAr : car.amenities;
}
