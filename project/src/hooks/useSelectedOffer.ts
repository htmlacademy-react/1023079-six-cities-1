import { useCallback, useState } from 'react';

type ResultSelectedOffer = [number, (id: number) => void];

export const useSelectedOffer = (): ResultSelectedOffer => {
  const [selectedOfferId, setSelectedOfferId] = useState(-1);

  const handleSelectedOfferChange = useCallback(
    (id: number) => {
      setSelectedOfferId(id);
    }, []
  );

  return [selectedOfferId, handleSelectedOfferChange];
};
