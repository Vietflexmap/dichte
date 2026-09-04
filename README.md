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

## Công nghệ

- Leaflet 1.9.4
- Leaflet.markercluster 1.5.3
- Chart.js 4.4.7
- OpenStreetMap / CARTO basemap
- HTML, CSS, JavaScript thuần; không cần backend

## Nguồn mã và giấy phép

Phiên bản này được xây dựng dựa trên mã nguồn mở **[Vietflexmap/anhmap](https://github.com/Vietflexmap/anhmap)** và kế thừa định hướng WebGIS chạy trực tiếp trong trình duyệt. Phần mã mới/điều chỉnh được phát hành theo **MIT License**, tương thích với giấy phép của `anhmap`.

Copyright (c) 2026 Long Ngo.

Các thư viện, bản đồ nền và dịch vụ bên thứ ba vẫn tuân theo giấy phép/điều khoản riêng; xem `THIRD_PARTY_NOTICES.md`.

## Chạy nhanh

Mở trực tiếp `index.html` bằng trình duyệt hiện đại. Kết nối Internet cần thiết để tải Leaflet, Chart.js và lớp nền bản đồ.

## Cấu trúc

```text
.
├── index.html
├── assets/
│   ├── app.js
│   └── styles.css
├── LICENSE
├── THIRD_PARTY_NOTICES.md
└── README.md
```
