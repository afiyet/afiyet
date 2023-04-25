import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import Dish from './Dish';
import { useEffect, useState } from 'react';
import { MenuActions } from '../../actions';
import { addMenuItem, deleteMenuItem } from '../../endpoints';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';

const DishCategory = (props) => {

	const {
		categoryName,
		categoryItems,
		restaurantId,
		fetchMenu
	} = props;

	const dispatch = useDispatch();
	const [menuDialogOpen, setMenuDialogOpen] = useState(false);
	const [foodNameTextFieldValue, setFoodNAmeTextFieldValue] = useState("");
	const [priceTextFieldValue, setPriceTextFieldValue] = useState("");
	const [ingredientsTextFieldValue, setInredientsTextFieldValue] = useState("");
	const menu = useSelector(state => state.menuState.menu);
	const { t, i18n } = useTranslation();

	function handleMenuDialogClose() {
		setFoodNAmeTextFieldValue("");
		setInredientsTextFieldValue("");
		setPriceTextFieldValue("");
		setMenuDialogOpen(false);
	}

	function handleMenuDialogOpen() {
		setMenuDialogOpen(true);
	}

	function handleMenuAdd() {
		handleMenuDialogClose();

		addMenuItem({
			restaurantId: "" + restaurantId,
			name: foodNameTextFieldValue,
			category: categoryName,
			ingredients: ingredientsTextFieldValue.split(","),
			price: Number(priceTextFieldValue),
			picture: ""
		})
			.then((res) => {
				fetchMenu();
			})
			.catch((err) => {
				console.log(err);
			})
	}

	function handleDeleteCategory() {
		menu.map((category, index) => {
			if (category.categoryName === categoryName) {
				category.categoryItems.map((dish, i) => {
					deleteMenuItem(dish.ID)
						.then((res) => {
							console.log(res);
						})
						.catch((err) => {

						})
				});
			}
		});
		dispatch(MenuActions.deleteCategory({
			categoryName: categoryName
		}));
	}

	return (
		<Box>
			<Dialog open={menuDialogOpen} onClose={handleMenuDialogClose}>
				<DialogTitle>{t("MENU_EDIT_PAGE.DISH_DIALOG.TITLE")}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="foodName"
						label={t("MENU_EDIT_PAGE.DISH_DIALOG.DISH_NAME")}
						fullWidth
						variant="outlined"
						value={foodNameTextFieldValue}
						onChange={(event) => { setFoodNAmeTextFieldValue(event.target.value); }}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="ingredients"
						label={t("MENU_EDIT_PAGE.DISH_DIALOG.DISH_INGREDIENTS")}
						fullWidth
						variant="outlined"
						value={ingredientsTextFieldValue}
						onChange={(event) => { setInredientsTextFieldValue(event.target.value); }}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="price"
						label={t("MENU_EDIT_PAGE.DISH_DIALOG.DISH_PRICE")}
						fullWidth
						variant="outlined"
						value={priceTextFieldValue}
						onChange={(event) => { setPriceTextFieldValue(event.target.value); }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleMenuDialogClose}>{t("MENU_EDIT_PAGE.DISH_DIALOG.CANCEL_BUTTON")}</Button>
					<Button onClick={handleMenuAdd}>{t("MENU_EDIT_PAGE.DISH_DIALOG.ADD_BUTTON")}</Button>
				</DialogActions>
			</Dialog>

			<Box style={styles.categoryContainer}>
				<Box style={styles.categoryHeader}>
					<TextField
						id="outlined-basic"
						label={t("MENU_EDIT_PAGE.CATEGORY_NAME")}
						variant="outlined"
						value={categoryName}
					/>
					<Box style={styles.categoryUtility}>
						<Tooltip title={t("MENU_EDIT_PAGE.DELETE_CATEGORY_BUTTON")}>
							<IconButton
								aria-label="delete"
								onClick={handleDeleteCategory}
							>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
						<Button
							variant="contained"
							onClick={handleMenuDialogOpen}
						>
							{t("MENU_EDIT_PAGE.ADD_DISH_BUTTON")}
						</Button>
					</Box>
				</Box>
				{
					categoryItems.map((item, index) => {
						return (
							<Box key={index} style={styles.categoryBody}>
								<Dish
									key={item.ID}
									restaurantId={item.restaurantId}
									name={item.name}
									price={item.price}
									ingredients={item.ingredients}
									ID={item.ID}
									fetchMenu={fetchMenu}
									categoryName={categoryName}
								/>
							</Box>
						);
					})
				}
			</Box>
		</Box>
	);
}

let styles = {
	categoryContainer: {
		width: '65wv',
		display: 'flex',
		flexDirection: 'column',
		padding: '2vh',
		marginBottom: '1vh',
		backgroundColor: '#fff',
		borderRadius: '1vh',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		margin: 10
	},
	categoryHeader: {
		width: '65wv',
		display: 'flex',
		gap: '50.2vw'
	},
	categoryUtility: {
		display: 'flex',
		gap: '1vw'
	},
	categoryBody: {
		display: 'flex',
		flexDirection: 'column'
	}
};

export default DishCategory;

