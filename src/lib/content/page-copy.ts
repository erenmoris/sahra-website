export type {
  FlatCopy,
  HomeCardOverride,
  ExclusiveVenueOverride,
  IdTitleBodyOverride,
} from "./types";

export type CopyField = {
  key: string;
  label: string;
  multiline?: boolean;
};

export const HOME_COPY_FIELDS: CopyField[] = [
  { key: "teaserEyebrow", label: "سطر فوق عنوان البطاقات" },
  { key: "teaserTitle", label: "عنوان البطاقات" },
  { key: "teaserAccent", label: "الكلمة المميزة" },
  { key: "teaserLede", label: "وصف البطاقات", multiline: true },
];

export const EXCLUSIVE_COPY_FIELDS: CopyField[] = [
  { key: "eyebrow", label: "سطر فوق العنوان" },
  { key: "title", label: "العنوان" },
  { key: "lede", label: "الوصف", multiline: true },
  { key: "badge", label: "شارة البطاقة" },
  { key: "cta", label: "نص الزر" },
  { key: "whatsappMessage", label: "رسالة الواتساب", multiline: true },
];

export const REELS_COPY_FIELDS: CopyField[] = [
  { key: "eyebrow", label: "سطر فوق العنوان" },
  { key: "title", label: "العنوان" },
  { key: "titleAccent", label: "الكلمة المميزة" },
  { key: "lede", label: "الوصف", multiline: true },
  { key: "viewGallery", label: "زر المعرض" },
];

export const GALLERY_HOME_FIELDS: CopyField[] = [
  { key: "eyebrow", label: "سطر فوق العنوان" },
  { key: "title", label: "العنوان" },
  { key: "titleAccent", label: "الكلمة المميزة" },
  { key: "lede", label: "الوصف", multiline: true },
  { key: "viewAll", label: "زر عرض الكل" },
  { key: "fallbackAlt", label: "وصف الصورة الاحتياطي" },
];

export const SECTION_HEADER_FIELDS: CopyField[] = [
  { key: "eyebrow", label: "سطر فوق العنوان" },
  { key: "title", label: "العنوان" },
  { key: "titleAccent", label: "الكلمة المميزة" },
  { key: "titleEnd", label: "نهاية العنوان" },
  { key: "lede", label: "الوصف", multiline: true },
];

export const CARS_COPY_FIELDS: CopyField[] = [
  { key: "metaTitle", label: "عنوان SEO" },
  { key: "metaDescription", label: "وصف SEO", multiline: true },
  { key: "eyebrow", label: "سطر فوق الهيرو" },
  { key: "heroTitle", label: "عنوان الهيرو" },
  { key: "heroLede", label: "وصف الهيرو", multiline: true },
  { key: "fleetEyebrow", label: "سطر فوق الأسطول" },
  { key: "fleetTitle", label: "عنوان الأسطول" },
  { key: "passengersLabel", label: "تسمية الركاب" },
  { key: "luggageLabel", label: "تسمية الأمتعة" },
  { key: "featureLabel", label: "تسمية الميزة" },
  { key: "bookButton", label: "زر الحجز في الكارت" },
  { key: "whatsappPrefix", label: "مقدمة رسالة الحجز", multiline: true },
  { key: "airportEyebrow", label: "سطر خدمة المطار" },
  { key: "airportTitle", label: "عنوان خدمة المطار" },
  { key: "airportBody", label: "وصف خدمة المطار", multiline: true },
  { key: "airportButton", label: "زر المطار" },
  { key: "airportWhatsapp", label: "رسالة واتساب المطار", multiline: true },
  { key: "backToFleet", label: "العودة للأسطول" },
  { key: "specsEyebrow", label: "سطر المواصفات" },
  { key: "specsTitle", label: "عنوان المواصفات" },
  { key: "specCapacity", label: "تسمية السعة" },
  { key: "specLuggage", label: "تسمية الأمتعة (تفاصيل)" },
  { key: "specPrivacy", label: "تسمية الخصوصية" },
  { key: "specEntertainment", label: "تسمية الترفيه" },
  { key: "chauffeurEyebrow", label: "سطر تجربة السائق" },
  { key: "chauffeurTitle", label: "عنوان تجربة السائق" },
  { key: "chauffeurBody", label: "وصف تجربة السائق", multiline: true },
  { key: "amenitiesEyebrow", label: "سطر الكماليات" },
  { key: "amenitiesTitle", label: "عنوان الكماليات" },
  { key: "galleryEyebrow", label: "سطر المعرض" },
  { key: "priceLabel", label: "تسمية السعر" },
  { key: "priceUponRequest", label: "نص السعر عند الطلب" },
  { key: "bookThisCar", label: "زر احجز هذه السيارة" },
];

