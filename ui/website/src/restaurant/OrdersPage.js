import { Box, Typography, Button, ButtonGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollapsibleTable from './components/table/order/CollapsibleTable.';

export default function OrdersPage() {

    const { t, i18n } = useTranslation();
    const [search, setSearch] = useState("");

    useEffect(() => {
        //SİPARİŞLERİ ALAN ENDPOINT
    });

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
        <Box style={styles.container}>
            <Box style={styles.orderContainer}>
                <Box style={styles.titleAndFilter}>
                    <Typography style={styles.pageTitle} variant="h3">{t("ORDERS_PAGE.TITLE")}</Typography>
                    <Box style={styles.searchTableContainer}>
                        <TextField
                            id="outlined-password-input"
                            value={search}
                            onChange={(event) => { setSearch(event.target.value) }}
                            variant='outlined'
                            label={t("TABLES_PAGE.SEARCH_TABLES")}
                        />
                    </Box>
                </Box>
                <Box style={styles.collapsibleTableContainer}>
                    <CollapsibleTable
                        rows={rows}
                        tableName={"dummy masa adı"}
                    />
                </Box>

                <Box style={styles.collapsibleTableContainer}>
                    <CollapsibleTable
                        rows={rows}
                        tableName={"dummy masa adı"}
                    />
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
        padding: 10
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
        marginTop: '1vh',
        borderRadius: '1vh',
        padding: 20,
    },
};