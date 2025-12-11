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
    },
    financial: {
      title: "Báo cáo tài chính",
      subtitle: "Công khai chi tiêu hàng năm của tôi",
      alertTitle: "⚠️ Tài khoản chưa xác minh",
      alertContent: "Tài khoản này hiện chưa được xác minh chính thức. Tất cả thông tin tài chính dưới đây là tự khai báo và có thể không chính xác 100%.",
      tableTitle: "Chi tiêu hàng năm chi tiết",
      totalLabel: "Tổng chi tiêu",
      totalValue: "1.450.000.000đ",
      note1: "Các số liệu này có thể thay đổi tùy theo nhu cầu thực tế",
      note2: "Được cập nhật hàng tháng (hoặc không, tùy tâm trạng)",
      items: [
        { name: "Trà sữa", calculation: "150 ly/năm × 35k", total: "5.250.000đ" },
        { name: "Cơm văn phòng", calculation: "250 bữa/năm × 50k", total: "12.500.000đ" },
        { name: "Xăng xe", calculation: "500 lít/năm × 20k", total: "10.000.000đ" },
        { name: "Shopee", calculation: "Không giới hạn", total: "50.000.000đ" },
        { name: "Netflix", calculation: "1 tài khoản", total: "2.000.000đ" },
        { name: "Cafe Starbucks", calculation: "100 lần/năm × 80k", total: "8.000.000đ" },
        { name: "Ăn nhà hàng", calculation: "50 lần/năm × 200k", total: "10.000.000đ" },
        { name: "Du lịch", calculation: "2 chuyến/năm", total: "30.000.000đ" },
        { name: "Quần áo & phụ kiện", calculation: "Thường xuyên", total: "80.000.000đ" },
        { name: "Điện thoại & gadget", calculation: "Cập nhật hàng năm", total: "25.000.000đ" }
      ]
    },
    testimonials: {
      title: "Lời chứng thực",
      subtitle: "Những người đã tận mắt chứng kiến sự cần cù của tôi",
      reviews: [
        { name: "Anh A", role: "Đồng nghiệp", quote: "Cậu ấy thực sự cần sự giúp đỡ. Mỗi ngày đi làm về, cậu ấy vẫn không biết trưa nay ăn gì. Rất đáng thương!" },
        { name: "Chị B", role: "Bạn thân", quote: "Tôi chưa bao giờ thấy ai khổ sở như vậy. Cả tuần chỉ 5 triệu đồng, làm sao đủ sống!" },
        { name: "Bác C", role: "Chủ quán cơm", quote: "Ăn mỗi ngày, đôi khi 2 bữa/ngày. Lương sao mà đủ! Xin các anh chị ủng hộ em này." },
        { name: "Cô D", role: "Shipper", quote: "Em nó bảo tiền lương chỉ để trả tiền trọ. Tiền ăn phải kiếm thêm. Tội em lắm!" },
        { name: "Anh E", role: "Khách hàng thường xuyên", quote: "Ý tưởng này thực sự sáng tạo. Em ấy đúng là người cần được \"nuôi\" nhất thế giới." },
        { name: "Chị T.T.T", role: "Nhà hảo tâm", quote: "Tôi đã ủng hộ em này 3 tháng rồi. Cảm giác giúp được bạn trẻ rất tuyệt vời. Giới thiệu bạn bè tham gia nhé!" }
      ]
    },
    faq: {
      title: "Câu hỏi thường gặp",
      subtitle: "Những câu hỏi mà bạn có thể tò mò",
      questions: [
        { question: "Tiền ủng hộ này có được sử dụng vào việc gì?", answer: "Tiền sẽ được sử dụng cho các nhu cầu thiết yếu như trà sữa, cơm ăn trưa, Shopee, xăng xe, Netflix, và các chi phí sinh hoạt khác của tôi. Tất cả đều được công khai (nếu tôi nhớ)." },
        { question: "Tôi có thể hủy ủng hộ bất kỳ lúc nào không?", answer: "Vâng, hoàn toàn có thể. Bạn có thể dừng chuyển tiền bất kỳ lúc nào mà không cần giải thích. Tôi sẽ không khiển trách đâu." },
        { question: "Các anh chị ủng hộ VIP sẽ được gì?", answer: "Bạn sẽ được video call định kỳ với tôi (mỗi quý 1 lần), tên sẽ được công bố trên website, và bạn có thể nhắn tin riêng cho tôi. Đương nhiên, bạn cũng hỗ trợ tất cả chi phí của tôi." },
        { question: "Website này có phải hợp pháp không?", answer: "Đây là một dự án meme/parody dành cho mục đích giải trí. Vui lòng không chuyển tiền thật! (Nhưng nếu bạn chuyển, tôi cũng không từ chối đâu 😊)" },
        { question: "Liệu bạn sẽ thực sự sử dụng tiền ủng hộ?", answer: "Tất nhiên! Tôi cam kết sẽ chi tiêu tiền ủng hộ một cách có trách nhiệm (ít nhất là 80% lol). Số tiền còn lại sẽ được tiết kiệm." }
      ]
    }
  },
  en: {
    hero: {
      donateBtn: "Donate Now",
      title: "Adopt Me",
      subtitle: "A charity project for a better life (for me)",
      desc: "Every day, I struggle with living costs, bubble tea, Netflix, and expensive office lunches. Join hands to help me live a life I deserve!",
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
      introRest: "! I am an ambitious young person living in the city with skyrocketing living costs.",
      insight: "Since 2025, I realized:",
      insightBold: "Why feed yourself when others can feed you?",
      insightRest: "This is a brand new charity model, inspired by previous successful projects.",
      cost: "With just",
      costBold: "1.45 million VND/year",
      costRest: ", you will help me afford bubble tea, lunches, Netflix, and other essentials. I commit to spending money",
      transparency: "transparently",
      transparencyRest: "(might publicize after 15 days of checking).",
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
        netflix: "Netflix",
        netflixPrem: "Netflix Premium",
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
      disclaimer: "* This website is a parody/meme about the \"Nuôi Em\" scandal for entertainment and satirical purposes. Please do not send real money! 🤡",
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
    },
    financial: {
      title: "Financial Report",
      subtitle: "Publicly disclosed annual expenses",
      alertTitle: "⚠️ Account Not Verified",
      alertContent: "This account is currently unverified. All financial information below is self-reported and may not be 100% accurate.",
      tableTitle: "Detailed Annual Expenses",
      totalLabel: "Total Expenses",
      totalValue: "1,450,000,000 VND",
      note1: "These figures may change depending on actual needs",
      note2: "Updated monthly (or not, depending on my mood)",
      items: [
        { name: "Bubble Tea", calculation: "150 cups/year × 35k", total: "5,250,000 VND" },
        { name: "Office Lunch", calculation: "250 meals/year × 50k", total: "12,500,000 VND" },
        { name: "Gasoline", calculation: "500 liters/year × 20k", total: "10,000,000 VND" },
        { name: "Shopee", calculation: "Unlimited", total: "50,000,000 VND" },
        { name: "Netflix", calculation: "1 account", total: "2,000,000 VND" },
        { name: "Starbucks", calculation: "100 times/year × 80k", total: "8,000,000 VND" },
        { name: "Restaurant", calculation: "50 times/year × 200k", total: "10,000,000 VND" },
        { name: "Travel", calculation: "2 trips/year", total: "30,000,000 VND" },
        { name: "Clothes & Accessories", calculation: "Regular", total: "80,000,000 VND" },
        { name: "Phone & Gadgets", calculation: "Annual upgrade", total: "25,000,000 VND" }
      ]
    },
    testimonials: {
      title: "Testimonials",
      subtitle: "From people who witnessed my hard struggles",
      reviews: [
        { name: "Mr. A", role: "Colleague", quote: "He really needs help. Every day at work, he doesn't even know what to eat for lunch. Very pitiful!" },
        { name: "Ms. B", role: "Best Friend", quote: "I've never seen anyone suffer like this. Only 5 million per week, how is that enough to live!" },
        { name: "Uncle C", role: "Restaurant Owner", quote: "Eats here every day, sometimes twice. How can his salary be enough! Please support him!" },
        { name: "Aunt D", role: "Delivery Person", quote: "He told me his salary only covers rent. He needs to earn extra for food. Poor guy!" },
        { name: "Mr. E", role: "Regular Customer", quote: "This idea is truly creative. He's definitely the most needy person in the world." },
        { name: "Ms. T.T.T", role: "Benefactor", quote: "I've been supporting him for 3 months now. The feeling of helping a young person is wonderful. Please join in!" }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Questions you might be curious about",
      questions: [
        { question: "What will my donation be used for?", answer: "Your donation will be used for essential needs like bubble tea, office lunch, Shopee, gasoline, Netflix, and other living expenses. Everything is publicly disclosed (if I remember)." },
        { question: "Can I cancel my support anytime?", answer: "Yes, absolutely. You can stop sending money anytime without any explanation. I won't hold it against you." },
        { question: "What do VIP supporters get?", answer: "You'll get periodic video calls with me (once per quarter), your name will be featured on the website, and you can message me privately. Of course, you also contribute to all my expenses." },
        { question: "Is this website legal?", answer: "This is a meme/parody project for entertainment purposes. Please don't send real money! (But if you do, I won't refuse either 😊)" },
        { question: "Will you really use the donations?", answer: "Of course! I commit to spending donations responsibly (at least 80% lol). The remaining amount will be saved." }
      ]
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