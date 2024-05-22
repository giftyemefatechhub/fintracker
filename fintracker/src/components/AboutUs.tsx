import React from "react";
import "./AboutUs.css"; // Import the CSS file for AboutUs

const AboutUs: React.FC = () => {
  return (
    <>
      <section>
        {/* You can add any content here */}
      </section>
      <section className="about-section">
        <div className="container">
          <h1>About Us</h1>
          <p className="lead">Some text about who we are and what we do.</p>
          <div className="row row-cols-1 row-cols-md-5 g-4">
            <div className="col">
              <div className="card h-100">
                <img src="/Isam.jpeg" alt="Isam" className="card-img-top" />
                <div className="card-body">
                  <h2 className="card-title">Isam</h2>
                  <button className="btn btn-primary">Contact</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="/Sone.png" alt="Sone" className="card-img-top" />
                <div className="card-body">
                  <h2 className="card-title">Sone</h2>
                  <button className="btn btn-primary">Contact</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="/Gifty.jpeg" alt="Gifty" className="card-img-top" />
                <div className="card-body">
                  <h2 className="card-title">Gifty</h2>
                  <button className="btn btn-primary">Contact</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="/Ammar.webp" alt="Ammar" className="card-img-top" />
                <div className="card-body">
                  <h2 className="card-title">Ammar</h2>
                  <button className="btn btn-primary">Contact</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="/Arinze.png" alt="Arinze" className="card-img-top" />
                <div className="card-body">
                  <h2 className="card-title">Arinze</h2>
                  <button className="btn btn-primary">Contact</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
