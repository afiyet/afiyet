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
import { acceptCashPayment, completeCashPayment, deleteOrder } from '../../../../endpoints';
import { useTranslation } from 'react-i18next';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

export default function Row(props) {
    const {
        order,
        fetchOrders
    } = props;

    const { t, i18n } = useTranslation();


    function removeOrder() {
        deleteOrder(order.orderId)
            .then((res) => {
                fetchOrders();
            })
            .catch((err) => { console.log(err); })
    }

    function handleAcceptCashPayment() {
        acceptCashPayment({
            ID: order.orderId
        })
            .then((res) => {
                fetchOrders();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleOrderDelivered() {
        completeCashPayment({
            ID: order.orderId
        })
            .then((res) => {
                fetchOrders();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row" align="left">
                    <Typography variant="h6" component="div">
                        <Box style={{ fontWeight: "bold", display: "flex", gap: "1vw" }}>
                            {t("REVIEWS_PAGE.TABLE_ORDER")} {order.orderId}
                            {
                                (order.isPaid === 1 || order.paymentType === "CARD") ?
                                    <Chip label={<PriceCheckIcon />} color="success" />
                                    :
                                    <Chip label={<PriceCheckIcon />} color="default" />
                            }
                            {
                                (order.orderStatus === "WAITER_CALLED") ?
                                    <Chip label={<EmojiPeopleIcon />} color="warning" />
                                    :
                                    <Chip label={<EmojiPeopleIcon />} color="default" />
                            }
                            {
                                (order.isCompleted === 1) ?
                                    <Chip label={<DinnerDiningIcon />} color="success" />
                                    :
                                    <Chip label={<DinnerDiningIcon />} color="default" />
                            }
                        </Box>

                    </Typography>
                </TableCell>
                <TableCell align="right">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        {
                            (order.isPaid === 0 && order.paymentType === "CASH") ?
                                <Button
                                    size="large"
                                    style={{ height: "100%" }}
                                    onClick={handleAcceptCashPayment}
                                >
                                    {"ödeme alındı"}
                                </Button>
                                :
                                null
                        }
                        {
                            (order.isCompleted === 0) ?
                                <Button
                                    size="large"
                                    style={{ height: "100%" }}
                                    onClick={handleOrderDelivered}
                                >
                                    {t("REVIEWS_PAGE.ORDER_COMPLETED_BUTTON")}
                                </Button>
                                :
                                null
                        }
                        {
                            ((order.isPaid === 1 && order.isCompleted === 1) || (order.paymentType === "CARD" && order.isCompleted === 1)) ?
                                <Button
                                    size="large"
                                    style={{ height: "100%" }}
                                    onClick={removeOrder}
                                    color={"error"}
                                >
                                    {"sil"}
                                </Button>
                                :
                                null
                        }
                    </ButtonGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={3}>
                    <Box sx={{ margin: 0 }}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6" >
                                            <Box style={{ fontWeight: "bold" }}>
                                                {t("REVIEWS_PAGE.FOOD")}
                                            </Box>
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6" >
                                            <Box style={{ fontWeight: "bold" }}>
                                                {t("REVIEWS_PAGE.AMOUNT")}
                                            </Box>
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6" >
                                            <Box style={{ fontWeight: "bold" }}>
                                                {t("REVIEWS_PAGE.TOTAL")}
                                            </Box>
                                        </Typography>
                                    </TableCell>
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