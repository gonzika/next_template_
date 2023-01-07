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
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';

import { useSession, signIn, signOut } from "next-auth/react"

import { useRouter } from 'next/router'
import NextLink from "next/link";

import LangPicker from './langPicker';
import useTranslation from 'next-translate/useTranslation'
import ThemePicker from './themePicker';


const pages = [
    { text: 'page_Blog', href: '/' },
    { text: 'page_Pricing', href: '/price' },
    { text: 'page_Products', href: '/products' },
];
const settings = ['user_Profile', 'user_Account', 'user_Dashboard', 'user_Logout'];
const appName = 'NEXT'


const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    
    const { data: session, status } = useSession()

    const router = useRouter()
    const { locale, asPath } = router
    const { t } = useTranslation('common')

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        if (status === "loading") return
        if (!session) return signIn()
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null)
    };

    const handleCloseUserMenu = (setting) => {
        switch (setting) {
            case 'user_Logout':
                signOut()
                break
        }

        setAnchorElUser(null);
    }

    return (
        <AppBar position="relative" style={{zIndex: 1}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {appName}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <NextLink key={page.text} href={page.href}>
                                    <a>
                                        <MenuItem href={page.href} key={page.text} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{t(page.text)}</Typography>
                                        </MenuItem>
                                    </a>
                                </NextLink>
                            ))}

                            <MenuItem color="inherit">
                                <LangPicker locale={locale} />
                                <ThemePicker />
                            </MenuItem>
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {appName}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <NextLink key={page.text} href={page.href}>
                                <Button
                                    href={page.href}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        ':hover': {
                                            bgcolor: 'action.hover',
                                        },
                                    }}
                                >
                                    {t(page.text)}
                                </Button>
                            </NextLink>

                        ))}

                        <Box sx={{ marginLeft: 'auto', marginRight: '15px', alignItems: 'center', display: { md: 'flex' } }}>
                            <LangPicker locale={locale} />
                            <ThemePicker />
                        </Box>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={session ? "Open settings" : 'Login'}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={session?.user?.name || 'unknown'} src={session?.user?.image || null}>
                                    {status === "loading" && <CircularProgress />}
                                    {session === null && <Avatar><PersonIcon/></Avatar>}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        {session && <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{t(setting)}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
