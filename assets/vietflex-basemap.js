(() => {
  "use strict";

  if (!window.L) return;

  const VIETFLEX_URL = "https://github.com/Vietflexmap/VN";
  const GOOGLE_URL = "https://www.google.com/maps";
  const VIETFLEX_PREFIX = `<a target="_blank" rel="noopener" href="${VIETFLEX_URL}" title="Vietflex · Bản đồ Việt Nam và Biển Đông"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" style="vertical-align:-2px;margin-right:4px;border-radius:1px"><path fill="#da251d" d="M0 0h18v12H0z"/><path fill="#ff0" d="m9 2.1.88 2.7h2.84l-2.3 1.67.88 2.7L9 7.5 6.7 9.17l.88-2.7-2.3-1.67h2.84z"/></svg>Vietflex</a>`;
  const GOOGLE_ATTRIBUTION = `<a href="${GOOGLE_URL}" target="_blank" rel="noopener">Google Maps</a>`;

  const originalMap = L.map;
  const originalTileLayer = L.tileLayer;

  function vietflexTileSpec(url) {
    if (url.includes("tile.openstreetmap.org")) return { code: "m", label: "Đường phố" };
    if (url.includes("basemaps.cartocdn.com/light_all")) return { code: "p", label: "Địa hình" };
    if (url.includes("basemaps.cartocdn.com/dark_all")) return { code: "y", label: "Vệ tinh + đường" };
    return null;
  }

  const patchedTileLayer = function (url, options = {}) {
    const spec = vietflexTileSpec(String(url));
    if (!spec) return originalTileLayer.call(L, url, options);

    return originalTileLayer.call(
      L,
      `https://{s}.google.com/vt/lyrs=${spec.code}&hl=vi&gl=VN&x={x}&y={y}&z={z}`,
      {
        ...options,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        maxZoom: 22,
        attribution: GOOGLE_ATTRIBUTION
      }
    );
  };
  Object.assign(patchedTileLayer, originalTileLayer);
  L.tileLayer = patchedTileLayer;

  const patchedMap = function (...args) {
    const map = originalMap.apply(L, args);
    map.attributionControl?.setPrefix(VIETFLEX_PREFIX);
    return map;
  };
  Object.assign(patchedMap, originalMap);
  L.map = patchedMap;

  const relabel = () => {
    const labels = {
      street: "🇻🇳 Vietflex · Đường phố",
      light: "🇻🇳 Vietflex · Địa hình",
      dark: "🇻🇳 Vietflex · Vệ tinh + đường"
    };
    document.querySelectorAll('[name="basemap"]').forEach(input => {
      const label = input.closest("label");
      if (!label || !labels[input.value]) return;
      while (input.nextSibling) input.nextSibling.remove();
      label.append(document.createTextNode(` ${labels[input.value]}`));
    });

    document.querySelectorAll(".tech-note").forEach(note => {
      const key = note.querySelector("strong")?.textContent?.trim();
      if (key === "Nền tảng mở") {
        const value = note.querySelector("span");
        if (value) value.textContent = "Vietflex/VN · Leaflet overlay engine · Chart.js · GeoJSON · Web standards";
      }
    });
  };

  relabel();
})();