export const DIRECTORY_COPY_FIELDS: CopyField[] = [
  { key: "metaTitle", label: "عنوان SEO" },
  { key: "metaDescription", label: "وصف SEO", multiline: true },
  { key: "eyebrow", label: "سطر فوق العنوان (إن وُجد)" },
  { key: "title", label: "عنوان القسم (إن وُجد)" },
  { key: "titleAccent", label: "الكلمة المميزة (إن وُجدت)" },
  { key: "directoryTitle", label: "عنوان الدليل" },
  { key: "searchPlaceholder", label: "نص البحث" },
  { key: "book", label: "زر احجز" },
  { key: "savePlace", label: "زر حفظ المكان" },
  { key: "emptySearch", label: "رسالة لا توجد نتائج", multiline: true },
  { key: "popularAreas", label: "عنوان المناطق الشائعة" },
  { key: "resultsCount", label: "صيغة عدد النتائج (استخدم {n})" },
  { key: "whatsappBookPrefix", label: "مقدمة رسالة الحجز" },
  { key: "namesTitle", label: "عنوان قائمة الأسماء" },
  { key: "namesNote", label: "ملاحظة الأسماء", multiline: true },
  { key: "tickerSahel", label: "شريط الساحل" },
  { key: "tickerCairo", label: "شريط القاهرة" },
  { key: "backToList", label: "العودة للقائمة" },
  { key: "aboutTitle", label: "عنوان النبذة" },
  { key: "locationTitle", label: "عنوان الموقع" },
  { key: "openMaps", label: "افتح في الخرائط" },
  { key: "detailsCta", label: "زر التفاصيل / واتساب" },
  { key: "fallbackAbout", label: "نبذة افتراضية", multiline: true },
  { key: "categoryNightlife", label: "تصنيف حياة ليلية" },
  { key: "categoryBeach", label: "تصنيف شاطئ" },
  { key: "categoryAqua", label: "تصنيف حديقة مائية" },
];

export const GALLERY_PAGE_FIELDS: CopyField[] = [
  { key: "eyebrow", label: "سطر فوق العنوان" },
  { key: "title", label: "العنوان" },
  { key: "titleAccent", label: "الكلمة المميزة" },
  { key: "lede", label: "الوصف", multiline: true },
  { key: "tabImages", label: "تاب الصور" },
  { key: "tabVideos", label: "تاب الفيديو" },
  { key: "metaTitle", label: "عنوان SEO" },
  { key: "metaDescription", label: "وصف SEO", multiline: true },
  { key: "note", label: "ملاحظة أسفل الصفحة", multiline: true },
];

export const CHALETS_COPY_FIELDS: CopyField[] = [
  { key: "metaTitle", label: "عنوان SEO" },
  { key: "metaDescription", label: "وصف SEO", multiline: true },
  { key: "eyebrow", label: "سطر فوق العنوان" },
  { key: "title", label: "العنوان" },
  { key: "titleAccent", label: "الكلمة المميزة" },
  { key: "lede", label: "الوصف", multiline: true },
  { key: "priceBadge", label: "شارة السعر" },
  { key: "priceTeaser", label: "معاينة السعر" },
  { key: "priceHint", label: "تلميح السعر", multiline: true },
  { key: "empty", label: "رسالة فارغ", multiline: true },
  { key: "details", label: "زر التفاصيل" },
  { key: "backToList", label: "العودة للقائمة" },
  { key: "bedrooms", label: "تسمية غرف النوم" },
  { key: "bathrooms", label: "تسمية الحمامات" },
  { key: "familyOnly", label: "عائلات فقط" },
  { key: "fromOwner", label: "من المالك" },
  { key: "featuresTitle", label: "عنوان المميزات" },
  { key: "galleryTitle", label: "عنوان المعرض" },
  { key: "ctaWhatsapp", label: "زر واتساب" },
];

