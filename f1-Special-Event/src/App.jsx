import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AllDriversPage, RegisterPage, ResultsPage } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "./layout/navbar";
import HomePage from "./layout/homepage";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <header className="">
          <Navbar />
        </header>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/all-drivers" element={<AllDriversPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
