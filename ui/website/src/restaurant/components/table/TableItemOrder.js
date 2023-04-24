import React from 'react';
import IconButton from '@mui/material/IconButton';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export default function TableItemOrder(props) {

    const {

    } = props;

    return (
        <Box>
            <Tooltip title="Siparişler">
                <IconButton onClick={() => { }}>
                    <ReceiptLongIcon />
                </IconButton>
            </Tooltip>
        </Box>
    )
}
