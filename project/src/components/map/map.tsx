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
}

export default function Map({city, offers}: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(city, mapRef as MutableRefObject<HTMLElement>);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // const currentCustomIcon = leaflet.icon({
  //   iconUrl: './img/pin-active.svg',
  //   iconSize: [40, 40],
  //   iconAnchor: [20, 40],
  // });

  useEffect(() => {
    if(map) {
      offers.forEach((offer) => {
        leaflet.marker({
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude
        }, {
          icon: defaultCustomIcon
        })
          .addTo(map);
      });
    }
  }, [map, offers]);

  return (
    <div ref={mapRef} style={{height: '100%'}}/>
  );
}
