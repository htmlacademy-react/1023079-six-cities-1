import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';

type LocationProps = {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    name: string;
}


export default function useMap(city: LocationProps, mapRef: MutableRefObject<HTMLElement>) {
  const [map, setMap] = useState<null | leaflet.Map>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if(mapRef !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}
