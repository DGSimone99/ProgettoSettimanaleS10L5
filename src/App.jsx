import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TopBar from "./components/TopBar";
import { Container } from "react-bootstrap";
import WeatherCities from "./components/WeatherCities";
import { useState } from "react";
import { BrowserRouter, Routes } from "react-router";
import NextDays from "./components/NextDays";

function App() {
  return (
    <Container fluid className="px-0">
      <BrowserRouter>
        <TopBar />
        <Routes>
          <WeatherCities path="/" />
          <NextDays path="/nextdays" title="Prossimi giorni" />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
