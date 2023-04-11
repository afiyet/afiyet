import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import Dish from './Dish';

const DishCategory = () => {

    return (
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
                <Dish />
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
	}
};

export default DishCategory;

