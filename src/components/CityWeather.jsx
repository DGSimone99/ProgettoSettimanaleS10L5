import { useEffect, useState } from "react";

const CityWeather = (props) => {
  const [city, setCity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCity = async () => {
    setIsLoading(true);

    try {
      console.log("fetching data...");
      const resp = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${props.cityName}&appid=3827a398648912c6a365cb04b12db29a`
      );
      if (resp.ok) {
        const city = await resp.json();

        console.log("Dati recuperati...", city);

        setCity(city);
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
    fetchCity();
  }, []);

  return (
    <div>
      <h2>{city[0].name}</h2>
      <h3>{city[0].state}</h3>
    </div>
  );
};

export default CityWeather;
