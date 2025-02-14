import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";

const NextDays = () => {
  const [nextDays, setNextDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDays = async () => {
    setIsLoading(true);

    try {
      console.log("fetching data...");
      const resp = await fetch(
        `api.openweathermap.org/data/2.5/forecast?id=${params.city}&appid=3827a398648912c6a365cb04b12db29a`
      );
      if (resp.ok) {
        const data = await resp.json();

        console.log("Dati recuperati...", nextDays);
        const nextDays = data.list.filter(list => {
            list.dt_txt.includes('15:00')
        })
        setList(filter)

        setNextDays(nextDays);
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

  useEffect(() => {
    fetchDays();
  }, []);

  return (

  )
};

export default NextDays;
