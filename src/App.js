// import logo from "./logo.svg";
import "./App.css";
import { LoginPage } from "./views/LoginPage/loginPage";
import { RegisterPage } from "./views/RegisterPage/RegisterPage";
import { SearchPage } from "./views/SearchPage/SearchPage";
import { Brackets } from "./views/BracketPage/Brackets";
import { default as WinnersPage } from "./views/WinnersPage/WinnersPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "./views/LoginPage/loginPage";
// import GamePage from "./views/GamePage/GamePage";

function App() {
  document.body.classList.add("bg-gray-200");
  document.body.classList.add("dark:bg-gray-600");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/brackets" element={<Brackets />} />
        <Route path="/winners" element={<WinnersPage />} />
      </Routes>
    </BrowserRouter>
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
