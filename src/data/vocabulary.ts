
export interface Word {
  term: string;
  pronunciation?: string;
  partOfSpeech: string;
  meaning: string;
  usage?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  words: Word[];
}

export const categories: Category[] = [
  {
    id: "education",
    name: "Education",
    description: "Chủ đề: Giáo dục",
    words: [
      { term: "Curriculum", pronunciation: "/kəˈrɪkjələm/", partOfSpeech: "n", meaning: "Chương trình học", usage: "The new curriculum includes more practical skills." },
      { term: "Scholarship", pronunciation: "/ˈskɒləʃɪp/", partOfSpeech: "n", meaning: "Học bổng", usage: "She was awarded a full scholarship to Harvard." },
      { term: "Tuition", pronunciation: "/tjuˈɪʃən/", partOfSpeech: "n", meaning: "Học phí", usage: "The tuition fees have increased this year." },
      { term: "Alumni", pronunciation: "/əˈlʌmnaɪ/", partOfSpeech: "n", meaning: "Cựu sinh viên", usage: "The alumni association organizes annual meetings." },
      { term: "Pedagogy", pronunciation: "/ˈpedəɡɒdʒi/", partOfSpeech: "n", meaning: "Sư phạm", usage: "Modern pedagogy emphasizes student-centered learning." },
      { term: "Diploma", pronunciation: "/dɪˈpləʊmə/", partOfSpeech: "n", meaning: "Văn bằng, chứng chỉ", usage: "She received her diploma in business management." },
      { term: "Enrollment", pronunciation: "/ɪnˈrəʊlmənt/", partOfSpeech: "n", meaning: "Sự đăng ký nhập học", usage: "Enrollment numbers have increased this semester." },
      { term: "Extracurricular", pronunciation: "/ˌɛkstrəkəˈrɪkjʊlə/", partOfSpeech: "adj", meaning: "Ngoại khóa", usage: "He participates in many extracurricular activities." },
      { term: "Faculty", pronunciation: "/ˈfækəlti/", partOfSpeech: "n", meaning: "Giảng viên, khoa", usage: "The faculty of science has excellent professors." },
      { term: "Internship", pronunciation: "/ˈɪntɜːnʃɪp/", partOfSpeech: "n", meaning: "Thực tập", usage: "She completed her internship at a local hospital." },
      { term: "Literacy", pronunciation: "/ˈlɪtərəsi/", partOfSpeech: "n", meaning: "Sự biết chữ", usage: "The literacy rate has improved significantly." },
      { term: "Mentor", pronunciation: "/ˈmɛntɔː/", partOfSpeech: "n", meaning: "Người hướng dẫn", usage: "My mentor gave me valuable career advice." },
      { term: "Postgraduate", pronunciation: "/ˌpəʊstˈɡrædʒuət/", partOfSpeech: "adj", meaning: "Sau đại học", usage: "He's pursuing a postgraduate degree in economics." },
      { term: "Undergraduate", pronunciation: "/ˌʌndəˈɡrædʒuət/", partOfSpeech: "adj", meaning: "Đại học", usage: "She's an undergraduate student studying psychology." },
      { term: "Seminar", pronunciation: "/ˈsɛmɪnɑː/", partOfSpeech: "n", meaning: "Hội thảo", usage: "We attended an interesting seminar on climate change." },
      { term: "Syllabus", pronunciation: "/ˈsɪləbəs/", partOfSpeech: "n", meaning: "Đề cương khóa học", usage: "The syllabus outlines all required readings." },
      { term: "Tuition fee", pronunciation: "/tjuˈɪʃən fiː/", partOfSpeech: "n", meaning: "Học phí", usage: "Tuition fees vary depending on the program." },
      { term: "Vocational", pronunciation: "/vəʊˈkeɪʃənl/", partOfSpeech: "adj", meaning: "Hướng nghiệp", usage: "Vocational training prepares students for specific jobs." },
      { term: "Grant", pronunciation: "/ɡrɑːnt/", partOfSpeech: "n", meaning: "Trợ cấp", usage: "She received a research grant to study abroad." },
      { term: "Thesis", pronunciation: "/ˈθiːsɪs/", partOfSpeech: "n", meaning: "Luận văn", usage: "He's working on his master's thesis." },
      { term: "Dissertation", pronunciation: "/ˌdɪsəˈteɪʃən/", partOfSpeech: "n", meaning: "Luận án", usage: "Her doctoral dissertation focuses on renewable energy." }
    ]
  },
  {
    id: "celebrities",
    name: "Celebrities",
    description: "Người nổi tiếng",
    words: [
      { term: "Standing Ovation", pronunciation: "/ˈstændɪŋ əʊˈveɪʃən/", partOfSpeech: "n", meaning: "Vỗ tay nhiệt liệt", usage: "The performance received a standing ovation." },
      { term: "Bombarded", pronunciation: "/bɒmˈbɑːdɪd/", partOfSpeech: "v", meaning: "Tấn công", usage: "He was bombarded with questions by reporters." },
      { term: "Paparazzi", pronunciation: "/ˌpæpəˈrætsi/", partOfSpeech: "n", meaning: "Cánh săn ảnh", usage: "Celebrities often try to avoid the paparazzi." },
      { term: "Take the country by storm", pronunciation: null, partOfSpeech: "v", meaning: "Gây bão cả nước", usage: "Her latest album took the country by storm." },
      { term: "Crowned", pronunciation: "/kraʊnd/", partOfSpeech: "v", meaning: "Đăng quang", usage: "She was crowned Miss Universe last year." },
      { term: "Stand to benefit from something", pronunciation: null, partOfSpeech: "v", meaning: "Hưởng lợi", usage: "The charity stands to benefit from the concert." },
      { term: "Represented", pronunciation: "/ˌrɛprɪˈzɛntɪd/", partOfSpeech: "v", meaning: "Đại diện", usage: "She represented her country at the Olympics." },
      { term: "Role model", pronunciation: "/rəʊl ˈmɒdl/", partOfSpeech: "n", meaning: "Hình mẫu lý tưởng", usage: "Many athletes serve as role models for young people." },
      { term: "Trend-setter", pronunciation: "/trɛnd ˈsɛtə/", partOfSpeech: "n", meaning: "Người dẫn đầu xu hướng", usage: "Fashion designers are often trend-setters." },
      { term: "Make headlines", pronunciation: null, partOfSpeech: "v", meaning: "Tràn ngập trên các mặt báo", usage: "The scandal made headlines worldwide." },
      { term: "A-list", pronunciation: "/eɪ lɪst/", partOfSpeech: "n", meaning: "Danh sách ngôi sao hạng A", usage: "Only A-list celebrities were invited to the gala." },
      { term: "Endorsement", pronunciation: "/ɪnˈdɔːsmənt/", partOfSpeech: "n", meaning: "Sự ủng hộ, chứng thực", usage: "The athlete signed a major endorsement deal." },
      { term: "Fanbase", pronunciation: "/ˈfænbeɪs/", partOfSpeech: "n", meaning: "Lượng người hâm mộ", usage: "The band has a loyal fanbase around the world." },
      { term: "Scandal", pronunciation: "/ˈskændl/", partOfSpeech: "n", meaning: "Vụ bê bối", usage: "The politician was involved in a financial scandal." },
      { term: "Icon", pronunciation: "/ˈaɪkɒn/", partOfSpeech: "n", meaning: "Biểu tượng", usage: "Marilyn Monroe remains a cultural icon." },
      { term: "Stardom", pronunciation: "/ˈstɑːdəm/", partOfSpeech: "n", meaning: "Sự nổi tiếng", usage: "She rose to stardom after her first hit song." },
      { term: "Glamorous", pronunciation: "/ˈɡlæmərəs/", partOfSpeech: "adj", meaning: "Hào nhoáng", usage: "Celebrities lead glamorous lives." },
      { term: "Blockbuster", pronunciation: "/ˈblɒkˌbʌstə/", partOfSpeech: "n", meaning: "Bom tấn", usage: "The movie became a summer blockbuster." },
      { term: "Red carpet", pronunciation: "/rɛd ˈkɑːpɪt/", partOfSpeech: "n", meaning: "Thảm đỏ", usage: "Celebrities walked the red carpet at the premiere." },
      { term: "Spotlight", pronunciation: "/ˈspɒtlaɪt/", partOfSpeech: "n", meaning: "Tâm điểm", usage: "She found herself in the spotlight after winning the award." },
      { term: "Viral", pronunciation: "/ˈvaɪrəl/", partOfSpeech: "adj", meaning: "Lan truyền nhanh", usage: "The video went viral overnight." }
    ]
  },
  {
    id: "advertisement",
    name: "Advertisement & Social Network",
    description: "Quảng cáo và mạng xã hội",
    words: [
      { term: "Campaign", pronunciation: "/kæmˈpeɪn/", partOfSpeech: "n", meaning: "Chiến dịch", usage: "The marketing campaign was very successful." },
      { term: "Commercial", pronunciation: "/kəˈmɜːʃəl/", partOfSpeech: "n", meaning: "Quảng cáo", usage: "The Super Bowl commercials are always creative." },
      { term: "Target audience", pronunciation: "/ˈtɑːɡɪt ˈɔːdiəns/", partOfSpeech: "n", meaning: "Khán giả mục tiêu", usage: "The campaign is designed to reach a young target audience." },
      { term: "Billboard", pronunciation: "/ˈbɪlbɔːd/", partOfSpeech: "n", meaning: "Biển quảng cáo", usage: "They placed billboards in high-traffic areas." },
      { term: "Endorse", pronunciation: "/ɪnˈdɔːs/", partOfSpeech: "v", meaning: "Chứng thực", usage: "The athlete endorsed the sports drink." },
      { term: "Brand awareness", pronunciation: "/brænd əˈweənəs/", partOfSpeech: "n", meaning: "Nhận thức thương hiệu", usage: "The campaign increased brand awareness significantly." },
      { term: "Social media", pronunciation: "/ˈsəʊʃəl ˈmiːdiə/", partOfSpeech: "n", meaning: "Mạng xã hội", usage: "Companies now use social media for marketing." },
      { term: "Influencer", pronunciation: "/ˈɪnfluːənsə/", partOfSpeech: "n", meaning: "Người có ảnh hưởng", usage: "Brands often partner with social media influencers." },
      { term: "Hashtag", pronunciation: "/ˈhæʃtæɡ/", partOfSpeech: "n", meaning: "Thẻ bắt đầu bằng #", usage: "The campaign used a trending hashtag to gain visibility." },
      { term: "Viral marketing", pronunciation: "/ˈvaɪrəl ˈmɑːkɪtɪŋ/", partOfSpeech: "n", meaning: "Tiếp thị lan truyền", usage: "Viral marketing can reach millions of people quickly." },
      { term: "Pay-per-click", pronunciation: "/peɪ pə klɪk/", partOfSpeech: "n", meaning: "Trả tiền cho mỗi lần nhấp chuột", usage: "They invested in pay-per-click advertising." },
      { term: "Search engine optimization", pronunciation: "/sɜːtʃ ˈɛndʒɪn ˌɒptɪmaɪˈzeɪʃən/", partOfSpeech: "n", meaning: "Tối ưu hóa công cụ tìm kiếm", usage: "SEO helps websites rank higher in search results." },
      { term: "Banner ad", pronunciation: "/ˈbænər æd/", partOfSpeech: "n", meaning: "Quảng cáo banner", usage: "Banner ads appear on many websites." },
      { term: "Pop-up ad", pronunciation: "/pɒp ʌp æd/", partOfSpeech: "n", meaning: "Quảng cáo bật lên", usage: "Pop-up ads can be intrusive to users." },
      { term: "Engagement", pronunciation: "/ɪnˈɡeɪdʒmənt/", partOfSpeech: "n", meaning: "Sự tương tác", usage: "Social media engagement is a key metric for brands." },
      { term: "Click-through rate", pronunciation: "/klɪk θruː reɪt/", partOfSpeech: "n", meaning: "Tỷ lệ nhấp chuột", usage: "A high click-through rate indicates effective advertising." },
      { term: "Conversion rate", pronunciation: "/kənˈvɜːʃən reɪt/", partOfSpeech: "n", meaning: "Tỷ lệ chuyển đổi", usage: "The website has a 5% conversion rate." },
      { term: "User-generated content", pronunciation: "/ˈjuːzə ˈdʒɛnəreɪtɪd ˈkɒntɛnt/", partOfSpeech: "n", meaning: "Nội dung do người dùng tạo ra", usage: "Brands encourage user-generated content through contests." },
      { term: "Influence", pronunciation: "/ˈɪnfluəns/", partOfSpeech: "v", meaning: "Ảnh hưởng", usage: "Celebrities can influence consumer behavior." },
      { term: "Content marketing", pronunciation: "/ˈkɒntɛnt ˈmɑːkɪtɪŋ/", partOfSpeech: "n", meaning: "Tiếp thị nội dung", usage: "Content marketing focuses on creating valuable information." },
      { term: "Brand loyalty", pronunciation: "/brænd ˈlɔɪəlti/", partOfSpeech: "n", meaning: "Lòng trung thành với thương hiệu", usage: "Brand loyalty leads to repeat customers." }
    ]
  }
];

// Add more categories as needed based on the data provided

export const getAllCategories = () => {
  return categories;
};

export const getCategoryById = (id: string) => {
  return categories.find(category => category.id === id);
};

export const searchWords = (query: string) => {
  const results: { word: Word; category: string }[] = [];
  
  categories.forEach(category => {
    const matches = category.words.filter(word => 
      word.term.toLowerCase().includes(query.toLowerCase()) || 
      word.meaning.toLowerCase().includes(query.toLowerCase())
    );
    
    matches.forEach(word => {
      results.push({
        word,
        category: category.name
      });
    });
  });
  
  return results;
};
