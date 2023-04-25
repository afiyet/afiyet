import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import SyncIcon from '@mui/icons-material/Sync';
import { deleteMenuItem, updateMenuItem } from '../../endpoints';
import { useDispatch } from 'react-redux';
import { MenuActions } from '../../actions';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';

const Dish = (props) => {

    const {
        restaurantId,
        name,
        price,
        ingredients,
        ID,
        fetchMenu,
        categoryName
    } = props;

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setFoodNameTextFieldValue(name);
        setPriceTextFieldValue(price);
        setIngredientsTextFieldValue(ingredients.toString());
    }, []);

    const [foodNameTextFieldValue, setFoodNameTextFieldValue] = useState("");
    const [priceTextFieldValue, setPriceTextFieldValue] = useState("");
    const [ingredientsTextFieldValue, setIngredientsTextFieldValue] = useState("");

    return (
        <Box style={styles.dish}>
            <TextField
                id="outlined-basic"
                label={t("MENU_EDIT_PAGE.DISH_NAME")}
                variant="outlined"
                style={styles.dishName}
                value={foodNameTextFieldValue}
                onChange={(event) => { setFoodNameTextFieldValue(event.target.value); }}
            />
            <TextField
                id="outlined-multiline-flexible"
                label={t("MENU_EDIT_PAGE.PRICE")}
                value={priceTextFieldValue}
                onChange={(event) => { setPriceTextFieldValue(event.target.value); }}
            />
            <TextField
                id="outlined-multiline-flexible"
                label={t("MENU_EDIT_PAGE.INGREDIENTS")}
                multiline
                fullWidth
                inputProps={{ maxLength: 199 }}
                value={ingredientsTextFieldValue}
                onChange={(event) => { setIngredientsTextFieldValue(event.target.value); }}
            />
            {/* <Checkbox {...label} defaultChecked /> */}
            <Tooltip title={t("MENU_EDIT_PAGE.DELETE_DISH_BUTTON")}>
                <IconButton
                    aria-label="delete"
                    onClick={() => {
                        deleteMenuItem(ID)
                            .then((res) => {
                                console.log(res);
                                dispatch(MenuActions.deleteMenuItem({
                                    ID: ID,
                                    category: categoryName
                                }));
                                fetchMenu();
                            })
                            .catch((err) => {

                            })
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title={t("MENU_EDIT_PAGE.UPDATE_DISH_BUTTON")}>
                <IconButton
                    aria-label="delete"
                    onClick={() => {
                        updateMenuItem(ID, {
                            restaurantId: "" + restaurantId,
                            name: foodNameTextFieldValue,
                            category: categoryName,
                            ingredients: ingredientsTextFieldValue.split(","),
                            price: Number(priceTextFieldValue),
                            picture: ""
                        })
                            .then((res) => {
                                dispatch(MenuActions.deleteMenuItem({
                                    ID: ID,
                                    category: categoryName
                                }));
                                fetchMenu();
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }}
                >
                    <SyncIcon />
                </IconButton>
            </Tooltip>


        </Box>
    );
}

let styles = {
    dish: {
        display: 'flex',
        marginTop: '0.5vw',
        marginBottom: '0.5vw',
        gap: '1.3vw'
    },
    dishName: { width: "17vw" }
};

export default Dish;

