import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import Weather from "./Weather";

const NextDays = (props) => {
  const [nextDays, setNextDays] = useState([]);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();

  const fetchDays = async () => {
    setIsLoading(true);

    try {
      console.log("fetching data...");
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${params.city}&lang=${props.language}&appid=3827a398648912c6a365cb04b12db29a`
      );
      if (resp.ok) {
        const data = await resp.json();
        setCity(data.city.name);

        const nextDays = data.list.filter((list) => {
          return list.dt_txt.includes("15:00");
        });
        setNextDays(nextDays);

        console.log("Dati recuperati...", nextDays);
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

  const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

  useEffect(() => {
    fetchDays();
  }, []);

  return (
    <Container className="mb-4" xs={2} md={5}>
      <h1>{city}</h1>
      <h3>Meteo attuale</h3>
      <Weather cityName={city} language={props.language} className="bglarge" />

      <h3 className="mt-4">Meteo dei prossimi giorni</h3>
      <Row className="d-flex justify-content-between">
        {nextDays.map((weather) => {
          return (
            <Col key={weather.dt} className="mb-4 cardDays" md={12} lg={2}>
              <Card className="text-center">
                <Card.Header className="fw-bold fs-3 text-shadow">
                  {days[new Date(weather.dt_txt).getDay()].toUpperCase()}
                </Card.Header>
                <Card.Body>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    width={100}
                  ></img>
                  <p className="fw-bold mb-0 fs-2">{(weather.main.temp - 273.15).toFixed(1)}°</p>

                  <p className="fw-bold my-0 fs-3"> {weather.main.humidity} %</p>
                  <p className="fw-bold">{weather.weather[0].description.toUpperCase()}</p>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default NextDays;
