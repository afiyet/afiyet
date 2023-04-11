import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox';

import "./EditMenu.css";

const EditMenu = () => {

	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

	let styles = {
		menuTypography: { fontFamily: "monospace" },
		menuBox: {
			backgroundColor: '#d82227',
			marginTop: '2vh',
			borderRadius: '1vh',
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
		},
		categoryBox: {
			padding: '2vh',
			marginBottom: '1vh',
			backgroundColor: '#fe4526',
			borderRadius: '1vh',
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
		},
		dishName: { width: "20vw" }
	};

	return (
		<Box className="edit-menu-page">
			<Box className="menu-container">
				<Box className="menu" style={styles.menuBox}>
					<Box className="menu-header">
						<Typography variant="h3" gutterBottom style={styles.menuTypography}>Menü</Typography>
						<Button variant="text" className="menu-add-button">KATEGORİ EKLE</Button>
					</Box>
					<Box className="menu-body">
						<Box className="category-container" style={styles.categoryBox}>
							<Box className="category-header">
								<TextField id="outlined-basic" label="Kategori Adı" variant="outlined" />
								<Button variant="text">Yemek Ekle</Button>
							</Box>
							<Box className="category-body">
								<Box className="dish">
									<TextField id="outlined-basic" label="Adı" variant="outlined" style={styles.dishName} />
									<TextField id="outlined-multiline-flexible" label="Fiyatı" />
									<TextField id="outlined-multiline-flexible" label="Açıklama" multiline fullWidth inputProps={{ maxLength: 199 }} />
									<Checkbox {...label} defaultChecked />
									<IconButton aria-label="delete">
										<DeleteIcon />
									</IconButton>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default EditMenu;