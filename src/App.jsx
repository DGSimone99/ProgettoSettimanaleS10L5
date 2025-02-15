import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TopBar from "./components/TopBar";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import WeatherCities from "./components/WeatherCities";
import NextDays from "./components/NextDays";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ComingSoon from "./components/ComingSoon";

function App() {
  const [language, setLanguage] = useState("it");
  const [flag, setFlag] = useState("italy");

  useEffect(() => {
    if (language === "it") {
      setFlag("italy");
    } else if (language === "en") {
      setFlag("united-kingdom");
    } else if (language === "fr") {
      setFlag("france");
    }
  }, [language]);

  console.log(language);

  return (
    <Container fluid className="px-0">
      <BrowserRouter>
        <TopBar setLanguage={setLanguage} language={language} flag={flag} />
        <div className="container bg-main py-4 rounded-4 shadow">
          <Routes>
            <Route path="/" title="Meteo" element={<WeatherCities language={language} />} />
            <Route path="/nextdays/:city" title="Prossimi giorni" element={<NextDays language={language} />} />
            <Route
              path="/comingSoon"
              title="Pagina al momento non disponibile"
              element={<ComingSoon language={language} />}
            />
            <Route path="*" title="Pagina non Trovata" element={<NotFound language={language} />} />
          </Routes>
        </div>
        <Footer language={language} />
      </BrowserRouter>
    </Container>
  );
}

export default App;
