// import logo from "./logo.svg";
import "./App.css";
// import LoginPage from "./views/LoginPage/loginPage";
// import GamePage from "./views/GamePage/GamePage";
import { RegisterPage } from "./views/RegisterPage/RegisterPage";

function App() {
  document.body.classList.add("bg-gray-200");
  document.body.classList.add("dark:bg-gray-600");
  return (
    <RegisterPage></RegisterPage>
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
