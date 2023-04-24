import React from 'react';
import IconButton from '@mui/material/IconButton';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Tooltip from '@mui/material/Tooltip';

export default function TableItemQR(props) {

    const {
        item,
        qrRef
    } = props;

    const downloadQRCode = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(e.currentTarget);
        let canvas = qrRef.current.querySelector("canvas");
        let image = canvas.toDataURL("image/png");
        let anchor = document.createElement("a");
        anchor.href = image;
        anchor.download = e.currentTarget.id + ".png";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    return (
        <Tooltip title="QR İndir">
            <IconButton onClick={downloadQRCode} id={item.name}>
                <QrCode2Icon id={item.name} />
            </IconButton>
        </Tooltip>
    )
}
