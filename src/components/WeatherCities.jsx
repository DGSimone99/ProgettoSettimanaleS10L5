import { useState } from "react";
import Weather from "./Weather";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";

const WeatherCities = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const cities = ["Milano", "Genova", "Pavia", "Roma", "Napoli", "Taranto"];

  const search = {
    it: "Cerca una città",
    en: "Search for a city",
    fr: "Rechercher une ville",
  };

  return (
    <Container>
      <Form.Group>
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
