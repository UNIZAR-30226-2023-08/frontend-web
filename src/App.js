// import { Test } from "./views/Test";
import { LoginPage } from "./views/LoginPage/loginPage";
import { GamePage } from "./views/GamePage/GamePage";
import { GamePage2P } from "./views/GamePage/GamePage2";
import { GamePage3P } from "./views/GamePage/GamePage3";
import { RegisterPage } from "./views/RegisterPage/RegisterPage";
import { SearchPage } from "./views/SearchPage/SearchPage";
// import { Brackets } from "./views/BracketPage/Brackets";
// import { default as WinnersPage } from "./views/WinnersPage/WinnersPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainMenuPage } from "./views/MainMenuPage/MainMenuPage";
import { WaitingRoomPage } from "./views/WaitingRoomPage/WaitingRoomPage";
import { Winners } from "./views/WinnersPage/Winners";
import { ThemeContext } from "./context/ThemeContext";
import { getCardAsset, setTheme } from "./utils/themes";
import themes from './assets/themes.json'
import { useState } from "react";
import { UserContext } from "./context/UserContext";
// import LoginPage from "./views/LoginPage/loginPage";
// import GamePage from "./views/GamePage/GamePage";

function App() {
  document.body.classList.add("bg-gray-200");
  document.body.classList.add("dark:bg-gray-600");
  
  const [currentTheme, setCurrentTheme] = useState("default")

  return (

    <ThemeContext.Provider value={themes[currentTheme]}>
      <UserContext.Provider value={Math.round(Math.random() * 1000)}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/waiting" element={<WaitingRoomPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/winners" element={<Winners />} />
          <Route path="/game2" element={<GamePage2P />} />
          <Route path="/game3" element={<GamePage3P />} />
          {/* <Route path="/brackets" element={<Brackets />} /> */}
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </ThemeContext.Provider>
    // <GamePage></GamePage>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
