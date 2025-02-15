import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router";

function TopBar(props) {
  return (
    <Container fluid className="px-0 mb-2 fs-4">
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
              <div className="d-flex ms-auto w-25 align-items-center">
                <img src={`../src/assets/${props.flag}.png`} className="ms-auto me-4" width={40} height={40}></img>
                <Form.Select
                  aria-label="Default select example"
                  className="text-white bg-lang border-white fs-4"
                  onChange={(e) => props.setLanguage(e.target.value)}
                >
                  <option value="it">Italiano</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </Form.Select>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default TopBar;
