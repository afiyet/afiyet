import React, { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from './Row';

export default function CollapsibleTable(props) {

    const {
        rows,
        tableName
    } = props;

    const [tableTotal, setTableTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        rows.map((row) => {
            row.order.map((x) => {
                total += x.amount * x.unitPrice;
            });
        });
        setTableTotal(total);
    }, []);


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>{tableName}</TableCell>
                        <TableCell>Müşteriler</TableCell>
                        <TableCell />
                        <TableCell align="right">Toplam (TL)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                    <TableRow>
                        <TableCell>Masa Toplamı (TL)</TableCell>
                        <TableCell colSpan={4} align="right">
                            {tableTotal}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
