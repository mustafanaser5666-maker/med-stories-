import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Generate Instagram Stories for Pediatric Medicine in Iraqi Dialect
app.post('/api/stories/generate', async (req: Request, res: Response) => {
  try {
    const {
      topic,
      customDetails,
      slideCount = 4,
      tone = 'friendly_iraqi',
      targetAge = 'infants',
      doctorName = 'د. مصطفى الحسيني',
      doctorTitle = 'أخصائي طب الأطفال وحديثي الولادة',
      clinicHandle = '@dr.er11',
    } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'يرجى تحديد موضوع الستوري' });
    }

    const systemInstruction = `
أنت طبيب أطفال عراقي استشاري وخبير محتوى طبي على إنستغرام.
مهمتك كتابة وتصميم سلسلة ستوريات إنستغرام (Instagram Stories) توعوية وتفاعلية عالية القيمة باللهجة العراقية اللطيفة والقريبة لقلب الأمهات والآباء العراقيين ("يا أمهاتنا الحبابات"، "عيني ماما"، "ديروا بالكم"، "الصخونة"، "الخافض"، "التگريع والمغوصة"، "التسنين"، "عافيات على جهالنا").

القواعد الطبية والمحتوى:
1. تقديم معلومات طبية دقيقة مبنية على إرشادات الأكاديمية الأمريكية لطب الأطفال (AAP) ومنظمة الصحة العالمية (WHO) ولكن بأسلوب عراقي شعبي راقي ومبسط.
2. تصحيح الخرافات الشائعة في المجتمع العراقي بلطف (مثل: لف الطفل بالبطانية وقت الصخونة، إعطاء شاي الأعشاب أو النعناع للرضع قبل 6 أشهر، إعطاء ماء للرضيع حديث الولادة، وضع كحل بالسرة، استعمال الجل المخدر للثة بالتسنين، وغيرها).
3. كل ستوري يجب أن يكون مصمماً ليناسب شاشة الهاتف والإنستغرام (نص موجز، نقاط واضحة، ملصق تفاعلي جذاب Poll/Quiz/Question/Slider).
4. الستوري الأولى تكون "خطاف جذاب" (Hook) وسؤال يشغل بال كل أم.
5. الستوريات الوسطى تكون نصائح عملية، صح وخطأ، وتوجيهات للأهل.
6. الستوري الأخيرة تكون ملخص أو تفاعل وملاحظة لمراجعة الطبيب عند علامات الخطر (Red Flags).
`;

    const prompt = `
المطلوب توليد سلسلة ستوري إنستغرام مكونة من ${slideCount} سلايدات حول الموضوع التالي:
الموضوع: "${topic}"
تفاصيل إضافية من الطبيب: "${customDetails || 'بدون تفاصيل إضافية'}"
الفئة العمرية المستهدفة: "${targetAge}"
أسلوب ونبرة الطرح: "${tone}"
اسم الطبيب: "${doctorName}"
لقب الطبيب: "${doctorTitle}"
حساب الإنستغرام: "${clinicHandle}"

أخرج النتيجة بصيغة JSON متطابقة مع المخطط التالي تماماً:
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topicTitle: { type: Type.STRING, description: 'عنوان الموضوع الرئيسي بالعامية العراقية' },
            caption: { type: Type.STRING, description: 'كابشن مقترح لنشر الستوري أو البوست مع هاشتاغات عراقية' },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  slideNumber: { type: Type.INTEGER },
                  badge: { type: Type.STRING, description: 'شارة صغيرة مثل: تنبيه مهم ⚠️ أو خرافة شائعة ❌ أو نصيحة ذهبية 💡' },
                  title: { type: Type.STRING, description: 'عنوان السلايد باللهجة العراقية بخط عريض' },
                  subtitle: { type: Type.STRING, description: 'عنوان فرعي توضيحي' },
                  mainText: { type: Type.STRING, description: 'النص الأساسي باللهجة العراقية الحنينة والمريحة' },
                  bulletPoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'نقاط طبية مركزة ومختصرة'
                  },
                  sticker: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING, description: 'poll أو quiz أو question أو slider أو tip' },
                      question: { type: Type.STRING, description: 'سؤال الملصق التفاعلي' },
                      optionA: { type: Type.STRING, description: 'الخيار الأول (للتصويت أو الاختبار)' },
                      optionB: { type: Type.STRING, description: 'الخيار الثاني' },
                      correctOption: { type: Type.STRING, description: 'A أو B في حال كان quiz' },
                      sliderEmoji: { type: Type.STRING, description: 'إيموجي مقياس السلايدر مثل 🥺 أو 🤒 أو 👶' },
                    },
                    required: ['type', 'question']
                  },
                  suggestedIllustration: {
                    type: Type.STRING,
                    description: 'نوع الرسم الكرتوني المناسب: pediatrician أو baby_fever أو baby_eating أو baby_sleeping'
                  },
                  colorTheme: {
                    type: Type.STRING,
                    description: 'سمة اللون: teal_mint أو soft_pink أو baby_blue أو warm_amber أو lavender'
                  },
                  footerNote: { type: Type.STRING, description: 'عبارة ختامية لطيفة مثل: عافيات على أطفالنا 🤍 | استشيري طبيب طفلك' }
                },
                required: ['slideNumber', 'title', 'mainText', 'bulletPoints', 'suggestedIllustration', 'colorTheme']
              }
            }
          },
          required: ['topicTitle', 'caption', 'slides']
        }
      }
    });

    const outputText = response.text || '{}';
    const parsedData = JSON.parse(outputText);
    return res.json(parsedData);
  } catch (err: any) {
    console.error('Error generating story content:', err);
    return res.status(500).json({
      error: 'فشل توليد محتوى الستوري، يرجى المحاولة مرة أخرى',
      details: err?.message || String(err),
    });
  }
});

// Generate Custom Pediatric Cartoon Illustration on demand
app.post('/api/generate-cartoon', async (req: Request, res: Response) => {
  try {
    const { prompt: userPrompt } = req.body;

    if (!userPrompt) {
      return res.status(400).json({ error: 'يرجى كتابة وصف الرسمة المطلوبة' });
    }

    const enhancedPrompt = `Cute pediatric medical cartoon illustration for children healthcare instagram story: ${userPrompt}. Adorable warm pastel style, friendly children book aesthetic, clean white background, soft rounded edges, joyful and reassuring medical theme.`;

    const imageResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: enhancedPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: '1:1',
        },
      },
    });

    let imageUrl = '';
    const parts = imageResponse.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) {
      return res.status(500).json({ error: 'لم يتم استرجاع صورة من النموذج، يرجى المحاولة بوصف آخر' });
    }

    return res.json({ imageUrl });
  } catch (err: any) {
    console.error('Error generating cartoon illustration:', err);
    return res.status(500).json({
      error: 'فشل توليد الرسمة الكرتونية',
      details: err?.message || String(err),
    });
  }
});

// Serve images and static assets reliably in both dev and production
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/src/assets', express.static(path.join(__dirname, 'src/assets')));
app.use(express.static(path.join(__dirname, 'public')));

// Server setup for Vite development or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
