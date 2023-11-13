import OfferListHeader from '../offer-list-header/offer-list-header';
import Sorts from '../sorts/sorts';
import OfferList from '../offers-list/offers-list';
import Map from '../map/map';

export default function ContentForCity(): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <OfferListHeader />
          <Sorts/>
          <div className="cities__places-list places__list tabs__content">
            <OfferList />
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map />
          </section>
        </div>
      </div>
    </div>
  );
}
