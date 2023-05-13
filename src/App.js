import { LoginPage } from "./views/LoginPage/loginPage";
import { GamePage } from "./views/GamePage/GamePage";
import { RegisterPage } from "./views/RegisterPage/RegisterPage";
import { SearchPage } from "./views/SearchPage/SearchPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MainMenuPage } from "./views/MainMenuPage/MainMenuPage";
import { WaitingRoomPage } from "./views/WaitingRoomPage/WaitingRoomPage";
import { Winners } from "./views/WinnersPage/Winners";
import { ThemeContext } from "./context/ThemeContext";
import themes from "./assets/themes.json";
import { useState } from "react";
import { DisconnectPage } from "./views/DisconnectPage/DisconnectPage";
import { BACKEND_URL } from "./config";
import { ProtectedRoute } from "./components/Navigation/Navigation";

function App() {
  document.body.classList.add("bg-gray-200");
  document.body.classList.add("dark:bg-gray-600");

  const [currentTheme, setCurrentTheme] = useState("default");
  const [serverUrl, setServerUrl] = useState(BACKEND_URL);
  const [newGame, setNewGame] = useState(0);
  const [gameId, setGId] = useState(null);
  const [disconnectMsg, setDisconnectMsg] = useState("Desconexion");
  const [numJugadores, setNumJugadores] = useState(2);
  const [username, setUsername] = useState("");

  const startNewGame = () => setNewGame(newGame + 1);

  return (
    <ThemeContext.Provider value={themes[currentTheme]}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainMenuPage setUrl={setServerUrl} setUsername={setUsername} />
            }
          />
          <Route
            path="/login"
            element={<LoginPage setUsername={setUsername} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/waiting" element={<ProtectedRoute />}>
            <Route path="/waiting" element={<WaitingRoomPage />} />
          </Route>
          <Route path="/game" element={<ProtectedRoute />}>
            <Route
              path="/game"
              element={
                <GamePage
                  username={username}
                  url={serverUrl}
                  newGame={newGame}
                  gameId={gameId}
                  numJugadores={numJugadores}
                  setDisconnectMsg={setDisconnectMsg}
                />
              }
            />
          </Route>
          <Route path="/search" element={<ProtectedRoute />}>
            <Route
              path="/search"
              element={
                <SearchPage
                  username={username}
                  url={serverUrl}
                  setUrl={setServerUrl}
                  gameId={gameId}
                  setGameId={setGId}
                  startNewGame={startNewGame}
                  numJugadores={numJugadores}
                  setJugadores={setNumJugadores}
                />
              }
            />
          </Route>
          <Route path="/winners" element={<ProtectedRoute />}>
            <Route path="/winners" element={<Winners />} />
          </Route>
          <Route
            path="/disconnect"
            element={<DisconnectPage message={disconnectMsg} />}
          />
          {/* <Route path="/brackets" element={<Brackets />} /> */}
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
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
