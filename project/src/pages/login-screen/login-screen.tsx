import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { AppRoutes, AuthorizationsStatus, NameSpace } from '../../consts';

export default function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state[NameSpace.User].authorizationStatus);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();

  const onLoginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue(event.target.value);
  };

  const onPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordValue(event.target.value);
  };

  const sendFormHandler = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    const hasLetter = /[A-Za-z]/.test(passwordValue);
    const hasDigit = /\d/.test(passwordValue);

    if(hasLetter && hasDigit) {
      const login = loginValue;
      const password = passwordValue;

      dispatch(loginAction({ login, password }));
      navigate(AppRoutes.Main);
    }
  };

  if(status !== AuthorizationsStatus.Auth) {
    return (
      <div className="page page--gray page--login">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
            </div>
          </div>
        </header>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form onSubmit={sendFormHandler} className="login__form form" action="#" method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={onLoginChangeHandler}
                    value={loginValue}
                    required
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={passwordValue}
                    onChange={onPasswordChangeHandler}
                    required
                  />
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit"
                >
                Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  } else {
    return <Navigate to={AppRoutes.Main} />;
  }
}
