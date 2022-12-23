import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

import "./GenerateQr.css"
import Navbar from "../components/Navbar";

const GenerateQr = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };

  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor={"#ffffff"}
      level={"H"}
    />
  );

  return (
    <div className="qr-generation">
      <Navbar />
      <div className="generate-qrcode">
          <div className="qr-image" ref={qrRef}>
              {qrcode}
          </div>
          <form className="qr-form" onSubmit={downloadQRCode}>
              <input
                  type="text"
                  value={url}
                  onChange={qrCodeEncoder}
                  placeholder="URL Giriniz"
              />
              <button className="download-button" type="submit" disabled={!url}>
                  İndir
              </button>
          </form>
      </div>
    </div>
  );
};

export default GenerateQr;