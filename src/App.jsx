import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RequireAuth from "./hooks/RequireAuth";
import Home from "./pages/Home";
import Contacts from "./components/contacts/Contacts";
import DashboardLayout from "./layouts/DashboardLayout";
import Suppliers from "./components/suppliers/Suppliers";
import Items from "./pages/Itmes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/suppliers" element={<Suppliers />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
