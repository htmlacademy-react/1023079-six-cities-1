import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MutableRefObject, useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { OfferType } from '../../mocks/offers';

type MapProps = {
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    name: string;
  };
  offers: OfferType[];
  selectedOfferId: number;
};

export default function Map({ city, offers, selectedOfferId }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(city, mapRef as MutableRefObject<HTMLElement>);
  const markersRef = useRef<leaflet.Marker[]>([]);

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
      markersRef.current.forEach((marker) => marker.remove());

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
