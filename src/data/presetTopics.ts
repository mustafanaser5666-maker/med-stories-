import { StorySlide } from '../types/story';
import { DEFAULT_ILLUSTRATIONS } from './cartoonLibrary';

export interface PresetTopic {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  icon: string;
  defaultCaption: string;
  slides: StorySlide[];
}

export const PRESET_TOPICS: PresetTopic[] = [
  {
    id: 'fever_management',
    category: 'طوارئ وشائع',
    title: 'الصخونة عند الرضيع 🌡️',
    subtitle: 'شوكت تخافين وشوكت تطمنين وطريقة الكمادات الصح',
    icon: '🌡️',
    defaultCaption: `يا أمهاتنا الحبابات، الصخونة مو عدو للطفل.. الصخونة معناها جهاز المناعة ديحارب الفايروس! 
شوفوا الستوريات حتى تعرفون شلون تتعاملون ويا الحرارة وتتجنبون الأخطاء الشائعة اللي تضر الطفل.
احفظوا البوست وشاركوه ويا كل أم جديدة 🤍
#طب_اطفال_العراق #صحة_الرضيع #صخونة_الطفل #اطفال_بغداد #دكتور_اطفال`,
    slides: [
      {
        id: 'fever_1',
        slideNumber: 1,
        badge: 'سؤال يوصلني يومية ❓',
        title: 'طفلي مصخن ومحتارة شسوي؟',
        subtitle: 'أول شي لا تنخبصين.. اهدي واقري الخطوات',
        mainText: 'يا أمهاتنا الحبابات.. الصخونة مو مرض بحد ذاته، هي مجرد جرس إنذار يكول إنو جسم الطفل ديصنع أجسام مضادة ويقاوم الفايروس 💪',
        bulletPoints: [
          'الحرارة الطبيعية من 36.5 إلى 37.5 درجة مئوية',
          'فوق 38 نعتبرها صخونة وتستوجب المتابعة',
          'أهم شي هو نشاط الطفل ورضاعته مو بس رقم المحرار'
        ],
        sticker: {
          type: 'poll',
          question: 'تلفين الطفل بالبطانية من يصخن؟',
          optionA: 'أي حتى يعرگ 🥶',
          optionB: 'لا أخفف ملابسه ✅',
        },
        illustration: {
          key: 'baby_fever',
          url: DEFAULT_ILLUSTRATIONS.baby_fever.url,
          label: 'بيبي مصخن 🤒',
          position: 'top',
          size: 'medium',
          shape: 'rounded',
        },
        colorTheme: 'teal_mint',
        footerNote: 'عافيات على جهالنا 🤍 | اسحبي لليسار للتكملة',
      },
      {
        id: 'fever_2',
        slideNumber: 2,
        badge: 'خرافة شائعة ❌ الصح ✅',
        title: 'الكمادات الصح والخطأ القاتل!',
        subtitle: 'ممنوع الثلج والمي البارد نهائياً',
        mainText: 'أكبر غلط تسويه الأم هو كمادات المي البارد أو الكحول والخل! هذا يسبب صدمة للأوعية الدموية ويرفع الحرارة الداخلية أكثر!',
        bulletPoints: [
          'استخدمي مي بوري فاتر (دافي مائل للبرودة الخفيفة)',
          'مكان الكمادات: الرقبة، الإبطين، وأعلى الفخذين (مو الگصة)',
          'خففي ملابس الطفل لطبقة قطنية وحدة خفيفة بغرفة مهواة'
        ],
        sticker: {
          type: 'quiz',
          question: 'وين أنسب مكان نحط الكمادات للبيبي؟',
          optionA: 'على الگصة (الجبهة)',
          optionB: 'تحت الإبط والرقبة',
          correctOption: 'B',
        },
        illustration: {
          key: 'pediatrician',
          url: DEFAULT_ILLUSTRATIONS.pediatrician.url,
          label: 'د. مصطفى الحسيني 🩺',
          position: 'top',
          size: 'small',
          shape: 'circle',
        },
        colorTheme: 'teal_mint',
        footerNote: 'المي الفاتر يبرد الدم بأمان بدون ما يرجف الطفل 🤍',
      },
      {
        id: 'fever_3',
        slideNumber: 3,
        badge: 'جرعة الدواء ⚖️',
        title: 'جرعة البراسيتول والخافض',
        subtitle: 'تعتمد على وزن الطفل مو عمره!',
        mainText: 'الأمهات يسألوني: دكتور انطيته ملعقة ومفاد؟ الجرعة تنحسب بالمليغرام لكل كيلوغرام من وزن الطفل، مو حسب العمر ولا بالملاعق العادية.',
        bulletPoints: [
          'استخدمي السرنجة المرفقة بالعلبة لقياس السيسي (ml) بدقة',
          'البراسيتول كل 4 إلى 6 ساعات عند اللزوم وبجرعة محسوبة',
          'ممنوع البروفين قبل عمر 6 أشهر إطلاقاً، وممنوع الأسبرين للأطفال'
        ],
        sticker: {
          type: 'slider',
          question: 'شكد تخافين وتتوترين من يصخن طفلج؟',
          sliderEmoji: '🥺',
        },
        illustration: {
          key: 'baby_fever',
          url: DEFAULT_ILLUSTRATIONS.baby_fever.url,
          label: 'قياس الحرارة 🌡️',
          position: 'center',
          size: 'medium',
          shape: 'rounded',
        },
        colorTheme: 'teal_mint',
        footerNote: 'وزني طفلك بصيدلية أو عيادة لحساب الجرعة الدقيقة ⚖️',
      },
      {
        id: 'fever_4',
        slideNumber: 4,
        badge: 'علامات الخطر 🚨',
        title: 'شوكت تروحين للمستشفى فوراً؟',
        subtitle: 'علامات حمراء لا تنتظرين وياها بالبيت',
        mainText: 'إذا شفتي وحدة من هاي العلامات، لا تسألين بالفيس بوك ولا تنتظرين باجر.. للطوارئ فوراً:',
        bulletPoints: [
          'عمر الطفل أقل من 3 أشهر وحرارته 38 فما فوق',
          'خمول شديد وما يكعد يرضع أو يبجي بدون صوت',
          'صعوبة بالتنفس وتشنج أو طفح جلدي لونه غامق ميروح بالضغط',
          'استمرار الحرارة أكثر من 3 أيام متتالية'
        ],
        sticker: {
          type: 'question',
          question: 'عندج سؤال محيرج عن صخونة طفلج؟ كتبي هنا 👇',
        },
        illustration: {
          key: 'pediatrician',
          url: DEFAULT_ILLUSTRATIONS.pediatrician.url,
          label: 'سلامة طفلج أولاً 🩺',
          position: 'top',
          size: 'medium',
          shape: 'circle',
        },
        colorTheme: 'teal_mint',
        footerNote: 'الله يحفظ أطفالنا من كل شر وعافيات عليهم 🤲',
      },
    ],
  },
  {
    id: 'teething_pain',
    category: 'مراحل النمو',
    title: 'التسنين وشگ السن 🦷',
    subtitle: 'العضاضة، اللعاب، والمغص المرافق بدون أدوية خطرة',
    icon: '🦷',
    defaultCaption: `من يبدي شگ السن، يبدي السهر والبجي وسيلان اللعاب! 👶
بهالستوري لخصتلكم الطرق الآمنة لتسكين وجع لثة الرضيع، وليش لازم نبتعد عن الجل المخدر.
#تسنين_الاطفال #اسنان_الرضيع #طب_اطفال_العراق #امهات_العراق`,
    slides: [
      {
        id: 'teeth_1',
        slideNumber: 1,
        badge: 'مرحلة جديدة 👶',
        title: 'طفلي يريّل ويعض بإيده.. هل هذا تسنين؟',
        subtitle: 'يبدي غالباً بين عمر 4 إلى 7 أشهر',
        mainText: 'يا ماما، التسنين مرحلة فسيولوجية طبيعية، والطفل يحس بحكة ووجع باللثة من يبدي السن يشگ طريقه للخارج ✨',
        bulletPoints: [
          'كثرة اللعاب (الريال) وعض الأصابع والألعاب',
          'انتفاخ اللثة واحمرارها الخفيف',
          'نكد وتقلب بالنوم وقلة شهية مؤقتة'
        ],
        sticker: {
          type: 'poll',
          question: 'بأي شهر طلع أول سن لطفلج؟',
          optionA: 'قبل الـ 6 أشهر 🐣',
          optionB: 'بعد الـ 7 أشهر 👶',
        },
        illustration: {
          key: 'baby_eating',
          url: DEFAULT_ILLUSTRATIONS.baby_eating.url,
          label: 'بيبي والتسنين 🦷',
          position: 'top',
          size: 'medium',
          shape: 'rounded',
        },
        colorTheme: 'soft_pink',
        footerNote: 'تأخر أول سن للسنة الأولى طبيعي وما يدعو للقلق 🤍',
      },
      {
        id: 'teeth_2',
        slideNumber: 2,
        badge: 'تحذير طبي صريح ⚠️',
        title: 'ممنوع جل التسنين المخدر!',
        subtitle: 'يحتوي على مواد تضر عضلة قلب الرضيع والبلع',
        mainText: 'منظمة الغذاء والدواء العالمية (FDA) حذرت بشدة من جل التسنين اللي يحتوي على البنزوكائين أو الليدوكائين للأطفال الرضع.',
        bulletPoints: [
          'يسبب تخدير بالحلق ومشاكل بالبلع والشرقة',
          'ممكن يسبب حالة نادرة وخطيرة تسمى الميتهيموغلوبين',
          'البديل الآمن والفعال طبيعياً متوفر ورخيص بكل بيت!'
        ],
        sticker: {
          type: 'quiz',
          question: 'هل جل التسنين المخدر آمن للرضيع؟',
          optionA: 'نعم عادي إذا نقطة',
          optionB: 'لا خطر وممنوع دولياً',
          correctOption: 'B',
        },
        illustration: {
          key: 'pediatrician',
          url: DEFAULT_ILLUSTRATIONS.pediatrician.url,
          label: 'تنبيه الطبيب 🩺',
          position: 'center',
          size: 'small',
          shape: 'circle',
        },
        colorTheme: 'soft_pink',
        footerNote: 'صحة البيبي خط أحمر دايماً 🌸',
      },
      {
        id: 'teeth_3',
        slideNumber: 3,
        badge: 'الحلول السحرية الآمنة 💡',
        title: 'شلون تريحين لثة طفلج؟',
        subtitle: 'طرق طبيعية مثبتة تخفف الألم 100%',
        mainText: 'شغلات بسيطة تسويها الأم بالبيت تسوي مفعول السحر وتهدي البيبي بدون ما نلجأ للأدوية:',
        bulletPoints: [
          'عضاضة سيليكون نظيفة مبردة بالثلاجة (مو بالمجمدة)',
          'مساج اللثة بإصبع الأم النظيف أو شاشة مبللة بمي بارد',
          'إذا الوجع كلش قوي ومسبب بجي هستيري: جرعة براسيتول محسوبة باستشارة الطبيب'
        ],
        sticker: {
          type: 'slider',
          question: 'شكد طفلج يحب العضاضة الباردة؟',
          sliderEmoji: '😍',
        },
        illustration: {
          key: 'baby_sleeping',
          url: DEFAULT_ILLUSTRATIONS.baby_sleeping.url,
          label: 'نوم هادئ 🌙',
          position: 'center',
          size: 'medium',
          shape: 'rounded',
        },
        colorTheme: 'soft_pink',
        footerNote: 'عافيات على سنونهم الحلوة 🤍',
      },
    ],
  },
  {
    id: 'colic_and_gas',
    category: 'حديثي الولادة',
    title: 'المغوصة والغازات عند البيبي 🍼',
    subtitle: 'ليش يبجي بالليل وطريقة التگريع ومساج البطن الصح',
    icon: '🍼',
    defaultCaption: `مغص وغازات أول 3 أشهر كابوس كل أم وأب عراقي! 
تعالوا نشوف الحلول العلمية للتگريع ومساج الدراجة وشلون نهدئ البيبي بدون أعشاب ضارة.
#مغص_الرضع #غازات_البيبي #حديثي_الولادة #اطفال_العراق`,
    slides: [
      {
        id: 'colic_1',
        slideNumber: 1,
        badge: 'سهر الليالي 🥱',
        title: 'البيبي يرفع رجليه ويبجي كل مغربية؟',
        subtitle: 'هذا هو مغص الرضع الشهير (Colic)',
        mainText: 'يا ماما، جهاز الطفل الهضمي بعده غير ناضج، ومن يرضع يبلع هوا، فتتجمع فقاعات هوائية ببطنه وتضغط عليه وتسببله مغوصة مؤلمة!',
        bulletPoints: [
          'يبدي غالباً بعمر أسبوعين ويوصل ذروته بالشهر الثاني',
          'يقل تدريجياً ويختفي تماماً بعمر 3 إلى 4 أشهر',
          'البكاء يكون على شكل نوبات بالمساء والطفل يشد على روحه'
        ],
        sticker: {
          type: 'poll',
          question: 'طفلج يعاني من المغص بالليل؟',
          optionA: 'أي يومية سهرانين 😭',
          optionB: 'الحمد لله قليل 👶',
        },
        illustration: {
          key: 'baby_fever',
          url: DEFAULT_ILLUSTRATIONS.baby_fever.url,
          label: 'بكاء المغص 🥺',
          position: 'top',
          size: 'medium',
          shape: 'rounded',
        },
        colorTheme: 'warm_amber',
        footerNote: 'فترة وتعدي وتصير ذكريات.. تحلي بالصبر يا غالية 🤍',
      },
      {
        id: 'colic_2',
        slideNumber: 2,
        badge: 'التكنيك الصحيح 💡',
        title: 'طريقة التگريع ومساج البطن',
        subtitle: 'حركات سحرية تطلع الهوا بدقائق',
        mainText: 'لا تنتظرين يخلص الرضاعة كاملة حتى تكرعيه! كرعيه بنص الرضعة وبعد نهايتها على كتفج مع ضربات خفيفة ومستمرة على الظهر.',
        bulletPoints: [
          'تمرين حركة البايسكل (الدراجة) برجلين الطفل برفق',
          'مساج البطن باتجاه عقارب الساعة بزيت زيتون دافئ خفيف',
          'وضعية التماسيح: حمل الطفل على بطنه فوق ذراع الأب أو الأم'
        ],
        sticker: {
          type: 'slider',
          question: 'شكد فادت حركة البايسكل ويا طفلج؟',
          sliderEmoji: '🚲',
        },
        illustration: {
          key: 'baby_sleeping',
          url: DEFAULT_ILLUSTRATIONS.baby_sleeping.url,
          label: 'راحة واسترخاء 🌙',
          position: 'center',
          size: 'medium',
          shape: 'rounded',
        },
        colorTheme: 'warm_amber',
        footerNote: 'الحركات الهادئة تخرج الغازات العالقة فوراً 👶',
      },
      {
        id: 'colic_3',
        slideNumber: 3,
        badge: 'تحذير الجدات ❌',
        title: 'ديروا بالكم من مغلي النعناع والأعشاب!',
        subtitle: 'ممنوع إعطاء أي منقوع عشبي للرضيع',
        mainText: 'كلش هواية أمهات ينطون ماي غريب أو مغلي نعناع وكراوية.. أمعاء الرضيع ما تتحمل وهاي الأعشاب قد تحتوي على بكتيريا أو مبيدات وزيوت طيارة تضر الكبد والكلى!',
        bulletPoints: [
          'حليب الأم أو الحليب الصناعي فقط أول 6 أشهر',
          'قطرات طاردة للغازات (مثل السيميثيكون) مأمونة بوصفة الطبيب',
          'الضوضاء البيضاء (صوت السشوار أو المكنسة) تهدئ الجهاز العصبي للبيبي'
        ],
        sticker: {
          type: 'question',
          question: 'شنو أغرب نصيحة كالوها الج علمود غازات البيبي؟ 😂',
        },
        illustration: {
          key: 'pediatrician',
          url: DEFAULT_ILLUSTRATIONS.pediatrician.url,
          label: 'نصيحة الطبيب 🩺',
          position: 'top',
          size: 'small',
          shape: 'circle',
        },
        colorTheme: 'warm_amber',
        footerNote: 'صحة جهاز طفلك الهضمي أمانة.. لا تجازفين بخلطات شعبية 🤍',
      },
    ],
  },
  {
    id: 'complementary_feeding',
    category: 'التغذية والنمو',
    title: 'أكل البيبي بالشهر السادس 🥣',
    subtitle: 'قاعدة الـ 3 أيام، ممنوعات السنة الأولى، وجدول البداية',
    icon: '🥣',
    defaultCaption: `وصل طفلج لـ 6 أشهر ومتحمسة توكليه؟ 🥳
لا تبدين عشوائي حتى تتجنبين الحساسية وسوء الهضم.
اقري ستورياتنا عن قاعدة الـ 3 أيام وشوربة الخضار الأولى!
#اكل_الرضع #تغذية_الطفل #الشهر_السادس #طبيب_اطفال_العراق`,
    slides: [
      {
        id: 'food_1',
        slideNumber: 1,
        badge: 'المحطة الذهبية 🌟',
        title: 'علامات جاهزية طفلج للأكل التكميلي',
        subtitle: 'ليش ننتظر إكمال الشهر السادس؟',
        mainText: 'منظمة الصحة العالمية واليونيسيف توصي ببدء الأكل عند إكمال 6 أشهر. الطفل لازم يثبت رگبته ويهتم بأكل الكبار وراحت منه حركة دفع اللسان للخارج!',
        bulletPoints: [
          'الجلوس بمسند قوي وثبات الرأس والرقبة تماماً',
          'إظهار الشغف وفتح الفم عند رؤية الملعقة',
          'الأكل مكمل لحليب الأم وليس بديلاً عنه في البداية'
        ],
        sticker: {
          type: 'poll',
          question: 'بديتي أكل لطفلج بأي شهر؟',
          optionA: 'بالشهر الرابع 🥣',
          optionB: 'بالشهر السادس ✅',
        },
        illustration: {
          key: 'baby_eating',
          url: DEFAULT_ILLUSTRATIONS.baby_eating.url,
          label: 'أول وجبة 🥣',
          position: 'top',
          size: 'medium',
          shape: 'rounded',
        },
        colorTheme: 'baby_blue',
        footerNote: 'المعدة والأمعاء تكون مكتملة وناضجة بالشهر السادس 🤍',
      },
      {
        id: 'food_2',
        slideNumber: 2,
        badge: 'القاعدة الذهبية ⚖️',
        title: 'قاعدة الـ 3 أيام لكل صنف جديد',
        subtitle: 'حتى نكتشف أي حساسية فوراً',
        mainText: 'ممنوع تخلطين 3 أو 4 خضروات بأول يوم! اختاري صنف واحد (مثل الكوسا المسلوقة والمهروسة ناعماً أو الجزر)، واستمري عليه 3 أيام متتالية لمراقبة أي طفح أو إسهال.',
        bulletPoints: [
          'يوم 1، 2، 3: صنف واحد فقط بملعقة صغيرة مهروسة',
          'إذا ما صار حساسية.. نضيف الصنف الثاني وهكذا',
          'القوام بالبداية يكون ناعم جداً مائل للسيولة'
        ],
        sticker: {
          type: 'quiz',
          question: 'شنو أول وجبة تنطينها للطفل بالشهر السادس؟',
          optionA: 'خضار مسلوقة ومهروسة صنف واحد',
          optionB: 'بسكوت وشاي أو حليب بقري',
          correctOption: 'A',
        },
        illustration: {
          key: 'baby_eating',
          url: DEFAULT_ILLUSTRATIONS.baby_eating.url,
          label: 'تغذية صحية 🥦',
          position: 'center',
          size: 'medium',
          shape: 'rounded',
        },
        colorTheme: 'baby_blue',
        footerNote: 'الصبر أساس تعويد براعم تذوق الطفل على النكهات الطبيعية 🌸',
      },
      {
        id: 'food_3',
        slideNumber: 3,
        badge: 'قائمة الممنوعات ❌',
        title: 'ممنوعات طعام قبل عمر السنة!',
        subtitle: 'أكلات تشكل خطراً حقيقياً على صحة الرضيع',
        mainText: 'يا ماما، هاي الأطعمة ممنوعة قطعياً قبل أن يكمل الطفل عامه الأول لحمايته من التسمم والأمراض:',
        bulletPoints: [
          'العسل الطبيعي (يسبب التسمم الوشيقي للرضع Botulism)',
          'الملح والسكر (يجهد الكلى ويخرب حاسة التذوق)',
          'حليب الأبقار السائل كشراب رئيسي (يسبب فقر دم ونزف مجهري بالأمعاء)',
          'المكسرات والحبوب الكاملة (خطر الاختناق والشرقة)'
        ],
        sticker: {
          type: 'question',
          question: 'شنو أكثر أكلة طفلك حبها بأول تجربة؟ 😋',
        },
        illustration: {
          key: 'pediatrician',
          url: DEFAULT_ILLUSTRATIONS.pediatrician.url,
          label: 'صحة أطفالنا 🩺',
          position: 'top',
          size: 'small',
          shape: 'circle',
        },
        colorTheme: 'baby_blue',
        footerNote: 'ألف صحة وهنا على أبطالنا الصغار 🥣🤍',
      },
    ],
  },
  {
    id: 'vaccines_and_fever',
    category: 'الوقاية والمناعة',
    title: 'لقاحات الطفل والصخونة 💉',
    subtitle: 'ليش ممنوع الخافض قبل اللقاح وكمادات الرجل المتورمة',
    icon: '💉',
    defaultCaption: `موعد لقاح الشهرين أو الأربعة وخايفة من الصخونة والورم؟
تعرفي على السبب ليش الأطباء يمنعون إعطاء البراسيتول قبل إبرة اللقاح، وشنو الإجراء الصح بعده!
#لقاحات_الاطفال #تطعيم_الرضع #طب_اطفال #صحة_الطفل`,
    slides: [
      {
        id: 'vac_1',
        slideNumber: 1,
        badge: 'غلطة شائعة جداً ❌',
        title: 'تنطين خافض حرارة قبل ما تاخذين الطفل للمركز الصحي؟',
        subtitle: 'وقفي هذا التصرف فوراً!',
        mainText: 'الأبحاث الطبية أثبتت أن إعطاء البراسيتول الوقائي قبل اللقاح أو مع الإبرة مباشرة يقلل من استجابة الجهاز المناعي لإنتاج الأجسام المضادة!',
        bulletPoints: [
          'ننتظر تصعد الحرارة فعلياً وبعدين ننطي الخافض',
          'الخافض يعطى فقط إذا ارتفعت حرارة الطفل فوق 38 أو بكى بألم شديد',
          'رد الفعل المناعي هو دليل على إن اللقاح ديشتغل بجسم البيبي'
        ],
        sticker: {
          type: 'poll',
          question: 'كنتي تنطين خافض قبل اللقاح؟',
          optionA: 'أي جنت اسويها 😅',
          optionB: 'لا انتظر الحرارة ✅',
        },
        illustration: {
          key: 'baby_fever',
          url: DEFAULT_ILLUSTRATIONS.baby_fever.url,
          label: 'مناعة قوية 💉',
          position: 'top',
          size: 'medium',
          shape: 'rounded',
        },
        colorTheme: 'lavender',
        footerNote: 'اللقاح أعظم درع حماية يحمي طفلك من أمراض خطيرة 🛡️',
      },
      {
        id: 'vac_2',
        slideNumber: 2,
        badge: 'علاج التورم والوجع 🩹',
        title: 'مكان الإبرة ورجل البيبي وارمة ومتحجرة؟',
        subtitle: 'خطوات بسيطة تريح رجل الطفل وتخفف الورم',
        mainText: 'طبيعي جداً يصير تورم خفيف واحمرار مكان وخز الإبرة في فخذ الرضيع لمدة 24 إلى 48 ساعة. إليك التعامل السليم:',
        bulletPoints: [
          'كمادات مي بارد خفيف على مكان الإبرة أول 24 ساعة (لتخفيف التورم)',
          'كمادات مي دافئ بعد مرور 24 ساعة لتنشيط الدورة الدموية',
          'ممنوع فرك أو تدليك مكان الإبرة بقوة نهائياً',
          'إرضاع الطفل وحضنه يعطيه إحساساً بالأمان ويسكن ألمه'
        ],
        sticker: {
          type: 'slider',
          question: 'شكد بچى طفلج باللقاح الأخير؟ 😢',
          sliderEmoji: '😭',
        },
        illustration: {
          key: 'pediatrician',
          url: DEFAULT_ILLUSTRATIONS.pediatrician.url,
          label: 'دكتور الأطفال 🩺',
          position: 'center',
          size: 'medium',
          shape: 'circle',
        },
        colorTheme: 'lavender',
        footerNote: 'بوسة وحضن دافي من ماما ينسيه كل وجع 🤍',
      },
    ],
  },
];
