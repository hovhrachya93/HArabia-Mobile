import { isLive } from "./countries";
import type { Hotel } from "./types";

// PLACEHOLDER catalog — names, prices and descriptions are illustrative, not
// real properties. Swap this module for a real data source (supplier API or
// database) that returns the same `Hotel` shape.
export const allHotels: Hotel[] = [
  {
    slug: "palm-crescent-resort",
    name: "Palm Crescent Resort",
    city: "Dubai",
    country: "UAE",
    stars: 5,
    description: {
      hy: "Ծովափնյա ռեզորտ՝ լագունային լողավազանով, սպա-կենտրոնով և ընտանեկան ակումբով արմավենու տեսքով կղզում։",
      en: "Beachfront resort with a lagoon pool, spa and family club on a palm-shaped island.",
      ru: "Пляжный курорт с бассейном-лагуной, спа и семейным клубом на острове в форме пальмы.",
      ar: "منتجع على الشاطئ مع مسبح على شكل بحيرة ومنتجع صحي ونادٍ عائلي على جزيرة على شكل نخلة.",
    },
    priceFromUsd: 240,
  },
  {
    slug: "marina-horizon-hotel",
    name: "Marina Horizon Hotel",
    city: "Dubai",
    country: "UAE",
    stars: 4,
    description: {
      hy: "Ժամանակակից քաղաքային հյուրանոց՝ մարինայի զբոսավայրից, ռեստորաններից և տրամվայից մի քանի քայլ հեռու։",
      en: "Modern city hotel a short walk from the marina promenade, restaurants and tram.",
      ru: "Современный городской отель в нескольких минутах ходьбы от набережной марины, ресторанов и трамвая.",
      ar: "فندق عصري في المدينة على بُعد خطوات من ممشى المارينا والمطاعم والترام.",
    },
    priceFromUsd: 130,
  },
  {
    slug: "corniche-pearl-hotel",
    name: "Corniche Pearl Hotel",
    city: "Abu Dhabi",
    country: "UAE",
    stars: 5,
    description: {
      hy: "Նրբաճաշակ ծովափնյա հյուրանոց Կորնիշի վրա՝ ծովի տեսարանով սենյակներով և մասնավոր լողափնյա ակումբով։",
      en: "Elegant seafront hotel on the Corniche with sea-view rooms and a private beach club.",
      ru: "Элегантный отель на набережной Корниш с номерами с видом на море и частным пляжным клубом.",
      ar: "فندق أنيق على الكورنيش مع غرف مطلة على البحر ونادٍ شاطئي خاص.",
    },
    priceFromUsd: 210,
  },
  {
    slug: "yas-bay-hotel",
    name: "Yas Bay Hotel",
    city: "Abu Dhabi",
    country: "UAE",
    stars: 4,
    description: {
      hy: "Ջրափնյա հյուրանոց Յաս կղզում՝ թեմատիկ զբոսայգիների, մարինայի և գոլֆի դաշտերի մոտ։",
      en: "Waterfront hotel on Yas Island, close to the theme parks, marina and golf links.",
      ru: "Отель на берегу острова Яс, рядом с тематическими парками, мариной и полями для гольфа.",
      ar: "فندق على الواجهة المائية في جزيرة ياس، بالقرب من المتنزهات الترفيهية والمارينا وملاعب الغولف.",
    },
    priceFromUsd: 150,
  },
  {
    slug: "heritage-lagoon-hotel",
    name: "Heritage Lagoon Hotel",
    city: "Sharjah",
    country: "UAE",
    stars: 4,
    description: {
      hy: "Հյուրանոց լագունի ափին՝ պատմական թաղամասի և թանգարանների մոտ, Դուբայից 20 րոպե հեռավորության վրա։",
      en: "Lagoon-side hotel near the heritage quarter and museums, 20 minutes from Dubai.",
      ru: "Отель на берегу лагуны рядом с историческим кварталом и музеями, в 20 минутах от Дубая.",
      ar: "فندق على ضفاف البحيرة قرب الحي التراثي والمتاحف، على بُعد 20 دقيقة من دبي.",
    },
    priceFromUsd: 95,
  },
  {
    slug: "mountain-shore-resort",
    name: "Mountain Shore Resort",
    city: "Ras Al Khaimah",
    country: "UAE",
    stars: 5,
    description: {
      hy: "Լողափնյա ռեզորտ Հաջար լեռների և ծովի միջև՝ վիլլաներով, սպա-կենտրոնով և մանկական ակումբով։",
      en: "Beach resort between the Hajar mountains and the sea, with villas, spa and kids' club.",
      ru: "Пляжный курорт между горами Хаджар и морем, с виллами, спа и детским клубом.",
      ar: "منتجع شاطئي بين جبال الحجر والبحر، مع فلل ومنتجع صحي ونادٍ للأطفال.",
    },
    priceFromUsd: 190,
  },
  {
    slug: "wadi-palms-retreat",
    name: "Wadi Palms Retreat",
    city: "Muscat",
    country: "Oman",
    stars: 4,
    description: {
      hy: "Հանգիստ վայր լեռների և ծովի միջև՝ արմավենու այգիներով և ավանդական մեջլիսով։",
      en: "Quiet retreat between mountains and sea, with palm gardens and a traditional majlis.",
      ru: "Тихое место отдыха между горами и морем, с пальмовыми садами и традиционным меджлисом.",
      ar: "ملاذ هادئ بين الجبال والبحر، مع حدائق نخيل ومجلس تقليدي.",
    },
    priceFromUsd: 120,
  },
  {
    slug: "souq-courtyard-hotel",
    name: "Souq Courtyard Hotel",
    city: "Doha",
    country: "Qatar",
    stars: 4,
    description: {
      hy: "Բուտիկ հյուրանոց ներքին բակով՝ հին շուկայի, թանգարանների և ծովափի հարևանությամբ։",
      en: "Boutique courtyard hotel beside the old souq, museums and waterfront.",
      ru: "Бутик-отель с внутренним двориком рядом со старым рынком, музеями и набережной.",
      ar: "فندق بوتيك بفناء داخلي بجوار السوق القديم والمتاحف والواجهة البحرية.",
    },
    priceFromUsd: 140,
  },
  {
    slug: "west-bay-tower-hotel",
    name: "West Bay Tower Hotel",
    city: "Doha",
    country: "Qatar",
    stars: 5,
    description: {
      hy: "Բարձրահարկ հյուրանոց Վեսթ Բեյում՝ քաղաքի համայնապատկերով, տանիքի լողավազանով և դեպի Կորնիշ ուղիղ ելքով։",
      en: "High-rise hotel in West Bay with skyline views, a rooftop pool and direct Corniche access.",
      ru: "Высотный отель в Вест-Бей с видом на город, бассейном на крыше и прямым выходом на Корниш.",
      ar: "فندق شاهق في الخليج الغربي بإطلالات على أفق المدينة ومسبح على السطح ووصول مباشر إلى الكورنيش.",
    },
    priceFromUsd: 220,
  },
  {
    slug: "pearl-marina-suites",
    name: "Pearl Marina Suites",
    city: "Doha",
    country: "Qatar",
    stars: 4,
    description: {
      hy: "Սպասարկվող սյուիթներ Փերլ կղզում՝ մարինայի զբոսուղուց, սրճարաններից և բուտիկներից մի քանի քայլ հեռու։",
      en: "Serviced suites on The Pearl island, steps from the marina boardwalk, cafés and boutiques.",
      ru: "Апартаменты с обслуживанием на острове Перл, в двух шагах от променада марины, кафе и бутиков.",
      ar: "أجنحة فندقية مخدومة في جزيرة اللؤلؤة، على بُعد خطوات من ممشى المارينا والمقاهي والمتاجر.",
    },
    priceFromUsd: 160,
  },
];

// Hotels in the countries we currently sell — what the site shows.
export const hotels = allHotels.filter((hotel) => isLive(hotel.country));
