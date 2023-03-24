import { Box, Typography, InputBase, Button, useTheme } from "@mui/material";
import { useAppSelector } from "state/hooks";
import { ChatProps } from "state/types";
import { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Message from "./Message";
import StatusIndicator from "components/StatusIndicator";
import AvatarImage from "components/AvatarImage";

const Chat = ({ chatId }: ChatProps) => {
  const userId = useAppSelector((state) => state.user!._id);
  const chats = useAppSelector((state) => state.chats).find(
    (chat) => chat._id === chatId
  );
  const friendInfo = useAppSelector((state) => state.user!.friends).find(
    (friend) => friend._id === chats?.friendId
  );
  const [message, setMessage] = useState("");
  // TODO: add handler to check to see if friend is online

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;
  const alt = palette.background.alt;

  const handleSendMessage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formData = { message, senderId: userId };
    console.log(formData);
    setMessage("");
  };

  return (
    <>
      {friendInfo && (
        <>
          {/* TOP OF Chat - CHAT USER INFO */}
          <FlexBetween marginBottom="0.75rem">
            <FlexBetween gap="1rem">
              <FlexBetween>
                <AvatarImage image={friendInfo?.picturePath} size="55px" />
                <StatusIndicator online />
              </FlexBetween>
              <Box>
                <Typography
                  color={main}
                  variant="h5"
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: primaryLight,
                      cursor: "pointer",
                    },
                  }}
                >
                  {friendInfo?.username}
                </Typography>
                <Typography color={medium} fontSize="0.75rem">
                  {friendInfo?.bio}
                </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
          {/* CHAT WRAPPER */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* CHAT TOP: VIEW MESSAGES */}
            <Box
              sx={{
                height: "calc(100vh - 375px)",
                overflowY: "scroll",
              }}
            >
              <Message />
              <Message own />
              <Message />
              <Message />
              <Message own />
              <Message />
              <Message own />
            </Box>
            {/* CHAT BOTTOM: SEND MESSAGE */}
            <FlexBetween gap="1.5rem">
              <InputBase
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something..."
                sx={{
                  width: "100%",
                  backgroundColor: light,
                  borderRadius: "2rem",
                  padding: "1rem 2rem",
                  margin: "1rem 0",
                }}
              />
              <Button
                onClick={handleSendMessage}
                sx={{
                  color: alt,
                  backgroundColor: main,
                  borderRadius: "3rem",
                  padding: "0.5rem 1.5rem",
                  height: "100%",
                }}
              >
                SEND
              </Button>
            </FlexBetween>
          </Box>
        </>
      )}
    </>
  );
};
export default Chat;
