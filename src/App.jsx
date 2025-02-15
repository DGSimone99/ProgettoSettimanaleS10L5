import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TopBar from "./components/TopBar";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import WeatherCities from "./components/WeatherCities";
import NextDays from "./components/NextDays";

function App() {
  const [language, setLanguage] = useState("it");

  console.log(language);

  return (
    <Container fluid className="px-0">
      <BrowserRouter>
        <TopBar setLanguage={setLanguage} />
        <Routes>
          <Route path="/" element={<WeatherCities language={language} />} />
          <Route path="/nextdays/:city" title="Prossimi giorni" element={<NextDays language={language} />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
