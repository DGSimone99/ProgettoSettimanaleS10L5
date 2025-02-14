import { useState } from "react";
import Weather from "./Weather";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";

const WeatherCities = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const cities = ["Milano", "Genova", "Venezia", "Roma", "Napoli", "Bari"];
  /*  */
  return (
    <Container>
      <Form.Group>
        <Form.Control
          type="search"
          placeholder="Cerca una località"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
        />
      </Form.Group>
      {searchQuery !== "" ? (
        <Weather cityName={searchQuery} />
      ) : (
        <Alert variant="success">
          <Alert.Heading className="text-center">Cerca una città</Alert.Heading>
        </Alert>
      )}

      <Row className="gy-4">
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
