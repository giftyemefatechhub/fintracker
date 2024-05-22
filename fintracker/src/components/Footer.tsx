// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-5 fixed-bottom">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Fintracker</h5>
            <p>Fintracker helps you track your finances effortlessly.</p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Privacy Policy</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3">
        &copy; {new Date().getFullYear()} Fintracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
