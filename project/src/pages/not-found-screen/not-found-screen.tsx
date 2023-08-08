import './not-found.css';
import './logo.css';
import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';

export default function NotFound(): JSX.Element {
  return (
    <>
      <Helmet><title>404</title></Helmet>
      <h1 className='not-found-screen__title'> 404 Not Found </h1>
      <div className='logo-container'>
        <Logo />
      </div>
    </>
  );
}
