/*
  CHAT PAGE: index.jsx
*/
import { Box, Divider, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppSelector } from "state/hooks";
import NavBar from "scenes/navbar";
import WidgetWrapper from "components/WidgetWrapper";
import Conversation from "./Conversation";
import ChatList from "./ChatList";
import FriendsList from "../widgets/FriendsList";

export default function ChatPage() {
  const { friendId } = useParams();
  const userId = useAppSelector((state) => state.user!._id);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <NavBar />
      {/* MAIN CONTENT */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {userId && (
          <>
            {/* LEFT - FRIENDS LIST */}
            <Box flexBasis={isNonMobileScreens ? "40%" : undefined}>
              <Box margin="2rem 0" />
              <WidgetWrapper>
                <ChatList userId={userId} />
                <Divider />
                <Box margin="1rem 0" />
                <FriendsList userId={userId} />
              </WidgetWrapper>
            </Box>
            {/* CENTER - CONVERSATION */}
            <Box
              flexBasis={isNonMobileScreens ? "55%" : undefined}
              marginTop={isNonMobileScreens ? undefined : "2rem"}
            >
              <Box margin="2rem 0" />
              {friendId && (
                <WidgetWrapper>
                  <Conversation userId={userId} />
                </WidgetWrapper>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
