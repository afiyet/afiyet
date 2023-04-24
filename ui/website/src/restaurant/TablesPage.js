import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import { addTable, getTables } from '../endpoints';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useSnackbar } from 'notistack';
import TableItem from './components/table/TableItem';

export default function TablesPage() {

  const [tables, setTables] = useState([]);
  const restaurant = useSelector(state => state.restaurantState);
  const [openAdd, setOpenAdd] = useState(false);
  const [textValueAdd, setTextValueAdd] = useState("");
  const [search, setSearch] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setTextValueAdd("");
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
    <Box sx={{ flexGrow: 1, marginTop: '2vh' }}>
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
              style={{ marginTop: 10 }}
              id="outlined-password-input"
              value={textValueAdd}
              onChange={(event) => { setTextValueAdd(event.target.value) }}
              variant='outlined'
              label="Masa Adı"
            />
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>İptal</Button>
          <Button onClick={handleAddTable} autoFocus>Ekle</Button>
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
                variant='outlined'
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
                <TableItem
                  key={item.ID}
                  item={item}
                  fetchTables={fetchTables}
                />
              );
            }
          })
        }
      </Grid>
    </Box>

  )
};