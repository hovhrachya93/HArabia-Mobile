import type { Article } from "./types";

// Blog posts: travel guides and HArabia news, newest first. Visa and driving
// rules change — re-check the linked sources before re-publishing those posts.
export const articles: Article[] = [
  {
    slug: "armenian-citizens-visa-oman",
    kind: "guide",
    publishedAt: "2026-09-26",
    country: "Oman",
    readMinutes: 2,
    title: {
      hy: "Պե՞տք է արդյոք վիզա Օման մեկնելու համար Հայաստանի քաղաքացիներին",
      en: "Do Armenian citizens need a visa for Oman?",
      ru: "Нужна ли гражданам Армении виза в Оман?",
      ar: "هل يحتاج المواطنون الأرمن إلى تأشيرة لدخول عُمان؟",
    },
    titleHighlight: { hy: "վիզա Օման", en: "visa for Oman", ru: "виза в Оман", ar: "تأشيرة لدخول عُمان" },
    excerpt: {
      hy: "Ոչ, եթե մեկնում եք մինչև 14 օրով։ Սակայն սահմանին կպահանջեն հյուրանոցային ամրագրում, բժշկական ապահովագրություն և հետադարձ տոմս։",
      en: "Not for a stay of up to 14 days. But at the border you'll need a hotel booking, health insurance and a return ticket.",
      ru: "Нет, если поездка не дольше 14 дней. Но на границе понадобятся бронь отеля, медицинская страховка и обратный билет.",
      ar: "لا، إذا كانت الإقامة 14 يومًا أو أقل. لكن عند الوصول ستحتاج إلى حجز فندقي وتأمين صحي وتذكرة عودة.",
    },
    cover: {
      day: "/images/blog/armenian-citizens-visa-oman.jpg",
      night: "/images/blog/armenian-citizens-visa-oman-night.jpg",
      alt: {
        hy: "Հայաստանի և Օմանի դրոշները, հայկական անձնագիր, Մասկատի մզկիթը, լեռներն ու նավահանգիստը",
        en: "The flags of Armenia and Oman with an Armenian passport, Muscat's mosque, mountains and harbour",
        ru: "Флаги Армении и Омана, армянский паспорт, мечеть, горы и гавань Маската",
        ar: "علما أرمينيا وعُمان مع جواز سفر أرميني ومسجد مسقط وجبالها ومرفئها",
      },
    },
    sections: [
      {
        heading: { hy: "Օման՝ 14 օր առանց վիզայի", en: "Oman: 14 days without a visa", ru: "Оман: 14 дней без визы", ar: "عُمان: 14 يومًا دون تأشيرة" },
        body: {
          hy: "Հայաստանը Օմանի առանց վիզայի մուտքի ցանկի առաջին խմբում է՝ Հայաստանի քաղաքացիները կարող են մնալ մինչև 14 օր՝ առանց վիզայի և վճարի։ Այս ժամկետը հնարավոր չէ երկարաձգել կամ փոխել այլ տեսակի վիզայի։",
          en: "Armenia is in the first group of Oman's visa-exemption list: Armenian citizens can stay up to 14 days without a visa or fee. This period can't be extended or converted into another type of visa.",
          ru: "Армения входит в первую группу списка безвизовых стран Омана: граждане Армении могут находиться в стране до 14 дней без визы и сборов. Этот срок нельзя продлить или сменить на визу другого типа.",
          ar: "أرمينيا ضمن المجموعة الأولى في قائمة الإعفاء من التأشيرة في عُمان، إذ يمكن للمواطنين الأرمن البقاء حتى 14 يومًا دون تأشيرة أو رسوم. ولا يمكن تمديد هذه المدة أو تحويلها إلى نوع آخر من التأشيرات.",
        },
      },
      {
        heading: { hy: "Ինչ են ստուգում սահմանին", en: "What they check at the border", ru: "Что проверяют на границе", ar: "ما الذي يُفحص عند الوصول" },
        body: {
          hy: "Առնվազն 6 ամիս վավեր անձնագիր, հետադարձ տոմս, հաստատված հյուրանոցային ամրագրում, բժշկական ապահովագրություն և մնալու ընթացքում ծախսերը հոգալու բավարար գումար։ Ավիաընկերությունները հաճախ ստուգում են դրանք դեռ Երևանում՝ գրանցման ժամանակ, ուստի պահեք դրանք հեռախոսում կամ տպված։",
          en: "A passport valid for at least 6 months, a return ticket, a confirmed hotel booking, health insurance and enough money to cover your stay. Airlines often check these at check-in in Yerevan, so keep them on your phone or printed.",
          ru: "Паспорт, действительный не менее 6 месяцев, обратный билет, подтверждённая бронь отеля, медицинская страховка и достаточная сумма денег на время поездки. Авиакомпании часто проверяют их ещё на регистрации в Ереване, поэтому держите их в телефоне или распечатанными.",
          ar: "جواز سفر صالح لستة أشهر على الأقل، وتذكرة عودة، وحجز فندقي مؤكد، وتأمين صحي، ومبلغ مالي كافٍ لتغطية الإقامة. كثيرًا ما تتحقق شركات الطيران منها عند تسجيل الوصول في يريفان، فاحتفظ بها على هاتفك أو مطبوعة.",
        },
      },
      {
        heading: { hy: "Եթե ցանկանում եք մնալ ավելի երկար", en: "Staying longer than 14 days", ru: "Если нужно больше 14 дней", ar: "إذا أردت البقاء أكثر من 14 يومًا" },
        body: {
          hy: "14 օրից ավելի մնալու համար նախապես դիմեք էլեկտրոնային վիզայի Օմանի թագավորական ոստիկանության կայքում (evisa.rop.gov.om) և մեկնելուց առաջ այնտեղ ճշտեք պայմանները։",
          en: "For a longer stay, apply for an e-visa in advance on the Royal Oman Police website (evisa.rop.gov.om), and check the conditions there before you fly.",
          ru: "Для более долгой поездки заранее оформите электронную визу на сайте Королевской полиции Омана (evisa.rop.gov.om) и уточните условия там до вылета.",
          ar: "للإقامة الأطول، قدّم مسبقًا على تأشيرة إلكترونية عبر موقع شرطة عُمان السلطانية (evisa.rop.gov.om)، وتحقّق من الشروط هناك قبل السفر.",
        },
      },
    ],
    sources: [
      { title: "Oman Ministry of Foreign Affairs — Entry visas", url: "https://www.fm.gov.om/en/visitors/entry-visas/" },
      {
        title: "Oman Observer — Visa-free stay for 14 days",
        url: "https://www.omanobserver.om/article/4820/Head%20stories/visa-free-stay-for-14-days",
      },
    ],
  },
  {
    slug: "armenian-driving-licence-uae",
    kind: "news",
    publishedAt: "2026-09-24",
    country: "UAE",
    readMinutes: 3,
    title: {
      hy: "Հայաստանի վարորդական իրավունքով այժմ կարելի է վարել ԱՄԷ-ում",
      en: "Armenian driving licences are now valid in the UAE",
      ru: "Армянские водительские права теперь действуют в ОАЭ",
      ar: "رخص القيادة الأرمينية أصبحت سارية في الإمارات",
    },
    titleHighlight: { hy: "վարորդական իրավունքով", en: "driving licences", ru: "водительские права", ar: "رخص القيادة" },
    excerpt: {
      hy: "2026 թվականի հունիսի 13-ից Հայաստանի քաղաքացիները կարող են ԱՄԷ-ում մեքենա վարել իրենց ազգային վարորդական իրավունքով։ Ահա թե ինչ պետք է իմանալ։",
      en: "Since 13 June 2026, Armenian citizens visiting the UAE can drive with their national licence. Here is what you need to know.",
      ru: "С 13 июня 2026 года граждане Армении могут водить в ОАЭ по своим национальным правам. Рассказываем, что нужно знать.",
      ar: "منذ 13 يونيو 2026 يمكن للمواطنين الأرمن الزائرين للإمارات القيادة برخصتهم الوطنية. إليك ما تحتاج معرفته.",
    },
    cover: {
      day: "/images/blog/armenian-driving-licence-uae.jpg",
      night: "/images/blog/armenian-driving-licence-uae-night.jpg",
      alt: {
        hy: "Հայկական վարորդական իրավունք, մեքենայի բանալի և ԱՄԷ-ի ճանապարհ՝ Հայաստանի և ԱՄԷ-ի դրոշներով",
        en: "An Armenian driving licence and car key on a UAE road, with the flags of Armenia and the UAE",
        ru: "Армянские водительские права и ключ от машины на дороге в ОАЭ, с флагами Армении и ОАЭ",
        ar: "رخصة قيادة أرمينية ومفتاح سيارة على طريق في الإمارات مع علمي أرمينيا والإمارات",
      },
    },
    sections: [
      {
        heading: { hy: "Ինչ է փոխվել", en: "What changed", ru: "Что изменилось", ar: "ما الذي تغيّر" },
        body: {
          hy: "Հայաստանն ու ԱՄԷ-ն 2025 թվականի սեպտեմբերի 30-ին ստորագրեցին վարորդական իրավունքների փոխադարձ ճանաչման հուշագիր, որն ուժի մեջ է մտել 2026 թվականի հունիսի 13-ից։ Այլևս պետք չէ միջազգային վկայական կամ իրավունքի փոխանակում՝ կարճաժամկետ այցի համար բավական է հայկական վարորդական իրավունքը։",
          en: "Armenia and the UAE signed a memorandum on mutual recognition of driving licences on 30 September 2025, and it came into force on 13 June 2026. For a short visit you no longer need an international permit or a licence exchange — your Armenian licence is enough.",
          ru: "Армения и ОАЭ подписали меморандум о взаимном признании водительских удостоверений 30 сентября 2025 года, и он вступил в силу 13 июня 2026 года. Для короткой поездки больше не нужны международные права или обмен удостоверения — достаточно армянских прав.",
          ar: "وقّعت أرمينيا والإمارات مذكرة للاعتراف المتبادل برخص القيادة في 30 سبتمبر 2025، ودخلت حيّز التنفيذ في 13 يونيو 2026. لم تعد الزيارة القصيرة تتطلب رخصة دولية أو استبدال الرخصة، فالرخصة الأرمينية تكفي.",
        },
      },
      {
        heading: { hy: "Ով կարող է վարել", en: "Who can drive", ru: "Кто может водить", ar: "من يمكنه القيادة" },
        body: {
          hy: "Կանոնը գործում է ԱՄԷ-ում օրինական գտնվելու ողջ ընթացքում այն քաղաքացիների համար, ովքեր այնտեղ չեն բնակվում, օրինակ՝ զբոսաշրջիկների։ B կարգով կարելի է վարել մարդատար մեքենա 18 տարեկանից, D1 կարգով՝ մինչև 16 նստատեղով միկրոավտոբուս 21 տարեկանից։",
          en: "The rule covers Armenian citizens who are in the UAE without residence, such as tourists, for the whole of their legal stay. A category B licence lets you drive a car from age 18; category D1 covers minibuses of up to 16 seats from age 21.",
          ru: "Правило действует для граждан Армении, находящихся в ОАЭ без вида на жительство, например туристов, на весь срок законного пребывания. С категорией B можно водить легковой автомобиль с 18 лет, с категорией D1 — микроавтобус до 16 мест с 21 года.",
          ar: "تشمل القاعدة المواطنين الأرمن الموجودين في الإمارات دون إقامة، مثل السياح، طوال مدة إقامتهم القانونية. تسمح الفئة B بقيادة السيارات من سن 18، والفئة D1 بقيادة الحافلات الصغيرة حتى 16 مقعدًا من سن 21.",
        },
      },
      {
        heading: { hy: "Մեքենայի վարձույթ", en: "Renting a car", ru: "Аренда автомобиля", ar: "استئجار سيارة" },
        body: {
          hy: "Վարձույթի ընկերությունները սահմանում են իրենց պայմանները՝ նվազագույն տարիք, վարորդական ստաժ և գրավ, որը հաճախ արգելափակվում է կրեդիտ քարտի վրա։ Ամրագրելուց առաջ ճշտեք այդ պայմանները և ճանապարհին միշտ ձեզ հետ պահեք անձնագիրն ու վարորդական իրավունքը։",
          en: "Rental companies set their own terms — minimum age, years of driving and a deposit, often blocked on a credit card. Check these before you book, and always carry your passport and licence when you drive.",
          ru: "Прокатные компании устанавливают свои условия: минимальный возраст, стаж и залог, который часто блокируют на кредитной карте. Уточните их до бронирования и всегда возите с собой паспорт и права.",
          ar: "تضع شركات التأجير شروطها الخاصة، مثل الحد الأدنى للعمر وسنوات الخبرة والتأمين الذي يُحجز غالبًا على بطاقة ائتمان. تحقّق منها قبل الحجز واحمل جواز سفرك ورخصتك دائمًا أثناء القيادة.",
        },
      },
      {
        heading: { hy: "Եթե տեղափոխվում եք ԱՄԷ", en: "If you move to the UAE", ru: "Если вы переезжаете в ОАЭ", ar: "إذا انتقلت للإقامة في الإمارات" },
        body: {
          hy: "Ռեզիդենտ դառնալուց հետո անհրաժեշտ է հայկական իրավունքը փոխանակել տեղականով, սակայն տեսական և գործնական քննություններ հանձնել պետք չէ։",
          en: "Once you become a resident you need to exchange your Armenian licence for a UAE one — but you are exempt from the theory and practical driving tests.",
          ru: "Получив вид на жительство, армянские права нужно обменять на местные, но сдавать теорию и практику не требуется.",
          ar: "بعد الحصول على الإقامة يجب استبدال الرخصة الأرمينية برخصة إماراتية، مع الإعفاء من الاختبارين النظري والعملي.",
        },
      },
    ],
    sources: [
      {
        title: "Ministry of Internal Affairs of Armenia — Armenian and UAE driving licences are now mutually recognised",
        url: "https://mia.gov.am/2026/07/07/uae-2/",
      },
      {
        title: "Armenpress — Armenia and UAE mutually recognise driver’s licences",
        url: "https://armenpress.am/en/article/1254954",
      },
    ],
  },
  {
    slug: "armenian-citizens-visa-uae",
    kind: "guide",
    publishedAt: "2026-09-20",
    country: "UAE",
    readMinutes: 2,
    title: {
      hy: "Պե՞տք է արդյոք վիզա ԱՄԷ մեկնելու համար Հայաստանի քաղաքացիներին",
      en: "Do Armenian citizens need a visa for the UAE?",
      ru: "Нужна ли гражданам Армении виза в ОАЭ?",
      ar: "هل يحتاج المواطنون الأرمن إلى تأشيرة لدخول الإمارات؟",
    },
    titleHighlight: { hy: "վիզա ԱՄԷ", en: "visa for the UAE", ru: "виза в ОАЭ", ar: "تأشيرة لدخول الإمارات" },
    excerpt: {
      hy: "Ոչ։ 2024 թվականից Հայաստանի քաղաքացիները ԱՄԷ են մեկնում առանց վիզայի՝ մինչև 90 օրով։ Ահա պայմանները՝ անձնագրի վավերականություն և մնալու ժամկետ։",
      en: "No. Since 2024 Armenian citizens can visit the UAE visa-free for up to 90 days. Here are the conditions — passport validity and length of stay.",
      ru: "Нет. С 2024 года граждане Армении ездят в ОАЭ без визы — до 90 дней. Рассказываем об условиях: срок действия паспорта и длительность пребывания.",
      ar: "لا. منذ 2024 يمكن للمواطنين الأرمن زيارة الإمارات دون تأشيرة لمدة تصل إلى 90 يومًا. إليك الشروط: صلاحية الجواز ومدة الإقامة.",
    },
    cover: {
      day: "/images/blog/armenian-citizens-visa-uae.jpg",
      night: "/images/blog/armenian-citizens-visa-uae-night.jpg",
      alt: {
        hy: "Հայաստանի և ԱՄԷ-ի դրոշները, հայկական անձնագիր և Դուբայի համայնապատկերը",
        en: "The flags of Armenia and the UAE with an Armenian passport and the Dubai skyline",
        ru: "Флаги Армении и ОАЭ, армянский паспорт и панорама Дубая",
        ar: "علما أرمينيا والإمارات مع جواز سفر أرميني وأفق دبي",
      },
    },
    keyFacts: [
      {
        value: { hy: "90 օր", en: "90 days", ru: "90 дней", ar: "90 يومًا" },
        label: {
          hy: "ցանկացած 180 օրվա ընթացքում",
          en: "in any 180-day period",
          ru: "в течение любых 180 дней",
          ar: "خلال أي فترة 180 يومًا",
        },
      },
      {
        value: { hy: "0 ֏", en: "0 ֏", ru: "0 ֏", ar: "0 ֏" },
        label: { hy: "ո՛չ վիզա, ո՛չ վճար", en: "no visa, no fee", ru: "ни визы, ни сборов", ar: "لا تأشيرة ولا رسوم" },
      },
      {
        value: { hy: "6 ամիս", en: "6 months", ru: "6 месяцев", ar: "6 أشهر" },
        label: {
          hy: "անձնագրի վավերականություն",
          en: "passport validity on arrival",
          ru: "срок действия паспорта",
          ar: "صلاحية الجواز عند الوصول",
        },
      },
      {
        value: { hy: "2024", en: "2024", ru: "2024", ar: "2024" },
        label: {
          hy: "փետրվարի 1-ից առանց վիզայի",
          en: "visa-free since 1 February",
          ru: "без визы с 1 февраля",
          ar: "دون تأشيرة منذ 1 فبراير",
        },
      },
    ],
    sections: [
      {
        heading: { hy: "ԱՄԷ՝ առանց վիզայի 2024 թվականից", en: "UAE: visa-free since 2024", ru: "ОАЭ: без визы с 2024 года", ar: "الإمارات: دون تأشيرة منذ 2024" },
        body: {
          hy: "2024 թվականի փետրվարի 1-ից Հայաստանի քաղաքացիները ԱՄԷ կարող են մուտք գործել ==առանց վիզայի և վճարի==։ Կարելի է մնալ ==մինչև 90 օր՝ ցանկացած 180 օրվա ընթացքում==, իսկ անձնագիրը պետք է վավեր լինի ժամանման օրվանից ==առնվազն 6 ամիս==։",
          en: "Since 1 February 2024, Armenian citizens can enter the UAE ==without a visa or fee==. You can stay ==up to 90 days in any 180-day period==, and your passport must be valid for ==at least 6 months== from the day you arrive.",
          ru: "С 1 февраля 2024 года граждане Армении въезжают в ОАЭ ==без визы и сборов==. Можно находиться ==до 90 дней в течение любых 180 дней==, а паспорт должен быть действителен ==не менее 6 месяцев== с даты прибытия.",
          ar: "منذ 1 فبراير 2024 يمكن للمواطنين الأرمن دخول الإمارات ==دون تأشيرة أو رسوم==. يُسمح بالبقاء ==حتى 90 يومًا خلال أي فترة 180 يومًا==، ويجب أن يكون الجواز صالحًا ==لستة أشهر على الأقل== من تاريخ الوصول.",
        },
      },
      {
        aside: true,
        heading: { hy: "Ինչ վերցնել ձեզ հետ", en: "What to carry", ru: "Что взять с собой", ar: "ما الذي تحمله معك" },
        body: {
          hy: "==Անձնագիր, հետադարձ տոմս և հյուրանոցային ամրագրում==։ Ավիաընկերությունները հաճախ ստուգում են դրանք դեռ Երևանում՝ գրանցման ժամանակ, ուստի պահեք դրանք հեռախոսում կամ տպված։",
          en: "==Your passport, a return ticket and your hotel booking==. Airlines often check these at check-in in Yerevan, so keep them on your phone or printed.",
          ru: "==Паспорт, обратный билет и бронь отеля==. Авиакомпании часто проверяют их ещё на регистрации в Ереване, поэтому держите их в телефоне или распечатанными.",
          ar: "==جواز السفر وتذكرة العودة وحجز الفندق==. كثيرًا ما تتحقق شركات الطيران منها عند تسجيل الوصول في يريفان، فاحتفظ بها على هاتفك أو مطبوعة.",
        },
      },
    ],
    sources: [
      {
        title: "UAE Ministry of Foreign Affairs — UAE exempts citizens of Armenia from pre-entry visas",
        url: "https://www.mofa.gov.ae/en/mediahub/news/2023/9/12/12-9-2023-uae-armenia",
      },
      {
        title: "Ministry of Foreign Affairs of Armenia — Countries with a visa-free regime with Armenia",
        url: "https://www.mfa.am/en/whoneedvisa",
      },
    ],
  },
  {
    slug: "armenian-citizens-visa-qatar",
    kind: "guide",
    publishedAt: "2026-09-20",
    country: "Qatar",
    readMinutes: 2,
    title: {
      hy: "Պե՞տք է արդյոք վիզա Կատար մեկնելու համար Հայաստանի քաղաքացիներին",
      en: "Do Armenian citizens need a visa for Qatar?",
      ru: "Нужна ли гражданам Армении виза в Катар?",
      ar: "هل يحتاج المواطنون الأرمن إلى تأشيرة لدخول قطر؟",
    },
    titleHighlight: { hy: "վիզա Կատար", en: "visa for Qatar", ru: "виза в Катар", ar: "تأشيرة لدخول قطر" },
    excerpt: {
      hy: "Ոչ, բայց սահմանին կպահանջեն հաստատված հյուրանոցային ամրագրում և ժամանման օրվանից առնվազն 3 ամիս վավեր անձնագիր։",
      en: "No — but at the border you'll need a confirmed hotel booking and a passport valid for at least 3 months from arrival.",
      ru: "Нет, но на границе понадобятся подтверждённая бронь отеля и паспорт, действительный не менее 3 месяцев с даты прибытия.",
      ar: "لا، لكن عند الوصول ستحتاج إلى حجز فندقي مؤكد وجواز صالح لثلاثة أشهر على الأقل من تاريخ الوصول.",
    },
    cover: {
      day: "/images/blog/armenian-citizens-visa-qatar.jpg",
      night: "/images/blog/armenian-citizens-visa-qatar-night.jpg",
      alt: {
        hy: "Հայաստանի և Կատարի դրոշները, հայկական անձնագիր և Դոհայի ծովափն ու երկնաքերները",
        en: "The flags of Armenia and Qatar with an Armenian passport and the Doha waterfront and skyline",
        ru: "Флаги Армении и Катара, армянский паспорт, набережная и небоскрёбы Дохи",
        ar: "علما أرمينيا وقطر مع جواز سفر أرميني وواجهة الدوحة البحرية وأبراجها",
      },
    },
    sections: [
      {
        heading: { hy: "Կատար՝ առանց վիզայի, բայց հյուրանոցով", en: "Qatar: visa-free, with a hotel booking", ru: "Катар: без визы, но с бронью отеля", ar: "قطر: دون تأشيرة مع حجز فندقي" },
        body: {
          hy: "Հայաստանը Կատարի առանց վիզայի մուտքի ցանկում է։ Սահմանին անհրաժեշտ է ժամանման օրվանից առնվազն 3 ամիս վավեր անձնագիր և հաստատված հյուրանոցային ամրագրում։ Թույլատրված ժամկետը ճշտեք Visit Qatar-ի վիզաների էջում՝ մեկնելուց առաջ։",
          en: "Armenia is on Qatar's visa-free list. At the border you need a passport valid for at least 3 months from arrival and a confirmed hotel booking. Check the permitted length of stay on Visit Qatar's visa page before you fly.",
          ru: "Армения входит в список безвизовых стран Катара. На границе нужны паспорт, действительный не менее 3 месяцев с даты прибытия, и подтверждённая бронь отеля. Разрешённый срок пребывания уточните на странице виз Visit Qatar перед вылетом.",
          ar: "أرمينيا مدرجة في قائمة الدخول دون تأشيرة إلى قطر. عند الوصول تحتاج إلى جواز صالح لثلاثة أشهر على الأقل وحجز فندقي مؤكد. تحقّق من مدة الإقامة المسموح بها في صفحة التأشيرات على موقع Visit Qatar قبل السفر.",
        },
      },
      {
        heading: { hy: "Ինչ վերցնել ձեզ հետ", en: "What to carry", ru: "Что взять с собой", ar: "ما الذي تحمله معك" },
        body: {
          hy: "Անձնագիր, հետադարձ տոմս և հյուրանոցային ամրագրում։ Ավիաընկերությունները հաճախ ստուգում են դրանք դեռ Երևանում՝ գրանցման ժամանակ, ուստի պահեք դրանք հեռախոսում կամ տպված։",
          en: "Your passport, a return ticket and your hotel booking. Airlines often check these at check-in in Yerevan, so keep them on your phone or printed.",
          ru: "Паспорт, обратный билет и бронь отеля. Авиакомпании часто проверяют их ещё на регистрации в Ереване, поэтому держите их в телефоне или распечатанными.",
          ar: "جواز السفر وتذكرة العودة وحجز الفندق. كثيرًا ما تتحقق شركات الطيران منها عند تسجيل الوصول في يريفان، فاحتفظ بها على هاتفك أو مطبوعة.",
        },
      },
    ],
    sources: [{ title: "Visit Qatar — Visas", url: "https://visitqatar.com/intl-en/plan-your-trip/visas" }],
  },
  {
    slug: "abu-dhabi-top-places",
    kind: "guide",
    publishedAt: "2026-09-16",
    city: "Abu Dhabi",
    country: "UAE",
    readMinutes: 6,
    title: {
      hy: "Ուր գնալ Աբու Դաբիում՝ 8 վայր, որոնք չպետք է բաց թողնել",
      en: "Where to go in Abu Dhabi: 8 places not to miss",
      ru: "Куда сходить в Абу-Даби: 8 мест, которые нельзя пропустить",
      ar: "إلى أين تذهب في أبوظبي: 8 أماكن لا تفوّتها",
    },
    titleHighlight: { hy: "Ուր գնալ Աբու Դաբիում", en: "Where to go in Abu Dhabi", ru: "Куда сходить в Абу-Даби", ar: "إلى أين تذهب في أبوظبي" },
    excerpt: {
      hy: "SeaWorld-ից և դինոզավրերից մինչև Մեծ մզկիթ ու Լուվր՝ մայրաքաղաքի 8 գլխավոր վայրերը, որոնք արժե տեսնել առաջին այցի ժամանակ։",
      en: "From SeaWorld and the dinosaurs to the Grand Mosque and the Louvre — the capital's 8 highlights for a first visit.",
      ru: "От SeaWorld и динозавров до Большой мечети и Лувра — 8 главных мест столицы для первой поездки.",
      ar: "من سي وورلد والديناصورات إلى الجامع الكبير واللوفر: أبرز 8 معالم في العاصمة للزيارة الأولى.",
    },
    cover: {
      day: "/images/blog/abu-dhabi-top-places.jpg",
      night: "/images/blog/abu-dhabi-top-places-night.jpg",
      alt: {
        hy: "Աբու Դաբիի գլխավոր վայրերը՝ Մեծ մզկիթ, Լուվր, SeaWorld, Warner Bros. World և Կասր ալ Վատան",
        en: "Abu Dhabi's highlights: the Grand Mosque, the Louvre, SeaWorld, Warner Bros. World and Qasr Al Watan",
        ru: "Главные места Абу-Даби: Большая мечеть, Лувр, SeaWorld, Warner Bros. World и Каср-аль-Ватан",
        ar: "أبرز معالم أبوظبي: الجامع الكبير واللوفر وسي وورلد وعالم وارنر براذرز وقصر الوطن",
      },
    },
    sections: [
      {
        place: {
          area: { hy: "Յաս կղզի", en: "Yas Island", ru: "Остров Яс", ar: "جزيرة ياس" },
          tour: "seaworld-abu-dhabi-tickets",
          image: {
            day: "/images/blog/abu-dhabi-top-places-seaworld.jpg",
            night: "/images/blog/abu-dhabi-top-places-seaworld-night.jpg",
            alt: { hy: "SeaWorld Աբու Դաբի", en: "SeaWorld Abu Dhabi", ru: "SeaWorld Абу-Даби", ar: "سي وورلد أبوظبي" },
          },
        },
        heading: { hy: "SeaWorld Աբու Դաբի", en: "SeaWorld Abu Dhabi", ru: "SeaWorld Абу-Даби", ar: "سي وورلد أبوظبي" },
        body: {
          hy: "2023 թվականին բացված փակ ծովային պարկ՝ ութ «աշխարհներով»՝ Արկտիկայից ու Անտարկտիդայից մինչև արևադարձային խութեր։ Endless Ocean հատվածում է ==աշխարհի ամենամեծ բազմատեսակ ակվարիումը==՝ շնաձկներով, մանտաներով և ծովային կրիաներով։ Պլանավորեք ==ամբողջ օր==։",
          en: "An indoor marine-life park opened in 2023, with eight 'realms' — from the Arctic and Antarctic to tropical reefs. Its Endless Ocean realm holds ==the world's largest multi-species aquarium==, with sharks, manta rays and sea turtles. Plan ==a full day==.",
          ru: "Крытый морской парк, открытый в 2023 году, с восемью «мирами» — от Арктики и Антарктиды до тропических рифов. В зоне Endless Ocean находится ==крупнейший в мире многовидовой аквариум== с акулами, мантами и морскими черепахами. Закладывайте ==целый день==.",
          ar: "حديقة بحرية مغطاة افتُتحت عام 2023 تضم ثمانية «عوالم»، من القطبين الشمالي والجنوبي إلى الشعاب الاستوائية. ويضم عالم Endless Ocean ==أكبر حوض مائي متعدد الأنواع في العالم== بأسماك القرش وشياطين البحر والسلاحف. خصّص لها ==يومًا كاملًا==.",
        },
      },
      {
        place: {
          area: { hy: "Սաադիյաթ կղզի", en: "Saadiyat Island", ru: "Остров Саадият", ar: "جزيرة السعديات" },
          tour: "natural-history-museum-abu-dhabi-tickets",
          image: {
            day: "/images/blog/abu-dhabi-top-places-natural-history-museum.jpg",
            night: "/images/blog/abu-dhabi-top-places-natural-history-museum-night.jpg",
            alt: { hy: "Աբու Դաբիի բնական պատմության թանգարանը", en: "Natural History Museum Abu Dhabi", ru: "Музей естественной истории Абу-Даби", ar: "متحف التاريخ الطبيعي أبوظبي" },
          },
        },
        heading: { hy: "Բնական պատմության թանգարան", en: "Natural History Museum Abu Dhabi", ru: "Музей естественной истории", ar: "متحف التاريخ الطبيعي أبوظبي" },
        body: {
          hy: "Բացվել է 2025 թվականի նոյեմբերին և ==Մերձավոր Արևելքի ամենամեծ բնական պատմության թանգարանն է==։ Գլխավոր «հերոսը» Սթենն է՝ ==երբևէ գտնված ամենաամբողջական տիրանոզավրի կմախքներից մեկը==, իսկ կողքին Մերչիսոնի երկնաքարն է, որն ավելի հին է, քան Երկիրը։",
          en: "Opened in November 2025, it is ==the largest natural history museum in the Middle East==. The star is Stan, ==one of the most complete T. rex skeletons ever found==, and nearby is the Murchison meteorite — older than the Earth itself.",
          ru: "Открыт в ноябре 2025 года и стал ==крупнейшим музеем естественной истории на Ближнем Востоке==. Его звезда — Стэн, ==один из самых полных скелетов тираннозавра из когда-либо найденных==, а рядом — метеорит Мерчисон, который старше самой Земли.",
          ar: "افتُتح في نوفمبر 2025 وهو ==أكبر متحف للتاريخ الطبيعي في الشرق الأوسط==. نجمه «ستان»، ==أحد أكمل هياكل التيرانوصور التي عُثر عليها==، وبجانبه نيزك مورشيسون الأقدم من الأرض نفسها.",
        },
      },
      {
        place: {
          tour: "abu-dhabi-grand-mosque",
          image: {
            day: "/images/blog/abu-dhabi-top-places-grand-mosque.jpg",
            night: "/images/blog/abu-dhabi-top-places-grand-mosque-night.jpg",
            alt: { hy: "Շեյխ Զայեդի մեծ մզկիթը", en: "Sheikh Zayed Grand Mosque", ru: "Мечеть шейха Зайда", ar: "جامع الشيخ زايد الكبير" },
          },
        },
        heading: { hy: "Շեյխ Զայեդի մեծ մզկիթ", en: "Sheikh Zayed Grand Mosque", ru: "Мечеть шейха Зайда", ar: "جامع الشيخ زايد الكبير" },
        body: {
          hy: "Աշխարհի ամենամեծ մզկիթներից մեկը՝ սպիտակ մարմարով, ոսկեզօծ ջահերով և հսկայական գորգով։ Մուտքն անվճար է, բայց պետք է նախապես գրանցվել կայքում։ Հագուստը պետք է ծածկի ձեռքերն ու ոտքերը, իսկ կանայք պետք է ծածկեն գլուխը։ Ամենագեղեցիկ է մայրամուտին։",
          en: "One of the world's largest mosques — white marble, gilded chandeliers and a vast hand-knotted carpet. Entry is free but you book a slot online. Cover arms and legs, and women cover their hair. It is most beautiful at sunset.",
          ru: "Одна из крупнейших мечетей мира: белый мрамор, позолоченные люстры и огромный ковёр ручной работы. Вход бесплатный, но нужно заранее записаться на сайте. Одежда должна закрывать руки и ноги, женщинам нужно покрыть голову. Особенно красиво на закате.",
          ar: "من أكبر مساجد العالم بالرخام الأبيض والثريات المذهّبة والسجادة اليدوية الضخمة. الدخول مجاني مع حجز موعد عبر الإنترنت. يجب تغطية الذراعين والساقين وعلى النساء تغطية الشعر. يكون في أجمل حالاته وقت الغروب.",
        },
      },
      {
        place: {
          area: { hy: "Յաս կղզի", en: "Yas Island", ru: "Остров Яс", ar: "جزيرة ياس" },
          tour: "warner-bros-world-abu-dhabi-tickets",
          image: {
            day: "/images/blog/abu-dhabi-top-places-warner-bros-world.jpg",
            night: "/images/blog/abu-dhabi-top-places-warner-bros-world-night.jpg",
            alt: { hy: "Warner Bros. World Աբու Դաբի", en: "Warner Bros. World Abu Dhabi", ru: "Warner Bros. World Абу-Даби", ar: "عالم وارنر براذرز أبوظبي" },
          },
        },
        heading: { hy: "Warner Bros. World", en: "Warner Bros. World", ru: "Warner Bros. World", ar: "عالم وارنر براذرز" },
        body: {
          hy: "==Ամբողջությամբ փակ== զվարճանքների պարկ, որը հարմար է նաև ամռանը։ Վեց թեմատիկ գոտի՝ Գոթեմ Սիթի, Մետրոպոլիս, Cartoon Junction, Բեդրոք և այլն, Բեթմենի, Սուպերմենի, Looney Tunes-ի և Scooby-Doo-ի ատրակցիոններով։ Գտնվում է SeaWorld-ի հարևանությամբ։",
          en: "An ==entirely indoor== theme park, so it works even in summer. Six lands — Gotham City, Metropolis, Cartoon Junction, Bedrock and more — with rides and shows starring Batman, Superman, Looney Tunes and Scooby-Doo. It's a short hop from SeaWorld.",
          ru: "==Полностью крытый== парк развлечений, поэтому подходит даже летом. Шесть тематических зон — Готэм-Сити, Метрополис, Cartoon Junction, Бедрок и другие — с аттракционами и шоу с Бэтменом, Суперменом, Looney Tunes и Скуби-Ду. Совсем рядом с SeaWorld.",
          ar: "مدينة ملاهٍ ==مغطاة بالكامل== تناسب حتى أشهر الصيف. ست مناطق، منها غوثام سيتي وميتروبوليس وكرتون جنكشن وبيدروك، بألعاب وعروض لباتمان وسوبرمان ولوني تونز وسكوبي دو. وهي على مقربة من سي وورلد.",
        },
      },
      {
        place: {
          area: { hy: "Սաադիյաթ կղզի", en: "Saadiyat Island", ru: "Остров Саадият", ar: "جزيرة السعديات" },
          tour: "abu-dhabi-louvre-qasr-al-watan",
          image: {
            day: "/images/blog/abu-dhabi-top-places-louvre.jpg",
            night: "/images/blog/abu-dhabi-top-places-louvre-night.jpg",
            alt: { hy: "Լուվր Աբու Դաբին", en: "Louvre Abu Dhabi", ru: "Лувр Абу-Даби", ar: "اللوفر أبوظبي" },
          },
        },
        heading: { hy: "Լուվր Աբու Դաբի", en: "Louvre Abu Dhabi", ru: "Лувр Абу-Даби", ar: "اللوفر أبوظبي" },
        body: {
          hy: "Սաադիյաթ կղզու թանգարանը ծովի վրա է՝ հայտնի գմբեթի տակ, որից լույսը թափանցում է «լույսի անձրևի» պես։ Ժամանակագրական ցուցադրությունը տանում է հին աշխարհից մինչև ժամանակակից արվեստ։ Հատկացրեք առնվազն երկու ժամ։",
          en: "The museum on Saadiyat Island sits on the water under a famous dome that filters sunlight like a 'rain of light'. The galleries run from the ancient world to modern art. Allow at least two hours.",
          ru: "Музей на острове Саадият стоит у воды под знаменитым куполом, сквозь который свет падает «дождём». Экспозиция ведёт от древнего мира к современному искусству. Закладывайте минимум два часа.",
          ar: "يقع المتحف في جزيرة السعديات على الماء تحت قبته الشهيرة التي تُسقط الضوء كأنه «مطر من نور». تمتد القاعات من العالم القديم إلى الفن الحديث. خصّص ساعتين على الأقل.",
        },
      },
      {
        place: {
          tour: "abu-dhabi-louvre-qasr-al-watan",
          image: {
            day: "/images/blog/abu-dhabi-top-places-qasr-al-watan.jpg",
            night: "/images/blog/abu-dhabi-top-places-qasr-al-watan-night.jpg",
            alt: { hy: "Կասր ալ Վատան պալատը", en: "Qasr Al Watan palace", ru: "Дворец Каср-аль-Ватан", ar: "قصر الوطن" },
          },
        },
        heading: { hy: "Կասր ալ Վատան", en: "Qasr Al Watan", ru: "Каср-аль-Ватан", ar: "قصر الوطن" },
        body: {
          hy: "Գործող նախագահական պալատ, որի սրահները բաց են այցելուների համար։ Երեկոյան լույսի և ձայնի շոուն պատմում է երկրի պատմությունը պալատի ճակատի վրա։",
          en: "A working presidential palace whose great halls are open to visitors. In the evening a light-and-sound show tells the country's story across the façade.",
          ru: "Действующий президентский дворец, залы которого открыты для посетителей. Вечером на фасаде проходит световое шоу об истории страны.",
          ar: "قصر رئاسي عامل تُفتح قاعاته الكبرى للزوار. في المساء يروي عرض الضوء والصوت قصة الدولة على واجهة القصر.",
        },
      },
      {
        place: {
          area: { hy: "Ալ Կանա", en: "Al Qana", ru: "Аль-Кана", ar: "القناة" },
          tour: "national-aquarium-abu-dhabi-tickets",
          image: {
            day: "/images/blog/abu-dhabi-top-places-national-aquarium.jpg",
            night: "/images/blog/abu-dhabi-top-places-national-aquarium-night.jpg",
            alt: { hy: "Աբու Դաբիի ազգային ակվարիումը", en: "The National Aquarium Abu Dhabi", ru: "Национальный аквариум Абу-Даби", ar: "الأحواض المائية الوطنية أبوظبي" },
          },
        },
        heading: { hy: "Ազգային ակվարիում", en: "The National Aquarium", ru: "Национальный аквариум", ar: "الأحواض المائية الوطنية" },
        body: {
          hy: "==Մերձավոր Արևելքի ամենամեծ ակվարիումը==՝ ավելի քան 46 000 կենդանի՝ 300-ից ավելի տեսակից, այդ թվում՝ մուրճագլուխ շնաձկներ։ Գտնվում է Ալ Կանայի ծովափնյա թաղամասում՝ ռեստորաններով շրջապատված։",
          en: "==The largest aquarium in the Middle East==: more than 46,000 animals from over 300 species, hammerhead sharks among them. It sits on the Al Qana waterfront, surrounded by restaurants.",
          ru: "==Крупнейший аквариум на Ближнем Востоке==: более 46 000 животных свыше 300 видов, среди них — рыбы-молоты. Находится на набережной Аль-Кана в окружении ресторанов.",
          ar: "==أكبر حوض مائي في الشرق الأوسط==: أكثر من 46 ألف حيوان من أكثر من 300 نوع، منها أسماك القرش المطرقية. يقع على واجهة القناة البحرية وتحيط به المطاعم.",
        },
      },
      {
        place: {
          area: { hy: "Սաադիյաթ կղզի", en: "Saadiyat Island", ru: "Остров Саадият", ar: "جزيرة السعديات" },
          tour: "teamlab-phenomena-abu-dhabi-tickets",
          image: {
            day: "/images/blog/abu-dhabi-top-places-teamlab-phenomena.jpg",
            night: "/images/blog/abu-dhabi-top-places-teamlab-phenomena-night.jpg",
            alt: { hy: "teamLab Phenomena Աբու Դաբի", en: "teamLab Phenomena Abu Dhabi", ru: "teamLab Phenomena Абу-Даби", ar: "تيم لاب فينومينا أبوظبي" },
          },
        },
        heading: { hy: "teamLab Phenomena", en: "teamLab Phenomena", ru: "teamLab Phenomena", ar: "تيم لاب فينومينا" },
        body: {
          hy: "2025 թվականի ապրիլին բացված 17 000 քառ. մետր ինտերակտիվ արվեստի տարածք, որտեղ գործերը ստեղծում են ==լույսը, օդը, շարժումը և հենց այցելուները==։ Երկու այց երբեք նույնը չեն լինում։ Լավ համադրվում է Լուվրի հետ՝ նույն թաղամասում է։",
          en: "Opened in April 2025: 17,000 m² of immersive art where the works are made by ==light, air, movement and the visitors themselves== — so no two visits are the same. It's in the same district as the Louvre, so pair the two.",
          ru: "Открыт в апреле 2025 года: 17 000 м² иммерсивного искусства, где работы создают ==свет, воздух, движение и сами посетители==, поэтому два визита никогда не бывают одинаковыми. Находится в том же районе, что и Лувр, — их удобно совместить.",
          ar: "افتُتح في أبريل 2025 على مساحة 17 ألف متر مربع من الفن التفاعلي، حيث تصنع الأعمالَ ==الأضواءُ والهواء والحركة والزوار أنفسهم==، فلا تتشابه زيارتان أبدًا. يقع في الحي نفسه مع اللوفر، فاجمع بينهما.",
        },
      },
    ],
  },
  {
    slug: "dubai-where-to-eat",
    kind: "guide",
    publishedAt: "2026-09-10",
    city: "Dubai",
    country: "UAE",
    readMinutes: 5,
    title: {
      hy: "Ուր ուտել Դուբայում՝ փողոցային շաուրմայից մինչև էմիրաթական նախաճաշ",
      en: "Where to eat in Dubai: from street shawarma to an Emirati breakfast",
      ru: "Где поесть в Дубае: от уличной шаурмы до эмиратского завтрака",
      ar: "أين تأكل في دبي: من الشاورما في الشارع إلى الفطور الإماراتي",
    },
    titleHighlight: { hy: "Ուր ուտել Դուբայում", en: "Where to eat in Dubai", ru: "Где поесть в Дубае", ar: "أين تأكل في دبي" },
    excerpt: {
      hy: "Դուբայում կարելի է համեղ ուտել ցանկացած բյուջեով։ Ահա վայրեր և թաղամասեր, որոնք տեղացիներն իրենք են խորհուրդ տալիս։",
      en: "You can eat well in Dubai on any budget. Here are the places and neighbourhoods locals actually recommend.",
      ru: "В Дубае вкусно поесть можно при любом бюджете. Вот места и районы, которые советуют сами местные.",
      ar: "يمكنك أن تأكل جيدًا في دبي بأي ميزانية. إليك الأماكن والأحياء التي يوصي بها السكان فعلًا.",
    },
    sections: [
      {
        heading: { hy: "Էմիրաթական խոհանոց", en: "Emirati food", ru: "Эмиратская кухня", ar: "المطبخ الإماراتي" },
        body: {
          hy: "Փորձեք մաչբուս (համեմունքներով բրինձ մսով), լուկայմաթ (մեղրով քաղցր գնդիկներ) և ավանդական նախաճաշ՝ չեբաբ բլիթներով։ Arabian Tea House-ը Ալ Ֆահիդի պատմական թաղամասում հարմար է նախաճաշի համար, իսկ Al Fanar-ը մատուցում է տնական էմիրաթական ճաշատեսակներ։",
          en: "Try machboos (spiced rice with meat), luqaimat (sweet dumplings with date syrup) and a traditional breakfast with chebab pancakes. Arabian Tea House in the historic Al Fahidi quarter is lovely for breakfast, and Al Fanar serves home-style Emirati dishes.",
          ru: "Попробуйте мачбус (пряный рис с мясом), лукаймат (сладкие шарики с финиковым сиропом) и традиционный завтрак с блинчиками чебаб. Arabian Tea House в историческом квартале Аль-Фахиди — отличное место для завтрака, а Al Fanar готовит домашние эмиратские блюда.",
          ar: "جرّب المجبوس واللقيمات مع دبس التمر وفطورًا تقليديًا مع خبز الجباب. يُعد «بيت الشاي العربي» في حي الفهيدي التاريخي مكانًا رائعًا للفطور، ويقدّم «الفنار» أطباقًا إماراتية منزلية.",
        },
      },
      {
        heading: { hy: "Փողոցային ուտելիք և կարակ թեյ", en: "Street food and karak tea", ru: "Уличная еда и чай карак", ar: "أكل الشارع وشاي الكرك" },
        body: {
          hy: "Դուբայի իսկական համը փոքր սրճարաններում է՝ շաուրմա, ֆալաֆել և կաթով ու համեմունքներով կարակ թեյ։ Փորձեք Al Ustad Special Kebab-ը, որը գործում է 1978 թվականից, և պակիստանյան Ravi Restaurant-ը Սաթվայում։",
          en: "Dubai's real flavour is in its small cafeterias — shawarma, falafel and spiced milky karak tea. Try Al Ustad Special Kebab, running since 1978, and the Pakistani favourite Ravi Restaurant in Satwa.",
          ru: "Настоящий вкус Дубая — в маленьких кафетериях: шаурма, фалафель и пряный чай карак с молоком. Загляните в Al Ustad Special Kebab, работающий с 1978 года, и пакистанский Ravi Restaurant в Сатве.",
          ar: "النكهة الحقيقية لدبي في مطاعمها الصغيرة: الشاورما والفلافل وشاي الكرك بالحليب والبهارات. جرّب «الأستاذ للكباب» العامل منذ 1978، ومطعم «رافي» الباكستاني الشهير في السطوة.",
        },
      },
      {
        heading: { hy: "Ծովափին՝ JBR և Լա Մեր", en: "By the sea: JBR and La Mer", ru: "У моря: JBR и Ла Мер", ar: "على البحر: جي بي آر ولا مير" },
        body: {
          hy: "Երեկոյան ընթրիքի համար ընտրեք The Walk-ը JBR-ում կամ Լա Մեր լողափը։ Ռեստորանները բաց դռներով են, կան մանկական խաղահրապարակներ և մայրամուտի տեսարան։",
          en: "For dinner, head to The Walk at JBR or La Mer beach — open-air restaurants, play areas for kids and sunset views over the Gulf.",
          ru: "На ужин отправляйтесь на The Walk в JBR или на пляж Ла Мер: рестораны под открытым небом, детские площадки и закат над заливом.",
          ar: "للعشاء توجّه إلى «ذا ووك» في جي بي آر أو شاطئ لا مير: مطاعم في الهواء الطلق ومناطق لعب للأطفال وغروب فوق الخليج.",
        },
      },
      {
        heading: { hy: "Օգտակար խորհուրդներ", en: "Good to know", ru: "Полезно знать", ar: "معلومات مفيدة" },
        body: {
          hy: "Ալկոհոլ մատուցվում է միայն լիցենզավորված վայրերում, հիմնականում հյուրանոցներում։ Ռամադանի ընթացքում ցերեկը շատ ռեստորաններ աշխատում են այլ ժամանակացույցով։ Թեյավճարը պարտադիր չէ, բայց 10%-ը ընդունված է։",
          en: "Alcohol is served only in licensed venues, mostly hotels. During Ramadan many restaurants change their daytime hours. Tipping isn't required, but 10% is appreciated.",
          ru: "Алкоголь подают только в лицензированных заведениях, в основном в отелях. Во время Рамадана многие рестораны днём меняют график. Чаевые не обязательны, но 10% приняты.",
          ar: "تُقدَّم المشروبات الكحولية في الأماكن المرخّصة فقط، ومعظمها في الفنادق. خلال رمضان تغيّر مطاعم كثيرة ساعات عملها نهارًا. الإكرامية غير إلزامية لكن 10٪ أمر مستحسن.",
        },
      },
    ],
  },
  {
    slug: "harabia-now-in-qatar",
    kind: "news",
    publishedAt: "2026-09-05",
    city: "Doha",
    country: "Qatar",
    readMinutes: 2,
    title: {
      hy: "HArabia-ն այժմ Կատարում է՝ հյուրանոցներ և տրանսֆերներ Դոհայում",
      en: "HArabia is now in Qatar: hotels and transfers in Doha",
      ru: "HArabia теперь в Катаре: отели и трансферы в Дохе",
      ar: "HArabia الآن في قطر: فنادق وتنقلات في الدوحة",
    },
    titleHighlight: { hy: "այժմ Կատարում է", en: "now in Qatar", ru: "теперь в Катаре", ar: "الآن في قطر" },
    excerpt: {
      hy: "Այժմ կարող եք ամրագրել հյուրանոցներ, օդանավակայանային տրանսֆերներ և տուրեր Դոհայում՝ ԱՄԷ-ի կողքին։",
      en: "You can now book hotels, airport transfers and tours in Doha, alongside the UAE.",
      ru: "Теперь можно бронировать отели, трансферы из аэропорта и туры в Дохе — вдобавок к ОАЭ.",
      ar: "يمكنك الآن حجز الفنادق والتنقلات من المطار والجولات في الدوحة إلى جانب الإمارات.",
    },
    sections: [
      {
        heading: { hy: "Ինչ կարող եք ամրագրել", en: "What you can book", ru: "Что можно забронировать", ar: "ما الذي يمكنك حجزه" },
        body: {
          hy: "Քաղաքային և ծովափնյա հյուրանոցներ Դոհայում, համատեղ և անհատական տրանսֆերներ Համադ միջազգային օդանավակայանից և քաղաքային տուրեր՝ Իսլամական արվեստի թանգարան, Սուկ Վակիֆ և Քաթարա։",
          en: "City and beach hotels in Doha, shared and private transfers from Hamad International Airport, and city tours taking in the Museum of Islamic Art, Souq Waqif and Katara.",
          ru: "Городские и пляжные отели в Дохе, сборные и индивидуальные трансферы из международного аэропорта Хамад и городские туры: Музей исламского искусства, Сук Вакиф и Катара.",
          ar: "فنادق المدينة والشاطئ في الدوحة، وتنقلات مشتركة وخاصة من مطار حمد الدولي، وجولات في المدينة تشمل متحف الفن الإسلامي وسوق واقف وكتارا.",
        },
      },
      {
        heading: { hy: "Հյուրանոցի ամրագրումը սահմանին", en: "Your hotel booking at the border", ru: "Бронь отеля на границе", ar: "حجز الفندق عند الوصول" },
        body: {
          hy: "Կատարը բազմաթիվ երկրների, այդ թվում Հայաստանի քաղաքացիներից, ժամանելիս պահանջում է հաստատված հյուրանոցային ամրագրում։ HArabia-ի միջոցով ամրագրելիս հաստատումը կստանաք անմիջապես։",
          en: "Qatar asks visitors from many countries, including Armenia, to show a confirmed hotel booking on arrival. When you book with HArabia you get that confirmation straight away.",
          ru: "Катар просит путешественников из многих стран, включая Армению, показать на въезде подтверждённую бронь отеля. Бронируя через HArabia, вы получаете подтверждение сразу.",
          ar: "تطلب قطر من الزوار من دول كثيرة، منها أرمينيا، إبراز حجز فندقي مؤكد عند الوصول. عند الحجز مع HArabia تحصل على التأكيد فورًا.",
        },
      },
      {
        heading: { hy: "Շուտով", en: "Coming next", ru: "Скоро", ar: "قريبًا" },
        body: {
          hy: "Հաջորդը Օմանն է։",
          en: "Oman is next.",
          ru: "Следующий на очереди — Оман.",
          ar: "عُمان هي التالية.",
        },
      },
    ],
  },
  {
    slug: "best-time-to-visit-uae",
    kind: "guide",
    publishedAt: "2026-08-28",
    country: "UAE",
    readMinutes: 4,
    title: {
      hy: "Երբ գնալ ԱՄԷ՝ եղանակն ըստ ամիսների և ինչպես խնայել",
      en: "When to visit the UAE: the weather month by month, and how to save",
      ru: "Когда ехать в ОАЭ: погода по месяцам и как сэкономить",
      ar: "متى تزور الإمارات: الطقس شهرًا بشهر وكيف توفّر",
    },
    titleHighlight: { hy: "Երբ գնալ ԱՄԷ", en: "When to visit the UAE", ru: "Когда ехать в ОАЭ", ar: "متى تزور الإمارات" },
    excerpt: {
      hy: "Ձմեռը կատարյալ է լողափի և անապատի համար, ամառը՝ թանկարժեք հյուրանոցների համար էժան։ Ընտրեք ձեր սեզոնը։",
      en: "Winter is perfect for beaches and the desert; summer is when luxury hotels get cheap. Pick your season.",
      ru: "Зима идеальна для пляжа и пустыни, а летом дорогие отели становятся дешёвыми. Выбирайте свой сезон.",
      ar: "الشتاء مثالي للشواطئ والصحراء، والصيف هو موسم الأسعار المنخفضة للفنادق الفاخرة. اختر موسمك.",
    },
    sections: [
      {
        heading: { hy: "Նոյեմբեր–մարտ՝ լավագույն եղանակ", en: "November–March: the best weather", ru: "Ноябрь–март: лучшая погода", ar: "نوفمبر–مارس: أفضل طقس" },
        body: {
          hy: "Ցերեկը 23–30°C, զով երեկոներ և տաք ծով։ Իդեալական է լողափի, անապատային սաֆարիի և քաղաքում զբոսնելու համար։ Սա նաև ամենաթանկ սեզոնն է, հատկապես Ամանորին, ուստի ամրագրեք վաղ։",
          en: "Days of 23–30°C, cool evenings and a warm sea — ideal for beaches, desert safaris and walking the city. It is also peak season, especially over New Year, so book early.",
          ru: "Днём 23–30°C, прохладные вечера и тёплое море — идеально для пляжа, сафари и прогулок по городу. Это и самый дорогой сезон, особенно на Новый год, поэтому бронируйте заранее.",
          ar: "نهار بين 23 و30 درجة، وأمسيات لطيفة وبحر دافئ، وهو مثالي للشواطئ والسفاري والتنزه في المدينة. وهو أيضًا موسم الذروة خاصة في رأس السنة، فاحجز مبكرًا.",
        },
      },
      {
        heading: { hy: "Ապրիլ–մայիս և հոկտեմբեր", en: "April–May and October", ru: "Апрель–май и октябрь", ar: "أبريل–مايو وأكتوبر" },
        body: {
          hy: "Ավելի շոգ է, բայց դեռ հարմար՝ առավոտյան լողափ, կեսօրին թանգարաններ և առևտրի կենտրոններ։ Գները զգալիորեն ցածր են ձմռանից։",
          en: "Hotter but still comfortable if you plan around it: beach in the morning, museums and malls at midday. Prices are well below winter.",
          ru: "Жарче, но вполне комфортно, если планировать день: утром пляж, днём музеи и торговые центры. Цены заметно ниже зимних.",
          ar: "أكثر حرارة لكنه مريح مع التخطيط: الشاطئ صباحًا والمتاحف ومراكز التسوق ظهرًا. والأسعار أقل بكثير من الشتاء.",
        },
      },
      {
        heading: { hy: "Հունիս–սեպտեմբեր՝ շոգ և էժան", en: "June–September: hot and cheap", ru: "Июнь–сентябрь: жарко и дёшево", ar: "يونيو–سبتمبر: حار ورخيص" },
        body: {
          hy: "Ջերմաստիճանը հաճախ անցնում է 40°C-ից, բայց հինգաստղանի հյուրանոցներն այս ժամանակ ամենաէժանն են։ Ընտրեք լողավազանով ռեզորտ և փակ զբոսայգիներ, իսկ դուրս գնացեք վաղ առավոտյան կամ երեկոյան։",
          en: "Temperatures often top 40°C, but five-star hotels are at their cheapest. Choose a resort with a good pool and indoor attractions, and go out early morning or after sunset.",
          ru: "Температура часто выше 40°C, но пятизвёздочные отели в это время самые дешёвые. Выбирайте курорт с хорошим бассейном и крытые развлечения, а гуляйте рано утром или вечером.",
          ar: "تتجاوز الحرارة غالبًا 40 درجة، لكن فنادق الخمس نجوم تكون في أرخص أسعارها. اختر منتجعًا بمسبح جيد وأنشطة داخلية واخرج في الصباح الباكر أو بعد الغروب.",
        },
      },
      {
        heading: { hy: "Ռամադան", en: "Ramadan", ru: "Рамадан", ar: "رمضان" },
        body: {
          hy: "Ռամադանի ամսաթվերն ամեն տարի փոխվում են։ Այդ ընթացքում ցերեկը չի կարելի ուտել ու խմել հանրային վայրերում, բայց երեկոները շատ մթնոլորտային են, իսկ հյուրանոցների գներն՝ ավելի ցածր։",
          en: "Ramadan moves each year. Avoid eating and drinking in public during daylight, but the evenings are wonderfully atmospheric and hotel prices are often lower.",
          ru: "Даты Рамадана каждый год меняются. Днём не стоит есть и пить в общественных местах, зато вечера очень атмосферные, а цены на отели часто ниже.",
          ar: "يتغيّر موعد رمضان كل عام. تجنّب الأكل والشرب علنًا في النهار، لكن الأمسيات مفعمة بالأجواء وغالبًا ما تنخفض أسعار الفنادق.",
        },
      },
    ],
  },
  {
    slug: "dubai-first-trip-3-days",
    kind: "guide",
    publishedAt: "2026-08-20",
    city: "Dubai",
    country: "UAE",
    readMinutes: 5,
    title: {
      hy: "Առաջին անգամ Դուբայում՝ ինչ տեսնել 3 օրում",
      en: "First time in Dubai: what to see in 3 days",
      ru: "Первый раз в Дубае: что посмотреть за 3 дня",
      ar: "أول مرة في دبي: ماذا ترى في 3 أيام",
    },
    titleHighlight: { hy: "Առաջին անգամ Դուբայում", en: "First time in Dubai", ru: "Первый раз в Дубае", ar: "أول مرة في دبي" },
    excerpt: {
      hy: "Բուրջ Խալիֆա, հին Դուբայ և անապատ՝ պատրաստի երթուղի առաջին այցի համար։",
      en: "Burj Khalifa, old Dubai and the desert — a ready-made plan for your first visit.",
      ru: "Бурдж-Халифа, старый Дубай и пустыня — готовый маршрут для первой поездки.",
      ar: "برج خليفة ودبي القديمة والصحراء: خطة جاهزة لزيارتك الأولى.",
    },
    sections: [
      {
        heading: { hy: "Օր 1՝ Դաունթաուն", en: "Day 1: Downtown", ru: "День 1: Даунтаун", ar: "اليوم 1: وسط المدينة" },
        body: {
          hy: "Բարձրացեք Բուրջ Խալիֆա մայրամուտից մի փոքր առաջ (տոմսերը գնեք նախապես), ապա զբոսնեք Dubai Mall-ում և երեկոյան դիտեք շատրվանների շոուն, որը սկսվում է ամեն կես ժամը մեկ։",
          en: "Go up the Burj Khalifa just before sunset (book tickets ahead), then wander Dubai Mall and watch the fountain show, which runs every half hour in the evening.",
          ru: "Поднимитесь на Бурдж-Халифу незадолго до заката (билеты купите заранее), затем погуляйте по Dubai Mall и посмотрите шоу фонтанов — вечером оно идёт каждые полчаса.",
          ar: "اصعد إلى برج خليفة قبيل الغروب (احجز التذاكر مسبقًا)، ثم تجوّل في دبي مول وشاهد عرض النافورة الذي يتكرر كل نصف ساعة مساءً.",
        },
      },
      {
        heading: { hy: "Օր 2՝ Հին Դուբայ", en: "Day 2: Old Dubai", ru: "День 2: Старый Дубай", ar: "اليوم 2: دبي القديمة" },
        body: {
          hy: "Սկսեք Ալ Ֆահիդի թաղամասից, ապա մեկ դիրհամով աբրա նավակով անցեք Քրիքը և այցելեք Ոսկու և համեմունքների շուկաները Դեյրայում։ Երեկոյան կարող եք տեսնել «Ապագայի թանգարանը» կամ Dubai Frame-ը։",
          en: "Start in the Al Fahidi quarter, cross the Creek on a one-dirham abra boat and explore the Gold and Spice Souks in Deira. In the evening, see the Museum of the Future or the Dubai Frame.",
          ru: "Начните с квартала Аль-Фахиди, переправьтесь через Крик на лодке абра за один дирхам и загляните на Золотой и Пряный рынки в Дейре. Вечером — Музей будущего или Dubai Frame.",
          ar: "ابدأ من حي الفهيدي، واعبر الخور بقارب العبرة مقابل درهم واحد، واستكشف سوقي الذهب والتوابل في ديرة. وفي المساء زُر متحف المستقبل أو برواز دبي.",
        },
      },
      {
        heading: { hy: "Օր 3՝ Լողափ և անապատ", en: "Day 3: Beach and desert", ru: "День 3: Пляж и пустыня", ar: "اليوم 3: الشاطئ والصحراء" },
        body: {
          hy: "Առավոտը անցկացրեք JBR կամ Kite Beach լողափում, իսկ կեսօրից հետո մեկնեք անապատային սաֆարիի՝ ավազաթմբեր, ուղտեր և ընթրիք աստղերի տակ։ Տուրերի մեծ մասն ընդգրկում է տրանսֆեր հյուրանոցից։",
          en: "Spend the morning at JBR or Kite Beach, then head out on an afternoon desert safari — dunes, camels and dinner under the stars. Most tours include hotel pick-up.",
          ru: "Утро проведите на пляже JBR или Kite Beach, а после обеда отправляйтесь на сафари: дюны, верблюды и ужин под звёздами. Большинство туров включают трансфер из отеля.",
          ar: "اقضِ الصباح في شاطئ جي بي آر أو كايت بيتش، ثم انطلق بعد الظهر في سفاري الصحراء: كثبان وجمال وعشاء تحت النجوم. تشمل معظم الجولات التوصيل من الفندق.",
        },
      },
      {
        heading: { hy: "Ինչպես տեղաշարժվել", en: "Getting around", ru: "Как передвигаться", ar: "التنقل" },
        body: {
          hy: "Մետրոն մաքուր է, էժան և կապում է օդանավակայանը, Դաունթաունն ու Մարինան։ Գնեք Nol քարտ և լիցքավորեք այն։ Տաքսիներն ու Careem, Uber հավելվածները հարմար են երեկոյան։",
          en: "The metro is clean, cheap and links the airport, Downtown and the Marina — buy a Nol card and top it up. Taxis and the Careem and Uber apps are easy in the evening.",
          ru: "Метро чистое, недорогое и связывает аэропорт, Даунтаун и Марину — купите карту Nol и пополните её. Вечером удобно пользоваться такси и приложениями Careem и Uber.",
          ar: "المترو نظيف ورخيص ويربط المطار ووسط المدينة والمارينا، فاشترِ بطاقة نول واشحنها. وسيارات الأجرة وتطبيقا كريم وأوبر مريحة في المساء.",
        },
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
