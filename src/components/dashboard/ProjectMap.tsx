import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Position } from "@/store/data.store";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface ProjectMapProps {
  position: Position;
}

const ProjectMap: React.FC<ProjectMapProps> = ({ position }) => {
  const coordinates = { lat: position.lat, lng: position.lng };
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: coordinates,
        zoom: 9,
      });

      new mapboxgl.Marker().setLngLat(coordinates).addTo(mapRef.current);
    }

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: coordinates,
        essential: true,
        zoom: 9,
      });

      if (markerRef.current) {
        markerRef.current.setLngLat(coordinates);
      } else {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(mapRef.current);
      }
      const existingMarkers =
        document.getElementsByClassName("mapboxgl-marker");
      while (existingMarkers[0]) {
        existingMarkers[0].parentNode?.removeChild(existingMarkers[0]);
      }
    }
  }, [coordinates]);

  return (
    <div
      ref={mapContainer}
      style={{
        height: "500px",
        width: "100%",
      }}
    />
  );
};

export default ProjectMap;
