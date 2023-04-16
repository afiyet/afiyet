import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DishCategory from './components/DishCategory';
import { useDispatch, useSelector } from "react-redux";
import { MenuActions } from '../actions';

import { addTable, getRestaurantMenu } from '../endpoints';

const EditMenu = () => {

	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
	const menu = useSelector(state => state.menuState.menu);
	const restaurantId = useSelector(state => state.restaurantState.restaurantId);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchMenu();
	}, []);

	function fetchMenu() {
		getRestaurantMenu(restaurantId)
		.then((res) => {
			updateState(res.data);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	function updateState(restaurantMenu) {
		restaurantMenu.map((menuItem, index) => {
			dispatch(MenuActions.addCategory(menuItem.category));
			dispatch(MenuActions.addMenuItem({
				category: menuItem.category,
				restaurantId: restaurantId,
				name: menuItem.name,
				ingredients: menuItem.ingredients,
				picture: menuItem.picture,
				price: menuItem.price,
				ID: menuItem.ID
				//dishes: action.data.dishes
			}));
		});
	}

	const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
	const [categoryTextFieldValue, setCategoryTextFieldValue] = useState("");

	function handleCategoryDialogClose() {
		setCategoryTextFieldValue("");
		setCategoryDialogOpen(false);
	}

	function handleCategoryDialogOpen() {
		setCategoryDialogOpen(true);
	}

	function handleCategoryAdd() {
		handleCategoryDialogClose();
		dispatch(MenuActions.addCategory(categoryTextFieldValue));
	}

	return (
		<Box>
			<Dialog open={categoryDialogOpen} onClose={handleCategoryDialogClose}>
				<DialogTitle>Kategori Ekle</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="categoryName"
						label="Kategori Adı"
						fullWidth
						variant="standard"
						value={categoryTextFieldValue}
						onChange={(event) => { setCategoryTextFieldValue(event.target.value) }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCategoryDialogClose}>İptal</Button>
					<Button onClick={handleCategoryAdd}>Ekle</Button>
				</DialogActions>
			</Dialog>
			<Box style={styles.editMenuPage}>
				<Box style={styles.menuContainer}>
					<Box style={styles.menu}>
						<Box style={styles.menuHeader}>
							<Typography variant="h3" gutterBottom style={styles.menuTypography}>Menü</Typography>
							<Button
								variant="contained"
								className="menu-add-button"
								onClick={handleCategoryDialogOpen}
							>
								KATEGORİ EKLE
							</Button>
						</Box>
						{
							menu.map((item, index) => {
								return (
									<Box key={index} style={styles.menuBody}>
										<DishCategory
											categoryName={item.categoryName}
											categoryItems={item.categoryItems}
											restaurantId={restaurantId}
											fetchMenu={fetchMenu}
										/>
									</Box>
								);
							})
						}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

let styles = {
	editMenuPage: {
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		height: '100vh'
	},
	menuContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	menu: {
		width: '70vw',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#d82227',
		marginTop: '2vh',
		borderRadius: '1vh',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
		padding: 10
	},
	menuHeader: {
		display: 'flex',
		marginLeft: '1.3vw',
		marginTtop: '1.3vw',
		gap: '58vw',
	},
	menuBody: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column'
	},
	menuTypography: { fontFamily: "monospace", color: "#fff" },
	updateMenu: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '1vh',
	}
};

export default EditMenu;