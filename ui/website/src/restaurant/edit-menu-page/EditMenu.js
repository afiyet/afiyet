import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Navbar from "../components/Navbar"
import "./EditMenu.css"


const EditMenu = () => {
    return (
      <div className="edit-menu-page">
        <Navbar />
        <div className="menu-container">
          <div className="menu">
            <div className="menu-header">
              <Typography variant="h3" gutterBottom>Menü</Typography>
              <Button variant="text" className="menu-add-button">Ekle</Button>
            </div>
            <div className="menu-body">
              <div className="main-dish">
                <div className="main-dish-header">
                  <Typography variant="h4" gutterBottom>Ana Yemekler</Typography>
                  <Button variant="text">Ekle</Button>
                </div>
                <div className="main-dish-body">
                  <div className="dish">
                    <TextField id="outlined-basic" label="Adı" variant="outlined" fullWidth />
                    <TextField id="outlined-multiline-flexible" label="İçindekiler" multiline  fullWidth/>
                    <TextField id="outlined-multiline-flexible" label="Açıklama" multiline  fullWidth/>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div className="dish">
                    <TextField id="outlined-basic" label="Adı" variant="outlined" fullWidth />
                    <TextField id="outlined-multiline-flexible" label="İçindekiler" multiline  fullWidth/>
                    <TextField id="outlined-multiline-flexible" label="Açıklama" multiline  fullWidth/>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>      
    );
  }
   
  export default EditMenu;