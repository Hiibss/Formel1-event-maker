import { useState } from "react";
import DriverService from "../../services/DriverService";
import DriverItem from "./DriverItem";

const DriverList = ({ onUpdate, onDelete, onEditClick }) => {
  const [drivers, setDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   fetchAllDrivers();
  // }, []);

  const fetchAllDrivers = async () => {
    try {
      const driversFromService = await DriverService.getAllDrivers();
      setDrivers(driversFromService);
    } catch (error) {
      console.error("Error ved henting av alle drivers:", error);
    }
  };

  const handleSearch = async () => {
    console.log(`Search query: ${searchQuery}`);
    try {
      const searchedDrivers = await DriverService.getDrivers(searchQuery);
      console.log("Søkt drivers:", searchedDrivers);
      setDrivers(searchedDrivers);
    } catch (error) {
      console.error("Error ved søking av drivers:", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-evenly justify-content-center">
        <input
          type="text"
          className="form-control mb 3 custom-border3 me-2"
          placeholder="Søk etter driver"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: "500px" }}
        />

        <button onClick={handleSearch} className="button  me-2 mb-3 white-text">
          Søk
        </button>
        <br />
        <button
          onClick={fetchAllDrivers}
          className="button white-text me-2 mb-3"
        >
          Vis Alle Drivere
        </button>
      </div>

      <h4 className="">Antall Drivers: {drivers.length}</h4>
      <br />
      <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
        {drivers.map((driver) => (
          <div key={driver.id}>
            <DriverItem
              driver={driver}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onEditClick={onEditClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverList;
