import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { getTables } from '../../endpoints';
import { useSelector } from 'react-redux';


export default function TablesPage() {

  const [tables, setTables] = useState({});
  const restaurant = useSelector(state => state.RestaurantState);

  useEffect(() => {
    /* getTables(restaurant.restaurantId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    }) */

    console.log(restaurant)
  }, []);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={2}>
          <Card>
            <CardContent>
              <IconButton style={styles.addButton} aria-label="addTable" size="large">
                <AddIcon style={styles.addButton} />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
        {

        }
      </Grid>
    </Box>

  )
};

const styles = {
  addButton: {
    width: 250,
    height: 250
  }
}