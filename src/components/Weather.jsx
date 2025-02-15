import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
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

  return (
    <Card className="p-2 pt-1 border-0">
      {isLoading && <p>Caricamento...</p>}
      <Card.Body>
        {city ? (
          <div>
            <Card.Text className="m-0">{city.state}</Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title className="fs-1 fw-bold mb-0 text-shadow">{city.name.toUpperCase()}</Card.Title>
              {location.pathname !== "/" && <Clock />}
            </div>
          </div>
        ) : (
          <p className="fs-2">Città non disponibile</p>
        )}
        {props.language === "it" && <p>Meteo</p>}
        {props.language === "en" && <p>Weather</p>}
        {props.language === "fr" && <p>Météo</p>}
        {weather ? (
          <div className=" d-flex align-items-center">
            <h3 className="fs-4 fw-bold pt-0 mb-3">Tempo: </h3>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              width={45}
            ></img>
            <span className="fw-normal">{weather.weather[0].description.toUpperCase()}</span>
          </div>
        ) : (
          <span className="fw-normal">Tempo non disponibile</span>
        )}
        <Row className="d-flex justify-content-between">
          <Col>
            <h3 className="fs-5 fw-bold">
              Temperatura:
              {weather ? (
                <span className="fw-normal"> {(weather.main.temp - 273.15).toFixed(1)}°C</span>
              ) : (
                <span className="fw-normal">Temperatura non disponibile</span>
              )}
            </h3>

            <h3 className="fs-5 fw-bold">
              Umidità:
              {weather ? (
                <span className="fw-normal"> {weather.main.humidity}%</span>
              ) : (
                <span className="fw-normal">Umidità non disponibile</span>
              )}
            </h3>

            {location.pathname === "/" && weather && (
              <Button
                as={Link}
                to={`/nextdays/${weather.id}`}
                className="ms-auto d-block bg-transparent border border-white nextDaysBtn mt-4"
              >
                Prossimi giorni
              </Button>
            )}
          </Col>

          {location.pathname !== "/" && (
            <Col className="text-center">
              <h3 className="fs-5 fw-bold">
                Nuvolosità:
                {weather ? (
                  <span className="fw-normal"> {weather.clouds.all}%</span>
                ) : (
                  <span className="fw-normal">Nuvolosità non disponibile</span>
                )}
              </h3>

              <h3 className="fs-5 fw-bold">
                Vento:
                {weather ? (
                  <span className="fw-normal"> {weather.wind.speed} m/s</span>
                ) : (
                  <span className="fw-normal">Vento non disponibile</span>
                )}
              </h3>
            </Col>
          )}
          {location.pathname !== "/" && (
            <Col className="text-end">
              <h3 className="fs-5 fw-bold">
                Longitudine:
                {weather ? (
                  <span className="fw-normal"> {weather.coord.lon}</span>
                ) : (
                  <span className="fw-normal">Longitudine non disponibile</span>
                )}
              </h3>

              <h3 className="fs-5 fw-bold">
                Latitudine:
                {weather ? (
                  <span className="fw-normal"> {weather.coord.lat}</span>
                ) : (
                  <span className="fw-normal">Latitudine non disponibile</span>
                )}
              </h3>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Weather;
