import {BrowserRouter} from "react-router-dom";
import {Layout, Main} from "./App.styled";
import Footer from "./features/Footer";
import Game from "./features/Game";
import Leaderboard from "./features/Leaderboard";
import Menu from "./features/Menu";

const App = () => {
  return (
    <Main nightmode={false}>
      <BrowserRouter>
        <Layout>
          <Menu />
          <Game />
          <Leaderboard />
          <Footer />
        </Layout>
      </BrowserRouter>
    </Main>
  );
};

export default App;
