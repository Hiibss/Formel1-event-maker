import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  const [newDriver, setNewDriver] = useState({
    name: "",
    age: "",
    nationality: "",
    manufacturer: "",
    isProfessional: false,
    driverImage: null,
    flagImage: null,
    carImage: null,
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleDriverChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio" && name === "isProfessional") {
      setNewDriver({ ...newDriver, [name]: value === "true" });
    } else {
      setNewDriver({ ...newDriver, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newDriver.name);
    formData.append("driverImage", newDriver.driverImage);
    formData.append("age", newDriver.age);
    formData.append("nationality", newDriver.nationality);
    formData.append("flagImage", newDriver.flagImage);
    formData.append("manufacturer", newDriver.manufacturer);
    formData.append("carImage", newDriver.carImage);
    formData.append("isProfessional", newDriver.isProfessional);

    try {
      const response = await axios.post(
        "http://localhost:5086/api/drivers",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response);
      setSubmitStatus({
        success: true,
        message: "Driver registrert med suksess!",
        color: "white",
      });
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus({
        success: false,
        message: "Feil ved registering av driver",
        color: "white",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div
        className="custom-border3 p-5 rounded"
        style={{
          backgroundColor: "#292F36",
          width: "60%",
          maxWidth: "800px",
        }}
      >
        <section className="container mt-5">
          <h3 className="text mb-4 white-text">Register ny Driver</h3>
          <article className="row">
            <div className="col-md-8 offset-ms-2">
              {submitStatus && (
                <div
                  className={`alert alert-${
                    submitStatus.success ? "alter-success" : "alert-light"
                  }`}
                  role="alert"
                >
                  {submitStatus.message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="form-group">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    aria-label="Drivers Navn"
                    placeholder="Drivers Navn"
                    onChange={handleDriverChange}
                    value={newDriver.name}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="integer"
                    className="form-control"
                    name="age"
                    aria-label="Drivers Alder"
                    placeholder="Alder"
                    onChange={handleDriverChange}
                    value={newDriver.age}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="nationality"
                    aria-label="Drivers Nasjonalitet"
                    placeholder="Nasjonalitet"
                    onChange={handleDriverChange}
                    value={newDriver.nationality}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="manufacturer"
                    aria-label="Drivers Bilmerke"
                    placeholder="Bil Produsent"
                    onChange={handleDriverChange}
                    value={newDriver.manufacturer}
                  />
                </div>
                <div className="mb-3">
                  <Form.Group>
                    <Form.Label className="white-text">
                      {" "}
                      Er driver Profesjonell?
                    </Form.Label>
                    <div className="">
                      <Form.Check
                        type="radio"
                        label="Ja"
                        name="isProfessional"
                        value="true"
                        id="isProfessionalYes"
                        checked={newDriver.isProfessional === true}
                        onChange={handleDriverChange}
                        style={{ color: "white" }}
                      />
                      <Form.Check
                        type="radio"
                        label="Nei"
                        name="isProfessional"
                        value="false"
                        id="isProfessionalNo"
                        checked={newDriver.isProfessional === false}
                        onChange={handleDriverChange}
                        style={{ color: "white" }}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="driverImage"
                    className="form.label white-text"
                  >
                    Last opp Driver Bildet
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="driverImage"
                    name="driverImage"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="flagImage" className="form.label white-text">
                    Last opp Flagg Bildet
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="flagImage"
                    name="flagImage"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="carImage" className="form.label white-text">
                    Last opp Bil Bildet
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="carImage"
                    name="carImage"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="button">
                    Registrer Driver
                  </button>
                </div>
              </form>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
