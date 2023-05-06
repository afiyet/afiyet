import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import SyncIcon from '@mui/icons-material/Sync';
import { deleteMenuItem, updateMenuItem } from '../../endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { MenuActions } from '../../actions';
import { useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { toBase64 } from '../../util';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSnackbar } from 'notistack';

const Dish = (props) => {

    const {
        restaurantId,
        name,
        price,
        ingredients,
        ID,
        fetchMenu,
        categoryName,
        picture,
        IsDisabled
    } = props;

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setFoodNameTextFieldValue(name);
        setPriceTextFieldValue(price);
        setIngredientsTextFieldValue(ingredients.toString());
    }, []);

    const id = useId();
    const [foodNameTextFieldValue, setFoodNameTextFieldValue] = useState("");
    const [priceTextFieldValue, setPriceTextFieldValue] = useState("");
    const [ingredientsTextFieldValue, setIngredientsTextFieldValue] = useState("");
    const [pictureBase64, setPictureBase64] = useState("");

    async function handlePicture() {
        let file = document.getElementById(id).files[0];
        const b64 = await toBase64(file);
        setPictureBase64(b64);
    }

    return (
        <Box style={styles.dish}>
            <Button
                component="label"
                variant="text"
                style={styles.t}
                sx={{ margin: 0, maxWidth: 60, maxHeight: 60 }}
            >
                {((picture !== "" && picture != null) || (pictureBase64 !== "" && pictureBase64 != null)) ?
                    <img height={60} width={60} src={pictureBase64 || picture} style={styles.t} />
                    :
                    <AddAPhotoIcon style={styles.t} sx={{ margin: 0 }}
                    />
                }
                <input id={id} type="file" accept="image/png, image/gif, image/jpeg" hidden onChange={handlePicture} />
            </Button>
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
            <Box style={styles.buttons}>
                <Tooltip title={t("MENU_EDIT_PAGE.DISABLE_DISH_BUTTON")}>
                    <IconButton
                        aria-label="disableDish"
                        onClick={() => {
                            updateMenuItem(ID, {
                                restaurantId: "" + restaurantId,
                                name: foodNameTextFieldValue,
                                category: categoryName,
                                ingredients: ingredientsTextFieldValue.split(",").map((item) => (item.trim())),
                                price: Number(priceTextFieldValue),
                                picture: pictureBase64 || picture,
                                IsDisabled: !IsDisabled
                            })
                                .then((res) => {
                                    dispatch(MenuActions.updateMenuItem({
                                        restaurantId: restaurantId,
                                        name: name,
                                        price: price,
                                        ingredients: ingredients,
                                        ID: ID,
                                        categoryName: categoryName,
                                        picture: picture,
                                        IsDisabled: !IsDisabled
                                    }));
                                })
                                .catch((err) => {
                                    console.log(err);
                                    enqueueSnackbar(t("MENU_EDIT_PAGE.UPDATE_MENU_ITEM_ERROR"), { variant: "error" });
                                })
                        }}
                    >
                        {IsDisabled ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                </Tooltip>
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
                                    enqueueSnackbar(t("MENU_EDIT_PAGE.DELETE_MENU_ITEM_ERROR"), { variant: "error" });
                                })
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={t("MENU_EDIT_PAGE.UPDATE_DISH_BUTTON")}>
                    <IconButton
                        aria-label="updateMenu"
                        onClick={() => {
                            updateMenuItem(ID, {
                                restaurantId: "" + restaurantId,
                                name: foodNameTextFieldValue,
                                category: categoryName,
                                ingredients: ingredientsTextFieldValue.split(",").map((item) => (item.trim())),
                                price: Number(priceTextFieldValue),
                                picture: pictureBase64 || picture,
                                IsDisabled: IsDisabled
                            })
                                .then((res) => {
                                    dispatch(MenuActions.updateMenuItem({
                                        restaurantId: restaurantId,
                                        name: foodNameTextFieldValue || name,
                                        price: priceTextFieldValue || price,
                                        ingredients: ingredientsTextFieldValue.split(",") || ingredients,
                                        ID: ID,
                                        categoryName: categoryName,
                                        picture: pictureBase64 || picture,
                                        IsDisabled: IsDisabled
                                    }));
                                })
                                .catch((err) => {
                                    console.log(err);
                                    enqueueSnackbar(t("MENU_EDIT_PAGE.UPDATE_MENU_ITEM_ERROR"), { variant: "error" });
                                })
                        }}
                    >
                        <SyncIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}

let styles = {
    dish: {
        display: 'flex',
        marginTop: '0.5vw',
        marginBottom: '0.5vw',
        gap: '1vw'
    },
    dishName: { width: "17vw" },
    iconButtonPicture: {
        borderRadius: 0,
        height: 60
    },
    t: {
        margin: 0
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.3vw"
    }
};

export default Dish;

