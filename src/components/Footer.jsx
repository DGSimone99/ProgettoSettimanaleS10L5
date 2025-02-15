import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Footer() {
  return (
    <Container fluid className="px-0 mt-4 fs-4 mb-auto">
      <Navbar expand="lg">
        <Container className="text-center flex-column py-3">
          <p className="mb-0 text-center text-white">&copy; 2025 Tutti i diritti riservati</p>
          <p className="mb-0 text-center my-2">
            <a href="/privacy" className="text-white text-decoration-none">
              Privacy | Termini
            </a>
          </p>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Footer;
