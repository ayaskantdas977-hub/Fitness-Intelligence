// Browser Native Web Speech API & Web Audio API Voice Coach Service
// 100% Client-side: zero latency, zero backend dependencies, zero data leakage
// Multi-Language Support: Searchable catalog supporting Tamil, Odia, Hindi, Telugu, Bengali, Kannada, Malayalam, Marathi, Gujarati, Punjabi, English, Spanish, French, German, Japanese!

export type VoicePersona = 'clinical' | 'high_energy' | 'minimalist';
export type VoiceLanguage =
  | 'en'
  | 'ta'
  | 'or'
  | 'hi'
  | 'te'
  | 'bn'
  | 'kn'
  | 'ml'
  | 'mr'
  | 'gu'
  | 'pa'
  | 'ur'
  | 'as'
  | 'sa'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'pt'
  | 'ru'
  | 'ar'
  | 'ja'
  | 'ko'
  | 'zh';

export interface LanguageOption {
  code: VoiceLanguage;
  bcp47: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
  welcomeMessage: string;
  legPressSetup: {
    script: string;
    phonetic?: string;
  };
  squatSetup: {
    script: string;
    phonetic?: string;
  };
  repCues: {
    rep1: string;
    rep5: string;
    rep10: string;
    general: string;
  };
  cues: {
    kneeValgus: string;
    depthIncomplete: string;
    lumbarFlexion: string;
    elbowFlare: string;
    hipSag: string;
  };
}

export interface VoiceCoachSettings {
  enabled: boolean;
  persona: VoicePersona;
  language: VoiceLanguage;
  volume: number; // 0.0 to 1.0
  rate: number; // 0.8 to 1.4
  pitch: number; // 0.8 to 1.2
  soundEffectsEnabled: boolean;
  metronomeBpm: number;
  selectedVoiceURI?: string;
}

