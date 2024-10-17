import { useEffect, useState } from "react";

const DriverModal = ({ isOpen, driverData, onClose, onSave }) => {
  const [editedDriver, setEditedDriver] = useState(driverData);

  useEffect(() => {
    setEditedDriver(driverData);
  }, [driverData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDriver({ ...driverData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedDriver.id, editedDriver);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={editedDriver.name || ""}
              onChange={handleInputChange}
            />
            <label htmlFor="age">Age</label>
            <input
              type="text"
              name="age"
              value={editedDriver.age || ""}
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Oppdater Driver</button>
          </form>
          <button onClick={onClose}>Lukk</button>
        </div>
      </div>
    </>
  );
};
export default DriverModal;
