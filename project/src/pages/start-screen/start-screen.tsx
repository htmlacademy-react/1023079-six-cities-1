import OfferList from '../../components/offers-list/offers-list';
import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import SortVarients from '../../components/sort-variants/sort-varients';
import { toggleSorts } from '../../store/action';
import HeaderNav from '../../components/header-nav/header-nav';
import CitiesList from '../../components/cities-list/cities-list';

export default function StartScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state.cityName);
  const offersForCurrentCity = useAppSelector(
    (state) => state.offersForCurrentCity
  );
  const isSortsOpen = useAppSelector((state) => state.isSortsOpen);

  // const [selectedOfferId, handleSelectedOfferChange] = useSelectedOffer();

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six Cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <HeaderNav />
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <CitiesList />
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offersForCurrentCity.length} places to stay in {currentCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span
                  onClick={() => dispatch(toggleSorts())}
                  className="places__sorting-type"
                  tabIndex={0}
                >
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                {isSortsOpen && <SortVarients />}
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OfferList
                  offers={offersForCurrentCity}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={offersForCurrentCity[0].city}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
