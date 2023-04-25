import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import CollapsibleTable from './order/CollapsibleTable.';

export default function TableItemOrder(props) {

    const {
        item
    } = props;

    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function createData(userName) {
        return {
            userName,
            order: [
                {
                    date: "2020-01-05",
                    foodName: "Kebap",
                    amount: 3,
                    unitPrice: 30
                },
                {
                    date: "2020-01-02",
                    foodName: "Döner",
                    amount: 1,
                    unitPrice: 20
                }
            ]
        };
    }

    const rows = [
        createData("Müşteri Adı 1"),
        createData("Müşteri Adı 2"),
        createData("Müşteri Adı 3"),
        createData("Müşteri Adı 4"),
        createData("Müşteri Adı 5")
    ];


    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={true}
            >
                <DialogContent>
                    <CollapsibleTable
                        rows={rows}
                        tableName={item.name}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Kapat</Button>
                    {/* <Button onClick={() => { }} autoFocus>Değiştir</Button> */}
                </DialogActions>
            </Dialog>
            <Tooltip title="Siparişler">
                <IconButton onClick={handleOpen}>
                    <ReceiptLongIcon />
                </IconButton>
            </Tooltip>
        </Box>
    )
}