export interface BiomechanicalGuideCue {
  id: string;
  name: string;
  exercise: string;
  targetPart: string;
  keyAngle: string;
  depthRule: string;
  english: string;
  odia: {
    script: string;
    phonetic: string;
  };
  hindi: {
    script: string;
    phonetic: string;
  };
  tamil: {
    script: string;
    phonetic: string;
  };
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'ta',
    bcp47: 'ta-IN',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    region: 'Tamil Nadu, India',
    flag: '🇮🇳',
    welcomeMessage:
      'தமிழ் குரல் பயிற்சியாளர் தயார். லெக் பிரஸ்ஸில் கால்களை 45 டிகிரி கோணத்தில் வையுங்கள்.',
    legPressSetup: {
      script:
        'லெக் பிரஸ்ஸில் கால்களை 45 டிகிரி கோணத்தில் தோள்பட்டை அகலத்தில் வையுங்கள். முதுகை சீட்டில் நன்றாக அழுத்தி முழங்கால்கள் 90 டிகிரி வளையும் வரை மெதுவாக கீழே இறக்குங்கள். இடுப்பு மேலே தூக்கக்கூடாது.',
      phonetic:
        'Leg pressil kaalkalai 45 degree konathil tholpattai agalathil vaiyungal. Mudhugai seatil nandraga azhuthi muzhangalgal 90 degree valaiyum varai medhuvaaga keezhe irakkungal.',
    },
    squatSetup: {
      script:
        'கால்களை தோள்பட்டை அகலத்தில் வைத்து 15 முதல் 30 டிகிரி வெளியே திருப்புங்கள். இடுப்பை பின்னோக்கி தள்ளி முழங்கால்கள் 90 டிகிரி வளையும் வரை கீழே உட்காருங்கள்.',
      phonetic:
        'Kaalkalai tholpattai agalathil vaithu 15 mudhal 30 degree veliye thiruppungal. Iduppai pinnokki thalli muzhangalgal 90 degree valaiyum varai keezhe utkaarungal.',
    },
    repCues: {
      rep1: 'ஒரு ரெப்! சிறந்த தொடக்கம்!',
      rep5: 'ஐந்து ரெப் முடிந்தது! தொடர்ந்து செய்யுங்கள்!',
      rep10: 'பத்து ரெப் முடிந்தது! மிகச் சிறந்த செட்!',
      general: 'ரெப் முடிந்தது!',
    },
    cues: {
      kneeValgus: 'முழங்கால்கள் உள்ளே மடங்குகின்றன. 45 டிகிரி கோணத்தில் முழங்கால்களை வெளியே தள்ளுங்கள்.',
      depthIncomplete: 'முழங்கால்களை 90 டிகிரி வரை கீழே இறக்குங்கள், முழு டெப்த் கொடுங்கள்.',
      lumbarFlexion: 'முதுகை வளைக்காதீர்கள். முதுகெலும்பை நேராக வைத்து மார்பை நிமிர்த்துங்கள்.',
      elbowFlare: 'முழங்கையை 45 டிகிரி கோணத்தில் உடம்போடு ஒட்டி வையுங்கள்.',
      hipSag: 'இடுப்பை நேராக வைத்து வயிற்றை இறுக்குங்கள்.',
    },
  },
  {
    code: 'or',
    bcp47: 'or-IN',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    region: 'Odisha, India',
    flag: '🇮🇳',
    welcomeMessage: 'ଓଡ଼ିଆ ଭଏସ୍ କୋଚ୍ ପ୍ରସ୍ତୁତ। ପାଦକୁ ୪୫ ଡିଗ୍ରୀ କୋଣରେ ରଖନ୍ତୁ।',
    legPressSetup: {
      script:
        'ଲେଗ୍ ପ୍ରେସ୍‌ରେ ପାଦକୁ କାନ୍ଧ ଚଉଡ଼ାରେ ଏବଂ ୪୫ ଡିଗ୍ରୀ ବାହାର କୋଣରେ ପ୍ଲେଟ୍ ଉପରେ ରଖନ୍ତୁ। ପିଠି ଏବଂ ଅଣ୍ଟାକୁ ସିଟ୍ ସହିତ ଚାପି ରଖି ଆଣ୍ଠୁ ୯୦ ଡିଗ୍ରୀ ହେବା ଯାଏଁ ଧୀରେ ଧୀରେ ତଳକୁ ଆଣନ୍ତୁ। ଅଣ୍ଟାକୁ ଉପରକୁ ଉଠିବାକୁ ଦିଅନ୍ତୁ ନାହିଁ।',
      phonetic:
        'Leg press re paada ku kaandha chaudare ebong 45 degree baahara konare plate upare rakhantu. Pithi ku seat sahita chaapi rakhi aanthu 90 degree heba jaayen dhire dhire talaku aanantu.',
    },
    squatSetup: {
      script:
        'ସ୍କ୍ୱାଟ୍ ପାଇଁ ପାଦକୁ କାନ୍ଧ ତୁଳନାରେ ସାମାନ୍ୟ ଚଉଡ଼ାରେ ରଖି ଆଙ୍ଗୁଠିକୁ ୧୫ ରୁ ୩୦ ଡିଗ୍ରୀ ବାହାରକୁ ଖୋଲନ୍ତୁ। ଅଣ୍ଟା ପଛକୁ ନେଇ ଆଣ୍ଠୁ ସମାନ୍ତରାଳ ହେବା ପର୍ଯ୍ୟନ୍ତ ତଳକୁ ବସନ୍ତୁ ଏବଂ ଛାତି ସିଧା ରଖନ୍ତୁ।',
      phonetic:
        'Squat pain paada ku 15 ru 30 degree baaharaku bulaai kaandha chaudare thia huantu. Antaaku pachhaku nei chhaati teki aanthu sahita samantaraala bhabe talaku basantu.',
    },
    repCues: {
      rep1: 'ଗୋଟିଏ ରେପ୍! ଭଲ ଆରମ୍ଭ!',
      rep5: 'ପାଞ୍ଚଟି ରେପ୍ ହେଲା! ଆଗକୁ ଚାଲନ୍ତୁ!',
      rep10: 'ଦଶଟି ରେପ୍ ସମ୍ପୂର୍ଣ୍ଣ! ବହୁତ ବଢ଼ିଆ!',
      general: 'ରେପ୍ ସମ୍ପୂର୍ଣ୍ଣ!',
    },
    cues: {
      kneeValgus: 'ଆଣ୍ଠୁକୁ ୪୫ ଡିଗ୍ରୀ କୋଣରେ ବାହାର ଆଡ଼କୁ ରଖନ୍ତୁ, ଭିତରକୁ ନଇଁବାକୁ ଦିଅନ୍ତୁ ନାହିଁ।',
      depthIncomplete: 'ଆଣ୍ଠୁକୁ ୯୦ ଡିଗ୍ରୀ ସମାନ୍ତରାଳ କରନ୍ତୁ, ଆହୁରି ଟିକେ ତଳକୁ ଯାଆନ୍ତୁ।',
      lumbarFlexion: 'ମେରୁଦଣ୍ଡ ବଙ୍କା ହେଉଛି। ଛାତି ସିଧା ରଖନ୍ତୁ ଏବଂ ଅଣ୍ଟା ଟାଣ କରନ୍ତୁ।',
      elbowFlare: 'କହୁଣୀକୁ ଶରୀର ସହିତ ୪୫ ଡିଗ୍ରୀ କୋଣରେ ଚାପି ରଖନ୍ତୁ।',
      hipSag: 'ଅଣ୍ଟା ତଳକୁ ଝୁଲୁଛି। ପେଟ ଏବଂ ଅଣ୍ଟାକୁ ଟାଣ କରି ସିଧା ରଖନ୍ତୁ।',
    },
  },
  {
    code: 'hi',
    bcp47: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिंदी',
    region: 'India',
    flag: '🇮🇳',
    welcomeMessage: 'हिंदी वॉइस कोच तैयार है। पैरों को 45 डिग्री एंगल पर रखें।',
    legPressSetup: {
      script:
        'लेग प्रेस पर पैरों को कंधे की चौड़ाई पर 45 डिग्री एंगल में रखें। कमर को पीछे की सीट से सटा कर रखें और घुटनों को 90 डिग्री तक धीरे-धीरे नीचे लाएं। कमर को सीट से उठने न दें।',
      phonetic:
        'Leg press par pairon ko kandhe ki chaudai par 45 degree angle mein rakhein. Kamar ko seat se sata kar rakhein aur ghutnon ko 90 degree tak dhire-dhire niche laayein.',
    },
    squatSetup: {
      script:
        'पैरों को कंधों से थोड़ा चौड़ा रखें और पंजों को 15 से 30 डिग्री बाहर रखें। हिप्स को पीछे ले जाते हुए घुटनों के समानांतर 90 डिग्री तक नीचे जाएं और छाती तान कर रखें।',
      phonetic:
        'Pairon ko kandhon se thoda chauda rakhein aur panjon ko 15 se 30 degree bahar rakhein. Hips ko pichhe le jaate hue ghutnon ke samantar 90 degree tak niche jayein.',
    },
    repCues: {
      rep1: 'एक रैप! शानदार शुरुआत!',
      rep5: 'पाँच रैप पूरे! जोश बनाए रखें!',
      rep10: 'दस रैप पूरे! बेहतरीन सेट!',
      general: 'रैप पूरा!',
    },
    cues: {
      kneeValgus: 'घुटनों को 45 डिग्री एंगल पर बाहर की तरफ रखें ताकि जोड़ों पर दबाव न पड़े।',
      depthIncomplete: 'घुटनों को 90 डिग्री समानांतर तक नीचे लाएं, पूरा एंगल बनाएं।',
      lumbarFlexion: 'कमर में झुकाव है। रीढ़ की हड्डी को न्यूट्रल और सीधा रखें।',
      elbowFlare: 'कंधे की सुरक्षा के लिए कोहनी को शरीर से 45 डिग्री एंगल पर रखें।',
      hipSag: 'कमर नीचे झुक रही है। पेट और हिप्स को टाइट करके सीधा रखें।',
    },
  },
  {
    code: 'te',
    bcp47: 'te-IN',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    region: 'Andhra Pradesh & Telangana, India',
    flag: '🇮🇳',
    welcomeMessage: 'తెలుగు వాయిస్ కోచ్ సిద్ధంగా ఉంది. పాదాలను 45 డిగ్రీల కోణంలో ఉంచండి.',
    legPressSetup: {
      script:
        'లెగ్ ప్రెస్ ప్లేట్‌పై పాదాలను 45 డిగ్రీల కోణంలో భుజాల వెడల్పులో ఉంచండి. వీపును సీటుకు గట్టిగా అదిమి మోకాళ్లు 90 డిగ్రీల వరకు నెమ్మదిగా కిందకు దించండి.',
    },
    squatSetup: {
      script:
        'పాదాలను భుజాల వెడల్పులో ఉంచి 15 నుండి 30 డిగ్రీల వరకు బయటకు పెట్టండి. మోకాళ్లు 90 డిగ్రీల సమాంతరంగా వచ్చే వరకు కిందకు కూర్చోండి.',
    },
    repCues: {
      rep1: 'ఒకటి! మంచి ప్రారంభం!',
      rep5: 'ఐదు రెప్స్ అయ్యాయి! ముందుకు సాగండి!',
      rep10: 'పది రెప్స్ పూర్తయ్యాయి! అద్భుతం!',
      general: 'రెప్ పూర్తయింది!',
    },
    cues: {
      kneeValgus: 'మోకాళ్లను 45 డిగ్రీల కోణంలో బయటకు నెట్టండి.',
      depthIncomplete: 'మోకాళ్లను 90 డిగ్రీల వరకు కిందకు దించండి.',
      lumbarFlexion: 'వీపును వంచవద్దు, నేరుగా ఉంచండి.',
      elbowFlare: 'మోచేతులను 45 డిగ్రీల కోణంలో ఉంచండి.',
      hipSag: 'నడుమును నిటారుగా ఉంచండి.',
    },
  },
  {
    code: 'bn',
    bcp47: 'bn-IN',
    name: 'Bengali',
    nativeName: 'বাংলা',
    region: 'West Bengal, India',
    flag: '🇮🇳',
    welcomeMessage: 'বাংলা ভয়েস কোচ প্রস্তুত। পা ৪৫ ডিগ্রি কোণে রাখুন।',
    legPressSetup: {
      script:
        'লেগ প্রেস প্লেটে পা দুটিকে কাঁধের চওড়ায় এবং ৪৫ ডিগ্রি কোণে রাখুন। পিঠ সিটে ঠেকিয়ে হাঁটু ৯০ ডিগ্রি হওয়া পর্যন্ত ধীরে ধীরে নিচে নামান।',
    },
    squatSetup: {
      script:
        'পায়ের পাতা ১৫ থেকে ৩০ ডিগ্রি বাইরে রাখুন। কোমর পেছনে নিয়ে হাঁটু ৯০ ডিগ্রি সমান্তরাল হওয়া পর্যন্ত নিচে বসুন।',
    },
    repCues: {
      rep1: 'একটি রেপ! ভালো শুরু!',
      rep5: 'পাঁচটি রেপ সম্পন্ন! চালিয়ে যান!',
      rep10: 'দশটি রেপ সম্পন্ন! অসাধারণ!',
      general: 'রেপ সম্পন্ন!',
    },
    cues: {
      kneeValgus: 'হাঁটু দুটিকে ৪৫ ডিগ্রি বাইরে রাখুন।',
      depthIncomplete: 'হাঁটু ৯০ ডিগ্রি সমান্তরাল করুন।',
      lumbarFlexion: 'কোমর বাঁকাবেন না, সোজা রাখুন।',
      elbowFlare: 'কনুই শরীর থেকে ৪৫ ডিগ্রি কোণে রাখুন।',
      hipSag: 'কোমর শক্ত করে সোজা রাখুন।',
    },
  },
  {
    code: 'kn',
    bcp47: 'kn-IN',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    region: 'Karnataka, India',
    flag: '🇮🇳',
    welcomeMessage: 'ಕನ್ನಡ ವಾಯ್ಸ್ ಕೋಚ್ ಸಿದ್ಧವಾಗಿದೆ. ಪಾದಗಳನ್ನು 45 ಡಿಗ್ರಿ ಕೋನದಲ್ಲಿ ಇರಿಸಿ.',
    legPressSetup: {
      script:
        'ಲೆಗ್ ಪ್ರೆಸ್ ಪ್ಲೇಟ್‌ನಲ್ಲಿ ಪಾದಗಳನ್ನು 45 ಡಿಗ್ರಿ ಕೋನದಲ್ಲಿ ಭುಜದ ಅಗಲದಲ್ಲಿ ಇರಿಸಿ. ಬೆನ್ನನ್ನು ಸೀಟಿಗೆ ಒತ್ತಿ ಮೊಣಕಾಲುಗಳು 90 ಡಿಗ್ರಿ ಬಾಗುವವರೆಗೆ ನಿಧಾನವಾಗಿ ಕೆಳಗೆ ಇಳಿಸಿ.',
    },
    squatSetup: {
      script:
        'ಪಾದಗಳನ್ನು ಭುಜದ ಅಗಲದಲ್ಲಿ ಇರಿಸಿ 15 ರಿಂದ 30 ಡಿಗ್ರಿ ಹೊರಗೆ ತಿರುಗಿಸಿ. ಮೊಣಕಾಲುಗಳು 90 ಡಿಗ್ರಿ ಬಾಗುವವರೆಗೆ ಕೆಳಗೆ ಕುಳಿತುಕೊಳ್ಳಿ.',
    },
    repCues: {
      rep1: 'ಒಂದು ರೆಪ್! ಉತ್ತಮ ಆರಂಭ!',
      rep5: 'ಐದು ರೆಪ್ಸ್ ಮುಗಿದಿದೆ!',
      rep10: 'ಹತ್ತು ರೆಪ್ಸ್ ಪೂರ್ಣಗೊಂಡಿದೆ! ಅದ್ಭುತ!',
      general: 'ರೆಪ್ ಪೂರ್ಣಗೊಂಡಿದೆ!',
    },
    cues: {
      kneeValgus: 'ಮೊಣಕಾಲುಗಳನ್ನು ಹೊರಗೆ ಇರಿಸಿ.',
      depthIncomplete: '90 ಡಿಗ್ರಿ ಆಳಕ್ಕೆ ಇಳಿಯಿರಿ.',
      lumbarFlexion: 'ಬೆನ್ನನ್ನು ನೇರವಾಗಿ ಇರಿಸಿ.',
      elbowFlare: 'ಮೊಣಕೈಗಳನ್ನು 45 ಡಿಗ್ರಿಯಲ್ಲಿ ಇರಿಸಿ.',
      hipSag: 'ನಡುವನ್ನು ನೇರವಾಗಿಡಿ.',
    },
  },
  {
    code: 'ml',
    bcp47: 'ml-IN',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    region: 'Kerala, India',
    flag: '🇮🇳',
    welcomeMessage: 'മലയാളം വോയ്‌സ് കോച്ച് തയ്യാറാണ്. കാലുകൾ 45 ഡിഗ്രി കോണിൽ വെയ്ക്കുക.',
    legPressSetup: {
      script:
        'ലെഗ് പ്രസ്സിൽ കാലുകൾ 45 ഡിഗ്രി കോണിൽ തോളുകളുടെ വീതിയിൽ വെയ്ക്കുക. നട്ടെല്ല് സീറ്റിൽ ഉറപ്പിച്ച് കാൽമുട്ടുകൾ 90 ഡിഗ്രി എത്തുന്നതുവരെ പതുക്കെ താഴേക്ക് കൊണ്ടുവരിക.',
    },
    squatSetup: {
      script:
        'പാദങ്ങൾ 15 മുതൽ 30 ഡിഗ്രി വരെ പുറത്തേക്ക് വെയ്ക്കുക. കാൽമുട്ടുകൾ 90 ഡിഗ്രി സമാന്തരമാകുന്നതുവരെ താഴേക്ക് ഇരിക്കുക.',
    },
    repCues: {
      rep1: 'ഒരു റെപ്പ്! നല്ല തുടക്കം!',
      rep5: 'അഞ്ച് റെപ്പുകൾ കഴിഞ്ഞു!',
      rep10: 'പത്ത് റെപ്പുകൾ പൂർത്തിയായി! മികച്ചത്!',
      general: 'റെപ്പ് പൂർത്തിയായി!',
    },
    cues: {
      kneeValgus: 'കാൽമുട്ടുകൾ പുറത്തേക്ക് വെയ്ക്കുക.',
      depthIncomplete: 'മുട്ടുകൾ 90 ഡിഗ്രി താഴേക്ക് കൊണ്ടുവരിക.',
      lumbarFlexion: 'നട്ടെല്ല് നേരെ വെയ്ക്കുക.',
      elbowFlare: 'കൈമുട്ടുകൾ 45 ഡിഗ്രിയിൽ വെയ്ക്കുക.',
      hipSag: 'അരക്കെട്ട് നേരെ വെയ്ക്കുക.',
    },
  },
  {
    code: 'mr',
    bcp47: 'mr-IN',
    name: 'Marathi',
    nativeName: 'मराठी',
    region: 'Maharashtra, India',
    flag: '🇮🇳',
    welcomeMessage: 'मराठी व्हॉइस कोच सज्ज आहे. पाय ४५ अंश कोनात ठेवा.',
    legPressSetup: {
      script:
        'लेग प्रेस प्लेटवर पाय खांद्याच्या रुंदीवर आणि ४५ अंश कोनात ठेवा. कंबर सीटला चिकटवून गुडघे ९० अंशापर्यंत हळूहळू खाली आणा.',
    },
    squatSetup: {
      script:
        'पाय खांद्याच्या रुंदीवर ठेवून १५ ते ३० अंश बाहेर ठेवा. गुडघे ९० अंश समांतर होईपर्यंत खाली बसा.',
    },
    repCues: {
      rep1: 'एक रॅप! उत्तम सुरुवात!',
      rep5: 'पाच रॅप्स झाले!',
      rep10: 'दहा रॅप्स पूर्ण! अप्रतिम सेट!',
      general: 'रॅप पूर्ण!',
    },
    cues: {
      kneeValgus: 'गुडघे ४५ अंश बाहेर ठेवा.',
      depthIncomplete: '९० अंश खोलीपर्यंत खाली जा.',
      lumbarFlexion: 'कंबर सरळ ठेवा.',
      elbowFlare: 'कोपरे ४५ अंशात ठेवा.',
      hipSag: 'कंबर घट्ट ठेवा.',
    },
  },
  {
    code: 'gu',
    bcp47: 'gu-IN',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    region: 'Gujarat, India',
    flag: '🇮🇳',
    welcomeMessage: 'ગુજરાતી વોઈસ કોચ તૈયાર છે. પગને ૪૫ ડિગ્રીના ખૂણે રાખો.',
    legPressSetup: {
      script:
        'લેગ પ્રેસ પર પગને ૪૫ ડિગ્રીના ખૂણે ખભા જેટલા પહોળા રાખો. કમર સીટ પર ટેકવીને ઘૂંટણ ૯૦ ડિગ્રી સુધી ધીમે ધીમે નીચે લાવો.',
    },
    squatSetup: {
      script:
        'પગ ૧૫ થી ૩૦ ડિગ્રી બહાર રાખો. હિપ્સ પાછળ લઈ જઈ ઘૂંટણ ૯૦ ડિગ્રી સુધી નીચે જાઓ.',
    },
    repCues: {
      rep1: 'એક રેપ! ઉત્તમ શરૂઆત!',
      rep5: 'પાંચ રેપ્સ પૂરા!',
      rep10: 'દસ રેપ્સ પૂર્ણ! અદ્ભુત!',
      general: 'રેપ પૂર્ણ!',
    },
    cues: {
      kneeValgus: 'ઘૂંટણ બહાર રાખો.',
      depthIncomplete: '૯૦ ડિગ્રી સમાંતર જાઓ.',
      lumbarFlexion: 'કમર સીધી રાખો.',
      elbowFlare: 'કોણી ૪૫ ડિગ્રી રાખો.',
      hipSag: 'કમર ટાઈટ રાખો.',
    },
  },
  {
    code: 'pa',
    bcp47: 'pa-IN',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    region: 'Punjab, India',
    flag: '🇮🇳',
    welcomeMessage: "ਪੰਜਾਬੀ ਵੌਇਸ ਕੋਚ ਤਿਆਰ ਹੈ। ਪੈਰਾਂ ਨੂੰ 45 ਡਿਗ੍ਰੀ ਦੇ ਕੋਣ 'ਤੇ ਰੱਖੋ।",
    legPressSetup: {
      script:
        "ਲੈੱਗ ਪ੍ਰੈੱਸ ਪਲੇਟ 'ਤੇ ਪੈਰਾਂ ਨੂੰ 45 ਡਿਗ੍ਰੀ ਦੇ ਕੋਣ 'ਤੇ ਮੋਢਿਆਂ ਦੀ ਚੌੜਾਈ ਵਿੱਚ ਰੱਖੋ। ਪਿੱਠ ਨੂੰ ਸੀਟ ਨਾਲ ਜੋੜ ਕੇ ਗੋਡਿਆਂ ਨੂੰ 90 ਡਿਗ੍ਰੀ ਤੱਕ ਹੌਲੀ-ਹੌਲੀ ਹੇਠਾਂ ਲਿਆਓ।",
    },
    squatSetup: {
      script:
        'ਪੈਰਾਂ ਨੂੰ 15 ਤੋਂ 30 ਡਿਗ੍ਰੀ ਬਾਹਰ ਰੱਖੋ। ਗੋਡਿਆਂ ਦੇ ਸਮਾਨਾਂਤਰ 90 ਡਿਗ੍ਰੀ ਤੱਕ ਹੇਠਾਂ ਜਾਓ।',
    },
    repCues: {
      rep1: 'ਇੱਕ ਰੈਪ! ਸ਼ਾਨਦਾਰ ਸ਼ੁਰੂਆਤ!',
      rep5: 'ਪੰਜ ਰੈਪ ਪੂਰੇ!',
      rep10: 'ਦਸ ਰੈਪ ਪੂਰੇ! ਕਮਾਲ ਦਾ ਸੈੱਟ!',
      general: 'ਰੈਪ ਪੂਰਾ!',
    },
    cues: {
      kneeValgus: 'ਗੋਡੇ ਬਾਹਰ ਵੱਲ ਰੱਖੋ।',
      depthIncomplete: '90 ਡਿਗ੍ਰੀ ਤੱਕ ਹੇਠਾਂ ਜਾਓ।',
      lumbarFlexion: 'ਪਿੱਠ ਸਿੱਧੀ ਰੱਖੋ।',
      elbowFlare: 'ਕੂਹਣੀਆਂ 45 ਡਿਗ੍ਰੀ ਰੱਖੋ।',
      hipSag: 'ਕਮਰ ਟਾਈਟ ਰੱਖੋ।',
    },
  },
  {
    code: 'en',
    bcp47: 'en-IN',
    name: 'English',
    nativeName: 'English',
    region: 'Global / India',
    flag: '🌐',
    welcomeMessage:
      'English voice coach active. Tracking biomechanical joint angles and depth.',
    legPressSetup: {
      script:
        'On the leg press, place your feet shoulder-width apart at roughly a 45-degree outward angle on the plate. Keep your lower back and sacrum firmly pinned against the seat, and lower the sled smoothly until your knees reach a 90-degree angle without letting your tailbone lift off the pad.',
    },
    squatSetup: {
      script:
        'Set your feet slightly wider than shoulders, flare toes out 15 to 30 degrees, break at the hips first, and sink down until your hip crease breaks parallel with your knee joints while driving knees outward.',
    },
    repCues: {
      rep1: 'One! Solid start, lock it in!',
      rep5: 'Five down! Keep that fire burning!',
      rep10: 'Ten reps! Outstanding set!',
      general: 'Good rep completed!',
    },
    cues: {
      kneeValgus: 'Knees out! Drive them 45 degrees wide over your pinky toes!',
      depthIncomplete: 'Sink lower to 90 degrees parallel depth!',
      lumbarFlexion: 'Chest up! Lock spine neutral, do not round!',
      elbowFlare: 'Tuck elbows to 45 degrees alongside your ribcage!',
      hipSag: 'Hips up! Squeeze glutes and maintain rigid plank!',
    },
  },
  {
    code: 'es',
    bcp47: 'es-ES',
    name: 'Spanish',
    nativeName: 'Español',
    region: 'Spain / Latin America',
    flag: '🇪🇸',
    welcomeMessage: 'Entrenador de voz en español listo. Mantén los pies a 45 grados.',
    legPressSetup: {
      script:
        'En la prensa de piernas, coloca los pies a la anchura de los hombros en un ángulo de 45 grados y baja el trineo de forma controlada hasta alcanzar los 90 grados.',
    },
    squatSetup: {
      script:
        'Coloca los pies al ancho de los hombros con las puntas hacia afuera a 30 grados y baja hasta que los muslos queden paralelos.',
    },
    repCues: {
      rep1: '¡Una repetición! ¡Gran comienzo!',
      rep5: '¡Cinco repeticiones! ¡Sigue así!',
      rep10: '¡Diez repeticiones! ¡Excelente serie!',
      general: '¡Repetición completada!',
    },
    cues: {
      kneeValgus: '¡Rodillas hacia afuera a 45 grados!',
      depthIncomplete: '¡Baja hasta 90 grados paralelo!',
      lumbarFlexion: '¡Pecho arriba, espalda recta!',
      elbowFlare: '¡Codos a 45 grados!',
      hipSag: '¡Aprieta el abdomen y sube la cadera!',
    },
  },
  {
    code: 'fr',
    bcp47: 'fr-FR',
    name: 'French',
    nativeName: 'Français',
    region: 'France / Global',
    flag: '🇫🇷',
    welcomeMessage: 'Coach vocal en français prêt. Gardez les pieds à 45 degrés.',
    legPressSetup: {
      script:
        'Sur la presse à cuisses, placez vos pieds écartés de la largeur des épaules à 45 degrés et descendez jusqu’à un angle de 90 degrés.',
    },
    squatSetup: {
      script:
        'Écartez les pieds de la largeur des épaules, ouvrez les pointes à 30 degrés et descendez jusqu’à la parallèle.',
    },
    repCues: {
      rep1: 'Une répétition ! Bon début !',
      rep5: 'Cinq répétitions ! Continuez !',
      rep10: 'Dix répétitions ! Série remarquable !',
      general: 'Répétition validée !',
    },
    cues: {
      kneeValgus: 'Poussez les genoux vers l’extérieur !',
      depthIncomplete: 'Descendez jusqu’à 90 degrés !',
      lumbarFlexion: 'Poitrine haute, dos droit !',
      elbowFlare: 'Coudes à 45 degrés le long du corps !',
      hipSag: 'Gainez le tronc et remontez le bassin !',
    },
  },
  {
    code: 'de',
    bcp47: 'de-DE',
    name: 'German',
    nativeName: 'Deutsch',
    region: 'Germany / Austria',
    flag: '🇩🇪',
    welcomeMessage: 'Deutscher Sprachcoach bereit. Füße im 45-Grad-Winkel halten.',
    legPressSetup: {
      script:
        'Stellen Sie Ihre Füße auf der Beinpresse schulterbreit im 45-Grad-Winkel auf und senken Sie den Schlitten bis zu 90 Grad ab.',
    },
    squatSetup: {
      script:
        'Füße schulterbreit aufstellen, Spitzen um 30 Grad nach außen drehen und bis zur Parallele absenken.',
    },
    repCues: {
      rep1: 'Eine Wiederholung! Guter Start!',
      rep5: 'Fünf Wiederholungen geschafft!',
      rep10: 'Zehn Wiederholungen! Hervorragender Satz!',
      general: 'Wiederholung abgeschlossen!',
    },
    cues: {
      kneeValgus: 'Knie nach außen im 45-Grad-Winkel drücken!',
      depthIncomplete: 'Tiefer gehen bis 90 Grad parallel!',
      lumbarFlexion: 'Brust raus, Rücken neutral halten!',
      elbowFlare: 'Ellbogen im 45-Grad-Winkel führen!',
      hipSag: 'Bauch anspannen und Hüfte stabil halten!',
    },
  },
  {
    code: 'ja',
    bcp47: 'ja-JP',
    name: 'Japanese',
    nativeName: '日本語',
    region: 'Japan',
    flag: '🇯🇵',
    welcomeMessage: '日本語ボイスコーチの準備ができました。足を45度の角度に保ちます。',
    legPressSetup: {
      script:
        'レッグプレスでは、足を肩幅に開き、プレート上で45度の角度に置きます。膝が90度になるまでゆっくりと下ろしてください。',
    },
    squatSetup: {
      script:
        '足を肩幅より少し広く開き、つま先を30度外側に向け、太ももが平行になるまで腰を落とします。',
    },
    repCues: {
      rep1: '1回！良いスタートです！',
      rep5: '5回達成！その調子です！',
      rep10: '10回完了！素晴らしいセットです！',
      general: 'レップ完了！',
    },
    cues: {
      kneeValgus: '膝を45度外側に押し出してください！',
      depthIncomplete: '90度の深さまでしっかりと下ろしてください！',
      lumbarFlexion: '胸を張って、背中を真っ直ぐに保ちます！',
      elbowFlare: '肘を体側に45度の角度で引き締めてください！',
      hipSag: 'お腹とお尻を締めて体を一直線に保ちます！',
    },
  },
  {
    code: 'ur',
    bcp47: 'ur-IN',
    name: 'Urdu',
    nativeName: 'اردو',
    region: 'India / South Asia',
    flag: '🇮🇳',
    welcomeMessage: 'اردو وائس کوچ تیار ہے۔ ٹانگ پریس پر پاؤں 45 ڈگری زاویے پر رکھیں۔',
    legPressSetup: {
      script:
        'لیگ پریس پر پاؤں کو کندھوں کی چوڑائی پر 45 ڈگری زاویے پر رکھیں۔ پیٹھ کو سیٹ سے لگا کر رکھیں اور گھٹنوں کو 90 ڈگری تک نیچے لائیں۔',
    },
    squatSetup: {
      script:
        'پاؤں کندھوں سے تھوڑا چوڑا رکھیں اور پنجے 15 سے 30 ڈگری باہر رکھیں۔ ہپس پیچھے لے جاتے ہوئے 90 ڈگری تک نیچے جائیں۔',
    },
    repCues: {
      rep1: 'ایک ریپ! زبردست شروعات!',
      rep5: 'پانچ ریپس مکمل! جاری رکھیں!',
      rep10: 'دس ریپس مکمل! شاندار سیٹ!',
      general: 'ریپ مکمل!',
    },
    cues: {
      kneeValgus: 'گھٹنے 45 ڈگری باہر کی طرف رکھیں۔',
      depthIncomplete: 'گھٹنوں کو 90 ڈگری تک نیچے لائیں۔',
      lumbarFlexion: 'کمر سیدھی رکھیں، مت جھکیں۔',
      elbowFlare: 'کہنیوں کو 45 ڈگری پر اندر رکھیں۔',
      hipSag: 'کمر سیدھی اور ٹائٹ رکھیں۔',
    },
  },
  {
    code: 'as',
    bcp47: 'as-IN',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    region: 'Assam, India',
    flag: '🇮🇳',
    welcomeMessage: 'অসমীয়া ভইচ ক’চ সাজু। ভৰি ৪৫ ডিগ্ৰী কোণত ৰাখক।',
    legPressSetup: {
      script:
        'লেগ প্ৰেছত ভৰি দুখন ৪৫ ডিগ্ৰী কোণত কান্ধৰ সমান বহলকৈ ৰাখক। পিঠিখন চিটত লগাই আঁঠু ৯০ ডিগ্ৰী নোহোৱালৈকে তললৈ নমাই আনক।',
    },
    squatSetup: {
      script:
        'ভৰি দুখন কান্ধৰ জোখত ১৫ ৰ পৰা ৩০ ডিগ্ৰী বাহিৰলৈ ঘূৰাই ৰাখক আৰু সমান্তৰালভাৱে বহক।',
    },
    repCues: {
      rep1: 'এটা ৰেপ! সুন্দৰ আৰম্ভণি!',
      rep5: 'পাঁচটা ৰেপ সম্পূৰ্ণ!',
      rep10: 'দহটা ৰেপ সম্পূৰ্ণ! উৎকৃষ্ট!',
      general: 'ৰেপ সম্পূৰ্ণ!',
    },
    cues: {
      kneeValgus: 'আঁঠু ৪৫ ডিগ্ৰী বাহিৰলৈ ৰাখক।',
      depthIncomplete: '৯০ ডিগ্ৰী সমান্তৰাল তললৈ যাওক।',
      lumbarFlexion: 'মেৰুদণ্ড পোন কৰি ৰাখক।',
      elbowFlare: 'কিলাকুটি ৪৫ ডিগ্ৰী কোণত ৰাখক।',
      hipSag: 'কঁকাল টানকৈ পোন ৰাখক।',
    },
  },
  {
    code: 'sa',
    bcp47: 'sa-IN',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    region: 'India',
    flag: '🇮🇳',
    welcomeMessage: 'संस्कृत-ध्वनि-प्रशिक्षकः सज्जः। पादौ ४५-अंश-कोणे स्थापयत।',
    legPressSetup: {
      script:
        'पादौ ४५-अंश-कोणे स्कन्ध-विस्तारे स्थापयत। पृष्ठं दृढं कृत्वा जानुनी ९०-अंश-पर्यन्तं मन्दं नयत।',
    },
    squatSetup: {
      script:
        'पादौ बहिः १५-३० अंश-कोणे स्थापयत। जानुनी ९०-अंश-समान्तरे अवनमयत।',
    },
    repCues: {
      rep1: 'एकम्! उत्तमः प्रारम्भः!',
      rep5: 'पञ्च आवृत्तयः पूर्णाः!',
      rep10: 'दश आवृत्तयः सम्पूर्णाः!',
      general: 'आवृत्तिः पूर्णा!',
    },
    cues: {
      kneeValgus: 'जानुनी बहिः ४५-अंश-कोणे प्रसारयत।',
      depthIncomplete: '९०-अंश-गभीरतां यावत् अवनमयत।',
      lumbarFlexion: 'मेरुदण्डं सरलं स्थापयत।',
      elbowFlare: 'कूर्परौ ४५-अंश-कोणे स्थापयत।',
      hipSag: 'कटिं दृढां संरक्षत।',
    },
  },
  {
    code: 'it',
    bcp47: 'it-IT',
    name: 'Italian',
    nativeName: 'Italiano',
    region: 'Italy',
    flag: '🇮🇹',
    welcomeMessage: 'Voice coach in italiano pronto. Mantieni i piedi a 45 gradi sulla leg press.',
    legPressSetup: {
      script:
        'Sulla leg press, posiziona i piedi alla larghezza delle spalle con un angolo di 45 gradi e scendi fino a 90 gradi.',
    },
    squatSetup: {
      script:
        'Piedi alla larghezza delle spalle, punte aperte di 30 gradi, scendi fino al parallelo.',
    },
    repCues: {
      rep1: 'Una ripetizione! Ottima partenza!',
      rep5: 'Cinque ripetizioni completate!',
      rep10: 'Dieci ripetizioni! Serie fantastica!',
      general: 'Ripetizione completata!',
    },
    cues: {
      kneeValgus: 'Spingi le ginocchia verso l’esterno a 45 gradi!',
      depthIncomplete: 'Scendi fino a 90 gradi al parallelo!',
      lumbarFlexion: 'Petto in fuori, schiena neutra!',
      elbowFlare: 'Gomiti a 45 gradi vicino al busto!',
      hipSag: 'Contrai i glutei e tieni il core compatto!',
    },
  },
  {
    code: 'pt',
    bcp47: 'pt-BR',
    name: 'Portuguese',
    nativeName: 'Português',
    region: 'Brazil / Portugal',
    flag: '🇧🇷',
    welcomeMessage: 'Treinador de voz em português pronto. Mantenha os pés em 45 graus.',
    legPressSetup: {
      script:
        'No leg press, posicione os pés na largura dos ombros em um ângulo de 45 graus e desça até 90 graus.',
    },
    squatSetup: {
      script:
        'Pés na largura dos ombros, pontas a 30 graus para fora, agache até a paralela.',
    },
    repCues: {
      rep1: 'Uma repetição! Bom começo!',
      rep5: 'Cinco repetições concluídas!',
      rep10: 'Dez repetições! Excelente série!',
      general: 'Repetição concluída!',
    },
    cues: {
      kneeValgus: 'Empurre os joelhos para fora a 45 graus!',
      depthIncomplete: 'Desça até 90 graus de profundidade!',
      lumbarFlexion: 'Peito erguido, coluna neutra!',
      elbowFlare: 'Cotovelos a 45 graus junto ao corpo!',
      hipSag: 'Ative o abdômen e alinhe o quadril!',
    },
  },
  {
    code: 'ru',
    bcp47: 'ru-RU',
    name: 'Russian',
    nativeName: 'Русский',
    region: 'Eastern Europe / Central Asia',
    flag: '🇷🇺',
    welcomeMessage: 'Голосовой тренер на русском готов. Держите ступни под углом 45 градусов.',
    legPressSetup: {
      script:
        'На жиме ногами поставьте ступни на ширине плеч под углом 45 градусов и плавно опускайте платформу до 90 градусов в коленях.',
    },
    squatSetup: {
      script:
        'Поставьте ноги на ширине плеч, разверните носки на 30 градусов и приседайте до параллели.',
    },
    repCues: {
      rep1: 'Одно повторение! Отличное начало!',
      rep5: 'Пять повторений! Продолжайте!',
      rep10: 'Десять повторений! Великолепный подход!',
      general: 'Повторение выполнено!',
    },
    cues: {
      kneeValgus: 'Колени наружу под углом 45 градусов!',
      depthIncomplete: 'Опускайтесь глубже до 90 градусов!',
      lumbarFlexion: 'Грудь вперед, спина прямая!',
      elbowFlare: 'Локти под углом 45 градусов к корпусу!',
      hipSag: 'Напрягите пресс и удерживайте таз!',
    },
  },
  {
    code: 'ar',
    bcp47: 'ar-SA',
    name: 'Arabic',
    nativeName: 'العربية',
    region: 'Middle East / North Africa',
    flag: '🇸🇦',
    welcomeMessage: 'المدرب الصوتي باللغة العربية جاهز. حافظ على وضعية القدمين بزاوية 45 درجة.',
    legPressSetup: {
      script:
        'في تمرين دفع الأرجل، ضع قدميك باتساع الكتفين بزاوية 45 درجة واخفض المنصة ببطء حتى زاوية 90 درجة للركبتين.',
    },
    squatSetup: {
      script:
        'باعد بين القدمين باتساع الكتفين مع توجيه الأصابع للخارج بزاوية 30 درجة واهبط حتى يوازي الفخذ الأرض.',
    },
    repCues: {
      rep1: 'تكرار واحد! بداية ممتازة!',
      rep5: 'خمسة تكرارات مكتملة!',
      rep10: 'عشرة تكرارات! جولة رائعة!',
      general: 'تم التكرار بنجاح!',
    },
    cues: {
      kneeValgus: 'ادفع الركبتين للخارج بزاوية 45 درجة!',
      depthIncomplete: 'انزل لعمق كامل حتى 90 درجة!',
      lumbarFlexion: 'حافظ على استقامة العمود الفقري والصدر لأعلى!',
      elbowFlare: 'اضبط الكوعين بزاوية 45 درجة بجانب الضلوع!',
      hipSag: 'شد عضلات البطن وحافظ على ثبات الحوض!',
    },
  },
  {
    code: 'ko',
    bcp47: 'ko-KR',
    name: 'Korean',
    nativeName: '한국어',
    region: 'South Korea',
    flag: '🇰🇷',
    welcomeMessage: '한국어 보이스 코치 준비 완료. 발을 45도 각도로 유지하세요.',
    legPressSetup: {
      script:
        '레그 프레스에서 발을 어깨너비로 벌리고 45도 각도로 발판에 올린 후 무릎이 90도가 될 때까지 천천히 내리세요.',
    },
    squatSetup: {
      script:
        '발을 어깨너비보다 살짝 넓게 벌리고 발끝을 30도 외회전한 뒤 대퇴부가 수평이 될 때까지 앉으세요.',
    },
    repCues: {
      rep1: '1회 완료! 좋습니다!',
      rep5: '5회 달성! 힘내세요!',
      rep10: '10회 완료! 완벽한 세트입니다!',
      general: '반복 완료!',
    },
    cues: {
      kneeValgus: '무릎을 45도 바깥쪽으로 벌리세요!',
      depthIncomplete: '90도 깊이까지 충분히 내려가세요!',
      lumbarFlexion: '가슴을 펴고 허리를 중립으로 유지하세요!',
      elbowFlare: '팔꿈치를 몸통에 45도 각도로 당기세요!',
      hipSag: '코어에 힘을 주고 골반을 일직선으로 유지하세요!',
    },
  },
  {
    code: 'zh',
    bcp47: 'zh-CN',
    name: 'Chinese',
    nativeName: '中文',
    region: 'China / East Asia',
    flag: '🇨🇳',
    welcomeMessage: '中文语音教练就绪。在腿举机上保持双脚45度角。',
    legPressSetup: {
      script:
        '在倒蹬机上将双脚置于踏板，与肩同宽微向外呈45度角，平稳下落至膝盖成90度，下背紧贴靠背。',
    },
    squatSetup: {
      script:
        '双脚比肩略宽，脚尖外展30度，屈髋下蹲至大腿与地面平行，膝盖向外打开。',
    },
    repCues: {
      rep1: '第1次！良好开局！',
      rep5: '完成5次！继续保持！',
      rep10: '完成10次！完美的一组！',
      general: '动作完成！',
    },
    cues: {
      kneeValgus: '膝盖向外展开45度，防止内扣！',
      depthIncomplete: '下蹲至90度平行深度！',
      lumbarFlexion: '挺胸抬头，腰椎保持中立！',
      elbowFlare: '手肘紧贴身体两侧呈45度！',
      hipSag: '收紧核心臀部，保持躯干稳定！',
    },
  },
];

