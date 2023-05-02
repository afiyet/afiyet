import React, { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Row from './Row';

export default function CollapsibleTable(props) {

    const {
        tableOrders,
        tableName,
        fetchOrders
    } = props;

    const [tableTotal, setTableTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        tableOrders.map((order) => {
            order.dishes.map((x) => {
                total += x.counter * x.price;
            });
        });
        setTableTotal(total);
    }, []);


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Typography variant="h5" gutterBottom component="div">
                                {tableName} Sipariş
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableOrders.map((order, index) => (
                        <Row 
                            order={order}
                            key={index}
                            fetchOrders={fetchOrders}
                        />
                    ))}
                    <TableRow>
                        <TableCell>Masa Toplamı (TL)</TableCell>
                        <TableCell align="right">
                            {tableTotal}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
