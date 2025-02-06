import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Position, useDataStore } from "@/store/data.store";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface ProjectMapProps {
  position: Position;
}

const ProjectMap: React.FC<ProjectMapProps> = ({ position }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRefs = useRef<mapboxgl.Marker[]>([]);
  const projects = useDataStore((state) => state.projects);

  //map the coordinates from pos object
  const coordinatesData = projects
    ? projects.map((project) => ({
        lat: project.position.lat,
        lng: project.position.lng,
      }))
    : [];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [position.lng, position.lat],
        zoom: 9,
        attributionControl: false,
      });

      mapRef.current.on("load", () => {
        renderMarkers();
      });
    } else {
      mapRef.current.flyTo({
        center: [position.lng, position.lat],
        essential: true,
        zoom: 9,
      });
    }

    renderMarkers();
  }, [position, projects]);

  const renderMarkers = () => {
    if (!mapRef.current) return;

    markerRefs.current.forEach((marker) => marker.remove());
    markerRefs.current = [];

    coordinatesData.forEach(({ lat, lng }) => {
      const newMarker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current!);
      markerRefs.current.push(newMarker);
    });
  };

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: "500px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    />
  );
};

export default ProjectMap;
