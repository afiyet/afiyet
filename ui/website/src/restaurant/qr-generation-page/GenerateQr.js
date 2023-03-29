import { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import httpClient, { get } from 'react-http-client';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import "./GenerateQr.css"


const GenerateQr = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef();
  const [tables, setTables] = useState([]);
  const [tableSelection, setTableSelection] = useState('');

  useEffect(() => {setDropdown()}, []);

  const setDropdown = (async (e) => {
    const getResponse = await httpClient.get(
      "http://localhost:8080/restaurants/7/tables" 
    );

    if(getResponse) {
      console.log("Tables fetched successfully.")
    }
    else {
      console.log("Table fetching failed!")
    }
    
    let fetchedTables = []

    for(let i = 0; i < getResponse.length; i++) {
      fetchedTables.push({restaurantId:getResponse[i].restaurantId, tableId:getResponse[i].ID, tableName:getResponse[i].name})
    }

    setTables(fetchedTables);
  });

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
      <div className="generate-qrcode">
        <div className="qr-image" ref={qrRef}>
          {qrcode}
        </div>
        <div className="form-container">
          <FormControl fullWidth sx={{minWidth:200}}>
            <InputLabel id="demo-simple-select-label">Masa Seçin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tableSelection}
              label="Masa Seçin"
              onChange={(event) => {
                setTableSelection(event.target.value);
                setUrl(event.target.value)}}
              autoWidth={true}
            >
              {tables.map((item) => {
                return <MenuItem value={"{'restaurantId':" + item.restaurantId + ", 'tableId':" + item.tableId + "}"}>{item.tableName}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        <form className="qr-form" onSubmit={downloadQRCode}>
          <button className="download-button" onSubmit={downloadQRCode} type="submit">
            İndir
          </button>
          <Button style={{textTransform: 'none'}} onSubmit={downloadQRCode} variant="contained" color="success">İndir</Button>
        </form>
      </div>
    </div>
  );
};

export default GenerateQr;