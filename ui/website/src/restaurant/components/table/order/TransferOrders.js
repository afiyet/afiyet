import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferOrders(props) {

    const {
        tables,
        tableName,
        tableOrders,
        setShouldDisableButton,
        setMovedOrdersFinal,
        setToTableIdFinal
    } = props;

    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const [tableIdToBeMoved, setTableIdToBeMoved] = useState(0);
    const { t, i18n } = useTranslation();

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    useState(() => {
        console.log(tableOrders)
        setLeft(tableOrders);
    }, []);

    useEffect(() => {
        if (tableIdToBeMoved !== 0) {
            setShouldDisableButton(false);
        } else {
            setShouldDisableButton(true);
        }
        setToTableIdFinal(tableIdToBeMoved);
    }, [tableIdToBeMoved]);

    useEffect(() => {
        console.log(right);
        setMovedOrdersFinal(right);
    }, [right]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = (items) => (
        <Paper sx={{ minWidth: "11vw", width: "100%", height: 230, overflow: 'auto' }}>
            <List>
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.orderId}-label`;
                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${t("ORDERS_PAGE.MOVE.ORDER")} ${value.orderId}`} />
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={5}>
                <Box style={{display: "flex", flex: 1, flexDirection: "column"}}>
                    <TextField
                        style={{ marginTop: 10 }}
                        id="outlined-password-input"
                        value={tableName}
                        disabled
                        variant='outlined'
                        label={t("ORDERS_PAGE.MOVE.FROM")}
                        fullWidth
                    />
                    {customList(left)}
                </Box>

            </Grid>
            <Grid item xs={2}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="contained"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="contained"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="contained"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="contained"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={5}>
                <Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{t("ORDERS_PAGE.MOVE.TO")}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tableIdToBeMoved}
                                label={t("ORDERS_PAGE.MOVE.TO")}
                                onChange={(e) => { setTableIdToBeMoved(e.target.value); }}
                            >
                                <MenuItem disabled value={0}>
                                    <em>{t("ORDERS_PAGE.MOVE.PLACEHOLDER")}</em>
                                </MenuItem>
                                {
                                    tables.map((table) => (
                                        <MenuItem value={table.tableId}>{table.tableName}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    {customList(right)}
                </Box>
            </Grid>
        </Grid>
    );
}
