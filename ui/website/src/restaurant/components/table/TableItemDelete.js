import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { deleteTable } from '../../../endpoints';

export default function TableItemDelete(props) {

    const {
        item,
        fetchTables
    } = props;

    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteTable = (tableId) => {
        deleteTable(tableId)
          .then((res) => {
            fetchTables();
            enqueueSnackbar("Masa başarıyla silindi!", { variant: "success" });
          })
          .catch((err) => {
            console.log(err);
            enqueueSnackbar("Masa silinemedi!", { variant: "error" });
          })
      }

    return (
        <IconButton onClick={() => { handleDeleteTable(item.ID) }}>
            <DeleteIcon />
        </IconButton>
    )
}
