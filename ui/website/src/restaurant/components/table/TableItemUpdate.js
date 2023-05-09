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
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

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
    const {t, i18n} = useTranslation();

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
                enqueueSnackbar(t("SNACKBAR.TABLE_UPDATE_SUCCESS"), { variant: "success" });
            })
            .catch((err) => {
                console.log(err);
                enqueueSnackbar(t("SNACKBAR.TABLE_UPDATE_ERROR"), { variant: "error" });
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
                {t("TABLES_PAGE.TABLE_CART.EDIT_TABLE_DIALOG.TITLE")}
                </DialogTitle>
                <DialogContent>
                    <FormControl>
                        <TextField
                            style={{ marginTop: 10 }}
                            id="outlined-password-input"
                            value={textValueUpdate}
                            onChange={(event) => { setTextValueUpdate(event.target.value) }}
                            variant='outlined'
                            label={t("TABLES_PAGE.TABLE_CART.EDIT_TABLE_DIALOG.NEW_TABLE_NAME")}
                        />
                    </FormControl>

                </DialogContent>
                <DialogActions style={{padding: "0px 24px 16px 24px"}} >
                    <Button variant='contained' fullWidth color='error' onClick={handleCloseUpdate}>{t("TABLES_PAGE.TABLE_CART.EDIT_TABLE_DIALOG.CANCEL_BUTTON")}</Button>
                    <Button variant='contained' fullWidth onClick={handleEditTable} autoFocus>{t("TABLES_PAGE.TABLE_CART.EDIT_TABLE_DIALOG.CHANGE_BUTTON")}</Button>
                </DialogActions>
            </Dialog>
            <Tooltip title={t("TABLES_PAGE.TABLE_CART.EDIT_TOOLTIP")}>
                <IconButton onClick={() => {
                    handleClickOpenUpdate(true);
                    setSelectedTable(item.ID);
                }}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </Box>
    )
}
