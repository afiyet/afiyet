import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from '@mui/material';
import { deleteOrder } from '../../../../endpoints';

export default function Row(props) {
    const {
        order,
        fetchOrders
    } = props;


    function handleClickCompleteOrder () {
        deleteOrder(order.orderId)
        .then((res) => {
            fetchOrders();
        })
        .catch((err) => {console.log(err);})
    }

    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row" align="left">
                <Typography variant="h6" component="div">
                    Sipariş {order.orderId}
                </Typography>
                    
                </TableCell>
                <TableCell align="right">
                    <Button
                        size="large"
                        variant="contained"
                        style={{ height: "100%" }}
                        onClick={handleClickCompleteOrder}
                    >
                        Teslim Edildi
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={3}>
                    <Box sx={{ margin: 0 }}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Yemek</TableCell>
                                    <TableCell align="right">Adet</TableCell>
                                    <TableCell align="right">Toplam (TL)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.dishes.map((dish, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{dish.name}</TableCell>
                                            <TableCell align="right">{dish.counter}</TableCell>
                                            <TableCell align="right">{dish.counter * dish.price}</TableCell>
                                        </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}