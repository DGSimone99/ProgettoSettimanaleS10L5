import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";

const NextDays = () => {
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
        `https://api.openweathermap.org/data/2.5/forecast?id=${params.city}&lang=it&appid=3827a398648912c6a365cb04b12db29a`
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
      <h4>Meteo dei prossimi giorni</h4>
      <Row>
        {nextDays.map((weather) => {
          return (
            <Col key={weather.dt} className="mb-4">
              <Card border="primary">
                <Card.Header>{days[new Date(weather.dt_txt).getDay()]}</Card.Header>
                <Card.Body>
                  <p className="fw-normal"> {(weather.main.temp - 273.15).toFixed(2)}°C</p>
                  <p className="fw-bold">
                    Tempo:{" "}
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      width={50}
                    ></img>
                    <span className="fw-normal">{weather.weather[0].description}</span>
                  </p>
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
