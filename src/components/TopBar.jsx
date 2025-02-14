import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router";

function TopBar(props) {
  return (
    <Container fluid className="px-0 mb-4 fs-4">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <img src="https://m.media-amazon.com/images/I/41cFKQCLncL.png" alt="logo" width={50}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex w-100">
              <Link to="/" className="nav-link  text-white">
                Meteo
              </Link>
              <Form.Select
                aria-label="Default select example"
                className="text-black bg-transparent border-black ms-auto w-25"
                onChange={(e) => props.setLanguage(e.target.value)}
              >
                <option value="it">Italiano</option>
                <option value="en">Inglese</option>
                <option value="fr">Francese</option>
              </Form.Select>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default TopBar;
