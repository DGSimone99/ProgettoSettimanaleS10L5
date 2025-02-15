import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Footer(props) {
  return (
    <Container fluid className="px-0 mt-4 fs-4 mb-auto">
      <Navbar expand="lg">
        <Container className="text-center flex-column py-3">
          {props.language === "it" && (
            <p className="mb-0 text-center text-white">&copy; 2025 Tutti i diritti riservati</p>
          )}
          {props.language === "en" && <p className="mb-0 text-center text-white">All rights reserved</p>}
          {props.language === "fr" && <p className="mb-0 text-center text-white">&copy; 2025 Tous droits réservés</p>}

          <p className="mb-0 text-center my-2">
            {props.language === "it" && (
              <a href="/privacy" className="text-white text-decoration-none">
                Privacy | Termini
              </a>
            )}
            {props.language === "en" && (
              <a href="/privacy" className="text-white text-decoration-none">
                Privacy | Terms
              </a>
            )}
            {props.language === "fr" && (
              <a href="/privacy" className="text-white text-decoration-none">
                Confidentialité | Termes
              </a>
            )}
          </p>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Footer;
