import type { QatarEvent } from "./types";

// The wide banner (2048×576) behind the blog card and the page hero.
export const qatarEventsBanner = {
  day: "/images/qatar-events/qatar-events-calendar.png",
  night: "/images/qatar-events/qatar-events-calendar-night.png",
};

// public/images/qatar-events/cards/<slug>.png and <slug>-night.png (1536×864).
const picture = (slug: string) => ({
  day: `/images/qatar-events/cards/${slug}.png`,
  night: `/images/qatar-events/cards/${slug}-night.png`,
});

// Cultural events in Qatar in 2027, as listed in September 2026 — only part
// of the year's calendar is confirmed so far. Exhibitions running on from
// 2026 come first, then the rest in date order. Each has a picture.
export const qatarEvents: QatarEvent[] = [
  {
    slug: "design-doha-biennale",
    image: picture("design-doha-biennale"),
    to: "2027-01-31",
    title: { hy: "Design Doha Biennale 2026", en: "Design Doha Biennale 2026", ru: "Биеннале Design Doha 2026", ar: "بينالي تصميم الدوحة 2026" },
    place: { hy: "Դոհայի մի քանի վայրեր", en: "Multiple Doha venues", ru: "Несколько площадок Дохи", ar: "مواقع متعددة في الدوحة" },
    details: {
      hy: "Արաբական աշխարհի ժամանակակից դիզայնի բիենալեն՝ կահույք, առարկաներ, լուսավորություն և նորաձևություն Դոհայի թանգարաններում և դիզայնի թաղամասում։ Այստեղ կտեսնեք տարածաշրջանի երիտասարդ դիզայներների և հայտնի ստուդիաների աշխատանքները։ Լավ առիթ է ձմեռային Դոհայում մի քանի ցուցահանդես մեկ օրում տեսնելու համար։",
      en: "The biennale of contemporary design from the Arab world: furniture, objects, lighting and fashion shown in Doha’s museums and design district. It brings together young designers from the region and established studios. A good reason to see several exhibitions in one day during Doha’s mild winter.",
      ru: "Биеннале современного дизайна арабского мира: мебель, предметы, свет и мода в музеях и дизайн-квартале Дохи. Здесь показывают молодых дизайнеров региона и известные студии. Хороший повод посмотреть несколько выставок за один день мягкой дохийской зимой.",
      ar: "بينالي التصميم المعاصر من العالم العربي: أثاث وقطع وإضاءة وأزياء تُعرض في متاحف الدوحة وحي التصميم. يجمع مصممين شبابًا من المنطقة واستوديوهات معروفة. فرصة جيدة لزيارة عدة معارض في يوم واحد خلال شتاء الدوحة المعتدل.",
    },
  },
  {
    slug: "boats-floating-afar",
    image: picture("boats-floating-afar"),
    to: "2027-01-31",
    title: { hy: "Boats Floating Afar", en: "Boats Floating Afar", ru: "Boats Floating Afar", ar: "قوارب تطفو بعيدًا" },
    place: { hy: "Կատարի ազգային թանգարան", en: "National Museum of Qatar", ru: "Национальный музей Катара", ar: "متحف قطر الوطني" },
    details: {
      hy: "Ցուցահանդես Կատարի ազգային թանգարանում նավակների և ծովային ճանապարհորդությունների մասին, որոնք դարեր շարունակ Կատարը կապել են աշխարհին՝ առևտուր, մարգարտի որս և ձկնորսություն։ Թանգարանի շենքն ինքնին՝ «անապատային վարդի» ձևով, արժե տեսնել։",
      en: "An exhibition at the National Museum of Qatar on boats and the sea voyages that linked Qatar to the wider world for centuries — trade, pearl diving and fishing. The museum’s desert-rose building is worth the visit on its own.",
      ru: "Выставка в Национальном музее Катара о лодках и морских путешествиях, веками связывавших Катар с миром, — торговле, добыче жемчуга и рыболовстве. Само здание музея в форме «розы пустыни» стоит того, чтобы его увидеть.",
      ar: "معرض في متحف قطر الوطني عن القوارب والرحلات البحرية التي ربطت قطر بالعالم لقرون — التجارة والغوص على اللؤلؤ والصيد. ومبنى المتحف على شكل وردة الصحراء يستحق الزيارة بحد ذاته.",
    },
  },
  {
    slug: "what-lingers-in-the-artists-mind",
    image: picture("what-lingers-in-the-artists-mind"),
    to: "2027-02-06",
    title: {
      hy: "What Lingers in the Artist’s Mind",
      en: "What Lingers in the Artist’s Mind",
      ru: "What Lingers in the Artist’s Mind",
      ar: "ما يبقى في ذهن الفنان",
    },
    place: { hy: "Մաթհաֆ", en: "Mathaf", ru: "Матхаф", ar: "متحف: المتحف العربي للفن الحديث" },
    details: {
      hy: "Արաբական ժամանակակից և արդի արվեստ Մաթհաֆում՝ Արաբական ժամանակակից արվեստի թանգարանում, Կրթական քաղաքում։ Ցուցահանդեսը ներկայացնում է, թե ինչպես են արվեստագետները պահում հիշողությունն ու փորձառությունը իրենց աշխատանքներում։ Հանգիստ վայր է քաղաքի աղմուկից հեռու մի քանի ժամ անցկացնելու համար։",
      en: "Modern and contemporary Arab art at Mathaf, the Arab Museum of Modern Art in Education City. The exhibition looks at how artists carry memory and experience into their work. A quiet place to spend a few hours away from the city’s bustle.",
      ru: "Модерн и современное арабское искусство в Матхафе — Арабском музее современного искусства в Образовательном городе. Выставка о том, как художники переносят память и опыт в свои работы. Спокойное место, чтобы провести пару часов вдали от городской суеты.",
      ar: "فن عربي حديث ومعاصر في متحف: المتحف العربي للفن الحديث في المدينة التعليمية. يتناول المعرض كيف يحمل الفنانون الذاكرة والتجربة إلى أعمالهم. مكان هادئ لقضاء بضع ساعات بعيدًا عن صخب المدينة.",
    },
  },
  {
    slug: "giuseppe-penone",
    image: picture("giuseppe-penone"),
    to: "2027-02-13",
    title: {
      hy: "Ջուզեպպե Պենոնե. The Inner Flow of Life",
      en: "Giuseppe Penone: The Inner Flow of Life",
      ru: "Джузеппе Пеноне: The Inner Flow of Life",
      ar: "جوزيبي بينوني: التدفق الداخلي للحياة",
    },
    place: { hy: "Կատարի ազգային թանգարան", en: "National Museum of Qatar", ru: "Национальный музей Катара", ar: "متحف قطر الوطني" },
    details: {
      hy: "Իտալացի քանդակագործ Ջուզեպպե Պենոնեի՝ «Arte Povera» շարժման հայտնի ներկայացուցչի աշխատանքները ծառերից, փայտից, քարից և բրոնզից։ Ցուցահանդեսը մարդու և բնության կապի մասին է, թե ինչպես են նրանք աճում միմյանց մեջ։ Այն անցկացվում է Կատարի ազգային թանգարանում։",
      en: "Works in trees, wood, stone and bronze by Giuseppe Penone, the Italian sculptor known for the Arte Povera movement. The show is about people and nature and how they grow into each other. It is held at the National Museum of Qatar.",
      ru: "Работы из деревьев, дерева, камня и бронзы Джузеппе Пеноне — итальянского скульптора, известного по движению арте повера. Выставка о человеке и природе и о том, как они прорастают друг в друга. Проходит в Национальном музее Катара.",
      ar: "أعمال من الأشجار والخشب والحجر والبرونز للنحات الإيطالي جوزيبي بينوني، أحد أبرز فناني حركة الفن الفقير. يتناول المعرض علاقة الإنسان بالطبيعة وتداخلهما. يُقام في متحف قطر الوطني.",
    },
  },
  {
    slug: "rubaiya-qatar",
    image: picture("rubaiya-qatar"),
    to: "2027-04-30",
    featured: true,
    title: { hy: "Rubaiya Qatar", en: "Rubaiya Qatar", ru: "Rubaiya Qatar", ar: "رباعية قطر" },
    place: { hy: "Կատարի մի քանի վայրեր", en: "Multiple Qatar venues", ru: "Площадки по всему Катару", ar: "مواقع متعددة في قطر" },
    details: {
      hy: "Qatar Museums-ի ժամանակակից արվեստի քառամյա ցուցադրությունը՝ ինստալյացիաներ, հանրային արվեստ և ցուցահանդեսներ թանգարաններում, հրապարակներում և անապատում։ Աշխատանքների մեծ մասը կարելի է տեսնել անվճար՝ քաղաքում զբոսնելիս։ Այն շարունակվում է մինչև ապրիլի վերջ, ուստի հարմար է ցանկացած ձմեռային կամ գարնանային ճամփորդության համար։",
      en: "Qatar Museums’ quadrennial of contemporary art: installations, public art and exhibitions in museums, squares and out in the desert. Much of it can be seen for free as you explore the city. It runs until the end of April, so it fits any winter or spring trip.",
      ru: "Квадриеннале современного искусства от Qatar Museums: инсталляции, паблик-арт и выставки в музеях, на площадях и в пустыне. Многое можно увидеть бесплатно, просто гуляя по городу. Она идёт до конца апреля, так что подойдёт для любой зимней или весенней поездки.",
      ar: "رباعية الفن المعاصر من متاحف قطر: أعمال تركيبية وفن عام ومعارض في المتاحف والساحات وفي الصحراء. يمكن رؤية الكثير منها مجانًا أثناء التجول في المدينة. تستمر حتى نهاية أبريل، فتناسب أي رحلة في الشتاء أو الربيع.",
    },
  },
  {
    slug: "wooden-doors-of-qatar",
    image: picture("wooden-doors-of-qatar"),
    to: "2027-05-29",
    title: { hy: "Կատարի փայտե դռները", en: "Wooden Doors of Qatar", ru: "Деревянные двери Катара", ar: "الأبواب الخشبية في قطر" },
    place: { hy: "Ֆահադ բին Ալիի պալատ", en: "Fahad Bin Ali Palace", ru: "Дворец Фахада бин Али", ar: "قصر فهد بن علي" },
    details: {
      hy: "Հին կատարյան տների փորագրված փայտե դռներ և դրանց ետևում կանգնած արհեստը՝ զարդանախշեր, նյութեր և պատմություններ։ Ցուցահանդեսն անցկացվում է Ֆահադ բին Ալիի վերականգնված պալատում՝ ավանդական ճարտարապետության գեղեցիկ օրինակ։ Այն բաց է մինչև մայիսի վերջ։",
      en: "Carved wooden doors from old Qatari houses and the craft behind them — patterns, materials and the stories of the families who lived there. The exhibition is held in the restored Fahad Bin Ali Palace, itself a fine example of traditional architecture. It is open until the end of May.",
      ru: "Резные деревянные двери старых катарских домов и ремесло, которое их создало, — узоры, материалы и истории семей, живших за ними. Выставка проходит в отреставрированном дворце Фахада бин Али, красивом примере традиционной архитектуры. Открыта до конца мая.",
      ar: "أبواب خشبية منحوتة من البيوت القطرية القديمة والحرفة التي صنعتها — الزخارف والمواد وحكايات العائلات التي سكنتها. يُقام المعرض في قصر فهد بن علي المرمم، وهو مثال جميل على العمارة التقليدية. يستمر حتى نهاية مايو.",
    },
  },
  {
    slug: "qatar-international-food-festival",
    image: picture("qatar-international-food-festival"),
    from: "2027-01-13",
    to: "2027-01-23",
    featured: true,
    title: {
      hy: "Կատարի միջազգային սննդի փառատոն",
      en: "Qatar International Food Festival",
      ru: "Международный гастрономический фестиваль Катара",
      ar: "مهرجان قطر الدولي للأغذية",
    },
    place: { hy: "Լուսայլ մարզադաշտի տարածք", en: "Lusail Stadium Precinct", ru: "Территория стадиона «Лусаил»", ar: "محيط استاد لوسيل" },
    details: {
      hy: "Երկրի ամենամեծ սննդի փառատոնը՝ փողոցային սննդի տաղավարներ, շեֆ-խոհարարների շոուներ, երաժշտություն և զվարճանք ողջ ընտանիքի համար։ Այն անցկացվում է Լուսայլ մարզադաշտի շուրջ, որտեղ անցել է 2022-ի աշխարհի գավաթի եզրափակիչը։ Երեկոյան գնալն ավելի հաճելի է՝ զով եղանակ և լույսեր։",
      en: "The country’s biggest food festival: street-food stalls, chefs’ shows, music and entertainment for the whole family. It takes over the grounds of Lusail Stadium, where the 2022 World Cup final was played. Go in the evening for cooler air and the lights.",
      ru: "Крупнейший гастрономический фестиваль страны: стрит-фуд, шоу шеф-поваров, музыка и развлечения для всей семьи. Он проходит вокруг стадиона «Лусаил», где сыграли финал чемпионата мира 2022 года. Лучше идти вечером — прохладнее и красиво подсвечено.",
      ar: "أكبر مهرجان للطعام في البلاد: أكشاك طعام الشارع وعروض الطهاة والموسيقى والترفيه للعائلة كلها. يُقام في محيط استاد لوسيل الذي احتضن نهائي كأس العالم 2022. الأجمل زيارته مساءً مع النسيم والأضواء.",
    },
  },
  {
    slug: "afro-asia-cultural-programme",
    image: picture("afro-asia-cultural-programme"),
    from: "2027-01-26",
    to: "2027-01-26",
    title: { hy: "Աֆրո-ասիական մշակութային ծրագիր", en: "Afro-Asia Cultural Programme", ru: "Афро-азиатская культурная программа", ar: "البرنامج الثقافي الأفرو-آسيوي" },
    place: { hy: "Դոհա", en: "Doha", ru: "Доха", ar: "الدوحة" },
    details: {
      hy: "Երաժշտություն, պար և արվեստ Աֆրիկայից և Ասիայից՝ մեկ օրում, Դոհայում։ Ծրագիրը ցույց է տալիս երկու մայրցամաքների մշակույթները, որոնք մոտ են Ծոցին։ Հարմար է, եթե հունվարի վերջին արդեն Դոհայում եք Art Basel Qatar-ի համար։",
      en: "Music, dance and art from Africa and Asia in a single day in Doha. The programme celebrates the cultures of two continents with close ties to the Gulf. Handy if you are already in Doha in late January for Art Basel Qatar.",
      ru: "Музыка, танец и искусство Африки и Азии за один день в Дохе. Программа посвящена культурам двух континентов, тесно связанных с Заливом. Удобно, если в конце января вы уже в Дохе ради Art Basel Qatar.",
      ar: "موسيقى ورقص وفنون من أفريقيا وآسيا في يوم واحد في الدوحة. يحتفي البرنامج بثقافات قارتين تربطهما صلات وثيقة بالخليج. مناسب إذا كنت في الدوحة أواخر يناير لحضور آرت بازل قطر.",
    },
  },
  {
    slug: "art-basel-qatar-2027",
    image: picture("art-basel-qatar-2027"),
    from: "2027-01-28",
    to: "2027-01-30",
    featured: true,
    title: { hy: "Art Basel Qatar 2027", en: "Art Basel Qatar 2027", ru: "Art Basel Qatar 2027", ar: "آرт بازل قطر 2027" },
    place: { hy: "M7 և Դոհայի դիզայնի թաղամաս", en: "M7 and Doha Design District", ru: "M7 и Doha Design District", ar: "إم 7 وحي الدوحة للتصميم" },
    details: {
      hy: "Art Basel ցուցահանդեսը Դոհայում՝ աշխարհի առաջատար պատկերասրահներով, նոր աշխատանքներով և հանդիպումներով արվեստագետների հետ։ Այն անցկացվում է M7-ում և Դոհայի դիզայնի թաղամասում՝ Մշեյրեբում, իսկ նախադիտման օրերն են հունվարի 26–27-ը։ Հյուրանոցները այս օրերին արագ են լցվում, ուստի ավելի լավ է նախօրոք ամրագրել։",
      en: "The Art Basel fair in Doha, with leading galleries from around the world, new work and talks with artists. It is held at M7 and the Doha Design District in Msheireb, with preview days on 26–27 January. Hotels fill up quickly that week, so book early.",
      ru: "Ярмарка Art Basel в Дохе: ведущие галереи мира, новые работы и встречи с художниками. Проходит в M7 и Doha Design District в районе Мушейреб, превью-дни — 26–27 января. Отели в эту неделю быстро заполняются, так что бронируйте заранее.",
      ar: "معرض آرت بازل في الدوحة بمشاركة كبرى صالات العرض في العالم وأعمال جديدة ولقاءات مع الفنانين. يُقام في إم 7 وحي الدوحة للتصميم في مشيرب، وأيام المعاينة في 26–27 يناير. تمتلئ الفنادق بسرعة في ذلك الأسبوع، لذا احجز مبكرًا.",
    },
  },
  {
    slug: "qumra-2027",
    image: picture("qumra-2027"),
    from: "2027-03-27",
    title: { hy: "Qumra 2027", en: "Qumra 2027", ru: "Qumra 2027", ar: "قمرة 2027" },
    place: { hy: "Դոհայի կինոինստիտուտ", en: "Doha Film Institute", ru: "Институт кино Дохи", ar: "مؤسسة الدوحة للأفلام" },
    details: {
      hy: "Դոհայի կինոինստիտուտի կինոգործիչների ամենամյա հանդիպումը՝ վարպետության դասեր աշխարհահռչակ ռեժիսորների հետ, ցուցադրություններ և նոր ֆիլմերի նախագծեր։ Հանրային ցուցադրությունները կինոսերների համար լավ առիթ են տարածաշրջանի նոր կինոն տեսնելու։",
      en: "The Doha Film Institute’s yearly gathering of filmmakers: masterclasses with renowned directors, screenings and new film projects from the region. The public screenings are a good chance for film lovers to catch new cinema from the Arab world.",
      ru: "Ежегодная встреча кинематографистов Института кино Дохи: мастер-классы известных режиссёров, показы и новые проекты региона. Открытые показы — хороший шанс для киноманов увидеть новое кино арабского мира.",
      ar: "الملتقى السنوي لصنّاع الأفلام من مؤسسة الدوحة للأفلام: دروس متقدمة مع مخرجين بارزين وعروض ومشاريع أفلام جديدة من المنطقة. العروض العامة فرصة جيدة لعشاق السينما لمشاهدة جديد السينما العربية.",
    },
  },
  {
    slug: "doha-international-book-fair",
    image: picture("doha-international-book-fair"),
    from: "2027-05-07",
    to: "2027-05-16",
    expected: true,
    featured: true,
    title: { hy: "Դոհայի միջազգային գրքի տոնավաճառ", en: "Doha International Book Fair", ru: "Международная книжная ярмарка Дохи", ar: "معرض الدوحة الدولي للكتاب" },
    place: { hy: "DECC", en: "DECC", ru: "DECC", ar: "مركز الدوحة للمعارض والمؤتمرات" },
    details: {
      hy: "Տարածաշրջանի խոշորագույն գրքի տոնավաճառներից մեկը՝ հրատարակիչներ ամբողջ արաբական աշխարհից և այլ երկրներից, հեղինակների հետ հանդիպումներ և միջոցառումներ երեխաների համար։ Այն անցկացվում է Դոհայի ցուցահանդեսների և համաժողովների կենտրոնում (DECC)։ Ամսաթվերը դեռ պետք է հաստատի նախարարությունը։",
      en: "One of the region’s largest book fairs, with publishers from across the Arab world and beyond, author talks and events for children. It is held at the Doha Exhibition and Convention Center (DECC). The dates are still to be confirmed by the Ministry.",
      ru: "Одна из крупнейших книжных ярмарок региона: издательства со всего арабского мира и не только, встречи с авторами и программа для детей. Проходит в Выставочном и конференц-центре Дохи (DECC). Даты ещё должно подтвердить министерство.",
      ar: "من أكبر معارض الكتاب في المنطقة، بمشاركة دور نشر من أنحاء العالم العربي وخارجه، ولقاءات مع المؤلفين وفعاليات للأطفال. يُقام في مركز الدوحة للمعارض والمؤتمرات. ما زالت المواعيد بانتظار تأكيد الوزارة.",
    },
  },
  {
    slug: "qatar-egypt-year-of-culture",
    image: picture("qatar-egypt-year-of-culture"),
    featured: true,
    title: { hy: "Կատար–Եգիպտոս մշակույթի տարի", en: "Qatar–Egypt Year of Culture", ru: "Год культуры Катар — Египет", ar: "العام الثقافي قطر–مصر" },
    place: { hy: "Կատար և Եգիպտոս", en: "Qatar and Egypt", ru: "Катар и Египет", ar: "قطر ومصر" },
    details: {
      hy: "Qatar Museums-ի մշակույթի տարիները ամեն տարի մեկ երկիր են բերում Կատար։ 2027-ին դա Եգիպտոսն է՝ ցուցահանդեսներ, գրականություն, երաժշտություն, թատրոն և ներկայացումներ երկու երկրներում։ Առանձին միջոցառումների ամսաթվերը դեռ կհայտարարվեն, և մենք դրանք կավելացնենք այստեղ։",
      en: "Qatar’s Years of Culture bring one country to Qatar each year; in 2027 it is Egypt. Expect exhibitions, literature, music, theatre and performances in both countries. Dates of the individual events are still to be announced — we’ll add them here.",
      ru: "Годы культуры каждый год привозят в Катар одну страну — в 2027 году это Египет. Ждите выставок, литературы, музыки, театра и выступлений в обеих странах. Даты отдельных событий ещё объявят — мы добавим их сюда.",
      ar: "تجلب الأعوام الثقافية إلى قطر كل سنة بلدًا واحدًا، وفي 2027 هو مصر. تتضمن معارض وأدبًا وموسيقى ومسرحًا وعروضًا في البلدين. ستُعلن مواعيد الفعاليات لاحقًا وسنضيفها هنا.",
    },
  },
  {
    slug: "qatar-national-day-2027",
    image: picture("qatar-national-day-2027"),
    from: "2027-12-18",
    to: "2027-12-18",
    featured: true,
    title: { hy: "Կատարի ազգային օր", en: "Qatar National Day", ru: "Национальный день Катара", ar: "اليوم الوطني لقطر" },
    place: { hy: "Ամբողջ Կատարում", en: "Across Qatar", ru: "По всему Катару", ar: "في أنحاء قطر" },
    details: {
      hy: "Կատարի ազգային օրը՝ դեկտեմբերի 18-ին, շքերթներ, հրավառություն և տոնակատարություններ Կորնիշում և ամբողջ երկրում։ Դրանից առաջ՝ դեկտեմբերին, Դարբ Ալ Սաայում անցկացվում են ավանդական խաղեր, շուկաներ և ներկայացումներ։ Դեկտեմբերը նաև Դոհա այցելելու լավագույն եղանակն է։",
      en: "Qatar’s National Day on 18 December, with parades, fireworks and celebrations on the Corniche and across the country. In the weeks before, Darb Al Saai hosts traditional games, markets and shows. December is also one of the best months for weather in Doha.",
      ru: "Национальный день Катара 18 декабря: парады, фейерверки и праздник на Корнише и по всей стране. В предшествующие недели в Дарб-эль-Саи проходят традиционные игры, рынки и представления. Декабрь — ещё и один из лучших по погоде месяцев в Дохе.",
      ar: "اليوم الوطني لقطر في 18 ديسمبر، مع استعراضات وألعاب نارية واحتفالات على الكورنيش وفي أنحاء البلاد. وفي الأسابيع السابقة يستضيف درب الساعي ألعابًا تراثية وأسواقًا وعروضًا. كما أن ديسمبر من أجمل شهور السنة طقسًا في الدوحة.",
    },
  },
];
