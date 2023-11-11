import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MutableRefObject, useRef, useEffect, memo } from 'react';
import useMap from '../../hooks/useMap';
import { useAppSelector } from '../../hooks';
import { OfferType } from '../../mocks/offers';

type MapProps = {
  offersInNeighbourhood?: OfferType[];
  currentOffer?: OfferType;
};

function Map({ offersInNeighbourhood, currentOffer }: MapProps) {
  const allOffers = useAppSelector((state) => state.DATA.allOffers);
  const cityName = useAppSelector((state) => state.DATA.cityName);
  const offersForCurrentCity = allOffers.filter((offer) => offer.city.name === cityName);
  const city = offersForCurrentCity[0].city;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(city, mapRef as MutableRefObject<HTMLElement>);
  const markersRef = useRef<leaflet.Marker[]>([]);
  const offers = offersInNeighbourhood ? offersInNeighbourhood : offersForCurrentCity;
  const selectedOfferId = useAppSelector((state) => state.APP.selectedOfferId);


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
      const cityForCenter = offers.find((offer) => 'location' in offer);
      if(cityForCenter) {
        map.setView([cityForCenter.location.latitude, cityForCenter.location.longitude]);
      }
      if(offers.length) {
        if(currentOffer) {
          offers.push(currentOffer);
        }
        offers.forEach((offer) => {
          const marker = leaflet
            .marker(
              {
                lat: offer.location.latitude,
                lng: offer.location.longitude,
              },
              {
                icon:
                  offer.id === selectedOfferId || offer.id === currentOffer?.id
                    ? currentCustomIcon
                    : defaultCustomIcon,
              }
            )
            .addTo(map);
          markersRef.current.push(marker);
        });
      }
    }
  }, [map, offers, selectedOfferId]);

  return <div ref={mapRef} style={{ height: '100%' }} />;
}

export default memo(Map);
