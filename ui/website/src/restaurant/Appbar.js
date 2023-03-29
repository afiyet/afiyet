import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import transparentLogo from "../img/transparentLogo.png";
import { useNavigate } from "react-router-dom";
import { style } from '@mui/system';

const pages = [{
    title: "Menü Düzenleme",
    uri: "/edit-menu"
}, {
    title: "QR Üretme",
    uri: "/generate-qr"
}, {
    title: "Masalar",
    uri: "/tables"
}];


function Appbar() {

    const navigate = useNavigate();

    return (
        <AppBar position="static" style={styles.appbar}>
            <Box style={styles.container}>
                <Box style={styles.logo}>
                    <img
                        src={transparentLogo}
                        alt="company logo"
                        width={50}
                        height={50}
                    />
                </Box>
                <Typography
                    variant="h4"
                    sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    AFİYET
                </Typography>
                <Box>
                    {pages.map((page, i) => {
                        return (
                            <Button
                                key={i}
                                onClick={() => { navigate(page.uri) }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        m: 2,
                                        fontFamily: 'monospace',
                                        fontWeight: "bold",
                                        textDecoration: 'none',
                                        color: "white"
                                    }}
                                >
                                    {page.title}
                                </Typography>
                            </Button>
                        );
                    })}

                </Box>
            </Box>
        </AppBar>
    );
}
export default Appbar;

const styles = {
    appbar: {
        backgroundColor: "#d82227",
        paddingLeft: "2vw",
        paddingRight: "2vw"
    },
    container: {
        display: "flex",
        alignItems: "center"
    },
    logo: {
        paddingRight: "1vw"
    },

};
