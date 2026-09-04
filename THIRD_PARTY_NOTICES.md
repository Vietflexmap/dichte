# Third-party notices

EpiMap sử dụng mã nguồn và thành phần bên thứ ba. Giấy phép MIT của dự án không thay thế giấy phép, điều khoản sử dụng hoặc yêu cầu ghi nguồn của các thành phần này.

## Vietflexmap/anhmap

Dự án này được xây dựng dựa trên mã nguồn MIT của **Vietflexmap/anhmap**, do Long Ngo phát triển. Thông báo bản quyền và giấy phép MIT được giữ trong `LICENSE`.

## Vietflexmap/VN

Cấu hình lớp nền và nhận diện attribution của EpiMap tham chiếu dự án **Vietflexmap/VN**. Vietflex là dự án mã nguồn mở do Long Ngo phát triển; phần lõi có nguồn gốc Leaflet giữ BSD 2-Clause và phần bổ sung Vietflex sử dụng MIT theo giấy phép của repository `Vietflexmap/VN`.

Attribution trên giao diện EpiMap sử dụng biểu tượng cờ Việt Nam và liên kết tới `https://github.com/Vietflexmap/VN`.

## Leaflet

Leaflet 1.9.4 được giữ làm engine overlay nội bộ để phục vụ marker, circle, polyline, tooltip và tương thích plugin. Leaflet được phát hành theo BSD 2-Clause License. Branding Leaflet không được dùng làm prefix attribution của lớp nền EpiMap.

## Leaflet.markercluster

Plugin Leaflet.markercluster tuân theo giấy phép của dự án gốc.

## Chart.js

Chart.js được phát hành theo MIT License.

## Google Maps compatibility tiles

Các lớp nền roadmap, terrain và hybrid hiện được cấu hình theo adapter compatibility của Vietflex/VN với tham số `hl=vi` và `gl=VN`. Nội dung bản đồ, nhãn, hình ảnh và dịch vụ Google không thuộc giấy phép MIT của EpiMap hoặc Vietflex.

Repository Vietflex/VN nêu rõ endpoint `google.com/vt` không phải Map Tiles API công khai được Google tài liệu hóa cho ứng dụng bên thứ ba và có thể thay đổi hoặc ngừng hoạt động. Bản EpiMap này chỉ dùng chế độ đó cho mục đích mô phỏng/trình diễn. Khi triển khai production, người triển khai nên dùng Google Map Tiles API chính thức và tuân thủ đầy đủ điều khoản, billing, giới hạn API key và yêu cầu attribution hiện hành của Google.

## Dữ liệu kịch bản

Toàn bộ hồ sơ, mã ca, quan hệ, cơ sở và tọa độ trong EpiMap là dữ liệu mô phỏng do Long Ngo thiết kế cho mục đích trình diễn WebGIS; không đại diện cho cá nhân thật hay báo cáo y tế chính thức.
