import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import transparentLogo from "../../img/transparentLogo.png";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import AppbarMenu from './appbar/AppbarMenu';


function Appbar() {

    const history = useHistory();
    const { t, i18n } = useTranslation();

    const pages = [{
        title: t("APPBAR.ORDERS"),
        uri: "/orders"
    }, {
        title: t("APPBAR.MENU_EDIT"),
        uri: "/edit-menu"
    }, {
        title: t("APPBAR.TABLES"),
        uri: "/tables"
    }, {
        title: t("APPBAR.REVIEWS"),
        uri: "/comments"
    }];

    return (
        <AppBar position="static" style={styles.appbar}>
            <Box style={styles.container}>
                <Box style={styles.leftAndRight}>
                    <Box style={styles.logo}>
                        <img
                            src={transparentLogo}
                            alt="company logo"
                            width={50}
                            height={50}
                        />
                    </Box>
                    <Button
                        onClick={() => { history.push("/restaurant-main") }}
                        variant='text' color='inherit'>
                        <Typography
                            variant="h4"
                            sx={{
                                m: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            AFİYET
                        </Typography>
                    </Button>
                    {pages.map((page, i) => {
                        return (
                            <Button
                                key={i}
                                onClick={() => { history.push(page.uri) }}
                                variant='text' color='inherit' style={{ height: 87 }}
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
                <AppbarMenu />
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
    leftAndRight: {
        display: "flex",
        justifyContent: "space-between"
    },
    container: {
        display: "flex",
        alignItems: "center"
    },
    logo: {
        paddingRight: "1vw"
    }
};
