import './not-found.css';
import './logo.css';
import Logo from '../../components/logo/logo';

export default function NotFound(): JSX.Element {
  return (
    <>
      <h1 className='not-found-screen__title'> 404 Not Found </h1>
      <div className='logo-container'>
        <Logo />
      </div>
    </>
  );
}
