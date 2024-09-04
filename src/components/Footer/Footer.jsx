import React from "react";
import "./Footer.css";
const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <>
      <footer>
        <div className="footer-main">
          <img
          style={{position:"relative",left:"10px"}}
            className="tcc-logo2"
            src="/shoba1.png"
            alt="Shoba Family Shop"
          />
          <img
            style={{height:"50px"}}
            src="/shoba2.png"
            alt="Shoba Family Shop"
          />
        </div>
        <div className="footer-snd">
          <h2>Social Links</h2>
          <div>
            <a href="https://www.youtube.com/@SHOBAFAMILYSHOPMNP">
              <img src="/youtube.png" alt="YouTube" />
            </a>
            <a href="https://www.facebook.com/Shobafamilyshopmnp/">
              <img src="/fb.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/shobafamily.shopfamily?igsh=NGdnc2J1Y3JlM2Zk">
              <img src="/insta.png" alt="Instagram" />
            </a>
            <a href="https://wa.me/9150093139">
              <img src="/whatsapp.png" alt="WhatsApp" />
            </a>
            <a href="https://www.threads.net/@shobafamily.shopfamily?xmt=AQGzmjlDGChWipUtIntUe1UOxsT71BJvfi8zePsgdeYyflE">
              <img src="/threads.png" alt="Thread" />
            </a>
          </div>
          <div className="design-line"></div>
        </div>

        <div className="footer-trd">
          <div>
            <img src="/door.gif" alt="24 Hours Support" /> <br />
            <a href="#">Door Step Delivery</a>
          </div>
          <div>
            <img src="/earth.gif" alt="Location" /> <br />
            <a href="#">
              Manapparai & Singampunari
            </a>
          </div>
          <div>
            <img src="/mail.gif" alt="Email" /> <br />
            <a href="mailto:mnpshobacustomer@gmail.com">
            mnpshobacustomer@gmail.com
            </a>
          </div>
        </div>
        <div className="design">
          <div className="design-line2"></div>
        </div>
        <br />
        <div>
          <p style={{ textAlign: "center" }}>
            © {getCurrentYear()}   Shoba Family Shop All Rights Reserved. Designed and
            Developed by
            <a style={{textDecoration:"underline",color:"blueviolet"}} href="https://rategle-tech.web.app/"> Rategle Technologies</a>
          </p>
        </div>
        <br />
        <br />
      </footer>
    </>
  );
};

export default Footer;