export const ABOUT_COPY_FIELDS: CopyField[] = [
  { key: "metaTitle", label: "عنوان SEO" },
  { key: "metaDescription", label: "وصف SEO", multiline: true },
  { key: "heroTitle", label: "عنوان الهيرو" },
  { key: "heroSubtitle", label: "وصف الهيرو", multiline: true },
  { key: "storyEyebrow", label: "سطر القصة" },
  { key: "storyTitle", label: "عنوان القصة" },
  { key: "storyImageAlt", label: "وصف صورة القصة" },
  { key: "experienceEyebrow", label: "سطر الخبرة" },
  { key: "experienceTitle", label: "عنوان الخبرة" },
  { key: "teamEyebrow", label: "سطر الفريق" },
  { key: "teamTitle", label: "عنوان الفريق" },
  { key: "teamLede", label: "وصف الفريق", multiline: true },
  { key: "availabilityEyebrow", label: "سطر التوفر" },
  { key: "availabilityTitle", label: "عنوان التوفر" },
  { key: "availabilityBody", label: "وصف التوفر", multiline: true },
  { key: "availabilityBadge", label: "شارة التوفر" },
  { key: "valuesEyebrow", label: "سطر القيم" },
  { key: "valuesTitle", label: "عنوان القيم" },
  { key: "ctaTitle", label: "عنوان الدعوة" },
  { key: "ctaBody", label: "وصف الدعوة", multiline: true },
  { key: "ctaButton", label: "زر الدعوة" },
  { key: "whatsappMessage", label: "رسالة واتساب", multiline: true },
];

export const FORM_COPY_FIELDS: CopyField[] = [
  { key: "eyebrow", label: "سطر فوق العنوان" },
  { key: "title", label: "العنوان" },
  { key: "titleAccent", label: "الكلمة المميزة" },
  { key: "lede", label: "الوصف", multiline: true },
  { key: "submit", label: "زر الإرسال" },
  { key: "submitting", label: "نص أثناء الإرسال" },
  { key: "note", label: "ملاحظة تحت الفورم", multiline: true },
  { key: "or", label: "أو" },
  { key: "whatsappDirect", label: "زر واتساب مباشر" },
  { key: "snapchatDirect", label: "زر سناب مباشر" },
  { key: "successTitle", label: "عنوان النجاح" },
  { key: "successBody", label: "وصف النجاح", multiline: true },
  { key: "successRef", label: "نص رقم الطلب" },
  { key: "newRequest", label: "طلب جديد" },
  { key: "error", label: "رسالة الخطأ", multiline: true },
  { key: "required", label: "حقل مطلوب" },
];

export const FOOTER_COPY_FIELDS: CopyField[] = [
  { key: "slogan", label: "الشعار" },
  { key: "discoverTitle", label: "عنوان اكتشف" },
  { key: "legalTitle", label: "عنوان الخصوصية" },
  { key: "connectTitle", label: "عنوان تواصل" },
  { key: "chaletsStay", label: "رابط إقامة الشاليهات" },
  { key: "bookWhatsapp", label: "احجز واتساب" },
  { key: "copyright", label: "حقوق النشر" },
  { key: "note", label: "ملاحظة الفوتر", multiline: true },
];

export const SOCIAL_COPY_FIELDS: CopyField[] = [
  { key: "title", label: "العنوان" },
  { key: "body", label: "الوصف", multiline: true },
  { key: "snapchat", label: "نص سناب شات" },
];

export const TRUST_META_FIELDS: CopyField[] = [
  { key: "metaTitle", label: "عنوان SEO" },
  { key: "metaDescription", label: "وصف SEO", multiline: true },
];

export const HOME_CARD_HREFS = [
  "venues",
  "nightclubs",
  "beaches",
  "chalets",
  "cars",
  "trust",
] as const;

export const EXCLUSIVE_VENUE_IDS = [
  "lemon-tree",
  "amelia",
  "esca",
  "lucida",
] as const;
