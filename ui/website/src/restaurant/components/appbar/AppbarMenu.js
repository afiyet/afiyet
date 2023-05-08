import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import TranslateIcon from '@mui/icons-material/Translate';
import {useSelector} from "react-redux";

export default function AppbarMenu() {

    const history = useHistory();
    const {t, i18n} = useTranslation();
    const restaurant = useSelector(state => state.restaurantState);
    const [language, setLanguage] = useState("tr");


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleChangeLanguage() {

        if(language === "tr") {
            setLanguage("en");
            i18n.changeLanguage("en");
        } else {
            setLanguage("tr");
            i18n.changeLanguage("tr");
        }

        handleClose();
    }

    function handleLogout() {
        window.localStorage.removeItem("afiyet-login-info");
        history.push("/login");
        window.location.reload(true);

        handleClose();
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={t("APPBAR.APPBAR_MENU.SETTINGS_TOOLTIP")}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        style={{backgroundColor: "white"}}
                    >
                        <Avatar sx={{ width: 32, height: 32 }} src={restaurant.picture}>
                            {restaurant.picture === "" ? restaurant.name[0] : ""}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => { history.push("/restaurant-main"); }}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    {t("APPBAR.APPBAR_MENU.PROFILE")}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleChangeLanguage}>
                    <ListItemIcon>
                        <TranslateIcon fontSize="small" />
                    </ListItemIcon>
                    {t("APPBAR.APPBAR_MENU.CHANGE_LANG")}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    {t("APPBAR.APPBAR_MENU.LOGOUT")}
                </MenuItem>
            </Menu>
        </Box>
    );
}
