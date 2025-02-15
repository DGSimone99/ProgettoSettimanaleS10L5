import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TopBar from "./components/TopBar";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import WeatherCities from "./components/WeatherCities";
import NextDays from "./components/NextDays";

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
        <TopBar setLanguage={setLanguage} flag={flag} />
        <div className="container bg-main py-4 rounded-4 shadow">
          <Routes>
            <Route path="/" element={<WeatherCities language={language} />} />
            <Route path="/nextdays/:city" title="Prossimi giorni" element={<NextDays language={language} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