// Comprehensive explainative biomechanical guides with concrete angles & setup rules
export const BIOMECHANICAL_GUIDES: BiomechanicalGuideCue[] = [
  {
    id: 'guide-leg-press',
    name: 'Leg Press Biomechanics & Sled Depth',
    exercise: 'Leg Press',
    targetPart: 'Quadriceps, Glutes & Lumbar Protection',
    keyAngle: 'Feet at 45° angle, knee flexion to 90°',
    depthRule: 'Stop before lumbar / tailbone peels off backpad',
    english:
      'On the leg press, place your feet shoulder-width apart at roughly a 45-degree outward angle on the plate. Keep your lower back and sacrum firmly pinned against the seat, and lower the sled smoothly until your knees reach a 90-degree angle without letting your tailbone lift off the pad.',
    odia: {
      script:
        'ଲେଗ୍ ପ୍ରେସ୍‌ରେ ପାଦକୁ କାନ୍ଧ ଚଉଡ଼ାରେ ଏବଂ ୪୫ ଡିଗ୍ରୀ ବାହାର କୋଣରେ ପ୍ଲେଟ୍ ଉପରେ ରଖନ୍ତୁ। ପିଠି ଏବଂ ଅଣ୍ଟାକୁ ସିଟ୍ ସହିତ ଚାପି ରଖି ଆଣ୍ଠୁ ୯୦ ଡିଗ୍ରୀ ହେବା ଯାଏଁ ଧୀରେ ଧୀରେ ତଳକୁ ଆଣନ୍ତୁ। ଅଣ୍ଟାକୁ ଉପରକୁ ଉଠିବାକୁ ଦିଅନ୍ତୁ ନାହିଁ।',
      phonetic:
        'Leg press re paada ku kaandha chaudare ebong 45 degree baahara konare plate upare rakhantu. Pithi ku seat sahita chaapi rakhi aanthu 90 degree heba jaayen dhire dhire talaku aanantu.',
    },
    hindi: {
      script:
        'लेग प्रेस पर पैरों को कंधे की चौड़ाई पर 45 डिग्री एंगल में रखें। कमर को पीछे की सीट से सटा कर रखें और घुटनों को 90 डिग्री तक धीरे-धीरे नीचे लाएं। कमर को सीट से उठने न दें।',
      phonetic:
        'Leg press par pairon ko kandhe ki chaudai par 45 degree angle mein rakhein. Kamar ko seat se sata kar rakhein aur ghutnon ko 90 degree tak dhire-dhire niche laayein.',
    },
    tamil: {
      script:
        'லெக் பிரஸ்ஸில் கால்களை 45 டிகிரி கோணத்தில் தோள்பட்டை அகலத்தில் வையுங்கள். முதுகை சீட்டில் நன்றாக அழுத்தி முழங்கால்கள் 90 டிகிரி வளையும் வரை மெதுவாக கீழே இறக்குங்கள்.',
      phonetic:
        'Leg pressil kaalkalai 45 degree konathil tholpattai agalathil vaiyungal. Mudhugai seatil nandraga azhuthi muzhangalgal 90 degree valaiyum varai medhuvaaga keezhe irakkungal.',
    },
  },
  {
    id: 'guide-squat-setup',
    name: 'Squat Stance & Parallel Depth',
    exercise: 'Barbell / Goblet Squat',
    targetPart: 'Femur, Knee Joint & Hip Crease',
    keyAngle: 'Feet 15-30° flare, knee angle <100° at parallel',
    depthRule: 'Hip crease drops level with top of knee caps',
    english:
      'Set your feet slightly wider than shoulders, flare toes out 15 to 30 degrees, break at the hips first, and sink down until your hip crease breaks parallel with your knee joints while driving knees outward.',
    odia: {
      script:
        'ସ୍କ୍ୱାଟ୍ ପାଇଁ ପାଦକୁ କାନ୍ଧ ତୁଳନାରେ ସାମାନ୍ୟ ଚଉଡ଼ାରେ ରଖି ଆଙ୍ଗୁଠିକୁ ୧୫ ରୁ ୩୦ ଡିଗ୍ରୀ ବାହାରକୁ ଖୋଲନ୍ତୁ। ଅଣ୍ଟା ପଛକୁ ନେଇ ଆଣ୍ଠୁ ସମାନ୍ତରାଳ ହେବା ପର୍ଯ୍ୟନ୍ତ ତଳକୁ ବସନ୍ତୁ ଏବଂ ଛାତି ସିଧା ରଖନ୍ତୁ।',
      phonetic:
        'Squat pain paada ku 15 ru 30 degree baaharaku bulaai kaandha chaudare thia huantu. Antaaku pachhaku nei chhaati teki aanthu sahita samantaraala bhabe talaku basantu.',
    },
    hindi: {
      script:
        'पैरों को कंधों से थोड़ा चौड़ा रखें और पंजों को 15 से 30 डिग्री बाहर रखें। हिप्स को पीछे ले जाते हुए घुटनों के समानांतर 90 डिग्री तक नीचे जाएं और छाती तान कर रखें।',
      phonetic:
        'Pairon ko kandhon se thoda chauda rakhein aur panjon ko 15 se 30 degree bahar rakhein. Hips ko pichhe le jaate hue ghutnon ke samantar 90 degree tak niche jayein.',
    },
    tamil: {
      script:
        'கால்களை தோள்பட்டை அகலத்தில் வைத்து 15 முதல் 30 டிகிரி வெளியே திருப்புங்கள். இடுப்பை பின்னோக்கி தள்ளி முழங்கால்கள் 90 டிகிரி வளையும் வரை கீழே உட்காருங்கள்.',
      phonetic:
        'Kaalkalai tholpattai agalathil vaithu 15 mudhal 30 degree veliye thiruppungal. Iduppai pinnokki thalli muzhangalgal 90 degree valaiyum varai keezhe utkaarungal.',
    },
  },
  {
    id: 'guide-knee-valgus',
    name: 'Knee Valgus Prevention & Glute Drive',
    exercise: 'Squats & Lunges',
    targetPart: 'Knees & Medial Meniscus',
    keyAngle: 'Keep knees tracking out at 30-45° over pinky toes',
    depthRule: 'Zero medial collapse on the concentric ascent',
    english:
      'Knees are caving inward. Actively drive your knees outward over your pinky toes at roughly 30 to 45 degrees to protect your meniscus and ACL, engaging your side glutes.',
    odia: {
      script:
        'ଆଣ୍ଠୁ ଭିତରକୁ ଯାଉଛି। ଉଠିବା ସମୟରେ ଆଣ୍ଠୁକୁ ବାହାର ଆଡ଼କୁ ୪୫ ଡିଗ୍ରୀ କୋଣରେ ଠେଲି ସିଧା ରଖନ୍ତୁ, ଯାହାଦ୍ୱାରା ଆଣ୍ଠୁରେ ଆଘାତ ଲାଗିବ ନାହିଁ।',
      phonetic:
        'Aanthu bhitaraku jaauchhi. Uthiba samayare aanthu ku 45 degree baahara aadaku theli seedha rakhantu, jaahaadwaara aanthure aaghaata laagiba nahin.',
    },
    hindi: {
      script:
        'घुटने अंदर की तरफ मुड़ रहे हैं। ऊपर उठते समय घुटनों को बाहर की तरफ 45 डिग्री एंगल पर फैला कर रखें ताकि जोड़ों पर दबाव न पड़े।',
      phonetic:
        'Ghutne andar ki taraf mud rahe hain. Upar uthte samay ghutnon ko bahar ki taraf 45 degree angle par faila kar rakhein.',
    },
    tamil: {
      script:
        'முழங்கால்கள் உள்ளே மடங்குகின்றன. 45 டிகிரி கோணத்தில் முழங்கால்களை வெளியே தள்ளுங்கள்.',
      phonetic:
        'Muzhangalgal ulle madanguginrana. 45 degree konathil muzhangalgalai veliye thallungal.',
    },
  },
  {
    id: 'guide-pushup-elbows',
    name: 'Push-Up & Bench Press 45° Elbow Tuck',
    exercise: 'Push-Up & Bench Press',
    targetPart: 'Pectorals & Rotator Cuff Shoulders',
    keyAngle: 'Elbow-to-torso angle locked at 45° (not 90°)',
    depthRule: 'Chest lowers to within 2 inches of floor',
    english:
      'Do not flare your elbows 90 degrees out to the sides. Tuck them inward at roughly a 45-degree angle from your ribs to protect your rotator cuffs and maximize chest tension.',
    odia: {
      script:
        'କହୁଣୀକୁ ୯୦ ଡିଗ୍ରୀ ବାହାରକୁ ଫିଙ୍ଗନ୍ତୁ ନାହିଁ। କାନ୍ଧକୁ ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ କହୁଣୀକୁ ଶରୀର ସହିତ ୪୫ ଡିଗ୍ରୀ କୋଣରେ ଚାପି ରଖନ୍ତୁ ଏବଂ ଛାତି ତଳକୁ ନିଅନ୍ତୁ।',
      phonetic:
        'Kauhuni ku 90 degree baaharaku phingantu nahin. Kaandha ku surakshita rakhiba pain kauhuni ku sharira sahita 45 degree konare chaapi rakhantu.',
    },
    hindi: {
      script:
        'कोहनी को 90 डिग्री बाहर न फैलाएं। कंधों की सुरक्षा के लिए कोहनी को शरीर के पास 45 डिग्री एंगल पर अंदर दबा कर रखें।',
      phonetic:
        'Kohni ko 90 degree bahar na failayein. Kandhon ki suraksha ke liye kohni ko sharir ke paas 45 degree angle par andar daba kar rakhein.',
    },
    tamil: {
      script:
        'முழங்கையை 90 டிகிரி வெளியே விரிக்காமல், உடம்போடு 45 டிகிரி கோணத்தில் வைத்து புஷ்-அப் செய்யுங்கள். தோள்பட்டை பாதுகாக்கப்படும்.',
      phonetic:
        'Muzhangaiyai 90 degree veliye virikkaamal, udambodu 45 degree konathil vaithu push-up seyyungal. Tholpattai paadhukaakkappadum.',
    },
  },
  {
    id: 'guide-deadlift-lumbar',
    name: 'Spine Neutrality & Hip Hinge',
    exercise: 'Deadlift & RDL',
    targetPart: 'L4-L5 Lumbar Discs & Hamstrings',
    keyAngle: 'Spine at 0° neutral curvature, hip hinge',
    depthRule: 'Barbell travels in vertical bar path over midfoot',
    english:
      'Lower back rounding detected. Lock your spine completely neutral, pull your shoulder blades down into your back pockets, and hinge deeply at the hips without rounding your lower back.',
    odia: {
      script:
        'କଟି କଦାପି ବଙ୍କା କରନ୍ତୁ ନାହିଁ। ମେରୁଦଣ୍ଡକୁ ସମ୍ପୂର୍ଣ୍ଣ ସିଧା ରଖି ଛାତି ଟେକନ୍ତୁ, ପେଟକୁ ଟାଣ କରନ୍ତୁ ଏବଂ ଗୋଡ଼ର ଶକ୍ତି ଦେଇ ଧୀରେ ଧୀରେ ଉପରକୁ ଉଠନ୍ତୁ।',
      phonetic:
        'Antaaku kadapi bankaa karantu nahin. Merudanda ku sampurna seedha rakhi chhaati tekantu, petaku taana karantu ebong godara shakti dei dhire dhire uparaku uthantu.',
    },
    hindi: {
      script:
        'कमर को बिल्कुल भी गोल न होने दें। रीढ़ को सीधा न्यूट्रल रखें, पेट टाइट करें और पैरों की ताकत से वजन को ऊपर उठाएं।',
      phonetic:
        'Kamar ko bilkul bhi gol na hone dein. Reedh ko seedha neutral rakhein, pet tight karein aur pairon ki taakat se vajan ko upar uthayein.',
    },
    tamil: {
      script:
        'முதுகெலும்பை வளைக்காமல் நேராக வையுங்கள். தோள்பட்டையை பின்னால் இழுத்து வயிற்றை இறுக்கி, கால்களின் சக்தியால் எடையை தூக்குங்கள்.',
      phonetic:
        'Mudhugelumbai valaikkaamal neeraaga vaiyungal. Tholpattaiyai pinnaal izhutthu vayitrai irukki, kaalkalin sakthiyaal edaiyai thookkungal.',
    },
  },
  {
    id: 'guide-biceps-curl',
    name: 'Dumbbell Biceps Curl Elbow Isolation',
    exercise: 'Dumbbell Curl',
    targetPart: 'Biceps Brachii & Forearms',
    keyAngle: 'Elbows pinned at sides, 45° peak contraction',
    depthRule: 'Controlled 3-second negative descent',
    english:
      'Lock your elbows tight against your ribcage. Curl the weight up without swinging your torso, pause for a squeeze at the top, and take 3 seconds to lower down under strict control.',
    odia: {
      script:
        'କହୁଣୀକୁ ଅଣ୍ଟା ପାଖରେ ସ୍ଥିର କରି ଚାପି ରଖନ୍ତୁ। ଶରୀରକୁ ନ ଦୋହଲାଇ ହାତ ଉଠାନ୍ତୁ ଏବଂ ୩ ସେକେଣ୍ଡ ନିୟନ୍ତ୍ରଣ ରଖି ଧୀରେ ଧୀରେ ତଳକୁ ଓହ୍ଲାନ୍ତୁ।',
      phonetic:
        'Kauhuni ku anta paakhare sthira kari chaapi rakhantu. Sharira ku na dohalaai haata uthaantu ebong 3 second niyantrana rakhi dhire dhire talaku ohlaantu.',
    },
    hindi: {
      script:
        'कोहनी को पसलियों के पास स्थिर रखें। शरीर को बिना झुलाए वजन उठाएं और 3 सेकंड का कंट्रोल रखते हुए धीरे-धीरे नीचे लाएं।',
      phonetic:
        'Kohni ko pasliyon ke paas sthir rakhein. Sharir ko bina jhulaaye vajan uthayein aur 3 second ka control rakhte hue dhire-dhire niche laayein.',
    },
    tamil: {
      script:
        'முழங்கையை விலா எலும்போடு ஒட்டி அசைக்காமல் வையுங்கள். உடலை ஆட்டாமல் எடையை தூக்கி, 3 வினாடிகள் கட்டுப்பாட்டுடன் மெதுவாக கீழே இறக்குங்கள்.',
      phonetic:
        'Muzhangaiyai vilaa elumbodu otti asaikkaamal vaiyungal. Udalai aattamaal edaiyai thookki, 3 vinaadikal kattuppaattudan medhuvaaga keezhe irakkungal.',
    },
  },
];

