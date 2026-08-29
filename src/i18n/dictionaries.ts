import type { Locale } from "./config";

export const WHATSAPP_NUMBER = "201001055112";

const ar = {
  meta: {
    title: "سهرة · كونسييرج السهر في مصر",
    description:
      "خدمة كونسييرج خاصة لحجز الروفتوبات، حفلات المراكب، البيتش كلوبز وترابيزات VIP في القاهرة، الجونة، الساحل وشرم الشيخ.",
  },
  nav: {
    how: "إزاي بيشتغل",
    venues: "أنواع السهرات",
    trust: "ليه تثق فينا",
    reserve: "احجزلي مكان",
    dashboard: "لوحة التحكم",
  },
  hero: {
    eyebrow: "كونسييرج السهر — القاهرة · الجونة · الساحل · شرم الشيخ",
    titleTop: "ليلتك",
    titleAccent: "متظبطة",
    titleBottom: "قبل ما توصل.",
    lede:
      "قولّي نوع السهرة اللي عايزها — روفتوب، مركب، بيتش كلوب، ترابيزة VIP — والباقي عليّا. تتعامل معايا أنا شخصيًا، معلوماتك ما تتشارك مع حد، وكل مكان أرشحلك مجرّب بنفسي.",
    ctaPrimary: "راسلني على الواتساب",
    ctaSecondary: "اطلب ترابيزة",
    trust: [
      { value: "خصوصية تامة", label: "ما نشارك بياناتك" },
      { value: "٢–٣ ساعات", label: "متوسط وقت التأكيد" },
      { value: "عربي / إنجليزي", label: "خدمة بلغتك" },
      { value: "بدون رسوم", label: "على الطلب" },
    ],
    chat: {
      name: "سهرة كونسييرج",
      status: "● متصلة الآن",
      messages: [
        { side: "out", text: "عايز ترابيزة لـ ٦ أفراد، ليلة الجمعة، حاجة مطلة على النيل 🌙" },
        { side: "in", text: "تمام — عندي مكان روفتوب حلو، الساعة ١١، بدون طابور عند الباب." },
        { side: "in", text: "الحد الأدنى للصرف مناسب لعدد ٦. أأكد الحجز؟" },
        { side: "out", text: "أيوه، أكدي 🙌" },
      ],
      confirm: ["RESERVATION CONFIRMED — SAH-2291", "Fri · 23:00 · Party of 6", "الكود اتبعت، وريه عند الوصول"],
    },
  },
  how: {
    eyebrow: "إزاي بيشتغل",
    title: "٣ خطوات،",
    titleAccent: "وليلة تمام.",
    lede: "مفيش تطبيق تحمّله ولا حساب تعمله. بيمشي زي ما تخطط ليلة مع صاحب يعرف المدينة كويس.",
    steps: [
      {
        num: "01 — قولّي",
        title: "ابعت التفاصيل",
        body: "التاريخ، المدينة، عدد الأفراد، ونوع الجو اللي عايزه — روفتوب هادي، مركب، أو ترابيزة VIP مع بوتل سيرفيس.",
      },
      {
        num: "02 — أنا بأظبط",
        title: "بأحجز بنفسي",
        body: "بأتواصل مباشرة مع الناس اللي بأشتغل معاهم في كل مكان، عشان تتخطى الطابور والحيرة عند الباب.",
      },
      {
        num: "03 — تيجي وتدخل",
        title: "ورّي الكود وادخل",
        body: "هتوصلك رسالة تأكيد على الواتساب فيها كود. قول اسمك عند الباب — وخلاص.",
      },
    ],
  },
  trust: {
    eyebrow: "راحة بالك أولاً",
    title: "ثقتك",
    titleAccent: "أهم من أي حجز.",
    lede: "نعرف إن خصوصيتك أهم شي، لذلك كل شي بيني وبينك يفضل بيني وبينك بس.",
    items: [
      {
        icon: "shield",
        title: "خصوصية كاملة",
        body: "اسمك ورقمك ما يروحون لأي جهة إلا أنا. ما فيه مشاركة بيانات، ولا إعلانات، ولا متابعة بعد الرحلة.",
      },
      {
        icon: "user",
        title: "تتكلم مع شخص حقيقي",
        body: "مافيه بوت ولا رد آلي. أنا اللي أرد عليك بنفسي وأتابع طلبك من أول رسالة لحد ما تدخل المكان.",
      },
      {
        icon: "check",
        title: "أماكن مجربة فعليًا",
        body: "ما أرشح مكان ما زرته بنفسي وتأكدت منه. جودة الخدمة والاحترام شرط قبل لا أضيفه عندي.",
      },
    ],
  },
  venues: {
    eyebrow: "أنواع السهرات",
    title: "أي جو",
    titleAccent: "تحبه، موجود.",
    items: [
      {
        tag: "القاهرة",
        title: "روفتوبات",
        body: "أماكن مطلة على النيل لبداية هادية للسهرة — موسيقى حلوة، إطلالة أحلى، ومساحة للكلام بارتياح.",
      },
      {
        tag: "القاهرة",
        title: "حفلات المراكب على النيل",
        body: "ليالي دي جي على الماء. بأتكفل بالصعود على المركب وترتيب الترابيزات عشان جروبك يقعد سوا.",
      },
      {
        tag: "الجونة والساحل",
        title: "بيتش كلوبز",
        body: "أماكن على الساحل الشمالي والبحر الأحمر تكمل من النهار للسهرة — لاونجرز بالنهار ورقص بالليل.",
      },
      {
        tag: "القاهرة وشرم الشيخ",
        title: "ترابيزات VIP خاصة",
        body: "بوتل سيرفيس، مضيف مخصص، وترابيزة محجوزة باسمك — لأعياد الميلاد والجروبات اللي مش عايزة مفاجآت.",
      },
      {
        tag: "أي مكان",
        title: "جيست ليست ودخول بدون طابور",
        body: "من غير نقاش عند الباب. اسمك بيتكتب على الليستة قبل ما تخرج من الفندق.",
      },
      {
        tag: "أي مكان",
        title: "برنامج ليلة كاملة",
        body: "عشا، بريدرينكس، والمكان النهائي — كله متظبط كليلة واحدة بدل ثلاث حجوزات منفصلة.",
      },
    ],
  },
  testimonials: {
    eyebrow: "رسايل وصلتنا",
    title: "كلام",
    titleAccent: "عملاء من الخليج،",
    titleEnd: "زي ما وصلنا بالضبط.",
    lede: "ما غيّرنا فيها ولا كلمة — نسخناها زي ما وصلت على الواتساب.",
    items: [
      { text: "ماشاء الله عليك، السهرة كانت فوق الممتاز 🙌 من أول رسالة إلى ما قعدنا على الطاولة كل شي كان مرتب.", who: "عميل من الرياض" },
      { text: "والله كفيتي ووفيتي 🌹 كنا خايفين الموضوع يصير معقد بس أنتِ سهلتيه علينا من أول دقيقة.", who: "عميلة من دبي" },
      { text: "خصوصيتنا كانت أهم شي عندنا، وأنتم قدرتوا الموضوع تمام من غير ما نسأل مرتين.", who: "عميل من الكويت" },
      { text: "أبد ما توقعت الأمور تمشي بهالسهولة، وصلنا القاهرة وكل شي جاهز زي ما اتفقنا بالظبط. تسلمين 🙏", who: "عميلة من الدوحة" },
    ],
  },
  form: {
    eyebrow: "اطلب ترابيزة",
    title: "قولّي عن",
    titleAccent: "الليلة اللي في بالك.",
    lede: "املا البيانات وهارد عليك على الواتساب — عادةً خلال ساعتين لثلاثة — بالخيارات والأسعار.",
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
      notesPlaceholder: "أي طلب خاص: مناسبة، إطلالة، نوع الموسيقى…",
      optional: "اختياري",
    },
    cities: ["القاهرة", "الجونة", "الساحل الشمالي", "شرم الشيخ", "الغردقة"],
    types: ["روفتوب", "حفلة مركب", "بيتش كلوب", "ترابيزة VIP", "برنامج ليلة كاملة"],
    budgets: ["أقل من ٥٠٠٠ ج", "٥٠٠٠ – ١٥٠٠٠ ج", "١٥٠٠٠ – ٣٠٠٠٠ ج", "أكثر من ٣٠٠٠٠ ج"],
    submit: "إرسال طلبي",
    submitting: "جاري الإرسال…",
    note: "وخلاص — هارد عليك على الواتساب مباشرة عشان نظبط التفاصيل.",
    or: "أو",
    whatsappDirect: "افتح شات الواتساب مباشرة",
    successTitle: "تم الإرسال.",
    successBody: "طلبك وصلني وهارد عليك على الواتساب بالخيارات والأسعار — عادةً خلال ساعتين لثلاثة.",
    successRef: "رقم طلبك",
    newRequest: "ابعت طلب تاني",
    error: "حصلت مشكلة في الإرسال. جرّب تاني أو راسلني على الواتساب.",
    required: "لازم تكتب الاسم ورقم الواتساب.",
  },
  modal: {
    eyebrow: "قبل ما تكمل تصفح",
    title: "اكتب اسمك ورقم الواتساب — وأنا هابعتلك خيارات الليلة بنفسي",
    submit: "إرسال",
    successTitle: "تم الإرسال.",
    successBody: "هتوصلك رسالة على الواتساب خلال لحظات.",
    or: "أو",
    whatsappDirect: "افتح الواتساب مباشرة ←",
    close: "إغلاق",
  },
  footer: {
    links: { whatsapp: "واتساب", venues: "أنواع السهرات", reserve: "اطلب ترابيزة", dashboard: "لوحة التحكم" },
    note:
      "سهرة خدمة كونسييرج مستقلة للسهر في مصر، وغير تابعة للأماكن اللي بتحجز فيها. الحجز بيتأكد بعد التواصل على الواتساب.",
    rights: "كل الحقوق محفوظة",
  },
  whatsappMessage: "مرحبا، عاوز احجز طاولة",
  langSwitch: "English",
} as const;

const en = {
  meta: {
    title: "Sahra · Nightlife Concierge in Egypt",
    description:
      "A private concierge service for rooftops, Nile boat parties, beach clubs and VIP tables in Cairo, El Gouna, the North Coast and Sharm El Sheikh.",
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
