import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TopBar from "./components/TopBar";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import WeatherCities from "./components/WeatherCities";
import NextDays from "./components/NextDays";

function App() {
  return (
    <Container fluid className="px-0">
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<WeatherCities />} />
          <Route path="/nextdays/:city" title="Prossimi giorni" element={<NextDays />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
