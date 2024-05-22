import React from "react";
import "./Home.css";
import "./AboutUs.css"; // Import the CSS file for AboutUs
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import AboutUs from "./AboutUs"; // Import the AboutUs component

const Home: React.FC = () => {
  return (
    <>
      <div className="home-container">
        <section className="hero-section">
          <video src="../public/Fintracker.mp4" className="hero-video" autoPlay loop muted>
            Your browser does not support the video tag.
          </video>
        </section>

        <AboutUs />

        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h3>Newsletter</h3>
                <form>
                  <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Your email..." aria-label="Your email..." aria-describedby="button-addon2" />
                    <button className="btn btn-outline-primary" type="button" id="button-addon2">Subscribe</button>
                  </div>
                </form>
              </div>
              <div className="col-md-4">
                <h3>Contact Us</h3>
                <p>123 Main Street, City, Country</p>
                <p>Email: info@example.com</p>
                <p>Phone: +123 456 7890</p>
              </div>
              <div className="col-md-4">
                <h3>Follow Us</h3>
                <ul className="list-inline">
                  <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faEnvelope} /></a></li>
                  {/* Add more social media icons as needed */}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
