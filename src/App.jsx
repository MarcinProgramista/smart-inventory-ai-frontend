import { Route, Routes } from "react-router-dom";
import StartPageCard from "./components/ui/StartPageCard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPageCard />} />
      </Routes>
    </>
  );
}

export default App;
