const products = [
  // Smartphones
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    price: 27990000,
    image: "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-purple-1.jpg",
    category: "smartphone",
    brand: "Apple",
    description: "iPhone 14 Pro Max 128GB - Smartphone cao cấp từ Apple với camera 48MP, chip A16 Bionic",
    detailedDescription: {
      screen: "Màn hình OLED 6.7 inch, Super Retina XDR, Dynamic Island",
      os: "iOS 16",
      rearCamera: "Camera chính 48MP, camera góc siêu rộng 12MP, camera tele 12MP",
      frontCamera: "Camera selfie 12MP với Face ID",
      chip: "Apple A16 Bionic",
      ram: "6GB",
      storage: "128GB",
      battery: "4323mAh, sạc nhanh 20W, sạc không dây MagSafe 15W",
      features: [
        "Dynamic Island",
        "Always-on display",
        "Chống nước IP68",
        "Face ID",
        "Hỗ trợ 5G"
      ]
    },
    inStock: true,
    rating: 4.9,
    discount: 5,
    colors: ["Deep Purple", "Gold", "Silver", "Space Black"],
    warranty: "12 tháng chính hãng"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 26990000,
    image: "https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-1.jpg",
    category: "smartphone",
    brand: "Samsung",
    description: "Samsung Galaxy S23 Ultra - Bút S-Pen, Camera 200MP, Snapdragon 8 Gen 2",
    detailedDescription: {
      screen: "Dynamic AMOLED 2X 6.8 inch, QHD+, 120Hz",
      os: "Android 13, One UI 5.1",
      rearCamera: "Camera chính 200MP, góc siêu rộng 12MP, tele 10MP (3x), tele 10MP (10x)",
      frontCamera: "Camera selfie 12MP",
      chip: "Snapdragon 8 Gen 2 for Galaxy",
      ram: "8GB/12GB",
      storage: "256GB/512GB",
      battery: "5000mAh, sạc nhanh 45W, sạc không dây 15W",
      features: [
        "Bút S-Pen tích hợp",
        "Chống nước IP68",
        "Vân tay siêu âm",
        "Samsung DeX",
        "Hỗ trợ 5G"
      ]
    },
    inStock: true,
    rating: 4.8,
    discount: 10,
    colors: ["Cream", "Green", "Lavender", "Phantom Black"],
    warranty: "12 tháng chính hãng"
  },
  {
    id: 3,
    name: "MacBook Pro 14 M2 Pro",
    price: 52990000,
    image: "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-600x600.jpg",
    category: "laptop",
    brand: "Apple",
    description: "MacBook Pro 14 inch M2 Pro - Hiệu năng chuyên nghiệp cho công việc sáng tạo",
    detailedDescription: {
      screen: "14.2 inch Liquid Retina XDR display, 3024 x 1964 pixels, ProMotion 120Hz",
      os: "macOS Ventura",
      processor: "Apple M2 Pro 10-core CPU, 16-core GPU",
      ram: "16GB Unified Memory",
      storage: "512GB SSD",
      battery: "70Wh, sạc 67W",
      ports: [
        "3x Thunderbolt 4",
        "HDMI",
        "SDXC card slot",
        "MagSafe 3",
        "Jack 3.5mm"
      ],
      features: [
        "Touch ID",
        "Force Touch trackpad",
        "Webcam 1080p",
        "6 loa tích hợp",
        "Wi-Fi 6E"
      ]
    },
    inStock: true,
    rating: 4.9,
    discount: 8,
    colors: ["Space Gray", "Silver"],
    warranty: "24 tháng chính hãng"
  },
  {
    id: 4,
    name: "iPad Pro 12.9 inch M2",
    price: 34990000,
    image: "https://cdn.tgdd.vn/Products/Images/522/325536/ipad-pro-13-inch-m4-lte-black-1-750x500.jpg",
    category: "tablet",
    brand: "Apple",
    description: "iPad Pro 12.9 inch M2 - Màn hình Mini LED, Apple Pencil 2 thế hệ mới",
    detailedDescription: {
      screen: "12.9 inch Liquid Retina XDR mini-LED, ProMotion 120Hz",
      os: "iPadOS 16",
      processor: "Apple M2 8-core CPU, 10-core GPU",
      ram: "8GB",
      storage: "128GB/256GB/512GB/1TB/2TB",
      camera: {
        rear: "Camera chính 12MP, Ultra Wide 10MP, LiDAR Scanner",
        front: "Camera TrueDepth 12MP với Center Stage"
      },
      features: [
        "Face ID",
        "Hỗ trợ Apple Pencil 2",
        "Magic Keyboard",
        "Thunderbolt / USB 4",
        "5G (tùy chọn)"
      ]
    },
    inStock: true,
    rating: 4.8,
    discount: 5,
    colors: ["Space Gray", "Silver"],
    warranty: "12 tháng chính hãng"
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    price: 9490000,
    image: "https://cdn.tgdd.vn/Files/2023/02/26/1512840/2-260223-170637-800-resize.jpg",
    category: "headphone",
    brand: "Sony",
    description: "Tai nghe chống ồn cao cấp Sony WH-1000XM5",
    detailedDescription: {
      type: "Over-ear, Wireless",
      driver: "30mm, Dome Type",
      frequency: "20 Hz - 20,000 Hz",
      bluetooth: "Bluetooth 5.2, Multipoint connection",
      noiseCancelling: "Advanced Noise Cancelling với 8 microphone",
      battery: {
        playTime: "30 giờ (ANC bật)",
        chargingTime: "3.5 giờ sạc đầy",
        quickCharge: "3 phút sạc cho 3 giờ nghe nhạc"
      },
      features: [
        "LDAC codec support",
        "Touch control",
        "Speak-to-chat",
        "Adaptive Sound Control",
        "Multipoint connection"
      ]
    },
    inStock: true,
    rating: 4.7,
    discount: 15,
    colors: ["Black", "Silver"],
    warranty: "12 tháng chính hãng"
  },
  {
    id: 6,
    name: "Apple Watch Series 10 GPS + Cellular 42mm viền nhôm dây thể thao",
    price: 9490000,
    image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/7077/329156/apple-watch-s10-xanh-1-638616621228697106-750x500.jpg",
    category: "headphone",
    brand: "Sony",
    description: "Tai nghe chống ồn cao cấp Sony WH-1000XM5",
    detailedDescription: {
      type: "Over-ear, Wireless",
      driver: "30mm, Dome Type",
      frequency: "20 Hz - 20,000 Hz",
      bluetooth: "Bluetooth 5.2, Multipoint connection",
      noiseCancelling: "Advanced Noise Cancelling với 8 microphone",
      battery: {
        playTime: "30 giờ (ANC bật)",
        chargingTime: "3.5 giờ sạc đầy",
        quickCharge: "3 phút sạc cho 3 giờ nghe nhạc"
      },
      features: [
        "LDAC codec support",
        "Touch control",
        "Speak-to-chat",
        "Adaptive Sound Control",
        "Multipoint connection"
      ]
    },
    inStock: true,
    rating: 4.7,
    discount: 15,
    colors: ["Black", "Silver"],
    warranty: "12 tháng chính hãng"
  },
  {
    id: 7,
    name: "AirPods 4 (chống ồn)",
    price: 9490000,
    image: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/54/329158/airpods-4-cong-usb-c-2-638615794702250265-750x500.jpg",
    category: "headphone",
    brand: "Sony",
    description: "Tai nghe chống ồn cao cấp Sony WH-1000XM5",
    detailedDescription: {
      type: "Over-ear, Wireless",
      driver: "30mm, Dome Type",
      frequency: "20 Hz - 20,000 Hz",
      bluetooth: "Bluetooth 5.2, Multipoint connection",
      noiseCancelling: "Advanced Noise Cancelling với 8 microphone",
      battery: {
        playTime: "30 giờ (ANC bật)",
        chargingTime: "3.5 giờ sạc đầy",
        quickCharge: "3 phút sạc cho 3 giờ nghe nhạc"
      },
      features: [
        "LDAC codec support",
        "Touch control",
        "Speak-to-chat",
        "Adaptive Sound Control",
        "Multipoint connection"
      ]
    },
    inStock: true,
    rating: 4.7,
    discount: 15,
    colors: ["Black", "Silver"],
    warranty: "12 tháng chính hãng"
  }
  ,{
    id: 8,
    name: "Sony WH-1000XM5",
    price: 9490000,
    image: "https://cdn.tgdd.vn/Files/2023/02/26/1512840/2-260223-170637-800-resize.jpg",
    category: "headphone",
    brand: "Sony",
    description: "Tai nghe chống ồn cao cấp Sony WH-1000XM5",
    detailedDescription: {
      type: "Over-ear, Wireless",
      driver: "30mm, Dome Type",
      frequency: "20 Hz - 20,000 Hz",
      bluetooth: "Bluetooth 5.2, Multipoint connection",
      noiseCancelling: "Advanced Noise Cancelling với 8 microphone",
      battery: {
        playTime: "30 giờ (ANC bật)",
        chargingTime: "3.5 giờ sạc đầy",
        quickCharge: "3 phút sạc cho 3 giờ nghe nhạc"
      },
      features: [
        "LDAC codec support",
        "Touch control",
        "Speak-to-chat",
        "Adaptive Sound Control",
        "Multipoint connection"
      ]
    },
    inStock: true,
    rating: 4.7,
    discount: 15,
    colors: ["Black", "Silver"],
    warranty: "12 tháng chính hãng"
  }
];

export default products;
