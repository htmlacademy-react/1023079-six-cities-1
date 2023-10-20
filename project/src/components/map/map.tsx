import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MutableRefObject, useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { useAppSelector } from '../../hooks';

type MapProps = {
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    name: string;
  };
  selectedOfferId: number;
};

export default function Map({ city, selectedOfferId }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(city, mapRef as MutableRefObject<HTMLElement>);
  const markersRef = useRef<leaflet.Marker[]>([]);
  const offers = useAppSelector((state) => state.offersForCurrentCity);


  const defaultCustomIcon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [27, 39],
    iconAnchor: [13.5, 39],
  });

  useEffect(() => {
    if (map) {
      const cityForCenter = offers[0].city;
      markersRef.current.forEach((marker) => marker.remove());
      map.setView([cityForCenter.location.latitude, cityForCenter.location.longitude]);
      offers.forEach((offer) => {
        const marker = leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon:
                offer.id === selectedOfferId
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
        markersRef.current.push(marker);
      });
    }
  }, [map, offers, selectedOfferId]);

  return <div ref={mapRef} style={{ height: '100%' }} />;
}
