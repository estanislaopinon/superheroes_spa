import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Marvel from "./pages/Marvel.jsx";
import DC from "./pages/DC.jsx";
import SuperheroDetail from "./components/SuperheroDetail.jsx";
import SuperheroForm from "./components/SuperheroForm.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 pb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marvel" element={<Marvel />} />
          <Route path="/dc" element={<DC />} />
          <Route path="/superhero/:id" element={<SuperheroDetail />} />
          <Route path="/create" element={<SuperheroForm />} />
          <Route path="/edit/:id" element={<SuperheroForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
