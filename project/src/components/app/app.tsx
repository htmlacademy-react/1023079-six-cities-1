import StartPage from '../../pages/start-screen/start-screen';

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {
  return <StartPage offersCount = {offersCount}/>;
}

export default App;
