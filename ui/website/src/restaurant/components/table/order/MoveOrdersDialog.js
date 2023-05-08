import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TransferOrders from './TransferOrders';
import { moveOrdersToAnotherTable } from '../../../../endpoints';

export default function MoveOrdersDialog(props) {

    const {
        open,
        setOpen,
        tables,
        tableName,
        tableOrders,
        fetchOrders
    } = props;

    const [shouldDisableButton, setShouldDisableButton] = useState(false);
    const [movedOrdersFinal, setMovedOrdersFinal] = useState([]);
    const [toTableIdFinal, setToTableIdFinal] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleOrderSwitching() {
        movedOrdersFinal.map((order) => {
            moveOrdersToAnotherTable(order.orderId, toTableIdFinal)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        });
        handleClose();
        fetchOrders();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"**********Siparişleri başka masya taşı"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <TransferOrders
                        tableName={tableName}
                        tables={tables}
                        tableOrders={tableOrders}
                        setShouldDisableButton={setShouldDisableButton}
                        setMovedOrdersFinal={setMovedOrdersFinal}
                        setToTableIdFinal={setToTableIdFinal}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                variant="contained" 
                onClick={handleClose}
                >Disagree</Button>
                <Button 
                variant="contained" 
                onClick={handleOrderSwitching} 
                autoFocus
                disabled={shouldDisableButton}
                >
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}