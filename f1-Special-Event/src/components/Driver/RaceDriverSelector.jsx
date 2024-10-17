import React from "react";
import DriverService from "../../services/DriverService";

const RaceDriverSelector = ({ drivers, onRaceInitiated }) => {
  const [selectedDriver1, setSelectedDriver1] = React.useState("");
  const [selectedDriver2, setSelectedDriver2] = React.useState("");
  const [raceResult, setRaceResult] = React.useState(null);

  const handleRaceClick = async () => {
    if (
      selectedDriver1 &&
      selectedDriver2 &&
      selectedDriver1 !== selectedDriver2 &&
      drivers.find((driver) => driver.id === selectedDriver1) &&
      drivers.find((driver) => driver.id === selectedDriver2)
    ) {
      try {
        const winner = await DriverService.raceDrivers(
          selectedDriver1,
          selectedDriver2
        );
        setRaceResult(winner);
        // localStorage.setItem("raceWinner", JSON.stringify(winner));
        onRaceInitiated(winner);
      } catch (error) {
        console.error("Det oppsto en error i racing av drivers:", error);
      }
    } else {
      alert("Vennligst velg to forskjellige drivers som eksisterer!");
    }
  };

  return (
    <div>
      {/*Section dropdown */}
      <select
        value={selectedDriver1}
        onChange={(e) => setSelectedDriver1(e.target.value)}
      >
        <option value="">Velg driver nr.1</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.id}>
            {driver.name}
          </option>
        ))}
      </select>

      <select
        value={selectedDriver2}
        onChange={(e) => setSelectedDriver2(e.target.value)}
      >
        <option value="">Velg driver nr.2</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.id}>
            {driver.name}
          </option>
        ))}
      </select>

      <button onClick={handleRaceClick}>Race!</button>
      {/*Race result diplay */}
      {raceResult && <div>{`Winner is: {raceResult.name}`}</div>}
    </div>
  );
};

export default RaceDriverSelector;
