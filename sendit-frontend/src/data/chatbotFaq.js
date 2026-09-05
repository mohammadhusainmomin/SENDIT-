export const SUPPORT_LINKS = {
  email: "mmbrothersteam@gmail.com",
  whatsapp: "https://wa.me/919725686429",
  contact: "/contact",
};

export const LANGUAGE_PRIORITY = ["gu", "hi", "en"];

export const LANGUAGE_NAMES = {
  en: "English",
  hi: "Hindi",
  gu: "Gujarati",
};

export const LANGUAGE_HINTS = {
  en: [
    "how",
    "what",
    "why",
    "where",
    "send",
    "receive",
    "download",
    "upload",
    "file",
    "code",
    "secure",
    "safe",
    "privacy",
    "expiry",
    "account",
    "login",
    "support",
    "help",
    "price",
    "free",
  ],
  hi: [
    "कैसे",
    "क्या",
    "क्यों",
    "नहीं",
    "मेरा",
    "मेरी",
    "मुझे",
    "भेज",
    "प्राप्त",
    "मिले",
    "सुरक्षित",
    "मदद",
    "संपर्क",
    "कीमत",
    "मुफ्त",
    "muje",
    "mujhe",
    "kaise",
    "kya",
    "kyu",
    "nahi",
    "mera",
    "meri",
    "hai",
    "bheju",
    "bhejna",
    "chahiye",
    "kitni",
    "paise",
  ],
  gu: [
    "કેવી",
    "રીતે",
    "શું",
    "કેમ",
    "નથી",
    "મારો",
    "મારી",
    "મને",
    "મોકલ",
    "મેળવ",
    "મળે",
    "સુરક્ષિત",
    "મદદ",
    "સંપર્ક",
    "કિંમત",
    "મફત",
    "hu",
    "hun",
    "kem",
    "shu",
    "nathi",
    "maro",
    "mari",
    "mane",
    "chhe",
    "moklu",
    "melvu",
    "male",
    "joie",
    "ketlo",
    "ketla",
    "vagar",
  ],
};

export const CHATBOT_SUGGESTIONS = [
  {
    en: "How do I send a file?",
    hi: "मैं फ़ाइल कैसे भेजूं?",
    gu: "હું ફાઇલ કેવી રીતે મોકલું?",
  },
  {
    en: "How do I receive files?",
    hi: "मैं फ़ाइल कैसे प्राप्त करूं?",
    gu: "હું ફાઇલ કેવી રીતે મેળવી શકું?",
  },
  {
    en: "Is SendIt secure?",
    hi: "क्या SendIt सुरक्षित है?",
    gu: "શું SendIt સુરક્ષિત છે?",
  },
  {
    en: "My code is not working",
    hi: "मेरा कोड काम नहीं कर रहा",
    gu: "મારો કોડ કામ કરતો નથી",
  },
];

export const CHATBOT_COPY = {
  welcome: {
    en: "Hi! Ask me about sending files, receiving codes, privacy, expiry, accounts, or Drop Rooms.",
    hi: "नमस्ते! आप मुझसे फ़ाइल भेजने, कोड प्राप्त करने, गोपनीयता, एक्सपायरी, अकाउंट या Drop Rooms के बारे में पूछ सकते हैं।",
    gu: "નમસ્તે! તમે મને ફાઇલ મોકલવા, કોડ મેળવવા, પ્રાઇવસી, એક્સપાયરી, એકાઉન્ટ અથવા Drop Rooms વિશે પૂછી શકો છો.",
  },
  fallbackTitle: {
    en: "Contact Support",
    hi: "सपोर्ट से संपर्क करें",
    gu: "સપોર્ટનો સંપર્ક કરો",
  },
  fallbackAnswer: {
    en: "I could not match that to a SendIt help topic yet. Please contact support and include the code, page, or error message you saw.",
    hi: "मैं इसे अभी SendIt के किसी मदद विषय से मिला नहीं पाया। कृपया सपोर्ट से संपर्क करें और कोड, पेज या दिखा हुआ एरर मैसेज शामिल करें।",
    gu: "હું આને હજી SendItના મદદ વિષય સાથે મેળાવી શક્યો નથી. કૃપા કરીને સપોર્ટનો સંપર્ક કરો અને કોડ, પેજ અથવા દેખાયેલ એરર મેસેજ લખો.",
  },
  contactButton: {
    en: "Contact Support",
    hi: "सपोर्ट से संपर्क करें",
    gu: "સપોર્ટનો સંપર્ક કરો",
  },
  emailButton: {
    en: "Email",
    hi: "ईमेल",
    gu: "ઇમેઇલ",
  },
  whatsappButton: {
    en: "WhatsApp",
    hi: "WhatsApp",
    gu: "WhatsApp",
  },
  placeholder: {
    en: "Ask about files, codes, expiry...",
    hi: "Files, codes, expiry के बारे में पूछें...",
    gu: "Files, codes, expiry વિશે પૂછો...",
  },
};

