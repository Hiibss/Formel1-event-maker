import React from "react";

const backendUrl = "http://localhost:5086";

const DriverItem = ({ driver, onUpdate, onDelete, onEditClick }) => {
  if (!driver) return null;

  const {
    id,
    name,
    age,
    isProfessional,
    nationality,
    manufacturer,
    image,
    flagImage,
    carImage,
  } = driver;

  console.log(`Driver image path: /images/drivers/${image}`);
  console.log(`Flag image path: /images/flags/${flagImage}`);
  console.log(`Car image path: /images/cars/${carImage}`);

  return (
    <>
      <div className="container">
        <section className="row driver-item mb-4 d-flex align-items-stretch ">
          <article className=" col-12 col-md-6 w-100 p-3 bg-light custom-border2 ">
            <div className="d-flex flex-column h-100">
              <img
                src={`${backendUrl}/images/drivers/${image}`}
                className="img-fluid mb-2 mt-3 mx-auto"
                alt="Driver"
                style={{
                  objectFit: "cover",
                  maxWidth: "70%",
                  height: "auto",
                }}
              />

              <h3 className="mb-2 text-center">{name}</h3>
              <div className="flex-grow-1">
                <p>
                  <strong>Nationality: </strong>
                  {nationality}
                  <img
                    className=" ms-2 mb-1"
                    src={`${backendUrl}/images/flags/${flagImage}`}
                    alt="Flag"
                    style={{ maxWidth: "40px" }}
                  />
                </p>
                <p>
                  <strong>Age: </strong> {age}
                </p>
                <p>
                  <strong>Is Professional: </strong>
                  {isProfessional ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Team: </strong>
                  {manufacturer}
                </p>
              </div>
              <div className="mt-auto bg-white">
                <small className="text-muted d-block mb-2">
                  Driver ID: {id}
                </small>
                <div className="d-flex justify-content-evenly button-group ">
                  <img
                    src={`${backendUrl}/images/cars/${carImage}`}
                    alt="Car"
                    style={{ objectFit: "cover", maxWidth: "350px" }}
                  />
                </div>
                <div className="d-flex justify-content-evenly">
                  <button
                    className=" button button-group white-text me-2 mb-4"
                    onClick={() => onEditClick(driver.id)}
                  >
                    Rediger
                  </button>
                  <button
                    className=" btn-slett me-2 mb-4"
                    onClick={() => onDelete(driver.id)}
                  >
                    Slett
                  </button>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default DriverItem;
