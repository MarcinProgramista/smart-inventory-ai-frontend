import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<h1>home</h1>} />
      </Routes>
    </>
  );
}

export default App;
