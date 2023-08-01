import StartPage from '../../pages/start-screen/start-screen';

type AppProps = {
  offersCount: number;
}

function App(props: AppProps): JSX.Element {
  return <StartPage offersCount = {props.offersCount}/>;
}

export default App;
