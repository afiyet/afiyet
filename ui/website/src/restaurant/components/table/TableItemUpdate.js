import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';
import { renameTable } from '../../../endpoints';

export default function TableItemUpdate(props) {

    const {
        item,
        fetchTables
    } = props;

    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedTable, setSelectedTable] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const [textValueUpdate, setTextValueUpdate] = useState("");
    const restaurant = useSelector(state => state.restaurantState);

    const handleClickOpenUpdate = () => {
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
        setTextValueUpdate("");
    };

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
        handleCloseUpdate();
    }

    return (
        <Box>
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
                            style={{marginTop: 10}}
                            id="outlined-password-input"
                            value={textValueUpdate}
                            onChange={(event) => { setTextValueUpdate(event.target.value) }}
                            variant='outlined'
                            label="Yeni Masa Adı"
                        />
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdate}>İptal</Button>
                    <Button onClick={handleEditTable} autoFocus>Değiştir</Button>
                </DialogActions>
            </Dialog>
            <IconButton onClick={() => {
                handleClickOpenUpdate(true);
                setSelectedTable(item.ID);
            }}>
                <EditIcon />
            </IconButton>
        </Box>
    )
}
