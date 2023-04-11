import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox';

const EditMenu = () => {

	const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

	return (
		<Box style={styles.editMenuPage}>
			<Box style={styles.menuContainer}>
				<Box style={styles.menu}>
					<Box style={styles.menuHeader}>
						<Typography variant="h3" gutterBottom style={styles.menuTypography}>Menü</Typography>
						<Button variant="text" className="menu-add-button">KATEGORİ EKLE</Button>
					</Box>
					<Box style={styles.menuBody}>
						<Box style={styles.categoryContainer}>
							<Box style={styles.categoryHeader}>
								<TextField id="outlined-basic" label="Kategori Adı" variant="outlined" />
								<Box style={styles.categoryUtility}>
									<IconButton aria-label="delete">
										<DeleteIcon />
									</IconButton>
									<Button variant="text">Yemek Ekle</Button>
								</Box>
							</Box>
							<Box style={styles.categoryBody}>
								<Box style={styles.dish}>
									<TextField id="outlined-basic" label="Yemek Adı" variant="outlined" style={styles.dishName} />
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
					<Box style={styles.updateMenu}>
						<Button variant="contained">Menü Güncelle</Button>
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
		justifyContent: 'center'
	},
	menu: {
		width: '70vw',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#d82227',
		marginTop: '2vh',
		borderRadius: '1vh',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
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
	menuTypography: { fontFamily: "monospace" },
	updateMenu: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '1vh'
	},
	categoryContainer: {
		width: '65wv',
		display: 'flex',
		flexDirection: 'column',
		padding: '2vh',
		marginBottom: '1vh',
		backgroundColor: '#fe4526',
		borderRadius: '1vh',
		boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
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
	},
	dish: {
		display: 'flex',
		marginTop: '0.5vw',
		marginBottom: '0.5vw',
		gap: '1.3vw'
	},
	dishName: { width: "17vw" }
};

export default EditMenu;