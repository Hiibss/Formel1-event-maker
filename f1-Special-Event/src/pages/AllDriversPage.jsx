import React, { useEffect, useState } from "react";
import DriverList from "../components/Driver/DriverList";
import DriverService from "../services/DriverService";
import DriverModal from "../components/DriverModal/DriverModal";

const AllDriversPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const allDrivers = await DriverService.getAllDrivers();
        setDrivers(allDrivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);
  // håndtere oppdatering av driver
  const handleUpdate = async (driverId, updatedDriverData) => {
    try {
      await DriverService.updateDriver(driverId, updatedDriverData);
      const updateDrivers = drivers.map((driver) =>
        driver.id === driverId ? { ...driver, ...updatedDriverData } : driver
      );
      setDrivers(updateDrivers);
    } catch (error) {
      console.error("Feil ved oppdatering av driver:", error);
    }
  };

  // håndtere sletting av driver
  const handleDelete = async (driverId) => {
    try {
      await DriverService.deleteDriver(driverId);
      const newDrivers = drivers.filter((driver) => driver.id !== driverId);
      setDrivers(newDrivers);
      window.alert("Driver slettet");
    } catch (error) {
      console.error("Feil ved sletting av driver:", error);
    }
  };

  // Åpne modal med valgt driver
  const handleEditClick = (driverId) => {
    const driverToEdit = drivers.find((driver) => driver.id === driverId);
    setSelectedDriver(driverToEdit);
    setShowModal(true);
  };

  // Lukke modal
  const handleCloseModal = () => {
    setSelectedDriver(null);
    setShowModal(false);
  };

  return (
    <>
      <div>
        <section className="container">
          <div className="mb-2 mt-5 custom-border d-flex justify-content-center ">
            <h2 className="text-center my-4  ">F1 Special Event 2023</h2>
          </div>
        </section>
        <section>
          <DriverList
            drivers={drivers}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onEditClick={handleEditClick}
          />
        </section>
      </div>
      {selectedDriver && (
        <DriverModal
          isOpen={showModal}
          driverData={selectedDriver}
          onClose={handleCloseModal}
          onSave={handleUpdate}
        />
      )}
    </>
  );
};

export default AllDriversPage;
