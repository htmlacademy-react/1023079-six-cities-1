import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import HeaderNav from '../../components/header-nav/header-nav';
import CitiesList from '../../components/cities-list/cities-list';
import { memo, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { NameSpace } from '../../consts';
import ContentForCity from '../../components/content-for-city/content-for-city';
import EmptyContentForCity from '../../components/empty-content-for-city/empty-content-for-city';
import { changeSortType, setOffersForSelectedCity } from '../../store/data-process/data-process.slice';

function StartScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const allOffers = useAppSelector((state) => state[NameSpace.Data].allOffers);
  const cityName = useAppSelector((state) => state[NameSpace.Data].cityName);
  const sortType = useAppSelector((state) => state[NameSpace.Data].sortType);

  const offersForCurrentCity = useMemo(() => allOffers.filter((offer) => offer.city.name === cityName), [allOffers, cityName]);

  useEffect(() => {
    dispatch(setOffersForSelectedCity(offersForCurrentCity));
    dispatch(changeSortType(sortType));
  }, [offersForCurrentCity]);

  const getContentForPage = useMemo(() => offersForCurrentCity.length ? <ContentForCity/> : <EmptyContentForCity />, [allOffers, cityName]);

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
        {getContentForPage}
      </main>
    </div>
  );
}

export default memo(StartScreen);
