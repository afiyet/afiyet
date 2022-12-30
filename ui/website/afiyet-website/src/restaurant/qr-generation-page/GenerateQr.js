import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import httpClient from 'react-http-client';

import "./GenerateQr.css"
import Navbar from "../components/Navbar";

const GenerateQr = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef();

  const setDropdown = (async (e) => {
    const getResponse = await httpClient.Get(
      // "/restaurants/:id/tables" 
    );

    //getResponse içindeki nameleri al dropdown a doldur

  })(); //self-invoking function -> çünkü sayfa açıldığında dropdown dolmalı
  const dropdownChange = () => {
    //seçilen dropdown objesinden qr türet.

  }
  


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
          <div className="dropdown" onChange={dropdownChange}>
            <select>
              <option value="{restaurantId:5,masaId:4}">Bahçe-1</option>
              <option value="{restaurantId:3,masaId:2}">Ana-3</option>
              <option value="{restaurantId:1,masaId:7}">Üst kat-34</option>
            </select>
          </div>
          <button className="download-button" type="submit" disabled={!url}>
            İndir
          </button>
        </form>

      </div>
    </div>
  );
};

export default GenerateQr;