import type { Locale } from "./config";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "201027059930";

export const SNAPCHAT_USERNAME = "sahraeg";
export const SNAPCHAT_URL = `https://www.snapchat.com/add/${SNAPCHAT_USERNAME}`;

const ar = {
  meta: {
    title: "أفضل سهرات في مصر · أماكن سهر ونايت كلوب · حجز ترابيزة | سهرة",
    description:
      "أفضل سهرات في مصر — أماكن سهر في القاهرة والساحل الشمالي والجونة: روفتوبات، ديسكو، نايت كلوب، بيتش كلوبز وحفلات مراكب. احجز ليلتك على الواتساب في ساعتين وتدخل من غير انتظار.",
    keywords: [
      "أفضل سهرات في مصر",
      "أماكن سهر في مصر",
      "أفضل سهرات",
      "ديسكو مصر",
      "نايتات في مصر",
      "سهرات في مصر",
      "نايت كلوب مصر",
      "أفضل نايت كلوب في مصر",
      "أماكن سهر القاهرة",
      "سهرات الساحل الشمالي",
      "حجز سهرات",
      "حجز ترابيزة",
      "بيتش كلوب الساحل الشمالي",
      "سهرات الجونة",
      "روفتوب القاهرة",
      "حفلات مراكب النيل",
      "ترابيزة VIP",
      "سهرات شرم الشيخ",
      "كونسييرج سهر مصر",
      "حجز نايت كلوب مصر",
      "الساحل الشمالي",
    ],
    areaServed: ["الساحل الشمالي", "القاهرة", "الجونة", "شرم الشيخ", "الغردقة"],
    businessName: "سهرة — كونسييرج السهر في مصر",
  },
  nav: {
    how: "طريقة الحجز",
    venues: "أنواع السهرات",
    trust: "ليه تختارنا",
    reserve: "احجز مكانك",
    dashboard: "لوحة التحكم",
  },
  hero: {
    eyebrow: "كونسييرج السهر في مصر — القاهرة · الساحل الشمالي · الجونة · شرم الشيخ",
    titleTop: "ليلتك",
    titleAccent: "متظبطة",
    titleBottom: "قبل ما توصل.",
    lede:
      "اختار نوع السهرة اللي في بالك — روفتوب على النيل، حفلة مركب، بيتش كلوب، أو ترابيزة VIP — وسيب الباقي علينا. التعامل بيكون معايا شخصيًا، بياناتك محفوظة وما بتتشاركش مع أي جهة، وكل مكان بنرشحه متجرّب بنفسنا قبل كده.",
    ctaPrimary: "كلّمنا على الواتساب",
    ctaSecondary: "اطلب ترابيزة",
    trust: [
      { value: "خصوصية تامة", label: "بياناتك ما بتتشاركش" },
      { value: "٢–٣ ساعات", label: "متوسط وقت التأكيد" },
      { value: "عربي / إنجليزي", label: "خدمة بلغتك" },
      { value: "٧ أيام", label: "متاحين طول الأسبوع" },
    ],
    chat: {
      name: "سهرة كونسييرج",
      status: "● متاحين دلوقتي",
      messages: [
        { side: "out", text: "محتاج ترابيزة لـ ٦ أفراد، ليلة الجمعة، ومطلة على النيل 🌙" },
        { side: "in", text: "تحت أمرك — عندنا روفتوب مميز، الساعة ١١، ودخول من غير انتظار على الباب." },
        { side: "in", text: "الحد الأدنى للصرف مناسب لعدد ٦ أفراد. أأكد الحجز؟" },
        { side: "out", text: "أيوه، أكّد من فضلك 🙌" },
      ],
      confirm: [
        "RESERVATION CONFIRMED — SAH-2291",
        "Fri · 23:00 · Party of 6",
        "كود الحجز اتبعت — اعرضه عند الوصول",
      ],
    },
  },
  how: {
    eyebrow: "طريقة الحجز",
    title: "٣ خطوات،",
    titleAccent: "وليلة متظبطة.",
    lede:
      "من غير تطبيق تحمّله ولا حساب تعمله. كل حاجة بتمشي على الواتساب، وإحنا بنتولى التنسيق مع المكان بالكامل.",
    steps: [
      {
        num: "01 — التفاصيل",
        title: "ابعتلنا تفاصيل ليلتك",
        body: "التاريخ، المدينة، عدد الأفراد، ونوع الجو اللي يناسبك — روفتوب هادي، حفلة مركب، أو ترابيزة VIP مع بوتل سيرفيس.",
      },
      {
        num: "02 — التنسيق",
        title: "بنحجز ونتابع بنفسنا",
        body: "بنتواصل مباشرة مع إدارة كل مكان، ونرشحلك الخيارات بأسعارها، ونثبّت الترابيزة باسمك قبل الميعاد.",
      },
      {
        num: "03 — الوصول",
        title: "تيجي وتدخل على طول",
        body: "هيوصلك تأكيد على الواتساب بكود الحجز. تقول اسمك عند الباب وتدخل من غير انتظار.",
      },
    ],
  },
  trust: {
    eyebrow: "راحة بالك الأول",
    title: "ثقتك",
    titleAccent: "أهم من أي حجز.",
    lede: "إحنا عارفين إن الخصوصية على رأس أولوياتك، فأي تفاصيل بينا تفضل بينا إحنا بس.",
    items: [
      {
        icon: "shield",
        title: "خصوصية كاملة",
        body: "اسمك ورقمك ما بيوصلوش لأي جهة تانية. مفيش مشاركة بيانات، ولا رسايل دعائية، ولا متابعة بعد نهاية رحلتك.",
      },
      {
        icon: "user",
        title: "تعامل مع شخص حقيقي",
        body: "مفيش بوت ولا ردود آلية. بنرد عليك بنفسنا ونتابع طلبك من أول رسالة لحد ما تستقر على ترابيزتك.",
      },
      {
        icon: "check",
        title: "أماكن متجرّبة فعليًا",
        body: "ما بنرشحش مكان قبل ما نزوره ونتأكد منه. مستوى الخدمة والاحترام شرط أساسي قبل ما نضيفه لقائمتنا.",
      },
    ],
  },
  ticker: [
    "أفضل سهرات في مصر — احجز من مكان واحد",
    "أماكن سهر في القاهرة والساحل الشمالي",
    "ترابيزتك جاهزة قبل ما توصل",
    "تأكيد في ٢–٣ ساعات",
    "دخول من غير وقفة على الباب",
    "أحلى ليالي الساحل الشمالي",
    "روفتوبات على النيل",
    "حفلات مراكب وسهرات لحد الفجر",
    "ترابيزات VIP وقدام الـ DJ",
    "احجز دلوقتي على الواتساب",
  ],
  venues: {
    eyebrow: "أنواع السهرات",
    title: "أي جو",
    titleAccent: "تفضّله، هتلاقيه عندنا.",
    namesTitle: "أماكن الساحل الشمالي والقاهرة اللي بنظبط فيها حجوزات",
    tickerSahel: "الساحل الشمالي",
    tickerCairo: "القاهرة",
    namesNote:
      "بنحجز ترابيزات في أشهر بيتش كلوبز وروفتوبات ونوادٍ ليلية في القاهرة والساحل الشمالي. سهرة خدمة كونسييرج مستقلة وغير تابعة للأماكن دي، والأسماء التجارية ملك أصحابها وبنذكرها للتوضيح بس.",
    items: [
      {
        tag: "القاهرة",
        title: "روفتوبات على النيل",
        body: "بداية هادية للسهرة بإطلالة مباشرة على النيل — موسيقى مناسبة ومساحة مريحة للجلوس والكلام.",
      },
      {
        tag: "القاهرة",
        title: "حفلات المراكب",
        body: "ليالي دي جي على النيل. بننسّق الصعود وترتيب الترابيزات بحيث تقعد مع مجموعتك في مكان واحد.",
      },
      {
        tag: "الساحل الشمالي والجونة",
        title: "بيتش كلوبز",
        body: "أماكن على الساحل الشمالي والبحر الأحمر تكمل من النهار لليل — لاونجرز بالنهار وسهرة بالليل.",
      },
      {
        tag: "القاهرة وشرم الشيخ",
        title: "ترابيزات VIP",
        body: "بوتل سيرفيس، مضيف مخصص، وترابيزة محجوزة باسمك — مناسبة لأعياد الميلاد والمناسبات والمجموعات الكبيرة.",
      },
      {
        tag: "كل الأماكن",
        title: "جيست ليست ودخول مباشر",
        body: "من غير أي نقاش عند الباب. اسمك بيتسجل على الليستة قبل ما تتحرك من الفندق.",
      },
      {
        tag: "كل الأماكن",
        title: "برنامج ليلة كاملة",
        body: "العشا، البريدرينكس، والمكان الأخير — كله منسّق كليلة واحدة بدل ٣ حجوزات منفصلة.",
      },
    ],
  },
  gallery: {
    eyebrow: "من ليالينا",
    title: "شوف الأماكن",
    titleAccent: "قبل ما تحجز.",
    lede: "صور من سهرات ظبطناها لعملائنا في القاهرة والساحل الشمالي والجونة وشرم الشيخ.",
    fallbackAlt: "سهرة من تنظيم سهرة كونسييرج في مصر",
  },
  testimonials: {
    eyebrow: "رسايل وصلتنا",
    title: "كلام",
    titleAccent: "عملاء من الخليج،",
    titleEnd: "زي ما وصلنا بالظبط.",
    lede: "ما غيّرناش فيها ولا كلمة — منقولة زي ما وصلت على الواتساب.",
    // بعد ما تاخد إذن العميل، ضيف `name` وهيظهر قبل المدينة — مثال:
    // { text: "…", name: "أحمد ع.", who: "الرياض" }
    items: [
      { text: "ماشاء الله عليك، السهرة كانت فوق الممتاز 🙌 من أول رسالة إلى ما قعدنا على الطاولة كل شي كان مرتب.", who: "عميل من الرياض" },
      { text: "والله كفيتي ووفيتي 🌹 كنا خايفين الموضوع يصير معقد بس أنتِ سهلتيه علينا من أول دقيقة.", who: "عميلة من دبي" },
      { text: "خصوصيتنا كانت أهم شي عندنا، وأنتم قدرتوا الموضوع تمام من غير ما نسأل مرتين.", who: "عميل من الكويت" },
      { text: "أبد ما توقعت الأمور تمشي بهالسهولة، وصلنا القاهرة وكل شي جاهز زي ما اتفقنا بالظبط. تسلمين 🙏", who: "عميلة من الدوحة" },
    ] as { text: string; who: string; name?: string }[],
  },
  form: {
    eyebrow: "اطلب ترابيزة",
    title: "كلّمنا عن",
    titleAccent: "الليلة اللي في بالك.",
    lede: "املا البيانات وهنرد عليك على الواتساب بالخيارات والأسعار — عادةً في ساعتين لتلاتة.",
    fields: {
      name: "الاسم كامل",
      namePlaceholder: "اكتب اسمك",
      phone: "رقم الواتساب",
      phonePlaceholder: "+966 5X XXX XXXX",
      city: "المدينة",
      date: "تاريخ السهرة",
      guests: "عدد الأفراد",
      type: "نوع السهرة",
      budget: "الميزانية التقديرية",
      notes: "تفاصيل إضافية",
      notesPlaceholder: "أي طلب خاص: المناسبة، الإطلالة، نوع الموسيقى…",
      optional: "اختياري",
    },
    cities: ["القاهرة", "الجونة", "الساحل الشمالي", "شرم الشيخ", "الغردقة"],
    types: ["روفتوب", "حفلة مركب", "بيتش كلوب", "ترابيزة VIP", "برنامج ليلة كاملة"],
    budgets: ["أقل من ٥٠٠٠ ج", "٥٠٠٠ – ١٥٠٠٠ ج", "١٥٠٠٠ – ٣٠٠٠٠ ج", "أكثر من ٣٠٠٠٠ ج"],
    submit: "إرسال الطلب",
    submitting: "جاري الإرسال…",
    note: "وبكده خلصنا — هنكلمك على الواتساب مباشرة لتثبيت التفاصيل.",
    or: "أو",
    whatsappDirect: "افتح شات الواتساب مباشرة",
    snapchatDirect: "افتح شات سناب شات",
    successTitle: "تم إرسال طلبك.",
    successBody: "طلبك وصلنا، وهنرد عليك على الواتساب بالخيارات والأسعار — عادةً في ساعتين لتلاتة.",
    successRef: "رقم طلبك",
    newRequest: "إرسال طلب تاني",
    error: "حصلت مشكلة في الإرسال. حاول تاني أو كلّمنا على الواتساب.",
    required: "لازم تكتب الاسم ورقم الواتساب.",
  },
  modal: {
    eyebrow: "قبل ما تكمّل تصفّح",
    title: "سيب اسمك ورقم الواتساب — وهنبعتلك خيارات الليلة بنفسنا",
    submit: "إرسال",
    successTitle: "تم الإرسال.",
    successBody: "هتوصلك رسالة على الواتساب في خلال لحظات.",
    or: "أو",
    whatsappDirect: "افتح الواتساب مباشرة ←",
    close: "إغلاق",
  },
  social: {
    title: "تابعنا على سناب شات",
    body: "بننزل سنابات من الأماكن أول بأول — تشوف الجو والزحمة وأحدث الحفلات قبل ما تختار ليلتك.",
    snapchat: "أضفنا على سناب شات",
    handle: "sahraeg",
  },
  privacy: {
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: أغسطس ٢٠٢٦",
    intro:
      "الخصوصية عندنا مش بند في صفحة، هي أساس الخدمة. الصفحة دي بتوضح بالتحديد إيه البيانات اللي بناخدها، بنستخدمها في إيه، ومين ممكن يشوفها.",
    backHome: "رجوع للصفحة الرئيسية",
    sections: [
      {
        title: "البيانات اللي بناخدها",
        body: "لما تبعت طلب حجز، بناخد الاسم ورقم الواتساب، وبشكل اختياري المدينة وتاريخ السهرة وعدد الأفراد ونوع السهرة والميزانية التقديرية وأي ملاحظات تكتبها. وبنسجّل كذلك وقت إرسال الطلب ولغة الموقع اللي استخدمتها.",
      },
      {
        title: "تسجيل الضغط على زر الواتساب",
        body: "لما تضغط على أي زر واتساب في الموقع، بنسجّل إن فيه ضغطة حصلت: الزر اللي استخدمته، الصفحة، اللغة، والدولة بشكل عام. مش بنسجّل رقمك ولا محتوى محادثتك، ومحادثة الواتساب نفسها بتحصل على تطبيق واتساب مباشرة وسياسة الخصوصية بتاعته هي اللي تحكمها.",
      },
      {
        title: "استخدام البيانات",
        body: "بنستخدم بياناتك لغرض واحد: إننا نرد عليك ونظبط حجزك. وعند الحجز بنبلّغ المكان بالاسم وعدد الأفراد فقط — القدر اللي يخليهم يثبّتوا الترابيزة باسمك، من غير أي تفاصيل زيادة.",
      },
      {
        title: "اللي مش بنعمله",
        body: "ما بنبيعش بياناتك ولا بنشاركها لأغراض تسويقية، وما بنبعتش رسايل دعائية، وما بنضيفكش على أي قوائم بريدية، وما بنستخدمش كوكيز تتبّع إعلاني على الموقع.",
      },
      {
        title: "مدة الاحتفاظ بالبيانات",
        body: "بنحتفظ بطلبات الحجز طول ما هي مفيدة لخدمتك (زي إننا نتعرف عليك لو رجعت تحجز تاني). تقدر تطلب حذف بياناتك في أي وقت برسالة واتساب واحدة، وبنحذفها بالكامل.",
      },
      {
        title: "أمان البيانات",
        body: "الطلبات بتتخزن في قاعدة بيانات مؤمّنة، والوصول للوحة التحكم محمي بحساب خاص بنا. الموقع كله بيعمل على اتصال مشفّر (HTTPS).",
      },
      {
        title: "حقوقك",
        body: "من حقك تعرف البيانات المسجلة عنك، وتصححها، أو تطلب حذفها. كلّمنا على الواتساب وهننفّذ طلبك في أسرع وقت.",
      },
      {
        title: "السن القانوني",
        body: "الخدمة موجهة للأشخاص البالغين اللي سنهم يسمح بدخول الأماكن اللي بنحجز فيها حسب قوانين المكان.",
      },
      {
        title: "التواصل",
        body: "أي سؤال أو طلب متعلق بخصوصيتك، كلّمنا مباشرة على الواتساب وهنرد عليك بنفسنا.",
      },
    ],
  },
  footer: {
    links: {
      whatsapp: "واتساب",
      venues: "أنواع السهرات",
      reserve: "اطلب ترابيزة",
      dashboard: "لوحة التحكم",
      privacy: "سياسة الخصوصية",
      snapchat: "سناب شات",
    },
    note:
      "سهرة خدمة كونسييرج مستقلة متخصصة في تنظيم السهر في مصر، وغير تابعة للأماكن اللي بنحجز فيها. الحجز بيتأكد رسميًا بعد التواصل على الواتساب.",
    rights: "كل الحقوق محفوظة",
  },
  seo: {
    eyebrow: "دليل السهر في مصر",
    title: "أفضل سهرات في مصر —",
    titleAccent: "أماكن سهر ونايت كلوب في القاهرة والساحل.",
    paragraphs: [
      "لو بتدور على أفضل سهرات في مصر أو أماكن سهر في مصر، سهرة بتجمّعلك روفتوبات على النيل، ديسكو ونايت كلوب في القاهرة، وبيتش كلوبز على الساحل الشمالي — ونحجزلك ترابيزة باسمك ودخول مباشر.",
      "سهرات الساحل الشمالي في الصيف: بنحجز في البيتش كلوبز والحفلات على طول الساحل ومارينا وسيدي عبد الرحمن. في القاهرة: حفلات مراكب، ترابيزات VIP، وأشهر نايتات في مصر — كلها من مكان واحد على الواتساب.",
      "مش محتاج تدور على «ديسكو مصر» أو «نايتات في مصر» في جوجل وتتصل بكل مكان لوحده. ابعتنا التاريخ وعدد الأفراد، ونرجعلك بالتوفر والحد الأدنى للصرف، والتأكيد في ساعتين لتلاتة.",
    ],
    faqTitle: "أسئلة شائعة عن السهر في مصر",
    faq: [
      {
        q: "إيه أفضل سهرات في مصر؟",
        a: "القاهرة فيها روفتوبات على النيل وحفلات مراكب ونايت كلوب في الزمالك والتجمع. الساحل الشمالي في الصيف فيه أشهر بيتش كلوبز وحفلات. الجونة وشرم الشيخ فيها سهرات طول السنة. سهرة بترشحلك حسب ميزانيتك ونوع الليلة اللي عايزها.",
      },
      {
        q: "فين ألاقي أماكن سهر في مصر؟",
        a: "أماكن السهر في مصر متوزعة: القاهرة (روفتوب، مراكب، ديسكو)، الساحل الشمالي (بيتش كلوبز)، الجونة وشرم والغردقة (سهرات ساحلية). ابعتنا المدينة والتاريخ على الواتساب ونقولك الخيارات المتاحة.",
      },
      {
        q: "إزاي أحجز في ديسكو أو نايت كلوب في مصر؟",
        a: "ابعتلنا على الواتساب: التاريخ، عدد الأفراد، والمدينة. بنرجعلك بالأماكن المتاحة والحد الأدنى للصرف، وبعد موافقتك نثبّت الترابيزة باسمك ونبعتلك تأكيد — دخول من غير انتظار على الباب.",
      },
      {
        q: "ينفع أحجز نايتات في مصر من برّة؟",
        a: "أيوه. بنخدم بالعربي والإنجليزي، وبنظبط حجوزات للزوار من السعودية والخليج ومصريين مقيمين برّة. كل التنسيق على الواتساب قبل ما توصل.",
      },
    ],
  },
  whatsappMessage: "مرحبًا، محتاج أحجز ترابيزة",
  langSwitch: "English",
} as const;

