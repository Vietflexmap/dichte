(() => {
  "use strict";

  if (!window.Vietflex) {
    console.error("Vietflex runtime is not available.");
    return;
  }

  const V = window.Vietflex;

  const resolveMapType = (url) => {
    const value = String(url || "");
    if (value.includes("dark_all")) return "hybrid";
    if (value.includes("light_all")) return "terrain";
    return "roadmap";
  };

  const api = {
    map(id, options = {}) {
      const map = V.vietflexMap(id, {
        ...options,
        useLegacyGoogleTiles: true,
        googleMapType: "roadmap",
        zoomControl: false,
        attributionControl: false
      });

      new V.AttributionControl({ position: "bottomright" }).addTo(map);
      return map;
    },

    tileLayer(url) {
      const layer = V.legacyGoogleTiles({ mapType: resolveMapType(url) });
      const addTo = layer.addTo.bind(layer);

      layer.addTo = (map) => {
        if (map.baseLayer && map.baseLayer !== layer && map.hasLayer(map.baseLayer)) {
          map.removeLayer(map.baseLayer);
        }
        map.baseLayer = layer;
        return addTo(map);
      };

      return layer;
    },

    marker(latlng, options) {
      return new V.Marker(latlng, options);
    },

    divIcon(options) {
      return new V.DivIcon(options);
    },

    layerGroup(layers = []) {
      return new V.LayerGroup(layers);
    },

    circle(latlng, options) {
      return new V.Circle(latlng, options);
    },

    circleMarker(latlng, options) {
      return new V.CircleMarker(latlng, options);
    },

    polyline(latlngs, options) {
      return new V.Polyline(latlngs, options);
    },

    // Vietflex/VN replaces the external markercluster dependency.
    // EpiMap keeps the same app contract while rendering markers through
    // the native Vietflex LayerGroup.
    markerClusterGroup() {
      return new V.LayerGroup();
    }
  };

  window.L = api;
})();
