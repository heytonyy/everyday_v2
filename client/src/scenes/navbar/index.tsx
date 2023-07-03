/* 
  NAVBAR COMPONENT: index.tsx
*/
import { useState } from "react";
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
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Notifications,
  Menu,
  Close,
} from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { setChats } from "state";
import { Chat } from "state/types";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user!);
  const token = useAppSelector((state) => state.token);
  const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;
  const background = palette.background.default;
  const primaryLight = palette.primary.light;
  const alt = palette.background.alt;

  const getInitialChatId = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/chats/${user._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data: Chat = await response.json();
    console.log(data);
    dispatch(setChats({ chat: data }));
    navigate(`/chat`);
  };

  // TODO: Make fixed at top of page
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
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
        <Typography component={"span"}>
          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase id="search-field" placeholder="Search..." />
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
          {/* CHAT */}
          <IconButton onClick={() => getInitialChatId()}>
            <ChatIcon sx={{ color: dark, fontSize: "25px" }} />
          </IconButton>

          {/* TOGGLE DARK/LIGHT MODE */}
          <IconButton onClick={() => dispatch(setMode())}>
            {palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          {/* DROPDOWN MENU */}
          <FormControl
            variant="standard"
            defaultValue={user.username}
            component="div"
          >
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
              input={<InputBase id="navbar-dropdown" />}
            >
              <MenuItem value={user.username}>
                <Typography>{user.username}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
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
          sx={{ backgroundColor: background }}
          component="div"
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" padding="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
            >
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
            <FormControl
              variant="standard"
              defaultValue={user.username}
              component="div"
            >
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
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Logout
                </MenuItem>
              </Select>
            </FormControl>

            {/* TOGGLE DARK/LIGHT MODE */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {palette.mode === "dark" ? (
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
  );
}
