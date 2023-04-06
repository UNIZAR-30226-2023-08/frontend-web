// import logo from "./logo.svg";
import "./App.css";
// import { Test } from "./views/Test";
import { LoginPage } from "./views/LoginPage/loginPage";
import { GamePage } from "./views/GamePage/GamePage";
import { RegisterPage } from "./views/RegisterPage/RegisterPage";
import { SearchPage } from "./views/SearchPage/SearchPage";
import { Brackets } from "./views/BracketPage/Brackets";
import { default as WinnersPage } from "./views/WinnersPage/WinnersPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainMenuPage } from "./views/MainMenuPage/MainMenuPage";
import { WaitingRoomPage } from "./views/WaitingRoomPage/WaitingRoomPage";
import { ThemeContext } from "./context/ThemeContext";
import { getCardAsset, setTheme } from "./utils/themes";
import themes from './assets/themes.json'
import { useState } from "react";
// import LoginPage from "./views/LoginPage/loginPage";
// import GamePage from "./views/GamePage/GamePage";

function App() {
  document.body.classList.add("bg-gray-200");
  document.body.classList.add("dark:bg-gray-600");
  
  const [currentTheme, setCurrentTheme] = useState("default")

  return (

    <ThemeContext.Provider value={themes[currentTheme]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/waiting" element={<WaitingRoomPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/brackets" element={<Brackets />} />
          <Route path="/winners" element={<WinnersPage />} />
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </BrowserRouter>
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
