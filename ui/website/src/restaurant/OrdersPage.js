import { Box, Typography, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollapsibleTable from './components/table/order/CollapsibleTable.';
import { getRestaurantOrders, getTables } from '../endpoints';
import { useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';
import useInterval from '../customHooks/UseInterval';

export default function OrdersPage() {

    const { t, i18n } = useTranslation();
    const [search, setSearch] = useState("");
    const [ordersSeperatedTables, setOrdersSeperatedTables] = useState([]);
    const [tables, setTables] = useState([]);
    const restaurantId = useSelector(state => state.restaurantState.restaurantId);
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    useEffect(() => {
        fetchOrders();
    }, []);

    useInterval(fetchOrders, (location.pathname === "/orders") ? 1000000 : null);

    function fetchOrders() {
        let reconstructedData = [];
        let existingTableIds = [];
        let existingTables = [];
        getTables(restaurantId)
            .then((res) => {
                res.data.map((table) => {
                    existingTableIds.push(table.ID);
                    let found = reconstructedData.find((item) => (item.tableId === table.ID));

                    existingTables.push({
                        tableId: table.ID,
                        tableName: table.name
                    });

                    if (found === null || found === undefined) {
                        reconstructedData.push({
                            tableId: table.ID,
                            tableName: table.name,
                            orders: []
                        });
                    }
                });
                setTables(existingTables);
                getRestaurantOrders(restaurantId)
                    .then((res) => {
                        existingTableIds.map((tableId) => { //masalar kadar dönüyor
                            let resOrdersFilteredByTableId = res.data.filter((item) => (item.tabelId == tableId)) //orderları masaIdye göre filter

                            resOrdersFilteredByTableId.map((order) => {
                                let dishesWithCount = [];
                                let indexesToBeSkipped = [];
                                for (let i = 0; i < order.dishes.length; i++) {
                                    if (!dishesWithCount.some((item) => (item.ID === order.dishes[i].ID))) {
                                        dishesWithCount.push({
                                            ID: order.dishes[i].ID,
                                            restaurantId: order.dishes[i].restaurantId,
                                            name: order.dishes[i].name,
                                            category: order.dishes[i].category,
                                            ingredients: order.dishes[i].ingredients,
                                            price: order.dishes[i].price,
                                            counter: 0,
                                        });
                                    }
                                    for (let k = 0; k < order.dishes.length; k++) {
                                        if (!indexesToBeSkipped.includes(k)) {
                                            if (order.dishes[i].ID === order.dishes[k].ID) {
                                                let found = dishesWithCount.find((item) => (item.ID === order.dishes[i].ID))
                                                found.counter += 1;
                                                indexesToBeSkipped.push(k);
                                            }
                                        }
                                    }
                                }
                                order.dishes = dishesWithCount;

                                let table = reconstructedData.find((dataObj) => (dataObj.tableId == tableId));
                                table.orders.push({
                                    orderId: order.ID,
                                    dishes: order.dishes,
                                    orderStatus: order.Status,
                                    paymentType: order.paymentType,
                                    isPaid: order.isPaid,
                                    isCompleted: order.isCompleted
                                });
                            });
                        });

                        console.log(reconstructedData);
                        setOrdersSeperatedTables(reconstructedData);
                    })
                    .catch((err) => { 
                        console.log(err);
                        enqueueSnackbar(t("ORDERS_PAGE.ORDERS_ERROR"), { variant: "error" });
                    })
                console.log(reconstructedData);
            })
            .catch((err) => { 
                console.log(err);
                enqueueSnackbar(t("ORDERS_PAGE.TABLES_ERROR"), { variant: "error" });
            })
    }

    return (
        <Box style={styles.container}>
            <Box style={styles.orderContainer}>
                <Box style={styles.titleAndFilter}>
                    <Typography style={styles.pageTitle} variant="h3">{t("ORDERS_PAGE.TITLE")}</Typography>
                    <Box style={styles.searchTableContainer}>
                        <TextField
                            id="outlined-password-input"
                            value={search}
                            onChange={(event) => { setSearch(event.target.value) }}
                            variant='filled'
                            label={t("TABLES_PAGE.SEARCH_TABLES")}
                        />
                    </Box>
                </Box>
                <Box style={styles.collapsibleTableContainer}>
                    {
                        ordersSeperatedTables.map((table, index) => {
                            if (table.tableName.includes(search)) {
                                return (
                                    <Box style={{ marginBottom: 20 }} key={index + table.tableId}>
                                        <CollapsibleTable
                                            key={table.tableId}
                                            tableOrders={table.orders.sort((a,b) => (a.orderId - b.orderId))}
                                            tableName={table.tableName}
                                            fetchOrders={fetchOrders}
                                            tables={tables}
                                        />
                                    </Box>
                                );
                            }

                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",

    },
    orderContainer: {
        width: '70vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#d82227',
        marginTop: '2vh',
        borderRadius: '1vh',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: 20,
    },
    pageTitle: { fontFamily: "monospace", color: "#fff" },
    searchTableContainer: {
        backgroundColor: "#fff",
        borderRadius: 4,
    },
    titleAndFilter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    collapsibleTableContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#d82227',
        marginTop: '2vh',
        borderRadius: '1vh',
    },
};