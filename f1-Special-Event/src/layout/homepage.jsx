import React from "react";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

const HomePage = () => {
  return (
    <>
      <div className="homepage-bg">
        <div className="container">
          <Carousel>
            <Carousel.Item>
              <div className="carousel-img-container">
                <img
                  className="d-block w-100"
                  src="/images/driver1.png"
                  alt="First driver image"
                />
              </div>
              <Carousel.Caption>
                <h3>Verstrappen</h3>
                <p>Scores 19th win of the year in Abu Dhabi</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-img-container">
                <img
                  className="d-block w-100"
                  src="/images/driver2.png"
                  alt="Second driver image"
                />
              </div>

              <Carousel.Caption>
                <h3>Hamilton</h3>
                <p>
                  Hamilton less than happy with opening day's running in Abu
                  Dhabi.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-img-container">
                <img
                  className="d-block w-100"
                  src="/images/driver3.png"
                  alt="Third driver image"
                />
              </div>
              <Carousel.Caption>
                <h3>Alonso</h3>
                <p>Alonso expecting 'tight' qualifying battle in Las Vegas</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>{" "}
      </div>
      <section className="row my-5">
        <article className="col-md-8 text-center offset-md-2">
          <h2 className="text mb-4">Velkommen til F1 Special Event 2023</h2>
          <h5 className="lead my-4">
            Bli med på en spennende reise i Formel 1 verdenen. Her kan du
            registrere nye drivers, se både unge og gamle drivers og mye mer.
          </h5>
          <hr />
        </article>
      </section>
    </>
  );
};

export default HomePage;
