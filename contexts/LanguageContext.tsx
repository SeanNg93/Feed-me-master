import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const translations = {
  vi: {
    hero: {
      donateBtn: "Ủng hộ ngay",
      title: "Nuôi Tôi",
      subtitle: "Dự án thiện nguyện cho một cuộc sống tốt đẹp hơn",
      desc: "Mỗi ngày trôi qua, tôi vẫn đang phải vật lộn với chi phí sinh hoạt, trà sữa, cám dỗ đến từ những gian hàng Shopee và những bữa ăn cơm văn phòng đắt đỏ. Hãy chung tay cùng tôi để tôi có thể sống một cuộc sống xứng đáng hơn!",
      cta: "Nuôi tôi ngay",
      stats: {
        receiver: "Người được nuôi",
        donors: "Nhà hảo tâm",
        goal: "Tỷ đồng mục tiêu"
      }
    },
    about: {
      title: "Về tôi",
      subtitle: "Câu chuyện của một người hơi trẻ đang cần sự hỗ trợ từ cộng đồng",
      intro: "Xin chào các",
      introBold: "anh chị nuôi",
      introRest: "thân mến! Tôi là một người hơi trẻ còn nhiều tham vọng, đang sống tại Hà Nội với chi phí sinh hoạt ngày càng cao ngất ngưởng.",
      insight: "Tại cuối năm 2025 này, tôi đã nhận ra rằng:",
      insightBold: "Tại sao phải tự nuôi bản thân khi có thể để người khác nuôi?",
      insightRest: "Đây là một mô hình thiện nguyện hoàn toàn mới, lấy cảm hứng từ các dự án thành công của vô vàn văn nghệ sĩ trước đó.",
      cost: "Với chỉ",
      costBold: "1,45 triệu đồng/năm",
      costRest: ", các anh chị sẽ giúp tôi có đủ tiền cho đam mê mua sắm, cơm văn phòng, thoả mãn cám dỗ từ Shopee và ti tỷ các nhu cầu thiết yếu khác. Tôi cam kết sử dụng tiền",
      transparency: "cực kỳ minh bạch",
      transparencyRest: "(có thể công khai sau 15 ngày kiểm tra).",
      note: "Lưu ý:",
      noteContent: "Chi phí vận hành (1 tỷ đồng/năm) sẽ được lấy từ lãi tiết kiệm, không trích từ khoản đóng góp của các anh chị đâu! 😇"
    },
    pricing: {
      title: "Gói ủng hộ",
      subtitle: "Chọn gói phù hợp với khả năng của bạn để góp phần vào cuộc sống của tôi",
      basic: "Gói Cơ Bản",
      standard: "Gói Tiêu Chuẩn",
      vip: "Gói VIP",
      popular: "Phổ biến nhất",
      btn: "Chọn gói này",
      perMonth: "/ 3 tháng",
      perYear: "/ năm",
      features: {
        milkTea: "Trà sữa",
        lunch: "Cơm văn phòng",
        gas: "Xăng xe",
        netflix: "Shopee",
        netflixPrem: "Shopee nhưng mà nhiều hơn",
        photos: "Ảnh cập nhật",
        code: "Mã Nuôi Tôi (NT)",
        starbucks: "Cafe Starbucks",
        restaurant: "Ăn nhà hàng",
        travel: "Du lịch",
        nameOnWeb: "Tên trên website",
        videoCall: "Video call định kỳ",
        unlimited: "Không giới hạn",
        meals60: "60 bữa",
        meals365: "365 bữa",
        none: "Không",
        shared: "Dùng chung",
        maybe: "Có thể có",
        monthly: "Mỗi tháng",
        exclusive: "Độc quyền*",
        daily: "Mỗi ngày",
        twiceMonth: "2 lần/tháng",
        onceYear: "1 chuyến/năm",
        quarterly: "Mỗi quý",
        million: "triệu/năm"
      }
    },
    financial: {
      title: "Báo cáo tài chính minh bạch",
      subtitle: "Chúng tôi cam kết công khai 100% thu chi (sau 15 ngày đóng bảng tài khoản để kiểm tra)",
      alertTitle: "Thông báo quan trọng",
      alertContent: "Để đảm bảo tính minh bạch và chính xác, tài khoản hiện đang được đóng băng trong 15 ngày để thống kê thu-chi. Chúng tôi đang làm việc với bên thứ ba độc lập (có thể là bạn tôi) để kiểm toán. Cảm ơn sự kiên nhẫn của quý vị!",
      tableTitle: "Chi tiết sử dụng 1.450.000đ/năm",
      items: [
        { name: "Trà sữa", calculation: "45.000đ x 180 ly", total: "810.000đ" },
        { name: "Cơm văn phòng", calculation: "25.000đ x 200 bữa", total: "500.000đ" },
        { name: "Shopee", calculation: "", total: "260.000đ" },
        { name: "Cafe Starbuck", calculation: "mỗi sáng", total: "1.095.000đ" },
        { name: "PlayStation Plus", calculation: "", total: "550.000đ" },
        { name: "Chăm sóc cá nhân", calculation: "", total: "850.000đ" },
        { name: "Quà sinh nhật bản thân", calculation: "", total: "2.000.000đ" },
        { name: "Data 5G không giới hạn", calculation: "", total: "360.000đ" },
        { name: "Rạp phim", calculation: "2 lần/tháng", total: "600.000đ" },
        { name: "Chi phí khác (bí mật)", calculation: "", total: "3.425.000đ" }
      ],
      totalLabel: "TỔNG CỘNG",
      totalValue: "10.450.000đ",
      note1: "* Đừng lo, phần chênh lệch sẽ được bù từ lãi tiết kiệm của các khoản đóng góp trước đó!",
      note2: "** Có thể có sai số do lỗi bàn giao giữa các tình nguyện viên"
    },
    testimonials: {
      title: "Lời nhận xét từ nhà hảo tâm",
      subtitle: "Hàng nghìn người đã tin tưởng và ủng hộ dự án (có thể)",
      reviews: [
        {
          name: "Rapper D.V",
          role: "Nghệ sĩ nổi tiếng",
          quote: "\"Tôi đã ủng hộ 500 triệu đồng từ MV 'Nấu ăn cho em'. Dự án này thật ý nghĩa, giúp tôi có thêm nội dung cho bài hát mới. Tôi chỉ là mạnh thường quân, không tham gia quản lý nhé!\""
        },
        {
          name: "Ca sĩ H.M",
          role: "Giọng ca triệu view",
          quote: "\"600 triệu không phải là con số nhỏ, nhưng nhìn thấy người được nuôi có cuộc sống tốt đẹp hơn thì tôi rất vui. Nếu có sai phạm thì xử lý nghiêm minh nhé! (Nhưng tôi không biết gì đâu)\""
        },
        {
          name: "Chị T.T.T",
          role: "Nhà hảo tâm trung thành",
          quote: "\"Tôi đã nuôi được 7 năm rồi và thấy rất minh bạch! Chỉ là họ chưa trả lời tin nhắn của tôi được 3 tháng thôi, nhưng tôi tin tưởng họ đang bận. Mọi người đừng vội kết luận!\""
        },
        {
          name: "Cô M.L",
          role: "Cựu tình nguyện viên",
          quote: "\"Tôi làm tình nguyện viên được 5 ngày thì nghỉ vì công việc chủ yếu là... đòi tiền. Nhưng dự án vẫn rất ý nghĩa nhé! Chỉ là không hợp với tôi thôi.\""
        },
        {
          name: "Anh A.P",
          role: "Nhà hảo tâm bối rối",
          quote: "\"Tôi được nhận mã NT-12345 nhưng 3 tháng sau lại thấy mã này thuộc về người khác. Có lẽ do lệch pha thời gian đóng góp? Anyway, tôi vẫn tin tưởng dự án!\""
        },
        {
          name: "5 Phút Crypto",
          role: "Chuyên gia blockchain",
          quote: "\"Blockchain là tương lai! Nếu dự án này dùng blockchain thì sẽ không có tranh cãi. #Web3 #Crypto #Decentralization\""
        }
      ]
    },
    faq: {
      title: "Câu hỏi thường gặp",
      subtitle: "Giải đáp mọi thắc mắc của bạn về dự án",
      questions: [
        {
          question: "Tại sao phải nuôi bạn?",
          answer: "Vì tôi dễ thương, và xã hội cần bảo tồn những người trẻ biết tận hưởng cuộc sống như tôi."
        },
        {
          question: "Tiền của tôi đi đâu?",
          answer: "Như đã báo cáo, chủ yếu vào hệ tiêu hóa của tôi và các dịch vụ giải trí trực tuyến. Một phần nhỏ sẽ vào 'Chi phí khác'."
        },
        {
          question: "Mã Nuôi Tôi (NT) là gì?",
          answer: "Là mã số định danh duy nhất (hoặc không duy nhất lắm) để bạn cảm thấy mình đặc biệt khi chuyển khoản."
        },
        {
          question: "Tại sao chi phí vận hành lại 1 tỷ/năm?",
          answer: "Vì chúng tôi tính cả chi phí cơ hội của việc tôi không đi làm 8 tiếng mỗi ngày."
        },
        {
          question: "Tôi có được xem ảnh cập nhật không?",
          answer: "Tùy tâm trạng. Gói VIP sẽ được ưu tiên, nhưng nếu tôi đang xấu thì xin phép nợ."
        },
        {
          question: "Nếu tôi nghi ngờ có sai phạm thì làm sao?",
          answer: "Hãy hít thở sâu và nhớ rằng làm từ thiện quan trọng nhất là cái tâm. Sự nghi ngờ sẽ làm giảm phước đức."
        },
        {
          question: "Tại sao tổng chi phí lại nhiều hơn 1,45 triệu?",
          answer: "À, 1,45 triệu là con số tượng trưng cho đẹp thôi. Thực tế thì... bạn biết giá trà sữa rồi đấy."
        }
      ]
    },
    generator: {
      title: "Tạo mã Nuôi Tôi của bạn",
      subtitle: "Nhận ngay mã NT độc quyền (có thể trùng với người khác)",
      label: "Mã Nuôi Tôi (NT) Của Bạn",
      btn: "Tạo mã mới"
    },
    footer: {
      desc: "Dự án thiện nguyện tiên phong trong việc nâng cao chất lượng cuộc sống cho một cá nhân cụ thể (tôi).",
      quote: "\"Tôi ăn no, cả làng vui\" - Châm ngôn của dự án",
      contact: "Liên hệ",
      links: "Liên kết",
      legal: "Pháp lý",
      donate: "Ủng hộ ngay",
      report: "Báo cáo tài chính",
      statement: "Xem sao kê (sau 15 ngày)",
      faq: "Câu hỏi thường gặp",
      license: "Giấy phép: Đang chờ cấp",
      audit: "Kiểm toán: Bạn tôi",
      type: "Hình thức: Nhóm tình nguyện",
      disclaimer: "* Website này là parody/meme về vụ việc \"Nuôi Em\" nhằm mục đích giải trí và châm biếm. Vui lòng không chuyển tiền thật!(có chuyển cũng không sao)",
      copyright: "© 2025 Nuôi Tôi. Bản quyền thuộc về tôi. Mọi hình thức sao chép cần xin phép.",
      inspiration: "Lấy cảm hứng từ các dự án thiện nguyện \"thành công\" trước đó 🦁"
    },
    modal: {
      title: "Cảm ơn tấm lòng của bạn! 💖",
      owner: "Chủ tài khoản",
      account: "Số tài khoản (BIDV)",
      note: "* Nội dung chuyển khoản: \"Nuoi toi\" hoặc \"Ten ban + Nuoi toi\"",
      footer: "Mọi đóng góp sẽ được công khai (nếu tôi nhớ) 🦁",
      supporting: "Đang ủng hộ:"
    }
  },
  en: {
    hero: {
      donateBtn: "Donate Now",
      title: "Adopt Me",
      subtitle: "A charity project for a better life (for me)",
      desc: "Every day, I struggle with living costs, bubble tea, shopping temptations, and expensive office lunches. Join hands to help me live a life I deserve!",
      cta: "Adopt Me Now",
      stats: {
        receiver: "Person Adopted",
        donors: "Benefactors",
        goal: "Billion VND Goal"
      }
    },
    about: {
      title: "About Me",
      subtitle: "The story of a young person needing community support",
      intro: "Hello dear",
      introBold: "sponsors",
      introRest: "! I am an ambitious young person living in Hanoi with skyrocketing living costs.",
      insight: "In late 2025, I realized:",
      insightBold: "Why feed yourself when others can feed you?",
      insightRest: "This is a brand new charity model, inspired by previous successful projects of many artists.",
      cost: "With just",
      costBold: "1.45 million VND/year",
      costRest: ", you will help me afford bubble tea, lunches, Shopee sprees, and countless other essentials. I commit to spending money",
      transparency: "transparently",
      transparencyRest: "(might publicize after 15 days of auditing).",
      note: "Note:",
      noteContent: "Operating costs (1 billion VND/year) will be taken from savings interest, not deducted from your contributions! 😇"
    },
    pricing: {
      title: "Donation Packages",
      subtitle: "Choose a package that fits your budget to contribute to my life",
      basic: "Basic Pack",
      standard: "Standard Pack",
      vip: "VIP Pack",
      popular: "Most Popular",
      btn: "Choose This Pack",
      perMonth: "/ 3 months",
      perYear: "/ year",
      features: {
        milkTea: "Bubble Tea",
        lunch: "Office Lunch",
        gas: "Gasoline",
        netflix: "Shopee",
        netflixPrem: "More Shopee",
        photos: "Photo Updates",
        code: "Adopt Me Code (NT)",
        starbucks: "Starbucks Coffee",
        restaurant: "Restaurant Dining",
        travel: "Travel",
        nameOnWeb: "Name on Website",
        videoCall: "Periodic Video Call",
        unlimited: "Unlimited",
        meals60: "60 meals",
        meals365: "365 meals",
        none: "No",
        shared: "Shared",
        maybe: "Maybe",
        monthly: "Monthly",
        exclusive: "Exclusive*",
        daily: "Daily",
        twiceMonth: "Twice/month",
        onceYear: "Once/year",
        quarterly: "Quarterly",
        million: "mil/year"
      }
    },
    financial: {
      title: "Transparent Financial Report",
      subtitle: "We commit to 100% transparency (after 15 days of freezing accounts for audit)",
      alertTitle: "Important Notice",
      alertContent: "To ensure transparency and accuracy, the account is currently frozen for 15 days for auditing. We are working with an independent third party (probably my friend) to audit. Thank you for your patience!",
      tableTitle: "Usage details of 1,450,000 VND/year",
      items: [
        { name: "Bubble Tea", calculation: "45,000đ x 180 cups", total: "810,000đ" },
        { name: "Office Lunch", calculation: "25,000đ x 200 meals", total: "500,000đ" },
        { name: "Shopee", calculation: "", total: "260,000đ" },
        { name: "Starbucks", calculation: "every morning", total: "1,095,000đ" },
        { name: "PlayStation Plus", calculation: "", total: "550,000đ" },
        { name: "Personal Care", calculation: "", total: "850,000đ" },
        { name: "Self-Birthday Gift", calculation: "", total: "2,000,000đ" },
        { name: "Unlimited 5G Data", calculation: "", total: "360,000đ" },
        { name: "Cinema", calculation: "twice/month", total: "600,000đ" },
        { name: "Other Expenses (Secret)", calculation: "", total: "3,425,000đ" }
      ],
      totalLabel: "TOTAL",
      totalValue: "10,450,000đ",
      note1: "* Don't worry, the difference will be covered by savings interest from previous contributions!",
      note2: "** There might be discrepancies due to handover errors between volunteers"
    },
    testimonials: {
      title: "Testimonials from Benefactors",
      subtitle: "Thousands of people have trusted and supported the project (maybe)",
      reviews: [
        {
          name: "Rapper D.V",
          role: "Famous Artist",
          quote: "\"I donated 500 million VND from my MV 'Cooking for You'. This project is meaningful, gave me content for a new song. I'm just a donor, not a manager!\""
        },
        {
          name: "Singer H.M",
          role: "Top Vocalist",
          quote: "\"600 million is not small, but seeing the adoptee live better makes me happy. Strictly handle violations if any! (But I know nothing)\""
        },
        {
          name: "Ms. T.T.T",
          role: "Loyal Donor",
          quote: "\"I've adopted for 7 years, very transparent! They haven't replied to my messages for 3 months, but I trust they are busy. Don't jump to conclusions!\""
        },
        {
          name: "Ms. M.L",
          role: "Ex-Volunteer",
          quote: "\"I volunteered for 5 days then quit because the job was mostly... collecting money. Still a meaningful project! Just not for me.\""
        },
        {
          name: "Mr. A.P",
          role: "Confused Donor",
          quote: "\"I received code NT-12345 but 3 months later it belonged to someone else. Maybe a time zone glitch? Anyway, I trust the project!\""
        },
        {
          name: "5 Minute Crypto",
          role: "Blockchain Expert",
          quote: "\"Blockchain is the future! If this used blockchain, no controversy. #Web3 #Crypto #Decentralization\""
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Answering all your questions about the project",
      questions: [
        {
          question: "Why adopt you?",
          answer: "Because I'm cute, and society needs to preserve young people who know how to enjoy life like me."
        },
        {
          question: "Where does my money go?",
          answer: "As reported, mostly into my digestive system and online entertainment services. A small part goes to 'Other expenses'."
        },
        {
          question: "What is the NT Code?",
          answer: "A unique (or not so unique) ID code to make you feel special when transferring money."
        },
        {
          question: "Why is operating cost 1 billion/year?",
          answer: "Because we count the opportunity cost of me not working 8 hours a day."
        },
        {
          question: "Can I see photo updates?",
          answer: "Depends on my mood. VIPs get priority, but if I look bad, I owe you one."
        },
        {
          question: "What if I suspect fraud?",
          answer: "Take a deep breath. Charity is about the heart. Suspicion reduces good karma."
        },
        {
          question: "Why is the total > 1.45m?",
          answer: "Ah, 1.45m is just a symbolic number. In reality... you know bubble tea prices."
        }
      ]
    },
    generator: {
      title: "Generate Your Code",
      subtitle: "Get your exclusive NT code (might duplicate with others)",
      label: "Your Adopt Me (NT) Code",
      btn: "Generate New Code"
    },
    footer: {
      desc: "A pioneering charity project to improve the quality of life for a specific individual (me).",
      quote: "\"I eat well, the whole village is happy\" - Project Motto",
      contact: "Contact",
      links: "Links",
      legal: "Legal",
      donate: "Donate Now",
      report: "Financial Report",
      statement: "Bank Statement (after 15 days)",
      faq: "FAQ",
      license: "License: Pending",
      audit: "Audit: My friend",
      type: "Type: Volunteer Group",
      disclaimer: "* This website is a parody/meme about the \"Nuôi Em\" scandal for entertainment and satirical purposes. Please do not send real money! (Sending is fine too) 🤡",
      copyright: "© 2025 Adopt Me. Copyright belongs to me. Copying requires permission.",
      inspiration: "Inspired by previously \"successful\" charity projects 🦁"
    },
    modal: {
      title: "Thank you for your kindness! 💖",
      owner: "Account Owner",
      account: "Account Number (BIDV)",
      note: "* Transfer note: \"Nuoi toi\" or \"Your Name + Nuoi toi\"",
      footer: "All donations will be public (if I remember) 🦁",
      supporting: "Donating:"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};