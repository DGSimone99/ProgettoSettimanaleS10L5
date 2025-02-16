import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router";

function TopBar(props) {
  return (
    <Container fluid className="px-0 mb-3 fs-4">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <img src="https://m.media-amazon.com/images/I/41cFKQCLncL.png" alt="logo" width={50}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-white" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex w-100 align-items-center">
              <Link to="/" className="nav-link  text-white navbarLink">
                {props.language === "it" && <h3 className="fs-3 fw-bold pt-0">Meteo</h3>}
                {props.language === "en" && <h3 className="fs-3 fw-bold pt-0">Weather</h3>}
                {props.language === "fr" && <h3 className="fs-3 fw-bold pt-0">Météo</h3>}
              </Link>

              <Link to="/comingSoon" className="nav-link navbarLink">
                {props.language === "it" && <h3 className="fs-4 pt-0">Preferiti</h3>}
                {props.language === "en" && <h3 className="fs-4 pt-0">Favorites</h3>}
                {props.language === "fr" && <h3 className="fs-4 pt-0">Favoris</h3>}
              </Link>

              <Link to="/comingSoon" className="nav-link navbarLink">
                {props.language === "it" && <h3 className="fs-4 pt-0">Notizie</h3>}
                {props.language === "en" && <h3 className="fs-4 pt-0">News</h3>}
                {props.language === "fr" && <h3 className="fs-4 pt-0">Nouvelles</h3>}
              </Link>
              <div className="d-flex ms-auto align-items-center">
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
