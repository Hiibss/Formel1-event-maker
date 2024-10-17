import React, { useEffect, useState } from "react";
import DriverService from "../services/DriverService";
import RaceDriverSelector from "../components/Driver/RaceDriverSelector";
import { raceDrivers, getAllRaceResult } from "../services/RaceResultService";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

// const backendUrl = "http://localhost:5086";

const ResultsPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [raceWinner, setRaceWinner] = useState(null);
  const [raceResults, setRaceResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriversAndResults = async () => {
      try {
        const allDrivers = await DriverService.getAllDrivers();
        setDrivers(allDrivers);
        const allRaceResults = await getAllRaceResult();
        setRaceResults(allRaceResults);
      } catch (error) {
        console.error("Error fetching drivers and race results:", error);
        setError(
          "Error fetching drivers and race results. Please try again later."
        );
      }
    };
    fetchDriversAndResults();
  }, []);

  const handleRaceInitiated = async () => {
    try {
      const randomDriverId = drivers.map((d) => d.id);
      const randomIndex1 = Math.floor(Math.random() * randomDriverId.length);
      const randomIndex2 = Math.floor(Math.random() * randomDriverId.length);

      while (randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * randomDriverId.length);
      }
      const winner = await raceDrivers(
        randomDriverId[randomIndex1],
        randomDriverId[randomIndex2]
      );
      setRaceWinner(winner);

      const newRaceResult = {
        driverId1: driverId1,
        driverId2: driverId2,
        winnerId: winner.id,
      };
      try {
        const saveResult = await RaceResultService.addRaceResult(newRaceResult);
        if (saveResult) {
          setRaceResults((prevResults) => [...prevResults, saveResult]);
        }
      } catch (error) {
        console.error("Feil ved lagring av ny race resultater:", error);
      }
    } catch (error) {
      console.error("Feil ved start av race:", error);
    }
  };

  // const handleRaceInitiated = async (driverId1, driverId2) => {
  //   try {
  //     const winner = await raceDrivers(driverId1, driverId2);
  //   } catch (error) {
  //     console.error("Feil ved start av race:", error);
  //   }

  //   const newRaceResult = {
  //     driverId1: driverId1,
  //     driverId2: driverId2,
  //     winnerId: winner.id,
  //   };
  //   try {
  //     const saveResult = await RaceResultService.addRaceResult(newRaceResult);
  //     if (saveResult) {
  //       setRaceResults((prevResults) => [...prevResults, saveResult]);
  //     }
  //   } catch (error) {
  //     console.error("Feil ved lagring av ny race resultater:", error);
  //   }
  // };

  return (
    <>
      <div className="container mt-4">
        <section>
          <RaceDriverSelector
            drivers={drivers}
            onRaceInitiated={handleRaceInitiated}
          />
          {raceWinner && (
            <article className="w-100 p-3 bg-light border rounded-3">
              <h4>Race Vinner</h4>
              <p>
                {raceWinner.name} - Seire: {raceWinner.winCount}
              </p>
            </article>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </section>
        <section className="mt-4">
          <h2>Race Resultater</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Race ID</th>
                <th scope="col">Driver 1 ID</th>
                <th scope="col">Driver 2 ID</th>
                <th scope="col">Vinner ID</th>
              </tr>
            </thead>
            <tbody>
              {raceResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.id}</td>
                  <td>{result.driverId1}</td>
                  <td>{result.driverId2}</td>
                  <td>{result.winnerId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default ResultsPage;
