import React, { useEffect, useRef, useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { addTable, deleteTable, getTables, renameTable } from '../endpoints';
import { useSelector } from 'react-redux';
import { QRCodeCanvas } from "qrcode.react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';

export default function TablesPage() {

  const [tables, setTables] = useState([]);
  const restaurant = useSelector(state => state.restaurantState);
  const qrRef = useRef();
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [textValueAdd, setTextValueAdd] = useState("");
  const [textValueUpdate, setTextValueUpdate] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [search, setSearch] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setTextValueAdd("");
  };

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setTextValueUpdate("");
  };

  const handleAddTable = () => {
    handleCloseAdd();
    addTable({
      restaurantId: String(restaurant.restaurantId),
      name: textValueAdd,
    })
      .then((res) => {
        fetchTables();
        enqueueSnackbar("Masa başarıyla eklendi!", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Masa eklenemedi!", { variant: "error" });
      })
  }

  const handleDeleteTable = (tableId) => {
    deleteTable(tableId)
      .then((res) => {
        fetchTables();
        enqueueSnackbar("Masa başarıyla silindi!", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Masa silinemedi!", { variant: "error" });
      })
  }

  const handleEditTable = () => {
    renameTable(selectedTable, {
      name: textValueUpdate,
      restaurantId: String(restaurant.restaurantId)
    })
      .then((res) => {
        fetchTables();
        setSelectedTable("");
        enqueueSnackbar("Masa adı başarıyla değiştirildi!", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Masa adı değiştirilemedi", { variant: "error" });
      })
  }

  const downloadQRCode = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = e.target.id + ".png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    console.log(e);
  };


  const fetchTables = () => {
    getTables(restaurant.restaurantId)
      .then((res) => {
        setTables(res.data);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Masalar yüklenirken hata oluştu!", { variant: "error" });
      })
  }

  useEffect(() => {
    fetchTables();
  }, []);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Masa Ekle
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <TextField
              id="outlined-password-input"
              value={textValueAdd}
              onChange={(event) => { setTextValueAdd(event.target.value) }}
              variant='standard'
              label="Masa Adı"
            />
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>İptal</Button>
          <Button onClick={handleAddTable} autoFocus>Ekle</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Masa Adı Değiştir
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <TextField
              id="outlined-password-input"
              value={textValueUpdate}
              onChange={(event) => { setTextValueUpdate(event.target.value) }}
              variant='standard'
              label="Yeni Masa Adı"
            />
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>İptal</Button>
          <Button onClick={handleEditTable} autoFocus>Değiştir</Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={4}>
        <Grid item sm={6} xs={3} xl={2} md={3}>
          <Card>
            <CardContent style={{
              display: "flex",
              flexDirection: "column",
              gap: "1vw"
            }}>
              <TextField
                id="outlined-password-input"
                value={search}
                onChange={(event) => { setSearch(event.target.value) }}
                variant='standard'
                label="Masa Ara"
              />
              <Button variant="contained" size="large" onClick={handleClickOpenAdd} startIcon={<AddIcon />}>
                Masa Ekle
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {
          tables.map((item, index) => {
            if (item.name.includes(search)) {
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
                      <IconButton onClick={downloadQRCode} id={item.name}>
                        <QrCode2Icon id={item.name} />
                      </IconButton>
                      <IconButton onClick={() => {
                        handleClickOpenUpdate(true);
                        setSelectedTable(item.ID);
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => { handleDeleteTable(item.ID) }}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            }
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