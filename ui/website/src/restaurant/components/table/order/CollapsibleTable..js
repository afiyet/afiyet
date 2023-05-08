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
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import MoveOrdersDialog from './MoveOrdersDialog';

export default function CollapsibleTable(props) {

    const {
        tableOrders,
        tableName,
        fetchOrders,
        tables
    } = props;

    const [tableTotal, setTableTotal] = useState(0);
    const { t, i18n } = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);

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
                                <Box style={{ fontWeight: "bold" }}>
                                    {tableName} {t("ORDERS_PAGE.TABLES.TABLE_ORDERS")}
                                </Box>
                            </Typography>
                            <Box>
                                <Button
                                    size="large"
                                    style={{ height: "100%" }}
                                    onClick={() => {setOpenDialog(true);}}
                                    variant='contained'
                                >
                                    {t("ORDERS_PAGE.MOVE.DIALOG_OPEN_BUTTON")}
                                </Button>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableOrders.map((order, index) => (
                        <Row
                            order={order}
                            key={order.orderId}
                            fetchOrders={fetchOrders}
                        />
                    ))}
                    <TableRow>
                        <TableCell>{t("ORDERS_PAGE.TABLES.TABLE_TOTAL")}</TableCell>
                        <TableCell align="right">
                            {tableTotal}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <MoveOrdersDialog 
                open={openDialog}
                setOpen={setOpenDialog}
                tables={tables}
                tableName={tableName}
                tableOrders={tableOrders}
                fetchOrders={fetchOrders}
            />
        </TableContainer>
    );
}
