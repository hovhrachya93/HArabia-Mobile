import { LIVE_COUNTRIES, type Country } from "./countries";
import type { Localized } from "./i18n/config";

export type FactKey = "capital" | "currency" | "language" | "timeZone" | "flight" | "visa";

export interface Destination {
  country: Country;
  tagline: Localized;
  intro: Localized;
  facts: { key: FactKey; value: Localized }[];
  // Catalog city names (they key the translated city names and hotel filter).
  cities: { name: string; body: Localized }[];
  highlights: { title: Localized; body: Localized }[];
  tips: { title: Localized; body: Localized }[];
  // Blog posts to show on the page, by slug.
  articles: string[];
}

// Country guides behind /destinations/<slug>. To add a country, add its entry
// here; it gets a page once the country is live in lib/countries.
export const destinations: Destination[] = [
  {
    country: "UAE",
    tagline: {
      hy: "Երկնաքերներ, անապատ և լողափեր՝ յոթ էմիրություն, մեկ հեշտ ուղևորություն։",
      en: "Skyscrapers, desert and beaches — seven emirates, one easy trip.",
      ru: "Небоскрёбы, пустыня и пляжи — семь эмиратов, одна лёгкая поездка.",
      ar: "ناطحات سحاب وصحراء وشواطئ: سبع إمارات في رحلة واحدة سهلة.",
    },
    intro: {
      hy: "Արաբական Միացյալ Էմիրությունները Պարսից ծոցի ափին գտնվող յոթ էմիրությունների դաշնություն է։ Դուբայը շքեղություն և շոփինգ է, Աբու Դաբին՝ մշակույթ և հանգիստ լողափեր, իսկ Շարժան և Ռաս Ալ Խայման ավելացնում են պատմություն և լեռներ։ Երկիրն անվտանգ է, տեղաշարժվելը՝ հեշտ, իսկ Հայաստանի քաղաքացիների համար չկա ո՛չ վիզա, ո՛չ ժամային տարբերություն։",
      en: "The United Arab Emirates is a federation of seven emirates on the Gulf. Dubai is glamour and shopping, Abu Dhabi is culture and calm beaches, and Sharjah and Ras Al Khaimah add heritage and mountains. It is safe and easy to get around — and for Armenian passport holders there is no visa and no time difference.",
      ru: "Объединённые Арабские Эмираты — федерация семи эмиратов на берегу Персидского залива. Дубай — это роскошь и шопинг, Абу-Даби — культура и спокойные пляжи, а Шарджа и Рас-эль-Хайма добавляют историю и горы. Здесь безопасно и легко передвигаться, а для граждан Армении нет ни визы, ни разницы во времени.",
      ar: "الإمارات العربية المتحدة اتحاد من سبع إمارات على الخليج. دبي للفخامة والتسوق، وأبوظبي للثقافة والشواطئ الهادئة، والشارقة ورأس الخيمة للتراث والجبال. البلد آمن والتنقل فيه سهل، ولحاملي الجواز الأرمني لا تأشيرة ولا فرق في التوقيت.",
    },
    facts: [
      { key: "capital", value: { hy: "Աբու Դաբի", en: "Abu Dhabi", ru: "Абу-Даби", ar: "أبوظبي" } },
      {
        key: "currency",
        value: { hy: "ԱՄԷ դիրհամ (AED)", en: "UAE dirham (AED)", ru: "Дирхам ОАЭ (AED)", ar: "الدرهم الإماراتي (AED)" },
      },
      {
        key: "language",
        value: {
          hy: "Արաբերեն, անգլերենը խոսում են ամենուր",
          en: "Arabic; English is spoken everywhere",
          ru: "Арабский, английский понимают везде",
          ar: "العربية، والإنجليزية منتشرة في كل مكان",
        },
      },
      {
        key: "timeZone",
        value: {
          hy: "GMT+4՝ ինչպես Երևանում",
          en: "GMT+4 — same as Yerevan",
          ru: "GMT+4 — как в Ереване",
          ar: "GMT+4، مثل توقيت يريفان",
        },
      },
      {
        key: "flight",
        value: {
          hy: "Երևանից ուղիղ չվերթ՝ մոտ 3,5 ժամ",
          en: "About 3.5 hours direct from Yerevan",
          ru: "Около 3,5 часа прямым рейсом из Еревана",
          ar: "نحو 3.5 ساعات برحلة مباشرة من يريفان",
        },
      },
      {
        key: "visa",
        value: {
          hy: "Առանց վիզայի՝ մինչև 90 օր",
          en: "Visa-free, up to 90 days",
          ru: "Без визы, до 90 дней",
          ar: "دون تأشيرة حتى 90 يومًا",
        },
      },
    ],
    cities: [
      {
        name: "Dubai",
        body: {
          hy: "Բուրջ Խալիֆա, լողափեր, առևտրի կենտրոններ և հին Քրիքը՝ լավագույն ընտրությունն առաջին այցի համար։",
          en: "Burj Khalifa, beaches, malls and the old Creek — the easiest first stop.",
          ru: "Бурдж-Халифа, пляжи, торговые центры и старый Крик — лучший выбор для первой поездки.",
          ar: "برج خليفة والشواطئ ومراكز التسوق والخور القديم: أسهل محطة أولى.",
        },
      },
      {
        name: "Abu Dhabi",
        body: {
          hy: "Մայրաքաղաքը՝ Մեծ մզկիթ, Լուվր, Յաս կղզի և հանգիստ լողափեր։",
          en: "The capital: the Grand Mosque, the Louvre, Yas Island and quiet beaches.",
          ru: "Столица: Большая мечеть, Лувр, остров Яс и спокойные пляжи.",
          ar: "العاصمة: الجامع الكبير واللوفر وجزيرة ياس والشواطئ الهادئة.",
        },
      },
      {
        name: "Sharjah",
        body: {
          hy: "Մշակութային էմիրությունը՝ թանգարաններ, պատմական թաղամաս և Դուբայից էժան հյուրանոցներ։",
          en: "The cultural emirate — museums, a heritage quarter and hotels that cost less than Dubai's.",
          ru: "Культурный эмират: музеи, исторический квартал и отели дешевле, чем в Дубае.",
          ar: "إمارة الثقافة: متاحف وحي تراثي وفنادق أرخص من دبي.",
        },
      },
      {
        name: "Ras Al Khaimah",
        body: {
          hy: "Լեռներ և լողափեր՝ Ջեբել Ջեյս՝ երկրի ամենաբարձր գագաթը, և հանգիստ ռեզորտներ Դուբայից մոտ մեկ ժամ հեռավորության վրա։",
          en: "Mountains and beaches: Jebel Jais, the country's highest peak, and relaxed resorts about an hour from Dubai.",
          ru: "Горы и пляжи: Джебель-Джайс — высшая точка страны — и спокойные курорты примерно в часе от Дубая.",
          ar: "جبال وشواطئ: جبل جيس أعلى قمة في الدولة، ومنتجعات هادئة على بُعد ساعة تقريبًا من دبي.",
        },
      },
    ],
    highlights: [
      {
        title: { hy: "Բուրջ Խալիֆա և շատրվաններ", en: "Burj Khalifa and the Dubai Fountain", ru: "Бурдж-Халифа и поющие фонтаны", ar: "برج خليفة ونافورة دبي" },
        body: {
          hy: "Աշխարհի ամենաբարձր շենքի դիտահարթակը, իսկ երեկոյան՝ երաժշտական շատրվանների շոուն ոտքի տակ։",
          en: "The viewing decks of the world's tallest building, then the evening fountain show at its feet.",
          ru: "Смотровые площадки самого высокого здания в мире, а вечером — шоу фонтанов у его подножия.",
          ar: "منصات المشاهدة في أطول مبنى في العالم، ثم عرض النافورة المسائي عند قاعدته.",
        },
      },
      {
        title: { hy: "Շեյխ Զայեդի մեծ մզկիթ", en: "Sheikh Zayed Grand Mosque", ru: "Мечеть шейха Зайда", ar: "جامع الشيخ زايد الكبير" },
        body: {
          hy: "Սպիտակ մարմար և ոսկի Աբու Դաբիում. մուտքն անվճար է՝ նախնական գրանցմամբ։",
          en: "White marble and gold in Abu Dhabi — free to visit with an online booking.",
          ru: "Белый мрамор и золото в Абу-Даби — вход бесплатный по онлайн-записи.",
          ar: "رخام أبيض وذهب في أبوظبي، والزيارة مجانية بحجز مسبق عبر الإنترنت.",
        },
      },
      {
        title: { hy: "Անապատային սաֆարի", en: "Desert safari", ru: "Сафари в пустыне", ar: "سفاري الصحراء" },
        body: {
          hy: "Ավազաթմբեր ամենագնացով, ուղտեր և ընթրիք ճամբարում՝ աստղերի տակ։",
          en: "Dune driving, camels and dinner at a camp under the stars.",
          ru: "Дюны на внедорожнике, верблюды и ужин в лагере под звёздами.",
          ar: "قيادة على الكثبان وجمال وعشاء في مخيم تحت النجوم.",
        },
      },
      {
        title: { hy: "Լուվր Աբու Դաբի", en: "Louvre Abu Dhabi", ru: "Лувр Абу-Даби", ar: "اللوفر أبوظبي" },
        body: {
          hy: "Համաշխարհային արվեստ ծովի վրա կառուցված թանգարանում՝ «լույսի անձրևով» գմբեթի տակ։",
          en: "World art in a museum on the water, under a dome that scatters a 'rain of light'.",
          ru: "Мировое искусство в музее на воде под куполом, рассыпающим «дождь света».",
          ar: "فن عالمي في متحف على الماء تحت قبة تنثر «مطرًا من نور».",
        },
      },
      {
        title: { hy: "Յաս կղզու զբոսայգիներ", en: "Yas Island theme parks", ru: "Парки острова Яс", ar: "حدائق جزيرة ياس الترفيهية" },
        body: {
          hy: "Ferrari World, Warner Bros. World և Yas Waterworld՝ մեկ կղզում։",
          en: "Ferrari World, Warner Bros. World and Yas Waterworld, all on one island.",
          ru: "Ferrari World, Warner Bros. World и Yas Waterworld на одном острове.",
          ar: "فيراري وورلد ووارنر براذرز وورلد وياس ووترورلد على جزيرة واحدة.",
        },
      },
      {
        title: { hy: "Ջեբել Ջեյս", en: "Jebel Jais", ru: "Джебель-Джайс", ar: "جبل جيس" },
        body: {
          hy: "Զով լեռնային օդ, տեսարանային ճանապարհ և աշխարհի ամենաերկար զիփլայններից մեկը Ռաս Ալ Խայմայում։",
          en: "Cool mountain air, a scenic road and one of the world's longest ziplines in Ras Al Khaimah.",
          ru: "Прохладный горный воздух, живописная дорога и один из самых длинных зиплайнов в мире в Рас-эль-Хайме.",
          ar: "هواء جبلي منعش وطريق خلاب وواحد من أطول خطوط الانزلاق في العالم في رأس الخيمة.",
        },
      },
    ],
    tips: [
      {
        title: { hy: "Տեղաշարժ", en: "Getting around", ru: "Как передвигаться", ar: "التنقل" },
        body: {
          hy: "Դուբայում կա մետրո, էմիրությունների միջև հարմար են տաքսիներն ու Careem, Uber հավելվածները։ Կարող եք նաև մեքենա վարձել և վարել հայկական իրավունքով։",
          en: "Dubai has a metro; between emirates, taxis and the Careem and Uber apps are easiest. You can also rent a car and drive on your Armenian licence.",
          ru: "В Дубае есть метро, между эмиратами удобнее такси и приложения Careem и Uber. Можно взять машину напрокат и ездить по армянским правам.",
          ar: "في دبي مترو، وبين الإمارات تكون سيارات الأجرة وتطبيقا كريم وأوبر الأسهل. ويمكنك استئجار سيارة والقيادة برخصتك الأرمينية.",
        },
      },
      {
        title: { hy: "Հագուստ", en: "What to wear", ru: "Что надеть", ar: "ماذا ترتدي" },
        body: {
          hy: "Առևտրի կենտրոններում և հին թաղամասերում ծածկեք ուսերն ու ծնկները, մզկիթներում կանայք ծածկում են նաև գլուխը։ Լողազգեստը նորմալ է լողափում և լողավազանում։",
          en: "Cover shoulders and knees in malls and old quarters; in mosques women also cover their hair. Swimwear is fine at the beach and pool.",
          ru: "В торговых центрах и старых кварталах закрывайте плечи и колени, в мечетях женщины покрывают голову. Купальник — нормально на пляже и у бассейна.",
          ar: "غطِّ الكتفين والركبتين في مراكز التسوق والأحياء القديمة، وفي المساجد تغطي النساء الشعر أيضًا. ملابس السباحة مقبولة على الشاطئ وفي المسبح.",
        },
      },
      {
        title: { hy: "Գումար", en: "Money", ru: "Деньги", ar: "المال" },
        body: {
          hy: "Քարտերն ընդունվում են գրեթե ամենուր, կանխիկ դիրհամ պետք է շուկաների և աբրա նավակների համար։ Թեյավճարը պարտադիր չէ, 10%-ը ընդունված է։",
          en: "Cards are accepted almost everywhere; keep some dirhams for souqs and abra boats. Tipping isn't required, but 10% is usual.",
          ru: "Карты принимают почти везде, наличные дирхамы пригодятся на рынках и для лодок абра. Чаевые не обязательны, принято 10%.",
          ar: "تُقبل البطاقات في كل مكان تقريبًا، واحتفظ ببعض الدراهم للأسواق وقوارب العبرة. الإكرامية غير إلزامية و10٪ أمر معتاد.",
        },
      },
      {
        title: { hy: "Եղանակ", en: "Weather", ru: "Погода", ar: "الطقس" },
        body: {
          hy: "Նոյեմբերից մարտ՝ 23–30°C և տաք ծով։ Հունիսից սեպտեմբեր շոգը հաճախ անցնում է 40°C-ից, բայց հյուրանոցներն ամենաէժանն են։",
          en: "November to March brings 23–30°C and a warm sea. June to September often tops 40°C, but hotels are at their cheapest.",
          ru: "С ноября по март — 23–30°C и тёплое море. С июня по сентябрь жара часто выше 40°C, зато отели самые дешёвые.",
          ar: "من نوفمبر إلى مارس تتراوح الحرارة بين 23 و30 درجة والبحر دافئ. ومن يونيو إلى سبتمبر تتجاوز غالبًا 40 درجة لكن الفنادق في أرخص أسعارها.",
        },
      },
    ],
    articles: [
      "armenian-citizens-visa-uae",
      "armenian-driving-licence-uae",
      "abu-dhabi-top-places",
      "dubai-first-trip-3-days",
      "dubai-where-to-eat",
      "best-time-to-visit-uae",
    ],
  },
  {
    country: "Qatar",
    tagline: {
      hy: "Թանգարաններ, շուկաներ և ծով անապատում՝ Ծոցի ամենահարմար մայրաքաղաքը։",
      en: "Museums, souqs and a sea in the desert — the Gulf's most compact capital.",
      ru: "Музеи, рынки и море посреди пустыни — самая компактная столица Залива.",
      ar: "متاحف وأسواق وبحر في قلب الصحراء: أكثر عواصم الخليج تماسكًا.",
    },
    intro: {
      hy: "Կատարը փոքր թերակղզի է, որտեղ գրեթե ամեն ինչ Դոհայում և նրա շրջակայքում է՝ համաշխարհային մակարդակի թանգարաններ, աշխույժ հին շուկա, ծովափնյա Կորնիշ, իսկ մոտ մեկ ժամ հարավ՝ ավազաթմբեր, որոնք իջնում են ուղիղ ծովը։ Հարմար է թե՛ առանձին ուղևորության, թե՛ մի քանի օրվա կանգառի համար։",
      en: "Qatar is a small peninsula where nearly everything happens in and around Doha: world-class museums, a lively old souq, the seafront Corniche and, about an hour south, dunes that run straight into the sea. It works as a trip of its own or a stopover of a few days.",
      ru: "Катар — небольшой полуостров, где почти всё происходит в Дохе и вокруг неё: музеи мирового уровня, оживлённый старый рынок, набережная Корниш, а примерно в часе езды к югу — дюны, спускающиеся прямо в море. Подходит и для отдельной поездки, и для остановки на несколько дней.",
      ar: "قطر شبه جزيرة صغيرة يدور فيها كل شيء تقريبًا في الدوحة وحولها: متاحف عالمية وسوق قديم نابض بالحياة وكورنيش على البحر، وعلى بُعد ساعة جنوبًا كثبان تنحدر مباشرة إلى البحر. تصلح رحلةً مستقلة أو توقفًا لبضعة أيام.",
    },
    facts: [
      { key: "capital", value: { hy: "Դոհա", en: "Doha", ru: "Доха", ar: "الدوحة" } },
      {
        key: "currency",
        value: { hy: "Կատարի ռիալ (QAR)", en: "Qatari riyal (QAR)", ru: "Катарский риял (QAR)", ar: "الريال القطري (QAR)" },
      },
      {
        key: "language",
        value: {
          hy: "Արաբերեն, անգլերենը լայնորեն տարածված է",
          en: "Arabic; English is widely spoken",
          ru: "Арабский, английский широко распространён",
          ar: "العربية، والإنجليزية منتشرة على نطاق واسع",
        },
      },
      {
        key: "timeZone",
        value: {
          hy: "GMT+3՝ Երևանից 1 ժամ հետ",
          en: "GMT+3 — one hour behind Yerevan",
          ru: "GMT+3 — на час меньше, чем в Ереване",
          ar: "GMT+3، أي متأخر ساعة عن يريفان",
        },
      },
      {
        key: "visa",
        value: {
          hy: "Առանց վիզայի՝ հաստատված հյուրանոցային ամրագրմամբ",
          en: "Visa-free, with a confirmed hotel booking",
          ru: "Без визы, с подтверждённой бронью отеля",
          ar: "دون تأشيرة مع حجز فندقي مؤكد",
        },
      },
    ],
    cities: [
      {
        name: "Doha",
        body: {
          hy: "Գրեթե բոլոր հյուրանոցներն ու տեսարժան վայրերը՝ Կորնիշ, Վեսթ Բեյի երկնաքերներ, Սուկ Վակիֆ, The Pearl և Լուսայիլ։",
          en: "Almost every hotel and sight: the Corniche, the West Bay towers, Souq Waqif, The Pearl and Lusail.",
          ru: "Почти все отели и достопримечательности: Корниш, небоскрёбы Вест-Бей, Сук Вакиф, The Pearl и Лусаил.",
          ar: "كل الفنادق والمعالم تقريبًا: الكورنيش وأبراج الخليج الغربي وسوق واقف واللؤلؤة ولوسيل.",
        },
      },
    ],
    highlights: [
      {
        title: { hy: "Իսլամական արվեստի թանգարան", en: "Museum of Islamic Art", ru: "Музей исламского искусства", ar: "متحف الفن الإسلامي" },
        body: {
          hy: "Ի. Մ. Փեյի նախագծած շենքը ծովի վրա և դարերի արվեստ՝ ներսում։ Այգուց բացվում է Վեսթ Բեյի լավագույն տեսարանը։",
          en: "I. M. Pei's building on the water with centuries of art inside; the park beside it has the best view of West Bay.",
          ru: "Здание И. М. Пея на воде и искусство многих веков внутри; из парка рядом — лучший вид на Вест-Бей.",
          ar: "مبنى آي. إم. بي على الماء وفن قرون في داخله، ومن الحديقة المجاورة أجمل إطلالة على الخليج الغربي.",
        },
      },
      {
        title: { hy: "Սուկ Վակիֆ", en: "Souq Waqif", ru: "Сук Вакиф", ar: "سوق واقف" },
        body: {
          hy: "Համեմունքներ, բազեներ և ուշ ընթրիքներ Դոհայի հին շուկայում։ Ամենաաշխույժն է երեկոյան։",
          en: "Spices, falcons and late dinners in Doha's old market — liveliest in the evening.",
          ru: "Специи, соколы и поздние ужины на старом рынке Дохи — оживлённее всего вечером.",
          ar: "توابل وصقور وعشاء متأخر في سوق الدوحة القديم، وهو في أوج حيويته مساءً.",
        },
      },
      {
        title: { hy: "Կատարի ազգային թանգարան", en: "National Museum of Qatar", ru: "Национальный музей Катара", ar: "متحف قطر الوطني" },
        body: {
          hy: "Անապատի վարդի տեսքով շենք, որը պատմում է երկրի անցյալը՝ մարգարիտ որսալուց մինչև այսօր։",
          en: "A building shaped like a desert rose, telling the country's story from pearl diving to today.",
          ru: "Здание в форме «розы пустыни», рассказывающее историю страны от ловли жемчуга до наших дней.",
          ar: "مبنى على شكل وردة الصحراء يروي قصة البلاد من الغوص على اللؤلؤ حتى اليوم.",
        },
      },
      {
        title: { hy: "Քաթարա", en: "Katara Cultural Village", ru: "Культурная деревня Катара", ar: "الحي الثقافي كتارا" },
        body: {
          hy: "Ամֆիթատրոն, պատկերասրահներ, լողափ և ռեստորաններ՝ մեկ թաղամասում։",
          en: "An amphitheatre, galleries, a beach and restaurants in one neighbourhood.",
          ru: "Амфитеатр, галереи, пляж и рестораны в одном квартале.",
          ar: "مسرح مدرج ومعارض وشاطئ ومطاعم في حي واحد.",
        },
      },
      {
        title: { hy: "The Pearl", en: "The Pearl", ru: "The Pearl", ar: "اللؤلؤة" },
        body: {
          hy: "Արհեստական կղզի՝ մարինա, սրճարաններ և զբոսանք ջրի երկայնքով։",
          en: "A man-made island of marinas, cafés and waterfront walks.",
          ru: "Искусственный остров с маринами, кафе и прогулками вдоль воды.",
          ar: "جزيرة اصطناعية بمراسٍ ومقاهٍ وممشى على الواجهة المائية.",
        },
      },
      {
        title: { hy: "Ներքին ծով (Խոր ալ Ադայդ)", en: "The Inland Sea (Khor Al Adaid)", ru: "Внутреннее море (Хор-эль-Удейд)", ar: "خور العديد" },
        body: {
          hy: "Ամենագնացով արշավ ավազաթմբերով դեպի այն վայրը, որտեղ անապատը հանդիպում է ծովին։",
          en: "A 4x4 trip over the dunes to where the desert meets the sea.",
          ru: "Поездка на внедорожнике по дюнам туда, где пустыня встречается с морем.",
          ar: "رحلة بسيارة دفع رباعي عبر الكثبان إلى حيث تلتقي الصحراء بالبحر.",
        },
      },
    ],
    tips: [
      {
        title: { hy: "Տեղաշարժ", en: "Getting around", ru: "Как передвигаться", ar: "التنقل" },
        body: {
          hy: "Դոհայի մետրոն ժամանակակից է և կապում է օդանավակայանը, Վեսթ Բեյը, Սուկ Վակիֆն ու Լուսայիլը։ Մնացածի համար հարմար են Karwa տաքսիները և Uber-ը։",
          en: "Doha's modern metro links the airport, West Bay, Souq Waqif and Lusail. For everything else, Karwa taxis and Uber are easy.",
          ru: "Современное метро Дохи связывает аэропорт, Вест-Бей, Сук Вакиф и Лусаил. В остальных случаях удобны такси Karwa и Uber.",
          ar: "يربط مترو الدوحة الحديث المطار والخليج الغربي وسوق واقف ولوسيل، ولغير ذلك تكون سيارات كروة وأوبر سهلة.",
        },
      },
      {
        title: { hy: "Հագուստ", en: "What to wear", ru: "Что надеть", ar: "ماذا ترتدي" },
        body: {
          hy: "Հանրային վայրերում, թանգարաններում և առևտրի կենտրոններում ծածկեք ուսերն ու ծնկները։",
          en: "Cover shoulders and knees in public places, museums and malls.",
          ru: "В общественных местах, музеях и торговых центрах закрывайте плечи и колени.",
          ar: "غطِّ الكتفين والركبتين في الأماكن العامة والمتاحف ومراكز التسوق.",
        },
      },
      {
        title: { hy: "Հյուրանոց՝ նախապես", en: "Book your hotel first", ru: "Сначала бронь отеля", ar: "احجز الفندق أولًا" },
        body: {
          hy: "Սահմանին կխնդրեն ցույց տալ հաստատված հյուրանոցային ամրագրում, ուստի ամրագրեք այն նախքան թռիչքը։",
          en: "You'll be asked for a confirmed hotel booking at the border, so book it before you fly.",
          ru: "На границе попросят подтверждённую бронь отеля, поэтому оформите её до вылета.",
          ar: "سيُطلب منك حجز فندقي مؤكد عند الوصول، فاحجزه قبل السفر.",
        },
      },
      {
        title: { hy: "Եղանակ", en: "Weather", ru: "Погода", ar: "الطقس" },
        body: {
          hy: "Լավագույն ժամանակը նոյեմբերից մարտ է։ Ամռանը շատ շոգ է, ուստի պլանավորեք փակ վայրեր և երեկոյան զբոսանքներ։",
          en: "The best time is November to March. Summers are very hot, so plan indoor sights and evening walks.",
          ru: "Лучшее время — с ноября по март. Летом очень жарко, поэтому планируйте музеи и вечерние прогулки.",
          ar: "أفضل وقت من نوفمبر إلى مارس. الصيف شديد الحرارة، فخطط لزيارة الأماكن المغلقة والتنزه مساءً.",
        },
      },
    ],
    articles: ["harabia-now-in-qatar", "armenian-citizens-visa-qatar"],
  },
  {
    country: "Oman",
    tagline: {
      hy: "Լեռներ, վադիներ և մաքուր ծով՝ Արաբիայի ամենահանգիստ անկյունը։",
      en: "Mountains, wadis and a clear sea — the calmest corner of Arabia.",
      ru: "Горы, вади и чистое море — самый спокойный уголок Аравии.",
      ar: "جبال وأودية وبحر صافٍ: أهدأ ركن في الجزيرة العربية.",
    },
    intro: {
      hy: "Օմանը Արաբական թերակղզու հարավ-արևելքում է՝ ժայռոտ լեռներ, զմրուխտե ջրերով վադիներ, հին բերդեր և երկար ծովափ։ Մասկատը ցածրահարկ, մաքուր մայրաքաղաք է՝ շուկայով, ծովափնյա Կորնիշով և մեծ մզկիթով, իսկ մի քանի ժամում կարելի է հասնել անապատ կամ լեռներ։ Հայաստանի քաղաքացիները կարող են մնալ մինչև 14 օր առանց վիզայի, և ժամային տարբերություն չկա։",
      en: "Oman sits in the south-east of the Arabian Peninsula: rugged mountains, wadis with emerald water, old forts and a long coastline. Muscat is a low-rise, spotless capital with a souq, a seafront corniche and a grand mosque, and the desert or the mountains are a few hours' drive away. Armenian citizens can stay up to 14 days without a visa, and there is no time difference.",
      ru: "Оман находится на юго-востоке Аравийского полуострова: скалистые горы, вади с изумрудной водой, старинные крепости и длинное побережье. Маскат — невысокая и очень чистая столица с рынком, набережной Корниш и большой мечетью, а до пустыни или гор — несколько часов езды. Граждане Армении могут находиться здесь до 14 дней без визы, и разницы во времени нет.",
      ar: "تقع عُمان في جنوب شرق شبه الجزيرة العربية: جبال وعرة وأودية بمياه زمردية وقلاع قديمة وساحل طويل. مسقط عاصمة منخفضة المباني ونظيفة للغاية، فيها سوق وكورنيش على البحر وجامع كبير، والصحراء أو الجبال على بُعد ساعات قليلة بالسيارة. يمكن للمواطنين الأرمن البقاء حتى 14 يومًا دون تأشيرة، ولا فرق في التوقيت.",
    },
    facts: [
      { key: "capital", value: { hy: "Մասկատ", en: "Muscat", ru: "Маскат", ar: "مسقط" } },
      {
        key: "currency",
        value: { hy: "Օմանի ռիալ (OMR)", en: "Omani rial (OMR)", ru: "Оманский риал (OMR)", ar: "الريال العُماني (OMR)" },
      },
      {
        key: "language",
        value: {
          hy: "Արաբերեն, անգլերենը լայնորեն տարածված է",
          en: "Arabic; English is widely spoken",
          ru: "Арабский, английский широко распространён",
          ar: "العربية، والإنجليزية منتشرة على نطاق واسع",
        },
      },
      {
        key: "timeZone",
        value: {
          hy: "GMT+4՝ ինչպես Երևանում",
          en: "GMT+4 — same as Yerevan",
          ru: "GMT+4 — как в Ереване",
          ar: "GMT+4، مثل توقيت يريفان",
        },
      },
      {
        key: "visa",
        value: {
          hy: "Առանց վիզայի՝ մինչև 14 օր",
          en: "Visa-free for up to 14 days",
          ru: "Без визы до 14 дней",
          ar: "دون تأشيرة حتى 14 يومًا",
        },
      },
    ],
    cities: [
      {
        name: "Muscat",
        body: {
          hy: "Հյուրանոցների մեծ մասը և գլխավոր տեսարժան վայրերը՝ Մաթրահի Կորնիշն ու շուկան, Սուլթան Քաբուսի մեծ մզկիթը, Թագավորական օպերան և Կուրումի լողափերը։",
          en: "Most hotels and the main sights: the Mutrah Corniche and souq, the Sultan Qaboos Grand Mosque, the Royal Opera House and the Qurum beaches.",
          ru: "Большинство отелей и главные достопримечательности: набережная и рынок Матраха, Большая мечеть султана Кабуса, Королевский оперный театр и пляжи Курума.",
          ar: "معظم الفنادق وأبرز المعالم: كورنيش مطرح وسوقه، وجامع السلطان قابوس الأكبر، ودار الأوبرا السلطانية، وشواطئ القرم.",
        },
      },
    ],
    highlights: [
      {
        title: { hy: "Սուլթան Քաբուսի մեծ մզկիթ", en: "Sultan Qaboos Grand Mosque", ru: "Большая мечеть султана Кабуса", ar: "جامع السلطان قابوس الأكبر" },
        body: {
          hy: "Սպիտակ մարմար, հսկայական գորգ և ջահեր։ Այցելուների համար բաց է առավոտյան, բացի ուրբաթից։",
          en: "White marble, a vast hand-woven carpet and chandeliers. Open to visitors in the morning, except on Fridays.",
          ru: "Белый мрамор, огромный ковёр ручной работы и люстры. Открыта для посетителей по утрам, кроме пятницы.",
          ar: "رخام أبيض وسجادة يدوية ضخمة وثريات. مفتوح للزوار صباحًا عدا يوم الجمعة.",
        },
      },
      {
        title: { hy: "Մաթրահի շուկա և Կորնիշ", en: "Mutrah Souq and Corniche", ru: "Рынок и набережная Матраха", ar: "سوق مطرح والكورنيش" },
        body: {
          hy: "Կնդրուկ, արծաթ և համեմունքներ հին շուկայում, ապա զբոսանք ծովափով՝ մայրամուտին։",
          en: "Frankincense, silver and spices in the old souq, then a walk along the seafront at sunset.",
          ru: "Ладан, серебро и специи на старом рынке, а затем прогулка вдоль моря на закате.",
          ar: "لبان وفضة وتوابل في السوق القديم، ثم نزهة على الواجهة البحرية وقت الغروب.",
        },
      },
      {
        title: { hy: "Թագավորական օպերա", en: "Royal Opera House Muscat", ru: "Королевский оперный театр", ar: "دار الأوبرا السلطانية مسقط" },
        body: {
          hy: "Օմանյան ճարտարապետություն և համաշխարհային բեմ՝ օպերա, բալետ և համերգներ։",
          en: "Omani architecture and a world-class stage for opera, ballet and concerts.",
          ru: "Оманская архитектура и сцена мирового уровня: опера, балет и концерты.",
          ar: "عمارة عُمانية ومسرح عالمي للأوبرا والباليه والحفلات.",
        },
      },
      {
        title: { hy: "Վադի Շաբ", en: "Wadi Shab", ru: "Вади Шаб", ar: "وادي شاب" },
        body: {
          hy: "Զբոսանք կիրճով և լող զմրուխտե լճակներում՝ մինչև քարանձավ՝ ջրվեժով։ Մասկատից մոտ երկու ժամ։",
          en: "A hike through a gorge and a swim through emerald pools to a cave with a waterfall — about two hours from Muscat.",
          ru: "Прогулка по ущелью и заплыв по изумрудным заводям к пещере с водопадом — около двух часов от Маската.",
          ar: "مشي عبر وادٍ وسباحة في برك زمردية حتى كهف فيه شلال، على بُعد نحو ساعتين من مسقط.",
        },
      },
      {
        title: { hy: "Նիզվա", en: "Nizwa", ru: "Низва", ar: "نزوى" },
        body: {
          hy: "Պատմական մայրաքաղաք՝ կլոր աշտարակով բերդով և ուրբաթ առավոտյան անասունների շուկայով։",
          en: "The old capital, with a round-towered fort and a Friday-morning livestock market.",
          ru: "Старая столица с крепостью с круглой башней и пятничным утренним рынком скота.",
          ar: "العاصمة القديمة بقلعتها ذات البرج الدائري وسوق المواشي صباح الجمعة.",
        },
      },
      {
        title: { hy: "Վահիբա ավազուտներ", en: "Wahiba Sands", ru: "Пески Вахиба", ar: "رمال الشرقية (وهيبة)" },
        body: {
          hy: "Բարձր ավազաթմբեր, գիշեր անապատային ճամբարում և աստղազարդ երկինք։",
          en: "Tall dunes, a night in a desert camp and a sky full of stars.",
          ru: "Высокие дюны, ночь в пустынном лагере и звёздное небо.",
          ar: "كثبان عالية وليلة في مخيم صحراوي وسماء مليئة بالنجوم.",
        },
      },
    ],
    tips: [
      {
        title: { hy: "Տեղաշարժ", en: "Getting around", ru: "Как передвигаться", ar: "التنقل" },
        body: {
          hy: "Մետրո չկա։ Մասկատում հարմար են տաքսիները և հավելվածներով տաքսին, իսկ քաղաքից դուրս լավագույնը վարորդով մեքենան կամ վարձակալությունն է՝ ճանապարհները լավն են։",
          en: "There's no metro. Taxis and ride-hailing apps work in Muscat; beyond the city a car with a driver or a rental is best — the roads are good.",
          ru: "Метро нет. В Маскате удобны такси и приложения для вызова машины, а за городом лучше всего машина с водителем или аренда — дороги хорошие.",
          ar: "لا يوجد مترو. في مسقط تكفي سيارات الأجرة وتطبيقات النقل، وخارج المدينة الأفضل سيارة بسائق أو سيارة مستأجرة، فالطرق جيدة.",
        },
      },
      {
        title: { hy: "Հագուստ", en: "What to wear", ru: "Что надеть", ar: "ماذا ترتدي" },
        body: {
          hy: "Հանրային վայրերում ծածկեք ուսերն ու ծնկները։ Մզկիթում կանայք պետք է ծածկեն նաև մազերը։",
          en: "Cover shoulders and knees in public places. Women also cover their hair in the mosque.",
          ru: "В общественных местах закрывайте плечи и колени. В мечети женщинам нужно покрыть и волосы.",
          ar: "غطِّ الكتفين والركبتين في الأماكن العامة، وتغطي النساء شعرهن أيضًا في المسجد.",
        },
      },
      {
        title: { hy: "Փաստաթղթեր", en: "Documents", ru: "Документы", ar: "المستندات" },
        body: {
          hy: "Սահմանին կխնդրեն հյուրանոցային ամրագրում, բժշկական ապահովագրություն և հետադարձ տոմս, ուստի պատրաստեք դրանք նախքան թռիչքը։",
          en: "At the border you'll be asked for a hotel booking, health insurance and a return ticket, so have them ready before you fly.",
          ru: "На границе попросят бронь отеля, медицинскую страховку и обратный билет, поэтому подготовьте их до вылета.",
          ar: "سيُطلب منك عند الوصول حجز فندقي وتأمين صحي وتذكرة عودة، فجهّزها قبل السفر.",
        },
      },
      {
        title: { hy: "Եղանակ", en: "Weather", ru: "Погода", ar: "الطقس" },
        body: {
          hy: "Լավագույն ժամանակը հոկտեմբերից ապրիլ է։ Ամռանը Մասկատում շատ շոգ է։",
          en: "The best time is October to April. Summers in Muscat are very hot.",
          ru: "Лучшее время — с октября по апрель. Летом в Маскате очень жарко.",
          ar: "أفضل وقت من أكتوبر إلى أبريل، والصيف في مسقط شديد الحرارة.",
        },
      },
    ],
    articles: ["armenian-citizens-visa-oman"],
  },
];

export const getDestination = (country: Country) => destinations.find((d) => d.country === country);

// Destinations with a page: live countries that have a guide, in COUNTRIES order.
export const liveDestinations = LIVE_COUNTRIES.flatMap((c) => {
  const destination = getDestination(c.name);
  return destination ? [{ ...destination, slug: c.slug }] : [];
});
