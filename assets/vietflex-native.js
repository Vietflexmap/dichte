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

  function nativeClusterGroup(options = {}) {
    const group = new V.LayerGroup();
    const sourceLayers = [];
    const baseAddLayer = group.addLayer.bind(group);
    const baseClearLayers = group.clearLayers.bind(group);
    const baseOnAdd = group.onAdd.bind(group);
    const baseOnRemove = group.onRemove.bind(group);
    const radius = Number(options.maxClusterRadius) || 48;

    const rebuild = () => {
      const map = group._map;
      if (!map) return;

      baseClearLayers();
      const zoom = map.getZoom();

      if (zoom >= 11) {
        sourceLayers.forEach(baseAddLayer);
        return;
      }

      const buckets = new Map();
      sourceLayers.forEach((layer) => {
        if (!layer.getLatLng) {
          baseAddLayer(layer);
          return;
        }
        const latlng = layer.getLatLng();
        const point = map.project(latlng, zoom);
        const key = `${Math.floor(point.x / radius)}:${Math.floor(point.y / radius)}`;
        if (!buckets.has(key)) buckets.set(key, []);
        buckets.get(key).push(layer);
      });

      buckets.forEach((layers) => {
        if (layers.length === 1) {
          baseAddLayer(layers[0]);
          return;
        }

        const latlngs = layers.map((layer) => layer.getLatLng());
        const center = latlngs.reduce(
          (acc, latlng) => [acc[0] + latlng.lat, acc[1] + latlng.lng],
          [0, 0]
        ).map((value) => value / latlngs.length);

        const count = layers.length;
        const size = count >= 15 ? 55 : count >= 7 ? 48 : 42;
        const level = count >= 15 ? "large" : count >= 7 ? "medium" : "small";
        const icon = new V.DivIcon({
          html: `<div class="epi-cluster ${level}">${count}</div>`,
          className: "",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2]
        });

        const marker = new V.Marker(center, { icon, title: `${count} hồ sơ` })
          .bindTooltip(`<strong>${count} hồ sơ giả định</strong><br>Nhấp để phóng to`, {
            className: "case-tooltip",
            direction: "top"
          })
          .on("click", () => map.fitBounds(latlngs, { padding: [60, 60], maxZoom: 13 }));

        baseAddLayer(marker);
      });
    };

    group.addLayer = (layer) => {
      sourceLayers.push(layer);
      return group;
    };

    group.onAdd = (map) => {
      group._map = map;
      rebuild();
      map.on("zoomend", rebuild);
      return baseOnAdd(map);
    };

    group.onRemove = (map) => {
      map.off("zoomend", rebuild);
      return baseOnRemove(map);
    };

    return group;
  }

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

    markerClusterGroup(options) {
      return nativeClusterGroup(options);
    }
  };

  // Compatibility facade for the existing EpiMap application code.
  // No external Leaflet runtime is loaded; every primitive above is Vietflex.
  window.L = api;
})();
