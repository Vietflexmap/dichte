# Third-party notices

EpiMap sử dụng mã nguồn và thành phần bên thứ ba. Giấy phép MIT của dự án không thay thế giấy phép, điều khoản sử dụng hoặc yêu cầu ghi nguồn của các thành phần này.

## Vietflexmap/anhmap

Dự án này được xây dựng dựa trên mã nguồn MIT của **Vietflexmap/anhmap**, do Long Ngo phát triển. Thông báo bản quyền và giấy phép MIT được giữ trong `LICENSE`.

## Vietflexmap/VN

Runtime bản đồ của EpiMap được nạp trực tiếp từ **Vietflexmap/VN** bằng build đã ghim tại commit `6144d565fcf236727577ab3c4471bbe49f86892f`.

- `dist/vietflex.css`
- `dist/vietflex.js`

Theo dự án Vietflex/VN, phần core dẫn xuất từ Leaflet giữ giấy phép **BSD-2-Clause** và phần bổ sung Vietflex của Long Ngo theo **MIT**. EpiMap không nạp trực tiếp Leaflet CDN trong `index.html`.

## Google Maps / legacy compatibility tiles

Cấu hình trình diễn hiện dùng `useLegacyGoogleTiles: true` của Vietflex/VN. Đây là chế độ compatibility của Vietflex, không phải endpoint Map Tiles API chính thức được Google công bố cho ứng dụng bên thứ ba. Khi triển khai production cần xem xét Google Map Tiles API chính thức, billing, API-key restrictions và các yêu cầu attribution tương ứng.

Attribution hiển thị do `Vietflex.AttributionControl` quản lý, với nhận diện Vietflex và attribution của nhà cung cấp lớp nền.

## Chart.js

Chart.js được phát hành theo MIT License.

## Dữ liệu kịch bản

Toàn bộ hồ sơ, mã ca, quan hệ, cơ sở và tọa độ trong EpiMap là dữ liệu mô phỏng do Long Ngo thiết kế cho mục đích trình diễn WebGIS; không đại diện cho cá nhân thật hay báo cáo y tế chính thức.
