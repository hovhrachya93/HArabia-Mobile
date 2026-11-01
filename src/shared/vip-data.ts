import type { Localized } from "./i18n/config";

export type VipIcon = "car" | "manager" | "key" | "yacht" | "sparkle" | "villa";

export interface VipService {
  // Anchor on /vip (e.g. /vip#tour-manager).
  id: string;
  icon: VipIcon;
  title: Localized;
  body: Localized;
  includes: Localized[];
}

// VIP services shown on /vip, in order. Describe only what HTours can
// actually arrange — these read as promises to the customer.
export const vipServices: VipService[] = [
  {
    id: "private-transfers",
    icon: "car",
    title: {
      hy: "Անհատական տրանսֆերներ",
      en: "Private transfers",
      ru: "Индивидуальные трансферы",
      ar: "تنقلات خاصة",
    },
    body: {
      hy: "Բիզնես դասի սեդաններ, ամենագնացներ և միկրոավտոբուսներ՝ անձնական վարորդով։ Ձեզ կդիմավորեն ժամանման սրահում, կօգնեն ուղեբեռի հարցում և կտանեն ուղիղ հյուրանոց՝ օրվա ցանկացած ժամի։",
      en: "Business-class sedans, SUVs and minivans with a personal chauffeur. You're met in the arrivals hall, helped with your luggage and driven straight to your hotel — at any hour.",
      ru: "Седаны бизнес-класса, внедорожники и минивэны с личным водителем. Вас встретят в зоне прилёта, помогут с багажом и довезут прямо до отеля — в любое время суток.",
      ar: "سيارات سيدان من درجة رجال الأعمال وسيارات دفع رباعي وحافلات صغيرة مع سائق خاص. نستقبلك في صالة الوصول ونساعدك في الأمتعة ونوصلك مباشرة إلى فندقك في أي ساعة.",
    },
    includes: [
      {
        hy: "Դիմավորում անվանական ցուցանակով",
        en: "Meet and greet with a name sign",
        ru: "Встреча с табличкой",
        ar: "استقبال مع لافتة بالاسم",
      },
      {
        hy: "Չվերթի հետևում՝ ուշացման դեպքում անվճար սպասում",
        en: "Flight tracking, free waiting if you're delayed",
        ru: "Отслеживание рейса и бесплатное ожидание при задержке",
        ar: "متابعة الرحلة وانتظار مجاني عند التأخير",
      },
      {
        hy: "Վարորդ ձեր տրամադրության տակ՝ ժամով կամ ամբողջ օրով",
        en: "A chauffeur at your disposal by the hour or for the day",
        ru: "Водитель в вашем распоряжении на час или на весь день",
        ar: "سائق تحت تصرفك بالساعة أو طوال اليوم",
      },
      {
        hy: "Ջուր, Wi-Fi և մանկական նստատեղեր՝ ըստ պահանջի",
        en: "Water, Wi-Fi and child seats on request",
        ru: "Вода, Wi-Fi и детские кресла по запросу",
        ar: "مياه وواي فاي ومقاعد أطفال عند الطلب",
      },
    ],
  },
  {
    id: "tour-manager",
    icon: "manager",
    title: {
      hy: "Անձնական տուր-մենեջեր",
      en: "Personal tour manager",
      ru: "Личный тур-менеджер",
      ar: "مدير رحلة شخصي",
    },
    body: {
      hy: "Ձեր անձնական մենեջերը ձեզ հետ է ամբողջ ուղևորության ընթացքում՝ օդանավակայանից մինչև վերադարձ։ Նա պլանավորում է օրերը, ամրագրում ռեստորաններ և տոմսեր և լուծում ցանկացած հարց, որպեսզի դուք միայն հանգստանաք։",
      en: "Your own manager stays with you for the whole trip, from the airport until you fly home. They plan your days, book restaurants and tickets and handle anything that comes up — so all you do is enjoy it.",
      ru: "Личный менеджер сопровождает вас всю поездку — от аэропорта до вылета домой. Он планирует дни, бронирует рестораны и билеты и решает любые вопросы, а вы просто отдыхаете.",
      ar: "يرافقك مديرك الخاص طوال الرحلة من المطار حتى عودتك. يخطط أيامك ويحجز المطاعم والتذاكر ويتولى أي أمر طارئ، فلا يبقى لك سوى الاستمتاع.",
    },
    includes: [
      {
        hy: "Մեկ մարդ՝ ամբողջ ուղևորության համար",
        en: "One person looking after the whole trip",
        ru: "Один человек отвечает за всю поездку",
        ar: "شخص واحد يتولى الرحلة كلها",
      },
      {
        hy: "Օրական ծրագիր՝ ձեր ցանկություններով",
        en: "A day-by-day plan built around you",
        ru: "Программа по дням под ваши пожелания",
        ar: "برنامج يومي مصمم حسب رغباتك",
      },
      {
        hy: "Ռեստորանների, տոմսերի և ակումբների ամրագրում",
        en: "Restaurant, ticket and beach club bookings",
        ru: "Бронирование ресторанов, билетов и пляжных клубов",
        ar: "حجز المطاعم والتذاكر ونوادي الشاطئ",
      },
      {
        hy: "Հասանելի 24/7՝ հայերեն, ռուսերեն կամ անգլերեն",
        en: "On call 24/7 in Armenian, Russian or English",
        ru: "На связи 24/7 на армянском, русском или английском",
        ar: "متاح على مدار الساعة بالأرمنية أو الروسية أو الإنجليزية",
      },
    ],
  },
  {
    id: "luxury-car-rental",
    icon: "key",
    title: {
      hy: "Շքեղ ավտոմեքենաների վարձույթ",
      en: "Luxury car rental",
      ru: "Аренда премиальных автомобилей",
      ar: "تأجير السيارات الفاخرة",
    },
    body: {
      hy: "Սպորտային մեքենաներ, կաբրիոլետներ և պրեմիում ամենագնացներ՝ վարորդով կամ առանց։ Մեքենան կբերեն ձեր հյուրանոց, իսկ հայկական վարորդական իրավունքով կարող եք վարել ինքներդ։",
      en: "Sports cars, convertibles and premium SUVs, with or without a chauffeur. The car is delivered to your hotel — and with an Armenian licence you can drive it yourself.",
      ru: "Спорткары, кабриолеты и премиальные внедорожники — с водителем или без. Машину доставят к отелю, а с армянскими правами вы можете сесть за руль сами.",
      ar: "سيارات رياضية ومكشوفة وسيارات دفع رباعي فاخرة، مع سائق أو من دونه. نوصل السيارة إلى فندقك، ويمكنك قيادتها بنفسك برخصة أرمينية.",
    },
    includes: [
      {
        hy: "Առաքում և վերադարձ հյուրանոցում",
        en: "Delivery and collection at your hotel",
        ru: "Доставка и возврат у отеля",
        ar: "التوصيل والاستلام من فندقك",
      },
      {
        hy: "Վարձույթ օրով, շաբաթով կամ ամբողջ ուղևորության համար",
        en: "Rent by the day, the week or the whole trip",
        ru: "Аренда на день, неделю или всю поездку",
        ar: "استئجار باليوم أو الأسبوع أو طوال الرحلة",
      },
      {
        hy: "Ապահովագրություն և պայմանների պարզ բացատրություն նախապես",
        en: "Insurance and clear terms explained upfront",
        ru: "Страховка и понятные условия заранее",
        ar: "تأمين وشروط واضحة مسبقًا",
      },
    ],
  },
  {
    id: "yacht-charter",
    icon: "yacht",
    title: {
      hy: "Զբոսանավի վարձույթ",
      en: "Yacht charter",
      ru: "Аренда яхты",
      ar: "استئجار يخت",
    },
    body: {
      hy: "Անհատական զբոսանավ Դուբայ Մարինայից՝ Պալմ Ջումեյրայի, Աթլանտիսի և Բուրջ ալ Արաբի տեսարանով։ Իդեալական է ծննդյան օրերի, ամուսնության առաջարկի կամ պարզապես մայրամուտի համար։",
      en: "A private yacht from Dubai Marina, cruising past Palm Jumeirah, Atlantis and the Burj Al Arab. Perfect for birthdays, a proposal or simply the sunset.",
      ru: "Частная яхта из Дубай Марины с видами на Пальму Джумейра, Атлантис и Бурдж-эль-Араб. Идеально для дня рождения, предложения руки и сердца или просто заката.",
      ar: "يخت خاص من دبي مارينا يمر بنخلة جميرا وأتلانتس وبرج العرب. مثالي لأعياد الميلاد أو طلب الزواج أو مجرد الاستمتاع بالغروب.",
    },
    includes: [
      {
        hy: "Անձնակազմ և կապիտան",
        en: "Captain and crew",
        ru: "Капитан и экипаж",
        ar: "قبطان وطاقم",
      },
      {
        hy: "Լողալու կանգառ և ջրային խաղալիքներ",
        en: "A swim stop and water toys",
        ru: "Остановка для купания и водные развлечения",
        ar: "توقف للسباحة وألعاب مائية",
      },
      {
        hy: "Կեյթրինգ, տորթ և ձևավորում՝ ըստ պահանջի",
        en: "Catering, cake and decorations on request",
        ru: "Кейтеринг, торт и украшения по запросу",
        ar: "ضيافة وكعكة وزينة عند الطلب",
      },
    ],
  },
  {
    id: "private-experiences",
    icon: "sparkle",
    title: {
      hy: "Անհատական փորձառություններ",
      en: "Private experiences",
      ru: "Частные впечатления",
      ar: "تجارب خاصة",
    },
    body: {
      hy: "Այն, ինչ հիշվում է ամբողջ կյանքում՝ ընթրիք անապատում միայն ձեզ համար, օդապարիկով թռիչք արևածագին կամ ուղղաթիռով թռիչք Դուբայի վրայով։",
      en: "The moments you remember for life: a desert dinner set up just for you, a hot-air balloon at sunrise, or a helicopter flight over Dubai.",
      ru: "То, что запоминается на всю жизнь: ужин в пустыне только для вас, полёт на воздушном шаре на рассвете или вертолётная прогулка над Дубаем.",
      ar: "لحظات لا تُنسى: عشاء في الصحراء مُعدّ لك وحدك، أو منطاد هوائي عند الشروق، أو رحلة بالمروحية فوق دبي.",
    },
    includes: [
      {
        hy: "Անհատական ճամբար և ընթրիք անապատում",
        en: "A private camp and dinner in the desert",
        ru: "Частный лагерь и ужин в пустыне",
        ar: "مخيم خاص وعشاء في الصحراء",
      },
      {
        hy: "Օդապարիկով թռիչք արևածագին",
        en: "Hot-air balloon flights at sunrise",
        ru: "Полёт на воздушном шаре на рассвете",
        ar: "رحلات منطاد عند الشروق",
      },
      {
        hy: "Ուղղաթիռով թռիչքներ",
        en: "Helicopter sightseeing flights",
        ru: "Обзорные полёты на вертолёте",
        ar: "جولات بالمروحية",
      },
      {
        hy: "Անհատական տուրեր թանգարաններում և շուկաներում",
        en: "Private guided visits to museums and souqs",
        ru: "Индивидуальные экскурсии по музеям и рынкам",
        ar: "زيارات خاصة بمرشد للمتاحف والأسواق",
      },
    ],
  },
  {
    id: "suites-villas",
    icon: "villa",
    title: {
      hy: "Սյուիտներ և վիլլաներ",
      en: "Suites and villas",
      ru: "Люксы и виллы",
      ar: "أجنحة وفلل",
    },
    body: {
      hy: "Ծովի տեսարանով սյուիտներ, անձնական լողավազանով վիլլաներ և բաթլեր-ծառայություն լավագույն ռեզորտներում։ Մենք կընտրենք տարբերակ ձեր ընտանիքի կամ խմբի համար։",
      en: "Sea-view suites, villas with a private pool and butler service at the best resorts. We'll find the right fit for your family or group.",
      ru: "Люксы с видом на море, виллы с личным бассейном и услуги батлера на лучших курортах. Подберём вариант для вашей семьи или компании.",
      ar: "أجنحة بإطلالة على البحر وفلل بمسابح خاصة وخدمة خادم شخصي في أفضل المنتجعات. نختار ما يناسب عائلتك أو مجموعتك.",
    },
    includes: [
      {
        hy: "Վաղ մուտք և ուշ դուրս գալու ամրագրում, երբ հնարավոր է",
        en: "Early check-in and late check-out, where available",
        ru: "Ранний заезд и поздний выезд, когда возможно",
        ar: "تسجيل وصول مبكر ومغادرة متأخرة حسب التوفر",
      },
      {
        hy: "Անձնական լողավազանով վիլլաներ",
        en: "Villas with a private pool",
        ru: "Виллы с личным бассейном",
        ar: "فلل بمسابح خاصة",
      },
      {
        hy: "Հանդիպում և ծաղիկներ սենյակում՝ հատուկ առիթների համար",
        en: "Flowers and a welcome in the room for special occasions",
        ru: "Цветы и комплимент в номере к особому случаю",
        ar: "زهور وترحيب في الغرفة للمناسبات الخاصة",
      },
    ],
  },
];
