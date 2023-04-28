import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';

export default function CommentItem(props) {

    const {
        userFullName,
        comment,
        point,
        date
    } = props;

    return (
        <Box style={styles.container}>
            <Card sx={{ maxWidth: "70vw" }}>
                <CardActionArea>
                    <CardContent>
                        <Box style={styles.nameAndRating}>
                            <Typography variant="h4" component="div">{userFullName}</Typography>
                            <Rating value={point} readOnly />
                        </Box>
                        <Typography gutterBottom variant="button" component="div" color="text.secondary">{new Intl.DateTimeFormat("en-GB").format(new Date(date))}</Typography>
                        <Typography variant="body1" color="text.secondary">{comment}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
};

const styles = {
    container: {
        marginBottom: 15,
        marginTop: 15,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    nameAndRating: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
}
