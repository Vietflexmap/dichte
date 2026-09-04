# EpiMap WebGIS — 178 hồ sơ giả định phía Nam

WebGIS mô phỏng do **Long Ngo** thiết kế để minh họa hiệu quả của ứng dụng GIS trong truy vấn hồ sơ, trực quan hóa quan hệ tiếp xúc, phân tích vùng nguy cơ và diễn tiến theo thời gian.

> **Quan trọng:** Toàn bộ mã ca, quan hệ, lịch trình, cơ sở tiếp nhận và tọa độ đều là dữ liệu mô phỏng. Website không đại diện cho người thật, không phải dữ liệu y tế chính thức và không dùng để ra quyết định y tế. Tên địa bàn trong bộ mô phỏng chỉ là nhãn kịch bản và không nhằm mô tả cấu trúc hành chính hiện hành.

## Quy mô kịch bản

- **178 hồ sơ giả định** tại **10 địa bàn phía Nam**.
- Tìm kiếm theo mã ca, tỉnh/thành, khu vực và cơ sở tiếp nhận.
- Lọc trạng thái, mốc thời gian và mức nguy cơ.
- Truy vấn hồ sơ, nguồn liên quan, tiếp xúc và dòng thời gian.
- Vẽ mạng liên hệ/lây nhiễm giả định và vùng truy vấn nguy cơ bán kính **3 km**.
- Gom cụm điểm, bật/tắt cơ sở, đổi lớp nền, chế độ sáng/tối.
- Xuất dữ liệu đang lọc thành **CSV** và **GeoJSON**.
- Biểu đồ **cột theo ngày + đường tích lũy** bằng Chart.js.
- Giao diện responsive cho máy tính và điện thoại.

## Bản đồ nền Vietflex/VN

EpiMap dùng cấu hình bản đồ nền theo dự án **[Vietflexmap/VN](https://github.com/Vietflexmap/VN)** với tham số ưu tiên tiếng Việt và khu vực Việt Nam (`hl=vi`, `gl=VN`). Attribution hiển thị trên bản đồ được đổi sang nhận diện **cờ Việt Nam + Vietflex**, thay cho prefix mặc định `Leaflet | © OpenStreetMap contributors` trước đây.

Ba lựa chọn lớp nền hiện tại được ánh xạ theo adapter tương thích của Vietflex/VN:

- **Vietflex · Đường phố** → roadmap.
- **Vietflex · Địa hình** → terrain.
- **Vietflex · Vệ tinh + đường** → hybrid.

Leaflet vẫn được giữ làm **engine overlay nội bộ** để bảo đảm tương thích với `Leaflet.markercluster`, marker, circle, polyline và các chức năng truy vấn hiện có. Việc giữ engine nội bộ không còn làm xuất hiện branding Leaflet trên attribution của giao diện.

> Vietflex/VN ghi rõ `google.com/vt` là chế độ compatibility/legacy và không phải endpoint Map Tiles API công khai được Google tài liệu hóa. Khi triển khai production nên chuyển sang Google Map Tiles API chính thức với API key và tuân thủ yêu cầu attribution của nhà cung cấp.

## Công nghệ

- Vietflex/VN — cấu hình lớp nền ưu tiên Việt Nam và nhận diện attribution.
- Leaflet 1.9.4 — engine overlay nội bộ.
- Leaflet.markercluster 1.5.3.
- Chart.js 4.4.7.
- Google compatibility tiles theo cấu hình Vietflex/VN.
- HTML, CSS, JavaScript thuần; không cần backend.

## Nguồn mã và giấy phép

Phiên bản này được xây dựng dựa trên mã nguồn mở **[Vietflexmap/anhmap](https://github.com/Vietflexmap/anhmap)** và sử dụng định hướng bản đồ Việt Nam từ **[Vietflexmap/VN](https://github.com/Vietflexmap/VN)**. Phần mã mới/điều chỉnh của EpiMap được phát hành theo **MIT License**.

Copyright (c) 2026 Long Ngo.

Các thư viện, bản đồ nền và dịch vụ bên thứ ba vẫn tuân theo giấy phép/điều khoản riêng; xem `THIRD_PARTY_NOTICES.md`.

## Chạy nhanh

Mở trực tiếp `index.html` bằng trình duyệt hiện đại. Kết nối Internet cần thiết để tải thư viện JavaScript và lớp nền bản đồ.

## Cấu trúc

```text
.
├── index.html
├── assets/
│   ├── app.js
│   ├── vietflex-basemap.js
│   └── styles.css
├── LICENSE
├── THIRD_PARTY_NOTICES.md
└── README.md
```
