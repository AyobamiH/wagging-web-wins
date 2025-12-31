import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";

mapboxgl.accessToken = 'pk.eyJ1IjoiYXlvYmFtaWoiLCJhIjoiY20wczlscGtxMGhweTJpc2JlaTV5a3V0bCJ9.2I7odcwuW_Zz0Et9tQcwJw';

const NorthamptonMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  const northamptonCoordinates: [number, number] = [-0.9027, 52.2405];

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: northamptonCoordinates,
      zoom: 12,
      interactive: false,
    });

    // Add marker to the center of the map
    new mapboxgl.Marker({
      color: '#3B82F6'
    })
      .setLngLat(northamptonCoordinates)
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Serving Northampton Pet Care Professionals
        </h2>
        <p className="text-muted-foreground text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
          Tail Wagging Websites Factory Northampton is dedicated to helping local pet care businesses thrive online across Northamptonshire.
        </p>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-glow border border-border">
          <div
            ref={mapContainer}
            className="w-full h-96 md:h-80 sm:h-72"
          />
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          <p>📍 Based in Northampton • Serving all of Northamptonshire</p>
          <div className="mt-3">
            <Button variant="default" size="sm" asChild>
              <a href="tel:+447402342694">Call +44 7402 342694</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NorthamptonMap;