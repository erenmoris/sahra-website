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
    venues: "سهرات",
    trust: "ليه تختارنا",
    reserve: "احجز مكانك",
    chalets: "شاليهات",
    dashboard: "لوحة التحكم",
  },
  hero: {
    eyebrow: "كونسييرج السهر في مصر — القاهرة · الساحل الشمالي · الجونة · شرم الشيخ",
    titleTop: "ليلتك",
    titleAccent: "متظبطة",
    titleBottom: "قبل ما توصل.",
    lede:
      "ليلة واحدة ممكن تغيّر الإجازة كلها. اختار الجو — روفتوب، مركب، بيتش، VIP، أو شاليه — وسيب الباقي علينا. التعامل شخصي، والخصوصية كاملة.",
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
    metaTitle: "ليه تختار سهرة | خصوصية وتعامل شخصي",
    metaDescription:
      "خصوصية كاملة، تعامل مع شخص حقيقي، وأماكن متجرّبة — اعرف ليه العملاء بيختاروا سهرة.",
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
    eyebrow: "سهرات",
    title: "أي جو",
    titleAccent: "تفضّله، هتلاقيه عندنا.",
    namesTitle: "أماكن الساحل الشمالي والقاهرة اللي بنظبط فيها حجوزات",
    tickerSahel: "الساحل الشمالي",
    tickerCairo: "القاهرة",
    namesNote:
      "بنحجز ترابيزات في أشهر بيتش كلوبز وروفتوبات ونوادٍ ليلية في القاهرة والساحل الشمالي. سهرة خدمة كونسييرج مستقلة وغير تابعة للأماكن دي، والأسماء التجارية ملك أصحابها وبنذكرها للتوضيح بس.",
    metaTitle: "سهرات في مصر · روفتوب وبيتش كلوب وVIP | سهرة",
    metaDescription:
      "اكتشف أنواع السهرات: روفتوبات، مراكب، بيتش كلوبز، ترابيزات VIP وجيست ليست — احجز عبر سهرة على الواتساب.",
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
    eyebrow: "من واتساب",
    title: "سكرينات",
    titleAccent: "من الشات",
    titleEnd: "بعد السهرة.",
    lede: "رسايل وصلتنا على واتساب.",
    items: [
      {
        who: "عميل من الرياض",
        contact: "عميل الرياض",
        lastSeen: "آخر ظهور الساعة ٤:٢٢ م",
        dayLabel: "١٥ يناير",
        messages: [
          {
            from: "us",
            text: "الترابيزة جاهزة زي ما اتفقنا 🙌 أي حاجة قبل ما توصلوا؟",
            time: "١٠:٤٧ م",
          },
          {
            from: "them",
            text: "والله ما قصرتي، الجو كان أسطوري والتنسيق من أول رسالة مرتب. تسلمين يا وحش 🔥",
            time: "٢:١٣ ص",
          },
          {
            from: "us",
            text: "يسعدك، أي وقت تبي ليلة ثانية إحنا موجودين.",
            time: "٢:١٦ ص",
          },
        ],
      },
      {
        who: "عميلة من جدة",
        contact: "عميلة جدة",
        lastSeen: "آخر ظهور الساعة ٩:٥٥ م",
        dayLabel: "١٢ فبراير",
        messages: [
          {
            from: "them",
            text: "صراحة ما توقعت الموضوع بهالسهولة 🌹 حجزنا ونحن في الطيارة ولما وصلنا كل شي جاهز.",
            time: "١١:٥٨ م",
          },
          {
            from: "us",
            text: "هذا شغلنا 🤍 لو تبي مكان ثاني باقي الرحلة كلّميني.",
            time: "١٢:٠٣ ص",
          },
        ],
      },
      {
        who: "عميل من الدمام",
        contact: "عميل الدمام",
        lastSeen: "آخر ظهور الساعة ١١:١٨ ص",
        dayLabel: "١٤ مارس",
        messages: [
          {
            from: "us",
            text: "السائق عند الباب، والكود جاهز. تدخلون من غير طابور.",
            time: "٧:٥٢ م",
          },
          {
            from: "them",
            text: "يا سلام عليك، دخلنا في ثواني والخصوصية ١٠٠٪ زي ما طلبنا. الله يعطيك العافية.",
            time: "١:٢٩ ص",
          },
        ],
      },
      {
        who: "عميل من الخبر",
        contact: "عميل الخبر",
        lastSeen: "آخر ظهور الساعة ٨:٤٠ م",
        dayLabel: "١٨ أبريل",
        messages: [
          {
            from: "them",
            text: "أفضل حجز سويته في مصر. الروفتوب كان على النيل والخدمة فوق، وأنتم ما ضيّعتوا وقتنا أبد 🙏",
            time: "١٢:٥١ ص",
          },
          {
            from: "us",
            text: "تسلم، فرحتكم تهمنا. جاهزين لأي ليلة ثانية.",
            time: "١٢:٥٤ ص",
          },
        ],
      },
      {
        who: "عميلة من المدينة",
        contact: "عميلة المدينة",
        lastSeen: "آخر ظهور الساعة ٣:١٠ م",
        dayLabel: "١٦ مايو",
        messages: [
          {
            from: "us",
            text: "أكدتلكم ترابيزة VIP قدام الدي جي، والبوتل جاهز قبل وصولكم.",
            time: "٩:٢٠ م",
          },
          {
            from: "them",
            text: "ما شاء الله الترتيب دقيق جدًا، حسّينا إن في أحد يتابع معنا كل خطوة. شكراً من القلب 🤍",
            time: "٣:٠٥ ص",
          },
        ],
      },
      {
        who: "عميل من الرياض",
        contact: "عميل الرياض ٢",
        lastSeen: "آخر ظهور الساعة ٦:٤٥ م",
        dayLabel: "١١ يونيو",
        messages: [
          {
            from: "them",
            text: "كنت متردد أول مرة، بس التجربة غيرت رأيي تمام. سرعة الرد والأسعار أوضح من أي مكان ثاني.",
            time: "١:١٢ ص",
          },
          {
            from: "us",
            text: "مرحبا فيك بأي وقت — ابعتلنا قبلها بيوم ونظبط لك أفضل خيار.",
            time: "١:١٨ ص",
          },
        ],
      },
      {
        who: "عميل من أبها",
        contact: "عميل أبها",
        lastSeen: "آخر ظهور الساعة ١٠:٠٢ م",
        dayLabel: "٢٠ يوليو",
        messages: [
          {
            from: "us",
            text: "حجزنا لكم مركب الجمعة، العدد ٨، والموعد ١١ بالليل.",
            time: "٤:٣٠ م",
          },
          {
            from: "them",
            text: "كانت ليلة ما تنسى، والشباب كلهم مبسوطين. تسلم يالغالي على المتابعة 🙌",
            time: "٢:٤٠ ص",
          },
        ],
      },
      {
        who: "عميلة من جدة",
        contact: "عميلة جدة ٢",
        lastSeen: "آخر ظهور الساعة ٥:١٥ م",
        dayLabel: "٩ أغسطس",
        messages: [
          {
            from: "them",
            text: "حجزنا شاليه + سهرة في نفس اليوم، وكل شي كان متناسق من غير لخبطة. أنصح فيكم بقوة ✨",
            time: "١١:١٠ م",
          },
          {
            from: "us",
            text: "العفو، هذي راحتنا. أي رحلة جاية كلّمونا بدري ونرتب الباقة كاملة.",
            time: "١١:١٤ م",
          },
        ],
      },
    ] as {
      image?: string;
      who: string;
      name?: string;
      contact: string;
      clock?: string;
      battery?: number;
      signal?: number;
      lastSeen?: string;
      dayLabel?: string;
      messages: { from: "them" | "us"; text: string; time: string }[];
    }[],
  },
  form: {
    eyebrow: "احجز مكانك",
    title: "سيبك من",
    titleAccent: "التفاصيل الكتيرة.",
    lede: "اسمك ورقم الواتساب بس — وإحنا هنكلّمك ونظبط الباقي.",
    fields: {
      name: "الاسم",
      namePlaceholder: "اكتب اسمك",
      phone: "رقم الواتساب",
      phonePlaceholder: "+20 أو +966…",
      city: "المدينة",
      date: "تاريخ السهرة",
      guests: "عدد الأفراد",
      type: "نوع السهرة",
      budget: "الميزانية التقديرية",
      notes: "ملاحظات سريعة",
      notesPlaceholder: "مثلاً: ترابيزة VIP الجمعة · الساحل",
      optional: "اختياري",
    },
    cities: ["القاهرة", "الجونة", "الساحل الشمالي", "شرم الشيخ", "الغردقة"],
    types: ["روفتوب", "حفلة مركب", "بيتش كلوب", "ترابيزة VIP", "برنامج ليلة كاملة"],
    budgets: ["أقل من ٥٠٠٠ ج", "٥٠٠٠ – ١٥٠٠٠ ج", "١٥٠٠٠ – ٣٠٠٠٠ ج", "أكثر من ٣٠٠٠٠ ج"],
    submit: "ابعتلي",
    submitting: "جاري الإرسال…",
    note: "هنرد عليك على الواتساب خلال ساعتين لتلاتة.",
    or: "أو أسرع",
    whatsappDirect: "واتساب مباشرة",
    snapchatDirect: "سناب شات",
    successTitle: "تم الإرسال.",
    successBody: "طلبك وصلنا، وهنرد عليك على الواتساب قريب.",
    successRef: "رقم طلبك",
    newRequest: "إرسال تاني",
    error: "حصلت مشكلة. حاول تاني أو كلّمنا على الواتساب.",
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
  entrance: {
    brand: "سهرة",
    loading: "الليلة بتتحضّر…",
    skip: "تخطّي",
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
      venues: "سهرات",
      reserve: "اطلب ترابيزة",
      chalets: "شاليهات للإيجار",
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
  chalets: {
    eyebrow: "إيجار شاليهات",
    title: "شاليهات",
    titleAccent: "للإيجار.",
    lede: "وحدات من المالك — صور واضحة، ومواصفات صريحة. السعر؟ هننافس أي عرض في الساحل… والرقم هيوصلك على واتساب.",
    priceBadge: "أرخص سعر في الساحل",
    priceTeaser:
      "مفيش رقم مكتوب هنا عن قصد — الأسعار تنافسية وتشويقية، وبنتحدّى أي عرض في الساحل. اسأل على واتساب وهتتفاجئ.",
    priceHint: "سعر تنافسي · اسأل على واتساب",
    empty: "مفيش شاليهات متاحة دلوقتي. كلّمنا على الواتساب لو محتاج توصية.",
    details: "التفاصيل",
    backToList: "كل الشاليهات",
    bedrooms: "غرف نوم",
    bathrooms: "حمامات",
    familyOnly: "عائلات فقط",
    fromOwner: "من المالك",
    featuresTitle: "المواصفات",
    galleryTitle: "الصور",
    ctaWhatsapp: "اسأل عن السعر والتفاصيل على الواتساب",
    metaTitle: "شاليهات للإيجار | سهرة",
    metaDescription:
      "شاليهات للإيجار في الساحل بأسعار تنافسية من المالك — أرخص من السوق، التفاصيل على الواتساب.",
  },
  home: {
    teaserEyebrow: "اختار جو ليلتك",
    teaserTitle: "ليلة تستاهل",
    teaserAccent: "تتحكى.",
    teaserLede:
      "من روفتوب على النيل لبيتش كلوب في الساحل، ومن شاليه هادي لليلة VIP — اختار اللي يناسبك، وإحنا نظبط الباقي.",
    cards: [
      {
        href: "venues",
        tag: "سهرات",
        title: "روفتوب · مركب · بيتش · VIP",
        body: "شوف أنواع السهرات اللي بنحجزها، والأماكن اللي بنشتغل معاها في القاهرة والساحل.",
        cta: "اكتشف السهرات",
      },
      {
        href: "chalets",
        tag: "إقامة",
        title: "شاليهات من المالك",
        body: "وحدات جاهزة للإيجار — صور واضحة، مواصفات صريحة، والتفاصيل على الواتساب.",
        cta: "شوف الشاليهات",
      },
      {
        href: "trust",
        tag: "ثقة",
        title: "خصوصية وتعامل شخصي",
        body: "اعرف ليه العملاء بيسيّبوا الحجز علينا: بياناتك بينا، ومتابعة لحد ما تقعد على ترابيزتك.",
        cta: "ليه تختارنا",
      },
    ],
  },
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
    venues: "Nights out",
    trust: "Why us",
    reserve: "Book my table",
    chalets: "Chalets",
    dashboard: "Dashboard",
  },
  hero: {
    eyebrow: "Nightlife concierge — Cairo · El Gouna · North Coast · Sharm El Sheikh",
    titleTop: "Your night is",
    titleAccent: "handled",
    titleBottom: "before you land.",
    lede:
      "One night can make the whole trip. Pick the vibe — rooftop, boat, beach, VIP, or a chalet — and we handle the rest. Personal service, full privacy.",
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
    metaTitle: "Why choose Sahra | Privacy & personal service",
    metaDescription:
      "Full privacy, a real person every time, and venues we have tested — why guests choose Sahra.",
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
    eyebrow: "Nights out",
    title: "Whatever the mood,",
    titleAccent: "we have it.",
    namesTitle: "North Coast & Cairo venues we book",
    tickerSahel: "North Coast",
    tickerCairo: "Cairo",
    namesNote:
      "We arrange tables at the best-known beach clubs, rooftops, and nightlife spots across Cairo and Egypt's North Coast. Sahra is an independent concierge service and is not affiliated with these venues; trade names belong to their owners and are listed for identification only.",
    metaTitle: "Nightlife in Egypt · Rooftops, beach clubs & VIP | Sahra",
    metaDescription:
      "Explore nightlife types: rooftops, Nile boats, beach clubs, VIP tables and guest list — book with Sahra on WhatsApp.",
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
    eyebrow: "From WhatsApp",
    title: "Chat",
    titleAccent: "screenshots",
    titleEnd: "after the night.",
    lede: "Messages that landed on our WhatsApp.",
    items: [
      {
        who: "Client from Riyadh",
        contact: "Client Riyadh",
        lastSeen: "last seen at 4:22 PM",
        dayLabel: "15 January",
        messages: [
          {
            from: "us",
            text: "The table is ready as agreed 🙌 Anything you need before you arrive?",
            time: "10:47 PM",
          },
          {
            from: "them",
            text: "You absolutely delivered — the night was legendary and everything was sorted from the first message 🔥",
            time: "2:13 AM",
          },
          {
            from: "us",
            text: "Glad you loved it — book again anytime.",
            time: "2:16 AM",
          },
        ],
      },
      {
        who: "Client from Jeddah",
        contact: "Client Jeddah",
        lastSeen: "last seen at 9:55 PM",
        dayLabel: "12 February",
        messages: [
          {
            from: "them",
            text: "I never expected it to be this easy 🌹 We booked on the plane and everything was ready when we landed.",
            time: "11:58 PM",
          },
          {
            from: "us",
            text: "That's our job 🤍 Message me if you want another spot during the trip.",
            time: "12:03 AM",
          },
        ],
      },
      {
        who: "Client from Dammam",
        contact: "Client Dammam",
        lastSeen: "last seen at 11:18 AM",
        dayLabel: "14 March",
        messages: [
          {
            from: "us",
            text: "Driver is at the door and your code is ready. No queue.",
            time: "7:52 PM",
          },
          {
            from: "them",
            text: "We were in within seconds and privacy was 100% as requested. Well done.",
            time: "1:29 AM",
          },
        ],
      },
      {
        who: "Client from Khobar",
        contact: "Client Khobar",
        lastSeen: "last seen at 8:40 PM",
        dayLabel: "18 April",
        messages: [
          {
            from: "them",
            text: "Best booking I made in Egypt. Nile rooftop, great service, and you never wasted our time 🙏",
            time: "12:51 AM",
          },
          {
            from: "us",
            text: "Thank you — ready whenever you want another night.",
            time: "12:54 AM",
          },
        ],
      },
      {
        who: "Client from Madinah",
        contact: "Client Madinah",
        lastSeen: "last seen at 3:10 PM",
        dayLabel: "16 May",
        messages: [
          {
            from: "us",
            text: "VIP table in front of the DJ confirmed, bottle ready before you arrive.",
            time: "9:20 PM",
          },
          {
            from: "them",
            text: "The planning was so precise — we felt someone was with us every step. Thank you 🤍",
            time: "3:05 AM",
          },
        ],
      },
      {
        who: "Client from Riyadh",
        contact: "Client Riyadh 2",
        lastSeen: "last seen at 6:45 PM",
        dayLabel: "11 June",
        messages: [
          {
            from: "them",
            text: "I was hesitant the first time, but this changed my mind. Fast replies and clearer pricing than anywhere else.",
            time: "1:12 AM",
          },
          {
            from: "us",
            text: "Anytime — message us a day ahead and we will lock the best option.",
            time: "1:18 AM",
          },
        ],
      },
      {
        who: "Client from Abha",
        contact: "Client Abha",
        lastSeen: "last seen at 10:02 PM",
        dayLabel: "20 July",
        messages: [
          {
            from: "us",
            text: "Boat booked for Friday, party of 8, 11 PM.",
            time: "4:30 PM",
          },
          {
            from: "them",
            text: "Unforgettable night — the whole group loved it. Thanks for the follow-up 🙌",
            time: "2:40 AM",
          },
        ],
      },
      {
        who: "Client from Jeddah",
        contact: "Client Jeddah 2",
        lastSeen: "last seen at 5:15 PM",
        dayLabel: "9 August",
        messages: [
          {
            from: "them",
            text: "We booked a chalet and a night out the same day — everything lined up perfectly. Highly recommend ✨",
            time: "11:10 PM",
          },
          {
            from: "us",
            text: "Anytime — reach out early next trip and we will package the whole stay.",
            time: "11:14 PM",
          },
        ],
      },
    ] as {
      image?: string;
      who: string;
      name?: string;
      contact: string;
      clock?: string;
      battery?: number;
      signal?: number;
      lastSeen?: string;
      dayLabel?: string;
      messages: { from: "them" | "us"; text: string; time: string }[];
    }[],
  },
  form: {
    eyebrow: "Book your spot",
    title: "Skip the",
    titleAccent: "long form.",
    lede: "Just your name and WhatsApp — we will call you and sort the rest.",
    fields: {
      name: "Name",
      namePlaceholder: "Your name",
      phone: "WhatsApp number",
      phonePlaceholder: "+20 or +966…",
      city: "City",
      date: "Night of",
      guests: "Party size",
      type: "Experience",
      budget: "Estimated budget",
      notes: "Quick note",
      notesPlaceholder: "e.g. VIP table Friday · North Coast",
      optional: "optional",
    },
    cities: ["Cairo", "El Gouna", "North Coast", "Sharm El Sheikh", "Hurghada"],
    types: ["Rooftop", "Boat party", "Beach club", "VIP table", "Full night programme"],
    budgets: ["Under 5,000 EGP", "5,000 – 15,000 EGP", "15,000 – 30,000 EGP", "Over 30,000 EGP"],
    submit: "Send",
    submitting: "Sending…",
    note: "We reply on WhatsApp within two to three hours.",
    or: "or faster",
    whatsappDirect: "WhatsApp now",
    snapchatDirect: "Snapchat",
    successTitle: "Sent.",
    successBody: "We have your request and will reply on WhatsApp shortly.",
    successRef: "Your reference",
    newRequest: "Send another",
    error: "Something went wrong. Try again or message us on WhatsApp.",
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
  entrance: {
    brand: "Sahra",
    loading: "The night is warming up…",
    skip: "Skip",
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
      venues: "Nights out",
      reserve: "Request a table",
      chalets: "Chalets for rent",
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
  chalets: {
    eyebrow: "Chalet rentals",
    title: "Chalets",
    titleAccent: "for rent.",
    lede: "Owner units — clear photos, honest specs. The price? We undercut the North Coast… and the number lands on WhatsApp.",
    priceBadge: "Lowest rates on the Coast",
    priceTeaser:
      "No figure on the page on purpose — prices stay teasing and competitive. Ask on WhatsApp; you will be surprised.",
    priceHint: "Competitive rate · ask on WhatsApp",
    empty: "No chalets listed right now. Message us on WhatsApp if you need a recommendation.",
    details: "View details",
    backToList: "All chalets",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    familyOnly: "Family only",
    fromOwner: "From owner",
    featuresTitle: "Amenities",
    galleryTitle: "Photos",
    ctaWhatsapp: "Ask price & details on WhatsApp",
    metaTitle: "Chalets for rent | Sahra",
    metaDescription:
      "North Coast chalets for rent at competitive owner rates — details on WhatsApp.",
  },
  home: {
    teaserEyebrow: "Pick the night",
    teaserTitle: "A night worth",
    teaserAccent: "talking about.",
    teaserLede:
      "From a Nile rooftop to a North Coast beach club, a quiet chalet to a VIP table — pick your vibe, we handle the rest.",
    cards: [
      {
        href: "venues",
        tag: "Nights out",
        title: "Rooftop · boat · beach · VIP",
        body: "See the nightlife we book and the spots we work with in Cairo and the coast.",
        cta: "Explore nights",
      },
      {
        href: "chalets",
        tag: "Stay",
        title: "Owner chalets",
        body: "Units ready to rent — clear photos, honest specs, details on WhatsApp.",
        cta: "Browse chalets",
      },
      {
        href: "trust",
        tag: "Trust",
        title: "Privacy & a real person",
        body: "Why guests leave the booking to us: your data stays with us, and we follow through until you are seated.",
        cta: "Why choose us",
      },
    ],
  },
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
