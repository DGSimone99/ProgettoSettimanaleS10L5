import { Button, Container } from "react-bootstrap";
import { Link } from "react-router";

const ComingSoon = (props) => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center notFound">
      <div>
        {props.language === "it" && <h1 className="text-white">Disponibile a breve...</h1>}
        {props.language === "en" && <h1 className="text-white">Coming Soon...</h1>}
        {props.language === "fr" && <h1 className="text-white">Bientôt disponible...</h1>}
      </div>
      <div>
        {props.language === "it" && (
          <Button as={Link} to="/" className="btn mt-5 px-4 py-2 rounded-pill">
            Torna alla Home
          </Button>
        )}
        {props.language === "en" && (
          <Button as={Link} to="/" className="btn mt-5 px-4 py-2 rounded-pill">
            Return to Home
          </Button>
        )}
        {props.language === "fr" && (
          <Button as={Link} to="/" className="btn mt-5 px-4 py-2 rounded-pill">
            Retour à la Home
          </Button>
        )}
      </div>
    </Container>
  );
};

export default ComingSoon;
