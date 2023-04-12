import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

const Dish = () => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Box style={styles.dish}>
            <TextField id="outlined-basic" label="Yemek Adı" variant="outlined" style={styles.dishName} />
            <TextField id="outlined-multiline-flexible" label="Fiyatı" />
            <TextField id="outlined-multiline-flexible" label="Açıklama" multiline fullWidth inputProps={{ maxLength: 199 }} />
            <Checkbox {...label} defaultChecked />
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
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

