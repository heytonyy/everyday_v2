/*
  CHAT PAGE: index.jsx
*/
import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppSelector } from "state/hooks";
import NavBar from "scenes/navbar";
import WidgetWrapper from "components/WidgetWrapper";
import Chat from "./Chat";
import ChatsList from "./ChatsList";

export default function ChatPage() {
  const { chatId } = useParams();
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
            {/* LEFT - CHAT LIST */}
            <Box flexBasis={isNonMobileScreens ? "40%" : undefined}>
              <Box margin="2rem 0" />
              <WidgetWrapper>
                <ChatsList userId={userId} />
              </WidgetWrapper>
            </Box>
            {/* CENTER - CONVERSATION */}
            <Box
              flexBasis={isNonMobileScreens ? "55%" : undefined}
              marginTop={isNonMobileScreens ? undefined : "2rem"}
            >
              <Box margin="2rem 0" />
              {chatId && (
                <WidgetWrapper>
                  <Chat chatId={chatId} />
                </WidgetWrapper>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