const DEFAULT_SETTINGS: VoiceCoachSettings = {
  enabled: true,
  persona: 'high_energy',
  language: 'en',
  volume: 0.9,
  rate: 1.0,
  pitch: 1.0,
  soundEffectsEnabled: true,
  metronomeBpm: 60,
};

const STORAGE_KEY = 'fitness_voice_coach_settings';

class VoiceCoachService {
  private settings: VoiceCoachSettings;
  private audioCtx: AudioContext | null = null;
  private lastSpokenTime = 0;
  private minIntervalMs = 2500;
  private metronomeTimer: number | null = null;
  private recognition: any = null;
  private isListening = false;

  constructor() {
    this.settings = this.loadSettings();
  }

  private loadSettings(): VoiceCoachSettings {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // fallback
    }
    return { ...DEFAULT_SETTINGS };
  }

  public saveSettings(updated: Partial<VoiceCoachSettings>) {
    this.settings = { ...this.settings, ...updated };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {
      // ignore
    }
  }

  public getSettings(): VoiceCoachSettings {
    return { ...this.settings };
  }

  public getLanguageOption(code: VoiceLanguage): LanguageOption {
    return (
      SUPPORTED_LANGUAGES.find((l) => l.code === code) ||
      SUPPORTED_LANGUAGES.find((l) => l.code === 'en')!
    );
  }

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Speak arbitrary text using browser Web Speech API with full BCP-47 language matching
   */
  public speak(text: string, force = false, targetLang?: VoiceLanguage): void {
    if (!this.settings.enabled && !force) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const now = Date.now();
    if (!force && now - this.lastSpokenTime < this.minIntervalMs) {
      return;
    }
    this.lastSpokenTime = now;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = this.settings.volume;
      utterance.rate = this.settings.rate;
      utterance.pitch = this.settings.pitch;

      const langCode = targetLang || this.settings.language;
      const langOption = this.getLanguageOption(langCode);
      utterance.lang = langOption.bcp47;

      const voices = window.speechSynthesis.getVoices();

      // Find best matching voice for the target language
      const exactVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith(langOption.code) ||
          v.lang.toLowerCase().replace('_', '-').includes(langOption.bcp47.toLowerCase())
      );

      if (exactVoice) {
        utterance.voice = exactVoice;
      } else if (langOption.bcp47.includes('IN')) {
        // Fallback Indian voice for Indian subcontinent languages if specific regional TTS is uninstalled
        const indianVoice = voices.find(
          (v) =>
            v.lang.includes('IN') ||
            v.lang.startsWith('hi') ||
            v.name.includes('Indian') ||
            v.name.includes('Hindi')
        );
        if (indianVoice) utterance.voice = indianVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  /**
   * Announce rep completion in currently active language
   */
  public announceRep(repNumber: number): void {
    if (!this.settings.enabled) return;

    if (this.settings.soundEffectsEnabled) {
      this.playRepChime();
    }

    const lang = this.getLanguageOption(this.settings.language);
    let text = `${repNumber} ${lang.repCues.general}`;

    if (repNumber === 1) text = lang.repCues.rep1;
    else if (repNumber === 5) text = lang.repCues.rep5;
    else if (repNumber === 10) text = lang.repCues.rep10;

    this.speak(text);
  }

  /**
   * Announce real-time form correction cues in currently active language
   */
  public announceCorrection(issueKey: string): void {
    if (!this.settings.enabled) return;

    const lang = this.getLanguageOption(this.settings.language);
    let cue = lang.cues.kneeValgus;

    if (issueKey.includes('valgus')) cue = lang.cues.kneeValgus;
    else if (issueKey.includes('depth')) cue = lang.cues.depthIncomplete;
    else if (issueKey.includes('lumbar') || issueKey.includes('lean')) cue = lang.cues.lumbarFlexion;
    else if (issueKey.includes('elbow')) cue = lang.cues.elbowFlare;
    else if (issueKey.includes('sag')) cue = lang.cues.hipSag;

    if (this.settings.soundEffectsEnabled) {
      this.playWarningBeep();
    }

    this.speak(cue);
  }

  /**
   * Speaks explainative Leg Press 45° & 90° setup in selected language
   */
  public speakLegPressGuide(langCode?: VoiceLanguage): void {
    const lang = this.getLanguageOption(langCode || this.settings.language);
    let text = lang.legPressSetup.script;
    if (lang.code === 'or' && !this.hasNativeVoiceFor('or') && lang.legPressSetup.phonetic) {
      text = lang.legPressSetup.phonetic;
    } else if (lang.code === 'ta' && !this.hasNativeVoiceFor('ta') && lang.legPressSetup.phonetic) {
      text = lang.legPressSetup.phonetic;
    }
    this.speak(text, true, lang.code);
  }

  /**
   * Speaks explainative biomechanical guide by cueId
   */
  public speakBiomechanicalGuide(guideId: string, customLang?: VoiceLanguage): void {
    const guide = BIOMECHANICAL_GUIDES.find((g) => g.id === guideId);
    if (!guide) return;

    const langCode = customLang || this.settings.language;
    if (langCode === 'or') {
      const text = this.hasNativeVoiceFor('or') ? guide.odia.script : guide.odia.phonetic;
      this.speak(text, true, 'or');
    } else if (langCode === 'hi') {
      this.speak(guide.hindi.script, true, 'hi');
    } else if (langCode === 'ta' && guide.tamil) {
      const text = this.hasNativeVoiceFor('ta') ? guide.tamil.script : (guide.tamil.phonetic || guide.tamil.script);
      this.speak(text, true, 'ta');
    } else {
      this.speak(guide.english, true, 'en');
    }
  }

  /**
   * Speaks biomechanical setup cue for any exercise in the exercise library
   */
  public speakExerciseVoiceCue(
    exercise: { id: string; name: string; shortCueText?: string; muscleGroup?: string; equipment?: string },
    customLang?: VoiceLanguage
  ): void {
    const langCode = customLang || this.settings.language;
    const localizedCues: Record<string, { ta?: string; or?: string; hi?: string; en?: string }> = {
      leg_press: {
        ta: 'லெக் பிரஸ்: கால்களை தோள்பட்டை அகலத்தில் 45 டிகிரி கோணத்தில் வைத்து, முழங்கால்கள் 90 டிகிரி வளையும் வரை மெதுவாக இறக்குங்கள்.',
        or: 'ଲେଗ୍ ପ୍ରେସ୍: ପାଦକୁ ୪୫ ଡିଗ୍ରୀ ବାହାର କୋଣରେ ରଖି ଆଣ୍ଠୁ ୯୦ ଡିଗ୍ରୀ ହେବା ଯାଏଁ ତଳକୁ ଆଣନ୍ତୁ।',
        hi: 'लेग प्रेस: पैरों को 45 डिग्री एंगल पर रखें और घुटनों को 90 डिग्री तक नीचे लाएं।',
        en: '45° Leg Press: Feet shoulder-width on carriage at 45 degrees, lower back pressed firm.',
      },
      barbell_back_squat: {
        ta: 'பார்பெல் பேக் ஸ்குவாட்: முழங்கால்களை 45 டிகிரி வெளியே தள்ளி, மார்பை நிமிர்த்தி 90 டிகிரி வரை கீழே உட்காருங்கள்.',
        or: 'ବାରବେଲ ବ୍ୟାକ୍ ସ୍କ୍ୱାଟ୍: ଆଣ୍ଠୁ ବାହାରକୁ ଠେଲନ୍ତୁ, ଛାତି ସିଧା ରଖନ୍ତୁ ଏବଂ ସମାନ୍ତରାଳ ଭାବେ ତଳକୁ ବସନ୍ତୁ।',
        hi: 'बारबेल बैक स्क्वाट: घुटनों को बाहर रखें, छाती तान कर रखें और 90 डिग्री समानांतर तक नीचे जाएं।',
        en: 'Barbell Back Squat: Drive knees out, keep chest proud, hit parallel depth.',
      },
      bodyweight_squat: {
        ta: 'பாடிவெயிட் ஸ்குவாட்: நாற்காலியில் அமர்வது போல் இடுப்பை பின்னோக்கி தள்ளி முழங்கால்களை 90 டிகிரி வளைக்கவும்.',
        or: 'ବଡ଼ିୱେଟ୍ ସ୍କ୍ୱାଟ୍: ଚୌକିରେ ବସିବା ଭଳି ଅଣ୍ଟା ପଛକୁ ନେଇ ସନ୍ତୁଳନ ରଖି ତଳକୁ ବସନ୍ତୁ।',
        hi: 'बॉडीवेट स्क्वाट: कुर्सी पर बैठने की तरह हिप्स को पीछे ले जाएं और संतुलन बनाए रखें।',
        en: 'Bodyweight Squat: Sit hips back as if onto a chair, weight in midfoot.',
      },
      standard_push_up: {
        ta: 'ஸ்டாண்டர்ட் புஷ்-அப்: முழங்கையை உடம்போடு 45 டிகிரி கோணத்தில் வைத்து, உடலை நேராக வைத்து மார்பை தரைக்கு இறக்குங்கள்.',
        or: 'ଷ୍ଟାଣ୍ଡାର୍ଡ ପୁସ୍-ଅପ୍: କହୁଣୀକୁ ଶରୀର ସହିତ ୪୫ ଡିଗ୍ରୀରେ ଚାପି ରଖି ଛାତି ତଳକୁ ନିଅନ୍ତୁ।',
        hi: 'स्टैंडर्ड पुश-अप: कोहनी को शरीर के पास 45 डिग्री एंगल पर रखें और कोर को सीधा रखें।',
        en: 'Standard Push-Up: Lock elbows at 45 degrees to ribs, rigid plank, full chest depth.',
      },
      barbell_bench_press: {
        ta: 'பார்பெல் பெஞ்ச் பிரஸ்: கால்களை தரையில் ஊன்றி, முழங்கையை 45 டிகிரி கோணத்தில் வைத்து கம்பியை மார்பில் தொடவும்.',
        or: 'ବାରବେଲ ବେଞ୍ଚ ପ୍ରେସ୍: ପାଦ ଭୂମିରେ ଦୃଢ଼ ରଖନ୍ତୁ, କହୁଣୀ ୪୫ ଡିଗ୍ରୀରେ ଚାପି ବାର୍ ଛାତି ପାଖକୁ ଆଣନ୍ତୁ।',
        hi: 'बारबेल बेंच प्रेस: पैरों को फर्श पर जमाएं, कोहनी 45 डिग्री पर रखें और बार को छाती तक लाएं।',
        en: 'Barbell Bench Press: Plant feet, retract scapulae, lower bar with 45° tucked elbows.',
      },
      barbell_deadlift: {
        ta: 'பார்பெல் டெட்லிப்ட்: முதுகெலும்பை நேராக வைத்து, இடுப்பை பின்னுக்கு தள்ளி கால்களின் சக்தியால் எடையை தூக்குங்கள்.',
        or: 'ବାରବେଲ ଡେଡଲିଫ୍ଟ: ମେରୁଦଣ୍ଡ ସିଧା ରଖନ୍ତୁ, ଛାତି ଟେକନ୍ତୁ ଏବଂ ଗୋଡ଼ର ଶକ୍ତିରେ ଓଜନ ଉଠାନ୍ତୁ।',
        hi: 'बारबेल डेडलिफ्ट: रीढ़ को सीधा न्यूट्रल रखें, हिप्स पीछे ले जाएं और पैरों की ताकत से उठाएं।',
        en: 'Conventional Barbell Deadlift: Neutral spine, pull slack out of bar, drive floor away with legs.',
      },
      db_biceps_curl: {
        ta: 'டம்பல் பைசெப்ஸ் கர்ல்: முழங்கையை விலா எலும்போடு ஒட்டி அசைக்காமல் வையுங்கள், 3 வினாடிகள் மெதுவாக கீழே இறக்குங்கள்.',
        or: 'ଡମ୍ବବେଲ ବାଇସେପ୍ସ କର୍ଲ: କହୁଣୀ ସ୍ଥିର ରଖନ୍ତୁ ଏବଂ ୩ ସେକେଣ୍ଡ ନିୟନ୍ତ୍ରଣରେ ଧୀରେ ଧୀରେ ତଳକୁ ଆଣନ୍ତୁ।',
        hi: 'डम्बल बाइसेप्स कर्ल: कोहनी पसलियों से चिपका कर रखें और 3 सेकंड में धीरे-धीरे नीचे लाएं।',
        en: 'Standing Dumbbell Biceps Curl: Lock elbows at ribs, zero torso swing, 3-second negative descent.',
      },
      plank: {
        ta: 'பிளாங்க்: முழங்கைகளை தரையில் ஊன்றி, வயிற்றையும் பிட்டத்தையும் இறுக்கி உடலை நேர்கோட்டில் வையுங்கள்.',
        or: 'ପ୍ଲାଙ୍କ୍: କହୁଣୀ ଉପରେ ଶରୀର ରଖି ପେଟ ଏବଂ ଅଣ୍ଟାକୁ ସମ୍ପୂର୍ଣ୍ଣ ସିଧା ଟାଣ କରି ରଖନ୍ତୁ।',
        hi: 'फोरआर्म प्लैंक: कोहनी जमीन पर टिकाएं, पेट और हिप्स को टाइट करके शरीर को सीधा रखें।',
        en: 'Forearm Plank: Elbows under shoulders, squeeze glutes and maintain rigid neutral spine.',
      },
      lat_pulldown: {
        ta: 'லேட் புல்டவுன்: தோள்பட்டையை கீழ்நோக்கி இழுத்து, கம்பியை மேல் மார்பை நோக்கி மெதுவாக இழுக்கவும்.',
        or: 'ଲ୍ୟାଟ୍ ପୁଲ୍‌ଡାଉନ୍: କାନ୍ଧକୁ ତଳକୁ ଚାପି ବାରକୁ ଉପର ଛାତି ଆଡ଼କୁ ଧୀରେ ଧୀରେ ଟାଣନ୍ତୁ।',
        hi: 'लैट पुलडाउन: कंधों को नीचे खींचें और बार को ऊपरी छाती तक धीरे-धीरे लाएं।',
        en: 'Cable Lat Pulldown: Depress shoulder blades, drive elbows down to ribs, pull to collarbone.',
      },
      db_overhead_press: {
        ta: 'டம்பல் ஷோல்டர் பிரஸ்: வயிற்றை இறுக்கி, முழங்கையை சற்று முன்னோக்கி வைத்து டம்பல்களை தலைக்கு மேல் தூக்கவும்.',
        or: 'ଡମ୍ବବେଲ ସୋଲ୍ଡର ପ୍ରେସ୍: ପେଟ ଟାଣ ରଖି ଡମ୍ବବେଲକୁ ମୁଣ୍ଡ ଉପରକୁ ସିଧା ଉଠାନ୍ତୁ।',
        hi: 'डम्बल शोल्डर प्रेस: कोर टाइट रखें और डम्बल को सिर के ऊपर सीधा उठाएं।',
        en: 'Seated Dumbbell Shoulder Press: Tight core, press overhead without excessive lower back arch.',
      },
      cable_triceps_pushdown: {
        ta: 'டிரைசெப்ஸ் புஷ்டவுன்: முழங்கையை உடலோடு அசையாமல் நிறுத்தி, கயிற்றை கீழே முழுமையாக விரிக்கவும்.',
        or: 'ଟ୍ରାଇସେପ୍ସ ପୁସଡାଉନ୍: କହୁଣୀ ସ୍ଥିର ରଖି ଦଉଡ଼ିକୁ ତଳକୁ ସମ୍ପୂର୍ଣ୍ଣ ଲମ୍ବା କରନ୍ତୁ।',
        hi: 'ट्राइसेप्स पुशडाउन: कोहनी को शरीर के पास स्थिर रखें और रस्सी को नीचे तक पूरा सीधा करें।',
        en: 'Cable Triceps Pushdown: Pin elbows to sides, fully extend triceps at bottom without swaying.',
      },
    };

    const specific = localizedCues[exercise.id];
    let cueText = exercise.shortCueText || exercise.name;
    if (specific) {
      if (langCode === 'ta' && specific.ta) cueText = specific.ta;
      else if (langCode === 'or' && specific.or) cueText = specific.or;
      else if (langCode === 'hi' && specific.hi) cueText = specific.hi;
      else if (specific.en) cueText = specific.en;
    } else {
      if (langCode === 'ta') {
        cueText = `${exercise.name}: ${exercise.shortCueText || 'சரியான வடிவம் மற்றும் கட்டுப்பாட்டை பராமரிக்கவும்.'}`;
      } else if (langCode === 'or') {
        cueText = `${exercise.name}: ${exercise.shortCueText || 'ସଠିକ୍ ସନ୍ତୁଳନ ଏବଂ ନିୟନ୍ତ୍ରଣ ରଖନ୍ତୁ।'}`;
      } else if (langCode === 'hi') {
        cueText = `${exercise.name}: ${exercise.shortCueText || 'सही फॉर्म और नियंत्रण बनाए रखें।'}`;
      } else {
        cueText = `${exercise.name}. ${exercise.shortCueText || 'Maintain strict form and control.'}`;
      }
    }

    this.speak(cueText, true, langCode);
  }

  public hasNativeVoiceFor(langCode: string): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    const voices = window.speechSynthesis.getVoices();
    return voices.some(
      (v) =>
        v.lang.toLowerCase().replace('_', '-').startsWith(langCode) ||
        v.lang.toLowerCase().replace('_', '-').includes(langCode)
    );
  }

  /**
   * Web Audio API synthesized clean chord chime
   */
  public playRepChime(): void {
    if (!this.settings.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const freqs = [659.25, 987.77];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.08 * this.settings.volume, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.4);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Subtle alert beep for biomechanical deviation warning
   */
  public playWarningBeep(): void {
    if (!this.settings.soundEffectsEnabled) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(370, now + 0.1);

      gain.gain.setValueAtTime(0.12 * this.settings.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // ignore
    }
  }

  /**
   * Interactive metronome with eccentric, isometric hold, and concentric pacing
   */
  public startMetronome(
    tempo: { downSeconds: number; pauseSeconds: number; upSeconds: number },
    onPhaseChange?: (phase: 'down' | 'pause' | 'up', count: number) => void
  ): void {
    this.stopMetronome();
    let currentPhase: 'down' | 'pause' | 'up' = 'down';
    let currentSeconds = 1;

    const tick = () => {
      try {
        const ctx = this.getAudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const freq = currentPhase === 'up' ? 880 : currentPhase === 'pause' ? 330 : 520;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.09 * this.settings.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      } catch {
        // ignore
      }

      if (onPhaseChange) {
        onPhaseChange(currentPhase, currentSeconds);
      }

      if (currentPhase === 'down') {
        if (currentSeconds >= tempo.downSeconds) {
          currentPhase = tempo.pauseSeconds > 0 ? 'pause' : 'up';
          currentSeconds = 1;
        } else {
          currentSeconds++;
        }
      } else if (currentPhase === 'pause') {
        if (currentSeconds >= tempo.pauseSeconds) {
          currentPhase = 'up';
          currentSeconds = 1;
        } else {
          currentSeconds++;
        }
      } else if (currentPhase === 'up') {
        if (currentSeconds >= tempo.upSeconds) {
          currentPhase = 'down';
          currentSeconds = 1;
        } else {
          currentSeconds++;
        }
      }
    };

    tick();
    this.metronomeTimer = setInterval(tick, 1000) as unknown as number;
  }

  public stopMetronome(): void {
    if (this.metronomeTimer !== null) {
      clearInterval(this.metronomeTimer);
      this.metronomeTimer = null;
    }
  }

  /**
   * Hands-free speech recognition (listening for commands: "start", "stop", "count", "next")
   */
  public startSpeechRecognition(onCommand: (command: string) => void): boolean {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return false;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      const langOption = this.getLanguageOption(this.settings.language);
      this.recognition.lang = langOption.bcp47;

      this.recognition.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        if (lastResult && lastResult[0]) {
          const transcript = lastResult[0].transcript.trim().toLowerCase();
          if (
            transcript.includes('start') ||
            transcript.includes('begin') ||
            transcript.includes('shuru') ||
            transcript.includes('aarambha') ||
            transcript.includes('thodangu')
          ) {
            onCommand('start');
          } else if (
            transcript.includes('stop') ||
            transcript.includes('pause') ||
            transcript.includes('ruko') ||
            transcript.includes('thama') ||
            transcript.includes('nillu')
          ) {
            onCommand('stop');
          } else if (
            transcript.includes('count') ||
            transcript.includes('reps') ||
            transcript.includes('gin') ||
            transcript.includes('enukku')
          ) {
            onCommand('count');
          } else if (transcript.includes('reset')) {
            onCommand('reset');
          } else if (transcript.includes('coach') || transcript.includes('mute')) {
            onCommand('toggle_mute');
          }
        }
      };

      this.recognition.onerror = () => {
        this.isListening = false;
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          try {
            this.recognition?.start();
          } catch {
            this.isListening = false;
          }
        }
      };

      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (e) {
      console.warn('Voice command recognition failed:', e);
      this.isListening = false;
      return false;
    }
  }

  public stopSpeechRecognition(): void {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.recognition = null;
    }
  }

  public isVoiceRecognitionActive(): boolean {
    return this.isListening;
  }
}

export const voiceCoach = new VoiceCoachService();
