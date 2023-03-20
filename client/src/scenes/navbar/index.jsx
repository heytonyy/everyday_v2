/* 
  NAVBAR COMPONENT: index.jsx
*/
import { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
    <FlexBetween gap="1.75rem">

      {/* LOGO */}
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="primary"
        onClick={() => navigate("/home")}
        sx={{ "&:hover": { color: primaryLight, cursor: "pointer" } }}
      >
        Everday
      </Typography>

      {/* SEARCH BAR IF ON NON-MOBILE */}
      <Typography component={'span'}>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </Typography>

    </FlexBetween>

    {/* DESKTOP NAV */}
    {isNonMobileScreens ? (
      <FlexBetween gap="2rem">

        {/* TOGGLE DARK/LIGHT MODE */}
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>

        {/* NOTIFICATONS */}
        <Notifications sx={{ fontSize: "25px" }}></Notifications>

        {/* DROPDOWN MENU */}
        <FormControl variant="standard" value={user.username}>
          <Select
            value={user.username}
            sx={{
              backgroundColor: neutralLight,
              width: "150px",
              borderRadius: "0.25rem",
              padding: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                paddingRight: "0.25rem",
                width: "3rem",
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: neutralLight,
              },
            }}
            input={<InputBase />}
          >
            <MenuItem value={user.username}>
              <Typography>{user.username}</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>
              Logout
            </MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
    ) : (
      <IconButton onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}>
        <Menu />
      </IconButton>
    )}

    {/* MOBILE NAV */}
    {!isNonMobileScreens && isMobileMenuToggle && (
      <Box
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
        zIndex="10"
        maxWidth="500px"
        minWidth="300px"
        backgroundColor={background}
      >
        {/* CLOSE ICON */}
        <Box display="flex" justifyContent="flex-end" padding="1rem">
          <IconButton onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}>
            <Close />
          </IconButton>
        </Box>

        {/* MENU ITEMS */}
        <FlexBetween
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap="3rem"
        >
          {/* DROPDOWN MENU */}
          <FormControl variant="standard" value={user.username}>
            <Select
              value={user.username}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={user.username}>
                <Typography>{user.username}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>

          {/* TOGGLE DARK/LIGHT MODE */}
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{ fontSize: "25px" }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          {/* NOTIFICATIONs */}
          <Notifications sx={{ fontSize: "25px" }}></Notifications>

        </FlexBetween>
      </Box>
    )}
  </FlexBetween>
}

export default NavBar