import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RequireAuth from "./hooks/RequireAuth";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/items" element={<h1>Items</h1>} />
          <Route path="/contacts" element={<h1>Contacts</h1>} />
          <Route path="/suppliers" element={<h1>Suppliers</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
