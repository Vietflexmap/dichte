# EpiMap WebGIS — 178 hồ sơ giả định phía Nam

WebGIS mô phỏng do **Long Ngo** thiết kế để minh họa hiệu quả của ứng dụng GIS trong truy vấn hồ sơ, trực quan hóa quan hệ tiếp xúc, phân tích vùng nguy cơ và diễn tiến theo thời gian.

> **Quan trọng:** Toàn bộ mã ca, quan hệ, lịch trình, cơ sở tiếp nhận và tọa độ đều là dữ liệu mô phỏng. Website không đại diện cho người thật, không phải dữ liệu y tế chính thức và không dùng để ra quyết định y tế. Tên địa bàn trong bộ mô phỏng chỉ là nhãn kịch bản và không nhằm mô tả cấu trúc hành chính hiện hành.

## Quy mô kịch bản

- **178 hồ sơ giả định** tại **10 địa bàn phía Nam**.
- Tìm kiếm theo mã ca, tỉnh/thành, khu vực và cơ sở tiếp nhận.
- Lọc trạng thái, mốc thời gian và mức nguy cơ.
- Truy vấn hồ sơ, nguồn liên quan, tiếp xúc và dòng thời gian.
- Vẽ mạng liên hệ/lây nhiễm giả định và vùng truy vấn nguy cơ bán kính **3 km**.
- Bật/tắt cơ sở, đổi lớp nền, chế độ sáng/tối.
- Xuất dữ liệu đang lọc thành **CSV** và **GeoJSON**.
- Biểu đồ **cột theo ngày + đường tích lũy** bằng Chart.js.
- Giao diện responsive cho máy tính và điện thoại.

## Nền bản đồ: Vietflex/VN

EpiMap nạp trực tiếp bản build đã ghim của **[Vietflexmap/VN](https://github.com/Vietflexmap/VN)** tại commit:

`6144d565fcf236727577ab3c4471bbe49f86892f`

```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/Vietflexmap/VN@6144d565fcf236727577ab3c4471bbe49f86892f/dist/vietflex.css">
<script src="https://cdn.jsdelivr.net/gh/Vietflexmap/VN@6144d565fcf236727577ab3c4471bbe49f86892f/dist/vietflex.js"></script>
```

Map được khởi tạo theo API chính thức của repo `VN`:

```js
const map = Vietflex.vietflexMap('map', {
  useLegacyGoogleTiles: true,
  googleMapType: 'roadmap',
  zoomControl: false,
  attributionControl: false
});

new Vietflex.AttributionControl({position: 'bottomright'}).addTo(map);
```

Không còn nạp trực tiếp `leaflet.js`, `leaflet.css`, `Leaflet.markercluster`, OpenStreetMap hoặc CARTO từ `index.html`. `assets/vietflex-native.js` chỉ là lớp tương thích nội bộ để mã EpiMap cũ gọi các primitive tương ứng của Vietflex (`Marker`, `Circle`, `Polyline`, `LayerGroup`, `DivIcon`).

## Công nghệ

- Vietflex/VN 1.0.0 — pinned build từ commit `6144d565...`
- Chart.js 4.4.7
- GeoJSON / CSV
- HTML, CSS, JavaScript thuần; không cần backend

## Nguồn mã và giấy phép

Phiên bản này được xây dựng dựa trên mã nguồn mở **[Vietflexmap/anhmap](https://github.com/Vietflexmap/anhmap)** và sử dụng **Vietflexmap/VN** làm runtime bản đồ. Phần mã EpiMap mới/điều chỉnh được phát hành theo **MIT License**.

Copyright (c) 2026 Long Ngo.

Vietflex/VN giữ nguyên ranh giới giấy phép của dự án: phần core dẫn xuất từ Leaflet theo BSD-2-Clause và phần bổ sung Vietflex theo MIT. Dịch vụ/tile của Google tuân theo điều khoản của Google. Xem `THIRD_PARTY_NOTICES.md`.

## Chạy nhanh

Mở trực tiếp `index.html` bằng trình duyệt hiện đại. Cần Internet để tải build Vietflex/VN đã ghim, Chart.js và lớp nền bản đồ.

## Cấu trúc

```text
.
├── index.html
├── assets/
│   ├── app.js
│   ├── styles.css
│   └── vietflex-native.js
├── LICENSE
├── THIRD_PARTY_NOTICES.md
└── README.md
```
