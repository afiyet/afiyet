import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ImageIcon from '@mui/icons-material/Image';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import Dish from './Dish';
import { useState } from 'react';
import { MenuActions } from '../../actions';
import { addMenuItem, deleteMenuItem } from '../../endpoints';
import {toBase64} from "../../util";

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
	const [pictureBase64, setPictureBase64] = useState("");
	const [ingredientsTextFieldValue, setInredientsTextFieldValue] = useState("");
	const menu = useSelector(state => state.menuState.menu);

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
			picture: pictureBase64
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

	async function handlePicture(){
		let file = document.getElementById("picture").files[0];
		const b64 = await toBase64(file);
		console.log("foo: ", b64)
		setPictureBase64(b64);
	}

	return (
		<Box>
			<Dialog open={menuDialogOpen} onClose={handleMenuDialogClose}>
				<DialogTitle>Yemek Ekle</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="foodName"
						label="Yemek Adı"
						fullWidth
						variant="standard"
						value={foodNameTextFieldValue}
						onChange={(event) => { setFoodNAmeTextFieldValue(event.target.value); }}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="ingredients"
						label="Yemek İçeriği"
						fullWidth
						variant="standard"
						value={ingredientsTextFieldValue}
						onChange={(event) => { setInredientsTextFieldValue(event.target.value); }}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="price"
						label="Fiyat Bilgisi"
						fullWidth
						variant="standard"
						value={priceTextFieldValue}
						onChange={(event) => { setPriceTextFieldValue(event.target.value); }}
					/>
					<Button
						component="label"
						variant="outlined"
						startIcon={<ImageIcon />}
						sx={{ marginRight: "1rem", marginTop: "1rem" }}
					>
						Upload Image
						<input id="picture" type="file" accept="image/png, image/gif, image/jpeg" hidden onChange={handlePicture} />
					</Button>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleMenuDialogClose}>İptal</Button>
					<Button onClick={handleMenuAdd}>Ekle</Button>
				</DialogActions>
			</Dialog>

			<Box style={styles.categoryContainer}>
				<Box style={styles.categoryHeader}>
					<TextField
						id="outlined-basic"
						label="Kategori Adı"
						variant="outlined"
						value={categoryName}
					/>
					<Box style={styles.categoryUtility}>
						<IconButton
							aria-label="delete"
							onClick={handleDeleteCategory}
						>
							<DeleteIcon />
						</IconButton>
						<Button
							variant="contained"
							onClick={handleMenuDialogOpen}
						>
							Yemek Ekle
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

