import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from './components/NotFound/NotFound';
import { Support } from './components/support/Support';
import { Scoreboard } from './components/Scoreboard/Scoreboard';

import { Game } from './components/Game/Game';
import { Winner } from './components/Winner/Winner';
import { Players } from './components/Players/Players';
import { GameScreen } from './components/Game/GameScreen';

function App() {
  return (
    <div className='container'>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Scoreboard />} />
          <Route path="/winner" element={<Winner/>} />

        </Routes>
        <Game />
        <Footer to='' />
        <Support />
      </BrowserRouter>
    </div>
  );
}

export default App;
