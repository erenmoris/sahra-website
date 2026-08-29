import type { Locale } from "./config";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "201027059930";

const ar = {
  meta: {
    title: "سهرات في مصر · حجز سهرات الساحل الشمالي والقاهرة | سهرة كونسييرج",
    description:
      "حجز سهرات في مصر خلال ساعات: سهرات الساحل الشمالي، بيتش كلوبز الجونة، روفتوبات وحفلات مراكب النيل في القاهرة، وترابيزات VIP في شرم الشيخ. احجز ترابيزتك على الواتساب بدون رسوم وبخصوصية تامة.",
    keywords: [
      "سهرات في مصر",
      "الساحل الشمالي",
      "سهرات الساحل الشمالي",
      "حجز سهرات",
      "حجز ترابيزة",
      "بيتش كلوب الساحل الشمالي",
      "سهرات الجونة",
      "نايت كلوب القاهرة",
      "روفتوب القاهرة",
      "حفلات مراكب النيل",
      "ترابيزة VIP",
      "سهرات شرم الشيخ",
      "كونسييرج سهر مصر",
      "حجز نايت كلوب مصر",
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
      { value: "بدون رسوم", label: "على طلب الحجز" },
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
  venues: {
    eyebrow: "أنواع السهرات",
    title: "أي جو",
    titleAccent: "تفضّله، هتلاقيه عندنا.",
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
  testimonials: {
    eyebrow: "رسايل وصلتنا",
    title: "كلام",
    titleAccent: "عملاء من الخليج،",
    titleEnd: "زي ما وصلنا بالظبط.",
    lede: "ما غيّرناش فيها ولا كلمة — منقولة زي ما وصلت على الواتساب.",
    items: [
      { text: "ماشاء الله عليك، السهرة كانت فوق الممتاز 🙌 من أول رسالة إلى ما قعدنا على الطاولة كل شي كان مرتب.", who: "عميل من الرياض" },
      { text: "والله كفيتي ووفيتي 🌹 كنا خايفين الموضوع يصير معقد بس أنتِ سهلتيه علينا من أول دقيقة.", who: "عميلة من دبي" },
      { text: "خصوصيتنا كانت أهم شي عندنا، وأنتم قدرتوا الموضوع تمام من غير ما نسأل مرتين.", who: "عميل من الكويت" },
      { text: "أبد ما توقعت الأمور تمشي بهالسهولة، وصلنا القاهرة وكل شي جاهز زي ما اتفقنا بالظبط. تسلمين 🙏", who: "عميلة من الدوحة" },
    ],
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
  footer: {
    links: { whatsapp: "واتساب", venues: "أنواع السهرات", reserve: "اطلب ترابيزة", dashboard: "لوحة التحكم" },
    note:
      "سهرة خدمة كونسييرج مستقلة متخصصة في تنظيم السهر في مصر، وغير تابعة للأماكن اللي بنحجز فيها. الحجز بيتأكد رسميًا بعد التواصل على الواتساب.",
    rights: "كل الحقوق محفوظة",
  },
  seo: {
    eyebrow: "أماكن نغطيها",
    title: "سهرات في مصر —",
    titleAccent: "من الساحل الشمالي للقاهرة.",
    paragraphs: [
      "لو بتدوّر على سهرات الساحل الشمالي في الصيف، بنحجزلك في البيتش كلوبز والحفلات على طول الساحل ومارينا وسيدي عبد الرحمن — ترابيزة باسمك ودخول مباشر، وبدون أي رسوم على الطلب.",
      "وفي القاهرة بننسّق روفتوبات على النيل، حفلات مراكب، وترابيزات VIP مع بوتل سيرفيس في أهم الأماكن. وفي الجونة وشرم الشيخ والغردقة نفس الخدمة متاحة طول السنة.",
      "كل الحجوزات بتتأكد على الواتساب في ساعتين لتلاتة، بنخدمك بالعربي والإنجليزي، وبياناتك تفضل عندنا وما بتتشاركش مع أي جهة.",
    ],
  },
  whatsappMessage: "مرحبًا، محتاج أحجز ترابيزة",
  langSwitch: "English",
} as const;

const en = {
  meta: {
    title: "Nightlife in Egypt · North Coast & Cairo Party Booking | Sahra Concierge",
    description:
      "Book nightlife in Egypt within hours: North Coast beach clubs, El Gouna parties, Cairo rooftops and Nile boat parties, plus VIP tables in Sharm El Sheikh. Reserve your table on WhatsApp — no fees, full privacy.",
    keywords: [
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
      { value: "No fees", label: "On requests" },
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
  venues: {
    eyebrow: "Experiences",
    title: "Whatever the mood,",
    titleAccent: "we have it.",
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
  testimonials: {
    eyebrow: "Messages we received",
    title: "What",
    titleAccent: "Gulf clients say,",
    titleEnd: "word for word.",
    lede: "Nothing edited — copied exactly as it arrived on WhatsApp.",
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
  footer: {
    links: { whatsapp: "WhatsApp", venues: "Experiences", reserve: "Request a table", dashboard: "Dashboard" },
    note:
      "Sahra is an independent nightlife concierge service in Egypt and is not affiliated with the venues it books. Reservations are confirmed after contact on WhatsApp.",
    rights: "All rights reserved",
  },
  seo: {
    eyebrow: "Where we operate",
    title: "Nightlife in Egypt —",
    titleAccent: "from the North Coast to Cairo.",
    paragraphs: [
      "If you are looking for North Coast nightlife in the summer, we book beach clubs and parties along Sahel, Marina and Sidi Abdel Rahman — a table under your name and entry without queueing, with no fee on the request.",
      "In Cairo we arrange Nile-facing rooftops, boat parties, and VIP tables with bottle service at the busiest venues. In El Gouna, Sharm El Sheikh and Hurghada the same service runs all year.",
      "Every booking is confirmed on WhatsApp within two to three hours, in Arabic or English, and your details are never shared.",
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
