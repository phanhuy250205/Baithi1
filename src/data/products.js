const products = [
    {
      id: 1,
      name: "Serum Vitamin C Melano CC",
      price: 250000,
      image: "https://product.hstatic.net/1000006063/product/serum_melano_cc_20ml_1_7df7c7f7f07d4f4e9d6c4f4f4f4f4f4f.jpg",
      brand: "Rohto",
      category: "Chăm sóc da mặt",
      description: "Serum Vitamin C giúp làm mờ thâm nám, dưỡng sáng da",
      detailedDescription: {
        type: "Serum dưỡng da",
        volume: "20ml",
        origin: "Nhật Bản",
        skinType: "Mọi loại da",
        features: [
          "Làm mờ vết thâm, nám",
          "Dưỡng sáng da",
          "Chống oxy hóa",
          "Cải thiện tông màu da"
        ],
        ingredients: "Vitamin C, Vitamin E, Dipotassium Glycyrrhizate...",
        usage: "Sử dụng sau bước toner, trước kem dưỡng. Dùng 2 lần/ngày",
        preservation: "36 tháng kể từ ngày sản xuất. 6 tháng sau khi mở nắp"
      }
    },
    {
      id: 2,
      name: "Son 3CE Mood Recipe Matte Lip Color",
      price: 320000,
      image: "https://product.hstatic.net/1000006063/product/3ce_mood_recipe_matte_lip_color.jpg",
      brand: "3CE",
      category: "Trang điểm",
      description: "Son lì với màu sắc trendy, chất son mịn mượt",
      detailedDescription: {
        type: "Son môi",
        volume: "3.5g",
        origin: "Hàn Quốc",
        finish: "Matte (Lì)",
        features: [
          "Chất son mịn mượt",
          "Độ bám màu cao",
          "Không gây khô môi",
          "Màu sắc thời trang"
        ],
        colors: [
          "219 Brilliant Ruby",
          "909 Smoked Rose",
          "115 Muss Mallow"
        ],
        ingredients: "Dimethicone, Cyclopentasiloxane, Synthetic Wax...",
        usage: "Thoa trực tiếp lên môi, có thể dùng cọ son để tán đều",
        preservation: "30 tháng kể từ ngày sản xuất"
      }
    },
    {
      id: 3,
      name: "Nước Tẩy Trang Bioderma Sensibio H2O",
      price: 420000,
      image: "https://product.hstatic.net/1000006063/product/bioderma_sensibio_h2o.jpg",
      brand: "Bioderma",
      category: "Chăm sóc da mặt",
      description: "Nước tẩy trang dịu nhẹ, không kích ứng da",
      detailedDescription: {
        type: "Nước tẩy trang",
        volume: "500ml",
        origin: "Pháp",
        skinType: "Mọi loại da, đặc biệt da nhạy cảm",
        features: [
          "Làm sạch sâu",
          "Không gây kích ứng",
          "Không cần rửa lại với nước",
          "Dịu nhẹ với da"
        ],
        ingredients: "Aqua, PEG-6 Caprylic/Capric Glycerides...",
        usage: "Thấm dung dịch vào bông tẩy trang, lau nhẹ nhàng trên da",
        preservation: "36 tháng kể từ ngày sản xuất. 6 tháng sau khi mở nắp"
      }
    },
    {
      id: 4,
      name: "Kem Chống Nắng La Roche-Posay Anthelios",
      price: 375000,
      image: "https://www.laroche-posay.vn/-/media/project/loreal/brand-sites/lrp/apac/vn/products/anthelios/anthelios-invisible-fluid-spf-50.png",
      brand: "La Roche-Posay",
      category: "Chống nắng",
      description: "Kem chống nắng dạng lỏng, không gây nhờn rít",
      detailedDescription: {
        type: "Kem chống nắng",
        volume: "50ml",
        origin: "Pháp",
        skinType: "Mọi loại da, kể cả da nhạy cảm",
        spf: "SPF50+ PA++++",
        features: [
          "Chống nắng phổ rộng",
          "Không gây nhờn rít",
          "Thấm nhanh",
          "Không để lại vệt trắng"
        ],
        ingredients: "Aqua, Alcohol Denat, Diisopropyl Sebacate...",
        usage: "Thoa đều lên da 15-30 phút trước khi ra nắng. Thoa lại sau mỗi 2 giờ",
        preservation: "12 tháng sau khi mở nắp"
      }
    },
    {
      id: 5,
      name: "Mặt Nạ Innisfree Green Tea",
      price: 22000,
      image: "https://product.hstatic.net/1000006063/product/innisfree_green_tea_mask.jpg",
      brand: "Innisfree",
      category: "Mặt nạ",
      description: "Mặt nạ giấy chiết xuất trà xanh, cấp ẩm tức thì",
      detailedDescription: {
        type: "Mặt nạ giấy",
        volume: "20ml/miếng",
        origin: "Hàn Quốc",
        skinType: "Mọi loại da",
        features: [
          "Cấp ẩm tức thì",
          "Làm dịu da",
          "Chống oxy hóa",
          "Giảm dầu nhờn"
        ],
        ingredients: "Green Tea Extract, Betaine, Glycerin...",
        usage: "Đắp mặt nạ 10-20 phút, massage nhẹ phần tinh chất còn lại",
        preservation: "24 tháng kể từ ngày sản xuất"
      }
    }
  ];
  
  export default products;