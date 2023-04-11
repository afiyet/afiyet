import React, { useEffect, useRef, useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { getTables } from '../../endpoints';
import { useSelector } from 'react-redux';
import { QRCodeCanvas } from "qrcode.react";
import Paper from '@mui/material/Paper';


export default function TablesPage() {

  const [tables, setTables] = useState([]);
  const restaurant = useSelector(state => state.restaurantState);
  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = e.target.id + ".png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  useEffect(() => {
    getTables(restaurant.restaurantId)
      .then((res) => {
        console.log(res);
        setTables(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  return (
    <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={4}>
          <Grid item sm={6} xs={3} xl={2} md={3}>
            <Card>
              <CardContent>
                <IconButton aria-label="addTable" size="large">
                  <AddIcon  />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
          {
            tables.map((item, index) => {
              return (
                <Grid item sm={6} xs={3} xl={2} md={3} key={index}>
                  <Card>
                    <CardContent>
                      <Box ref={qrRef}>
                        <QRCodeCanvas
                          id="qrCode"
                          value={restaurant.restaurantId + ":" + item.name}
                          size={200}
                          bgColor={"#ffffff"}
                          level={"H"}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Box>
                      <Typography gutterBottom noWrap={true} variant="h5">
                        {item.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={downloadQRCode} id={item.name}>QR İndir</Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          }
        </Grid>
    </Box>

  )
};

const styles = {
  addButton: {
    height: "100%",
    width: "100%"
  }
}