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

export default function Row(props) {
    const {
        row
    } = props;

    const [open, setOpen] = useState(false);
    const [customerTotal, setCustomerTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        row.order.map((x) => {
            total += x.amount * x.unitPrice;
        });
        setCustomerTotal(total);
    }, []);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                    {row.userName}
                </TableCell>
                <TableCell colSpan={2} align="right">
                    {customerTotal}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                {row.userName} Sipariş
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tarih</TableCell>
                                        <TableCell>Yemek</TableCell>
                                        <TableCell align="right">Adet</TableCell>
                                        <TableCell align="right">Toplam (TL)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.order.map((orderRow) => (
                                        <TableRow key={orderRow.date}>
                                            <TableCell component="th" scope="row">
                                                {orderRow.date}
                                            </TableCell>
                                            <TableCell>{orderRow.foodName}</TableCell>
                                            <TableCell align="right">{orderRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {orderRow.amount * orderRow.unitPrice}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}