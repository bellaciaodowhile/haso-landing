import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Cursos from "./pages/Cursos";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/panel-admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}