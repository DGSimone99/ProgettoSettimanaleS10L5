import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router";
import Clock from "./Clock";

const Weather = (props) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  const fetchCity = async () => {
    setIsLoading(true);

    try {
      console.log("fetching data...");
      const resp = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${props.cityName}&appid=3827a398648912c6a365cb04b12db29a`
      );
      if (resp.ok) {
        const city = await resp.json();
        console.log("Dati recuperati...", city);
        setCity(city[0]);
      } else {
        if (resp.status === 404) {
          throw new Error("404 - risorsa inesistente");
        } else {
          throw new Error("Errore nel reperimento dei dati");
        }
      }
    } catch (error) {
      console.log(error);
      setHasError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeather = async (lat, lon, language) => {
    setIsLoading(true);

    try {
      console.log("fetching data...");
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${language}&appid=3827a398648912c6a365cb04b12db29a`
      );
      if (resp.ok) {
        const weather = await resp.json();
        console.log("Dati recuperati, in arrivo le previsioni del meteo...", weather);
        setWeather(weather);
      } else {
        if (resp.status === 404) {
          throw new Error("404 - risorsa inesistente");
        } else {
          throw new Error("Errore nel reperimento dei dati");
        }
      }
    } catch (error) {
      console.log(error);
      setHasError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCity();
  }, [props.cityName]);

  useEffect(() => {
    if (city) {
      fetchWeather(city.lat, city.lon, props.language);
    }
  }, [city, props.language]);

  return city ? (
    <Card className="p-2 pt-1 border-0">
      {/*  {props.language === "it" && isLoading && <p>Caricamento...</p>}
      {props.language === "en" && isLoading && <p>Loading...</p>}
      {props.language === "fr" && isLoading && <p>Chargement...</p>} */}
      <Card.Body>
        {city ? (
          <div>
            <Card.Text className="m-0">{city.country}</Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              {city ? (
                <Card.Title className="fs-1 fw-bold mb-0 text-shadow text-uppercase">
                  {city.local_names?.[props.language] ?? city.name}
                </Card.Title>
              ) : (
                <div>
                  {props.language === "it" && <span className="fs-1 fw-bold mb-0 text">Città non disponibile</span>}
                  {props.language === "en" && <span className="fs-1 fw-bold mb-0 text">City not available</span>}
                  {props.language === "fr" && <span className="fs-1 fw-bold mb-0 text">Ville non disponible</span>}
                </div>
              )}

              {location.pathname !== "/" && <Clock />}
            </div>
          </div>
        ) : (
          <div>
            {props.language === "it" && <p className="fs-2">Città non disponibile</p>}
            {props.language === "en" && <p className="fs-2">City not available</p>}
            {props.language === "fr" && <p className="fs-2">Ville non disponible</p>}
          </div>
        )}

        {weather ? (
          <div className=" d-flex align-items-center mb-2">
            {props.language === "it" && <h3 className="fs-3 fw-bold pt-0">Tempo: </h3>}
            {props.language === "en" && <h3 className="fs-3 fw-bold pt-0">Weather: </h3>}
            {props.language === "fr" && <h3 className="fs-3 fw-bold pt-0">Météo: </h3>}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              width={45}
            ></img>
            <span className="fw-normal fs-4">{weather.weather[0].description.toUpperCase()}</span>
          </div>
        ) : (
          <div>
            {props.language === "it" && <span className="fw-normal">Tempo non disponibile</span>}
            {props.language === "en" && <span className="fw-normal">Weather not available</span>}
            {props.language === "fr" && <span className="fw-normal">Météo non disponible</span>}
          </div>
        )}

        <Row className="d-flex justify-content-between">
          <Col>
            <div className=" d-flex align-items-center mb-2">
              {props.language === "it" && <h3 className="fw-bold my-0 fs-4">Temperatura:</h3>}
              {props.language === "en" && <h3 className="fw-bold my-0 fs-4">Temperature:</h3>}
              {props.language === "fr" && <h3 className="fw-bold my-0 fs-4">Température:</h3>}
              {weather ? (
                <span className="fw-normal fs-4 ms-2">{(weather.main.temp - 273.15).toFixed(1)}°C</span>
              ) : (
                <div>
                  {props.language === "it" && <span className="fw-normal fs-4 ms-2">Temperatura non disponibile</span>}
                  {props.language === "en" && <span className="fw-normal fs-4 ms-2">Temperature not available</span>}
                  {props.language === "fr" && <span className="fw-normal fs-4 ms-2">Température non disponible</span>}
                </div>
              )}
            </div>

            <h3 className="fs-5 fw-bold">
              <div className=" d-flex align-items-center mb-2">
                {props.language === "it" && <h3 className="fw-bold my-0 fs-4">Umidità:</h3>}
                {props.language === "en" && <h3 className="fw-bold my-0 fs-4">Humidity:</h3>}
                {props.language === "fr" && <h3 className="fw-bold my-0 fs-4">Humidité:</h3>}
                {weather ? (
                  <span className="fw-normal fs-4 ms-2"> {weather.main.humidity}%</span>
                ) : (
                  <div>
                    {props.language === "it" && <span className="fw-normal fs-4 ms-2">Umidità non disponibile</span>}
                    {props.language === "en" && <span className="fw-normal fs-4 ms-2">Humidity not available</span>}
                    {props.language === "fr" && <span className="fw-normal fs-4 ms-2">Humidité non disponible</span>}
                  </div>
                )}
              </div>
            </h3>

            {location.pathname === "/" && weather && (
              <div>
                {props.language === "it" && (
                  <Button
                    as={Link}
                    to={`/nextdays/${weather.id}`}
                    className="ms-auto d-block bg-transparent border border-white nextDaysBtn mt-4"
                  >
                    Prossimi giorni
                  </Button>
                )}
                {props.language === "en" && (
                  <Button
                    as={Link}
                    to={`/nextdays/${weather.id}`}
                    className="ms-auto d-block bg-transparent border border-white nextDaysBtn mt-4"
                  >
                    Next days
                  </Button>
                )}
                {props.language === "fr" && (
                  <Button
                    as={Link}
                    to={`/nextdays/${weather.id}`}
                    className="ms-auto d-block bg-transparent border border-white nextDaysBtn mt-4"
                  >
                    Les prochains jours
                  </Button>
                )}
              </div>
            )}
          </Col>

          {location.pathname !== "/" && (
            <Col>
              <div className=" d-flex align-items-center mb-2 justify-content-center">
                {props.language === "it" && <h3 className="fw-bold my-0 fs-4">Nuvolosità:</h3>}
                {props.language === "en" && <h3 className="fw-bold my-0 fs-4">Cloudiness:</h3>}
                {props.language === "fr" && <h3 className="fw-bold my-0 fs-4">Nébulosité:</h3>}
                {weather ? (
                  <span className="fw-normal fs-4 ms-2"> {weather.clouds.all}%</span>
                ) : (
                  <div>
                    {props.language === "it" && <span className="fw-normal fs-4 ms-2">Umidità non disponibile</span>}
                    {props.language === "en" && <span className="fw-normal fs-4 ms-2">Cloudiness not available</span>}
                    {props.language === "fr" && <span className="fw-normal fs-4 ms-2">Nébulosité non disponible</span>}
                  </div>
                )}
              </div>

              <div className=" d-flex align-items-center mb-2 justify-content-center">
                {props.language === "it" && <h3 className="fw-bold my-0 fs-4">Vento:</h3>}
                {props.language === "en" && <h3 className="fw-bold my-0 fs-4">Wind:</h3>}
                {props.language === "fr" && <h3 className="fw-bold my-0 fs-4">Vent:</h3>}
                {weather ? (
                  <span className="fw-normal fs-4 ms-2"> {weather.wind.speed} m/s</span>
                ) : (
                  <div>
                    {props.language === "it" && <span className="fw-normal fs-4 ms-2">Vento non disponibile</span>}
                    {props.language === "en" && <span className="fw-normal fs-4 ms-2">Wind not available</span>}
                    {props.language === "fr" && <span className="fw-normal fs-4 ms-2">Vent non disponible</span>}
                  </div>
                )}
              </div>
            </Col>
          )}
          {location.pathname !== "/" && (
            <Col className="text-end">
              <div className=" d-flex align-items-center mb-2 justify-content-end">
                {props.language === "it" && <h3 className="fw-bold my-0 fs-4">Longitudine:</h3>}
                {props.language === "en" && <h3 className="fw-bold my-0 fs-4">Longitude:</h3>}
                {props.language === "fr" && <h3 className="fw-bold my-0 fs-4">Longitude:</h3>}
                {weather ? (
                  <span className="fw-normal fs-4 ms-2"> {weather.coord.lon}</span>
                ) : (
                  <div>
                    {props.language === "it" && (
                      <span className="fw-normal fs-4 ms-2">Longitudine non disponibile</span>
                    )}
                    {props.language === "en" && <span className="fw-normal fs-4 ms-2">Longitude not available</span>}
                    {props.language === "fr" && <span className="fw-normal fs-4 ms-2">Longitude non disponible</span>}
                  </div>
                )}
              </div>

              <div className=" d-flex align-items-center mb-2 justify-content-end">
                {props.language === "it" && <h3 className="fw-bold my-0 fs-4">Latitudine:</h3>}
                {props.language === "en" && <h3 className="fw-bold my-0 fs-4">Latitude:</h3>}
                {props.language === "fr" && <h3 className="fw-bold my-0 fs-4">Latitude:</h3>}
                {weather ? (
                  <span className="fw-normal fs-4 ms-2"> {weather.coord.lat}</span>
                ) : (
                  <div>
                    {props.language === "it" && <span className="fw-normal fs-4 ms-2">Latitudine non disponibile</span>}
                    {props.language === "en" && <span className="fw-normal fs-4 ms-2">Latitude not available</span>}
                    {props.language === "fr" && <span className="fw-normal fs-4 ms-2">Latitude non disponible</span>}
                  </div>
                )}
              </div>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  ) : (
    <Alert variant="danger" className="text-center">
      {props.language === "it" && <h2 className="fs-4">Città non trovata</h2>}
      {props.language === "en" && <h2 className="fs-4">City not found</h2>}
      {props.language === "fr" && <h2 className="fs-4">Ville non trouvée</h2>}
    </Alert>
  );
};

export default Weather;
