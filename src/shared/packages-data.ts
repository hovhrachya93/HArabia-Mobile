import type { Country } from "./countries";
import type { Localized } from "./i18n/config";

export type PackageSeason = "newYear" | "march8" | "summer";

export interface TravelPackage {
  slug: string;
  season: PackageSeason;
  country: Country;
  city: string;
  // The catalog hotel the package is built on (lib/hotels-data).
  hotelSlug: string;
  nights: number;
  // Suggested stay; the request form starts from these and can change them.
  checkIn: string;
  checkOut: string;
  // Flight legs, as airport codes — shown as "EVN → DXB".
  flight: { from: string; to: string; baggageKg: number };
  priceFromUsd: number;
  title: Localized;
  summary: Localized;
  when: Localized;
  includes: Localized[];
  program: { title: Localized; body: Localized }[];
}

// PLACEHOLDER packages — dates, prices and inclusions are illustrative until
// HTours sets the real offers. Prices are per person, based on two adults.
export const packages: TravelPackage[] = [
  {
    slug: "new-year-in-dubai",
    season: "newYear",
    country: "UAE",
    city: "Dubai",
    hotelSlug: "palm-crescent-resort",
    nights: 5,
    checkIn: "2026-12-29",
    checkOut: "2027-01-03",
    flight: { from: "EVN", to: "DXB", baggageKg: 20 },
    priceFromUsd: 1490,
    title: {
      hy: "Ամանոր Դուբայում",
      en: "New Year in Dubai",
      ru: "Новый год в Дубае",
      ar: "رأس السنة في دبي",
    },
    summary: {
      hy: "Հինգ գիշեր ծովափնյա ռեզորտում, ամանորյա հրավառություն Բուրջ Խալիֆայի վրա, տոնական ընթրիք և անապատային սաֆարի՝ թռիչքով Երևանից։",
      en: "Five nights at a beach resort, the fireworks over the Burj Khalifa, a gala dinner and a desert safari — with flights from Yerevan.",
      ru: "Пять ночей на пляжном курорте, новогодний фейерверк над Бурдж-Халифой, праздничный ужин и сафари — с перелётом из Еревана.",
      ar: "خمس ليالٍ في منتجع شاطئي، وألعاب رأس السنة النارية فوق برج خليفة، وعشاء احتفالي وسفاري صحراوي، مع رحلات الطيران من يريفان.",
    },
    when: {
      hy: "29 դեկտեմբերի – 3 հունվարի",
      en: "29 December – 3 January",
      ru: "29 декабря – 3 января",
      ar: "29 ديسمبر – 3 يناير",
    },
    includes: [
      {
        hy: "Թռիչք Երևան – Դուբայ – Երևան, 20 կգ ուղեբեռ",
        en: "Return flight Yerevan – Dubai, 20 kg baggage",
        ru: "Перелёт Ереван – Дубай – Ереван, багаж 20 кг",
        ar: "رحلة ذهاب وعودة يريفان – دبي، أمتعة 20 كغ",
      },
      {
        hy: "5 գիշեր Palm Crescent Resort-ում՝ նախաճաշով",
        en: "5 nights at Palm Crescent Resort with breakfast",
        ru: "5 ночей в Palm Crescent Resort с завтраками",
        ar: "5 ليالٍ في منتجع بالم كريسنت مع الإفطار",
      },
      {
        hy: "Անհատական տրանսֆերներ օդանավակայանից և հետ",
        en: "Private airport transfers both ways",
        ru: "Индивидуальный трансфер из аэропорта и обратно",
        ar: "تنقل خاص من المطار وإليه",
      },
      {
        hy: "Ամանորյա տոնական ընթրիք",
        en: "New Year's Eve gala dinner",
        ru: "Новогодний гала-ужин",
        ar: "عشاء احتفالي ليلة رأس السنة",
      },
      {
        hy: "Անապատային սաֆարի ընթրիքով",
        en: "Desert safari with dinner",
        ru: "Сафари в пустыне с ужином",
        ar: "سفاري صحراوي مع العشاء",
      },
    ],
    program: [
      {
        title: { hy: "Օր 1", en: "Day 1", ru: "День 1", ar: "اليوم 1" },
        body: {
          hy: "Թռիչք Երևանից, դիմավորում օդանավակայանում և տրանսֆեր ռեզորտ։",
          en: "Fly from Yerevan, meet your driver at arrivals and transfer to the resort.",
          ru: "Вылет из Еревана, встреча в аэропорту и трансфер на курорт.",
          ar: "السفر من يريفان واستقبال السائق في صالة الوصول والانتقال إلى المنتجع.",
        },
      },
      {
        title: { hy: "Օր 2–3", en: "Days 2–3", ru: "Дни 2–3", ar: "اليومان 2–3" },
        body: {
          hy: "Լողափ, Դաունթաուն և Բուրջ Խալիֆա, երեկոյան՝ անապատային սաֆարի։",
          en: "Beach time, Downtown and the Burj Khalifa, and an evening desert safari.",
          ru: "Пляж, Даунтаун и Бурдж-Халифа, вечером — сафари в пустыне.",
          ar: "وقت على الشاطئ ووسط المدينة وبرج خليفة، وسفاري صحراوي مسائي.",
        },
      },
      {
        title: { hy: "31 դեկտեմբեր", en: "31 December", ru: "31 декабря", ar: "31 ديسمبر" },
        body: {
          hy: "Տոնական ընթրիք և կեսգիշերային հրավառություն։",
          en: "Gala dinner and the midnight fireworks.",
          ru: "Праздничный ужин и фейерверк в полночь.",
          ar: "عشاء احتفالي والألعاب النارية عند منتصف الليل.",
        },
      },
      {
        title: { hy: "Վերջին օր", en: "Last day", ru: "Последний день", ar: "اليوم الأخير" },
        body: {
          hy: "Ազատ ժամանակ, տրանսֆեր օդանավակայան և թռիչք տուն։",
          en: "Free time, transfer to the airport and your flight home.",
          ru: "Свободное время, трансфер в аэропорт и вылет домой.",
          ar: "وقت حر ثم الانتقال إلى المطار والعودة.",
        },
      },
    ],
  },
  {
    slug: "march-8-in-dubai",
    season: "march8",
    country: "UAE",
    city: "Dubai",
    hotelSlug: "marina-horizon-hotel",
    nights: 4,
    checkIn: "2027-03-06",
    checkOut: "2027-03-10",
    flight: { from: "EVN", to: "DXB", baggageKg: 20 },
    priceFromUsd: 1090,
    title: {
      hy: "Մարտի 8՝ Դուբայում",
      en: "March 8 in Dubai",
      ru: "8 Марта в Дубае",
      ar: "8 مارس في دبي",
    },
    summary: {
      hy: "Չորս գիշեր Դուբայ Մարինայում, զբոսանավ մայրամուտին, սպա և ծաղիկներ սենյակում՝ նվեր, որը կհիշվի։",
      en: "Four nights in Dubai Marina, a sunset yacht, a spa treatment and flowers in the room — a gift she'll remember.",
      ru: "Четыре ночи в Дубай Марине, яхта на закате, спа и цветы в номере — подарок, который запомнится.",
      ar: "أربع ليالٍ في دبي مارينا، ويخت عند الغروب، وجلسة سبا، وزهور في الغرفة: هدية لا تُنسى.",
    },
    when: {
      hy: "6 – 10 մարտի",
      en: "6 – 10 March",
      ru: "6 – 10 марта",
      ar: "6 – 10 مارس",
    },
    includes: [
      {
        hy: "Թռիչք Երևան – Դուբայ – Երևան, 20 կգ ուղեբեռ",
        en: "Return flight Yerevan – Dubai, 20 kg baggage",
        ru: "Перелёт Ереван – Дубай – Ереван, багаж 20 кг",
        ar: "رحلة ذهاب وعودة يريفان – دبي، أمتعة 20 كغ",
      },
      {
        hy: "4 գիշեր Marina Horizon Hotel-ում՝ նախաճաշով",
        en: "4 nights at Marina Horizon Hotel with breakfast",
        ru: "4 ночи в Marina Horizon Hotel с завтраками",
        ar: "4 ليالٍ في فندق مارينا هورايزن مع الإفطار",
      },
      {
        hy: "Անհատական տրանսֆերներ",
        en: "Private transfers",
        ru: "Индивидуальные трансферы",
        ar: "تنقلات خاصة",
      },
      {
        hy: "Զբոսանավ մայրամուտին",
        en: "Sunset yacht cruise",
        ru: "Прогулка на яхте на закате",
        ar: "رحلة يخت عند الغروب",
      },
      {
        hy: "Սպա պրոցեդուրա և ծաղիկներ սենյակում",
        en: "A spa treatment and flowers in the room",
        ru: "Спа-процедура и цветы в номере",
        ar: "جلسة سبا وزهور في الغرفة",
      },
    ],
    program: [
      {
        title: { hy: "Օր 1", en: "Day 1", ru: "День 1", ar: "اليوم 1" },
        body: {
          hy: "Ժամանում, տրանսֆեր և ծաղիկներ սենյակում։",
          en: "Arrival, transfer and flowers waiting in the room.",
          ru: "Прилёт, трансфер и цветы в номере.",
          ar: "الوصول والانتقال وزهور بانتظارك في الغرفة.",
        },
      },
      {
        title: { hy: "Մարտի 8", en: "8 March", ru: "8 марта", ar: "8 مارس" },
        body: {
          hy: "Սպա առավոտյան, երեկոյան՝ զբոսանավ մայրամուտին Պալմ Ջումեյրայի երկայնքով։",
          en: "Spa in the morning, then a sunset yacht along Palm Jumeirah.",
          ru: "Утром спа, вечером — яхта на закате вдоль Пальмы Джумейра.",
          ar: "سبا في الصباح، ثم يخت عند الغروب على طول نخلة جميرا.",
        },
      },
      {
        title: { hy: "Ազատ օրեր", en: "Free days", ru: "Свободные дни", ar: "أيام حرة" },
        body: {
          hy: "Լողափ, շոփինգ և ռեստորաններ՝ ձեր ցանկությամբ։",
          en: "Beach, shopping and restaurants at your own pace.",
          ru: "Пляж, шопинг и рестораны в своём ритме.",
          ar: "شاطئ وتسوق ومطاعم على راحتك.",
        },
      },
    ],
  },
  {
    slug: "summer-family-abu-dhabi",
    season: "summer",
    country: "UAE",
    city: "Abu Dhabi",
    hotelSlug: "yas-bay-hotel",
    nights: 7,
    checkIn: "2027-07-10",
    checkOut: "2027-07-17",
    flight: { from: "EVN", to: "DXB", baggageKg: 20 },
    priceFromUsd: 990,
    title: {
      hy: "Ընտանեկան ամառ Յաս կղզում",
      en: "Family summer on Yas Island",
      ru: "Семейное лето на острове Яс",
      ar: "صيف عائلي في جزيرة ياس",
    },
    summary: {
      hy: "Յոթ գիշեր Աբու Դաբիի Յաս կղզում՝ զբոսայգիների կողքին, տոմսերով երկու զբոսայգի և անհատական տրանսֆերներ ամբողջ ընտանիքի համար։",
      en: "Seven nights on Abu Dhabi's Yas Island, next to the theme parks, with tickets to two parks and private transfers for the whole family.",
      ru: "Семь ночей на острове Яс в Абу-Даби рядом с парками развлечений, билеты в два парка и индивидуальные трансферы для всей семьи.",
      ar: "سبع ليالٍ في جزيرة ياس بأبوظبي بجوار الحدائق الترفيهية، مع تذاكر لحديقتين وتنقلات خاصة للعائلة كلها.",
    },
    when: {
      hy: "Հուլիս – օգոստոս, ցանկացած 7 գիշեր",
      en: "July – August, any 7 nights",
      ru: "Июль – август, любые 7 ночей",
      ar: "يوليو – أغسطس، أي 7 ليالٍ",
    },
    includes: [
      {
        hy: "Թռիչք Երևան – Դուբայ – Երևան, 20 կգ ուղեբեռ",
        en: "Return flight Yerevan – Dubai, 20 kg baggage",
        ru: "Перелёт Ереван – Дубай – Ереван, багаж 20 кг",
        ar: "رحلة ذهاب وعودة يريفان – دبي، أمتعة 20 كغ",
      },
      {
        hy: "7 գիշեր Yas Bay Hotel-ում՝ նախաճաշով",
        en: "7 nights at Yas Bay Hotel with breakfast",
        ru: "7 ночей в Yas Bay Hotel с завтраками",
        ar: "7 ليالٍ في فندق ياس باي مع الإفطار",
      },
      {
        hy: "Անհատական տրանսֆերներ Դուբայի օդանավակայանից",
        en: "Private transfers from Dubai airport",
        ru: "Индивидуальные трансферы из аэропорта Дубая",
        ar: "تنقلات خاصة من مطار دبي",
      },
      {
        hy: "Տոմսեր երկու զբոսայգի Յաս կղզում",
        en: "Tickets to two Yas Island theme parks",
        ru: "Билеты в два парка на острове Яс",
        ar: "تذاكر لحديقتين ترفيهيتين في جزيرة ياس",
      },
      {
        hy: "Մանկական նստատեղեր ըստ պահանջի",
        en: "Child seats on request",
        ru: "Детские кресла по запросу",
        ar: "مقاعد أطفال عند الطلب",
      },
    ],
    program: [
      {
        title: { hy: "Օր 1", en: "Day 1", ru: "День 1", ar: "اليوم 1" },
        body: {
          hy: "Թռիչք Դուբայ և տրանսֆեր Յաս կղզի (մոտ 1 ժամ)։",
          en: "Fly to Dubai and transfer to Yas Island (about an hour).",
          ru: "Перелёт в Дубай и трансфер на остров Яс (около часа).",
          ar: "السفر إلى دبي والانتقال إلى جزيرة ياس (نحو ساعة).",
        },
      },
      {
        title: { hy: "Զբոսայգիների օրեր", en: "Theme-park days", ru: "Дни в парках", ar: "أيام الحدائق" },
        body: {
          hy: "Ferrari World, Warner Bros. World կամ Yas Waterworld՝ ընտրեք երկուսը։",
          en: "Ferrari World, Warner Bros. World or Yas Waterworld — pick any two.",
          ru: "Ferrari World, Warner Bros. World или Yas Waterworld — выберите два.",
          ar: "فيراري وورلد أو وارنر براذرز وورلد أو ياس ووترورلد: اختر اثنتين.",
        },
      },
      {
        title: { hy: "Հանգստի օրեր", en: "Easy days", ru: "Дни отдыха", ar: "أيام للراحة" },
        body: {
          hy: "Լողավազան, լողափ և Մեծ մզկիթ՝ երեկոյան զովին։",
          en: "Pool, beach and the Grand Mosque in the cooler evening.",
          ru: "Бассейн, пляж и Большая мечеть вечером, когда прохладнее.",
          ar: "المسبح والشاطئ والجامع الكبير في المساء الألطف.",
        },
      },
    ],
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
export const packageForSeason = (season: PackageSeason) => packages.find((p) => p.season === season);
