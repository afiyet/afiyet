import React, { useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { QRCodeCanvas } from "qrcode.react";
import TableItemDelete from './TableItemDelete';
import TableItemUpdate from './TableItemUpdate';
import TableItemQR from './TableItemQR';
import Chip from '@mui/material/Chip';
import { useTranslation } from 'react-i18next';

export default function TableItem(props) {

    const {
        item,
        fetchTables,
        isAvailable
    } = props;

    const restaurant = useSelector(state => state.restaurantState);
    const qrRef = useRef();
    const { t, i18n } = useTranslation();

    return (
        <Grid item sm={6} xs={3} xl={2} md={3}>
            <Card>
                <CardContent>
                    <Box
                        ref={qrRef}
                        style={{marginBottom: 15}}
                    >
                        <QRCodeCanvas
                            id="qrCode"
                            value={restaurant.restaurantId + ":" + item.ID}
                            size={200}
                            bgColor={"#ffffff"}
                            level={"H"}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Box>
                    <Box style={styles.nameAndChip}>
                        <Typography noWrap={true} variant="h5">{item.name}</Typography>
                        <Chip label={(isAvailable) ? t("TABLES_PAGE.CHIP.EMPTY") : t("TABLES_PAGE.CHIP.FULL")} color={(isAvailable) ? "success" : "error"} variant="contained" />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box style={styles.iconButtonContainer}>
                        <TableItemQR
                            item={item}
                            qrRef={qrRef}
                        />
                        <TableItemUpdate
                            item={item}
                            fetchTables={fetchTables}
                        />
                        <TableItemDelete
                            item={item}
                            fetchTables={fetchTables}
                        />
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    )
};

const styles = {
    nameAndChip: {
        display: "flex",
        justifyContent: "space-between"
    },
    iconButtonContainer: {
        display: "flex",
        justifyContent: "space-around"
    }
}
