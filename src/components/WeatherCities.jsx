import { useState } from "react";
import Weather from "./Weather";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

const WeatherCities = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const cities = ["Milano", "Genova", "Pavia", "Roma", "Napoli", "Taranto"];

  const search = {
    it: "Cerca una città",
    en: "Search for a city",
    fr: "Rechercher une ville",
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("POSITION///////////////////////////", position);
      const currentLocation = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setLocation(currentLocation);

      fetchCurrentLocation(currentLocation);
    });
  };

  const fetchCurrentLocation = async (location) => {
    setIsLoading(true);

    try {
      console.log("Fetching data");
      const resp = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.lat}&lon=${location.lon}&limit=1&appid=3827a398648912c6a365cb04b12db29a`
      );
      if (resp.ok) {
        const currentLocation = await resp.json();
        console.log("Dati recuperati...", currentLocation);
        setSearchQuery(currentLocation[0].name);
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

  const buttonText = {
    it: "Mostra meteo nella mia città",
    en: "Show weather in my city",
    fr: "Afficher la météo de ma ville",
  };

  return (
    <Container>
      <Form.Group>
        <div className="d-flex justify-content-center">
          <Button onClick={() => getLocation()} className="my-2 myCityBtn border-0 rounded-pill fs-5 px-3">
            {buttonText[props.language]}
          </Button>
        </div>
        <Form.Control
          type="search"
          placeholder={search[props.language]}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
        />
      </Form.Group>
      {searchQuery !== "" ? (
        <Weather cityName={searchQuery} language={props.language} className="bglarge" />
      ) : (
        <Alert variant="success">
          <Alert.Heading className="text-center">{search[props.language]}</Alert.Heading>
        </Alert>
      )}

      <Row className="gy-4 mt-2">
        {cities.map((city, index) => (
          <Col xs={12} md={6} lg={4} key={index}>
            <Weather cityName={city} language={props.language} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WeatherCities;