const en = {
  meta: {
    title: "Best Nightlife in Egypt · Nightclubs & Party Booking | Sahra",
    description:
      "Best nightlife in Egypt — nightclubs, discos, rooftops and beach clubs in Cairo and the North Coast. Book your table on WhatsApp in hours and skip the queue.",
    keywords: [
      "best nightlife in Egypt",
      "nightlife places in Egypt",
      "Egypt nightclub",
      "disco Egypt",
      "nights out in Egypt",
      "nightlife in Egypt",
      "North Coast Egypt nightlife",
      "Sahel beach club booking",
      "El Gouna party",
      "Cairo nightclub table",
      "Cairo rooftop bar",
      "Nile boat party",
      "VIP table Egypt",
      "Sharm El Sheikh nightlife",
      "Egypt nightlife concierge",
      "book a table Cairo",
    ],
    areaServed: ["North Coast", "Cairo", "El Gouna", "Sharm El Sheikh", "Hurghada"],
    businessName: "Sahra — Nightlife Concierge in Egypt",
  },
  nav: {
    how: "How it works",
    venues: "Experiences",
    trust: "Why trust us",
    reserve: "Book my table",
    dashboard: "Dashboard",
  },
  hero: {
    eyebrow: "Nightlife concierge — Cairo · El Gouna · North Coast · Sharm El Sheikh",
    titleTop: "Your night is",
    titleAccent: "handled",
    titleBottom: "before you land.",
    lede:
      "Tell me the kind of night you want — rooftop, Nile boat, beach club, VIP table — and I take care of the rest. You deal with me personally, your details are never shared, and every venue I recommend is one I have been to myself.",
    ctaPrimary: "Message me on WhatsApp",
    ctaSecondary: "Request a table",
    trust: [
      { value: "Full privacy", label: "Your data stays with me" },
      { value: "2–3 hours", label: "Average confirmation time" },
      { value: "Arabic / English", label: "Served in your language" },
      { value: "7 days", label: "Available all week" },
    ],
    chat: {
      name: "Sahra Concierge",
      status: "● Online now",
      messages: [
        { side: "out", text: "Need a table for 6 on Friday night, something over the Nile 🌙" },
        { side: "in", text: "Done — I have a great rooftop, 11 PM, no queue at the door." },
        { side: "in", text: "The minimum spend works for a party of 6. Shall I confirm?" },
        { side: "out", text: "Yes, please confirm 🙌" },
      ],
      confirm: ["RESERVATION CONFIRMED — SAH-2291", "Fri · 23:00 · Party of 6", "Code sent — show it on arrival"],
    },
  },
  how: {
    eyebrow: "How it works",
    title: "Three steps,",
    titleAccent: "one perfect night.",
    lede: "No app to download, no account to create. It works like planning a night out with a friend who knows the city.",
    steps: [
      {
        num: "01 — Tell me",
        title: "Send the details",
        body: "Date, city, party size and the mood you want — a calm rooftop, a boat party, or a VIP table with bottle service.",
      },
      {
        num: "02 — I arrange it",
        title: "I book it myself",
        body: "I speak directly to the people I work with at every venue, so you skip the queue and the guesswork at the door.",
      },
      {
        num: "03 — You arrive",
        title: "Show the code, walk in",
        body: "You get a WhatsApp confirmation with a code. Give your name at the door — that is it.",
      },
    ],
  },
  trust: {
    eyebrow: "Peace of mind first",
    title: "Your trust matters",
    titleAccent: "more than any booking.",
    lede: "We know privacy comes first, so everything between us stays between us.",
    items: [
      {
        icon: "shield",
        title: "Complete privacy",
        body: "Your name and number never go anywhere but to me. No data sharing, no ads, no follow-up after your trip.",
      },
      {
        icon: "user",
        title: "A real person, always",
        body: "No bots, no auto-replies. I answer you personally and follow your request from the first message until you are seated.",
      },
      {
        icon: "check",
        title: "Venues I have tested",
        body: "I never recommend a place I have not visited myself. Service quality and respect are a condition before I add it.",
      },
    ],
  },
  ticker: [
    "Best nightlife in Egypt — book from one place",
    "Nightlife in Cairo and the North Coast",
    "Your table is ready before you arrive",
    "Confirmed in 2–3 hours",
    "Straight in, no queue at the door",
    "The best North Coast nights",
    "Rooftops over the Nile",
    "Boat parties until sunrise",
    "VIP tables right by the DJ",
    "Book now on WhatsApp",
  ],
  venues: {
    eyebrow: "Experiences",
    title: "Whatever the mood,",
    titleAccent: "we have it.",
    namesTitle: "North Coast & Cairo venues we book",
    tickerSahel: "North Coast",
    tickerCairo: "Cairo",
    namesNote:
      "We arrange tables at the best-known beach clubs, rooftops, and nightlife spots across Cairo and Egypt's North Coast. Sahra is an independent concierge service and is not affiliated with these venues; trade names belong to their owners and are listed for identification only.",
    items: [
      {
        tag: "Cairo",
        title: "Rooftops",
        body: "Nile-facing terraces for a calm start to the night — good music, a better view, and room to actually talk.",
      },
      {
        tag: "Cairo",
        title: "Nile boat parties",
        body: "DJ nights on the water. I handle boarding and table layout so your group stays together.",
      },
      {
        tag: "El Gouna & North Coast",
        title: "Beach clubs",
        body: "Coastal spots that run from day to night — loungers in the sun, dancing after dark.",
      },
      {
        tag: "Cairo & Sharm El Sheikh",
        title: "Private VIP tables",
        body: "Bottle service, a dedicated host and a table under your name — for birthdays and groups who want no surprises.",
      },
      {
        tag: "Anywhere",
        title: "Guest list & no queue",
        body: "No negotiating at the door. Your name is on the list before you leave the hotel.",
      },
      {
        tag: "Anywhere",
        title: "Full night programme",
        body: "Dinner, pre-drinks and the final venue — arranged as one night instead of three separate bookings.",
      },
    ],
  },
  gallery: {
    eyebrow: "From our nights",
    title: "See the venues",
    titleAccent: "before you book.",
    lede: "Photos from nights we arranged for clients in Cairo, the North Coast, El Gouna and Sharm El Sheikh.",
    fallbackAlt: "A night arranged by Sahra concierge in Egypt",
  },
  testimonials: {
    eyebrow: "Messages we received",
    title: "What",
    titleAccent: "Gulf clients say,",
    titleEnd: "word for word.",
    lede: "Nothing edited — copied exactly as it arrived on WhatsApp.",
    // Once a client agrees, add `name` and it will show before the city:
    // { text: "…", name: "Ahmed A.", who: "Riyadh" }
    items: [
      { text: "The night was beyond excellent 🙌 From the first message until we sat at the table, everything was arranged.", who: "Client from Riyadh" },
      { text: "You went above and beyond 🌹 We were worried it would get complicated, but you made it simple from minute one.", who: "Client from Dubai" },
      { text: "Privacy mattered most to us, and you handled it perfectly without us having to ask twice.", who: "Client from Kuwait" },
      { text: "I never expected it to be this easy. We landed in Cairo and everything was ready exactly as agreed 🙏", who: "Client from Doha" },
    ],
  },
  form: {
    eyebrow: "Request a table",
    title: "Tell me about",
    titleAccent: "the night you have in mind.",
    lede: "Fill in your details and I will reply on WhatsApp — usually within two to three hours — with options and prices.",
    fields: {
      name: "Full name",
      namePlaceholder: "Your name",
      phone: "WhatsApp number",
      phonePlaceholder: "+966 5X XXX XXXX",
      city: "City",
      date: "Night of",
      guests: "Party size",
      type: "Experience",
      budget: "Estimated budget",
      notes: "Anything else",
      notesPlaceholder: "Special requests: occasion, view, music style…",
      optional: "optional",
    },
    cities: ["Cairo", "El Gouna", "North Coast", "Sharm El Sheikh", "Hurghada"],
    types: ["Rooftop", "Boat party", "Beach club", "VIP table", "Full night programme"],
    budgets: ["Under 5,000 EGP", "5,000 – 15,000 EGP", "15,000 – 30,000 EGP", "Over 30,000 EGP"],
    submit: "Send my request",
    submitting: "Sending…",
    note: "That is all — I will reply on WhatsApp directly to settle the details.",
    or: "or",
    whatsappDirect: "Open WhatsApp chat directly",
    snapchatDirect: "Open Snapchat chat",
    successTitle: "Request sent.",
    successBody: "I have your request and will reply on WhatsApp with options and prices — usually within two to three hours.",
    successRef: "Your reference",
    newRequest: "Send another request",
    error: "Something went wrong. Please try again or message me on WhatsApp.",
    required: "Name and WhatsApp number are required.",
  },
  modal: {
    eyebrow: "Before you keep browsing",
    title: "Leave your name and WhatsApp — I will send you tonight's options myself",
    submit: "Send",
    successTitle: "Sent.",
    successBody: "You will get a WhatsApp message in a moment.",
    or: "or",
    whatsappDirect: "Open WhatsApp directly →",
    close: "Close",
  },
  social: {
    title: "Follow us on Snapchat",
    body: "We post from the venues as the night happens — see the atmosphere and the latest parties before you choose your night.",
    snapchat: "Add us on Snapchat",
    handle: "sahraeg",
  },
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: August 2026",
    intro:
      "Privacy is not a clause on a page for us, it is the basis of the service. This page explains exactly what we collect, what we use it for, and who can see it.",
    backHome: "Back to the homepage",
    sections: [
      {
        title: "What we collect",
        body: "When you send a reservation request we collect your name and WhatsApp number, and optionally your city, the date of the night, party size, experience type, estimated budget and any notes you write. We also record when the request was sent and which language of the site you used.",
      },
      {
        title: "WhatsApp button logging",
        body: "When you tap a WhatsApp button on the site, we record that a tap happened: which button, which page, the language, and the country at a general level. We do not record your number or the content of your conversation. The WhatsApp chat itself happens in WhatsApp and is governed by their privacy policy.",
      },
      {
        title: "How we use it",
        body: "Your details serve one purpose: replying to you and arranging your booking. When we book, we pass the venue only your name and party size — the minimum needed to hold the table under your name, with no further details.",
      },
      {
        title: "What we never do",
        body: "We do not sell or share your data for marketing, we do not send promotional messages, we do not add you to mailing lists, and the site uses no advertising or tracking cookies.",
      },
      {
        title: "How long we keep it",
        body: "We keep reservation requests for as long as they are useful to serving you, such as recognising you if you book again. You can ask us to delete your data at any time with a single WhatsApp message, and we remove it completely.",
      },
      {
        title: "Security",
        body: "Requests are stored in a secured database, and dashboard access is protected by our own account. The whole site runs over an encrypted connection (HTTPS).",
      },
      {
        title: "Your rights",
        body: "You may ask what we hold about you, correct it, or request its deletion. Message us on WhatsApp and we will action it promptly.",
      },
      {
        title: "Age",
        body: "The service is intended for adults old enough to enter the venues we book, according to each venue's rules.",
      },
      {
        title: "Contact",
        body: "For any question or request about your privacy, message us directly on WhatsApp and we will reply personally.",
      },
    ],
  },
  footer: {
    links: {
      whatsapp: "WhatsApp",
      venues: "Experiences",
      reserve: "Request a table",
      dashboard: "Dashboard",
      privacy: "Privacy Policy",
      snapchat: "Snapchat",
    },
    note:
      "Sahra is an independent nightlife concierge service in Egypt and is not affiliated with the venues it books. Reservations are confirmed after contact on WhatsApp.",
    rights: "All rights reserved",
  },
  seo: {
    eyebrow: "Egypt nightlife guide",
    title: "Best nightlife in Egypt —",
    titleAccent: "nightclubs and party spots in Cairo & the coast.",
    paragraphs: [
      "Looking for the best nightlife in Egypt or nightlife places across Cairo and the North Coast? Sahra books rooftops, discos, nightclubs and beach clubs — a table under your name and straight entry.",
      "North Coast in summer: beach clubs and parties from Marina to Sidi Abdel Rahman. In Cairo: Nile boat parties, VIP tables and the busiest nights out in Egypt — all arranged on WhatsApp.",
      "Instead of searching \"disco Egypt\" or \"nights in Egypt\" and calling every venue, send us the date and party size. We come back with availability and the minimum spend, confirmed in two to three hours.",
    ],
    faqTitle: "Frequently asked about nightlife in Egypt",
    faq: [
      {
        q: "What is the best nightlife in Egypt?",
        a: "Cairo has Nile rooftops, boat parties and nightclubs in Zamalek and New Cairo. The North Coast has the biggest beach clubs in summer. El Gouna and Sharm run all year. Sahra recommends based on your budget and the kind of night you want.",
      },
      {
        q: "Where can I find nightlife places in Egypt?",
        a: "Nightlife is spread across Cairo (rooftops, boats, discos), the North Coast (beach clubs), and El Gouna, Sharm and Hurghada (coastal venues). Message us the city and date on WhatsApp and we send you what is available.",
      },
      {
        q: "How do I book a disco or nightclub in Egypt?",
        a: "Send us the date, party size and city on WhatsApp. We reply with available venues and the minimum spend, hold the table under your name once you approve, and send a confirmation — no queue at the door.",
      },
      {
        q: "Can I book nights out in Egypt from abroad?",
        a: "Yes. We serve in Arabic and English and arrange bookings for visitors from the Gulf and Egyptians abroad. Everything is handled on WhatsApp before you arrive.",
      },
    ],
  },
  whatsappMessage: "Hi, I would like to book a table",
  langSwitch: "العربية",
} as const;

export type Dictionary = typeof ar;

const dictionaries: Record<Locale, Dictionary> = {
  ar,
  en: en as unknown as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