export const chatbotFaq = [
  {
    id: "send-files",
    title: {
      en: "Send files",
      hi: "फ़ाइल भेजना",
      gu: "ફાઇલ મોકલવી",
    },
    answer: {
      en: "Open Send File, choose one or more files, set an expiry time, upload, then share the 4-digit code with your receiver.",
      hi: "Send File पेज खोलें, एक या अधिक फ़ाइल चुनें, एक्सपायरी समय सेट करें, अपलोड करें और 4 अंकों का कोड receiver के साथ शेयर करें।",
      gu: "Send File પેજ ખોલો, એક અથવા વધુ ફાઇલ પસંદ કરો, એક્સપાયરી સમય સેટ કરો, અપલોડ કરો અને 4 અંકનો કોડ receiver સાથે શેર કરો.",
    },
    keywords: {
      en: ["send", "send file", "send files", "upload", "upload file", "upload files", "share file", "share files", "multiple files", "file transfer", "choose file"],
      hi: ["भेज", "फ़ाइल भेज", "फाइल भेज", "अपलोड", "शेयर", "कई फाइल", "फाइल ट्रांसफर", "फाइल चुन", "kaise bheju", "file bheju", "file bhejna", "upload karu", "share karu"],
      gu: ["મોકલ", "ફાઇલ મોકલ", "ફાઈલ મોકલ", "અપલોડ", "શેર", "ઘણી ફાઇલ", "ફાઇલ ટ્રાન્સફર", "ફાઇલ પસંદ", "kem moklu", "file moklu", "moklav", "moklu", "upload karu", "share karu", "kevi rite moklu"],
    },
    cta: {
      href: "/send",
      label: {
        en: "Open Send File",
        hi: "Send File खोलें",
        gu: "Send File ખોલો",
      },
    },
  },
  {
    id: "receive-files",
    title: {
      en: "Receive files",
      hi: "फ़ाइल प्राप्त करना",
      gu: "ફાઇલ મેળવવી",
    },
    answer: {
      en: "Open Receive File, enter the sender's 4-digit code, and download the available file or file bundle before it expires.",
      hi: "Receive File खोलें, sender का 4 अंकों वाला कोड डालें और expiry से पहले उपलब्ध फ़ाइल या file bundle डाउनलोड करें।",
      gu: "Receive File ખોલો, senderનો 4 અંકનો કોડ નાખો અને expiry પહેલાં ઉપલબ્ધ ફાઇલ અથવા file bundle ડાઉનલોડ કરો.",
    },
    keywords: {
      en: ["receive", "receive file", "receive files", "download", "download file", "download files", "get file", "access code", "enter code", "retrieve", "receiver"],
      hi: ["प्राप्त", "डाउनलोड", "फाइल लेना", "कोड डाल", "कोड दर्ज", "रिसीव", "receiver", "मिले", "kaise receive", "file kaise mile", "file mile", "download karu", "code dalu", "code enter"],
      gu: ["મેળવ", "ડાઉનલોડ", "ફાઇલ લેવા", "કોડ નાખ", "કોડ દાખલ", "રીસીવ", "receiver", "મળે", "kem melvu", "file male", "download karu", "code nakhu", "code enter", "kevi rite melvu"],
    },
    cta: {
      href: "/receive",
      label: {
        en: "Open Receive File",
        hi: "Receive File खोलें",
        gu: "Receive File ખોલો",
      },
    },
  },
  {
    id: "send-code",
    title: {
      en: "Share code snippets",
      hi: "कोड snippet शेयर करना",
      gu: "કોડ snippet શેર કરવી",
    },
    answer: {
      en: "Use Send Code to paste your snippet, choose or auto-detect the language, format it, set an expiry, and generate a temporary share code.",
      hi: "Send Code में snippet paste करें, language चुनें या auto-detect रहने दें, format करें, expiry सेट करें और temporary share code बनाएं।",
      gu: "Send Codeમાં snippet paste કરો, language પસંદ કરો અથવા auto-detect રાખો, format કરો, expiry સેટ કરો અને temporary share code બનાવો.",
    },
    keywords: {
      en: ["send code", "share code", "code snippet", "snippet", "syntax", "highlight", "formatter", "programming", "developer"],
      hi: ["कोड भेज", "कोड शेयर", "snippet", "स्निपेट", "syntax", "highlight", "format", "developer", "code bheju", "code bhejna", "code share karu", "snippet bheju"],
      gu: ["કોડ મોકલ", "કોડ શેર", "snippet", "સ્નિપેટ", "syntax", "highlight", "format", "developer", "code moklu", "code share karu", "snippet moklu"],
    },
    cta: {
      href: "/code/send",
      label: {
        en: "Open Send Code",
        hi: "Send Code खोलें",
        gu: "Send Code ખોલો",
      },
    },
  },
  {
    id: "receive-code",
    title: {
      en: "Receive code snippets",
      hi: "कोड snippet प्राप्त करना",
      gu: "કોડ snippet મેળવવી",
    },
    answer: {
      en: "Open Receive Code, enter the temporary code, and SendIt will show the highlighted snippet while the share is still active.",
      hi: "Receive Code खोलें, temporary code डालें और share active रहने तक SendIt highlighted snippet दिखाएगा।",
      gu: "Receive Code ખોલો, temporary code નાખો અને share active હોય ત્યાં સુધી SendIt highlighted snippet બતાવશે.",
    },
    keywords: {
      en: ["receive code", "get code", "view code", "view snippet", "code receive", "highlighted code", "paste code"],
      hi: ["कोड प्राप्त", "कोड देख", "snippet देख", "receive code", "highlighted code", "कोड मिला", "code dekhu", "code receive karu", "snippet mile"],
      gu: ["કોડ મેળવ", "કોડ જો", "snippet જો", "receive code", "highlighted code", "કોડ મળ્યો", "code jovu", "code melvu", "snippet male"],
    },
    cta: {
      href: "/code/receive",
      label: {
        en: "Open Receive Code",
        hi: "Receive Code खोलें",
        gu: "Receive Code ખોલો",
      },
    },
  },
  {
    id: "expiry",
    title: {
      en: "Expiry time",
      hi: "एक्सपायरी समय",
      gu: "એક્સપાયરી સમય",
    },
    answer: {
      en: "The sender chooses the expiry before creating a file or code share. After that time passes, the temporary code stops working and the content is no longer available.",
      hi: "फ़ाइल या code share बनाने से पहले sender expiry चुनता है। समय पूरा होने के बाद temporary code काम करना बंद कर देता है और content उपलब्ध नहीं रहता।",
      gu: "ફાઇલ અથવા code share બનાવતા પહેલાં sender expiry પસંદ કરે છે. સમય પૂરો થયા પછી temporary code કામ કરતો નથી અને content ઉપલબ્ધ રહેતું નથી.",
    },
    keywords: {
      en: ["expiry", "expire", "expired", "expiration", "time limit", "how long", "active", "deadline", "available"],
      hi: ["एक्सपायरी", "expire", "expired", "समय सीमा", "कितनी देर", "active", "deadline", "उपलब्ध", "खत्म", "kitni der", "kab tak", "time limit", "samay"],
      gu: ["એક્સપાયરી", "expire", "expired", "સમય મર્યાદા", "કેટલો સમય", "active", "deadline", "ઉપલબ્ધ", "સમાપ્ત", "ketlo samay", "kya sudhi", "time limit", "samay"],
    },
  },
  {
    id: "privacy-security",
    title: {
      en: "Privacy and security",
      hi: "गोपनीयता और सुरक्षा",
      gu: "પ્રાઇવસી અને સુરક્ષા",
    },
    answer: {
      en: "SendIt uses temporary access codes, sender-selected expiry windows, HTTPS in transit, and minimal sharing details. For sensitive content, choose a shorter expiry and share codes through trusted channels.",
      hi: "SendIt temporary access codes, sender-selected expiry, HTTPS transfer और कम से कम sharing details का उपयोग करता है। Sensitive content के लिए छोटी expiry चुनें और code trusted channel से ही शेयर करें।",
      gu: "SendIt temporary access codes, sender-selected expiry, HTTPS transfer અને ઓછી sharing detailsનો ઉપયોગ કરે છે. Sensitive content માટે નાની expiry પસંદ કરો અને code trusted channelથી જ શેર કરો.",
    },
    keywords: {
      en: ["secure", "security", "privacy", "safe", "encrypted", "https", "protected", "sensitive", "trust"],
      hi: ["सुरक्षित", "सुरक्षा", "गोपनीयता", "privacy", "encrypted", "https", "protected", "sensitive", "भरोसा", "safe hai", "secure hai", "surakshit", "privacy kya"],
      gu: ["સુરક્ષિત", "સુરક્ષા", "પ્રાઇવસી", "privacy", "encrypted", "https", "protected", "sensitive", "વિશ્વાસ", "safe chhe", "secure chhe", "surakshit", "privacy shu"],
    },
    cta: {
      href: "/privacy",
      label: {
        en: "Read Privacy Policy",
        hi: "Privacy Policy पढ़ें",
        gu: "Privacy Policy વાંચો",
      },
    },
  },
  {
    id: "account-history",
    title: {
      en: "Accounts and history",
      hi: "अकाउंट और history",
      gu: "એકાઉન્ટ અને history",
    },
    answer: {
      en: "You can send and receive as a guest. Signing in adds file and code history, plus management options like viewing past transfers from My Files or My Codes.",
      hi: "आप guest के रूप में send और receive कर सकते हैं। Login करने पर file/code history और My Files या My Codes से past transfers देखने जैसे options मिलते हैं।",
      gu: "તમે guest તરીકે send અને receive કરી શકો છો. Login કરવાથી file/code history અને My Files અથવા My Codesમાંથી past transfers જોવાના options મળે છે.",
    },
    keywords: {
      en: ["account", "login", "log in", "sign in", "history", "my files", "my codes", "guest", "dashboard"],
      hi: ["अकाउंट", "login", "log in", "लॉगिन", "sign in", "history", "my files", "my codes", "guest", "dashboard", "account chahiye", "login karu", "bina login"],
      gu: ["એકાઉન્ટ", "login", "log in", "લોગિન", "sign in", "history", "my files", "my codes", "guest", "dashboard", "account joie", "login karu", "login vagar"],
    },
    cta: {
      href: "/my-files",
      label: {
        en: "Open My Files",
        hi: "My Files खोलें",
        gu: "My Files ખોલો",
      },
    },
  },
  {
    id: "drop-rooms",
    title: {
      en: "Drop Rooms",
      hi: "Drop Rooms",
      gu: "Drop Rooms",
    },
    answer: {
      en: "Drop Rooms let signed-in users create a room code, list required documents, collect submissions, and download received files from the dashboard.",
      hi: "Drop Rooms में logged-in users room code बना सकते हैं, required documents list कर सकते हैं, submissions collect कर सकते हैं और dashboard से files download कर सकते हैं।",
      gu: "Drop Roomsમાં logged-in users room code બનાવી શકે છે, required documents list કરી શકે છે, submissions collect કરી શકે છે અને dashboardમાંથી files download કરી શકે છે.",
    },
    keywords: {
      en: ["drop room", "drop rooms", "document collection", "collect files", "room code", "submission", "submissions", "required documents"],
      hi: ["drop room", "drop rooms", "document", "दस्तावेज", "फाइल collect", "room code", "submission", "submissions", "required documents", "document collect", "room banana"],
      gu: ["drop room", "drop rooms", "document", "દસ્તાવેજ", "ફાઇલ collect", "room code", "submission", "submissions", "required documents", "document collect", "room banav"],
    },
    cta: {
      href: "/drop-rooms",
      label: {
        en: "Open Drop Rooms",
        hi: "Drop Rooms खोलें",
        gu: "Drop Rooms ખોલો",
      },
    },
  },
  {
    id: "limits",
    title: {
      en: "File types and limits",
      hi: "फ़ाइल type और limit",
      gu: "ફાઇલ type અને limit",
    },
    answer: {
      en: "SendIt supports common documents, images, videos, archives, spreadsheets, presentations, and code files. If a file is too large, the app shows an upload error; compressing to ZIP can help.",
      hi: "SendIt documents, images, videos, archives, spreadsheets, presentations और code files जैसे common file types support करता है। File बहुत बड़ी हो तो upload error दिखेगा; ZIP में compress करने से मदद मिल सकती है।",
      gu: "SendIt documents, images, videos, archives, spreadsheets, presentations અને code files જેવા common file types support કરે છે. File બહુ મોટી હોય તો upload error દેખાશે; ZIPમાં compress કરવાથી મદદ મળી શકે છે.",
    },
    keywords: {
      en: ["file type", "file types", "types", "limit", "size", "large file", "max size", "zip", "pdf", "image", "video"],
      hi: ["file type", "फाइल type", "limit", "size", "बड़ी file", "max size", "zip", "pdf", "image", "video", "kitni size", "large file", "badi file"],
      gu: ["file type", "ફાઇલ type", "limit", "size", "મોટી file", "max size", "zip", "pdf", "image", "video", "ketli size", "large file", "moti file"],
    },
  },
  {
    id: "free",
    title: {
      en: "Pricing",
      hi: "कीमत",
      gu: "કિંમત",
    },
    answer: {
      en: "SendIt is free for sending and receiving files or code. You do not need payment details for the basic sharing flow.",
      hi: "SendIt file या code भेजने और प्राप्त करने के लिए free है। Basic sharing flow के लिए payment details की जरूरत नहीं है।",
      gu: "SendIt file અથવા code મોકલવા અને મેળવવા માટે free છે. Basic sharing flow માટે payment detailsની જરૂર નથી.",
    },
    keywords: {
      en: ["free", "price", "pricing", "cost", "charge", "payment", "paid", "fees"],
      hi: ["free", "मुफ्त", "कीमत", "cost", "charge", "payment", "paid", "fees", "paise", "kitna paisa"],
      gu: ["free", "મફત", "કિંમત", "cost", "charge", "payment", "paid", "fees", "paisa", "ketla paisa"],
    },
  },
  {
    id: "delete-share",
    title: {
      en: "Delete or revoke a share",
      hi: "Share हटाना या revoke करना",
      gu: "Share દૂર અથવા revoke કરવું",
    },
    answer: {
      en: "Signed-in users can manage shares from their account history when supported by the page. Guest shares cannot usually be recovered for manual deletion, so use a shorter expiry for sensitive content.",
      hi: "Logged-in users account history से shares manage कर सकते हैं जब page support करता हो। Guest shares को manual delete करने के लिए आमतौर पर वापस recover नहीं किया जा सकता, इसलिए sensitive content के लिए छोटी expiry रखें।",
      gu: "Logged-in users account historyમાંથી shares manage કરી શકે છે જ્યારે page support કરતો હોય. Guest shares manual delete કરવા માટે સામાન્ય રીતે recover કરી શકાતા નથી, તેથી sensitive content માટે નાની expiry રાખો.",
    },
    keywords: {
      en: ["delete", "remove", "revoke", "cancel", "wrong person", "stop access", "manage share"],
      hi: ["delete", "हटाना", "remove", "revoke", "cancel", "गलत व्यक्ति", "access रोक", "manage", "delete karu", "hata du", "galat aadmi"],
      gu: ["delete", "દૂર", "remove", "revoke", "cancel", "ખોટી વ્યક્તિ", "access રોક", "manage", "delete karu", "dur karu", "khoti vyakti"],
    },
  },
  {
    id: "code-not-working",
    title: {
      en: "Code not working",
      hi: "कोड काम नहीं कर रहा",
      gu: "કોડ કામ કરતો નથી",
    },
    answer: {
      en: "Check that the 4-digit code is typed correctly, you are on the right receive page, and the sender's expiry time has not passed. If it still fails, ask the sender to create a new share or contact support.",
      hi: "देखें कि 4 अंकों का code सही typed है, आप सही receive page पर हैं और sender की expiry खत्म नहीं हुई है। फिर भी समस्या रहे तो sender से नया share बनाने को कहें या support से संपर्क करें।",
      gu: "ચકાસો કે 4 અંકનો code સાચો typed છે, તમે સાચા receive page પર છો અને senderની expiry પૂરી નથી થઈ. હજી સમસ્યા રહે તો senderને નવું share બનાવવા કહો અથવા supportનો સંપર્ક કરો.",
    },
    keywords: {
      en: ["not working", "code not working", "code error", "invalid code", "wrong code", "expired", "cannot open", "not found", "failed", "problem"],
      hi: ["काम नहीं", "code error", "invalid code", "गलत code", "expired", "नहीं खुल", "not found", "failed", "problem", "code nahi chal", "code kaam nahi", "code nahi chalta", "galat code"],
      gu: ["કામ નથી", "code error", "invalid code", "ખોટો code", "expired", "ખૂલતું નથી", "not found", "failed", "problem", "code nathi chaltu", "code kaam nathi", "khoto code"],
    },
    cta: {
      href: "/contact",
      label: {
        en: "Contact Support",
        hi: "सपोर्ट से संपर्क करें",
        gu: "સપોર્ટનો સંપર્ક કરો",
      },
    },
  },
  {
    id: "support",
    title: {
      en: "Contact support",
      hi: "सपोर्ट से संपर्क",
      gu: "સપોર્ટનો સંપર્ક",
    },
    answer: {
      en: "For help, email mmbrothersteam@gmail.com, use WhatsApp, or open the Contact page. Include the page name, your code if relevant, and what happened.",
      hi: "Help के लिए mmbrothersteam@gmail.com पर email करें, WhatsApp use करें या Contact page खोलें। Page name, relevant code और क्या हुआ यह जरूर लिखें।",
      gu: "Help માટે mmbrothersteam@gmail.com પર email કરો, WhatsApp use કરો અથવા Contact page ખોલો. Page name, relevant code અને શું થયું તે લખો.",
    },
    keywords: {
      en: ["support", "contact", "help", "email", "whatsapp", "bug", "issue", "report"],
      hi: ["support", "सपोर्ट", "contact", "मदद", "email", "whatsapp", "bug", "issue", "report", "madad", "sampark", "help chahiye"],
      gu: ["support", "સપોર્ટ", "contact", "મદદ", "email", "whatsapp", "bug", "issue", "report", "madad", "sampark", "help joie"],
    },
    cta: {
      href: "/contact",
      label: {
        en: "Contact Support",
        hi: "सपोर्ट से संपर्क करें",
        gu: "સપોર્ટનો સંપર્ક કરો",
      },
    },
    showSupportLinks: true,
  },
];
