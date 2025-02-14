import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const Weather = (props) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const fetchWeather = async (lat, lon) => {
    setIsLoading(true);

    try {
      console.log("fetching data...");
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${props.language}&appid=3827a398648912c6a365cb04b12db29a`
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
      fetchWeather(city.lat, city.lon);
    }
  }, [city]);

  return (
    <Card>
      {isLoading && <p>Caricamento...</p>}
      {hasError && <p>Errore: {errorMessage}</p>}
      <Card.Body>
        {city ? (
          <div>
            <Card.Text className="m-0">{city.state}</Card.Text>
            <Card.Title className="fs-1 fw-bold pb-2">{city.name.toUpperCase()}</Card.Title>
          </div>
        ) : (
          <p className="fs-2 pb-2">Città non disponibile</p>
        )}
        <h3 className="fs-4 fw-bold">
          Temperatura:
          {weather ? (
            <span className="fw-normal"> {(weather.main.temp - 273.15).toFixed(2)}°C</span>
          ) : (
            <span className="fw-normal">Temperatura non disponibile</span>
          )}
        </h3>

        <h3 className="fs-4 fw-bold">
          Umidità:
          {weather ? (
            <span className="fw-normal"> {weather.main.humidity} %</span>
          ) : (
            <span className="fw-normal">Umidità non disponibile</span>
          )}
        </h3>

        {weather ? (
          <h3 className="fs-4 fw-bold">
            Tempo:{" "}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              width={50}
            ></img>
            <span className="fw-normal">{weather.weather[0].description}</span>
          </h3>
        ) : (
          <span className="fw-normal">Tempo non disponibile</span>
        )}

        <Button variant="primary">Prossimi giorni</Button>
      </Card.Body>
    </Card>
  );
};

export default Weather;
